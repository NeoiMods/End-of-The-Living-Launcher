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
      warn: false,
      label: 'Project Zomboid',
      detail: st.gameFound
        ? st.gamePath
        : 'Nem található – kattints a Játék keresése gombra',
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
      // PZO motor: opcionális, 16 GB alatt viszont kötelező (a launcher telepíti).
      ok: pzoStatus ? (pzoStatus.installed ? true : null) : null,
      warn: !!(pzoStatus && !pzoStatus.installed && mem.totalGb && mem.totalGb < PZO_MIN_RAM_GB),
      label: 'PZO Launcher',
      detail: !pzoStatus
        ? 'Állapot ellenőrzése…'
        : pzoStatus.installed
          ? 'Telepítve – PZOptimEngine.jar a játék mappában'
          : mem.totalGb && mem.totalGb < PZO_MIN_RAM_GB
            ? `${mem.totalGb} GB RAM – 16 GB alatt kötelező, az Optimalizálás fülön telepíthető`
            : 'Opcionális – az Optimalizálás fülön telepíthető',
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
    const state = it.warn ? 'warn' : it.ok === null ? 'pending' : it.ok ? 'ok' : 'bad';
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
  syncOptCards();
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
  // A frissítés-ablak saját töltőcsíkja is kövesse a folyamatot.
  const updWrap = $('#updProgressWrap');
  if (updWrap && !updWrap.classList.contains('hidden')) {
    const pct =
      payload && Number.isFinite(payload.done) && Number.isFinite(payload.total) && payload.total > 0
        ? Math.min(100, (payload.done / payload.total) * 100)
        : null;
    const updBar = $('#updBar');
    const updLabel = $('#updLabel');
    if (updBar && payload && payload.label) {
      if (pct != null) {
        updBar.classList.remove('is-indet');
        updBar.style.width = `${pct.toFixed(0)}%`;
      } else {
        // A GitHub nem mindig küld fájlméretet – ilyenkor mozgó csík + MB.
        updBar.classList.add('is-indet');
      }
    }
    if (updLabel && payload && payload.label) {
      const mb = payload.done && pct == null ? ` – ${(payload.done / 1048576).toFixed(1).replace('.', ',')} MB` : '';
      updLabel.textContent = payload.label + (pct != null ? ` – ${pct.toFixed(0)}%` : mb + '…');
    }
  }

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

  $('#btnModList').addEventListener('click', openModList);
  $('#btnModListClose').addEventListener('click', closeModList);
  $('#btnModListRefresh').addEventListener('click', loadModList);
  $('#btnModListClean').addEventListener('click', cleanMissingMods);
  $('#modListSearch').addEventListener('input', renderModList);
  $('#modListFilter').addEventListener('change', renderModList);

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

  // ---- újdonságok + frissítés ----
  $('#btnNewsReload').addEventListener('click', () => loadNews(true));
  $('#btnNewsOk').addEventListener('click', () => {
    $('#newsOverlay').classList.add('hidden');
    markNewsSeen();
  });
  $('#btnUpdateNow').addEventListener('click', applyUpdateNow);
  $('#btnUpdateLater').addEventListener('click', () => {
    $('#updateOverlay').classList.add('hidden');
    appendLog('• Frissítés későbbre hagyva – a Frissítés gombbal bármikor indítható.');
  });
  $('#btnCheckUpdate').addEventListener('click', checkUpdateFromUi);

  // ---- kritikus játék-mappa figyelmeztetés + játék keresése ----
  $('#btnGameFindMini').addEventListener('click', openGameFinder);
  $('#btnGameFindClose').addEventListener('click', () => $('#gameFindOverlay').classList.add('hidden'));
  $('#gameFindOverlay').addEventListener('click', (e) => {
    if (e.target === $('#gameFindOverlay')) $('#gameFindOverlay').classList.add('hidden');
  });
  $('#btnGameRescan').addEventListener('click', findGame);
  $('#btnGameBrowse').addEventListener('click', async () => {
    if (browserMode) return;
    try {
      const dir = await bridge.pickDirectory();
      if (dir) await applyGamePath(dir);
    } catch (err) {
      appendLog('✗ ' + (err && err.message ? err.message : err));
    }
  });

  $('#btnEventOpen').addEventListener('click', () => {
    if (currentEvent && currentEvent.url) bridge.openExternal(currentEvent.url);
  });

  // ---- optimalizálás ----
  $('#btnOptimize').addEventListener('click', openOptimize);
  $('#btnOptClose').addEventListener('click', closeOptimize);
  $('#optOverlay').addEventListener('click', (e) => {
    if (e.target === $('#optOverlay')) closeOptimize();
  });
  document.querySelectorAll('.opt-card[data-opt]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.opt-del')) return; // törlés külön gombon
      if (card.classList.contains('blocked') || card.getAttribute('aria-disabled') === 'true') return;
      runOptAction(card.dataset.opt);
    });
    if (card.tagName !== 'BUTTON') {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    }
  });
  document.querySelectorAll('.opt-del').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeOptMod(btn.dataset.del);
    });
  });
  // ---- Discord: crash log + widget ----
  // A banner mindig a legfrissebb elérhető logot kínálja fel (kézi küldés).
  $('#btnCrashBannerSend').addEventListener('click', openCrashManual);
  $('#btnCrashBannerHide').addEventListener('click', hideCrashBanner);
  $('#btnCrashManual').addEventListener('click', openCrashManual);
  // Ez a gomb csak akkor látszik, ha a küldés többször sem ment át:
  // ilyenkor a játékos nem ragad bent a launcherben. A logot nem jelöljük
  // elküldöttnek, így a következő indításnál újra felajánljuk.
  $('#btnCrashSkip').addEventListener('click', () => {
    closeCrash(true);
    showCrashSkip(false);
    hideCrashBanner();
    appendLog('• Crash log kihagyva – a következő indításnál újra felajánljuk.');
  });
  $('#btnCrashSend').addEventListener('click', () => sendCrashLog(false));
  $('#crashOverlay').addEventListener('click', (e) => {
    if (e.target === $('#crashOverlay')) closeCrash();
  });
  $('#btnDiscordJoin').addEventListener('click', () => {
    bridge.openExternal(discordInvite || DISCORD_INVITE);
  });
  $('#btnDiscordReload').addEventListener('click', () => loadDiscordWidget(true));

  $('#btnZbCancel').addEventListener('click', closeZbWarn);
  $('#btnZbGo').addEventListener('click', () => {
    closeZbWarn();
    runBusy(() => bridge.installZombieBuddy());
  });
  $('#zbWarn').addEventListener('click', (e) => {
    if (e.target === $('#zbWarn')) closeZbWarn();
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
      closeZbWarn();
      closeCrash();
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
  $('#newsView').classList.toggle('hidden', name !== 'news');
  $('#discordView').classList.toggle('hidden', name !== 'discord');
  $('#btnClear').classList.toggle('hidden', name !== 'log');
  if (name === 'event') markEventSeen();
  if (name === 'news') markNewsSeen();
  if (name === 'discord') loadDiscordWidget(false);
}

// ---------------------------------------------------------------- Discord

const DISCORD_INVITE = 'https://discord.gg/fxzxE7yH';
let discordInvite = '';
let discordLoadedAt = 0;

const DISCORD_STATUS_LABEL = { online: 'elérhető', idle: 'tétlen', dnd: 'elfoglalt' };

// A szerver Discord widgetje: élő taglista (a widget.json-ból, ezért nem kell
// iframe és nem takar ki semmit).
async function loadDiscordWidget(force) {
  const box = $('#dcMembers');
  if (!box) return;
  // 2 percenként elég frissíteni, kattintásra azonnal.
  if (!force && discordLoadedAt && Date.now() - discordLoadedAt < 120000) return;

  if (browserMode) {
    renderDiscord({
      name: 'End of the Living',
      online: [{ name: 'Példa Játékos', status: 'online', avatar: '', game: '' }],
      onlineCount: 1,
      invite: DISCORD_INVITE,
    });
    return;
  }

  box.innerHTML = '<span class="dc-empty">Widget betöltése…</span>';
  try {
    const res = await bridge.getDiscordWidget();
    if (!res || !res.ok) throw new Error((res && res.error) || 'nem elérhető');
    discordLoadedAt = Date.now();
    renderDiscord(res);
  } catch (err) {
    discordLoadedAt = Date.now();
    box.innerHTML = '<span class="dc-empty">A Discord widget most nem érhető el.</span>';
    appendLog('! Discord widget: ' + (err && err.message ? err.message : err));
  }
}

function renderDiscord(data) {
  const nameEl = $('#dcName');
  const countEl = $('#dcCount');
  const box = $('#dcMembers');
  if (!nameEl || !box) return;

  discordInvite = data.invite || DISCORD_INVITE;
  nameEl.textContent = data.name || 'Discord';
  countEl.textContent = `${data.onlineCount || 0} online`;
  $('#discordDot').classList.toggle('is-on', (data.onlineCount || 0) > 0);

  const members = Array.isArray(data.online) ? data.online : [];
  if (!members.length) {
    box.innerHTML = '<span class="dc-empty">Most nincs bent senki – gyere te elsőnek.</span>';
    return;
  }

  box.innerHTML = '';
  for (const member of members.slice(0, 24)) {
    const row = document.createElement('span');
    row.className = 'dc-member ' + (member.status || 'online');
    if (member.avatar) {
      const img = document.createElement('img');
      img.src = member.avatar;
      img.alt = '';
      img.loading = 'lazy';
      row.appendChild(img);
    } else {
      const dot = document.createElement('i');
      row.appendChild(dot);
    }
    const label = document.createElement('span');
    label.className = 'dc-member-name';
    label.textContent = member.name || '? ';
    row.appendChild(label);
    row.title = `${member.name || ''} – ${DISCORD_STATUS_LABEL[member.status] || member.status || ''}${
      member.game ? ' · ' + member.game : ''
    }`;
    box.appendChild(row);
  }
}

// ---------------------------------------------------------------- crash log

let pendingCrash = null;
// Összeomlás után a log beküldése kötelező: az ablakot nem lehet kihagyni.
// A DISCORD fülről indított kézi küldésnél nem kötelező.
let crashRequired = false;

function formatMb(bytes) {
  return (Number(bytes || 0) / 1048576).toFixed(1) + ' MB';
}

function setCrashError(text) {
  const el = $('#crashError');
  if (!el) return;
  el.textContent = text || '';
  el.classList.toggle('hidden', !text);
}

function showCrashSkip(show) {
  const btn = $('#btnCrashSkip');
  if (btn) btn.classList.toggle('hidden', show !== true);
}

// A mindig látható felhívás a fő panelen: a zárható ablak mellett is ott marad,
// hogy a játékos bármikor pótolhassa a küldést.
function showCrashBanner(info) {
  const banner = $('#crashBanner');
  if (!banner) return;
  if (info && info.detected) pendingCrash = info;
  const text = $('#crashBannerText');
  if (text) {
    const name = info && info.primary && info.primary.name;
    text.textContent = name
      ? `${name} – a log elküldése kötelező, hogy ki tudjuk javítani az összeomlást.`
      : 'A log elküldése kötelező – csak így tudjuk kijavítani a hibát.';
  }
  banner.classList.remove('hidden');
}

function hideCrashBanner() {
  $('#crashBanner').classList.add('hidden');
}

// DISCORD fül / banner: kézi küldés a legfrissebb elérhető logokkal.
async function openCrashManual() {
  let info = null;
  try {
    info = await bridge.getLatestCrash();
  } catch (err) {
    appendLog('✗ ' + (err && err.message ? err.message : err));
    return;
  }
  if (!info || !info.detected) {
    appendLog('• Nem találtam elküldhető logot (hs_err / console.txt / Logs).');
    return;
  }
  openCrash({ ...info, manual: true });
}

function openCrash(info) {
  if (!info || !info.detected) return;
  pendingCrash = info;
  const list = $('#crashFiles');
  list.innerHTML = '';
  for (const file of info.files || []) {
    const li = document.createElement('li');
    li.innerHTML = `<b>${file.name}</b> – ${formatMb(file.size)}`;
    list.appendChild(li);
  }
  const title = $('#crashTitle');
  if (title) {
    title.textContent = info.manual
      ? 'Log küldése a szervernek'
      : 'Összeomlott a játék – küldd el a logot';
  }
  crashRequired = !info.manual;
  showCrashSkip(false);
  setCrashError('');
  showCrashBanner(info);
  let saved = '';
  try {
    saved = localStorage.getItem('eotl.discordName') || '';
  } catch {
    saved = '';
  }
  $('#crashName').value = saved;
  $('#crashOverlay').classList.remove('hidden');
  $('#crashName').focus();
}

// force nélkül nem záródik be, ha a beküldés kötelező (összeomlás után).
function closeCrash(force) {
  if (crashRequired && force !== true) {
    setCrashError('A log elküldése kötelező – enélkül nem tudjuk kijavítani az összeomlást.');
    $('#crashName').focus();
    return false;
  }
  $('#crashOverlay').classList.add('hidden');
  crashRequired = false;
  return true;
}

async function sendCrashLog(manual) {
  const name = $('#crashName').value.trim();
  if (name.length < 2) {
    $('#crashName').classList.add('invalid');
    setCrashError('Írd be a Discord nevedet – enélkül nem tudjuk, kitől jött a log.');
    $('#crashName').focus();
    return;
  }
  $('#crashName').classList.remove('invalid');
  try {
    localStorage.setItem('eotl.discordName', name);
  } catch {
    /* nem baj */
  }

  const btn = $('#btnCrashSend');
  btn.disabled = true;
  btn.textContent = 'Küldés…';
  try {
    const res = await bridge.sendCrash(name, manual === true || (pendingCrash && pendingCrash.manual === true));
    if (res && res.ok) {
      appendLog('✓ Crash log elküldve a szervernek (' + (res.sent || []).join(', ') + '). Köszönjük!');
      closeCrash(true);
      hideCrashBanner();
      setCrashError('');
      pendingCrash = null;
    } else {
      const msg = (res && res.error) || 'a küldés nem sikerült';
      appendLog('✗ ' + msg);
      setCrashError('A küldés nem sikerült: ' + msg + ' – próbáld újra.');
      showCrashSkip(true);
      btn.textContent = 'Újrapróbálom';
    }
  } catch (err) {
    const msg = err && err.message ? err.message : String(err);
    appendLog('✗ ' + msg);
    setCrashError('A küldés nem sikerült: ' + msg + ' – próbáld újra.');
    showCrashSkip(true);
    btn.textContent = 'Újrapróbálom';
  } finally {
    btn.disabled = false;
    if (btn.textContent === 'Küldés…') btn.textContent = 'LOG ELKÜLDÉSE';
  }
}

// ---------------------------------------------------------------- újdonságok

const SEEN_NEWS_KEY = 'eotl.seenNews';
let newsData = null;

function seenNewsId() {
  try {
    return localStorage.getItem(SEEN_NEWS_KEY) || '';
  } catch {
    return '';
  }
}

function markNewsSeen() {
  const items = (newsData && newsData.items) || [];
  if (items.length) {
    try {
      localStorage.setItem(SEEN_NEWS_KEY, items[0].id);
    } catch {
      /* privát mód: nem baj */
    }
  }
  const dot = $('#newsDot');
  if (dot) dot.classList.remove('is-on');
}

function newsCard(item) {
  const card = document.createElement('div');
  card.className = 'news-item';

  const top = document.createElement('div');
  top.className = 'ni-top';
  const tag = document.createElement('span');
  tag.className = 'ni-tag';
  tag.textContent = item.tag || 'ÚJDONSÁG';
  top.appendChild(tag);
  if (item.version) {
    const ver = document.createElement('span');
    ver.className = 'ni-ver';
    ver.textContent = 'v' + item.version;
    top.appendChild(ver);
  }
  if (item.date) {
    const date = document.createElement('span');
    date.className = 'ni-date';
    date.textContent = item.date;
    top.appendChild(date);
  }
  card.appendChild(top);

  const title = document.createElement('h3');
  title.className = 'ni-title';
  title.textContent = item.title;
  card.appendChild(title);

  if (item.text) {
    const text = document.createElement('p');
    text.className = 'ni-text';
    text.textContent = item.text;
    card.appendChild(text);
  }

  if (item.changes && item.changes.length) {
    const list = document.createElement('ul');
    list.className = 'ni-changes';
    for (const change of item.changes) {
      const li = document.createElement('li');
      li.textContent = change;
      list.appendChild(li);
    }
    card.appendChild(list);
  }
  return card;
}

function renderNews(res) {
  newsData = res && res.items ? res : { items: [] };
  const list = $('#newsList');
  if (!list) return;
  list.innerHTML = '';

  const ver = $('#newsVer');
  if (ver) ver.textContent = res && res.version ? 'v' + res.version : '';

  const items = newsData.items || [];
  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'news-empty';
    empty.textContent =
      (res && res.error ? 'Az újdonságok most nem érhetők el (' + res.error + '). ' : '') +
      'Amint feltöltünk valamit a GitHubra (news.json), itt megjelenik.';
    list.appendChild(empty);
  } else {
    for (const item of items) list.appendChild(newsCard(item));
  }

  const unseen = items.length && items[0].id !== seenNewsId();
  const dot = $('#newsDot');
  if (dot) dot.classList.toggle('is-on', !!unseen);
}

