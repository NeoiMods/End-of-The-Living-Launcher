// Események (event) betöltése a GitHubról.
//
// A launcher egy events.json fájlt olvas a repóból:
//   https://raw.githubusercontent.com/<repo>/main/events.json
//
// Elfogadott formák:
//   { "events": [ { id, title, tag, date, text, url }, ... ] }
//   [ { ... } ]
//   { "event": { ... } }
//
// A legközelebbi jövőbeli eseményt adja vissza; ha nincs ilyen,
// a legutóbbi elmúltat (akkor a visszaszámláló helyett eltelt idő látszik).

const fs = require('fs');
const path = require('path');

const gh = require('./gh');

const DEFAULT_REPO = 'NeoiMods/End-of-The-Living-Launcher';
const CACHE_MS = 60 * 1000;
const TIMEOUT_MS = 12000;
const MAX_BYTES = 512 * 1024;

let cache = { at: 0, key: '', data: null };

function normalizeRepo(value) {
  return String(value || DEFAULT_REPO)
    .trim()
    .replace(/^https?:\/\/github\.com\//i, '')
    .replace(/^github\.com\//i, '')
    .replace(/\.git$/i, '')
    .replace(/\/blob\/.*$/i, '')
    .replace(/\/+$/, '');
}

function resolveUrl(cfg) {
  const explicit = String((cfg && cfg.eventsUrl) || '').trim();
  if (explicit) {
    if (/^https?:\/\//i.test(explicit)) return explicit;
    return `https://raw.githubusercontent.com/${normalizeRepo(explicit)}/main/events.json`;
  }
  const repo = normalizeRepo((cfg && cfg.updateCheckUrl) || DEFAULT_REPO);
  return `https://raw.githubusercontent.com/${repo}/main/events.json`;
}

// Az események a repó nyers tartalmából jönnek, több kiszolgálóról
// (raw.githubusercontent → jsDelivr → API → github.com), hogy a GitHub API
// kimaradása ne érintse. Abszolút URL-t is elfogadunk (beállításból).
async function request(url, { cfg, forceDirect = false } = {}) {
  if (forceDirect) {
    const res = await gh.fetchTextRetry(
      url,
      { headers: { 'User-Agent': 'eotl-launcher', Accept: 'application/json' }, timeoutMs: TIMEOUT_MS },
      2
    );
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    if (res.body.length > MAX_BYTES) throw new Error('túl nagy válasz');
    return JSON.parse(res.body);
  }
  const repo = normalizeRepo((cfg && cfg.updateCheckUrl) || DEFAULT_REPO);
  const fetched = await gh.fetchRepoText({
    cfg,
    repo,
    ref: 'main',
    file: 'events.json',
    attempts: 2,
  });
  if (!fetched.ok) throw new Error(fetched.error);
  if (fetched.body.length > MAX_BYTES) throw new Error('túl nagy válasz');
  return JSON.parse(fetched.body);
}

function asList(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.events)) return raw.events;
  if (raw && raw.event) return [raw.event];
  if (raw && raw.title) return [raw];
  return [];
}

function pickEvent(raw) {
  const now = Date.now();
  const parsed = asList(raw)
    .map((item) => {
      if (!item || !item.title) return null;
      const time = Date.parse(item.date || item.when || item.start || '');
      if (!Number.isFinite(time)) return null;
      return {
        id: String(item.id || item.title),
        tag: String(item.tag || (time > now ? 'KÖVETKEZŐ ESEMÉNY' : 'ESEMÉNY')),
        title: String(item.title),
        text: String(item.text || item.description || ''),
        url: String(item.url || ''),
        time,
      };
    })
    .filter(Boolean);

  if (!parsed.length) return null;

  const upcoming = parsed.filter((e) => e.time > now).sort((a, b) => a.time - b.time);
  if (upcoming.length) return upcoming[0];

  return parsed.sort((a, b) => b.time - a.time)[0];
}

async function fetchEvent({ cfg, force } = {}) {
  const url = resolveUrl(cfg);
  const now = Date.now();

  if (!force && cache.data && cache.key === url && now - cache.at < CACHE_MS) {
    return cache.data;
  }

  try {
    const raw = await request(url, { cfg, forceDirect: /^https?:\/\//i.test(String((cfg && cfg.eventsUrl) || '').trim()) });
    const event = pickEvent(raw);
    const data = event
      ? { ok: true, source: url, event }
      : { ok: true, source: url, event: null, reason: 'Nincs esemény a listában.' };
    cache = { at: now, key: url, data };
    return data;
  } catch (err) {
    const reason = err && err.message ? err.message : String(err);
    if (cache.data && cache.key === url) return { ...cache.data, stale: true };

    // Ha nincs net (vagy még nem került fel a repóba), a csomagolt példányt használjuk.
    const local = readLocal();
    if (local) return local;

    return { ok: false, source: url, error: `Esemény nem érhető el (${reason}).` };
  }
}

function readLocal() {
  for (const file of [path.join(__dirname, '..', 'events.json'), path.join(__dirname, '..', 'assets', 'events.json')]) {
    try {
      const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
      const event = pickEvent(raw);
      if (event) return { ok: true, source: 'local', event };
    } catch {
      /* nincs ilyen fájl */
    }
  }
  return null;
}

module.exports = { fetchEvent, resolveUrl, pickEvent, readLocal, DEFAULT_REPO };
