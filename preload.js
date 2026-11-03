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

  installMods: () => ipcRenderer.invoke('mods:install'),
  installZombieBuddy: () => ipcRenderer.invoke('zb:install'),
  openModsFolder: () => ipcRenderer.invoke('mods:openFolder'),
  createShortcut: () => ipcRenderer.invoke('shortcut:create'),

  launch: () => ipcRenderer.invoke('game:launch'),

  onLog: (cb) => ipcRenderer.on('log', (_event, line) => cb(line)),    onProgress: (cb) => ipcRenderer.on('progress', (_event, payload) => cb(payload)),
    onUpdate: (cb) => ipcRenderer.on('update', (_event, payload) => cb(payload)),
  onRefresh: (cb) => ipcRenderer.on('refresh', () => cb()),
});
