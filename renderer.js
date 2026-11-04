const bridge = window.api || null;
const browserMode = !bridge;

const $ = (sel) => document.querySelector(sel);

let busy = false;
let savedUpdateUrl = '';
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
  $('#setEventsUrl').value = cfg.eventsUrl || '';
  $('#setPacksRepo').value = cfg.packsRepo || '';
  $('#setGithubToken').value = cfg.githubToken || '';
  savedUpdateUrl = cfg.updateCheckUrl || '';
  $('#setShortcut').checked = false;

  await updateRamBox(Number(cfg.jvmMaxMb) || 8192);

  $('#settingsOverlay').classList.remove('hidden');
  $('#setIp').focus();
  refreshUpdatePanel();
}

// ---------------------------------------------------------------- frissítés

function describeChecked(ts) {
  if (!ts) return 'még nem ellenőrizte';
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return 'most';
  if (mins < 60) return mins + ' perce';
  return new Date(ts).toLocaleString('hu-HU');
}

function renderUpdateInfo(info, res) {
  const box = $('#updateBox');
  const text = $('#updateText');
  const sha = $('#updateSha');
  const applyBtn = $('#btnUpdateApply');
  if (!box || !text) return;

  box.classList.remove('available', 'error');
  if (applyBtn) applyBtn.classList.add('hidden');

  if (info && sha) {
    sha.textContent = info.installedShort ? '#' + info.installedShort : 'nincs verzió';
  }

  if (res && res.ok === false) {
    box.classList.add('error');
    text.textContent = 'Hiba: ' + (res.reason || 'ismeretlen hiba');
    return;
  }

  if (res && res.update) {
    box.classList.add('available');
    const msg = res.remote && res.remote.message ? ' – ' + res.remote.message : '';
    text.textContent =
      'Új verzió érhető el: #' + String(res.remoteSha).slice(0, 7) + msg + ' • forrás: ' + res.repo;
    if (applyBtn) applyBtn.classList.remove('hidden');
    return;
  }

  if (res && res.ok) {
    const when =
      res.remote && res.remote.date ? new Date(res.remote.date).toLocaleString('hu-HU') : '';
    text.textContent =
      'Naprakész • forrás: ' + res.repo + (when ? ' • legutóbbi commit: ' + when : '');
    return;
  }

  if (info) {
    text.textContent =
      'Forrás: ' + info.repo + ' • utolsó ellenőrzés: ' + describeChecked(info.lastCheckedAt);
  }
}

