// Blackout Protocol – New Era: egyjátékos modpack.
//
// Ugyanaz a mechanika, mint a szerver kollekciónál (feliratkozás a Steam
// Workshop kollekcióra, várakozás a letöltésre), plusz a modpack szerzőjének
// config csomagja: a launcherhez mellékelt `assets/blackout` mappa a
// BLACKOUT PROTOCOL v2 csomag, benne az `install-map.json` fájllal. A
// telepítés ezt a térképet követi (forrás → cél, felülírási mód):
//
//   * presets (mod preset, trait presetek, sandbox preset) EGYESÍTVE kerülnek
//     be: a játékos saját presetjei soha nem tűnnek el, a miénk melléjük
//     kerül (a "Blackout Protocol" mod preset sora, a NeoiUltimate trait
//     preset, a Neoi-Suggested sandbox preset),
//   * a mod lista (mods/default.txt) a pakk 671 modos sorrendjére áll – így a
//     játékba belépve azonnal a pakk modjai aktívak,
//   * a billentyűk (keysB42.ini), a ZombieBuddy jóváhagyások
//     (.zombie_buddy/mod_approvals.json) és a játék indítója
//     (ProjectZomboid64.bat/.json) felülíródnak (mentés készül róluk),
//   * a handmade patch mod (PZOPatchPhobosZReVaccinStub) a Zomboid\mods alá
//     kerül.
//
// A bemásolás minden egyjátékos indítás előtt lefut, a felülírt fájlokról
// mentés készül (%USERPROFILE%\Zomboid\eotl-backup-*).

const fs = require('fs');
const os = require('os');
const path = require('path');

const launch = require('./launch');
const modlist = require('./modlist');
const mods = require('./mods');
const paths = require('./paths');
const setup = require('./setup');
const workshop = require('./workshop');

const COLLECTION_ID = '3814595736';
const NAME = 'Blackout Protocol – New Era';
const WORKSHOP_URL = `https://steamcommunity.com/sharedfiles/filedetails/?id=${COLLECTION_ID}`;
const PROFILE_NAME = 'Blackout Protocol';
const PROFILE_FILE = 'pz_modlist_settings.cfg';
const PACK_ROOT = path.join(__dirname, '..', 'assets', 'blackout');
const PACK_TREE = path.join(PACK_ROOT, 'configs', 'Zomboid');
const INSTALL_MAP = path.join(PACK_ROOT, 'install-map.json');

// A játék nyelve két külön példányban él (magyar / angol options.ini sor).
// Indításkor a launcher nyelvéhez tartozó példány kerül az options.ini-be.
const LANG_VARIANTS = {
  hu: path.join(PACK_ROOT, 'lang', 'language.hu.txt'),
  en: path.join(PACK_ROOT, 'lang', 'language.en.txt'),
};

// A játék indítója csak akkor cserélhető le, ha ezek a játék mappájában vannak
// (a pakk .bat/.json ezekre hivatkozik – nélkülük a JVM el sem indulna).
const AGENT_FILES = ['ZombieBuddy.jar', 'PZOptimEngine.jar', 'zbNative.dll', 'pzo_native64.dll'];

// A csomag azon fájljai, amiknek a játék Zomboid mappájában is meg kell lenniük
// ahhoz, hogy a modpack úgy induljon, ahogy a készítője beállította. Ha ezek
// közül bármelyik hiányzik, az ellenőrző lista nem mondhatja készre a configot.
const CONFIG_SENTINELS = [
  'mods/default.txt',
  'Lua/pz_modlist_settings.cfg',
  'Lua/keysB42.ini',
  'Lua/saved_builds.txt',
  'Sandbox Presets/Neoi-Suggested.cfg',
  'mods/PZOPatchPhobosZReVaccinStub/mod.info',
];

// A térkép által előállított fájlok (ezek a pakk fájában nem biztos, hogy ilyen
// úton megvannak, ezért ezeket mindig számon kérjük).
const PACK_SENTINELS_ALWAYS = new Set(['mods/PZOPatchPhobosZReVaccinStub/mod.info']);

