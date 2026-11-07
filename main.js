const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const { loadConfig, saveConfig, DEFAULT_CONFIG } = require('./src/config');
const {
  getEnvironment,
  resolveGamePath,
  zomboidDir,
  findGameCandidates,
  isGameDir,
  gamePathWarning,
  DEFAULT_GAME_DIR,
  GAME_EXE,
} = require('./src/paths');
const news = require('./src/news');
const { launchGame, isGameRunning } = require('./src/launch');
const { runSetup } = require('./src/setup');
const { fetchCollection } = require('./src/collection');
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

// A launcher csak akkor ellenőrzi frissítést, ha a cfg.updateCheckUrl be van állítva.
// A GitHub projektben át lett állítva erre a repo-ra:
//   https://github.com/NeoiMods/End-of-The-Living-Launcher.git

const ICON = path.join(__dirname, 'assets', 'icon.png');

let win = null;
let cfg = null;
let busy = false;
let setupRunning = false;
// Játék bezárásának figyelése a crash loghoz.
let gameSeenRunning = false;

function log(line) {
  if (win && !win.isDestroyed()) win.webContents.send('log', String(line));
}

function progress(payload) {
  if (win && !win.isDestroyed()) win.webContents.send('progress', payload);
}

function status() {
  return getEnvironment(cfg, { userDataDir: app.getPath('userData') });
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
}

app.whenReady().then(() => {
  cfg = loadConfig(app.getPath('userData'));
  // A gyári (szerver beállítás) értékek mentése első indításkor.
  if (!cfg.installedModIds) cfg.installedModIds = [];
  save();
  createWindow();
  shortcuts.ensureDesktopShortcut().then((res) => {
    if (res && res.created) log('✓ Parancsikon létrehozva az asztalon.');
  });

  const warn = gamePathWarning(resolveGamePath(cfg));
  if (warn) log(`! KRITIKUS: a játék nem az alap Steam helyen van (${warn.gamePath}).`);

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

async function updateInfoPayload() {
  const userDataDir = app.getPath('userData');
  const fromVersion = localVersion();
  const [res, info] = await Promise.all([
    update.checkForUpdate({ cfg, userDataDir, appRoot: __dirname }),
    news.fetchNews({ cfg, appRoot: __dirname }).catch(() => ({ items: [], version: '' })),
  ]);
  const toVersion = (info && info.version) || (res && res.remoteSha ? res.remoteSha.slice(0, 7) : '');
  const items = (info && info.items) || [];
  // Az új verzióhoz tartozó újdonságok (ha a news.json-ban meg van jelölve).
  const changes = items
    .filter((it) => (it.version ? it.version === toVersion : true))
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

ipcMain.handle('news:get', async (e, force) => {
  try {
    return await news.fetchNews({ cfg, appRoot: __dirname, force: !!force });
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

    log(`Frissítés telepítése: ${res.remoteSha.slice(0, 7)}…`);
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
  if (isGameRunning()) return { ok: false, error: 'A játék fut – zárd be, és utána törölhető.' };
  busy = true;
  try {
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
      warning: gamePathWarning(current),
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
    if (st.gameWarning) log('! KRITIKUS: a játék nincs az alap Steam helyen – crashek/glitchek jöhetnek.');
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

// ---- kollekció ----------------------------------------------------------

ipcMain.handle('collection:refresh', async () => {
  try {
    progress({ label: 'Steam Workshop kollekció lekérése…' });
    const col = await fetchCollection(cfg.collectionId);
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

ipcMain.handle('subscribe:open', async () => {
  try {
    if (!cfg.collection || !Array.isArray(cfg.collection.items)) {
      throw new Error('Előbb frissítsd a kollekciót (Modok telepítése).');
    }
    const st = status();
    const missing = (cfg.collection.items || []).filter((it) => {
      const dir = require('./src/workshop').itemDir(
        st.steamPath ? require('./src/paths').parseLibraryPaths(st.steamPath) : [],
        it.id
      );
      return !dir;
    });
    subscribe.openWindow({
      collectionId: cfg.collectionId,
      missingIds: missing.map((m) => m.id),
      onLog: log,
    });
    return { ok: true };
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('subscribe:steam', async () => {
  try {
    await subscribe.openSteamClient(cfg.collectionId);
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
          onLog: () => {},
        }),
      openSteamClient: () => subscribe.openSteamClient(cfg.collectionId),
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
    const res = await zbInstaller.runZombieBuddyInstaller({
      userDataDir: app.getPath('userData'),
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

// ---- indítás -----------------------------------------------------------

ipcMain.handle('game:launch', async () => {
  try {
    const gameDir = resolveGamePath(cfg);
    if (!gameDir) throw new Error('Project Zomboid nem található. Beállítások → Játék mappája.');
    const mem = system.getMemoryInfo(Number(cfg.jvmMaxMb) || 8192);
    if (!mem.enough) {
      log('⚠ ' + mem.message);
    }
    await launchGame({ gameDir, cfg, onLog: log });
    gameSeenRunning = true;
    return { ok: true };
  } catch (err) {
    return reportError(err);
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

ipcMain.handle('discord:widget', async () => {
  try {
    return { ok: true, ...(await discord.widget()) };
  } catch (err) {
    return { ok: false, error: err && err.message ? err.message : String(err) };
  }
});

ipcMain.handle('crash:check', () => checkCrash());

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
        summary: crash.summarize(info.files[0].path),
      },
    });
    crash.markReported(app.getPath('userData'), info.files);
    log('✓ Crash log elküldve a szerver Discordjára: ' + res.sent.join(', '));
    return res;
  } catch (err) {
    return reportError(err);
  }
});

ipcMain.handle('crash:dismiss', () => {
  const info = checkCrash();
  if (info.detected) crash.markReported(app.getPath('userData'), info.files);
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
