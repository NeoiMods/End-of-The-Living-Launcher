const fs = require('fs');
const path = require('path');

const VERSION_FOLDER_RE = /^\d+(\.\d+)*$/;
// media/libs never contain mod.info; walking them would be slow and pointless.
const SKIP_DIRS = new Set(['media', 'libs', '.git', 'node_modules']);

function readInfoKey(modInfoPath, key) {
  try {
    const txt = fs.readFileSync(modInfoPath, 'utf8');
    const m = txt.match(new RegExp('^\\s*' + key + '\\s*=\\s*(.+?)\\s*$', 'm'));
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

function walkModInfos(dir, depth, out, maxDepth) {
  if (depth > maxDepth) return;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isFile() && e.name.toLowerCase() === 'mod.info') {
      out.push(p);
      continue;
    }
    if ((e.isDirectory() || e.isSymbolicLink()) && !SKIP_DIRS.has(e.name)) {
      walkModInfos(p, depth + 1, out, maxDepth);
    }
  }
}

// Finds every mod inside a folder (handles both B41 root mod.info and B42
// version-folder mod.info like 42/mod.info).
function discoverMods(root, maxDepth = 6) {
  const infos = [];
  walkModInfos(root, 0, infos, maxDepth);
  const seen = new Set();
  const out = [];
  for (const mi of infos) {
    let modDir = path.dirname(mi);
    if (VERSION_FOLDER_RE.test(path.basename(modDir))) modDir = path.dirname(modDir);
    const id = readInfoKey(mi, 'id');
    if (!id) continue;
    const key = id.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ modDir, id, name: readInfoKey(mi, 'name') || id, modInfoPath: mi });
  }
  return out;
}

// Looks for an already installed mod (by mod ID) under Zomboid/mods.
function findLocalModDir(zomboidDir, modId) {
  const root = path.join(zomboidDir, 'mods');
  const wanted = String(modId).toLowerCase();
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return null;
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const dir = path.join(root, e.name);
    const hit = discoverMods(dir, 3).some((m) => m.id.toLowerCase() === wanted);
    if (hit) return dir;
  }
  return null;
}

function listLocalModIds(zomboidDir) {
  const root = path.join(zomboidDir, 'mods');
  const ids = [];
  let entries;
  try {
    entries = fs.readdirSync(root, { withFileTypes: true });
  } catch {
    return ids;
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    for (const m of discoverMods(path.join(root, e.name), 3)) ids.push(m.id);
  }
  return ids;
}

// mod ID -> { modDir, id, ... } for everything already present in the local
// Steam Workshop cache. Used to avoid installing a duplicate copy of a mod the
// player is already subscribed to (duplicate IDs clash in PZ).
function buildWorkshopIndex(libs, appId) {
  const index = new Map();
  for (const lib of libs) {
    const root = path.join(lib, 'steamapps', 'workshop', 'content', appId);
    let items;
    try {
      items = fs.readdirSync(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const it of items) {
      if (!it.isDirectory()) continue;
      for (const m of discoverMods(path.join(root, it.name))) {
        const key = m.id.toLowerCase();
        // Az itemId megmondja, melyik workshop elemből származik a mod – ebből
        // tudjuk eldönteni, hogy a mod a követett kollekció része-e.
        if (!index.has(key)) index.set(key, { ...m, itemId: String(it.name) });
      }
    }
  }
  return index;
}

module.exports = {
  readInfoKey,
  walkModInfos,
  discoverMods,
  findLocalModDir,
  listLocalModIds,
  buildWorkshopIndex,
};
