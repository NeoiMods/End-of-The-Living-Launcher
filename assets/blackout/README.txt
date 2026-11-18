BLACKOUT PROTOCOL - LAUNCHER CONFIG
===================================
Mentés: 2026-11-18 | 671 aktív mod | Project Zomboid Build 42 (app 108600)

FÁJLOK
------
mods.txt                                  <- a betöltési sorrend (671 mod), ez megy a mentésbe
mods - for Zomboid-mods-default.txt       <- ugyanaz, beszédes névvel (globális lista)
workshop_ids.txt                          <- 574 workshop elem, amire fel kell iratkozni
modlist.json                              <- gépi manifest: sorrend, név, workshop id, célok
local_mods/PZOPatchPhobosZReVaccinStub/   <- az EGYETLEN nem workshop mod

configs/                                  <- a launcher által telepítendő beállítások
  install-map.json                        <- gépileg olvasható forrás -> cél lista (ez alapján másoljon a launcher)
  Zomboid/Sandbox Presets/Neoi-Suggested.cfg
  Zomboid/Lua/pz_modlist_settings.cfg     <- "Blackout Protocol" mod preset (671 id, ugyanaz a sorrend)
  Zomboid/Lua/saved_builds.txt            <- trait presetek: NeoiUltimate (+ NeoiSurvivor, EOTLNEOI)
  Zomboid/Lua/keysB42.ini                 <- keybind mentés (B42)
  Zomboid/mods/default.txt                <- 671 modos globális lista
  zombie_buddy/mod_approvals.json         <- ZombieBuddy mod jóváhagyások
  game/ProjectZomboid64.bat               <- indító (PZO + ZombieBuddy agent, 8 GB heap)
  game/ProjectZomboid64.json              <- ugyanaz Steam indításhoz

discord/discohook.json                    <- kész Discohook import ("version": "d2", messages[].data)
discord/discohook-uzenet.md               <- ugyanaz kézi beillesztéshez (sima markdown)

HOVA KERÜL (configs/)
---------------------
configs/Zomboid/...            -> %USERPROFILE%\Zomboid\...          (mappaszerkezet egyezik)
configs/zombie_buddy/...       -> %USERPROFILE%\.zombie_buddy\...
configs/game/...               -> <Steam>\steamapps\common\ProjectZomboid\
mods.txt                       -> %USERPROFILE%\Zomboid\mods\default.txt
                               és  %USERPROFILE%\Zomboid\Saves\<Mode>\<Save>\mods.txt

A launcher másolás előtt minden felülírt fájlról készítsen .bak-ot.
A pz_modlist_settings.cfg-nél elég az 1 sort ("Blackout Protocol:...") hozzáfűzni,
ha a játékosnak már vannak saját presetjei - így nem vesznek el.

PRESETEK
--------
Sandbox : Neoi-Suggested            (%USERPROFILE%\Zomboid\Sandbox Presets\Neoi-Suggested.cfg)
Trait   : NeoiUltimate              (saved_builds.txt)
Mod     : Blackout Protocol         (pz_modlist_settings.cfg, 671 id = a mods.txt sorrendje)

A régi "Blackout Protocol" preset 673 idot tartalmazott; ez a csomag a mentés
671 modját viszi. Különbség a régi presetthez képest:
  kikerült (10): BundleUp, BundleUpGoM, BundleUpUI, TarkovMovement, ReloadBackAgain,
                 CompanionDogsPug, CompanionDogsRottweiler, CompanionDogsDoberman,
                 CompanionDogsLivestockGuardians, ProjectViewpointParkour
  bekerült (8):  AftermathRadio, BackpackRummage, ProjectViewpointADS, EFZPvadsBridge,
                 NicksInventorySelectionFix, NicksMoveableWorkstations, PerfectMoovment,
                 VehicleDismantle

FORMÁTUM (ne változtasd)
------------------------
mods.txt: ASCII, CRLF, nincs BOM, 4 szóköz behúzás:
  VERSION = 1,
  (üres sor)
  mods
  {
      mod = <modId>,
      ...
  }
  (üres sor)
  maps
  {
  }

FONTOS: MI NINCS BENNE ÉS MIÉRT
--------------------------------
- options.ini  ->  SZÁNDÉKOSAN kimaradt: ebben van a NYELV (magyar) + felbontás + grafika.
  Ha ezt átadnánk, mindenkinél magyar lenne a UI és felülírnánk a videóbeállításait.
  Ezért csak a keysB42.ini (keybind) megy át, a grafika nem.
