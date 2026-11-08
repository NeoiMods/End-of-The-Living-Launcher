// Opcionális modok a Master mappából: ETO (Every Texture Optimized, két
// változatban) és a 6282 3D modellcsomag a Viewpoint/ZombieBuddyhoz.
//
// A zip B42-es szerkezetű:  mods/<Mod neve>/<verzió>/mod.info
// Ezért csak a kiválasztott mod mappáját csomagoljuk ki ide:
//   %USERPROFILE%\Zomboid\mods\<Mod neve>\
//
// Semmit nem telepít magától: minden ezek közül a játékos döntése.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile, execFileSync, spawn } = require('child_process');

const { fetchText, downloadFile } = require('./download');
const modinfo = require('./modinfo');
const modlist = require('./modlist');
const pzo = require('./pzo');
const { zomboidDir, PZ_APP_ID, findSteamPath, parseLibraryPaths } = require('./paths');

const UA = 'EndOfTheLivingLauncher';

const STEAMCMD_URL = 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip';
const STEAMCMD_TIMEOUT = 10 * 60 * 1000;

// A kártyák azonosítói (data-opt / IPC) és a hozzájuk tartozó mod mappák.
const SPECS = {
  eto: {
    label: 'ETO',
    folder: 'Every Texture Optimized',
    asset: /(^|[^a-z])eto([^a-z]|$)|every[\s._-]*texture/i,
    // a másik ETO változat nem maradhat bent egyszerre
    siblings: ['Every Texture Optimized Maximum Performance'],
  },
  'eto-max': {
    label: 'ETO Maximum Performance',
    folder: 'Every Texture Optimized Maximum Performance',
    asset: /(^|[^a-z])eto([^a-z]|$)|every[\s._-]*texture/i,
    siblings: ['Every Texture Optimized'],
  },
  voxel: {
    label: '6282 3D modell',
    folder: 'PZVoxelStudioViewpoint',
    asset: /6282|pzvoxel/i,
    siblings: [],
  },
};

// Ezeknek a csomagoknak saját kártyájuk van, a csomagfigyelő ne nyúljon hozzá.
const DEDICATED = [/(^|[^a-z])eto([^a-z]|$)|every[\s._-]*texture/i, /6282|pzvoxel/i];

function isDedicated(name) {
  const n = String(name || '');
  return DEDICATED.some((re) => re.test(n));
}

function headers(cfg) {
  const h = { 'User-Agent': UA, Accept: 'application/vnd.github+json' };
  const token = String((cfg && cfg.githubToken) || '').trim();
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

function modsDir() {
  return path.join(zomboidDir(), 'mods');
}

// ------------------------------------------------------------------ állapot

// B42: a mod.info egy verziómappában van (42/, 42.20.4/), B41: közvetlenül.
function modInstalled(base) {
  if (!fs.existsSync(base)) return false;
  if (fs.existsSync(path.join(base, 'mod.info'))) return true;
  try {
    return fs
      .readdirSync(base, { withFileTypes: true })
      .some((entry) => entry.isDirectory() && fs.existsSync(path.join(base, entry.name, 'mod.info')));
  } catch {
    return false;
  }
}

function status() {
  const dir = modsDir();
  const out = { dir };
  for (const [id, spec] of Object.entries(SPECS)) {
    out[id] = modInstalled(path.join(dir, spec.folder));
  }
  // A Viewpoint NIGHTLY nem a Zomboid\mods alatt van, ezért külön állapot.
  out.nightly = nightlyStatus();
  return out;
}

// ------------------------------------------------------------------ forrás

async function listReleaseZips(cfg) {
  const repo = pzo.repoOf(cfg);
  try {
    const { status: code, body } = await fetchText(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: headers(cfg),
    });
    if (code !== 200) return [];
    const rel = JSON.parse(body);
    return (rel.assets || [])
      .filter((a) => a && /\.zip$/i.test(a.name))
      .map((a) => ({
        name: a.name,
        size: Number(a.size) || 0,
        url: a.browser_download_url || '',
        apiUrl: a.url || '',
      }));
  } catch {
    return [];
  }
}

