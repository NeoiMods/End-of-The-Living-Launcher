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

                                                                                                        // ---- 0.9.44 (verzió-alapú frissítés) ----
    "0.9.44 – Nem kínálja fel újra ugyanazt a verziót":
      "0.9.44 – The same version is no longer offered again",
    "A launcher a commit sha alapján döntötte el, van-e új verzió. Mivel minden commit új sha-t ad, ugyanazt a verziót kínálta fel újra és újra („0.9.43 → 0.9.43”), a frissítés pedig nem cserélt semmit. Mostantól a package.json verziója dönt: ha a repóban lévő verzió nem nagyobb a telepítettnél, a launcher naprakésznek tekinti magát, akkor is, ha közben más commitok születtek. A felugró ablakból kikerült a nyers commit-üzenet is, ami angol felületen magyarul lógott ki.":
      "The launcher decided whether an update exists from the commit sha. Since every commit produces a new sha, it offered the same version over and over (“0.9.43 → 0.9.43”) and the update replaced nothing. The package.json version now decides: if the version in the repo is not newer than the installed one, the launcher considers itself up to date even when other commits were made in the meantime. The raw commit message was also removed from the update dialog, where it showed up in Hungarian on the English interface.",
    "A frissítés-döntés verzió-alapú, nem commit sha-alapú – nincs végtelen „új verzió” kínálat.":
      "The update decision is version-based instead of commit-sha based – no endless “new version” offer.",
    "A célverzió a repóban lévő package.json verziója, nem a commit sha.":
      "The target version is the repo’s package.json version, not the commit sha.",
    "A frissítés-ablakban nem jelenik meg a commit-üzenet (az fejlesztői szöveg, magyarul íródik).":
      "The update dialog no longer shows the commit message (it is developer text, written in Hungarian).",
    "A build által írt update-baseline.json mostantól a verziót is tartalmazza.":
      "update-baseline.json written by the build now contains the version as well.",
// ---- 0.9.43 (agent DLL ellenőrzés) ----
    "0.9.43 – A játék nem indul el, ha hiányzik egy agent DLL":
      "0.9.43 – The game no longer dies when an agent DLL is missing",
    "A PZO telepítő néha úgy frissít, hogy a PZOptimEngine.jar-t lecseréli, a pzo_native64.dll-t viszont nem teszi vissza. Ilyenkor a ProjectZomboid64.json továbbra is hivatkozik a natív agentre, a JVM viszont el sem indul („Could not find agent library pzo_native64”), a játék pedig néma csendben kilép – a launcher naplójában csak annyi látszik, hogy 15 mp után sem fut. Mostantól indítás előtt ellenőrizzük, hogy minden -agentlib-hez megvan-e a DLL: előbb visszamásoljuk a launcher csomag-cache-éből, ha ott sincs, kivesszük a JSON-ból, hogy a játék elinduljon.":
      "The PZO installer sometimes updates by replacing PZOptimEngine.jar but leaving pzo_native64.dll out. ProjectZomboid64.json keeps referencing the native agent, the JVM refuses to start (“Could not find agent library pzo_native64”) and the game exits silently – the launcher log only shows that it is still not running after 15 seconds. Before launching we now check that every -agentlib has its DLL: first we copy it back from the launcher package cache, and if it is not there either, the argument is removed so the game can start.",
    "Indítás előtt minden -agentlib bejegyzéshez ellenőrizzük a DLL meglétét.":
      "Every -agentlib entry is checked for its DLL before launching.",
    "A hiányzó DLL-t a launcher csomag-cache-éből visszaállítja (pl. pzo_native64.dll).":
      "A missing DLL is restored from the launcher package cache (e.g. pzo_native64.dll).",
    "Ha a DLL sehol nincs, az agent kikerül a launcher JSON-ból, és a napló figyelmeztet – így a játék elindul, nem lép ki némán.":
      "If the DLL cannot be found anywhere, the agent is removed from the launcher JSON and the log warns – the game starts instead of exiting silently.",
    "A napló kiírja, melyik DLL-t állította vissza vagy hagyta ki.":
      "The log states which DLL was restored or skipped.",
// ---- 0.9.42 (tartós napló) ----
    "0.9.42 – Tartós naplófájl":
      "0.9.42 – Persistent log file",
    "A launcher naplója eddig csak a felületen élt, bezáráskor elveszett – utólag nem lehetett megnézni, miért nem indult el a játék vagy miért bukott el a frissítés. Mostantól minden naplósor bekerül a launcher.log fájlba, időbélyeggel, és frissítési hiba esetén a hibás fájlok is névvel, okkal együtt. A napló helyét a launcher induláskor kiírja a naplóba.":
      "The launcher log used to live only in the interface and was lost on exit – you could not check afterwards why the game did not start or why an update failed. Every log line now goes into the launcher.log file with a timestamp, and a failed update also records the failing files with their reason. The launcher prints the log file location at start-up.",
    "Minden naplósor a launcher.log fájlba is bekerül (időbélyeggel).":
      "Every log line is also written to the launcher.log file (with a timestamp).",
    "A napló 2 MB felett átforgatódik: launcher.log.1, így nem nő a végtelenségig.":
      "The log rotates at 2 MB: launcher.log.1, so it never grows without bound.",
    "Sikertelen frissítésnél a hibás fájlok neve és oka is bekerül a naplóba.":
      "A failed update records the failing file names and reasons.",
    "A launcher induláskor kiírja a naplófájl helyét.":
      "The launcher prints the log file location at start-up.",
// ---- 0.9.41 (friss index) ----
    "0.9.41 – A frissítés-index nem jön a CDN gyorsítótárából":
      "0.9.41 – The update index no longer comes from the CDN cache",
    "A GitHub CDN-je (raw.githubusercontent, jsDelivr) percekig a korábbi fájlt adja vissza. Ezért a launcher olyan indexet kaphatott, amiben még a régi méretek és hash-ek voltak, a letöltött fájlok viszont már az új tartalmat hozták – innen jött a „3 fájl nem tölthető le”. Mostantól az index kérése cache-bustinggal, három próbával megy, így mindig a friss index alapján ellenőrzünk.":
      "GitHub’s CDN (raw.githubusercontent, jsDelivr) keeps serving the previous file for minutes. The launcher could therefore receive an index that still held the old sizes and hashes while the downloaded files already carried the new content – that produced “3 files cannot be downloaded”. The index request now uses cache-busting with three attempts, so the check always runs against a fresh index.",
    "Az update-manifest.json kérése cache-bustinggal és 3 próbával történik.":
      "update-manifest.json is requested with cache-busting and three attempts.",
    "Az index a commitolt (LF) bájtokból számol, nem a Windowsos CRLF munkakönyvtárból.":
      "The index is computed from committed (LF) bytes, not from the Windows CRLF working tree.",
    "Ha a fájlonkénti frissítés mégis elbukik, a launcher teljes zipballal folytatja.":
      "If the per-file update still fails, the launcher continues with the full zipball.",
