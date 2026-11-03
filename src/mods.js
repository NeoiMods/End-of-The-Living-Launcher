const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const { downloadFile } = require('./download');
const paths = require('./paths');
const modinfo = require('./modinfo');

const STEAMCMD_URL = 'https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip';
const STEAMCMD_TIMEOUT = 10 * 60 * 1000;

function runCapture(cmd, args, opts, onLine, timeoutMs = STEAMCMD_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { windowsHide: true, ...opts });
    let out = '';
    let pending = '';
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      try {
        p.kill();
      } catch {
        // Already gone.
      }
      reject(new Error(`Időtúllépés: ${cmd}`));
    }, timeoutMs);

    const handle = (buf) => {
      out += buf;
      pending += buf;
      const parts = pending.split(/[\r\n]+/);
      pending = parts.pop() || '';
      for (const line of parts) {
        const t = line.trim();
        if (t && onLine) onLine(t);
      }
    };

    p.stdout.on('data', handle);
    p.stderr.on('data', handle);
    p.on('error', (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err);
    });
    p.on('close', (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ code, out });
    });
  });
}

async function ensureSteamCMD(dir, onLog) {
  const exe = path.join(dir, 'steamcmd.exe');
  if (fs.existsSync(exe)) return exe;

  fs.mkdirSync(dir, { recursive: true });
  const zip = path.join(dir, 'steamcmd.zip');
  onLog('SteamCMD letöltése…');
  await downloadFile(STEAMCMD_URL, zip);
  onLog('SteamCMD kicsomagolása…');
  try {
    execFileSync('tar', ['-xf', zip, '-C', dir], { windowsHide: true });
  } catch {
    execFileSync(
      'powershell.exe',
      [
        '-NoProfile',
        '-Command',
        `Expand-Archive -Force -LiteralPath '${zip}' -DestinationPath '${dir}'`,
      ],
      { windowsHide: true, encoding: 'utf8' }
    );
  }
  try {
    fs.rmSync(zip, { force: true });
  } catch {
    // Leftover zip is harmless.
  }
  if (!fs.existsSync(exe)) throw new Error('A SteamCMD nem sikerült telepíteni.');
  return exe;
}

async function downloadWorkshopItem(exe, wsId, onLog) {
  onLog(`Workshop mod letöltése: ${wsId} (első alkalommal a SteamCMD is frissül)…`);
  const { code, out } = await runCapture(
    exe,
    ['+login', 'anonymous', '+workshop_download_item', paths.PZ_APP_ID, String(wsId), '+quit'],
    { cwd: path.dirname(exe) },
    (line) => {
      if (/error|success|warn|download|login|already|update/i.test(line)) onLog('  ' + line);
    }
  );

  if (code !== 0 || /ERROR!/i.test(out)) {
    throw new Error(
      `A(z) ${wsId} mod letöltése nem sikerült. Ellenőrizd, hogy a mod nyilvános a Steam Workshopon.`
    );
  }
  const dir = path.join(
    path.dirname(exe),
    'steamapps',
    'workshop',
    'content',
    paths.PZ_APP_ID,
    String(wsId)
  );
  if (!fs.existsSync(dir)) {
    throw new Error(`A(z) ${wsId} mod nem található a SteamCMD gyorsítótárában.`);
  }
  return dir;
}

function findWorkshopItemDir(libs, wsId) {
  for (const lib of libs) {
    const p = path.join(lib, 'steamapps', 'workshop', 'content', paths.PZ_APP_ID, String(wsId));
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// Copies a mod into Zomboid/mods and returns the target directory.
function placeLocalMod(zomboidDir, mod, onLog) {
  const root = path.join(zomboidDir, 'mods');
  fs.mkdirSync(root, { recursive: true });

  const existing = modinfo.findLocalModDir(zomboidDir, mod.id);
  const target = existing || path.join(root, mod.id);

  if (existing) {
    try {
      fs.rmSync(existing, { recursive: true, force: true });
    } catch (err) {
      throw new Error(`Nem sikerült frissíteni a(z) ${mod.id} modot: ${err.message}`);
    }
  }
  try {
    fs.cpSync(mod.modDir, target, { recursive: true, dereference: true });
  } catch (err) {
    throw new Error(`Nem sikerült bemásolni a(z) ${mod.id} modot: ${err.message}`);
  }
  onLog(`  ✓ ${mod.name} → ${target}`);
  return target;
}

// Copies a mod's libs/ payload (ZombieBuddy.jar, zbNative.dll, ...) into the
// game folder. Without these the Java agent cannot load.
function copyAgentLibs(modDir, sourceRoot, gameDir, onLog) {
  const candidates = [path.join(modDir, 'libs'), path.join(sourceRoot, 'libs')];
  const libsDir = candidates.find((p) => {
    try {
      return fs.statSync(p).isDirectory();
    } catch {
      return false;
    }
  });
  if (!libsDir) return;

  let files;
  try {
    files = fs.readdirSync(libsDir);
  } catch {
    return;
  }
  for (const f of files) {
    if (!/\.(jar|dll)$/i.test(f)) continue;
    const src = path.join(libsDir, f);
    try {
      const srcStat = fs.statSync(src);
      if (!srcStat.isFile()) continue;

      const dst = path.join(gameDir, f);
      let dstStat = null;
      try {
        dstStat = fs.statSync(dst);
      } catch {
        // Not present yet.
      }
      // Same size = already in place. Skipping avoids pointless writes into
      // Program Files, which would fail without elevation.
      if (dstStat && dstStat.size === srcStat.size) {
        onLog(`  ✓ ${f} már a helyén van`);
        continue;
      }

      fs.copyFileSync(src, dst);
      onLog(`  ✓ ${f} → játék mappa`);
    } catch (err) {
      throw new Error(
        `Nem sikerült bemásolni ide: ${path.join(gameDir, f)} (${err.message}). ` +
          'Futtasd a launchert rendszergazdaként, vagy telepítsd a Steamet egy felhasználói mappába.'
      );
    }
  }
}

module.exports = {
  ensureSteamCMD,
  downloadWorkshopItem,
  findWorkshopItemDir,
  placeLocalMod,
  copyAgentLibs,
};
