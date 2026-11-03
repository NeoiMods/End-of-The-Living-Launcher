const fs = require('fs');
const path = require('path');

// Project Zomboid Steam app id. Szándékosan itt van (nem a paths.js-ből),
// hogy ne keletkezzen körkörös függőség a paths.js-sel.
const PZ_APP_ID = '108600';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Non-empty workshop content folder for an item in any Steam library.
function itemDir(libs, id) {
  const wanted = String(id);
  for (const lib of libs) {
    const p = path.join(lib, 'steamapps', 'workshop', 'content', PZ_APP_ID, wanted);
    try {
      if (fs.statSync(p).isDirectory() && fs.readdirSync(p).length > 0) return p;
    } catch {
      // Not present in this library.
    }
  }
  return null;
}

function classify(libs, items) {
  const present = new Set();
  const missing = [];
  for (const it of items) {
    if (itemDir(libs, it.id)) present.add(String(it.id));
    else missing.push(it);
  }
  return { present, missing };
}

// Olcsó, de érzékeny jel: hány fájl van az egyes letöltési mappákban
// (nem rekurzívan, ezért nagy modoknál is gyors marad).
function downloadShape(dlRoot) {
  const parts = [];
  let items = [];
  try {
    items = fs.readdirSync(dlRoot, { withFileTypes: true });
  } catch {
    return '';
  }
  for (const e of items) {
    if (!e.isDirectory()) continue;
    let n = 0;
    try {
      n = fs.readdirSync(path.join(dlRoot, e.name)).length;
    } catch {
      n = -1;
    }
    parts.push(`${e.name}:${n}`);
  }
  return parts.sort().join(',');
}

// Bounded recursive size (caps the number of visited files, keeps polling cheap).
function boundedSize(dir, fileCap = 3000) {
  let total = 0;
  let files = 0;
  const stack = [dir];
  while (stack.length && files < fileCap) {
    const cur = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(cur, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      if (files >= fileCap) break;
      const p = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else {
        try {
          total += fs.statSync(p).size;
          files++;
        } catch {
          // Vanished mid-walk.
        }
      }
    }
  }
  return total;
}

// Snapshot of every signal that changes while the Steam client downloads
// workshop content: finished item folders, in-progress staging folders and the
// per-app workshop ACF. Used to detect both progress and a stalled download.
function progressSignal(libs) {
  let existingDirs = 0;
  let downloadBytes = 0;
  const dlShape = [];
  let acf = '';
  for (const lib of libs) {
    const contentRoot = path.join(lib, 'steamapps', 'workshop', 'content', PZ_APP_ID);
    try {
      existingDirs += fs.readdirSync(contentRoot, { withFileTypes: true }).filter((e) => e.isDirectory()).length;
    } catch {
      // No workshop content in this library yet.
    }
    const dlRoot = path.join(lib, 'steamapps', 'workshop', 'downloads', PZ_APP_ID);
    try {
      if (fs.statSync(dlRoot).isDirectory()) {
        downloadBytes += boundedSize(dlRoot);
        dlShape.push(downloadShape(dlRoot));
      }
    } catch {
      // No active downloads.
    }
    try {
      const st = fs.statSync(path.join(lib, 'steamapps', 'workshop', `appworkshop_${PZ_APP_ID}.acf`));
      acf += `${st.size}:${st.mtimeMs};`;
    } catch {
      // No ACF yet.
    }
  }
  return `${existingDirs}|${downloadBytes}|${dlShape.join(';')}|${acf}`;
}

// Waits until every item has a non-empty workshop folder (or the download stops
// making progress). Returns { complete, present, missing }.
async function waitForItems({
  libs,
  items,
  onLog = () => {},
  onProgress = () => {},
  stallMs = 240000,
  maxMs = 60 * 60 * 1000,
  intervalMs = 2000,
}) {
  const total = items.length;
  const startedAt = Date.now();
  let lastChangeAt = Date.now();
  let lastSignal = null;
  let lastReported = -1;
  let lastHeartbeat = 0;
  let done = 0;

  onLog(`Várakozás a Steam letöltésére (${total} mod)…`);
  onLog('  Ha felugró ablak jelenik meg a feliratkozásról, erősítsd meg benne a „Subscribe to all" műveletet.');

  while (Date.now() - startedAt < maxMs) {
    const { present, missing } = classify(libs, items);
    done = present.size;

    if (done !== lastReported) {
      lastReported = done;
      onProgress({ label: 'Steam letöltés folyamatban…', done, total });
      onLog(`  Letöltve: ${done}/${total}`);
    }

    if (done >= total) {
      onLog(`✓ Minden mod letöltve (${done}/${total}).`);
      return { complete: true, present, missing: [] };
    }

    const sig = progressSignal(libs);
    const now = Date.now();
    if (sig !== lastSignal) {
      lastSignal = sig;
      lastChangeAt = now;
    }

    if (now - lastChangeAt > stallMs) {
      onLog(
        `⚠ A Steam letöltése nem halad tovább (${done}/${total} kész). ` +
          'Lehet, hogy a Steam nem fut, nincs bejelentkezve, vagy feliratkozás szükséges.'
      );
      return { complete: false, present, missing };
    }

    if (now - lastHeartbeat > 30000) {
      lastHeartbeat = now;
      const secs = Math.round((now - lastChangeAt) / 1000);
      onLog(`… várakozás a letöltésre (${done}/${total}, legutóbbi változás ${secs} másodperce)`);
    }

    await sleep(intervalMs);
  }

  const { present, missing } = classify(libs, items);
  onLog(`⚠ Időtúllépés a letöltés várakozásakor (${present.size}/${total} kész).`);
  return { complete: present.size >= total, present, missing };
}

module.exports = { PZ_APP_ID, itemDir, classify, progressSignal, waitForItems };
