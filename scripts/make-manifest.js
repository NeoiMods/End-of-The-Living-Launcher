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

function version() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version || '';
  } catch {
    return '';
  }
}

// A build alapjául szolgáló commit (a manifest a HEAD tartalmából készül).
function headSha() {
  try {
    return git(['rev-parse', 'HEAD']).trim();
  } catch {
    return null;
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

// A STAGED (index) tartalmat használjuk: ez pontosan az, ami a következő
// commitba kerül, és ugyanolyan bájtok (LF), mint amit a GitHub kiszolgál.
//
// Két korábbi hiba miatt kell így:
//  • `git show HEAD` → az index egy commit-tal lemaradt, ezért a letöltött fájl
//    mérete nem egyezett („3 fájl nem tölthető le”);
//  • lemezről olvasás → a munkakönyvtár CRLF, a blob LF, így minden szöveg-
//    fájl mérete eltért.
// Ezért a build előtt `git add` kell; ha valamelyik app-fájl nincs stagelve,
// figyelmeztetünk (különben régi tartalom kerülne az indexbe).
function stagedContent(rel) {
  try {
    return execFileSync('git', ['show', `:${rel}`], {
      cwd: ROOT,
      maxBuffer: 64 * 1024 * 1024,
      windowsHide: true,
    });
  } catch {
    return null;
  }
}

function diskContent(rel) {
  try {
    return fs.readFileSync(path.join(ROOT, rel));
  } catch {
    return null;
  }
}

// Csak akkor jelezzük hiányzóként, ha a fájl se a lemezen, se a HEAD-ban nincs.
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
    const content = stagedContent(rel) || headContent(rel) || diskContent(rel);
    if (!content) {
      missing.push(rel);
      continue;
    }
    files.push({ path: rel, size: content.length, sha256: sha256Normalized(content) });
  }
  // Se commit-azonosító, se időbélyeg: így a fájl csak akkor változik, ha a
  // launcher tartalma változott (nem generál felesleges commitot minden build).
  // A `sha` viszont kell: ha a GitHub API kiesik, az updater ebből tudja, melyik
  // commitról beszél (enélkül a régi verziók null-lal szálltak el).
  const manifest = {
    version: version(),
    sha: headSha(),
    files,
  };
  fs.writeFileSync(path.join(ROOT, 'update-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  if (missing.length) {
    console.log(
      `! ${missing.length} fájl se a lemezen, se a HEAD-ban nincs, ezért kimaradt az indexből: ${missing
        .slice(0, 6)
        .join(', ')}${missing.length > 6 ? '…' : ''}`
    );
  }
  // A commitolatlan (untracked) fájl nem tölthető le a repóból: figyelmeztetünk,
  // hogy ne kerüljön be olyan fájl az indexbe, ami nincs a GitHubon.
  try {
    const status = git(['status', '--porcelain', '--', ...Array.from(new Set([...APP_FILES, ...APP_DIRS]))]);
    const lines = status.split(/\r?\n/).filter(Boolean);
    const untracked = lines.filter((l) => l.startsWith('??')).map((l) => l.slice(3).trim());
    // „ M fájl” = módosítva, de nincs stagelve: az index a régi tartalmat írná le.
    const unstaged = lines
      .filter((l) => /^ ?M|^ M/.test(l))
      .map((l) => l.slice(3).trim());
    if (untracked.length) {
      console.log(`! ${untracked.length} fájl nincs a gitben (előbb add hozzá): ${untracked.slice(0, 6).join(', ')}`);
    }
    if (unstaged.length) {
      console.log(
        `! ${unstaged.length} módosított fájl nincs stagelve – futtasd előbb: git add <fájlok>, majd újra a buildet: ${unstaged
          .slice(0, 6)
          .join(', ')}`
      );
    }
  } catch {
    /* a git nem elérhető: marad a csendes build */
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
      // Az index saját magát nem listázhatja: különben minden generálás után
      // más lenne a tartalma (a benne lévő saját sha miatt).
      if (path.posix.basename(rel) === 'index.json') continue;
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
    `✓ update-manifest.json: ${manifest.files.length} fájl (v${manifest.version})`
  );
  console.log(`✓ ${index.folder}/index.json: ${index.files.length} fájl (${index.source})`);
}

module.exports = { buildUpdateManifest, buildMasterIndex, launcherFileList };
