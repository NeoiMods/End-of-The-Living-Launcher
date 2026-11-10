// Blackout Protocol – New Era: egyjátékos modpack.
//
// Ugyanaz a mechanika, mint a szerver kollekciónál (feliratkozás a Steam
// Workshop kollekcióra, várakozás a letöltésre, modok engedélyezése), csak más
// kollekcióval és plusz egy lépéssel: a modpackhoz tartozó config fájl(ok)
// bemásolása a játékba.
//
// A config fájl(ok) a repóban lesznek, egy leíró mellett:
//   Master/blackout/index.json
//   {
//     "files": [
//       { "path": "Master/blackout/sandbox.ini", "target": "%ZOMBOID%/Server/Blackout.ini" }
//     ]
//   }
// Amíg ez a leíró nincs feltöltve, a lépés kimarad (nem hiba).
//
// A `target` helyén használható:
//   %ZOMBOID%      → %USERPROFILE%\Zomboid
//   %GAME%         → a Project Zomboid mappája
//   %USERPROFILE%  → a Windows felhasználói mappa

const fs = require('fs');
const os = require('os');
const path = require('path');

const gh = require('./gh');
const paths = require('./paths');
const pzo = require('./pzo');
const setup = require('./setup');
const workshop = require('./workshop');

const COLLECTION_ID = '3814595736';
const NAME = 'Blackout Protocol – New Era';
const WORKSHOP_URL = `https://steamcommunity.com/sharedfiles/filedetails/?id=${COLLECTION_ID}`;
const CONFIG_MANIFEST = 'Master/blackout/index.json';

// --------------------------------------------------------------- alap adatok

function collectionId(cfg) {
  const raw = String((cfg && cfg.blackout && cfg.blackout.collectionId) || COLLECTION_ID).trim();
  return /^\d+$/.test(raw) ? raw : COLLECTION_ID;
}

function steamLibs() {
  const steam = paths.findSteamPath();
  return steam ? paths.parseLibraryPaths(steam) : [];
}

// A felület ehhez a rövid összefoglalóhoz nyúl (modális ablak, gombok).
function summary(cfg) {
  const b = (cfg && cfg.blackout) || {};
  const items = b.collection && Array.isArray(b.collection.items) ? b.collection.items : [];
  const libs = steamLibs();
  return {
    name: NAME,
    collectionId: collectionId(cfg),
    workshopUrl: WORKSHOP_URL,
    title: (b.collection && b.collection.title) || NAME,
    collection: items.length ? b.collection : null,
    total: items.length,
    downloaded: items.length ? workshop.classify(libs, items).present.size : 0,
    enabledCount: Array.isArray(b.enabledIds) ? b.enabledIds.length : 0,
    unresolved: b.unresolved && typeof b.unresolved === 'object' ? Object.keys(b.unresolved).length : 0,
    configPath: CONFIG_MANIFEST,
    configAt: Number(b.configAt) || 0,
  };
}

// --------------------------------------------------------------- telepítés

// Feliratkozás + letöltés + engedélyezés, majd a config bemásolása.
async function install({ cfg, userDataDir, onLog = () => {}, onProgress = () => {}, openSubscribe, openSteamClient }) {
  const id = collectionId(cfg);
  onLog(`— ${NAME} modpack (Steam kollekció ${id}) —`);

  // A szerver kollekció kihagyásai (pl. Viewpoint nightly) itt nem érvényesek:
  // az egyjátékos modpack pontosan azt kapja, ami a kollekcióban van.
  const scoped = {
    ...cfg,
    collectionId: id,
    extraWorkshopIds: [],
    localCopies: [],
    unresolved: (cfg && cfg.blackout && cfg.blackout.unresolved) || {},
  };

  const res = await setup.runSetup({
    cfg: scoped,
    userDataDir,
    onLog,
    onProgress,
    openSubscribe,
    openSteamClient,
    skips: { download: new Map(), mods: new Set() },
  });

  const config = await applyConfig({ cfg, onLog, onProgress });

  return {
    collection: res.collection,
    enabledIds: res.enabledIds,
    unresolved: res.unresolved,
    downloaded: res.downloaded,
    config,
  };
}

