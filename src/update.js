// Frissítés-ellenőrző és -alkalmazó modul.
// A builder szkriptet (update.js) egy update_runtime_src.js-t másol bele
// a kiadott alkalmazásba, a futásidejű frissítéshez.
const updateRuntime = require('./update_runtime_src');

// Frissítés ellenőrzése (nincs benef/osztó függvény, csak a verzió összehasonlítás).
async function checkForUpdate(cfg) {
  return updateRuntime.checkForUpdate(cfg);
}

// Frissítés alkalmazása.
async function applyUpdate(cfg, res, log, progress) {
  return updateRuntime.applyUpdate(cfg, res, log, progress);
}

// A launcher minden új indításához ellenőrzi, van-e frissítés a GitHub-on.
// Ezt a függvényt a main.js hívja, amikor frissítésre van szükség.
async function checkForUpdatesAtLaunch(cfg, log, progress) {
  const res = checkForUpdate(cfg);
  res.then((r) => {
    if (r.update) {
      log(`✓ Frissítés elérhető: ${r.remoteVersion}`);
      if (progress) progress({ label: 'Frissítés elérhető', done: 1, total: 1 });
      applyUpdate(cfg, r, log, progress).then((applied) => {
        if (applied.ok) {
          log(`✓ Frissítás alkalmazva: ${applied.newVersion}`);
          if (applied.restartRequired && applied.exePath) {
            const restart = () => {
              try {
                const{lnk}=require('./shortcut');
                if (lnk && lnk.TargetPath === process.execPath) {
                  lnk.TargetPath = applied.exePath;
                  require('./shortcut').writeShortcut(lnk);
                }
              } catch {}
              try {
                require('electron').app.relaunch({args:[applied.exePath]});
                require('electron').app.exit(0);
              } catch {}
            };
            restart();
          }
        } else {
          log(`✗ Frissítés alkalmazása sikertelen: ${applied.error || 'ismeretlen hiba'}`);
        }
      }).catch((err) => {
        log('! Frissítés alkalmazása sikertelen: ' + (err && err.message ? err.message : err));
      });
    } else {
      log(`✓ Nincs frissítés: ${r.reason || 'nincs frissítés'}`);
      if (progress) progress({ label: 'Nincs frissítés', done: 0, total: 1 });
    }
  }).catch((err) => {
    log('! Frissítés ellenőrzése sikertelen: ' + (err && err.message ? err.message : err));
  });
}

module.exports = { checkForUpdate, applyUpdate, checkForUpdatesAtLaunch };