// --------------------------------------------------------------- alap adatok

function collectionId(cfg) {
  const raw = String((cfg && cfg.blackout && cfg.blackout.collectionId) || COLLECTION_ID).trim();
  return /^\d+$/.test(raw) ? raw : COLLECTION_ID;
}

function steamLibs() {
  const steam = paths.findSteamPath();
  return steam ? paths.parseLibraryPaths(steam) : [];
}

// A modpack profilja a játék pz_modlist_settings.cfg fájljából: az ebben a
// sorban felsorolt modok az engedélyezettek.
function profileOf(zomboidDir) {
  const file = path.join(zomboidDir, 'Lua', PROFILE_FILE);
  let text = null;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    return { file, found: false, mods: [], mtime: 0 };
  }
  const line = text.split(/\r?\n/).find((l) => l.startsWith(PROFILE_NAME + ':'));
  const mods = line
    ? line
        .slice(PROFILE_NAME.length + 1)
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  let mtime = 0;
  try {
    mtime = Math.round(fs.statSync(file).mtimeMs);
  } catch {
    mtime = 0;
  }
  return { file, found: !!line, mods, mtime };
}

// A config csomag állapota a játék mappájában (az ellenőrző listához). A profil
// megléte önmagában nem elég: a mod lista, a presetek és a billentyűk is kellenek.
function configStatus() {
  const zomboidDir = paths.zomboidDir();
  const st = profileOf(zomboidDir);
  const wanted = CONFIG_SENTINELS.filter((rel) => fs.existsSync(path.join(PACK_TREE, rel)) || PACK_SENTINELS_ALWAYS.has(rel));
  const missing = wanted.filter((rel) => !fs.existsSync(path.join(zomboidDir, rel)));
  return {
    bundled: fs.existsSync(INSTALL_MAP),
    found: st.found,
    installed: st.found && missing.length === 0,
    profile: PROFILE_NAME,
    enabled: st.mods.length,
    mods: st.mods,
    configAt: st.found ? st.mtime : 0,
    file: st.file,
    files: wanted.length,
    missing,
  };
}

// Mi van tényleg engedélyezve? A játék a mods/default.txt listát tölti be, a
// pz_modlist_settings.cfg profil csak sablon – ezért a kettőt összevetjük.
function listCounts(zomboidDir, profileMods) {
  const enabled = modlist.listEnabledIds(modlist.readModList(zomboidDir));
  const have = new Set(enabled.map((id) => String(id).toLowerCase()));
  const wanted = new Set((profileMods || []).map((id) => String(id).toLowerCase()));
  return {
    enabled: enabled.length,
    missing: (profileMods || []).filter((id) => !have.has(String(id).toLowerCase())).length,
    extra: enabled.filter((id) => !wanted.has(String(id).toLowerCase())).length,
  };
}

// A felület ehhez a rövid összefoglalóhoz nyúl (modális ablak, gombok).
function summary(cfg) {
  const b = (cfg && cfg.blackout) || {};
  const items = b.collection && Array.isArray(b.collection.items) ? b.collection.items : [];
  const libs = steamLibs();
  const st = configStatus();
  const list = st.found ? listCounts(paths.zomboidDir(), st.mods) : { enabled: 0, missing: 0, extra: 0 };
  // Mely modok hiányoznak konkrétan – a felület ezt nevekkel mutatja, nem csak
  // a „752/753” számmal (abból nem derül ki, mit kell pótolni).
  const missingItems = items.length
    ? items.filter((it) => !workshop.itemDir(libs, it.id))
    : [];
  return {
    name: NAME,
    collectionId: collectionId(cfg),
    workshopUrl: WORKSHOP_URL,
    title: (b.collection && b.collection.title) || NAME,
    collection: items.length ? b.collection : null,
    total: items.length,
    downloaded: items.length ? items.length - missingItems.length : 0,
    missingTotal: missingItems.length,
    missingNames: missingItems.slice(0, 8).map((it) => it.title || it.id),
    missingIds: missingItems.slice(0, 8).map((it) => String(it.id)),
    enabledCount: list.enabled || (st.installed ? st.enabled : Array.isArray(b.enabledIds) ? b.enabledIds.length : 0),
    listEnabled: list.enabled,
    listMissing: list.missing,
    listExtra: list.extra,
    unresolved: b.unresolved && typeof b.unresolved === 'object' ? Object.keys(b.unresolved).length : 0,
    configBundled: st.bundled,
    configInstalled: st.installed,
    configProfile: st.profile,
    configEnabled: st.enabled,
    configMissing: st.missing,
    configFiles: st.files,
    configAt: st.configAt,
    configFile: st.file,
  };
}

