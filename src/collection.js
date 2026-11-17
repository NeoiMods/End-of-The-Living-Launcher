const { fetchText } = require('./download');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

function decodeEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// Egy tétel csak egyszer számít. A Steam HTML néha ugyanazt az id-t is kiadja
// (lista + rejtett sablon), ilyenkor a kollekció darabszáma és a letöltött modok
// száma eltért – ez volt a „753, aztán 752” ugrálás.
function dedupeItems(items) {
  const seen = new Set();
  const out = [];
  let duplicates = 0;
  for (const it of items || []) {
    const id = String((it && it.id) || '');
    if (!id) continue;
    if (seen.has(id)) {
      duplicates++;
      continue;
    }
    seen.add(id);
    out.push({ ...it, id });
  }
  return { items: out, duplicates };
}

// Parses the collection page HTML into { id, appId, title, childCount, items: [{id, title}] }.
// Every child item is rendered as <div id="sharedfile_<id>" class="collectionItem">.
function parseCollectionHtml(html, collectionId) {
  const titleMatch = html.match(/<title>\s*Steam Workshop::\s*([^<]+?)\s*<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1].trim()) : 'Steam Workshop kollekció';

  const appIdMatch = html.match(/SubscribeCollection\(\s*'(\d+)'\s*,\s*'(\d+)'\s*\)/);
  const appId = appIdMatch ? appIdMatch[2] : '108600';

  const childMatch = html.match(/class="childCount">\((\d+)\)</);
  const childCount = childMatch ? Number(childMatch[1]) : null;

  // A tétel div-je: <div data-panel="..." id="sharedfile_123" class="collectionItem">
  const starts = [...html.matchAll(/<div[^>]*id="sharedfile_(\d+)"[^>]*class="[^"]*collectionItem[^"]*"/g)];
  const items = [];
  for (let i = 0; i < starts.length; i++) {
    const id = starts[i][1];
    const from = starts[i].index + starts[i][0].length;
    const to = i + 1 < starts.length ? starts[i + 1].index : html.length;
    const block = html.slice(from, to);
    const tm = block.match(/workshopItemTitle[^>]*>([^<]*)</);
    items.push({ id, title: tm ? decodeEntities(tm[1].trim()) : id });
  }

  const unique = dedupeItems(items);
  return { id: String(collectionId), appId, title, childCount, items: unique.items, duplicates: unique.duplicates };
}

// ---------------------------------------------------------------- API tartalék
// A Steam a kollekció HTML oldalát gyakran rate-limiteli (HTTP 429). Ilyenkor a
// publikus Web API-ból olvassuk ki ugyanazt: előbb a gyereklistát, utána a
// címeket. Így a checklist akkor is feltöltődik, ha a HTML nem elérhető.

