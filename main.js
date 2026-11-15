const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const { loadConfig, saveConfig, DEFAULT_CONFIG } = require('./src/config');
const logfile = require('./src/logfile');
const {
  getEnvironment,
  resolveGamePath,
  zomboidDir,
  findGameCandidates,
  findSteamPath,
  parseLibraryPaths,
  isGameDir,
  DEFAULT_GAME_DIR,
  GAME_EXE,
  PZ_APP_ID,
} = require('./src/paths');
const modinfo = require('./src/modinfo');
const modlist = require('./src/modlist');
const news = require('./src/news');
const { launchGame, isGameRunning, runningGameReason, launchFailureDiagnostics } = require('./src/launch');
const setup = require('./src/setup');
const { runSetup } = setup;
const { fetchCollection } = require('./src/collection');
const hu = require('./src/hu');
const subscribe = require('./src/subscribe');
const a2s = require('./src/a2s');
const system = require('./src/system');
const zbInstaller = require('./src/zb-installer');
const shortcuts = require('./src/shortcut');
const update = require('./src/update');
const events = require('./src/events');
const packs = require('./src/packs');
const pzo = require('./src/pzo');
const mods = require('./src/mods');
const discord = require('./src/discord');
const crash = require('./src/crash');
const blackout = require('./src/blackout');
const eotl = require('./src/eotl-mods');

// A launcher csak akkor ellenőrzi frissítést, ha a cfg.updateCheckUrl be van állítva.
// A GitHub projektben át lett állítva erre a repo-ra:
//   https://github.com/NeoiMods/End-of-The-Living-Launcher.git

const ICON = path.join(__dirname, 'assets', 'icon.png');

let win = null;
let cfg = null;
let busy = false;
let setupRunning = false;
// Egy launcher-példány: két launcher-ablakból két játék indult (dupla indulás).
const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) app.quit();
// Ha valaki újra elindítaná a launchert, a meglévő ablak jöjjön elő.
app.on('second-instance', () => {
  if (!win || win.isDestroyed()) return;
  if (win.isMinimized()) win.restore();
  if (!win.isVisible()) win.show();
  win.focus();
});
// Egyszerre csak egy indítás futhat (dupla kattintás / ismételt Play).
let launchInFlight = false;
// Játék bezárásának figyelése a crash loghoz.
let gameSeenRunning = false;
// Mikor indítottuk utoljára a játékot: a hiba-diagnosztika csak az azóta
// keletkezett konzol-hibákat idézi, hogy ne egy hetekkel korábbi sort mutasson.
let launchStartedAt = 0;
// Összeomlás után a log beküldése kötelező: amíg nincs elküldve, a launcher
// ablakát sem lehet csak úgy bezárni (kilépéskor rákérdezünk).
let crashReportPending = false;
let appQuitting = false;

// Tartós naplófájl: a felület naplója memóriában él, ezért minden sor a
// userData/launcher.log fájlba is bekerül (2 MB felett launcher.log.1-re vált).
let fileLogger = null;
function launcherLogPath() {
  try {
    if (!fileLogger) fileLogger = logfile.createFileLogger(app.getPath('userData'));
    return fileLogger.file;
  } catch {
    return '';
  }
}

function log(line) {
  const text = String(line);
  try {
    if (!fileLogger) launcherLogPath();
    if (fileLogger) fileLogger.write(text);
  } catch {
    // Írási hiba: a felületi napló akkor is megvan.
  }
  if (win && !win.isDestroyed()) win.webContents.send('log', text);
}

function progress(payload) {
  if (win && !win.isDestroyed()) win.webContents.send('progress', payload);
}

function status() {
  return {
    ...getEnvironment(cfg, { userDataDir: app.getPath('userData') }),
    blackout: blackout.summary(cfg),
  };
}

function reportError(err) {
  const msg = err && err.message ? err.message : String(err);
  log('✗ ' + msg);
  return { ok: false, error: msg };
}

function save() {
  saveConfig(app.getPath('userData'), cfg);
}

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 900,
    minWidth: 1040,
    minHeight: 700,
    backgroundColor: '#07090a',
    autoHideMenuBar: true,
    title: 'End of The Living Launcher',
    icon: fs.existsSync(ICON) ? ICON : undefined,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });
  win.loadFile('index.html');

  // Ha a játékos összeomlás után küldés nélkül zárná be a launchert, szólunk,
  // hogy a logból tudjuk meg, mi történt – de nem tartjuk fogva.
  win.on('close', (e) => {
    if (!crashReportPending || appQuitting) return;
    let choice = 0;
    const en = (cfg && cfg.uiLang) === 'en';
    try {
      choice = dialog.showMessageBoxSync(win, {
        type: 'warning',
        buttons: en ? ['Send log', 'Exit without sending'] : ['Log elküldése', 'Kilépés küldés nélkül'],
        defaultId: 0,
        cancelId: 0,
        noLink: true,
        title: en ? 'You have not sent the crash log yet' : 'A crash logot még nem küldted el',
        message: en
          ? 'We cannot fix the crash without the log.'
          : 'A log nélkül nem tudjuk kijavítani az összeomlást.',
        detail: en
          ? '“It does not work” does not tell us the cause; the log file does. ' +
            'If you exit now, the log stays on your machine and we will offer it again on the next start.'
          : 'A „nem működik” megjegyzésből nem derül ki a hiba oka, a log fájlból igen. ' +
            'Ha most kilépsz, a log a gépeden marad, és a következő indításnál újra felajánljuk.',
      });
    } catch {
      choice = 0;
    }
    if (choice === 0) {
      e.preventDefault();
      if (win.isMinimized()) win.restore();
      win.show();
      win.focus();
      win.webContents.send('crash', checkCrash());
    }
  });
}