// ---- 0.9.40 (frissítés javítása) ----
    "0.9.40 – Megjavított frissítés („3 fájl nem tölthető le”)":
      "0.9.40 – Fixed update (“3 files cannot be downloaded”)",
    "Az update-manifest.json eddig a legutóbbi commit tartalmából készült, miközben a build már az új fájlokat tartalmazta. Ezért az index egy commit-tal lemaradt, a letöltött fájlok mérete nem egyezett vele, és a launcher „3 fájl nem tölthető le – a launcher változatlan maradt” hibát írt. Mostantól az index a kiadásra kerülő fájlokból készül, és ha a fájlonkénti letöltés mégis elbukik, a launcher automatikusan a teljes zipballra vált.":
      "update-manifest.json used to be generated from the last commit while the build already contained the new files. The index therefore lagged one commit behind, the downloaded files did not match its sizes, and the launcher reported “3 files cannot be downloaded – the launcher was left unchanged”. The index is now built from the files being released, and if the per-file download still fails, the launcher automatically switches to the full zipball.",
    "Az update-manifest.json a kiadásra kerülő (munkakönyvtári) fájlokból generálódik, nem a korábbi commitból.":
      "update-manifest.json is generated from the files being released (working tree), not from the previous commit.",
    "Ha a fájlonkénti letöltés bármelyik fájlon elbukik, a launcher teljes zipballal próbálkozik.":
      "If any file fails in per-file mode, the launcher retries with the full zipball.",
    "A frissítési hiba szövege kiírja az első hibás fájlt és az okot (pl. méret eltérés).":
      "The update error message now names the first failing file and the reason (e.g. size mismatch).",
    "A build figyelmeztet, ha olyan fájl kerülne az indexbe, ami nincs a gitben.":
      "The build warns when a file that is not in git would end up in the index.",
// ---- 0.9.39 (blokk-indok a naplóban) ----
    "0.9.39 – Kiderül, mit lát futó játéknak a launcher":
      "0.9.39 – You can see what counts as a running game",
    "Ha a launcher azt írja, hogy már fut a játék, mostantól a naplóban az is ott van, melyik folyamat miatt gondolja ezt: a folyamat neve, kora és hogy van-e ablaka. Így egy téves felismerés (például egy beragadt indító exe) azonnal látszik, és nem kell találgatni, miért nem indul a játék.":
      "When the launcher says the game is already running, the log now also shows which process makes it think so: the process name, its age and whether it has a window. A false positive (for example a stuck launcher exe) is therefore visible right away instead of leaving you guessing why the game will not start.",
    "A „már fut a játék” naplósor kiírja a felismert folyamatot (név, hány perces, van-e ablaka).":
      "The “game is already running” log line prints the detected process (name, age, window).",
    "A futás-észlelés a gyorsítótár ellenére is friss adatot ad a blokk indokához.":
      "The detection reports fresh data for the block reason even when the cache is warm.",
    "Fejlesztői módban a főfolyamat kódja csak a launcher újraindítása után él – ezt a launcher a naplóban is jelzi.":
      "In developer mode the main-process code only takes effect after restarting the launcher – the log notes this as well.",
// ---- 0.9.38 (dupla indítás javítása) ----
    "0.9.38 – Nincs több dupla játékindítás":
      "0.9.38 – No more double game launch",
    "A 42.22.2 Windowson már nem külön java.exe viszi a játékot, hanem maga a ProjectZomboid64.exe. A launcher eddig csak a java.exe-t és a legfeljebb 3 perces indító exe-t látta futó játéknak, ezért hosszabb játék után „nem fut” állapotot mutatott, és a következő indítás második példányt nyitott. Mostantól a futó játékot a saját ablaka alapján ismeri fel, így a már futó játékhoz nem indít másodikat.":
      "On 42.22.2 for Windows the game no longer runs in a separate java.exe – the ProjectZomboid64.exe hosts it. The launcher only treated java.exe and an exe younger than 3 minutes as a running game, so after a longer session it reported “not running” and the next launch opened a second instance. It now recognises the running game by its own window, so it will not start a second one next to a game that is already running.",
    "A futás-észlelés a játék ablakát is figyeli, nem csak a java.exe-t.":
      "Running-game detection now watches the game window as well, not just java.exe.",
    "A beragadt, ablak nélküli indító exe továbbra sem számít futó játéknak – így a játék újraindítható marad.":
      "A stuck launcher exe without a window still does not count as a running game, so the game can be restarted.",
    "A „A játék elindult” visszajelzés is helyesen jelenik meg hosszú betöltés után.":
      "The “The game has started” feedback now appears correctly after a long load as well.",
// ---- 0.9.37 (teljes angol fordítás) ----
    "0.9.37 – Teljes angol fordítás":
      "0.9.37 – Full English translation",
    "Ha angolra váltod a launchert, mostantól a felület és a napló is végig angolul jelenik meg. Pótoltuk azokat a szövegeket, amik eddig magyarul maradtak: a szerver állapotsort, a modlista címkéit (BE/KI, HELYI, NINCS), a frissítés- és hibasorokat, a beállítás- és preset-kérdéseket, valamint a teljes naplót a fő folyamattól a modulokig. Az esemény dátuma is a választott nyelv szerint formázódik.":
      "If you switch the launcher to English, the whole interface and the log now appear in English. We filled in the texts that stayed Hungarian until now: the server status line, the mod list labels (BE/KI, HELYI, NINCS), the update and error lines, the settings and preset questions, and the entire log from the main process down to the modules. The event date is formatted according to the selected language as well.",
    "A szerver állapotsora angolul is megjelenik (Server ONLINE / Server OFFLINE).":
      "The server status line is translated too (Server ONLINE / Server OFFLINE).",
    "A modlista rövid címkéi is fordítva: ON/OFF, LOCAL, NONE.":
      "The short mod list labels are translated: ON/OFF, LOCAL, NONE.",
    "A napló minden sora angolul is olvasható – a launcher és a modulok üzenetei is.":
      "Every log line can be read in English – launcher and module messages alike.",
    "A beállítások, a preset-kérdés és a hibaüzenetek szintén le vannak fordítva.":
      "The settings, the preset question and the error messages are translated as well.",
    "Az esemény dátuma a választott nyelv formátumát követi (pl. 17 Nov 2026, 14:15).":
      "The event date follows the selected language (e.g. 17 Nov 2026, 14:15).",
// ---- 0.9.36 (egyszerűbb Optimalizálás panel) ----
    "0.9.36 – Egyszerűbb Optimalizálás panel":
      "0.9.36 – Simpler Optimisations panel",
    "Kikerültek az Optimalizálás panelről azok a kártyák, amikre már nincs szükség: az ETO textúracsomagok (alap és Max Performance), a 6282 3D modellcsomag és a magyarítás. A panel így rövidebb és átláthatóbb: PZO motor, Viewpoint NIGHTLY, RAM/JVM heap, ZombieBuddy, a workshopos 3D modellek cseréje és a mod mappa maradt benne.":
      "The cards that are no longer needed are gone from the Optimisations panel: the ETO texture packs (base and Max Performance), the 6282 3D model pack and the Hungarian translation. The panel is shorter and clearer: PZO engine, Viewpoint NIGHTLY, RAM/JVM heap, ZombieBuddy, the workshop 3D model swap and the mods folder remain.",
    "ETO – alap és ETO – Max Performance kártya eltávolítva.":
      "ETO – base and ETO – Max Performance cards removed.",
    "6282 3D modell kártya eltávolítva.":
      "6282 3D model card removed.",
    "Magyarítás kártya eltávolítva.":
      "Hungarian translation card removed.",
    "A többi kártya (PZO, NIGHTLY, heap, ZombieBuddy, 3D models for Viewpoint, mod mappa) változatlanul működik.":
      "Every other card (PZO, NIGHTLY, heap, ZombieBuddy, 3D models for Viewpoint, mods folder) works unchanged.",