// --------------------------------------------------------------- telepítés

// Feliratkozás + letöltés + engedélyezés, majd a config csomag bemásolása.
async function install({
  cfg,
  userDataDir,
  onLog = () => {},
  onProgress = () => {},
  openSubscribe,
  openSteamClient,
}) {
  const id = collectionId(cfg);
  onLog(`— ${NAME} modpack (Steam kollekció ${id}) —`);

  // A szerver kollekció kihagyásai (pl. Viewpoint nightly) itt nem érvényesek:
  // az egyjátékos modpack pontosan azt kapja, ami a kollekcióban van.
  const scoped = {
    ...cfg,
    collectionId: id,
    extraWorkshopIds: [],
    localCopies: [],
    unresolved: (cfg && cfg.blackout && cfg.blackout.unresolved) || {},
  };

  const res = await setup.runSetup({
    cfg: scoped,
    userDataDir,
    onLog,
    onProgress,
    openSubscribe,
    openSteamClient,
    skips: { download: new Map(), mods: new Set() },
  });

  // A Viewpoint NIGHTLY ALAPBÓL nem települ (ez a játékos döntése az
  // Optimalizálás panelen) – csak akkor vesszük figyelembe, ha már bent van.
  const nightly = mods.nightlyStatus().installed ? mods.nightlyStatus() : null;

  // A config a modok után jön: beállítja a mod listát a modpack profiljára, így
  // a kihagyott (crash-t okozó) modok nem maradnak engedélyezve.
  const config = applyConfig({
    cfg,
    onLog,
    onProgress,
    lang: (cfg && cfg.uiLang) || 'hu',
  });

  return {
    collection: res.collection,
    enabledIds: res.enabledIds,
    unresolved: res.unresolved,
    downloaded: res.downloaded,
    nightly,
    config,
  };
}

// --------------------------------------------------------------- config másolás

function walk(dir, base = dir, out = []) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, out);
    else if (entry.isFile()) out.push(path.relative(base, full));
  }
  return out;
}

// Javítás arra az esetre, amikor egy korábbi launcher-verzió (0.9.44–0.9.47)
// a szerver kollekcióhoz szűrve kikapcsolta a Blackout modok nagy részét: az
// engedélyezett lista ilyenkor jóval rövidebb a kollekciónál. A gépen meglévő
// kollekció-modokat visszakapcsoljuk (a profil szerinti sorrendet a config
// telepítése adja vissza).
function repairDisabledMods(cfg, onLog = () => {}) {
  const items = cfg && cfg.blackout && cfg.blackout.collection && Array.isArray(cfg.blackout.collection.items)
    ? cfg.blackout.collection.items
    : [];
  if (!items.length) return { added: [] };
  const wanted = new Set(items.map((it) => String(it.id)));
  let index;
  try {
    index = require('./modinfo').buildWorkshopIndex(steamLibs(), paths.PZ_APP_ID);
  } catch {
    return { added: [] };
  }
  const modIds = [];
  for (const [modId, m] of index) {
    if (m && m.itemId && wanted.has(String(m.itemId))) modIds.push(modId);
  }
  if (!modIds.length) return { added: [] };
  const res = modlist.ensureEnabled(paths.zomboidDir(), modIds);
  if (res.added && res.added.length) {
    onLog(
      `✓ ${res.added.length} mod újra engedélyezve a mod listában (egy korábbi launcher-hiba kikapcsolta őket).`
    );
  }
  return res;
}