app.whenReady().then(() => {
  // A második példány már kilépett: ne nyisson ablakot, ne indítson semmit.
  if (!singleInstance) return;
  cfg = loadConfig(app.getPath('userData'));
  // A gyári (szerver beállítás) értékek mentése első indításkor.
  if (!cfg.installedModIds) cfg.installedModIds = [];
  save();
  createWindow();
  // Hogy megtalálható legyen a hibák utólagos kivizsgálásához.
  log(`• Naplófájl: ${launcherLogPath()}`);
  shortcuts.ensureDesktopShortcut().then((res) => {
    if (res && res.created) log('✓ Parancsikon létrehozva az asztalon.');
  });

  // Verziónként egyszer kikapcsoljuk a kollekción kívüli modokat: a Steam
  // workshop mappából derítjük ki, mely modok tartoznak a kollekció elemeihez.
  // (Verziónként csak egyszer, hogy a kézi újraengedélyezést ne írja felül.)
  setTimeout(() => {
    try {
      if (cfg.modPruneVersion === app.getVersion()) return;
      const steam = findSteamPath();
      const libs = steam ? parseLibraryPaths(steam) : [];
      const pr = setup.pruneToCollection({
        cfg,
        userDataDir: app.getPath('userData'),
        libs,
        onLog: log,
      });
      if (pr && !pr.skipped) {
        cfg = { ...cfg, modPruneVersion: app.getVersion() };
        save();
      } else if (pr && pr.reason) {
        log('! Mod lista szűrése kihagyva: ' + pr.reason + '.');
      }
      if (pr && pr.removed && pr.removed.length && win && !win.isDestroyed()) {
        win.webContents.send('refresh');
      }
    } catch (err) {
      log('! A mod lista szűrése nem sikerült: ' + (err && err.message ? err.message : err));
    }
  }, 3000);

  // Első indításkor háttérben lekérjük a kollekciót, hogy a checklist valós
  // számokat mutasson (a felhasználónak ne kelljen külön frissítenie).
  if (!cfg.collection) {
    setTimeout(async () => {
      try {
        const col = await fetchCollection(cfg.collectionId);
        cfg = { ...cfg, collection: { ...col, fetchedAt: Date.now() } };
        save();
        log(`✓ Kollekció betöltve: ${col.title} – ${col.items.length} mod.`);
        if (win && !win.isDestroyed()) win.webContents.send('refresh');
      } catch (err) {
        log('! A kollekció háttérben nem tölthető be: ' + (err && err.message ? err.message : err));
      }
    }, 1500);
  }

  // Ugyanez a Blackout kollekcióra: így az ellenőrző lista akkor is valós
  // számot mutat, ha a modokat még nem a launcherral töltötték le.
  if (!cfg.blackout || !cfg.blackout.collection) {
    setTimeout(async () => {
      try {
        const id = blackout.collectionId(cfg);
        const col = await fetchCollection(id);
        cfg = {
          ...cfg,
          blackout: { ...(cfg.blackout || {}), collectionId: id, collection: { ...col, fetchedAt: Date.now() } },
        };
        save();
        log(`✓ Blackout kollekció betöltve: ${col.title} – ${col.items.length} mod.`);
        if (win && !win.isDestroyed()) win.webContents.send('refresh');
      } catch (err) {
        log('! A Blackout kollekció háttérben nem tölthető be: ' + (err && err.message ? err.message : err));
      }
    }, 4000);
  }

  // ---- Csomagfigyelő --------------------------------------------------
  // Ha a Beállításokban van csomagforrás, induláskor megnézi, került-e fel új
  // .zip / .exe a repóba, és ha igen, letölti és a helyére teszi.
  setTimeout(async () => {
    if (!cfg.packsRepo) return;
    try {
      await packs.sync({ cfg, userDataDir: app.getPath('userData'), log });
    } catch (err) {
      log('! Csomagok: ' + (err && err.message ? err.message : err));
    }
  }, 6000);

  // ---- PZO motor ------------------------------------------------------
  // 16 GB RAM alatt a PZO telepítése kötelező, ezért ilyenkor a launcher
  // magától elindítja (egyszer). 16 GB felett opcionális marad: az
  // Optimalizálás panel gombjára települ.
  setTimeout(async () => {
    const userDataDir = app.getPath('userData');
    try {
      // Teszt/támogatói kapcsoló: EOTL_SKIP_PZO_AUTO=1 esetén nem telepít magától.
      if (process.env.EOTL_SKIP_PZO_AUTO === '1') return;
      const mem = system.getMemoryInfo(Number(cfg.jvmMaxMb) || 8192);
      const st = pzo.status({ cfg, userDataDir, gameDir: resolveGamePath(cfg) });
      // Ha a motor már fenn van a játékon, nem indítjuk újra a telepítőt.
      if (st.installed || st.autoTried || st.launchedAt) return;
      if (mem.totalGb >= 16) return;
      log(`• ${mem.totalGb} GB RAM (16 GB alatt) – a PZO motor telepítése kötelező, indítom…`);
      try {
        await pzo.install({ cfg, userDataDir, log, auto: true });
      } catch (err) {
        pzo.markAutoTried(userDataDir);
        log('! PZO: ' + (err && err.message ? err.message : err));
      }
      if (win && !win.isDestroyed()) win.webContents.send('refresh');
    } catch (err) {
      log('! PZO: ' + (err && err.message ? err.message : err));
    }
  }, 8000);

  // ---- Összeomlás-figyelő ---------------------------------------------
  // Induláskor (korábbi összeomlás) és a játék bezárása után megnézzük,
  // keletkezett-e új crash log, és felajánljuk elküldésre.
  setTimeout(() => {
    notifyCrash(checkCrash());
  }, 12000);

  setInterval(() => {
    let running = false;
    try {
      running = isGameRunning();
    } catch {
      running = false;
    }
    if (running !== gameSeenRunning) {
      // Állapotváltás: a felület (JÁTÉK gomb, tippek) azonnal kövesse.
      log(running ? '• A játék elindult.' : '• A játék bezárult.');
      if (win && !win.isDestroyed()) win.webContents.send('refresh');
      if (gameSeenRunning && !running) {
        // A JVM a kilépés után pár másodperccel írja ki a hs_err fájlt.
        setTimeout(() => notifyCrash(checkCrash()), 5000);
      }
    }
    gameSeenRunning = running;
  }, 10000);

  // ---- Auto-updater ---------------------------------------------------
  // A GitHub repó main ágát követi. Induláskor csak ELLENŐRZI a frissítést,
  // és a felület kérdezi meg – a játékos OK-zza le, mielőtt bármi cserélődik.
  // Fejlesztői módban (electron .) nem írja felül a saját munkakönyvtárat.
  setTimeout(async () => {
    try {
      if (!app.isPackaged) {
        log('• Fejlesztői mód: automatikus frissítés kihagyva.');
        return;
      }
      log('• Frissítés ellenőrzése a GitHubon…');
      const payload = await updateInfoPayload();
      if (payload.update) log(`• Új launcher verzió érhető el: ${payload.fromVersion} → ${payload.toVersion}`);
      else log('✓ ' + (payload.reason || 'naprakész'));
      if (payload.update && win && !win.isDestroyed()) win.webContents.send('update-available', payload);
    } catch (err) {
      log('! Frissítés hiba: ' + (err && err.message ? err.message : err));
    }
  }, 2500);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  appQuitting = true;
});

ipcMain.handle('status:get', () => status());

ipcMain.handle('config:get', () => cfg);

ipcMain.handle('config:set', (e, next) => {
  const patch = next || {};
  cfg = {
    ...cfg,
    ...patch,
    updateCheckUrl: patch.updateCheckUrl != null ? String(patch.updateCheckUrl).trim() : cfg.updateCheckUrl,
    server: { ...cfg.server, ...(patch.server || {}) },
    collectionId:
      patch.collectionId !== undefined
        ? String(patch.collectionId).trim() || DEFAULT_CONFIG.collectionId
        : cfg.collectionId,
    jvmMaxMb: Number(patch.jvmMaxMb || cfg.jvmMaxMb || 8192) || 8192,
    installedModIds: Array.isArray(patch.installedModIds)
      ? patch.installedModIds.map(String).filter(Boolean)
      : cfg.installedModIds,
  };
  save();
  return cfg;
});

// ---- frissítés ---------------------------------------------------------

