// Discord integráció: crash log küldése webhookra és a szerver widget adatai.
//
// A crash logot a launcher a szerver saját csatornájára (crash szoba) küldi egy
// webhookon keresztül. A webhook URL a beállításfájlban van (discordWebhook):
// ez nem titok a szó szoros értelmében, de csak a crash csatornára szól, ezért
// érdemes a szerveren külön csatornára korlátozni.

const fs = require('fs');
const http = require('http');
const https = require('https');
const crypto = require('crypto');

const UA = 'EndOfTheLivingLauncher';
const MAX_TOTAL_BYTES = 7.5 * 1024 * 1024; // Discord: ~8 MB fájlonként

// ------------------------------------------------------------------ widget

// A szerverek widgetjei: a többjátékos mód az End of The Living szervert, az
// egyjátékos mód a Blackout közösség szerverét mutatja.
const WIDGET_GUILD_ID = '993506036545753158';
const WIDGET_INVITE = 'https://discord.gg/fxzxE7yH';
const DISCORD_CHANNEL_URL = 'https://discord.com/channels/993506036545753158/1567990881032732913';

const BLACKOUT_GUILD_ID = '326126573658963971';
const BLACKOUT_INVITE = 'https://discord.com/invite/326126573658963971';
const BLACKOUT_CHANNEL_URL = 'https://discord.com/channels/326126573658963971';

function guildConfig(guildId) {
  const id = String(guildId || '').trim();
  if (id === BLACKOUT_GUILD_ID) {
    return {
      id: BLACKOUT_GUILD_ID,
      invite: BLACKOUT_INVITE,
      channelUrl: BLACKOUT_CHANNEL_URL,
      embed: `https://discord.com/widget?id=${BLACKOUT_GUILD_ID}&theme=dark`,
    };
  }
  return {
    id: WIDGET_GUILD_ID,
    invite: WIDGET_INVITE,
    channelUrl: DISCORD_CHANNEL_URL,
    embed: `https://discord.com/widget?id=${WIDGET_GUILD_ID}&theme=dark`,
  };
}

function getJson(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https:') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => {
        body += c;
      });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error('A válasz nem JSON.'));
        }
      });
    });
    req.setTimeout(timeoutMs, () => req.destroy(new Error('időtúllépés')));
    req.on('error', reject);
  });
}

// A szerver widget adatai: név, online tagok, meghívó.
async function widget(guildId) {
  const conf = guildConfig(guildId);
  const raw = await getJson(`https://discord.com/api/guilds/${conf.id}/widget.json`);
  const members = Array.isArray(raw.members) ? raw.members : [];
  // Nincs mesterséges vágás: a widget JSON minden bent lévő tagot hoz, a
  // felület pedig görgethető, tehát nem kell 24-nél megállni.
  const online = members
    .filter((m) => m && m.status && m.status !== 'offline')
    .map((m) => ({
      name: String(m.username || ''),
      status: String(m.status || 'online'),
      avatar: m.avatar_url ? String(m.avatar_url) : '',
      game: m.game && m.game.name ? String(m.game.name) : '',
    }));
  // A presence_count a szerver teljes online létszáma (a listánál nagyobb is
  // lehet, a Discord a widgetben csak egy részüket adja át).
  const presenceCount = Number(raw.presence_count);
  return {
    guildId: conf.id,
    widgetUrl: conf.embed,
    name: String(raw.name || 'Discord'),
    online,
    onlineCount: online.length,
    presenceCount: Number.isFinite(presenceCount) && presenceCount > 0 ? presenceCount : online.length,
    invite: String(raw.instant_invite || conf.invite),
    channelUrl: conf.channelUrl,
  };
}

// ------------------------------------------------------------------ webhook

// Csak igazi Discord webhookra (vagy helyi teszt-címre) küldünk.
function isAllowedWebhook(url) {
  const u = String(url || '').trim();
  if (!u) return false;
  if (/^https:\/\/(canary\.|ptb\.)?discord(app)?\.com\/api\/webhooks\/\d+\/[\w-]+$/i.test(u)) return true;
  // Helyi teszt (fejlesztés): 127.0.0.1 / localhost.
  return /^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//i.test(u);
}

function multipart(payload, files) {
  const boundary = '----EOTL' + crypto.randomBytes(16).toString('hex');
  const parts = [];
  parts.push(
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="payload_json"\r\n` +
        `Content-Type: application/json\r\n\r\n${JSON.stringify(payload)}\r\n`,
      'utf8'
    )
  );
  files.forEach((file, i) => {
    const safeName = String(file.name || `file${i}`).replace(/["\r\n]/g, '_');
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="files[${i}]"; filename="${safeName}"\r\n` +
          `Content-Type: text/plain\r\n\r\n`,
        'utf8'
      )
    );
    parts.push(file.data);
    parts.push(Buffer.from('\r\n', 'utf8'));
  });
  parts.push(Buffer.from(`--${boundary}--\r\n`, 'utf8'));
  return { boundary, body: Buffer.concat(parts) };
}