async function loadNews(force) {
  if (browserMode) {
    renderNews({
      ok: true,
      version: '0.7',
      items: [
        {
          id: '0.7',
          version: '0.7',
          date: '2026-11-06',
          tag: 'MEGA FRISSÍTÉS',
          title: '0.7 – ez a legelső kiadás',
          text: 'Új frissítés-ablak, újdonságok fül és töltőcsík.',
          changes: ['Új verzió ablak OK gombbal', 'Újdonságok fül', 'Töltőcsík a csomagokhoz'],
        },
      ],
    });
    return;
  }
  try {
    renderNews(await bridge.getNews(!!force));
  } catch (err) {
    renderNews({ ok: false, items: [], error: err && err.message ? err.message : String(err) });
  }
}

// Ha új újdonság van (és nem frissül most a launcher), induláskor felugrik.
function maybeShowNewsPopup() {
  const items = (newsData && newsData.items) || [];
  if (!items.length) return;
  if (items[0].id === seenNewsId()) return;
  const upd = $('#updateOverlay');
  if (upd && !upd.classList.contains('hidden')) return; // a frissítés-ablak az első

  const newest = items[0];
  $('#newsOverlayLead').textContent = newest.version
    ? `Launcher v${newest.version} – ezek változtak:`
    : 'Ezek történtek mostanában:';
  const list = $('#newsOverlayList');
  list.innerHTML = '';
  list.appendChild(newsCard(newest));
  $('#newsOverlay').classList.remove('hidden');
}

