// Portable (telepítés nélkül futtatható) build + ZIP csomagolás.
// Futtatás: node scripts/package.js
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const APP_DIR_NAME = 'EndOfTheLivingLauncher';
const APP_DIR = path.join(DIST, APP_DIR_NAME);
const APP_EXE = `${APP_DIR_NAME}.exe`;

const APP_FILES = ['main.js', 'preload.js', 'renderer.js', 'index.html', 'styles.css'];
const APP_DIRS = ['src', 'assets'];
// Csak ezeket a nyelveket tartjuk meg (a többi .pak ~47 MB).
const KEEP_LOCALES = ['en-US.pak', 'hu.pak'];

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function copyDir(src, dest, filter = null) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (filter && !filter(e.name, path.join(src, e.name))) continue;
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d, filter);
    else if (e.isFile()) fs.copyFileSync(s, d);
  }
}

function writeAppPackageJson() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const out = {
    name: pkg.name,
    productName: pkg.productName,
    version: pkg.version,
    description: pkg.description,
    main: pkg.main,
    license: pkg.license,
  };
  fs.writeFileSync(path.join(APP_DIR, 'resources', 'app', 'package.json'), JSON.stringify(out, null, 2), 'utf8');
}

const README = `END OF THE LIVING LAUNCHER
==========================

Indítás
-------
1. A ZIP-et csomagold ki egy mappába (pl. C:\\Games\\End of The Living Launcher).
2. Kattints az "${APP_EXE}" fájlra, vagy használd az asztali parancsikont
   (az első indításkor automatikusan létrejön, biohazard ikonnal).

Első használat
--------------
1. Indítsd el a Steamet, és jelentkezz be.
2. A launcherben: MODOK TELEPÍTÉSE / FRISSÍTÉSE.
   - Lekéri a Steam Workshop kollekciót (The Forgotten, 113 mod).
   - Feliratkozik a teljes kollekcióra, és megvárja, amíg a Steam letölti.
     Ha a Steam megerősítő ablakot nyit, válaszd az "Add" (hozzáadás)
     lehetőséget, ne az "Overwrite"-ot.
   - Engedélyezi az összes modot a játékban.
   - Letölti és lefuttatja a ZombieBuddy telepítőt, minden kérdésre
     automatikusan válaszol, és előre jóváhagyja a Java modokat.
3. JÁTÉK INDÍTÁSA - közvetlenül a szerverre csatlakozik.

Memória
-------
A játék -Xmx8192m heap-pel indul (a ProjectZomboid64.json is beállítva).
Legalább 8 GB RAM szükséges, 16 GB ajánlott. A launcher figyelmeztet,
ha a gépeden kevesebb memória van, mint amennyit a játék kap.

Szerver
-------
endofthelivingpz.ddns.net:16261 (A2S / UDP státusz a launcherben)

Beállítások
-----------
Beállítások gomb: játékmappa, szerver cím/port/jelszó, kollekció ID,
JVM heap méret, parancsikon létrehozása.
`;

function buildApp() {
  const electronDist = path.join(ROOT, 'node_modules', 'electron', 'dist');
  if (!fs.existsSync(electronDist)) {
    throw new Error('Nem található a node_modules/electron/dist – futtasd: npm install');
  }

  rmrf(APP_DIR);
  fs.mkdirSync(APP_DIR, { recursive: true });

  // Electron futtatókörnyezet
  copyDir(electronDist, APP_DIR, (name) => {
    if (name === 'locales') return true;
    return true;
  });

  // Nyelvek szűkítése
  const localesDir = path.join(APP_DIR, 'locales');
  if (fs.existsSync(localesDir)) {
    for (const f of fs.readdirSync(localesDir)) {
      if (!KEEP_LOCALES.includes(f)) fs.rmSync(path.join(localesDir, f), { force: true });
    }
  }

  // Az alapértelmezett Electron app helyett a sajátunk
  rmrf(path.join(APP_DIR, 'resources', 'default_app.asar'));

  const appRoot = path.join(APP_DIR, 'resources', 'app');
  fs.mkdirSync(appRoot, { recursive: true });
  for (const f of APP_FILES) fs.copyFileSync(path.join(ROOT, f), path.join(appRoot, f));
  for (const d of APP_DIRS) copyDir(path.join(ROOT, d), path.join(appRoot, d));
  writeAppPackageJson();

  // Exe átnevezése
  const srcExe = path.join(APP_DIR, 'electron.exe');
  const dstExe = path.join(APP_DIR, APP_EXE);
  if (fs.existsSync(dstExe)) fs.rmSync(dstExe, { force: true });
  fs.renameSync(srcExe, dstExe);

  // Olvasdel + parancsikon segéd
  fs.writeFileSync(path.join(APP_DIR, 'OLVASDEL.txt'), README, 'utf8');
  fs.writeFileSync(
    path.join(APP_DIR, 'Parancsikon letrehozasa.bat'),
    [
      '@echo off',
      'chcp 65001 >nul',
      'set "TARGET=%~dp0' + APP_EXE + '"',
      'set "WORKDIR=%~dp0"',
      'set "ICON=%~dp0resources\\app\\assets\\icon.ico"',
      'powershell -NoProfile -Command "$ws=New-Object -ComObject WScript.Shell; $s=$ws.CreateShortcut([Environment]::GetFolderPath(\'Desktop\')+\'\\End of The Living Launcher.lnk\'); $s.TargetPath=\'%TARGET%\'; $s.WorkingDirectory=\'%WORKDIR%\'; $s.IconLocation=\'%ICON%\'; $s.Description=\'End of The Living Launcher\'; $s.Save()"',
      'echo Parancsikon letrehozva az asztalon.',
      'pause',
    ].join('\r\n'),
    'utf8'
  );

  const totalBytes = dirSize(APP_DIR);
  return { appDir: APP_DIR, totalBytes };
}

