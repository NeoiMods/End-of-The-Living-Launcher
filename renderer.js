const bridge = window.api || null;
const browserMode = !bridge;

const $ = (sel) => document.querySelector(sel);

let busy = false;
let lastStatus = null;
let serverStatus = null;
let statusTimer = null;

// ---------------------------------------------------------------- log

function appendLog(text) {
  const box = $('#log');
  if (!box) return;
  const stick = box.scrollHeight - box.scrollTop - box.clientHeight < 40;
  const line = document.createElement('div');
  const raw = String(text);
  line.className = 'log-line';
  if (/^✗/.test(raw)) line.classList.add('err');
  else if (/^⚠|^!/.test(raw)) line.classList.add('warn');
  else if (/^✓/.test(raw)) line.classList.add('ok');
  line.textContent = raw;
  box.appendChild(line);
  while (box.childElementCount > 800) box.removeChild(box.firstElementChild);
  if (stick) box.scrollTop = box.scrollHeight;
}

// ---------------------------------------------------------------- status

function hasId(list, id) {
  const wanted = String(id).toLowerCase();
  return (list || []).some((x) => String(x).toLowerCase() === wanted);
}

function renderServerStatus() {
  const el = $('#serverStatus');
  el.classList.remove('online', 'offline');
  const text = el.querySelector('.status-text');
  const sub = el.querySelector('.status-sub');

  if (!serverStatus) {
    text.textContent = 'Szerver állapot ellenőrzése…';
    sub.textContent = '';
    return;
  }
  if (serverStatus.online) {
    el.classList.add('online');
    text.textContent = 'Szerver ONLINE';
    const players =
      Number.isFinite(serverStatus.players) && Number.isFinite(serverStatus.maxPlayers)
        ? `${serverStatus.players}/${serverStatus.maxPlayers} játékos`
        : 'elérhető';
    sub.textContent = `${players} • ${serverStatus.ping} ms`;
  } else {
    el.classList.add('offline');
    text.textContent = 'Szerver OFFLINE';
    sub.textContent = 'nem válaszol';
  }
}

