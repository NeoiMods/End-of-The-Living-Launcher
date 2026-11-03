const { spawn, execFileSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { fetchText, downloadFile } = require('./download');

// A hivatalos ZombieBuddy telepítő (Go konzolos program) automatizálása.
// A telepítő stdin-ről olvassa a válaszokat, kérdésenként; az alábbi prompt
// szövegek a forráskódból (installer/installer.go) származnak.

const RELEASES_API = 'https://api.github.com/repos/zed-0xff/ZombieBuddy/releases/latest';
const RELEASES_LIST_API = 'https://api.github.com/repos/zed-0xff/ZombieBuddy/releases?per_page=10';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const ANSWER_TIMEOUT_MS = 10 * 60 * 1000;
const IDLE_TIMEOUT_MS = 90 * 1000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const stripAnsi = (s) => s.replace(/\x1b\[[0-9;]*m/g, '');

function installerDir(userDataDir) {
  return path.join(userDataDir, 'zb-installer');
}

function findLocalInstaller(userDataDir) {
  const dir = installerDir(userDataDir);
  try {
    const hit = fs
      .readdirSync(dir)
      .filter((f) => /^ZombieBuddyInstaller.*\.exe$/i.test(f))
      .sort()
      .pop();
    return hit ? path.join(dir, hit) : null;
  } catch {
    return null;
  }
}

function ghGet(url) {
  return fetchText(url, {
    headers: { 'User-Agent': 'end-of-the-living-launcher', Accept: 'application/vnd.github+json' },
    timeoutMs: 20000,
  }).then(({ status, body }) => {
    if (status !== 200) throw new Error(`GitHub API hiba (HTTP ${status}).`);
    return JSON.parse(body);
  });
}

function pickInstallerAsset(release) {
  const assets = Array.isArray(release && release.assets) ? release.assets : [];
  return assets.find((a) => /^ZombieBuddyInstaller.*\.exe$/i.test(a.name)) || null;
}

async function fetchReleaseMeta() {
  let release = null;
  try {
    release = await ghGet(RELEASES_API);
  } catch {
    release = null;
  }
  let asset = release ? pickInstallerAsset(release) : null;
  if (!asset) {
    const list = await ghGet(RELEASES_LIST_API);
    for (const r of Array.isArray(list) ? list : []) {
      const a = pickInstallerAsset(r);
      if (a) {
        release = r;
        asset = a;
        break;
      }
    }
  }
  if (!asset) throw new Error('A ZombieBuddy telepítő nem található a GitHub kiadások között.');

  let sha256 = null;
  if (asset.digest && /^sha256:/i.test(asset.digest)) sha256 = asset.digest.split(':')[1].toLowerCase();
  const versionMatch = asset.name.match(/v?(\d+(?:\.\d+)+)/);
  return {
    name: asset.name,
    url: asset.browser_download_url,
    sha256,
    version: versionMatch ? versionMatch[1] : '',
    tag: release.tag_name || '',
    fetchedAt: Date.now(),
  };
}

function readCache(cacheFile) {
  try {
    return JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  } catch {
    return null;
  }
}

function writeCache(cacheFile, meta) {
  try {
    fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
    fs.writeFileSync(cacheFile, JSON.stringify(meta, null, 2), 'utf8');
  } catch {
    // A gyorsítótár elmaradása nem végzetes.
  }
}

function sha256File(file) {
  return new Promise((resolve, reject) => {
    const h = crypto.createHash('sha256');
    const s = fs.createReadStream(file);
    s.on('error', reject);
    s.on('data', (c) => h.update(c));
    s.on('end', () => resolve(h.digest('hex')));
  });
}

// Letölti (ha kell) a legújabb ZombieBuddyInstaller-t, és ellenőrzi a SHA-256-t.
async function ensureInstaller(userDataDir, onLog = () => {}) {
  const dir = installerDir(userDataDir);
  fs.mkdirSync(dir, { recursive: true });
  const cacheFile = path.join(dir, 'release.json');

  let meta = readCache(cacheFile);
  const fresh = meta && Date.now() - (meta.fetchedAt || 0) < CACHE_TTL_MS;
  if (!fresh) {
    try {
      meta = await fetchReleaseMeta();
      writeCache(cacheFile, meta);
    } catch (err) {
      if (!meta) {
        const local = findLocalInstaller(userDataDir);
        if (local) {
          onLog(`⚠ A GitHub nem elérhető, meglévő telepítőt használok: ${path.basename(local)}`);
          return { exePath: local, version: path.basename(local).match(/v?(\d+(?:\.\d+)+)/)?.[1] || '' };
        }
        throw err;
      }
      onLog('⚠ A GitHub nem elérhető – a korábbi telepítő adatbázisát használom.');
    }
  }

  const exePath = path.join(dir, meta.name);
  const local = findLocalInstaller(userDataDir);
  const localName = local ? path.basename(local) : null;

  if (localName !== meta.name && local) {
    try {
      fs.rmSync(local, { force: true });
    } catch {
      // Régi verzió törlése nem kritikus.
    }
  }

  if (!fs.existsSync(exePath)) {
    onLog(`ZombieBuddy telepítő letöltése: ${meta.name}…`);
    await downloadFile(meta.url, exePath);
  }

  if (meta.sha256) {
    const hash = await sha256File(exePath);
    if (hash !== meta.sha256) {
      onLog('✗ A letöltött telepítő SHA-256 ellenőrzése nem sikerült – újratöltés…');
      fs.rmSync(exePath, { force: true });
      await downloadFile(meta.url, exePath);
      const hash2 = await sha256File(exePath);
      if (hash2 !== meta.sha256) {
        fs.rmSync(exePath, { force: true });
        throw new Error('A ZombieBuddy telepítő ellenőrzése nem sikerült (eltérő SHA-256).');
      }
    }
    onLog(`✓ ZombieBuddy telepítő ellenőrizve: ${meta.name} (sha256 rendben)`);
  } else {
    onLog(`! A kiadáshoz nincs SHA-256 – ellenőrzés nélkül használom: ${meta.name}`);
  }

  return { exePath, version: meta.version };
}

function isSteamRunning() {
  try {
    const out = execFileSync('tasklist', ['/FI', 'IMAGENAME eq steam.exe', '/NH'], {
      encoding: 'utf8',
      windowsHide: true,
    });
    return /steam\.exe/i.test(out);
  } catch {
    return false;
  }
}

// Promptok és a rájuk adandó válaszok (installer.go).
const TITLES = [
  { re: /What can I do you for\?/i, ctx: 'action' },
  { re: /What launch mode should ZombieBuddy patch\?/i, ctx: 'mode' },
  { re: /How should Normal Launch be patched\?/i, ctx: 'normal' },
  { re: /Which one should be installed\?/i, ctx: 'zbcopy' },
];

const ANSWERS = {
  action: '1', // 1) Install ZombieBuddy
  mode: '2', // 2) Normal Launch (nincs Steam launch options → nem kéri a Steam bezárását)
  normal: '2', // 2) ProjectZomboid64.json
  zbcopy: '1', // 1) stable
};

function earliest(buf, patterns) {
  let best = null;
  for (const p of patterns) {
    const m = p.re.exec(buf);
    if (m && (!best || m.index < best.index)) best = { index: m.index, length: m[0].length, ...p };
  }
  return best;
}

function steamClosed(timeoutMs = 5 * 60 * 1000) {
  return new Promise((resolve) => {
    const started = Date.now();
    const t = setInterval(() => {
      if (!isSteamRunning()) {
        clearInterval(t);
        resolve(true);
      } else if (Date.now() - started > timeoutMs) {
        clearInterval(t);
        resolve(false);
      }
    }, 2000);
  });
}

// Futtatja a telepítőt, és kérdésenként automatikusan válaszol.
// A spawnCmd csak teszteléshez használható (a kérdéssor szimulálásához).
async function runInstaller({ exePath, onLog = () => {}, spawnCmd = null }) {
  return new Promise((resolve, reject) => {
    const child = spawnCmd
      ? spawn(spawnCmd.command, spawnCmd.args || [], {
          cwd: spawnCmd.cwd || path.dirname(exePath),
          windowsHide: true,
          stdio: ['pipe', 'pipe', 'pipe'],
        })
      : spawn(exePath, [], {
          cwd: path.dirname(exePath),
          windowsHide: true,
          stdio: ['pipe', 'pipe', 'pipe'],
        });

    let buf = '';
    let seen = '';
    let lineBuf = '';
    let ctx = null;
    let failed = false;
    let failureMessage = '';
    let success = false;
    let settled = false;
    let lastOutput = Date.now();
    const attempts = {};
    const startedAt = Date.now();
    const pendingSteamClose = [];

    const finish = (fn, arg) => {
      if (settled) return;
      settled = true;
      clearInterval(idleTimer);
      clearTimeout(totalTimer);
      fn(arg);
    };

    const idleTimer = setInterval(() => {
      if (Date.now() - lastOutput > IDLE_TIMEOUT_MS) {
        try {
          child.kill();
        } catch {
          // Már leállt.
        }
        finish(reject, new Error('A ZombieBuddy telepítő nem adott választ (időtúllépés).'));
      }
    }, 2000);

    const totalTimer = setTimeout(() => {
      try {
        child.kill();
      } catch {
        // Már leállt.
      }
      finish(reject, new Error('A ZombieBuddy telepítő túl sokáig futott (időtúllépés).'));
    }, ANSWER_TIMEOUT_MS);

    const send = (text) => {
      try {
        child.stdin.write(text);
        onLog('  → válasz: ' + JSON.stringify(text.replace(/\n$/, '') || '(Enter)'));
      } catch (err) {
        finish(reject, new Error('Nem sikerült válaszolni a telepítőnek: ' + err.message));
      }
    };

    const respond = (kind, match) => {
      if (kind === 'answer') {
        const answer = ANSWERS[ctx];
        if (!answer) {
          onLog('⚠ Ismeretlen telepítő kérdés – válasz nélkül marad.');
          return;
        }
        attempts[ctx] = (attempts[ctx] || 0) + 1;
        if (attempts[ctx] > 3) {
          failed = true;
          failureMessage = 'A telepítő ismételten érvénytelen választ kapott.';
          try {
            child.kill();
          } catch {
            // Már leállt.
          }
          return;
        }
        send(answer + '\n');
      } else if (kind === 'continue') {
        send('y\n');
      } else if (kind === 'exit') {
        send('\n');
      } else if (kind === 'steamclose') {
        onLog('⚠ A telepítő a Steam bezárását kéri. Zárd be a Steamet (tálca → Kilépés), a launcher nem teszi meg automatikusan.');
        steamClosed().then((closed) => {
          if (closed) {
            onLog('✓ A Steam bezárva – folytatás…');
            send('\n');
          } else {
            failed = true;
            failureMessage = 'A telepítő a Steam bezárását várta, de az nem történt meg.';
            try {
              child.kill();
            } catch {
              // Már leállt.
            }
          }
        });
        pendingSteamClose.push(true);
      }
    };

    const handleChunk = (chunk) => {
      buf += chunk;

      // Címek → kérdés kontextus beállítása.
      for (;;) {
        const title = earliest(
          buf,
          TITLES.map((t) => ({ re: t.re, kind: 'title', ctx: t.ctx }))
        );
        const answerable = earliest(buf, [
          { re: /Choose [^:\n]*:\s*/, kind: 'answer' },
          { re: /Continue\? \[y\/N\]:\s*/i, kind: 'continue' },
          { re: /Press Enter after closing Steam\.\.\./i, kind: 'steamclose' },
          { re: /Press Enter to exit\.\.\./i, kind: 'exit' },
        ]);

        if (!title && !answerable) break;
        if (title && (!answerable || title.index < answerable.index)) {
          ctx = title.ctx;
          buf = buf.slice(title.index + title.length);
          continue;
        }
        buf = buf.slice(answerable.index + answerable.length);
        respond(answerable.kind, answerable);
      }

      // A teljes kimenet utolsó darabját külön tároljuk, hogy a vágás után is
      // felismerjük a siker/hiba üzeneteket.
      const clean = stripAnsi(chunk);
      seen = (seen + clean).slice(-4000);
      if (/Installation complete!/i.test(seen)) success = true;
      if (/\[!\] Error/i.test(seen) || /encountered errors/i.test(seen) || /Error detecting/i.test(seen)) {
        failed = true;
      }
      if (failed) {
        const m = seen.match(/\[!\][^\n]*/g);
        failureMessage = m ? m[m.length - 1].trim() : 'A telepítő hibát jelzett.';
      }
      // A már feldolgozott részt eldobhatjuk, hogy a buffer ne nőjön.
      if (buf.length > 8192) buf = buf.slice(-2048);
    };

    const logLines = (text) => {
      lineBuf += text;
      const parts = lineBuf.split(/[\r\n]+/);
      lineBuf = parts.pop() || '';
      for (const line of parts) {
        const t = stripAnsi(line).trimEnd();
        if (t.trim()) onLog('  ' + t);
      }
    };

    child.stdout.on('data', (d) => {
      lastOutput = Date.now();
      const text = d.toString('utf8');
      logLines(text);
      handleChunk(text);
    });

    child.stderr.on('data', (d) => {
      lastOutput = Date.now();
      const text = d.toString('utf8');
      logLines(text);
      handleChunk(text);
    });

    child.on('error', (err) => {
      finish(reject, new Error('A ZombieBuddy telepítő nem indult el: ' + err.message));
    });

    child.on('close', (code) => {
      if (settled) return;
      if (failed) {
        finish(resolve, { ok: false, code, message: failureMessage || 'A telepítő hibával zárult.' });
      } else {
        finish(resolve, {
          ok: true,
          code,
          message: success
            ? 'Telepítés kész.'
            : code === 0
              ? 'A telepítő lefutott (nincs teendő vagy minden már kész).'
              : `A telepítő ${code} kódossal zárult.`,
        });
      }
    });
  });
}

// Teljes folyamat: letöltés + ellenőrzés + automatizált futtatás.
async function runZombieBuddyInstaller({ userDataDir, onLog = () => {}, onProgress = () => {} }) {
  onProgress({ label: 'ZombieBuddy telepítő előkészítése…' });
  const { exePath, version } = await ensureInstaller(userDataDir, onLog);
  onLog('— ZombieBuddy telepítő futtatása —');
  onProgress({ label: 'ZombieBuddy telepítő fut…' });
  const res = await runInstaller({ exePath, onLog });
  if (res.ok) onLog('✓ ' + res.message);
  else onLog('✗ ' + res.message);
  return { ...res, version, name: path.basename(exePath) };
}

module.exports = {
  ensureInstaller,
  findLocalInstaller,
  runInstaller,
  runZombieBuddyInstaller,
  ANSWERS,
};