// ---------------------------------------------------------------- frissítés

let pendingUpdate = null;

function renderUpdateModal(payload) {
  if (!payload) return;
  pendingUpdate = payload;
  $('#updFrom').textContent = 'v' + (payload.fromVersion || '?');
  $('#updTo').textContent = 'v' + (payload.toVersion || '?');

  const box = $('#updChanges');
  box.innerHTML = '';
  const changes = payload.changeItems || [];
  if (changes.length) {
    for (const item of changes) {
      const block = document.createElement('div');
      block.className = 'upd-change';
      const head = document.createElement('strong');
      head.textContent = item.title || 'Újdonságok';
      block.appendChild(head);
      if (item.changes && item.changes.length) {
        const ul = document.createElement('ul');
        for (const change of item.changes) {
          const li = document.createElement('li');
          li.textContent = change;
          ul.appendChild(li);
        }
        block.appendChild(ul);
      } else if (item.text) {
        const p = document.createElement('p');
        p.textContent = item.text;
        block.appendChild(p);
      }
      box.appendChild(block);
    }
  } else if (payload.remoteMessage) {
    const p = document.createElement('p');
    p.className = 'upd-note';
    p.textContent = payload.remoteMessage;
    box.appendChild(p);
  }

  $('#updProgressWrap').classList.add('hidden');
  $('#updBar').style.width = '0%';
  const btn = $('#btnUpdateNow');
  btn.disabled = false;
  btn.textContent = 'OK – FRISSÍTS';
  $('#btnUpdateLater').disabled = false;
  $('#updateOverlay').classList.remove('hidden');
}

