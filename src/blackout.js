// Blackout Protocol – New Era: egyjátékos modpack.
//
// Ugyanaz a mechanika, mint a szerver kollekciónál (feliratkozás a Steam
// Workshop kollekcióra, várakozás a letöltésre), plusz a modpack szerzőjének
// config csomagja: a launcherhez mellékelt `assets/blackout` mappa a játék
// %USERPROFILE%\Zomboid mappájának kész tartalmát adja – benne a
// pz_modlist_settings.cfg "Blackout Protocol" profiljával, ami a 807 modot a
// helyes betöltési sorrendben engedélyezi (a kihagyott Waterpipes /
// LastCupCoffee / PlumbingFuelGeneratorAddonB42 nélkül, mert azok
// WorldDictionaryException-nel elszállítják a világbetöltést).
//
// A bemásolás minden egyjátékos indítás előtt lefut, a felülírt fájlokról
// mentés készül (%USERPROFILE%\Zomboid\eotl-backup-*).

const fs = require('fs');
const path = require('path');

const launch = require('./launch');
const paths = require('./paths');
const setup = require('./setup');
const workshop = require('./workshop');

const COLLECTION_ID = '3814595736';
const NAME = 'Blackout Protocol – New Era';
const WORKSHOP_URL = `https://steamcommunity.com/sharedfiles/filedetails/?id=${COLLECTION_ID}`;
const PROFILE_NAME = 'Blackout Protocol';
const PROFILE_FILE = 'pz_modlist_settings.cfg';
const CONFIG_ROOT = path.join(__dirname, '..', 'assets', 'blackout');
const CONFIG_TREE = path.join(CONFIG_ROOT, 'Zomboid');

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

// A config csomag állapota a játék mappájában (az ellenőrző listához).
function configStatus() {
  const st = profileOf(paths.zomboidDir());
  return {
    bundled: fs.existsSync(CONFIG_TREE),
    installed: st.found,
    profile: PROFILE_NAME,
    enabled: st.mods.length,
    configAt: st.found ? st.mtime : 0,
    file: st.file,
  };
}

// A felület ehhez a rövid összefoglalóhoz nyúl (modális ablak, gombok).
function summary(cfg) {
  const b = (cfg && cfg.blackout) || {};
  const items = b.collection && Array.isArray(b.collection.items) ? b.collection.items : [];
  const libs = steamLibs();
  const st = configStatus();
  return {
    name: NAME,
    collectionId: collectionId(cfg),
    workshopUrl: WORKSHOP_URL,
    title: (b.collection && b.collection.title) || NAME,
    collection: items.length ? b.collection : null,
    total: items.length,
    downloaded: items.length ? workshop.classify(libs, items).present.size : 0,
    enabledCount: st.installed ? st.enabled : Array.isArray(b.enabledIds) ? b.enabledIds.length : 0,
    unresolved: b.unresolved && typeof b.unresolved === 'object' ? Object.keys(b.unresolved).length : 0,
    configBundled: st.bundled,
    configInstalled: st.installed,
    configProfile: st.profile,
    configEnabled: st.enabled,
    configAt: st.configAt,
    configFile: st.file,
  };
}

// --------------------------------------------------------------- telepítés

// Feliratkozás + letöltés + engedélyezés, majd a config csomag bemásolása.
async function install({ cfg, userDataDir, onLog = () => {}, onProgress = () => {}, openSubscribe, openSteamClient }) {
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

  // A config a modok után jön: felülírja a listát a modpack profiljára, így a
  // kihagyott (crash-t okozó) modok nem maradnak engedélyezve.
  const config = applyConfig({ onLog, onProgress });

  return {
    collection: res.collection,
    enabledIds: res.enabledIds,
    unresolved: res.unresolved,
    downloaded: res.downloaded,
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
function applyConfig({ onLog = () => {}, onProgress = () => {} } = {}) {
  if (!fs.existsSync(CONFIG_TREE)) {
    const error = 'A launcherhez mellékelt Blackout config csomag hiányzik (assets/blackout).';
    onLog('✗ ' + error);
    return { ok: false, error };
  }
  if (launch.isGameRunning()) {
    const error = 'A játék fut – a config csak zárt játék mellett másolható be. Zárd be, és indítsd újra.';
    onLog('⚠ ' + error);
    return { ok: false, running: true, error };
  }

  const zomboidDir = paths.zomboidDir();
  const files = walk(CONFIG_TREE);
  const stamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const backupDir = path.join(zomboidDir, `eotl-backup-${stamp}`);

  let copied = 0;
  let backedUp = 0;
  const failed = [];
  let done = 0;

  for (const rel of files) {
    done++;
    onProgress({ label: 'Modpack config bemásolása…', done, total: files.length });
    const src = path.join(CONFIG_TREE, rel);
    const dest = path.join(zomboidDir, rel);
    try {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      if (fs.existsSync(dest)) {
        const have = fs.statSync(dest);
        const want = fs.statSync(src);
        if (have.size !== want.size) {
          const backup = path.join(backupDir, rel);
          fs.mkdirSync(path.dirname(backup), { recursive: true });
          fs.copyFileSync(dest, backup);
          backedUp++;
        }
      }
      fs.copyFileSync(src, dest);
      copied++;
    } catch (err) {
      failed.push({ file: rel, error: err.message });
      onLog(`✗ ${rel}: ${err.message}`);
    }
  }

  const profile = profileOf(zomboidDir);
  const list = profile.found ? syncModList(zomboidDir, profile.mods, onLog) : { changed: false, count: 0 };

  onLog(
    `✓ Modpack config a helyén: ${copied} fájl a játék Zomboid mappájában` +
      (backedUp ? `, ${backedUp} felülírt fájl mentve: ${backupDir}` : '')
  );
  if (profile.found) {
    onLog(`✓ ${profile.mods.length} mod engedélyezve a(z) „${PROFILE_NAME}” profil szerint`);
  } else {
    onLog(`✗ A ${PROFILE_FILE} nem tartalmazza a(z) „${PROFILE_NAME}” profilt.`);
  }

  return {
    ok: profile.found && failed.length === 0,
    copied,
    backedUp: backedUp ? backupDir : null,
    failed,
    profile: PROFILE_NAME,
    enabled: profile.mods.length,
    listChanged: list.changed,
  };
}

module.exports = {
  COLLECTION_ID,
  NAME,
  WORKSHOP_URL,
  PROFILE_NAME,
  CONFIG_ROOT,
  collectionId,
  summary,
  install,
  applyConfig,
  configStatus,
  profileOf,
};