// ---- 0.9.35 (induló mód) ----
    "0.9.35 – A launcher a kedvenc módodban indul":
      "0.9.35 – The launcher starts in your usual mode",
    "Aki többet játszik egyjátékosban, annak a launcher Blackout módban nyílik meg; aki a szerveren játszik, annak a többjátékos módban. A launcher számolja az indításokat, és mindig a gyakrabban használt módot állítja be belépéskor; egyenlőségnél a legutóbbit használt módot hozza.":
      "Players who mostly play single-player get the launcher in Blackout mode; server players get the multiplayer mode. The launcher counts launches and always opens in the mode used more often, falling back to the last used mode on a tie.",
    "Induló mód = a gyakrabban használt mód (Blackout vagy szerver).":
      "Start-up mode = the mode you use more often (Blackout or server).",
    "Egyenlő számnál a legutóbb játszott mód jön be; ha még nincs adat, a szerver mód (a régi viselkedés).":
      "On a tie the last played mode is used; with no data yet the server mode (the old behaviour).",
    "A módváltó gomb továbbra is kézzel átvált, és azonnal érvényes.":
      "The mode switch button still changes it by hand, effective immediately.",
// ---- 0.9.34 (saját presetek védelme) ----
    "0.9.34 – A saját presetjeid nem vesznek el frissítéskor":
      "0.9.34 – Your own presets survive an update",
    "A config frissítése eddig felülírta a játékban mentett trait- és karakter-preseteket. Mostantól a launcher indulásnál rákérdez: megtartsa-e a sajátjaidat. Ha a „Megtartom a sajátomat” gombot választod, a trait/karakter presetjeidhez hozzá sem nyúl. Emellett a frissítés letöltése párhuzamosan fut (6 szál, fájlonként 90 mp-es időkorláttal), így nem ragad be, és a verziószám sem ugrál visszafelé: csak akkor mutat új verziót, ha az tényleg újabb a telepítettnél.":
      "Updating the config used to overwrite the trait and character presets saved in the game. Now the launcher asks on launch whether to keep yours. If you pick “Keep mine”, it will not touch your trait/character presets at all. The update download also runs in parallel (6 threads, 90 s per-file limit) so it no longer hangs, and the version number no longer jumps backwards: a new version is only shown when it is really newer than the installed one.",
    "Indulásnál felugrik a kérdés: megtartsam-e a saját trait- és karakter-presetjeidet?":
      "On launch a question appears: keep your own trait and character presets?",
    "„Megtartom a sajátomat” esetén a launcher nem írja felül a PlayerTraits.txt-t és a CHC (karakter-testreszabás) preseteket.":
      "With “Keep mine” the launcher does not overwrite PlayerTraits.txt or the CHC (character customisation) presets.",
    "A pakk alap presetjei csak kifejezett kérésre („A pakk alapját kérem”) kerülnek be, a régi elmentve.":
      "The pack defaults are only written on explicit request (“Use the pack defaults”), with the old files backed up.",
    "A frissítés letöltése 6 párhuzamos szállal + fájlonkénti 90 mp-es időkorláttal fut – nem ragad be a frissítés.":
      "The update download uses 6 parallel threads with a 90 s per-file timeout, so the update no longer hangs.",
    "A verziószám nem ugrál visszafelé: a hírfeed régebbi verziója nem jelenik meg új verzióként.":
      "The version number no longer jumps backwards: an older news feed version is not shown as a new version.",
// ---- 0.9.33 (új Blackout config) ----
    "0.9.33 – Új Blackout Protocol config: 719 mod, 2 új mod":
      "0.9.33 – New Blackout Protocol config: 719 mods, 2 new mods",
    "2 új mod a pakkban: Visible Laser Sights és HydeCo Knox Underground Viewpoint-támogatás (csatornák). Az Escape From Zomboid visszatért, az A-Life újra hangolva – kevesebb NPC, ugyanaz a világ. Hátra: collection puccolás és bugfix (Viewpoint Roofs, RV/camper interiorok). A launcher a ProjectZomboid64.json-t mostantól a config mellé adott launcher fájlból írja, ezért a PZO motor és a ZombieBuddy agent mindig bent van.":
      "2 new mods in the pack: Visible Laser Sights and HydeCo Knox Underground Viewpoint support (sewers). Escape From Zomboid is back, A-Life retuned – fewer NPCs, same living world. Left: collection cleanup and bug fixing (Viewpoint Roofs, RV/camper interiors). The launcher now writes ProjectZomboid64.json from the launcher file shipped with the config, so the PZO engine and the ZombieBuddy agent are always in place.",
    "Új modok: FunctionalLaserSights (látható lézer) és HydeCoUnderGroundViewpoint (HydeCo Knox Underground csatornák).":
      "New mods: FunctionalLaserSights (visible laser) and HydeCoUnderGroundViewpoint (HydeCo Knox Underground sewers).",
    "Escape From Zomboid visszatért: EscapeFromZomboidFirearms + EFZGroundModels + EFZPvadsBridge.":
      "Escape From Zomboid is back: EscapeFromZomboidFirearms + EFZGroundModels + EFZPvadsBridge.",
    "XCarDismantle: bármelyik autó szétszedhető működő autóért.":
      "XCarDismantle: any car can be dismantled into a working car.",
    "A-Life újra hangolva – kevesebb NPC, ugyanaz az élő világ.":
      "A-Life retuned – fewer NPCs, same living world.",
    "3 mod kikerült: NepWreckWorkingCars, CDALifePatch, CDAJCompatPatch (az A-Life 1.5.2 maga hozza a kompatot).":
      "3 mods removed: NepWreckWorkingCars, CDALifePatch, CDAJCompatPatch (A-Life 1.5.2 brings its own compat).",
    "A profil 719 mod (előtte 714), a sandbox preset változatlanul NeoiMods Ajánlott / Neoi-Suggested.":
      "The profile is 719 mods (was 714); the sandbox preset is still NeoiMods Ajánlott / Neoi-Suggested.",
    "A launcher JSON a config launcher fájljából készül: PZO motor, classpath és mindkét agent fixen bent.":
      "The launcher JSON is built from the config launcher file: PZO engine, classpath and both agents always present.",
