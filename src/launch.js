const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const steam = require('./steam');

const GAME_EXE = 'ProjectZomboid64.exe';
const AGENT_LIB = 'zbNative';
// A PZO motor (PZ Optimizer) saját belépője és natív agentje. Enélkül a JSON-ban
// a motor nem tölt be, hiába van bent a PZOptimEngine.jar.
const PZO_MAIN_CLASS = 'com/pzoptimizer/PZOEntrypoint';
const PZO_ENGINE_JAR = 'PZOptimEngine.jar';
const PZO_NATIVE_DLL = 'pzo_native64.dll';
const PZO_AGENT_LIB = 'pzo_native64';
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

// A B42 játékot a java.exe viszi (a ProjectZomboid64.exe csak elindítja és
// kilép), ezért a futást a JVM parancssora alapján is fel kell ismerni – enélkül
// a launcher a játékot azonnal „bezárultnak” látja.
// Sorformátum: név|indulás (ISO)|parancssor
function gameProcessList() {
  try {
    // A 42.22.2 Windowson magában a ProjectZomboid64.exe-ben viszi a JVM-et (nincs
    // külön java.exe), ezért a futást az ablak megléte is jelzi: egy élő játéknak
    // van „Project Zomboid” ablaka, a beragadt/kilépett példánynak nincs.
    const script =
      "$ErrorActionPreference='SilentlyContinue'; " +
      "$t=@{}; Get-Process | ForEach-Object { if ($_.MainWindowTitle) { $t[[int]$_.Id]=1 } }; " +
      "Get-CimInstance Win32_Process | Where-Object { $_.Name -match 'java|ProjectZomboid' } | " +
      "ForEach-Object { $_.Name + '|' + $_.CreationDate.ToString('o') + '|' + $(if ($t[[int]$_.ProcessId]) { '1' } else { '0' }) + '|' + $_.CommandLine }";
    const out = require('child_process').execFileSync('powershell', ['-NoProfile', '-Command', script], {
      encoding: 'utf8',
      windowsHide: true,
      timeout: 12000,
      maxBuffer: 1024 * 1024,
    });
    return String(out)
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

// „név|indulás|van ablak (0/1)|parancssor” bontása (a parancssorban magában is
// lehet |, ezért csak az első három elválasztónál vágunk).
function splitProcessLine(line) {
  const parts = line.split('|');
  if (parts.length < 4) return { name: line, startedAt: 0, hasWindow: false, cmd: '' };
  const at = Date.parse(parts[1]);
  return {
    name: parts[0],
    startedAt: Number.isFinite(at) ? at : 0,
    hasWindow: parts[2] === '1',
    cmd: parts.slice(3).join('|'),
  };
}

// A JVM-es ellenőrzés PowerShellt indít (~0,3 mp), ezért gyorsítótárazzuk: a
// felület 10-15 mp-enként kérdezi az állapotot, a játék betöltése közben pedig
// nem akarunk fölösleges process-listázást a gépre rakni.
const RUN_CACHE_MS = 12000;
let gameRunCache = { at: 0, running: false };

// A B42 indító exe néhány másodperc alatt átadja a helyét a JVM-nek, de nagy
// modpacknél ez akár percekig is eltarthat. Ha viszont az exe megmarad JVM
// nélkül, az egy beragadt/halott indító: azt nem tekintjük futó játéknak,
// különben a launcher soha nem engedné újraindítani a játékot.
const EXE_STARTUP_GRACE_MS = 3 * 60 * 1000;

// force: a gyorsítótár megkerülése (pl. közvetlenül indítás után).
function isGameRunning(force = false) {
  if (!force && Date.now() - gameRunCache.at < RUN_CACHE_MS) return gameRunCache.running;

  const rows = gameProcessList().map(splitProcessLine);
  let running = rows.some(
    (p) => /^java/i.test(p.name) && /zombie|projectzomboid/i.test(p.cmd)
  );

  if (!running) {
    // Nincs JVM, de indító/futtató exe van. Két eset futó játék:
    //  • van ablaka (42.22.2 óta az exe viszi a JVM-et, ez a valódi játék), vagy
    //  • most indult (a betöltés alatt még nincs ablak).
    // A beragadt, ablak nélküli régi exe nem számít futónak, különben soha nem
    // lehetne újraindítani a játékot.
    running = rows
      .filter((p) => /^ProjectZomboid64\.exe/i.test(p.name))
      .some(
        (p) => p.hasWindow || !p.startedAt || Date.now() - p.startedAt < EXE_STARTUP_GRACE_MS
      );
  }

  gameRunCache = { at: Date.now(), running };
  return running;
}

// A Blackout config mellé adott launcher sablon. A launchert magát NEM futtatjuk:
// csak a benne leírt JVM kapcsolókat, classpathet és belépő osztályt vesszük át a
// ProjectZomboid64.json-ba, mert a játék (és a Steam) abból indul.
const LAUNCHER_TEMPLATE = path.join(__dirname, '..', 'assets', 'blackout', 'launcher', 'ProjectZomboid64.bat.txt');

function readLauncherTemplate() {
  let raw;
  try {
    raw = fs.readFileSync(LAUNCHER_TEMPLATE, 'utf8');
  } catch {
    return null;
  }

  const grab = (name) => {
    const m = raw.match(new RegExp('^\\s*SET\\s+' + name + '=(.*)$', 'im'));
    return m ? m[1].trim() : '';
  };

  const pzArgs = grab('PZ_ARGS');
  if (!pzArgs) return null;

  // Classpath: "./;PZOptimEngine.jar;ZombieBuddy.jar;projectzomboid.jar"
  const classpath = grab('PZ_CLASSPATH')
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s === './' || s === '.' ? '.' : s));

  // A PZ_ARGS szavai, a `-cp` és a rá következő classpath token nélkül.
  const tokens = pzArgs.split(/\s+/).filter(Boolean);
  const vmArgs = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.toLowerCase() === '-cp') {
      i++;
      continue;
    }
    if (/%PZ_CLASSPATH%/i.test(t)) continue;
    // A .bat-ban ez csak a konzolos indításhoz kell; a játék ablakos módban fut.
    if (/^-Djava\.awt\.headless=/i.test(t)) continue;
    vmArgs.push(t);
  }

  // A .bat az agentet környezeti változóban (_JAVA_OPTIONS) adja át – a JSON-ba
  // viszont be kell írni, különben a ZombieBuddy nem tölt be.
  for (const t of grab('_JAVA_OPTIONS').split(/\s+/).filter(Boolean)) {
    if (!vmArgs.includes(t)) vmArgs.push(t);
  }

  const mainMatch = raw.match(/java\.exe"?\s+%PZ_ARGS%\s+([\w.$/]+)/i);
  const mainClass = mainMatch ? mainMatch[1].replace(/\./g, '/') : PZO_MAIN_CLASS;

  return { vmArgs, classpath, mainClass, file: LAUNCHER_TEMPLATE };
}

