// End of The Living (többjátékos) saját kiegészítői. Ezek CSAK a szerveres
// oldalon jelennek meg az Optimalizálás panelen:
//
//   1) ZombieBuddy – a Master mappában lévő „endoftheliving zombiebuddy.zip”
//      csomag (a szerver saját agent fájljai), nem a hivatalos telepítő.
//   2) 3D models for Viewpoint [sour_kisel] – a 3810302175 workshop mod mellé
//      csak a mod.info cserélődik a Master mappában tárolt változatra.
//
// Egyik sem települ magától: a játékos kattint rá.

const fs = require('fs');
const os = require('os');
const path = require('path');

const gh = require('./gh');
const pzo = require('./pzo');
const zbAgent = require('./zb-agent');
const workshop = require('./workshop');
const { expandZip } = require('./packs');
const { findSteamPath, parseLibraryPaths } = require('./paths');

const ZB_ZIP = /endoftheliving[\s._-]*zombiebuddy/i;
const ZB_FILES = ['ZombieBuddy.jar', 'zbNative.dll'];
const VOXEL_WORKSHOP_ID = '3810302175';
// Amivel felismerjük, hogy a saját mod.info már bent van (a workshop item
// több modot is tartalmazhat, ezért csak a 3D modellek mod.info-ját írjuk át).
const VOXEL_SIGNATURE = '6301 3D models';
const VOXEL_MOD_ID = 'PZVoxelStudioViewpoint';
// A 3D modell mod.info-ja: az azonosítója egyedi, ezért erre szűrünk. A
// lazább minta csak akkor jön szóba, ha a workshop itemben egyetlen mod.info van.
const VOXEL_MATCH = /pzvoxel|sour_kisel|viewpoint.*3d|6282|6301/i;

function repoOf(cfg) {
  return pzo.repoOf(cfg);
}

function folderOf(cfg) {
  return pzo.folderOf(cfg);
}

function downloadDir(userDataDir) {
  return path.join(userDataDir, 'packs', '_downloads');
}

// ------------------------------------------------------------------ ZombieBuddy

async function findZbZip(cfg, userDataDir) {
  const list = await pzo.listZips(cfg, repoOf(cfg), folderOf(cfg), userDataDir);
  const pick = list.find((a) => ZB_ZIP.test(a.name));
  if (!pick) {
    throw new Error(
      `Nincs endoftheliving zombiebuddy zip a ${repoOf(cfg)}/${folderOf(cfg)} mappában.`
    );
  }
  return pick;
}

// A Master mappából letöltött csomagból csak az agent fájlokat tesszük a játék
// mellé; az -agentlib:zbNative kapcsolót indításkor a launcher adja hozzá.
async function installZombieBuddy({ cfg, userDataDir, gameDir, log = () => {}, onProgress = null }) {
  if (!gameDir) throw new Error('Project Zomboid nem található. Beállítások → Játék mappája.');

  log('• End of The Living ZombieBuddy keresése a Master mappában…');
  const asset = await findZbZip(cfg, userDataDir);
  const sizeMb = asset.size ? (asset.size / 1048576).toFixed(1) + ' MB' : '?';

  const zipFile = path.join(downloadDir(userDataDir), asset.name);
  log(`→ ${asset.name} letöltése (${sizeMb})…`);
  await pzo.downloadAsset(asset, zipFile, cfg, log, onProgress);

  // Ha most a hivatalos (Blackout) agent van a játék mellett, előbb eltároljuk,
  // hogy később az egyjátékos indítás visszakaphassa.
  const before = zbAgent.status({ userDataDir, gameDir });
  if (before.current !== 'eotl' && !before.cached.official && before.current !== null) {
    zbAgent.remember({ userDataDir, gameDir, kind: 'official', log });
  }

  const outDir = path.join(os.tmpdir(), 'eotl-zombiebuddy');
  fs.rmSync(outDir, { recursive: true, force: true });
  log('  kicsomagolás…');
  await expandZip(zipFile, outDir);

  const copied = [];
  for (const name of ZB_FILES) {
    const src = path.join(outDir, name);
    if (!fs.existsSync(src)) continue;
    fs.copyFileSync(src, path.join(gameDir, name));
    copied.push(name);
  }
  fs.rmSync(zipFile, { force: true });
  fs.rmSync(outDir, { recursive: true, force: true });

  if (copied.length !== ZB_FILES.length) {
    throw new Error('A csomagban nincs meg a ZombieBuddy.jar és a zbNative.dll.');
  }

  // Eltároljuk az EOTL agentet, hogy az egyjátékos indítás vissza tudja majd
  // állítani a hivatalos ZombieBuddy-t, és fordítva.
  zbAgent.remember({ userDataDir, gameDir, kind: 'eotl', log });

  log('✓ End of The Living ZombieBuddy telepítve: ' + copied.join(', '));
  return { ok: true, files: copied, dir: gameDir };
}