// ---- 0.9.32 (PZO motor a JSON-ban) ----
    "0.9.32 – A launcher a JSON-ba írja a PZO motort és a ZombieBuddy agentet":
      "0.9.32 – The launcher writes the PZO engine and the ZombieBuddy agent into the JSON",
    "A játék a ProjectZomboid64.json-ból indul, és ha abból kimarad a PZO motor (mainClass, classpath) vagy valamelyik agent, a motor nem tölt be. A telepítők (PZO, ZombieBuddy) néha felülírják a fájlt, ezért a launcher mostantól minden indítás előtt ellenőrzi és pótolja: mainClass = com/pzoptimizer/PZOEntrypoint, classpath (PZO + ZombieBuddy + játék jar), -agentlib:pzo_native64 és -agentlib:zbNative. A fájl továbbra is csak ZGC-t tartalmaz és írásvédett marad, hogy a PZO ne írja vissza a G1-et.":
      "The game starts from ProjectZomboid64.json, and if the PZO engine (mainClass, classpath) or one of the agents is missing from it, the engine does not load. The installers (PZO, ZombieBuddy) sometimes overwrite the file, so the launcher now checks and completes it before every launch: mainClass = com/pzoptimizer/PZOEntrypoint, the classpath (PZO + ZombieBuddy + game jars), -agentlib:pzo_native64 and -agentlib:zbNative. The file still contains only ZGC and stays read-only so the PZO cannot write G1 back.",
    "A launcher indítás előtt pótolja a PZO motort a ProjectZomboid64.json-ban (mainClass + classpath).":
      "Before launching, the launcher completes the PZO engine in ProjectZomboid64.json (mainClass + classpath).",
    "Mindkét agent bekerül a JSON-ba: -agentlib:pzo_native64 és -agentlib:zbNative.":
      "Both agents go into the JSON: -agentlib:pzo_native64 and -agentlib:zbNative.",
    "A ZGC és a heap marad, a fájl továbbra is írásvédett (nincs több G1-visszaírás).":
      "ZGC and the heap stay, and the file stays read-only (no more G1 write-back).",
    "Ha a JSON már rendben van, nem írja újra a fájlt (nincs fölösleges írás/lexár).":
      "If the JSON is already correct, the file is not rewritten (no pointless writes/re-locks).",
// ---- 0.9.31 (a Viewpoint nem törlődik) ----
    "0.9.31 – A launcher nem törli többé a Viewpointot (újra 714 mod)":
      "0.9.31 – The launcher no longer deletes the Viewpoint (714 mods again)",
    "A NIGHTLY bevezetésekor a launcher kivette a gépről az alap Project Viewpoint workshop mappáját, hogy ne legyen két azonos ID-jű Viewpoint. Ez viszont az egész Viewpoint-ökoszisztémát magával vitte: a rá épülő kiegészítők (require=Viewpoint) csendben kimaradtak, ezért töltött be a játék csak 659 modot a 714 helyett. A launcher mostantól nem töröl és nem kapcsol ki semmit a workshopból. A hiányzó Viewpoint visszakerült a helyére (a lista ismét 714 mod), és ha valaha üres/kitörölt workshop mappa lenne, a modpack-telepítés újra letölti a SteamCMD-vel.":
      "When the NIGHTLY was introduced, the launcher removed the base Project Viewpoint workshop folder so there would not be two mods with the same ID. That took the whole Viewpoint ecosystem with it: the add-ons built on it (require=Viewpoint) were silently skipped, which is why the game loaded only 659 mods instead of 714. The launcher no longer deletes or disables anything in the workshop. The missing Viewpoint is back in place (the list is 714 mods again), and if a workshop folder ever ends up empty or deleted, the modpack install downloads it again with SteamCMD.",
    "A launcher nem törli az alap Viewpoint workshop mappáját – ez okozta a 659 modot.":
      "The launcher no longer deletes the base Viewpoint workshop folder – that caused the 659 mods.",
    "A Viewpoint visszaállt, a Blackout Protocol profil ismét 714 mod, a rá épülő kiegészítőkkel.":
      "The Viewpoint is restored, the Blackout Protocol profile is 714 mods again, with its add-ons.",
    "Üres workshop mappa (kitörölt tartalom) mostantól hiányzó modnak számít: a telepítés újra letölti.":
      "An empty workshop folder (deleted content) now counts as a missing mod: the install downloads it again.",
    "Ha a NIGHTLY és az alap Viewpoint egyszerre van a gépen, a launcher csak figyelmeztet, nem nyúl hozzá.":
      "If the NIGHTLY and the base Viewpoint are both present, the launcher only warns and touches nothing.",
// ---- 0.9.30 (ne induljon kétszer) ----
    "0.9.30 – A launcher nem indít második játékot":
      "0.9.30 – The launcher no longer starts a second game",
    "Ha a játék már fut vagy éppen tölt, a Play gomb többé nem indít mellé egy második példányt – nagy modpacknél a betöltés percekig tart, és eddig közben egy újabb kattintás második játékot indított. A launcherből is csak egy példány futhat: ha véletlenül másodszor is elindítod, a már nyitott ablak jön elő. Az állapotellenőrzés mostantól a valóban futó JVM-et nézi, a beragadt indító exe nem „futó játék” többé.":
      "If the game is already running or loading, the Play button no longer starts another instance next to it – with a large modpack loading takes minutes, and until now another click in the meantime started a second game. Only one launcher instance can run: starting it a second time brings up the window that is already open. The state check now looks at the JVM that is really running, so a stuck launcher exe no longer counts as a running game.",
    "A Play nem indít második példányt, ha a játék már fut vagy tölt (napló: „A játék már fut”).":
      "Play does not start a second instance when the game is already running or loading (log: “The game is already running”).",
    "A launcherből csak egy példány futhat – a második indítás a meglévő ablakot hozza elő.":
      "Only one launcher instance can run – starting it again focuses the existing window.",
    "Beragadt ProjectZomboid64.exe (JVM nélkül) nem számít futó játéknak, így nem blokkolja az indítást.":
      "A stuck ProjectZomboid64.exe (without a JVM) no longer counts as a running game, so it cannot block launching.",
    "Az állapotellenőrzés ritkábban kérdezi a Windows-t, hogy töltés közben ne vegyen el erőt a játéktól.":
      "The state check polls Windows less often, so it does not take power from the game while it loads.",
// ---- 0.9.29 (nightly csak kérésre) ----
    "0.9.29 – A Viewpoint NIGHTLY alapból nem települ le":
      "0.9.29 – The Viewpoint NIGHTLY is no longer downloaded by default",
    "A nightly mostantól opt-in: a mod-telepítés és az egyjátékos modpack sem tölti le magától. Ha kell, az Optimalizálás panel „Viewpoint NIGHTLY” kártyájával tehetsz fel (a Master mappából, a legújabb rc-t). Ha egyszer már bent van, a launcher továbbra is kezeli: engedélyezi, és a kollekció alap Project Viewpointját kiveszi mellőle, hogy ne legyen két azonos ID-jű mod.":
      "The nightly is opt-in now: neither the mod install nor the single-player modpack downloads it on its own. If you want it, use the “Viewpoint NIGHTLY” card in the Optimisations panel (from the Master folder, newest rc). Once it is installed the launcher still manages it: enables it and removes the collection’s base Project Viewpoint so there are no two mods with the same ID.",
    "A Viewpoint NIGHTLY nem települ magától (sem többjátékos, sem egyjátékos telepítésnél).":
      "The Viewpoint NIGHTLY is not installed automatically (neither multiplayer nor single-player install).",
    "Telepítés továbbra is: Optimalizálás → Viewpoint NIGHTLY (a Master mappából, a legújabb rc).":
      "To install: Optimisations → Viewpoint NIGHTLY (from the Master folder, newest rc).",
    "Ha bent van, a launcher engedélyezi és kiveszi mellőle az alap Project Viewpointot.":
      "When present, the launcher enables it and removes the base Project Viewpoint.",
    "Viewpoint NIGHTLY rc4: alapból NEM települ – az Optimalizálás panelen tudod feltenni (Zomboid\\mods), ZombieBuddy ≥ 2.3.0 kell hozzá.":
      "Viewpoint NIGHTLY rc4: NOT installed by default – install it from the Optimisations panel (Zomboid\\mods); needs ZombieBuddy ≥ 2.3.0.",
