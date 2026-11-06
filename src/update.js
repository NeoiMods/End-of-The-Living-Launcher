// Valódi auto-updater: a beállított GitHub repó main ágát követi.
//
// Működés:
//   1. Lekéri a GitHub API-ról a main ág legutóbbi commitját (sha).
//   2. Összeveti a telepített commit sha-val (update-state.json / update-baseline.json).
//   3. Ha újabb, letölti a repó zipball-ját, kicsomagolja, majd a launcher
//      saját fájljait (main.js, renderer.js, index.html, src/, assets/ ...)
//      a helyére másolja, és a hívó újraindítja az appot.
//
// A launcher portable Electron build, ahol a kód a resources/app mappában
// sima fájlokként van, ezért a frissítés fájlcserével elvégezhető – nincs
// szükség külön telepítőre vagy GitHub Release-re.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const { fetchText, downloadFile } = require('./download');

const DEFAULT_REPO = 'NeoiMods/End-of-The-Living-Launcher';
const BRANCH = 'main';
const HTTP_HEADERS = {
  'User-Agent': 'EndOfTheLivingLauncher',
  Accept: 'application/vnd.github+json',
};

// A launchert alkotó fájlok/mappák – ezeket cseréli a frissítés.
const APP_FILES = ['main.js', 'preload.js', 'renderer.js', 'index.html', 'styles.css', 'news.json', 'events.json'];
// Csak ezek szerkesztése nem indít launcher-frissítést (a játékos csak a hírt látja).
const NOTE_FILES = ['news.json', 'events.json'];
const APP_DIRS = ['src', 'assets', 'themes'];

// ------------------------------------------------------------------ repo

// Bármilyen GitHub formátumból owner/name párt csinál.
function parseRepo(input) {
  if (!input) return null;
  let s = String(input).trim();
  if (!s) return null;
  s = s.replace(/^git\+/i, '');
  s = s.replace(/^https?:\/\/(www\.)?github\.com\//i, '');
  s = s.replace(/^ssh:\/\/git@github\.com\//i, '');
  s = s.replace(/^git@github\.com:/i, '');
  s = s.replace(/^\/+/, '');
  s = s.replace(/\.git$/i, '');
  s = s.replace(/\/+$/, '');
  const m = s.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/);
  return m ? `${m[1]}/${m[2]}` : null;
}

function repoFromPackageJson(appRoot) {
  try {
    const file = path.join(appRoot, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(file, 'utf8'));
    const url = pkg && pkg.repository && (pkg.repository.url || pkg.repository);
    return parseRepo(url);
  } catch {
    return null;
  }
}

function resolveRepo(cfg, appRoot) {
  return parseRepo(cfg && cfg.updateCheckUrl) || repoFromPackageJson(appRoot) || DEFAULT_REPO;
}

// --------------------------------------------------------------- állapot

function stateFile(userDataDir) {
  return path.join(userDataDir, 'update-state.json');
}

function readState(userDataDir) {
  try {
    const data = JSON.parse(fs.readFileSync(stateFile(userDataDir), 'utf8'));
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

function writeState(userDataDir, patch) {
  const next = { ...readState(userDataDir), ...patch };
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(stateFile(userDataDir), JSON.stringify(next, null, 2), 'utf8');
  } catch {
    /* állapot írás hiba nem állítja meg a frissítést */
  }
  return next;
}

// A build készítésekor elmentett commit – ez a kiinduló alapvonal.
function baselineSha(appRoot) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(appRoot, 'update-baseline.json'), 'utf8'));
    return data && typeof data.sha === 'string' ? data.sha : null;
  } catch {
    return null;
  }
}

function installedSha(userDataDir, appRoot) {
  const state = readState(userDataDir);
  return (typeof state.installedSha === 'string' && state.installedSha) || baselineSha(appRoot) || null;
}

// ----------------------------------------------------------------- GitHub

