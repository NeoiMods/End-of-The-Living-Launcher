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
  // A kollekción kívüli, kézzel megadott workshop elemek (pl. saját főmenü).
  // Ezek ugyanúgy települnek és engedélyeződnek, mint a kollekció tagjai.
  extraWorkshopIds: [{ id: '3833539717', title: 'Custom Main Menu' }],
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
  // Csomagforrás: mod / optimalizáló zip-ek repója (owner/name). Üresen kikapcsolva.
  packsRepo: '',
  // A repón belüli mappa, ahonnan a csomagokat figyeli (innen jön a PZO telepítő is).
  packsFolder: 'Master',
  // Opcionális, csak olvasható token privát repóhoz (GitHub contents API).
  githubToken: '',
};

// A kollekción kívüli workshop elemek: csak számokból álló azonosító, opcionális címmel.
function normalizeExtras(raw) {
  const list = Array.isArray(raw) ? raw : DEFAULT_CONFIG.extraWorkshopIds;
  const out = [];
  for (const item of list) {
    const id = String((item && item.id) || item || '').trim();
    if (!/^\d+$/.test(id)) continue;
    if (out.some((x) => x.id === id)) continue;
    const known = DEFAULT_CONFIG.extraWorkshopIds.find((x) => x.id === id);
    const title = String((item && item.title) || '').trim() || (known && known.title) || `Workshop ${id}`;
    out.push({ id, title });
  }
  return out;
}

function loadConfig(dir) {
  const file = path.join(dir, 'config.json');
  let raw = null;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  const rawServer = (raw && raw.server) || {};
  // A csomagok a Master mappába költöztek: a régi "packs" értéket átváltjuk.
  const packsFolder =
    raw && raw.packsFolder && String(raw.packsFolder).trim() !== 'packs'
      ? String(raw.packsFolder).trim()
      : DEFAULT_CONFIG.packsFolder;
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
    packsFolder,
    collection: raw.collection && Array.isArray(raw.collection.items) ? raw.collection : null,
    unresolved:
      raw.unresolved && typeof raw.unresolved === 'object' && !Array.isArray(raw.unresolved)
        ? raw.unresolved
        : {},
    localCopies: Array.isArray(raw.localCopies) ? raw.localCopies : [],
    installedModIds: Array.isArray(raw.installedModIds)
      ? raw.installedModIds.map(String).filter(Boolean)
      : [],
    extraWorkshopIds: normalizeExtras(raw.extraWorkshopIds),
  };
  return cfg;
}

function saveConfig(dir, cfg) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify(cfg, null, 2), 'utf8');
}

module.exports = { DEFAULT_CONFIG, loadConfig, saveConfig };