// A default.txt (a launcher által is használt engedélyezett lista) a modpack
// profiljára állítva – a maps blokkot és a többi sort nem bántja.
function syncModList(zomboidDir, ids, onLog) {
  if (!ids.length) return { changed: false, count: 0 };
  const file = path.join(zomboidDir, 'mods', 'default.txt');
  let content = null;
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch {
    content = null;
  }

  const nl = content && content.includes('\r\n') ? '\r\n' : '\n';
  const body = ['mods', '{']
    .concat(ids.map((id) => `    mod = ${id},`))
    .concat(['}'])
    .join(nl);

  let next;
  if (content === null) {
    next = ['VERSION = 1,', body, 'maps', '{', '}', ''].join(nl);
  } else {
    const block = /mods\s*\{[\s\S]*?\}/.exec(content);
    if (!block) {
      // Ismeretlen formátum: nem írjuk felül, csak jelezzük.
      onLog(`! A ${file} formátumát nem ismerem fel – a modok engedélyezését a játék profilja adja.`);
      return { changed: false, count: 0 };
    }
    next = content.slice(0, block.index) + body + content.slice(block.index + block[0].length);
  }

  try {
    if (next === content) return { changed: false, count: ids.length };
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (content !== null) {
      try {
        fs.copyFileSync(file, file + '.bak');
      } catch {
        // A mentés best effort.
      }
    }
    fs.writeFileSync(file, next, 'utf8');
    return { changed: true, count: ids.length };
  } catch (err) {
    onLog(`! A default.txt frissítése nem sikerült: ${err.message}`);
    return { changed: false, count: 0 };
  }
}

// A mellékelt config csomag bemásolása a játék Zomboid mappájába, majd a
// modok engedélyezése a profil szerint.
// Az options.ini `language=` sorát a launcher választott nyelvére állítja.
// A config csomag többi részéhez nem nyúl.
function applyLanguageVariant(zomboidDir, lang) {
  const file = path.join(zomboidDir, 'options.ini');
  const variant = LANG_VARIANTS[lang === 'en' ? 'en' : 'hu'];
  let line;
  try {
    line = fs.readFileSync(variant, 'utf8').trim();
  } catch (err) {
    return { ok: false, error: `Hiányzó nyelvi példány: ${path.basename(variant)} (${err.message})` };
  }
  if (!line) return { ok: false, error: `Üres nyelvi példány: ${path.basename(variant)}` };

  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch (err) {
    return { ok: false, error: `Az options.ini nem olvasható (${err.message})` };
  }

  const next = /^language=.*$/m.test(raw)
    ? raw.replace(/^language=.*$/m, line)
    : raw.replace(/\r?\n*$/, `\n${line}\n`);
  if (next === raw) return { ok: true, changed: false, line };
  try {
    fs.writeFileSync(file, next, 'utf8');
    return { ok: true, changed: true, line };
  } catch (err) {
    return { ok: false, error: `Az options.ini nem írható (${err.message})` };
  }
}

// ------------------------------------------------------------------ egyesítés

// A telepítési térkép sorai (forrás → cél, felülírási móddal).
function installMap() {
  try {
    const raw = JSON.parse(fs.readFileSync(INSTALL_MAP, 'utf8'));
    return Array.isArray(raw.items) ? raw.items : null;
  } catch {
    return null;
  }
}

function resolveTarget(target, { zomboidDir, gameDir }) {
  const raw = String(target || '');
  if (!raw) return null;
  const wantsGame = /%PZ_GAME_DIR%/i.test(raw);
  if (wantsGame && !gameDir) return null;
  let out = raw.replace(/%USERPROFILE%/gi, os.homedir());
  if (wantsGame) out = out.replace(/%PZ_GAME_DIR%/gi, gameDir);
  return path.normalize(out);
}