// A launcher saját verziója (package.json) és a GitHubon jelzett legfrissebb
// verzió (news.json) – a felület ezt írja ki: "0.7 → 0.8".
function localVersion() {
  try {
    // A csomag 0.7.0-t ír, a felületen viszont 0.7-et mutatunk.
    return String(app.getVersion() || '').trim().replace(/\.0$/, '') || '0.0';
  } catch {
    return '0.0';
  }
}

// "1.2.3" / "v1.2" összehasonlítás. A hírfeed verziója külön fájlban él, ezért
// előfordulhat, hogy régebbi, mint a telepített launcher – ilyenkor nem szabad
// visszafelé ugrálni a verziószámmal a frissítés-ablakban.
function parseVersion(value) {
  const m = String(value || '').match(/^v?(\d+)\.(\d+)(?:\.(\d+))?/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3] || 0)] : null;
}

function compareVersions(a, b) {
  const A = parseVersion(a);
  const B = parseVersion(b);
  if (!A || !B) return 0;
  for (let i = 0; i < 3; i++) {
    if (A[i] !== B[i]) return A[i] > B[i] ? 1 : -1;
  }
  return 0;
}

async function updateInfoPayload() {
  const userDataDir = app.getPath('userData');
  const fromVersion = localVersion();
  const [res, info] = await Promise.all([
    update.checkForUpdate({ cfg, userDataDir, appRoot: __dirname }),
    news.fetchNews({ cfg, appRoot: __dirname }).catch(() => ({ items: [], version: '' })),
  ]);
  const shortSha = res && res.remoteSha ? res.remoteSha.slice(0, 7) : '';
  const newsVersion = String((info && info.version) || '').trim();
  // Csak akkor mutatunk új verziót, ha az tényleg újabb a telepítettnél.
  const newsIsNewer = !!newsVersion && compareVersions(newsVersion, fromVersion) > 0;
  // A célverzió a repóban lévő package.json verziója (a frissítés-indexből),
  // ha a hírfeedben nincs újabb bejegyzés – így nem „0.9.43 · sha” alak jelenik meg.
  const remoteVersion = (res && res.remoteVersion) || '';
  let toVersion = newsIsNewer ? newsVersion : remoteVersion;
  if (!toVersion) toVersion = shortSha ? `${fromVersion} · ${shortSha}` : fromVersion;
  const items = (info && info.items) || [];
  // Az új verzióhoz tartozó újdonságok (ha a hírfeedben meg van jelölve).
  const changes = items
    .filter((it) => (it.version ? it.version === (newsIsNewer ? newsVersion : '') : true))
    .slice(0, 3);
  return {
    ok: !!(res && res.ok),
    update: !!(res && res.update),
    reason: (res && res.reason) || '',
    fromVersion,
    toVersion: toVersion || '?' ,
    remoteSha: (res && res.remoteSha) || '',
    remoteMessage: (res && res.remote && res.remote.message) || '',
    changeItems: changes,
  };
}

ipcMain.handle('app:version', () => ({
  version: localVersion(),
  packaged: app.isPackaged,
  sha: baselineSha(),
}));

ipcMain.handle('news:get', async (e, force, mode) => {
  try {
    return await news.fetchNews({ cfg, appRoot: __dirname, force: !!force, mode });
  } catch (err) {
    return { ok: false, items: [], error: err && err.message ? err.message : String(err) };
  }
});

ipcMain.handle('update:info', () =>
  update.getUpdateInfo({
    cfg,
    userDataDir: app.getPath('userData'),
    appRoot: __dirname,
  })
);

