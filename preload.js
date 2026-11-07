const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getStatus: () => ipcRenderer.invoke('status:get'),
  getConfig: () => ipcRenderer.invoke('config:get'),
  setConfig: (cfg) => ipcRenderer.invoke('config:set', cfg),
  pickDirectory: () => ipcRenderer.invoke('dialog:pickDirectory'),
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),

  refreshCollection: () => ipcRenderer.invoke('collection:refresh'),
  openSubscribe: () => ipcRenderer.invoke('subscribe:open'),
  openInSteam: () => ipcRenderer.invoke('subscribe:steam'),

  getServerStatus: () => ipcRenderer.invoke('server:status'),
  getMemory: () => ipcRenderer.invoke('system:memory'),

  // ---- frissítés ----
  getVersion: () => ipcRenderer.invoke('app:version'),
  getUpdateInfo: () => ipcRenderer.invoke('update:info'),
  checkUpdate: () => ipcRenderer.invoke('update:check'),
  applyUpdate: () => ipcRenderer.invoke('update:apply'),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', (_event, payload) => cb(payload)),

  // ---- újdonságok (news.json a GitHubon) ----
  getNews: (force) => ipcRenderer.invoke('news:get', force),

  // ---- események ----
  getEvent: (force) => ipcRenderer.invoke('events:get', force),

  // ---- csomagok (mod / optimalizáló zip-ek) ----
  syncPacks: (force) => ipcRenderer.invoke('packs:sync', force),

  // ---- PZO Launcher (optimalizáló motor) ----
  getPzoStatus: () => ipcRenderer.invoke('pzo:status'),
  installPzo: () => ipcRenderer.invoke('pzo:install'),
  getModsStatus: () => ipcRenderer.invoke('optmods:status'),
  installMod: (id) => ipcRenderer.invoke('optmods:install', id),
  removeMod: (id) => ipcRenderer.invoke('optmods:remove', id),

  installMods: () => ipcRenderer.invoke('mods:install'),
  installZombieBuddy: () => ipcRenderer.invoke('zb:install'),
  openModsFolder: () => ipcRenderer.invoke('mods:openFolder'),
  createShortcut: () => ipcRenderer.invoke('shortcut:create'),

  launch: () => ipcRenderer.invoke('game:launch'),

  // ---- Project Zomboid keresése (játék mappa) ----
  findGame: () => ipcRenderer.invoke('game:find'),
  setGamePath: (dir) => ipcRenderer.invoke('game:setPath', dir),
  getHuStatus: () => ipcRenderer.invoke('hu:status'),
  installHu: () => ipcRenderer.invoke('hu:install'),
  removeHu: () => ipcRenderer.invoke('hu:remove'),

  // ---- Discord: crash log + widget ----
  getDiscordWidget: () => ipcRenderer.invoke('discord:widget'),
  openDiscord: () => ipcRenderer.invoke('discord:open'),
  checkCrash: () => ipcRenderer.invoke('crash:check'),
  getLatestCrash: () => ipcRenderer.invoke('crash:latest'),
  sendCrash: (name, manual) => ipcRenderer.invoke('crash:send', { name, manual: !!manual }),
  dismissCrash: () => ipcRenderer.invoke('crash:dismiss'),
  onCrash: (cb) => ipcRenderer.on('crash', (_event, payload) => cb(payload)),

  onLog: (cb) => ipcRenderer.on('log', (_event, line) => cb(line)),
  onProgress: (cb) => ipcRenderer.on('progress', (_event, payload) => cb(payload)),
  onUpdate: (cb) => ipcRenderer.on('update', (_event, payload) => cb(payload)),
  onRefresh: (cb) => ipcRenderer.on('refresh', () => cb()),
});
