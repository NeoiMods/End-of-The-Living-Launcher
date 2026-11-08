// Index-fájlok generálása a repóba.
//
// Két fájlt ír, mindkettőt a GitHub API NÉLKÜL is ki tudja szolgálni a
// raw.githubusercontent.com (és a jsDelivr), ezért a launcher akkor is tud
// frissülni és csomagot listázni, amikor az api.github.com épp 503/504-en van:
//
//   update-manifest.json  – a launcher saját fájljai (méret + sha256)
//   Master/index.json     – a Master mappa tartalma (név + méret + git sha)
//
// Futtatás: node scripts/make-manifest.js   (az npm run build is meghívja)

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const { APP_FILES, APP_DIRS } = require(path.join(ROOT, 'src', 'update.js'));
const { sha256Normalized } = require(path.join(ROOT, 'src', 'gh.js'));

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', windowsHide: true });
}

function commitSha() {
  try {
    return git(['rev-parse', 'HEAD']).trim();
  } catch {
    return null;
  }
}

function version() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version || '';
  } catch {
    return '';
  }
}

function walk(dir, out = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function launcherFileList() {
  const files = new Set(APP_FILES);
  for (const dir of APP_DIRS) {
    for (const file of walk(path.join(ROOT, dir))) {
      files.add(path.relative(ROOT, file).replace(/\\/g, '/'));
    }
  }
  return [...files].sort();
}

// A repóban lévő (committolt) tartalmat használjuk: így az index mindig azt
// írja le, ami a GitHubon tényleg letölthető. Committolatlan fájl kimarad.
function headContent(rel) {
  try {
    return execFileSync('git', ['show', `HEAD:${rel}`], {
      cwd: ROOT,
      maxBuffer: 64 * 1024 * 1024,
      windowsHide: true,
    });
  } catch {
    return null;
  }
}

function buildUpdateManifest() {
  const files = [];
  const missing = [];
  for (const rel of launcherFileList()) {
    const content = headContent(rel);
    if (!content) {
      missing.push(rel);
      continue;
    }
    files.push({ path: rel, size: content.length, sha256: sha256Normalized(content) });
  }
  const manifest = {
    sha: commitSha(),
    version: version(),
    generatedAt: new Date().toISOString(),
    files,
  };
  fs.writeFileSync(path.join(ROOT, 'update-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  if (missing.length) {
    console.log(
      `! ${missing.length} fájl még nincs commitolva, ezért kimaradt az indexből: ${missing
        .slice(0, 6)
        .join(', ')}${missing.length > 6 ? '…' : ''}`
    );
  }
  return manifest;
}

// A Master mappa listája git-ből (gyors, és a blob sha pontosan követi a
// tartalmat). Ha a git nem elérhető, a lemezt használjuk méretekkel.
function buildMasterIndex() {
  const folder = 'Master';
  const files = [];
  let fromGit = false;
  try {
    const out = git(['ls-tree', '-r', '-l', '-z', 'HEAD', folder]);
    for (const chunk of out.split('\0')) {
      const line = chunk.trim();
      if (!line) continue;
      // <mode> <type> <sha> <size>\t<path>
      const tab = line.indexOf('\t');
      if (tab < 0) continue;
      const meta = line.slice(0, tab).split(/\s+/);
      const rel = line.slice(tab + 1).trim();
      if (meta.length < 4 || meta[1] !== 'blob') continue;
      files.push({
        name: path.posix.basename(rel),
        size: Number(meta[3]) || 0,
        sha: meta[2],
      });
    }
    fromGit = files.length > 0;
  } catch {
    fromGit = false;
  }

  if (!fromGit) {
    for (const full of walk(path.join(ROOT, folder))) {
      const rel = path.relative(ROOT, full).replace(/\\/g, '/');
      files.push({
        name: path.posix.basename(rel),
        size: fs.statSync(full).size,
        sha: '',
      });
    }
  }

  files.sort((a, b) => a.name.localeCompare(b.name));
  const index = {
    generatedAt: new Date().toISOString(),
    folder,
    source: fromGit ? 'git' : 'disk',
    files,
  };
  fs.writeFileSync(path.join(ROOT, folder, 'index.json'), JSON.stringify(index, null, 2) + '\n', 'utf8');
  return index;
}

if (require.main === module) {
  const manifest = buildUpdateManifest();
  const index = buildMasterIndex();
  console.log(
    `✓ update-manifest.json: ${manifest.files.length} fájl, commit ${String(manifest.sha).slice(0, 7) || '?'}`
  );
  console.log(`✓ ${index.folder}/index.json: ${index.files.length} fájl (${index.source})`);
}

module.exports = { buildUpdateManifest, buildMasterIndex, launcherFileList };
