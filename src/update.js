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
const gh = require('./gh');

// Egy ígéret felső időkorlátja: ha a GitHub API nem válaszol, ne várjunk rá
// fél percig, mert közben a repóban tárolt indexből már megvan a válasz.
function withTimeout(promise, ms, message) {
  let timer = null;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(message || 'időtúllépés')), ms);
    if (timer.unref) timer.unref();
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

const DEFAULT_REPO = 'NeoiMods/End-of-The-Living-Launcher';
const BRANCH = 'main';
const HTTP_HEADERS = {
  'User-Agent': 'EndOfTheLivingLauncher',
  Accept: 'application/vnd.github+json',
};

// A launchert alkotó fájlok/mappák – ezeket cseréli a frissítés.
// A package.json is cserélődik, különben a launcher fejléce a régi verziót
// mutatná a frissítés után is.
const APP_FILES = [
  'main.js',
  'preload.js',
  'renderer.js',
  'i18n.js',
  'i18n-content.js',
  'i18n-logs.js',
  'index.html',
  'styles.css',
  'news.json',
  'events.json',
  'package.json',
];
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

// A legutóbbi commit adatai. A GitHub API három különböző végpontját is
// próbáljuk, mert kimaradáskor hol az egyik, hol a másik válaszol, és minden
// kérés ismételhető – így egy pillanatnyi 503 nem állítja meg a frissítést.
async function fetchLatestCommit(repo, cfg = {}) {
  const endpoints = [
    { path: `/repos/${repo}/commits/${BRANCH}`, kind: 'commit' },
    { path: `/repos/${repo}/branches/${BRANCH}`, kind: 'branch' },
    { path: `/repos/${repo}/git/refs/heads/${BRANCH}`, kind: 'ref' },
  ];
  let lastError = null;
  let notFound = false;
  for (const endpoint of endpoints) {
    try {
      const data = await gh.apiJson(cfg, endpoint.path, { timeoutMs: 6000, attempts: 1 });
      const parsed = parseCommitPayload(endpoint.kind, data);
      if (parsed) return parsed;
      lastError = new Error('a GitHub válasz nem tartalmaz commitot');
    } catch (err) {
      if (err && err.status === 404) notFound = true;
      lastError = err;
    }
  }
  if (notFound) {
    throw new Error(
      `a repó nem érhető el nyilvánosan (${repo}). Ha privát, a frissítés nem működik.`
    );
  }
  throw lastError || new Error('a GitHub nem adta meg a legutóbbi commitot');
}

function parseCommitPayload(kind, data) {
  if (!data || typeof data !== 'object') return null;
  if (kind === 'commit') {
    if (typeof data.sha !== 'string') return null;
    const commit = data.commit || {};
    return {
      sha: data.sha,
      shortSha: data.sha.slice(0, 7),
      date: (commit.author && commit.author.date) || (commit.committer && commit.committer.date) || null,
      message: String(commit.message || '').split('\n')[0],
    };
  }
  if (kind === 'branch') {
    const sha = data.commit && data.commit.sha;
    if (typeof sha !== 'string') return null;
    const inner = (data.commit && data.commit.commit) || {};
    return {
      sha,
      shortSha: sha.slice(0, 7),
      date: (inner.author && inner.author.date) || null,
      message: String(inner.message || '').split('\n')[0],
    };
  }
  const sha = data.object && data.object.sha;
  if (typeof sha !== 'string') return null;
  return { sha, shortSha: sha.slice(0, 7), date: null, message: '' };
}

// ------------------------------------------------------- frissítés indexből
// Ha a GitHub API nem elérhető, a repóban tárolt update-manifest.json-ból
// (raw.githubusercontent / jsDelivr) dolgozunk: ez fájlonként tartalmazza a
// méretet és a sha256-ot, így API nélkül is eldönthető, változott-e valami,
// és csak a megváltozott fájlokat kell letölteni.
async function fetchUpdateManifest(repo, cfg = {}) {
  const res = await gh.fetchRepoJson({ cfg, repo, ref: BRANCH, file: 'update-manifest.json' });
  if (!res.ok || !res.data || !Array.isArray(res.data.files)) return null;
  return res.data;
}

function changedFilesFromManifest(manifest, appRoot) {
  const changed = [];
  for (const entry of manifest.files) {
    if (!entry || !entry.path) continue;
    const hash = gh.hashFile(path.join(appRoot, String(entry.path)));
    if (!hash || hash !== entry.sha256) {
      changed.push({
        path: String(entry.path),
        size: Number(entry.size) || 0,
        sha256: entry.sha256 || '',
      });
    }
  }
  return changed;
}

// ------------------------------------------------------------- ellenőrzés