// --------------------------------------------------------------- config fájl

function expandTarget(target, cfg) {
  let value = String(target || '').trim();
  if (!value) return null;

  const roots = [
    ['%ZOMBOID%', paths.zomboidDir()],
    ['%GAME%', paths.resolveGamePath(cfg) || ''],
    ['%USERPROFILE%', process.env.USERPROFILE || os.homedir()],
  ];

  for (const [token, root] of roots) {
    const re = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\\\/]?', 'i');
    if (re.test(value)) {
      if (!root) return null;
      value = path.join(root, value.replace(re, ''));
      break;
    }
  }

  if (path.isAbsolute(value)) return value;
  // Relatív cél: a Zomboid mappán belül értjük.
  return path.join(paths.zomboidDir(), value);
}

function normalizeEntries(data) {
  const raw = Array.isArray(data) ? data : (data && Array.isArray(data.files) ? data.files : []);
  const out = [];
  for (const entry of raw) {
    if (!entry) continue;
    const source = String(entry.path || entry.source || entry.file || '').trim();
    const target = String(entry.target || '').trim();
    if (!source || !target) continue;
    out.push({
      source,
      target,
      size: Number(entry.size) || 0,
      optional: !!entry.optional,
    });
  }
  return out;
}

// A config fájl(ok) letöltése a repóból és bemásolása a megadott helyre.
// Ha a leíró még nincs a repóban, az eredmény { ok:false, pending:true }.
async function applyConfig({ cfg, userDataDir, onLog = () => {}, onProgress = () => {} }) {
  const repo = pzo.repoOf(cfg);

  onProgress({ label: 'Modpack config keresése…' });
  const manifest = await gh.fetchRepoJson({ cfg, repo, file: CONFIG_MANIFEST });
  if (!manifest.ok) {
    onLog(
      `• A modpack config még nincs a repóban (${CONFIG_MANIFEST}) – ezt a lépést most kihagyom.`
    );
    return { ok: false, pending: true, installed: [], error: manifest.error };
  }

  const entries = normalizeEntries(manifest.data);
  if (!entries.length) {
    onLog(`• A ${CONFIG_MANIFEST} nem tartalmaz bemásolható fájlt – kihagyom.`);
    return { ok: false, pending: true, installed: [] };
  }

  const tempDir = path.join(userDataDir || os.tmpdir(), 'blackout-config');
  fs.mkdirSync(tempDir, { recursive: true });

  const installed = [];
  const failed = [];
  let done = 0;
  for (const entry of entries) {
    done++;
    onProgress({ label: 'Modpack config bemásolása…', done, total: entries.length });
    const dest = expandTarget(entry.target, cfg);
    if (!dest) {
      failed.push({ ...entry, error: 'ismeretlen vagy hiányzó célmappa' });
      onLog(`✗ ${entry.source}: a cél (${entry.target}) nem oldható fel.`);
      continue;
    }
    const temp = path.join(tempDir, path.basename(entry.source));
    try {
      await gh.downloadRepoFile({
        cfg,
        repo,
        file: entry.source,
        dest: temp,
        size: entry.size,
        log: onLog,
      });
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(temp, dest);
      installed.push({ ...entry, target: dest });
      onLog(`✓ Config bemásolva: ${path.basename(dest)}`);
    } catch (err) {
      failed.push({ ...entry, error: err.message });
      onLog(`✗ ${entry.source}: ${err.message}`);
    } finally {
      try {
        fs.rmSync(temp, { force: true });
      } catch {
        // A temp fájl maradhat.
      }
    }
  }

  return { ok: failed.length === 0 && installed.length > 0, installed, failed };
}

module.exports = {
  COLLECTION_ID,
  NAME,
  WORKSHOP_URL,
  CONFIG_MANIFEST,
  collectionId,
  summary,
  install,
  applyConfig,
  expandTarget,
  normalizeEntries,
};
