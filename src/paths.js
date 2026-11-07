const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const launch = require('./launch');
const modlist = require('./modlist');
const modinfo = require('./modinfo');
const system = require('./system');
const workshop = require('./workshop');
const zbInstaller = require('./zb-installer');

const PZ_APP_ID = '108600';
const GAME_EXE = launch.GAME_EXE;
// Az alap telepítési hely, amire a modok és a launcher minden telepítője készült.
// Ha a játék máshol van, a launcher kritikus figyelmeztetést ad.
const DEFAULT_GAME_DIR = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\ProjectZomboid';

function regQuery(key, value) {
  try {
    const out = execFileSync('reg', ['query', key, '/v', value], {
      encoding: 'utf8',
      windowsHide: true,
    });
    const m = out.match(new RegExp(value + '\\s+REG_[A-Z_]+\\s+(.+)'));
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

function findSteamPath() {
  const candidates = [
    regQuery('HKLM\\SOFTWARE\\WOW6432Node\\Valve\\Steam', 'InstallPath'),
    regQuery('HKLM\\SOFTWARE\\Valve\\Steam', 'InstallPath'),
    regQuery('HKCU\\SOFTWARE\\Valve\\Steam', 'SteamPath'),
    path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'Steam'),
    path.join(process.env.ProgramFiles || 'C:\\Program Files', 'Steam'),
    'C:\\Steam',
  ].filter(Boolean);

  for (const c of candidates) {
    const p = String(c).replace(/\//g, '\\');
    try {
      if (fs.existsSync(path.join(p, 'steam.exe'))) return p;
    } catch {
      // Unreadable candidate, try the next one.
    }
  }
  return null;
}

// Steam library folders from libraryfolders.vdf (extra drives included).
function parseLibraryPaths(steamPath) {
  const libs = new Set([steamPath]);
  const candidates = [
    path.join(steamPath, 'steamapps', 'libraryfolders.vdf'),
    path.join(steamPath, 'config', 'libraryfolders.vdf'),
  ];
  for (const file of candidates) {
    let txt;
    try {
      txt = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    for (const m of txt.matchAll(/"path"\s*"([^"]+)"/g)) {
      libs.add(m[1].replace(/\\\\/g, '\\'));
    }
    break;
  }
  return [...libs];
}

function findGamePath() {
  const steam = findSteamPath();
  const libs = steam ? parseLibraryPaths(steam) : [];

  for (const lib of libs) {
    const exe = path.join(lib, 'steamapps', 'common', 'ProjectZomboid', GAME_EXE);
    if (fs.existsSync(exe)) return path.dirname(exe);
  }
  // Custom installdir recorded in the app manifest.
  for (const lib of libs) {
    try {
      const txt = fs.readFileSync(path.join(lib, 'steamapps', 'appmanifest_108600.acf'), 'utf8');
      const m = txt.match(/"installdir"\s*"([^"]+)"/);
      if (m) {
        const exe = path.join(lib, 'steamapps', 'common', m[1], GAME_EXE);
        if (fs.existsSync(exe)) return path.dirname(exe);
      }
    } catch {
      // No manifest in this library.
    }
  }
  return null;
}

function resolveGamePath(cfg) {
  if (cfg && cfg.gamePath) {
    if (fs.existsSync(path.join(cfg.gamePath, GAME_EXE))) return cfg.gamePath;
  }
  return findGamePath();
}

function isGameDir(dir) {
  try {
    return !!dir && fs.existsSync(path.join(dir, GAME_EXE));
  } catch {
    return false;
  }
}

function driveRoots() {
  const roots = [];
  for (let code = 67; code <= 90; code += 1) {
    const root = String.fromCharCode(code) + ':\\';
    try {
      if (fs.existsSync(root)) roots.push(root);
    } catch {
      // Nincs ilyen meghajtó.
    }
  }
  return roots;
}

// Végigmegy a gépen a szokásos helyeken (Steam könyvtárak és minden meghajtó),
// és visszaadja az összes megtalált Project Zomboid mappát.
function findGameCandidates() {
  const found = [];
  const seen = new Set();
  const defaultKey = path.resolve(DEFAULT_GAME_DIR).toLowerCase();

  const push = (dir, source, rank) => {
    if (!isGameDir(dir)) return;
    let full;
    try {
      full = path.resolve(dir);
    } catch {
      return;
    }
    const key = full.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    found.push({ path: full, source, rank, isDefault: key === defaultKey });
  };

  push(DEFAULT_GAME_DIR, 'Alap Steam hely', 0);

  const steam = findSteamPath();
  if (steam) push(path.join(steam, 'steamapps', 'common', 'ProjectZomboid'), 'Steam', 1);

  const libs = steam ? parseLibraryPaths(steam) : [];
  for (const lib of libs) {
    push(path.join(lib, 'steamapps', 'common', 'ProjectZomboid'), 'Steam könyvtár', 2);
    try {
      const txt = fs.readFileSync(path.join(lib, 'steamapps', 'appmanifest_108600.acf'), 'utf8');
      const m = txt.match(/"installdir"\s*"([^"]+)"/);
      if (m) push(path.join(lib, 'steamapps', 'common', m[1]), 'Steam könyvtár', 2);
    } catch {
      // Ebben a könyvtárban nincs játék.
    }
  }

  // Kézi telepítések: minden meghajtón a szokásos mappanevek.
  const patterns = [
    'steamapps\\common\\ProjectZomboid',
    'Steam\\steamapps\\common\\ProjectZomboid',
    'SteamLibrary\\steamapps\\common\\ProjectZomboid',
    'Games\\Steam\\steamapps\\common\\ProjectZomboid',
    'Games\\SteamLibrary\\steamapps\\common\\ProjectZomboid',
    'Program Files (x86)\\Steam\\steamapps\\common\\ProjectZomboid',
    'Program Files\\Steam\\steamapps\\common\\ProjectZomboid',
    'ProjectZomboid',
    'Games\\ProjectZomboid',
    'Program Files (x86)\\ProjectZomboid',
    'Program Files\\ProjectZomboid',
  ];

  for (const root of driveRoots()) {
    for (const pattern of patterns) push(root + pattern, 'Keresés', 3);

    // A meghajtó gyökerében lévő mappák (pl. D:\\Steam2, E:\\Jatekok).
    let dirs = [];
    try {
      dirs = fs
        .readdirSync(root, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);
    } catch {
      // Nem olvasható meghajtó (pl. üres DVD meghajtó).
    }
    for (const name of dirs) {
      const base = path.join(root, name);
      push(base, 'Keresés', 3);
      push(path.join(base, 'steamapps', 'common', 'ProjectZomboid'), 'Keresés', 3);
    }
    const games = path.join(root, 'Games');
    try {
      for (const entry of fs.readdirSync(games, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        push(path.join(games, entry.name), 'Keresés', 3);
        push(path.join(games, entry.name, 'steamapps', 'common', 'ProjectZomboid'), 'Keresés', 3);
      }
    } catch {
      // Nincs Games mappa ezen a meghajtón.
    }
  }

  return found
    .sort((a, b) => a.rank - b.rank || a.path.localeCompare(b.path))
    .map(({ path: p, source, isDefault }) => ({ path: p, source, isDefault }));
}

function zomboidDir() {
  return path.join(os.homedir(), 'Zomboid');
}

function getEnvironment(cfg, options = {}) {
  const gamePath = resolveGamePath(cfg);
  const gameFound = !!gamePath;
  const zd = zomboidDir();
  const defaultTxt = modlist.readModList(zd);
  const heapMb = Number((cfg && cfg.jvmMaxMb) || 8192) || 8192;

  const steam = findSteamPath();
  const libs = steam ? parseLibraryPaths(steam) : [];
  const items = cfg && cfg.collection && Array.isArray(cfg.collection.items) ? cfg.collection.items : [];
  const downloaded = items.length ? workshop.classify(libs, items).present.size : 0;

  return {
    gamePath,
    gameFound,
    defaultGameDir: DEFAULT_GAME_DIR,
    steamPath: steam,
    steamRunning: launch.isSteamRunning(),
    gameRunning: launch.isGameRunning(),
    zomboidDir: zd,
    defaultTxtExists: defaultTxt !== null,
    enabledIds: modlist.listEnabledIds(defaultTxt),
    localModIds: modinfo.listLocalModIds(zd),
    installedModIds: (cfg && cfg.installedModIds) || [],
    server: (cfg && cfg.server) || {},
    collection: cfg && cfg.collection ? cfg.collection : null,
    collectionCount: items.length,
    downloadedCount: downloaded,
    memory: system.getMemoryInfo(heapMb),
    heapMb,
    heapInGame: gameFound ? launch.readHeapFromLauncherJson(gamePath) : null,
    installer: options.userDataDir ? zbInstaller.findLocalInstaller(options.userDataDir) : null,
    agent: gameFound
      ? launch.agentStatus(gamePath)
      : { jar: false, dll: false, present: false, configured: false },
  };
}

module.exports = {
  PZ_APP_ID,
  GAME_EXE,
  DEFAULT_GAME_DIR,
  findSteamPath,
  parseLibraryPaths,
  findGamePath,
  findGameCandidates,
  isGameDir,
  resolveGamePath,
  zomboidDir,
  getEnvironment,
};
