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
  collectionId: '3835271101',
  // A korábbi alapértelmezett kollekció: a mentett configban ezt lecseréljük
  // az újra, hogy a már telepített launcher is a friss modcsomagot kövesse.
  legacyCollectionIds: ['3832006850'],
  // A kollekción kívüli, kézzel megadott workshop elemek.
  // Ezek ugyanúgy települnek és engedélyeződnek, mint a kollekció tagjai.
  // A saját főmenü (3833539717) már a kollekció tagja, ezért nincs itt.
  extraWorkshopIds: [],
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
  // Blackout Protocol – New Era: külön egyjátékos modpack (saját kollekció).
  // A szerver beállításaitól független, ezért külön blokkban tároljuk.
  blackout: {
    collectionId: '3814595736',
    collection: null,
    enabledIds: [],
    unresolved: {},
    configAt: 0,
  },
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
  // Discord webhook a crash logokhoz (a szerver crash csatornája).
  // Be van építve, hogy minden játékosnál működjön; ha a csatornán új webhook
  // készül, csak ezt az egy sort kell lecserélni.
  discordWebhook:
    'https://discord.com/api/webhooks/1568001484719792218/Xbl4WiUCB-kIi8lLOHdA4SDEq3eVLS9fBh69OypT66EMB9bXPd08M3npjCJ7VcuP9Q6A',
};

// Ezek az elemek időközben bekerültek a kollekcióba, ezért a régi
// configokból is kivesszük őket (nem kell külön letöltetni/engedélyezni).
const EXTRAS_IN_COLLECTION = new Set(['3833539717']);

// A kollekción kívüli workshop elemek: csak számokból álló azonosító, opcionális címmel.
function normalizeExtras(raw) {
  const list = Array.isArray(raw) ? raw : DEFAULT_CONFIG.extraWorkshopIds;
  const out = [];
  for (const item of list) {
    const id = String((item && item.id) || item || '').trim();
    if (!/^\d+$/.test(id)) continue;
    if (EXTRAS_IN_COLLECTION.has(id)) continue;
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
    legacyCollectionIds: Array.isArray(raw.legacyCollectionIds)
      ? raw.legacyCollectionIds.map(String)
      : DEFAULT_CONFIG.legacyCollectionIds,
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
    blackout: {
      ...DEFAULT_CONFIG.blackout,
      ...(raw.blackout && typeof raw.blackout === 'object' && !Array.isArray(raw.blackout)
        ? raw.blackout
        : {}),
      collectionId: String(
        (raw.blackout && raw.blackout.collectionId) || DEFAULT_CONFIG.blackout.collectionId
      ).trim(),
      collection:
        raw.blackout && raw.blackout.collection && Array.isArray(raw.blackout.collection.items)
          ? raw.blackout.collection
          : null,
      enabledIds:
        raw.blackout && Array.isArray(raw.blackout.enabledIds)
          ? raw.blackout.enabledIds.map(String).filter(Boolean)
          : [],
      unresolved:
        raw.blackout &&
        raw.blackout.unresolved &&
        typeof raw.blackout.unresolved === 'object' &&
        !Array.isArray(raw.blackout.unresolved)
          ? raw.blackout.unresolved
          : {},
      configAt: Number(raw.blackout && raw.blackout.configAt) || 0,
    },
    // A beépített webhookot csak akkor írja felül, ha valaki sajátot adott meg
    // (a korábbi mentett config.json üres értéke ne kapcsolja ki).
    discordWebhook: String(raw.discordWebhook || DEFAULT_CONFIG.discordWebhook || '').trim(),
  };

  // A régi kollekcióról automatikusan az újra váltunk (a beállításból is).
  if (cfg.legacyCollectionIds.includes(cfg.collectionId) && cfg.collectionId !== DEFAULT_CONFIG.collectionId) {
    cfg.collectionId = DEFAULT_CONFIG.collectionId;
    cfg.collection = null;
  }
  // A gyorsítótárazott lista csak akkor jó, ha ugyanahhoz a kollekcióhoz tartozik.
  if (cfg.collection && String(cfg.collection.id) !== cfg.collectionId) cfg.collection = null;

  return cfg;
}

function saveConfig(dir, cfg) {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'config.json'), JSON.stringify(cfg, null, 2), 'utf8');
}

module.exports = { DEFAULT_CONFIG, loadConfig, saveConfig };
