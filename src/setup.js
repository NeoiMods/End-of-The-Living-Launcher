const fs = require('fs');
const path = require('path');

const paths = require('./paths');
const launch = require('./launch');
const modinfo = require('./modinfo');
const modlist = require('./modlist');
const hu = require('./hu');
const mods = require('./mods');
const collection = require('./collection');
const workshop = require('./workshop');
const zbInstaller = require('./zb-installer');
const approvals = require('./approvals');

// A teljes telepítési folyamat:
//   1) Steam Workshop kollekció lekérése
//   2) Feliratkozás a teljes kollekcióra + várakozás a Steam letöltésére
//   3) SteamCMD tartalék letöltés a még hiányzó modokra
//   4) Minden mod engedélyezése a játék listájában
//   5) A hivatalos ZombieBuddy telepítő automatizált lefuttatása
//   6) Minden Java mod előre jóváhagyása (ZombieBuddy kérdések kihagyása)

// Ezek a modok szandekosan nem kapcsolodnak be, akkor sem, ha a kollekcioban
// benne vannak: a FuelCraft "Easy" valtozata ugyanabbol a csomagbol jon, mint az
// alap, es a kettot egyszerre hasznalni ertelmetlen/konfliktusos.
const SKIP_MOD_IDS = new Set(['siowar_distiller_easy']);

// A gyűjtemény Project Viewpointját (3809306528) nem telepítjük/töltjük le:
// helyette a Viewpoint NIGHTLY kerül a játékba (Optimalizálás → Viewpoint
// NIGHTLY, Master mappa). A már meglévő másolatot viszont engedélyezzük, hogy a
// Viewpoint-* modok ne maradjanak függőség nélkül, ha valaki nem teszi be a
// nightly-t.
const SKIP_DOWNLOAD_IDS = new Map([
  ['3809306528', 'Project Viewpoint – helyette a Viewpoint NIGHTLY gomb (Optimalizálás)'],
]);

// A launcher saját modjai (főmenü, menüzene). Ezek nincsenek a kollekcióban,
// mégis maradhatnak engedélyezve – enélkül elveszne a saját főmenü.
const OWN_MOD_IDS = ['CustomMainMenuB42', 'EndofTheLivingMainMenuB42', 'EndOfTheLivingCustomMusic', 'EOTLCustomMusic'];

const RETRY_MS = 24 * 60 * 60 * 1000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function normalizeUnresolved(raw) {
  const out = {};
  if (Array.isArray(raw)) for (const id of raw) out[String(id)] = Date.now();
  else if (raw && typeof raw === 'object') for (const [id, ts] of Object.entries(raw)) out[String(id)] = Number(ts) || 0;
  return out;
}

