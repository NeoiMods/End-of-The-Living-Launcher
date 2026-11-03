// Ikon generálása (biohazard) Electron canvas-szal: assets/icon.png + assets/icon.ico
// Futtatás: npx electron scripts/make-icon.js
const { app, BrowserWindow, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

const SIZES = [256, 128, 64, 48, 32, 16];

const DRAW_FN = `
function drawIcon(size) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const s = size;
  const cx = s / 2, cy = s / 2;

  // háttér: sötét, enyhén vöröses átmenet, lekerekített négyzet
  const bg = ctx.createRadialGradient(cx, cy * 0.7, s * 0.1, cx, cy, s * 0.75);
  bg.addColorStop(0, '#2a1512');
  bg.addColorStop(0.55, '#140b09');
  bg.addColorStop(1, '#070403');
  ctx.fillStyle = bg;
  ctx.beginPath();
  const r = s * 0.22;
  ctx.moveTo(r, 0);
  ctx.arcTo(s, 0, s, s, r);
  ctx.arcTo(s, s, 0, s, r);
  ctx.arcTo(0, s, 0, 0, r);
  ctx.arcTo(0, 0, s, 0, r);
  ctx.closePath();
  ctx.fill();

  // halvány vörös derengés
  const glow = ctx.createRadialGradient(cx, cy, s * 0.05, cx, cy, s * 0.5);
  glow.addColorStop(0, 'rgba(214,48,32,0.35)');
  glow.addColorStop(1, 'rgba(214,48,32,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, s, s);

  const red = '#c0271c';
  const redLight = '#e8452f';

  // külső vékony gyűrű
  ctx.strokeStyle = redLight;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = Math.max(1, s * 0.028);
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.335, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // trefoil: három kör 120 fokonként
  const petalDist = s * 0.152;
  const petalR = s * 0.152;
  ctx.fillStyle = red;
  for (let i = 0; i < 3; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / 3;
    const px = cx + Math.cos(a) * petalDist;
    const py = cy + Math.sin(a) * petalDist;
    ctx.beginPath();
    ctx.arc(px, py, petalR, 0, Math.PI * 2);
    ctx.fill();
  }

  // kivágások: középső kör + három rés a szirmok között (a háttér színével)
  ctx.fillStyle = '#0d0706';
  for (let i = 0; i < 3; i++) {
    const a = -Math.PI / 2 + Math.PI / 3 + (i * Math.PI * 2) / 3;
    const px = cx + Math.cos(a) * s * 0.30;
    const py = cy + Math.sin(a) * s * 0.30;
    ctx.beginPath();
    ctx.arc(px, py, s * 0.105, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.072, 0, Math.PI * 2);
  ctx.fill();

  // belső vörös körvonal a középső kivágás körül
  ctx.strokeStyle = redLight;
  ctx.lineWidth = Math.max(1, s * 0.02);
  ctx.beginPath();
  ctx.arc(cx, cy, s * 0.108, 0, Math.PI * 2);
  ctx.stroke();

  return c.toDataURL('image/png');
}
`;

function buildIco(pngBuffers) {
  // ICO fejléc + bejegyzések PNG tartalommal (Windows Vista+ támogatja).
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;
  for (const { size, buf } of pngBuffers) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buf)]);
}

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, width: 400, height: 400 });
  await win.loadURL('data:text/html,<html><body></body></html>');
  await win.webContents.executeJavaScript(DRAW_FN, true);

  const outDir = path.join(__dirname, '..', 'assets');
  fs.mkdirSync(outDir, { recursive: true });

  const pngs = [];
  for (const size of SIZES) {
    const dataUrl = await win.webContents.executeJavaScript(`drawIcon(${size})`, true);
    const buf = Buffer.from(String(dataUrl).split(',')[1], 'base64');
    pngs.push({ size, buf });
    if (size === 256) fs.writeFileSync(path.join(outDir, 'icon.png'), buf);
  }
  fs.writeFileSync(path.join(outDir, 'icon.ico'), buildIco(pngs));

  // ICO beolvasási próba az Electron natív képével.
  const check = nativeImage.createFromPath(path.join(outDir, 'icon.ico'));
  console.log('icon.png / icon.ico kész. ICO olvasható:', !check.isEmpty(), check.getSize());

  app.quit();
});
