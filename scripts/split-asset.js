// Nagy csomagok darabolása a GitHub 100 MB-os fájllimitje miatt.
//
//   node scripts/split-asset.js Master/ETO.zip            (70 MiB-os darabok)
//   node scripts/split-asset.js Master/ETO.zip --size 90  (90 MiB-os darabok)
//
// A kimenet: ETO.zip.part001, ETO.zip.part002, …  — a launcher ezeket letölti
// és sorrendben összefűzi (src/pzo.js → downloadAsset). Az eredeti fájlt nem
// törli, csak a darabokat írja mellé.

const fs = require('fs');
const path = require('path');

const DEFAULT_SIZE_MB = 70;
const MiB = 1024 * 1024;

function parseArgs(argv) {
  const args = { file: '', sizeMb: DEFAULT_SIZE_MB };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--size') {
      args.sizeMb = Number(argv[++i]) || DEFAULT_SIZE_MB;
    } else if (!args.file) {
      args.file = arg;
    }
  }
  return args;
}

function splitFile(file, sizeMb) {
  const total = fs.statSync(file).size;
  const chunk = Math.floor(sizeMb * MiB);
  // Egy darab se legyen 100 MB felett (a GitHub ott utasítja el a feltöltést).
  if (chunk <= 0 || chunk > 95 * MiB) throw new Error('A darabméret 1 és 95 MB között lehet.');

  const count = Math.max(1, Math.ceil(total / chunk));
  const digits = Math.max(3, String(count).length);
  const written = [];

  const src = fs.openSync(file, 'r');
  try {
    for (let i = 0; i < count; i++) {
      const start = i * chunk;
      const length = Math.min(chunk, total - start);
      const partPath = `${file}.part${String(i + 1).padStart(digits, '0')}`;
      const out = fs.openSync(partPath, 'w');
      try {
        const buffer = Buffer.allocUnsafe(Math.min(length, 8 * MiB));
        let done = 0;
        while (done < length) {
          const want = Math.min(buffer.length, length - done);
          const read = fs.readSync(src, buffer, 0, want, start + done);
          if (read <= 0) throw new Error('Váratlan fájlvége: ' + file);
          fs.writeSync(out, buffer, 0, read);
          done += read;
        }
      } finally {
        fs.closeSync(out);
      }
      written.push({ path: partPath, size: length });
      console.log(`  ${path.basename(partPath)}  ${(length / MiB).toFixed(1)} MB`);
    }
  } finally {
    fs.closeSync(src);
  }

  return { total, count, written };
}

function main() {
  const { file, sizeMb } = parseArgs(process.argv.slice(2));
  if (!file) {
    console.error('Használat: node scripts/split-asset.js <fájl> [--size MB]');
    process.exit(1);
  }
  if (!fs.existsSync(file)) {
    console.error('Nincs ilyen fájl: ' + file);
    process.exit(1);
  }

  console.log(`Darabolás: ${file} (${(fs.statSync(file).size / MiB).toFixed(1)} MB, ${sizeMb} MB/darab)`);
  const res = splitFile(file, sizeMb);
  console.log(`✓ ${res.count} darab kész. A launcher ezeket tölti le, ha a zip nincs a repóban.`);
}

if (require.main === module) main();

module.exports = { splitFile };
