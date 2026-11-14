// Steam állapot + indítás. A ZombieBuddy telepítő csak zárt Steammel fut végig,
// utána viszont a játéknak kell a Steam – ezért külön modul, hogy a telepítő és
// az indító is ugyanezt használja.
const { execFileSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isSteamRunning() {
  try {
    const out = execFileSync('tasklist', ['/FI', 'IMAGENAME eq steam.exe', '/NH'], {
      encoding: 'utf8',
      windowsHide: true,
    });
    return /steam\.exe/i.test(out);
  } catch {
    return false;
  }
}

// A paths-t lustán töltjük: a paths.js → zb-installer lánc miatt a modul szintű
// require itt hiányos exportsot kaphatna.
function steamExe() {
  try {
    const paths = require('./paths');
    const dir = paths.findSteamPath();
    return dir ? path.join(dir, 'steam.exe') : '';
  } catch {
    return '';
  }
}

function startSteam({ onLog = () => {} } = {}) {
  if (isSteamRunning()) return { started: false, running: true };
  const exe = steamExe();
  if (!exe || !fs.existsSync(exe)) {
    onLog('! A Steam nem található – indítsd el kézzel, különben a játék kilép.');
    return { started: false, running: false, error: 'A Steam nem található.' };
  }
  try {
    const child = spawn(exe, ['-silent'], { detached: true, stdio: 'ignore', windowsHide: true });
    child.unref();
    onLog('• A Steam indítása a háttérben…');
    return { started: true, running: false, exe };
  } catch (err) {
    onLog('! A Steam indítása nem sikerült: ' + err.message);
    return { started: false, running: false, error: err.message };
  }
}

async function waitForSteam({ timeoutMs = 60000, onLog = () => {} } = {}) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (isSteamRunning()) return true;
    await sleep(2000);
  }
  onLog('! A Steam 60 mp alatt sem indult el – a játék valószínűleg kilép.');
  return false;
}

// Ha nem fut, elindítja és megvárja (a játék indítása előtt kell).
async function ensureSteam({ onLog = () => {}, timeoutMs = 60000 } = {}) {
  if (isSteamRunning()) return { running: true, started: false };
  const res = startSteam({ onLog });
  if (!res.started && !res.running) return { running: false, started: false, error: res.error };
  const ok = await waitForSteam({ timeoutMs, onLog });
  if (ok) onLog('✓ A Steam fut.');
  return { running: ok, started: true };
}

module.exports = { isSteamRunning, startSteam, waitForSteam, ensureSteam, steamExe };