// ---- 0.9.28 (csak ZGC) ----
    "0.9.28 – Csak a ZGC marad":
      "0.9.28 – ZGC only",
    "A játék launcher JSON-jában mostantól kizárólag a ZGC szerepel: a launcher minden indításnál kiszedi a G1-re vonatkozó kapcsolókat (a windows szekciókból is), beteszi a ZGC-t, majd a fájlt írásvédetté teszi – így a PZO/optimalizáló sem tudja visszaírni a G1-et. A ProjectZomboid64.bat-ból is kikerülnek a ZGC-vel ütköző G1 opciók. Mindez mindkét módban (egyjátékos és többjátékos) így működik.":
      "The game launcher JSON now contains ZGC only: on every launch the launcher removes the G1 options (including from the Windows sections), adds ZGC and makes the file read-only, so the PZO/optimiser cannot write G1 back. G1 options that conflict with ZGC are removed from ProjectZomboid64.bat as well. This applies to both modes (single-player and multiplayer).",
    "Csak ZGC: a ProjectZomboid64.json minden indításnál ZGC-re áll, G1 kapcsolók nélkül.":
      "ZGC only: ProjectZomboid64.json is set to ZGC on every launch, without G1 flags.",
    "A JSON írásvédett lesz a beállítás után, így a PZO nem írja vissza a G1-et.":
      "The JSON is made read-only after the change, so PZO cannot write G1 back.",
    "A windows szekciók vmArgs listái is tiszták (nincs bennük GC-választó).":
      "The Windows vmArgs lists are clean too (no collector selection).",
    "A ProjectZomboid64.bat-ból is kiszedi a G1-re hangolt opciókat.":
      "G1-only options are removed from ProjectZomboid64.bat as well.",
    "Többjátékos módban is ZGC-vel indul a játék.":
      "Multiplayer mode launches with ZGC too.",
// ---- 0.9.27 (GC ütközés) ----
    "0.9.27 – A játék elindul: kijavítva a dupla garbage collector":
      "0.9.27 – The game launches again: the duplicate garbage collector is fixed",
    "A játék azért nem indult el, mert a ProjectZomboid64.json egyszerre tartalmazott -XX:+UseZGC-t és a Windows-szekcióban -XX:+UseG1GC-t. A JVM ezt írta ki: „Error occurred during initialization of VM – Multiple garbage collectors selected”, és leállt, mielőtt bármit naplózott volna. A launcher mostantól minden indításnál kiveszi a GC-választó (és a G1-re hangolt) kapcsolókat minden listából – a fő listából és a windows szekciókból is –, és csak egyet tesz be. Ugyanezt teszi a ProjectZomboid64.bat-tal.":
      "The game did not start because ProjectZomboid64.json contained both -XX:+UseZGC and, in the Windows section, -XX:+UseG1GC. The JVM printed “Error occurred during initialization of VM – Multiple garbage collectors selected” and stopped before logging anything. The launcher now strips garbage-collector selection (and G1-only) options from every list – the main one and the Windows sections – on each launch and adds exactly one. It does the same for ProjectZomboid64.bat.",
    "Javítva: a ProjectZomboid64.json-ból kikerülnek a duplikált/ütköző GC kapcsolók (ZGC + G1GC).":
      "Fixed: duplicate/conflicting GC flags (ZGC + G1GC) are removed from ProjectZomboid64.json.",
    "A windowshoz tartozó vmArgs listákból is tisztítja a GC-kapcsolókat és a G1-re hangolt opciókat.":
      "The Windows-specific vmArgs lists are cleaned of GC flags and G1-only options too.",
    "A ProjectZomboid64.bat-ból is kiveszi a ZGC-vel ütköző G1 kapcsolókat.":
      "G1 options that conflict with ZGC are also removed from ProjectZomboid64.bat.",
    "Indítás előtt ellenőrzi, hogy nem maradt-e két GC-választó, és a naplóban jelzi, ha a fájl nem írható.":
      "Before launching it verifies that only one GC remains and reports in the log when the file is not writable.",
// ---- 0.9.26 (ZombieBuddy csak ha kell) ----
    "0.9.26 – A ZombieBuddy telepítő már nem fut le minden alkalommal":
      "0.9.26 – The ZombieBuddy installer no longer runs every time",
    "A telepítő bezárja a Steamet, ezért mostantól csak akkor fut le, ha a ZombieBuddy agent tényleg nincs a gépen (sem a játék mappában, sem a Steam Workshopon). Ha az agent megvan, a launcher ezt írja a naplóba, és a Steamet békén hagyja. Kézi újratelepítéshez ott a ZombieBuddy gomb/kártya – az mindig lefuttatja a telepítőt.":
      "The installer closes Steam, so it now only runs when the ZombieBuddy agent is really missing (neither in the game folder nor in the Steam Workshop). When the agent is present the launcher says so in the log and leaves Steam alone. For a manual reinstall use the ZombieBuddy button/card – that always runs the installer.",
    "A ZombieBuddy telepítő csak akkor fut le, ha az agent hiányzik – nem minden mod-telepítésnél.":
      "The ZombieBuddy installer only runs when the agent is missing, not on every mod install.",
    "Ha az agent megvan, a Steam nem záródik be.":
      "When the agent is present, Steam is not closed.",
    "Kézi újratelepítés: ZombieBuddy gomb/kártya (az mindig futtatja a telepítőt).":
      "Manual reinstall: the ZombieBuddy button/card (it always runs the installer).",