async function runSetup({
  cfg,
  userDataDir,
  onLog = () => {},
  onProgress = () => {},
  openSubscribe,
  openSteamClient,
  skips,
  // Szerveres (többjátékos) telepítés: a Viewpoint NIGHTLY (rc4) is felkerül.
  // A ZombieBuddy mindkét módban a hivatalos telepítővel jön.
  serverInstall = false,
}) {
  // Az egyjátékos modpack (Blackout) nem hagyja ki a kollekció elemeit – ott a
  // skips üres halmazokkal jön, a szerver telepítésnél a gyári kihagyások élnek.
  const skipDownloadIds =
    (skips && skips.download) instanceof Map ? skips.download : SKIP_DOWNLOAD_IDS;
  const skipModIds = (skips && skips.mods) instanceof Set ? skips.mods : SKIP_MOD_IDS;

  const gameDir = paths.resolveGamePath(cfg);
  if (!gameDir) throw new Error('Project Zomboid nem található. Beállítások → Játék mappája.');
  const zomboidDir = paths.zomboidDir();

  const collectionId = String((cfg && cfg.collectionId) || '').trim();
  if (!collectionId) throw new Error('Nincs megadva Steam Workshop kollekció. (Beállítások → Kollekció)');

  // ---- 1) kollekció -------------------------------------------------------
  onProgress({ label: 'Steam Workshop kollekció lekérése…' });
  const col = await collection.fetchCollection(collectionId, { log: onLog });

  // A kollekción kívül megadott workshop elemek (pl. a szerver saját főmenüje)
  // ugyanúgy részt vesznek a letöltésben és az engedélyezésben.
  const extras = Array.isArray(cfg && cfg.extraWorkshopIds) ? cfg.extraWorkshopIds : [];
  const added = [];
  for (const extra of extras) {
    const id = String((extra && extra.id) || '').trim();
    if (!/^\d+$/.test(id)) continue;
    if (col.items.some((it) => String(it.id) === id)) continue;
    const item = { id, title: String((extra && extra.title) || `Workshop ${id}`) };
    col.items.push(item);
    added.push(item);
  }

  onLog(`Kollekció: ${col.title} – ${col.items.length} mod.`);
  if (added.length) {
    onLog(`+ kollekción kívüli elem: ${added.map((it) => it.title).join(', ')}.`);
  }

  // Viewpoint NIGHTLY: ALAPBÓL NEM települ, ez a játékos döntése
  // (Optimalizálás → Viewpoint NIGHTLY kártya). Ha viszont bent van, a
  // kollekció alap Project Viewpointja kimarad, mert két azonos ID-jű Viewpoint
  // összeakadna – és a már letöltött példányt is kivesszük.
  if (!mods.nightlyStatus().installed && serverInstall) {
    onLog('• Viewpoint NIGHTLY nem települ magától – az Optimalizálás panelen tudod feltenni.');
  }
  if (mods.nightlyStatus().installed) {
    const baseId = String(mods.NIGHTLY_WORKSHOP_ID);
    const before = col.items.length;
    col.items = col.items.filter((it) => String(it.id) !== baseId);
    mods.removeBaseViewpoint({ log: onLog });
    if (col.items.length !== before) {
      onLog(`– ${baseId} (alap Project Viewpoint): kihagyva, helyette a NIGHTLY fut.`);
    }
    mods.logNightlyCompat({ log: onLog });
  }
  for (const [id, note] of skipDownloadIds) {
    if (col.items.some((it) => String(it.id) === id)) onLog(`– ${id}: ${note}.`);
  }
  if (col.childCount && col.childCount !== col.items.length) {
    onLog(`! A Steam ${col.childCount} elemet ígér, ${col.items.length} olvasható ki – a kiolvasottakkal folytatom.`);
  }

  const steam = paths.findSteamPath();
  const libs = steam ? paths.parseLibraryPaths(steam) : [];
  const unresolvedMap = normalizeUnresolved(cfg && cfg.unresolved);
  const recentFail = (id) => {
    const ts = unresolvedMap[String(id)];
    return ts && Date.now() - ts < RETRY_MS;
  };

  // ---- 2) feliratkozás + várakozás --------------------------------------
  const wanted = col.items.filter(
    (it) => !recentFail(it.id) && !skipDownloadIds.has(String(it.id))
  );
  let missing = workshop.classify(libs, wanted).missing;
  onLog(`Már letöltve: ${workshop.classify(libs, col.items).present.size}/${col.items.length}`);

  if (missing.length > 0) {
    if (!launch.isSteamRunning()) {
      onLog('A Steam nem fut – elindítom a modok letöltéséhez…');
      if (typeof openSteamClient === 'function') {
        try {
          await openSteamClient();
        } catch (err) {
          onLog('! A Steam indítása nem sikerült: ' + err.message);
        }
      }
      await sleep(3000);
    }
    if (typeof openSubscribe === 'function') {
      try {
        openSubscribe(missing, col);
      } catch (err) {
        onLog('✗ A feliratkozó ablak nem nyílt meg: ' + err.message);
      }
    }
    const wait = await workshop.waitForItems({ libs, items: wanted, onLog, onProgress });
    missing = wait.missing;
  }

  // ---- 3) forrás mappák + SteamCMD tartalék ------------------------------
  const sources = new Map();
  for (const it of col.items) {
    const dir = workshop.itemDir(libs, it.id);
    // Üres (pl. kitörölt) workshop mappa nem számít letöltöttnek: enélkül a
    // benne lévő modok csendben kimaradnak a profilból, és a játék kevesebb
    // modot tölt be, mint amennyi a listán van.
    if (dir && modinfo.discoverMods(dir).length) sources.set(String(it.id), dir);
  }

  const unresolved = { ...unresolvedMap };
  for (const id of Object.keys(unresolved)) {
    if (sources.has(String(id))) delete unresolved[id];
  }

  const pending = col.items.filter(
    (it) => !sources.has(String(it.id)) && !recentFail(it.id) && !skipDownloadIds.has(String(it.id))
  );
  if (pending.length) {
    onLog(`⚠ ${pending.length} mod még hiányzik – SteamCMD letöltéssel pótolom…`);
    const exe = await mods.ensureSteamCMD(path.join(userDataDir, 'steamcmd'), onLog);
    let n = 0;
    for (const it of pending) {
      n++;
      onProgress({ label: 'SteamCMD letöltés…', done: n, total: pending.length });
      try {
        const dir = await mods.downloadWorkshopItem(exe, it.id, onLog);
        sources.set(String(it.id), dir);
        delete unresolved[String(it.id)];
      } catch (err) {
        onLog(`✗ ${it.title || it.id}: ${err.message}`);
        unresolved[String(it.id)] = Date.now();
      }
    }
  }

  const unresolvedCount = col.items.filter(
    (it) => !sources.has(String(it.id)) && !skipDownloadIds.has(String(it.id))
  ).length;
  if (unresolvedCount > 0) {
    onLog(`! ${unresolvedCount} mod jelenleg nem elérhető (24 óra múlva újrapróbálom).`);
  }
  if (sources.size === 0) throw new Error('Egyetlen mod sem sikerült letölteni.');

  // ---- 4) felfedezés + engedélyezés -------------------------------------
  onProgress({ label: 'Modok felfedezése és engedélyezése…' });
  const discovered = [];
  const enabledIds = [];
  const seen = new Set();

  // A figyelmeztetéshez a kollekcióból vesszük a mod nevét (a nyers workshop
  // ID-ből a játékos nem tudta, melyik modról van szó).
  const titleOf = new Map((col.items || []).map((it) => [String(it.id), String(it.title || '')]));

  for (const [wsId, source] of sources) {
    const found = modinfo.discoverMods(source);
    if (!found.length) {
      const name = titleOf.get(String(wsId));
      onLog(
        `⚠ ${name ? `${name} (${wsId})` : `#${wsId}`}: a csomagban még nincs mod.info – ` +
          'a Steam valószínűleg még tölti, vagy ez az elem nem mod. Indítsd újra a launchert a letöltés után.'
      );
      continue;
    }
    for (const mod of found) {
      discovered.push({ mod, source });
      const key = String(mod.id).toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      if (skipModIds.has(key)) {
        onLog(`  – ${mod.name || mod.id}: kihagyva (nem kapcsoljuk be).`);
        continue;
      }
      enabledIds.push(mod.id);
    }
  }
  if (!enabledIds.length) throw new Error('Nem sikerült egy mod sem azonosítani a letöltött csomagokból.');

  let workshopIndex = modinfo.buildWorkshopIndex(libs, paths.PZ_APP_ID);
  const createdLocal = [];
  for (const { mod } of discovered) {
    const key = String(mod.id).toLowerCase();
    if (workshopIndex.has(key)) {
      onLog(`  ✓ ${mod.name} – megvan a Steam Workshop gyorsítótárban, nem másoljuk.`);
      continue;
    }
    const target = mods.placeLocalMod(zomboidDir, mod, onLog);
    createdLocal.push({ id: mod.id, target });
  }

  const en = modlist.ensureEnabled(zomboidDir, enabledIds);
  if (en.created) onLog(`Létrehozva: ${modlist.modListFile(zomboidDir)}`);
  if (en.changed) onLog(`✓ ${en.added.length} mod engedélyezve a játék listájában.`);
  else onLog('✓ Minden mod már engedélyezve van a játék listájában.');

  // ---- 4b) csak a kollekció modjai maradhatnak engedélyezve ----------------
  // A játék (vagy más program) által bekapcsolt, kollekción kívüli modok
  // kikerülnek a listából. Kivétel a launcher saját csomagja: a magyarítás és
  // az Optimalizálás panelről telepített Viewpoint NIGHTLY.
  const allowed = new Set(enabledIds.map((id) => String(id).toLowerCase()));
  for (const id of launcherManagedIds(userDataDir)) allowed.add(id);

  // Ha a kollekció listája hiányosan jött le (Steam 429 / API tartalék), nem
  // kapcsolunk ki semmit: egy csonka listából tömegesen tűnnének el a modok.
  const complete = !col.childCount || col.items.length >= col.childCount;
  if (complete) {
    pruneOutsideMods({ zomboidDir, allowed, onLog });
  } else {
    onLog('! A kollekció listája hiányos – a kollekción kívüli modokat most nem kapcsolom ki.');
  }

  // ---- 4c) Viewpoint NIGHTLY (ha bent van) -------------------------------
  // A nightly a Zomboid\mods alatt él, és az alap workshop Viewpoint nem
  // kapcsolódhat be mellé – a szerveres telepítésnél is ugyanaz a szabály, mint
  // az egyjátékos modpacknál.
  if (mods.nightlyStatus().installed) {
    mods.removeBaseViewpoint({ log: onLog });
    const nightlyEnabled = modlist.ensureEnabled(zomboidDir, [mods.NIGHTLY_MOD_ID]);
    if (nightlyEnabled.changed) onLog(`✓ ${mods.NIGHTLY_MOD_ID} (NIGHTLY) engedélyezve.`);
    // A nightly csak adott játékbuilden és ZombieBuddy agenttel töltődik be –
    // ha ez nem teljesül, a napló mondja meg, nem a semmi.
    mods.logNightlyCompat({ log: onLog });
  }

  // ---- 5) ZombieBuddy telepítő ------------------------------------------
  // A telepítő csak akkor fut le, ha a ZombieBuddy agent nincs a gépen. A
  // telepítő ugyanis bezárja a Steamet, ezért nem futtatjuk minden alkalommal
  // feleslegesen – kézi újratelepítés a ZombieBuddy kártyával/gombbal van.
  const agent = launch.agentStatus(gameDir);
  let zbWorkshop = [];
  try {
    zbWorkshop = mods.zombieBuddyDirs();
  } catch {
    zbWorkshop = [];
  }
  const zbPresent = agent.present || zbWorkshop.length > 0;

  let installer = null;
  if (zbPresent) {
    onLog(
      '• ZombieBuddy agent már a gépen van – a telepítő nem fut le, a Steam nem záródik be ' +
        '(kézi újratelepítés: ZombieBuddy gomb).'
    );
    installer = { ok: true, skipped: true, source: agent.present ? 'game' : 'workshop' };
  } else {
    try {
      installer = await zbInstaller.installZombieBuddy({ cfg, userDataDir, gameDir, onLog, onProgress });
      if (!installer.ok) {
        onLog('⚠ A ZombieBuddy installer nem járt sikerrel – a naplóban látszik, hol állt meg.');
      }
    } catch (err) {
      onLog('✗ ZombieBuddy installer: ' + err.message);
    }
  }

  // A ZombieBuddy agent lehet a játék mappájában (installer) vagy a Steam
  // workshop tartalomban (Java agent mod) – mindkettő érvényes.
  if (agent.present) {
    onLog(`✓ ZombieBuddy agent a helyén: ${agent.configured ? 'launcher JSON beállítva' : 'indításkor töltődik be'}.`);
  } else if (zbWorkshop.length) {
    onLog('✓ ZombieBuddy agent a Steam Workshopról töltődik be (Java agent).');
  } else {
    onLog(
      '⚠ ZombieBuddy agent nincs a gépen (sem a játék mappában, sem a Workshopon) – ' +
        'a Viewpoint NIGHTLY és a hozzá épülő modok nem fognak betöltődni.'
    );
  }

  // ---- 6) Java modok előre jóváhagyása ----------------------------------
  onProgress({ label: 'Java modok jóváhagyása…' });
  const roots = [path.join(zomboidDir, 'mods'), ...sources.values()];
  let approvalRes = { count: 0 };
  try {
    approvalRes = await approvals.preApproveJavaMods({ roots, enabledIds, onLog });
  } catch (err) {
    onLog('✗ A jóváhagyások írása nem sikerült: ' + err.message);
  }

  // ---- záró deduplikáció: helyi másolatok, amelyek közben megjelentek a
  // Workshopban (a PZ-ben duplikált mod ID hibát okozna) --------------------
  const localCopies = [];
  try {
    workshopIndex = modinfo.buildWorkshopIndex(libs, paths.PZ_APP_ID);
    const previous = Array.isArray(cfg && cfg.localCopies) ? cfg.localCopies : [];
    for (const entry of [...previous, ...createdLocal]) {
      if (!entry || !entry.id || !entry.target) continue;
      if (workshopIndex.has(String(entry.id).toLowerCase())) {
        try {
          if (fs.existsSync(entry.target)) {
            fs.rmSync(entry.target, { recursive: true, force: true });
            onLog(`  ✓ ${entry.id}: helyi másolat eltávolítva (időközben megjelent a Workshopban).`);
          }
        } catch (err) {
          onLog(`  ! ${entry.id}: nem sikerült eltávolítani a helyi másolatot (${err.message}).`);
        }
      } else if (!localCopies.some((c) => c.id === entry.id)) {
        localCopies.push(entry);
      }
    }
  } catch (err) {
    onLog('! Duplikátum-ellenőrzés kihagyva: ' + err.message);
  }

  const finalPresent = workshop.classify(libs, col.items).present.size;
  onLog(`✓ Kész: ${enabledIds.length} mod engedélyezve, ${finalPresent}/${col.items.length} letöltve Steam Workshopból.`);

  return {
    collection: { ...col, fetchedAt: Date.now() },
    enabledIds,
    localCopies,
    unresolved,
    installer,
    approvals: approvalRes,
    downloaded: finalPresent,
  };
}