async function findAsset(cfg, id) {
  const spec = SPECS[id];
  if (!spec) throw new Error('Ismeretlen mod: ' + id);

  const repo = pzo.repoOf(cfg);
  const folder = pzo.folderOf(cfg);
  const folders = folder === pzo.DEFAULT_FOLDER ? [folder] : [folder, pzo.DEFAULT_FOLDER];

  // A repóban sima .zip és darabokra vágott csomag (ETO.zip.part001…) is lehet:
  // a GitHub 100 MB-nál nagyobb fájlt nem fogad el.
  let zips = [];
  let lastError = null;
  for (const candidate of folders) {
    try {
      const list = [...(await pzo.listZips(cfg, repo, candidate)), ...(await pzo.listSplitZips(cfg, repo, candidate))];
      if (list.length) {
        zips = list;
        break;
      }
    } catch (err) {
      lastError = err;
    }
  }

  let pick = zips.find((z) => spec.asset.test(z.name));
  // Ha a zip túl nagy a repóhoz, GitHub Release alatt is ott lehet.
  if (!pick) {
    const rel = await listReleaseZips(cfg);
    pick = rel.find((z) => spec.asset.test(z.name));
  }
  if (!pick) {
    throw new Error(
      lastError && !zips.length
        ? lastError.message
        : `Nincs ${spec.label} zip a ${repo}/${folder}/ mappában (és a legutóbbi release-ben sem).`
    );
  }
  return pick;
}

// ------------------------------------------------------------------ kicsomagolás

// Csak a megadott előtagú bejegyzéseket írja ki (a 272 MB-os ETO zipben két
// teljes mod van, nem akarjuk mindkettőt a lemezre tenni).
function extractFolder(zipFile, prefix, outDir) {
  return new Promise((resolve, reject) => {
    const dir = path.join(os.tmpdir(), 'eotl-mod-extract');
    const script = path.join(dir, 'extract.ps1');
    const ps = [
      'param([string]$ZipPath,[string]$Prefix,[string]$Out)',
      "$ErrorActionPreference = 'Stop'",
      'Add-Type -AssemblyName System.IO.Compression.FileSystem',
      '$zip = [System.IO.Compression.ZipFile]::OpenRead($ZipPath)',
      '$count = 0',
      "$dirs = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)",
      'try {',
      '  foreach ($e in $zip.Entries) {',
      '    if (-not $e.FullName.StartsWith($Prefix, [System.StringComparison]::OrdinalIgnoreCase)) { continue }',
      '    $rel = $e.FullName.Substring($Prefix.Length)',
      '    if ([string]::IsNullOrEmpty($rel)) { continue }',
      "    $dest = [System.IO.Path]::Combine($Out, $rel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))",
      '    if ([string]::IsNullOrEmpty($e.Name)) {',
      '      [System.IO.Directory]::CreateDirectory($dest) | Out-Null',
      '      continue',
      '    }',
      '    $parent = [System.IO.Path]::GetDirectoryName($dest)',
      '    if ($parent -and -not $dirs.Contains($parent)) {',
      '      [System.IO.Directory]::CreateDirectory($parent) | Out-Null',
      '      [void]$dirs.Add($parent)',
      '    }',
      '    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($e, $dest, $true)',
      '    $count++',
      '  }',
      '} finally { $zip.Dispose() }',
      'if ($count -eq 0) { Write-Error "Nincs $Prefix a zipben." }',
      'Write-Output ("OK " + $count)',
    ].join('\r\n');

    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(script, ps, 'utf8');
      fs.mkdirSync(outDir, { recursive: true });
    } catch (err) {
      reject(err);
      return;
    }

    execFile(
      'powershell',
      ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, '-ZipPath', zipFile, '-Prefix', prefix, '-Out', outDir],
      { windowsHide: true, timeout: 600000, maxBuffer: 1024 * 1024 },
      (err, stdout, stderr) => {
        if (err) {
          const msg = String(stderr || err.message || '').trim().split(/\r?\n/)[0];
          reject(new Error(msg || 'kicsomagolási hiba'));
          return;
        }
        resolve(String(stdout || '').trim());
      }
    );
  });
}

