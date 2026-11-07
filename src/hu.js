// Magyarítások: a Master mappába feltett HU csomagok (pl. ProjectALife_HU.zip,
// SurvivorPDA_HU.zip) OPCIONÁLISAK – a játékos dönti el, hogy kéri-e őket
// (Optimalizálás → Magyarítás kártya). Telepítés és törlés is innen megy.
//
// A zip B42-es szerkezetű mod:  <Mappa>/42/mod.info
// Ezért ide kerül:              %USERPROFILE%\Zomboid\mods\<Mappa>\
// majd a mod ID-ja bekerül a játék modlistájába (Zomboid\mods\default.txt).

const fs = require('fs');
const os = require('os');
const path = require('path');

const modinfo = require('./modinfo');
const modlist = require('./modlist');
const pzo = require('./pzo');
const packs = require('./packs');

const STEP = 'hu';

// HU, _HU, magyar, hungarian – a Master mappában csak a csomag neve számít.
const HU_PATTERN = /(^|[^a-z])(hu|hun|magyar|hungarian)([^a-z]|$)/i;

function isHuPack(name) {
  return HU_PATTERN.test(String(name || '').replace(/\.zip$/i, ''));
}

// ------------------------------------------------------------------ állapot

function statePath(userDataDir) {
  return path.join(userDataDir, 'hu-state.json');
}

function readState(userDataDir) {
  try {
    const raw = JSON.parse(fs.readFileSync(statePath(userDataDir), 'utf8'));
    return { packs: (raw && raw.packs) || {} };
  } catch {
    return { packs: {} };
  }
}

function writeState(userDataDir, state) {
  try {
    fs.mkdirSync(userDataDir, { recursive: true });
    fs.writeFileSync(statePath(userDataDir), JSON.stringify(state, null, 2));
  } catch {
    // Nem végzetes: legközelebb újra letölti.
  }
}

// ------------------------------------------------------------------ forrás

async function listHuAssets(cfg, repo) {
  const folders = [];
  for (const f of [pzo.folderOf(cfg), pzo.DEFAULT_FOLDER]) {
    if (!folders.includes(f)) folders.push(f);
  }
  let lastError = null;
  for (const folder of folders) {
    try {
      const plain = await pzo.listZips(cfg, repo, folder);
      const split = await pzo.listSplitZips(cfg, repo, folder);
      const all = [...plain.map((z) => ({ ...z, folder })), ...split.map((z) => ({ ...z, folder }))];
      const hu = all.filter((z) => isHuPack(z.name));
      if (hu.length) return hu;
    } catch (err) {
      lastError = err;
    }
  }
  if (lastError) throw lastError;
  return [];
}

// A már bent lévő mod ID-k: ha minden megvan, nem kell újra letölteni.
function localIds(zomboidDir, ids) {
  return ids.every((id) => !!modinfo.findLocalModDir(zomboidDir, id));
}

// Egy csomag kicsomagolása: <temp>/<Mappa> → Zomboid\mods\<Mappa>.
async function installAsset({ cfg, asset, userDataDir, zomboidDir, log, onProgress }) {
  const zipFile = path.join(userDataDir, 'packs', '_downloads', asset.name);
  const sizeMb = asset.size ? (asset.size / 1048576).toFixed(1) + ' MB' : '?';
  log(`→ ${asset.name} letöltése (${sizeMb})…`);
  await pzo.downloadAsset(asset, zipFile, cfg, log, onProgress);

  const tempDir = path.join(os.tmpdir(), 'eotl-hu', asset.name.replace(/\.zip$/i, ''));
  fs.rmSync(tempDir, { recursive: true, force: true });
  fs.mkdirSync(tempDir, { recursive: true });
  log('  kicsomagolás…');
  await packs.expandZip(zipFile, tempDir);
  fs.rmSync(zipFile, { force: true });

  const found = modinfo.discoverMods(tempDir, 4);
  if (!found.length) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error('a csomagban nincs mod.info – nem mod csomag?');
  }

  const modsRoot = path.join(zomboidDir, 'mods');
  fs.mkdirSync(modsRoot, { recursive: true });
  const ids = [];
  for (const mod of found) {
    const folder = path.basename(mod.modDir);
    const target = path.join(modsRoot, folder);
    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(mod.modDir, target, { recursive: true });
    ids.push(mod.id);
    log(`  ✓ ${mod.name} → Zomboid\\mods\\${folder}`);
  }
  fs.rmSync(tempDir, { recursive: true, force: true });
  return ids;
}

