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
const CONFIG_ROOT = path.join(__dirname, '..', 'assets', 'blackout');
const CONFIG_TREE = path.join(CONFIG_ROOT, 'Zomboid');

// A játék nyelve két külön példányban él (magyar / angol options.ini sor).
// Indításkor a launcher nyelvéhez tartozó példány kerül az options.ini-be.
const LANG_VARIANTS = {
  hu: path.join(CONFIG_ROOT, 'lang', 'language.hu.txt'),
  en: path.join(CONFIG_ROOT, 'lang', 'language.en.txt'),
};

// A csomag azon fájljai, amiknek a játék Zomboid mappájában is meg kell lenniük
// ahhoz, hogy a modpack úgy induljon, ahogy a készítője beállította. Ha ezek
// közül bármelyik hiányzik, az ellenőrző lista nem mondhatja készre a configot.
const CONFIG_SENTINELS = [
  'options.ini',
  'sounds.ini',
  'PZO_mod_compat.txt',
  'Lua/pz_modlist_settings.cfg',
  'Lua/keys.ini',
  'Lua/keysB42.ini',
  'Lua/modOptions.ini',
  'Sandbox Presets/NeoiMods Ajanlott.cfg',
  'Sandbox Presets/Neoi-Suggested.cfg',
  'Server/NeoiMods.ini',
];

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
// megléte önmagában nem elég: a preset, a billentyűk és az ini-k is kellenek.
function configStatus() {
  const zomboidDir = paths.zomboidDir();
  const st = profileOf(zomboidDir);
  const wanted = CONFIG_SENTINELS.filter((rel) => fs.existsSync(path.join(CONFIG_TREE, rel)));
  const missing = wanted.filter((rel) => !fs.existsSync(path.join(zomboidDir, rel)));
  return {
    bundled: fs.existsSync(CONFIG_TREE),
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
  return {
    name: NAME,
    collectionId: collectionId(cfg),
    workshopUrl: WORKSHOP_URL,
    title: (b.collection && b.collection.title) || NAME,
    collection: items.length ? b.collection : null,
    total: items.length,
    downloaded: items.length ? workshop.classify(libs, items).present.size : 0,
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
  const config = applyConfig({ onLog, onProgress, lang: (cfg && cfg.uiLang) || 'hu' });

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

function applyConfig({ onLog = () => {}, onProgress = () => {}, lang = 'hu' } = {}) {
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
      const srcBuf = fs.readFileSync(src);
      if (fs.existsSync(dest)) {
        // Tartalom alapján döntünk: azonos méretű, de más tartalmú fájlt is
        // elmentünk, különben a játékos beállítása csendben elveszne.
        const haveBuf = fs.readFileSync(dest);
        if (!haveBuf.equals(srcBuf)) {
          const backup = path.join(backupDir, rel);
          fs.mkdirSync(path.dirname(backup), { recursive: true });
          fs.writeFileSync(backup, haveBuf);
          backedUp++;
        }
      }
      fs.writeFileSync(dest, srcBuf);
      copied++;
    } catch (err) {
      failed.push({ file: rel, error: err.message });
      onLog(`✗ ${rel}: ${err.message}`);
    }
  }

  // A bemásolt options.ini nyelvét a launcher nyelvéhez igazítjuk.
  const langRes = applyLanguageVariant(zomboidDir, lang);
  if (langRes.error) onLog('! ' + langRes.error);

  const profile = profileOf(zomboidDir);
  const list = profile.found ? syncModList(zomboidDir, profile.mods, onLog) : { changed: false, count: 0 };

  // Ha a Viewpoint NIGHTLY bent van (Optimalizálás panel), az alap workshop
  // Viewpoint nem kapcsolódhat be mellé, és a nightly maradjon engedélyezve.
  // A profil a gyűjtemény Viewpointjára mutat, ezért ezt itt igazítjuk.
  if (mods.nightlyStatus().installed) {
    mods.removeBaseViewpoint({ log: onLog });
    const nightlyEnabled = modlist.ensureEnabled(zomboidDir, [mods.NIGHTLY_MOD_ID]);
    if (nightlyEnabled.changed) onLog(`✓ ${mods.NIGHTLY_MOD_ID} (NIGHTLY) engedélyezve.`);
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
    ok: after.installed && failed.length === 0,
    copied,
    backedUp: backedUp ? backupDir : null,
    failed,
    profile: PROFILE_NAME,
    enabled: profile.mods.length,
    installed: after.installed,
    missing: after.missing,
    listChanged: list.changed,
  };
}

module.exports = {
  COLLECTION_ID,
  NAME,
  WORKSHOP_URL,
  PROFILE_NAME,
  CONFIG_ROOT,
  CONFIG_SENTINELS,
  LANG_VARIANTS,
  applyLanguageVariant,
  collectionId,
  summary,
  install,
  applyConfig,
  configStatus,
  profileOf,
};
