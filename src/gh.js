// Egységes GitHub-hozzáférés – tartalék utakkal.
//
// A GitHub néha órákra kiesik (503/504 a api.github.com-on vagy a github.com-on),
// ezért a launcher nem támaszkodhat egyetlen végpontra sem. Ez a modul
// sorrendben próbálja a különböző kiszolgálókat, ismétel hibánál, és ha a
// GitHub API egyáltalán nem elérhető, akkor a repóban tárolt index-fájlból
// (Master/index.json, update-manifest.json) vagy a helyi gyorsítótárból dolgozik.
//
// Fájlok tartalma (ebben a sorrendben):
//   1. raw.githubusercontent.com  – a repó nyers tartalma, API nélkül
//   2. cdn.jsdelivr.net/gh        – független CDN (20 MB alatti fájlokra)
//   3. api.github.com/contents    – Accept: application/vnd.github.raw
//   4. github.com/<repo>/raw/...  – a webes felület
//
// Minden kérés ismételhető: 408, 429, 5xx és hálózati hiba esetén várakozással
// újrapróbáljuk, hogy egy pillanatnyi hiba ne állítsa meg a telepítést.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { fetchText, downloadFile } = require('./download');

const UA = 'EndOfTheLivingLauncher';
const DEFAULT_REPO = 'NeoiMods/End-of-The-Living-Launcher';
const DEFAULT_BRANCH = 'main';
// jsDelivr a 20 MB-nál nagyobb repó-fájlokat nem szolgálja ki.
const CDN_MAX_BYTES = 20 * 1024 * 1024;
const RETRY_DELAYS = [600, 1600, 3500, 6000];
// Csak diagnosztikához/teszthez: a kiszolgálók címe felülírható.
const RAW_BASE = String(process.env.EOTL_RAW_BASE || 'https://raw.githubusercontent.com').replace(/\/+$/, '');
const CDN_BASE = String(process.env.EOTL_CDN_BASE || 'https://cdn.jsdelivr.net').replace(/\/+$/, '');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isTransientStatus(status) {
  return status === 0 || status === 408 || status === 425 || status === 429 || status >= 500;
}

function tokenOf(cfg) {
  return String((cfg && cfg.githubToken) || '').trim();
}

function headers(cfg, accept) {
  const h = { 'User-Agent': UA, Accept: accept || 'application/vnd.github+json' };
  const token = tokenOf(cfg);
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

// --------------------------------------------------------------- kérések

// Egy URL kérése ismétléssel. Nem dob hibát HTTP státuszra (a hívó dönt),
// csak akkor, ha minden próbálkozás hálózati szinten bukott el.
async function fetchTextRetry(url, opts = {}, attempts = RETRY_DELAYS.length + 1) {
  const { headers: hdrs, timeoutMs = 20000 } = opts;
  let lastError = null;
  let lastResponse = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetchText(url, { headers: hdrs, timeoutMs });
      lastResponse = res;
      if (res.status >= 200 && res.status < 300) return res;
      if (!isTransientStatus(res.status)) return res;
    } catch (err) {
      lastError = err;
    }
    if (i < attempts - 1) {
      await sleep(RETRY_DELAYS[Math.min(i, RETRY_DELAYS.length - 1)] + Math.floor(Math.random() * 300));
    }
  }
  if (lastResponse) return lastResponse;
  throw lastError || new Error('hálózati hiba');
}

// GitHub API JSON ismétléssel. Hiba esetén magyar nyelvű üzenetet dob.
async function apiJson(cfg, apiPath, { timeoutMs = 20000, attempts = 3 } = {}) {
  const url = `https://api.github.com${apiPath.startsWith('/') ? apiPath : '/' + apiPath}`;
  const res = await fetchTextRetry(url, { headers: headers(cfg), timeoutMs }, attempts);
  if (res.status === 404) {
    const err = new Error('a GitHub nem találja (HTTP 404)');
    err.status = 404;
    throw err;
  }
  if (res.status === 403 || res.status === 429) {
    throw new Error('a GitHub átmenetileg korlátozza a kéréseket (HTTP ' + res.status + ')');
  }
  if (res.status !== 200) {
    const err = new Error(`GitHub API hiba (HTTP ${res.status})`);
    err.status = res.status;
    throw err;
  }
  try {
    return JSON.parse(res.body);
  } catch {
    throw new Error('a GitHub válasz nem értelmezhető');
  }
}

// ------------------------------------------------------------ fájl-források