// ------------------------------------------------------------------ telepítés

async function install({ cfg, userDataDir, id, log = () => {}, onProgress = null }) {
  const spec = SPECS[id];
  if (!spec) throw new Error('Ismeretlen mod: ' + id);

  log(`• ${spec.label} keresése a Master mappában…`);
  const asset = await findAsset(cfg, id);
  const sizeMb = asset.size ? (asset.size / 1048576).toFixed(1) + ' MB' : '?';

  const zipFile = path.join(userDataDir, 'packs', '_downloads', asset.name);
  log(`→ ${asset.name} letöltése (${sizeMb})…`);
  await pzo.downloadAsset(asset, zipFile, cfg, log, onProgress);

  const base = modsDir();
  const target = path.join(base, spec.folder);
  fs.mkdirSync(base, { recursive: true });
  fs.rmSync(target, { recursive: true, force: true });

  log('  kicsomagolás: Zomboid\\mods\\' + spec.folder);
  await extractFolder(zipFile, `mods/${spec.folder}/`, target);
  fs.rmSync(zipFile, { force: true });

  for (const other of spec.siblings) {
    const siblingDir = path.join(base, other);
    if (fs.existsSync(siblingDir)) {
      fs.rmSync(siblingDir, { recursive: true, force: true });
      log('  eltávolítva a másik változat: Zomboid\\mods\\' + other);
    }
  }

  if (!modInstalled(target)) {
    throw new Error(`${spec.label}: a kicsomagolt mappában nincs mod.info – a mod nem tölthető be.`);
  }

  log('✓ ' + spec.label + ' telepítve: Zomboid\\mods\\' + spec.folder);
  return { ok: true, id, name: asset.name, dir: target };
}

// ------------------------------------------------------------------ törlés

// A mod saját mappáját törli a Zomboid\mods alól (a többi modhoz nem nyúl).
function remove({ id, log = () => {} }) {
  const spec = SPECS[id];
  if (!spec) throw new Error('Ismeretlen mod: ' + id);

  const target = path.join(modsDir(), spec.folder);
  if (!fs.existsSync(target)) return { ok: true, id, removed: false, reason: 'Nincs telepítve.' };

  log('• ' + spec.label + ' törlése: Zomboid\\mods\\' + spec.folder);
  fs.rmSync(target, { recursive: true, force: true });
  if (fs.existsSync(target)) {
    throw new Error('A mappa nem törölhető – zárd be a játékot, és próbáld újra.');
  }

  log('✓ ' + spec.label + ' törölve: Zomboid\\mods\\' + spec.folder);
  return { ok: true, id, removed: true, dir: target };
}

// ---- Telepítő (setup) segédfüggvényei -----------------------------------
// Ezeket a src/setup.js hívja: SteamCMD pótlás, hiányzó workshop elemek
// letöltése, nem-workshop modok bemásolása és a Java agent fájlok kitelepítése.

function runCapture(cmd, args, opts, onLine, timeoutMs = STEAMCMD_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { windowsHide: true, ...opts });
    let out = '';
    let pending = '';
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      try {
        p.kill();
      } catch {
        // Already gone.
      }
      reject(new Error(`Időtúllépés: ${cmd}`));
    }, timeoutMs);

    const handle = (buf) => {
      out += buf;
      pending += buf;
      const parts = pending.split(/[\r\n]+/);
      pending = parts.pop() || '';
      for (const line of parts) {
        const t = line.trim();
        if (t && onLine) onLine(t);
      }
    };

    p.stdout.on('data', handle);
    p.stderr.on('data', handle);
    p.on('error', (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err);
    });
    p.on('close', (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ code, out });
    });
  });
}

