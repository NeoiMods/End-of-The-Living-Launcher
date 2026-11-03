// Procedurális apokaliptikus háttér (SVG) generálása: assets/bg.svg
// A kompozíció a launcherhez igazodik: a nap + városi siluetta a felső
// sávban (logó/hero) látszik, a sötét talaj és a horda a panelek alatt marad.
const fs = require('fs');
const path = require('path');

const W = 1920;
const H = 1080;
const HORIZON = 240; // a talaj itt kezdődik – a hero sáv aljánál látszik

let seed = 20261103;
function rnd() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
const rndRange = (a, b) => a + rnd() * (b - a);
const round = (n) => Math.round(n * 10) / 10;

const parts = [];

function smokeCloud(cx, cy, rx, ry, opacity, color) {
  parts.push(
    `<ellipse cx="${round(cx)}" cy="${round(cy)}" rx="${round(rx)}" ry="${round(ry)}" fill="${color}" opacity="${opacity}" filter="url(#soft)"/>`
  );
}

function skyline(baseY, color, minH, maxH, density, windowColor, windowOpacity) {
  let x = -40;
  while (x < W + 40) {
    const w = rndRange(38, 130);
    const h = rndRange(minH, maxH);
    const y = baseY - h;
    parts.push(`<rect x="${round(x)}" y="${round(y)}" width="${round(w)}" height="${round(h + 4)}" fill="${color}"/>`);

    const roof = rnd();
    if (roof > 0.74) {
      parts.push(
        `<polygon points="${round(x)},${round(y)} ${round(x + w / 2)},${round(y - rndRange(10, 28))} ${round(x + w)},${round(y)}" fill="${color}"/>`
      );
    } else if (roof > 0.5) {
      parts.push(
        `<rect x="${round(x + w * 0.25)}" y="${round(y - 12)}" width="${round(w * 0.2)}" height="12" fill="${color}"/>`
      );
    }

    const cols = Math.max(1, Math.floor(w / 22));
    const rows = Math.max(1, Math.floor(h / 24));
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rnd() > density) continue;
        const wx = x + 7 + c * 22;
        const wy = y + 9 + r * 24;
        if (wx + 7 > x + w || wy + 9 > baseY) continue;
        parts.push(
          `<rect x="${round(wx)}" y="${round(wy)}" width="7" height="9" fill="${windowColor}" opacity="${round(
            windowOpacity * rndRange(0.4, 1)
          )}"/>`
        );
      }
    }
    x += w + rndRange(4, 14);
  }
}

function church(cx, baseY, color) {
  parts.push(
    `<rect x="${cx - 30}" y="${baseY - 96}" width="60" height="96" fill="${color}"/>`,
    `<polygon points="${cx - 30},${baseY - 96} ${cx},${baseY - 132} ${cx + 30},${baseY - 96}" fill="${color}"/>`,
    `<rect x="${cx - 11}" y="${baseY - 208}" width="22" height="112" fill="${color}"/>`,
    `<polygon points="${cx - 11},${baseY - 208} ${cx},${baseY - 268} ${cx + 11},${baseY - 208}" fill="${color}"/>`,
    `<rect x="${cx - 1.5}" y="${baseY - 292}" width="3" height="26" fill="${color}"/>`,
    `<rect x="${cx - 7}" y="${baseY - 284}" width="14" height="3" fill="${color}"/>`
  );
}

function waterTower(cx, baseY, color) {
  parts.push(
    `<rect x="${cx - 38}" y="${baseY - 176}" width="76" height="58" rx="5" fill="${color}"/>`,
    `<polygon points="${cx - 44},${baseY - 176} ${cx},${baseY - 208} ${cx + 44},${baseY - 176}" fill="${color}"/>`,
    `<rect x="${cx - 31}" y="${baseY - 118}" width="6" height="118" fill="${color}"/>`,
    `<rect x="${cx + 25}" y="${baseY - 118}" width="6" height="118" fill="${color}"/>`,
    `<rect x="${cx - 35}" y="${baseY - 78}" width="70" height="4" fill="${color}"/>`,
    `<rect x="${cx - 35}" y="${baseY - 38}" width="70" height="4" fill="${color}"/>`
  );
}

