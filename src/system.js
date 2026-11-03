const os = require('os');

// A játék JVM heap-je. A szerver modcsomagja nehéz, ezért legalább 8192 MB kell.
const REQUIRED_MB = 8192;
// Ezen felül a Windows + a játék saját memóriájának is maradnia kell helynek.
const COMFORTABLE_TOTAL_GB = 12;

function getMemoryInfo(requiredMb = REQUIRED_MB) {
  const totalGb = os.totalmem() / 1073741824;
  const freeGb = os.freemem() / 1073741824;
  const level =
    totalGb < requiredMb / 1024 ? 'low' : totalGb < COMFORTABLE_TOTAL_GB ? 'ok' : 'good';

  let message = '';
  if (level === 'low') {
    message =
      `A gépeden ${totalGb.toFixed(1)} GB RAM van, de a launcher ${requiredMb} MB heap-et állít be ` +
      `(-Xmx${requiredMb}m). Ez nem biztos, hogy elfut – a játék lefagyhat vagy bezárulhat. ` +
      'Javasolt legalább 16 GB RAM.';
  } else if (level === 'ok') {
    message =
      `A gépeden ${totalGb.toFixed(1)} GB RAM van, a játék ${requiredMb} MB heap-et kap. ` +
      'Ez működhet, de közben ne fusson sok más program.';
  } else {
    message = `A gépeden ${totalGb.toFixed(1)} GB RAM van – a ${requiredMb} MB heap kényelmesen elfér.`;
  }

  return {
    totalGb: Number(totalGb.toFixed(1)),
    freeGb: Number(freeGb.toFixed(1)),
    requiredMb,
    requiredGb: Number((requiredMb / 1024).toFixed(1)),
    level,
    message,
    enough: level !== 'low',
  };
}

module.exports = { REQUIRED_MB, COMFORTABLE_TOTAL_GB, getMemoryInfo };
