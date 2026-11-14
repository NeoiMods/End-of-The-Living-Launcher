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

const gh = require('./gh');

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

// Két külön hírfolyam van: a szerveres (news.json) és a Blackout Protocol
// egyjátékos modpack saját hírei (news-blackout.json).
function fileOf(mode) {
  return String(mode || '').toLowerCase() === 'blackout' ? 'news-blackout.json' : 'news.json';
}

function urlOf(cfg, mode) {
  return `https://raw.githubusercontent.com/${repoOf(cfg)}/main/${fileOf(mode)}`;
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
    // Figyelmeztető bejegyzés: a launcher induláskor felugrik vele, és csak
    // az OK gombbal lehet nyugtázni (a Blackout modpack hírei ilyenek).
    attention: !!item.attention,
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
function readLocal(appRoot, mode) {
  const name = fileOf(mode);
  const files = [
    path.join(appRoot || __dirname, name),
    path.join(appRoot || __dirname, 'assets', name),
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

async function fetchNews({ cfg = {}, appRoot, force = false, mode = 'eotl' } = {}) {
  const url = urlOf(cfg, mode);
  const file = fileOf(mode);
  const now = Date.now();
  if (!force && cache.data && cache.key === url && now - cache.at < CACHE_MS) {
    return cache.data;
  }

  try {
    // A hírek a repó nyers tartalmából jönnek, több kiszolgálóról: így a GitHub
    // API kimaradása (503/504) nem érinti.
    const fetched = await gh.fetchRepoText({
      cfg,
      repo: repoOf(cfg),
      ref: 'main',
      file,
      attempts: 2,
    });
    if (!fetched.ok) throw new Error(fetched.error);
    const data = normalize(JSON.parse(fetched.body));
    const res = { ok: true, source: fetched.source || url, ...data };
    cache = { at: now, key: url, data: res };
    return res;
  } catch (err) {
    const reason = err && err.message ? err.message : String(err);
    if (cache.data && cache.key === url) return { ...cache.data, stale: true };
    const local = readLocal(appRoot, mode);
    if (local) return { ...local, error: reason };
    return { ok: false, source: url, version: '', items: [], error: reason };
  }
}

module.exports = { fetchNews, urlOf, fileOf, normalize, readLocal };
