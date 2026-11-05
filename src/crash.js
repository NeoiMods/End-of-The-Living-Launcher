// Összeomlás-figyelés: ha a Project Zomboid crashelt, a JVM a játékmappába ír
// egy hs_err_pidXXXX.log fájlt. Ezt (és a hozzá tartozó session logokat) a
// launcher felajánlja elküldésre a szerver Discordjára.
//
// Állapot: <userData>/crash-state.json
//   { seenSince: <ms>, reported: { "<név>": <mtime> } }
// A seenSince az első indítás ideje: a korábbi (régi) crash logokat nem
// ajánljuk fel újra meg újra.

const fs = require('fs');
const path = require('path');

const MiB = 1024 * 1024;
// Discord webhook: ~8 MB fájlonként, ezért összesen ennyit küldünk.
const MAX_TOTAL = 7.5 * MiB;

const CRASH_NAME = /^hs_err_pid\d+\.log$/i;

function statePath(userDataDir) {
  return path.join(userDataDir, 'crash-state.json');
}

function loadState(userDataDir) {
  let raw = null;
  try {
    raw = JSON.parse(fs.readFileSync(statePath(userDataDir), 'utf8'));
  } catch {
    raw = null;
  }
  const state = raw && typeof raw === 'object' ? raw : {};
  const reported = state.reported && typeof state.reported === 'object' ? state.reported : {};
  let seenSince = Number(state.seenSince) || 0;
  if (!seenSince) {
    // Első futás: a mostani fájlok a régiek, ezeket nem kínáljuk fel.
    seenSince = Date.now();
    saveState(userDataDir, { seenSince, reported });
  }
  return { seenSince, reported };
}

function saveState(userDataDir, patch) {
  const file = statePath(userDataDir);
  let current = {};
  try {
    current = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    current = {};
  }
  const next = { ...current, ...patch };
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(next, null, 2), 'utf8');
  } catch {
    /* nem kritikus */
  }
  return next;
}

function info(file) {
  try {
    const st = fs.statSync(file);
    if (!st.isFile()) return null;
    return { path: file, name: path.basename(file), size: st.size, mtime: st.mtimeMs };
  } catch {
    return null;
  }
}

// A játékmappában lévő hs_err_pid*.log fájlok közül a legfrissebb.
function newestCrashLog(gameDir, since) {
  if (!gameDir) return null;
  let names = [];
  try {
    names = fs.readdirSync(gameDir);
  } catch {
    return null;
  }
  let best = null;
  for (const name of names) {
    if (!CRASH_NAME.test(name)) continue;
    const f = info(path.join(gameDir, name));
    if (!f || f.mtime <= since) continue;
    if (!best || f.mtime > best.mtime) best = f;
  }
  return best;
}

// A session logjai: console.txt és a legfrissebb DebugLog.
function sessionLogs(zomboidDir, since) {
  const out = [];
  if (!zomboidDir) return out;

  const consoleFile = info(path.join(zomboidDir, 'console.txt'));
  if (consoleFile && consoleFile.mtime > since) out.push(consoleFile);

  try {
    const dir = path.join(zomboidDir, 'Logs');
    const logs = fs
      .readdirSync(dir)
      .filter((n) => /\.txt$/i.test(n))
      .map((n) => info(path.join(dir, n)))
      .filter((f) => f && f.mtime > since)
      .sort((a, b) => b.mtime - a.mtime);
    if (logs.length) out.push(logs[0]);
  } catch {
    /* nincs Logs mappa */
  }
  return out;
}

function isHandled(file, state) {
  const known = state.reported[file.name];
  return known !== undefined && Number(known) === file.mtime;
}

// Megnézi, van-e új crash log. Nem jelöl semmit: a küldést/elvetést a hívó intézi.
function check({ gameDir, zomboidDir, userDataDir }) {
  const state = loadState(userDataDir);
  const primary = newestCrashLog(gameDir, state.seenSince);
  if (!primary || isHandled(primary, state)) return { detected: false };

  // A crash log mindig megy, mellé ami belefér.
  const files = [primary];
  let total = primary.size;
  for (const extra of sessionLogs(zomboidDir, state.seenSince)) {
    if (total + extra.size > MAX_TOTAL) continue;
    files.push(extra);
    total += extra.size;
  }

  return {
    detected: true,
    primary: { name: primary.name, size: primary.size, mtime: primary.mtime },
    files: files.map((f) => ({ name: f.name, size: f.size, mtime: f.mtime, path: f.path })),
    total,
  };
}

// A hs_err első pár sora alapján egy rövid összegzés (a Discord üzenethez).
function summarize(file) {
  let text = '';
  try {
    const fd = fs.openSync(file, 'r');
    try {
      const buffer = Buffer.alloc(4096);
      const read = fs.readSync(fd, buffer, 0, buffer.length, 0);
      text = buffer.slice(0, read).toString('utf8');
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return '';
  }
  const clean = (s) => String(s).replace(/^[#\s]+/, '').trim().slice(0, 160);
  const frame = /Problematic frame:\s*\r?\n\s*([^\r\n]+)/i.exec(text);
  if (frame) return clean(frame[1]);
  const sig = /^#\s*(SIG[A-Z]+[^\r\n]*)/m.exec(text);
  if (sig) return clean(sig[1]);
  const first = /^#\s*([^\r\n]{10,})/m.exec(text);
  return first ? clean(first[1]) : '';
}

// A kiválasztott fájlok beolvasása küldéshez.
function readFiles(files) {
  const out = [];
  let total = 0;
  for (const file of files) {
    const data = fs.readFileSync(file.path);
    total += data.length;
    if (total > MAX_TOTAL) break;
    out.push({ name: file.name, size: data.length, data });
  }
  return out;
}

function markReported(userDataDir, files) {
  const state = loadState(userDataDir);
  const reported = { ...state.reported };
  for (const f of files) reported[f.name] = f.mtime;
  saveState(userDataDir, { reported });
}

module.exports = {
  check,
  summarize,
  readFiles,
  markReported,
  loadState,
  saveState,
  statePath,
  newestCrashLog,
  sessionLogs,
  MAX_TOTAL,
};