async function applyUpdateNow() {
  const btn = $('#btnUpdateNow');
  btn.disabled = true;
  btn.textContent = 'Frissítés…';
  $('#btnUpdateLater').disabled = true;
  $('#updProgressWrap').classList.remove('hidden');
  $('#updLabel').textContent = 'Előkészítés…';
  try {
    const res = await bridge.applyUpdate();
    if (res && res.ok) {
      $('#updBar').classList.remove('is-indet');
      $('#updBar').style.width = '100%';
      $('#updLabel').textContent =
        res.restartRequired === false ? 'Kész – nincs cserélendő fájl.' : 'Kész – a launcher újraindul…';
      pendingUpdate = null;
    } else {
      const msg = (res && (res.error || res.reason)) || 'a frissítés nem sikerült';
      appendLog('✗ Frissítés: ' + msg);
      $('#updLabel').textContent = '✗ ' + msg;
      btn.disabled = false;
      btn.textContent = 'Újrapróbálom';
      $('#btnUpdateLater').disabled = false;
    }
  } catch (err) {
    const msg = err && err.message ? err.message : String(err);
    appendLog('✗ Frissítés: ' + msg);
    $('#updLabel').textContent = '✗ ' + msg;
    btn.disabled = false;
    btn.textContent = 'Újrapróbálom';
    $('#btnUpdateLater').disabled = false;
  }
}

