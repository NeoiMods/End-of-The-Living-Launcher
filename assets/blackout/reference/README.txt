BLACKOUT PROTOCOL — CONFIG PACK v2
Project Zomboid B42.22.2  |  714 aktiv mod  |  frissitve: 2026-11-14

====================================================================
ELOFELTETEL (ezt nem lehet becsomagolni)
====================================================================
  A MODOK MAGUK NINCSENEK ITT. A Steam Workshop-rol jonnek.
  Iratkozz fel a collection-re, inditsd el egyszer a jatekot,
  hogy a Steam letoltse a modokat - utana mukodik a lista.
  Ha egy mod nincs feliratkozva, a jatek egyszeruen kihagyja, nem hibazik el.

====================================================================
MAGYAR
====================================================================
MI VAN BENNE
  config/options.ini ........................ grafika (fullscreen, textura-lepcs)
  config/pz_modlist_settings.cfg ............ modprofilok, benne a "Blackout Protocol" (714 mod)
  config/ModListData.ini .................... a ModManager katalogusa (workshop ID-k)
  config/keys.ini, keysB42.ini .............. TELJES billentyukiosztas (a te beallitasod)
  config/modlist_blackout_protocol.txt ...... a lista, egy sor egy mod (ellenorzeshez)
  Sandbox Presets/Neoi-Suggested.cfg ........ ujrahangolt sandbox preset (angol nev)
  Sandbox Presets/NeoiMods Ajanlott.cfg ..... ugyanaz, magyar nevvel (AZONOS tartalom)
  launcher/ProjectZomboid64.bat ............. a ZGC-s indito (+ .txt masolat)
  ONFIRE.txt ................................ Viewpoint nightly rc4 + A-Life 1.5.2 reszletek
  CHANGELOG_modok.txt ....................... mi jott be, mi ment ki (+32 / -74)

MI VALTOZOTT A BALANCE-BAN (sandbox preset)
  Zombik: Alacsony (Zombies=5), varosra osszpontositott eloszlas
  Respawn: ritkan, migracio BE
  Loot: elelmiszer 0.4 / fegyver 0.2 / gazdalkodas 0.4
  Viz es aram: 7-14 nap kozott megy el (nem azonnal, nem is soha)
  Ido: 1 oras napok, indulás julius 1.
  Idojaras: mersekelt homerseklet, gyakrabb csapadek, lassabb erozio
  Helikopter/meta esemeny: ritka
  Generator: 0.1 uzemanyag-fogyasztas (sokkal tovabb bir)
  Ez BALANCE, nem FPS-beallitas. A teljesitmenyt a launcher es a modlista adja.

TELEPITES
  1. Zar be a jatekot.
  2. config/options.ini          ->  Zomboid\options.ini
  3. config/pz_modlist_settings.cfg -> Zomboid\Lua\pz_modlist_settings.cfg
  4. config/ModListData.ini      ->  Zomboid\Lua\ModManager\ModListData.ini
  5. config/keys.ini + keysB42.ini -> Zomboid\Lua\   (MINDKETTO kell!)
  6. Sandbox Presets tartalma    ->  Zomboid\Sandbox Presets\
  7. launcher/ProjectZomboid64.bat -> <Steam>\steamapps\common\ProjectZomboid\ (mentsd el a regit!)
  8. Indits, valaszd a "Blackout Protocol" profilt.
     Uj jateknal: sandbox preset "Neoi-Suggested" / "NeoiMods Ajanlott".

BILLENTYUKIOSZTAS
  A keys.ini a regi (B41-es) rendszer, a keysB42.ini a B42-es. MINDKETTO
  kell, kulonben a jatek visszaallitja a defaultot. A jatekban:
  Options -> Key Bindings - itt latod listas formaban, mi mire van kotve.
  Ha valamit at akarsz irni, tedd a jatekban, mert inditaskor felulirja a fajlt.

FONTOS
  - A jatek a ProjectZomboid64.bat-ot inditja, NEM a JSON-t.
  - Ha a launcher mappa ures (antivirus kivehette a .bat-ot), hasznald a .bat.txt-t.
  - A config csak a BEALLITAS. A modok, a terkep es a Java loader kulon kell.

====================================================================
ENGLISH
====================================================================
REQUIREMENT (cannot be packaged)
  THE MODS THEMSELVES ARE NOT INCLUDED. They come from the Steam Workshop.
  Subscribe to the collection and start the game once so Steam downloads them.
  If a mod is not subscribed, the game simply skips it.

WHAT IS INSIDE
  config/options.ini ........................ graphics settings
  config/pz_modlist_settings.cfg ............ mod profiles incl. "Blackout Protocol" (714 mods)
  config/ModListData.ini .................... ModManager catalogue (workshop IDs)
  config/keys.ini, keysB42.ini .............. FULL key bindings (your setup)
  config/modlist_blackout_protocol.txt ...... the list, one mod per line
  Sandbox Presets/Neoi-Suggested.cfg ........ rebalanced sandbox preset (English name)
  Sandbox Presets/NeoiMods Ajanlott.cfg ..... identical file, Hungarian name
  launcher/ProjectZomboid64.bat ............. the ZGC launcher (+ .txt copy)
  ONFIRE.txt ................................ Viewpoint nightly rc4 + A-Life 1.5.2 details
  CHANGELOG_modok.txt ....................... what came in, what went out (+32 / -74)

WHAT CHANGED IN THE BALANCE (sandbox preset)
  Zombies: Low (Zombies=5), urban-focused distribution
  Respawn: rare, migration ON
  Loot: food 0.4 / weapons 0.2 / farming 0.4
  Water and power: gone between day 7 and 14 (not instantly, not never)
  Time: 1-hour days, starting July 1
  Weather: moderate temperature, more frequent rain, slower erosion
  Helicopter/meta events: rare
  Generator: 0.1 fuel consumption (lasts far longer)
  This is BALANCE, not an FPS setting. Performance comes from the launcher and the mod list.

INSTALL
  1. Close the game.
  2. config/options.ini             ->  Zomboid\options.ini
  3. config/pz_modlist_settings.cfg ->  Zomboid\Lua\pz_modlist_settings.cfg
  4. config/ModListData.ini         ->  Zomboid\Lua\ModManager\ModListData.ini
  5. config/keys.ini + keysB42.ini  ->  Zomboid\Lua\   (BOTH are needed!)
  6. contents of Sandbox Presets    ->  Zomboid\Sandbox Presets\
  7. launcher/ProjectZomboid64.bat  ->  <Steam>\steamapps\common\ProjectZomboid\ (back up the old one!)
  8. Start the game, pick the "Blackout Protocol" profile.
     New game: sandbox preset "Neoi-Suggested" / "NeoiMods Ajanlott".

KEY BINDINGS
  keys.ini is the old (B41) system, keysB42.ini is the B42 one. BOTH are
  required, otherwise the game resets them to default. In game:
  Options -> Key Bindings shows the full list in readable form.
  If you want to change something, do it in game - the file is overwritten on launch.

IMPORTANT
  - The game launches through ProjectZomboid64.bat, NOT the JSON.
  - If the launcher folder is empty (antivirus may remove .bat), use the .bat.txt.
  - This config is settings only. Mods, the map and the Java loader are separate.

CREDITS
  Blackout Protocol / NEOi Mods. Every mod belongs to its original author.