function powerPole(x, baseY, color) {
  parts.push(
    `<rect x="${x - 2.5}" y="${baseY - 150}" width="5" height="150" fill="${color}"/>`,
    `<rect x="${x - 28}" y="${baseY - 140}" width="56" height="4" fill="${color}"/>`,
    `<rect x="${x - 21}" y="${baseY - 120}" width="42" height="3.5" fill="${color}"/>`
  );
}

function fence(baseY, color) {
  for (let x = 0; x < W; x += 46) {
    parts.push(`<rect x="${x}" y="${baseY - 54}" width="3" height="58" fill="${color}" opacity="0.9"/>`);
  }
  for (let i = 0; i < 4; i++) {
    const y = baseY - 52 + i * 14;
    parts.push(
      `<path d="M0 ${y} Q 120 ${+round(y + 6)} 240 ${y} T 480 ${y} T 720 ${y} T 960 ${y} T 1200 ${y} T 1440 ${y} T 1680 ${y} T 1920 ${y}" stroke="${color}" stroke-width="2" fill="none" opacity="0.6"/>`
    );
  }
}

// Zombi sziluett: fej, váll, két előrenyúló kar, kicsit görnyedt test.
function zombie(x, baseY, scale, color, alpha = 1) {
  parts.push(
    `<g fill="${color}" opacity="${alpha}" transform="translate(${round(x)} ${round(baseY)}) scale(${round(scale * 100) / 100})">` +
      `<path d="M-16 12 q-2 -40 6 -54 q10 -14 22 0 q8 16 6 54 z"/>` +
      `<circle cx="2" cy="-56" r="12"/>` +
      `<path d="M-12 -30 q-26 -16 -34 -46 q10 -3 17 6 q8 12 22 26 z"/>` +
      `<path d="M14 -30 q24 -18 30 -48 q-9 -2 -16 8 q-8 13 -20 28 z"/>` +
      `</g>`
  );
}

// =================== összeállítás ===================
parts.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#1d0805"/>
    <stop offset="5%" stop-color="#54140a"/>
    <stop offset="9%" stop-color="#a52e10"/>
    <stop offset="12%" stop-color="#d95a1d"/>
    <stop offset="14%" stop-color="#ffbe6d"/>
    <stop offset="17%" stop-color="#f2871f"/>
    <stop offset="21%" stop-color="#8e2710"/>
    <stop offset="26%" stop-color="#3a1109"/>
    <stop offset="40%" stop-color="#1a0a06"/>
    <stop offset="100%" stop-color="#080404"/>
  </linearGradient>
  <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0%" stop-color="#fff0cf" stop-opacity="0.95"/>
    <stop offset="30%" stop-color="#ffab4d" stop-opacity="0.6"/>
    <stop offset="65%" stop-color="#e2601f" stop-opacity="0.2"/>
    <stop offset="100%" stop-color="#e2601f" stop-opacity="0"/>
  </radialGradient>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="24"/>
  </filter>
  <filter id="soft2" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="8"/>
  </filter>
  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#2a1008"/>
    <stop offset="24%" stop-color="#150806"/>
    <stop offset="100%" stop-color="#040202"/>
  </linearGradient>
</defs>