function normalizeRepo(repo) {
  return String(repo || DEFAULT_REPO).trim().replace(/^\/+|\/+$/g, '');
}

// Egy repó-fájl lehetséges letöltési címei, sorrendben.
function repoFileUrls({ cfg, repo, file, ref = DEFAULT_BRANCH, size = 0 }) {
  const r = normalizeRepo(repo);
  const clean = String(file).replace(/^\/+/, '');
  const encoded = clean.split('/').map(encodeURIComponent).join('/');
  const list = [
    {
      name: 'raw',
      url: `${RAW_BASE}/${r}/${ref}/${encoded}`,
      headers: { 'User-Agent': UA },
    },
  ];
  if (!size || size <= CDN_MAX_BYTES) {
    list.push({
      name: 'jsdelivr',
      url: `${CDN_BASE}/gh/${r}@${ref}/${encoded}`,
      headers: { 'User-Agent': UA },
    });
  }
  list.push({
    name: 'api',
    url: `https://api.github.com/repos/${r}/contents/${encoded}?ref=${ref}`,
    headers: headers(cfg, 'application/vnd.github.raw'),
  });
  list.push({
    name: 'web',
    url: `https://github.com/${r}/raw/${ref}/${encoded}`,
    headers: { 'User-Agent': UA },
  });
  return list;
}

// Szöveges repó-fájl beolvasása a tartalék utakon (news.json, index fájlok).
// Visszatérés: { ok, body, source, error }
async function fetchRepoText({ cfg, repo, file, ref = DEFAULT_BRANCH, size = 0, attempts = 1 } = {}) {
  let lastError = null;
  for (const mirror of repoFileUrls({ cfg, repo, file, ref, size })) {
    try {
      const res = await fetchTextRetry(
        mirror.url,
        { headers: mirror.headers, timeoutMs: 15000 },
        attempts
      );
      if (res.status === 200 && res.body) {
        return { ok: true, body: res.body, source: mirror.name };
      }
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  return {
    ok: false,
    error: lastError && lastError.message ? lastError.message : 'nem érhető el',
  };
}

async function fetchRepoJson(opts) {
  const res = await fetchRepoText(opts);
  if (!res.ok) return { ok: false, error: res.error };
  try {
    return { ok: true, data: JSON.parse(res.body), source: res.source };
  } catch {
    return { ok: false, error: 'érvénytelen JSON' };
  }
}

// Repó-fájl letöltése a tartalék utakon, méret-ellenőrzéssel.
async function downloadRepoFile({
  cfg,
  repo,
  file,
  ref = DEFAULT_BRANCH,
  dest,
  size = 0,
  onProgress = null,
  log = () => {},
} = {}) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const mirrors = repoFileUrls({ cfg, repo, file, ref, size });
  let lastError = null;
  for (const mirror of mirrors) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        await downloadFile(mirror.url, dest, {
          headers: mirror.headers,
          timeoutMs: 180000,
          onProgress,
        });
        if (size) {
          const stat = fs.statSync(dest);
          if (stat.size !== size) {
            throw new Error(`méret eltérés (${stat.size} ≠ ${size} bájt)`);
          }
        }
        if (mirror.name !== 'raw') log(`  (letöltés innen: ${mirror.name})`);
        return { ok: true, source: mirror.name };
      } catch (err) {
        lastError = err;
        try {
          fs.rmSync(dest, { force: true });
        } catch {
          /* maradhat */
        }
        if (attempt === 0) await sleep(500);
      }
    }
  }
  throw lastError || new Error('a fájl nem tölthető le');
}

// ------------------------------------------------------------- listázás

function cachePath(userDataDir, name) {
  return path.join(userDataDir || '.', `${name}.json`);
}

function readCache(userDataDir, name) {
  try {
    const raw = JSON.parse(fs.readFileSync(cachePath(userDataDir, name), 'utf8'));
    return raw && typeof raw === 'object' ? raw : null;
  } catch {
    return null;
  }
}

function writeCache(userDataDir, name, data) {
  if (!userDataDir) return;
  try {
    fs.writeFileSync(cachePath(userDataDir, name), JSON.stringify({ ...data, savedAt: Date.now() }, null, 2), 'utf8');
  } catch {
    /* a gyorsítótár írása nem kritikus */
  }
}

function itemsFromContents(json, folder) {
  if (!Array.isArray(json)) return null;
  return json
    .filter((item) => item && item.type === 'file')
    .map((item) => ({
      name: item.name,
      size: Number(item.size) || 0,
      id: String(item.sha || item.name),
      path: folder ? `${folder}/${item.name}` : item.name,
      url: item.download_url || '',
      apiUrl: item.url || '',
    }));
}

