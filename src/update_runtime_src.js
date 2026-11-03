// Frissítés-ellenőrző logika (builder másolja be innen src/update.js).
// Futtatáskor: require('./update_runtime_src') → { checkForUpdate, applyUpdate }.
const { fetchText, downloadFile } = require('./download');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// Repository forrás: előbb a cfg.updateCheckUrl, majd a src/repository.json,
// végül a package.json repository.url (GitHub vetület).
function repoFromConfig(cfg) {
  return cfg && cfg.updateCheckUrl ? String(cfg.updateCheckUrl).trim() : null;
}

function repoFromLocalFile() {
  try {
    const repo = JSON.parse(fs.readFileSync(path.join(__dirname, 'repository.json'), 'utf8'));
    if (repo && repo.url) return String(repo.url).trim();
  } catch { /* kulcs nélkül */ }
  return null;
}

function repoFromPackageJson() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(__dirname), 'package.json'), 'utf8'));
    const repo = pkg && pkg.repository && (pkg.repository.url || pkg.repository);
    if (!repo) return null;
    let url = String(repo);
    if (url.startsWith('git+https://')) url = url.slice('git+https://'.length);
    if (url.endsWith('.git')) url = url.slice(0, -4);
    return url;
  } catch {
    return null;
  }
}

function resolveRepo(cfg) {
  return repoFromConfig(cfg) || repoFromLocalFile() || repoFromPackageJson() || null;
}

// GitHub API: utolsó commit dátuma main ágon (src/update.js, ha létezik).
function latestReleaseCandidate(repoBase) {
  const apiUrl = repoBase.replace(/\/$/, '') + '/commits/main?path=src/update.js';
  return fetchText(apiUrl, {
    headers: { 'User-Agent': 'EndOfTheLivingLauncher', Accept: 'application/vnd.github.v3+json' },
    timeoutMs: 20000,
  }).then(({ status, body }) => {
    if (status !== 200) throw new Error(`GitHub API hiba (${status})`);
    const meta = JSON.parse(body);
    if (!meta || !meta.commit || !meta.commit.committer || !meta.commit.committer.date) {
      throw new Error('A válasz nem tartalmazza a dátumot');
    }
    return new Date(meta.commit.committer.date).getTime();
  });
}

const UPDATE_LOCAL = path.join(require('os').homedir(), '.end_of_the_living_launcher', 'update.json');

function readLocalVersion() {
  try {
    const data = JSON.parse(fs.readFileSync(UPDATE_LOCAL, 'utf8'));
    if (data && typeof data.lastChecked === 'number') return data.lastChecked;
  } catch { /* adathiba */ }
  return 0;
}

function writeLocalVersion(ts) {
  fs.mkdirSync(path.dirname(UPDATE_LOCAL), { recursive: true });
  fs.writeFileSync(UPDATE_LOCAL, JSON.stringify({ lastChecked: ts, checkedAt: new Date().toISOString() }, null, 2), 'utf8');
}

async function checkForUpdate(cfg) {
  const repo = resolveRepo(cfg);
  if (!repo) return { update: false, reason: 'nincs frissítési forrás beállítva' };

  const base = repo.replace(/\/$/, '');
  let lastErr = null;
  for (let i = 0; i < 3; i++) {
    try {
      const remoteTs = await latestReleaseCandidate(base);
      const localTs = readLocalVersion();
      if (remoteTs > localTs) {
        return {
          update: true,
          remoteVersion: new Date(remoteTs).toISOString(),
          remoteUrl: base + '/releases/latest/download/EndOfTheLivingLauncher.zip',
        };
      }
      return { update: false, reason: 'nincs frissítés' };
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  return { update: false, reason: 'a frissítés ellenőrzése sikertelen: ' + (lastErr && lastErr.message) };
}

async function applyUpdate(cfg, res, log, progress) {
  if (!res || !res.remoteUrl) return { ok: false, error: 'Hiányzó letöltési cím.' };
  try {
    progress && progress({ label: 'Frissítés letöltése…' });
    const zipLocal = path.join(require('os').tmpdir(), 'eotl_update_' + Date.now() + '.zip');
    await downloadFile(res.remoteUrl, zipLocal);
    progress && progress({ label: 'Frissítés kicsomagolása…' });

    const extractDir = path.join(require('os').tmpdir(), 'eotl_update_' + Date.now());
    fs.mkdirSync(extractDir, { recursive: true });
    execFileSync('powershell.exe', [
      '-NoProfile',
      '-Command',
      `Expand-Archive -Force -LiteralPath '${zipLocal}' -DestinationPath '${extractDir}'`,
    ], { windowsHide: true, stdio: 'pipe' });

    const newExe = path.join(extractDir, 'EndOfTheLivingLauncher.exe');
    if (!fs.existsSync(newExe)) {
      const alt = path.join(extractDir, 'EndOfTheLivingLauncher', 'EndOfTheLivingLauncher.exe');
      if (fs.existsSync(alt)) {
        fs.mkdirSync(path.dirname(newExe), { recursive: true });
        fs.renameSync(alt, newExe);
      }
    }
    if (!fs.existsSync(newExe)) throw new Error('a frissített futtatható nem található');

    progress && progress({ label: 'A launcher új verziója készen áll.' });
    writeLocalVersion(Date.now());

    // Később: újraindítás + exe csere (jelenleg jelezzük, hogy sikerült)
    return { ok: true, newVersion: res.remoteVersion, restartRequired: true, exePath: newExe };
  } catch (err) {
    try { fs.rmSync(zipLocal, { force: true }); } catch { /* */ }
    return { ok: false, error: err.message };
  }
}

module.exports = { checkForUpdate, applyUpdate };
