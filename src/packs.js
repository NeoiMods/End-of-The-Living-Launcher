// Csomagfigyelő: a beállított GitHub repóban megjelenő .zip / .exe csomagokat
// (modok, optimalizálók – pl. "Pzo Launcher") letölti, majd a helyére teszi:
//
//   * zip  → kicsomagolás (ha a névben "mod" van: Zomboid\mods, különben
//            %APPDATA%\eotl\packs\<csomagnév>)
//   * exe  → letöltés a packs\_installers mappába, majd a telepítő elindítása
//
// Forrás (ebben a sorrendben):
//   1. a repó packs/ mappája (contents API)
//   2. ha ott nincs semmi: a legutóbbi Release asset-jei
//
// Állapot: <userData>/packs-state.json – így csak az új vagy megváltozott
// fájlokat tölti le (sha / asset id alapján).

const fs = require('fs');
const path = require('path');
const { execFile, spawn } = require('child_process');

const { fetchText, downloadFile } = require('./download');
const { parseRepo } = require('./update');
const { zomboidDir } = require('./paths');

const DEFAULT_FOLDER = 'packs';
const UA = 'EndOfTheLivingLauncher';

function apiHeaders(cfg, extra = {}) {
  const headers = {
    'User-Agent': UA,
    Accept: 'application/vnd.github+json',
    ...extra,
  };
  const token = String((cfg && cfg.githubToken) || '').trim();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function folderOf(cfg) {
  return String((cfg && cfg.packsFolder) || DEFAULT_FOLDER).trim().replace(/^\/+|\/+$/g, '') || DEFAULT_FOLDER;
}

function kindOf(name) {
  const lower = String(name || '').toLowerCase();
  if (lower.endsWith('.zip')) return 'zip';
  if (lower.endsWith('.exe')) return 'exe';
  return 'other';
}

// ------------------------------------------------------------------ állapot

function statePath(userDataDir) {
  return path.join(userDataDir, 'packs-state.json');
}

function readState(userDataDir) {
  try {
    const raw = JSON.parse(fs.readFileSync(statePath(userDataDir), 'utf8'));
    return { assets: (raw && raw.assets) || {} };
  } catch {
    return { assets: {} };
  }
}

function writeState(userDataDir, state) {
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(statePath(userDataDir), JSON.stringify(state, null, 2));
  } catch {
    /* nem baj, legközelebb újra letölti */
  }
}

// ------------------------------------------------------------------ források

async function listFromContents(cfg, repo) {
  const url = `https://api.github.com/repos/${repo}/contents/${folderOf(cfg)}`;
  const { status, body } = await fetchText(url, { headers: apiHeaders(cfg) });
  if (status === 404) return null;
  if (status !== 200) throw new Error(`GitHub API HTTP ${status}`);
  const items = JSON.parse(body);
  if (!Array.isArray(items)) return null;
  return items
    .filter((item) => item && item.type === 'file')
    .map((item) => ({
      name: item.name,
      size: Number(item.size) || 0,
      id: String(item.sha || item.name),
      kind: kindOf(item.name),
      url: item.download_url || '',
      apiUrl: item.url || '',
    }));
}

async function listFromReleases(cfg, repo) {
  const url = `https://api.github.com/repos/${repo}/releases/latest`;
  const { status, body } = await fetchText(url, { headers: apiHeaders(cfg) });
  if (status === 404) return null;
  if (status !== 200) throw new Error(`GitHub API HTTP ${status}`);
  const rel = JSON.parse(body);
  return (rel.assets || []).map((asset) => ({
    name: asset.name,
    size: Number(asset.size) || 0,
    id: `${rel.tag_name || rel.id}:${asset.id}`,
    kind: kindOf(asset.name),
    url: asset.browser_download_url || '',
    apiUrl: asset.url || '',
  }));
}

// ------------------------------------------------------------------ letöltés

function slugOf(name) {
  return String(name || '')
    .replace(/\.(zip|exe)$/i, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'csomag';
}

function targetFor(asset, userDataDir) {
  const lower = String(asset.name || '').toLowerCase();
  if (/\.zip$/.test(lower) && /mod/.test(lower)) {
    return { dir: path.join(zomboidDir(), 'mods'), where: 'Zomboid\\mods', depth: 3 };
  }
  return { dir: path.join(userDataDir, 'packs', slugOf(asset.name)), where: 'packs', depth: 6 };
}

async function downloadAsset(cfg, asset, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const token = String((cfg && cfg.githubToken) || '').trim();
  const attempts = [];

  if (token && asset.apiUrl) {
    attempts.push({ url: asset.apiUrl, headers: apiHeaders(cfg, { Accept: 'application/vnd.github.raw' }) });
  }
  if (asset.url) attempts.push({ url: asset.url, headers: { 'User-Agent': UA } });
  if (token && asset.apiUrl) attempts.push({ url: asset.apiUrl, headers: apiHeaders(cfg) });

  let lastError = null;
  for (const attempt of attempts) {
    try {
      await downloadFile(attempt.url, dest, { headers: attempt.headers });
      return true;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Nincs letöltési cím ehhez a fájlhoz.');
}

// ------------------------------------------------------------------ kicsomagolás

function expandZip(zipFile, destDir) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(destDir, { recursive: true });
    const inner = `Expand-Archive -LiteralPath '${String(zipFile).replace(/'/g, "''")}' -DestinationPath '${String(
      destDir
    ).replace(/'/g, "''")}' -Force`;
    execFile(
      'powershell',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', inner],
      { windowsHide: true, timeout: 180000 },
      (err, stdout, stderr) => {
        if (err) {
          const msg = String(stderr || err.message || '').trim().split(/\r?\n/)[0];
          reject(new Error(msg || 'kicsomagolási hiba'));
          return;
        }
        resolve();
      }
    );
  });
}