<rect width="${W}" height="${H}" fill="url(#sky)"/>
<ellipse cx="1290" cy="168" rx="680" ry="230" fill="url(#sunGlow)"/>
<circle cx="1290" cy="160" r="52" fill="#ffe9c2" opacity="0.95" filter="url(#soft2)"/>
<circle cx="1290" cy="160" r="29" fill="#fffaf0" opacity="0.95"/>
`);

// füst az égen (a felső sávban)
for (let i = 0; i < 22; i++) {
  smokeCloud(
    rndRange(-80, W + 80),
    rndRange(5, 200),
    rndRange(120, 360),
    rndRange(24, 72),
    round(rndRange(0.06, 0.2)),
    i % 4 === 0 ? '#210b06' : '#4a150a'
  );
}
// füstoszlopok a látóhatáron
for (let i = 0; i < 4; i++) {
  const cx = rndRange(260, W - 360);
  for (let k = 0; k < 8; k++) {
    smokeCloud(
      cx + rndRange(-60, 60) + k * rndRange(-16, 20),
      212 - k * rndRange(22, 34),
      rndRange(40, 78) + k * 10,
      rndRange(22, 42) + k * 5,
      round(0.18 - k * 0.014),
      '#2a0e07'
    );
  }
}

// távoli hegyek
parts.push(
  `<path d="M0 196 L180 156 L320 190 L520 146 L700 188 L900 152 L1120 192 L1320 160 L1560 198 L1760 162 L1920 194 L1920 246 L0 246 Z" fill="#6b2310" opacity="0.5"/>`
);

// városi rétegek (a talajvonal felett)
skyline(HORIZON + 6, '#7c2c12', 40, 108, 0.18, '#ffcf8a', 0.5);
church(470, HORIZON + 10, '#5e2010');
waterTower(1640, HORIZON + 12, '#521b0d');
skyline(HORIZON + 18, '#3d140b', 44, 132, 0.16, '#ffd9a0', 0.55);
church(1150, HORIZON + 20, '#2e0f09');
skyline(HORIZON + 26, '#1f0a07', 40, 116, 0.1, '#ffb870', 0.4);

// villanyoszlopok
powerPole(150, HORIZON + 44, '#0c0403');
powerPole(455, HORIZON + 42, '#0c0403');
powerPole(760, HORIZON + 40, '#0c0403');
parts.push(
  `<path d="M150 194 Q 300 226 455 192" stroke="#0a0403" stroke-width="2.5" fill="none" opacity="0.85"/>`,
  `<path d="M455 192 Q 610 224 760 190" stroke="#0a0403" stroke-width="2.5" fill="none" opacity="0.85"/>`
);

// talaj
parts.push(`<rect x="0" y="${HORIZON}" width="${W}" height="${H - HORIZON}" fill="url(#ground)"/>`);

// kerítés a város előtt
fence(HORIZON + 62, '#0a0504');

// horda: néhány alak a kerítés mögött + sűrű tömeg a kép alján
for (let i = 0; i < 16; i++) {
  zombie(rndRange(-20, W + 20), HORIZON + 56, rndRange(0.5, 0.85), '#070303', 0.9);
}
for (let i = 0; i < 20; i++) {
  zombie(rndRange(-20, W + 20), HORIZON + 96, rndRange(0.7, 1.2), '#050202', 0.85);
}
for (let i = 0; i < 30; i++) {
  zombie(rndRange(-30, W + 30), rndRange(1000, 1090), rndRange(1.1, 2.0), '#030202');
}

// fűcsomók
for (let i = 0; i < 120; i++) {
  const x = rndRange(0, W);
  const y = rndRange(HORIZON + 70, 1080);
  const h = rndRange(10, 34);
  parts.push(
    `<path d="M${round(x)} ${round(y)} q ${round(rndRange(-6, 6))} ${round(-h / 2)} ${round(
      rndRange(-10, 10)
    )} ${round(-h)}" stroke="#070303" stroke-width="2.2" fill="none" opacity="0.75"/>`
  );
}

// enyhe sötétítés a széleken
parts.push(
  `<rect width="${W}" height="${H}" fill="url(#sideFade)"/>`,
  `</svg>`
);

const svg = parts.join('\n').replace(
  '<linearGradient id="ground"',
  `<linearGradient id="sideFade" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#000" stop-opacity="0.55"/>
    <stop offset="18%" stop-color="#000" stop-opacity="0"/>
    <stop offset="82%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
  </linearGradient>
  <linearGradient id="ground"`
);

const out = path.join(__dirname, '..', 'assets', 'bg.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg, 'utf8');
console.log('Kész:', out, (fs.statSync(out).size / 1024).toFixed(1) + ' KB');
