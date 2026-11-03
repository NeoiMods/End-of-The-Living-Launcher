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

module.exports = { fetchCollection, parseCollectionHtml };
