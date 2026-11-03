const dgram = require('dgram');
const dns = require('dns');
const net = require('net');

// Source (A2S) protokoll lekérdezés UDP-n. A Project Zomboid dedikált szerver
// a Steam GameServer API-n keresztül válaszol az A2S_INFO / A2S_PLAYER
// csomagokra. Ha a szerver nem válaszol, a launcher egyszerűen "offline"-t ír.

const A2S_INFO_PAYLOAD = Buffer.concat([
  Buffer.from([0xff, 0xff, 0xff, 0xff]),
  Buffer.from('TSource Engine Query\0', 'latin1'),
]);
const A2S_PLAYER_HEADER = Buffer.from([0xff, 0xff, 0xff, 0xff, 0x55]);
const A2S_CHALLENGE = Buffer.from([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);

// Portok, amiken a PZ szerver A2S-re válaszolhat: a játék port, illetve a
// szerver.ini-ben megadott SteamPort1/SteamPort2 (alap: 8766 / 8767).
function candidatePorts(port) {
  const main = Number(port) || 16261;
  const ports = [main];
  for (const p of [main + 1, 8766, 8767]) {
    if (p > 0 && p < 65536 && !ports.includes(p)) ports.push(p);
  }
  return ports;
}

function readCString(buf, offset) {
  let end = offset;
  while (end < buf.length && buf[end] !== 0) end++;
  return { value: buf.toString('utf8', offset, end), next: end + 1 };
}

function decodeInfo(buf) {
  // 0x49 ('I') = modern válasz, 0x6D ('m') = GoldSrc.
  const kind = String.fromCharCode(buf[4]);
  let off = 5;
  const out = { kind };

  if (kind === 'I') {
    off += 1; // protocol
    const name = readCString(buf, off);
    off = name.next;
    out.name = name.value;
    const map = readCString(buf, off);
    off = map.next;
    out.map = map.value;
    const folder = readCString(buf, off);
    off = folder.next;
    out.folder = folder.value;
    const game = readCString(buf, off);
    off = game.next;
    out.game = game.value;
    if (off + 2 <= buf.length) {
      out.appId = buf.readUInt16LE(off);
      off += 2;
    }
    if (off < buf.length) out.players = buf[off++];
    if (off < buf.length) out.maxPlayers = buf[off++];
    if (off < buf.length) out.bots = buf[off++];
    if (off < buf.length) out.serverType = String.fromCharCode(buf[off++]);
    if (off < buf.length) out.environment = String.fromCharCode(buf[off++]);
    if (off < buf.length) out.visibility = buf[off++];
    if (off < buf.length) out.vac = buf[off++];
    if (off < buf.length) {
      const version = readCString(buf, off);
      out.version = version.value;
    }
  } else if (kind === 'm') {
    const addr = readCString(buf, off);
    off = addr.next;
    out.address = addr.value;
    const name = readCString(buf, off);
    off = name.next;
    out.name = name.value;
    const map = readCString(buf, off);
    off = map.next;
    out.map = map.value;
    const folder = readCString(buf, off);
    off = folder.next;
    out.folder = folder.value;
    const game = readCString(buf, off);
    off = game.next;
    out.game = game.value;
    if (off < buf.length) out.players = buf[off++];
    if (off < buf.length) out.maxPlayers = buf[off++];
    if (off + 4 <= buf.length) off += 4; // version (byte)
  } else if (buf[4] === 0x41) {
    out.challenge = buf.length >= 9 ? buf.readInt32LE(5) : null;
  }
  return out;
}

function sendQuery(host, port, payload, timeoutMs) {
  return new Promise((resolve) => {
    const sock = dgram.createSocket('udp4');
    let done = false;
    const finish = (value) => {
      if (done) return;
      done = true;
      try {
        sock.close();
      } catch {
        // Már lezárva.
      }
      resolve(value);
    };

    sock.on('error', () => finish(null));
    sock.on('message', (msg) => finish(msg));
    sock.send(payload, 0, payload.length, port, host, (err) => {
      if (err) finish(null);
    });
    setTimeout(() => finish(null), timeoutMs);
  });
}

async function resolveHost(host) {
  if (net.isIP(host)) return host;
  try {
    const res = await dns.promises.lookup(host, { family: 4 });
    return res.address;
  } catch {
    return null;
  }
}

async function queryPort(host, port, timeoutMs) {
  const startedAt = Date.now();
  let msg = await sendQuery(host, port, A2S_INFO_PAYLOAD, timeoutMs);
  if (!msg || msg.length < 5) return null;

  // Modern szerverek először challenge-et küldenek (0x41), arra újra kell kérdezni.
  if (msg[4] === 0x41 && msg.length >= 9) {
    const challenge = Buffer.from(msg.subarray(5, 9));
    const retry = Buffer.concat([A2S_INFO_PAYLOAD, challenge]);
    msg = await sendQuery(host, port, retry, timeoutMs);
    if (!msg || msg.length < 5) return null;
  }

  const ping = Date.now() - startedAt;
  const info = decodeInfo(msg);
  if (!info || !info.name) return null;

  return {
    port,
    ping,
    name: info.name,
    map: info.map || '',
    game: info.game || '',
    players: Number.isFinite(info.players) ? info.players : null,
    maxPlayers: Number.isFinite(info.maxPlayers) ? info.maxPlayers : null,
    version: info.version || '',
    folder: info.folder || '',
  };
}

// Játékoslista (A2S_PLAYER). Sok szerver ezt kikapcsolja – ilyenkor null.
async function queryPlayers(host, port, timeoutMs) {
  const first = await sendQuery(
    host,
    port,
    Buffer.concat([A2S_PLAYER_HEADER, A2S_CHALLENGE]),
    timeoutMs
  );
  if (!first || first.length < 5) return null;
  if (first[4] !== 0x41 || first.length < 9) return null;

  const challenge = first.subarray(5, 9);
  const msg = await sendQuery(host, port, Buffer.concat([A2S_PLAYER_HEADER, challenge]), timeoutMs);
  if (!msg || msg.length < 6 || msg[4] !== 0x44) return null;

  const count = msg[5];
  let off = 6;
  const players = [];
  for (let i = 0; i < count && off < msg.length; i++) {
    off += 1; // index
    const name = readCString(msg, off);
    off = name.next;
    if (off + 8 > msg.length) break;
    off += 4; // score
    off += 4; // duration
    players.push({ name: name.value });
  }
  return players;
}

// Teljes státusz-lekérdezés: a jelölt portokon párhuzamosan próbálkozunk.
async function queryServer({ host, port, timeoutMs = 2500, listPlayers = false }) {
  const ip = await resolveHost(String(host || '').trim());
  if (!ip) {
    return { online: false, reason: 'A szerver címe nem oldható fel (DNS hiba).', ip: null };
  }

  const ports = candidatePorts(port);
  // Az első válaszoló port nyer – a többi próbálkozást nem várjuk meg.
  const hit = await new Promise((resolve) => {
    let pending = ports.length;
    let settled = false;
    for (const p of ports) {
      queryPort(ip, p, timeoutMs)
        .catch(() => null)
        .then((res) => {
          if (settled) return;
          if (res) {
            settled = true;
            resolve(res);
            return;
          }
          pending--;
          if (pending === 0) {
            settled = true;
            resolve(null);
          }
        });
    }
  });

  if (!hit) {
    return {
      online: false,
      ip,
      portsTried: ports,
      reason: 'A szerver nem válaszol az A2S lekérdezésre (lehet, hogy épp nem fut).',
      checkedAt: Date.now(),
    };
  }

  let players = null;
  if (listPlayers) {
    try {
      players = await queryPlayers(ip, hit.port, Math.min(timeoutMs, 1200));
    } catch {
      players = null;
    }
  }

  return { online: true, ip, ...hit, playerList: players, checkedAt: Date.now() };
}

module.exports = { candidatePorts, queryServer, queryPort, queryPlayers };