// A JVM heap (-Xmx) beállítása a játék saját launcher JSON-jában is, hogy a
// Steam-ből indított játék is ugyanannyi memóriát kapjon. Ha a fájl írásvédett
// (Program Files), csak figyelmeztetünk – a parancssori -Xmx akkor is él.
function applyHeapToLauncherJson(gameDir, heapMb, { zgc = false } = {}) {
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

  const wanted = [`-Xms${heapMb}m`, `-Xmx${heapMb}m`].concat(zgc ? ['-XX:+UseZGC'] : []);

  // A játék a fő vmArgs-hoz hozzáfűzi a Windows-verzióhoz tartozó vmArgs-ot is.
  // Ha ott másik GC marad (pl. -XX:+UseG1GC), a JVM ezt írja ki és nem indul:
  // „Multiple garbage collectors selected”. Ezért MINDEN listából kivesszük a
  // GC-választó kapcsolókat, és csak a fő listába tesszük be a kívántat.
  const GC_FLAG = /^-XX:\+Use(G1GC|ParallelGC|SerialGC|ConcMarkSweepGC|ShenandoahGC|ZGC|EpsilonGC)/i;
  const G1_ONLY = /^-XX:(InitiatingHeapOccupancyPercent|G1ReservePercent|G1HeapRegionSize|G1NewSizePercent|G1MaxNewSizePercent|MaxGCPauseMillis|ParallelGCThreads|ConcGCThreads|GCTimeRatio)=/i;
  const G1_TUNING = /^-XX:\+(UseStringDeduplication|UseG1GC)/i;
  const stripGc = (a) =>
    typeof a === 'string' && !GC_FLAG.test(a) && !G1_ONLY.test(a) && !G1_TUNING.test(a);

  const fileVmArgs = Array.isArray(data.vmArgs) ? data.vmArgs : [];
  // A config launcher sablonja az elsődleges forrás; ha nincs, a JSON saját
  // listájából dolgozunk (a régi viselkedés).
  const tpl = readLauncherTemplate();
  const baseVmArgs = tpl && tpl.vmArgs.length ? tpl.vmArgs : fileVmArgs;
  const filtered = baseVmArgs.filter((a) => typeof a === 'string' && !/^-Xm[sx]/i.test(a) && stripGc(a));
  let nextVmArgs = [...filtered, ...wanted];

  // A PZO motor csak akkor tölt be, ha a launcher JSON-ben benne van a saját
  // mainClass-a, a classpath-ja és a natív agentje. A ZombieBuddy agentje
  // ugyanígy kell. Ezeket minden indításnál ellenőrizzük és pótoljuk, mert a
  // telepítők (PZO / ZombieBuddy) néha felülírják a fájlt.
  const added = [];
  const hasFile = (name) => {
    try {
      return fs.existsSync(path.join(gameDir, name));
    } catch {
      return false;
    }
  };
  const hasArg = (list, re) => list.some((a) => typeof a === 'string' && re.test(a));

  const pzoJar = hasFile(PZO_ENGINE_JAR);
  const pzoNative = hasFile(PZO_NATIVE_DLL);
  const zbJar = hasFile(AGENT_JAR);
  const zbNative = hasFile(AGENT_DLL);

  if (tpl && pzoJar) {
    // A sablonból: belépő osztály és classpath (PZO motor + ZombieBuddy + játék).
    if (String(data.mainClass || '') !== tpl.mainClass) {
      data.mainClass = tpl.mainClass;
      added.push('mainClass');
    }
    const cp = Array.isArray(data.classpath) ? data.classpath.filter((x) => typeof x === 'string') : [];
    if (tpl.classpath.length && tpl.classpath.join('\n') !== cp.join('\n')) {
      data.classpath = tpl.classpath;
      added.push('classpath');
    }
  } else if (pzoJar) {
    if (String(data.mainClass || '') !== PZO_MAIN_CLASS) {
      data.mainClass = PZO_MAIN_CLASS;
      added.push('mainClass');
    }

    const desiredCp = ['.', PZO_ENGINE_JAR]
      .concat(zbJar ? [AGENT_JAR] : [])
      .concat(['projectzomboid.jar']);
    const cp = Array.isArray(data.classpath) ? data.classpath.filter((x) => typeof x === 'string') : [];
    const extras = cp.filter((x) => !desiredCp.includes(x));
    const nextCp = [...desiredCp, ...extras];
    if (nextCp.join('\n') !== cp.join('\n')) {
      data.classpath = nextCp;
      added.push('classpath');
    }
  }

  if (pzoJar && pzoNative && !hasArg(nextVmArgs, /^-agentlib:pzo_native64$/i)) {
    nextVmArgs.push('-agentlib:' + PZO_AGENT_LIB);
    added.push('-agentlib:' + PZO_AGENT_LIB);
  }

  if (zbJar && zbNative && !hasArg(nextVmArgs, /^-agentlib:zbNative$/i)) {
    nextVmArgs.push('-agentlib:' + AGENT_LIB);
    added.push('-agentlib:' + AGENT_LIB);
  }

  // A windows alatti listákból is kivesszük a GC-kapcsolókat (és a heapet).
  let nestedChanged = false;
  const fixNested = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (const [key, val] of Object.entries(obj)) {
      if (key === 'vmArgs' && Array.isArray(val)) {
        const cleaned = val.filter((a) => typeof a === 'string' && !/^-Xm[sx]/i.test(a) && stripGc(a));
        if (cleaned.length !== val.length) {
          obj[key] = cleaned;
          nestedChanged = true;
        }
      } else if (val && typeof val === 'object') {
        fixNested(val);
      }
    }
  };
  fixNested(data.windows);

  const sameVm =
    nextVmArgs.length === fileVmArgs.length && nextVmArgs.every((a, i) => a === fileVmArgs[i]);
  const same = !nestedChanged && added.length === 0 && sameVm;
  if (same) return { changed: false, file, heapMb, added };

  data.vmArgs = nextVmArgs;
  try {
    // Írás előtt levesszük az írásvédelmet (előző körből maradhat).
    try {
      fs.chmodSync(file, 0o644);
    } catch {
      // Ha nem megy, a writeFileSync úgyis jelzi.
    }
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    // Csak ZGC maradjon: a fájlt írásvédetté tesszük, így a PZO (vagy bármi más)
    // nem tudja visszaírni a G1-et a következő indításig.
    if (zgc) {
      try {
        fs.chmodSync(file, 0o444);
      } catch {
        // Best effort: ha nem megy, a következő indítás úgyis javít.
      }
    }
    return { changed: true, file, heapMb, locked: zgc, added };
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
// A B42 a .bat-on keresztül indul, ezért a JVM beállítások ott élnek. Az
// egyjátékos (Blackout) indításnál a modpackhoz ajánlott beállítást írjuk be:
// -Xms = -Xmx (előre lefoglalt heap) és ZGC (nincs hosszú GC-megállás).
function applyHeapToLauncherBat(gameDir, heapMb, { zgc = false } = {}) {
  const file = path.join(gameDir, LAUNCHER_BAT);
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return { found: false, changed: false };
  }

  const xmx = `-Xmx${heapMb}m`;
  const xms = `-Xms${heapMb}m`;
  let next = raw;

  // -Xmx cseréje (ha nincs, a java hívás elé tesszük).
  if (/-Xmx\d+[mMgG]?/.test(next)) next = next.replace(/-Xmx\d+[mMgG]?/g, xmx);
  else next = next.replace(/(java(?:\.exe)?\s)/i, `$1${xmx} `);

  // -Xms: ha van, cseréljük; ha nincs, az -Xmx elé kerül.
  if (/-Xms\d+[mMgG]?/.test(next)) next = next.replace(/-Xms\d+[mMgG]?/g, xms);
  else next = next.replace(/-Xmx/g, `${xms} -Xmx`);

  if (zgc) {
    // Egyszerre csak egy GC lehet bekapcsolva: a régit kivesszük.
    next = next.replace(/-XX:\+Use(G1GC|ParallelGC|SerialGC|ConcMarkSweepGC|ShenandoahGC)/g, '');
    // G1-re hangolt kapcsolók ZGC mellé nem valók – kiszedjük őket is.
    next = next.replace(
      /-XX:(InitiatingHeapOccupancyPercent|G1ReservePercent|G1HeapRegionSize|MaxGCPauseMillis|ParallelGCThreads|ConcGCThreads)=\S+/g,
      ''
    );
    next = next.replace(/-XX:\+UseStringDeduplication/g, '');
    if (!/-XX:\+UseZGC/.test(next)) next = next.replace(/-Xmx\d+[mMgG]?/g, (m) => `${m} -XX:+UseZGC`);
    next = next.replace(/[ \t]{2,}/g, ' ');
  }

  const args = [xms, xmx].concat(zgc ? ['-XX:+UseZGC'] : []).join(' ');
  if (next === raw) return { found: true, changed: false, file, heapMb, args };
  try {
    fs.writeFileSync(file, next, 'utf8');
    return { found: true, changed: true, file, heapMb, args };
  } catch (err) {
    return {
      found: true,
      changed: false,
      file,
      reason: `Nem sikerült beírni a memóriát a ${LAUNCHER_BAT} fájlba (${err.message}).`,
    };
  }
}