async function fetchLatestCommit(repo) {
  const url = `https://api.github.com/repos/${repo}/commits/${BRANCH}`;
  const { status, body } = await fetchText(url, { headers: HTTP_HEADERS, timeoutMs: 20000 });

  if (status === 404) {
    throw new Error(
      `a repó nem érhető el nyilvánosan (${repo}). Ha privát, a frissítés nem működik.`
    );
  }
  if (status === 403 || status === 429) {
    throw new Error('a GitHub API átmenetileg korlátozza a kéréseket – próbáld később');
  }
  if (status !== 200) {
    throw new Error(`GitHub API hiba (HTTP ${status})`);
  }

  let meta;
  try {
    meta = JSON.parse(body);
  } catch {
    throw new Error('a GitHub válasz nem értelmezhető');
  }
  if (!meta || typeof meta.sha !== 'string') {
    throw new Error('a GitHub válasz nem tartalmaz commitot');
  }

  const commit = meta.commit || {};
  return {
    sha: meta.sha,
    shortSha: meta.sha.slice(0, 7),
    date: (commit.author && commit.author.date) || (commit.committer && commit.committer.date) || null,
    message: String(commit.message || '').split('\n')[0],
  };
}

// ------------------------------------------------------------- ellenőrzés

// Visszatérés: { ok, update, repo, localSha, remoteSha, remote, reason }
async function checkForUpdate({ cfg = {}, userDataDir, appRoot }) {
  const repo = resolveRepo(cfg, appRoot);
  if (!repo) {
    return { ok: false, update: false, reason: 'nincs beállított GitHub repó' };
  }

  let remote;
  try {
    remote = await fetchLatestCommit(repo);
  } catch (err) {
    writeState(userDataDir, { lastCheckedAt: Date.now(), lastError: err.message });
    return { ok: false, update: false, repo, reason: err.message };
  }

  const localSha = installedSha(userDataDir, appRoot);

  if (!localSha) {
    // Első indítás: rögzítjük a mostani commitot alapvonalnak, hogy ne
    // töltsön le feleslegesen egy „frissítést” a telepítés pillanatában.
    writeState(userDataDir, {
      installedSha: remote.sha,
      installedAt: Date.now(),
      lastCheckedAt: Date.now(),
      remoteSha: remote.sha,
      remoteDate: remote.date,
      remoteMessage: remote.message,
      lastError: null,
    });
    return {
      ok: true,
      update: false,
      repo,
      localSha: remote.sha,
      remoteSha: remote.sha,
      remote,
      baseline: true,
      reason: 'első ellenőrzés – a jelenlegi verzió lett az alapvonal',
    };
  }

  writeState(userDataDir, {
    lastCheckedAt: Date.now(),
    remoteSha: remote.sha,
    remoteDate: remote.date,
    remoteMessage: remote.message,
    lastError: null,
  });

  if (localSha === remote.sha) {
    return {
      ok: true,
      update: false,
      repo,
      localSha,
      remoteSha: remote.sha,
      remote,
      reason: 'naprakész',
    };
  }

  // Ha a két commit közt csak a hírek/események változtak, nem kell launchert
  // frissíteni – a játékos csak az új bejegyzést látja, frissítés-ablak nélkül.
  const onlyNotes = await changesAreOnlyNotes(repo, localSha, remote.sha);
  if (onlyNotes) {
    writeState(userDataDir, { installedSha: remote.sha, installedAt: Date.now() });
    return {
      ok: true,
      update: false,
      repo,
      localSha: remote.sha,
      remoteSha: remote.sha,
      remote,
      reason: 'csak az újdonságok/események frissültek',
    };
  }

  return {
    ok: true,
    update: true,
    repo,
    localSha,
    remoteSha: remote.sha,
    remoteVersion: remote.shortSha,
    remote,
    reason: 'új verzió érhető el',
  };
}

// Csak a GitHubon szerkeszthető "tartalom" fájlok változtak? (news.json, events.json)
// Hiba esetén inkább frissítünk – a rossz döntés itt a kimaradt frissítés lenne.
async function changesAreOnlyNotes(repo, base, head) {
  if (!base || !head || base === head) return false;
  const url = `https://api.github.com/repos/${repo}/compare/${base}...${head}`;
  try {
    const { status, body } = await fetchText(url, { headers: HTTP_HEADERS, timeoutMs: 15000 });
    if (status !== 200) return false;
    const data = JSON.parse(body);
    const files = Array.isArray(data.files) ? data.files : null;
    if (!files || !files.length) return false;
    return files.every((f) => NOTE_FILES.includes(String(f.filename || '')));
  } catch {
    return false;
  }
}