function render(st) {
  lastStatus = st;
  const server = st.server || {};

  $('#serverName').textContent = server.name || 'Szerver';
  $('#serverAddr').textContent = server.ip
    ? `${server.ip}:${server.port || '16261'}`
    : 'nincs beállítva';
  $('#serverPass').textContent = server.password ? `Jelszó: ${'•'.repeat(6)}` : 'Jelszó: nincs';

  const badge = $('#steamBadge');
  badge.textContent = st.steamRunning ? 'Steam: fut' : 'Steam: áll';
  badge.className = 'badge ' + (st.steamRunning ? 'ok' : 'bad');

  const zbFiles = !!(st.agent && st.agent.present);
  const zbMod = hasId(st.localModIds, 'ZombieBuddy') || hasId(st.enabledIds, 'ZombieBuddy');

  const installed = st.installedModIds || [];
  const enabled = new Set((st.enabledIds || []).map((x) => String(x).toLowerCase()));
  const missingMods = installed.filter((id) => !enabled.has(String(id).toLowerCase()));

  const colCount = Number(st.collectionCount || 0);
  const downloaded = Number(st.downloadedCount || 0);
  const mem = st.memory || { level: 'ok', message: '' };
  const heapMb = st.heapMb || 8192;

  // RAM kijelzés
  const memBox = $('#memoryBox');
  const memValue = $('#memoryValue');
  if (memBox && memValue) {
    memBox.classList.remove('ok', 'low');
    memBox.classList.add(mem.level === 'low' ? 'low' : 'ok');
    memValue.textContent = mem.totalGb
      ? `${mem.totalGb} GB RAM • heap -Xmx${heapMb}m`
      : `heap -Xmx${heapMb}m`;
  }

  const items = [
    {
      ok: st.gameFound,
      label: 'Project Zomboid',
      detail: st.gameFound ? st.gamePath : 'Nem található – Beállítások → Játék mappája',
    },
    {
      ok: zbFiles && zbMod,
      label: 'ZombieBuddy',
      detail: !zbFiles && !zbMod
        ? 'Nincs telepítve – kattints a MODOK TELEPÍTÉSE gombra'
        : !zbFiles
          ? 'A mod mappa megvan, de a játék mappában hiányoznak a fájlok (JAR + DLL)'
          : !zbMod
            ? 'A játék mappa rendben, de a mod nincs a Zomboid\\mods mappában'
            : `Telepítve: JAR + DLL + mod mappa${st.installer ? ' • telepítő kész' : ''}`,
    },
    {
      ok: colCount ? downloaded >= colCount : null,
      warn: colCount > 0 && downloaded < colCount,
      label: 'Mod kollekció',
      detail: colCount
        ? `${downloaded}/${colCount} mod letöltve a Steam Workshophoz`
        : 'Még nincs letöltve a kollekció – kattints a MODOK TELEPÍTÉSE gombra',
    },
    {
      ok: installed.length ? missingMods.length === 0 : null,
      label: 'Modok engedélyezve',
      detail: installed.length
        ? missingMods.length === 0
          ? `${installed.length} mod aktív a default.txt listában`
          : `Hiányzik a listából: ${missingMods.slice(0, 6).join(', ')}${missingMods.length > 6 ? '…' : ''}`
        : 'Még nem telepítettünk modot',
    },
    {
      ok: mem.level === 'low' ? 'warn' : true,
      warn: mem.level === 'low',
      label: 'Memória',
      detail: mem.level === 'low'
        ? `${mem.totalGb} GB RAM – kevés a ${heapMb} MB heap-hez! Előfordulhat lefagyás.`
        : `${mem.totalGb} GB RAM • játék heap: -Xmx${heapMb}m (${(heapMb / 1024).toFixed(1)} GB)${
            st.heapInGame ? ` • launcher JSON: ${st.heapInGame}` : ''
          }`,
    },
  ];

  if (!st.steamRunning) {
    items.push({
      ok: false,
      warn: true,
      label: 'Steam',
      detail: 'A Steam nem fut – indítsd el, mielőtt játszol',
    });
  }

  const ul = $('#checklist');
  ul.textContent = '';
  for (const it of items) {
    const li = document.createElement('li');
    const state = it.ok === null ? 'pending' : it.warn ? 'warn' : it.ok ? 'ok' : 'bad';
    li.className = `check ${state}`;
    li.innerHTML =
      '<span class="check-icon"></span>' +
      '<span class="check-body"><strong></strong><small></small></span>';
    li.querySelector('strong').textContent = it.label;
    li.querySelector('small').textContent = it.detail;
    ul.appendChild(li);
  }

  const play = $('#btnPlay');
  const install = $('#btnInstall');
  play.disabled = busy || !st.gameFound || !server.ip || !!st.gameRunning;
  install.disabled = busy || !st.gameFound;

  const hints = [];
  if (!st.gameFound) hints.push('Előbb telepítsd fel a játékot vagy állítsd be a mappáját.');
  else if (!server.ip) hints.push('Nincs szerver cím – Beállítások.');
  else if (st.gameRunning) hints.push('A játék már fut.');
  if (mem.level === 'low') {
    hints.push(`⚠ Csak ${mem.totalGb} GB RAM van, a ${heapMb} MB heap nem biztos, hogy elfut.`);
  }
  $('#playHint').textContent = hints.join(' ');
}

async function refresh() {
  if (browserMode) return;
  try {
    render(await bridge.getStatus());
  } catch (err) {
    appendLog('✗ Állapot lekérdezési hiba: ' + (err && err.message ? err.message : err));
  }
}

async function refreshServerStatus() {
  if (browserMode) return;
  try {
    serverStatus = await bridge.getServerStatus();
    renderServerStatus();
  } catch {
    serverStatus = { online: false, reason: 'lekérdezési hiba' };
    renderServerStatus();
  }
}

function setBusy(value) {
  busy = value;
  document.body.classList.toggle('busy', value);
  if (lastStatus) render(lastStatus);
}

