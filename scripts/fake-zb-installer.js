// A ZombieBuddy telepítő (installer.go) kérdéssorát utánzó szimulátor.
// A launcher prompt-felismerésének és válaszadásának teszteléséhez.
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const lines = readline.createInterface({ input: process.stdin });
const queue = [];

lines.on('line', (l) => queue.push(l));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function ask(question) {
  process.stdout.write(question);
  return new Promise(async (resolve) => {
    while (queue.length === 0) await sleep(25);
    resolve(String(queue.shift()).toLowerCase().trim());
  });
}

function print(...args) {
  console.log(...args);
}

(async () => {
  print('ZombieBuddy Windows Installer v4.4');
  print('-------------------------------');

  const action = await ask('\nWhat can I do you for?\n  1) Install ZombieBuddy\n  2) Uninstall ZombieBuddy\n  3) Nothing, thanks!\n\nAny system changes will be shown for confirmation before they are applied.\nChoose 1, 2, or 3: ');
  if (action !== '1' && action !== 'i' && action !== 'install') {
    print('[!] no action selected');
    print('\nPress Enter to exit...');
    await ask('');
    process.exit(1);
  }

  const mode = await ask('\nWhat launch mode should ZombieBuddy patch?\n  1) Both\n  2) Normal Launch\n  3) Alternate Launch\nChoose 1, 2, or 3: ');
  if (mode !== '2' && mode !== 'n' && mode !== 'normal') {
    print('[!] Error selecting launch targets: unexpected mode ' + mode);
    print('\nInstallation encountered errors. Please review the messages above.');
    print('Press Enter to exit...');
    await ask('');
    process.exit(1);
  }

  const normal = await ask('\nHow should Normal Launch be patched?\n  1) Both\n  2) ProjectZomboid64.json\n  3) Steam launch options\nChoose 1, 2, or 3: ');
  if (normal !== '2' && normal !== 'j' && normal !== 'json') {
    print('[!] Error selecting launch targets: unexpected target ' + normal);
    print('Press Enter to exit...');
    await ask('');
    process.exit(1);
  }

  print('[.] Steam     is at C:\\Program Files (x86)\\Steam');
  print('[.] PZ        is at C:\\Program Files (x86)\\Steam\\steamapps\\common\\ProjectZomboid');
  print('[.] ZB        is at C:\\Program Files (x86)\\Steam\\steamapps\\workshop\\content\\108600\\3619862853 (stable)');

  const confirm = await ask(
    '\nZombieBuddy will make these changes:\n  - copy "ZB\\zbNative.dll"    to "PZ\\"\n  - copy "ZB\\ZombieBuddy.jar" to "PZ\\"\n  - add "-agentlib:zbNative" to "ProjectZomboid64.json"\nContinue? [y/N]: '
  );
  if (confirm !== 'y' && confirm !== 'yes') {
    print('\n[-] Installation cancelled.');
    print('Press Enter to exit...');
    await ask('');
    process.exit(0);
  }

  print('[.] Successfully installed zbNative.dll and ZombieBuddy.jar');
  print('[.] Updated ProjectZomboid64.json for normal launcher mode');
  print('\nInstallation complete! You can now start Steam and launch Project Zomboid.');
  print('Press Enter to exit...');
  rl.close();
  lines.close();
  process.exit(0);
})();