// --------------------------------------------------------------- telepítés

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Windows alatt előfordulhat, hogy egy fájl pillanatnyig foglalt – újrapróbáljuk.
// Byte-azonos-e a két fájl? Ha igen, nem írjuk újra (felesleges írás, zárolás).
function sameFile(a, b) {
  try {
    const sa = fs.statSync(a);
    const sb = fs.statSync(b);
    if (!sa.isFile() || !sb.isFile() || sa.size !== sb.size) return false;
    return fs.readFileSync(a).equals(fs.readFileSync(b));
  } catch {
    return false;
  }
}

async function copyFileRetry(src, dest, attempts = 8) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  let lastErr = null;
  for (let i = 0; i < attempts; i++) {
    try {
      fs.copyFileSync(src, dest);
      return;
    } catch (err) {
      lastErr = err;
      if (i === attempts - 1) break;
      await sleep(150 * (i + 1));
    }
  }
  throw lastErr;
}

async function copyTree(srcDir, destDir, changed, failed) {
  let entries;
  try {
    entries = fs.readdirSync(srcDir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const src = path.join(srcDir, entry.name);
    const dest = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyTree(src, dest, changed, failed);
    } else if (entry.isFile()) {
      if (sameFile(src, dest)) continue;
      try {
        await copyFileRetry(src, dest);
        changed.push(path.relative(path.join(srcDir, '..'), src).replace(/\\/g, '/'));
      } catch (err) {
        failed.push({ file: dest, error: err.message });
      }
    }
  }
}

function extractZip(zipPath, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  execFileSync(
    'powershell.exe',
    [
      '-NoProfile',
      '-NonInteractive',
      '-Command',
      `Expand-Archive -Force -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${destDir.replace(/'/g, "''")}'`,
    ],
    { windowsHide: true, stdio: 'pipe' }
  );
}

// Megkeresi a kicsomagolt zipball gyökerét (a GitHub egyetlen mappába csomagol).
function findExtractedRoot(dir) {
  const stack = [dir];
  while (stack.length) {
    const cur = stack.shift();
    if (fs.existsSync(path.join(cur, 'main.js'))) return cur;
    let entries = [];
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (e.isDirectory()) stack.push(path.join(cur, e.name));
    }
  }
  return null;
}

// Visszatérés: { ok, newVersion, changed, failed, error, restartRequired }
async function applyUpdate({ cfg = {}, userDataDir, appRoot, res, log = () => {}, progress = () => {} }) {
  const repo = (res && res.repo) || resolveRepo(cfg, appRoot);
  const stamp = Date.now();
  const workDir = path.join(os.tmpdir(), `eotl-update-${stamp}`);
  const zipPath = path.join(workDir, 'update.zip');
  const extractDir = path.join(workDir, 'extracted');

  try {
    fs.mkdirSync(workDir, { recursive: true });

    progress({ label: 'Frissítés letöltése…' });
    log(`Frissítés letöltése: ${repo} (${BRANCH})`);
    await downloadFile(`https://api.github.com/repos/${repo}/zipball/${BRANCH}`, zipPath, {
      headers: HTTP_HEADERS,
      onProgress: (received, totalBytes) =>
        progress({
          label: 'Frissítés letöltése',
          done: received,
          total: totalBytes || 0,
        }),
    });

    progress({ label: 'Frissítés kicsomagolása…' });
    extractZip(zipPath, extractDir);

    const srcRoot = findExtractedRoot(extractDir);
    if (!srcRoot) {
      throw new Error('a letöltött csomagban nincs main.js – a repó szerkezete megváltozott?');
    }

    progress({ label: 'Fájlok cseréje…' });
    const changed = [];
    const failed = [];

    for (const file of APP_FILES) {
      const src = path.join(srcRoot, file);
      if (!fs.existsSync(src)) continue;
      if (sameFile(src, path.join(appRoot, file))) continue;
      try {
        await copyFileRetry(src, path.join(appRoot, file));
        changed.push(file);
      } catch (err) {
        failed.push({ file, error: err.message });
      }
    }
    for (const dir of APP_DIRS) {
      const src = path.join(srcRoot, dir);
      if (!fs.existsSync(src)) continue;
      await copyTree(src, path.join(appRoot, dir), changed, failed);
    }

    const remoteSha = (res && res.remoteSha) || (await fetchLatestCommit(repo)).sha;
    writeState(userDataDir, {
      installedSha: remoteSha,
      installedAt: Date.now(),
      lastCheckedAt: Date.now(),
      lastChanged: changed.length,
      lastError: null,
    });

    progress({ label: 'Frissítés kész.' });
    if (!changed.length) {
      // A commit csak olyan fájlt érintett, ami nem része a launchernek
      // (pl. scripts/), vagy a fájlok már azonosak: nincs mit cserélni.
      log('• Nincs cserélendő launcher-fájl – a verzió megjelölve.');
      return {
        ok: true,
        newVersion: remoteSha.slice(0, 7),
        remoteSha,
        changed: 0,
        failed,
        restartRequired: false,
      };
    }

    log(`✓ ${changed.length} fájl frissítve${failed.length ? `, ${failed.length} sikertelen` : ''}.`);

    return {
      ok: true,
      newVersion: remoteSha.slice(0, 7),
      remoteSha,
      changed: changed.length,
      failed,
      restartRequired: true,
    };
  } catch (err) {
    return { ok: false, error: err && err.message ? err.message : String(err) };
  } finally {
    progress(null);
    try {
      fs.rmSync(workDir, { recursive: true, force: true });
    } catch {
      /* temp takarítás */
    }
  }
}

