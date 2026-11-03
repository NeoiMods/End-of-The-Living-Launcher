// A Java mod előre-jóváhagyás tesztje szimulált mod struktúrával.
// Futtatás: node scripts/test-approvals.js
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');

const approvals = require('../src/approvals');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'eotl-approvals-'));
const modRoot = path.join(tmp, 'mods');
const modDir = path.join(modRoot, 'TestJavaMod');
const jarPath = path.join(modDir, 'media', 'java', 'TestJavaMod.jar');

fs.mkdirSync(path.dirname(jarPath), { recursive: true });
fs.writeFileSync(
  path.join(modDir, 'mod.info'),
  ['name=Test Java Mod', 'id=TestJavaMod', 'javaPkgName=com.example.test', 'javaJarFile=media/java/TestJavaMod.jar', ''].join('\n'),
  'utf8'
);
// Szimulált JAR tartalom (a hash számít, nem a ZIP szerkezet).
const jarBytes = Buffer.from('PK\u0003\u0004fake jar payload for approvals test');
fs.writeFileSync(jarPath, jarBytes);

const expectedHash = crypto.createHash('sha256').update(jarBytes).digest('hex');
const outFile = path.join(tmp, 'mod_approvals.json');

(async () => {
  const res = await approvals.preApproveJavaMods({
    roots: [modRoot],
    enabledIds: ['TestJavaMod'],
    onLog: (l) => console.log(l),
    file: outFile,
  });

  const data = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  const entry = (data.mods || []).find((m) => m.id === 'TestJavaMod');

  console.log('fájl:', outFile);
  console.log('bejegyzések:', data.mods.length, 'formatVersion:', data.formatVersion);
  console.log('bejegyzés:', entry);

  const ok =
    res.count === 1 &&
    data.formatVersion === 2 &&
    entry &&
    entry.jar_hash === expectedHash &&
    entry.decision === true;

  // Második futás: ne duplikáljon.
  await approvals.preApproveJavaMods({
    roots: [modRoot],
    enabledIds: ['TestJavaMod'],
    onLog: () => {},
    file: outFile,
  });
  const second = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  const noDup = second.mods.filter((m) => m.jar_hash === expectedHash).length === 1;

  fs.rmSync(tmp, { recursive: true, force: true });

  if (!ok) {
    console.error('TESZT HIBA: a jóváhagyás nem megfelelő.');
    process.exit(1);
  }
  if (!noDup) {
    console.error('TESZT HIBA: duplikált bejegyzés a második futás után.');
    process.exit(1);
  }
  console.log('TESZT OK: helyes hash, decision=true, nincs duplikáció.');
})();