function showProgress(payload) {
  const wrap = $('#progressWrap');
  const bar = $('#progressBar');
  const label = $('#progressLabel');
  if (!payload || !payload.label) {
    wrap.classList.add('hidden');
    bar.style.width = '0%';
    return;
  }
  wrap.classList.remove('hidden');
  label.textContent =
    Number.isFinite(payload.done) && Number.isFinite(payload.total) && payload.total > 0
      ? `${payload.label} (${payload.done}/${payload.total})`
      : payload.label;
  if (Number.isFinite(payload.done) && Number.isFinite(payload.total) && payload.total > 0) {
    bar.style.width = `${Math.min(100, (payload.done / payload.total) * 100)}%`;
    bar.style.animation = 'none';
  } else {
    bar.style.width = '100%';
    bar.style.animation = '';
  }
}

// ---------------------------------------------------------------- settings

async function openSettings() {
  let cfg;
  try {
    cfg = await bridge.getConfig();
  } catch (err) {
    appendLog('✗ ' + (err && err.message ? err.message : err));
    return;
  }
  $('#setGamePath').value = cfg.gamePath || '';
  $('#setName').value = (cfg.server && cfg.server.name) || '';
  $('#setIp').value = (cfg.server && cfg.server.ip) || '';
  $('#setPort').value = (cfg.server && cfg.server.port) || '16261';
  $('#setPassword').value = (cfg.server && cfg.server.password) || '';
  $('#setCollection').value = cfg.collectionId || '';
  $('#setHeap').value = cfg.jvmMaxMb || 8192;
  $('#setUpdateCheckUrl').value = cfg.updateCheckUrl || '';
  $('#setShortcut').checked = false;

  await updateRamBox(Number(cfg.jvmMaxMb) || 8192);

  $('#settingsOverlay').classList.remove('hidden');
  $('#setIp').focus();
}

async function updateRamBox(heapMb) {
  const box = $('#ramBox');
  const title = $('#ramTitle');
  const tx = $('#ramText');
  try {
    const mem = await bridge.getMemory();
    box.classList.remove('good', 'ok', 'low');
    box.classList.add(mem.level);
    title.textContent =
      mem.level === 'low' ? '⚠ Kevés a memória' : mem.level === 'ok' ? 'Memória: elfogadható' : 'Memória: rendben';
    tx.textContent = mem.message.replace(/^\s+/, '');
  } catch {
    title.textContent = 'RAM ellenőrzés';
    tx.textContent = `A játék ${heapMb} MB heap-et kap.`;
  }
}

function closeSettings() {
  $('#settingsOverlay').classList.add('hidden');
}

async function saveSettings() {
  const next = {
    gamePath: $('#setGamePath').value.trim(),
    server: {
      name: $('#setName').value.trim() || 'End of The Living',
      ip: $('#setIp').value.trim(),
      port: $('#setPort').value.trim() || '16261',
      password: $('#setPassword').value,
    },
    collectionId: $('#setCollection').value.trim(),
    jvmMaxMb: Number($('#setHeap').value) || 8192,
    updateCheckUrl: $('#setUpdateCheckUrl').value.trim(),
  };
  try {
    await bridge.setConfig(next);
    appendLog('✓ Beállítások elmentve.');
    if ($('#setShortcut').checked) await bridge.createShortcut();
    closeSettings();
    serverStatus = null;
    await refresh();
    refreshServerStatus();
  } catch (err) {
    appendLog('✗ ' + (err && err.message ? err.message : err));
  }
}

// ---------------------------------------------------------------- actions

async function runBusy(fn, { reload = true } = {}) {
  if (busy) return;
  setBusy(true);
  try {
    const res = await fn();
    if (res && !res.ok && res.error) appendLog('✗ ' + res.error);
  } catch (err) {
    appendLog('✗ ' + (err && err.message ? err.message : err));
  } finally {
    setBusy(false);
    showProgress(null);
    if (reload) {
      await refresh();
      refreshServerStatus();
    }
  }
}