function runInstaller(file, log) {
  return new Promise((resolve) => {
    try {
      const child = spawn(String(file), [], { detached: true, stdio: 'ignore', windowsHide: false });
      child.on('error', (err) => {
        log('✗ A telepítő nem indítható el: ' + (err && err.message ? err.message : err));
        resolve(false);
      });
      child.unref();
      setTimeout(() => resolve(true), 1500);
    } catch (err) {
      log('✗ A telepítő nem indítható el: ' + (err && err.message ? err.message : err));
      resolve(false);
    }
  });
}

// ------------------------------------------------------------------ szinkron

async function sync({ cfg, userDataDir, log = () => {}, force = false }) {
  const repo = parseRepo((cfg && cfg.packsRepo) || '');
  if (!repo) {
    return { ok: false, reason: 'Nincs beállítva csomagforrás (Beállítások → Csomagok repója).' };
  }

  log('• Csomagok ellenőrzése: ' + repo + '…');

  let assets = null;
  try {
    assets = await listFromContents(cfg, repo);
  } catch (err) {
    log('! ' + (err && err.message ? err.message : err));
  }
  if (!assets || !assets.length) {
    try {
      const rel = await listFromReleases(cfg, repo);
      if (rel) assets = rel;
    } catch (err) {
      log('! ' + (err && err.message ? err.message : err));
    }
  }
  if (!assets) {
    return {
      ok: false,
      reason: `Nincs ${folderOf(cfg)}/ mappa és nincs Release sem ebben a repóban: ${repo}.`,
    };
  }

  // A PZO telepítőnek saját gombja van az Optimalizálás panelen, azt itt kihagyjuk.
  const usable = assets.filter(
    (asset) => asset.kind !== 'other' && !/pzo[\s._-]*launcher/i.test(asset.name)
  );
  if (!usable.length) {
    return { ok: true, installed: [], reason: 'Nincs .zip vagy .exe a repóban.' };
  }

  const state = readState(userDataDir);
  const installed = [];
  const skipped = [];

  for (const asset of usable) {
    const known = state.assets[asset.name];
    if (!force && known && known.id === asset.id) {
      skipped.push(asset.name);
      continue;
    }

    const target = targetFor(asset, userDataDir);
    const sizeMb = asset.size ? (asset.size / (1024 * 1024)).toFixed(1) + ' MB' : '?';

    try {
      if (asset.kind === 'zip') {
        const zipFile = path.join(userDataDir, 'packs', '_downloads', asset.name);
        log(`→ ${asset.name} letöltése (${sizeMb})…`);
        await downloadAsset(cfg, asset, zipFile);
        log(`  kicsomagolás: ${target.where}`);
        await expandZip(zipFile, target.dir);
        fs.rmSync(zipFile, { force: true });
        log('✓ Csomag telepítve: ' + asset.name);
        installed.push(asset.name);
      } else {
        const exeFile = path.join(userDataDir, 'packs', '_installers', asset.name);
        log(`→ ${asset.name} letöltése (${sizeMb})…`);
        await downloadAsset(cfg, asset, exeFile);
        log('  telepítő indítása: ' + asset.name);
        await runInstaller(exeFile, log);
        log('✓ Telepítő elindult: ' + asset.name);
        installed.push(asset.name);
      }

      state.assets[asset.name] = {
        id: asset.id,
        size: asset.size,
        at: Date.now(),
        dir: target.dir,
      };
      writeState(userDataDir, state);
    } catch (err) {
      log('✗ ' + asset.name + ': ' + (err && err.message ? err.message : err));
    }
  }

  if (!installed.length) {
    log('✓ Csomagok naprakészek (' + skipped.length + ' fájl).');
  }

  return { ok: true, installed, skipped, reason: installed.length ? null : 'Minden csomag naprakész.' };
}

module.exports = { sync, kindOf, slugOf, targetFor, folderOf, statePath, expandZip, downloadAsset };