// ---- 0.9.25 (játék indítás / Steam) ----
    "0.9.25 – A játék nem indult el, mert zárt Steam mellett próbálta":
      "0.9.25 – The game did not start because Steam had been closed",
    "A ZombieBuddy telepítő miatt a launcher bezárja a Steamet – utána viszont a játékot zárt Steammel indította, ezért az azonnal kilépett, a launcher pedig azt írta, hogy „a játék bezárult”. Mostantól a telepítés végén a Steam visszaindul, a JÁTÉK INDÍTÁSA pedig ellenőrzi a Steamet: ha nem fut, elindítja és megvárja (max. 60 mp), csak utána indítja a játékot. A futásérzékelés is javult: a B42-nél a játékot a java.exe viszi, nem a ProjectZomboid64.exe, ezért a launcher eddig akkor is „bezárult”-ot írt, ha a játék ment.":
      "The ZombieBuddy installer makes the launcher close Steam – and then the launcher started the game with Steam closed, so it exited immediately and the launcher reported that “the game closed”. Now Steam is started again at the end of the installation, and START GAME checks Steam: if it is not running, the launcher starts it and waits (up to 60 s) before launching the game. Process detection improved as well: on B42 the game runs in java.exe, not ProjectZomboid64.exe, so the launcher used to report “closed” even while the game was running.",
    "Játék indítása: ha a Steam nem fut, a launcher elindítja és megvárja, mielőtt a játékot indítaná.":
      "Starting the game: if Steam is not running, the launcher starts it and waits before launching the game.",
    "ZombieBuddy telepítés után a Steam automatikusan visszaindul (a telepítő miatt zártuk be).":
      "Steam is restarted automatically after the ZombieBuddy installation (it was closed for the installer).",
    "Futásérzékelés: a java.exe-s játékfolyamatot is felismeri, nem csak a ProjectZomboid64.exe-t.":
      "Process detection also recognises the java.exe game process, not only ProjectZomboid64.exe.",
    "Indítás után 15 mp-cel ellenőrzi, hogy a játék tényleg fut-e, és ha nem, a naplóban jelzi.":
      "Fifteen seconds after launch the launcher verifies that the game is really running and says so in the log if not.",
    "Nincs több hamis „a játék bezárult” üzenet a sikeres indítás után.":
      "No more false “the game closed” messages after a successful start.",
// ---- 0.9.24 (új blackout config + ONFIRE) ----
    "ON FIRE – ami most a legfontosabb (Blackout Protocol)":
      "ON FIRE – what matters most right now (Blackout Protocol)",
    "Új Blackout Protocol config csomag: 714 aktív mod, újrahangolt balance (zombik alacsony, városra összpontosítva; élelem 0.4 / fegyver 0.2 / gazdálkodás 0.4; víz és áram 7–14 nap között megy el; 1 órás napok, július 1-i indulás; ritkább helikopter/meta esemény; generátor 0.1 fogyasztás). A config csak az EGYJÁTÉKOS (single-player) módot érinti, és automatikusan bekerül a játékba, ahogy eddig: a MODOK TELEPÍTÉSE / FRISSÍTÉSE után a launcher bemásolja, és a „Blackout Protocol” profilt használja. 1) PROJECT VIEWPOINT – NIGHTLY 0.1.7 rc4: ez NEM a Workshop-ös alpha 0.1.6! A launcher a Master mappából teszi be a Zomboid\\mods mappába, és kell hozzá ZombieBuddy ≥ 2.3.0. A nightly a Project Viewpoint Discord „nightly-releases” csatornájából jön (role: select roles → nightly test). Teszt build: először csak a magot + ZombieBuddy-t tedd be, az addonokat utána, egyesével – ha fekete a kép, addon a bűnös. 2) PROJECT A-LIFE 1.5.2 (Workshop 3803984183, mod id ProjectALifeNPCs): NPC-k vezetnek autót, 148 frakció, outpostok, rádió, rablás, raid. Kell hozzá ZombieBuddy + Viewpoint x A-LIFE (3822854313). Ha lagol: A-Life sandbox → Performance level = Auto, Zombie path/sec 10. 3) A PRESETEK: ujj játéknál a „Neoi-Suggested” (angol) vagy „NeoiMods Ajánlott” (magyar) sandbox preset – a kettő tartalma azonos. 4) UNDYING OPTIMIZER: bent van a listában (a PZO utódja); a Tempo_PerfKit és a Multi-CPU kikerült, mert az utóbbi egy vanilla ProjectZomboid64.json-t hozna, és tönkretenné a ZGC-s indítót.":
      "New Blackout Protocol config pack: 714 active mods, rebalanced sandbox (low zombie count focused on towns; food 0.4 / weapons 0.2 / farming 0.4; water and power gone between day 7 and 14; 1-hour days starting July 1; rarer helicopter/meta events; generator fuel use 0.1). The config only affects SINGLE-PLAYER, and it is copied into the game automatically as before: after INSTALL / UPDATE MODS the launcher copies it in and uses the “Blackout Protocol” profile. 1) PROJECT VIEWPOINT – NIGHTLY 0.1.7 rc4: this is NOT the Workshop alpha 0.1.6! The launcher installs it from the Master folder into Zomboid\\mods, and it needs ZombieBuddy ≥ 2.3.0. The nightly comes from the Project Viewpoint Discord “nightly-releases” channel (role: select roles → nightly test). Test build: install the core + ZombieBuddy first, then the addons one by one – if the screen is black, an addon is the culprit. 2) PROJECT A-LIFE 1.5.2 (Workshop 3803984183, mod id ProjectALifeNPCs): NPCs drive cars, 148 factions, outposts, radio, robbery, raids. Needs ZombieBuddy + Viewpoint x A-LIFE (3822854313). If it lags: A-Life sandbox → Performance level = Auto, Zombie path/sec 10. 3) THE PRESETS: for a new game pick the “Neoi-Suggested” (English) or “NeoiMods Ajánlott” (Hungarian) sandbox preset – identical content. 4) UNDYING OPTIMIZER is in the list (successor of PZO); Tempo_PerfKit and Multi-CPU were removed, because the latter ships a vanilla ProjectZomboid64.json and would break the ZGC launcher.",
    "Új config csomag: 714 mod, újrahangolt sandbox balance – csak egyjátékos módban, automatikusan.":
      "New config pack: 714 mods, rebalanced sandbox – single-player only, applied automatically.",
    "Viewpoint NIGHTLY rc4: egyjátékos telepítésnél a launcher magától felrakja (Zomboid\\mods), ZombieBuddy ≥ 2.3.0 kell hozzá.":
      "Viewpoint NIGHTLY rc4: installed automatically during a single-player install (Zomboid\\mods); needs ZombieBuddy ≥ 2.3.0.",
    "A nightly a Project Viewpoint Discord „nightly-releases” csatornájából jön (role: select roles → nightly test).":
      "The nightly comes from the Project Viewpoint Discord “nightly-releases” channel (role: select roles → nightly test).",
    "A-LIFE 1.5.2: autót vezető NPC-k, 148 frakció, outpostok; lag esetén Performance level = Auto, Zombie path/sec 10.":
      "A-LIFE 1.5.2: NPCs drive cars, 148 factions, outposts; if it lags set Performance level = Auto, Zombie path/sec 10.",
    "Sandbox preset: „Neoi-Suggested” / „NeoiMods Ajánlott” (azonos tartalom).":
      "Sandbox preset: “Neoi-Suggested” / “NeoiMods Ajánlott” (identical content).",
    "Undying Optimizer bent; Tempo_PerfKit és Multi-CPU kikerült (a vanilla JSON tönkretenné a ZGC-s indítót).":
      "Undying Optimizer included; Tempo_PerfKit and Multi-CPU removed (the vanilla JSON would break the ZGC launcher).",
    "Az ONFIRE leírás kikerült a config csomagból – csak itt, a Blackout hírekben olvasható.":
      "The ONFIRE description left the config pack – it is only shown here, in the Blackout news.",