// A „Blackout Protocol” mod preset sora: a játékos többi presetje (és a
// !fav! sor) marad, csak ezt az egy sort írjuk be/frissítjük.
function mergePresetLine(dest, srcBuf) {
  const srcText = srcBuf.toString('utf8');
  const our = (srcText.split(/\r?\n/).find((l) => l.startsWith(PROFILE_NAME + ':')) || '').trim();
  if (!our) return srcBuf;

  let text = '';
  try {
    text = fs.readFileSync(dest, 'utf8');
  } catch {
    return Buffer.from(our + '\r\n', 'utf8');
  }
  const nl = text.includes('\r\n') ? '\r\n' : '\n';
  const re = new RegExp('^' + PROFILE_NAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':.*$', 'm');
  const next = re.test(text)
    ? text.replace(re, our)
    : text.replace(/\r?\n*$/, nl) + our + nl;
  return Buffer.from(next, 'utf8');
}

// Nevek szerinti egyesítés (trait presetek): a játékos saját buildjei
// változatlanul maradnak, a pakk presetjei csak akkor kerülnek be, ha még
// nincs ilyen nevű build.
function mergeAppendMissing(dest, srcBuf) {
  const srcLines = srcBuf
    .toString('utf8')
    .split(/\r?\n/)
    .map((l) => l.replace(/\r$/, '').trim())
    .filter(Boolean);
  if (!srcLines.length) return srcBuf;

  let text = '';
  try {
    text = fs.readFileSync(dest, 'utf8');
  } catch {
    return srcBuf;
  }
  const names = new Set();
  for (const line of text.split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) names.add(line.slice(0, i).trim().toLowerCase());
  }
  const add = srcLines.filter((line) => {
    const i = line.indexOf(':');
    return i > 0 && !names.has(line.slice(0, i).trim().toLowerCase());
  });
  if (!add.length) return Buffer.from(text, 'utf8');

  const nl = text.includes('\r\n') ? '\r\n' : '\n';
  const next = text.replace(/\r?\n*$/, nl) + add.join(nl) + nl;
  return Buffer.from(next, 'utf8');
}

// A Steam (és a játék) írásvédetté teheti a launcher fájlokat – a csere előtt
// levesszük róla a védelmet.
function clearReadOnly(file) {
  try {
    const st = fs.statSync(file);
    if (st.isFile()) fs.chmodSync(file, st.mode | 0o200);
  } catch {
    // Nem gond: ha nem írható, a hibaüzenet megmondja.
  }
}

// Fájl kiírása mentéssel: csak akkor ír, ha a tartalom tényleg más.
function writePackFile(file, buf, backupFile) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file)) {
    let same = false;
    try {
      same = fs.readFileSync(file).equals(buf);
    } catch {
      same = false;
    }
    if (same) return { changed: false, backedUp: false };
    clearReadOnly(file);
    let backedUp = false;
    if (backupFile) {
      try {
        fs.mkdirSync(path.dirname(backupFile), { recursive: true });
        fs.copyFileSync(file, backupFile);
        backedUp = true;
      } catch {
        backedUp = false;
      }
    }
    fs.writeFileSync(file, buf);
    return { changed: true, backedUp };
  }
  fs.writeFileSync(file, buf);
  return { changed: true, backedUp: false };
}

function missingAgentFiles(gameDir) {
  return AGENT_FILES.filter((f) => !fs.existsSync(path.join(gameDir, f)));
}