// Kikapcsolja a mod listából azokat a modokat, amelyek nincsenek a megengedett
// (kollekcióból származó + launcher által telepített) halmazban.
function pruneOutsideMods({ zomboidDir, allowed, onLog = () => {} }) {
  const enabledNow = modlist.listEnabledIds(modlist.readModList(zomboidDir));
  const outside = enabledNow.filter((id) => !allowed.has(String(id).toLowerCase()));
  if (!outside.length) {
    onLog('✓ Csak a kollekció modjai vannak engedélyezve.');
    return { removed: [] };
  }
  const pr = modlist.removeEnabled(zomboidDir, outside);
  if (pr.removed.length) {
    const list = pr.removed.slice(0, 8).join(', ') + (pr.removed.length > 8 ? '…' : '');
    onLog(`– ${pr.removed.length} kollekción kívüli mod kikapcsolva: ${list}`);
  }
  return pr;
}

// A launcher saját modjai + magyarítás + Viewpoint NIGHTLY: ezek akkor is
// bekapcsolva maradhatnak, ha nincsenek a kollekcióban.
function launcherManagedIds(userDataDir) {
  const ids = new Set(OWN_MOD_IDS.map((id) => String(id).toLowerCase()));
  try {
    for (const id of hu.status(userDataDir).ids || []) ids.add(String(id).toLowerCase());
  } catch {
    // A magyarítás állapota nem kritikus ehhez a lépéshez.
  }
  try {
    for (const m of modinfo.discoverMods(mods.nightlyDir())) ids.add(String(m.id).toLowerCase());
  } catch {
    // Nincs (vagy nem olvasható) a NIGHTLY mappa.
  }
  if (mods.nightlyStatus().installed) ids.add(String(mods.NIGHTLY_MOD_ID).toLowerCase());
  return ids;
}

