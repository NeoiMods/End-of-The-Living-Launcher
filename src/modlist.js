const fs = require('fs');
const path = require('path');

// Vanilla main-menu mod list, used only when the player has no default.txt yet.
const DEFAULT_MODLIST = [
  'VERSION = 1,',
  'mods',
  '{',
  'mod = disablewelcome,',
  'mod = ModManager,',
  'mod = modoptions,',
  '}',
  'maps',
  '{',
  '}',
  '',
].join('\n');

function modListFile(zomboidDir) {
  return path.join(zomboidDir, 'mods', 'default.txt');
}

function readModList(zomboidDir) {
  try {
    return fs.readFileSync(modListFile(zomboidDir), 'utf8');
  } catch {
    return null;
  }
}

function listEnabledIds(content) {
  if (!content) return [];
  const ids = [];
  for (const m of content.matchAll(/^\s*mod\s*=\s*([^,\r\n]+)/gm)) ids.push(m[1].trim());
  return ids;
}

function isEnabled(content, id) {
  const wanted = String(id).toLowerCase();
  return listEnabledIds(content).some((x) => x.toLowerCase() === wanted);
}

// Adds missing mod IDs to the mods block without touching anything else.
function ensureEnabled(zomboidDir, ids) {
  const file = modListFile(zomboidDir);
  let content = readModList(zomboidDir);
  const created = content === null;
  if (created) content = DEFAULT_MODLIST;

  const have = new Set(listEnabledIds(content).map((x) => x.toLowerCase()));
  const missing = ids.filter((id) => id && !have.has(String(id).toLowerCase()));
  if (missing.length === 0) return { changed: false, created, added: [] };

  const nl = content.includes('\r\n') ? '\r\n' : '\n';
  const lines = missing.map((id) => `mod = ${id},`);

  const block = /mods\s*\{[\s\S]*?\}/.exec(content);
  if (block) {
    const at = block.index + block[0].length - 1; // position of the closing brace
    const head = content.slice(0, at);
    const tail = content.slice(at);
    const pad = /[\r\n]$/.test(head) ? '' : nl;
    // A meglévő sorok behúzását átvesszük (pl. "    mod = X,").
    const indentMatch = head.match(/([ \t]+)mod\s*=/);
    const indent = indentMatch ? indentMatch[1] : '';
    const blockLines = lines.map((l) => indent + l);
    content = head + pad + blockLines.join(nl) + nl + tail;
  } else if (!created) {
    // Never append a second mods block to a file we do not understand.
    throw new Error(`Ismeretlen formátumú fájl, nem módosítom: ${file}`);
  } else {
    content = content.replace(/\s+$/, '') + nl + nl + 'mods' + nl + '{' + nl + lines.join(nl) + nl + '}' + nl;
  }

  if (!created) {
    try {
      fs.copyFileSync(file, file + '.bak');
    } catch {
      // Backup is best effort; the write below still happens.
    }
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  return { changed: true, created, added: missing };
}

// Kiveszi a megadott mod ID-ket a mods blokkból (a többi sort nem bántja).
function removeEnabled(zomboidDir, ids) {
  const wanted = new Set((ids || []).map((id) => String(id).toLowerCase()));
  if (!wanted.size) return { changed: false, removed: [] };
  const file = modListFile(zomboidDir);
  const content = readModList(zomboidDir);
  if (content === null) return { changed: false, removed: [] };

  const nl = content.includes('\r\n') ? '\r\n' : '\n';
  const removed = [];
  const kept = [];
  for (const line of content.split(/\r?\n/)) {
    const m = /^\s*mod\s*=\s*([^,\s]+)\s*,?\s*$/.exec(line);
    if (m && wanted.has(m[1].trim().toLowerCase())) {
      removed.push(m[1].trim());
      continue;
    }
    kept.push(line);
  }
  if (!removed.length) return { changed: false, removed: [] };

  try {
    fs.copyFileSync(file, file + '.bak');
  } catch {
    // A mentés best effort; az írás így is megtörténik.
  }
  fs.writeFileSync(file, kept.join(nl), 'utf8');
  return { changed: true, removed };
}

module.exports = {
  DEFAULT_MODLIST,
  modListFile,
  readModList,
  listEnabledIds,
  isEnabled,
  ensureEnabled,
  removeEnabled,
};