async function ensureSteamCMD(dir, onLog) {
  const exe = path.join(dir, 'steamcmd.exe');
  if (fs.existsSync(exe)) return exe;

  fs.mkdirSync(dir, { recursive: true });
  const zip = path.join(dir, 'steamcmd.zip');
  onLog('SteamCMD letöltése…');
  await downloadFile(STEAMCMD_URL, zip);
  onLog('SteamCMD kicsomagolása…');
  try {
    execFileSync('tar', ['-xf', zip, '-C', dir], { windowsHide: true });
  } catch {
    execFileSync(
      'powershell.exe',
      [
        '-NoProfile',
        '-Command',
        `Expand-Archive -Force -LiteralPath '${zip}' -DestinationPath '${dir}'`,
      ],
      { windowsHide: true, encoding: 'utf8' }
    );
  }
  try {
    fs.rmSync(zip, { force: true });
  } catch {
    // Leftover zip is harmless.
  }
  if (!fs.existsSync(exe)) throw new Error('A SteamCMD nem sikerült telepíteni.');
  return exe;
}

async function downloadWorkshopItem(exe, wsId, onLog) {
  onLog(`Workshop mod letöltése: ${wsId} (első alkalommal a SteamCMD is frissül)…`);
  const { code, out } = await runCapture(
    exe,
    ['+login', 'anonymous', '+workshop_download_item', PZ_APP_ID, String(wsId), '+quit'],
    { cwd: path.dirname(exe) },
    (line) => {
      if (/error|success|warn|download|login|already|update/i.test(line)) onLog('  ' + line);
    }
  );

  if (code !== 0 || /ERROR!/i.test(out)) {
    throw new Error(
      `A(z) ${wsId} mod letöltése nem sikerült. Ellenőrizd, hogy a mod nyilvános a Steam Workshopon.`
    );
  }
  const dir = path.join(
    path.dirname(exe),
    'steamapps',
    'workshop',
    'content',
    PZ_APP_ID,
    String(wsId)
  );
  if (!fs.existsSync(dir)) {
    throw new Error(`A(z) ${wsId} mod nem található a SteamCMD gyorsítótárában.`);
  }
  return dir;
}