// ------------------------------------------------ automatikus frissítés

// Indításkor hívott teljes folyamat. A hívó (main.js) indítja újra az appot,
// ha restartRequired igazzal tér vissza.
async function autoUpdateOnLaunch({ cfg = {}, userDataDir, appRoot, log = () => {}, progress = () => {} }) {
  if (!installedSha(userDataDir, appRoot)) {
    // Nincs se build-alapvonal, se korábbi állapot – most rögzítjük.
    const first = await checkForUpdate({ cfg, userDataDir, appRoot });
    log(`• Frissítés alapvonal rögzítve (${first.remoteSha ? first.remoteSha.slice(0, 7) : '?'}).`);
    return { ok: true, updated: false, reason: 'alapvonal rögzítve' };
  }

  const res = await checkForUpdate({ cfg, userDataDir, appRoot });
  if (!res.ok) {
    log('! Frissítés ellenőrzése sikertelen: ' + res.reason);
    return { ok: false, updated: false, reason: res.reason };
  }
  if (!res.update) {
    return { ok: true, updated: false, reason: res.reason };
  }

  log(`✓ Új verzió a GitHubon: ${res.remoteSha.slice(0, 7)} – ${res.remote.message || 'frissítés'}`);
  const applied = await applyUpdate({ cfg, userDataDir, appRoot, res, log, progress });
  if (!applied.ok) {
    log('✗ Frissítés sikertelen: ' + applied.error);
    return { ok: false, updated: false, reason: applied.error };
  }
  if (applied.restartRequired === false) {
    return { ok: true, updated: false, reason: 'nincs launcher-változás', ...applied };
  }
  log(`✓ Frissítve: ${applied.newVersion}. A launcher újraindul…`);
  return { ok: true, updated: true, ...applied };
}

// Aktuális állapot a beállítások panelhez.
function getUpdateInfo({ cfg = {}, userDataDir, appRoot }) {
  const state = readState(userDataDir);
  const sha = installedSha(userDataDir, appRoot);
  return {
    repo: resolveRepo(cfg, appRoot),
    branch: BRANCH,
    installedSha: sha,
    installedShort: sha ? sha.slice(0, 7) : null,
    lastCheckedAt: state.lastCheckedAt || null,
    lastError: state.lastError || null,
    remoteSha: state.remoteSha || null,
    remoteDate: state.remoteDate || null,
    remoteMessage: state.remoteMessage || null,
  };
}

module.exports = {
  DEFAULT_REPO,
  BRANCH,
  parseRepo,
  resolveRepo,
  checkForUpdate,
  changesAreOnlyNotes,
  applyUpdate,
  autoUpdateOnLaunch,
  getUpdateInfo,
  readState,
  writeState,
};
