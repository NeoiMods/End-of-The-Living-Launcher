# Blackout Protocol – komplett config csomag

Project Zomboid **42.22.2** · profil: **Blackout Protocol** · **807 mod** · készült: 2026-11-10T21:07:05

---

## 0) A lényeg 30 másodpercben

A `pz_modlist_settings.cfg` **már tartalmazza a teljes Blackout Protocol profilt, mind a 807 moddal, a helyes betöltési sorrendben** – nem kell egyesével bekapcsolgatni semmit, és a sorrendet sem kell húzogatni.

1. **Zárd be a játékot** (kilépéskor felülírja a fájlt).
2. `pz_modlist_settings.cfg` → `%USERPROFILE%\Zomboid\Lua\`
3. `Zomboid\Sandbox Presets\*.cfg` → `%USERPROFILE%\Zomboid\Sandbox Presets\`  *(ez a NeoMods sandbox preset)*
4. Indítsd a játékot → **Mods** → profil legördülő → **Blackout Protocol** (aktív mod: 807)
5. **New Game → Sandbox** → preset legördülő → **NeoiMods** (vagy „NeoiMods Ajánlott”)

---

## 1) Mit tartalmaz ez a csomag

| Fájl / mappa | Mi ez | Hova kell |
|---|---|---|
| `pz_modlist_settings.cfg` | **a teljes modlista**: minden profil, a Blackout Protocol 807 moddal, a jó sorrendben (= ez az enabled mods lista is) | `%USERPROFILE%\Zomboid\Lua\` |
| `Zomboid\Sandbox Presets\` | **NeoMods sandbox preset(ek)**: `LATEST B42 MODS FOR SOLO.cfg`, `NeoiMods Ajánlott.cfg`, `NeoiMods.cfg` | `%USERPROFILE%\Zomboid\Sandbox Presets\` |
| `Zomboid\Server\NeoiMods_SandboxVars.lua` | a NeoMods **MP** sandbox beállításai (795 KB, minden mod opciója) | `%%USERPROFILE%%\Zomboid\Server\` |
| `Zomboid\Server\NeoiMods.ini` | a NeoMods szerver konfigja | `%%USERPROFILE%%\Zomboid\Server\` |
| `blackout_protocol_config.json` | géppel olvasható összesítő: `enabledMods`, teljes `loadOrder` (név + workshop ID), profilok, sandbox preselek, keybindek, fájlonkénti sha256, telepítési térkép | nem kell másolni |
| `modlist_BlackoutProtocol.txt` | emberi szemnek: `sorszám\|modid\|név\|workshopid` | nem kell másolni |
| `Zomboid\options.ini`, `sounds.ini` | játékbeállítások (155 kulcs) és hangkeverés | `%USERPROFILE%\Zomboid\` |
| `Zomboid\Lua\**` | billentyűk (keysB42.ini 149, keys.ini 172, TWKeyCombos.ini 19, PingItemsFriendsHotkey.ini 3), `modOptions.ini`, `ModManager\ModListData.ini`, mod-specifikus ini-k | `%USERPROFILE%\Zomboid\Lua\` |
| `extra\zomboid_lua_backups\` | korábbi cfg-mentések (ha több profilt tartalmaztak) | referencia |

Összesen **140 fájl**, **7.0 MB**.

---

## 2) Telepítés lépésről lépésre

### 2.0 A modok forrása

A `.cfg` csak a **listát** tartalmazza, a modok kódját nem. A Steam Workshopon iratkozz fel rájuk
(a `modlist_BlackoutProtocol.txt` 4. oszlopa a workshop ID), aztán a játék letölti őket.

### 2.1 Load order + enabled mods + profil  ⚠️ ezt először

1. Zárd be a Project Zomboidot (`tasklist | findstr java` ne adjon találatot).
2. A meglévő fájlt nevezd át: `pz_modlist_settings.cfg` → `pz_modlist_settings.cfg.sajat-mentes`.
3. Másold be: `pz_modlist_settings.cfg` → `%USERPROFILE%\Zomboid\Lua\`.
4. Indítsd a játékot → **Main Menu → Mods** → bal oldali profil-legördülő → **Blackout Protocol**.
5. **807 aktív mod.** Ne kapcsolgasd egyesével, ne rendezd át (az „AUTO” gombot se nyomd meg).

> A sorrend szándékos: elöl a keretrendszerek/könyvtárak (ZombieBuddy, ModLoadOrderSorter, ModManager,
> tsarslib stb.), a **788. sorszámtól** jönnek a **map-modok** (14 db, 802. sorszámig). A mapoknak a lista
> végén kell lenniük, különben a vanilla cellákra írt modok felülíródnak, és `WorldDictionaryException` lesz belőle.
>
> Megjegyzés: a map-blokk nem teljesen egybefüggő – a mapok után még tartalom-modok jönnek
> (pl. HydeCo, loot), amelyek nem definiálnak cellát, tehát ez nem hiba.

> **Map-sorrend, ami számít:** `Greenleaf B42 version` **előbb**, `Constown42` **utána** – így a Constown
> épített sarok-cellája (24,42) nyer a Greenleaf üres perem-cellájával szemben. A csomagban ez már így van.

### 2.2 NeoMods sandbox preset

**Single player:** másold a `Zomboid\Sandbox Presets\` mappa tartalmát ide: `%USERPROFILE%\Zomboid\Sandbox Presets\`.
Utána: **New Game → Sandbox** → a preset legördülőben megjelenik a **NeoiMods** (és a **NeoiMods Ajánlott**),
kiválasztod, és a sandbox beállítások egyben betöltődnek – nem kell kézzel végigkattintgatni a mod-opciókat.

**Multiplayer / szerver:** a `Zomboid\Server\NeoiMods_SandboxVars.lua` és `NeoiMods.ini` a szerver sandboxát
adja; másold a `%USERPROFILE%\Zomboid\Server\` mappába.

### 2.3 Opciók, billentyűk, mod-configok

A legegyszerűbb egy blokkban (PowerShell):

```powershell
$src = "C:\Users\User\Desktop\PZ_BlackoutProtocol_configs_20261110_2107"
$dst = "$env:USERPROFILE\Zomboid"
Copy-Item -Recurse -Force "$src\Zomboid\*" $dst
Copy-Item -Force "$src\pz_modlist_settings.cfg" "$dst\Lua\pz_modlist_settings.cfg"
```

Kézzel: `options.ini`, `sounds.ini` → `%USERPROFILE%\Zomboid\`; `Lua\*.ini` → `%USERPROFILE%\Zomboid\Lua\`;
`Server\*` → `%USERPROFILE%\Zomboid\Server\`.

### 2.4 Első indítás

**New Game → Sandbox**, a régi mentésbe ne tölts (a modkészlet változott). A világgenerálás 1–3 perc.

---

## 3) Ellenőrzés indítás után

- **Mods** menü: `Blackout Protocol`, **807 aktív mod**.
- A játék elindul, nincs `WorldDictionaryException` / „script load errors”.
- `%USERPROFILE%\Zomboid\console.txt` – Ctrl+F:
  - `double entry` → **0 találat**
  - `is duplicate` → **0 találat**
  - `Cannot parse SpriteConfig` → **0 találat**
  - `WorldDictionaryException` → **0 találat**

---

## 4) Mi van kivéve, és miért

| Mod | Ok |
|---|---|
| `Waterpipes` | uzik a 'waterpipes' moddal (WaterPipe/WaterPump/WaterPipeRiser entity + waterpipes_01_24 sprite) |
| `LastCupCoffee` | uzik a NidCoffeeMachinesFix-szel (appliances_cooking_01_60..63 sprite-ok) |
| `PlumbingFuelGeneratorAddonB42` | require=\Waterpipes - arva fuggoseg a kivetel utan |

Ezek okozták a világbetöltés végi crasht: a `SpriteConfigManager` duplikált entity/sprite hibái
(`WaterPipe`, `WaterPump`, `WaterPipeRiser`, `Coffee_Machine_Deluxe`) a `IsoWorld.init` alatt
`WorldDictionaryException`-t váltottak ki. A kivétel után a 809 modos lista **hiba nélkül betöltött**.

**Bent maradt (szándékosan):** `waterpipes` + `waterpipesviewpoint` (a Viewpoint patch ezt a párt kéri),
valamint `NidCoffeeMachinesFix`.

---

## 5) Ismert, nem végzetes hibák a naplóban

- `tiledef fileNumber 222` – TrueMoozic × truemusic
- `tiledef fileNumber 6985 / 7001` – DylansTiles / Diederiks Tile Palooza × UnofficialMappersCommunityTilePack
- `tiledef fileNumber 2026` – Horse × HorsePatch3d
- `tiledef file "Barricades" needed by BarricadesRebuilt not found`
- `vpp.Collide` → `NoSuchMethodError` – a Viewpoint Physics Java-mod régebbi buildre van fordítva (chunkonként, nem fatális)
- hiányzó tile: `overlay_graffiti_wall_02_22`

**Memória:** a világbetöltés végén a JVM 11,6 GB privát memóriát használt 15,9 GB RAM mellett, és
megfagyott (0% CPU). Ha ez megismétlődik: `-Xmx12288m` → `-Xmx8192m` a launcher `.bat`-ban, és töltés
közben zárd be a Chrome-ot/Discordot.

---

## 6) Visszaállítás

A csomagban lévő `extra\zomboid_lua_backups\` a korábbi `pz_modlist_settings.cfg` mentéseket tartalmazza
(amelyik több profilt tartalmaz, mint a mostani). Visszaállítás: zárd be a játékot, nevezd át a kívánt
fájlt `pz_modlist_settings.cfg`-re.

---

## 7) A teljes load order (807 mod)

```
001 ZombieBuddy
002 ModLoadOrderSorter_b42
003 ModManager
004 tsarslib
005 StandardizedVehicleUpgrades3Core
006 ATA_Petyarbuilt
007 MoodleFramework
008 VanillaVehiclesAnimated
009 amclub
010 TchernoLib
011 Dodge
012 FWOFitnessWorkoutOverhaul
013 KillCount
014 RepairAnyClothes
015 truemusic
016 TrueActionsDancing
017 jiggasGreenfireMod
018 UnifiedCarryWeightFramework
019 EvolvingTraitsWorld
020 rSemiTruck
021 RainCleansBlood
022 STALKERStims
023 Animal_Essentials
024 GPNVG18
025 CVI
026 CVLS
027 Dynamic Body Burn Eat or Fade
028 FixedLightOnBeltAF
029 Tuna_GunRacks
030 RebalancedPropMoving
031 HalfWeightMaterials
032 AccessorySkillBonuses
033 twistrecovery
034 MeatDrying
035 AdvancedDeathLog4219MP
036 AftermathRadio
037 ImmersiveAmmoCountB42
038 AnimalHaulerB42
039 ARMOR_WEARING_SKILL
040 AuDmodBetterHeadSmashSoundsB42
041 AuDmodDismantleElectronicSoundB42
042 AuDmodTransferItemsSoundsB42
043 AutoKeyRing
044 AutoSmokeB42
045 AutoLightTimers
046 AutomaticRefuelingB42
047 BarrelsExpanded42
048 BartenderCocktails
049 NVFramework
050 EURY_ANIMALCARE
051 better-auto-mechanics
052 EURY_CONTAINERS
053 BVF42
054 BetterStomp
055 BitemeLoadScreen
056 Ivmakk_BoilingEggs
057 Boredom
058 BB4213_Achievements
059 BreakBigRocks
060 BrickTrade
061 BundleUp
062 CHFatTallowSoap
063 CHRainWash
064 CaffeineMakesSense
065 cctvbase
066 CarryingCapacityTweakB42
067 CarveLongSticksB42
068 CaseinWoodGlueProductionB42
069 CashForGas
070 vac_mod_b42_19
071 ChestRigWebbing
072 ChestRigWebbing_Dual_Slot
073 ChoppedVehicleSalvage
074 jbCivilDefenseSirens
075 CleansingRain
076 ClimbWall
077 close-the-trunk-mp
078 VB_CommonSense
079 containertagsb42
080 ContainerLabels
081 CoolerBackpack
082 CorpseDumper
083 Crawl
084 CrowbarScrewdriverEntry
085 CryoRadio
086 CutThatTree
087 DES_TurnSignals_B42
088 VB_DaysGone_Counter
089 EURY_DST
090 DirtyHands
091 Disassemble Container With Items
092 Disassemble Container With Items 42 Fix
093 DismantleAllElectronics
094 DCI
095 Doobie_Drug_Den
096 DotolWaterTankTrucks
097 Double Decker Bus
098 PROJECTRVInterior42
099 DBNO_DownButNotOut
100 Dry&Cure
101 duffel_backpack
102 UnclearEatStackButton
103 efficiencySkillMod2
104 EffortlessTowing42
105 electronicdoorlock
106 EscapeKnoxCounty
107 ExcrementumB42
108 vac_mod_b42_5
109 vac_mod_b42_5.tb
110 Expanded_Belt_B42
111 Expanded_Hotwire_42.13.1_MP
112 ExpandedVehicleStorageB42
113 ExtendedBurnTreatment
114 FancyHandworkB42_19
115 FarmingQOL
116 FeedThatAnimal
117 FenceSheets
118 RVTrailerTypeB42
119 B42FRUsedCarsAnimAlpha
120 B42FRUsedCarsAnimTitle
121 FBArmor
122 VB_FirstAidOverhaul
123 PeixesBRExpansion
124 FightZ
125 FixCarryCapacityB42
126 Footprintzombiesandbandits
127 FootworkB42
128 FortisQuests
129 Fox_Butcher_Fix
130 Siowar_distiller
131 NeatUI_Framework
132 GetSaltFromSaltLicks
133 GetUpQuick
134 ZGlassCutter
135 GoresSVU4Core
136 GoresIndustrialFluidInfrastructure
137 GraveIntentions
138 GridZone
139 GrowBoxWeed
140 GunToolKitMod
141 GunMakerB42
142 SWMG
143 HK_416
144 HangoutBuff
145 OCsPacking
146 LUHoneyBadgerB42
147 HordeOptimizer
148 HBVCEFb42
149 HungerThirstMoodMeters
150 ImmersiveTents
151 TargetSquareOnLoad
152 ImprovisedGasMaskFilterEasySwap
153 IndustrialWorks
154 IntegralSuppressorConversionB42
155 ItemCondition_KingEJ
156 JohnnyBandolierCapacity
157 JoinLeaveMessage
158 Jump
159 JumperCables
160 KRCoreOS
161 KRSolarOS
162 KRSolarOSFuel
163 KRSolarOSLights
164 Karas Project Mining
165 KentuckyCleanup
166 KentuckyMineralTools
167 KentuckyWorkstationSalvage
168 KeyGlowB42
169 KeyFob
170 KnoxAcoustics
171 KnoxAntidote
172 ElyonLib
173 KnoxBuildworks
174 KnoxBuildworksVanillaExpanded
175 KnoxMycology
176 KnoxWeatherReceiver
177 LEDFlashlight
178 LGMainsWater
179 LeanAndLie
180 LeaveAMessageNote
181 RET_LethalStealth
182 LethalStealthB4219Fix
183 LifestyleHobbies
184 Lifestyle4220Compat
185 LimitedPropaneSupply
186 ListenAndLearn
187 LivestockPanelPlus
188 LivingBooksFramework
189 LootRequiresLight
190 LuaDigitalWatchUI
191 Mad Crafter
192 MakeScrews
193 MakeshiftRaft
194 MaskToggleUI
195 MassiveMilitaryContainer
196 MeatCookingLevels
197 MetalSpearB42
198 BulletproofHelmet
199 MilitaryPonchosRELOADED
200 Ivmakk_MilkThemAll
201 MineLimestone
202 MiniCompass
203 MiniHealthPlus
204 MoodleEffectsExplainedB42
205 MoreCargoWithoutSeats
206 TrueMoozic
207 MusicfrommoviesandTVseriesbyKonnycus
208 N3WOMapOverhaul
209 CorvusNVG
210 Navigator
211 Neat_Building
212 Neat_Building_AddonXP
213 Neat_Crafting
214 Neat_Crafting_AddonXP
215 NeatLockpicking
216 NepMoreOnFloor
217 neutermod
218 TM_PopCulture
219 NicksBookTracker
220 NicksMoveableWorkstations
221 NicksTurnOffFridges
222 notDeadYet
223 NutritionMakesSense
224 OGCheeseMaking
225 OGCookingExpanded
226 og_kush_rap_true_music_b42_pack
227 RUNE-EXP-RETEXTURED
228 GRM-CleanRagsOnClothingWasher
229 GRM-MyOwnWell
230 OneCleanStab
231 BadSadsOutbreakSmokers
232 OxyRefill
233 PZCrossbows
234 PalmPilots
235 PersistentMapExploration
236 PersistentPlayerCorpses
237 phunmart2
238 PlayerDogTags42
239 PlumbWorkaroundB42
240 PAR
241 PIP
242 PWS
243 PopCanRecycling
244 Project_Cook
245 ProjectDirtroad
246 Parkour
247 RVInteriorExpansion
248 RVInteriorExpansionPart2
249 Proper_Infected_Wounds_b42
250 PushVehicle
251 QuickRestart
252 RVs_HeavyDuty_Trailers
253 RadialBarricade
254 RagsToSheets
255 Railroader
256 ReactiveSE
257 ReadAloud
258 RealRoomHeat
259 RealisticBackpacksB42
260 RealisticFullMoonlight
261 RecipeTracker
262 RedsQuickRead
263 RedsSolarPowerFramework
264 RTWPB
265 RemeraHellfire
266 Removechocolates
267 RestorePlankSpearB42
268 J93RunningBloodPools
269 TrackPackPolRulya67
270 SMBStreetNames
271 ServingPlates42
272 PZShareMapNotes
273 SimpleSuppressors
274 SitReadFaster
275 SkillBookExpansionB42
276 SkillCraftBoostB42
277 SleepingBagRespawnMP
278 SlowGasMaskFiltersB42
279 SnackTime89
280 Snowman
281 SoapZ
282 SolarFloodlight
283 SLBatteryPack
284 QuailityOfLifeFeaturesMP
285 SaucedCarts
286 WoodenSpearFishingB42
287 SPNCC
288 SPNCCDetails
289 SPNCCFaces
290 SporchiTreeSeeds
291 StackableChairs
292 StarlitLibrary
293 SurvivalsHauler
294 SurvivorNotesB42
295 SurvivorQuirks
296 SwapHands42
297 Swatpack_by_Slobodskoy
298 TDS_IDCards
299 TacHold Complete
300 TaintedWaterIsBad
301 ATakeABathAndShowerDepthMap
302 TakeABathAndShowerNew
303 TakeOffCloth
304 TanksHavePropane42
305 TedFoodExpansion
306 ToggleKeyInIgnition
307 TrailersOverhaulB42
308 vac_transplant_crop
309 TrappersCalories
310 TM_TrueMooZicArcticMonkeysAMB42
311 TM_TrueMooZicMichaelJacksonThriller
312 TM_TrueMooZicNeedForSpeedUndergrou2
313 TM_TrueMooZicAddonPacificDrive
314 TM_HunZene
315 TMMumble
316 tm_musicasbrasileiras_null_up
317 TheLo-FiRemixesbyQuieT
318 TrueSmoking
319 VehicleTrunkCraftingSurface
320 twistbettercharacterinfo
321 twistonfirebetterfishing
322 twisttrappingvanilla
323 twistonfireisboring
324 twistcalories
325 twistcamping
326 twistdwimc
327 twistimso
328 twistnimblexp
329 twistrestingmodonly
330 tofmodoptionsfix
331 UncertainCannedFoodB42
332 RealisticVehicleMechanics
333 UniversalGunlight
334 UnstuckMe
335 UpgradeableStoragePlus
336 UsableFirePole
337 VanillaOutfitsExpanded
338 VVA_PikamyDelight
339 VVA_snapDoors
340 VVA_cullseats
341 VVA_transparentWindows
342 CarRoofFix
343 VehicleDismantle
344 CarEnterExitFix
345 VehicleGroundGuard
346 VehicleLocksB42
347 vehiclepaintsystem
348 VehicleSafety
349 VehicleTurnSignals
350 Vietnam Patriotic Songs
351 VPR_VehicleSparePartsB42
352 WasherRags
353 WhoseKeyIsThis
354 WildMaker
355 WireToNails42
356 WL_VehicleRepair
357 WorkingRunModifier
358 YeastCultivationB42
359 ZeroWeightKeys_B42
360 ZombieBloodCamouflage
361 ZomLootB42
362 ZVirusVaccine42BETA
363 ResearchLabInternProfession
364 ZomboTester
365 FreshBoxPortions
366 FreshBoxPortions_AuthenticZClothingPatch
367 RedbullSlobodskoy
368 SEG_Animalsdonotthump
369 BicycleMod
370 FurniturePushPull
371 BritasArmorPackB42
372 FunctionalGutters
373 JestersGunPack
374 KickScooterMod
375 RCStructureFramework
376 RCMilitaryTentsMod
377 PRV_SafehouseExitFix
378 B42Survival
379 TactOrgSol_Continued
380 [B42] 815Tatra
381 [B42] Tatrapan
382 Traveler_Scooter
383 ZombiesHaveMoneyB42
384 LifestylePianoAddonb42
385 WarmUpB42
386 SVRPClassicBows
387 TCM8
388 dustinguished_bolt_cutters
389 dustinguished_cleaning_wipes
390 masterchef
391 xPhone
392 xPhoneSoundPack
393 XnerTreeB42
394 zReArmorPackBYKB42
395 zReBandagedStatusInfo
396 1970WHITEFREIGHTLINERCOE
397 NeatCrafting_ShowAllRecipes_Addon
398 FlagsFaction
399 sombersunsetbg42
400 GunsOfMarz
401 CompanionDogs
402 CompanionDogsPack
403 CompanionDogsDoberman
404 CompanionDogsRottweiler
405 hydr-o-holic
406 BloodyWounds
407 CyesPushDoors
408 GasPumpIndicator
409 MuzzleSmoke
410 PropaneExchangeCabinet
411 Survival_Diaries
412 SurvivalDiariesB4219Fix
413 Reading+
414 Horse
415 HorseUtilityAddon
416 waterpipes
417 BuildingQueue
418 Viewpoint
419 BundleUpUI
420 BundleUpGoM
421 DrunkEffects
422 DynamicGearRattling
423 OverTheShoulderFHFix
424 HydeCoBeavers
425 HydeCoFrogs
426 HydeCoSquirrels
427 Lada2107Survivor
428 MoreDescriptionForTraits4213
429 OverTheShoulder
430 TooltipLib
431 batman_TimberChainsaw
432 batman_TimberAuthenticZCompatibility
433 ZombieDismembermentB42
434 WorkingClayPot
435 TakeMoreBricks
436 SurvivorBriefing
437 SalvageWorks
438 ReverseLights
439 ProjectViewpointADS
440 ProjectViewpointQOL
441 INVENTORY_TETRIS
442 ForceWearLoadedBags
443 vac_mod_b42_utils
444 KITTYOWO
445 ItemRarityUI
446 ItemRarityUILocFix
447 ProjectViewpointParkour
448 BackpackZippers
449 twisttool
450 WalkieVoipFix
451 AdminOptions
452 vac_backpack_pocket_patch
453 FastForwardB42FIX
454 ItemListViewerRevamped
455 WearClothingFix
456 DGVCurtains
457 Tuna_EquipmentRacks
458 DGVWindows3D
459 AfterTheBeep
460 ViewpointAdvancedMovement
461 ViewpointFPS
462 ViewpointForaging
463 ViewpointLivingProps
464 ViewpointOfMarz
465 ViewpointTrueBallistics
466 ViewpointBodycam
467 ViewpointPhysicsProps
468 ViewpointClassicCamera
469 ViewpointRightClick
470 ViewpointWorkingTVs
471 ViewpointBarricade
472 ViewpointFences3D
473 AviationCore
474 KafeenasCannabisB42
475 ViewpointTrueWeathers
476 ViewpointTrueWeathersGameplay
477 VisibleHelicopterEvent
478 ViewpointHorseSolid
479 isometricnomore
480 ProjectViewpointStars
481 waterpipesviewpoint
482 AnimalRemasterApproved
483 HoseDown
484 HotBrassViewpoint
485 ViewpointRadialCursor
486 ViewpointBinoculars
487 ViewpointPlacementFix
488 MultiPurposeItemRack
489 ProjectALifeNPCs
490 CDALifePatch
491 ViewpointALife
492 ViewpointDeathCam
493 EinarAnimalHitboxes
494 AmbientCityLights
495 ALifeVoices
496 damnlib
497 90fordF350ambulance
498 87fordB700
499 87fordF700ArmoredPartsCompatibility
500 Rottten_69Min
501 AuDmodCanRepairDoorsB42
502 AuDmodMechanicSoundB42
503 autotsartrailers
504 Barricades3D
505 UnofficialMappersCommunityTilePack
506 BarricadesRebuilt
507 VisibleHolsterBelt
508 TombBody
509 VisibleHolsterBeltTomb
510 DGVBetterSound
511 BlackHawk
512 CasualtiesUndead
513 CeilingLights
514 PZTree3DViewpoint
515 Chinook
516 ClothesHD
517 CDViewpointNameTags
518 CraftFromContainers
519 DangerZoneStateOfEmergency
520 DeadwoodShaders
521 DetailedModels
522 DetailedModelsGloves
523 DetailedModelsALICE
524 DetailedModelsTools
525 DetailedModelsFood
526 DetailedModelsMedical
527 DetailedModelsElectronics
528 DetailedModelsKitchen
529 DetailedModelsMelee2
530 DetailedModelsSmoking
531 DetailedModelsFirearms
532 disinfectantcologne
533 EscapeFromZomboidFirearms
534 EFZPvadsBridge
535 FarSnowGround
536 HGOEXP
537 HBAmmoCraft
538 ImmersiveBlackouts
539 ImmersiveDriving
540 LIF
541 ImmersiveLore
542 stanks_suicide
543 InteractionsAmmoCheck
544 ItIsOfInterestToMe
545 IIOITM_MoreStories
546 JJ_cannaMod
547 KentuckyCannabis
548 ZomboidDrugzz
549 LGExtendedElectricity
550 LGRealisticPowerUsage
551 LevelFurniture
552 LockInteriors
553 LongTermPreservationExtended
554 LongTermPreservationExtendedAR
555 MissingSkillBooks
556 ChuckleberryFinnAlertSystem
557 1299328280/ToadTraits
558 1299328280/ToadTraitsDisableSpec
559 1299328280/ToadTraitsDisablePrepared
560 N&CsNarcotics
561 NeatUI_XPDrop
562 NeatUI_CharacterInfo
563 NepWreckWorkingCars
564 errorMagnifier
565 NightVisionChucked
566 PNV
567 OptionsSearch
568 PerfectMoovment
569 PixelStrikeIndicator
570 ProjectALifeJimmy
571 CDAJCompatPatch
572 ProjectRVInteriorRebase
573 ProjectRVInteriorRebaseExpansion1
574 ProjectRVInteriorRebaseExpansion2
575 ProjectReflections
576 ViewpointVanillaSteering
577 ViewpointVehicleTopSpeed
578 B42Horticulture
579 UniversalCannabisCompatibility
580 MPOptimizer
581 PropaneRefuel
582 RadioVoices
583 Railings3D
584 RandomEvents
585 GlassGreenhouse
586 RealisticDash
587 restore_utilities
588 restore_utilities_AiwRL
589 LiveWristwatch
590 ShelfContents3D
591 SkullysZombieCollision
592 StandardizedVehicleUpgrades3V
593 ProjectRPGExpanded
594 TheyKnewContinued
595 TheyKnewContinued_ZVV
596 TombBodyCustom
597 TombBodyTexNUDE
598 PFHDTrueCargo
599 twistdufflebag
600 twistdufflebag_authenticz
601 TwoWeaponsOnBack
602 UH-1BHelicopter
603 UH1
604 UH1Viewpoint
605 EQUIPMENT_HOTBAR_CONTINUED
606 UsefulPallets
607 VHSCinemaT2
608 VanillaVehiclesAnimated_SVU
609 VVA_slowdoors
610 ViewpointAdvancedThrowables
611 ViewpointImmersiveEffects
612 ViewpointWindSway
613 ViewpointAdvancedHeadlights
614 ViewpointAdvancedFlashlight
615 ViewpointWindshield
616 FishingView
617 ViewpointRealisticGunSmoke
618 ViewpointImmersiveMap
619 StealthSight
620 ViewpointWorkstations3D
621 VisibleVehicleCorpsesCore
622 VisibleVehicleCorpses
623 VisibleVehicleCouplingB42
624 WallVines3D
625 WaterPhysicality
626 ZDVTBCompat
627 SandboxSettings
628 TFC_RemoveDebrisMod
629 damnlibGlass
630 TootsBaseDefense
631 AmmoConverterB42Rebuilt
632 ModConfigMenu
633 Bandits2
634 BanditsRadioExp
635 ViewpointVehicleInteriorFix
636 67gt500
637 68firebird
638 70dodge
639 70barracuda
640 70roadRunner
641 74amgeneralM151A2
642 74amgeneralM151A2extra
643 77firebird
644 78amgeneralM35A2
645 78amgeneralM35A2extra
646 78amgeneralM49A2C
647 78amgeneralM50A3
648 78amgeneralM62
649 78lamboCountach
650 80manKat1
651 82jeepJ10
652 82jeepJ10t
653 82oshkoshM911
654 82porsche911
655 83amgeneralM923
656 83amgeneralM923extra
657 83gmcGseriesVans
658 83gmcVanduraATeam
659 86chevyCUCV
660 86fordE150
661 86fordE150expanded
662 86fordE150dnd
663 86fordE150mm
664 86fordE150pd
665 86oshkoshP19A
666 89fordBronco
667 91range
668 92amgeneralM998
669 92amgeneralM998extra
670 92fordCVPI
671 92nissanGTR
672 93mustangSSP
673 SkillRecoveryJournal
674 restore_utilities_PRL
675 B42CDRH
676 KI5campers
677 LazoloDynamicBackpackUpgrades
678 EFZGroundModels
679 DotolWaterTankTrucks_KI5_M50A3_Addon
680 DotolWaterTankTrucks_KI5_Addon
681 GasMaskAttach
682 HereGoesTheSun
683 HorsePatch3d
684 ImprovisedSilencers
685 InteractiveTailoring
686 LongTermPreservationExtendedHM
687 LongTermPreservationExtendedHCB
688 rSemiTruckhM911
689 VSUIKI5
690 TombBodyCompat
691 TotalWeightRebalance
692 KI5trailers
693 TheOnlyCurePlus
694 TheOnlyCurePlusTombBody
695 ReloadAllAmmo
696 MoreDamagedObjects
697 ETO_B
698 AnimalCrates
699 AnimalCratesCompanionSupport
700 animaldungtocompostb42
701 BabyAnimalFood
702 CompostFromVegetation
703 ImmersiveSnow
704 ImmersiveSnowViewpoint
705 KnoxWildlife
706 PK42Psychopath
707 TacticalFlashlightAnimationB42
708 AnimalBarns
709 RRARCompatAnimalBarns
710 RRARCompatAnimalCrates
711 Mulch
712 LongTermPreservationExtendedKW
713 LongTermPreservationExtendedTPT
714 RainKillsFire
715 ArcadiaRVInterior_B42_MP
716 ArcadiaRVInterior_B42_Vanilla
717 ISA_42
718 PoolPit
719 ViewpointRoofs
720 RVVFX
721 RVV+Viewpoint
722 OldPoint
723 CompanionDogsMalinois
724 CompanionCat
725 CompanionDogsLabrador
726 CompanionDogsLivestockGuardians
727 CompanionDogsPug
728 MapCenter
729 ContainerCapacityIndicator
730 ContextMenuCleanup
731 ContextMenuIconsCore
732 SimpleContextMenuIcons
733 FittedBarricades
734 FittedSheets
735 BulkPallets
736 GoMExtensionGunsOfTien
737 GoMExtensionGunsOfTienPost93
738 JumboStumpsDoneRight
739 JullesLiquidTankers
740 LGExtendedPlumbing
741 Ladders4222
742 AmmoLootDropGunsOfMarzB42Weapon
743 AmmoLootDropGunsOfMarzB42Magazine
744 AmmoLootDropGunsOfMarzB42
745 AmmoLootDropGunsOfMarzB42Box
746 ModLoadOrderSorterExtension
747 ModLoadOrderSorterExtensionZB
748 ModManagerExtension
749 ModManagerExtensionZB
750 Bigsalt_Bigitem
751 Bigsalt
752 Bigsalt_DriedFood
753 AMGeneralTankerFunctionality
754 BarricadeTheDoor
755 BetterFireExtinguishers
756 BalaclavaSlot
757 LongTermPreservationExtendedBSS
758 ProjectWriting
759 RoosterCrow
760 TienCoolers
761 ZombieVisibilityFix
762 Authentic Z - Current
763 NicksInventorySelectionFix
764 YAPZLib
765 RealVending
766 TheyKnewContinued_AZ
767 ClothingLine
768 alicesWeaponSling
769 alicesWeaponSlingRadialMenu
770 LT
771 FunctionalCarLift
772 FunctionalAppliances2
773 FunctionalCarWash
774 StaticObjectControl
775 LightNailsAndScrews
776 ViewpointConstruction
777 DynamicVehicleSnow
778 Erikas_Tiles
779 DylansTiles
780 Diederiks Tile Palooza
781 melos_tiles_for_miles_pack
782 VMZNEW
783 PertsPartyTiles
784 Roccos_Tiles
785 TryhonestyTiles
786 papertrails
787 ViewpointVisualFixes
=========== MAP BLOKK (14 mod) ===========
788 RaccoonCityB42   [MAP]
789 NellisAFB   [MAP]
790 NellisAFBFix   [MAP]
791 NellisAFBFixZombiesLV   [MAP]
792 bigbearlake42   [MAP]
793 OtrB42   [MAP]
794 RavenCreekB42   [MAP]
795 PIE42   [MAP]
796 BedfordFallsB42   [MAP]
797 PTMapCompatibility   [MAP]
798 SubmarineZR1Alternative   [MAP]
799 ArcadiaKI5F350AmbulanceInterior   [MAP]
800 BasementBuilder
801 Greenleaf B42 version   [MAP]
802 Constown42   [MAP]
803 HydeCoUnderGround
804 HydeCoBees
805 HydeCoOrchard
806 ViewpointVisibleLoot
807 VisibleLootRealGlass
```
