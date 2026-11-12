const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const GAME_EXE = 'ProjectZomboid64.exe';
const AGENT_LIB = 'zbNative';
const AGENT_JAR = 'ZombieBuddy.jar';
const AGENT_DLL = 'zbNative.dll';
const LAUNCHER_JSON = 'ProjectZomboid64.json';
const LAUNCHER_BAT = 'ProjectZomboid64.bat';

// True when the ZombieBuddy agent files sit in the game folder, and whether an
// agent is already configured in the game's own launcher JSON (then we must not
// pass -agentlib again).
function agentStatus(gameDir) {
  const jar = fs.existsSync(path.join(gameDir, AGENT_JAR));
  const dll = fs.existsSync(path.join(gameDir, AGENT_DLL));
  let configured = false;
  try {
    const txt = fs.readFileSync(path.join(gameDir, LAUNCHER_JSON), 'utf8');
    configured = /zbNative|javaagent/i.test(txt);
  } catch {
    // No/ unreadable JSON: treat as not configured.
  }
  return { jar, dll, present: jar && dll, configured };
}

function isSteamRunning() {
  try {
    const out = require('child_process').execFileSync(
      'tasklist',
      ['/FI', 'IMAGENAME eq steam.exe'],
      { encoding: 'utf8', windowsHide: true }
    );
    return /steam\.exe/i.test(out);
  } catch {
    return false;
  }
}

function isGameRunning() {
  try {
    const out = require('child_process').execFileSync(
      'tasklist',
      ['/FI', 'IMAGENAME eq ProjectZomboid64.exe'],
      { encoding: 'utf8', windowsHide: true }
    );
    return /ProjectZomboid64\.exe/i.test(out);
  } catch {
    return false;
  }
}

// A JVM heap (-Xmx) beállítása a játék saját launcher JSON-jában is, hogy a
// Steam-ből indított játék is ugyanannyi memóriát kapjon. Ha a fájl írásvédett
// (Program Files), csak figyelmeztetünk – a parancssori -Xmx akkor is él.
function applyHeapToLauncherJson(gameDir, heapMb) {
  const file = path.join(gameDir, LAUNCHER_JSON);
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return { changed: false, reason: 'A ProjectZomboid64.json nem olvasható.' };
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return { changed: false, reason: 'A ProjectZomboid64.json nem érvényes JSON.' };
  }

  const wanted = `-Xmx${heapMb}m`;
  const vmArgs = Array.isArray(data.vmArgs) ? data.vmArgs : [];
  const filtered = vmArgs.filter((a) => typeof a === 'string' && !/^-Xmx/i.test(a));
  const nextVmArgs = [...filtered, wanted];

  if (
    filtered.length === vmArgs.length &&
    vmArgs.some((a) => typeof a === 'string' && a.toLowerCase() === wanted.toLowerCase())
  ) {
    return { changed: false, file, heapMb };
  }

  data.vmArgs = nextVmArgs;
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    return { changed: true, file, heapMb };
  } catch (err) {
    return {
      changed: false,
      file,
      reason:
        `Nem sikerült beírni a memóriabeállítást ide: ${file} (${err.message}). ` +
        'Indítsd a launchert rendszergazdaként, vagy a parancssori -Xmx így is érvényes.',
    };
  }
}

// A játék Windowson a ProjectZomboid64.bat-on keresztül indul, ezért a valódi
// memóriabeállítás ott van. Ha a fájl írható, ugyanazt a -Xmx értéket írjuk be.
function applyHeapToLauncherBat(gameDir, heapMb) {
  const file = path.join(gameDir, LAUNCHER_BAT);
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return { found: false, changed: false };
  }
  const wanted = `-Xmx${heapMb}m`;
  const re = /-Xmx\d+[mMgG]?/g;
  if (!re.test(raw)) return { found: true, changed: false, file };
  re.lastIndex = 0;
  const next = raw.replace(re, wanted);
  if (next === raw) return { found: true, changed: false, file, heapMb };
  try {
    fs.writeFileSync(file, next, 'utf8');
    return { found: true, changed: true, file, heapMb };
  } catch (err) {
    return {
      found: true,
      changed: false,
      file,
      reason: `Nem sikerült beírni a memóriát a ${LAUNCHER_BAT} fájlba (${err.message}).`,
    };
  }
}

