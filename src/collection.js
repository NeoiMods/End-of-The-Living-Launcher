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

  return { id: String(collectionId), appId, title, childCount, items };
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
  return {
    id: String(collectionId),
    appId: '108600',
    title: 'Steam Workshop kollekció',
    childCount: ids.length,
    items: ids.map((id) => ({ id, title: titles[id] || id })),
    viaApi: true,
  };
}

// Fetches and parses a Steam Workshop collection. Retries on failure/empty result.
async function fetchCollection(collectionId, { retries = 2 } = {}) {
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
          return await fetchCollectionViaApi(collectionId);
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
      return parsed;
    } catch (err) {
      lastError = err;
      if (attempt < retries) await sleep(1500 * (attempt + 1));
    }
  }
  throw lastError || new Error('A kollekció lekérése ismeretlen hibával végződött.');
}

module.exports = { fetchCollection, parseCollectionHtml, fetchCollectionViaApi };