async function refreshUpdatePanel(autoCheck = true) {
  if (browserMode) return;
  try {
    const info = await bridge.getUpdateInfo();
    renderUpdateInfo(info, null);
    if (!autoCheck) return;
    const res = await bridge.checkUpdate();
    renderUpdateInfo(info, res);
  } catch (err) {
    renderUpdateInfo(null, { ok: false, reason: err && err.message ? err.message : String(err) });
  }
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
    eventsUrl: $('#setEventsUrl').value.trim(),
    packsRepo: $('#setPacksRepo').value.trim(),
    githubToken: $('#setGithubToken').value.trim(),
  };
  try {
    await bridge.setConfig(next);
    appendLog('✓ Beállítások elmentve.');
    if (next.updateCheckUrl !== savedUpdateUrl) {
      savedUpdateUrl = next.updateCheckUrl;
      appendLog('• Frissítési forrás módosítva – ellenőrzés…');
      bridge.checkUpdate().catch(() => {});
    }
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

  // ---- napló / esemény fülek ----
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => setTab(tab.dataset.tab));
  });

  $('#btnEventReload').addEventListener('click', () => loadEvent(true));

  $('#btnEventOpen').addEventListener('click', () => {
    if (currentEvent && currentEvent.url) bridge.openExternal(currentEvent.url);
  });

  // ---- optimalizálás ----
  $('#btnOptimize').addEventListener('click', openOptimize);
  $('#btnOptClose').addEventListener('click', closeOptimize);
  $('#optOverlay').addEventListener('click', (e) => {
    if (e.target === $('#optOverlay')) closeOptimize();
  });
  document.querySelectorAll('.opt-card.ready').forEach((card) => {
    card.addEventListener('click', () => runOptAction(card.dataset.opt));
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

  $('#btnUpdateCheck').addEventListener('click', async () => {
    const btn = $('#btnUpdateCheck');
    btn.disabled = true;
    $('#updateText').textContent = 'Ellenőrzés a GitHubon…';
    try {
      const info = await bridge.getUpdateInfo();
      const res = await bridge.checkUpdate();
      renderUpdateInfo(info, res);
    } catch (err) {
      renderUpdateInfo(null, { ok: false, reason: err && err.message ? err.message : String(err) });
    } finally {
      btn.disabled = false;
    }
  });

  $('#btnUpdateApply').addEventListener('click', async () => {
    const btn = $('#btnUpdateApply');
    btn.disabled = true;
    btn.classList.add('hidden');
    $('#updateText').textContent = 'Frissítés letöltése és telepítése…';
    try {
      const res = await bridge.applyUpdate();
      if (res && res.ok) {
        $('#updateText').textContent = 'Kész – a launcher újraindul…';
      } else {
        $('#updateText').textContent = 'Sikertelen: ' + ((res && res.error) || 'ismeretlen hiba');
        btn.disabled = false;
        btn.classList.remove('hidden');
      }
    } catch (err) {
      $('#updateText').textContent = 'Sikertelen: ' + (err && err.message ? err.message : err);
      btn.disabled = false;
      btn.classList.remove('hidden');
    }
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
    if (e.key === 'Escape') {
      closeSettings();
      closeOptimize();
    }
  });
}

// ---------------------------------------------------------------- fülek

function setTab(name) {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.tab === name);
  });
  $('#log').classList.toggle('hidden', name !== 'log');
  $('#eventView').classList.toggle('hidden', name !== 'event');
  $('#btnClear').classList.toggle('hidden', name !== 'log');
  if (name === 'event') markEventSeen();
}

// ---------------------------------------------------------------- események

const SEEN_EVENT_KEY = 'eotl.seenEvent';

let currentEvent = null;
let eventPollTimer = null;
let countdownTimer = null;

function pad2(value) {
  return String(Math.max(0, Math.floor(value))).padStart(2, '0');
}