- modOptions.ini (101 KB, MCM beállítások) -> nem kérted; enélkül a modok alapértelmezett
  értékeken indulnak. Ha kell, külön csomagoljuk.
- A mentés maga (Saves\...) nincs benne, csak a modlista.

ISMERT KORLATOK / FIGYELMEZTETÉSEK
----------------------------------
1) A mods.txt csak SORREND + bekapcsolt lista, modot nem telepít. A workshop elemekre fel kell
   iratkozni (workshop_ids.txt), a local_mods-ot a Zomboid\mods alá kell másolni.
2) ProjectZomboid64.bat / .json CSAK akkor indul el, ha a játék mappájában ott van:
   ZombieBuddy.jar, PZOptimEngine.jar, zbNative.dll, pzo_native64.dll.
   Ezek nincsenek a csomagban! Ha a launcher nem telepíti őket, a .bat/.json használhatatlan
   (a JVM már az agent betöltésénél elhal). Ilyenkor hagyni kell a játék saját indítóját.
3) A .bat/.json 8192 MB heapet kér (Xms=Xmx), a .json ráadásul AlwaysPreTouch-sal.
   8 GB alatti RAM-mal / 16 GB-os gépen futó egyéb programok mellett ez nem javasolt.
   A .bat ZGC-t, a .json G1GC-t használ - a kettő nem ugyanaz a konfiguráció.
4) A játék Program Files alatt van -> a .bat/.json felülírásához adminisztrátori jog kell.
   A Steam frissítéskor visszaállíthatja ezeket a fájlokat.
5) A .zombie_buddy/mod_approvals.json a modok JAR hash-ére hivatkozik. Ha a workshopon
   frissül egy mod, a hash nem egyezik, és a ZombieBuddy újra kérdezhet.
6) A játék csak ZÁRVA olvassa/írja a listákat. Telepítés a játék bezárása után történjen.
   Kilépéskor a játék felülírhatja a globális default.txt-et a saját listájával.
7) 3 mod függőségi célja nincs aktív (a játék ezeket kihagyja, nem hiba):
   SKITTLE_LongTermPreservation <- LongTermPreservationExtended
   SpnCharCustom                <- TombBodyCustom
   FancyHandwork                <- VVA_slowdoors
8) 1 ütköző pár, mindkettő aktív: duffel_backpack <-> twistdufflebag.
9) 4 mod id két workshop elemben is létezik (PZVoxelStudioViewpoint, FixedLightOnBeltAF,
   SPNCC, SPNCCDetails) -> a workshop_ids.txt ezért 574 elem, a modlist.json a legfrissebb
   telepített mappát adja meg modonként.
10) A 671-es sorrend a játék saját "Sort" algoritmusával készült (ModLoadOrderSorter_b42
    v1.1.4, workshop 3423660713): kategória -> loadFirst/loadLast -> ABC -> topológiai
    rendezés (require / loadModAfter / loadModBefore). 0 szabálysértés, 0 ciklus.
11) A changelist képen szereplő, de a 671-es listán NEM lévő modok (ezek külön döntést
    igényelnek, mert plusz függőségeket hoznak):
      Containers KIA-5 + KIA-5 RV interior kompat
      Extraction Mode + Modded Maps Compatibility Patch + Viewpoint Extraction Support
      Phobos' Industrial Pathways: Pathology ("Phobos Laboratory")
      Neoi patch a Phobos biomasshoz (helyette most PZOPatchPhobosZReVaccinStub van)
    Szándékosan kimaradt (ismerten törött): Railroader RV Interior, ToyCar RV Interior.
    Bent van, de hibás: InspectYourWeapon (+ Viewpoint bridge) és SPNCC + SPNCCDetails.

ELLENŐRZÉS A LAUNCHERBEN
------------------------
- 671 db "mod = " sor, 671 egyedi id, a modlist.json load_order-ja ugyanez sorrendben
- a preset 671 idja sorrendre azonos a mods.txt-tel (a launcher ezt hasonlítsa össze)
- ha egy mod id hiányzik a telepítés után, a játék kihagyja: a launcher jelezze
- a configs/ fájlok hash-e egyezzen az eredetivel (a csomagolás után ellenőrizve)
