const fs = require('fs');
const path = require('path');

const DEFAULT_CONFIG = {
  // Empty = automatic Steam detection.
  gamePath: '',
  server: {
    name: 'End of The Living',
    ip: 'endofthelivingpz.ddns.net',
    port: '16261',
    password: 'forgotten',
  },
  // Steam Workshop collection the whole mod pack comes from.
  collectionId: '3832006850',
  // Cached collection listing: { id, title, appId, items: [{id,title}], fetchedAt }.
  collection: null,
  // Workshop IDs that failed to download recently: { id: failedAtMillis }.
  unresolved: {},
  // Local mod copies created by the launcher (removed if Steam gains them).
  localCopies: [],
  // ZombieBuddy installer metadata from the last successful run.
  zbInstaller: null,
  // Mod IDs recorded after a successful install, used by the status checklist.
  installedModIds: [],
  // GitHub repokereshetőség: a launcher probe-olja először, ha nincs beállítva.
  updateCheckUrl: '',
  // Események forrása: üresen a fenti repo /events.json fájlja.
  eventsUrl: '',
};

function loadConfig(dir) {
  const file = path.join(dir, 'config.json');
  let raw = null;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  const rawServer = (raw && raw.server) || {};
  const cfg = {
    ...DEFAULT_CONFIG,
    ...raw,
    // A régi üres szervercím helyére a gyári érték kerüljön.
    server: {
      ...DEFAULT_CONFIG.server,
      ...rawServer,
      ip: rawServer.ip || DEFAULT_CONFIG.server.ip,
      port: rawServer.port || DEFAULT_CONFIG.server.port,
    },
    collectionId: String(raw.collectionId || DEFAULT_CONFIG.collectionId).trim(),
    collection: raw.collection && Array.isArray(raw.collection.items) ? raw.collection : null,
    unresolved:
      raw.unresolved && typeof raw.unresolved === 'object' && !Array.isArray(raw.unresolved)
        ? raw.unresolved
        : {},
    localCopies: Array.isArray(raw.localCopies) ? raw.localCopies : [],
    installedModIds: Array.isArray(raw.installedModIds)
      ? raw.installedModIds.map(String).filter(Boolean)
      : [],
  };
  return cfg;
}

function saveConfig(dir, cfg) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify(cfg, null, 2), 'utf8');
}

module.exports = { DEFAULT_CONFIG, loadConfig, saveConfig };