// ------------------------------------------------------------------ 3D modellek

function workshopLibs() {
  const st = findSteamPath();
  return st ? parseLibraryPaths(st) : [];
}

function walkModInfos(dir, depth = 0, out = []) {
  if (depth > 4) return out;
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkModInfos(full, depth + 1, out);
    else if (/^mod\.info$/i.test(entry.name)) out.push(full);
  }
  return out;
}

// A workshop mod állapota: megvan-e, és a mi mod.info-nk van-e benne.
function voxelStatus() {
  const dir = workshop.itemDir(workshopLibs(), VOXEL_WORKSHOP_ID);
  if (!dir) return { installed: false, patched: false, dir: null };
  let patched = false;
  for (const file of walkModInfos(dir)) {
    try {
      if (fs.readFileSync(file, 'utf8').toLowerCase().includes(VOXEL_SIGNATURE)) patched = true;
    } catch {
      // olvashatatlan mod.info: nem tekintjük cseréltnek
    }
  }
  return { installed: true, patched, dir };
}

// A Master mappában tárolt mod.info-t írja a workshop mod mellé.
// (A `dir` csak teszteléshez adható meg kézzel.)
async function applyVoxelModInfo({ cfg, userDataDir, log = () => {}, dir = null }) {
  const status = dir ? { installed: true, dir } : voxelStatus();
  if (!status.installed) {
    throw new Error(
      `A ${VOXEL_WORKSHOP_ID} workshop mod még nincs letöltve – iratkozz fel a kollekcióra, várd meg a Steam letöltést, és utána próbáld újra.`
    );
  }

  const dest = path.join(downloadDir(userDataDir), 'eotl-viewpoint-mod.info');
  log('• 3D models for Viewpoint: a saját mod.info letöltése…');
  await gh.downloadRepoFile({
    cfg,
    repo: repoOf(cfg),
    file: `${folderOf(cfg)}/mod.info`,
    dest,
  });

  const body = fs.readFileSync(dest);
  const all = walkModInfos(status.dir);
  if (!all.length) {
    throw new Error('A workshop modban nincs mod.info – a csere nem lehetséges.');
  }

  // Csak a 3D modellek mod.info-ját írjuk át: a workshop item alatt más mod is
  // lehet, azt nem szabad elrontani. Elsődleges szűrő a mod egyedi azonosítója.
  const contentOf = (file) => {
    try {
      return fs.readFileSync(file, 'utf8');
    } catch {
      return '';
    }
  };
  const folderOfInfo = (file) => {
    const parent = path.basename(path.dirname(file));
    return parent === VOXEL_MOD_ID ? parent : path.basename(path.dirname(path.dirname(file)));
  };

  let targets = all.filter(
    (file) =>
      new RegExp(`^\\s*id\\s*=\\s*${VOXEL_MOD_ID}\\s*$`, 'im').test(contentOf(file)) ||
      folderOfInfo(file) === VOXEL_MOD_ID
  );
  if (!targets.length) {
    // Régi/átnevezett változat: csak akkor, ha egyetlen mod.info van a modban.
    if (all.length === 1) targets = all;
    else targets = all.filter((file) => VOXEL_MATCH.test(contentOf(file)));
  }
  if (targets.length !== 1) {
    throw new Error(
      targets.length
        ? 'Több 3D modell mod.info van a workshop modban – nem tudom, melyiket cseréljem.'
        : 'Nem találtam a 3D modellek mod.info fájlját a workshop modban.'
    );
  }

  // Biztonsági ellenőrzés: csak a 3810302175 workshop mappáján belül írunk.
  const root = path.resolve(status.dir);
  for (const file of targets) {
    const resolved = path.resolve(file);
    if (resolved !== root && !resolved.startsWith(root + path.sep)) {
      throw new Error('A mod.info a workshop mod mappáján kívül van – a csere leállítva.');
    }
  }

  for (const file of targets) fs.writeFileSync(file, body);
  fs.rmSync(dest, { force: true });

  log(`✓ 3D models for Viewpoint: mod.info lecserélve (${targets.length} fájl).`);
  return { ok: true, changed: targets.length, dir: status.dir };
}

// ------------------------------------------------------------------ állapot

function status() {
  const dir = workshop.itemDir(workshopLibs(), VOXEL_WORKSHOP_ID);
  return {
    zb: false, // a játék mappát a hívó tölti ki (launch.agentStatus)
    voxel: voxelStatus(),
    voxelId: VOXEL_WORKSHOP_ID,
    voxelDir: dir,
  };
}

module.exports = {
  ZB_ZIP,
  ZB_FILES,
  VOXEL_WORKSHOP_ID,
  findZbZip,
  installZombieBuddy,
  applyVoxelModInfo,
  voxelStatus,
  walkModInfos,
  status,
};