// A repó egy mappájának listája. Sorrend:
//   1. GitHub API (contents)
//   2. a repóban tárolt index.json (API nélkül is elérhető)
//   3. a legutóbbi jó lista a helyi gyorsítótárból
// Visszatérés: { ok, files, source, warning }
async function listFolder({ cfg, repo, folder, userDataDir, cacheName, ref = DEFAULT_BRANCH } = {}) {
  const cleanFolder = String(folder || '').replace(/^\/+|\/+$/g, '');
  const cacheId = cacheName || `gh-list-${(cleanFolder || 'root').replace(/[^A-Za-z0-9._-]+/g, '-')}`;
  let apiError = null;

  // Az API-t és a repóban tárolt indexet EGYÜTT kérjük le: így az API
  // kimaradása nem lassítja a listázást (a gyorsabb válasz megálljt parancsol),
  // és ha az API jó, azt használjuk.
  const apiTask = (async () => {
    const json = await apiJson(cfg, `/repos/${normalizeRepo(repo)}/contents/${cleanFolder}`, {
      timeoutMs: 5000,
      attempts: 1,
    });
    const files = itemsFromContents(json, cleanFolder);
    if (!files || !files.length) throw new Error('üres lista');
    return files;
  })();
  const manifestTask = fetchRepoJson({
    cfg,
    repo,
    ref,
    file: `${cleanFolder ? cleanFolder + '/' : ''}index.json`,
  });

  const [apiResult, manifest] = await Promise.allSettled([apiTask, manifestTask]).then(([a, m]) => [
    a,
    m.status === 'fulfilled' ? m.value : { ok: false },
  ]);

  if (apiResult.status === 'fulfilled') {
    const files = apiResult.value;
    writeCache(userDataDir, cacheId, { repo: normalizeRepo(repo), folder: cleanFolder, files });
    return { ok: true, files, source: 'api' };
  }
  apiError = apiResult.reason && apiResult.reason.message ? apiResult.reason.message : 'API hiba';

  // 2) A repóban tárolt index (raw / jsDelivr / …)
  if (manifest.ok && manifest.data && Array.isArray(manifest.data.files)) {
    const files = manifest.data.files
      .filter((f) => f && f.name)
      .map((f) => ({
        name: String(f.name),
        size: Number(f.size) || 0,
        id: String(f.sha || f.sha256 || f.name),
        path: `${cleanFolder ? cleanFolder + '/' : ''}${f.name}`,
        url: '',
        apiUrl: '',
      }));
    if (files.length) {
      writeCache(userDataDir, cacheId, { repo: normalizeRepo(repo), folder: cleanFolder, files });
      return { ok: true, files, source: 'manifest', warning: apiError };
    }
  }

  // 3) Helyi gyorsítótár
  const cached = readCache(userDataDir, cacheId);
  if (cached && Array.isArray(cached.files) && cached.files.length) {
    return { ok: true, files: cached.files, source: 'cache', stale: true, warning: apiError };
  }

  return {
    ok: false,
    files: [],
    source: null,
    error: apiError || 'a GitHub mappa nem érhető el',
  };
}

// -------------------------------------------------------------- hashelés

// A repóban a fájlok LF sorvéggel vannak, a Windowson telepített példány CRLF-fel.
// Ezért a tartalmat sorvég-normalizálva hasheljük: így a „változott-e a fájl”
// kérdésre nem ad téves „igen”-t a sorvég-különbség.
function normalizeNewlines(buffer) {
  return Buffer.from(buffer.toString('binary').replace(/\r\n/g, '\n'), 'binary');
}

function sha256Normalized(buffer) {
  return crypto.createHash('sha256').update(normalizeNewlines(buffer)).digest('hex');
}

function hashFile(file) {
  try {
    return sha256Normalized(fs.readFileSync(file));
  } catch {
    return null;
  }
}

module.exports = {
  UA,
  DEFAULT_REPO,
  DEFAULT_BRANCH,
  CDN_MAX_BYTES,
  sleep,
  isTransientStatus,
  headers,
  fetchTextRetry,
  apiJson,
  normalizeRepo,
  repoFileUrls,
  fetchRepoText,
  fetchRepoJson,
  downloadRepoFile,
  listFolder,
  readCache,
  writeCache,
  cachePath,
  sha256Normalized,
  hashFile,
};