function eventDateText(time) {
  try {
    return new Date(time).toLocaleString('hu-HU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

function markEventSeen() {
  if (currentEvent) {
    try {
      localStorage.setItem(SEEN_EVENT_KEY, currentEvent.id);
    } catch {
      /* privát mód: nem baj */
    }
  }
  $('#eventDot').classList.remove('is-on');
  $('#eventCard').classList.remove('is-new');
}

function tickCountdown() {
  const chip = $('#headCountdown');
  if (!currentEvent) return;
  const diff = currentEvent.time - Date.now();
  const live = diff <= 0;
  const total = Math.floor(Math.abs(diff) / 1000);

  $('#hcDays').textContent = pad2(total / 86400);
  $('#hcHours').textContent = pad2((total % 86400) / 3600);
  $('#hcMins').textContent = pad2((total % 3600) / 60);
  $('#hcSecs').textContent = pad2(total % 60);

  chip.classList.toggle('is-live', live);
  $('#hcCap').textContent = live ? 'ELTELT' : 'ESEMÉNYIG';
}

function renderEvent(res) {
  const card = $('#eventCard');
  const title = $('#eventTitle');
  const text = $('#eventText');
  const when = $('#eventWhen');
  const tag = $('#eventTag');

  if (!res || !res.ok || !res.event) {
    currentEvent = null;
    title.textContent = 'Nincs aktív esemény';
    text.textContent =
      (res && res.error) || (res && res.reason) || 'Amint feltöltünk egyet a GitHubra, itt megjelenik.';
    when.textContent = '—';
    tag.textContent = 'ESEMÉNY';
    $('#headCountdown').classList.add('hidden');
    $('#btnEventOpen').classList.add('hidden');
    card.classList.remove('is-new');
    $('#eventDot').classList.remove('is-on');
    return;
  }

  const ev = res.event;
  ev.dateText = eventDateText(ev.time);
  currentEvent = ev;

  title.textContent = ev.title;
  text.textContent = ev.text || '';
  when.textContent = ev.dateText;
  tag.textContent = ev.tag || 'ESEMÉNY';
  $('#headCountdown').classList.remove('hidden');
  $('#btnEventOpen').classList.toggle('hidden', !ev.url);

  tickCountdown();

  let seen = null;
  try {
    seen = localStorage.getItem(SEEN_EVENT_KEY);
  } catch {
    seen = null;
  }
  const isNew = !!ev.id && ev.id !== seen;
  card.classList.toggle('is-new', isNew);
  $('#eventDot').classList.toggle('is-on', isNew);
}

async function loadEvent(force) {
  if (browserMode) {
    renderEvent(sampleEvent());
    return;
  }
  try {
    const res = await bridge.getEvent(!!force);
    renderEvent(res);
  } catch (err) {
    renderEvent({ ok: false, error: 'Esemény betöltése sikertelen.' });
  }
}

function startEventLoop() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(tickCountdown, 1000);

  if (eventPollTimer) clearInterval(eventPollTimer);
  eventPollTimer = setInterval(() => loadEvent(false), 5 * 60 * 1000);
}

// ---------------------------------------------------------------- optimalizálás

function openOptimize() {
  $('#optOverlay').classList.remove('hidden');
}

function closeOptimize() {
  $('#optOverlay').classList.add('hidden');
}

function runOptAction(action) {
  closeOptimize();
  if (action === 'heap') {
    openSettings();
    return;
  }
  if (action === 'zombiebuddy') {
    runBusy(() => bridge.installZombieBuddy());
    return;
  }
  if (action === 'modsFolder') {
    runBusy(() => bridge.openModsFolder(), { reload: false });
    return;
  }
  if (action === 'packs') {
    runBusy(async () => {
      const res = await bridge.syncPacks(true);
      if (res && !res.ok && res.reason) appendLog('! ' + res.reason);
      else if (res && res.ok && !res.installed.length) appendLog('✓ ' + (res.reason || 'Minden csomag naprakész.'));
      return res;
    });
  }
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

function sampleEvent() {
  return {
    ok: true,
    event: {
      id: 'demo-event',
      tag: 'KÖVETKEZŐ ESEMÉNY',
      title: 'Műhely-éjszaka a The Forgotten szerveren',
      text:
        'Közös túlélés: a csapat 20:00-tól gyülekezik a szerveren. Aki hozott magával üzemanyagot és szerszámot, kap egy extra ellátmánydobozt a raktárból.',
      url: '',
      time: Date.now() + 1000 * 60 * 60 * 49,
    },
  };
}

function renderBrowserPreview() {
  document.body.classList.add('browser-mode');
  serverStatus = { online: true, players: 7, maxPlayers: 32, ping: 42 };
  render(sampleStatus());
  renderServerStatus();
  const updateText = $('#updateText');
  if (updateText) updateText.textContent = 'Böngészős előnézet – a frissítéskezelés az asztali változatban él.';
  const updateSha = $('#updateSha');
  if (updateSha) updateSha.textContent = '—';
  renderEvent(sampleEvent());
  startEventLoop();
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
  startEventLoop();
  loadEvent(false);

  if (statusTimer) clearInterval(statusTimer);
  statusTimer = setInterval(() => {
    if (!busy) {
      refreshServerStatus();
    }
  }, 45000);
}

// Ha van saját fotóháttér (assets/bg.png), a paneleket sötétebbre vesszük,
// hogy fotó fölött is olvasható maradjon a szöveg.
(function detectPhotoBackground() {
  const probe = new Image();
  probe.onload = () => document.body.classList.add('bg-photo');
  probe.onerror = () => document.body.classList.remove('bg-photo');
  probe.src = 'assets/bg.png';
})();

init();
