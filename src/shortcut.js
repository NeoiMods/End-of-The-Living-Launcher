const { app } = require('electron');
const { execFile } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

// Asztali parancsikon létrehozása (Windows .lnk), saját ikonnal.
// Csomagolt változatban a launcher exe-jére mutat, fejlesztői módban az
// Electron exe-re az app mappájával.

const SHORTCUT_NAME = 'End of The Living Launcher';

function desktopDir() {
  try {
    return path.join(os.homedir(), 'Desktop');
  } catch {
    return null;
  }
}

function targetInfo() {
  const exePath = process.execPath;
  const isPackaged = app.isPackaged;
  const args = isPackaged ? '' : `"${path.resolve(__dirname, '..')}"`;
  return { exePath, args, isPackaged };
}

function iconPath() {
  const ico = path.join(__dirname, '..', 'assets', 'icon.ico');
  if (fs.existsSync(ico)) return ico;
  const png = path.join(__dirname, '..', 'assets', 'icon.png');
  return fs.existsSync(png) ? png : '';
}

function psRun(script) {
  return new Promise((resolve) => {
    execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', script],
      { windowsHide: true, timeout: 30000 },
      (err, stdout, stderr) => {
        resolve({ ok: !err, error: err ? String(stderr || err.message).trim() : null, out: stdout });
      }
    );
  });
}

function exists(linkPath) {
  try {
    return fs.existsSync(linkPath);
  } catch {
    return false;
  }
}

async function ensureDesktopShortcut({ force = false } = {}) {
  if (process.platform !== 'win32') return { ok: false, created: false, error: 'Csak Windows alatt támogatott.' };

  const dir = desktopDir();
  if (!dir) return { ok: false, created: false, error: 'Nem található az Asztal mappa.' };

  const linkPath = path.join(dir, `${SHORTCUT_NAME}.lnk`);
  if (!force && exists(linkPath)) return { ok: true, created: false, path: linkPath };

  const { exePath, args } = targetInfo();
  const icon = iconPath();
  const workDir = path.dirname(exePath);

  if (!fs.existsSync(exePath)) {
    return { ok: false, created: false, error: `A launcher exe nem található: ${exePath}` };
  }

  const psIcon = icon ? `$s.IconLocation = '${icon},0'` : '';
  const psArgs = args ? `$s.Arguments = '${args.replace(/'/g, "''")}'` : '';

  const script = [
    '$ErrorActionPreference = "Stop"',
    'try {',
    '  $ws = New-Object -ComObject WScript.Shell',
    `  $s = $ws.CreateShortcut('${linkPath.replace(/'/g, "''")}')`,
    `  $s.TargetPath = '${exePath.replace(/'/g, "''")}'`,
    `  $s.WorkingDirectory = '${workDir.replace(/'/g, "''")}'`,
    psArgs,
    psIcon,
    `  $s.Description = '${SHORTCUT_NAME}'`,
    '  $s.Save()',
    '  Write-Output "OK"',
    '} catch { Write-Error $_.Exception.Message }',
  ]
    .filter(Boolean)
    .join('\n');

  const res = await psRun(script);
  if (res.ok && /OK/.test(res.out || '')) {
    return { ok: true, created: true, path: linkPath };
  }
  return { ok: false, created: false, error: res.error || 'A parancsikon létrehozása nem sikerült.' };
}

function findDesktopShortcut() {
  const dir = desktopDir();
  if (!dir) return null;
  const linkPath = path.join(dir, `${SHORTCUT_NAME}.lnk`);
  try {
    // WScript.Shell COM: a .lnk olvasásához
    const { execFileSync } = require('child_process');
    const psScript = [
      '$ErrorActionPreference = "Stop"',
      'try {',
      '  $ws = New-Object -ComObject WScript.Shell',
      `  $s = $ws.CreateShortcut('${linkPath.replace(/\'/g, "\'\'\'")}')`,
      '  if ($s) {',
      `    Write-Output ($s.TargetPath + "|" + $s.WorkingDirectory + "|" + $s.IconLocation)`,
      '    exit 0',
      '  }',
      '} catch { Write-Output "" ; exit 0 }',
    ]
      .filter(Boolean)
      .join('\n');
    const out = execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', psScript], { windowsHide: true, encoding: 'utf8', timeout: 10000 }).trim();
    if (!out) return null;
    const [targetPath, workingDir, iconLocation] = out.split('|');
    return { targetPath, workingDir, iconLocation };
  } catch {
    return null;
  }
}

function writeShortcut(shortcut) {
  if (!shortcut || !shortcut.targetPath) return null;
  const dir = desktopDir();
  if (!dir) return null;
  const linkPath = path.join(dir, `${SHORTCUT_NAME}.lnk`);
  const { execFileSync } = require('child_process');
  const psScript = [
    '$ErrorActionPreference = "Stop"',
    'try {',
    '  $ws = New-Object -ComObject WScript.Shell',
    `  $s = $ws.CreateShortcut('${linkPath.replace(/\'/g, "\'\'\'")}')`,
    `  $s.TargetPath = '${shortcut.targetPath.replace(/\'/g, "\'\'\'")}'`,
    (shortcut.workingDir ? `  $s.WorkingDirectory = '${shortcut.workingDir.replace(/\'/g, "\'\'\'")}'` : ''),
    (shortcut.iconLocation ? `  $s.IconLocation = '${shortcut.iconLocation.replace(/\'/g, "\'\'\'")}'` : ''),
    `  $s.Description = '${SHORTCUT_NAME}'`,
    '  $s.Save()',
    '  exit 0',
    '} catch { exit 1 }',
  ]
    .filter(Boolean)
    .join('\n');
  execFileSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-Command', psScript], { windowsHide: true, timeout: 10000 });
  return true;
}

module.exports = { ensureDesktopShortcut, SHORTCUT_NAME, findDesktopShortcut, writeShortcut };