async function checkUpdateFromUi() {
  appendLog('• Frissítés ellenőrzése a GitHubon…');
  try {
    const res = await bridge.checkUpdate();
    if (res && res.update) renderUpdateModal(res);
    else if (res && res.ok) appendLog('✓ ' + (res.reason || 'naprakész'));
    else appendLog('! ' + ((res && res.reason) || 'a frissítés ellenőrzése nem sikerült'));
  } catch (err) {
    appendLog('✗ ' + (err && err.message ? err.message : err));
  }
}

async function renderVersionChip() {
  const chip = $('#versionChip');
  if (!chip) return;
  if (browserMode) {
    chip.textContent = 'v0.7';
    return;
  }
  try {
    const info = await bridge.getVersion();
    chip.textContent = 'v' + ((info && info.version) || '?');
    chip.title = 'Launcher verzió' + (info && info.sha ? ' – ' + String(info.sha).slice(0, 7) : '');
  } catch {
    chip.textContent = 'v?';
  }
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

// ZombieBuddy: ennyi RAM alatt nem ajánljuk fel a letöltést.
const ZB_MIN_RAM_GB = 8;
// PZO motor: ennyi alatt a launcher magától telepíti (fix telepítés).
const PZO_MIN_RAM_GB = 16;

// 6282 3D modellek: ennyi RAM alatt nem ajánljuk fel (mint a ZombieBuddy).
const MODEL_MIN_RAM_GB = 8;

let pzoStatus = null;
let modsStatus = null;
let huStatus = null;

function totalRamGb() {
  const mem = lastStatus && lastStatus.memory;
  return mem && mem.totalGb ? Number(mem.totalGb) : 0;
}

function openOptimize() {
  $('#optOverlay').classList.remove('hidden');
  syncOptCards();
  refreshPzoState();
  refreshModsState();
}

function closeOptimize() {
  $('#optOverlay').classList.add('hidden');
}

// ---- mod lista ---------------------------------------------------------
// A játék default.txt-je és a gépen megtalált modok összevetése.

let modListData = null;
let modListBusy = false;

async function openModList() {
  $('#modListOverlay').classList.remove('hidden');
  const search = $('#modListSearch');
  if (search) search.focus();
  await loadModList();
}

function closeModList() {
  $('#modListOverlay').classList.add('hidden');
}

async function loadModList() {
  if (modListBusy) return;
  modListBusy = true;
  const body = $('#modListBody');
  if (body) body.textContent = 'Betöltés…';
  try {
    modListData = await window.api.getModList();
  } catch (err) {
    modListData = {
      ok: false,
      error: err && err.message ? err.message : String(err),
      mods: [],
      missing: [],
      counts: {},
    };
  } finally {
    modListBusy = false;
  }
  renderModList();
}

async function cleanMissingMods() {
  const data = modListData || {};
  const count = (data.missing || []).length;
  if (!count) {
    window.alert('Nincs hiányzó sor – a mod lista rendben van.');
    return;
  }

  const ok = window.confirm(
    `${count} bekapcsolt sor mutat olyan modra, ami nincs a gépen (régi kollekció maradéka).\n\n` +
      'Ezeket kiveszem a játék modlistájából. A többi modhoz nem nyúlok, és készül mentés (default.txt.bak-cleanup).\n\n' +
      'Folytatod?'
  );
  if (!ok) return;

  const res = await window.api.cleanMissingMods();
  if (!res || !res.ok) {
    window.alert('Nem sikerült: ' + ((res && res.error) || 'ismeretlen hiba'));
    return;
  }

  await loadModList();
}

function modListRow(entry) {
  const row = document.createElement('div');
  row.className = 'ml-row';
  if (entry.missing) row.classList.add('miss');
  else if (entry.enabled) row.classList.add('on');

  const name = document.createElement('span');
  name.className = 'ml-name';
  name.textContent = entry.name;
  if (entry.dir) name.title = entry.dir;

  const id = document.createElement('span');
  id.className = 'ml-id';
  id.textContent = entry.id;

  const tag = document.createElement('span');
  tag.className = 'ml-tag' + (entry.missing ? ' miss' : entry.source === 'local' ? ' local' : '');
  tag.textContent = entry.missing ? 'NINCS' : entry.source === 'local' ? 'HELYI' : 'WORKSHOP';
  if (entry.workshopId) tag.title = 'Workshop item: ' + entry.workshopId;

  const state = document.createElement('span');
  state.className = 'ml-state' + (entry.enabled ? ' on' : '');
  state.textContent = entry.enabled ? 'BE' : 'KI';

  row.append(name, id, tag, state);
  return row;
}

function renderModList() {
  const body = $('#modListBody');
  if (!body) return;
  body.textContent = '';

  const data = modListData || {};
  if (!data.ok) {
    const err = document.createElement('div');
    err.className = 'ml-empty';
    err.textContent = 'Nem sikerült kiolvasni a mod listát: ' + (data.error || 'ismeretlen hiba');
    body.append(err);
    $('#modListSummary').textContent = 'Hiba';
    return;
  }

  const c = data.counts || {};
  $('#modListSummary').textContent =
    `Bekapcsolva: ${c.enabled || 0} · Telepítve: ${c.installed || 0} ` +
    `(workshop ${c.workshop || 0}, helyi ${c.local || 0}) · ` +
    `Bekapcsolt és megvan: ${c.enabledInstalled || 0} · Hiányzó: ${c.enabledMissing || 0} · ` +
    `Kikapcsolt: ${c.disabled || 0}`;

  const q = ($('#modListSearch').value || '').trim().toLowerCase();
  const filter = $('#modListFilter').value;

  // Csak a gépen létező modok kerülnek a listára; a hiányzó sorokat a fenti
  // összegzés mutatja, és a "Hiányzók törlése" gomb intézi el.
  const shown = (data.mods || []).filter((e) => {
    if (filter === 'enabled' && !e.enabled) return false;
    if (filter === 'disabled' && e.enabled) return false;
    if (!q) return true;
    return String(e.name).toLowerCase().includes(q) || String(e.id).toLowerCase().includes(q);
  });

  shown.sort((a, b) => String(a.name).localeCompare(String(b.name), 'hu'));

  if (!shown.length) {
    const empty = document.createElement('div');
    empty.className = 'ml-empty';
    empty.textContent = 'Nincs a szűrésnek megfelelő mod.';
    body.append(empty);
    return;
  }

  const frag = document.createDocumentFragment();
  for (const e of shown) frag.append(modListRow(e));
  body.append(frag);
}

// A RAM-hoz igazítja a kártyák állapotát: 8 GB alatt a ZombieBuddy nem
// letölthető, a PZO pedig 16 GB alatt kötelező (a launcher magától telepíti).
function syncOptCards() {
  const ram = totalRamGb();

  const zb = $('#zbCard');
  const zbState = $('#zbState');
  const zbHint = $('#zbHint');
  if (zb && zbState) {
    const tooLow = ram > 0 && ram < ZB_MIN_RAM_GB;
    zb.disabled = tooLow;
    zb.classList.toggle('blocked', tooLow);
    zb.classList.toggle('ready', !tooLow);
    zbState.classList.toggle('warn', tooLow);
    zbState.classList.toggle('go', !tooLow);
    zbState.textContent = tooLow ? `${ZB_MIN_RAM_GB} GB KELL` : 'LETÖLTÉS';
    if (zbHint) {
      zbHint.textContent = tooLow
        ? `Opcionális – ${ram} GB RAM van, a modhoz ${ZB_MIN_RAM_GB} GB kell`
        : 'Opcionális segédmod – FPS/TPS nézetekhez';
    }
  }

  const pzoState = $('#pzoState');
  if (pzoState) {
    const done = !!(pzoStatus && (pzoStatus.installed || pzoStatus.launchedAt));
    pzoState.textContent = done ? 'TELEPÍTVE' : 'TELEPÍTÉS';
  }

  // ETO: a két változat közül csak az egyik lehet bent, ezért a másik kártya
  // ilyenkor "MÁSIK AKTÍV" jelzést kap (de attól még átváltható).
  const etoOn = !!(modsStatus && modsStatus.eto);
  const etoMaxOn = !!(modsStatus && modsStatus['eto-max']);
  [
    ['#etoState', '#etoHint', etoOn, etoMaxOn, 'Szebb textúrák, jobb FPS – az ETO másik változatát lecseréli'],
    ['#etoMaxState', '#etoMaxHint', etoMaxOn, etoOn, 'Maximum FPS egyszerűbb textúrákkal – a másik ETO-t lecseréli'],
  ].forEach(([stateSel, hintSel, own, other, hint]) => {
    const el = $(stateSel);
    if (!el) return;
    el.textContent = own ? 'TELEPÍTVE' : other ? 'ÁTVÁLTÁS' : 'LETÖLTÉS';
    el.classList.toggle('go', true);
    const hintEl = $(hintSel);
    if (hintEl) hintEl.textContent = own ? 'Telepítve – a textúrák már cserélve vannak' : hint;
  });
  setDelVisible('eto', etoOn);
  setDelVisible('eto-max', etoMaxOn);

  // Viewpoint NIGHTLY: a gyűjtemény régi Viewpointja (0.1.6.x) helyett ez a
  // build kerül a játék Workshop mappájába, egy kattintással.
  const nightly = modsStatus && modsStatus.nightly;
  const nightlyState = $('#nightlyState');
  if (nightlyState) {
    const done = !!(nightly && nightly.installed);
    nightlyState.textContent = done ? 'TELEPÍTVE' : 'TELEPÍTÉS';
    nightlyState.classList.toggle('go', true);
    const nightlyHint = $('#nightlyHint');
    if (nightlyHint) {
      nightlyHint.textContent = done
        ? `Telepítve${nightly.version ? ' – ' + nightly.version : ''} – a gyűjtemény Viewpointja helyett ez fut`
        : 'A gyűjtemény régi Viewpointja helyett – éjszakai build a Master mappából';
    }
    setDelVisible('nightly', done);
  }

  // 6282 3D modell: 8 GB alatt letiltva, és soha nem települ magától.
  const voxel = $('#voxelCard');
  const voxelState = $('#voxelState');
  if (voxel && voxelState) {
    const tooLow = ram > 0 && ram < MODEL_MIN_RAM_GB;
    const done = !!(modsStatus && modsStatus.voxel);
    voxel.setAttribute('aria-disabled', tooLow ? 'true' : 'false');
    voxel.classList.toggle('blocked', tooLow);
    voxel.classList.toggle('ready', !tooLow);
    voxelState.classList.toggle('warn', tooLow);
    voxelState.classList.toggle('go', !tooLow);
    voxelState.textContent = tooLow ? `${MODEL_MIN_RAM_GB} GB KELL` : done ? 'TELEPÍTVE' : 'LETÖLTÉS';
    const hintEl = $('#voxelHint');
    if (hintEl) {
      hintEl.textContent = tooLow
        ? `Opcionális – ${ram} GB RAM van, a modellekhez ${MODEL_MIN_RAM_GB} GB kell`
        : done
          ? 'Telepítve – a Viewpoint modellek már a mod mappában vannak'
          : 'Viewpoint 3D modellek a ZombieBuddyhoz – opcionális';
    }
    setDelVisible('voxel', done);
  }

  // Magyarítás: opcionális, a játékos dönti el – soha nem települ magától.
  const huState = $('#huState');
  if (huState) {
    const done = !!(huStatus && huStatus.installed);
    huState.classList.toggle('go', true);
    huState.textContent = done ? 'TELEPÍTVE' : 'LETÖLTÉS';
    const hintEl = $('#huHint');
    if (hintEl) {
      hintEl.textContent = done
        ? 'Telepítve – a magyar szövegek be vannak kapcsolva'
        : 'Projekt A-Life + Survivor PDA + gyári szövegek – opcionális';
    }
    setDelVisible('hu', done);
  }
}

// A TÖRLÉS gomb csak akkor látszik, ha a mod tényleg bent van.
function setDelVisible(id, visible) {
  const btn = document.querySelector(`.opt-del[data-del="${id}"]`);
  if (btn) btn.classList.toggle('hidden', !visible);
}

const OPT_LABELS = {
  eto: 'ETO – alap',
  'eto-max': 'ETO – Max Performance',
  nightly: 'Viewpoint NIGHTLY',
  voxel: '6282 3D modellcsomag',
  hu: 'Magyarítás (A-Life + Survivor PDA + gyári)',
};

// Telepített opcionális mod törlése a Zomboid\mods mappából.
function removeOptMod(id) {
  const label = OPT_LABELS[id] || id;
  const place = id === 'nightly' ? 'Zomboid\\Workshop\\Viewpoint' : 'Zomboid\\mods';
  const ok = window.confirm(
    `Törlöd: ${label}?\n\nA mod mappája kikerül a ${place} mappából (a többi modhoz nem nyúlunk).`
  );
  if (!ok) {
    syncOptCards();
    return;
  }
  runBusy(async () => {
    const res = id === 'hu' ? await bridge.removeHu() : await bridge.removeMod(id);
    if (res && res.ok && !res.removed) appendLog(`• ${label}: nincs telepítve.`);
    await refreshModsState();
    return res;
  }, { reload: false });
}

async function refreshModsState() {
  if (browserMode) return;
  try {
    modsStatus = await bridge.getModsStatus();
  } catch {
    modsStatus = null;
  }
  try {
    huStatus = await bridge.getHuStatus();
  } catch {
    huStatus = null;
  }
  syncOptCards();
}

async function refreshPzoState() {
  if (browserMode) return;
  try {
    pzoStatus = await bridge.getPzoStatus();
  } catch {
    pzoStatus = null;
  }
  syncOptCards();
  // Az ELLENŐRZÉS lista is mutatja a PZO állapotát.
  if (lastStatus) render(lastStatus);
}

function openZbWarn() {
  const ram = totalRamGb();
  const ramEl = $('#zbWarnRam');
  if (ramEl) ramEl.textContent = ram ? `${ram} GB` : 'ismeretlen';
  $('#zbWarn').classList.remove('hidden');
}

function closeZbWarn() {
  $('#zbWarn').classList.add('hidden');
}

function runOptAction(action) {
  closeOptimize();
  if (action === 'heap') {
    openSettings();
    return;
  }
  if (action === 'pzo') {
    runBusy(async () => {
      const res = await bridge.installPzo();
      if (res && res.ok) {
        appendLog('✓ PZO Launcher kicsomagolva – a telepítő konzolban fut tovább.');
        await refreshPzoState();
      }
      return res;
    }, { reload: false });
    return;
  }
  if (action === 'zombiebuddy') {
    const ram = totalRamGb();
    if (ram > 0 && ram < ZB_MIN_RAM_GB) {
      appendLog(`⚠ ZombieBuddy: legalább ${ZB_MIN_RAM_GB} GB RAM kell (nálad ${ram} GB).`);
      return;
    }
    openZbWarn();
    return;
  }
  if (action === 'hu') {
    runBusy(async () => {
      const res = await bridge.installHu();
      await refreshModsState();
      return res;
    }, { reload: false });
    return;
  }
  if (action === 'eto' || action === 'eto-max' || action === 'voxel' || action === 'nightly') {
    const ram = totalRamGb();
    if (action === 'voxel' && ram > 0 && ram < MODEL_MIN_RAM_GB) {
      appendLog(`⚠ 6282 3D modell: legalább ${MODEL_MIN_RAM_GB} GB RAM kell (nálad ${ram} GB).`);
      return;
    }
    runBusy(async () => {
      const res = await bridge.installMod(action);
      await refreshModsState();
      return res;
    }, { reload: false });
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
  pzoStatus = { installed: false, extracted: false };
  modsStatus = { eto: false, 'eto-max': false, voxel: false, nightly: { installed: false } };
  huStatus = { installed: false };
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

// ---------------------------------------------- játék mappa / kritikus hiba
//
// A modok, a PZO motor, a 3D modellek és gyakorlatilag minden telepítő arra
// készült, hogy a Project Zomboid a C: meghajtón, az alap Steam mappában legyen.
// Ha nem ott van, kritikus figyelmeztetést adunk, és felajánljuk a keresőt.

async function openGameFinder() {
  if (browserMode) return;
  $('#gameFindOverlay').classList.remove('hidden');
  await findGame();
}

async function findGame() {
  if (browserMode) return;
  const list = $('#gameFindList');
  list.innerHTML = '';
  const loading = document.createElement('div');
  loading.className = 'gf-empty';
  loading.textContent = 'Keresés a Steam könyvtárakban és a meghajtókon… (pár másodperc)';
  list.appendChild(loading);
  $('#gameFindNote').textContent = '';
  try {
    renderGameCandidates(await bridge.findGame());
  } catch (err) {
    list.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'gf-empty err';
    el.textContent = 'Hiba a keresés közben: ' + (err && err.message ? err.message : err);
    list.appendChild(el);
  }
}

function renderGameCandidates(res) {
  const list = $('#gameFindList');
  list.innerHTML = '';
  const candidates = (res && res.candidates) || [];
  const current = String((res && res.current) || '').toLowerCase();

  if (!candidates.length) {
    const el = document.createElement('div');
    el.className = 'gf-empty';
    el.textContent =
      'Nem találtam Project Zomboidot a szokásos helyeken. Tallózással válaszd ki a ProjectZomboid64.exe mappáját.';
    list.appendChild(el);
  }

  for (const c of candidates) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gf-item' + (c.path.toLowerCase() === current ? ' is-current' : '');

    const main = document.createElement('span');
    main.className = 'gf-path';
    main.textContent = c.path;

    const meta = document.createElement('span');
    meta.className = 'gf-src';
    meta.textContent = c.isDefault ? 'ALAP HELY – ide kellene' : c.source;

    btn.appendChild(main);
    btn.appendChild(meta);
    btn.addEventListener('click', () => applyGamePath(c.path));
    list.appendChild(btn);
  }

  const note = $('#gameFindNote');
  if (res && res.current) {
    note.textContent = res.warning
      ? `Most beállítva: ${res.current} – ez NEM az alap hely, ezért jön a kritikus figyelmeztetés.`
      : `Most beállítva: ${res.current} – ez az alap hely, minden rendben.`;
  } else if (candidates.length) {
    note.textContent = 'Válassz egy mappát: onnantól a modok és minden telepítő oda kerül.';
  }
}

async function applyGamePath(dir) {
  if (browserMode) return;
  try {
    const res = await bridge.setGamePath(dir || '');
    if (!res || !res.ok) {
      $('#gameFindNote').textContent = (res && res.error) || 'Nem sikerült beállítani ezt a mappát.';
      return;
    }
    $('#setGamePath').value = dir || '';
    $('#gameFindOverlay').classList.add('hidden');
    await refresh();
    refreshPzoState();
    appendLog(
      '• Az új mappába a MODOK TELEPÍTÉSE / FRISSÍTÉSE gombbal telepíthetsz mindent (és az Optimalizálás fülön a PZO motort).'
    );
  } catch (err) {
    $('#gameFindNote').textContent = 'Hiba: ' + (err && err.message ? err.message : err);
  }
}

async function init() {
  wireEvents();
  if (browserMode) {
    renderBrowserPreview();
    return;
  }
  bridge.onLog(appendLog);
  bridge.onProgress(showProgress);
  bridge.onRefresh(() => refresh());
  bridge.onCrash((info) => openCrash(info));
  bridge.onUpdateAvailable((payload) => renderUpdateModal(payload));
  appendLog('End of The Living Launcher elindítva.');
  renderVersionChip();
  await refresh();

  // Ha a legutóbbi játék összeomlott, felajánljuk a crash log elküldését.
  try {
    const crashInfo = await bridge.checkCrash();
    if (crashInfo && crashInfo.detected) openCrash(crashInfo);
  } catch {
    /* nem kritikus */
  }

  refreshPzoState();
  refreshServerStatus();
  startEventLoop();
  loadEvent(false);

  // Újdonságok: a fül tartalma + ha van új bejegyzés, induláskor felugrik.
  loadNews(false).then(() => setTimeout(maybeShowNewsPopup, 3500));

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