// ------------------------------------------------------------------ szinkron

// Kötelező magyarítások telepítése + engedélyezése. Sosem dob hibát, hogy a
// telepítés emiatt ne álljon meg – csak naplóz.
async function sync({ cfg, userDataDir, force = false, log = () => {}, onProgress = null }) {
  const zomboidDir = require('./paths').zomboidDir();
  const repo = pzo.repoOf(cfg);

  let assets = [];
  try {
    assets = await listHuAssets(cfg, repo);
  } catch (err) {
    log('! Magyarítások: a Master mappa nem olvasható (' + (err && err.message ? err.message : err) + ').');
    return { ok: false, ids: [], installed: [], error: err && err.message ? err.message : String(err) };
  }
  if (!assets.length) {
    log('• Magyarítás: nincs HU csomag a Master mappában.');
    return { ok: true, ids: [], installed: [] };
  }

  const state = readState(userDataDir);
  const ids = [];
  const installed = [];
  let done = 0;

  for (const asset of assets) {
    done++;
    if (onProgress) onProgress({ label: 'Magyarítás telepítése…', done, total: assets.length });
    const known = state.packs[asset.name];
    if (!force && known && known.size === asset.size && localIds(zomboidDir, known.ids || [])) {
      ids.push(...(known.ids || []));
      continue;
    }
    try {
      const got = await installAsset({ cfg, asset, userDataDir, zomboidDir, log, onProgress });
      ids.push(...got);
      state.packs[asset.name] = { size: asset.size, ids: got, at: Date.now() };
      writeState(userDataDir, state);
      installed.push(asset.name);
      log('✓ Magyarítás telepítve: ' + asset.name);
    } catch (err) {
      log(`✗ ${asset.name}: ${err && err.message ? err.message : err}`);
      if (known && known.ids) ids.push(...known.ids); // ami már bent van, maradjon engedélyezve
    }
  }

  const unique = [...new Set(ids.filter(Boolean))];
  if (unique.length) {
    const en = modlist.ensureEnabled(zomboidDir, unique);
    if (en.changed) log(`✓ Magyarítás engedélyezve a játék listájában: ${en.added.join(', ')}.`);
  }
  if (!installed.length) log('✓ Magyarítások naprakészek.');

  return { ok: true, ids: unique, installed };
}

// Be van-e telepítve (a mod mappák bent vannak-e a Zomboid\mods alatt)?
function status(userDataDir) {
  const zomboidDir = require('./paths').zomboidDir();
  const state = readState(userDataDir);
  const ids = [];
  const dirs = [];
  for (const pack of Object.values(state.packs)) {
    for (const id of (pack && pack.ids) || []) {
      if (ids.includes(id)) continue;
      const dir = modinfo.findLocalModDir(zomboidDir, id);
      if (dir) {
        ids.push(id);
        dirs.push(dir);
      }
    }
  }
  return { installed: ids.length > 0, ids, dirs };
}

// Törlés: a magyarítás mod mappái kikerülnek, és a modlista sem engedélyezi.
async function remove({ userDataDir, log = () => {} }) {
  const zomboidDir = require('./paths').zomboidDir();
  const state = readState(userDataDir);
  const removed = [];
  const ids = [];

  for (const [name, pack] of Object.entries(state.packs)) {
    for (const id of (pack && pack.ids) || []) {
      ids.push(id);
      const dir = modinfo.findLocalModDir(zomboidDir, id);
      if (!dir) continue;
      try {
        fs.rmSync(dir, { recursive: true, force: true });
        removed.push(dir);
        log('✓ Magyarítás törölve: Zomboid\\mods\\' + path.basename(dir));
      } catch (err) {
        log(`✗ ${id}: nem sikerült törölni (${err && err.message ? err.message : err})`);
      }
    }
    delete state.packs[name];
  }

  if (ids.length) {
    const res = modlist.removeEnabled(zomboidDir, ids);
    if (res.changed) log('✓ Magyarítás kikapcsolva a játék listájában.');
  }
  writeState(userDataDir, state);
  return { ok: true, removed: removed.length, ids };
}

module.exports = { sync, remove, status, isHuPack, statePath, readState, listHuAssets, STEP };