function wireEvents() {
  $('#btnPlay').addEventListener('click', () =>
    runBusy(() => bridge.launch(), { reload: false }).then(() => refresh())
  );

  $('#btnInstall').addEventListener('click', () =>
    runBusy(() => bridge.installMods())
  );

  $('#btnSettings').addEventListener('click', openSettings);
  $('#btnCancel').addEventListener('click', closeSettings);
  $('#btnSave').addEventListener('click', saveSettings);
  $('#btnClear').addEventListener('click', () => {
    $('#log').textContent = '';
  });

  $('#btnBrowse').addEventListener('click', async () => {
    try {
      const dir = await bridge.pickDirectory();
      if (dir) $('#setGamePath').value = dir;
    } catch (err) {
      appendLog('✗ ' + (err && err.message ? err.message : err));
    }
  });

  $('#setHeap').addEventListener('change', () => {
    updateRamBox(Number($('#setHeap').value) || 8192);
  });

  const mini = (id, fn, reload = true) => {
    const el = $(id);
    if (el) el.addEventListener('click', () => runBusy(fn, { reload }));
  };
  mini('#btnRefreshCollection', () => bridge.refreshCollection());
  mini('#btnSubscribe', () => bridge.openSubscribe(), false);
  mini('#btnZombieBuddy', () => bridge.installZombieBuddy());
  mini('#btnModsFolder', () => bridge.openModsFolder(), false);

  $('#settingsOverlay').addEventListener('click', (e) => {
    if (e.target === $('#settingsOverlay')) closeSettings();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSettings();
  });
}

// ---------------------------------------------------------------- browser demo

function sampleStatus() {
  return {
    gameFound: true,
    gamePath: 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\ProjectZomboid',
    steamRunning: true,
    gameRunning: false,
    enabledIds: ['ZombieBuddy', 'ProjectViewpoint', 'AuthenticZ'],
    localModIds: ['ZombieBuddy', 'ProjectViewpoint', 'AuthenticZ'],
    installedModIds: ['ZombieBuddy', 'ProjectViewpoint', 'AuthenticZ'],
    agent: { jar: true, dll: true, present: true, configured: true },
    collectionCount: 113,
    downloadedCount: 113,
    heapMb: 8192,
    heapInGame: '8192m',
    memory: {
      totalGb: 15.9,
      level: 'good',
      message: 'A gépeden 15.9 GB RAM van – a 8192 MB heap kényelmesen elfér.',
    },
    installer: 'C:\\Users\\User\\AppData\\Roaming\\eotl\\zb-installer\\ZombieBuddyInstaller_v4.4.exe',
    server: {
      name: 'End of The Living',
      ip: 'endofthelivingpz.ddns.net',
      port: '16261',
      password: 'forgotten',
    },
  };
}

function renderBrowserPreview() {
  document.body.classList.add('browser-mode');
  serverStatus = { online: true, players: 7, maxPlayers: 32, ping: 42 };
  render(sampleStatus());
  renderServerStatus();
  appendLog('Böngészős előnézet – a launcher funkciói az asztali változatban élnek.');
  appendLog('Kollekció: The Forgotten – 113 mod.');
  appendLog('✓ 113/113 mod letöltve a Steam Workshophoz');
  appendLog('✓ 113 mod engedélyezve a játék listájában.');
  appendLog('— ZombieBuddy telepítő futtatása —');
  appendLog('  ZombieBuddy Windows Installer v4.4');
  appendLog('  → válasz: "1"');
  appendLog('✓ Installation complete! You can now start Steam and launch Project Zomboid.');
  showProgress({ label: 'Steam letöltés folyamatban…', done: 113, total: 113 });
  setTimeout(() => showProgress(null), 1200);
}

// ---------------------------------------------------------------- init

async function init() {
  wireEvents();
  if (browserMode) {
    renderBrowserPreview();
    return;
  }
  bridge.onLog(appendLog);
  bridge.onProgress(showProgress);
  bridge.onRefresh(() => refresh());
  appendLog('End of The Living Launcher elindítva.');
  await refresh();
  refreshServerStatus();

  if (statusTimer) clearInterval(statusTimer);
  statusTimer = setInterval(() => {
    if (!busy) {
      refreshServerStatus();
    }
  }, 45000);
}

init();
