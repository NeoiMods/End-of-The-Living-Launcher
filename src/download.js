const https = require('https');
const http = require('http');
const fs = require('fs');

// Fetches a URL as text with redirect following. Returns { status, body }.
function fetchText(url, { headers = {}, redirects = 0, timeoutMs = 30000 } = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects >= 5) return reject(new Error('Túl sok átirányítás: ' + url));
        return fetchText(res.headers.location, { headers, redirects: redirects + 1, timeoutMs }).then(
          resolve,
          reject
        );
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c) => {
        body += c;
      });
      res.on('end', () => resolve({ status: res.statusCode, body }));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => req.destroy(new Error('Időtúllépés: ' + url)));
  });
}

function downloadFile(url, dest, options = {}) {
  const opts = typeof options === 'number' ? { redirects: options } : options || {};
  const redirects = opts.redirects || 0;
  const headers = opts.headers || {};
  const timeoutMs = opts.timeoutMs || 120000;
  // Bájt-szintű visszajelzés a töltőcsíkhoz (legfeljebb 4-szer másodpercenként).
  const onProgress = typeof opts.onProgress === 'function' ? opts.onProgress : null;
  let lastReport = 0;
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects >= 5) return reject(new Error('Túl sok átirányítás: ' + url));
        return downloadFile(res.headers.location, dest, {
          redirects: redirects + 1,
          headers,
          timeoutMs,
          onProgress,
        }).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Letöltési hiba (HTTP ${res.statusCode}): ${url}`));
      }
      const ws = fs.createWriteStream(dest);
      if (onProgress) {
        const total = Number(res.headers['content-length']) || 0;
        let received = 0;
        let reported = 0;
        res.on('data', (chunk) => {
          received += chunk.length;
          const now = Date.now();
          if (now - lastReport < 250 && (!total || received < total)) return;
          lastReport = now;
          reported = received;
          try {
            onProgress(received, total);
          } catch {
            /* a visszajelzés hibája nem állítja meg a letöltést */
          }
        });
        res.on('end', () => {
          try {
            onProgress(total || reported || received, total || received);
          } catch {
            /* nem kritikus */
          }
        });
      }
      res.pipe(ws);
      ws.on('error', reject);
      res.on('error', reject);
      ws.on('finish', () => ws.close(() => resolve()));
    });
    req.on('error', reject);
    req.setTimeout(timeoutMs, () => req.destroy(new Error('Letöltési időtúllépés: ' + url)));
  });
}

module.exports = { fetchText, downloadFile };