function postForm(url, body, timeoutMs = 20000) {
  const https = require('https');
  return new Promise((resolve, reject) => {
    const data = Buffer.from(body, 'utf8');
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': data.length,
          'User-Agent': UA,
        },
      },
      (res) => {
        let text = '';
        res.setEncoding('utf8');
        res.on('data', (c) => {
          text += c;
        });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Steam API HTTP ${res.statusCode}`));
            return;
          }
          try {
            resolve(JSON.parse(text));
          } catch {
            reject(new Error('A Steam API válasza nem JSON.'));
          }
        });
      }
    );
    req.setTimeout(timeoutMs, () => req.destroy(new Error('időtúllépés')));
    req.on('error', reject);
    req.end(data);
  });
}

async function fetchTitles(ids) {
  const titles = {};
  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const body = [
      'itemcount=' + chunk.length,
      ...chunk.map((id, n) => `publishedfileids[${n}]=${encodeURIComponent(id)}`),
    ].join('&');
    try {
      const out = await postForm('https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/', body);
      for (const d of (out.response && out.response.publishedfiledetails) || []) {
        if (d && d.publishedfileid) titles[String(d.publishedfileid)] = String(d.title || '').trim();
      }
    } catch {
      // Cím nélkül is jó: az ID-t mutatjuk helyette.
    }
  }
  return titles;
}

// Csak a Steam által tényleg kiszolgált elemek maradnak a listában. A törölt,
// elrejtett vagy priváttá tett workshop elemek (API: result 9) soha nem
// tölthetők le, ezért a launcher ne számolja őket hiányzónak („689/691”).
// Hálózati hiba esetén megtartjuk az elemet (fail-open): egy Steam-kiesés ne
// tüntessen el modokat a listából.
async function filterAvailable(items, { log = () => {} } = {}) {
  if (!items.length) return items;
  const alive = new Set();
  for (let i = 0; i < items.length; i += 100) {
    const chunk = items.slice(i, i + 100);
    const body = [
      'itemcount=' + chunk.length,
      ...chunk.map((it, n) => `publishedfileids[${n}]=${encodeURIComponent(it.id)}`),
    ].join('&');
    try {
      const out = await postForm('https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/', body);
      const details = (out.response && out.response.publishedfiledetails) || [];
      for (const d of details) {
        const id = String((d && d.publishedfileid) || '');
        if (id && Number(d.result) === 1) alive.add(id);
      }
    } catch {
      for (const it of chunk) alive.add(String(it.id));
    }
  }
  const removed = items.filter((it) => !alive.has(String(it.id)));
  if (removed.length) {
    const list = removed.slice(0, 5).map((r) => (r.title && r.title !== r.id ? `${r.title} (${r.id})` : r.id));
    log(
      `– ${removed.length} kollekció-elem már nem érhető el a Steam Workshopon (törölt/elrejtett), kivettem a listából: ` +
        list.join(', ') +
        (removed.length > 5 ? '…' : '')
    );
  }
  return items.filter((it) => alive.has(String(it.id)));
}

// A kollekció-objektumra alkalmazott szűrés (a törölt elemek kiesnek).
async function onlyAvailable(collection, { log } = {}) {
  if (!collection || !Array.isArray(collection.items)) return collection;
  const items = await filterAvailable(collection.items, { log });
  return { ...collection, items, childCount: items.length };
}

async function fetchCollectionViaApi(collectionId) {
  const body = `collectioncount=1&publishedfileids[0]=${encodeURIComponent(collectionId)}`;
  const out = await postForm('https://api.steampowered.com/ISteamRemoteStorage/GetCollectionDetails/v1/', body);
  const detail = ((out.response && out.response.collectiondetails) || [])[0];
  if (!detail || Number(detail.result) !== 1) {
    throw new Error('A Steam API nem adta vissza a kollekciót (privát vagy törölt lehet).');
  }
  const ids = (detail.children || []).map((c) => String(c.publishedfileid || '')).filter(Boolean);
  if (!ids.length) throw new Error('A kollekció üresnek tűnik a Steam API szerint.');
  const titles = await fetchTitles(ids);
  const unique = dedupeItems(ids.map((id) => ({ id, title: titles[id] || id })));
  return {
    id: String(collectionId),
    appId: '108600',
    title: 'Steam Workshop kollekció',
    childCount: unique.items.length,
    items: unique.items,
    duplicates: unique.duplicates,
    viaApi: true,
  };
}

// Fetches and parses a Steam Workshop collection. Retries on failure/empty result.
async function fetchCollection(collectionId, { retries = 2, log = () => {} } = {}) {
  const url = `https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(collectionId)}`;
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const { status, body } = await fetchText(url, {
        headers: { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' },
        timeoutMs: 30000,
      });
      if (status === 429 || status === 503) {
        // Steam rate limit: előbb az API-ból próbáljuk, csak utána várunk.
        try {
          return await onlyAvailable(await fetchCollectionViaApi(collectionId), { log });
        } catch {
          await sleep(8000 * (attempt + 1));
        }
        throw new Error(`A Steam átmenetileg korlátoz (HTTP ${status}) – próbáld újra pár perc múlva.`);
      }
      if (status !== 200) throw new Error(`A kollekció lekérése nem sikerült (HTTP ${status}).`);
      const parsed = parseCollectionHtml(body, collectionId);
      if (parsed.items.length === 0) {
        throw new Error(
          'A kollekció üresnek tűnik vagy a Steam nem adta vissza a modok listáját (lehet, hogy privát vagy törölt).'
        );
      }
      return await onlyAvailable(parsed, { log });
    } catch (err) {
      lastError = err;
      if (attempt < retries) await sleep(1500 * (attempt + 1));
    }
  }
  throw lastError || new Error('A kollekció lekérése ismeretlen hibával végződött.');
}

module.exports = {
  filterAvailable, fetchCollection, parseCollectionHtml, fetchCollectionViaApi };