function postWebhook(url, payload, files, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const { boundary, body } = multipart(payload, files);
    const u = new URL(url);
    const mod = u.protocol === 'https:' ? https : http;
    const req = mod.request(
      u,
      {
        method: 'POST',
        headers: {
          'User-Agent': UA,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': body.length,
        },
      },
      (res) => {
        let text = '';
        res.setEncoding('utf8');
        res.on('data', (c) => {
          text += c;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ ok: true, status: res.statusCode });
            return;
          }
          let detail = text.slice(0, 300);
          try {
            const json = JSON.parse(text);
            if (json && json.message) detail = json.message + (json.code ? ` (${json.code})` : '');
          } catch {
            /* sima szöveg */
          }
          reject(new Error(`Discord HTTP ${res.statusCode}${detail ? ': ' + detail : ''}`));
        });
      }
    );
    req.setTimeout(60000, () => req.destroy(new Error('időtúllépés küldés közben')));
    req.on('error', reject);
    req.end(body);
  });
}

function formatMb(bytes) {
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function cleanName(raw) {
  return String(raw || '')
    .replace(/[`@\r\n\t]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
}

// A crash log(ok) elküldése. A fájlokat egy az egyben továbbítjuk.
async function sendCrash({ webhookUrl, discordName, files, meta = {} }) {
  const url = String(webhookUrl || '').trim();
  if (!isAllowedWebhook(url)) {
    throw new Error('Nincs beállítva érvényes Discord webhook a crash logokhoz.');
  }

  const name = cleanName(discordName);
  if (name.length < 2) throw new Error('Írd be a Discord neved (legalább 2 karakter).');

  const total = files.reduce((sum, f) => sum + f.size, 0);
  if (total > MAX_TOTAL_BYTES) throw new Error('A csatolmányok túl nagyok (' + formatMb(total) + ').');

  // A jelentés a launcher választott nyelvén megy ki.
  const en = String(meta.lang || '').toLowerCase() === 'en';
  const t = (hu, eng) => (en ? eng : hu);
  const lines = [
    t('**🩸 ÖSSZEOMLÁS – ', '**🩸 CRASH – ') + (meta.server || 'End of The Living') + '**',
    t('**Játékos Discord neve:** ', '**Player Discord name:** ') + name,
    '**Launcher:** ' + (meta.version || '?') + (meta.sha ? ` (${String(meta.sha).slice(0, 7)})` : ''),
    t('**Gép:** ', '**Machine:** ') + (meta.ramGb ? meta.ramGb + ' GB RAM' : '?') + (meta.heapMb ? ` · heap ${meta.heapMb} MB` : ''),
    t('**Időpont:** ', '**Time:** ') + new Date().toLocaleString(en ? 'en-GB' : 'hu-HU'),
    t('**Fájlok:** ', '**Files:** ') + files.map((f) => `${f.name} (${formatMb(f.size)})`).join(', '),
  ];
  if (meta.summary) lines.push(t('**Hiba:** ', '**Error:** ') + meta.summary);

  const payload = {
    content: lines.join('\n'),
    // Senkit ne értesítsen a név miatt, és a nevet se alakítsa mentionné.
    allowed_mentions: { parse: [] },
  };

  await postWebhook(url, payload, files);
  return { ok: true, sent: files.map((f) => f.name), total };
}

// Figyelmeztetés (nem crash): pl. a játék nem a helyes mappa struktúrát követi.
// Csatolmány nélküli üzenet megy a crash csatornára, hogy a szerveren is
// látszódjon, kinél van rossz helyen a Project Zomboid.
async function sendWarning({ webhookUrl, discordName, warning = {}, meta = {} }) {
  const url = String(webhookUrl || '').trim();
  if (!isAllowedWebhook(url)) {
    throw new Error('Nincs beállítva érvényes Discord webhook a logokhoz.');
  }

  const name = cleanName(discordName);
  if (name.length < 2) throw new Error('Írd be a Discord neved (legalább 2 karakter).');

  const en = String(meta.lang || '').toLowerCase() === 'en';
  const t = (hu, eng) => (en ? eng : hu);
  const lines = [
    t('**⚠️ NEM A HELYES MAPPA STRUKTÚRA – ', '**⚠️ WRONG FOLDER STRUCTURE – ') + (meta.server || 'End of The Living') + '**',
    t('**Játékos Discord neve:** ', '**Player Discord name:** ') + name +
      t(' – ez a játékos nem a helyes mappa struktúrát követi.', ' – this player does not follow the expected folder structure.'),
    t('**Játék mappa:** `', '**Game folder:** `') + String(warning.gamePath || '?') + '`',
    t('**Alap hely (ide kellene):** `', '**Default location (expected):** `') + String(warning.defaultPath || '?') + '`',
    '**Launcher:** ' + (meta.version || '?') + (meta.sha ? ` (${String(meta.sha).slice(0, 7)})` : ''),
    t('**Gép:** ', '**Machine:** ') + (meta.ramGb ? meta.ramGb + ' GB RAM' : '?') + (meta.heapMb ? ` · heap ${meta.heapMb} MB` : ''),
    t('**Időpont:** ', '**Time:** ') + new Date().toLocaleString(en ? 'en-GB' : 'hu-HU'),
  ];

  await postWebhook(url, { content: lines.join('\n'), allowed_mentions: { parse: [] } }, []);
  return { ok: true, name };
}

module.exports = {
  widget,
  sendCrash,
  sendWarning,
  isAllowedWebhook,
  cleanName,
  WIDGET_GUILD_ID,
  BLACKOUT_GUILD_ID,
  guildConfig,
  DISCORD_CHANNEL_URL,
  MAX_TOTAL_BYTES,
};
