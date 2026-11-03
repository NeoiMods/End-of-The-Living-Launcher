const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const modinfo = require('./modinfo');

// A ZombieBuddy minden ismeretlen/új Java mod JAR-ra rákérdez indításkor.
// A jóváhagyások a %USERPROFILE%\.zombie_buddy\mod_approvals.json fájlban
// élnek (formatVersion 2), és pusztán a JAR SHA-256 hash-e alapján
// döntöttek (lásd: JarDecisionTable). Itt minden telepített Java modot
// előre jóváhagyunk, hogy a játékos ne kapjon kérdést.

const VERSION_FOLDER_RE = /^\d+(\.\d+)*$/;
const CLIENT_SKIP_RE = /media\/java\/server\//i;

function approvalsFile() {
  return path.join(os.homedir(), '.zombie_buddy', 'mod_approvals.json');
}

function readInfoKeys(modInfoPath, keyRe) {
  try {
    const txt = fs.readFileSync(modInfoPath, 'utf8');
    const out = [];
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(keyRe);
      if (m && m[1] && m[1].trim()) out.push(m[1].trim());
    }
    return out;
  } catch {
    return [];
  }
}

// A mod.info-ban szereplő javaJarFile értékek (a szerveres kliens platformra
// nem valókat kihagyva).
function javaJarFiles(mod) {
  const all = readInfoKeys(mod.modInfoPath, /^\s*javaJarFile\d*\s*=\s*(.+?)\s*$/i);
  const client = all.filter((p) => !CLIENT_SKIP_RE.test(p));
  return (client.length ? client : all).filter((p) => /\.jar$/i.test(p));
}

// A JAR elérési útjának feloldása: mod.info mellett, a mod gyökerében, illetve
// a verzió-mappában is próbálkozunk (a ZombieBuddy parse/parseMerged logikája).
function resolveJar(mod, jarFile) {
  const infDir = path.dirname(mod.modInfoPath);
  const baseName = path.basename(infDir);
  const candidates = [path.join(infDir, jarFile)];
  if (infDir !== mod.modDir) candidates.push(path.join(mod.modDir, jarFile));
  if (VERSION_FOLDER_RE.test(baseName)) {
    // common/mod.info → a JAR a verzió mappában (parseMerged)
    candidates.push(path.join(mod.modDir, baseName, jarFile));
  }
  for (const c of candidates) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch {
      // Próbáljuk a következőt.
    }
  }
  return null;
}

function sha256File(file) {
  return new Promise((resolve, reject) => {
    const h = crypto.createHash('sha256');
    const s = fs.createReadStream(file);
    s.on('error', reject);
    s.on('data', (c) => h.update(c));
    s.on('end', () => resolve(h.digest('hex')));
  });
}

function workshopIdFromPath(p) {
  const m = String(p).replace(/\\/g, '/').match(/\/content\/\d+\/(\d+)\//i);
  return m ? Number(m[1]) : null;
}

function loadApprovals(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (data && Array.isArray(data.mods)) return data;
  } catch {
    // Nincs vagy hibás fájl – újrakezdjük.
  }
  return { formatVersion: 2, mods: [] };
}

// roots: azok a mappák, amiket átvizsgálunk (Zomboid/mods + workshop tételek).
// enabledIds: csak a ténylegesen engedélyezett modokat hagyjuk jóvá.
async function preApproveJavaMods({ roots, enabledIds, onLog = () => {}, file: customFile = null }) {
  const file = customFile || approvalsFile();
  const wanted = new Set((enabledIds || []).map((x) => String(x).toLowerCase()));
  const entries = [];
  const seenHashes = new Set();

  for (const root of roots) {
    let found = [];
    try {
      found = modinfo.discoverMods(root, 6);
    } catch {
      continue;
    }
    for (const mod of found) {
      if (wanted.size && !wanted.has(String(mod.id).toLowerCase())) continue;
      const jarFiles = javaJarFiles(mod);
      if (jarFiles.length === 0) continue;

      let jarPath = null;
      for (const jf of jarFiles) {
        jarPath = resolveJar(mod, jf);
        if (jarPath) break;
      }
      if (!jarPath) {
        onLog(`  ! ${mod.id}: a Java mod JAR nem található – ezt a ZombieBuddy kérdezi majd meg.`);
        continue;
      }

      let hash;
      try {
        hash = await sha256File(jarPath);
      } catch (err) {
        onLog(`  ! ${mod.id}: nem sikerült olvasni a JAR-t (${err.message}).`);
        continue;
      }
      if (seenHashes.has(hash)) continue;
      seenHashes.add(hash);

      const entry = {
        id: mod.id,
        jar_hash: hash,
        decision: true,
        time: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
      };
      const wsId = workshopIdFromPath(mod.modInfoPath);
      if (wsId) entry.workshop_id = wsId;
      entries.push(entry);
    }
  }

  if (entries.length === 0) {
    onLog('Nincs előre jóváhagyandó Java mod a csomagban.');
    return { count: 0, file };
  }

  const data = loadApprovals(file);
  const newHashes = new Set(entries.map((e) => e.jar_hash));
  const kept = data.mods.filter((m) => m && m.jar_hash && !newHashes.has(m.jar_hash));
  data.formatVersion = 2;
  data.mods = [...kept, ...entries];

  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  onLog(`✓ ${entries.length} Java mod előre jóváhagyva (nem kérdez rájuk a ZombieBuddy): ${file}`);
  return { count: entries.length, file };
}

module.exports = { preApproveJavaMods, approvalsFile };
