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
const { execFile } = require('child_process');

const { fetchText } = require('./download');
const pzo = require('./pzo');
const { zomboidDir } = require('./paths');

const UA = 'EndOfTheLivingLauncher';

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

  let zips = [];
  let lastError = null;
  for (const candidate of folders) {
    try {
      const list = await pzo.listZips(cfg, repo, candidate);
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

async function install({ cfg, userDataDir, id, log = () => {} }) {
  const spec = SPECS[id];
  if (!spec) throw new Error('Ismeretlen mod: ' + id);

  log(`• ${spec.label} keresése a Master mappában…`);
  const asset = await findAsset(cfg, id);
  const sizeMb = asset.size ? (asset.size / 1048576).toFixed(1) + ' MB' : '?';

  const zipFile = path.join(userDataDir, 'packs', '_downloads', asset.name);
  log(`→ ${asset.name} letöltése (${sizeMb})…`);
  await pzo.download(asset, zipFile, cfg);

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

module.exports = {
  install,
  status,
  findAsset,
  extractFolder,
  isDedicated,
  modInstalled,
  modsDir,
  SPECS,
};