// ---- 0.9.23 (rc4 kiválasztás) ----
    "0.9.23 – A nightly mostantól a legújabb rc-t telepíti (rc4)":
      "0.9.23 – The nightly now installs the newest rc (rc4)",
    "A Master mappában két nightly zip van (rc2 és rc4), és a launcher a lista első találatát telepítette – ez az rc2 volt. Mostantól a verzió és az rc szám szerint a legújabb nyer, tehát a 42.22-re készült 0.1.7-rc4 kerül be. Aki eddig rc2-t kapott, annál a következő telepítés automatikusan rc4-re cseréli.":
      "The Master folder holds two nightly zips (rc2 and rc4) and the launcher installed the first match in the list – which was rc2. The newest version and rc number now wins, so the 0.1.7-rc4 build made for 42.22 is installed. Anyone who got rc2 before is switched to rc4 by the next install.",
    "NIGHTLY: a legújabb verzió/rc nyer (rc4 az rc2 helyett), nem a lista első találata.":
      "NIGHTLY: the newest version/rc wins (rc4 instead of rc2), not the first match in the list.",
    "NIGHTLY: a meglévő rc2 telepítést a következő futás rc4-re cseréli.":
      "NIGHTLY: an existing rc2 install is replaced with rc4 on the next run.",
// ---- 0.9.22 (Steam bezárás + helyi nightly) ----
    "0.9.22 – ZombieBuddy telepítő újra, Steam bezárással; a nightly a mods mappában marad":
      "0.9.22 – ZombieBuddy installer back, with Steam shutdown; the nightly stays in the mods folder",
    "A ZombieBuddy telepítő ismét lefut: a launcher bezárja a Steamet, ha fut (előbb szabályosan, ha kell, kényszerítve) – enélkül a telepítő nem megy végig –, és a telepítő saját ablakában fut, hogy végig lehessen követni. A Viewpoint NIGHTLY továbbra is kizárólag a Zomboid\\mods mappába települ, a workshop mappába nem írunk: a bent maradt workshop Viewpoint példányt vesszük ki, hogy ne legyen két azonos ID-jű mod. A ZombieBuddy kártya az endoftheliving oldalon is elérhető, tehát onnan is telepíthető.":
      "The ZombieBuddy installer runs again: the launcher closes Steam if it is running (gracefully first, forcefully if needed) – without that the installer never finishes – and the installer runs in its own window so you can follow it. The Viewpoint NIGHTLY is still installed only into Zomboid\\mods; nothing is written into the Workshop folder, and the leftover Workshop Viewpoint copy is removed so there are no two mods with the same ID. The ZombieBuddy card is also available on the endoftheliving page, so it can be installed from there too.",
    "ZombieBuddy: a launcher bezárja a Steamet, ha fut, és megvárja, míg eltűnik (szükség esetén kényszerített bezárás).":
      "ZombieBuddy: the launcher closes Steam if it is running and waits for it to disappear (force-closing if needed).",
    "ZombieBuddy: a telepítő (exe vagy bat) látható ablakban fut, hogy biztosan végigmenjen.":
      "ZombieBuddy: the installer (exe or bat) runs in a visible window so it can finish properly.",
    "ZombieBuddy: ha nincs bat a Master mappában, a hivatalos exe telepítő fut le.":
      "ZombieBuddy: with no bat in the Master folder, the official exe installer runs.",
    "ZombieBuddy kártya az endoftheliving (többjátékos) oldalon is megjelenik – onnan is telepíthető.":
      "The ZombieBuddy card also shows on the endoftheliving (multiplayer) page, so it can be installed from there.",
    "NIGHTLY: kizárólag a Zomboid\\mods\\Viewpoint mappába települ, a workshop mappába nem írunk.":
      "NIGHTLY: installs only into Zomboid\\mods\\Viewpoint; nothing is written into the Workshop folder.",
    "NIGHTLY: a workshopon maradt Viewpoint példány kikerül, hogy ne legyen két azonos ID-jű mod.":
      "NIGHTLY: the Workshop Viewpoint copy is removed so there are no two mods with the same ID.",
// ---- 0.9.21 (nightly + installer javítás) ----
    "0.9.21 – A nightly és a ZombieBuddy telepítés javítva":
      "0.9.21 – Fixed the nightly and ZombieBuddy installation",
    "A Viewpoint NIGHTLY eddig csendben nem töltődött be: a játék a régi workshop Viewpointot (0.1.6.2) látta helyette. Mostantól a nightly a meglévő workshop példány helyére kerül (nincs két azonos ID-jű Viewpoint), telepítés előtt ideiglenes mappába csomagolunk és csak ellenőrzés után cserélünk, a napló pedig kiírja, ha a játékbuild (42.22) vagy a ZombieBuddy agent hiánya miatt a mod nem tud betöltődni. A ZombieBuddy telepítés sem maradhat ki: ha nincs installer bat a Master mappában, a hivatalos exe telepítő fut le, ha van bat, akkor a játék mappájába másolva futtatjuk – így a saját mappájához képest másoló installer is jó helyre telepít, és a bat végén lévő pause sem akasztja meg a launchert.":
      "The Viewpoint NIGHTLY silently did not load: the game kept seeing the old Workshop Viewpoint (0.1.6.2) instead. The nightly is now installed into the existing Workshop item folder (so there are no two mods with the same ID), it is unpacked into a temporary folder and only swapped in after a check, and the log now says when the game build (42.22) or a missing ZombieBuddy agent prevents it from loading. The ZombieBuddy step no longer silently does nothing either: if there is no installer bat in the Master folder, the official exe installer runs; if there is a bat, it is copied into the game folder and run there, so installers that copy relative to their own folder land in the right place, and a trailing pause cannot hang the launcher.",
    "NIGHTLY: a meglévő workshop Viewpoint mappájába települ (nincs duplikált mod ID), a régi helyi másolat törlődik.":
      "NIGHTLY: installs into the existing Workshop Viewpoint folder (no duplicate mod ID); the old local copy is removed.",
    "NIGHTLY: ideiglenes mappába csomagolás + ellenőrzés, csak utána csere – félkész kicsomagolás nem viszi el a működő modot.":
      "NIGHTLY: unpacked into a temporary folder and verified before swapping – a half-finished extraction cannot destroy a working mod.",
    "NIGHTLY: a launcher kiírja, ha a játékbuild kívül esik a 42.22-es ablakon, vagy hiányzik a ZombieBuddy agent (≥2.3.0).":
      "NIGHTLY: the launcher reports when the game build is outside the 42.22 window or the ZombieBuddy agent (≥2.3.0) is missing.",
    "Az alap workshop Viewpointot már nem töröljük – a Steam visszatöltötte, és két azonos ID-jű Viewpoint keletkezett.":
      "The base Workshop Viewpoint is no longer deleted – Steam restored it, leaving two mods with the same ID.",
    "ZombieBuddy: bármelyik .bat szóba jön a Master mappából (a ZombieBuddy nevűt választja), ha nincs bat, az exe telepítő fut.":
      "ZombieBuddy: any .bat in the Master folder is accepted (the ZombieBuddy one is preferred); with no bat the exe installer runs.",
    "ZombieBuddy: a bat a játék mappájába kerül és ott fut, így a %~dp0 is oda mutat.":
      "ZombieBuddy: the bat is copied into the game folder and runs there, so %~dp0 points at the game folder.",
    "ZombieBuddy: a bat stdin nélkül fut (a pause nem akasztja meg) és 20 perc után leáll.":
      "ZombieBuddy: the bat runs without stdin (a pause no longer hangs it) and is stopped after 20 minutes.",
    "A napló jelzi, ha a ZombieBuddy agent a Steam Workshopról töltődik be, illetve ha egyáltalán nincs a gépen.":
      "The log reports when the ZombieBuddy agent loads from the Steam Workshop, and when it is missing entirely.",