// Induláskor: a Steam workshop mappából derítjük ki, melyik mod tartozik a
// kollekció egyik eleméhez, és a többi bekapcsolt modot kikapcsoljuk. Ha a
// kollekció vagy a workshop mappa nem olvasható, nem nyúlunk a mod listához.
function pruneToCollection({ cfg, userDataDir, libs, onLog = () => {}, zomboidDir = null }) {
  // FONTOS: a szerver kollekció (cfg.collection) mellett az egyjátékos Blackout
  // modpack (cfg.blackout.collection) elemei is engedélyezettek. Korábban csak a
  // szerver kollekció számított, ezért minden launcher-frissítés után a
  // Blackout játékosok ~740 modja kikapcsolt, és csak a 8 szerver-mod maradt.
  const itemIds = new Set();
  const addItems = (list) => {
    for (const it of list || []) {
      const id = String((it && it.id) || '').trim();
      if (/^\d+$/.test(id)) itemIds.add(id);
    }
  };
  if (cfg && cfg.collection && Array.isArray(cfg.collection.items)) addItems(cfg.collection.items);
  if (cfg && cfg.blackout && cfg.blackout.collection && Array.isArray(cfg.blackout.collection.items)) {
    addItems(cfg.blackout.collection.items);
  }
  const extras = Array.isArray(cfg && cfg.extraWorkshopIds) ? cfg.extraWorkshopIds : [];
  for (const extra of extras) {
    const id = String((extra && extra.id) || '').trim();
    if (/^\d+$/.test(id)) itemIds.add(id);
  }
  if (!itemIds.size) return { removed: [], skipped: true, reason: 'nincs kollekció' };

  const allowed = new Set();
  for (const [id, m] of modinfo.buildWorkshopIndex(libs || [], paths.PZ_APP_ID)) {
    if (m && m.itemId && itemIds.has(String(m.itemId))) allowed.add(id);
  }
  if (!allowed.size) {
    return { removed: [], skipped: true, reason: 'a Steam workshop mappa nem olvasható' };
  }
  for (const id of launcherManagedIds(userDataDir)) allowed.add(id);
  return pruneOutsideMods({ zomboidDir: zomboidDir || paths.zomboidDir(), allowed, onLog });
}

module.exports = { runSetup, SKIP_DOWNLOAD_IDS, pruneOutsideMods, pruneToCollection };