function readHeapFromLauncherJson(gameDir) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(gameDir, LAUNCHER_JSON), 'utf8'));
    const vmArgs = Array.isArray(data.vmArgs) ? data.vmArgs : [];
    const hit = vmArgs.find((a) => typeof a === 'string' && /^-Xmx/i.test(a));
    return hit ? hit.replace(/^-Xmx/i, '') : null;
  } catch {
    return null;
  }
}

// JVM args come first, then `--`, then game args. `--` is only required when JVM
// arguments are present (see PZwiki "Startup parameters").
// A játék a főmenübe indul: nincs `+connect`, a szerverre a játékos a menüből
// csatlakozik (a közvetlen csatlakozás a szerver oldali beállítások miatt
// megbízhatatlan volt).
function buildArgs({ useAgent, heapMb }) {
  const jvmArgs = [];
  if (heapMb) jvmArgs.push(`-Xmx${heapMb}m`);
  // Ha a launcher JSON már tartalmazza az agentet, nem tesszük be újra.
  if (useAgent) jvmArgs.push('-agentlib:' + AGENT_LIB);

  return jvmArgs;
}

async function launchGame({ gameDir, cfg, onLog }) {
  const exe = path.join(gameDir, GAME_EXE);
  if (!fs.existsSync(exe)) throw new Error(`Nem található: ${exe}`);

  const heapMb = Number((cfg && cfg.jvmMaxMb) || 8192) || 8192;
  const st = agentStatus(gameDir);
  const useAgent = st.present && !st.configured;

  const heap = applyHeapToLauncherJson(gameDir, heapMb);
  if (heap.changed) onLog(`Memória beállítva a játék launcherében: -Xmx${heapMb}m`);
  else if (heap.reason) onLog('! ' + heap.reason);

  // A B42 a .bat-ot indítja, nem a JSON-t: ott is be kell állítani a heapet.
  const bat = applyHeapToLauncherBat(gameDir, heapMb);
  if (bat.changed) onLog(`Memória beállítva a ${LAUNCHER_BAT} fájlban: -Xmx${heapMb}m`);
  else if (bat.reason) onLog('! ' + bat.reason);

  const args = buildArgs({ useAgent, heapMb });

  onLog(`Indítás: ${GAME_EXE} ${args.join(' ')}`);
  onLog('• A játék a főmenübe indul – a szerverre a játékban csatlakozz.');
  onLog(`JVM heap: -Xmx${heapMb}m (${(heapMb / 1024).toFixed(1)} GB)`);
  if (useAgent) onLog('ZombieBuddy betöltése: -agentlib:zbNative');
  else if (st.configured) onLog('ZombieBuddy agent már be van állítva a ProjectZomboid64.json fájlban.');
  if (!st.present) {
    onLog('⚠ ZombieBuddy nincs telepítve – a Java modok nem fognak betöltődni. Futtasd a modok telepítését.');
  }
  if (!isSteamRunning()) {
    onLog('⚠ A Steam nem fut – a játék indítása Steam nélkül hibát okozhat. Indítsd el a Steamet.');
  }

  const child = spawn(exe, args, { cwd: gameDir, detached: true, stdio: 'ignore' });
  await new Promise((resolve, reject) => {
    child.once('error', (err) => reject(new Error(`Nem sikerült elindítani a játékot: ${err.message}`)));
    child.once('spawn', resolve);
  });
  child.unref();
  onLog(`✓ Játék elindítva (PID ${child.pid}).`);
  return { pid: child.pid, useAgent, args, heapMb };
}

module.exports = {
  GAME_EXE,
  LAUNCHER_JSON,
  LAUNCHER_BAT,
  agentStatus,
  applyHeapToLauncherJson,
  applyHeapToLauncherBat,
  readHeapFromLauncherJson,
  buildArgs,
  isSteamRunning,
  isGameRunning,
  launchGame,
};
