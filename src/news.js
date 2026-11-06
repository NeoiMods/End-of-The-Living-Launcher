// Újdonságok (news) betöltése a GitHubról.
//
// A launcher egy news.json fájlt olvas a repóból:
//   https://raw.githubusercontent.com/<repo>/main/news.json
//
// Forma:
//   {
//     "version": "0.8",
//     "items": [
//       { "id": "0.8", "version": "0.8", "date": "2026-11-06",
//         "tag": "FRISSÍTÉS", "title": "…", "text": "…",
//         "changes": ["…", "…"] }
//     ]
//   }
//
// Egyszerű tömb is elfogadható. A legfrissebb elem az első.

const fs = require('fs');
const path = require('path');

const { fetchText } = require('./download');

const DEFAULT_REPO = 'NeoiMods/End-of-The-Living-Launcher';
const CACHE_MS = 60 * 1000;
const MAX_ITEMS = 30;

let cache = { at: 0, key: '', data: null };

function repoOf(cfg) {
  const raw = String((cfg && cfg.updateCheckUrl) || DEFAULT_REPO)
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
    .replace(/\.git$/i, '')
    .replace(/\/+$/, '');
  return raw || DEFAULT_REPO;
}

function urlOf(cfg) {
  return `https://raw.githubusercontent.com/${repoOf(cfg)}/main/news.json`;
}

function toListItem(item) {
  if (!item || typeof item !== 'object') return null;
  const title = String(item.title || '').trim();
  if (!title) return null;
  const changes = Array.isArray(item.changes)
    ? item.changes.map((c) => String(c || '').trim()).filter(Boolean).slice(0, 20)
    : [];
  return {
    id: String(item.id || item.version || title),
    version: String(item.version || ''),
    date: String(item.date || ''),
    tag: String(item.tag || 'ÚJDONSÁG'),
    title,
    text: String(item.text || item.description || ''),
    changes,
  };
}

function normalize(raw) {
  const list = Array.isArray(raw)
    ? raw
    : raw && Array.isArray(raw.items)
      ? raw.items
      : raw && raw.item
        ? [raw.item]
        : [];
  const items = list.map(toListItem).filter(Boolean).slice(0, MAX_ITEMS);
  const version =
    (raw && !Array.isArray(raw) && typeof raw.version === 'string' && raw.version) ||
    (items[0] && items[0].version) ||
    '';
  return { version: String(version), items };
}

// A csomagolt példány (ha nincs net, vagy még nem került fel a repóba).
function readLocal(appRoot) {
  const files = [
    path.join(appRoot || __dirname, 'news.json'),
    path.join(appRoot || __dirname, 'assets', 'news.json'),
  ];
  for (const file of files) {
    try {
      const data = normalize(JSON.parse(fs.readFileSync(file, 'utf8')));
      if (data.items.length) return { ok: true, source: 'local', ...data };
    } catch {
      /* nincs ilyen fájl */
    }
  }
  return null;
}

async function fetchNews({ cfg = {}, appRoot, force = false } = {}) {
  const url = urlOf(cfg);
  const now = Date.now();
  if (!force && cache.data && cache.key === url && now - cache.at < CACHE_MS) {
    return cache.data;
  }

  try {
    const { status, body } = await fetchText(url, { timeoutMs: 12000 });
    if (status !== 200) throw new Error(`HTTP ${status}`);
    const data = normalize(JSON.parse(body));
    const res = { ok: true, source: url, ...data };
    cache = { at: now, key: url, data: res };
    return res;
  } catch (err) {
    const reason = err && err.message ? err.message : String(err);
    if (cache.data && cache.key === url) return { ...cache.data, stale: true };
    const local = readLocal(appRoot);
    if (local) return { ...local, error: reason };
    return { ok: false, source: url, version: '', items: [], error: reason };
  }
}

module.exports = { fetchNews, urlOf, normalize, readLocal };