// A csomag telepítése az install-map.json szerint.
// zomboidDir / gameDir csak teszteléshez adható meg – élesben a valódi útvonalak.
function applyConfig({
  cfg = null,
  onLog = () => {},
  onProgress = () => {},
  lang = 'hu',
  zomboidDir: customZomboid = null,
  gameDir: customGame = null,
} = {}) {
  const mapItems = installMap();
  if (!mapItems) {
    const error = 'A launcherhez mellékelt Blackout config csomag hiányzik (assets/blackout/install-map.json).';
    onLog('✗ ' + error);
    return { ok: false, error };
  }

  const testing = !!(customZomboid || customGame);
  if (!testing && launch.isGameRunning()) {
    const error = 'A játék fut – a config csak zárt játék mellett másolható be. Zárd be, és indítsd újra.';
    onLog('⚠ ' + error);
    return { ok: false, running: true, error };
  }

  const zomboidDir = customZomboid || paths.zomboidDir();
  const gameDir = customGame || paths.resolveGamePath(cfg || {}) || '';
  const stamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const backupDir = path.join(zomboidDir, `eotl-backup-${stamp}`);

  // Feladatok: fájlok (egyesítéssel) és egész mappák (local_mods/*).
  const jobs = [];
  const localModsRoot = path.join(PACK_ROOT, 'local_mods');
  for (const item of mapItems) {
    const source = String((item && item.source) || '');
    const target = String((item && item.target) || '');
    if (!source || !target) continue;
    if (/^steam:/i.test(target) || /^n\/a$/i.test(String(item.merge || ''))) continue;

    if (source.endsWith('/*')) {
      let names = [];
      try {
        names = fs
          .readdirSync(localModsRoot, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name);
      } catch {
        names = [];
      }
      for (const name of names) {
        jobs.push({
          kind: 'tree',
          source: path.join(localModsRoot, name),
          target: path.join(zomboidDir, 'mods', name),
          merge: 'replace',
          label: name,
        });
      }
      continue;
    }

    jobs.push({ kind: 'file', source, target, merge: String(item.merge || 'replace'), label: source });
  }

  if (!jobs.length) {
    const error = 'A config csomag install-map.json fájljában nincs telepíthető elem.';
    onLog('✗ ' + error);
    return { ok: false, error };
  }

  let total = 0;
  for (const job of jobs) {
    total += job.kind === 'tree' ? Math.max(1, walk(job.source).length) : 1;
  }
  let done = 0;
  const step = (label) => {
    done++;
    onProgress({ label: label || 'Modpack config bemásolása…', done, total });
  };

  let copied = 0;
  let backedUp = 0;
  let unchanged = 0;
  const failed = [];
  const skipped = [];
  const merged = [];

  for (const job of jobs) {
    if (job.kind === 'tree') {
      const files = walk(job.source);
      let any = false;
      for (const rel of files) {
        step('Modpack config bemásolása…');
        const src = path.join(job.source, rel);
        const dest = path.join(job.target, rel);
        try {
          const written = writePackFile(dest, fs.readFileSync(src), null);
          if (written.changed) any = true;
          copied++;
        } catch (err) {
          failed.push({ file: rel, error: err.message });
          onLog(`✗ ${path.join(job.label, rel)}: ${err.message}`);
        }
      }
      if (!failed.length) onLog(`✓ Helyi patch mod a helyén: Zomboid\\mods\\${job.label}`);
      else if (any) onLog(`! A(z) ${job.label} patch mod csak részben került be.`);
      continue;
    }

    step(job.label);
    const usesGame = /%PZ_GAME_DIR%/i.test(job.target);
    const dest = resolveTarget(job.target, { zomboidDir, gameDir });

    if (!dest) {
      skipped.push(job.target);
      onLog(`! ${job.label}: a játék mappája nem található – a fájl nem cserélhető le.`);
      continue;
    }

    // A játék indítója csak akkor cserélhető, ha az agent fájlok bent vannak;
    // nélkülük a .bat/.json a JVM indításakor elhasal, és a játék el sem indul.
    if (usesGame) {
      const missing = missingAgentFiles(gameDir);
      if (missing.length) {
        skipped.push(job.target);
        onLog(
          `⚠ A játék indítója nem cserélhető le: hiányzik a játék mappájából: ${missing.join(', ')}. ` +
            'Enélkül a pakk .bat/.json fájlja nem indítaná el a játékot – maradt a jelenlegi.'
        );
        continue;
      }
    }

    const srcFile = path.join(PACK_ROOT, job.source);
    let buf;
    try {
      buf = fs.readFileSync(srcFile);
    } catch (err) {
      failed.push({ file: job.source, error: err.message });
      onLog(`✗ ${job.source}: ${err.message}`);
      continue;
    }

    let next = buf;
    try {
      if (job.merge === 'preset-line') {
        next = mergePresetLine(dest, buf);
        merged.push(path.basename(dest));
      } else if (job.merge === 'append-missing') {
        next = mergeAppendMissing(dest, buf);
        merged.push(path.basename(dest));
      }
    } catch (err) {
      failed.push({ file: job.source, error: err.message });
      onLog(`✗ ${job.source}: ${err.message}`);
      continue;
    }

    // A Zomboid mappán belül időbélyeges mentésmappába, azon kívül (játék
    // mappa, .zombie_buddy) a fájl mellé .bak-ként mentünk.
    const inside = path.relative(zomboidDir, dest);
    const backupFile =
      inside && !inside.startsWith('..') && !path.isAbsolute(inside)
        ? path.join(backupDir, inside)
        : dest + '.bak';

    try {
      const res = writePackFile(dest, next, backupFile);
      if (res.changed) copied++;
      else unchanged++;
      if (res.backedUp) backedUp++;
    } catch (err) {
      failed.push({ file: job.source, error: err.message });
      onLog(`✗ ${path.basename(dest)}: ${err.message}`);
      if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
        onLog('! A játék mappája védett – indítsd a launchert rendszergazdaként.');
      }
    }
  }

  // A bemásolt options.ini nyelvét a launcher nyelvéhez igazítjuk.
  const langRes = applyLanguageVariant(zomboidDir, lang);
  if (langRes.error) onLog('! ' + langRes.error);

  const profile = profileOf(zomboidDir);

  // A mod lista: ha a pakk listája a helyére került, nem írjuk újra; ha a
  // játékos profilja több/kevesebb modot tartalmaz, a profil a mérvadó.
  const list = profile.found ? listCounts(zomboidDir, profile.mods) : { enabled: 0, missing: 0, extra: 0 };
  let listSync = { changed: false, count: 0 };
  if (profile.found && (list.missing > 0 || list.extra > 0)) {
    listSync = syncModList(zomboidDir, profile.mods, onLog);
  }

  // Ha a Viewpoint NIGHTLY bent van (Optimalizálás panel), az alap workshop
  // Viewpoint nem kapcsolódhat be mellé, és a nightly maradjon engedélyezve.
  // A profil a gyűjtemény Viewpointjára mutat, ezért ezt itt igazítjuk.
  if (mods.nightlyStatus().installed) {
    mods.removeBaseViewpoint({ log: onLog });
    const nightlyEnabled = modlist.ensureEnabled(zomboidDir, [mods.NIGHTLY_MOD_ID]);
    if (nightlyEnabled.changed) onLog(`✓ ${mods.NIGHTLY_MOD_ID} (NIGHTLY) engedélyezve.`);
    mods.logNightlyCompat({ log: onLog });
  }

  if (merged.length) {
    onLog('✓ A saját presetjeid megmaradtak – a pakk presetjei melléjük kerültek.');
  }
  onLog(
    `✓ Modpack config a helyén: ${copied} fájl a játék Zomboid mappájában` +
      (backedUp ? `, ${backedUp} felülírt fájl mentve: ${backupDir}` : '')
  );
  if (profile.found) {
    onLog(`✓ ${profile.mods.length} mod engedélyezve a(z) „${PROFILE_NAME}” profil szerint`);
  } else {
    onLog(`✗ A ${PROFILE_FILE} nem tartalmazza a(z) „${PROFILE_NAME}” profilt.`);
  }

  const after = configStatus();
  return {
    ok: failed.length === 0 && (after.installed || !!customZomboid),
    copied,
    unchanged,
    skipped,
    merged,
    backedUp: backedUp ? backupDir : null,
    failed,
    profile: PROFILE_NAME,
    enabled: profile.mods.length,
    installed: after.installed,
    missing: after.missing,
    listChanged: listSync.changed,
  };
}

module.exports = {
  COLLECTION_ID,
  NAME,
  WORKSHOP_URL,
  PROFILE_NAME,
  PACK_ROOT,
  PACK_TREE,
  INSTALL_MAP,
  CONFIG_SENTINELS,
  AGENT_FILES,
  LANG_VARIANTS,
  applyLanguageVariant,
  collectionId,
  summary,
  install,
  applyConfig,
  configStatus,
  profileOf,
  repairDisabledMods,
  installMap,
  mergePresetLine,
  mergeAppendMissing,
};
