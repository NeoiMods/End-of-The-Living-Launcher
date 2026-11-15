// Tartós launcher-napló.
//
// A felület naplója csak memóriában él: a launcher bezárásakor elvész, és egy
// „nem indult el / nem töltődött le” hibát utólag nem lehet megnézni. Ezért a
// főfolyamat minden naplósora ide is bekerül:
//
//   %APPDATA%/<launcher>/launcher.log        – az aktuális napló
//   %APPDATA%/<launcher>/launcher.log.1      – az előző (2 MB felett átforgatva)
//
// Írási hiba (pl. írásvédett hely) esetén csendben kimarad: a launcher működése
// nem függhet a naplófájltól.

const fs = require('fs');
const path = require('path');

const DEFAULT_MAX_BYTES = 2 * 1024 * 1024;
const DEFAULT_NAME = 'launcher.log';

function createFileLogger(dir, { maxBytes = DEFAULT_MAX_BYTES, name = DEFAULT_NAME } = {}) {
  const file = path.join(dir, name);
  let dirReady = false;

  const write = (line) => {
    try {
      if (!dirReady) {
        fs.mkdirSync(dir, { recursive: true });
        dirReady = true;
      }
      try {
        if (fs.statSync(file).size > maxBytes) {
          try {
            fs.renameSync(file, file + '.1');
          } catch {
            // Nem sikerült átforgatni: akkor tovább írjuk (nem állunk meg).
          }
        }
      } catch {
        // Még nincs fájl: az első írás létrehozza.
      }
      fs.appendFileSync(file, `${new Date().toISOString()} ${String(line)}\n`, 'utf8');
    } catch {
      // Írásvédett hely / megtelt lemez: a felületi napló akkor is megvan.
    }
  };

  return { file, write };
}

module.exports = { createFileLogger, DEFAULT_NAME, DEFAULT_MAX_BYTES };
