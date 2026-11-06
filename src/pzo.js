// PZO Launcher: a repó Master mappájában lévő PZO-Launcher zip letöltése,
// kicsomagolása és telepítése a felhasználó gépén.
//
// A zip nem tartalmaz futtatható .exe-t: a PZO motor egy Java agent
// (PZOptimEngine.jar) + natív DLL, amit az `install.bat` tesz be a játékmappába
// és írja át a ProjectZomboid64.json-t. Ezért a telepítést a launcher a
// kicsomagolt install.bat elindításával végzi el egy látható konzolablakban,
// ahol a felhasználó látja (és szükség esetén jóváhagyja) a folyamatot.
//
// Állapot: <userData>/pzo-state.json

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const { fetchText, downloadFile } = require('./download');
const { parseRepo } = require('./update');
const packs = require('./packs');

const DEFAULT_REPO = 'NeoiMods/End-of-The-Living-Launcher';
const DEFAULT_FOLDER = 'Master';
const UA = 'EndOfTheLivingLauncher';
// Ez a fájlnév jelzi, hogy a csomag a PZO telepítő (ezt nem a csomagfigyelő
// kezeli, hanem ez a modul).
const PZO_PATTERN = /pzo[\s._-]*launcher/i;

function repoOf(cfg) {
  return parseRepo(cfg && cfg.packsRepo) || parseRepo(cfg && cfg.updateCheckUrl) || DEFAULT_REPO;
}

function folderOf(cfg) {
  const raw = String((cfg && cfg.packsFolder) || DEFAULT_FOLDER).trim().replace(/^\/+|\/+$/g, '');
  return raw || DEFAULT_FOLDER;
}

function isPzoAsset(name) {
  return PZO_PATTERN.test(String(name || ''));
}