function findWorkshopItemDir(libs, wsId) {
  for (const lib of libs) {
    const p = path.join(lib, 'steamapps', 'workshop', 'content', PZ_APP_ID, String(wsId));
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// Copies a mod into Zomboid/mods and returns the target directory.
function placeLocalMod(zomboidDirPath, mod, onLog) {
  const root = path.join(zomboidDirPath, 'mods');
  fs.mkdirSync(root, { recursive: true });

  const existing = modinfo.findLocalModDir(zomboidDirPath, mod.id);
  const target = existing || path.join(root, mod.id);

  if (existing) {
    try {
      fs.rmSync(existing, { recursive: true, force: true });
    } catch (err) {
      throw new Error(`Nem sikerült frissíteni a(z) ${mod.id} modot: ${err.message}`);
    }
  }
  try {
    fs.cpSync(mod.modDir, target, { recursive: true, dereference: true });
  } catch (err) {
    throw new Error(`Nem sikerült bemásolni a(z) ${mod.id} modot: ${err.message}`);
  }
  onLog(`  ✓ ${mod.name} → ${target}`);
  return target;
}

// Copies a mod's libs/ payload (ZombieBuddy.jar, zbNative.dll, ...) into the
// game folder. Without these the Java agent cannot load.
function copyAgentLibs(modDir, sourceRoot, gameDir, onLog) {
  const candidates = [path.join(modDir, 'libs'), path.join(sourceRoot, 'libs')];
  const libsDir = candidates.find((p) => {
    try {
      return fs.statSync(p).isDirectory();
    } catch {
      return false;
    }
  });
  if (!libsDir) return;

  let files;
  try {
    files = fs.readdirSync(libsDir);
  } catch {
    return;
  }
  for (const f of files) {
    if (!/\.(jar|dll)$/i.test(f)) continue;
    const src = path.join(libsDir, f);
    try {
      const srcStat = fs.statSync(src);
      if (!srcStat.isFile()) continue;

      const dst = path.join(gameDir, f);
      let dstStat = null;
      try {
        dstStat = fs.statSync(dst);
      } catch {
        // Not present yet.
      }
      // Same size = already in place. Skipping avoids pointless writes into
      // Program Files, which would fail without elevation.
      if (dstStat && dstStat.size === srcStat.size) {
        onLog(`  ✓ ${f} már a helyén van`);
        continue;
      }

      fs.copyFileSync(src, dst);
      onLog(`  ✓ ${f} → játék mappa`);
    } catch (err) {
      throw new Error(
        `Nem sikerült bemásolni ide: ${path.join(gameDir, f)} (${err.message}). ` +
          'Futtasd a launchert rendszergazdaként, vagy telepítsd a Steamet egy felhasználói mappába.'
      );
    }
  }
}

// ------------------------------------------------------- Viewpoint NIGHTLY
// A Viewpoint éjszakai buildje (0.1.7-rc2) nem Workshop-elem: a Master
// mappából jön, és a játék saját Workshop mappájába kerül
// (Zomboid\Workshop\Viewpoint), hogy a gyűjtemény régi Viewpointja (0.1.6.x)
// helyett ez töltődjön be. A mod azonosítója ugyanaz ("Viewpoint"), ezért a
// gyűjteményből kivesszük a régit – lásd setup.js COLLECTION_EXCLUDE.

const NIGHTLY = {
  label: 'Viewpoint NIGHTLY',
  asset: /viewpoint[^/]*nightly|nightly[^/]*viewpoint/i,
  zipPrefix: 'Viewpoint/',
  folder: 'Viewpoint',
  modId: 'Viewpoint',
  workshopId: '3809306528',
};

function nightlyDir() {
  return path.join(zomboidDir(), 'Workshop', NIGHTLY.folder);
}

function readModVersion(modInfoPath) {
  try {
    const m = fs.readFileSync(modInfoPath, 'utf8').match(/^\s*modversion\s*=\s*(.+)$/im);
    return m ? m[1].trim() : '';
  } catch {
    return '';
  }
}

// A kicsomagolt nightly mod mappája + verziója (Contents\mods\Viewpoint\42).
function nightlyStatus() {
  const root = path.join(nightlyDir(), 'Contents', 'mods');
  let names = [];
  try {
    names = fs
      .readdirSync(root, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);
  } catch {
    return { installed: false, dir: null, version: '' };
  }
  for (const name of names) {
    for (const sub of ['42', 'common', '41', '']) {
      const p = sub ? path.join(root, name, sub, 'mod.info') : path.join(root, name, 'mod.info');
      if (fs.existsSync(p)) {
        return { installed: true, dir: path.join(root, name), version: readModVersion(p) };
      }
    }
  }
  return { installed: false, dir: null, version: '' };
}

// A Steam-en letöltött (régi) Project Viewpoint mappája, ha megvan.
function steamViewpointDir() {
  let libs = [];
  try {
    const steam = findSteamPath();
    libs = steam ? parseLibraryPaths(steam) : [];
  } catch {
    libs = [];
  }
  for (const lib of libs) {
    const p = path.join(lib, 'steamapps', 'workshop', 'content', PZ_APP_ID, NIGHTLY.workshopId);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function findNightlyAsset(cfg) {
  const repo = pzo.repoOf(cfg);
  const folder = pzo.folderOf(cfg);
  const folders = folder === pzo.DEFAULT_FOLDER ? [folder] : [folder, pzo.DEFAULT_FOLDER];

  let zips = [];
  let lastError = null;
  for (const candidate of folders) {
    try {
      const list = [
        ...(await pzo.listZips(cfg, repo, candidate)),
        ...(await pzo.listSplitZips(cfg, repo, candidate)),
      ];
      if (list.length) {
        zips = list;
        break;
      }
    } catch (err) {
      lastError = err;
    }
  }

  const pick = zips.find((z) => NIGHTLY.asset.test(z.name));
  if (!pick) {
    throw new Error(
      lastError && !zips.length
        ? lastError.message
        : `Nincs Viewpoint-nightly zip a ${repo}/${folder}/ mappában (pl. Viewpoint-nightly-0.1.7-rc2.zip).`
    );
  }
  return pick;
}

async function installNightly({ cfg, userDataDir, log = () => {}, onProgress = null }) {
  log(`• ${NIGHTLY.label} keresése a Master mappában…`);
  const asset = await findNightlyAsset(cfg);
  const sizeMb = asset.size ? (asset.size / 1048576).toFixed(1) + ' MB' : '?';

  const zipFile = path.join(userDataDir, 'packs', '_downloads', asset.name);
  log(`→ ${asset.name} letöltése (${sizeMb})…`);
  await pzo.downloadAsset(asset, zipFile, cfg, log, onProgress);

  const target = nightlyDir();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.rmSync(target, { recursive: true, force: true });

  log('  kicsomagolás: Zomboid\\Workshop\\Viewpoint');
  await extractFolder(zipFile, NIGHTLY.zipPrefix, target);
  fs.rmSync(zipFile, { force: true });

  const st = nightlyStatus();
  if (!st.installed) {
    fs.rmSync(target, { recursive: true, force: true });
    throw new Error(`${NIGHTLY.label}: a zipben nincs Viewpoint\\Contents\\mods\\Viewpoint – a mod nem tölthető be.`);
  }

  const en = modlist.ensureEnabled(zomboidDir(), [NIGHTLY.modId]);
  if (en.changed) log(`✓ ${NIGHTLY.modId} engedélyezve a játék mod listájában.`);

  const steamCopy = steamViewpointDir();
  if (steamCopy) {
    log(
      '! A Steam Workshopön is megvan a Project Viewpoint – a nightly akkor él, ha leiratkozol róla ' +
        '(különben két azonos ID-jű Viewpoint van a gépen).'
    );
  }

  const version = st.version ? ` ${st.version}` : '';
  log(`✓ ${NIGHTLY.label}${version} telepítve: Zomboid\\Workshop\\Viewpoint`);
  return { ok: true, id: 'nightly', name: asset.name, version: st.version, dir: target };
}

function removeNightly({ log = () => {} }) {
  const target = nightlyDir();
  if (!fs.existsSync(target)) return { ok: true, id: 'nightly', removed: false, reason: 'Nincs telepítve.' };
  log('• ' + NIGHTLY.label + ' törlése: Zomboid\\Workshop\\Viewpoint');
  fs.rmSync(target, { recursive: true, force: true });
  if (fs.existsSync(target)) {
    throw new Error('A mappa nem törölhető – zárd be a játékot, és próbáld újra.');
  }
  log('✓ ' + NIGHTLY.label + ' törölve (a gyűjtemény Viewpointja marad érvényben).');
  return { ok: true, id: 'nightly', removed: true, dir: target };
}

module.exports = {
  install,
  remove,
  status,
  installNightly,
  removeNightly,
  nightlyStatus,
  nightlyDir,
  NIGHTLY_MOD_ID: NIGHTLY.modId,
  findAsset,
  extractFolder,
  isDedicated,
  modInstalled,
  modsDir,
  SPECS,
  ensureSteamCMD,
  downloadWorkshopItem,
  findWorkshopItemDir,
  placeLocalMod,
  copyAgentLibs,
};
