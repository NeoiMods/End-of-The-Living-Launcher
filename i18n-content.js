// Tartalmi fordítások: az Újdonságok bejegyzései, Discord állapotcímkék.
// A napló szövegeit az i18n-logs.js tartalmazza.

(function () {
  const i18n = window.eotlI18n;
  if (!i18n) return;

  i18n.addEntries({
    'elérhető': 'online',
    'tétlen': 'idle',
    'elfoglalt': 'do not disturb',
    '– tétlen': '– idle',
    'Widget betöltése…': 'Loading widget…',

    // ---- előnézeti minta (csak böngészős preview) ----
    '0.7 – Blackout Protocol hírek': '0.7 – Blackout Protocol news',
    'Ebben a hírfolyamban a modpack változásai vannak.': 'This feed holds the modpack changes.',

    // ---- 0.9.17 (Viewpoint NIGHTLY) ----
    '0.9.17 – A Viewpoint NIGHTLY most már tényleg betöltődik':
      '0.9.17 – The Viewpoint NIGHTLY actually loads now',
    'A NIGHTLY eddig a Zomboid\\Workshop mappába került, amit a játék nem tölt be, ezért sokaknál nem csinált semmit. Mostantól a játék saját mod mappájába települ (Zomboid\\mods\\Viewpoint), így a 42-es verziómappával együtt rendesen betöltődik – és a kicsomagolás a backslash-es zip-ekkel is működik. Ha valakinél véletlenül bent van az eredeti Project Viewpoint, az nem kapcsolódik be mellé, sem a Blackout Protocolban, sem az End of The Livingben: a launcher kiveszi a listából, a workshop példányt pedig törli, ha lehet.':
      'Until now the NIGHTLY went into the Zomboid\\Workshop folder, which the game does not load, so for many people it did nothing. It now installs into the game’s own mod folder (Zomboid\\mods\\Viewpoint), so it loads properly with its 42 version folder – and unpacking works with zips that use backslashes too. If the original Project Viewpoint happens to be present, it will not load next to it, in the Blackout Protocol or in End of The Living: the launcher removes it from the list and deletes the workshop copy where it can.',
    'A NIGHTLY helye: Zomboid\\mods\\Viewpoint (eddig Zomboid\\Workshop\\Viewpoint – onnan nem tölt be).':
      'NIGHTLY now lives in Zomboid\\mods\\Viewpoint (it used to be Zomboid\\Workshop\\Viewpoint – the game does not load from there).',
    'A kicsomagolás a backslash-t használó zip-ekkel is működik, ezért nem áll meg „nincs Viewpoint/... a zipben” hibával.':
      'Unpacking works with backslash-style zips too, so it no longer stops with a “no Viewpoint/... in the zip” error.',
    'Az eredeti Project Viewpoint nem kapcsolódik be a NIGHTLY mellé – egyjátékosban és szerveres módban sem.':
      'The original Project Viewpoint no longer gets enabled next to the NIGHTLY – in single-player or in server mode.',
    'Ha a workshop mappa nem törölhető (Steam zárja), a mod ID-jai akkor is kikerülnek az engedélyezett listából.':
      'If the workshop folder cannot be deleted (Steam holds it), its mod IDs still leave the enabled list.',
    'A NIGHTLY telepítése után a launcher engedélyezi a modot, így nem kell kézzel a modlistához nyúlni.':
      'After installing the NIGHTLY the launcher enables the mod, so you do not have to touch the mod list by hand.',
    'VIEWPOINT': 'VIEWPOINT',

    // ---- 0.9.14 (Blackout figyelmeztetés) ----
    '0.9.14 – FIGYELEM: a Blackout Protocol modpack átdolgozás alatt':
      '0.9.14 – HEADS UP: the Blackout Protocol modpack is being reworked',
    'Megérkezett az új Project-Alife frissítés, ezért a Blackout Protocol modpackot átdolgozzuk. Ez alatt előfordulhat, hogy egy indítás nem a megszokott módon zajlik, vagy egy mod ideiglenesen kikerül a csomagból. A Project-Alife sok új config-lehetőséget hozott, így jó eséllyel visszakerülnek az NPC-k: ez nagy lehetőség, de semmit nem ígérünk – hogy végül bent maradnak-e, a teszteken múlik. Amint végeztünk, itt és a Blackout hírek között jelezzük.':
      'The new Project-Alife update has landed, so we are reworking the Blackout Protocol modpack. While that lasts a launch may not go the usual way, or a mod may drop out of the pack for a while. Project-Alife brought a lot of new config options, so the NPCs will very likely come back: that is a big opportunity, but we promise nothing – whether they end up staying depends on testing. We will say so here and in the Blackout news feed once we are done.',
    'A modpack átdolgozás alatt van az új Project-Alife frissítés miatt.':
      'The modpack is being reworked because of the new Project-Alife update.',
    'A Project-Alife sok új config-lehetőséget hozott, így valószínűleg visszatérnek az NPC-k.':
      'Project-Alife brought a lot of new config options, so the NPCs will probably return.',
    'Ez nagy lehetőség, de semmit nem ígérünk: a végeredmény a teszteken múlik.':
      'A big opportunity, but no promises: the final result depends on testing.',
    'Az átdolgozás alatt egy-egy mod ideiglenesen kikerülhet a csomagból.':
      'While the rework runs, a mod may temporarily leave the pack.',
    'FIGYELEM': 'HEADS UP',

    // ---- 0.9.13 (Blackout hírek) ----
    '0.9.13 – Külön Blackout hírek, hogy lásd, mi változott a modpackban':
      '0.9.13 – Separate Blackout news so you can see what changed in the modpack',
    'A launcher hírei kettéváltak: ez itt a Blackout Protocol saját hírfolyama. Ami az egyjátékos modpackot érinti (config, indítás, nyelv, optimalizálás), az ide kerül, a szerveres hírek pedig a többjátékos nézetben maradnak. A bejegyzések a launcher nyelvén jelennek meg: magyar felületen magyarul, angolon angolul.':
      'The launcher news is now split: this is the Blackout Protocol feed. Anything that affects the single-player modpack (config, launch, language, optimization) lands here, while server news stays in the multiplayer view. Entries appear in the launcher’s language: Hungarian on a Hungarian UI, English on an English one.',
    'A Blackout Protocol saját hírfolyamot kapott, elkülönítve a szerveres hírektől.':
      'The Blackout Protocol now has its own news feed, kept apart from the server news.',
    'A modpackhoz tartozó korábbi bejegyzések átkerültek ide (config, indítás, nyelv).':
      'Earlier modpack entries moved here (config, launch, language).',
    'A bejegyzések a választott launcher-nyelven jelennek meg.':
      'Entries appear in the selected launcher language.',

    // ---- 0.9.16 (ZombieBuddy) ----
    '0.9.16 – A szerver is a hivatalos ZombieBuddy-t használja':
      '0.9.16 – The server uses the official ZombieBuddy too',
    'Az End of The Living szerverre is a normál (hivatalos) ZombieBuddy került, ezért a launcher már nem telepít külön EOTL ZombieBuddy csomagot, és indításkor sem váltogat agentet a két mód között. Ha nálad még a régi, szerveres változat van a játék mappájában, futtasd a MODOK TELEPÍTÉSE / FRISSÍTÉSE gombot – az felteszi a hivatalosat.':
      'The End of The Living server now runs the normal (official) ZombieBuddy, so the launcher no longer installs a separate EOTL ZombieBuddy pack and no longer swaps agents between the two modes on launch. If the old server variant is still in your game folder, run INSTALL / UPDATE MODS – that puts the official one in place.',
    'A szerveres mód is a hivatalos ZombieBuddy-t használja – az EOTL csomag kikerült.':
      'The server mode uses the official ZombieBuddy as well – the EOTL pack is gone.',
    'A launcher már nem cserélgeti az agentet módváltásnál, így nincs mit félretenni.':
      'The launcher no longer swaps the agent when switching modes, so nothing has to be set aside.',
    'Az Optimalizálás panelen eltűnt a „ZombieBuddy (EOTL)” kártya.':
      'The “ZombieBuddy (EOTL)” card is gone from the Optimize panel.',
    'Régi EOTL agent esetén a MODOK TELEPÍTÉSE / FRISSÍTÉSE gomb felteszi a hivatalosat.':
      'With an old EOTL agent, INSTALL / UPDATE MODS puts the official one in place.',
    'ZOMBIEBUDDY': 'ZOMBIEBUDDY',

    // ---- 0.9.13 (szerveres hírek) ----
    '0.9.13 – A Blackout Protocol saját hírfolyamot kapott':
      '0.9.13 – The Blackout Protocol got its own news feed',
    'Ezen a fülön a szerver hírei vannak. Az egyjátékos Blackout Protocol modpack bejegyzései külön hírfolyamba kerültek, ami egyjátékos módban jelenik meg – így a két mód hírei nem keverednek.':
      'This tab holds the server news. Entries for the single-player Blackout Protocol modpack moved to a separate feed that appears in single-player mode, so the two sets never mix.',
    'Két hírfolyam: szerveres (ez) és Blackout Protocol (egyjátékos módban).':
      'Two feeds: server (this one) and Blackout Protocol (in single-player mode).',
    'A modpackhoz tartozó régi bejegyzések átkerültek a Blackout hírek közé.':
      'The old modpack entries moved into the Blackout news.',
    'BLACKOUT PROTOCOL': 'BLACKOUT PROTOCOL',

    // ---- 0.9.5 ----
    '0.9.5 – ZGC és előre lefoglalt heap az egyjátékos indításhoz':
      '0.9.5 – ZGC and pre-allocated heap for the single-player launch',
    'A Blackout modpack indításakor a launcher a ProjectZomboid64.bat-ba írja a modpackhoz ajánlott JVM beállítást: -Xms8192m -Xmx8192m -XX:+UseZGC. A ZGC-nél a takarítás nem állítja meg a játékot – mért adat: a GC-megállás 146 ms-ról 70 ms-ra esett, a legrosszabb eset 4,2 másodpercről 75 ms-ra. A csomag options.ini-je a textúra-lépcsőt is lejjebb tartja (maxTextureSize / maxVehicleTextureSize), ami a terhelést csökkenti.':
      'When the Blackout modpack launches, the launcher writes the recommended JVM settings into ProjectZomboid64.bat: -Xms8192m -Xmx8192m -XX:+UseZGC. With ZGC the collection no longer stops the game – measured: GC pause dropped from 146 ms to 70 ms and the worst case from 4.2 seconds to 75 ms. The pack’s options.ini also keeps the texture step lower (maxTextureSize / maxVehicleTextureSize), which reduces load.',
    'Egyjátékos indításnál a bat-ban: -Xms8192m -Xmx8192m -XX:+UseZGC (a G1GC-t kiveszi).':
      'On single-player launch the bat gets -Xms8192m -Xmx8192m -XX:+UseZGC (G1GC is removed).',
    'A beállítás a ProjectZomboid64.json-ba is bekerül, ha a játék azt használná.':
      'The settings also go into ProjectZomboid64.json in case the game uses it.',
    'A ZGC-s indítás a legrosszabb GC-megállást 4,2 másodpercről 75 ms-ra vitte.':
      'The ZGC launch took the worst GC pause from 4.2 seconds to 75 ms.',
    'A textúra-lépcső lejjebb (maxTextureSize / maxVehicleTextureSize) – kevesebb terhelés, mérve nem hozott VRAM-megtakarítást.':
      'The texture step is lower (maxTextureSize / maxVehicleTextureSize) – less load, though measured it did not save VRAM.',
    'A beállítás megismételhető: ha már így fut, a launcher nem nyúl a fájlhoz.':
      'The change is repeatable: if it already runs this way the launcher leaves the file alone.',

    // ---- 0.9.4 ----
    '0.9.4 – Minden szöveg a választott nyelven, saját szerver widgettel':
      '0.9.4 – every text in your language, with your own server widget',
    'A nyelvváltó mostantól tényleg mindenre kiterjed: az Újdonságok bejegyzései, a napló sorai, a hibaüzenetek és a crash log beküldése is azon a nyelven jelenik meg, amelyiket kiválasztottad. Egyjátékos módban a Discord fül a saját szervered widgetjét mutatja, és ha a widget JSON nem érhető el, a Discord beágyazott widgetje jön be helyette.':
      'The language switch now really covers everything: news entries, log lines, error messages and the crash log submission all appear in the language you picked. In single-player mode the Discord tab shows your own server’s widget, and if the widget JSON is unavailable the embedded Discord widget is used instead.',
    'A napló (telepítés, letöltés, indítás, hibák) a választott nyelven íródik.':
      'The log (installation, downloads, launch, errors) is written in the chosen language.',
    'Az Újdonságok összes bejegyzése – cím, leírás és pontok – fordul magyarra és angolra.':
      'Every news entry – title, description and bullets – is translated into Hungarian and English.',
    'A crash log beküldése és minden hibaüzenet a választott nyelven jelenik meg.':
      'Crash log submission and every error message appear in the chosen language.',
    'Egyjátékos módban a Discord fül a saját szerver widgetjét tölti be (326126573658963971), beágyazott widgettel tartalékként.':
      'In single-player mode the Discord tab loads your own server’s widget (326126573658963971) with the embedded widget as a fallback.',
    'A választott nyelvet a launcher a natív ablakokhoz is átadja.':
      'The chosen language is passed to the native dialogs as well.',

    // ---- 0.9.3 ----
    '0.9.3 – Magyar / English nyelvváltó és friss Blackout config':
      '0.9.3 – Hungarian / English switch and a fresh Blackout config',
    'A launcher fejlécében megjelent a MAGYAR / ENGLISH kapcsoló: egy kattintással az egész felület – a szerveres (multiplayer) és az egyjátékos Blackout oldal is – átvált a választott nyelvre, és a beállítás megmarad a következő indításra. Emellett bekerült a legfrissebb Blackout config csomag: a profil most 719 modot engedélyez, új sandbox preset érkezett (NeoiMods Ajanlott / Neoi-Suggested), és a launcher a ProjectZomboid64.bat memóriabeállítását is átírja, ami a laggolás ellen számít.':
      'The launcher header now has a MAGYAR / ENGLISH switch: one click turns the whole interface – both the server (multiplayer) and the single-player Blackout page – into the language you pick, and the choice is remembered for the next start. The newest Blackout config pack is included too: the profile now enables 719 mods, a new sandbox preset arrived (NeoiMods Ajanlott / Neoi-Suggested), and the launcher also rewrites the memory setting in ProjectZomboid64.bat, which matters for stutter.',
    'Nyelvváltó gomb a fejlécben: MAGYAR / ENGLISH, a teljes felületre (multiplayer és single-player oldal).':
      'Language switch in the header: MAGYAR / ENGLISH for the whole interface (multiplayer and single-player pages).',
    'A választott nyelv megjegyződik, a következő indításnál is az jön be.':
      'The chosen language is remembered and comes back on the next start.',
    'Új Blackout config: 719 modos profil, NeoiMods Ajanlott / Neoi-Suggested sandbox preset, friss options.ini.':
      'New Blackout config: a 719-mod profile, the NeoiMods Ajanlott / Neoi-Suggested sandbox preset and a fresh options.ini.',
    'A launcher a ProjectZomboid64.bat -Xmx értékét is beállítja (a B42 ezen keresztül indul).':
      'The launcher also sets the -Xmx value in ProjectZomboid64.bat (B42 launches through it).',
    'Az ellenőrző lista a valós default.txt állapotot és a hiányzó config fájlokat is mutatja.':
      'The checklist shows the real default.txt state and any missing config files.',

    // ---- 0.9.1 ----
    '0.9.1 – A modpack config csomagja a launcherben':
      '0.9.1 – the modpack config pack ships inside the launcher',
    'A launcher mostantól magával hozza a Blackout Protocol teljes config csomagját: a pz_modlist_settings.cfg-t a 807 modos profillal, a NeoMods sandbox preseleket, a billentyűket és a mod-configokat. Telepítéskor és minden egyjátékos indítás előtt bemásolja őket a játék Zomboid mappájába, a modokat pedig a profil szerint engedélyezi – így a Waterpipes / LastCupCoffee / PlumbingFuelGeneratorAddonB42 trió nem kerül be, ami világbetöltéskor elszállította a játékot.':
      'The launcher now ships the complete Blackout Protocol config pack: the pz_modlist_settings.cfg with its 807-mod profile, the NeoMods sandbox presets, the keybinds and the per-mod configs. On install and before every single-player launch it copies them into the game’s Zomboid folder and enables the mods from the profile – so the Waterpipes / LastCupCoffee / PlumbingFuelGeneratorAddonB42 trio stays out, and that trio is what crashed the game while loading a world.',
    'A config csomag a launcherben van (assets/blackout) – nem kell kézzel másolgatni.':
      'The config pack lives inside the launcher (assets/blackout) – nothing to copy by hand.',
    'Telepítéskor és minden egyjátékos indítás előtt a helyére kerül; a felülírt fájlokról mentés készül (Zomboid\\eotl-backup-*).':
      'It is put in place on install and before every single-player launch; overwritten files are backed up (Zomboid\\eotl-backup-*).',
    'A modok a Blackout Protocol profilból engedélyeződnek (807 mod), és a default.txt is ezt a listát kapja.':
      'Mods are enabled from the Blackout Protocol profile (807 mods) and default.txt gets the same list.',
    'Az ELLENŐRZÉS fül a valós állapotot mutatja: hány mod aktív a profilban, és hogy a config a helyén van-e.':
      'The CHECK panel shows the real state: how many mods are active in the profile and whether the config is in place.',

    // ---- 0.9.0 ----
    '0.9.0 – Blackout Protocol egyjátékos mód': '0.9.0 – Blackout Protocol single-player mode',
    'A launcher új gombbal bővült: a SINGLE-PLAYER gombbal átvált a Blackout Protocol – New Era egyjátékos modpackra (847 item, közel 800+ mod). A háttér, a feliratok és a modlista is átvált, a MULTIPLAYER gombbal pedig minden visszaáll az End of The Living szerverre. A játék egyik módban sem indul el magától: a JÁTÉK INDÍTÁSA gombra kell kattintani, és a Project Zomboid a főmenübe indul.':
      'The launcher gained a new button: SINGLE-PLAYER switches to the Blackout Protocol – New Era single-player modpack (847 items, nearly 800+ mods). The background, the titles and the mod list switch too, and MULTIPLAYER restores the End of The Living server. The game never starts by itself in either mode: press LAUNCH GAME and Project Zomboid opens on the main menu.',
    'Új SINGLE-PLAYER / MULTIPLAYER gomb a JÁTÉK INDÍTÁSA fölött – a módváltás nem indítja el a játékot.':
      'New SINGLE-PLAYER / MULTIPLAYER button above LAUNCH GAME – switching modes does not start the game.',
    'Blackout Protocol – New Era: a 3814595736-os Steam kollekció telepítése ugyanazzal a mechanikával, mint a szerver modpack (feliratkozás, letöltés, engedélyezés).':
      'Blackout Protocol – New Era: the 3814595736 Steam collection installs with the same mechanism as the server modpack (subscribe, download, enable).',
    'Az első belépésnél figyelmeztetés a méretről (847 item, 800+ mod, hosszú letöltés) „Ne mutasd többet” lehetőséggel.':
      'A size warning on first entry (847 items, 800+ mods, long download) with a “Do not show again” option.',
    'A launcher bemásolja a modpackhoz tartozó config fájlt a játékba, amint az felkerül a repóba (Master/blackout/index.json).':
      'The launcher copies the modpack config into the game as soon as it is uploaded to the repo (Master/blackout/index.json).',
    'Új háttér és Blackout feliratok egyjátékos módban; visszaváltáskor minden az End of The Living kinézetre áll vissza.':
      'A new background and Blackout titles in single-player mode; switching back restores the End of The Living look.',

    // ---- 0.8.4 ----
    '0.8.4 – a játék a főmenübe indul': '0.8.4 – the game opens on the main menu',
    'A közvetlen szerver-csatlakozás (a játék +connect paramétere) helyett a launcher mostantól a főmenübe indítja a Project Zomboidot – a szerverre a játékban csatlakozz. Így nem fordulhat elő, hogy a játék hibával indul, ha a szerver épp nem válaszol.':
      'Instead of joining a server directly (the game’s +connect parameter) the launcher now opens Project Zomboid on the main menu – join the server in-game. That way the game cannot fail to start when the server is not answering.',
    'JÁTÉK INDÍTÁSA: a Project Zomboid a főmenübe indul, nem próbál azonnal a szerverre csatlakozni.':
      'LAUNCH GAME: Project Zomboid opens on the main menu and does not try to join the server right away.',
    'A szerver címe és a szerver státusza (online/offline, játékosok) változatlanul látszik a launcherben.':
      'The server address and status (online/offline, players) still show in the launcher.',
    'A memória-beállítás (-Xmx) és a ZombieBuddy agent ugyanúgy érvényes a játékra.':
      'The memory setting (-Xmx) and the ZombieBuddy agent still apply to the game.',
    'A frissítés-ellenőrzés és a csomagletöltés GitHub-kimaradás alatt is működik (0.8.3).':
      'Update checks and pack downloads also work during GitHub outages (0.8.3).',

    // ---- 0.8.3 ----
    '0.8.3 – a launcher akkor is működik, ha a GitHub kiesik': '0.8.3 – the launcher works even when GitHub is down',
    'Ma a GitHub API és a github.com letöltő linkjei órákra 503/504 hibát adtak, ezért a launcher mostantól nem függ egyetlen GitHub-végponttól sem: minden kérése több kiszolgálón próbálkozik, ismétel, és ha kell, a repóban tárolt indexből dolgozik.':
      'Today the GitHub API and the github.com download links returned 503/504 for hours, so the launcher no longer depends on a single GitHub endpoint: every request tries several servers, retries, and falls back to the index stored in the repo.',
    'Ha a GitHub API nem válaszol, a frissítés-ellenőrzés a repóban tárolt indexből (update-manifest.json) fájlonként hasonlítja össze a launchert, és csak a megváltozott fájlokat tölti le.':
      'When the GitHub API does not answer, the update check compares the launcher file by file against the index stored in the repo (update-manifest.json) and downloads only the changed files.',
    'A csomagok (ETO, 6282 3D, magyarítások, PZO, Viewpoint) négy kiszolgálóról jöhetnek sorban: raw.githubusercontent, jsDelivr CDN, GitHub API, github.com – méret-ellenőrzéssel.':
      'Packs (ETO, 6282 3D, Hungarian files, PZO, Viewpoint) can come from four servers in turn: raw.githubusercontent, jsDelivr CDN, GitHub API, github.com – with size checks.',
    'A csomaglista a repóban tárolt Master/index.json-ból is felépül, így API-kimaradás alatt sem üres az Optimalizálás panel.':
      'The pack list is also built from Master/index.json in the repo, so the Optimize panel is not empty during an API outage.',
    'Minden GitHub-kérés ismételhető: 503/504/429 vagy hálózati hiba esetén várakozással újrapróbál.':
      'Every GitHub request is retryable: on 503/504/429 or a network error it waits and tries again.',
    'A ZombieBuddy telepítő a GitHub API asset-végpontjáról is letölthető, ha a szokásos /releases/download/ link 504-el.':
      'The ZombieBuddy installer can also be downloaded from the GitHub API asset endpoint when the usual /releases/download/ link returns 504.',
    'A hírek és az események is több forrásból jönnek; ha minden kiesik, a legutóbbi mentett példány marad meg.':
      'News and events also come from several sources; if all fail, the last saved copy stays.',

    // ---- 0.8.2 ----
    '0.8.2 – összeomlás után kötelező a log beküldése': '0.8.2 – sending the log is required after a crash',
    'Ha a játék összeomlik, a launcher mostantól kéri a crash logot és a Discord nevedet, és addig nem lehet továbblépni, amíg el nem küldted. Ez nem szivatás: a „nem működik, valami hiba van” megjegyzésből nem tudunk javítani, a log fájlból viszont pontosan látjuk, mi okozta.':
      'When the game crashes the launcher now asks for the crash log and your Discord name, and you cannot continue until you send them. This is not harassment: “it does not work, something is wrong” gives us nothing to fix, while the log file shows exactly what caused it.',
    'Összeomlás után felugrik a kötelező ablak: a Discord neved megadása is kötelező, és csak a LOG ELKÜLDÉSE gombbal zárul be.':
      'After a crash the required dialog pops up: your Discord name is required too and only the SEND LOG button closes it.',
    'Az ablak elmagyarázza, miért kell: a logból tudjuk meg a hiba okát, a „nem működik” szövegből nem.':
      'The dialog explains why: the log tells us the cause, the words “it does not work” do not.',
    'Ha küldés nélkül zárdnád be a launchert, figyelmeztet – a log a gépeden marad, és a következő indításnál újra felajánljuk.':
      'If you close the launcher without sending, it warns you – the log stays on your machine and we offer it again on the next start.',
    'Csak akkor jelenik meg a kilépés gomb, ha a küldés hálózati hiba miatt nem ment át, hogy senki ne ragadjon bent a launcherben.':
      'The exit button only appears when sending failed because of a network error, so nobody gets stuck in the launcher.',

    // ---- 0.8.1 ----
    '0.8.1 – rendben az automatikus frissítés': '0.8.1 – automatic updates fixed',
    'A frissítő eddig nem cserélte a launcher verziófájlját, ezért a fejlécben a régi verziószám ragadt, és egy félbeszakadt frissítés után a launcher naprakésznek hitte magát. Mindkettő javítva.':
      'The updater did not replace the launcher version file, so the header kept the old version number, and after an interrupted update the launcher believed it was up to date. Both are fixed.',
    'A frissítés mostantól a verziószámot is frissíti, így a fejlécben a valódi verzió látszik.':
      'Updates now refresh the version number, so the header shows the real version.',
    'Ha egy fájlt nem sikerül lecserélni (pl. zárolt fájl), a launcher nem jelöli készre a frissítést, hanem a következő indításnál újrapróbálja.':
      'If a file cannot be replaced (for example a locked file) the launcher does not mark the update done; it retries on the next start.',
    'A frissítés után a build commitja is frissül, így a hibajelentésekben a helyes verzió szerepel.':
      'After an update the build commit is refreshed too, so bug reports carry the right version.',

    // ---- 0.8.0 ----
    '0.8.0 – csak a kollekció modjai maradnak bekapcsolva': '0.8.0 – only collection mods stay enabled',
    'A launcher mostantól kikapcsolja azokat a modokat, amelyek nem a követett kollekció elemeiből származnak. A saját főmenü, a menüzene, a magyarítás és a Viewpoint NIGHTLY kivétel – ezek a launcher saját csomagjai.':
      'The launcher now disables mods that do not come from the followed collection. The custom main menu, menu music, the Hungarian translation and Viewpoint NIGHTLY are exceptions – those are the launcher’s own packs.',
    'Telepítéskor és frissítés után a mod lista csak a kollekció elemeiből származó modokat tartalmazza; minden más bekapcsolt mod kikerül (a fájl előtte .bak-ként mentődik).':
      'On install and after an update the mod list contains only mods from the collection; every other enabled mod is removed (the file is saved as .bak first).',
    'Kivétel: a launcher saját csomagjai – főmenü, menüzene, magyarítás és a Viewpoint NIGHTLY teljes mappája.':
      'Exception: the launcher’s own packs – the main menu, menu music, the Hungarian translation and the whole Viewpoint NIGHTLY folder.',
    'Ha a kollekció vagy a Steam workshop mappa nem olvasható, a launcher inkább nem kapcsol ki semmit, hogy ne tűnjenek el modok tömegesen.':
      'If the collection or the Steam workshop folder cannot be read, the launcher disables nothing rather than making mods disappear in bulk.',
    'A szűrés verziónként egyszer fut le, így a kézzel újra bekapcsolt mod marad bekapcsolva.':
      'The filter runs once per version, so a mod you re-enabled by hand stays enabled.',

    // ---- 0.7.9 ----
    '0.7.9 – Viewpoint NIGHTLY egy gombnyomásra': '0.7.9 – Viewpoint NIGHTLY in one click',
    'Az Optimalizálás panelen új kártya telepíti a Viewpoint éjszakai buildjét (0.1.7-rc2) a Master mappából, a gyűjtemény régi Viewpointja helyett. Emellett a telepítő hibái is javultak.':
      'A new card on the Optimize panel installs the nightly Viewpoint build (0.1.7-rc2) from the Master folder instead of the collection’s old Viewpoint. Installer errors were fixed too.',
    'Új Viewpoint NIGHTLY kártya: a régi 0.1.6.1 helyett a 0.1.7-rc2 build kerül a játék Workshop mappájába, egy kattintással.':
      'New Viewpoint NIGHTLY card: the 0.1.7-rc2 build goes into the game’s Workshop folder instead of 0.1.6.1, in one click.',
    'A Project Viewpoint kikerült a követett kollekcióból – nem töltődik le újra, és nem kér feliratkozást; a Viewpoint-* modok továbbra is működnek.':
      'Project Viewpoint was removed from the followed collection – it is not downloaded again and does not ask you to subscribe; the Viewpoint-* mods keep working.',
    'Javítva: a telepítő már nem írja ki modonként, hogy „mods.copyAgentLibs is not a function”; a hiányzó modok SteamCMD-s pótlása is újra működik.':
      'Fixed: the installer no longer prints “mods.copyAgentLibs is not a function” per mod, and topping up missing mods with SteamCMD works again.',
    'Új PZO launcher (1.9.5) a Master mappában – a PZO kártya ezt telepíti.':
      'New PZO launcher (1.9.5) in the Master folder – the PZO card installs it.',

    // ---- 0.7.3 ----
    '0.7.3 – új modkollekció + magyarítások': '0.7.3 – new mod collection + Hungarian translations',
    'A launcher mostantól az új „End of The Living The Forgotten” kollekciót követi; a Projekt A-Life és a Survivor PDA magyarítása pedig választható az Optimalizálás panelen.':
      'The launcher now follows the new “End of The Living The Forgotten” collection, and the Projekt A-Life and Survivor PDA Hungarian translations are optional on the Optimize panel.',
    'Új Steam Workshop kollekció – a launcher mindenkinél automatikusan erre vált.':
      'New Steam Workshop collection – the launcher switches everyone to it automatically.',
    'Magyarítás (Projekt A-Life + Survivor PDA) az Optimalizálás panelen, egy kattintással telepíthető vagy törölhető.':
      'Hungarian translation (Projekt A-Life + Survivor PDA) on the Optimize panel, installable or removable in one click.',
    'Ha a Steam épp korlátozza a kollekció oldalát, a lista az API-ból is betölt.':
      'If Steam is rate-limiting the collection page, the list also loads from the API.',

    // ---- 0.7.2 ----
    '0.7.2 – a rossz mappa már nem marad titokban': '0.7.2 – a wrong folder no longer goes unnoticed',
    'A kritikus figyelmeztetés OK-ja mostantól automatikusan jelenti a szervernek, hogy nem a helyes mappa struktúrát követed – a Discord neved megadása kötelező hozzá.':
      'OK on the critical warning now reports to the server automatically that you are not using the correct folder structure – your Discord name is required for it.',
    'Aki rossz helyen telepítette a Project Zomboidot, annak a figyelmeztetés OK-zásakor a launcher kérdés nélkül elküldi a szervernek: „nem a helyes mappa struktúrát követi” – a Discord nevével együtt.':
      'If Project Zomboid is installed in the wrong place, pressing OK on the warning sends “not using the correct folder structure” to the server together with your Discord name.',
    'A Discord nevet kötelező megadni: amíg nincs kitöltve, a launcher nem enged tovább.':
      'The Discord name is required: until it is filled in the launcher does not continue.',
    'A jelentés egyszer megy el: utána a launcher nem kérdezi újra, de a figyelmeztetés a fő panelen marad, amíg a játék nem kerül a helyére.':
      'The report is sent once: the launcher does not ask again, but the warning stays on the main panel until the game is moved to the right place.',

    // ---- 0.7.1 ----
    '0.7.1 – kritikus figyelmeztetés és játék kereső': '0.7.1 – critical warning and game finder',
    'Ha a Project Zomboid nem a C: meghajtó alap Steam mappájában van, a launcher mostantól kritikus hibaként figyelmeztet, és egy kattintással megkeresi a játékot.':
      'If Project Zomboid is not in the default Steam folder on drive C:, the launcher now warns as a critical error and finds the game in one click.',
    'Kritikus figyelmeztetés, ha a játék nincs a C: meghajtó alap Steam mappájában (C:\\Program Files (x86)\\Steam\\steamapps\\common\\ProjectZomboid) – mert a modok és gyakorlatilag minden telepítő erre van tervezve.':
      'Critical warning when the game is not in the default Steam folder on drive C: (C:\\Program Files (x86)\\Steam\\steamapps\\common\\ProjectZomboid), because the mods and practically every installer are designed for that path.',
    'Új JÁTÉK KERESÉSE gomb: végigfésüli a Steam könyvtárakat és az összes meghajtót, kilistázza a megtalált Project Zomboid mappákat, és a kiválasztottba telepít mindent.':
      'New FIND GAME button: it scans the Steam libraries and every drive, lists the Project Zomboid folders it finds and installs everything into the one you pick.',
    'A megtalált mappa a Beállításokban is megadható marad (Tallózás), és a launcher a választás után azonnal újraellenőrzi a rendszert.':
      'The folder can still be set in Settings (Browse), and the launcher re-checks the system right after you choose.',

    // ---- 0.7 ----
    '0.7 – új launcher, okosabb frissítéssel': '0.7 – a new launcher with smarter updates',
    'Ez a launcher első 0.7-es kiadása. Mostantól minden frissítés előtt felugrik egy kis ablak, ahol látod, melyik verzióról melyikre váltunk, és hogy mi az új – csak az OK után cserélődik bármi.':
      'This is the launcher’s first 0.7 release. Before every update a small dialog shows which version moves to which and what is new – nothing is replaced until you press OK.',
    'Frissítés előtt felugró ablak: látszik a régi és az új verzió, valamint az újdonságok listája, és neked kell OK-zni.':
      'A dialog before updating: it shows the old and new version plus the list of changes, and you have to confirm.',
    'Új ÚJDONSÁGOK fül a Discord és az események mellett – ezt a GitHubon lévő news.json-ból olvassa a launcher.':
      'New NEWS tab next to Discord and events – the launcher reads it from news.json on GitHub.',
    'Ha új bejegyzés kerül a hírekbe, induláskor magától felugrik egy ablakban.':
      'When a new news entry appears, a dialog pops up on start.',
    'Töltőcsík minden letöltésnél: látszik, hány százaléknál tart a csomag, a PZO vagy épp a launcher frissítése.':
      'A progress bar for every download: you see the percentage of the pack, the PZO or the launcher update.',
    'Új Frissítés gomb a fő panelen: bármikor le lehet kérdezni, hogy frissült-e valami a GitHubon.':
      'New Update button on the main panel: you can check any time whether something changed on GitHub.',
    'A launcher verziója mostantól a bal oldali kis jelvényen is látszik (v0.7).':
      'The launcher version now shows on the small badge on the left (v0.7).',
  });
})();