function dirSize(dir) {
  let total = 0;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    for (const e of fs.readdirSync(cur, { withFileTypes: true })) {
      const p = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(p);
      else if (e.isFile()) total += fs.statSync(p).size;
    }
  }
  return total;
}

function zipApp(zipPath) {
  rmrf(zipPath);
  // A Windows beépített tar.exe-je (bsdtar) tud ZIP-et írni. A PATH-ban lévő
  // "tar" lehet GNU tar (Git Bash), az nem ír ZIP-et, ezért a rendszer
  // tar.exe-ét használjuk.
  const sysTar = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');
  if (fs.existsSync(sysTar)) {
    execFileSync(sysTar, ['-a', '-c', '-f', zipPath, '-C', DIST, APP_DIR_NAME], {
      windowsHide: true,
      stdio: 'inherit',
    });
  } else {
    execFileSync(
      'powershell.exe',
      [
        '-NoProfile',
        '-Command',
        `Compress-Archive -Force -Path '${path.join(DIST, APP_DIR_NAME)}' -DestinationPath '${zipPath}'`,
      ],
      { windowsHide: true, stdio: 'inherit' }
    );
  }
  return fs.statSync(zipPath).size;
}

function splitFile(file, partSizeBytes, outDir) {
  rmrf(outDir);
  fs.mkdirSync(outDir, { recursive: true });
  const buf = fs.readFileSync(file);
  const parts = [];
  for (let i = 0, n = 1; i < buf.length; i += partSizeBytes, n++) {
    const name = `part${String(n).padStart(2, '0')}.bin`;
    fs.writeFileSync(path.join(outDir, name), buf.subarray(i, i + partSizeBytes));
    parts.push(name);
  }
  return parts;
}

function writeJoinScript(outDir, parts, zipName) {
  const lines = [
    '@echo off',
    'chcp 65001 >nul',
    'cd /d "%~dp0"',
    `echo ZIP összefűzése: ${zipName}`,
    `if exist "${zipName}" del "${zipName}"`,
    'copy /b ' + parts.map((p) => p).join('+') + ` "${zipName}" >nul`,
    'if not exist "' + zipName + '" (',
    '  echo HIBA: az összefűzés nem sikerült.',
    '  pause',
    '  exit /b 1',
    ')',
    `echo Kicsomagolás: ${APP_DIR_NAME}`,
    `powershell -NoProfile -Command "Expand-Archive -Force -LiteralPath '${zipName}' -DestinationPath '.'"`,
    'echo.',
    `echo Kész! Indítás: ${APP_DIR_NAME}\\${APP_EXE}`,
    'pause',
  ];
  fs.writeFileSync(path.join(outDir, 'OSSZEFUZES_ES_KICSONAGOLAS.bat'), lines.join('\r\n'), 'utf8');
}

function main() {
  console.log('• Portable build készítése…');
  const { appDir, totalBytes } = buildApp();
  console.log(`  ${appDir} (${(totalBytes / 1048576).toFixed(1)} MB)`);

  console.log('• ZIP készítése…');
  const zipPath = path.join(DIST, 'EndOfTheLivingLauncher.zip');
  const zipBytes = zipApp(zipPath);
  console.log(`  ${zipPath} (${(zipBytes / 1048576).toFixed(1)} MB)`);

  // Discord-barát darabolás (25 MB-os limit alatt)
  const PART = 24 * 1024 * 1024;
  const discordDir = path.join(DIST, 'discord');
  const parts = splitFile(zipPath, PART, discordDir);
  writeJoinScript(discordDir, parts, 'EndOfTheLivingLauncher.zip');
  const partSizes = parts.map((p) => (fs.statSync(path.join(discordDir, p)).size / 1048576).toFixed(1));
  console.log(`  ${discordDir}: ${parts.length} rész (${partSizes.join(' / ')} MB) + OSSZEFUZES_ES_KICSONAGOLAS.bat`);
}

main();
