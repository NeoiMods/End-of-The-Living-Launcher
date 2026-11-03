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

function downloadFile(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects >= 5) return reject(new Error('Túl sok átirányítás: ' + url));
        return downloadFile(res.headers.location, dest, redirects + 1).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Letöltési hiba (HTTP ${res.statusCode}): ${url}`));
      }
      const ws = fs.createWriteStream(dest);
      res.pipe(ws);
      ws.on('error', reject);
      res.on('error', reject);
      ws.on('finish', () => ws.close(() => resolve()));
    });
    req.on('error', reject);
    req.setTimeout(120000, () => req.destroy(new Error('Letöltési időtúllépés: ' + url)));
  });
}

module.exports = { fetchText, downloadFile };