// A launcher JSON összes GC-választó kapcsolója (fő lista + windows szekciók).
function launcherGcFlags(gameDir) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(gameDir, LAUNCHER_JSON), 'utf8'));
    const lists = [Array.isArray(data.vmArgs) ? data.vmArgs : []];
    const walk = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      for (const [key, val] of Object.entries(obj)) {
        if (key === 'vmArgs' && Array.isArray(val)) lists.push(val);
        else if (val && typeof val === 'object') walk(val);
      }
    };
    walk(data.windows);
    return lists.flat().filter((a) => typeof a === 'string' && /^-XX:\+Use\w+GC/i.test(a));
  } catch {
    return [];
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

async function launchGame({ gameDir, cfg, onLog, zgc = true }) {
  // Csak ZGC: a PZO/optimalizáló G1-re állítja a JSON-t, azt minden indításkor
  // visszaállítjuk ZGC-re, és a fájlt írásvédetté tesszük, hogy ne írja át.
  zgc = true;
  const exe = path.join(gameDir, GAME_EXE);
  if (!fs.existsSync(exe)) throw new Error(`Nem található: ${exe}`);

  const heapMb = Number((cfg && cfg.jvmMaxMb) || 8192) || 8192;

  const heap = applyHeapToLauncherJson(gameDir, heapMb, { zgc });
  if (heap.changed) onLog(`Memória beállítva a játék launcherében: -Xms${heapMb}m -Xmx${heapMb}m${zgc ? ' -XX:+UseZGC' : ''}`);
  else if (heap.reason) onLog('! ' + heap.reason);
  if (heap.added && heap.added.length) {
    onLog('• Launcher JSON kiegészítve: PZO motor (mainClass + classpath + pzo_native64) és ZombieBuddy agent bent van.');
  }

  // Az agent-állapotot a JSON írása UTÁN nézzük: ha most írtuk bele, akkor már
  // nem kell parancssorból is átadni (két agentlib ugyanarra a JVM-re hiba).
  const st = agentStatus(gameDir);
  const useAgent = st.present && !st.configured;

  // Ha a JSON-ban két GC-választó maradt, a JVM el sem indul („Multiple garbage
  // collectors selected”) – ezt minden indítás előtt ellenőrizzük.
  const gc = launcherGcFlags(gameDir);
  if (gc.length > 1) {
    onLog(
      `⚠ A ProjectZomboid64.json több garbage collector-t tartalmaz (${gc.join(', ')}) – ` +
        'a játék nem indulna el. Írdható fájl esetén a launcher kijavítja; ha nem, indítsd rendszergazdaként.'
    );
  }

  // A B42 a .bat-ot indítja, nem a JSON-t: ott is be kell állítani a JVM-et.
  const bat = applyHeapToLauncherBat(gameDir, heapMb, { zgc });
  if (bat.changed) onLog(`Memória beállítva a ${LAUNCHER_BAT} fájlban: ${bat.args}`);
  else if (bat.reason) onLog('! ' + bat.reason);
  else if (bat.found && zgc) onLog(`• A ${LAUNCHER_BAT} már a modpackhoz ajánlott beállítással fut: ${bat.args}`);

  const args = buildArgs({ useAgent, heapMb });

  onLog(`Indítás: ${GAME_EXE} ${args.join(' ')}`);
  onLog('• A játék a főmenübe indul – a szerverre a játékban csatlakozz.');
  onLog(`JVM heap: -Xmx${heapMb}m (${(heapMb / 1024).toFixed(1)} GB)`);
  if (useAgent) onLog('ZombieBuddy betöltése: -agentlib:zbNative');
  else if (st.configured) onLog('ZombieBuddy agent már be van állítva a ProjectZomboid64.json fájlban.');
  if (!st.present) {
    onLog('⚠ ZombieBuddy nincs telepítve – a Java modok nem fognak betöltődni. Futtasd a modok telepítését.');
  }
  // A játék Steam nélkül azonnal kilép: ha a telepítő bezárta, itt indítjuk újra.
  if (!steam.isSteamRunning()) {
    onLog('• A Steam nem fut – elindítom, mert a játék nélküle nem indul el.');
    const st = await steam.ensureSteam({ onLog });
    if (!st.running) onLog('⚠ A Steam nem indult el – a játék valószínűleg azonnal kilép.');
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
  readLauncherTemplate,
  launcherGcFlags,
  readHeapFromLauncherJson,
  buildArgs,
  isSteamRunning,
  isGameRunning,
  splitProcessLine,
  launchGame,
};