// ---- 0.9.20 (ZombieBuddy bat) ----
    "0.9.20 – A ZombieBuddy-t mostantól a Master mappában lévő installer bat telepíti":
      "0.9.20 – ZombieBuddy is installed by the installer bat in the Master folder",
    "A launcher már nem telepít ZombieBuddy agentet magától (se exe-telepítőt, se agent fájlmásolást a modokból): a Master mappában lévő ZombieBuddy installer bat-ot futtatja le a játék mappájában, a kimenetét pedig a naplóba írja. Ha nincs ilyen bat a Master mappában, a launcher ezt jelzi a naplóban, és nem nyúl semmihez. A MODOK TELEPÍTÉSE / FRISSÍTÉSE és a ZombieBuddy kártya is ugyanezt a bat-ot futtatja.":
      "The launcher no longer installs the ZombieBuddy agent itself (no automated exe installer, no copying agent files out of mod folders): it runs the ZombieBuddy installer bat from the Master folder inside the game folder and writes its output to the log. If there is no such bat in Master, the launcher says so in the log and touches nothing. Both INSTALL / UPDATE MODS and the ZombieBuddy card run that same bat.",
    "ZombieBuddy: csak a Master mappában lévő installer bat fut le, a launcher nem telepít agentet maga.":
      "ZombieBuddy: only the installer bat in the Master folder runs; the launcher no longer installs the agent itself.",
    "Megszűnt az exe-telepítő automatizálása és a mod mappákból való agent másolgatás.":
      "The automated exe installer and the agent copying from mod folders are gone.",
    "A bat a játék mappájában fut, a kimenete soronként a naplóba kerül.":
      "The bat runs inside the game folder and its output goes to the log line by line.",
    "Ha nincs bat a Master mappában, a launcher jelzi („Nincs ZombieBuddy installer bat a Master/ mappában”), és nem módosít semmit.":
      "If Master has no bat, the launcher says so (“No ZombieBuddy installer bat in the Master/ folder”) and changes nothing.",
    "Nem nulla kilépési kódnál a napló kiírja a kódot, a telepítés többi része ettől még lefut.":
      "A non-zero exit code is logged; the rest of the install still runs.",
// ---- 0.9.19 (frissítő null javítás) ----
    "0.9.19 – Javítva a „Cannot read properties of null”, ami megakasztotta a frissítést":
      "0.9.19 – Fixed the “Cannot read properties of null” that stalled the update",
    "Ha a GitHub API kiesett vagy rate-limitelt (403), a launcher a repóban tárolt frissítés-indexből dolgozik – abban viszont nem volt commit-azonosító. Ezért a frissítés naplózása „Cannot read properties of null” hibával elszállt, és a frissítés el sem indult. Mostantól a frissítés-index tartalmazza a commit sha-t, a kód pedig ellenőrzi, hogy egyáltalán van-e, így az API kiesése sem akasztja meg a frissítést. Ez a javítás a már telepített régi launcherökön is működik, mert az index adatként érkezik, nem a program része.":
      "When the GitHub API went down or hit a rate limit (403), the launcher used the update index stored in the repo – but that index had no commit id. Logging the update then threw “Cannot read properties of null” and the update never started. The index now carries the commit sha, and the code checks whether there is one at all, so an API outage cannot block the update anymore. This fix also works on already-installed older launchers, because the index is data, not part of the program.",
    "Az update-manifest.json mostantól tartalmazza a commit sha-t (eddig nem volt benne).":
      "update-manifest.json now carries the commit sha (it had none before).",
    "A „Cannot read properties of null” hiba megszűnt: a naplózás ellenőrzi, van-e sha.":
      "The “Cannot read properties of null” error is gone: the logging checks whether a sha exists.",
    "GitHub API kiesés vagy rate-limit esetén is elindul a frissítés, fájlonkénti hash-ellenőrzéssel.":
      "Updates start even when the GitHub API is down or rate-limited, with per-file hash checks.",
    "A javítás a már telepített régi launcherökön is működik, mert az index adatként jön.":
      "The fix also works on already-installed older launchers, because the index arrives as data.",
// ---- 0.9.18 (frissítő javítás) ----
    "FRISSÍTŐ":
      "UPDATER",
    "0.9.18 – Javítva a frissítő, ami beragaszthatta a launchert":
      "0.9.18 – Fixed the updater that could jam the launcher",
    "A frissítő eddig fájlonként írta felül a launchert, ezért ha egy fájl letöltése elbukott (például a GitHub néhány percig a régi változatot adta), a launcher félig frissülten maradt, és utána már nem tudott frissülni. Mostantól minden fájl előbb egy ideiglenes mappába töltődik, méret- és hash-ellenőrzéssel, és csak akkor cserélődik, ha mindegyik hibátlan – ha bármi elbukik, a launcher érintetlen marad. A letöltés újrapróbálkozik (cache-busting), a cseréről pedig biztonsági mentés készül, hiba esetén automatikus visszaállítással.":
      "The updater used to overwrite the launcher file by file, so if one download failed (for example GitHub served the old version for a few minutes) the launcher was left half-updated and could not update afterwards. Now every file first goes into a staging folder with size and hash checks, and is only swapped in when all of them are intact – if anything fails, the launcher stays untouched. Downloads retry with cache-busting, and the swap is backed up with automatic rollback on error.",
    "Minden fájl staging mappába töltődik, méret/hash ellenőrzéssel; csere csak teljes siker esetén.":
      "Every file is downloaded into a staging folder with size/hash checks; the swap only happens when all succeed.",
    "Hiba esetén a launcher változatlan marad – nincs több félig frissített állapot.":
      "On failure the launcher stays untouched – no more half-updated state.",
    "Letöltésnél 3 próba és cache-busting, hogy a CDN késleltetett másolata ne akassza meg a frissítést.":
      "Downloads retry three times with cache-busting so a delayed CDN copy cannot block the update.",
    "A cseréről mentés készül (update-backup), hiba esetén automatikus visszaállítás.":
      "The swap is backed up (update-backup) with automatic rollback on error.",
    "Akit már beragasztott a régi frissítő: a pixeldrain-es zip újratelepítése hozza helyre.":
      "Already stuck with the old updater? Reinstalling the pixeldrain zip fixes it.",
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
