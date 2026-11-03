// A ZombieBuddy telepítő automatizálásának tesztje szimulált telepítővel.
// Futtatás: node scripts/test-installer-flow.js
const path = require('path');
const { runInstaller } = require('../src/zb-installer');

(async () => {
  console.log('— Szimulált telepítő indítása —');
  const res = await runInstaller({
    exePath: path.join(__dirname, 'fake-zb-installer.js'),
    onLog: (l) => console.log(l),
    spawnCmd: { command: process.execPath, args: [path.join(__dirname, 'fake-zb-installer.js')] },
  });
  console.log('--- eredmény ---');
  console.log(res);
  if (!res.ok) {
    console.error('TESZT HIBA: a telepítő nem futott le sikeresen.');
    process.exit(1);
  }
  console.log('TESZT OK: minden kérdésre a megfelelő választ adta (1 → 2 → 2 → y).');
})();