ipcMain.handle('update:check', async () => {
  try {
    const payload = await updateInfoPayload();
    if (!payload.ok) log('! Frissítés ellenőrzés: ' + payload.reason);
    else if (payload.update) log(`✓ Új verzió érhető el: ${payload.fromVersion} → ${payload.toVersion}`);
    else log('✓ ' + payload.reason);

    // Fejlesztői módban (electron .) a frissítés nem telepíthető, ezért nem is
    // kínáljuk fel: csak a naplóba kerül, hogy van újabb commit a repóban.
    if (!app.isPackaged) {
      if (payload.update) log('• Fejlesztői mód: a frissítés nem telepíthető, dolgozz tovább a forrásból.');
      return {
        ...payload,
        update: false,
        devMode: true,
        reason: payload.ok ? 'fejlesztői mód – nincs mit telepíteni' : payload.reason,
      };
    }

    return payload;
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('update:apply', async () => {
  if (!app.isPackaged) {
    return { ok: false, error: 'Fejlesztői módban a frissítés nem telepíthető.' };
  }
  try {
    const userDataDir = app.getPath('userData');
    const res = await update.checkForUpdate({ cfg, userDataDir, appRoot: __dirname });
    if (!res.ok) return { ok: false, error: res.reason };
    if (!res.update) return { ok: false, error: 'Már naprakész – nincs új verzió.' };

    log(`Frissítés telepítése: ${res.remoteSha ? res.remoteSha.slice(0, 7) : '?'}…`);
    const applied = await update.applyUpdate({
      cfg,
      userDataDir,
      appRoot: __dirname,
      res,
      log,
      progress,
    });

    if (applied.ok && applied.restartRequired === false) {
      log('• A fájlok már naprakészek, nincs szükség újraindításra.');
    } else if (applied.ok) {
      log(`✓ Frissítve: ${applied.newVersion}. A launcher újraindul…`);
      setTimeout(() => {
        app.relaunch();
        app.exit(0);
      }, 1500);
    } else {
      log('✗ Frissítés sikertelen: ' + applied.error);
      // A naplófájlba a részletek is bekerülnek: melyik fájl, milyen okkal.
      const failed = Array.isArray(applied.failed) ? applied.failed : [];
      failed.slice(0, 10).forEach((f) => {
        log(`  ✗ ${f && f.file ? f.file : '?'}: ${f && f.error ? f.error : '?'}`);
      });
      if (failed.length > 10) log(`  … és még ${failed.length - 10} fájl.`);
    }
    return applied;
  } catch (err) {
    return reportError(err);
  }
});

// ---- csomagok (modok / optimalizáló zip-ek a GitHubról) ------------------

ipcMain.handle('packs:sync', async (e, force) => {
  try {
    return await packs.sync({
      cfg,
      userDataDir: app.getPath('userData'),
      log,
      force: !!force,
    });
  } catch (err) {
    return reportError(err);
  }
});

// ---- PZO Launcher (optimalizáló motor a Master mappából) -----------------

ipcMain.handle('pzo:status', () =>
  pzo.status({
    cfg,
    userDataDir: app.getPath('userData'),
    gameDir: resolveGamePath(cfg),
  })
);

ipcMain.handle('pzo:install', async () => {
  if (busy) return { ok: false, error: 'Már fut egy művelet.' };
  busy = true;
  try {
    return await pzo.install({
      cfg,
      userDataDir: app.getPath('userData'),
      log,
      onProgress: (done, total) => progress({ label: 'PZO letöltése', done, total }),
    });
  } catch (err) {
    return reportError(err);
  } finally {
    busy = false;
    progress(null);
  }
});

// ---- opcionális modok (ETO textúrák, 6282 3D modell) ----------------------
// Ezek soha nem települnek maguktól: a játékos dönt.

ipcMain.handle('optmods:status', () => mods.status());

ipcMain.handle('optmods:install', async (e, id) => {
  if (busy) return { ok: false, error: 'Már fut egy művelet.' };
  busy = true;
  try {
    // A Viewpoint NIGHTLY a Master mappából jön, és a játék Workshop mappájába
    // kerül (nem a Zomboid\mods alá), ezért külön útvonalon települ.
    if (id === 'nightly') {
      return await mods.installNightly({
        cfg,
        userDataDir: app.getPath('userData'),
        log,
        onProgress: (done, total) => progress({ label: 'Viewpoint NIGHTLY letöltése', done, total }),
      });
    }
    return await mods.install({
      cfg,
      userDataDir: app.getPath('userData'),
      id,
      log,
      onProgress: (done, total) => progress({ label: 'Csomag letöltése', done, total }),
    });
  } catch (err) {
    return reportError(err);
  } finally {
    busy = false;
    progress(null);
  }
});

ipcMain.handle('optmods:remove', async (e, id) => {
  if (busy) return { ok: false, error: 'Már fut egy művelet.' };
  if (isGameRunning(true)) return { ok: false, error: 'A játék fut – zárd be, és utána törölhető.' };
  busy = true;
  try {
    if (id === 'nightly') return mods.removeNightly({ log });
    return mods.remove({ id, log });
  } catch (err) {
    return reportError(err);
  } finally {
    busy = false;
  }
});

// ---- események (events.json a GitHubról) --------------------------------

ipcMain.handle('events:get', async (e, force) => {
  try {
    return await events.fetchEvent({ cfg, force: !!force });
  } catch (err) {
    return reportError(err);
  }
});

// ---- mod lista ----------------------------------------------------------
// A játék modlistája (Zomboid\mods\default.txt) + a gépen ténylegesen megtalált
// modok összevetése: mi van bekapcsolva, mi van telepítve, és mi az, ami
// bekapcsolt, de már nincs a gépen (a régi kollekciók maradéka).

function collectModRows() {
  const zd = zomboidDir();
  const content = modlist.readModList(zd);
  const enabled = modlist.listEnabledIds(content);
  const enabledSet = new Set(enabled.map((id) => id.toLowerCase()));
  const rows = new Map();

  const push = (mod, source, workshopId) => {
    const key = String(mod.id).toLowerCase();
    const row = {
      id: mod.id,
      name: mod.name || mod.id,
      source,
      workshopId: workshopId || '',
      enabled: enabledSet.has(key),
      dir: mod.modDir,
    };
    const prev = rows.get(key);
    // A workshop példány elsőbbséget élvez a helyi másolattal szemben.
    if (!prev || prev.source === 'local') rows.set(key, row);
  };

  const localRoot = path.join(zd, 'mods');
  let localEntries = [];
  try {
    localEntries = fs.readdirSync(localRoot, { withFileTypes: true });
  } catch {
    localEntries = [];
  }
  for (const entry of localEntries) {
    if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
    try {
      for (const m of modinfo.discoverMods(path.join(localRoot, entry.name), 4)) push(m, 'local');
    } catch {
      // Egy hibás mod mappa ne borítsa a teljes listát.
    }
  }

  const steamPath = findSteamPath();
  const libs = steamPath ? parseLibraryPaths(steamPath) : [];
  for (const lib of libs) {
    const root = path.join(lib, 'steamapps', 'workshop', 'content', PZ_APP_ID);
    let items = [];
    try {
      items = fs.readdirSync(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const it of items) {
      if (!it.isDirectory()) continue;
      try {
        for (const m of modinfo.discoverMods(path.join(root, it.name), 4)) push(m, 'workshop', it.name);
      } catch {
        // Egy hibás workshop elem ne borítsa a teljes listát.
      }
    }
  }

  const list = [...rows.values()].sort((a, b) => a.name.localeCompare(b.name, 'hu'));
  const installed = new Set(list.map((r) => r.id.toLowerCase()));
  const missing = enabled.filter((id) => !installed.has(id.toLowerCase()));

  return {
    ok: true,
    zomboidDir: zd,
    modListPath: modlist.modListFile(zd),
    mods: list,
    missing,
    counts: {
      enabled: enabled.length,
      installed: list.length,
      enabledInstalled: list.filter((r) => r.enabled).length,
      enabledMissing: missing.length,
      disabled: list.filter((r) => !r.enabled).length,
      workshop: list.filter((r) => r.source === 'workshop').length,
      local: list.filter((r) => r.source === 'local').length,
    },
  };
}

// A régi kollekciók maradék sorainak törlése: csak azok az ID-k mennek ki a
// default.txt-ből, amikhez a gépen egyáltalán nincs mod (se workshopon, se
// Zomboid\mods-ban). Játék közben nem nyúlunk hozzá, mert kilépéskor a játék
// visszaírja a saját listáját.
ipcMain.handle('mods:cleanMissing', () => {
  try {
    if (isGameRunning(true)) {
      return { ok: false, error: 'A játék fut – zárd be, különben kilépéskor visszaírja a listát.' };
    }

    const report = collectModRows();
    if (!report.ok) return report;

    const ids = report.missing || [];
    if (!ids.length) return { ok: true, removed: 0 };

    try {
      fs.copyFileSync(report.modListPath, report.modListPath + '.bak-cleanup');
    } catch {
      // A mentés best effort; a törlés így is megtörténik.
    }

    const res = modlist.removeEnabled(report.zomboidDir, ids);
    const removed = (res && res.removed ? res.removed.length : 0);
    log(`• Mod lista: ${removed} hiányzó sor törölve.`);
    return { ok: true, removed };
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('mods:report', () => {
  try {
    return collectModRows();
  } catch (err) {
    return {
      ok: false,
      error: err && err.message ? err.message : String(err),
      mods: [],
      missing: [],
      counts: {},
    };
  }
});

// ---- játék mappa kereső -------------------------------------------------
// Végigfésüli a gépet (Steam könyvtárak + minden meghajtó), és a megtalált
// Project Zomboid mappákból a játékos választ; onnantól minden oda települ.

ipcMain.handle('game:find', () => {
  try {
    const candidates = findGameCandidates();
    const current = resolveGamePath(cfg);
    log(candidates.length ? `• Játék keresése: ${candidates.length} mappa található.` : '• Játék keresése: nincs Project Zomboid a gépen.');
    return {
      ok: true,
      candidates,
      current,
      defaultPath: DEFAULT_GAME_DIR,
    };
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('game:setPath', (e, dir) => {
  try {
    const value = String(dir || '').trim().replace(/\//g, '\\').replace(/\\+$/, '');
    if (value && !isGameDir(value)) {
      return { ok: false, error: `Ebben a mappában nincs ${GAME_EXE} – válassz másik mappát.` };
    }
    cfg = { ...cfg, gamePath: value };
    save();
    log(value ? `✓ Játék mappa beállítva: ${value}` : '• Játék mappa: automatikus keresés (Steam)');
    const st = status();
    return { ok: true, status: st };
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('dialog:pickDirectory', async () => {
  const res = await dialog.showOpenDialog(win, {
    title: 'Project Zomboid mappa kiválasztása',
    properties: ['openDirectory'],
  });
  return res.canceled ? null : res.filePaths[0];
});

ipcMain.handle('shell:openExternal', async (e, url) => {
  const target = String(url || '');
  if (!/^(https:\/\/|steam:\/\/)/i.test(target)) return { ok: false, error: 'Nem engedélyezett hivatkozás.' };
  await shell.openExternal(target);
  return { ok: true };
});

// ---- magyarítás (opcionális) --------------------------------------------
// A Master mappában lévő HU csomagok csak akkor kerülnek fel, ha a játékos
// az Optimalizálás panelen kéri őket.
ipcMain.handle('hu:status', () => {
  try {
    return hu.status(app.getPath('userData'));
  } catch {
    return { installed: false, ids: [], dirs: [] };
  }
});

ipcMain.handle('hu:install', async () => {
  if (busy) return { ok: false, error: 'Már fut egy művelet.' };
  busy = true;
  try {
    progress({ label: 'Magyarítás telepítése…' });
    const res = await hu.sync({ cfg, userDataDir: app.getPath('userData'), log });
    progress(null);
    if (res.ok) log('✓ Magyarítás telepítve és engedélyezve.');
    return res;
  } catch (err) {
    progress(null);
    return reportError(err);
  } finally {
    busy = false;
  }
});

ipcMain.handle('hu:remove', async () => {
  try {
    const res = await hu.remove({ userDataDir: app.getPath('userData'), log });
    if (!res.removed) log('• Magyarítás: nem volt telepítve.');
    return res;
  } catch (err) {
    return reportError(err);
  }
});

// ---- kollekció ----------------------------------------------------------

// mode: 'blackout' esetén az egyjátékos modpack kollekcióját tölti le, mert
// Ha a Steam kollekció darabszáma megváltozott (valaki kivett/hozzáadott egy
// modot), azt a napló kiírja – különben úgy tűnik, mintha a launcher számolna
// hol 753-at, hol 752-t.
function logCollectionCountChange(label, prev, next) {
  const a = prev && Array.isArray(prev.items) ? prev.items.length : 0;
  const b = next && Array.isArray(next.items) ? next.items.length : 0;
  if (a && b && a !== b) {
    log(`ℹ ${label} száma megváltozott: ${a} → ${b} mod (a Steam kollekció módosult)`);
  }
}

// Mely modok hiányoznak a kollekcióból a gépről? A napló ezeket névvel és
// Steam ID-val írja ki, mert a „752/753” számból nem derül ki, melyik hiányzik.
function collectionMissingMods(mode) {
  const blackoutMode = String(mode || '') === 'blackout';
  const col = blackoutMode ? cfg.blackout && cfg.blackout.collection : cfg.collection;
  if (!col || !Array.isArray(col.items) || !col.items.length) return [];
  const st = status();
  const libs = st.steamPath ? require('./src/paths').parseLibraryPaths(st.steamPath) : [];
  const workshop = require('./src/workshop');
  return col.items.filter((it) => {
    if (!blackoutMode && setup.SKIP_DOWNLOAD_IDS.has(String(it.id))) return false;
    return !workshop.itemDir(libs, it.id);
  });
}

function logMissingCollectionMods(mode, onLog = log) {
  const list = collectionMissingMods(mode);
  if (!list.length) return;
  const name = String(mode || '') === 'blackout' ? 'Blackout' : 'Steam Workshop';
  onLog(`⚠ ${list.length} mod hiányzik a(z) ${name} kollekcióból – ezek nélkül indul a játék:`);
  for (const m of list.slice(0, 20)) onLog(`   • ${m.title || m.id} (${m.id})`);
  if (list.length > 20) onLog(`   … és még ${list.length - 20} mod.`);
  onLog('   Telepítés: MODOK TELEPÍTÉSE gomb vagy a feliratkozó ablak.');
}

// az ellenőrző listának a valós Blackout számokat kell mutatnia.
ipcMain.handle('collection:refresh', async (e, mode) => {
  const blackoutMode = String(mode || '').toLowerCase() === 'blackout';
  try {
    const id = blackoutMode ? blackout.collectionId(cfg) : cfg.collectionId;
    progress({ label: blackoutMode ? 'Blackout kollekció lekérése…' : 'Steam Workshop kollekció lekérése…' });
    const col = await fetchCollection(id);
    if (blackoutMode) {
      logCollectionCountChange('A Blackout kollekció', cfg.blackout && cfg.blackout.collection, col);
      cfg = {
        ...cfg,
        blackout: {
          ...(cfg.blackout || {}),
          collectionId: id,
          collection: { ...col, fetchedAt: Date.now() },
        },
      };
      save();
      log(`✓ Blackout kollekció frissítve: ${col.title} – ${col.items.length} mod.`);
      progress(null);
      return { ok: true, blackout: true, collection: cfg.blackout.collection };
    }
    logCollectionCountChange('A kollekció', cfg.collection, col);
    cfg = { ...cfg, collection: { ...col, fetchedAt: Date.now() } };
    save();
    log(`✓ Kollekció frissítve: ${col.title} – ${col.items.length} mod.`);
    progress(null);
    return { ok: true, collection: cfg.collection };
  } catch (err) {
    progress(null);
    return reportError(err);
  }
});

// ---- feliratkozás ------------------------------------------------------

ipcMain.handle('subscribe:open', async (e, mode) => {
  const blackoutMode = String(mode || '').toLowerCase() === 'blackout';
  try {
    if (blackoutMode) {
      const col = cfg.blackout && cfg.blackout.collection;
      if (!col || !Array.isArray(col.items)) {
        throw new Error('Előbb frissítsd a Blackout kollekciót (Kollekció frissítése).');
      }
      const st = status();
      const libs = st.steamPath ? require('./src/paths').parseLibraryPaths(st.steamPath) : [];
      const missing = (col.items || []).filter(
        (it) => !require('./src/workshop').itemDir(libs, it.id)
      );
      subscribe.openWindow({
        collectionId: blackout.collectionId(cfg),
        missingIds: missing.map((m) => m.id),
        lang: cfg.uiLang,
        onLog: log,
      });
      return { ok: true };
    }
    if (!cfg.collection || !Array.isArray(cfg.collection.items)) {
      throw new Error('Előbb frissítsd a kollekciót (Modok telepítése).');
    }
    const st = status();
    const missing = (cfg.collection.items || []).filter((it) => {
      // A szándékosan kihagyott elemeket (pl. a nightly-vel helyettesített
      // Project Viewpoint) ne kérje feliratkozásra a feliratkozó ablak.
      if (setup.SKIP_DOWNLOAD_IDS.has(String(it.id))) return false;
      const dir = require('./src/workshop').itemDir(
        st.steamPath ? require('./src/paths').parseLibraryPaths(st.steamPath) : [],
        it.id
      );
      return !dir;
    });
    subscribe.openWindow({
      collectionId: cfg.collectionId,
      missingIds: missing.map((m) => m.id),
      lang: cfg.uiLang,
      onLog: log,
    });
    return { ok: true };
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('subscribe:steam', async (e, mode) => {
  const blackoutMode = String(mode || '').toLowerCase() === 'blackout';
  try {
    const id = blackoutMode ? blackout.collectionId(cfg) : cfg.collectionId;
    await subscribe.openSteamClient(id);
    log('A kollekció megnyitva a Steam kliensben – nyomd meg a „Subscribe to all", majd az „Add" gombot.');
    return { ok: true };
  } catch (err) {
    return reportError(err);
  }
});

// ---- szerver státusz (A2S, UDP) ---------------------------------------

ipcMain.handle('server:status', async () => {
  const server = (cfg && cfg.server) || {};
  if (!server.ip) return { online: false, reason: 'Nincs szerver cím beállítva.' };
  try {
    const res = await a2s.queryServer({ host: server.ip, port: server.port, timeoutMs: 2500 });
    return res;
  } catch (err) {
    return { online: false, reason: err.message };
  }
});

// ---- memória -----------------------------------------------------------

ipcMain.handle('system:memory', () => system.getMemoryInfo(Number(cfg.jvmMaxMb) || 8192));

// ---- telepítés ---------------------------------------------------------

ipcMain.handle('mods:install', async () => {
  if (setupRunning) return { ok: false, error: 'Már fut a telepítés.' };
  setupRunning = true;
  busy = true;
  try {
    log('— Telepítés indítása —');
    const res = await runSetup({
      cfg,
      userDataDir: app.getPath('userData'),
      onLog: log,
      onProgress: progress,
      openSubscribe: (missing, col) =>
        subscribe.openWindow({
          collectionId: cfg.collectionId,
          missingIds: missing.map((m) => m.id),
          lang: cfg.uiLang,
          onLog: () => {},
        }),
      openSteamClient: () => subscribe.openSteamClient(cfg.collectionId),
      // Szerveres telepítés: a Viewpoint NIGHTLY (rc4) magától felkerül.
      serverInstall: true,
    });

    cfg = {
      ...cfg,
      collection: res.collection,
      installedModIds: res.enabledIds,
      localCopies: res.localCopies,
      unresolved: res.unresolved,
      zbInstaller: res.installer
        ? { version: res.installer.version, name: res.installer.name, ok: !!res.installer.ok, at: Date.now() }
        : cfg.zbInstaller,
    };

    // A szerver 3D modellje (3810302175) a saját mod.info-val fut: amint a
    // workshop mod megvan, a Master mappában lévő mod.info-t ráírjuk.
    try {
      const voxel = await eotl.applyVoxelModInfo({
        cfg,
        userDataDir: app.getPath('userData'),
        log,
      });
      if (voxel && voxel.changed) save();
    } catch (err) {
      log('! 3D models for Viewpoint: ' + (err && err.message ? err.message : err));
    }

    save();
    progress(null);
    return { ok: true };
  } catch (err) {
    progress(null);
    return reportError(err);
  } finally {
    setupRunning = false;
    busy = false;
  }
});

ipcMain.handle('zb:install', async () => {
  if (busy) return { ok: false, error: 'Már fut egy művelet.' };
  busy = true;
  try {
    const res = await zbInstaller.installZombieBuddy({
      cfg,
      userDataDir: app.getPath('userData'),
      gameDir: resolveGamePath(cfg),
      onLog: log,
      onProgress: progress,
    });
    cfg = {
      ...cfg,
      zbInstaller: { version: res.version, name: res.name, ok: !!res.ok, at: Date.now() },
    };
    save();
    progress(null);
    return { ok: !!res.ok, error: res.ok ? undefined : res.message };
  } catch (err) {
    progress(null);
    return reportError(err);
  } finally {
    busy = false;
  }
});

// ---- End of The Living (többjátékos) saját kiegészítői ------------------
// Ezek csak a szerveres Optimalizálás panelen jelennek meg.

ipcMain.handle('eotl:status', () => {
  try {
    return { ok: true, voxel: eotl.status().voxel };
  } catch (err) {
    return { ok: false, error: err && err.message ? err.message : String(err), voxel: { installed: false, patched: false } };
  }
});

ipcMain.handle('eotl:voxel', async () => {
  if (busy) return { ok: false, error: 'Már fut egy művelet.' };
  if (isGameRunning(true)) return { ok: false, error: 'A játék fut – zárd be, és utána cserélhető.' };
  busy = true;
  try {
    const res = await eotl.applyVoxelModInfo({
      cfg,
      userDataDir: app.getPath('userData'),
      log,
    });
    progress(null);
    return res;
  } catch (err) {
    progress(null);
    return reportError(err);
  } finally {
    busy = false;
  }
});

ipcMain.handle('mods:openFolder', async () => {
  const dir = path.join(zomboidDir(), 'mods');
  try {
    fs.mkdirSync(dir, { recursive: true });
    await shell.openPath(dir);
    return { ok: true };
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('shortcut:create', async () => {
  const res = await shortcuts.ensureDesktopShortcut({ force: true });
  if (res && res.created) log('✓ Parancsikon létrehozva az asztalon: ' + (res.path || ''));
  else if (res && res.error) log('! Parancsikon: ' + res.error);
  return res || { ok: false };
});

// ---- Blackout: egyjátékos modpack --------------------------------------

// A modpack telepítése a szerver kollekcióval azonos úton megy (feliratkozás,
// letöltés, engedélyezés), utána a config fájl bemásolása következik.
async function installBlackoutModpack(keepUserPresets = true) {
  const res = await blackout.install({
    cfg,
    userDataDir: app.getPath('userData'),
    keepUserPresets,
    onLog: log,
    onProgress: progress,
    openSubscribe: (missing) =>
      subscribe.openWindow({
        collectionId: blackout.collectionId(cfg),
        missingIds: missing.map((m) => m.id),
        lang: cfg.uiLang,
        onLog: () => {},
      }),
    openSteamClient: () => subscribe.openSteamClient(blackout.collectionId(cfg)),
  });

  const prev = (cfg && cfg.blackout) || {};
  cfg = {
    ...cfg,
    blackout: {
      ...prev,
      collectionId: blackout.collectionId(cfg),
      collection: res.collection,
      enabledIds: res.enabledIds,
      unresolved: res.unresolved,
      configAt: res.config && res.config.ok ? Date.now() : prev.configAt || 0,
    },
  };
  save();
  // Az ellenőrző lista azonnal mutassa az új állapotot (ne kelljen frissíteni).
  if (win && !win.isDestroyed()) win.webContents.send('refresh');
  return res;
}

ipcMain.handle('blackout:status', () => blackout.summary(cfg));

ipcMain.handle('blackout:install', async () => {
  if (setupRunning) return { ok: false, error: 'Már fut a telepítés.' };
  setupRunning = true;
  busy = true;
  try {
    log('— Blackout egyjátékos modpack telepítése —');
    const res = await installBlackoutModpack();
    progress(null);
    return { ok: true, config: res.config };
  } catch (err) {
    progress(null);
    return reportError(err);
  } finally {
    setupRunning = false;
    busy = false;
  }
});

// Csak a config fájl(ok) újrapróbálása (a modok már letöltve vannak).
ipcMain.handle('blackout:config', async () => {
  if (busy) return { ok: false, error: 'Már fut egy művelet.' };
  busy = true;
  try {
    const res = await blackout.applyConfig({
      cfg,
      userDataDir: app.getPath('userData'),
      onLog: log,
      onProgress: progress,
      lang: cfg.uiLang,
    });
    if (res.copied) {
      cfg = { ...cfg, blackout: { ...(cfg.blackout || {}), configAt: Date.now() } };
      save();
    }
    progress(null);
    return { ok: !!res.ok, config: res };
  } catch (err) {
    progress(null);
    return reportError(err);
  } finally {
    busy = false;
  }
});

// ---- indítás -----------------------------------------------------------

// Ha a launcher úgy látja, hogy fut a játék, a napló megmondja, mit lát
// (folyamatnév, kor, ablak) – így egy téves felismerés kiderül a sorból.
function alreadyRunningMessage(interim = false) {
  const base = interim
    ? '• A játék időközben elindult – nem indítok második példányt.'
    : '• A játék már fut – nem indítok második példányt.';
  let reason = '';
  try {
    reason = runningGameReason();
  } catch {
    reason = '';
  }
  return reason ? `${base} (${reason})` : base;
}

ipcMain.handle('game:launch', async (event, mode) => {
  const blackoutMode = String(mode || '').toLowerCase() === 'blackout';
  if (launchInFlight) return { ok: false, error: 'Már indul a játék – várd meg, míg elindul.' };
  try {
    const gameDir = resolveGamePath(cfg);
    if (!gameDir) throw new Error('Project Zomboid nem található. Beállítások → Játék mappája.');
    // A játék betöltése nagy modpacknél percekig tart: ilyenkor nem indítunk
    // második példányt (ez okozta a dupla indulást).
    if (isGameRunning(true)) {
      log(alreadyRunningMessage());
      return { ok: true, alreadyRunning: true };
    }
    launchInFlight = true;
    const mem = system.getMemoryInfo(Number(cfg.jvmMaxMb) || 8192);
    if (!mem.enough) {
      log('⚠ ' + mem.message);
    }
    if (blackoutMode) {
      if (setupRunning) return { ok: false, error: 'Már fut a telepítés – várd meg, míg végez.' };
      // A telepítés jelzője a dupla kattintás ellen véd: két párhuzamos
      // config-másolás egymást írná felül.
      setupRunning = true;
      busy = true;
      try {
        log('— Blackout egyjátékos mód: a modpack előkészítése —');
        // A játékban mentett trait- és karakter-presetek a játékoséi: csak
        // engedéllyel írjuk felül őket (config-frissítés ne törölje a munkáját).
        let keepUserPresets = true;
        try {
          const conflicts = blackout.userPresetConflicts();
          if (conflicts.length && win && !win.isDestroyed()) {
            // A natív kérdésablak nem megy át a felület fordítóján, ezért itt
            // kell a választott nyelven megfogalmazni.
            const en = String(cfg.uiLang || '').toLowerCase() === 'en';
            const { response } = await dialog.showMessageBox(win, {
              type: 'question',
              buttons: en
                ? ['Keep my own', 'Use the pack defaults']
                : ['Megtartom a sajátomat', 'A pakk alapját kérem'],
              defaultId: 0,
              cancelId: 0,
              noLink: true,
              title: en ? 'Trait and character presets' : 'Trait és karakter presetek',
              message: en
                ? 'Should I keep your own trait and character presets?'
                : 'Megtartsam a saját trait- és karakter-presetjeidet?',
              detail: en
                ? 'A config update would overwrite the trait and character customisation presets saved in the game.\n\n' +
                  'Keep my own: the launcher does not touch them, the pack defaults are not applied.\n' +
                  'Use the pack defaults: the pack defaults take their place (the old ones are saved).'
                : 'A config frissítése felülírná a játékban mentett trait- és karakter-testreszabás presetjeidet.\n\n' +
                  'Megtartom a sajátomat: a launcher hozzád sem nyúl, a pakk alap presetje nem kerül be.\n' +
                  'A pakk alapját kérem: a pakk szerinti alap lép a helyükre (a régi elmentve).',
            });
            keepUserPresets = response === 0;
          }
        } catch (err) {
          log('! A preset-kérdés nem jelent meg: ' + (err && err.message ? err.message : err));
        }
        if (keepUserPresets) log('• A saját trait/karakter presetjeid megmaradnak.');
        else log('• A pakk alap trait/karakter presetjei kerülnek be.');
        await installBlackoutModpack(keepUserPresets);
      } catch (err) {
        log('! A modpack előkészítése nem sikerült teljesen: ' + err.message);
      } finally {
        setupRunning = false;
        busy = false;
        progress(null);
      }
    }
    // A játék nyelve minden indításnál a launcher nyelvét követi.
    if (blackoutMode) blackout.applyLanguageVariant(zomboidDir(), cfg.uiLang);
    // Ha a NIGHTLY Viewpoint bent van, az alap Project Viewpoint nem maradhat
    // a gépen (a Steam visszatöltheti, ezért minden indításnál ellenőrizzük).
    mods.removeBaseViewpoint({ log });
    // Az előkészítés percekig tarthat: közben elindulhatott a játék (Steamből
    // vagy máshonnan) – ilyenkor sem indítunk másodikat.
    if (isGameRunning(true)) {
      log(alreadyRunningMessage(true));
      return { ok: true, alreadyRunning: true };
    }
    // Egyjátékos módban a modpackhoz ajánlott JVM beállítás (Xms=Xmx + ZGC).
    // Csak ZGC (a felhasználói kérés): mindkét módban ZGC-vel indul a játék.
    // Indítás előtt: mely kollekció-mod hiányzik a gépről (névvel és ID-val).
    logMissingCollectionMods(blackoutMode ? 'blackout' : 'eotl');
    // Korábbi launcher-verzió kikapcsolhatta a modpack modjait (a szerver
    // kollekcióhoz szűrt) – indítás előtt visszakapcsoljuk őket.
    if (blackoutMode) {
      try {
        blackout.repairDisabledMods(cfg, log);
      } catch (err) {
        log('! A mod lista javítása nem sikerült: ' + (err && err.message ? err.message : err));
      }
    }
    launchStartedAt = Date.now();
    await launchGame({ gameDir, cfg, onLog: log, zgc: true, userDataDir: app.getPath('userData') });
    // Ebből lesz a launcher következő indításának alapértelmezett módja.
    noteModeUse(blackoutMode ? 'blackout' : 'eotl');
    // A tényleges futást a figyelő állapítja meg (a B42-nél a java.exe viszi a
    // játékot, nem az indító exe) – így nem lesz hamis „bezárult” üzenet.
    gameSeenRunning = false;
    setTimeout(() => {
      let running = false;
      try {
        // Friss ellenőrzés: a gyorsítótár itt még a régi (indítás előtti) értéket adná.
        running = isGameRunning(true);
      } catch {
        running = false;
      }
      if (running) {
        gameSeenRunning = true;
        log('• A játék elindult.');
      } else {
        log('⚠ A játék 15 mp után sem látszik futónak – nézd meg a Steamet és a játék konzolját.');
        // Miért nem indult el? A játék konzolja és az esetleges JVM-összeomlás
        // megmondja a valódi okot (agent DLL, memória, Steam, letöltés).
        try {
          for (const line of launchFailureDiagnostics(gameDir, zomboidDir(), launchStartedAt)) log(line);
        } catch {
          // A diagnosztika sosem boríthatja a launchert.
        }
      }
    }, 15000);
    return { ok: true };
  } catch (err) {
    return reportError(err);
  } finally {
    launchInFlight = false;
  }
});

// ---- Discord: crash logok + widget --------------------------------------

function crashDirs() {
  return {
    gameDir: resolveGamePath(cfg),
    zomboidDir: zomboidDir(),
    userDataDir: app.getPath('userData'),
  };
}

function checkCrash() {
  try {
    return crash.check(crashDirs());
  } catch (err) {
    return { detected: false, error: err && err.message ? err.message : String(err) };
  }
}

// A renderernek szólunk: felugrik a "szeretnéd elküldeni?" ablak. A launcher
// előjön és villog is, hogy a játékos biztosan észrevegye a felhívást.
function notifyCrash(info) {
  if (!info || !info.detected) return;
  crashReportPending = true;
  log(`• Összeomlás észlelve (${info.primary.name}) – elküldhető a szervernek.`);
  if (!win || win.isDestroyed()) return;
  try {
    if (win.isMinimized()) win.restore();
    if (!win.isVisible()) win.show();
    win.focus();
    win.setAlwaysOnTop(true);
    win.flashFrame(true);
    setTimeout(() => {
      if (!win || win.isDestroyed()) return;
      win.setAlwaysOnTop(false);
      win.flashFrame(false);
    }, 6000);
  } catch {
    /* ha nem sikerül, a felület akkor is jelzi */
  }
  win.webContents.send('crash', info);
}

// Az egyjátékos mód a Blackout szerver widgetjét kapja, a többjátékos a sajátot.
ipcMain.handle('discord:widget', async (e, mode) => {
  const blackoutMode = String(mode || '').toLowerCase() === 'blackout';
  const guildId = blackoutMode ? discord.BLACKOUT_GUILD_ID : discord.WIDGET_GUILD_ID;
  try {
    return { ok: true, ...(await discord.widget(guildId)) };
  } catch (err) {
    return {
      ok: false,
      guildId,
      widgetUrl: discord.guildConfig(guildId).embed,
      invite: discord.guildConfig(guildId).invite,
      error: err && err.message ? err.message : String(err),
    };
  }
});

// Melyik mód legyen az induló? Amelyiket a játékos többször indította.
// Egyenlőségnél a legutóbbi, ha az sincs: a többjátékos (szerver) mód.
function defaultMode() {
  const use = (cfg && cfg.modeUse) || {};
  const eotl = Number(use.eotl) || 0;
  const blackout = Number(use.blackout) || 0;
  if (blackout > eotl) return 'blackout';
  if (eotl > blackout) return 'eotl';
  return cfg && cfg.lastMode === 'blackout' ? 'blackout' : 'eotl';
}

// Egy indítás rögzítése: ebből tudjuk, melyik módot használja többet.
function noteModeUse(mode) {
  const m = String(mode || '').toLowerCase() === 'blackout' ? 'blackout' : 'eotl';
  const use = { ...(cfg.modeUse || {}) };
  use[m] = (Number(use[m]) || 0) + 1;
  cfg = { ...cfg, modeUse: use, lastMode: m };
  save();
  return m;
}

ipcMain.handle('mode:default', () => ({ mode: defaultMode() }));
ipcMain.handle('mode:used', (e, mode) => {
  noteModeUse(mode);
  return { ok: true, mode: defaultMode(), use: cfg.modeUse };
});

// A választott felületi nyelv a főfolyamatnak is kell (natív ablakok, üzenetek).
ipcMain.handle('lang:get', () => (cfg && cfg.uiLang) || 'hu');
ipcMain.handle('lang:set', (e, lang) => {
  const next = String(lang || '').toLowerCase() === 'en' ? 'en' : 'hu';
  cfg = { ...cfg, uiLang: next };
  save();
  return { ok: true, lang: next };
});

ipcMain.handle('crash:check', () => {
  const info = checkCrash();
  // Amint a felület összeomlást lát, a beküldés kötelezővé válik (kilépéskor is).
  if (info && info.detected) crashReportPending = true;
  return info;
});

// Kézi küldéshez: mit tudnánk most elküldeni (a legfrissebb logok).
ipcMain.handle('crash:latest', () => {
  try {
    return crash.latest(crashDirs());
  } catch (err) {
    return { detected: false, error: err && err.message ? err.message : String(err) };
  }
});

ipcMain.handle('crash:send', async (e, payload) => {
  try {
    const manual = !!(payload && payload.manual);
    const info = manual ? crash.latest(crashDirs()) : checkCrash();
    if (!info.detected) {
      throw new Error(
        manual
          ? 'Nem találtam elküldhető logot (hs_err / console.txt / Logs).'
          : 'Már nincs elküldhető crash log.'
      );
    }
    const files = crash.readFiles(info.files);
    if (!files.length) throw new Error('A crash log nem olvasható.');
    const mem = system.getMemoryInfo(Number(cfg.jvmMaxMb) || 8192);
    const res = await discord.sendCrash({
      webhookUrl: cfg.discordWebhook,
      discordName: payload && payload.name,
      files,
      meta: {
        server: cfg.server && cfg.server.name,
        version: app.getVersion(),
        sha: baselineSha(),
        ramGb: mem.totalGb,
        heapMb: Number(cfg.jvmMaxMb) || 0,
        lang: cfg.uiLang,
        summary: crash.summarize(info.files[0].path),
      },
    });
    crash.markReported(app.getPath('userData'), info.files);
    crashReportPending = false;
    log('✓ Crash log elküldve a szerver Discordjára: ' + res.sent.join(', '));
    return res;
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('crash:dismiss', () => {
  const info = checkCrash();
  if (info.detected) crash.markReported(app.getPath('userData'), info.files);
  crashReportPending = false;
  return { ok: true };
});

ipcMain.handle('discord:open', () => {
  return shell.openExternal(discord.DISCORD_CHANNEL_URL);
});

// A build commitja (ha van), hogy a Discord-üzenetből látszódjon a verzió.
function baselineSha() {
  try {
    const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'update-baseline.json'), 'utf8'));
    return String(json.sha || '');
  } catch {
    return '';
  }
}
