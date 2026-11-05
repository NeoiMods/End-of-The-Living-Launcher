const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const { loadConfig, saveConfig, DEFAULT_CONFIG } = require('./src/config');
const { getEnvironment, resolveGamePath, zomboidDir } = require('./src/paths');
const { launchGame } = require('./src/launch');
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

// A launcher csak akkor ellenőrzi frissítést, ha a cfg.updateCheckUrl be van állítva.
// A GitHub projektben át lett állítva erre a repo-ra:
//   https://github.com/NeoiMods/End-of-The-Living-Launcher.git

const ICON = path.join(__dirname, 'assets', 'icon.png');

let win = null;
let cfg = null;
let busy = false;
let setupRunning = false;

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

  // ---- Auto-updater ---------------------------------------------------
  // A GitHub repó main ágát követi: ha új commit van, letölti és lecseréli
  // a launcher fájljait, majd újraindul. Fejlesztői módban (electron .)
  // nem írja felül a saját munkakönyvtárat.
  setTimeout(async () => {
    try {
      if (!app.isPackaged) {
        log('• Fejlesztői mód: automatikus frissítés kihagyva.');
        return;
      }
      log('• Frissítés ellenőrzése a GitHubon…');
      const res = await update.autoUpdateOnLaunch({
        cfg,
        userDataDir: app.getPath('userData'),
        appRoot: __dirname,
        log,
        progress,
      });
      if (res && res.ok && res.updated) {
        setTimeout(() => {
          app.relaunch();
          app.exit(0);
        }, 1500);
      } else if (res && !res.ok) {
        log('! ' + (res.reason || 'a frissítés nem sikerült'));
      }
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

ipcMain.handle('update:info', () =>
  update.getUpdateInfo({
    cfg,
    userDataDir: app.getPath('userData'),
    appRoot: __dirname,
  })
);

ipcMain.handle('update:check', async () => {
  try {
    const res = await update.checkForUpdate({
      cfg,
      userDataDir: app.getPath('userData'),
      appRoot: __dirname,
    });
    if (!res.ok) log('! Frissítés ellenőrzés: ' + res.reason);
    else if (res.update) log(`✓ Új verzió érhető el: ${res.remoteSha.slice(0, 7)}`);
    else log('✓ ' + res.reason);
    return res;
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
    return await pzo.install({ cfg, userDataDir: app.getPath('userData'), log });
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
    return { ok: true };
  } catch (err) {
    return reportError(err);
  }
});
