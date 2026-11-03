const { BrowserWindow, shell } = require('electron');

// Steam Workshop feliratkozás: a kollekció oldalát egy saját (persistált)
// webes munkamenetben nyitjuk meg. Ha a felhasználó be van jelentkezve a
// Steambe, a launcher automatikusan feliratkozik a hiányzó modokra. Ha nem,
// útmutatást és "Megnyitás a Steamben" gombot mutatunk (a Steam kliens
// munkamenetével egy kattintással feliratkozhat).

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let win = null;
let autoTried = false;
let navTries = 0;

function collectionUrl(collectionId) {
  return `https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(collectionId)}`;
}

function openSteamClient(collectionId) {
  return shell.openExternal(`steam://url/CommunityFilePage/${encodeURIComponent(collectionId)}`);
}

function openWindow({ collectionId, missingIds = [], onLog = () => {} }) {
  if (win && !win.isDestroyed()) {
    win.focus();
    return win;
  }
  autoTried = false;
  navTries = 0;

  win = new BrowserWindow({
    width: 1080,
    height: 800,
    minWidth: 760,
    minHeight: 560,
    backgroundColor: '#0e1210',
    title: 'Steam Workshop – feliratkozás',
    autoHideMenuBar: true,
    webPreferences: {
      partition: 'persist:steam',
      spellcheck: false,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.on('closed', () => {
    win = null;
  });

  const wc = win.webContents;

  // A oldalon belüli steam:// megnyitásokat a rendszer alapértelmezett
  // böngészője/protokollkezelője helyett a Steam kliensnek adjuk.
  wc.setWindowOpenHandler(({ url }) => {
    if (/^steam:\/\//i.test(url)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    if (/^https:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  wc.on('will-navigate', (event, url) => {
    if (!/^https:\/\//i.test(url)) {
      event.preventDefault();
      if (/^steam:\/\//i.test(url)) shell.openExternal(url);
    }
  });

  wc.on('did-finish-load', () => {
    handlePage({ collectionId, missingIds, onLog }).catch((err) => {
      onLog('✗ Feliratkozás kezelési hiba: ' + (err && err.message ? err.message : err));
    });
  });

  win.loadURL(collectionUrl(collectionId));
  onLog('Megnyitva a Steam Workshop kollekció (a launcher saját ablakában).');
  return win;
}

async function exec(fnBody) {
  if (!win || win.isDestroyed()) return null;
  const raw = await win.webContents.executeJavaScript(`(() => { ${fnBody} })()`, true);
  try {
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return raw;
  }
}

async function handlePage({ collectionId, missingIds, onLog }) {
  if (!win || win.isDestroyed()) return;
  const url = win.webContents.getURL();
  if (!/^https:\/\/steamcommunity\.com\//i.test(url)) return;

  const state = await exec(`
    try {
      const loggedIn = (typeof g_steamID !== 'undefined' && !!g_steamID) ||
        !!document.querySelector('#account_pulldown');
      const onCollection = new URL(location.href).searchParams.get('id') === '${collectionId}';
      const perItemButtons = document.querySelectorAll('a[id^="SubscribeItemBtn"]').length;
      const hasCollectionFn = typeof SubscribeCollection === 'function';
      return JSON.stringify({ loggedIn, onCollection, perItemButtons, hasCollectionFn });
    } catch (e) {
      return JSON.stringify({ error: String(e) });
    }
  `);
  if (!state || state.error) {
    onLog('✗ A Steam oldal nem értelmezhető: ' + (state && state.error));
    return;
  }

  if (!state.loggedIn) {
    injectBanner(collectionId, onLog);
    return;
  }

  removeBanner();

  if (!state.onCollection) {
    if (navTries < 3) {
      navTries++;
      win.webContents.loadURL(collectionUrl(collectionId));
    }
    return;
  }

  if (autoTried) return;
  autoTried = true;

  // Elsődleges: a hiányzó modok egyedi "Subscribe" gombjainak megnyomása
  // (nincs felülírás-választó dialog, így a meglévő előfizetések érintetlenek).
  const clicked = await exec(`
    (async () => {
      const missing = ${JSON.stringify(missingIds.map(String))};
      let n = 0;
      for (const id of missing) {
        const b = document.getElementById('SubscribeItemBtn' + id);
        if (b) { b.click(); n++; await new Promise(r => setTimeout(r, 150)); }
      }
      return JSON.stringify({
        clicked: n,
        perItemButtons: document.querySelectorAll('a[id^="SubscribeItemBtn"]').length,
      });
    })()
  `);

  if (clicked && clicked.clicked > 0) {
    onLog(`Feliratkozás elküldve: ${clicked.clicked} modra (összesen ${missingIds.length} hiányzott).`);
    await sleep(1200);
    await checkModal(onLog);
    return;
  }

  // Tartalék: ha nincs egyedi gomb (már feliratkozva van minden, vagy más a
  // szerkezet), a gyűjtemény szintű "Subscribe to all" gombot nyomjuk meg.
  if (state.perItemButtons === 0 && clicked && clicked.clicked === 0) {
    onLog('Minden mod már feliratkozva van – várjuk a letöltést.');
    return;
  }

  if (state.hasCollectionFn) {
    onLog('Egyedi gombok nem találhatók – a „Subscribe to all" gomb megnyomása…');
    await exec(`
      try {
        const b = document.querySelector('.subscribeCollection a.subscribe');
        if (b) { b.click(); return 'ok'; }
        return 'missing';
      } catch (e) { return String(e); }
    `);
    await sleep(1500);
    await checkModal(onLog, true);
  } else {
    onLog('⚠ A Steam feliratkozó gombja nem tölthető be – jelentkezz be az oldalon, vagy kattints a „Subscribe to all" gombra.');
  }
}

// Biztonsági ellenőrzés: ha a Steam megerősítő ablakot nyit (Subscribe to all →
// "hozzáadás vagy felülírás"), sosem kattintunk automatikusan – csak útmutatást
// adunk, mert a felülírás törölné a játékos többi előfizetését.
async function checkModal(onLog, collectionLevel = false) {
  for (let i = 0; i < 8; i++) {
    const res = await exec(`
      try {
        const modals = [...document.querySelectorAll('.newmodal, .modal_dialog, [class*="newmodal"]')].filter(el => {
          const s = getComputedStyle(el);
          return s.display !== 'none' && s.visibility !== 'hidden' && el.offsetParent !== null;
        });
        for (const m of modals) {
          const txt = (m.textContent || '').toLowerCase();
          if (!/subscribe|feliratkoz/.test(txt)) continue;
          const btns = [...m.querySelectorAll('a, button, input[type=button]')]
            .filter(b => b.offsetParent !== null)
            .map(b => (b.textContent || '').trim())
            .filter(Boolean);
          return JSON.stringify({ modal: true, buttons: btns });
        }
        return JSON.stringify({ modal: false });
      } catch (e) { return JSON.stringify({ error: String(e) }); }
    `);
    if (res && res.error) return;
    if (res && res.modal) {
      onLog(
        '⚠ A Steam megerősítő ablakot nyitott. Válaszd benne a „hozzáadás" (Add) lehetőséget – ' +
          'a felülírás (Overwrite) törölné a meglévő mod előfizetéseidet.'
      );
      if (collectionLevel) onLog('  (Ez a művelet csak kézzel erősíthető meg.)');
      return;
    }
    await sleep(750);
  }
}

function injectBanner(collectionId, onLog) {
  if (!win || win.isDestroyed()) return;
  const script = `
    (function () {
      if (document.getElementById('eotl-banner')) return 'exists';
      const div = document.createElement('div');
      div.id = 'eotl-banner';
      div.style.cssText = [
        'position:fixed', 'top:0', 'left:0', 'right:0', 'z-index:2147483647',
        'background:#16211a', 'color:#e7ede9', 'border-bottom:2px solid #8fd14f',
        'padding:14px 18px', 'font:14px/1.55 "Segoe UI",system-ui,sans-serif',
        'display:flex', 'gap:16px', 'align-items:center', 'justify-content:space-between',
        'box-shadow:0 6px 24px rgba(0,0,0,.45)',
      ].join(';');
      div.innerHTML =
        '<div><strong>Feliratkozás a Steam Workshop kollekcióra</strong><br>' +
        'Jelentkezz be a Steambe az oldalon (ugyanazzal a fiókkal, mint a Steam kliensben) – ' +
        'a launcher ezután automatikusan feliratkozik a modokra.<br>' +
        'Vagy kattints a gombra, és a <b>Steamben</b> nyomd meg a „Subscribe to all", majd a „Add" gombot.</div>' +
        '<button type="button" id="eotl-steam-open" style="' +
        'flex:0 0 auto;padding:12px 20px;border:none;border-radius:8px;cursor:pointer;' +
        'background:linear-gradient(180deg,#a3e635,#6fbf32);color:#0c1408;font-weight:700;font-size:14px;' +
        '">Megnyitás a Steamben</button>';
      document.documentElement.appendChild(div);
      document.getElementById('eotl-steam-open').addEventListener('click', function () {
        window.open('steam://url/CommunityFilePage/${collectionId}', '_blank');
      });
      return 'ok';
    })()
  `;
  win.webContents
    .executeJavaScript(script, true)
    .then((r) => {
      if (r === 'ok') onLog('Steam bejelentkezés szükséges a feliratkozáshoz – útmutatás megjelent az ablakban.');
    })
    .catch(() => {});
}

function removeBanner() {
  if (!win || win.isDestroyed()) return;
  win.webContents
    .executeJavaScript(`(function(){ const b = document.getElementById('eotl-banner'); if (b) b.remove(); return true; })()`, true)
    .catch(() => {});
}

function isOpen() {
  return !!(win && !win.isDestroyed());
}

module.exports = { openWindow, openSteamClient, isOpen };
