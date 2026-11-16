#!/usr/bin/env node
// „Did you know?” – időzített Discord-üzenő.
//
// 20 percenként egy üzenet a listából, sorban, ismétlés nélkül: az aktuális
// időpontból számolt sorszám (idősáv) dönti el, melyik következik, ezért nincs
// szükség állapotfájlra vagy commitra a repóban. Két egymást követő futás
// (15 perc) mindig másik üzenetet ad, és a lista végére érve újraindul.
//
// Használat:
//   node scripts/did-you-know/post.js                 # éles küldés
//   node scripts/did-you-know/post.js --dry-run       # csak kiírja, nem küld
//   node scripts/did-you-know/post.js --test          # küld egyet, majd törli
//   node scripts/did-you-know/post.js --file x.json --now 1760000000000
//
// A webhook a DISCORD_WEBHOOK környezeti változóból jön (GitHub Actions secret).

const fs = require('fs');
const path = require('path');

const DEFAULT_INTERVAL_MIN = 20;
const MAX_TEXT = 3800; // Discord embed leírás limit (4096), biztonsági tartalékkal

function parseArgs(argv) {
  const out = { dryRun: false, test: false, file: '', now: 0, webhook: '' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') out.dryRun = true;
    else if (a === '--test') out.test = true;
    else if (a === '--file') out.file = argv[++i] || '';
    else if (a === '--now') out.now = Number(argv[++i]) || 0;
    else if (a === '--webhook') out.webhook = argv[++i] || '';
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const dataFile = args.file
  ? path.resolve(args.file)
  : path.join(__dirname, '..', '..', 'data', 'did-you-know.json');

function loadData() {
  const raw = fs.readFileSync(dataFile, 'utf8');
  const json = JSON.parse(raw);
  const intervalMinutes = Number(json.intervalMinutes) > 0 ? Number(json.intervalMinutes) : DEFAULT_INTERVAL_MIN;
  const messages = (Array.isArray(json.messages) ? json.messages : [])
    .filter((m) => m && !m.draft && String(m.text || '').trim())
    .map((m, i) => ({
      title: String(m.title || 'Did you know?').trim(),
      text: String(m.text).trim(),
      source: m.source ? String(m.source).trim() : '',
      tag: m.tag ? String(m.tag).trim() : '',
      index: i,
    }));
  return { intervalMinutes, messages };
}

// Melyik üzenet jön most? Az idősáv 15 percenként lép egyet, a listán pedig
// körbe-körbe megyünk – így nincs ismétlés, amíg a lista végére nem érünk.
function pickMessage(messages, intervalMinutes, now) {
  const slot = Math.floor(now / (intervalMinutes * 60 * 1000));
  const index = ((slot % messages.length) + messages.length) % messages.length;
  return { message: messages[index], index, slot };
}

function buildPayload(message, position) {
  let text = message.text;
  if (text.length > MAX_TEXT) text = text.slice(0, MAX_TEXT - 1).trimEnd() + '…';
  const embed = {
    title: `💡 ${message.title}`,
    description: text,
    color: 0x8fd14f,
    footer: { text: `Did you know? · ${position.index + 1}/${position.total}` },
  };
  if (message.source) embed.fields = [{ name: 'Forrás', value: message.source, inline: false }];
  const payload = { username: 'Did you know?', embeds: [embed] };
  // A tag a címbe kerül, hogy a keresőben is megtalálható legyen.
  if (message.tag) payload.embeds[0].title = `💡 ${message.tag} – ${message.title}`;
  return payload;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function discordFetch(url, options, attempt = 1) {
  const res = await fetch(url, options);
  if (res.status === 429 && attempt <= 3) {
    let waitMs = 2000 * attempt;
    try {
      const body = await res.json();
      if (body && body.retry_after) waitMs = Math.ceil(body.retry_after * 1000) + 500;
    } catch {
      // Nincs JSON: marad az alap várakozás.
    }
    console.log(`… Discord rate limit, várakozás ${waitMs} ms`);
    await sleep(waitMs);
    return discordFetch(url, options, attempt + 1);
  }
  return res;
}

async function main() {
  const { intervalMinutes, messages } = loadData();

  if (!messages.length) {
    console.log(
      `Nincs kiküldhető üzenet: a ${path.relative(process.cwd(), dataFile)} listája üres ` +
        '(vagy minden elem draft). Küldés kihagyva.'
    );
    return;
  }

  const now = args.now || Date.now();
  const picked = pickMessage(messages, intervalMinutes, now);
  const payload = buildPayload(picked.message, { index: picked.index, total: messages.length });

  console.log(
    `Idősáv: ${picked.slot} · üzenet: ${picked.index + 1}/${messages.length} – ${picked.message.title}`
  );

  if (args.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const webhook = String(args.webhook || process.env.DISCORD_WEBHOOK || '').trim();
  if (!webhook) {
    console.error('Nincs webhook: állítsd be a DISCORD_WEBHOOK környezeti változót (GitHub Secret).');
    process.exitCode = 1;
    return;
  }
  if (!/^https:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/api\/webhooks\//i.test(webhook)) {
    console.error('A webhook nem Discord webhook URL-nek tűnik – küldés leállítva.');
    process.exitCode = 1;
    return;
  }

  const url = webhook + (webhook.includes('?') ? '&' : '?') + 'wait=true';
  const res = await discordFetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    console.error(`Küldés sikertelen: HTTP ${res.status} ${body.slice(0, 300)}`);
    process.exitCode = 1;
    return;
  }

  const sent = await res.json().catch(() => null);
  console.log(`✓ Elküldve${sent && sent.id ? ` (üzenet: ${sent.id})` : ''}.`);

  // --test: az ellenőrző üzenetet rögtön töröljük, hogy ne maradjon a csatornán.
  if (args.test && sent && sent.id) {
    const delUrl = `${webhook}/messages/${sent.id}`;
    const del = await discordFetch(delUrl, { method: 'DELETE' });
    console.log(del.ok ? '✓ Teszt-üzenet törölve.' : `! A teszt-üzenet törlése nem sikerült (HTTP ${del.status}).`);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Hiba:', err && err.message ? err.message : err);
    process.exitCode = 1;
  });
}

module.exports = { pickMessage, buildPayload, loadData, parseArgs };