function headers(cfg) {
  const h = { 'User-Agent': UA, Accept: 'application/vnd.github+json' };
  const token = String((cfg && cfg.githubToken) || '').trim();
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

// ------------------------------------------------------------------ állapot

function statePath(userDataDir) {
  return path.join(userDataDir, 'pzo-state.json');
}

function stateOf(userDataDir) {
  try {
    const raw = JSON.parse(fs.readFileSync(statePath(userDataDir), 'utf8'));
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
}

function saveState(userDataDir, patch) {
  const next = { ...stateOf(userDataDir), ...patch };
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(statePath(userDataDir), JSON.stringify(next, null, 2));
  } catch {
    /* nem baj */
  }
  return next;
}

function status({ cfg, userDataDir, gameDir }) {
  const st = stateOf(userDataDir);
  const dir = st.dir || path.join(userDataDir, 'packs', 'pzo-launcher');
  const inGame = !!(gameDir && fs.existsSync(path.join(gameDir, 'PZOptimEngine.jar')));
  return {
    extracted: fs.existsSync(dir),
    installed: inGame,
    launchedAt: st.launchedAt || null,
    installedAt: st.installedAt || null,
    autoTried: !!st.autoAt,
    version: st.version || null,
    dir,
  };
}

// ------------------------------------------------------------------ forrás

async function findAsset(cfg) {
  const repo = repoOf(cfg);
  const folder = folderOf(cfg);
  // Ha a beállított mappában nincs PZO zip, a Master mappát is megnézzük.
  const folders = folder === DEFAULT_FOLDER ? [folder] : [folder, DEFAULT_FOLDER];
  let lastError = null;
  for (const candidate of folders) {
    try {
      return await findAssetIn(cfg, repo, candidate);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error(`Nincs PZO telepítő a(z) ${repo} repóban.`);
}

// A repó egy mappájában lévő fájlok listája.
async function listFiles(cfg, repo, folder) {
  const url = `https://api.github.com/repos/${repo}/contents/${folder}`;
  const { status: code, body } = await fetchText(url, { headers: headers(cfg) });

  if (code === 404) throw new Error(`A repóban nincs ${folder}/ mappa (${repo}).`);
  if (code !== 200) throw new Error(`GitHub API HTTP ${code} (${repo}/${folder}).`);

  let items = [];
  try {
    const json = JSON.parse(body);
    if (Array.isArray(json)) items = json.filter((it) => it && it.type === 'file');
  } catch {
    throw new Error('A GitHub válasz nem értelmezhető.');
  }

  return items.map((it) => ({
    name: it.name,
    size: Number(it.size) || 0,
    url: it.download_url || '',
    apiUrl: it.url || '',
  }));
}

// A repó egy mappájában lévő .zip fájlok listája (más modulok is használják).
async function listZips(cfg, repo, folder) {
  const files = await listFiles(cfg, repo, folder);
  return files.filter((it) => /\.zip$/i.test(it.name));
}

// A GitHub 100 MB-nál nagyobb fájlt nem fogad el, ezért a nagy csomagok
// darabolva (ETO.zip → ETO.zip.part001, .part002, …) vannak a repóban.
const PART_PATTERN = /^(.*\.zip)\.part(\d+)$/i;

function groupParts(files) {
  const groups = new Map();
  for (const file of files) {
    const m = PART_PATTERN.exec(file.name);
    if (!m) continue;
    const base = m[1];
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push({ ...file, index: Number(m[2]) });
  }
  const out = [];
  for (const [name, parts] of groups) {
    parts.sort((a, b) => a.index - b.index);
    // Csak akkor használható, ha 1-től folyamatos a számozás.
    const continuous = parts.every((p, i) => p.index === i + 1);
    if (!continuous) continue;
    out.push({
      name,
      size: parts.reduce((sum, p) => sum + p.size, 0),
      parts,
    });
  }
  return out;
}

// A repó mappájában lévő, darabokra vágott csomagok (a findAsset használja).
async function listSplitZips(cfg, repo, folder) {
  return groupParts(await listFiles(cfg, repo, folder));
}

async function findAssetIn(cfg, repo, folder) {
  const zips = await listZips(cfg, repo, folder);
  const pick = zips.find((z) => isPzoAsset(z.name)) || zips[0];
  if (!pick) throw new Error(`Nincs .zip a ${folder}/ mappában (${repo}).`);
  return pick;
}

// Egy darabokból álló csomag összefűzése a megadott fájlba.
function concatFiles(parts, dest) {
  fs.writeFileSync(dest, Buffer.alloc(0));
  for (const part of parts) {
    fs.appendFileSync(dest, fs.readFileSync(part));
  }
}

// Egész csomag letöltése: sima fájl vagy part001…partNNN darabok.
async function downloadAsset(asset, dest, cfg, log = () => {}, onProgress = null) {
  if (!asset || !Array.isArray(asset.parts) || asset.parts.length === 0) {
    await download(asset, dest, cfg, onProgress);
    return dest;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const localParts = [];
  const total = asset.parts.reduce((sum, p) => sum + (Number(p.size) || 0), 0);
  let base = 0;
  let n = 0;
  for (const part of asset.parts) {
    n++;
    const local = `${dest}.part${String(part.index).padStart(3, '0')}`;
    const mb = part.size ? (part.size / 1048576).toFixed(1) + ' MB' : '?';
    log(`  ${n}/${asset.parts.length}. rész: ${part.name} (${mb})…`);
    const start = base;
    await download(
      part,
      local,
      cfg,
      typeof onProgress === 'function' && total
        ? (received) => onProgress(start + received, total)
        : null
    );
    base += Number(part.size) || 0;
    localParts.push(local);
  }

  log('  részek összefűzése…');
  concatFiles(localParts, dest);
  for (const local of localParts) fs.rmSync(local, { force: true });
  return dest;
}

async function download(asset, dest, cfg, onProgress = null) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const token = String((cfg && cfg.githubToken) || '').trim();
  const attempts = [];
  if (asset.url) attempts.push({ url: asset.url, headers: { 'User-Agent': UA } });
  if (token && asset.apiUrl) {
    attempts.push({ url: asset.apiUrl, headers: { ...headers(cfg), Accept: 'application/vnd.github.raw' } });
  }
  let lastError = null;
  for (const attempt of attempts) {
    try {
      await downloadFile(attempt.url, dest, { headers: attempt.headers, onProgress });
      return true;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('Nincs letöltési cím ehhez a fájlhoz.');
}

// ------------------------------------------------------------------ telepítés

// A zip tetején vagy egy mappával beljebb keressük az install.bat-ot.
function findInstallerDir(root) {
  const direct = path.join(root, 'install.bat');
  if (fs.existsSync(direct)) return root;
  let names = [];
  try {
    names = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return null;
  }
  for (const entry of names) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(root, entry.name);
    if (fs.existsSync(path.join(candidate, 'install.bat'))) return candidate;
  }
  return null;
}

// Látható konzolablakban indítja az install.bat-ot, hogy a felhasználó lássa
// a telepítés lépéseit (a PZO telepítő interaktív: megerősítést kérhet).
// PowerShell Start-Process: saját ablakban futó .bat, helyes munkakönyvtárral.
function launchInstaller(dir) {
  return new Promise((resolve) => {
    const bat = path.join(dir, 'install.bat');
    if (!fs.existsSync(bat)) {
      resolve(false);
      return;
    }
    const quote = (p) => String(p).replace(/'/g, "''");
    const inner = `Start-Process -FilePath '${quote(bat)}' -WorkingDirectory '${quote(dir)}'`;
    try {
      execFile(
        'powershell',
        ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', inner],
        { windowsHide: true, timeout: 30000 },
        (err) => resolve(!err)
      );
    } catch {
      resolve(false);
    }
  });
}

async function install({ cfg, userDataDir, log = () => {}, auto = false, onProgress = null }) {
  const repo = repoOf(cfg);
  const folder = folderOf(cfg);

  log(`• PZO Launcher keresése: ${repo}/${folder}/ …`);
  const asset = await findAsset(cfg);

  const sizeMb = asset.size ? (asset.size / 1048576).toFixed(1) + ' MB' : '?';
  const zipFile = path.join(userDataDir, 'packs', '_downloads', asset.name);
  log(`→ ${asset.name} letöltése (${sizeMb})…`);
  await downloadAsset(asset, zipFile, cfg, log, onProgress);

  const target = path.join(userDataDir, 'packs', 'pzo-launcher');
  fs.rmSync(target, { recursive: true, force: true });
  log('  kicsomagolás: ' + target);
  await packs.expandZip(zipFile, target);
  fs.rmSync(zipFile, { force: true });

  const dir = findInstallerDir(target);
  if (!dir) throw new Error('A PZO zipben nincs install.bat – nem telepíthető.');

  log('✓ PZO Launcher kicsomagolva: ' + dir);
  const launched = await launchInstaller(dir);
  saveState(userDataDir, {
    name: asset.name,
    dir,
    version: path.basename(dir),
    installedAt: Date.now(),
    launchedAt: launched ? Date.now() : null,
    auto: !!auto,
  });

  if (launched) {
    log('✓ PZO telepítő elindult – a megnyíló konzolban fejezd be a telepítést.');
  } else {
    log('✗ A PZO telepítő nem indult el. Indítsd kézzel: ' + path.join(dir, 'install.bat'));
  }

  return { ok: true, dir, launched, name: asset.name };
}

function markAutoTried(userDataDir) {
  saveState(userDataDir, { autoAt: Date.now() });
}

module.exports = {
  install,
  status,
  markAutoTried,
  findAsset,
  listFiles,
  listZips,
  listSplitZips,
  downloadAsset,
  concatFiles,
  findInstallerDir,
  launchInstaller,
  isPzoAsset,
  repoOf,
  folderOf,
  statePath,
  DEFAULT_REPO,
  DEFAULT_FOLDER,
};
