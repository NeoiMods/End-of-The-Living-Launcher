// A ZombieBuddy agent két változatban él a játék mappájában, ugyanazokkal a
// fájlnevekkel (ZombieBuddy.jar + zbNative.dll):
//
//   • hivatalos (ZombieBuddy installer) – az egyjátékos Blackout modpackhoz,
//   • End of The Living saját csomag – a szerveres játékhoz.
//
// Ezért a launcher mindkettőt eltárolja a saját userData mappájában, és
// indításkor a módhoz tartozót teszi a játék mellé. Így a Blackout Protocol
// hivatalos ZombieBuddy-ja nem sérül: váltáskor visszakerül a helyére.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILES = ['ZombieBuddy.jar', 'zbNative.dll'];
const KINDS = ['official', 'eotl'];

function cacheRoot(userDataDir) {
  return path.join(userDataDir, 'zb-agents');
}

function kindDir(userDataDir, kind) {
  return path.join(cacheRoot(userDataDir), kind);
}

function hashFile(file) {
  try {
    return crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex');
  } catch {
    return null;
  }
}

function hashesIn(dir) {
  const out = {};
  for (const f of FILES) {
    const h = hashFile(path.join(dir, f));
    if (!h) return null;
    out[f] = h;
  }
  return out;
}

function gameHashes(gameDir) {
  return hashesIn(gameDir);
}

function sameHashes(a, b) {
  if (!a || !b) return false;
  return FILES.every((f) => a[f] && a[f] === b[f]);
}

function cached(userDataDir, kind) {
  return hashesIn(kindDir(userDataDir, kind));
}

// Eltárolja a játék mappában lévő agent fájlokat a megadott fajtához.
function remember({ userDataDir, gameDir, kind, log = () => {} }) {
  const src = gameHashes(gameDir);
  if (!src) return { ok: false, reason: 'nincs agent a játék mappában' };
  const dir = kindDir(userDataDir, kind);
  try {
    fs.mkdirSync(dir, { recursive: true });
    for (const f of FILES) fs.copyFileSync(path.join(gameDir, f), path.join(dir, f));
  } catch (err) {
    log(`! ZombieBuddy (${kind}) mentése nem sikerült: ${err.message}`);
    return { ok: false, reason: err.message };
  }
  return { ok: true, kind, hashes: src };
}

// Melyik ismert változat van most a játék mappában?
function detect({ userDataDir, gameDir }) {
  const current = gameHashes(gameDir);
  if (!current) return null;
  for (const kind of KINDS) {
    if (sameHashes(current, cached(userDataDir, kind))) return kind;
  }
  return null;
}

// A módhoz tartozó agentet teszi a játék mellé. Ha a mostani ismeretlen
// (kézzel telepített), előbb elmentjük, hogy semmi ne vesszen el.
function sync({ userDataDir, gameDir, mode, log = () => {} }) {
  const want = mode === 'blackout' ? 'official' : 'eotl';
  const current = detect({ userDataDir, gameDir });

  if (current === want) return { ok: true, changed: false, kind: want };

  const target = cached(userDataDir, want);
  if (!target) {
    // Nincs eltárolt változat: nem írunk felül semmit.
    return { ok: true, changed: false, kind: current, skipped: `nincs eltárolt ${want} agent` };
  }

  if (current === null) {
    if (want === 'official') {
      // Ismeretlen (pl. újabb hivatalos telepítő vagy kézi telepítés): az
      // egyjátékos módban nem írjuk fölül – ez védi a Blackout Protocolt.
      // Az eltárolt hivatalos példányt sem írjuk felül, csak félretesszük.
      remember({ userDataDir, gameDir, kind: 'unknown', log });
      return { ok: true, changed: false, kind: current, adopted: true };
    }
    // Szerveres módhoz kell az EOTL agent: az ismeretlent félretesszük.
    remember({ userDataDir, gameDir, kind: 'unknown', log });
  }

  const srcDir = kindDir(userDataDir, want);
  try {
    for (const f of FILES) fs.copyFileSync(path.join(srcDir, f), path.join(gameDir, f));
  } catch (err) {
    log(`! ZombieBuddy (${want}) telepítése nem sikerült: ${err.message}`);
    return { ok: false, changed: false, error: err.message };
  }

  log(
    want === 'eotl'
      ? '✓ ZombieBuddy: az End of The Living saját agentje van a játék mellett.'
      : '✓ ZombieBuddy: a hivatalos agent visszaállítva (Blackout Protocol).'
  );
  return { ok: true, changed: true, kind: want };
}

// Csak olvasás: melyik változat van bent, és mi van eltárolva.
function status({ userDataDir, gameDir }) {
  return {
    current: detect({ userDataDir, gameDir }),
    cached: {
      official: !!cached(userDataDir, 'official'),
      eotl: !!cached(userDataDir, 'eotl'),
    },
  };
}

module.exports = { FILES, KINDS, cacheRoot, kindDir, remember, detect, sync, status };