// Visszatérés: { ok, update, repo, localSha, remoteSha, remote, reason }
async function checkForUpdate({ cfg = {}, userDataDir, appRoot }) {
  const repo = resolveRepo(cfg, appRoot);
  if (!repo) {
    return { ok: false, update: false, reason: 'nincs beállított GitHub repó' };
  }

  let remote;
  let manifestForFallback = null;
  try {
    // Az API-t és a repóban tárolt indexet egyszerre kérjük: ha az API kiesik,
    // nem kell megvárni a hosszú időtúllépéseket, a válasz már ott van.
    const [commitResult, manifestResult] = await Promise.allSettled([
      withTimeout(fetchLatestCommit(repo, cfg), 7000, 'a GitHub API nem válaszolt időben'),
      fetchUpdateManifest(repo, cfg),
    ]);
    manifestForFallback = manifestResult.status === 'fulfilled' ? manifestResult.value : null;
    if (commitResult.status === 'fulfilled') remote = commitResult.value;
    else throw commitResult.reason;
  } catch (err) {
    // Az API kiesett: a repóban tárolt frissítés-index alapján döntünk.
    const manifest = manifestForFallback || (await fetchUpdateManifest(repo, cfg));
    if (manifest) {
      const files = changedFilesFromManifest(manifest, appRoot);
      const remoteSha = typeof manifest.sha === 'string' ? manifest.sha : null;
      const remoteInfo = {
        sha: remoteSha,
        shortSha: remoteSha ? remoteSha.slice(0, 7) : null,
        date: null,
        message: '',
        via: 'manifest',
      };
      writeState(userDataDir, {
        lastCheckedAt: Date.now(),
        lastError: null,
        remoteSha,
      });
      if (!files.length) {
        return {
          ok: true,
          update: false,
          repo,
          localSha: installedSha(userDataDir, appRoot),
          remoteSha,
          remote: remoteInfo,
          reason: 'naprakész (GitHub API nélkül, fájl-összevetéssel)',
        };
      }
      return {
        ok: true,
        update: true,
        mode: 'files',
        files,
        repo,
        localSha: installedSha(userDataDir, appRoot),
        remoteSha,
        remote: remoteInfo,
        reason: 'új fájlok a GitHubon (GitHub API nélkül)',
      };
    }
    writeState(userDataDir, { lastCheckedAt: Date.now(), lastError: err.message });
    return { ok: false, update: false, repo, reason: err.message };
  }

  let localSha = installedSha(userDataDir, appRoot);

  if (!localSha) {
    // Nincs még frissítési állapot. Ha a build hozott magával alapvonalat
    // (update-baseline.json), az a telepített verzió: így egy régebbi portable
    // csomag már az első indításnál frissül. Fejlesztői futtatásnál nincs
    // alapvonal, ott a jelenlegi commit lesz az alapvonal.
    const buildBase = baselineSha(appRoot);
    if (buildBase) {
      localSha = buildBase;
      writeState(userDataDir, {
        installedSha: buildBase,
        installedAt: Date.now(),
        lastCheckedAt: Date.now(),
      });
    } else {
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
  }

  writeState(userDataDir, {
    lastCheckedAt: Date.now(),
    remoteSha: remote.sha,
    remoteDate: remote.date,
    remoteMessage: remote.message,
    lastError: null,
  });

  // Ha a build saját commitja már a legfrissebb (pl. kézzel felmásolt csomag),
  // akkor nincs mit letölteni – csak az állapotfájlt igazítjuk hozzá.
  if (localSha !== remote.sha && baselineSha(appRoot) === remote.sha) {
    writeState(userDataDir, { installedSha: remote.sha, installedAt: Date.now() });
    return {
      ok: true,
      update: false,
      repo,
      localSha: remote.sha,
      remoteSha: remote.sha,
      remote,
      reason: 'naprakész',
    };
  }

  // Ha a build alapvonala (update-baseline.json) és a telepített commit eltér,
  // a fájlok nem abból a commitból származnak, amit a launcher telepítettnek
  // hisz: a régi frissítők például nem cserélték a package.json-t, ezért a
  // fejlécben régi verziószám ragadt. Egy újratelepítés helyre teszi a fájlokat.
  const state = readState(userDataDir);
  const base = baselineSha(appRoot);
  if (base && state.installedSha && base !== state.installedSha) {
    return {
      ok: true,
      update: true,
      repo,
      localSha,
      remoteSha: remote.sha,
      remote,
      reason: 'a telepített build verziója elavult – újratelepítem',
    };
  }

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
function isLauncherFile(name) {
  const file = String(name || '').replace(/\\/g, '/');
  if (!file) return false;
  if (APP_FILES.includes(file)) return true;
  return APP_DIRS.some((dir) => file === dir || file.startsWith(dir + '/'));
}

async function changesAreOnlyNotes(repo, base, head) {
  if (!base || !head || base === head) return false;
  const url = `https://api.github.com/repos/${repo}/compare/${base}...${head}`;
  try {
    const { status, body } = await gh.fetchTextRetry(
      url,
      { headers: HTTP_HEADERS, timeoutMs: 15000 },
      2
    );
    if (status !== 200) return false;
    const data = JSON.parse(body);
    const files = Array.isArray(data.files) ? data.files : null;
    if (!files || !files.length) return false;
    // Csak akkor kell frissíteni, ha a launchert alkotó fájl változott. Az
    // indexek, a build-szkriptek vagy a dokumentáció nem indokolnak telepítést.
    return files.every((f) => {
      const name = String(f.filename || '');
      return !isLauncherFile(name) || NOTE_FILES.includes(name);
    });
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

// A repóban tárolt index alapján csak a megváltozott fájlokat cseréli le.
// Ez a GitHub API-t és a nagy zipballt sem használja: a fájlok a
// raw.githubusercontent.com-ról (vagy a jsDelivr-ről) jönnek, ami kimaradáskor
// is elérhető, és összesen pár száz KB-ot jelent.
async function applyFileUpdate({ cfg = {}, repo, files, appRoot, userDataDir, res, log, progress }) {
  const changed = [];
  const failed = [];
  let done = 0;
  for (const file of files) {
    done++;
    const rel = String(file.path || '').replace(/^\.?\/+/, '');
    if (!rel || rel.includes('..')) continue;
    if (progress) {
      progress({ label: 'Frissítés letöltése…', done: done - 1, total: files.length });
    }
    const dest = path.join(appRoot, rel);
    try {
      await gh.downloadRepoFile({
        cfg,
        repo,
        ref: BRANCH,
        file: rel,
        dest,
        size: file.size || 0,
        log,
      });
      const hash = gh.hashFile(dest);
      if (file.sha256 && hash && hash !== file.sha256) {
        throw new Error('a letöltött fájl tartalma nem egyezik az indexben lévővel');
      }
      changed.push(rel);
    } catch (err) {
      failed.push({ file: rel, error: err && err.message ? err.message : String(err) });
    }
  }

  const remoteSha = (res && res.remoteSha) || null;
  if (failed.length) {
    writeState(userDataDir, {
      lastCheckedAt: Date.now(),
      lastChanged: changed.length,
      lastError: `${failed.length} fájl nem cserélhető le (${failed
        .slice(0, 3)
        .map((f) => f.file)
        .join(', ')}${failed.length > 3 ? '…' : ''})`,
    });
    return {
      ok: false,
      error: `${failed.length} fájl nem cserélhető le – próbáld újra később`,
      changed: changed.length,
      failed,
    };
  }

  writeState(userDataDir, {
    ...(remoteSha ? { installedSha: remoteSha, installedAt: Date.now() } : {}),
    lastCheckedAt: Date.now(),
    lastChanged: changed.length,
    lastError: null,
  });
  if (remoteSha) {
    try {
      fs.writeFileSync(
        path.join(appRoot, 'update-baseline.json'),
        JSON.stringify({ sha: remoteSha, updatedAt: new Date().toISOString() }, null, 2),
        'utf8'
      );
    } catch {
      /* írásvédett app mappa: az állapotfájl akkor is naprakész */
    }
  }
  if (progress) progress({ label: 'Frissítés kész.' });
  if (!changed.length) {
    log('• Nem volt cserélendő fájl – a verzió megjelölve.');
    return {
      ok: true,
      newVersion: remoteSha ? remoteSha.slice(0, 7) : '',
      remoteSha,
      changed: 0,
      failed,
      restartRequired: false,
    };
  }
  // Ha csak a hírek/események változtak, nincs értelme újraindítani a launchert.
  const restartRequired = changed.some((file) => !NOTE_FILES.includes(file));
  log(
    restartRequired
      ? `✓ ${changed.length} fájl frissítve (GitHub API nélkül, fájlonként).`
      : `✓ ${changed.length} tartalom-fájl frissítve – újraindítás nem kell.`
  );
  return {
    ok: true,
    newVersion: remoteSha ? remoteSha.slice(0, 7) : '',
    remoteSha,
    changed: changed.length,
    failed,
    restartRequired,
  };
}

// Visszatérés: { ok, newVersion, changed, failed, error, restartRequired }
async function applyUpdate({ cfg = {}, userDataDir, appRoot, res, log = () => {}, progress = () => {} }) {
  const repo = (res && res.repo) || resolveRepo(cfg, appRoot);

  // 1) Ha van frissítés-index (vagy azt kaptuk kézhez), fájlonként frissítünk:
  // ez kicsi, gyors, és akkor is működik, amikor a GitHub API vagy a zipball
  // végpont kiesik.
  if (res && Array.isArray(res.files) && res.files.length) {
    return applyFileUpdate({ cfg, repo, files: res.files, appRoot, userDataDir, res, log, progress });
  }
  try {
    const manifest = await fetchUpdateManifest(repo, cfg);
    if (manifest) {
      const changed = changedFilesFromManifest(manifest, appRoot);
      if (!changed.length) {
        const sha = typeof manifest.sha === 'string' ? manifest.sha : null;
        writeState(userDataDir, { installedSha: sha, installedAt: Date.now(), lastError: null });
        log('✓ Nincs eltérő fájl a repóhoz képest – a verzió megjelölve.');
        return { ok: true, newVersion: sha ? sha.slice(0, 7) : '', remoteSha: sha, changed: 0, failed: [], restartRequired: false };
      }
      return applyFileUpdate({
        cfg,
        repo,
        files: changed,
        appRoot,
        userDataDir,
        res: { ...res, remoteSha: manifest.sha || (res && res.remoteSha) },
        log,
        progress,
      });
    }
  } catch (err) {
    log('! Frissítés-index nem elérhető (' + (err && err.message ? err.message : err) + ') – zipball következik.');
  }
  const stamp = Date.now();
  const workDir = path.join(os.tmpdir(), `eotl-update-${stamp}`);
  const zipPath = path.join(workDir, 'update.zip');
  const extractDir = path.join(workDir, 'extracted');

  try {
    fs.mkdirSync(workDir, { recursive: true });

    progress({ label: 'Frissítés letöltése…' });
    log(`Frissítés letöltése: ${repo} (${BRANCH})`);
    // A zipball három különböző kiszolgálóról elérhető – kimaradáskor a
    // codeload.github.com még akkor is megy, amikor a github.com nem.
    const zipMirrors = [
      { name: 'api', url: `https://api.github.com/repos/${repo}/zipball/${BRANCH}`, headers: HTTP_HEADERS },
      { name: 'codeload', url: `https://codeload.github.com/${repo}/zip/refs/heads/${BRANCH}`, headers: { 'User-Agent': 'EndOfTheLivingLauncher' } },
      { name: 'web', url: `https://github.com/${repo}/archive/refs/heads/${BRANCH}.zip`, headers: { 'User-Agent': 'EndOfTheLivingLauncher' } },
    ];
    let zipError = null;
    let zipDone = false;
    for (const mirror of zipMirrors) {
      for (let attempt = 0; attempt < 2 && !zipDone; attempt++) {
        try {
          await downloadFile(mirror.url, zipPath, {
            headers: mirror.headers,
            timeoutMs: 180000,
            onProgress: (received, totalBytes) =>
              progress({
                label: 'Frissítés letöltése',
                done: received,
                total: totalBytes || 0,
              }),
          });
          zipDone = true;
          if (mirror.name !== 'api') log(`  (letöltés innen: ${mirror.name})`);
        } catch (err) {
          zipError = err;
          try {
            fs.rmSync(zipPath, { force: true });
          } catch {
            /* maradhat */
          }
          await sleep(500);
        }
      }
      if (zipDone) break;
    }
    if (!zipDone) throw zipError || new Error('a frissítés nem tölthető le');

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

    // Ha bármelyik fájlt nem sikerült lecserélni (zárolt fájl, jogosultság),
    // nem jelöljük készre a frissítést: különben a következő indítás már
    // naprakésznek hinné a launchert, és a félkész állapot megmaradna.
    if (failed.length) {
      writeState(userDataDir, {
        lastCheckedAt: Date.now(),
        lastChanged: changed.length,
        lastError: `${failed.length} fájl nem cserélhető le (${failed
          .slice(0, 3)
          .map((f) => f.file)
          .join(', ')}${failed.length > 3 ? '…' : ''})`,
      });
      return {
        ok: false,
        error: `${failed.length} fájl nem cserélhető le – zárd be a launchert, és indítsd újra`,
        changed: changed.length,
        failed,
      };
    }

    writeState(userDataDir, {
      installedSha: remoteSha,
      installedAt: Date.now(),
      lastCheckedAt: Date.now(),
      lastChanged: changed.length,
      lastError: null,
    });
    // Az app mappájában lévő alapvonal (crash logokhoz, első indításhoz) is
    // kövesse a telepített commitot, különben a build commitja ragad benne.
    try {
      fs.writeFileSync(
        path.join(appRoot, 'update-baseline.json'),
        JSON.stringify({ sha: remoteSha, updatedAt: new Date().toISOString() }, null, 2),
        'utf8'
      );
    } catch {
      /* ha az app mappa írásvédett, az állapotfájl akkor is naprakész */
    }

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
  APP_FILES,
  APP_DIRS,
  isLauncherFile,
  changesAreOnlyNotes,
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
