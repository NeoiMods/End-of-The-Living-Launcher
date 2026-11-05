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
  getUpdateInfo: () => ipcRenderer.invoke('update:info'),
  checkUpdate: () => ipcRenderer.invoke('update:check'),
  applyUpdate: () => ipcRenderer.invoke('update:apply'),

  // ---- események ----
  getEvent: (force) => ipcRenderer.invoke('events:get', force),

  // ---- csomagok (mod / optimalizáló zip-ek) ----
  syncPacks: (force) => ipcRenderer.invoke('packs:sync', force),

  // ---- PZO Launcher (optimalizáló motor) ----
  getPzoStatus: () => ipcRenderer.invoke('pzo:status'),
  installPzo: () => ipcRenderer.invoke('pzo:install'),
  getModsStatus: () => ipcRenderer.invoke('optmods:status'),
  installMod: (id) => ipcRenderer.invoke('optmods:install', id),

  installMods: () => ipcRenderer.invoke('mods:install'),
  installZombieBuddy: () => ipcRenderer.invoke('zb:install'),
  openModsFolder: () => ipcRenderer.invoke('mods:openFolder'),
  createShortcut: () => ipcRenderer.invoke('shortcut:create'),

  launch: () => ipcRenderer.invoke('game:launch'),

  // ---- Discord: crash log + widget ----
  getDiscordWidget: () => ipcRenderer.invoke('discord:widget'),
  openDiscord: () => ipcRenderer.invoke('discord:open'),
  checkCrash: () => ipcRenderer.invoke('crash:check'),
  sendCrash: (name) => ipcRenderer.invoke('crash:send', { name }),
  dismissCrash: () => ipcRenderer.invoke('crash:dismiss'),
  onCrash: (cb) => ipcRenderer.on('crash', (_event, payload) => cb(payload)),

  onLog: (cb) => ipcRenderer.on('log', (_event, line) => cb(line)),
  onProgress: (cb) => ipcRenderer.on('progress', (_event, payload) => cb(payload)),
  onUpdate: (cb) => ipcRenderer.on('update', (_event, payload) => cb(payload)),
  onRefresh: (cb) => ipcRenderer.on('refresh', () => cb()),
});
