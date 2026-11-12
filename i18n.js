// Launcher UI fordítás (HU ↔ EN).
//
// A magyar szöveg a forrás: a szótár kulcsa mindig a magyar mondat (szóközre
// normalizálva), értéke az angol. A dinamikus, számokat tartalmazó sorokat
// sablonként adjuk meg ({n} = szám, {s} = szöveg), így nem kell minden
// előfordulást külön lefordítani.
//
// A statikus HTML-t és a JS-ből érkező szöveget is ez a modul fordítja: a
// `applyLanguage()` végigmegy a DOM-on, a MutationObserver pedig a később
// beszúrt szöveget (napló, állapot, ellenőrző lista) fordítja le azonnal.

(function () {
  const EN = {
    // ---- fejléc / általános ----
    'OPTIMALIZÁLÁS': 'OPTIMIZE',
    'Beállítások': 'Settings',
    'SZERVER': 'SERVER',
    'Szerver állapot ellenőrzése…': 'Checking server status…',
    'Összeomlott a játék': 'The game crashed',
    'Küldd el nekünk a logot – megnézzük, mi okozta.': 'Send us the log – we will look into it.',
    'LOG KÜLDÉSE': 'SEND LOG',
    'JÁTÉK INDÍTÁSA': 'LAUNCH GAME',
    'ELLENŐRZÉS': 'CHECK',
    'ELLENŐRZÉS – BLACKOUT': 'CHECK – BLACKOUT',
    'MODOK TELEPÍTÉSE / FRISSÍTÉSE': 'INSTALL / UPDATE MODS',
    'Frissítés': 'Update',
    'Kollekció frissítése': 'Refresh collection',
    'Feliratkozás': 'Subscribe',
    'Mod mappa': 'Mods folder',
    'Mod lista': 'Mod list',
    'Játék keresése': 'Find game',
    'Launcher verzió': 'Launcher version',
    'NAPLÓ': 'LOG',
    'ESEMÉNY': 'EVENT',
    'ÚJDONSÁGOK': 'NEWS',
    'ESEMÉNYIG': 'UNTIL EVENT',
    'törlés': 'clear',
    'élő widget': 'live widget',
    'Csatlakozás a Discordra': 'Join the Discord',
    'Esemény betöltése…': 'Loading event…',
    'Esemény frissítése': 'Refresh event',
    'Részletek': 'Details',
    'Betöltés…': 'Loading…',
    'Mind': 'All',
    'Bekapcsolt': 'Enabled',
    'Kikapcsolt': 'Disabled',
    'Újraolvasás': 'Reload',
    'Hiányzók törlése': 'Remove missing',
    'Név': 'Name',
    'Forrás': 'Source',
    'Állapot': 'Status',
    'Bezárás': 'Close',
    'Mentés': 'Save',
    'Mégse': 'Cancel',
    'Böngészés…': 'Browse…',
    'Tallózás…': 'Browse…',
    'Újrakeresés': 'Search again',
    'BEZÁRÁS': 'CLOSE',
    'Később': 'Later',
    'OK – FRISSÍTS': 'OK – UPDATE',
    'Újdonságok': 'What’s new',
    'OK': 'OK',
    'Előkészítés…': 'Preparing…',
    'Steam: fut': 'Steam: running',
    'Steam: áll': 'Steam: stopped',
    'SINGLE-PLAYER': 'SINGLE-PLAYER',
    'MULTIPLAYER': 'MULTIPLAYER',
    'TEST PHASE': 'TEST PHASE',
    'EGYJÁTÉKOS MÓD': 'SINGLE-PLAYER',
    'EGYJÁTÉKOS MODPACK': 'SINGLE-PLAYER MODPACK',
    'BLACKOUT PROTOCOL – NEW ERA': 'BLACKOUT PROTOCOL – NEW ERA',
    'THE FORGOTTEN': 'THE FORGOTTEN',

    // ---- beállítások ----
    'Project Zomboid mappája': 'Project Zomboid folder',
    'Szerver neve': 'Server name',
    'Szerver címe': 'Server address',
    'Port': 'Port',
    'Jelszó': 'Password',
    'Steam Workshop kollekció ID': 'Steam Workshop collection ID',
    'JVM heap (MB)': 'JVM heap (MB)',
    'RAM ellenőrzés': 'RAM check',
    'Parancsikon létrehozása az asztalra (ikonnal)': 'Create a desktop shortcut (with icon)',
    'Frissítés forrás (GitHub repo)': 'Update source (GitHub repo)',
    'Események forrása (events.json URL vagy repo)': 'Events source (events.json URL or repo)',
    'Csomagok repója (modok / optimalizáló)': 'Packs repository (mods / optimizer)',
    'GitHub token (csak privát repóhoz)': 'GitHub token (private repos only)',
    'Állapot betöltése…': 'Loading status…',
    'Ellenőrzés most': 'Check now',
    'Frissítés telepítése': 'Install update',
    'Üres = automatikus keresés (Steam)': 'Empty = automatic search (Steam)',
    'Üres, ha nincs jelszó': 'Empty if there is no password',
    'Üres = a fenti repo /events.json': 'Empty = /events.json in the repo above',
    'opcionális, gh…': 'optional, gh…',
    'pl. NeoiMods/EOTL-Packs': 'e.g. NeoiMods/EOTL-Packs',
    'Keresés név vagy mod ID szerint…': 'Search by name or mod ID…',
    'pl. shadow_peter': 'e.g. shadow_peter',

    // ---- ellenőrző lista ----
    'Project Zomboid': 'Project Zomboid',
    'ZombieBuddy': 'ZombieBuddy',
    'PZO Launcher': 'PZO Launcher',
    'Blackout kollekció': 'Blackout collection',
    'Blackout modok engedélyezve': 'Blackout mods enabled',
    'Modpack config': 'Modpack config',
    'Memória': 'Memory',
    'Mod kollekció': 'Mod collection',
    'Modok engedélyezve': 'Mods enabled',
    'Steam': 'Steam',
    'Nem található – kattints a Játék keresése gombra': 'Not found – click Find game',
    'Nincs telepítve – kattints a MODOK TELEPÍTÉSE gombra': 'Not installed – click INSTALL / UPDATE MODS',
    'A mod mappa megvan, de a játék mappában hiányoznak a fájlok (JAR + DLL)': 'The mod folder exists, but the JAR + DLL are missing from the game folder',
    'A játék mappa rendben, de a mod nincs a Zomboid\\mods mappában': 'The game folder is fine, but the mod is missing from Zomboid\\mods',
    'Opcionális – az Optimalizálás fülön telepíthető': 'Optional – install it on the Optimize tab',
    'A kollekció még nincs betöltve – nyomd meg a „Kollekció frissítése” gombot': 'The collection is not loaded yet – press “Refresh collection”',
    'A modok még nincsenek engedélyezve': 'The mods are not enabled yet',
    'A modok még nincsenek engedélyezve – a launcher a játék indításakor állítja be őket': 'The mods are not enabled yet – the launcher sets them up when you launch the game',
    'A JÁTÉK INDÍTÁSA előtt a launcher bemásolja a modpack config csomagját a játékba': 'The launcher copies the modpack config into the game before you launch it',
    'A launcherből hiányzik a config csomag – telepítsd újra a launchert': 'The config pack is missing from the launcher – reinstall it',
    'A Steam nem fut – indítsd el, mielőtt játszol': 'Steam is not running – start it before you play',
    'Még nincs letöltve a kollekció – kattints a MODOK TELEPÍTÉSE gombra': 'The collection is not downloaded yet – click INSTALL / UPDATE MODS',
    'Még nem telepítettünk modot': 'No mods installed yet',
    'A modpack még nincs letöltve': 'The modpack is not downloaded yet',
    'Telepítve – PZOptimEngine.jar a játék mappában': 'Installed – PZOptimEngine.jar in the game folder',
    'Telepítve: JAR + DLL + mod mappa': 'Installed: JAR + DLL + mod folder',
    'A játék már fut.': 'The game is already running.',
    'Előbb telepítsd fel a játékot vagy állítsd be a mappáját.': 'Install the game or set its folder first.',
    'Nincs szerver cím – Beállítások.': 'No server address – Settings.',
    'Egyjátékos mód: a játék a főmenübe indul, a Blackout mentést a játékban indítsd.': 'Single-player: the game opens on the main menu – start the Blackout save in-game.',
    'Memória: elfogadható': 'Memory: acceptable',
    'Memória: rendben': 'Memory: fine',
    '⚠ Kevés a memória': '⚠ Low memory',
    'A játék ${heapMb} MB heap-et kap.': 'The game gets ${heapMb} MB of heap.',
    'nincs verzió': 'no version',
    'még nem ellenőrizte': 'not checked yet',
    'naprakész': 'up to date',
    'nem elérhető': 'unavailable',
    'nem válaszol': 'not responding',
    'nincs beállítva': 'not set',
    'elérhető': 'available',

    // ---- optimalizálás ----
    'Optimalizálás': 'Optimization',
    'Állítsd be a launchert a gépedhez. A halvány kártyák még fejlesztés alatt állnak.': 'Tune the launcher to your machine. Faded cards are still under development.',
    'A PZO motor telepítése a játékhoz (Master mappa)': 'Install the PZO engine for the game (Master folder)',
    'TELEPÍTÉS': 'INSTALL',
    'LETÖLTÉS': 'DOWNLOAD',
    'TÖRLÉS': 'DELETE',
    'MEGVAN': 'DONE',
    'MŰKÖDIK': 'ACTIVE',
    'HAMAROSAN': 'SOON',
    'TELEPÍTVE': 'INSTALLED',
    'ETO – alap': 'ETO – base',
    'ETO – Max Performance': 'ETO – Max Performance',
    'Szebb textúrák, jobb FPS – az ETO másik változatát lecseréli': 'Nicer textures, better FPS – replaces the other ETO variant',
    'Maximum FPS egyszerűbb textúrákkal – a másik ETO-t lecseréli': 'Maximum FPS with simpler textures – replaces the other ETO',
    'Viewpoint NIGHTLY': 'Viewpoint NIGHTLY',
    'A gyűjtemény régi Viewpointja helyett – éjszakai build a Master mappából': 'Instead of the collection’s old Viewpoint – nightly build from the Master folder',
    'RAM / JVM heap': 'RAM / JVM heap',
    'Memória beállítása a Beállításokban': 'Set memory in Settings',
    'Gyorsítótár tisztítása': 'Clear cache',
    'Elavult játék- és mod cache törlése': 'Delete stale game and mod caches',
    'Konzol engedélyezése': 'Enable console',
    'Hibakereső konzol a játékban': 'Debug console in the game',
    'MODELLEK': 'MODELS',
    'Opcionális segédmod – FPS/TPS nézetekhez': 'Optional helper mod – FPS/TPS views',
    '6282 3D modell': '6282 3D models',
    'Viewpoint 3D modellek a ZombieBuddyhoz – opcionális': 'Viewpoint 3D models for ZombieBuddy – optional',
    'Magyarítás': 'Hungarian translation',
    'Projekt A-Life + Survivor PDA + gyári szövegek – opcionális': 'Project A-Life + Survivor PDA + base game texts – optional',
    'A letöltött modellek megnyitása': 'Open the downloaded models',
    'Modellek / csomagok': 'Models / packs',
    'Zip letöltése és kicsomagolása a repóból': 'Download and unpack a zip from the repository',
    'Telepítve – a Viewpoint modellek már a mod mappában vannak': 'Installed – the Viewpoint models are already in the mod folder',
    'Telepítve – a magyar szövegek be vannak kapcsolva': 'Installed – the Hungarian texts are enabled',
    'Telepítve – a textúrák már cserélve vannak': 'Installed – the textures are already replaced',

    // ---- modálisok ----
    'ZombieBuddy letöltése': 'Download ZombieBuddy',
    'Ez egy': 'This is an',
    'opcionális': 'optional',
    'kliensoldali segédmod. Telepítés előtt olvasd el, mit ad:': 'client-side helper mod. Read what it adds before installing:',
    'FPS / TPS nézetek': 'FPS / TPS views',
    '– belső és külső kameraállás, szabad nézet és teljesítmény-kijelző a játékban.': '– first- and third-person camera, free look and a performance overlay in-game.',
    'Motor szintű hozzáférés': 'Engine-level access',
    '– a mod a játék DLL-jébe épül be, ezért a launcher a': '– the mod hooks into the game DLL, so the launcher also rewrites',
    '-t is átírja.': '.',
    'Minimum 8 GB RAM': 'At least 8 GB RAM',
    '– ennél kevesebbel a mod nem javasolt (nálad:': '– below that the mod is not recommended (you have:',
    'Ha később meggondolnád, az': 'If you change your mind later,',
    'újrafuttatásával eltávolítható (2 – Uninstall).': 'can be re-run to remove it (2 – Uninstall).',
    'Letöltés és telepítés': 'Download and install',
    'Project Zomboid keresése': 'Find Project Zomboid',
    'Végignézzük a Steam könyvtárakat és az összes meghajtót. A kiválasztott mappába települ minden: modok, PZO motor, 3D modellek, ZombieBuddy.': 'We scan the Steam libraries and every drive. Everything installs into the folder you pick: mods, PZO engine, 3D models, ZombieBuddy.',
    'Új verzió érhető el': 'A new version is available',
    'A launcher most frissül. A csere után a launcher automatikusan újraindul.': 'The launcher is about to update. It restarts automatically after the swap.',
    'Frissült a launcher – ezek változtak:': 'The launcher was updated – these changed:',
    'Összeomlás észlelve': 'Crash detected',
    'A játék összeomlott. A folytatáshoz': 'The game crashed. To continue you',
    'el kell küldened a logot': 'must send the log',
    'és meg kell adnod a Discord nevedet – ez nem opcionális, enélkül nem tudunk mit kezdeni a hibával.': 'and give your Discord name – this is not optional, without it we cannot act on the error.',
    'Miért kötelező?': 'Why is it required?',
    'Mert a „nem működik, valami hiba van” megjegyzésből nem derül ki, mi történt, és abból nem tudunk javítani. A crash log fájlból viszont pontosan látjuk a hibát, így meg tudjuk oldani – a neved pedig ahhoz kell, hogy vissza tudjunk jelezni neked.': 'Because “it does not work, something is wrong” does not tell us what happened, and we cannot fix that. The crash log shows the exact error, so we can solve it – and your name lets us get back to you.',
    'Discord neved (kötelező – így tudjuk, kitől jött a log)': 'Your Discord name (required – so we know who sent the log)',
    'A csatornára csak a log fájlok, a Discord neved és a launcher verziója kerül. Ha a küldés hálózati hiba miatt nem megy át, a gomb újrapróbálható, és csak ilyenkor jelenik meg a kilépés lehetősége.': 'Only the log files, your Discord name and the launcher version are sent. If sending fails because of a network error, the button can be retried – only then does the exit option appear.',
    'Kilépés küldés nélkül': 'Exit without sending',
    'LOG ELKÜLDÉSE': 'SEND LOG',
    'Ez a modpack': 'This modpack is',
    'hatalmas': 'huge',
    '847 item': '847 items',
    'és közel': 'and nearly',
    '800+ mod': '800+ mods',
    '. A letöltése sok időt vesz igénybe, és internetkapcsolatonként eltérő – az első indítás akár órákig is eltarthat.': '. Downloading takes a long time and varies by connection – the first launch can take hours.',
    'Első alkalommal': 'The first time',
    'a launcher feliratkozik a teljes Steam kollekcióra (3814595736), kivárja a letöltést, engedélyezi a modokat, majd bemásolja a modpack config fájlját a játékba.': 'the launcher subscribes to the whole Steam collection (3814595736), waits for the download, enables the mods and copies the modpack config into the game.',
    'A játék nem indul el magától:': 'The game does not start by itself:',
    'a mód átvált, utána a JÁTÉK INDÍTÁSA gombra kattintva indul a főmenübe.': 'the mode switches, then LAUNCH GAME takes you to the main menu.',
    'Visszaváltás:': 'Switching back:',
    'a MULTIPLAYER gombbal minden visszaáll az End of The Living szerver beállításaira.': 'the MULTIPLAYER button restores the End of The Living server settings.',
    'Ne mutasd többet ezt a figyelmeztetést': 'Do not show this warning again',
    'ÉRTETTEM': 'GOT IT',

    // ---- napló / állapotüzenetek ----
    'End of The Living Launcher elindítva.': 'End of The Living Launcher started.',
    'Böngészős előnézet – a launcher funkciói az asztali változatban élnek.': 'Browser preview – the launcher features live in the desktop (Electron) build.',
    'A launcher feliratkozik a teljes Steam kollekcióra, kivárja a letöltést, engedélyezi a modokat, lefuttatja a ZombieBuddy telepítőt, majd elindítja a játékot a főmenübe – a szerverre a játékban csatlakozz.': 'The launcher subscribes to the whole Steam collection, waits for the download, enables the mods, runs the ZombieBuddy installer and then launches the game to the main menu – join the server in-game.',
    'A launcher feliratkozik a Blackout Protocol kollekcióra (3814595736), kivárja a 800+ mod letöltését, engedélyezi őket, bemásolja a modpack config fájlját, majd a játék a főmenübe indul – a mentést a játékban indítsd.': 'The launcher subscribes to the Blackout Protocol collection (3814595736), waits for the 800+ mods to download, enables them, copies the modpack config into the game and then opens the main menu – start the save in-game.',
    'a 800+ mod letöltését, engedélyezi őket, bemásolja a modpack config fájlját, ': 'waits for the 800+ mods to download, enables them, copies the modpack config, ',
    'majd a játék a főmenübe indul – a mentést a játékban indítsd.': 'then the game opens the main menu – start the save in-game.',
    '→ válasz: "1"': '→ response: "1"',
    'Böngészős előnézet — a launcher funkciói az asztali (Electron) változatban élnek.': 'Browser preview — the launcher features live in the desktop (Electron) build.',
    'Nem sikerült kiolvasni a mod listát: ismeretlen hiba': 'Could not read the mod list: unknown error',
    'A játék már fut.': 'The game is already running.',
    'Böngészős előnézet – a frissítéskezelés az asztali változatban él.': 'Browser preview – update handling lives in the desktop build.',
    '• Böngészős előnézet: a játék indítása az asztali változatban működik.': '• Browser preview: launching the game works in the desktop build.',
    '• Böngészős előnézet: a telepítés az asztali változatban működik.': '• Browser preview: installing works in the desktop build.',
    '✓ Beállítások elmentve.': '✓ Settings saved.',
    '• Crash log kihagyva – a következő indításnál újra felajánljuk.': '• Crash log skipped – we will offer it again on the next start.',
    '• Frissítés későbbre hagyva – a Frissítés gombbal bármikor indítható.': '• Update postponed – start it any time with the Update button.',
    '• Frissítési forrás módosítva – ellenőrzés…': '• Update source changed – checking…',
    '• Visszaváltás: End of The Living szerver.': '• Switched back: End of The Living server.',
    '• Egyjátékos mód: Blackout Protocol – New Era (847 item, 800+ mod).': '• Single-player mode: Blackout Protocol – New Era (847 items, 800+ mods).',
    'Ellenőrzés a GitHubon…': 'Checking GitHub…',
    'Frissítés letöltése és telepítése…': 'Downloading and installing the update…',
    'Kész – a launcher újraindul…': 'Done – the launcher is restarting…',
    'Kész – nincs cserélendő fájl.': 'Done – nothing to replace.',
    'Minden csomag naprakész.': 'All packs are up to date.',
    'Küldés…': 'Sending…',
    'Újrapróbálom': 'Retrying',
    'MEGA FRISSÍTÉS': 'MEGA UPDATE',
    'ÚJDONSÁG': 'NEW',
    'Válassz egy mappát: onnantól a modok és minden telepítő oda kerül.': 'Pick a folder: from then on mods and every installer go there.',
    'Nem találtam Project Zomboidot a szokásos helyeken. Tallózással válaszd ki a ProjectZomboid64.exe mappáját.': 'I could not find Project Zomboid in the usual places. Browse to the folder with ProjectZomboid64.exe.',
    'Keresés a Steam könyvtárakban és a meghajtókon… (pár másodperc)': 'Searching Steam libraries and drives… (a few seconds)',
    'Nincs a szűrésnek megfelelő mod.': 'No mod matches the filter.',
    'Nincs hiányzó sor – a mod lista rendben van.': 'No missing rows – the mod list is fine.',
    'Nem sikerült kiolvasni a mod listát: ': 'Could not read the mod list: ',
    'Nincs aktív esemény': 'No active event',
    'Ezek történtek mostanában:': 'This happened recently:',
    'Amint feltöltünk egyet a GitHubra, itt megjelenik.': 'As soon as we upload one to GitHub it appears here.',
    'Amint feltöltünk valamit a GitHubra (news.json), itt megjelenik.': 'As soon as we upload something to GitHub (news.json) it appears here.',
    'Az újdonságok most nem érhetők el (': 'News is unavailable right now (',
    'Esemény betöltése sikertelen.': 'Could not load the event.',
    'Hiba a keresés közben: ': 'Search failed: ',
    'Nem sikerült beállítani ezt a mappát.': 'Could not set this folder.',
    'Nem sikerült: ': 'Failed: ',
    'A küldés nem sikerült: ': 'Sending failed: ',
    'Írd be a Discord nevedet – ennél sem tudjuk, kitől jött a log.': 'Enter your Discord name – without it we do not know who sent the log.',
    'A log elküldése kötelező – enélkül nem tudjuk kijavítani az összeomlást.': 'Sending the log is required – without it we cannot fix the crash.',
    'A log elküldése kötelező – csak így tudjuk kijavítani a hibát.': 'Sending the log is required – that is the only way we can fix it.',
    'Összeomlott a játék – küldd el a logot': 'The game crashed – send the log',
    '• Nem találtam elküldhető logot (hs_err / console.txt / Logs).': '• No log to send (hs_err / console.txt / Logs).',
    'Steam letöltés folyamatban…': 'Steam download in progress…',
    'ÁTVÁLTÁS': 'SWITCHING',
    'Állapot ellenőrzése…': 'Checking status…',
    'Töltőcsík a csomagokhoz': 'Progress bar for the packs',
    'Log küldése a szervernek': 'Send the log to the server',
    'Új verzió ablak OK gombbal': 'New version dialog with an OK button',
    'Újdonságok fül': 'News tab',
    'Új frissítés-ablak, újdonságok fül és töltőcsík.': 'New update dialog, news tab and progress bar.',
    'Magyarítás (A-Life + Survivor PDA + gyári)': 'Hungarian translation (A-Life + Survivor PDA + base game)',
    'Példa Játékos': 'Example Player',
    'Műhely-éjszaka a The Forgotten szerveren': 'Workshop night on the The Forgotten server',
    'Közös túlélés: a csapat 20:00-tól gyülekezik a szerveren. Aki hozott magával üzemanyagot és szerszámot, kap egy extra ellátmánydobozt a raktárból.': 'Survive together: the crew gathers on the server from 20:00. Whoever brings fuel and tools gets an extra supply crate from the warehouse.',
    'KÖVETKEZŐ ESEMÉNY': 'NEXT EVENT',
    'A Discord widget most nem érhető el.': 'The Discord widget is unavailable right now.',
    'Most nincs bent senki – gyere te elsőnek.': 'Nobody is online right now – be the first.',
    'Widget betöltése…': 'Loading widget…',
    '0.7 – ez a legelső kiadás': '0.7 – the very first release',
    'Kollekció: The Forgotten – 113 mod.': 'Collection: The Forgotten – 113 mods.',

    // ---- napló: technikai sorok ----
    '✓ 113 mod engedélyezve a játék listájában.': '✓ 113 mods enabled in the game list.',
    '✓ 113/113 mod letöltve a Steam Workshophoz': '✓ 113/113 mods downloaded for the Steam Workshop',
    '✓ Crash log elküldve a szervernek (': '✓ Crash log sent to the server (',
    '✓ PZO Launcher kicsomagolva – a telepítő konzolban fut tovább.': '✓ PZO Launcher unpacked – the installer continues in the console.',
    '— ZombieBuddy telepítő futtatása —': '— Running the ZombieBuddy installer —',
    '• Az új mappába a MODOK TELEPÍTÉSE / FRISSÍTÉSE gombbal telepíthetsz mindent (és az Optimalizálás fülön a PZO motort).': '• Use INSTALL / UPDATE MODS to install everything into the new folder (and the PZO engine on the Optimize tab).',
    'A játék már fut.': 'The game is already running.',
    'tétlen': 'idle',
  };

  // Sablonok: {n} = szám, {s} = szöveg (mod név, útvonal, stb.)
  const TPL = [
    ['{n} mod engedélyezve', '{n} mods enabled'],
    ['pz_modlist_settings.cfg a játékban – {n} mod engedélyezve, sandbox preset és billentyűk bemásolva', 'pz_modlist_settings.cfg in the game – {n} mods enabled, sandbox preset and keybinds copied'],
    ['{n}/{n} mod letöltve a Blackout kollekcióból', '{n}/{n} mods downloaded from the Blackout collection'],
    ['{n} mod aktív a default.txt-ben, {n} hiányzik a(z) „{s}” profilból – a játék indításakor pótolja', '{n} mods active in default.txt, {n} missing from the “{s}” profile – they are added when the game launches'],
    ['{n} mod aktív a(z) „{s}” profil szerint', '{n} mods active according to the “{s}” profile'],
    ['Hiányzik a configból: {s} – a launcher a játék indításakor pótolja', 'Missing from the config: {s} – the launcher adds it when the game launches'],
    ['{n}/{n} mod letöltve a Steam Workshophoz', '{n}/{n} mods downloaded for the Steam Workshop'],
    ['{n} mod aktív a default.txt listában', '{n} mods active in the default.txt list'],
    ['Hiányzik a listából: {s}', 'Missing from the list: {s}'],
    ['{n} GB RAM – 16 GB alatt kötelező, az Optimalizálás fülön telepíthető', '{n} GB RAM – required below 16 GB, install it on the Optimize tab'],
    ['{n} GB RAM – kevés a {n} MB heap-hez! Elfordulhat lefagyás.', '{n} GB RAM – too little for a {n} MB heap! Freezes are possible.'],
    ['{n} GB RAM – kevés a {n} MB heap-hez! Előfordulhat lefagyás.', '{n} GB RAM – too little for a {n} MB heap! Freezes are possible.'],
    ['{n} GB RAM • játék heap: -Xmx{n}m ({s} GB){s}', '{n} GB RAM • game heap: -Xmx{n}m ({s} GB){s}'],
    ['Jelszó: {s}', 'Password: {s}'],
    ['{n}/{n} játékos • {n} ms', '{n}/{n} players • {n} ms'],
    ['{n}/{n} játékos', '{n}/{n} players'],
    ['Most beállítva: {s} – ez NEM az alap hely, ezért jön a kritikus figyelmeztetés.', 'Currently set: {s} – this is NOT the default location, hence the critical warning'],
    ['Most beállítva: {s} – ez az alap hely, minden rendben.', 'Currently set: {s} – this is the default location, all good'],
    ['Opcionális – {s} GB RAM van, a modellekhez {s} GB kell', 'Optional – you have {s} GB RAM, the models need {s} GB'],
    ['Opcionális – {s} GB RAM van, a modhoz {s} GB kell', 'Optional – you have {s} GB RAM, the mod needs {s} GB'],
    ['Telepítve: JAR + DLL + mod mappa{s}', 'Installed: JAR + DLL + mod folder{s}'],
    ['Telepítve{s} – a gyűjtemény Viewpointja helyett ez fut', 'Installed{s} – this runs instead of the collection’s Viewpoint'],
    ['Steam kollekció {s}', 'Steam collection {s}'],
    ['Bekapcsolt és megvan: {n} · Hiányzó: {n} · {s}', 'Enabled and present: {n} · Missing: {n} · {s}'],
    ['Bekapcsolva: {n} · Telepítve: {n} · {s}', 'Enabled: {n} · Installed: {n} · {s}'],
    ['{s} – a log elküldése kötelező, hogy ki tudjuk javítani az összeomlást.', '{s} – sending the log is required so we can fix the crash.'],
    ['{n} bekapcsolt sor mutat olyan modra, ami nincs a gépen (régi kollekció maradéka).', '{n} enabled rows point to mods that are not on this machine (leftovers from an old collection).'],
    ['Launcher v{s} – ezek változtak:', 'Launcher v{s} – these changed:'],
    ['Új verzió érhető el: #{s}', 'A new version is available: #{s}'],
    ['Forrás: {s} • utolsó ellenőrzés: {s}', 'Source: {s} • last checked: {s}'],
    ['Naprakész • forrás: {s}', 'Up to date • source: {s}'],
    ['{s} • legutóbbi commit: {s}', '{s} • latest commit: {s}'],
    ['{s} • forrás: {s}', '{s} • source: {s}'],
    ['Nem sikerült kiolvasni a mod listát: {s}', 'Could not read the mod list: {s}'],
    ['Nem sikerült: {s}', 'Failed: {s}'],
    ['A küldés nem sikerült: {s}', 'Sending failed: {s}'],
    ['Hiba a keresés közben: {s}', 'Search failed: {s}'],
    ['✗ Állapot lekérdezési hiba: {s}', '✗ Status query failed: {s}'],
    ['✗ Frissítés: {s}', '✗ Update: {s}'],
    ['⚠ ZombieBuddy: legalább {s} GB RAM kell (nálad {s} GB).', '⚠ ZombieBuddy: at least {s} GB RAM is needed (you have {s} GB).'],
    ['⚠ 6282 3D modell: legalább {s} GB RAM kell (nálad {s} GB).', '⚠ 6282 3D models: at least {s} GB RAM is needed (you have {s} GB).'],
    ['Crash log elküldve a szervernek ({s})', 'Crash log sent to the server ({s})'],
    ['Törlöd: {s}?', 'Delete: {s}?'],
    ['• telepítő kész', '• installer ready'],
    ['Böngészős előnézet {s} a launcher funkciói az asztali (Electron) változatban élnek.', 'Browser preview {s} the launcher features live in the desktop (Electron) build.'],
    ['A játék {n} MB heap-et kap.', 'The game gets {n} MB of heap.'],
    ['Steam letöltés folyamatban… ({n}/{n})', 'Steam download in progress… ({n}/{n})'],
    ['{s} – próbáld újra.', '{s} – try again.'],
  ];

  const norm = (s) => String(s).replace(/\s+/g, ' ').trim();

  // A magyar sablonból reguláris kifejezés: {n} = szám, {s} = bármi.
  function compile(list) {
    return list.map(([hu, en]) => {
    const parts = hu.split(/(\{n\}|\{s\})/);
    let re = '^';
    const order = [];
    for (const part of parts) {
      if (part === '{n}') {
        re += '(-?\\d[\\d.,]*)';
        order.push('n');
      } else if (part === '{s}') {
        // A szöveg lehet üres is (pl. a sor végén álló opcionális toldalék).
        re += '([\\s\\S]*?)';
        order.push('s');
      } else {
        re += part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
    }
      re += '$';
      return { re: new RegExp(re), en, order };
    });
  }

  let compiled = compile(TPL);

  function translate(text) {
    const raw = String(text);
    if (lang === 'hu') return raw;
    const key = norm(raw);
    if (!key) return raw;
    if (Object.prototype.hasOwnProperty.call(EN, key)) return EN[key];

    for (const t of compiled) {
      const m = t.re.exec(key);
      if (!m) continue;
      let i = 0;
      const out = t.en.replace(/\{(n|s)\}/g, (_m, kind) => {
        const value = m[++i];
        if (value === undefined) return '';
        // A beágyazott szöveget (pl. „ • telepítő kész”, profilnév) is lefordítjuk.
        return kind === 's' ? translate(value) : value;
      });
      return out;
    }
    return raw;
  }

  let lang = 'hu';
  try {
    const saved = localStorage.getItem('eotl.lang');
    if (saved === 'en' || saved === 'hu') lang = saved;
  } catch {
    // Ha a tároló nem elérhető, magyar marad.
  }

  // ---- DOM fordítás -------------------------------------------------------
  // A magyar eredetit a csomóponton tároljuk, így visszaváltáskor nem kell
  // újrarenderelni az oldalt.

  function splitPad(value) {
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(value);
    return m ? { pre: m[1], body: m[2], post: m[3] } : { pre: '', body: value, post: '' };
  }

  function translateTextNode(node) {
    if (node.__hu === undefined) node.__hu = node.nodeValue;
    const { pre, body, post } = splitPad(node.__hu);
    if (!body.trim()) return;
    const out = lang === 'hu' ? body : translate(body);
    if (node.nodeValue !== pre + out + post) node.nodeValue = pre + out + post;
  }

  function translateElement(el) {
    if (el.nodeType !== 1) return;
    if (el.hasAttribute('placeholder')) {
      if (el.__huPlaceholder === undefined) el.__huPlaceholder = el.getAttribute('placeholder');
      el.setAttribute('placeholder', lang === 'hu' ? el.__huPlaceholder : translate(el.__huPlaceholder));
    }
    if (el.hasAttribute('title')) {
      if (el.__huTitle === undefined) el.__huTitle = el.getAttribute('title');
      el.setAttribute('title', lang === 'hu' ? el.__huTitle : translate(el.__huTitle));
    }
    if (el.tagName === 'OPTION' && el.__hu === undefined) el.__hu = el.textContent;
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      translateTextNode(root);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    translateElement(root);
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node = tw.nextNode();
    while (node) {
      if (node.nodeType === 3) translateTextNode(node);
      else translateElement(node);
      node = tw.nextNode();
    }
  }

  let observer = null;
  function startObserver() {
    if (observer || typeof MutationObserver === 'undefined') return;
    observer = new MutationObserver((records) => {
      if (lang === 'hu') return;
      for (const rec of records) {
        if (rec.type === 'characterData') translateTextNode(rec.target);
        else if (rec.type === 'childList') {
          for (const n of rec.addedNodes) walk(n);
          translateElement(rec.target);
        }
      }
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  function setDocumentLang() {
    try {
      document.documentElement.setAttribute('lang', lang);
    } catch {
      // nem kritikus
    }
  }

  function applyLanguage() {
    setDocumentLang();
    walk(document.body);
    if (lang === 'en') startObserver();
  }

  function setLanguage(next) {
    lang = next === 'en' ? 'en' : 'hu';
    try {
      localStorage.setItem('eotl.lang', lang);
    } catch {
      // Ha nem menthető, csak erre a futásra él.
    }
    applyLanguage();
  }

  window.eotlI18n = {
    get lang() {
      return lang;
    },
    translate,
    // Később betöltött szótárak (hírek, napló) bővíthetik a fordítást.
    addEntries(extra) {
      Object.assign(EN, extra || {});
      if (lang === 'en') applyLanguage();
    },
    addTemplates(extra) {
      const added = (extra || []).filter(Boolean);
      if (!added.length) return;
      compiled = compiled.concat(compile(added));
      if (lang === 'en') applyLanguage();
    },
    setLanguage,
    applyLanguage,
    isEnglish: () => lang === 'en',
  };

  // A statikus HTML-t már betöltéskor lefordítjuk, ha angol a beállítás.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLanguage());
  } else {
    applyLanguage();
  }
})();
