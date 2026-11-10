SandboxVars = {
    VERSION = 6,
    -- Changing this also sets the "Population Multiplier" in Advanced Zombie Options. Default = Normal
    -- 1 = Insane
    -- 2 = Very High
    -- 3 = High
    -- 4 = Normal
    -- 5 = Low
    -- 6 = None
    Zombies = 4,
    -- How zombies are distributed across the map. Default = Urban Focused
    -- 1 = Urban Focused
    -- 2 = Uniform
    Distribution = 1,
    -- Controls whether some randomization is applied to zombie distribution.
    ZombieVoronoiNoise = true,
    -- How frequently new zombies are added to the world. Default = None
    -- 1 = High
    -- 2 = Normal
    -- 3 = Low
    -- 4 = None
    ZombieRespawn = 3,
    -- Zombie allowed to migrate to empty cells.
    ZombieMigrate = true,
    -- Default = 1 Hour, 30 Minutes
    -- 1 = 15 Minutes
    -- 2 = 30 Minutes
    -- 3 = 1 Hour
    -- 4 = 1 Hour, 30 Minutes
    -- 5 = 2 Hours
    -- 6 = 3 Hours
    -- 7 = 4 Hours
    -- 8 = 5 Hours
    -- 9 = 6 Hours
    -- 10 = 7 Hours
    -- 11 = 8 Hours
    -- 12 = 9 Hours
    -- 13 = 10 Hours
    -- 14 = 11 Hours
    -- 15 = 12 Hours
    -- 16 = 13 Hours
    -- 17 = 14 Hours
    -- 18 = 15 Hours
    -- 19 = 16 Hours
    -- 20 = 17 Hours
    -- 21 = 18 Hours
    -- 22 = 19 Hours
    -- 23 = 20 Hours
    -- 24 = 21 Hours
    -- 25 = 22 Hours
    -- 26 = 23 Hours
    -- 27 = Real-time
    DayLength = 3,
    StartYear = 1,
    -- Month in which the game starts. Default = July
    -- 1 = January
    -- 2 = February
    -- 3 = March
    -- 4 = April
    -- 5 = May
    -- 6 = June
    -- 7 = July
    -- 8 = August
    -- 9 = September
    -- 10 = October
    -- 11 = November
    -- 12 = December
    StartMonth = 7,
    -- Day of the month in which the games starts.
    StartDay = 9,
    -- Hour of the day in which the game starts. Default = 9 AM
    -- 1 = 7 AM
    -- 2 = 9 AM
    -- 3 = 12 PM
    -- 4 = 2 PM
    -- 5 = 5 PM
    -- 6 = 9 PM
    -- 7 = 12 AM
    -- 8 = 2 AM
    -- 9 = 5 AM
    StartTime = 1,
    -- Whether the time of day changes naturally, or it's always day/night. Default = Normal
    -- 1 = Normal
    -- 2 = Endless Day
    -- 3 = Endless Night
    DayNightCycle = 1,
    -- Whether weather changes or remains at a single state. Default = Normal
    -- 1 = Normal
    -- 2 = No Weather
    -- 3 = Endless Rain
    -- 4 = Endless Storm
    -- 5 = Endless Snow
    -- 6 = Endless Blizzard
    ClimateCycle = 1,
    -- Whether fog occurs naturally, never occurs, or is always present. Default = Normal
    -- 1 = Normal
    -- 2 = No Fog
    -- 3 = Endless Fog
    FogCycle = 1,
    -- How long after the default start date (July 9, 1993) that plumbing fixtures (eg. sinks) stop being infinite sources of water. Default = 0 - 30 Days
    -- 1 = Instant
    -- 2 = 0 - 30 Days
    -- 3 = 0 - 2 Months
    -- 4 = 0 - 6 Months
    -- 5 = 0 - 1 Year
    -- 6 = 0 - 5 Years
    -- 7 = 2 - 6 Months
    -- 8 = 6 - 12 Months
    -- 9 = Disabled
    WaterShut = 7,
    -- How long after the default start date (July 9, 1993) that the world's electricity turns off for good. Default = 14 - 30 Days
    -- 1 = Instant
    -- 2 = 14 - 30 Days
    -- 3 = 14 Days - 2 Months
    -- 4 = 14 Days - 6 Months
    -- 5 = 14 Days - 1 Year
    -- 6 = 14 Days - 5 Years
    -- 7 = 2 - 6 Months
    -- 8 = 6 - 12 Months
    -- 9 = Disabled
    ElecShut = 7,
    -- How long alarm batteries can last for after the power shuts off. Default = 0 - 30 Days
    -- 1 = Instant
    -- 2 = 0 - 30 Days
    -- 3 = 0 - 2 Months
    -- 4 = 0 - 6 Months
    -- 5 = 0 - 1 Year
    -- 6 = 0 - 5 Years
    AlarmDecay = 3,
    -- How long after the default start date (July 9, 1993) that plumbing fixtures (eg. sinks) stop being infinite sources of water. Min: -1 Max: 2147483647 Default: 14
    WaterShutModifier = 32,
    -- How long after the default start date (July 9, 1993) that the world's electricity turns off for good. Min: -1 Max: 2147483647 Default: 14
    ElecShutModifier = 32,
    -- How long alarm batteries can last for after the power shuts off. Min: -1 Max: 2147483647 Default: 14
    AlarmDecayModifier = 14,
    -- Any food that can rot or spoil. Min: 0.00 Max: 4.00 Default: 0.80
    FoodLootNew = 0.6,
    -- All other items that can be read, including books, fliers, and newspapers. Min: 0.00 Max: 4.00 Default: 0.60
    LiteratureLootNew = 0.6,
    -- Books that provide skill XP multipliers. Min: 0.00 Max: 4.00 Default: 0.60
    SkillBookLoot = 0.6,
    -- Items that teach recipes. Min: 0.00 Max: 4.00 Default: 0.60
    RecipeResourceLoot = 0.6,
    -- Medicine, bandages and first aid tools. Min: 0.00 Max: 4.00 Default: 0.60
    MedicalLootNew = 0.6,
    -- Fishing Rods, Tents, camping gear etc. Min: 0.00 Max: 4.00 Default: 0.60
    SurvivalGearsLootNew = 0.6,
    -- Canned and dried food, beverages. Min: 0.00 Max: 4.00 Default: 0.60
    CannedFoodLootNew = 0.4,
    -- Weapons that are not tools in other categories. Min: 0.00 Max: 4.00 Default: 0.60
    WeaponLootNew = 0.4,
    -- Also includes weapon attachments. Min: 0.00 Max: 4.00 Default: 1.20
    RangedWeaponLootNew = 0.4,
    -- Loose ammo, boxes and magazines. Min: 0.00 Max: 4.00 Default: 0.60
    AmmoLootNew = 0.4,
    -- Vehicle parts and the tools needed to install them. Min: 0.00 Max: 4.00 Default: 0.60
    MechanicsLootNew = 0.6,
    -- Everything else. Also affects foraging for all items in Town/Road zones. Min: 0.00 Max: 4.00 Default: 0.80
    OtherLootNew = 0.8,
    -- All wearable items that are not containers. Min: 0.00 Max: 4.00 Default: 0.60
    ClothingLootNew = 0.6,
    -- Backpacks and other wearable/equippable containers, eg. cases. Min: 0.00 Max: 4.00 Default: 0.60
    ContainerLootNew = 0.6,
    -- Keys for buildings/cars, key rings, and locks. Min: 0.00 Max: 4.00 Default: 0.40
    KeyLootNew = 0.4,
    -- VHS tapes and CDs. Min: 0.00 Max: 4.00 Default: 0.60
    MediaLootNew = 0.6,
    -- Spiffo items, plushies, and other collectible keepsake items eg. Photos. Min: 0.00 Max: 4.00 Default: 0.60
    MementoLootNew = 0.6,
    -- Items that are used in cooking, including those (eg. knives) which can be weapons. Does not include food. Includes both usable and unusable items. Min: 0.00 Max: 4.00 Default: 0.60
    CookwareLootNew = 0.6,
    -- Items and weapons that are used as ingredients for crafting or building. This is a general category that does not include items belonging to other categories such as Cookware or Medical. Does not include Tools. Min: 0.00 Max: 4.00 Default: 0.60
    MaterialLootNew = 0.6,
    -- Items and weapons which are used in both animal and plant agriculture, such as Seeds, Trowels, or Shovels. Min: 0.00 Max: 4.00 Default: 0.60
    FarmingLootNew = 0.6,
    -- Items and weapons which are Tools but don't fit in other categories such as Mechanics or Farming. Min: 0.00 Max: 4.00 Default: 0.60
    ToolLootNew = 0.6,
    -- <BHC> [!] It is recommended that you DO NOT change this. [!] <RGB:1,1,1>   Can be used to adjust the number of rolls made on loot tables when spawning loot. Will not reduce the number of rolls below 1. Can negatively affect performance if set to high values. It is highly recommended that this not be changed. Min: 0.10 Max: 100.00 Default: 1.00
    RollsMultiplier = 1.0,
    -- A comma-separated list of item types that won't spawn as ordinary loot.
    LootItemRemovalList = "",
    -- If enabled, items on the Loot Item Removal List, or that have their rarity set to 'None', will not spawn in randomised world stories.
    RemoveStoryLoot = false,
    -- If enabled, items on the Loot Item Removal List, or that have their rarity set to 'None', will not spawn worn by, or attached to, zombies.
    RemoveZombieLoot = false,
    -- If greater than 0, the spawn of loot is increased relative to the number of nearby zombies,  with the effect multiplied by this number. Min: 0 Max: 20 Default: 0
    ZombiePopLootEffect = 0,
    -- Min: 0.00 Max: 0.20 Default: 0.05
    InsaneLootFactor = 0.05,
    -- Min: 0.05 Max: 0.60 Default: 0.20
    ExtremeLootFactor = 0.2,
    -- Min: 0.20 Max: 1.00 Default: 0.60
    RareLootFactor = 0.6,
    -- Min: 0.60 Max: 2.00 Default: 1.00
    NormalLootFactor = 1.0,
    -- Min: 1.00 Max: 3.00 Default: 2.00
    CommonLootFactor = 2.0,
    -- Min: 2.00 Max: 4.00 Default: 3.00
    AbundantLootFactor = 3.0,
    -- The global temperature. Default = Normal
    -- 1 = Very Cold
    -- 2 = Cold
    -- 3 = Normal
    -- 4 = Hot
    -- 5 = Very Hot
    Temperature = 3,
    -- How often it rains. Default = Normal
    -- 1 = Very Dry
    -- 2 = Dry
    -- 3 = Normal
    -- 4 = Rainy
    -- 5 = Very Rainy
    Rain = 3,
    -- Number of days until the erosion system (which adds vines, long grass, new trees etc. to the world) will reach 100% growth. Default = Slow (200 Days)
    -- 1 = Very Fast (20 Days)
    -- 2 = Fast (50 Days)
    -- 3 = Normal (100 Days)
    -- 4 = Slow (200 Days)
    -- 5 = Very Slow (500 Days)
    ErosionSpeed = 3,
    -- For a custom Erosion Speed. Zero means use the Erosion Speed option. Maximum is 36,500 days (approximately 100 years). Min: -1 Max: 36500 Default: 0
    ErosionDays = 0,
    -- The speed of plant growth. Default = Normal
    -- 1 = Very Fast
    -- 2 = Fast
    -- 3 = Normal
    -- 4 = Slow
    -- 5 = Very Slow
    Farming = 3,
    -- How long it takes for food to break down in a composter. Default = 2 Weeks
    -- 1 = 1 Week
    -- 2 = 2 Weeks
    -- 3 = 3 Weeks
    -- 4 = 4 Weeks
    -- 5 = 6 Weeks
    -- 6 = 8 Weeks
    -- 7 = 10 Weeks
    -- 8 = 12 Weeks
    CompostTime = 1,
    -- How fast the player's hunger, thirst, and fatigue will decrease. Default = Normal
    -- 1 = Very Fast
    -- 2 = Fast
    -- 3 = Normal
    -- 4 = Slow
    -- 5 = Very Slow
    StatsDecrease = 3,
    -- The abundance of items found in Foraging mode. Default = Normal
    -- 1 = Very Poor
    -- 2 = Poor
    -- 3 = Normal
    -- 4 = Abundant
    -- 5 = Very Abundant
    NatureAbundance = 3,
    -- How likely the player is to activate a house alarm when breaking into a new house. Default = Sometimes
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    Alarm = 4,
    -- How frequently the doors of homes and buildings will be locked when discovered. Default = Very Often
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    LockedHouses = 5,
    -- Give new characters a small Green Fire starter kit.
    StarterKit = false,
    -- Nutritional value of food affects the player's condition. Turning this off will stop the player gaining or losing weight.
    Nutrition = true,
    -- How fast that food will spoil, inside or outside of a fridge. Default = Normal
    -- 1 = Very Fast
    -- 2 = Fast
    -- 3 = Normal
    -- 4 = Slow
    -- 5 = Very Slow
    FoodRotSpeed = 4,
    -- How effective a fridge will be at keeping food fresh for longer. Default = Normal
    -- 1 = Very Low
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Very High
    -- 6 = No decay
    FridgeFactor = 4,
    -- When greater than 0, loot will not respawn in zones that have been visited within this number of in-game hours. Min: 0 Max: 2147483647 Default: 0
    SeenHoursPreventLootRespawn = 0,
    -- When greater than 0, after X hours, all containers in towns and trailer parks in the world will respawn loot. To spawn loot a container must have been looted at least once. Loot respawn is not impacted by visibility or subsequent looting. Min: 0 Max: 2147483647 Default: 0
    HoursForLootRespawn = 0,
    -- Containers with a number of items greater, or equal to, this setting will not respawn. Min: 0 Max: 2147483647 Default: 5
    MaxItemsForLootRespawn = 5,
    -- Items will not respawn in buildings that players have barricaded or built in.
    ConstructionPreventsLootRespawn = true,
    -- A comma-separated list of item types that will be removed after HoursForWorldItemRemoval hours.
    WorldItemRemovalList = "Base.Hat, Base.Glasses, Base.Maggots, Base.Slug, Base.Slug2, Base.Snail, Base.Worm, Base.Dung_Mouse, Base.Dung_Rat",
    -- Number of hours since an item was dropped on the ground before it is removed.  Items are removed the next time that part of the map is loaded.   Zero means items are not removed. Min: 0.00 Max: 2147483647.00 Default: 24.00
    HoursForWorldItemRemoval = 24.0,
    -- If true, any items *not* in WorldItemRemovalList will be removed.
    ItemRemovalListBlacklistToggle = false,
    -- How long after the end of the world to begin. This will affect starting world erosion and food spoilage. Does not affect the starting date. Default = 0
    -- 1 = 0
    -- 2 = 1
    -- 3 = 2
    -- 4 = 3
    -- 5 = 4
    -- 6 = 5
    -- 7 = 6
    -- 8 = 7
    -- 9 = 8
    -- 10 = 9
    -- 11 = 10
    -- 12 = 11
    -- 13 = 12
    TimeSinceApo = 1,
    -- How much water plants will lose per day, and their ability to avoid disease. Default = Normal
    -- 1 = Very High
    -- 2 = High
    -- 3 = Normal
    -- 4 = Low
    -- 5 = Very Low
    PlantResilience = 3,
    -- The yield of plants when harvested. Default = Normal
    -- 1 = Very Poor
    -- 2 = Poor
    -- 3 = Normal
    -- 4 = Abundant
    -- 5 = Very Abundant
    PlantAbundance = 3,
    -- Recovery from being tired after performing actions. Default = Normal
    -- 1 = Very Fast
    -- 2 = Fast
    -- 3 = Normal
    -- 4 = Slow
    -- 5 = Very Slow
    EndRegen = 3,
    -- How regularly a helicopter passes over the Event Zone. Default = Once
    -- 1 = Never
    -- 2 = Once
    -- 3 = Sometimes
    -- 4 = Often
    Helicopter = 2,
    -- How often zombie-attracting metagame events like distant gunshots will occur. Default = Sometimes
    -- 1 = Never
    -- 2 = Sometimes
    -- 3 = Often
    MetaEvent = 2,
    -- How often events during the player's sleep, like nightmares, occur. Default = Never
    -- 1 = Never
    -- 2 = Sometimes
    -- 3 = Often
    SleepingEvent = 1,
    -- How much fuel is consumed by generators per in-game hour. Min: 0.00 Max: 100.00 Default: 0.10
    GeneratorFuelConsumption = 0.1,
    -- The chance of electrical generators spawning on the map. Default = Rare
    -- 1 = None (not recommended)
    -- 2 = Insanely Rare
    -- 3 = Extremely Rare
    -- 4 = Rare
    -- 5 = Normal
    -- 6 = Common
    -- 7 = Abundant
    GeneratorSpawning = 4,
    -- How often a looted map will have notes on it, written by a deceased survivor. Default = Sometimes
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    AnnotatedMapChance = 4,
    -- Adds free points during character creation. Min: -100 Max: 100 Default: 0
    CharacterFreePoints = 8,
    -- Gives player-built constructions extra hit points so they are  more resistant to zombie damage. Default = Normal
    -- 1 = Very Low
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Very High
    ConstructionBonusPoints = 3,
    -- The level of ambient lighting at night. Default = Normal
    -- 1 = Pitch Black
    -- 2 = Dark
    -- 3 = Normal
    -- 4 = Bright
    NightDarkness = 2,
    -- The time from dusk to dawn. Default = Normal
    -- 1 = Always Night
    -- 2 = Long
    -- 3 = Normal
    -- 4 = Short
    -- 5 = Always Day
    NightLength = 3,
    -- If survivors can get broken limbs from impacts, zombie damage, falls etc.
    BoneFracture = true,
    -- The impact that injuries have on your body, and their healing time. Default = Normal
    -- 1 = Low
    -- 2 = Normal
    -- 3 = High
    InjurySeverity = 2,
    -- How long, in hours, before dead zombie bodies disappear from the world.  If 0, maggots will not spawn on corpses. Min: -1.00 Max: 2147483647.00 Default: 216.00
    HoursForCorpseRemoval = 216.0,
    -- The impact that nearby decaying bodies has on the player's health and emotions. Default = Normal
    -- 1 = None
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Insane
    DecayingCorpseHealthImpact = 2,
    -- Whether nearby "living" zombies have the same impact on the player's health and emotions.
    ZombieHealthImpact = false,
    -- How much blood is sprayed on floors and walls by injuries. Default = Normal
    -- 1 = None
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Ultra Gore
    BloodLevel = 4,
    -- How quickly clothing degrades, becomes dirty, and bloodied. Default = Normal
    -- 1 = Disabled
    -- 2 = Slow
    -- 3 = Normal
    -- 4 = Fast
    ClothingDegradation = 3,
    -- If fires spread when started.
    FireSpread = true,
    -- Number of in-game days before rotten food is removed from the map.  -1 means rotten food is never removed. Min: -1 Max: 2147483647 Default: -1
    DaysForRottenFoodRemoval = -1,
    -- If enabled, generators will work on exterior tiles.  This will allow, for example, the powering of gas pumps.
    AllowExteriorGenerator = true,
    -- Maximum intensity of fog. Default = Normal
    -- 1 = Normal
    -- 2 = Moderate
    -- 3 = Low
    -- 4 = None
    MaxFogIntensity = 1,
    -- Maximum intensity of rain. Default = Normal
    -- 1 = Normal
    -- 2 = Moderate
    -- 3 = Low
    MaxRainFxIntensity = 1,
    -- If snow will accumulate on the ground.  If disabled, snow will still show on vegetation and rooftops.
    EnableSnowOnGround = true,
    -- If melee attacking slows you down.
    AttackBlockMovements = true,
    -- The chance of finding randomized buildings on the map (eg. burnt out houses,  ones containing loot stashes or dead bodies). Default = Rare
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    -- 7 = Always Tries
    SurvivorHouseChance = 3,
    -- The chance of road stories (eg. police roadblocks) spawning. Default = Rare
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    -- 7 = Always Tries
    VehicleStoryChance = 3,
    -- The chance of stories specific to map zones (eg. a campsite in a forest) spawning. Default = Rare
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    -- 7 = Always Tries
    ZoneStoryChance = 3,
    -- Allows you to select from every piece of clothing in the game when customizing your character
    AllClothesUnlocked = false,
    -- If tainted water will show a warning marking it as such.
    EnableTaintedWaterText = true,
    -- If vehicles will spawn.
    EnableVehicles = true,
    -- How frequently vehicles can be discovered on the map. Default = Low
    -- 1 = None
    -- 2 = Very Low
    -- 3 = Low
    -- 4 = Normal
    -- 5 = High
    CarSpawnRate = 4,
    -- General engine loudness to zombies. Min: 0.00 Max: 100.00 Default: 1.00
    ZombieAttractionMultiplier = 0.8,
    -- Whether found vehicles are locked, need keys to start etc.
    VehicleEasyUse = false,
    -- How full the gas tank of discovered vehicles will be. Default = Low
    -- 1 = Very Low
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Very High
    -- 6 = Full
    InitialGas = 3,
    -- If enabled, gas pumps will never run out of fuel
    FuelStationGasInfinite = false,
    -- The minimum amount of gasoline that can spawn in gas pumps. Check the "Advanced" box below to use a custom amount. Min: 0.00 Max: 1.00 Default: 0.00
    FuelStationGasMin = 0.1,
    -- The maximum amount of gasoline that can spawn in gas pumps. Check the "Advanced" box below to use a custom amount. Min: 0.00 Max: 1.00 Default: 0.80
    FuelStationGasMax = 1.0,
    -- The chance, as a percentage, that individual gas pumps will initially have no fuel. Min: 0 Max: 100 Default: 20
    FuelStationGasEmptyChance = 10,
    -- How likely cars will be locked Default = Sometimes
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    LockedCar = 4,
    -- How gas-hungry vehicles are. Min: 0.00 Max: 100.00 Default: 1.00
    CarGasConsumption = 1.0,
    -- General condition discovered vehicles will be in. Default = Normal
    -- 1 = Very Low
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Very High
    CarGeneralCondition = 3,
    -- The amount of damage dealt to vehicles that crash. Default = Normal
    -- 1 = Very Low
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Very High
    CarDamageOnImpact = 3,
    -- Damage received by the player from being crashed into. Default = None
    -- 1 = None
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    -- 5 = Very High
    DamageToPlayerFromHitByACar = 1,
    -- If traffic jams consisting of wrecked cars  will appear on main roads.
    TrafficJam = true,
    -- How frequently discovered vehicles have active alarms. Default = Rare
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    CarAlarm = 3,
    -- If the player can get injured from being in a car accident.
    PlayerDamageFromCrash = true,
    -- How many in-game hours before a wailing siren shuts off. Min: 0.00 Max: 168.00 Default: 0.00
    SirenShutoffHours = 2.0,
    -- The chance of finding a vehicle with gas in its tank. Default = Normal
    -- 1 = Low
    -- 2 = Normal
    -- 3 = High
    ChanceHasGas = 2,
    -- Whether a player can discover a car that has been cared for  after the Knox infection struck. Default = Low
    -- 1 = None
    -- 2 = Low
    -- 3 = Normal
    -- 4 = High
    RecentlySurvivorVehicles = 2,
    -- If certain melee weapons will be able to strike multiple zombies in one hit.
    MultiHitZombies = true,
    -- Chance of being bitten when a zombie attacks from behind. Default = High
    -- 1 = Low
    -- 2 = Medium
    -- 3 = High
    RearVulnerability = 2,
    -- If zombies will head towards the sound of vehicle sirens.
    SirenEffectsZombies = true,
    -- Speed at which animals stats (hunger, thirst etc.) reduce. Default = Normal
    -- 1 = Ultra Fast
    -- 2 = Very Fast
    -- 3 = Fast
    -- 4 = Normal
    -- 5 = Slow
    -- 6 = Very Slow
    AnimalStatsModifier = 4,
    -- Speed at which animals stats (hunger, thirst etc.) reduce while in meta. Default = Normal
    -- 1 = Ultra Fast
    -- 2 = Very Fast
    -- 3 = Fast
    -- 4 = Normal
    -- 5 = Slow
    -- 6 = Very Slow
    AnimalMetaStatsModifier = 4,
    -- How long animals will be pregnant for before giving birth. Default = Normal
    -- 1 = Ultra Fast
    -- 2 = Very Fast
    -- 3 = Fast
    -- 4 = Normal
    -- 5 = Slow
    -- 6 = Very Slow
    AnimalPregnancyTime = 4,
    -- Speed at which animals age. Default = Normal
    -- 1 = Ultra Fast
    -- 2 = Very Fast
    -- 3 = Fast
    -- 4 = Normal
    -- 5 = Slow
    -- 6 = Very Slow
    AnimalAgeModifier = 4,
    -- Default = Normal
    -- 1 = Ultra Fast
    -- 2 = Very Fast
    -- 3 = Fast
    -- 4 = Normal
    -- 5 = Slow
    -- 6 = Very Slow
    AnimalMilkIncModifier = 4,
    -- Default = Normal
    -- 1 = Ultra Fast
    -- 2 = Very Fast
    -- 3 = Fast
    -- 4 = Normal
    -- 5 = Slow
    -- 6 = Very Slow
    AnimalWoolIncModifier = 4,
    -- The chance of finding animals in farm. Default = Often
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    -- 7 = Always
    AnimalRanchChance = 5,
    -- The number of hours grass will regrow after being  eaten by an animal or cut by the player. Min: 1 Max: 9999 Default: 240
    AnimalGrassRegrowTime = 240,
    -- If a meta (ie. not actually visible in-game) fox may attack  your chickens if the hutch's door is left open at night.
    AnimalMetaPredator = true,
    -- If on, animals will only mate during their breeding season (if any).  Otherwise they can reproduce/lay eggs all year round.
    AnimalMatingSeason = true,
    -- How long before baby animals will hatch from eggs. Default = Normal
    -- 1 = Ultra Fast
    -- 2 = Very Fast
    -- 3 = Fast
    -- 4 = Normal
    -- 5 = Slow
    -- 6 = Very Slow
    AnimalEggHatch = 4,
    -- If true, animal calls will attract nearby zombies.
    AnimalSoundAttractZombies = true,
    -- The chance of animals leaving tracks. Default = Sometimes
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    AnimalTrackChance = 4,
    -- The chance of creating a path for animals to be hunted. Default = Sometimes
    -- 1 = Never
    -- 2 = Extremely Rare
    -- 3 = Rare
    -- 4 = Sometimes
    -- 5 = Often
    -- 6 = Very Often
    AnimalPathChance = 4,
    -- The frequency and intensity of eg. rats in infested buildings. Min: 0 Max: 50 Default: 25
    MaximumRatIndex = 25,
    -- How long it takes for the Maximum Vermin Index to be reached. Min: 0 Max: 365 Default: 90
    DaysUntilMaximumRatIndex = 90,
    -- If a piece of media hasn't been fully seen or read, this setting determines whether it's displayed fully, displayed as "???", or hidden completely. Default = Completely hidden
    -- 1 = Fully revealed
    -- 2 = Shown as ???
    -- 3 = Completely hidden
    MetaKnowledge = 3,
    -- If true, you will be able to see any recipes that can be done with a station, even if you haven't learnt them yet.
    SeeNotLearntRecipe = true,
    -- If a building has more than this amount of rooms it will not be looted. Min: 0 Max: 200 Default: 50
    MaximumLootedBuildingRooms = 50,
    -- If poison can be added to food. Default = True
    -- 1 = True
    -- 2 = False
    -- 3 = Only bleach poisoning is disabled
    EnablePoisoning = 1,
    -- If/when maggots can spawn in corpses. Default = In and Around Bodies
    -- 1 = In and Around Bodies
    -- 2 = In Bodies Only
    -- 3 = Never
    MaggotSpawn = 1,
    -- The higher the value, the longer lightbulbs last before breaking.  If 0, lightbulbs will never break.  Does not affect vehicle headlights. Min: 0.00 Max: 1000.00 Default: 2.00
    LightBulbLifespan = 4.0,
    -- The abundance of fish in rivers and lakes. Default = Poor
    -- 1 = Very Poor
    -- 2 = Poor
    -- 3 = Normal
    -- 4 = Abundant
    -- 5 = Very Abundant
    FishAbundance = 3,
    -- When a skill is at this level or above, television/VHS/other media  will not provide XP for it. Min: 0 Max: 10 Default: 3
    LevelForMediaXPCutoff = 3,
    -- When a skill is at this level or above, scrapping furniture does not provide XP for the relevant skill. Does not apply to Electrical. Min: 0 Max: 10 Default: 0
    LevelForDismantleXPCutoff = 0,
    -- Number of days before old blood splats are removed. Removal happens when map chunks are loaded. 0 means they will never disappear. Min: 0 Max: 365 Default: 0
    BloodSplatLifespanDays = 0,
    -- Number of days before one can benefit from reading previously read literature items. Min: 1 Max: 365 Default: 45
    LiteratureCooldown = 25,
    -- If there are diminishing returns on bonus trait points provided from selecting multiple negative traits. Default = None
    -- 1 = None
    -- 2 = 1 point penalty for every 3 negative traits selected
    -- 3 = 1 point penalty for every 2 negative traits selected
    -- 4 = 1 point penalty for every negative trait selected after the first
    NegativeTraitsPenalty = 1,
    -- The number of in-game minutes it takes to read one page of a skill book. Min: 0.00 Max: 60.00 Default: 2.00
    MinutesPerPage = 1.5,
    -- When enabled, crops and herbs grown inside buildings will die. Does not affect houseplants.
    KillInsideCrops = true,
    -- When enabled, the growth of plants is affected by seasons.
    PlantGrowingSeasons = true,
    -- <BHC> [!] It is recommended that you DO NOT change this. Changing this can result in performance issues. [!] <RGB:1,1,1>   When enabled, dirt can be placed, and farming performed on other than the ground level.
    PlaceDirtAboveground = false,
    -- The speed of plant growth. Min: 0.10 Max: 100.00 Default: 1.00
    FarmingSpeedNew = 3.0,
    -- The abundance of harvested crops. Min: 0.10 Max: 10.00 Default: 1.00
    FarmingAmountNew = 2.0,
    -- The chance that any building will already be looted when found. Check the "Advanced" box below to use a custom number. Min: 0 Max: 200 Default: 25
    MaximumLooted = 25,
    -- How long it takes for Maximum Looted Building Chance to be reached. Min: 0 Max: 3650 Default: 90
    DaysUntilMaximumLooted = 90,
    -- The chance that any rural building will already be looted when found. Check the "Advanced" box below to use a custom number. Min: 0.00 Max: 2.00 Default: 0.50
    RuralLooted = 0.5,
    -- The maximum loot that won't spawn when Days Until Maximum Diminished Loot is reached. Check the "Advanced" box below to use an exact percentage. Min: 0 Max: 100 Default: 20
    MaximumDiminishedLoot = 20,
    -- How long it takes for Maximum Diminished Loot Percentage to be reached. Min: 0 Max: 3650 Default: 3650
    DaysUntilMaximumDiminishedLoot = 3650,
    -- Functions as a multiplier when applying muscle strain from swinging weapons or carrying heavy loads. Min: 0.00 Max: 10.00 Default: 0.70
    MuscleStrainFactor = 0.7,
    -- Functions as a multiplier when applying discomfort from worn items. Min: 0.00 Max: 10.00 Default: 0.80
    DiscomfortFactor = 0.8,
    -- If greater than zero damage can be taken from serious wound infections. Min: 0.00 Max: 10.00 Default: 1.00
    WoundInfectionFactor = 1.0,
    -- If true clothing with randomized tints will not be so dark to be virtually black.
    NoBlackClothes = true,
    -- Disables the failure chances when climbing sheet ropes or over walls.
    EasyClimbing = false,
    -- The maximum hours of fuel that can be placed in a campfire, wood stove etc. Min: 1 Max: 168 Default: 8
    MaximumFireFuelHours = 8,
    -- Replaces Chance-To-Hit mechanics with Chance-To-Damage calculations.  This mode prioritizes player aiming. Default = Zombies only
    -- 1 = Disabled
    -- 2 = Zombies only
    -- 3 = All types of target
    FirearmUseDamageChance = 2,
    -- A multiplier for the distance at which zombies can hear gunshots. Min: 0.20 Max: 2.00 Default: 1.00
    FirearmNoiseMultiplier = 0.8,
    -- Multiplier for firearm jamming chance. 0 disables jamming. Min: 0.00 Max: 10.00 Default: 1.00
    FirearmJamMultiplier = 1.0,
    -- Multiplier for Moodle effects on hit chance. 0 disables Moodle penalty. Min: 0.00 Max: 10.00 Default: 1.00
    FirearmMoodleMultiplier = 1.0,
    -- Multiplier for the effects of weather (wind, rain and fog) on hit chance. 0 disables weather effect. Min: 0.00 Max: 10.00 Default: 1.00
    FirearmWeatherMultiplier = 1.0,
    -- Enable to have headgear like welding masks affect hit chance
    FirearmHeadGearEffect = true,
    -- Chance to turn a dirt floor into a clay floor. Applies to lakes. Min: 0.00 Max: 1.00 Default: 0.05
    ClayLakeChance = 0.1,
    -- Chance to turn a dirt floor into a clay floor. Applies to rivers. Min: 0.00 Max: 1.00 Default: 0.05
    ClayRiverChance = 0.05,
    -- Min: 1 Max: 100 Default: 20
    GeneratorTileRange = 20,
    -- How many levels both above and below a generator it can provide with electricity. Min: 1 Max: 15 Default: 3
    GeneratorVerticalPowerRange = 3,
    -- Parts with a success chance below this value will be skipped during training. <LINE> At '-1' this setting is not enforced, any value over '-1' is enforced server-wide. <LINE>  <LINE> 0% -> All parts will be worked on. Parts will break at lower skill levels. <LINE> 30% -> Default setting for a good balance. <LINE> 100% -> Only parts that are guaranteed to succeed will be worked on. Completely safe at all skill levels. Min: -1 Max: 100 Default: -1
    BAM_Server_MinSuccessChance = -1,
    -- Controls fog of war for the Navigator map and the world map opened from the Navigator. Vanilla map sandbox toggles are ignored.
    NavigatorForceOpenMap = false,
    -- Example: Set to 5% with skill level 10 = 10x5% = 50% reduction. Cannot exceed Max Reduction. Min: 1 Max: 10 Default: 5
    SkillCraftBoostB42_ReductionPerLevel = 3,
    -- Upper cap for total reduction. Example: At 50%, crafting time is reduced by max 50%. Set to 100% for instant crafting. Min: 10 Max: 100 Default: 50
    SkillCraftBoostB42_MaxReduction = 45,
    -- How this mod's reduction is applied.
    -- - Disabled: Do not use this mod
    -- - Override Vanilla: Ignore vanilla skill reduction, use only this mod's reduction
    -- - Stack with Vanilla: Apply vanilla reduction, then apply this mod's reduction on top (double reduction) Default = Override Vanilla
    -- 1 = Disabled
    -- 2 = Override Vanilla
    -- 3 = Stack with Vanilla
    SkillCraftBoostB42_CalculationMode = 2,
    -- ON (Default): Apply mod reduction to ALL recipes
    -- OFF: Skip recipes with skill requirements to avoid double reduction
    -- 
    -- Note: No double-dipping when 'Override Vanilla' is selected.
    SkillCraftBoostB42_AlwaysApply = true,
    -- Controls how often SnackTime items appear in the world. Default = Rare
    -- 1 = Very rare
    -- 2 = Rare
    -- 3 = Normal
    -- 4 = Frequent
    -- 5 = Very frequent
    SnackTime89_LootRarity = 2,
    -- Controls how often zombies drop SnackTime items when killed. Default = Rare
    -- 1 = Very rare
    -- 2 = Rare
    -- 3 = Normal
    -- 4 = Frequent
    -- 5 = Very frequent
    SnackTime89_ZombieLootRarity = 2,
    -- Allows mystery boxes to appear or not in zombie loot.
    SnackTime89_EnableMysteryBoxes = true,
    -- Min: 0.00 Max: 10.00 Default: 1.00
    TedBurgerSpawnRate = 0.6,
    -- Min: 0.00 Max: 10.00 Default: 1.00
    TedDrinkSpawnRate = 0.6,
    -- Min: 0.00 Max: 10.00 Default: 1.00
    TedAlcoholicBeveragesSpawnRate = 0.6,
    -- Min: 0.00 Max: 10.00 Default: 1.00
    TedCannedSpawnRate = 0.6,
    -- Min: 0.00 Max: 10.00 Default: 1.00
    TedSnacksSpawnRate = 0.6,
    -- Min: 0.00 Max: 10.00 Default: 1.00
    TedFruitsSpawnRate = 0.6,
    -- Min: 0.00 Max: 10.00 Default: 1.00
    TedMeatsSpawnRate = 0.6,
    EnableRatBurger = true,
    -- Detect when a vehicle is upside down before unstuck handling.
    VehicleGroundGuard_ENABLE_UPRIGHT_CHECK = true,
    -- Automatically flip upside-down vehicles before unstuck attempts.
    VehicleGroundGuard_UPRIGHT_AUTO_FLIP_ENABLED = true,
    -- If roll or pitch exceeds this angle, the vehicle is treated as upside down. Min: 80.00 Max: 170.00 Default: 110.00
    VehicleGroundGuard_UPRIGHT_UPSIDE_DOWN_ANGLE_DEG = 110.0,
    -- Minimum time between manual unstick attempts. Min: 500 Max: 30000 Default: 5000
    VehicleGroundGuard_MANUAL_REQUEST_COOLDOWN_MS = 5000,
    -- Maximum distance allowed for outside-empty-vehicle manual unstick requests. Min: 2.00 Max: 20.00 Default: 7.00
    VehicleGroundGuard_MANUAL_REQUEST_MAX_DISTANCE_TILES = 7.0,
    -- Maximum distance allowed for fallback self-rescue-by-id when seat state desyncs. Min: 3.00 Max: 30.00 Default: 14.00
    VehicleGroundGuard_SELF_RESCUE_MAX_DISTANCE_TILES = 14.0,
    -- How long the last driven vehicle remains eligible for self-rescue fallback. Min: 5000 Max: 300000 Default: 120000
    VehicleGroundGuard_SELF_RESCUE_LAST_VEHICLE_MAX_AGE_MS = 120000,
    -- When warp rescue still fails, replace a deeply stuck vehicle with a fresh respawned copy as a last resort (inventory and occupants are transferred first). Disable to suppress vehicle replacement entirely.
    VehicleGroundGuard_UNSTICK_ENABLE_RESPAWN_RESCUE = true,
    Basement = {
        -- How frequently basements spawn at random locations. Default = Sometimes
        -- 1 = Never
        -- 2 = Extremely Rare
        -- 3 = Rare
        -- 4 = Sometimes
        -- 5 = Often
        -- 6 = Very Often
        -- 7 = Always
        SpawnFrequency = 4,
    },
    Map = {
        -- If enabled, a mini-map window will be available.
        AllowMiniMap = false,
        -- If enabled, the world map can be accessed.
        AllowWorldMap = true,
        -- If enabled, the world map will be completely filled in on starting the game.
        MapAllKnown = false,
        -- If enabled, maps can't be read unless there's a source of light available.
        MapNeedsLight = true,
    },
    ZombieLore = {
        -- How fast zombies move. Default = Random
        -- 1 = Sprinters
        -- 2 = Fast Shamblers
        -- 3 = Shamblers
        -- 4 = Random
        Speed = 4,
        -- If Random Speed is enabled, this controls what percentage of zombies are Sprinters. Check the "Advanced" box below to use a custom percentage. Min: 0 Max: 100 Default: 0
        SprinterPercentage = 0,
        -- The damage zombies inflict per attack. Default = Normal
        -- 1 = Superhuman
        -- 2 = Normal
        -- 3 = Weak
        -- 4 = Random
        Strength = 3,
        -- The difficulty of killing a zombie. Default = Random
        -- 1 = Tough
        -- 2 = Normal
        -- 3 = Fragile
        -- 4 = Random
        Toughness = 3,
        -- How the Knox Virus spreads. Default = Blood and Saliva
        -- 1 = Blood and Saliva
        -- 2 = Saliva Only
        -- 3 = Everyone's Infected
        -- 4 = None
        Transmission = 2,
        -- How quickly the infection takes effect. Default = 2-3 Days
        -- 1 = Instant
        -- 2 = 0-30 Seconds
        -- 3 = 0-1 Minutes
        -- 4 = 0-12 Hours
        -- 5 = 2-3 Days
        -- 6 = 1-2 Weeks
        -- 7 = Never
        Mortality = 6,
        -- How quickly infected corpses rise as zombies. Default = 0-1 Minutes
        -- 1 = Instant
        -- 2 = 0-30 Seconds
        -- 3 = 0-1 Minutes
        -- 4 = 0-12 Hours
        -- 5 = 2-3 Days
        -- 6 = 1-2 Weeks
        Reanimate = 4,
        -- Zombie intelligence. Default = Basic Navigation
        -- 1 = Navigate and Use Doors
        -- 2 = Navigate
        -- 3 = Basic Navigation
        -- 4 = Random
        Cognition = 3,
        -- Min: 0 Max: 100 Default: 0
        DoorOpeningPercentage = 0,
        -- How often zombies can crawl under parked vehicles. Default = Often
        -- 1 = Crawlers Only
        -- 2 = Extremely Rare
        -- 3 = Rare
        -- 4 = Sometimes
        -- 5 = Often
        -- 6 = Very Often
        -- 7 = Always
        CrawlUnderVehicle = 4,
        -- How long zombies remember a player after seeing or hearing them. Default = Normal
        -- 1 = Long
        -- 2 = Normal
        -- 3 = Short
        -- 4 = None
        -- 5 = Random
        -- 6 = Random between Normal and None
        Memory = 3,
        -- Zombie vision radius. Default = Random between Normal and Poor
        -- 1 = Eagle
        -- 2 = Normal
        -- 3 = Poor
        -- 4 = Random
        -- 5 = Random between Normal and Poor
        Sight = 3,
        -- Zombie hearing radius. Default = Random between Normal and Poor
        -- 1 = Pinpoint
        -- 2 = Normal
        -- 3 = Poor
        -- 4 = Random
        -- 5 = Random between Normal and Poor
        Hearing = 3,
        -- Activates the new advanced stealth mechanics, which allows you to hide from zombies behind cars, takes traits and weather into account, and much more.
        SpottedLogic = true,
        -- If zombies that have not seen/heard player can attack doors and constructions while roaming.
        ThumpNoChasing = false,
        -- If zombies can destroy player constructions and defenses.
        ThumpOnConstruction = true,
        -- Whether zombies are more "active" during the day or night.  "Active" zombies will use the speed set in the "Speed" setting.  "Inactive" zombies will be slower, and tend not to give chase. Default = Both
        -- 1 = Both
        -- 2 = Night
        -- 3 = Day
        ActiveOnly = 2,
        -- If zombies trigger house alarms when breaking through windows or doors.
        TriggerHouseAlarm = true,
        -- If multiple attacking zombies can drag you down and kill you.  Dependent on zombie strength.
        ZombiesDragDown = true,
        -- If crawler zombies beside a player contribute to the chance of being dragged down and killed by a group of zombies.
        ZombiesCrawlersDragDown = false,
        -- If zombies have a chance to lunge at you after climbing over a fence or through a window if you're too close.
        ZombiesFenceLunge = true,
        -- Serves as a multiplier when determining the effectiveness of armor worn by zombies. Min: 0.00 Max: 100.00 Default: 2.00
        ZombiesArmorFactor = 2.0,
        -- The maximum defense percentage that any worn protective garments can provide to a zombie. Min: 0 Max: 100 Default: 85
        ZombiesMaxDefense = 85,
        -- Percentage chance of having a random attached weapon. Min: 0 Max: 100 Default: 6
        ChanceOfAttachedWeapon = 6,
        -- How much damage zombies take when falling from height. Min: 0.00 Max: 100.00 Default: 1.00
        ZombiesFallDamage = 1.0,
        -- Whether some dead-looking zombies will reanimate and attack the player. Default = World Zombies
        -- 1 = World Zombies
        -- 2 = World and Combat Zombies
        -- 3 = Never
        DisableFakeDead = 1,
        -- Zombies will not spawn where players spawn. Default = Inside the building and around it
        -- 1 = Inside the building and around it
        -- 2 = Inside the building
        -- 3 = Inside the room
        -- 4 = Zombies can spawn anywhere
        PlayerSpawnZombieRemoval = 1,
        -- How many zombies it takes to damage a tall fence. Min: -1 Max: 100 Default: 25
        FenceThumpersRequired = 30,
        -- How quickly zombies damage tall fences. Min: 0.01 Max: 100.00 Default: 1.00
        FenceDamageMultiplier = 0.8,
    },
    ZombieConfig = {
        -- Set by the "Zombie Count" population option, or by a custom number here. Insane = 2.5, Very High = 1.6, High = 1.2, Normal = 0.65, Low = 0.15, None = 0.0. Min: 0.00 Max: 4.00 Default: 0.65
        PopulationMultiplier = 0.65,
        -- A multiplier for the desired zombie population at the start of the game. Insane = 3.0, Very High = 2.0, High = 1.5, Normal = 1.0, Low = 0.5, None = 0.0. Min: 0.00 Max: 4.00 Default: 1.00
        PopulationStartMultiplier = 0.5,
        -- A multiplier for the desired zombie population on the peak day. Insane = 3.0, Very High = 2.0, High = 1.5, Normal = 1.0, Low = 0.5, None = 0.0. Min: 0.00 Max: 4.00 Default: 1.50
        PopulationPeakMultiplier = 1.5,
        -- The day when the population reaches its peak. Min: 1 Max: 365 Default: 28
        PopulationPeakDay = 42,
        -- The number of hours that must pass before zombies may respawn in a cell. If 0, spawning is disabled. Min: 0.00 Max: 8760.00 Default: 0.00
        RespawnHours = 315.0,
        -- The number of hours that a chunk must be unseen before zombies may respawn in it. Min: 0.00 Max: 8760.00 Default: 0.00
        RespawnUnseenHours = 68.0,
        -- The fraction of a cell's desired population that may respawn every RespawnHours. Min: 0.00 Max: 1.00 Default: 0.00
        RespawnMultiplier = 0.05,
        -- The number of hours that must pass before zombies migrate  to empty parts of the same cell. If 0, migration is disabled. Min: 0.00 Max: 8760.00 Default: 12.00
        RedistributeHours = 12.0,
        -- The distance a zombie will try to walk towards the last sound it heard. Min: 10 Max: 1000 Default: 100
        FollowSoundDistance = 100,
        -- The size of groups real zombies form when idle. 0 means zombies don't form groups. Groups don't form inside buildings or forest zones. Min: 0 Max: 1000 Default: 20
        RallyGroupSize = 20,
        -- The amount, as a percentage, that zombie groups can vary in size from the default (both larger and smaller).   For example, at 50% variance with a default group size of 20, groups will vary in size from 10-30. Min: 0 Max: 100 Default: 50
        RallyGroupSizeVariance = 50,
        -- The distance real zombies travel to form groups when idle. Min: 5 Max: 50 Default: 20
        RallyTravelDistance = 20,
        -- The distance between zombie groups. Min: 5 Max: 25 Default: 15
        RallyGroupSeparation = 15,
        -- How close members of a zombie group stay to the group's "leader". Min: 1 Max: 10 Default: 3
        RallyGroupRadius = 3,
        -- Controls the maximum number of zombies tracked before cleanup occurs. 0 means zombies will not be cleaned up. The default value (300) is strongly recommended. Increasing this value or setting to 0 may cause severe performance problems. For troubleshooting and bug-report purposes, please reproduce any issue with the default setting before submitting a report. Min: 0 Max: 5000 Default: 300
        ZombiesCountBeforeDelete = 300,
    },
    MultiplierConfig = {
        -- The rate at which all skills level up. Min: 0.00 Max: 1000.00 Default: 1.00
        Global = 2.5,
        -- When enabled, all skills will use the Global Multiplier.
        GlobalToggle = true,
        -- Rate at which Fitness skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Fitness = 1.0,
        -- Rate at which Strength skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Strength = 1.0,
        -- Rate at which Sprinting skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Sprinting = 1.0,
        -- Rate at which Lightfooted skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Lightfoot = 1.0,
        -- Rate at which Nimble skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Nimble = 1.0,
        -- Rate at which Sneaking skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Sneak = 1.0,
        -- Rate at which Axe skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Axe = 1.0,
        -- Rate at which Long Blunt skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Blunt = 1.0,
        -- Rate at which Short Blunt skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        SmallBlunt = 1.0,
        -- Rate at which Long Blade skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        LongBlade = 1.0,
        -- Rate at which Short Blade skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        SmallBlade = 1.0,
        -- Rate at which Spear skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Spear = 1.0,
        -- Rate at which Maintenance skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Maintenance = 1.0,
        -- Rate at which Carpentry skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Woodwork = 1.0,
        -- Rate at which Cooking skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Cooking = 1.0,
        -- Rate at which Agriculture skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Farming = 1.0,
        -- Rate at which First Aid skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Doctor = 1.0,
        -- Rate at which Electrical skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Electricity = 1.0,
        -- Rate at which Welding skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        MetalWelding = 1.0,
        -- Rate at which Mechanics skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Mechanics = 1.0,
        -- Rate at which Tailoring skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Tailoring = 1.0,
        -- Rate at which Aiming skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Aiming = 1.0,
        -- Rate at which Reloading skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Reloading = 1.0,
        -- Rate at which Fishing skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Fishing = 1.0,
        -- Rate at which Trapping skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Trapping = 1.0,
        -- Rate at which Foraging skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        PlantScavenging = 1.0,
        -- Rate at which Knapping skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        FlintKnapping = 1.0,
        -- Rate at which Masonry skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Masonry = 1.0,
        -- Rate at which Pottery skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Pottery = 1.0,
        -- Rate at which Carving skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Carving = 1.0,
        -- Rate at which Animal Care skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Husbandry = 1.0,
        -- Rate at which Tracking skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Tracking = 1.0,
        -- Rate at which Blacksmithing skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Blacksmith = 1.0,
        -- Rate at which Butchering skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Butchering = 1.0,
        -- Rate at which Glassmaking skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Glassmaking = 1.0,
        -- Min: 0.00 Max: 1000.00 Default: 1.00
        ArmorWearing = 1.5,
        -- Min: 0.00 Max: 1000.00 Default: 1.00
        Efficiency = 1.5,
        -- XP multiplier used for the Fists perk when per-skill XP multipliers are enabled. Min: 0.00 Max: 1000.00 Default: 1.00
        Fist = 1.5,
        -- Rate at which Art skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Art = 1.5,
        -- Rate at which Cleaning skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Cleaning = 1.5,
        -- Rate at which Dancing skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Dancing = 1.5,
        -- Rate at which Meditation skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Meditation = 1.5,
        -- Rate at which Music skill levels up. Min: 0.00 Max: 1000.00 Default: 1.00
        Music = 1.5,
        -- Rate at which the Lockpicking skill levels up. Default 1. Same scale as the other skill multipliers (0 to 1000). Min: 0.00 Max: 1000.00 Default: 1.00
        Lockpicking = 1.8,
        -- Min: 0.00 Max: 1000.00 Default: 1.00
        Parkour = 1.0,
        -- Rate at which the Parkour skill levels up, used when each skill has its own multiplier (the global multiplier switched off) Min: 0.00 Max: 1000.00 Default: 1.00
        Parkour = 1.0,
    },
    SVUC = {
        -- How long it takes to install and uninstall light armor. Min: 10 Max: 50 Default: 15
        timeLight = 15,
        -- How long it takes to install and uninstall heavy armor. Min: 10 Max: 50 Default: 30
        timeHeavy = 30,
        -- How long it takes to install and uninstall reinforced armor. Min: 10 Max: 50 Default: 45
        timeReinforced = 45,
        -- Min: 10 Max: 50 Default: 15
        timeMods = 15,
        -- How long it takes to install and uninstall wheel chains. Min: 10 Max: 50 Default: 15
        timeWheels = 15,
        -- The part HP has to drop below this number to be repaired. Min: 50 Max: 80 Default: 80
        protectionHealthTriger = 80,
        -- How much damage to deal to light armor when it repairs a part. Min: 1 Max: 10 Default: 5
        protectionLightHealthDelta = 5,
        -- How much damage to deal to heavy armor when it repairs a part. Min: 1 Max: 10 Default: 4
        protectionHeavyHealthDelta = 4,
        -- How much damage to deal to reinforced armor when it repairs a part. Min: 1 Max: 10 Default: 3
        protectionReinforcedHealthDelta = 3,
        -- How much damage to deal to small bullbars when they repair a part. Min: 1 Max: 10 Default: 6
        protectionBullbarSmallHealthDelta = 6,
        -- How much damage to deal to medium bullbars when they repair a part. Min: 1 Max: 10 Default: 5
        protectionBullbarMediumHealthDelta = 5,
        -- How much damage to deal to large bullbars when they repair a part. Min: 1 Max: 10 Default: 4
        protectionBullbarLargeHealthDelta = 4,
        -- How much damage to deal to plows when they repair a part. Min: 1 Max: 10 Default: 3
        protectionPlowHealthDelta = 3,
        -- How much damage to deal to wheel chains when they repair a part. Min: 1 Max: 10 Default: 1
        protectionWheelsHealthDelta = 1,
        -- How much horsepower to add when a small air scoop's installed. Min: 0 Max: 50 Default: 10
        protectionEngineSmallPowerIncrease = 10,
        -- How much horsepower to add when a medium air scoop's installed. Min: 0 Max: 50 Default: 20
        protectionEngineMediumPowerIncrease = 20,
        -- How much horsepower to add when a large air scoop's installed. Min: 0 Max: 50 Default: 35
        protectionEngineLargePowerIncrease = 35,
        -- How much horsepower to add when a piped air scoop's installed. Min: 0 Max: 50 Default: 50
        protectionEnginePipedPowerIncrease = 50,
        -- How much horsepower to add when a snorkel's installed. Min: 0 Max: 50 Default: 15
        protectionEngineSnorkelPowerIncrease = 15,
        -- Multiplier for extra gas to use when light armor's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 10
        protectionLightGasUsage = 10,
        -- Multiplier for extra gas to use when heavy armor's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 20
        protectionHeavyGasUsage = 20,
        -- Multiplier for extra gas to use when reinforced armor's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 40
        protectionReinforcedGasUsage = 40,
        -- Multiplier for extra gas to use when modifications are installed. Set to 0 to disable. Min: 0 Max: 100 Default: 0
        protectionModsGasUsage = 0,
        -- Multiplier for extra gas to use when a small bullbar's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 1
        protectionBullbarSmallGasUsage = 1,
        -- Multiplier for extra gas to use when a medium bullbar's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 5
        protectionBullbarMediumGasUsage = 5,
        -- Multiplier for extra gas to use when a large bullbar's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 10
        protectionBullbarLargeGasUsage = 10,
        -- Multiplier for extra gas to use when a plow's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 20
        protectionPlowGasUsage = 20,
        -- Multiplier for extra gas to use when a small air scoop's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 2
        protectionEngineSmallGasUsage = 2,
        -- Multiplier for extra gas to use when a medium air scoop's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 3
        protectionEngineMediumGasUsage = 3,
        -- Multiplier for extra gas to use when a large air scoop's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 4
        protectionEngineLargeGasUsage = 4,
        -- Multiplier for extra gas to use when a piped air scoop's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 5
        protectionEnginePipedGasUsage = 5,
        -- Multiplier for extra gas to use when a snorkel's installed. Set to 0 to disable. Min: 0 Max: 100 Default: 1
        protectionEngineSnorkelGasUsage = 1,
    },
    TchernoLib = {
        -- When a zombie loses a target it's forbidden to attack (e.g. an infected player), it's marked useless to stop it re-detecting that target - but useless zombies also stop wandering. Off: zombies keep wandering normally, but may walk towards a forbidden target without attacking it.
        UselessZombies = true,
    },
    FWOFitness = {
        -- If enabled, XP gain speed also reflects your character's starting trait bonus for this skill (e.g. Weak/Strong for Strength): 75% with a penalty trait, 100% normal, 125% with a bonus trait.
        InitialPerkBonus = true,
        -- Grants a bonus or penalty to XP for the exercise you just did, based on how regularly you've been training it. Strength depends on the Offset and Rate options below.
        currentExerciseRegularityBonus = true,
        -- The regularity percentage (0-100) at which the Current Exercise Regularity Bonus is neutral. Training this exercise more regularly than this gives bonus XP; less regularly gives a penalty. Min: 0 Max: 100 Default: 25
        currentExerciseOffset = 25,
        -- How strongly regularity above or below the Offset affects XP for this exercise. Higher values mean bigger bonuses for consistent training and bigger penalties for inconsistent training. Min: 0.01 Max: 100.00 Default: 5.00
        currentExerciseRate = 5.0,
        -- Bonus XP based on how regularly you train across ALL exercises combined, not just the one you're currently doing. Min: 0.00 Max: 100.00 Default: 6.00
        AverageExerciseRegularityBonus = 6.0,
        -- Extra XP multiplier added per perk level already gained in this skill. Example: at Level 5 with a value of 0.30, you get +150% bonus XP. Min: 0.00 Max: 100.00 Default: 0.30
        LevelBonus = 0.3,
        -- Applies an XP penalty if you train the same muscle group again too soon (while still sore from the last session, roughly within 8 in-game hours). Tracked separately for Fitness and Strength.
        SpaceOutExercise = true,
        -- XP multiplier applied when the Space Out Exercise penalty is active (e.g. 0.90 = 10% less XP). Min: 0.00 Max: 100.00 Default: 0.90
        SpaceOutExerciseNegative = 0.9,
        -- Applies an XP penalty while you still have ongoing muscle soreness from a previous workout. No penalty once the soreness has worn off.
        RestedBonus = true,
        -- XP multiplier applied while the Rested Bonus penalty is active due to muscle soreness (e.g. 0.90 = 10% less XP). Min: 0.00 Max: 10.00 Default: 0.90
        RestedBonusNegative = 0.9,
        -- Multiplies all XP gained from this mod's bonuses on top of vanilla XP. 1.0 = normal; use small steps (e.g. 1.1, 0.9) to fine-tune the pace. Min: 0.01 Max: 10.00 Default: 1.00
        XPMultiplier = 1.0,
        -- Controls how much this mod's bonuses affect XP gained OUTSIDE of active exercise, e.g. from fighting or sprinting. Set to 0 to disable passive XP changes entirely. Min: 0.00 Max: 10.00 Default: 1.00
        PassiveMultiplier = 1.0,
        -- Multiplier for how much exercise reduces Boredom. Set to 0 to disable this mod's boredom reduction. Min: 0.00 Max: 10.00 Default: 1.00
        BoredomMultiplier = 1.0,
        -- Multiplier for how much exercise reduces Unhappiness. Set to 0 to disable this mod's unhappiness reduction. Min: 0.00 Max: 10.00 Default: 1.00
        UnhappynessMultiplier = 1.0,
        -- When bags are automatically removed for exercise, drop them on the floor instead of keeping them in your inventory. Has no effect if Keep Bags Equipped is on.
        DropBags = false,
        -- Keep worn backpacks and bags equipped during exercise instead of automatically removing them first.
        KeepBagsOn = false,
    },
    KillCount = {
        -- May provoke stutters.
        doExport = false,
        -- Includes all kills into the final value in Post Death floating text.
        includePostDeathUI = true,
        -- Target time (in milliseconds) between two updates in multiplayer. Small value gives reactivity. High value reduces network use and server workload. Min: 0 Max: 10000000 Default: 500
        MaxUpdateDelay = 500,
        -- Each client can see every character score. Deactivate on (very large) servers to reduce Global Mod Data transfer load.
        shareOnServer = true,
        -- Dead characters are kept and count toward server kills. Deactivate for server that never wipe.
        keepTrackOfDead = true,
    },
    Greenfire = {
        -- Give new characters a small Green Fire starter kit.
        StarterKit = false,
        -- How common Joint is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        JointRarity = 3,
        -- How common Spliff is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        SpliffRarity = 3,
        -- How common Blunt is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        BluntRarity = 3,
        -- How common Half Blunt is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        HalfBluntRarity = 3,
        -- How common Half Joint is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        HalfJointRarity = 3,
        -- How common Half Blunt Cigar is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        HalfBluntCigarRarity = 3,
        -- How common Blunt Cigar is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        BluntCigarRarity = 3,
        -- How common Cannabis is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        CannabisRarity = 3,
        -- How common Oz Cannabis is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        OzCannabisRarity = 3,
        -- How common Cannabis Seed is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        CannabisSeedRarity = 3,
        -- How common Cannabis Bag Seed is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        CannabisBagSeedRarity = 3,
        -- How common Cannabis Bag Seed Empty is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        CannabisBagSeed_EmptyRarity = 3,
        -- How common Rolling Papers is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        RollingPapersRarity = 3,
        -- How common Blunt Wrap is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        BluntWrapRarity = 3,
        -- How common GF Grinder is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        GFGrinderRarity = 3,
        -- How common Marshmallows is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        MarshmallowsRarity = 3,
        -- How common Roll Nylon is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        RollNylonRarity = 3,
        -- How common Afic Mag1 is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        AficMag1Rarity = 3,
        -- How common Canna Mag1 is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        CannaMag1Rarity = 3,
        -- How common Canna Mag2 is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        CannaMag2Rarity = 3,
        -- How common Canna Mag3 is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        CannaMag3Rarity = 3,
        -- How common GF Suspect1 is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        GFSuspect1Rarity = 3,
        -- How common GF Mystery1 is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        GFMystery1Rarity = 3,
        -- How common Bong is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        BongRarity = 3,
        -- How common Bong Black is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_blackRarity = 3,
        -- How common Bong White is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_whiteRarity = 3,
        -- How common Bong Gray is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_grayRarity = 3,
        -- How common Bong Tan is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_tanRarity = 3,
        -- How common Bong Navy is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_navyRarity = 3,
        -- How common Bong Red is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_redRarity = 3,
        -- How common Bong Blue is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_blueRarity = 3,
        -- How common Bong Green is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_greenRarity = 3,
        -- How common Bong Yellow is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_yellowRarity = 3,
        -- How common Bong Orange is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_orangeRarity = 3,
        -- How common Bong Magenta is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_magentaRarity = 3,
        -- How common Bong Darkbeige is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_darkbeigeRarity = 3,
        -- How common Bong Darkbrown is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_darkbrownRarity = 3,
        -- How common Bong Darkforestgreen is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_darkforestgreenRarity = 3,
        -- How common Bong Persianpink is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_persianpinkRarity = 3,
        -- How common Bong Arabiangold is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_arabiangoldRarity = 3,
        -- How common Bong Royalpurple is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_royalpurpleRarity = 3,
        -- How common Bong Newt is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_newtRarity = 3,
        -- How common Bong Pastelred is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_pastelredRarity = 3,
        -- How common Bong Pastelorange is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_pastelorangeRarity = 3,
        -- How common Bong Pastelyellow is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_pastelyellowRarity = 3,
        -- How common Bong Pastelgreen is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_pastelgreenRarity = 3,
        -- How common Bong Pastelblue is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_pastelblueRarity = 3,
        -- How common Bong Pastelpurple is in world loot. Default = Uncommon
        -- 1 = Very Rare
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        -- 5 = Very Common
        Bong_pastelpurpleRarity = 3,
    },
    UnifiedCarryWeightFramework = {
        -- PZ hardcoded on java-side to not allow player to carry more than 50kg/lb of items. If you run java mod that removes this limit, then you don't have to cap max weight at 50 and you should uncheck this box.
        CapWeight = true,
        -- Enables prints into console. Useful for debug purposes. You generally don't want to have this enabled during normal gameplay as it provides no useful information for players and just bloats the console file.
        GatherDetailedDebug = false,
    },
    EvolvingTraitsWorld = {
        -- Defines if the Affinity System is enabled for some traits tied to systems and some complex ones (for example, Fear of Locations or Sleep System traits).
        -- The Affinity system makes it easier to hold onto traits you picked during character creation, both negative and positive. With it enabled, you halve (modifiable) the speed at which you lose these traits, and double (also modifiable) the speed at which you earn these traits
        AffinitySystem = true,
        -- How much easier it is to gain perks that have Affinity System functionality (only affects perks you started with!). Setting it to 1 would mean that it doesn't make it easier to gain. Setting it to 2 means it'll take twice as fast to gain them. Setting it to 1.5 would make it 50% faster, and so on. So if you start with a positive dynamic trait and later lose it, you'll get it back much faster. But it also affects negative traits! Min: 1.00 Max: 100.00 Default: 2.00
        AffinitySystemGainMultiplier = 2.0,
        -- How much harder it is to lose perks that have Affinity System functionality (only affects perks you started with!). Setting it to 1 would mean that it doesn't make it harder to lose. Setting it to 2 means you'll be twice as slow to lose them. Setting it to 1.5 would make it 50% slower, and so on. So if you start with a positive trait that you can lose, it'll be much harder to lose it. But it also affects negative traits! Min: 1.00 Max: 100.00 Default: 2.00
        AffinitySystemLoseDivider = 2.0,
        -- This system allows you to gain/lose traits in a more random and less predictable way. When you qualify to add/remove a trait, it doesn't happen instantly. Instead, it's added to a table with a delay in hours (based on sandbox settings below). Every hour, the game rolls to determine if you gain/lose each trait in this table (each trait is rolled separately). You have a 1 in X chance to gain/lose the trait every hour. If the roll fails, X is reduced by 1. So the longer you go, the higher the chances that the trait you earned will manifest.
        -- Technical note: Traits that rely on skill levels will be unlocked as described above. However, traits that rely on internal counters added by this mod (e.g., Prone To Illness, Weak Stomach, Outdoorsman, Cat Eyes, etc.) will unlock the next time their internal counters increase. This is because coding a separate unlock mechanism for these specific traits would be complex and unnecessary. For example, if you qualify for Cat Eyes and it's added to the Delayed Traits Table, you won't get it immediately. Instead, you'll get it as soon as the Cat Eyes counter increases next time (e.g., the closest evening/night).
        DelayedTraitsSystem = true,
        -- Default delay (in hours) for traits to appear/disappear. For example, if set to 240, when you qualify for a new trait, you'll have a 1 in 240 chance to gain/lose it in the first hour. If it fails, the chance becomes 1 in 239 the next hour, and so on Min: 1 Max: 100000 Default: 336
        DelayedTraitsSystemDefaultDelay = 336,
        -- Additional delay (in hours) stacked on top of the default delay for free traits obtained at the start of the game. With a Default Delay of 240 and Additional Delay for Starting Traits of 480, a qualifying trait enters the delayed-traits table with a maximum delay of 720 hours, giving it a 1 in 720 chance to be awarded in the first hour, and so on. Min: 1 Max: 100000 Default: 504
        DelayedTraitsSystemDefaultStartingDelay = 504,
        -- Master switch that disables ETW trait evolution. When enabled, ETW will not dynamically gain, lose, or queue traits, delayed-trait rolls are paused, and the ETW character page is hidden. Traits a character already has and their effects remain active.
        DisableAllDynamicTraits = false,
        -- (MP ONLY) If enabled, prints some debug information into server console/logs. Should not be enabled unless there's incorrect mod behavior and you are reporting a bug
        ServerLogs = false,
        -- If this is enabled, you can gain negative traits during gameplay. This mostly applies to systems that dynamically manage paired positive and negative traits
        TraitsLockSystemCanGainNegative = true,
        -- If this is enabled, you can gain positive traits during gameplay. This applies to a lot of traits; you DO NOT want to have this disabled
        TraitsLockSystemCanGainPositive = true,
        -- If this is enabled, you can lose negative traits during gameplay. This applies to dynamic trait systems and a number of simple traits
        TraitsLockSystemCanLoseNegative = true,
        -- If this is enabled, you can lose positive traits during gameplay. This mostly applies to systems that dynamically manage paired positive and negative traits
        TraitsLockSystemCanLosePositive = true,
        -- Enables the Vitals, Permanent Traits, and Non-permanent Traits progress tabs on the ETW character page. The Help and Translations Status tabs remain available when this is disabled.
        UIPage = true,
        BraverySystem = true,
        -- The amount of Bravery System progress awarded for each firearm kill. Min: 0.00 Max: 100.00 Default: 1.00
        BraverySystemFirearmKillValue = 1.0,
        -- Here you set how much weighted kill progress is needed to max out the Bravery System. Each kill contributes progress according to its configured melee, firearm, or other kill value. Progression is as follows: Cowardly -> Fear of Blood -> Pacifist -> Adrenaline Junkie -> Brave -> Desensitized
        -- You need to have the previous trait gone (if it is negative) or present (if it is positive) to earn or lose the next trait in the progression.
        -- Amounts required to reach each stage are as follows:
        -- Cowardly: 10% of maximum progress
        -- Fear of Blood: 20% of maximum progress
        -- Pacifist: 30% of maximum progress
        -- Adrenaline Junkie: 40% of maximum progress
        -- Brave: 60% of maximum progress
        -- Desensitized: 100% of maximum progress Min: 0 Max: 10000000 Default: 14000
        BraverySystemKills = 14000,
        -- The amount of Bravery System progress awarded for each melee kill. Min: 0.00 Max: 100.00 Default: 2.00
        BraverySystemMeleeKillValue = 2.0,
        -- The amount of Bravery System progress awarded for each fire, vehicle, or explosive kill. Min: 0.00 Max: 100.00 Default: 1.00
        BraverySystemOtherKillValue = 1.0,
        -- If enabled, getting desensitized through the Bravery system will also remove other fear perks like Pluviophile, Homichlophobia, Agoraphobic, and Claustrophobic, and prevent you from gaining them
        BraverySystemRemovesOtherFearPerks = false,
        CarryWeightSystem = true,
        -- Determines the maximum Carry Weight System progress. Progress is added every in-game minute based on carried weight divided by maximum carry weight: a full inventory adds 1 point, while a half-full inventory adds 0.5 points. Lose Pack Mouse at 33%, gain Hoarder at 66%, and gain Pack Mule at 100%. Min: 0 Max: 10000000 Default: 100000
        CarryWeightSystemCounter = 100000,
        -- Tracks the base duration values of completed food-eating actions. Interrupted eating actions, drinking, and smoking do not count. At half of the configured counter you can lose Slow Eater; at the full counter you can gain Fast Eater.
        EatingSpeedSystem = true,
        -- Total base duration value from completed food-eating actions required to gain Fast Eater. Slow Eater can be lost after half this value. Interrupted actions do not count, and eating-speed traits do not change the amount recorded. Min: 0 Max: 10000000 Default: 216000
        EatingSpeedSystemCounter = 216000,
        FearOfLocationsSystem = true,
        -- Counter = amount of minutes you need to spend outside/inside to lose the respective trait, Agoraphobic or Claustrophobic. Being outside/inside when stressed or unhappy will decrease the counter. Reaching a negative counter value will GAIN you the appropriate trait. Reaching a positive counter value will get rid of the appropriate trait, being in between -counter and +counter will result in no change. The lower boundary is -2x of the counter, and the upper boundary is 2x of the set value here Min: 0 Max: 10000000 Default: 8000
        FearOfLocationsSystemCounter = 8000,
        -- Controls how fast the counter decreases when you are unhappy (50%+) or stressed (50%+). Since you are more often normal than unhappy or stressed, it's recommended not to set this value too low. The formula for how much the counter decreases every minute is: 1 * (1 + unhappiness(0-1)) + (1 * stress(0-1)) * multiplier. At minimum, you lose 0 * multiplier; at maximum, you lose 4 * multiplier Min: 0.00 Max: 100.00 Default: 1.00
        FearOfLocationsSystemCounterLoseMultiplier = 1.0,
        -- If enabled, you will only ever have Claustrophobic OR Agoraphobic, whichever has the lower counter
        FearOfLocationsSystemExclusiveFears = true,
        -- If you have an issue managing both Agoraphobic and Claustrophobic traits simultaneously, you can set up passive decay using this option. This slowly decays the opposite counter based on whether you're outside/inside every minute, regardless of your mental state. For example, setting this to 0.1 and being inside will gradually reduce your fear of outside by adding 0.1 to the outside counter every minute. Setting it to 0 will have no effect on counters. Recommended values range from 0.1 to 0.5 Min: 0.00 Max: 8.00 Default: 0.10
        FearOfLocationsSystemPassiveCounterDecay = 0.1,
        FogSystem = true,
        -- You gain progress every minute you spend in fog. Being panicked can slow down the process or even revert it. If the counter is below -counter, you gain Homichlophobia; when reaching counter, you gain Homichlophile. If the counter is between these values, there is no effect. Making a kill at during fog triggers extra execution of function responsible for gaining/losing progress (so instead of getting progress 1 time / minute you can get progress 3 times per minute, for example) Min: 0 Max: 10000000 Default: 20000
        FogSystemCounter = 20000,
        -- Adjusts the rate at which your counter decreases. See tooltip for details in Fog System Counter Min: 0.00 Max: 100.00 Default: 10.00
        FogSystemCounterDecreaseMultiplier = 10.0,
        -- Adjusts the rate at which your counter increases. See tooltip for details in Fog System Counter Min: 0.00 Max: 100.00 Default: 10.00
        FogSystemCounterIncreaseMultiplier = 10.0,
        FoodSicknessSystem = true,
        -- Determines how much food sickness you need to accumulate to lose/gain Food Sickness-related traits, Weak Stomach and Iron Gut. Sickness can range from 0 to 1, where 1 can lead to death. Each minute, your current food sickness level is added to the counter. Min: 0 Max: 10000000 Default: 40000
        FoodSicknessSystemCounter = 40000,
        -- Sickness gained specifically from food and general sickness are different things in the game. This multiplier allows normal sickness to count for gaining the Food Sickness System traits. Min: 0.00 Max: 100.00 Default: 0.10
        FoodSicknessSystemNormalSicknessMultiplier = 0.1,
        -- Tracks your long-term eating habits using rolling averages, similar to the mental system. The mod stores a normalized food score over time, where higher is better. Staying reasonably fed over time helps you lose Hearty Appetite and eventually gain Light Eater. Frequently letting hunger stay high for long periods pushes you toward Hearty Appetite. Sleeping time is ignored so the system judges habits rather than sleep cycles.
        FoodSystem = true,
        -- If your 31-day average food score drops to or below this value, you can gain Hearty Appetite. Lower values make the system more forgiving. Min: 0.00 Max: 1.00 Default: 0.55
        FoodSystemGainNegativeThreshold = 0.55,
        -- If your 31-day average food score rises to or above this value, you can gain Light Eater. Higher values make it harder to gain. Food scores range from 0 to 1, where higher is better. Min: 0.00 Max: 1.00 Default: 0.82
        FoodSystemGainPositiveThreshold = 0.82,
        -- If your 31-day average food score rises to or above this value, you can lose Hearty Appetite. Higher values make it harder to recover from the negative trait. Min: 0.00 Max: 1.00 Default: 0.70
        FoodSystemLoseNegativeThreshold = 0.7,
        -- If your 31-day average food score drops to or below this value, you can lose Light Eater. Lower values make the positive trait harder to lose. Min: 0.00 Max: 1.00 Default: 0.72
        FoodSystemLosePositiveThreshold = 0.72,
        -- Allows gaining and losing Gym Hater and Gym Rat from average exercise regularity. Progress updates once per in-game hour by the distance from the configured midpoint. Gym Hater is gained at -75% and lost at -25% of the counter maximum; Gym Rat is lost at 25% and gained at 75%.
        GymTraitsSystem = true,
        -- Maximum positive and negative progress. The system counter ranges from the negative of this value to the positive of this value. Min: 1 Max: 10000000 Default: 10000
        GymTraitsSystemCounter = 10000,
        -- Multiplies hourly progress toward Gym Rat when average exercise regularity is above the midpoint. Min: 0.00 Max: 100.00 Default: 1.00
        GymTraitsSystemProgressGainMultiplier = 1.0,
        -- Multiplies hourly progress toward Gym Hater when average exercise regularity is below the midpoint. Min: 0.00 Max: 100.00 Default: 1.00
        GymTraitsSystemProgressLossMultiplier = 1.0,
        -- Average exercise regularity that leaves progress unchanged. Regularity above this value moves progress toward Gym Rat; regularity below it moves progress toward Gym Hater. Exercises not yet performed count as 0% regularity. Which means, that, for example, if you max Burpees to 100% but don't do any other exercises (there are 7 in vanilla game), your average regularity will be 14.3% (100% / 7). Min: 0 Max: 100 Default: 50
        GymTraitsSystemRegularityMidpoint = 50,
        -- Average exercise regularity assigned to new characters who start with Gym Rat. The configured percentage is randomly distributed across all available exercises as closely as vanilla regularity increments allow. Min: 0 Max: 100 Default: 75
        GymTraitsSystemStartingGymRatRegularity = 75,
        -- Average exercise regularity assigned to new characters who start with neither Gym Rat nor Gym Hater. The configured percentage is randomly distributed across all available exercises as closely as vanilla regularity increments allow. Min: 0 Max: 100 Default: 0
        GymTraitsSystemStartingNoTraitRegularity = 0,
        -- Stops hourly progress toward Gym Hater for this many in-game hours after a qualifying workout. Set to 0 to disable the grace period. Min: 0 Max: 1000 Default: 16
        GymTraitsSystemWorkoutGracePeriodHours = 16,
        -- Number of completed exercise repeats required within a rolling in-game hour to count as a workout. Min: 1 Max: 1000 Default: 10
        GymTraitsSystemWorkoutLoopThreshold = 10,
        -- Controls Slow Healer and Fast Healer based on how consistently the character tends current wounds. Wound care is checked every in-game minute. Clean bandages, stitches, and valid splints add severity-weighted progress; dirty bandages, embedded glass or bullets, untreated bleeding, burns needing washing, uncovered wounds, and splintable fractures without a splint remove it. Contribution settings describe the total progress produced over ten in-game minutes when the wound state remains unchanged. Wound infection is not counted, and having no tracked wounds does not change the counter.
        HealerSystem = true,
        -- Sets both the positive and negative limit of the Healer System counter. Gain Slow Healer at -66%, lose Slow Healer at -33%, lose Fast Healer at +33%, and gain Fast Healer at +66%. Characters who start with Slow Healer or Fast Healer begin at the corresponding negative or positive maximum. Min: 1 Max: 10000000 Default: 10000
        HealerSystemCounter = 10000,
        -- Multiplies severity-weighted Healer System progress lost from wounds that need attention. The system checks every in-game minute and applies one tenth of the configured ten-minute total each time. Wound severity is configured with the shared Body Contribution settings. Min: 0.00 Max: 100.00 Default: 1.00
        HealerSystemNeedsAttentionMultiplier = 1.0,
        -- Multiplies severity-weighted Healer System progress from properly tended wounds. The system checks every in-game minute and applies one tenth of the configured ten-minute total each time. Wound severity is configured with the shared Body Contribution settings. Min: 0.00 Max: 100.00 Default: 1.00
        HealerSystemProperlyTendedMultiplier = 1.0,
        -- Multiplies Healer System counter changes while the player is asleep. The default greatly reduces changes caused by wounds that cannot be tended during sleep. Min: 0.00 Max: 100.00 Default: 0.10
        HealerSystemSleepingMultiplier = 0.1,
        -- Controls Thin Skinned and Thick Skinned based on the injuries your character sustains over time. Every ten minutes, each current tracked injury increases the counter by its configured contribution, fortifying the character over time. Having no tracked injuries instead decreases the counter. Wound infection does not contribute. The counter is clamped between the negative and positive maximum.
        -- Thin Skinned is gained at -66%, Thin Skinned is lost at -33%, Thick Skinned is lost at +33%, and Thick Skinned is gained at +66%.
        InjuriesSystem = true,
        -- Sets both the positive and negative limit of the Injuries System counter. Trait thresholds are percentages of this value: gain Thin Skinned at -66%, lose Thin Skinned at -33%, lose Thick Skinned at +33%, and gain Thick Skinned at +66%. Characters who start with Thin Skinned or Thick Skinned begin at the corresponding negative or positive maximum. Min: 1 Max: 10000000 Default: 10000
        InjuriesSystemCounter = 10000,
        -- How much is subtracted from the Injuries System counter every ten in-game minutes while the character has none of the tracked injuries. Min: 0.00 Max: 100.00 Default: 0.50
        InjuriesSystemPassiveCounterDecay = 0.5,
        -- Severity assigned to each current bite. The Injuries System adds this value every ten in-game minutes. The Healer System checks every minute and, if treatment stays unchanged, gains or loses this total value over ten minutes before applying its treatment multiplier. Any resulting wound infection is not counted separately. Min: 0.00 Max: 100.00 Default: 8.00
        BodyBiteContribution = 8.0,
        -- Severity assigned to each current burn. The Injuries System adds this value every ten in-game minutes. The Healer System checks every minute and, if treatment stays unchanged, gains or loses this total value over ten minutes before applying its treatment multiplier. Min: 0.00 Max: 100.00 Default: 6.00
        BodyBurnContribution = 6.0,
        -- Severity assigned to each current deep wound or stitched deep wound. The Injuries System adds this value every ten in-game minutes for active deep wounds. The Healer System checks every minute and, if treatment stays unchanged, gains or loses this total value over ten minutes before applying its treatment multiplier. Min: 0.00 Max: 100.00 Default: 6.00
        BodyDeepWoundContribution = 6.0,
        -- Severity assigned to each current fracture. The Injuries System adds this value every ten in-game minutes. The Healer System checks every minute and, if splint treatment stays unchanged, gains or loses this total value over ten minutes before applying its treatment multiplier. Min: 0.00 Max: 100.00 Default: 6.00
        BodyFractureContribution = 6.0,
        -- Severity assigned to each current laceration. The Injuries System adds this value every ten in-game minutes. The Healer System checks every minute and, if treatment stays unchanged, gains or loses this total value over ten minutes before applying its treatment multiplier. Min: 0.00 Max: 100.00 Default: 4.00
        BodyLacerationContribution = 4.0,
        -- Severity assigned to each currently lodged bullet. The Injuries System adds this value every ten in-game minutes. The Healer System checks every minute and loses this total value over ten minutes before applying its neglected-wound multiplier. This is counted in addition to any associated deep wound. Min: 0.00 Max: 100.00 Default: 8.00
        BodyLodgedBulletContribution = 8.0,
        -- Severity assigned to each currently lodged piece of glass. The Injuries System adds this value every ten in-game minutes. The Healer System checks every minute and loses this total value over ten minutes before applying its neglected-wound multiplier. This is counted in addition to any associated deep wound. Min: 0.00 Max: 100.00 Default: 4.00
        BodyLodgedGlassContribution = 4.0,
        -- Severity assigned to each current scratch. The Injuries System adds this value every ten in-game minutes. The Healer System checks every minute and, if treatment stays unchanged, gains or loses this total value over ten minutes before applying its treatment multiplier. Min: 0.00 Max: 100.00 Default: 2.00
        BodyScratchContribution = 2.0,
        HearingSystem = true,
        -- Determines how many levels in Agility + Combat (excluding Maintenance) you need to obtain/lose hearing-related perks (Hard Of Hearing and Keen Hearing). You lose Hard of Hearing when you surpass half of the required levels and gain Keen Hearing upon reaching the specified number Min: 0 Max: 100 Default: 80
        HearingSystemSkill = 80,
        -- Updates progress every in-game minute. Between 78 and 82 kg, gain more progress closer to 80 kg. At exactly 78 or 82 kg, progress stays unchanged. Outside that range, lose 1 point per minute for every 5 kg beyond the nearest boundary, scaled by the loss multiplier. At default rates: 80 kg adds 1, 79/81 kg adds 0.5, 73/87 kg loses 1, and 68/92 kg loses 2. Progress ranges from 0 to the configured counter maximum. Gain the trait at 66% and lose it at 33% of that maximum. Characters starting with Ideal Weight start at maximum progress.
        IdealWeight = true,
        -- Maximum saved progress. Gain Ideal Weight at 66% of this value and lose it at 33%. Characters starting with the trait start at this maximum. Min: 1.00 Max: 10000000.00 Default: 18000.00
        IdealWeightCounter = 18000.0,
        -- Multiplies progress earned per minute strictly between 78 and 82 kg. Base gain is 1 minus half the distance from 80 kg. Min: 0.00 Max: 100.00 Default: 1.00
        IdealWeightProgressGainMultiplier = 1.0,
        -- Multiplies progress lost per minute below 78 kg or above 82 kg. Base loss is the distance beyond the nearest boundary divided by 5. Exactly 78 or 82 kg causes no loss. Min: 0.00 Max: 100.00 Default: 1.00
        IdealWeightProgressLossMultiplier = 1.0,
        ImmunitySystem = true,
        -- Maximum Immunity System progress. Lose Prone to Illness at 12.5%, lose Immunocompromised at 25%, gain Resilient at 37.5%, and gain Super-Immune at 100%. Disabled custom traits are skipped. Every minute, current cold strength is added to progress. Knox Infection also contributes, scaled by its multiplier. Min: 0 Max: 10000000 Default: 27000
        ImmunitySystemCounter = 9000,
        -- Prevents the Immunity System from granting Super-Immune. Resilient becomes the final stage instead.
        ImmunitySystemExcludeSuperImmune = false,
        -- This is multiplier how much Knox infection level contributes to Immunity System progress. Min: 0.00 Max: 100.00 Default: 10.00
        ImmunitySystemInfectionMultiplier = 10.0,
        -- Number of Knox infections a character must survive before the Immunity System can grant Super-Immune. Set to 0 to disable this requirement. Setting this above 0 is recommended when using mods such as Antibodies that allow players to survive Knox Infection. Min: 0 Max: 10000000 Default: 0
        ImmunitySystemSuperImmuneInfectionsSurvived = 0,
        InventoryTransferSystem = true,
        -- Specifies how many items (and their weight) you need to transfer to earn/lose traits related to item transfer: Disorganized, Organized, All Thumbs, Dexterous, Butterfingers.
        -- Disorganized: 66% of Weight counter and 33% of Items counter
        -- Organized: 100% of Weight counter and 66% of Items counter
        -- All Thumbs: 33% of Weight counter and 66% of Items counter
        -- Dexterous: 66% of Weight counter and 100% of Items counter
        -- Butterfingers: 150% of both counters Min: 0 Max: 10000000 Default: 40000
        InventoryTransferSystemItems = 40000,
        -- Specifies how much weight (and how many items) you need to transfer to earn/lose traits related to item transfer: Disorganized, Organized, All Thumbs, Dexterous, Butterfingers.
        -- Disorganized: 66% of Weight counter and 33% of Items counter
        -- Organized: 100% of Weight counter and 66% of Items counter
        -- All Thumbs: 33% of Weight counter and 66% of Items counter
        -- Dexterous: 66% of Weight counter and 100% of Items counter
        -- Butterfingers: 150% of both counters Min: 0 Max: 10000000 Default: 30000
        InventoryTransferSystemWeight = 30000,
        LearnerSystem = true,
        -- Specifies the skill levels required to lose Slow Learner and gain Fast Learner. Slow Learner is lost upon reaching half of the required levels, while Fast Learner is gained upon reaching the specified number of levels. Skills included: Maintenance, Carpentry, Cooking, Farming, First Aid, Electrical, Metalworking, Mechanics, Tailoring Min: 0 Max: 90 Default: 60
        LearnerSystemSkill = 60,
        -- Allows gaining and losing Depressive and Blissful based on the long-term mental-state average.
        MentalStateSystem = true,
        -- Gain Blissful when the mental-state average reaches or exceeds this value. Min: 0.00 Max: 1.00 Default: 0.90
        MentalStateSystemBlissfulGainThreshold = 0.9,
        -- Lose Blissful when the mental-state average reaches or falls below this value. Min: 0.00 Max: 1.00 Default: 0.80
        MentalStateSystemBlissfulLoseThreshold = 0.8,
        -- Gain Depressive when the mental-state average reaches or falls below this value. Min: 0.00 Max: 1.00 Default: 0.20
        MentalStateSystemDepressiveGainThreshold = 0.2,
        -- Lose Depressive when the mental-state average reaches or exceeds this value. Min: 0.00 Max: 1.00 Default: 0.35
        MentalStateSystemDepressiveLoseThreshold = 0.35,
        RainSystem = true,
        -- You gain progress every minute you spend in rain while outside. Being panicked can slow down the process or even revert it. If the counter is below -counter, you gain Pluviophobia; when reaching counter, you gain Pluviophile. If the counter is between these values, there is no effect. Making a kill at during rain triggers extra execution of function responsible for gaining/losing progress (so instead of getting progress 1 time / minute you can get progress 3 times per minute, for example) Min: 0 Max: 10000000 Default: 40000
        RainSystemCounter = 40000,
        -- Adjusts the rate at which your Rain System Counter decreases, detailed in Rain System Counter tooltip Min: 0.00 Max: 100.00 Default: 10.00
        RainSystemCounterDecreaseMultiplier = 10.0,
        -- Adjusts the rate at which your Rain System Counter increases, detailed in Rain System Counter tooltip Min: 0.00 Max: 100.00 Default: 10.00
        RainSystemCounterIncreaseMultiplier = 10.0,
        ReaderSystem = true,
        -- Determines how many pages you need to read to lose Slow Reader and gain Fast Reader. Upon reaching half of the counter value, you lose Slow Reader; upon reaching the full value, you gain Fast Reader. Books and magazines that must be read in one sitting are counted as 5 pages, matching vanilla behavior. Min: 0 Max: 10000000 Default: 10000
        ReaderSystemCounter = 10000,
        -- Enables obtaining/losing sleep-related traits, Wakeful and Sleepyhead. 
        -- ---General description---
        -- Mod tracks at which hours you like to sleep, and as long as you sleep within around those hours, you reinforce your healthy sleep schedule. If you sleep outside of it, you lose some schedule integrity. Not sleeping for more than 24 hours also starts to damage your sleep schedule. Mod tracks at which hours you like to sleep by checking the midpoint of your last sleep, so it's possible to shift your schedule to different hours. Brief awakenings do not split one night's sleep into separate sessions: you have a one-hour grace period to return to sleep.
        -- ---Technical description, don't read this if you don't want to meta-game much---
        -- Every time you sleep, the mod tracks the midpoint of your sleep. For example, if you sleep between 23:00 and 05:30, the midpoint would be 03:45, and it would be your optimal sleeping hour. The new midpoint is committed only after you remain awake for one in-game hour. If you return to sleep during that grace period, the session continues from the original bedtime and uses the final wake-up time. If you remain awake for the full hour, the midpoint still uses the time at which you initially woke up, not the end of the grace period. If you sleep within +-6 hours of this time, you gain progress to your SleepHealthiness bar, which ranges between the configured negative and positive maximum. A check is made every 10 minutes, adding +0.167 to the bar if sleeping within the correct schedule, essentially giving +1 for every hour of correct sleep. Sleeping outside this schedule removes 0.167 from the bar every 10 minutes. After not sleeping for more than 24 hours, you start losing -0.167 every ten minutes. Gain Sleepyhead at -66% and lose it at -33%. Lose Wakeful at +33% and gain it at +66%. Starting with either trait sets the starting value of the bar to its corresponding negative or positive maximum
        SleepSystem = true,
        -- Sets both the positive and negative limit of the Sleep System counter. Gain Sleepyhead at -66%, lose Sleepyhead at -33%, lose Wakeful at +33%, and gain Wakeful at +66%. Characters who start with Sleepyhead or Wakeful begin at the corresponding negative or positive maximum. Min: 1 Max: 10000000 Default: 300
        SleepSystemCounter = 300,
        -- Determines how fast you increase/decrease the SleepHealthiness counter, which dictates if you get/lose Wakeful and Sleepyhead. Higher values mean faster gain and loss. Lower values mean slower gain and loss Min: 0.00 Max: 100.00 Default: 1.00
        SleepSystemMultiplier = 1.0,
        -- Tracks your long-term hydration habits using rolling averages, similar to the mental system. The mod stores a normalized thirst score over time, where higher is better. Staying reasonably hydrated over time helps you lose High Thirst and eventually gain Low Thirst. Frequently letting thirst stay high for long periods pushes you toward High Thirst. Sleeping time is ignored so the system judges habits rather than sleep cycles.
        ThirstSystem = true,
        -- If your 31-day average thirst score drops to or below this value, you can gain High Thirst. Lower values make the system more forgiving. Min: 0.00 Max: 1.00 Default: 0.60
        ThirstSystemGainNegativeThreshold = 0.6,
        -- If your 31-day average thirst score rises to or above this value, you can gain Low Thirst. Higher values make it harder to gain. Thirst scores range from 0 to 1, where higher is better. Min: 0.00 Max: 1.00 Default: 0.85
        ThirstSystemGainPositiveThreshold = 0.85,
        -- If your 31-day average thirst score rises to or above this value, you can lose High Thirst. Higher values make it harder to recover from the negative trait. Min: 0.00 Max: 1.00 Default: 0.75
        ThirstSystemLoseNegativeThreshold = 0.75,
        -- If your 31-day average thirst score drops to or below this value, you can lose Low Thirst. Lower values make the positive trait harder to lose. Min: 0.00 Max: 1.00 Default: 0.76
        ThirstSystemLosePositiveThreshold = 0.76,
        -- If disabled, the Alcoholic withdrawal, reset, and benefit moodle is hidden for every player. For single-player, leave this enabled and use Mod Options to control whether you see it.
        AlcoholicMoodle = true,
        -- If this option is disabled, the moodle won't show up. For single-player, leave this on and change moodles you see with Mod Options. If it's a server setting, players won't be able to enable the moodle client-sided
        SleepMoodle = true,
        -- Critical chance added while wielding a weapon before nearby-zombie bonuses. Min: 0.00 Max: 100.00 Default: 10.00
        ActionHeroBaseCriticalChance = 10.0,
        -- Percentage of normal weapon damage dealt before nearby-zombie bonuses are added. Min: 0.00 Max: 200.00 Default: 50.00
        ActionHeroBaseDamagePercent = 50.0,
        -- Critical chance added per living zombie within 2 tiles. Zombies within 2-5 tiles provide 50% of this amount; zombies within 5-10 tiles provide 20%. Min: 0.00 Max: 100.00 Default: 10.00
        ActionHeroCloseCriticalChanceBonus = 10.0,
        -- Weapon-damage percentage added per living zombie within 2 tiles. Zombies within 2-5 tiles provide 40% of this amount; zombies within 5-10 tiles provide 20%. Min: 0.00 Max: 100.00 Default: 10.00
        ActionHeroCloseDamageBonusPercent = 10.0,
        -- Chance rolled each minute while acute withdrawal is at mild severity. On success, the character drops held items. Min: 0.00 Max: 100.00 Default: 0.00
        AlcoholicMildWithdrawalHandItemDropChancePercent = 0.0,
        -- Chance rolled each minute while acute withdrawal is at mild severity. On success, 20 pain is added to the character's head. Reaching 70 head pain starts a 4-hour cooldown for this effect. Min: 0.00 Max: 100.00 Default: 1.50
        AlcoholicMildWithdrawalHeadPainChancePercent = 1.5,
        -- Chance rolled each minute while acute withdrawal is at mild severity. On success, the character screams. Min: 0.00 Max: 100.00 Default: 0.00
        AlcoholicMildWithdrawalScreamChancePercent = 0.0,
        -- Chance rolled each minute while acute withdrawal is at mild severity. On success, food sickness increases by 10%, up to 89.99%. Reaching 70% starts a 4-hour cooldown for this effect. Min: 0.00 Max: 100.00 Default: 4.00
        AlcoholicMildWithdrawalSicknessChancePercent = 4.0,
        -- Chance rolled each minute while acute withdrawal is at mild severity and no temperature swing is active. Min: 0.00 Max: 100.00 Default: 0.33
        AlcoholicMildWithdrawalTemperatureSwingChancePercent = 0.33,
        -- Chance rolled each minute while the character is asleep during mild acute withdrawal. A successful wake-up cannot trigger again for 4 hours. Min: 0.00 Max: 100.00 Default: 0.40
        AlcoholicMildWithdrawalWakeUpChancePercent = 0.4,
        -- Chance rolled each minute while acute withdrawal is at moderate severity. On success, the character drops held items. Min: 0.00 Max: 100.00 Default: 2.00
        AlcoholicModerateWithdrawalHandItemDropChancePercent = 2.0,
        -- Chance rolled each minute while acute withdrawal is at moderate severity. On success, 20 pain is added to the character's head. Reaching 70 head pain starts a 4-hour cooldown for this effect. Min: 0.00 Max: 100.00 Default: 2.50
        AlcoholicModerateWithdrawalHeadPainChancePercent = 2.5,
        -- Chance rolled each minute while acute withdrawal is at moderate severity. On success, the character screams. Min: 0.00 Max: 100.00 Default: 0.00
        AlcoholicModerateWithdrawalScreamChancePercent = 0.0,
        -- Chance rolled each minute while acute withdrawal is at moderate severity. On success, food sickness increases by 10%, up to 89.99%. Reaching 70% starts a 4-hour cooldown for this effect. Min: 0.00 Max: 100.00 Default: 6.00
        AlcoholicModerateWithdrawalSicknessChancePercent = 6.0,
        -- Chance rolled each minute while acute withdrawal is at moderate severity and no temperature swing is active. Min: 0.00 Max: 100.00 Default: 1.00
        AlcoholicModerateWithdrawalTemperatureSwingChancePercent = 1.0,
        -- Chance rolled each minute while the character is asleep during moderate acute withdrawal. A successful wake-up cannot trigger again for 4 hours. Min: 0.00 Max: 100.00 Default: 0.55
        AlcoholicModerateWithdrawalWakeUpChancePercent = 0.55,
        -- Base intoxication required before the Alcoholic trait begins reducing stress and panic. Min: 0.00 Max: 100.00 Default: 20.00
        AlcoholicPositiveEffectBaseIntoxicationPercent = 20.0,
        -- Additional intoxication required for positive effects per Alcoholic severity stage. Min: 0.00 Max: 100.00 Default: 10.00
        AlcoholicPositiveEffectIntoxicationPercentPerStage = 10.0,
        -- Chance rolled each minute while acute withdrawal is at severe severity. On success, the character drops held items. Min: 0.00 Max: 100.00 Default: 4.00
        AlcoholicSevereWithdrawalHandItemDropChancePercent = 4.0,
        -- Chance rolled each minute while acute withdrawal is at severe severity. On success, 20 pain is added to the character's head. Reaching 70 head pain starts a 4-hour cooldown for this effect. Min: 0.00 Max: 100.00 Default: 4.00
        AlcoholicSevereWithdrawalHeadPainChancePercent = 4.0,
        -- Chance rolled each minute while acute withdrawal is at severe severity. On success, the character screams. Min: 0.00 Max: 100.00 Default: 4.00
        AlcoholicSevereWithdrawalScreamChancePercent = 4.0,
        -- Chance rolled each minute while acute withdrawal is at severe severity. On success, food sickness increases by 10%, up to 89.99%. Reaching 70% starts a 4-hour cooldown for this effect. Min: 0.00 Max: 100.00 Default: 8.00
        AlcoholicSevereWithdrawalSicknessChancePercent = 8.0,
        -- Chance rolled each minute while acute withdrawal is at severe severity and no temperature swing is active. Min: 0.00 Max: 100.00 Default: 2.00
        AlcoholicSevereWithdrawalTemperatureSwingChancePercent = 2.0,
        -- Chance rolled each minute while the character is asleep during severe acute withdrawal. A successful wake-up cannot trigger again for 4 hours. Min: 0.00 Max: 100.00 Default: 0.70
        AlcoholicSevereWithdrawalWakeUpChancePercent = 0.7,
        -- Percentage of the full stress and panic scales removed each minute while intoxicated. Min: 0.00 Max: 100.00 Default: 2.00
        AlcoholicStressAndPanicReductionPerMinute = 2.0,
        -- Additional percentage of the full stress and panic scales removed per Alcoholic severity stage while intoxicated. Min: 0.00 Max: 100.00 Default: 1.00
        AlcoholicStressAndPanicReductionPerStage = 1.0,
        -- Percentage of the trait's required positive-effect intoxication that must be reached to reset withdrawal. At the default 50%, a Mild Alcoholic requiring 30% intoxication resets withdrawal at 15%. Min: 0.00 Max: 100.00 Default: 50.00
        AlcoholicWithdrawalResetThresholdPercent = 50.0,
        -- Multiplies the randomly rolled duration of the initial pre-withdrawal wait and each acute-withdrawal stage. Lower values make withdrawal progress faster. Min: 0.00 Max: 100.00 Default: 1.00
        AlcoholicWithdrawalStageDurationMultiplier = 1.0,
        -- Protected withdrawal stress accumulated each tick during acute withdrawal, multiplied by the Alcoholic severity stage. It cannot exceed 50% (similar to Smoking) and cannot be reduced by other mood effects. In sandbox it's displayed in scientific notation. Use internet if you don't know what that is. Min: 0.00 Max: 1.00 Default: 0.00
        AlcoholicWithdrawalStressIncreasePerTick = 2.5E-5,
        -- Number of minutes a triggered temperature swing lasts. A swing randomly selects warming or cooling when it starts, then changes temperature by 1 degree in that direction each minute. Min: 1 Max: 1440 Default: 10
        AlcoholicWithdrawalTemperatureSwingDurationMinutes = 10,
        -- Additional health lost from each actively bleeding, unstemmed body part every minute. Head and neck wounds receive twice this amount. Min: 0.00 Max: 10.00 Default: 0.40
        AnemicBleedingDamage = 0.4,
        -- Multiplier applied to firearm aiming time while the trait holder has a firearm equipped. The default 0.8 reproduces the trait's slower aiming behavior. Min: 0.00 Max: 10.00 Default: 0.80
        AntiGunAimingTimeMultiplier = 0.8,
        -- Percentage of earned Aiming XP removed while progress through the current level is between 5% and 95%. The 5% - 95% range is to prevent weird levelup interactions on technical level. Min: 0 Max: 100 Default: 25
        AntiGunAimingXPPenaltyPercent = 25,
        -- Percentage of the full unhappiness scale added for each bullet successfully loaded into or unloaded from a magazine. Since unhappiness ranges from 0 to 100, 1% adds 1 point. Min: 0.00 Max: 100.00 Default: 0.10
        AntiGunMagazineHandlingUnhappinessPerBullet = 0.1,
        -- Amount removed from an equipped firearm's maximum range. Resulting maximum range cannot fall below 5 tiles. Min: 0.00 Max: 100.00 Default: 5.00
        AntiGunMaxRangePenalty = 5.0,
        -- Percentage of earned Reloading XP removed while progress through the current level is between 5% and 95%. The 5% - 95% range is to prevent weird levelup interactions on technical level. Min: 0 Max: 100 Default: 25
        AntiGunReloadingXPPenaltyPercent = 25,
        -- Unhappiness added each minute while aiming a firearm. Min: 0.00 Max: 100.00 Default: 2.00
        AntiGunUnhappinessPerMinute = 2.0,
        -- Percentage of the full boredom scale removed each minute. Since boredom ranges from 0 to 100, 0.25% removes 0.25 points per minute. Min: 0.00 Max: 100.00 Default: 0.25
        AsceticBoredomReductionPerMinute = 0.25,
        -- When enabled, Ascetic modifies mood effects from packaged and prepared food and increases fullness and calories gained from simple food.
        AsceticFoodEffect = true,
        -- When enabled, comic books provide no boredom, stress, or unhappiness reduction to Ascetic characters. Ordinary books remain unaffected.
        AsceticReadingEffect = true,
        -- Percentage added to the fullness and calories gained from non-packaged food containing fewer than two combined ingredients and spices. Min: 0 Max: 1000 Default: 25
        AsceticSimpleFoodGainPercent = 25,
        -- When enabled, Ascetic reverses good and poor bed quality, treats a bare floor as good, and treats every sleeping place with a pillow as poor.
        AsceticSleepEffect = true,
        -- When enabled, television cannot reduce boredom or unhappiness for Ascetic characters.
        AsceticTelevisionEffect = true,
        -- Percentage of the full unhappiness scale removed each minute. Since unhappiness ranges from 0 to 100, 0.25% removes 0.25 points per minute. Min: 0.00 Max: 100.00 Default: 0.25
        AsceticUnhappinessReductionPerMinute = 0.25,
        -- Head pain added when an entire portion is eaten. Smaller portions scale this amount proportionally. Min: 0.00 Max: 100.00 Default: 20.00
        BadTeethMaxPain = 20.0,
        -- Chance that completing an eating action causes head pain. Min: 0 Max: 100 Default: 20
        BadTeethPainChance = 20,
        -- Percentage of the full boredom scale removed each minute. Since boredom ranges from 0 to 100, 1% removes 1 point per minute. Min: 0.00 Max: 100.00 Default: 0.35
        BlissfulBoredomReductionPerMinute = 0.35,
        -- Percentage of the full unhappiness scale removed each minute. Since unhappiness ranges from 0 to 100, 1% removes 1 point per minute. Min: 0.00 Max: 100.00 Default: 0.70
        BlissfulUnhappinessReductionPerMinute = 0.7,
        -- Multiplies the effect of bloodlust by this value. By default, unhappiness, stress, and panic are each reduced by 4% for each kill. This multiplier is applied to those 4%. So setting this to 0.5 would make those stats reduced by 2% instead Min: 0.00 Max: 100.00 Default: 1.00
        BloodlustMultiplier = 1.0,
        -- Per-tick chance to stagger the closest standing zombie while at least three zombies are within the configured distance. Min: 0 Max: 100 Default: 5
        BouncerChance = 5,
        -- Ticks before Bouncer can trigger again. The game normally runs at 60 ticks per second. Min: 0 Max: 240 Default: 60
        BouncerCooldown = 60,
        -- Maximum distance at which a zombie counts as surrounding the player and can be staggered. Min: 0.25 Max: 3.00 Default: 1.75
        BouncerDistance = 1.75,
        -- Multiplies the duration of newly detected fractures on any body part. This stacks with applicable Injured and Broken Leg multipliers. Min: 1.00 Max: 10.00 Default: 2.00
        BrittleBonesFractureTimeMultiplier = 2.0,
        -- Multiplies fracture duration when the body part originally broken by Broken Leg is fractured again. Min: 1.00 Max: 10.00 Default: 2.00
        BrokenLegFractureTimeMultiplier = 2.0,
        -- Multiplies the duration of future burns on body parts originally burned by Burn Ward Patient. Set to 1 to disable the extra duration. If the character also has Injured, both burn multipliers apply. Min: 1.00 Max: 10.00 Default: 2.00
        BurnWardPatientBurnTimeMultiplier = 2.0,
        -- A larger value makes the once-per-tick roll less likely to drop held items. Carried weight, running, sprinting, All Thumbs, and Dextrous modify the chance. Min: 1 Max: 100000 Default: 2000
        ButterfingersChanceOneIn = 2000,
        -- Chance per successfully transferred item for Butterfingers to drop it on the nearby ground instead. This is independent of the once-per-minute chance to drop held items. Min: 0 Max: 100 Default: 5
        ButterfingersTransferDropChance = 5,
        -- Chance each in-game hour to begin a depressive episode while one is not already active. Min: 0 Max: 100 Default: 2
        DepressiveEpisodeChance = 2,
        -- Percentage of the full unhappiness scale removed each in-game minute while an episode remains active. Min: 0.00 Max: 100.00 Default: 0.01
        DepressiveRecoveryPerMinute = 0.01,
        -- Percentage of the full unhappiness scale added when a depressive episode begins. Since unhappiness ranges from 0 to 100, 1% adds 1 point. Min: 0.00 Max: 100.00 Default: 25.00
        DepressiveUnhappinessIncrease = 25.0,
        -- Percentage of maximum carry capacity that must be exceeded before Deprived begins increasing unhappiness. Min: 0 Max: 100 Default: 75
        DeprivedCapacityThresholdPercent = 75,
        -- Unhappiness gained each minute while a Deprived character exceeds the configured carry-capacity threshold. Min: 0.00 Max: 10.00 Default: 0.10
        DeprivedUnhappinessPerMinute = 0.1,
        -- Multiplies stress and discomfort changes from Heavy Dresser and Light Dresser. 1 keeps the default effects; 0 disables them. Min: 0.00 Max: 10.00 Default: 1.00
        DresserTraitsEffectMultiplier = 1.0,
        -- Minimum number of worn clothing items in the neutral range where Heavy Dresser and Light Dresser have no effect. Below this value, each missing item strengthens the effect. Min: 0 Max: 50 Default: 4
        DresserTraitsNeutralClothingCountLowerBound = 4,
        -- Maximum number of worn clothing items in the neutral range where Heavy Dresser and Light Dresser have no effect. Above this value, each additional item strengthens the effect. Min: 0 Max: 50 Default: 6
        DresserTraitsNeutralClothingCountUpperBound = 6,
        -- Percentage by which the Fast Eater trait reduces the time needed to eat food. Does not affect drinking or smoking. Set to 0 to disable the speed bonus. Min: 0 Max: 90 Default: 25
        FastEaterSpeed = 25,
        -- Multiplies panic and unhappiness changes from Pyrophobia and Pyromania near fire. 1 keeps the default effects; 0 disables them. Min: 0.00 Max: 10.00 Default: 1.00
        FireTraitsEffectMultiplier = 1.0,
        -- Scales Gordonite's crowbar damage, swing-speed, and critical-chance bonuses. At 100%, each Long Blunt or Strength level adds 0.025 damage and 0.5 critical chance, reduces swing times by 0.025, and adds 0.025 base speed Min: 0 Max: 1000 Default: 100
        GordoniteEffectiveness = 100,
        -- Multiplier applied to the time food attributed to a Gourmand takes to become burnt in a heated container. Min: 0.10 Max: 10.00 Default: 2.00
        GourmandBurnTimeMultiplier = 2.0,
        -- Multiplier applied to hunger and beneficial boredom, unhappiness, and thirst changes on non-rotten food cooked or prepared by a Gourmand. Harmful boredom and unhappiness are removed, and harmful thirst is reduced. Min: 1.00 Max: 10.00 Default: 1.50
        GourmandCookedFoodBenefitMultiplier = 1.5,
        -- Multiplier applied to the time food attributed to a Gourmand takes to become cooked in a heated container. Min: 0.10 Max: 10.00 Default: 0.50
        GourmandCookingTimeMultiplier = 0.5,
        -- Multiplier applied to exercise-fatigue buildup. The default value of 2 doubles the stiffness queued by each exercise repeat. Min: 1 Max: 10 Default: 2
        GymHaterExerciseFatigueMultiplier = 2,
        -- Multiplier applied to Fitness and Strength XP gained while actively exercising. Min: 0.10 Max: 1.00 Default: 0.50
        GymHaterExerciseXPMultiplier = 0.5,
        -- Percentage of exercise-fatigue buildup prevented. At the default 50%, further stiffness buildup is suppressed after half of the queued fatigue has been applied. Existing stiffness continues fading normally. Min: 0 Max: 100 Default: 50
        GymRatExerciseFatigueReductionPercent = 50,
        -- Multiplier applied to Fitness and Strength XP gained while actively exercising. Min: 1.00 Max: 10.00 Default: 2.00
        GymRatExerciseXPMultiplier = 2.0,
        -- Size of Hardy's hidden endurance reserve relative to the normal endurance bar. Min: 0 Max: 100 Default: 25
        HardyExtraEndurancePercent = 25,
        -- Amount of endurance moved between the normal bar and Hardy's hidden reserve each minute. Min: 0.00 Max: 1.00 Default: 0.05
        HardyTransferPerMinute = 0.05,
        -- Min: 0.00 Max: 100.00 Default: 0.50
        HoarderWeight = 0.5,
        -- Determines how much Homichlophile affects the player. The formula for stress and panic decrease every minute you're in fog is: 4% * fogIntensity * Homichlophile Multiplier. Fog intensity ranges from 0 to 1, so the full 4% decrease is rare Min: 0.00 Max: 100.00 Default: 1.00
        HomichlophileMultiplier = 1.0,
        -- Determines how much Homichlophobia affects the player. The formula for stress and panic increase every minute you're in fog is: 4% * fogIntensity * Homichlophobia Multiplier. Fog intensity ranges from 0 to 1, so the full 4% increase is rare Min: 0.00 Max: 100.00 Default: 1.00
        HomichlophobiaMultiplier = 1.0,
        -- Below this weight, positive calorie gains use the underweight multiplier. Min: 35.00 Max: 200.00 Default: 78.00
        IdealWeightLowerThreshold = 78.0,
        -- Multiplier applied to positive calorie gains at or above the upper threshold. Min: 0.00 Max: 10.00 Default: 0.75
        IdealWeightOverMultiplier = 0.75,
        -- Multiplier applied to positive calorie gains at or below the lower threshold. Min: 0.00 Max: 10.00 Default: 1.25
        IdealWeightUnderMultiplier = 1.25,
        -- Above this weight, positive calorie gains use the overweight multiplier. Min: 35.00 Max: 200.00 Default: 82.00
        IdealWeightUpperThreshold = 82.0,
        -- Chance for each newly received zombie injury to force Knox infection. This applies even when zombie infection transmission is disabled in the sandbox. Min: 0 Max: 100 Default: 25
        ImmunocompromisedKnoxInfectionChance = 25,
        -- Infection severity added each minute to every infected wound that is not currently disinfected. Min: 0.00 Max: 10.00 Default: 0.05
        ImmunocompromisedWoundInfectionIncreasePerMinute = 0.05,
        -- In-game days required between activations. This only matters when more than one use is available. Min: 1 Max: 10000 Default: 14
        IndefatigableCooldownDays = 14,
        -- When enabled, low-health activation requires a living zombie within 5 tiles, preventing unrelated damage such as bleeding from consuming a use. Four zombies crowding within 1.5 tiles always activates the trait.
        IndefatigableRequiresNearbyZombie = true,
        -- Indefatigable activates when the character's health falls to or below this percentage. Min: 15 Max: 40 Default: 20
        IndefatigableTriggerHealthPercent = 20,
        -- Maximum number of activations during the character's lifetime. Set to 0 for unlimited uses. Min: 0 Max: 10000 Default: 0
        IndefatigableUses = 0,
        -- Allow characters with the Injured trait to receive burns among their random starting injuries.
        -- Burns can be extremely debilitating, especially on the legs.
        InjuredBurns = true,
        -- Multiplies the duration of every future wound on body parts originally affected by Injured. For scratches and lacerations, the duration is applied to their more severe replacement wound. Min: 1.00 Max: 10.00 Default: 2.00
        InjuredWoundTimeMultiplier = 2.0,
        -- Flat stomp power added after applying the multiplier. Min: 0.00 Max: 100.00 Default: 1.00
        LeadFootStompPowerBonus = 1.0,
        -- Multiplier applied to the stomp power of worn footwear. Min: 0.00 Max: 100.00 Default: 2.00
        LeadFootStompPowerMultiplier = 2.0,
        -- Multiplier applied to newly detected health loss. This is the final total multiplier: 2 doubles the original health loss. Min: 1.00 Max: 10.00 Default: 2.00
        MadeOfGlassDamageMultiplier = 2.0,
        -- Original health loss that must be exceeded for a successful injury roll to cause a fracture instead of a scratch. Min: 0.00 Max: 100.00 Default: 0.33
        MadeOfGlassFractureMinimumHealthLoss = 0.33,
        -- Chance for newly detected health loss to scratch or fracture a random body part when it exceeds the corresponding threshold. Min: 0 Max: 100 Default: 33
        MadeOfGlassInjuryChance = 33,
        -- Maximum starting severity assigned to a new fracture. This is an internal healing counter, not a number of hours. A value of 29 takes roughly 67 in-game days to heal untreated; splints and comfrey dramatically accelerate recovery. Values below the configured minimum are raised to the minimum. Min: 0 Max: 1000 Default: 29
        MadeOfGlassMaximumFractureTime = 29,
        -- Minimum starting severity assigned to a new fracture. This is an internal healing counter, not a number of hours. Values up to 20 are minor, above 20 are moderate, and above 50 are severe. A value of 10 takes roughly 23 in-game days to heal untreated; splints and comfrey dramatically accelerate recovery. Min: 0 Max: 1000 Default: 10
        MadeOfGlassMinimumFractureTime = 10,
        -- Original health loss that must be exceeded for a successful injury roll to cause a scratch. Min: 0.00 Max: 100.00 Default: 0.10
        MadeOfGlassScratchMinimumHealthLoss = 0.1,
        -- Maximum percentage of each full mental-stat scale restored by one eating action. Min: 0.00 Max: 100.00 Default: 5.00
        NaturalEaterMaximumMentalRecoveryPercent = 5.0,
        -- Mental recovery provided by a qualifying uncooked natural food as a percentage of the hunger restored by the eaten portion. Min: 0.00 Max: 1000.00 Default: 50.00
        NaturalEaterMentalRecoveryPercentOfHunger = 50.0,
        -- Base per-tick chance to trip while running. Sprinting increases the risk; Nimble, Sprinting skill, Graceful, and Clumsy modify it. Min: 1 Max: 1000000 Default: 5000
        NoodleLegsTripChanceOneIn = 5000,
        -- Amount of maximum carrying capacity removed per point of Strength. Min: 0.00 Max: 100.00 Default: 0.50
        PackMouseWeight = 0.5,
        -- Percentage multiplier added to the character's maximum carrying capacity through Unified Carry Weight Framework. Min: 0.00 Max: 1000.00 Default: 50.00
        PackMuleMaxCapacityPercent = 50.0,
        -- Sets the maximum pain level your character can reach while benefiting from this perk Min: 0.00 Max: 100.00 Default: 60.00
        PainToleranceThreshold = 60.0,
        -- Base chance each minute for a moving character with Paranoia to suffer a false scare. Min: 0.00 Max: 100.00 Default: 1.00
        ParanoiaBaseChancePercent = 1.0,
        -- Minimum number of in-game minutes between Paranoia attacks. New characters begin with a 10-minute delay. Min: 0 Max: 1440 Default: 30
        ParanoiaCooldownMinutes = 30,
        -- Percentage of the full panic scale added by a Paranoia attack. Min: 0.00 Max: 100.00 Default: 35.00
        ParanoiaPanicIncrease = 35.0,
        -- Additional attack chance at maximum stress, scaled proportionally by current stress. Min: 0.00 Max: 100.00 Default: 2.00
        ParanoiaStressChanceBonusPercent = 2.0,
        -- Percentage of the full stress scale added by a Paranoia attack. Min: 0.00 Max: 100.00 Default: 10.00
        ParanoiaStressIncreasePercent = 10.0,
        -- Chance that the character screams when a Paranoia attack triggers, attracting zombies within 50 tiles. Set to 0 to disable. Min: 0 Max: 100 Default: 25
        ParanoiaYellChancePercent = 25,
        -- Time in minutes that players have to wait since last petting action that gave mood boost for new boost to be applied. Petting animals in this time window will not give mood boost but it will also not reset the timer, so you don't have to manually keep track when can you pet again. Min: 1 Max: 60000 Default: 5
        PetTherapyMinutesBetweenPets = 5,
        -- Multiplier to Pet Therapy mood boost. By default, petting decreases Panic, Stress, Boredom and Unhappiness by 1%. Setting this to, for example, 4 would make it so decrease is 1% * 4 = 4% Min: 0.00 Max: 100.00 Default: 5.00
        PetTherapyMoodBoostMultiplier = 5.0,
        -- Multiplies the effects of Unhappiness, Stress, and Boredom decreases Min: 0.00 Max: 100.00 Default: 1.00
        PluviophileMultiplier = 1.0,
        -- Multiplies the effects of Unhappiness, Stress, and Boredom increases Min: 0.00 Max: 100.00 Default: 1.00
        PluviophobiaMultiplier = 1.0,
        -- Chance for a matching Prowess weapon to recover one condition point after an attack lowers its condition. Min: 0 Max: 100 Default: 33
        ProwessConditionRestoreChance = 33,
        -- Critical chance added to a matching equipped melee weapon before adding the relevant weapon skill levels. Min: 0.00 Max: 100.00 Default: 5.00
        ProwessMeleeBaseCriticalChance = 5.0,
        -- Percentage added to the minimum and maximum damage of a matching equipped Prowess: Blade, Blunt, or Spear weapon. Min: 0.00 Max: 1000.00 Default: 20.00
        ProwessMeleeDamageBonusPercent = 20.0,
        -- Multiplier applied to natural endurance recovery while sitting on the ground or furniture. Min: 1.00 Max: 10.00 Default: 2.00
        QuickRestRecoveryMultiplier = 2.0,
        -- % chance to not increase the number of times an item was repaired after a repair Min: 1 Max: 100 Default: 75
        RestorationExpertChance = 75,
        -- Health removed from every body part each minute while overall health remains above the unhappiness-scaled floor. Min: 0.00 Max: 10.00 Default: 0.15
        SelfDestructiveDamagePerMinute = 0.15,
        -- Percentage points added to Depressive's hourly episode chance when the character also has Self-Destructive. Min: 0 Max: 100 Default: 1
        SelfDestructiveDepressiveEpisodeChanceBonus = 1,
        -- Maximum portion of overall health that unhappiness can suppress when the character also has Depressive. The loss scales proportionally with current unhappiness. Min: 0.00 Max: 100.00 Default: 50.00
        SelfDestructiveMaxHealthLossWithDepressive = 50.0,
        -- Maximum portion of overall health that unhappiness can suppress. The loss scales proportionally with current unhappiness. Min: 0.00 Max: 100.00 Default: 33.33
        SelfDestructiveMaximumHealthLossPercent = 33.33,
        -- Minimum unhappiness required before Self-Destructive begins reducing health toward its unhappiness-scaled floor. Min: 0 Max: 100 Default: 25
        SelfDestructiveUnhappinessThreshold = 25,
        -- Percentage by which the Slow Eater trait increases the time needed to eat food. Does not affect drinking or smoking. Set to 0 to disable the slowdown. Min: 0 Max: 90 Default: 25
        SlowEaterSpeed = 25,
        -- Multiplies the duration of newly detected fractures on any body part. Lower values shorten recovery; this stacks with applicable Injured and Broken Leg multipliers. Min: 0.00 Max: 1.00 Default: 0.50
        StrongBonesFractureTimeMultiplier = 0.5,
        -- Sun exposure accumulated each minute outdoors, scaled by the current daylight strength. Min: 0.00 Max: 100.00 Default: 1.00
        SunSensitivityExposurePerMinute = 1.0,
        -- Maximum head-pain exposure accumulated from standing outdoors in daytime sunlight. Min: 0.00 Max: 100.00 Default: 50.00
        SunSensitivityMaximumPain = 50.0,
        -- Exposure removed each minute indoors. Outdoor recovery outside daylight hours is half this value. Min: 0.00 Max: 100.00 Default: 2.00
        SunSensitivityRecoveryPerMinute = 2.0,
        -- Multiplier applied to exposure gain and active sunlight pain while a protective umbrella is equipped. Min: 0.00 Max: 1.00 Default: 0.50
        SunSensitivityUmbrellaMultiplier = 0.5,
        -- Base percentage by which qualifying improvised melee weapons become less likely to lose condition. Especially fragile weapons receive an additional half of this value for each fragility condition, capped at 95%. Spears receive no durability benefit. Min: 0.00 Max: 95.00 Default: 50.00
        TavernBrawlerConditionLossReductionPercent = 50.0,
        -- Base percentage added to the minimum and maximum damage of qualifying improvised melee weapons. Especially fragile weapons receive an additional half of this value for each fragility condition; spears receive one quarter of the resulting bonus. Min: 0.00 Max: 1000.00 Default: 10.00
        TavernBrawlerDamageBonusPercent = 10.0,
        -- Multiplies stress and discomfort changes from Heat-Loving, Heat-Averse, Cold-Loving, and Cold-Averse. 1 keeps the default effects; 0 disables them. Min: 0.00 Max: 10.00 Default: 1.00
        TemperatureTraitsEffectMultiplier = 1.0,
        -- Below this core body temperature, Cold-Loving and Cold-Averse alter stress and discomfort once per minute. Min: -40.00 Max: 36.50 Default: 36.00
        ColdTraitsTemperatureThreshold = 36.0,
        -- Above this core body temperature, Heat-Loving and Heat-Averse alter stress and discomfort once per minute. Min: 37.50 Max: 40.00 Default: 37.50
        HeatTraitsTemperatureThreshold = 37.5,
        -- Multiplier applied to an equipped firearm's aiming-time stat. Higher values make aiming faster. Min: 0.01 Max: 1.00 Default: 0.50
        TerminatorAimingTimeMultiplier = 0.5,
        -- Percentage bonus applied to the minimum and maximum damage of equipped firearms. Min: 0 Max: 200 Default: 25
        TerminatorDamageBonusPercent = 25,
        -- Multiplier applied to an equipped firearm's chance to jam. The default 0.5 halves it. Min: 0.00 Max: 1.00 Default: 0.50
        TerminatorJamChanceMultiplier = 0.5,
        -- Amount added to an equipped firearm's maximum range. Min: 0.00 Max: 100.00 Default: 5.00
        TerminatorMaxRangeBonus = 5.0,
        -- Percentage of the full panic scale removed each minute while aiming a firearm. Min: 0.00 Max: 100.00 Default: 10.00
        TerminatorPanicReductionPerMinute = 10.0,
        -- Percentage of the full stress scale removed each minute while aiming a firearm. Min: 0.00 Max: 100.00 Default: 1.00
        TerminatorStressReductionPercentPerMinute = 1.0,
        -- Health restored to each actively bleeding, unstemmed body part every minute. Head and neck wounds receive twice this amount. Min: 0.00 Max: 10.00 Default: 0.15
        ThickBloodedBleedingHealthPerMinute = 0.15,
        -- Percentage of the full boredom scale added each in-game minute after the television grace period expires. Min: 0.00 Max: 100.00 Default: 0.10
        TVJunkieBoredomPerMinute = 0.1,
        -- Active in-game hours allowed since the last qualifying television watch before boredom and unhappiness begin increasing. Time while the character is offline does not count. Min: 1 Max: 168 Default: 24
        TVJunkieHoursWithoutTelevision = 24,
        -- Valid television interaction commands that must be received within the configured rolling active-time window for the character to count as having watched television. Min: 1 Max: 100 Default: 3
        TVJunkieRequiredCommands = 3,
        -- Percentage of the full unhappiness scale added each in-game minute after the television grace period expires. Min: 0.00 Max: 100.00 Default: 0.10
        TVJunkieUnhappinessPerMinute = 0.1,
        -- Total weapon-damage multiplier at the most severe endurance, fatigue, or pain tier. Intermediate tiers apply 25% or 50% of the configured bonus. Set to 1 to disable the damage benefit. Min: 1.00 Max: 10.00 Default: 2.00
        UnwaveringMaximumDamageMultiplier = 2.0,
        -- Percentage of worn clothing's running- and combat-speed penalties removed. Bonuses are unaffected. Min: 0 Max: 100 Default: 75
        WellFittedSpeedPenaltyReduction = 75,
        -- Percentage by which worn clothing's actual weight is reduced. Min: 0 Max: 100 Default: 50
        WellFittedWeightReduction = 50,
        -- Allows losing Anti-Gun Activist after meeting the combined Aiming and Reloading level requirement and the firearm kill requirement.
        AntiGunActivist = true,
        -- Number of firearm kills required to lose Anti-Gun Activist. The combined Aiming and Reloading level requirement must also be met. Min: 0 Max: 10000000 Default: 300
        AntiGunActivistKills = 300,
        -- Required sum of Aiming and Reloading levels to lose Anti-Gun Activist. The firearm kill requirement must also be met. Min: 0 Max: 20 Default: 8
        AntiGunActivistSkill = 8,
        Artisan = true,
        -- Min: 0 Max: 20 Default: 8
        ArtisanSkill = 8,
        Asthmatic = true,
        -- Running or sprinting at or below this air temperature in degrees Celsius causes progress toward developing Asthmatic. Smokers can still make this progress above the threshold. Min: -100.00 Max: 100.00 Default: 10.00
        AsthmaticColdTemperatureThreshold = 10.0,
        -- The counter threshold for gaining or losing Asthmatic. Running or sprinting at or below the configured cold temperature decreases the counter; colder air, being outdoors, sprinting, Smoker, and Asthmatic modify the decrease. Smoker also permits a decrease above the cold threshold. While neither running nor sprinting at or above the configured recovery temperature, the counter increases based on Fitness and current endurance. Smoker and Asthmatic each halve that increase. Min: 0 Max: 10000000 Default: 20000
        AsthmaticCounter = 20000,
        -- Multiplies counter progress toward overcoming and losing the Asthmatic trait. Set to 0 to disable this progress. Min: 0.00 Max: 100.00 Default: 1.00
        AsthmaticProgressGainMultiplier = 1.0,
        -- Multiplies counter progress toward developing and gaining the Asthmatic trait. Set to 0 to disable this progress. Min: 0.00 Max: 100.00 Default: 1.00
        AsthmaticProgressLossMultiplier = 1.0,
        -- Counter progress toward overcoming Asthmatic is possible while neither running nor sprinting at or above this air temperature in degrees Celsius. Min: -100.00 Max: 100.00 Default: 0.00
        AsthmaticRecoveryTemperatureThreshold = 0.0,
        AVClub = true,
        -- Min: 0 Max: 10 Default: 4
        AVClubSkill = 4,
        Axeman = true,
        -- The number of trees you have to cut down to get the Ax-pert trait Min: 0 Max: 10000000 Default: 250
        AxemanTrees = 250,
        AxeThrower = true,
        -- Min: 0 Max: 10000000 Default: 200
        AxeThrowerKills = 200,
        -- Min: 0 Max: 10 Default: 4
        AxeThrowerSkill = 4,
        BaseballPlayer = true,
        -- Min: 0 Max: 10000000 Default: 200
        BaseballPlayerKills = 200,
        -- Min: 0 Max: 10 Default: 4
        BaseballPlayerSkill = 4,
        Blacksmith = true,
        -- Blacksmith + Maintenance Min: 0 Max: 20 Default: 12
        BlacksmithSkill = 12,
        BladeEnthusiast = true,
        -- Min: 0 Max: 10000000 Default: 250
        BladeEnthusiastKills = 250,
        -- Min: 0 Max: 10 Default: 5
        BladeEnthusiastSkill = 5,
        -- Nearby zombie kills directly add Bloodlust progress. Closer kills and bloodier clothing grant more progress. Kills during the rolling past hour ramp the multiplier from 0.1x on the first kill to 1x on the tenth, then add another 1x every 20 kills. Progress passively decays each hour
        Bloodlust = true,
        -- Multiplies hourly Bloodlust progress decay. Set to 0 to disable passive decay Min: 0.00 Max: 100.00 Default: 1.00
        BloodlustDecayMultiplier = 1.0,
        -- Multiplies how much Bloodlust progress killing or butchering an animal grants compared to a point-blank zombie kill. Set to 0 to disable it Min: 0.00 Max: 10.00 Default: 1.00
        BloodlustFromAnimalsMultiplier = 1.0,
        -- Multiplies Bloodlust progress gained from kills and animal actions. Set to 0 to disable progress gain Min: 0.00 Max: 100.00 Default: 1.25
        BloodlustGainMultiplier = 1.25,
        -- Sets the maximum positive and negative Bloodlust progress. The trait is gained at 50% of this value and lost at negative 50% Min: 1 Max: 10000000 Default: 1000
        BloodlustProgress = 1000,
        BodyworkEnthusiast = true,
        -- The percentage of car condition you have to repair to qualify for the perk. Works on every part of a car and is saved between all cars Min: 0 Max: 10000000 Default: 6000
        BodyworkEnthusiastRepairs = 6000,
        -- Metalworking + Mechanics Min: 0 Max: 20 Default: 12
        BodyworkEnthusiastSkill = 12,
        Brawler = true,
        -- Axe + Long Blunt Min: 0 Max: 10000000 Default: 600
        BrawlerKills = 600,
        -- Axe + Long Blunt Min: 0 Max: 20 Default: 12
        BrawlerSkill = 12,
        -- Allows losing Broken Leg dynamically after repeat fractures to the body part broken at character creation.
        BrokenLeg = true,
        -- Chance to lose Broken Leg whenever a body part fractured by Broken Leg at character creation is fractured again. Each qualifying fracture is rolled separately. Min: 1 Max: 100000 Default: 20
        BrokenLegChanceOneIn = 20,
        Burglar = true,
        -- Mechanics + Electrical + Nimble. Please note that you need to have at least 2 levels in both Mechanics and Electrical Min: 4 Max: 30 Default: 7
        BurglarSkill = 7,
        -- Allows losing Burn Ward Patient dynamically after repeat burns to body parts burned at character creation.
        BurnWardPatient = true,
        -- Chance to lose Burn Ward Patient whenever a body part burned by Burn Ward Patient at character creation is burned again. Each qualifying burn is rolled separately. Min: 1 Max: 100000 Default: 30
        BurnWardPatientChanceOneIn = 30,
        WildernessKnowledge = true,
        -- Foraging + Knapping + Maintenance + Carving. Additional requirement is to have at least 2 levels in each skill. Min: 8 Max: 40 Default: 24
        WildernessKnowledgeSkill = 24,
        CatEyes = true,
        -- This allows you to gain points by seeing and observing squares within a certain radius of your character. The number of points you earn is influenced by factors such as the time of day, the darkness of the square, and whether you and the square are inside or outside. The more squares you see and the darker they are, the more points you will earn. Having Eagle Eyed doubles the gain. Making a kill at night triggers extra execution of function responsible for gaining progress (so instead of getting progress 1 time / minute you can get progress 3 times per minute, for example) Min: 0 Max: 10000000 Default: 250000
        CatEyesCounter = 250000,
        Clumsy = true,
        -- Sneak + Lightfooted Min: 0 Max: 20 Default: 12
        ClumsySkill = 12,
        Conspicuous = true,
        -- Min: 0 Max: 10 Default: 4
        ConspicuousSkill = 4,
        Cook = true,
        -- Min: 0 Max: 20 Default: 8
        CookSkill = 8,
        Crafty = true,
        -- Min: 0 Max: 120 Default: 48
        CraftySkill = 48,
        EagleEyed = true,
        -- At what distance must a zombie be to count this as a kill to Eagle-Eyed kill counter. For vanilla would recommend leaving at 20, for mods that add good firearms (Gunfighter + Brita for example), would recommend setting to 25 or so Min: 0 Max: 50 Default: 20
        EagleEyedDistance = 20,
        -- Min: 0 Max: 10000000 Default: 200
        EagleEyedKills = 200,
        FirstAid = true,
        -- Min: 0 Max: 10 Default: 4
        FirstAidSkill = 4,
        Fishing = true,
        -- Min: 0 Max: 10 Default: 4
        FishingSkill = 4,
        FurnitureAssembler = true,
        -- Min: 0 Max: 10 Default: 4
        FurnitureAssemblerSkill = 4,
        Gardener = true,
        -- Min: 0 Max: 10 Default: 4
        GardenerSkill = 4,
        -- Allows gaining Gordonite after enough kills with weapons carrying the crowbar item tag.
        Gordonite = true,
        -- Number of kills with tagged crowbar weapons required to gain Gordonite. Min: 0 Max: 10000000 Default: 800
        GordoniteKills = 800,
        Graceful = true,
        -- Nimble + Sneaking + Lightfooted Min: 0 Max: 30 Default: 9
        GracefulSkill = 9,
        GunEnthusiast = true,
        -- Min: 0 Max: 10000000 Default: 600
        GunEnthusiastKills = 600,
        -- Aiming + Reloading Min: 0 Max: 20 Default: 12
        GunEnthusiastSkill = 12,
        Gymnast = true,
        -- Lightfooted + Nimble Min: 0 Max: 20 Default: 15
        GymnastSkill = 15,
        Handy = true,
        -- Carpentry + Carving + Maintenance + Masonry Min: 0 Max: 40 Default: 24
        HandySkill = 24,
        Herbalist = true,
        -- Specifies how many herbs you need to pick up through foraging to gain the permanent Herbalist trait Min: 0 Max: 10000000 Default: 250
        HerbalistHerbsPicked = 250,
        -- Determines the percentage of the maximum Herbalist counter added the first time a character reads The Herbalist journal. This bonus can only be received once. For example, if the maximum counter is 1000 and this is set to 50%, reading the journal adds 500 points Min: 0 Max: 200 Default: 50
        HerbalistJournalCounterIncrease = 50,
        Hiker = true,
        -- Foraging + Trapping Min: 0 Max: 20 Default: 10
        HikerSkill = 10,
        HomeCook = true,
        -- Min: 0 Max: 10 Default: 4
        HomeCookSkill = 4,
        Hunter = true,
        -- Firearm + Small Blade Min: 0 Max: 10000000 Default: 200
        HunterKills = 200,
        -- Sneaking + Aiming + Small Blade + Tracking + Butchering. Additional requirement is to have at least 2 levels in each skill. Min: 10 Max: 50 Default: 28
        HunterSkill = 28,
        Inconspicuous = true,
        -- Min: 0 Max: 10 Default: 7
        InconspicuousSkill = 7,
        -- Allows losing Injured dynamically after repeat injuries to body parts injured at character creation.
        Injured = true,
        -- Chance to lose Injured whenever any new injury is detected on a body part injured at character creation. Min: 1 Max: 100000 Default: 40
        InjuredChanceOneIn = 40,
        KnifeFighter = true,
        -- Min: 0 Max: 10000000 Default: 200
        KnifeFighterKills = 200,
        -- Min: 0 Max: 10 Default: 4
        KnifeFighterSkill = 4,
        LightStep = true,
        -- Min: 0 Max: 10 Default: 4
        LightStepSkill = 4,
        LowProfile = true,
        -- Min: 0 Max: 10 Default: 4
        LowProfileSkill = 4,
        Mason = true,
        -- Min: 0 Max: 10 Default: 4
        MasonSkill = 4,
        Mechanics = true,
        -- The percentage of car condition you have to repair to qualify for the perk. Works on every part of a car and is saved between all cars Min: 0 Max: 10000000 Default: 1000
        MechanicsRepairs = 1000,
        -- Min: 0 Max: 10 Default: 4
        MechanicsSkill = 4,
        NaturalEater = true,
        -- Number of qualifying uncooked, unpackaged foods that must be eaten to gain Natural Eater. Min: 1 Max: 100000 Default: 3000
        NaturalEaterFoodsEaten = 3000,
        -- Allows losing Noodle Legs after traveling the required distance on foot and reaching the required combined Nimble, Sprinting, and Lightfooted levels.
        NoodleLegs = true,
        -- Distance that must be traveled on foot to lose Noodle Legs. Vehicle travel and implausibly large one-minute movements are ignored. Min: 0 Max: 10000000 Default: 30000
        NoodleLegsDistance = 30000,
        -- Required total Nimble, Sprinting, and Lightfooted levels to lose Noodle Legs. Min: 0 Max: 30 Default: 24
        NoodleLegsSkill = 24,
        -- Allows gaining Olympian through time spent running or sprinting.
        Olympian = true,
        -- Progress required to gain Olympian. Once per in-game minute, running adds 1 to counter and sprinting adds 2 to counter. Min: 0 Max: 10000000 Default: 2880
        OlympianCounter = 2880,
        Outdoorsman = true,
        -- This allows you to earn/lose by spending time outdoors and being exposed to various weather conditions. The harsher the weather, the faster you'll accumulate points towards gaining the trait. Conversely, staying indoors gradually reduces progress. You gain the trait when the counter reaches its specified threshold, and lose it when dropping below the opposite threshold. Being inside will slowly start to decrease the counter, with maximum decrease being reached after being indoors/in-car for 900 min. Killing while outside will also progress the counter based on weather. Min: 0 Max: 10000000 Default: 500000
        OutdoorsmanCounter = 500000,
        -- Adjusts the rate at which you lose points from the outdoorsman counter. For example, multiplier of 0.25 means you'd be losing 25% of points. Min: 0.00 Max: 100.00 Default: 3.00
        OutdoorsmanCounterDecreaseMultiplier = 3.0,
        -- Adjusts the rate at which you gain points in outdoorsman counter. For example, multiplier of 2.5 means you'd be gaining 250% of points'. Min: 0.00 Max: 100.00 Default: 3.00
        OutdoorsmanCounterIncreaseMultiplier = 3.0,
        PainTolerance = true,
        -- Every 10 minutes your pain (0-100) is added to counter. Upon reaching counter you'll get Pain Tolerance trait Min: 0 Max: 10000000 Default: 30000
        PainToleranceCounter = 30000,
        -- Multiplies only the exercise-stiffness portion of pain added to the Pain Tolerance counter. Pain from wounds and other sources is unaffected. Min: 0.00 Max: 100.00 Default: 0.10
        PainToleranceExerciseMultiplier = 0.1,
        PetTherapy = true,
        -- Min: 0 Max: 10 Default: 4
        PetTherapySkill = 4,
        -- How many different animals you have to pet to qualify for gaining Pet Therapy Min: 0 Max: 1000000 Default: 50
        PetTherapyUniqueAnimalsPetted = 50,
        PolearmFighter = true,
        -- Min: 0 Max: 10000000 Default: 200
        PolearmFighterKills = 200,
        -- Min: 0 Max: 10 Default: 4
        PolearmFighterSkill = 4,
        -- Allows gaining Prowess: Blade after meeting both the combined Small Blade, Long Blade, and Axe skill and kill requirements.
        ProwessBlade = true,
        -- Base total kills with Small Blade, Long Blade, and Axe weapons to gain Prowess: Blade. Each other held or queued Prowess trait multiplies this target by the configured Prowess multiplier. The combined skill requirement must also be met. Min: 0 Max: 10000000 Default: 2400
        ProwessBladeKills = 2400,
        -- Required sum of Small Blade, Long Blade, and Axe levels to gain Prowess: Blade. The combined kill requirement must also be met. Min: 0 Max: 30 Default: 27
        ProwessBladeSkill = 27,
        -- Allows gaining Prowess: Blunt after meeting both the combined Short Blunt and Long Blunt skill and kill requirements.
        ProwessBlunt = true,
        -- Base total kills with Short Blunt and Long Blunt weapons to gain Prowess: Blunt. Each other held or queued Prowess trait multiplies this target by the configured Prowess multiplier. The combined skill requirement must also be met. Min: 0 Max: 10000000 Default: 1600
        ProwessBluntKills = 1600,
        -- Required sum of Short Blunt and Long Blunt levels to gain Prowess: Blunt. The combined kill requirement must also be met. Min: 0 Max: 20 Default: 18
        ProwessBluntSkill = 18,
        -- Allows gaining Prowess: Guns after meeting both the combined Aiming and Reloading level requirement and the firearm kill requirement. Cannot be gained while Anti-Gun Activist.
        ProwessGuns = true,
        -- Base firearm kills needed to gain Prowess: Guns. Each other held or queued Prowess trait multiplies this target by the configured Prowess multiplier. The combined skill requirement must also be met. Min: 0 Max: 10000000 Default: 1600
        ProwessGunsKills = 1600,
        -- Required sum of Aiming and Reloading levels to gain Prowess: Guns. The firearm kill requirement must also be met. Min: 0 Max: 20 Default: 18
        ProwessGunsSkill = 18,
        -- Allows gaining Prowess: Spear after meeting both the Spear skill and spear kill requirements.
        ProwessSpear = true,
        -- Base spear kills needed to gain Prowess: Spear. Each other held or queued Prowess trait multiplies this target by the configured Prowess multiplier. The skill requirement must also be met. Min: 0 Max: 10000000 Default: 800
        ProwessSpearKills = 800,
        -- Required Spear level to gain Prowess: Spear. The spear kill requirement must also be met. Min: 0 Max: 10 Default: 9
        ProwessSpearSkill = 9,
        -- Each other held or queued Prowess trait multiplies the next Prowess trait's base kill requirement by this value. Multipliers stack: at the default 1.2, the second, third, and fourth traits require 1.2x, 1.44x, and 1.728x base kills, rounded up. Set to 1 to disable scaling. Skill requirements do not change. Min: 1.00 Max: 10.00 Default: 1.20
        ProwessStackingKillScaling = 1.2,
        -- Allows gaining Quiet through combined Sneaking and Lightfooted levels. Cannot be gained while Clumsy.
        Quiet = true,
        -- Required sum of Sneaking and Lightfooted levels to gain Quiet. Cannot be gained while Clumsy. Min: 0 Max: 20 Default: 12
        QuietSkill = 12,
        RestorationExpert = true,
        -- Min: 0 Max: 10 Default: 9
        RestorationExpertSkill = 9,
        Runner = true,
        -- Min: 0 Max: 10 Default: 4
        RunnerSkill = 4,
        -- Allows gaining Scrapper through combined Welding, Maintenance, and Blacksmithing levels.
        Scrapper = true,
        -- Required sum of Welding, Maintenance, and Blacksmithing levels to gain Scrapper. Min: 0 Max: 30 Default: 18
        ScrapperSkill = 18,
        Sewer = true,
        -- Min: 0 Max: 10 Default: 4
        SewerSkill = 4,
        -- Amount of unique clothing you need to rip to qualify for Sewer. If you are running with modded clothes, increase this respectively. AuthenticZ or Brita Armor Pack all add A LOT of clothing to rip, as an example. Min: 0 Max: 1000000 Default: 50
        SewerUniqueClothesRipped = 50,
        Smoker = true,
        -- Upon reaching this value on the counter, you'll get the Smoker trait. When dropping to the opposite of it, you'll lose it. Counter boundaries are -2x the counter to 2x the counter.
        -- 
        --  How it works: Every smoke you take increases your addiction counter. The longer breaks you take between smokes, the less the increase. Smoking while being panicked or stressed increases the counter much faster, based on the level of panic and stress. Not smoking slowly decays the counter. Being panicked or stressed slows the decay rate Min: 0 Max: 10000000 Default: 500
        SmokerCounter = 500,
        -- Determines how fast your addiction decays Min: 0.00 Max: 1000.00 Default: 24.00
        SmokingAddictionDecay = 24.0,
        -- Determines how fast your addiction increases Min: 0.00 Max: 1000.00 Default: 1.00
        SmokingAddictionMultiplier = 1.0,
        StickFighter = true,
        -- Min: 0 Max: 10000000 Default: 200
        StickFighterKills = 200,
        -- Min: 0 Max: 10 Default: 4
        StickFighterSkill = 4,
        TargetShooter = true,
        -- Min: 0 Max: 10 Default: 4
        TargetShooterSkill = 4,
        -- Allows gaining Terminator after meeting both the combined Aiming, Reloading, and Nimble level requirement and the firearm kill requirement. Cannot be gained while Anti-Gun Activist.
        Terminator = true,
        -- Number of firearm kills required to gain Terminator. The combined skill requirement must also be met. Min: 0 Max: 10000000 Default: 1600
        TerminatorKills = 1600,
        -- Required sum of Aiming, Reloading, and Nimble levels to gain Terminator. The firearm kill requirement must also be met. Min: 0 Max: 30 Default: 27
        TerminatorSkill = 27,
        -- Allows gaining Thuggish after meeting both the combined Long Blunt and Short Blunt skill and kill requirements.
        Thuggish = true,
        -- Required total kills with Long Blunt and Short Blunt weapons to gain Thuggish. The combined skill requirement must also be met. Min: 0 Max: 10000000 Default: 600
        ThuggishKills = 600,
        -- Required sum of Long Blunt and Short Blunt levels to gain Thuggish. The combined kill requirement must also be met. Min: 0 Max: 20 Default: 12
        ThuggishSkill = 12,
        Tinkerer = true,
        -- Min: 0 Max: 10 Default: 4
        TinkererSkill = 4,
        Whittler = true,
        -- Min: 0 Max: 10 Default: 4
        WhittlerSkill = 4,
    },
    rSemiTruck = {
        -- Multiplies the spawn chance of all W900 military vehicles in every zone.
        -- 0.5 = default, 0.0 = never spawn, 2.0 = double chance. Min: 0.00 Max: 10.00 Default: 0.50
        MilSpawnMultiplier = 0.5,
        -- If enabled, the fixed-coordinate W900 military vehicle spawns are created. If disabled, only normal zone-based military spawning remains active.
        GuaranteedMilitarySpawns = true,
        -- Controls the amount of dynamically added weapons, ammo, and gun parts in W900 military vehicle loot.
        -- High = full amount (default), Medium = 50%, Low = 25%, None = no extra loot added. Default = High (Default)
        -- 1 = None
        -- 2 = Low (25%)
        -- 3 = Medium (50%)
        -- 4 = High (Default)
        MilitaryLootLevel = 4,
        -- If enabled, Car Trailers can spawn in both normal and fixed vehicle zones. If disabled, Car Trailers will not spawn.
        CarTrailerSpawns = true,
        -- If enabled, Container Trailers can spawn in both normal and fixed vehicle zones. If disabled, Container Trailers will not spawn.
        ContainerTrailerSpawns = true,
        -- If enabled, Containers can spawn in both normal and fixed vehicle zones. If disabled, Containers will not spawn.
        ContainerSpawns = true,
    },
    MSW = {
        -- Sets how many vehicles the MultiWrecker can carry at once.
        -- Lowering this setting only blocks new loads into higher slots; already loaded vehicles can still be unloaded. Default = 5 Vehicles
        -- 1 = 3 Vehicles
        -- 2 = 4 Vehicles
        -- 3 = 5 Vehicles
        Slots = 3,
    },
    RainCleansBlood = {
        -- How many random tiles to clean per in-game minute. Min: 1 Max: 60 Default: 10
        TilesPerMinute = 10,
        -- How heavy the rain or snow must be before blood starts washing away. Higher = needs heavier weather. Min: 0.05 Max: 0.95 Default: 0.25
        WeatherThreshold = 0.25,
        -- Also clean ash left behind by burned corpses.
        AlsoCleanAsh = true,
        -- Also clean blood inside buildings.
        AlsoCleanInside = false,
        -- Also gradually clean blood from vehicles.
        AlsoCleanVehicles = true,
        -- How much blood to remove from vehicles per minute. Min: 0.10 Max: 1.00 Default: 0.10
        VehicleCleanSpeed = 0.1,
        -- Also gradually clean blood and dirt from players' worn clothing.
        AlsoCleanClothes = true,
        -- How much blood and dirt to remove from clothing per minute. Min: 1.00 Max: 10.00 Default: 1.00
        ClothesCleanSpeed = 1.0,
        -- Always clean regardless of weather.
        AlwaysClean = false,
    },
    ModernFirearmsSystemSandboxGun = {
        _CycloneAK_cat_Spawn = true,
        _SW629_cat_Spawn = true,
        _lee_enfield_cat_Spawn = true,
        _M16D_cat_Spawn = true,
        _QBU203_cat_Spawn = true,
        _nagant_m1895_cat_Spawn = true,
        _Revolver_Short_Spawn = true,
        _DoubleBarrelShotgunSawnoff_Spawn = true,
        _MFS_MTL30_cat_Spawn = true,
        _MEGA_AR15_cat_Spawn = true,
        _AssaultRifle_Spawn = true,
        _AssaultRifle2_Spawn = true,
        _HuntingRifle_Spawn = true,
        _VarmintRifle_Spawn = true,
        _JS14_Rifle_Spawn = true,
        _JS3T_Shotgun_Spawn = true,
        _L92_Carbine_Spawn = true,
        _L94_Rifle_Spawn = true,
        _MSR7T_Rifle_Spawn = true,
        _TrapperCarbine_Spawn = true,
        _Pistol_Spawn = true,
        _Pistol2_Spawn = true,
        _Pistol3_Spawn = true,
        _Revolver_Spawn = true,
        _Revolver_Long_Spawn = true,
        _Shotgun_Spawn = true,
        _ShotgunSawnoff_Spawn = true,
        _DoubleBarrelShotgun_Spawn = true,
        _56S_cat_Spawn = true,
        _Taurus_cat_Spawn = true,
        _Anaconda_cat_Spawn = true,
        _AWM_cat_Spawn = true,
        _M200_cat_Spawn = true,
        _M500_cat_Spawn = true,
        _M1866_cat_Spawn = true,
        _ROSE_cat_Spawn = true,
        _Marlin1894_Spawn = true,
        _Christine45_cat_Spawn = true,
        _M1873_cat_Spawn = true,
        _SRM3_cat_Spawn = true,
        _UMP45_cat_Spawn = true,
        _usp45_cat_Spawn = true,
        _AX50_cat_Spawn = true,
        _Thoridal_Spawn = true,
        _GM6_cat_Spawn = true,
        _M82_cat_Spawn = true,
        _Requiem_cat_Spawn = true,
        _SnipeX_T_Rex_cat_Spawn = true,
        _XM109_cat_Spawn = true,
        _AEK971_cat_Spawn = true,
        _AK12_cat_Spawn = true,
        _AKS74U_cat_Spawn = true,
        _AN94_cat_Spawn = true,
        _HK416_cat_Spawn = true,
        _KS1_KAC_cat_Spawn = true,
        _M4A1S_cat_Spawn = true,
        _M4Mk18_cat_Spawn = true,
        _M7_cat_Spawn = true,
        _M91_cat_Spawn = true,
        _MCX_cat_Spawn = true,
        _MK12_cat_Spawn = true,
        _NoveskeN4_cat_Spawn = true,
        _SAI_GRY_cat_Spawn = true,
        _SG553_cat_Spawn = true,
        _QBU191_cat_Spawn = true,
        _QBZ191_cat_Spawn = true,
        _QBZ192_cat_Spawn = true,
        _QJY201_cat_Spawn = true,
        _QSZ_92G_Spawn = true,
        _98k_cat_Spawn = true,
        _AK103_cat_Spawn = true,
        _ar_10_cat_Spawn = true,
        _ARX200_cat_Spawn = true,
        _BAR_cat_Spawn = true,
        _Berthier_cat_Spawn = true,
        _C96_cat_Spawn = true,
        _FAL_cat_Spawn = true,
        _FN_Evolys_cat_Spawn = true,
        _Groza_cat_Spawn = true,
        _HK51_cat_Spawn = true,
        _LebelM1886_cat_Spawn = true,
        _lewis_cat_Spawn = true,
        _M1Garand_cat_Spawn = true,
        _M14_Albedo_Spawn = true,
        _M240_cat_Spawn = true,
        _m1903_cat_Spawn = true,
        _M1918_cat_Spawn = true,
        _M1919a6_cat_Spawn = true,
        _MG3_cat_Spawn = true,
        _mk47_cat_Spawn = true,
        _Mosin_Nagant_cat_Spawn = true,
        _PKM_cat_Spawn = true,
        _RPK16_cat_Spawn = true,
        _RSC_cat_Spawn = true,
        _ScarH_cat_Spawn = true,
        _SVD_cat_Spawn = true,
        _SVT40_cat_Spawn = true,
        _Type81_cat_Spawn = true,
        _URG_S_cat_Spawn = true,
        _HoneyBadger_cat_Spawn = true,
        _LWMMG_cat_Spawn = true,
        _mg338_cat_Spawn = true,
        _MK18_cat_Spawn = true,
        _REAPR_cat_Spawn = true,
        _AMB17_cat_Spawn = true,
        _AS_VAL_MOD4_cat_Spawn = true,
        _BerettaM93R_cat_Spawn = true,
        _EMP_cat_Spawn = true,
        _FN57_cat_Spawn = true,
        _G17_cat_Spawn = true,
        _G18_cat_Spawn = true,
        _G19_cat_Spawn = true,
        _G34_cat_Spawn = true,
        _KrissVector_cat_Spawn = true,
        _lugerP08_cat_Spawn = true,
        _M9A4_cat_Spawn = true,
        _minigun_cat_Spawn = true,
        _mp5_cat_Spawn = true,
        _MP7_cat_Spawn = true,
        _SIGP226_cat_Spawn = true,
        _Taran2011_cat_Spawn = true,
        _Thompson_cat_Spawn = true,
        _uzi_cat_Spawn = true,
        _VSSM_cat_Spawn = true,
        _interceptor_cat_Spawn = true,
        _AA12_cat_Spawn = true,
        _BRAuto5_cat_Spawn = true,
        _ChiappaTripleThreat_cat_Spawn = true,
        _DP12_cat_Spawn = true,
        _M870_cat_Spawn = true,
        _M1887_cat_Spawn = true,
        _origin12_cat_Spawn = true,
        _Saiga12_cat_Spawn = true,
        _Striker12_cat_Spawn = true,
        _TTI_Benelli_M4_cat_Spawn = true,
        _UTS15_cat_Spawn = true,
        _Minigun_cat_Spawn = true,
        _AS_VAL_cat_Spawn = true,
        _M249_cat_Spawn = true,
        _Mk46_cat_Spawn = true,
        _XM7_NGSW_cat_Spawn = true,
        _MSR_cat_Spawn = true,
        _HK416D_cat_Spawn = true,
        _VR80_cat_Spawn = true,
    },
    MFSCommunityFixLoot = {
        -- No longer has any effect. Use "Add MFS Firearms to Gun-Shop Display Cases" on the MFS 4 - Loot Rules page.
        EnableMFSCivilianFirearms = true,
        FilterZombieVanillaGuns = false,
        ForceRemoveDisabledGuns = false,
        -- Removes all eleven vanilla weapon-part items from newly generated procedural container loot. MFS attachments, existing items, attached parts, and crafted parts are unaffected.
        DisableVanillaWeaponParts = false,
        -- Loot-weight multiplier for firearms supplied by MFS. Individual gun spawn checkboxes still apply. 0 disables MFS firearms in new procedural loot; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        FirearmMultiplier = 1.0,
        -- Loot-weight multiplier for primary optics. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        ScopeMultiplier = 1.0,
        -- Loot-weight multiplier for right-side optics. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        RightScopeMultiplier = 1.0,
        -- Loot-weight multiplier for left-side optics. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        LeftScopeMultiplier = 1.0,
        -- Loot-weight multiplier for suppressors, brakes, and other muzzle attachments. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        MuzzleMultiplier = 1.0,
        -- Loot-weight multiplier for stocks. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        StockMultiplier = 1.0,
        -- Loot-weight multiplier for grips. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        GripMultiplier = 1.0,
        -- Loot-weight multiplier for weapon lights. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        LightMultiplier = 1.0,
        -- Loot-weight multiplier for lasers. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        LaserMultiplier = 1.0,
        -- Loot-weight multiplier for slings. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        SlingMultiplier = 1.0,
        -- Loot-weight multiplier for recoil pads. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        RecoilPadMultiplier = 1.0,
        -- Loot-weight multiplier for barrel parts. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        BarrelMultiplier = 1.0,
        -- Loot-weight multiplier for underbarrel launchers and other utility-slot parts. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 100.00 Default: 1.00
        UnderbarrelMultiplier = 1.0,
        -- Loot-weight multiplier for usable MFS magazines and drums. Decorative magazine weapon parts are excluded. 0 disables this category; 1 keeps the authored rate. Min: 0.00 Max: 5.00 Default: 1.00
        FunctionalMagazineMultiplier = 1.0,
        -- Puts every MFS firearm on the Build 42 gun-shop display lists (rifles, pistols, shotguns), where the base MFS loot never places them. MFS firearms already spawn in gun stores, homes, police, military and vehicle containers without this option.
        GunShopDisplayCases = true,
        -- When on, machine guns, anti-materiel rifles, the XM7 and the MTL30 grenade launcher spawn only in army storage, army lockers and army vehicles, not in shops, homes, police or civilian vehicles. Other firearms are unaffected.
        MilitaryFirearmsInMilitaryLootOnly = false,
        -- Off: also rifles and shotguns.
        SchoolLockersHandgunsOnly = true,
    },
    MFSCommunityFixGunRates = {
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_AssaultRifle = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_AssaultRifle2 = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_HuntingRifle = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_VarmintRifle = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_JS14_Rifle = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_JS3T_Shotgun = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_L92_Carbine = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_L94_Rifle = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_MSR7T_Rifle = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_TrapperCarbine = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_Pistol = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_Pistol2 = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_Pistol3 = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_Revolver = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_Revolver_Short = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_Revolver_Long = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_Shotgun = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_ShotgunSawnoff = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_DoubleBarrelShotgun = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 0.00
        Gun_DoubleBarrelShotgunSawnoff = 0.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_56S_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Taurus_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Anaconda_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AWM_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M200_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M500_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M1866_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_ROSE_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Marlin1894 = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Christine45_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M1873_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SRM3_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_UMP45_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_usp45_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AX50_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Thoridal = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_GM6_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M82_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Requiem_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SnipeX_T_Rex_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_XM109_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AEK971_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AK12_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AKS74U_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AN94_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_HK416_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_KS1_KAC_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M4A1S_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M4Mk18_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M7_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M91_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MCX_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MK12_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_NoveskeN4_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SAI_GRY_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SG553_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_QBU191_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_QBZ191_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_QBZ192_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_QJY201_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_QSZ_92G = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_98k_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AK103_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_ar_10_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_ARX200_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_BAR_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Berthier_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_C96_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_FAL_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_FN_Evolys_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Groza_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_HK51_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_LebelM1886_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_lewis_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M1Garand_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M14_Albedo = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M240_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_m1903_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M1918_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M1919a6_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MG3_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_mk47_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Mosin_Nagant_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_PKM_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_RPK16_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_RSC_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_ScarH_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SVD_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SVT40_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Type81_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_URG_S_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_HoneyBadger_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_LWMMG_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_mg338_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MK18_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_REAPR_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AMB17_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AS_VAL_MOD4_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_BerettaM93R_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_EMP_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_FN57_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_G17_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_G18_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_G19_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_G34_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_KrissVector_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_lugerP08_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M9A4_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_minigun_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_mp5_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MP7_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SIGP226_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Taran2011_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Thompson_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_uzi_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_VSSM_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_interceptor_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AA12_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_BRAuto5_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_ChiappaTripleThreat_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_DP12_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M870_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M1887_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_origin12_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Saiga12_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Striker12_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_TTI_Benelli_M4_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_UTS15_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Minigun_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_AS_VAL_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_CycloneAK_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_SW629_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_lee_enfield_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M16D_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_QBU203_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_nagant_m1895_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MFS_MTL30_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MEGA_AR15_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_M249_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_Mk46_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_XM7_NGSW_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_MSR_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_HK416D_cat = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        Gun_VR80_cat = 1.0,
    },
    MFSSandbox = {
        -- Min: 0.10 Max: 2.00 Default: 1.00
        BayonetDamage = 1.0,
        -- Min: 0 Max: 2 Default: 0
        BayonetStamina = 0,
        -- Min: 0.10 Max: 3.00 Default: 3.00
        GrenadeDamage = 3.0,
        -- Min: 0 Max: 60 Default: 3
        GrenadeRange = 3,
        EnableReticle = false,
    },
    MFSTrade = {
        Enabled = true,
        -- Comma-separated item full types, e.g. Base.Pistol,Gunpart.HW_SH. Leave empty to use the default pool.
        SellList = "",
        -- Comma-separated item full types. Leave empty to use the default pool.
        BuyList = "",
    },
    MFSEject = {
        Enabled = true,
    },
    MFSCommunityFixJamming = {
        -- Maximum custom jam chance per shot. Default 2.5 means 2.5%, averaging one jam per 40 shots at maximum wear. 0 disables new custom jams. Applies to firearms except revolvers, pump-action shotguns and bolt-action weapons. Launchers are excluded. Min: 0.00 Max: 100.00 Default: 2.50
        MaximumJamChancePercent = 2.5,
        -- Wear is 1 minus remaining condition ratio. Default 0.30 means no custom jams at 70% condition or above. Must be lower than X2; invalid settings use defaults 0.30 / 0.90 / 2.5%. Min: 0.00 Max: 1.00 Default: 0.30
        JamStartWearRatio = 0.3,
        -- Jam chance rises linearly between X1 and X2, then stays at the maximum. Default 0.90 means the maximum applies at 10% condition or below. Must be higher than X1. Min: 0.00 Max: 1.00 Default: 0.90
        MaximumJamWearRatio = 0.9,
    },
    MFSCommunityFixLoadout = {
        -- Newly generated MFS guns (containers, vehicles and zombie drops) may come with attachments from each gun's loadout list. Parts the vanilla upgrade roll already attached are kept. Existing items are never changed.
        Enabled = true,
        -- For each slot in a gun's loadout list (optic, grip, light, laser, muzzle, bipod, sling...), the chance that one listed part is attached. 0 leaves guns bare except the stock. Min: 0 Max: 100 Default: 40
        PartChance = 40,
        -- When on, a gun that takes a stock always spawns with one from its loadout list (with its stock adapter where needed). Off: the stock rolls like any other slot.
        AlwaysStock = true,
        -- If a loadout list names a suppressor or an underbarrel grenade launcher, it is only used this often when its slot is picked. Default 5. Min: 0 Max: 100 Default: 5
        RarePartChance = 5,
        -- While spawn attachments are on, loose attachment loot is multiplied by this (on top of the MFS 3 multipliers), because guns now bring parts with them. 1 keeps the old amount. Min: 0.00 Max: 1.00 Default: 0.70
        PartLootFactor = 0.7,
        -- Percent chance that a zombie carries an MFS gun. The gun is chosen from the guns this zombie could carry, using the MFS 2 rates; guns set to 0 never drop. Default 0.1 (about 1 corpse in 1000). If Riko's Ammo Loot Drop Weapons sub-mod (MFS edition) is on, hers is used and this is skipped; disable it or set its rate to 0 to use this patch's guns. Min: 0.00 Max: 100.00 Default: 0.10
        ZombieGunDropRate = 0.1,
        -- Percent chance that a zombie carries a spare magazine for one of the guns it could carry. Default 0.5. If Riko's Ammo Loot Drop Magazines sub-mod is on, hers is used and this is skipped; disable it or set its rate to 0 to use this patch's. Min: 0.00 Max: 100.00 Default: 0.50
        ZombieMagazineDropRate = 0.5,
        -- A gun dropped by a zombie also brings one of its magazines.
        DropMagazineWithGun = true,
        -- Most rounds already in a dropped magazine, as a percent of its capacity (random from 1). 0 leaves it empty. Min: 0 Max: 100 Default: 50
        ZombieMagazineLoaded = 50,
        -- Rolled separately for each calibre the zombie could use. A hit leaves 1 to the maximum below. Calibres whose guns are all off never drop. Default 2. If Riko's Ammo Loot Drop ammo sub-mod is on, hers is used and this is skipped. Min: 0.00 Max: 100.00 Default: 2.00
        ZombieAmmoDropRate = 2.0,
        -- Upper limit of loose rounds left by one ammo drop. Min: 1 Max: 99 Default: 10
        ZombieLooseRoundsMax = 10,
        -- Rolled separately for each calibre, like loose ammo. Default 0.2. If Riko's Ammo Loot Drop box sub-mod is on, hers is used and this is skipped. Min: 0.00 Max: 100.00 Default: 0.20
        ZombieAmmoBoxDropRate = 0.2,
        -- Police, soldiers, hunters, survivalists, bandits...
        ArmedZombiesOnly = false,
    },
    MFSCommunityFixGameplay = {
        -- On (default): toggle weapon lights with the light key; charge drains and the community battery actions apply. Off: use MFS aim-only lights and its original battery actions. Restart the world after changing this setting.
        UseCustomWeaponLight = true,
    },
    AccessorySkillBonuses = {
        -- The percentage is the chance that a newly processed eligible accessory receives any regular XP bonus. It does not change bonus strength, previously processed items, or the chance of finding the mystery item. Default = Default (19.8%)
        -- 1 = Minimal (5%)
        -- 2 = Scarce (10%)
        -- 3 = Default (19.8%)
        -- 4 = Frequent (35%)
        -- 5 = Abundant (50%)
        BonusFrequency = 3,
    },
    TTF_CSP = {
        -- Controls how quickly nearby corpses build up corpse sickness.
        -- 
        -- Slow = 0.5x buildup
        -- Recommended = 0.85x buildup
        -- Vanilla = 1.0x buildup
        -- Fast = 1.25x buildup
        -- Fastest = 1.5x buildup
        --  Default = Recommended
        -- 1 = Slow
        -- 2 = Recommended
        -- 3 = Vanilla
        -- 4 = Fast
        -- 5 = Fastest
        BuildupPreset = 2,
        -- Controls how quickly corpse sickness recovers after corpse pressure is gone and poison is no longer active.
        -- 
        -- Slow = 0.75x recovery
        -- Vanilla = 1.0x recovery
        -- Faster = 1.5x recovery
        -- Recommended = 2.0x recovery
        -- Fastest = 3.0x recovery
        --  Default = Recommended
        -- 1 = Slow
        -- 2 = Vanilla
        -- 3 = Faster
        -- 4 = Recommended
        -- 5 = Fastest
        RecoveryPreset = 4,
    },
    AdvancedDrying42 = {
        -- Number of in-game days required to dry salted meat Min: 1.00 Max: 60.00 Default: 20.00
        MeatDryDays = 14.0,
        -- Number of in-game days required to dry salted fish Min: 1.00 Max: 60.00 Default: 20.00
        FishDryDays = 14.0,
    },
    AdvancedDeathLog4219MP = {
        AllowSelfXPRecovery = false,
        AllowSelfGearRecovery = false,
    },
    NeuroRadio = {
        -- Turns Aftermath Radio broadcasts on or off.
        Enabled = true,
        -- Radio frequency as MHz x 1000. Default 101800 means 101.8 MHz. Min: 200 Max: 1000000 Default: 101800
        Frequency = 101800,
        -- In-game minutes after world start before the first possible broadcast. Min: 0 Max: 1440 Default: 5
        StartDelayMinutes = 5,
        -- Minimum in-game minutes between Louisville Relay broadcasts. Min: 1 Max: 10080 Default: 20
        MinIntervalMinutes = 20,
        -- Maximum in-game minutes between Louisville Relay broadcasts. Min: 1 Max: 10080 Default: 60
        MaxIntervalMinutes = 60,
        -- How many text-pack entries can be sent in one broadcast. Serial arcs still play as coherent episodes. Min: 1 Max: 5 Default: 1
        MaxLinesPerBroadcast = 1,
        -- In-game minutes before the same listener can receive another XP or mood effect. Does not change how often broadcasts air. Min: 0 Max: 1440 Default: 10
        ListenCooldownMinutes = 10,
        -- Scales only positive unhappiness effects from broadcasts. 50 means half depression. Relief messages, panic, boredom, and XP are not reduced. Min: 0 Max: 100 Default: 50
        UnhappinessMultiplierPercent = 50,
        -- How many recent broadcasts the station tries not to repeat. 0 disables this protection. Min: 0 Max: 50 Default: 3
        AvoidRepeatWindow = 3,
        -- Tile range where a tuned radio placed in the world can trigger XP and mood effects. Set 0 to ignore placed radios for effects. Min: 0 Max: 50 Default: 12
        WorldRadioRadius = 12,
        -- Off by default. When off, a radio inside the backpack does not give XP or mood effects; use hands, vehicle radio, or a placed radio.
        InventoryRadioEffects = false,
        -- 0 Auto, 1 English, 2 Russian, 3 Simplified Chinese. Force a language on servers when auto-detection picks the wrong pack. Min: 0 Max: 3 Default: 0
        LanguageMode = 0,
        -- Chooses where broadcast text is loaded from: 0 built-in only, 1 built-in plus custom overlays, 2 custom only with built-in fallback. Does not change language. Min: 0 Max: 2 Default: 1
        TextMode = 1,
        -- Allows ordered multi-part voices such as Dispatch, Bookman, Mapmaker, Hollow Choir, and Field Logs.
        ArcEnabled = true,
        -- Percent chance per broadcast to play the next available serial arc episode. 0 disables arc picks but keeps standalone broadcasts. Min: 0 Max: 100 Default: 30
        ArcChancePercent = 30,
        -- Writes extra Aftermath Radio details to the game logs. Use mainly for testing.
        Debug = false,
        -- Colors lines by tone or speaker: horror, warnings, Bookman, Dispatch, Pastor, and system fragments.
        LineColors = true,
    },
    ImmersiveAmmoCount = {
        -- Choose how remaining ammunition is displayed. HUD modes appear while a firearm is equipped and can be dragged anywhere on the screen. Default = Above character
        -- 1 = Above character
        -- 2 = Magazine HUD
        -- 3 = Ammo HUD
        -- 4 = Detailed HUD
        DisplayStyle = 1,
        -- When enabled, remaining ammunition also appears above the character after each shot while the selected HUD stays active.
        MergeSpeechWithHud = false,
        -- Choose the initial HUD color palette. Each character can change it later from the Ammo Count context menu. Default = Classic
        -- 1 = Classic
        -- 2 = Orange
        -- 3 = Red
        -- 4 = Green
        -- 5 = Blue
        -- 6 = Purple
        -- 7 = Monochrome
        -- 8 = High contrast
        ColorTheme = 1,
    },
    AmmoLootDropMFSB42 = {
        -- <RGB:1,1,1>The chance for each round type to
        -- drop from a zombie you kill.
        -- 
        -- Every type you turn on is checked on
        -- its own, and most zombies are
        -- checked twice. With all 16 types on,
        -- that is 32 checks per body.
        -- 
        -- <RGB:0.100,0.800,1.000>So 2 does not mean 2% of zombies.
        -- Many small chances add up. At 2 you
        -- get ammo from about 48% of bodies.
        -- 
        -- <RGB:1.000,0.700,0.200>9 of these are vanilla rounds. This
        -- pack drops them so it can work on
        -- its own. If Ammo Loot Drop is also
        -- on, that mod drops them instead.
        -- Then only 7 types are left here, so
        -- you get ammo from about 25% of
        -- bodies.
        -- 
        -- <RGB:0.800,1.000,0.000>Try 12 if you want almost every
        -- zombie to drop ammo. Raise it
        -- slowly.
        -- 
        -- <RGB:1,1,1>Set it to 0 to stop the drop. Min: 0.00 Max: 100.00 Default: 2.00
        DropRate = 2.0,
        -- <RGB:1,1,1>How many rounds you get each time
        -- ammo drops. You get between 1 and
        -- this many.
        -- 
        -- <RGB:0.100,0.800,1.000>This does not change how often you
        -- find ammo. Only the drop rate above
        -- does that. It changes how much you
        -- find each time.
        -- 
        -- Every round type gets its own
        -- number, so a body with two calibers
        -- gives a separate amount for each.
        -- 
        -- <RGB:0.800,1.000,0.000>At the default of 10, a body with
        -- ammo holds about 8 rounds. That is
        -- enough to be useful.
        -- 
        -- Set it to 1 if you want only one
        -- round at a time, like the old
        -- version of this mod.
        -- 
        -- <RGB:1.000,0.700,0.200>A body has limited space. If you set
        -- a big number, the body may fill up
        -- and you will get less than you asked
        -- for. Min: 1 Max: 99 Default: 10
        LooseRoundsMax = 15,
        -- <RGB:1,1,1>OFF: any zombie can drop ammo. This
        -- is the normal setting.
        -- 
        -- ON: only zombies who look like they
        -- carried a gun drop ammo, and only
        -- the kind that fits their gun:
        -- 
        -- <RGB:0.100,0.800,1.000>All types - soldiers, militia (4)
        -- Pistol, shotgun, rifle - hunters,
        -- rangers, campers, rednecks,
        -- survivalists, raiders (20)
        -- Pistol, shotgun - police, guards,
        -- bandits, bikers (10)
        -- Shotgun, rifle - farmers, fishermen
        -- (2)
        -- Pistol only - detectives, agents,
        -- truckers, mobsters (5)
        -- 
        -- <RGB:1,1,1>That is 41 of the 125 zombie outfits
        -- in the game. Every other zombie
        -- drops nothing. In a normal town,
        -- only about 1 zombie in 100 wears one
        -- of these outfits.
        -- 
        -- <RGB:1.000,0.700,0.200>Belt fed and launcher rounds drop
        -- from soldiers only. Nobody else in
        -- Kentucky carried them.
        -- 
        -- <RGB:0.800,1.000,0.000>So search where these people worked:
        -- police stations, army bases,
        -- prisons, farms and bars.
        -- 
        -- <RGB:1,1,1>A higher drop rate helps a little,
        -- but you will still find very little
        -- in the suburbs.
        ArmedZombiesOnly = true,
        AmmoBullets145 = true,
        AmmoBullets50 = true,
        AmmoBullets86 = true,
        AmmoA_58bullets = true,
        Ammo545Bullets = true,
        AmmoGrenadeAmmo = true,
        AmmoCrossbowBolt = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        AmmoBullets9mm = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        AmmoBullets45 = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        AmmoBullets44 = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        AmmoBullets38 = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        AmmoBullets357 = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        AmmoShotgunShells = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        Ammo3030Bullets = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        Ammo308Bullets = true,
        -- <RGB:1,1,1>A vanilla round. This pack drops it
        -- so it can work on its own.
        -- 
        -- <RGB:1.000,0.700,0.200>Ammo Loot Drop drops the vanilla
        -- rounds when it is on. This switch
        -- only works when this mod is the one
        -- dropping them.
        -- 
        -- <RGB:1,1,1>The same round is never dropped
        -- twice.
        Ammo556Bullets = true,
    },
    AmmoLootDropMFSB42Weapon = {
        -- <RGB:1,1,1>The chance that a zombie you kill is
        -- carrying a gun.
        -- 
        -- This is the total chance, not the
        -- chance for each gun. All the guns
        -- you turn on share it. Turning a
        -- caliber off changes which gun you
        -- get, not how often you get one.
        -- 
        -- <RGB:0.100,0.800,1.000>Most zombies are checked twice. At
        -- 0.1 you get a gun from about 1 body
        -- in 500. The 201 guns share that
        -- chance.
        -- 
        -- <RGB:1.000,0.700,0.200>The 20 vanilla guns are in that
        -- count. This pack drops them so it
        -- can work on its own. If Ammo Loot
        -- Drop Weapon is also on, that mod
        -- drops them instead, and only the 181
        -- guns this pack adds share the chance
        -- here.
        -- 
        -- <RGB:0.800,1.000,0.000>A gun is worth much more than a few
        -- bullets. Raise this slowly.
        -- 
        -- <RGB:1,1,1>Set it to 0 to stop the drop. Min: 0.00 Max: 100.00 Default: 0.10
        DropRate = 0.2,
        -- <RGB:1,1,1>OFF: any zombie can drop a gun, even
        -- office workers and nurses.
        -- 
        -- ON: only zombies who look like they
        -- carried a gun drop one, and only the
        -- kind that suits them:
        -- 
        -- <RGB:0.100,0.800,1.000>All types - soldiers, militia (4)
        -- Pistols, shotguns, rifles - hunters,
        -- rangers, campers, rednecks,
        -- survivalists, raiders (20)
        -- Pistols, shotguns - police, guards,
        -- bandits, bikers (10)
        -- Shotguns, rifles - farmers,
        -- fishermen (2)
        -- Pistols only - detectives, agents,
        -- truckers, mobsters (5)
        -- 
        -- <RGB:1,1,1>That is 41 of the 125 zombie outfits
        -- in the game. Every other zombie
        -- drops nothing. In a normal town,
        -- only about 1 zombie in 100 wears one
        -- of these outfits.
        -- 
        -- <RGB:1.000,0.700,0.200>Belt fed and launcher guns drop from
        -- soldiers only. Nobody else in
        -- Kentucky carried them.
        -- 
        -- <RGB:0.800,1.000,0.000>So search where these people worked:
        -- police stations, army bases,
        -- prisons, farms and bars.
        -- 
        -- <RGB:1,1,1>A higher drop rate helps a little,
        -- but you will still find very little
        -- in the suburbs.
        ArmedZombiesOnly = true,
        -- <RGB:1,1,1>ON: a gun that drops comes with
        -- the magazine it feeds from, so a
        -- rifle you find is ready to use.
        -- 
        -- Magazines roll on their own as
        -- well, so you can find one without
        -- the gun.
        -- 
        -- <RGB:0.100,0.800,1.000>156 of the 201 guns use a magazine.
        -- They share 40 magazines between
        -- them.
        -- 
        -- <RGB:1.000,0.700,0.200>Revolvers, break action guns and
        -- guns that load loose rounds do not
        -- need one.
        -- 
        -- <RGB:1,1,1>OFF: guns only, no magazines.
        DropMagazine = true,
        -- <RGB:1,1,1>How much ammunition is waiting in
        -- a magazine that drops.
        -- 
        -- It is a percent of what the
        -- magazine holds, and the amount is
        -- rolled each time, so you get
        -- between one round and this much.
        -- 
        -- <RGB:0.100,0.800,1.000>At 50 a 30 round magazine arrives
        -- holding 1 to 15 rounds.
        -- 
        -- <RGB:1.000,0.700,0.200>The game leaves a looted magazine
        -- empty. This setting is the only
        -- thing that puts rounds in one.
        -- 
        -- <RGB:0.800,1.000,0.000>A loaded magazine is ammunition
        -- you can fire straight away. It is
        -- worth more than the same rounds
        -- loose.
        -- 
        -- <RGB:1,1,1>Set it to 0 for empty magazines,
        -- which is how they dropped before. Min: 0.00 Max: 100.00 Default: 50.00
        MagazineLoaded = 50.0,
        -- Norinco Type 56S Rifle
        -- Kar98k Bolt Action Rifle
        -- AK-103 Assault Rifle
        -- AK-103 Assault Rifle (Drum)
        -- Beretta ARX200 Battle Rifle
        -- Beretta ARX200 Battle Rifle (Drum)
        -- Browning Automatic Rifle
        -- Berthier Infantry Rifle
        -- and 41 more
        -- M14 Rifle
        -- Remington MSR
        -- MSR7T Tactical Rifle
        Guns308Bullets = true,
        -- AMB-17 Nightmare Rifle
        -- AMB-17 Nightmare Rifle (Drum)
        -- AS Val MOD4 Suppressed Rifle
        -- AS Val MOD4 Suppressed Rifle (Drum)
        -- AS Val Suppressed Rifle
        -- AS Val Suppressed Rifle (Drum)
        -- Beretta M93R Machine Pistol
        -- Beretta M93R Machine Pistol (Drum)
        -- and 31 more
        -- Beretta M9 Pistol
        GunsBullets9mm = true,
        -- M16 Assault Rifle (Drum)
        -- HK416D Assault Rifle
        -- HK416 Assault Rifle
        -- HK416 Assault Rifle (Drum)
        -- Knight's Armament KS-1 Assault Rifle
        -- Knight's Armament KS-1 Assault Rifle (Drum)
        -- M16D Assault Rifle
        -- M249 SAW Light Machine Gun
        -- and 20 more
        -- M16 Assault Rifle
        -- JS-14 Rifle
        -- MSR700 Rifle
        Guns556Bullets = true,
        -- AA12 Fully Auto Shotgun
        -- BRAuto5 Semi-Auto Shotgun
        -- Chiappa Triple Threat Shotgun
        -- DP-12 Double Barrel Pump Shotgun
        -- M1887 Lever Action Shotgun
        -- Remington 870 Pump Shotgun
        -- Saiga-12 Semi-Auto Shotgun
        -- Striker 12 Revolving Shotgun
        -- and 3 more
        -- Double-Barrel Shotgun
        -- Sawed-off Double Barrel Shotgun
        -- JS-3T Tactical Shotgun
        -- JS-2000 Shotgun
        -- Sawed-Off Double-Barrel Shotgun
        GunsShotgunShells = true,
        -- AWM Magnum Sniper Rifle
        -- Colt Anaconda Revolver
        -- Winchester Model 1866 Rifle
        -- CheyTac M200 Intervention
        -- Smith & Wesson Model 500 Super Revolver
        -- Marlin Model 1894 Lever-Action Rifle
        -- Rose Sniper Rifle
        -- Smith & Wesson Model 629 Revolver
        -- and 2 more
        -- Desert Eagle Pistol
        -- Smith & Wesson Model 625 Revolver
        -- Smith & Wesson Model 500 Revolver
        GunsBullets44 = true,
        -- Christine .45-70 Marksman Rifle
        -- Colt Peacemaker M1873
        -- M1911 Pistol (Drum)
        -- SRM3 Assault Rifle
        -- SRM3 Assault Rifle (Drum)
        -- HK UMP45 Submachine Gun
        -- HK UMP45 Submachine Gun (Drum)
        -- HK USP .45 Pistol
        -- and 1 more
        -- M1911 Pistol
        -- Trapper Carbine
        GunsBullets45 = true,
        -- Accuracy International AX50 Anti-Materiel Rifle
        -- Accuracy International AX50 Anti-Materiel Rifle (Drum)
        -- GM6 Anti-Materiel Bullpup Rifle
        -- Barrett M82 Anti-Materiel Rifle
        -- Barrett M82 Anti-Materiel Rifle (Drum)
        -- Requiem Heavy Revolver
        -- Solis'dar
        -- XM109 Anti-Materiel Payload Rifle
        -- and 1 more
        GunsBullets50 = true,
        -- AEK-971 Assault Rifle
        -- AEK-971 Assault Rifle (Drum)
        -- AK-12 Assault Rifle
        -- AK-12 Assault Rifle (Drum)
        -- AKS-74U Carbine
        -- AKS-74U Carbine (Drum)
        -- AN-94 Assault Rifle
        -- AN-94 Assault Rifle (Drum)
        Guns545Bullets = true,
        -- QBU-191 Designated Marksman Rifle
        -- QBU-191 Designated Marksman Rifle (Drum)
        -- QBZ-191 Assault Rifle
        -- QBZ-191 Assault Rifle (Drum)
        -- QBZ-192 Carbine
        -- QBZ-192 Carbine (Drum)
        -- QSZ-92G Pistol
        GunsA_58bullets = true,
        -- LWMMG Medium Machine Gun
        -- MK18 Hammer of Thor Carbine
        -- REAPR General Purpose MG
        -- .338 MG338 Machine Gun
        GunsBullets86 = true,
        -- M7 Assault Rifle
        -- M7 Assault Rifle (Drum)
        -- XM7 NGSW Assault Rifle
        -- SN38 Revolver
        GunsBullets38 = true,
        -- FN MTL-30 Grenade Launcher (New)
        -- FN MTL-30™ (Multi-Purpose Tactical Launcher - 30mm)
        GunsGrenadeAmmo = true,
        -- T-Rex Anti-Materiel Rifle
        GunsBullets145 = true,
        -- Interceptor Tactical Crossbow
        GunsCrossbowBolt = true,
        -- L94 Rifle
        Guns3030Bullets = true,
        -- L92 Carbine
        GunsBullets357 = true,
    },
    AnimalHaulerB42 = {
        -- Maximum number of small or medium animals in normal cars. Min: 0 Max: 2 Default: 1
        SedanCapacity = 1,
        -- Maximum number of small or medium animals in pickups. Min: 0 Max: 4 Default: 3
        PickupCapacity = 3,
        -- Maximum number of small or medium animals in vans. Min: 0 Max: 5 Default: 4
        VanCapacity = 4,
        -- Maximum number of small or medium animals in step vans and large utility vans. Min: 0 Max: 6 Default: 5
        IndustrialCapacity = 5,
        -- Maximum number of small or medium animals in vanilla covered utility trailers. Min: 0 Max: 4 Default: 3
        CoveredTrailerCapacity = 3,
        -- Maximum number of medium animals in vanilla open utility trailers. Rats, rabbits and chickens are not allowed. Min: 0 Max: 3 Default: 2
        OpenTrailerCapacity = 2,
    },
    RVInterior = {
        -- Independent roll per suitable shop/warehouse container with free space: Off 0 percent, Low 5 percent, Medium 10 percent, High 15 percent, Heavy 20 percent. Existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootMarineBay = 3,
        -- Independent roll per suitable shop/warehouse container with free space: Off 0 percent, Low 5 percent, Medium 10 percent, High 15 percent, Heavy 20 percent. Existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootShorePedestal = 3,
        -- Independent roll per suitable shop/warehouse container with free space: Off 0 percent, Low 5 percent, Medium 10 percent, High 15 percent, Heavy 20 percent. Existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootMarineBattery = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootPowerManual = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootMarineManual = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootShoreCable = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootBrokenCable = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseRed = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseBlue = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseYellow = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseGreen = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseBoxRed = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseBoxBlue = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseBoxYellow = 3,
        -- Medium is half the old common-loot weights; Heavy is the old common-loot weight. Off disables this item only. Restart required; existing loot is unchanged. Unedited items inherit saved legacy loot settings. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Heavy
        RVLootFuseBoxGreen = 3,
        -- Allows regular players to enter RV interiors. Disable to block new regular-player entry immediately. Players already inside can always exit. Moderators and administrators retain entry and all Vehicle Manager controls. Takes effect immediately. Default: enabled.
        AllowPlayerInteriorAccess = true,
        -- On: use the Vehicle Manager shortcut or right-click. Off: right-click only. Battery Bay and pedestal access is set separately in RV Power Manager > Power settings (admins only). Your Enter/Exit RV key is unchanged.
        UseRVShortcutKeys = true,
        -- Choose a Vehicle Manager shortcut, or select Disabled to turn the shortcut and its prompt off. When disabled, right-click an eligible vehicle and choose Vehicle Manager. Apply saves the choice immediately.
        VehicleManagerHotkey = "Shift+E",
        -- Choose the shortcut everyone uses to open or close a nearby RV Battery Bay. Hold it briefly. Disabled keeps right-click access. If it matches your Enter or Exit Interior key, exiting wins. Takes effect immediately. Default: E.
        BatteryBayAccessHotkey = "E",
        -- Show the nearby Vehicle Manager shortcut label. This only changes its label, not access. Battery Bay and pedestal labels are set separately in RV Power Manager > Power settings (admins only).
        ShowVehicleManagerPrompt = true,
        -- Zombies this distance or closer to a player will prevent them from entering vehicle interiors (0 = disabled). Min: 0 Max: 100 Default: 20
        SafeZombieDistance = 15,
        -- Zombies currently chasing the player will prevent them from entering vehicle interiors, no matter the distance.
        NotWhenChased = true,
        -- When enabled, exiting an RV interior attempts to return each player to their previous seat, or another free seat in the same vehicle. Disabling this function returns players to the rear corner of the vehicle and may reduce desync pressure on the server during peak hours. Default: enabled.
        ReturnPlayersToVehicleSeats = true,
        -- Allows a one-time randomized zombie encounter in a newly assigned, previously undiscovered RV interior. Existing, claimed, or modified interiors are never selected. Available in single player, hosted, and dedicated multiplayer. Default: off.
        EnableFirstDiscoveryZombies = false,
        -- Chance that an eligible newly discovered RV contains any controlled zombie encounter. The final randomized count may still be zero. Default: 25. Min: 0 Max: 50 Default: 25
        FirstDiscoveryZombieChance = 25,
        -- Random range is zero through this value. Default: 2. Min: 0 Max: 50 Default: 2
        FirstDiscoverySmallMax = 2,
        -- Random range is zero through this value. Default: 3. Min: 0 Max: 50 Default: 3
        FirstDiscoveryMediumMax = 3,
        -- Random range is zero through this value. Default: 3. Min: 0 Max: 50 Default: 3
        FirstDiscoveryLargeMax = 3,
        -- Random range is zero through this value. Default: 5. Min: 0 Max: 50 Default: 5
        FirstDiscoveryVeryLargeMax = 5,
        -- Scales all RV power-item loot. 0 disables future spawns; 0.5 halves them; 1 is normal; 2 doubles them. Common loot is now 50 percent lower. Battery bay, shore pedestal and marine battery rolls are still 10 percent each at 1. Restart the server or single-player game for common-loot changes. Existing loot is untouched. Min: 0.00 Max: 10.00 Default: 1.00
        RVPowerLootMultiplier = 1.0,
        -- 0 turns battery drain off; 0.5 halves it; 1 is normal; 2 doubles it. Default: 0.5. Min: 0.00 Max: 4.00 Default: 1.00
        PowerBankConsumptionMultiplier = 1.0,
        -- Default on. Turn off to disconnect direct World Power immediately; powered shore pedestals, engines and batteries still work. No restart required. The separate restored-power setting still applies.
        AllowGlobalRVPower = true,
        -- When on, a restored power grid can power RVs after the first outage.
        AllowRestoredGlobalRVPower = false,
        -- Fixed shore input referenced to one standard battery, shared by the whole RV. More installed batteries do not increase input. Appliance demand is deducted before charging; 0 turns shore input off. Min: 0 Max: 25 Default: 8
        ShoreChargePercentPerHour = 8,
        -- On: engine or starter-battery damage reduces engine input, with a 0.0025 /h running floor. Off: use the configured engine input regardless of damage. A stopped or destroyed engine still supplies zero. Marine-bay batteries and shore input are unaffected.
        EngineBatteryDamageAffectsEngineCharging = true,
        -- The farthest an RV can be from its shore pedestal before the cable disconnects. Min: 1 Max: 20 Default: 10
        ShoreCableRangeTiles = 10,
        -- Electrical skill needed to craft one shore cable. Min: 0 Max: 10 Default: 2
        ShoreCableElectricalSkill = 2,
        -- Electrical-wire units needed to craft one shore cable. Min: 1 Max: 25 Default: 8
        ShoreCableWireUnits = 8,
        -- Kept only so old saves keep working. Every RV now gets a Battery Bay.
        SpawnStarterPowerBanks = true,
        -- Each of a new Battery Bay's four slots uses this chance. 0 gives no starting batteries; 100 gives four. Min: 0 Max: 100 Default: 15
        MarineBayBatteryChance = 15,
        -- Number of real-world calendar days since last entry before an RV interior appears in Manage abandoned interiors. Default: 21. This uses the server or host wall clock; game-time speed, sleeping and restored world clocks do not affect it. Min: 0 Max: 90 Default: 21
        AbandonedInteriorRealDays = 21,
    },
    ArmorWearingSkill = {
        DisableDiscomfortReduce = false,
        DisableRunSpeedReduce = false,
        DisableCombatSpeedReduce = false,
        SlowDiscomfort = true,
    },
    AutoLightTimers = {
        -- Master toggle for the mod. Disable to revert to vanilla behavior.
        Enabled = true,
        -- When enabled, players must craft a Light Timer item and install it on a light before they can set a schedule. When disabled, any light can be configured directly, gated only by the Required Electrical skill below.
        RequireTimerItem = true,
        -- Minimum Electrical skill to configure a light timer. Only applies when "Require Timer item" is off — otherwise the skill cost is in crafting the Timer. Set to 0 for no gate. Min: 0 Max: 5 Default: 1
        RequiredElectricalSkill = 1,
        -- Hour (0-23) prefilled in the timer dialog for newly-configured lights. Min: 0 Max: 23 Default: 19
        DefaultOnHour = 19,
        -- Minute (0-59) prefilled in the timer dialog for newly-configured lights. Min: 0 Max: 59 Default: 0
        DefaultOnMin = 0,
        -- Hour (0-23) prefilled in the timer dialog for newly-configured lights. Min: 0 Max: 23 Default: 6
        DefaultOffHour = 6,
        -- Minute (0-59) prefilled in the timer dialog for newly-configured lights. Min: 0 Max: 59 Default: 0
        DefaultOffMin = 0,
        -- When a chunk loads, immediately reconcile any timer-configured lights so they match their schedule. Disable if this causes performance issues.
        CatchUpOnChunkLoad = true,
        -- Master toggle for the motion-sensor switch feature. When off, installed sensors stop reacting to players (and craft recipes still work but installs are blocked).
        MotionSensorEnabled = true,
        -- When enabled, players must craft and install an Indoor or Outdoor Motion Sensor item to motion-enable a light. When disabled, the skill gate below applies instead.
        RequireMotionSensorItem = true,
        -- Minimum Electrical skill to install or configure a motion sensor when the item requirement above is off. Set to 0 for no gate. Min: 0 Max: 5 Default: 2
        MotionSensorSkillLevel = 2,
        -- Minutes (1-60) prefilled in the motion-sensor dialog. Controls how long the light stays on after the last detected motion. Min: 1 Max: 60 Default: 5
        MotionSensorDefaultIdleMinutes = 5,
        -- Tile radius (1-20) within which an Outdoor Motion Sensor will detect players. Indoor sensors ignore this and use room boundaries instead. Min: 1 Max: 20 Default: 6
        OutdoorMotionSensorRadius = 6,
        -- How often motion sensors check for nearby players, in game-tick frames. Lower = snappier response, higher = lower CPU cost. Default 10 ≈ 6 polls per second at 60 FPS. Min: 1 Max: 60 Default: 10
        MotionSensorPollFrames = 10,
        -- When enabled, motion sensors trigger on zombies in addition to players — useful for spotting an intruder from a distance, but adds per-square scanning cost. Disable to reduce CPU load on busy servers or if you find it gives away too much.
        MotionSensorDetectZombies = true,
    },
    AutomaticRefueling = {
        -- How much liters of fuel the pump will provide per ingame minute Min: 1 Max: 100 Default: 10
        LitersPerMinute = 10,
        -- The maximum distance a vehicle can move away from the pump, before it cuts off Min: 1 Max: 50 Default: 5
        MaxDistance = 5,
        -- Whether to remove the original pump-refuel and tsarslib option where you have to wait by the car
        RemoveOriginalOptions = true,
        -- Whether a pump can be damaged by driving off without having stopped the refuel process
        CanPumpBeDamaged = true,
        -- Whether a damaged pump can be repaired. Only relevant if "Pumps can be damaged" is enabled
        CanPumpBeRepaired = true,
        -- How many seconds in real-time it takes to repair a damaged pump. Only relevant if "Pumps can be damaged" is enabled Min: 1 Max: 60 Default: 5
        PumpRepairDuration = 5,
        -- The tile-radius in which the fuel pump sound will attract zombies (0 disables the sound) Min: 0 Max: 200 Default: 20
        PumpSoundRadius = 20,
    },
    Bandits = {
        General_KillCounter = true,
        -- Min: 0.25 Max: 4.00 Default: 1.00
        General_SpawnMultiplier = 0.7,
        General_DensityScore = true,
        General_OriginalBandits = true,
        General_BleedOut = true,
        General_Infection = true,
        General_LimitedEndurance = true,
        General_RunAway = true,
        General_SmashWindow = true,
        General_RemoveBarricade = true,
        General_DestroyThumpable = true,
        General_SabotageVehicles = true,
        General_Theft = true,
        General_SabotageCrops = true,
        General_EnterVehicles = false,
        General_GeneratorCutoff = true,
        General_Speak = true,
        General_Captions = true,
        General_SneakAtNight = true,
        General_CarryTorches = true,
        General_ArrivalIcon = true,
        -- Bandit global weapon accuracy Default = Occasional Marksman
        -- 1 = Stormtrooper Mode
        -- 2 = Can't Hit the Broad Side of a Barn
        -- 3 = Occasional Marksman
        -- 4 = Sharpshooter on a Good Day
        -- 5 = Laser-Guided Ninja
        General_OverallAccuracy = 3,
        -- Default = Normal
        -- 1 = None (not recommended)
        -- 2 = Insanely Rare
        -- 3 = Extremely Rare
        -- 4 = Rare
        -- 5 = Normal
        -- 6 = Common
        -- 7 = Abundant
        General_DefenderLootAmount = 5,
        General_CorpseSwapper = true,
    },
    BarrelsExpanded = {
        -- Maximum liquid units for newly initialized barrels. Existing barrels keep their saved capacity. Min: 20 Max: 500 Default: 160
        BarrelDefaultCapacity = 160,
        -- Base weight used for empty barrels and carried barrel items. Min: 0.00 Max: 100.00 Default: 20.00
        BarrelEmptyWeight = 20.0,
        -- Maximum distance, in tiles, for barrel interactions. Min: 0.50 Max: 3.00 Default: 1.55
        MaxInteractionDistance = 1.55,
        -- Full item types, separated by commas or semicolons, that can open sealed barrels. Invalid or empty lists fall back to the default tools.
        OpenBarrelRequiredItemsText = "\"Base.Crowbar;Base.CrowbarForged;Base.Screwdriver;Base.PipeWrench;Base.SheetMetalSnips\"",
        -- If enabled, players need a funnel to pour liquids into barrels.
        RequireFunnelToPour = true,
        -- If enabled, players need a rubber hose to fill containers from barrels.
        RequireHoseToExtract = true,
        -- Relative chance for industrial barrels to be empty. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 40
        IndustrialWeightEmpty = 40,
        -- Relative chance for industrial barrels to contain clean water. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 15
        IndustrialWeightWater = 15,
        -- Relative chance for industrial barrels to contain tainted water. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 20
        IndustrialWeightTaintedWater = 20,
        -- Relative chance for industrial barrels to contain gasoline. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 20
        IndustrialWeightGasoline = 20,
        -- Relative chance for industrial barrels to contain bleach. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 5
        IndustrialWeightBleach = 5,
        -- Relative chance for military barrels to be empty. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 55
        MilitaryWeightEmpty = 55,
        -- Relative chance for military barrels to contain clean water. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 10
        MilitaryWeightWater = 10,
        -- Relative chance for military barrels to contain tainted water. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 10
        MilitaryWeightTaintedWater = 10,
        -- Relative chance for military barrels to contain gasoline. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 25
        MilitaryWeightGasoline = 25,
        -- Relative chance for military barrels to contain bleach. Set to 0 to disable this result. Min: 0 Max: 1000 Default: 0
        MilitaryWeightBleach = 0,
        -- Relative chance for world-crafted barrels to be empty. Player-crafted barrels always start empty. Min: 0 Max: 1000 Default: 20
        CraftedWeightEmpty = 20,
        -- Relative chance for world-crafted barrels to contain clean water. Player-crafted barrels always start empty. Min: 0 Max: 1000 Default: 30
        CraftedWeightWater = 30,
        -- Relative chance for world-crafted barrels to contain tainted water. Player-crafted barrels always start empty. Min: 0 Max: 1000 Default: 20
        CraftedWeightTaintedWater = 20,
        -- Relative chance for world-crafted barrels to contain gasoline. Player-crafted barrels always start empty. Min: 0 Max: 1000 Default: 30
        CraftedWeightGasoline = 30,
        -- Relative chance for world-crafted barrels to contain bleach. Player-crafted barrels always start empty. Min: 0 Max: 1000 Default: 0
        CraftedWeightBleach = 0,
    },
    BartenderKenne = {
        -- When off, everyone pours a full glass and the Bartender trait only gives the Cooking boost and the recipes.
        TraitPourBonus = true,
        -- How much of the glass a character without the Bartender trait manages to serve. Min: 25 Max: 100 Default: 70
        AmateurPourPercent = 70,
        -- When off, cocktails only apply their alcohol level (vanilla drunk effects). Thirst, stress, fatigue, pain, flu, and other extra bonuses are disabled.
        CocktailBuffs = true,
    },
    NVFramework = {
        -- If disabled, Night Vision Framework items no longer require an installed battery, battery insert/remove options are hidden, and active goggles do not drain charge.
        BatterySystemEnabled = true,
        -- Scales how long installed NV batteries last. 1.0 = default, 10.0 = ten times longer, 0.5 = half as long. Min: 0.10 Max: 100.00 Default: 1.00
        BatteryDrainMultiplier = 1.0,
        -- Scales procedural spawn weights only for the example goggles included with Night Vision Framework. It does not affect other mods' NV items. 1.0 = default, 2.0 = twice the weight, 0.0 = no framework-added spawns. Min: 0.00 Max: 100.00 Default: 1.00
        ItemSpawnMultiplier = 0.7,
        -- If enabled, singleplayer uses the attached directional light cone helper. If disabled, singleplayer falls back to the lamppost-based lighting version instead.
        UseLightConeInSingleplayer = true,
    },
    BetterContainers = {
        -- Enables the Proximity Inventory system for this server.
        ProximityEnabled = true,
        -- Forces Proximity Inventory to operate in corpse-only mode. Players cannot switch modes.
        ForceCorpseOnly = false,
        -- Allows players to enable or disable Proximity Inventory via keybind or mod options.
        AllowToggleProximity = true,
        -- Allows players to switch between all-containers mode and corpse-only mode.
        AllowSwitchMode = true,
        -- Enables the Auto-Lock feature. When active, Proximity Inventory will snap back to the selected container unless intentionally changed.
        AutoLockEnabled = true,
        -- Allows players to enable or disable Auto-Lock via mod options.
        AllowToggleAutoLock = true,
    },
    BetterStomp = {
        -- Master switch. Turn off to disable the mod entirely.
        Enabled = true,
        -- How far in front of you a downed zombie can still be reached by a stomp. Value × 100 (sandbox doesn't allow decimals). 110 = 1.1 tile (default, recommended). Min: 30 Max: 300 Default: 110
        RangeX100 = 110,
        -- When ON, zombies briefly stunned (right after a shove) also count as stomp targets. OFF by default — keeps the mod focused on truly downed zombies.
        IncludeStaggered = false,
        -- When ON, zombies currently falling to the ground also count as stomp targets. OFF by default.
        IncludeFalling = false,
        -- Realistic: the stomp does normal damage — your strength, fitness and shoes matter, a tough zombie may survive. Lethal: instant kill, every time (v1.0 behavior). Default = Realistic
        -- 1 = Realistic
        -- 2 = Lethal
        ForceHitMode = 1,
        -- Writes mod activity to console.txt. Leave OFF in normal play.
        Debug = false,
    },
    Achievements = {
        -- Resets all achievements when the Player character dies. 
        ResetOnDeath = true,
        -- Resets all achievements when the Player changes between characters. 
        ResetOnSwitch = true,
        -- Play a sound effect when the Player completes an achievement. 
        PlaySound = true,
        -- How long (in game ticks/frames) the achievement popup will be displayed for.  Min: 10 Max: 10000 Default: 600
        DisplayDuration = 600,
        -- The keybind to toggle the Achievements window. MUST be ONLY ONE character.
        -- Default = O
        KeybindToggleWindow = "O",
    },
    DestroyBoulder = {
        -- When disabled, hides and blocks the crafting recipes added by Break Big Rocks, prevents its vanilla forge-recipe patches, and stops automatic Blacksmithing recipe unlocks. Enabled by default.
        EnableCraftingAdditions = true,
        -- Minimum number of rocks dropped per boulder. Min: 0 Max: 50 Default: 5
        RocksMin = 5,
        -- Maximum number of rocks dropped per boulder. Min: 0 Max: 50 Default: 5
        RocksMax = 5,
        -- Chance to drop an iron ore chunk when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        IronOreChance = 2,
        -- Minimum iron ore chunks dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        IronOreMin = 1,
        -- Maximum iron ore chunks dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        IronOreMax = 1,
        -- Chance to drop flint when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        FlintChance = 2,
        -- Minimum flint nodules dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        FlintMin = 1,
        -- Maximum flint nodules dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        FlintMax = 1,
        -- Chance to drop a large stone when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        LargeStoneChance = 2,
        -- Minimum large stones dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        LargeStoneMin = 1,
        -- Maximum large stones dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        LargeStoneMax = 1,
        -- Chance to drop an iron bloom when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        IronBloomChance = 2,
        -- Minimum iron blooms dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        IronBloomMin = 1,
        -- Maximum iron blooms dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        IronBloomMax = 1,
        -- Chance to drop aluminum fragments when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        AluminumFragmentsChance = 2,
        -- Minimum aluminum fragments dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        AluminumFragmentsMin = 1,
        -- Maximum aluminum fragments dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        AluminumFragmentsMax = 1,
        -- Chance to drop copper ore when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        CopperOreChance = 2,
        -- Minimum copper ore dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        CopperOreMin = 1,
        -- Maximum copper ore dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        CopperOreMax = 1,
        -- Chance to drop a flat stone when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        FlatStoneChance = 2,
        -- Minimum flat stones dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        FlatStoneMin = 1,
        -- Maximum flat stones dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        FlatStoneMax = 1,
        -- Chance to drop a stone block when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        StoneBlockChance = 2,
        -- Minimum stone blocks dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        StoneBlockMin = 1,
        -- Maximum stone blocks dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        StoneBlockMax = 1,
        -- Chance to drop a steel block when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        SteelBlockChance = 2,
        -- Minimum steel blocks dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SteelBlockMin = 1,
        -- Maximum steel blocks dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SteelBlockMax = 1,
        -- Chance to drop a steel piece when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        SteelPieceChance = 2,
        -- Minimum steel pieces dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SteelPieceMin = 1,
        -- Maximum steel pieces dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SteelPieceMax = 1,
        -- Chance to drop a steel slug when a boulder is destroyed. Min: 0 Max: 100 Default: 2
        SteelSlugChance = 2,
        -- Minimum steel slugs dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SteelSlugMin = 1,
        -- Maximum steel slugs dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SteelSlugMax = 1,
        -- Chance to drop a sharpening stone when a boulder is destroyed. Min: 0 Max: 100 Default: 10
        SharpenStoneChance = 10,
        -- Minimum sharpening stones dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SharpenStoneMin = 1,
        -- Maximum sharpening stones dropped when its chance succeeds. Min: 0 Max: 50 Default: 1
        SharpenStoneMax = 1,
        -- Number of completed mining actions between durability checks. Each check uses the same vanilla mechanism as pickaxes and sledgehammers. Min: 1 Max: 10 Default: 2
        ToolUsesPerConditionLoss = 2,
        -- When enabled, breaking a boulder generates a world sound that nearby zombies can hear. Disabled by default.
        MiningSoundsAttractZombies = false,
    },
    BundleUp = {
        -- Master spawn rate for every Bundle Up bundle, box, carton and sack. None keeps them out of world loot entirely (they can still be crafted), Normal is the mod default, Double makes them twice as common. Note: loot is rolled when an area is first generated, so changing this mid-save only affects places you have not visited yet. Default = Normal
        -- 1 = None
        -- 2 = Very Low
        -- 3 = Low
        -- 4 = Normal
        -- 5 = High
        -- 6 = Double
        SpawnDefault = 4,
        -- Soda six-packs in fridges, drink coolers and store shelves. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnSixPacks = 1,
        -- Food and snack cartons in gigamarts, grocery shelves, produce stands and grocery back rooms. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnFood = 1,
        -- Plank, sheet metal, pipe and bar bundles plus nail and screw boxes, in hardware stores and their store rooms. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnMaterials = 1,
        -- General supply boxes such as light bulbs, batteries, matches, glue, tissues and toiletries, in gigamarts, general stores and department storage. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnSupplies = 1,
        -- Fishing hook, line and lure boxes in fishing, camping and outdoor supply stores. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnFishing = 1,
        -- Bandage, pill and disinfectant boxes in pharmacies, medical storage and clinics. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnMedical = 1,
        -- Magazine and clip boxes in gun stores, army storage and police armouries. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnAmmo = 1,
        -- Boxes of seed packets in garden stores, farm storage and gigamart farming shelves. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnSeeds = 1,
        -- Scrap sacks and metal parts boxes in welding workshops and mechanic shops. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnScrap = 1,
        -- Gold and silver scrap sacks in jewelry stores, pawn shops and department stores. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnJewelry = 1,
        -- Book, paperback, magazine and reading material bundles in bookstores, libraries and magazine racks. Inherit default follows the master setting above. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnLiterature = 1,
        -- Weight reduction applied to any bundle with no category or per-item override. 17 matches vanilla, where a packed box weighs five sixths of its contents. 0 = bundle weighs the full base item weight x stack size. Min: 0 Max: 100 Default: 17
        ReductionDefault = 0,
        -- Reduction for metal bundles (nails, screws, scrap, wire, sheet metal, iron bars/pipes, lead pipes, copper & gold sheets, soda cans). -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionMetal = -1,
        -- Reduction for wood bundles (planks, branches, sticks, saplings, handles) and the wood-fuel sacks. -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionWood = -1,
        -- Reduction for stone bundles. -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionStone = -1,
        -- Reduction for food & snack cartons (flour, canned goods, produce, dairy, candy, condiments, seasonings). -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionFood = -1,
        -- Reduction for medical boxes (bandages, pills, tablets, first aid). -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionMedical = -1,
        -- Reduction for tanned hide bundles. -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionLeather = -1,
        -- Reduction for general supply boxes (household, electronics, hardware, cosmetics, fishing, fire-starting). -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionOther = -1,
        -- How fast food ages while packed inside a carton, as a percentage of the normal rate. 100 = packed food spoils exactly as if it were loose, fridges and freezers included. 0 = packing stops spoilage completely. Lower values stretch how long a carton keeps, so 50 makes one last twice as long as its contents would loose. Min: 0 Max: 100 Default: 100
        CartonSpoilRate = 100,
        -- Per-item override for Six-Pack of Apple Juice Boxes (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceBoxApplePack = -1,
        -- Per-item override for Six-Pack of Boxed Red Wine (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WineBoxPack = -1,
        -- Per-item override for Six-Pack of Brandy (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_BrandyPack = -1,
        -- Per-item override for Six-Pack of Champagne (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_ChampagnePack = -1,
        -- Per-item override for Six-Pack of Cheap Red Wine (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WineScrewtopPack = -1,
        -- Per-item override for Six-Pack of Chocolate Milk (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MilkChocSmallPack = -1,
        -- Per-item override for Six-Pack of Cider (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CiderPack = -1,
        -- Per-item override for Six-Pack of Coffee Liqueur (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CoffeeLiquerPack = -1,
        -- Per-item override for Six-Pack of Cranberry Juice (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceCranberryPack = -1,
        -- Per-item override for Six-Pack of Curacao (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CuracaoPack = -1,
        -- Per-item override for Six-Pack of Fine Red Wine (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WineAgedPack = -1,
        -- Per-item override for Six-Pack of Fruit Punch (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceFruitpunchPack = -1,
        -- Per-item override for Six-Pack of Fruit Punch Juice Boxes (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceBoxFruitpunchPack = -1,
        -- Per-item override for Six-Pack of Gin (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GinPack = -1,
        -- Per-item override for Six-Pack of Grape Juice (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceGrapePack = -1,
        -- Per-item override for Six-Pack of Grape Juice Boxes (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceBoxGrapePack = -1,
        -- Per-item override for Six-Pack of Grenadine (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GrenadinePack = -1,
        -- Per-item override for Six-Pack of Lemon Juice (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceLemonPack = -1,
        -- Per-item override for Six-Pack of Milk Bottles (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MilkBottlePack = -1,
        -- Per-item override for Six-Pack of Milk Cartons (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MilkPack = -1,
        -- Per-item override for Six-Pack of Orange Juice (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceOrangePack = -1,
        -- Per-item override for Six-Pack of Orange Juice Boxes (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceBoxOrangePack = -1,
        -- Per-item override for Six-Pack of Personal-sized Milk (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MilkSmallPack = -1,
        -- Per-item override for Six-Pack of Port (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PortPack = -1,
        -- Per-item override for Six-Pack of Red Wine (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WineRedPack = -1,
        -- Per-item override for Six-Pack of Rum (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_RumPack = -1,
        -- Per-item override for Six-Pack of Scotch (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_ScotchPack = -1,
        -- Per-item override for Six-Pack of Sherry (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SherryPack = -1,
        -- Per-item override for Six-Pack of Tequila (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_TequilaPack = -1,
        -- Per-item override for Six-Pack of Tomato Juice (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_JuiceTomatoPack = -1,
        -- Per-item override for Six-Pack of Vermouth (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_VermouthPack = -1,
        -- Per-item override for Six-Pack of Vodka (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_VodkaPack = -1,
        -- Per-item override for Six-Pack of Whiskey (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WhiskeyPack = -1,
        -- Per-item override for Six-Pack of White Wine (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WineWhitePack = -1,
        -- Per-item override for Bundle of Angus Calfskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfAngusR = -1,
        -- Per-item override for Bundle of Angus Calfskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfAngusSR = -1,
        -- Per-item override for Bundle of Angus Cowhide - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowAngusR = -1,
        -- Per-item override for Bundle of Angus Cowhide - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowAngusSR = -1,
        -- Per-item override for Bundle of Black Pigletskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletBlackR = -1,
        -- Per-item override for Bundle of Black Pigletskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletBlackSR = -1,
        -- Per-item override for Bundle of Black Pigskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigBlackR = -1,
        -- Per-item override for Bundle of Black Pigskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigBlackSR = -1,
        -- Per-item override for Bundle of Deer Hide - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideDeerR = -1,
        -- Per-item override for Bundle of Deer Hide - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideDeerSR = -1,
        -- Per-item override for Bundle of Fawn Hide - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideFawnR = -1,
        -- Per-item override for Bundle of Fawn Hide - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideFawnSR = -1,
        -- Per-item override for Bundle of Grey Rabbit Pelt - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitGreyR = -1,
        -- Per-item override for Bundle of Grey Rabbit Pelt - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitGreySR = -1,
        -- Per-item override for Bundle of Holstein Calfskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfHolsteinR = -1,
        -- Per-item override for Bundle of Holstein Calfskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfHolsteinSR = -1,
        -- Per-item override for Bundle of Holstein Cowhide - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowHolsteinR = -1,
        -- Per-item override for Bundle of Holstein Cowhide - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowHolsteinSR = -1,
        -- Per-item override for Bundle of Lambskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideLambR = -1,
        -- Per-item override for Bundle of Lambskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideLambSR = -1,
        -- Per-item override for Bundle of Landrace Pigletskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletLandraceR = -1,
        -- Per-item override for Bundle of Landrace Pigletskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletLandraceSR = -1,
        -- Per-item override for Bundle of Landrace Pigskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigLandraceR = -1,
        -- Per-item override for Bundle of Landrace Pigskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigLandraceSR = -1,
        -- Per-item override for Bundle of Large Crude Leather - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCrudeLargeR = -1,
        -- Per-item override for Bundle of Large Crude Leather - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCrudeLargeSR = -1,
        -- Per-item override for Bundle of Medium Crude Leather - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeMediumR = -1,
        -- Per-item override for Bundle of Medium Crude Leather - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeMediumSR = -1,
        -- Per-item override for Bundle of Rabbit Pelt - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitR = -1,
        -- Per-item override for Bundle of Rabbit Pelt - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitSR = -1,
        -- Per-item override for Bundle of Raccoon Pelt - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRaccoonR = -1,
        -- Per-item override for Bundle of Raccoon Pelt - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRaccoonSR = -1,
        -- Per-item override for Bundle of Sheepskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideSheepR = -1,
        -- Per-item override for Bundle of Sheepskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideSheepSR = -1,
        -- Per-item override for Bundle of Simmental Calfskin - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfSimmentalR = -1,
        -- Per-item override for Bundle of Simmental Calfskin - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfSimmentalSR = -1,
        -- Per-item override for Bundle of Simmental Cowhide - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowSimmentalR = -1,
        -- Per-item override for Bundle of Simmental Cowhide - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowSimmentalSR = -1,
        -- Per-item override for Bundle of Small Crude Leather - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeSmallR = -1,
        -- Per-item override for Bundle of Small Crude Leather - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeSmallSR = -1,
        -- Per-item override for Large Bundle of Angus Calfskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfAngusLR = -1,
        -- Per-item override for Large Bundle of Angus Calfskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfAngusLSR = -1,
        -- Per-item override for Large Bundle of Angus Cowhide - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowAngusLR = -1,
        -- Per-item override for Large Bundle of Angus Cowhide - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowAngusLSR = -1,
        -- Per-item override for Large Bundle of Black Pigletskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletBlackLR = -1,
        -- Per-item override for Large Bundle of Black Pigletskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletBlackLSR = -1,
        -- Per-item override for Large Bundle of Black Pigskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigBlackLR = -1,
        -- Per-item override for Large Bundle of Black Pigskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigBlackLSR = -1,
        -- Per-item override for Large Bundle of Deer Hide - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideDeerLR = -1,
        -- Per-item override for Large Bundle of Deer Hide - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideDeerLSR = -1,
        -- Per-item override for Large Bundle of Fawn Hide - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideFawnLR = -1,
        -- Per-item override for Large Bundle of Fawn Hide - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideFawnLSR = -1,
        -- Per-item override for Large Bundle of Grey Rabbit Pelt - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitGreyLR = -1,
        -- Per-item override for Large Bundle of Grey Rabbit Pelt - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitGreyLSR = -1,
        -- Per-item override for Large Bundle of Holstein Calfskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfHolsteinLR = -1,
        -- Per-item override for Large Bundle of Holstein Calfskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfHolsteinLSR = -1,
        -- Per-item override for Large Bundle of Holstein Cowhide - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowHolsteinLR = -1,
        -- Per-item override for Large Bundle of Holstein Cowhide - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowHolsteinLSR = -1,
        -- Per-item override for Large Bundle of Lambskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideLambLR = -1,
        -- Per-item override for Large Bundle of Lambskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideLambLSR = -1,
        -- Per-item override for Large Bundle of Landrace Pigletskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletLandraceLR = -1,
        -- Per-item override for Large Bundle of Landrace Pigletskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigletLandraceLSR = -1,
        -- Per-item override for Large Bundle of Landrace Pigskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigLandraceLR = -1,
        -- Per-item override for Large Bundle of Landrace Pigskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HidePigLandraceLSR = -1,
        -- Per-item override for Large Bundle of Large Crude Leather - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCrudeLargeLR = -1,
        -- Per-item override for Large Bundle of Large Crude Leather - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCrudeLargeLSR = -1,
        -- Per-item override for Large Bundle of Medium Crude Leather - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeMediumLR = -1,
        -- Per-item override for Large Bundle of Medium Crude Leather - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeMediumLSR = -1,
        -- Per-item override for Large Bundle of Rabbit Pelt - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitLR = -1,
        -- Per-item override for Large Bundle of Rabbit Pelt - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRabbitLSR = -1,
        -- Per-item override for Large Bundle of Raccoon Pelt - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRaccoonLR = -1,
        -- Per-item override for Large Bundle of Raccoon Pelt - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideRaccoonLSR = -1,
        -- Per-item override for Large Bundle of Sheepskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideSheepLR = -1,
        -- Per-item override for Large Bundle of Sheepskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideSheepLSR = -1,
        -- Per-item override for Large Bundle of Simmental Calfskin - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfSimmentalLR = -1,
        -- Per-item override for Large Bundle of Simmental Calfskin - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCalfSimmentalLSR = -1,
        -- Per-item override for Large Bundle of Simmental Cowhide - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowSimmentalLR = -1,
        -- Per-item override for Large Bundle of Simmental Cowhide - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_HideCowSimmentalLSR = -1,
        -- Per-item override for Large Bundle of Small Crude Leather - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeSmallLR = -1,
        -- Per-item override for Large Bundle of Small Crude Leather - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_HideCrudeSmallLSR = -1,
        -- Per-item override for Box of Half Steel Rods (20 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SteelRodHalfBox = -1,
        -- Per-item override for Box of Pierced Iron Blocks (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PiercedIronBlockBox = -1,
        -- Per-item override for Box of Pierced Iron Chunks (40 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PiercedIronChunkBox = -1,
        -- Per-item override for Box of Pierced Steel Blocks (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PiercedSteelBlockBox = -1,
        -- Per-item override for Box of Pierced Steel Chunks (40 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PiercedSteelChunkBox = -1,
        -- Per-item override for Box of Quarter Steel Rods (40 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SteelRodQuarterBox = -1,
        -- Per-item override for Box of Steel Slugs (200 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SteelSlugBox = -1,
        -- Per-item override for Brass Ingots Stack (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_BrassIngot_S = -1,
        -- Per-item override for Bundle of Copper Sheets (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CopperSheetSR = -1,
        -- Per-item override for Bundle of Copper Sheets (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CopperSheetR = -1,
        -- Per-item override for Bundle of Gold Sheets (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GoldSheetSR = -1,
        -- Per-item override for Bundle of Gold Sheets (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GoldSheetR = -1,
        -- Per-item override for Bundle of Iron Bars (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronBarSR = -1,
        -- Per-item override for Bundle of Iron Bars (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronBarR = -1,
        -- Per-item override for Bundle of Iron Pipes (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronPipesSR = -1,
        -- Per-item override for Bundle of Iron Pipes (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronPipesR = -1,
        -- Per-item override for Bundle of Lead Pipes (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LeadPipeSR = -1,
        -- Per-item override for Bundle of Lead Pipes (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LeadPipeR = -1,
        -- Per-item override for Bundle of Sheet Metal (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SheetMetalSR = -1,
        -- Per-item override for Bundle of Sheet Metal (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SheetMetalR = -1,
        -- Per-item override for Bundle of Small Metal Sheets (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SmallMetalSheetS = -1,
        -- Per-item override for Bundle of Steel Rods (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SteelRodSR = -1,
        -- Per-item override for Bundle of Steel Rods (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SteelRodR = -1,
        -- Per-item override for Bundle of Wire (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WireCable_Small = -1,
        -- Per-item override for Copper Ingots Stack (5 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_CopperIngot_S = -1,
        -- Per-item override for Gold Bars Stack (5 items). -1 = use the built-in 75%. Min: -1 Max: 100 Default: -1
        Item_GoldBar_S = -1,
        -- Per-item override for Iron Ingots Stack (5 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_IronIngot_S = -1,
        -- Per-item override for Large Brass Ingots Stack (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_BrassIngot_L = -1,
        -- Per-item override for Large Bundle of Copper Sheets (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CopperSheetLSR = -1,
        -- Per-item override for Large Bundle of Copper Sheets (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CopperSheetLR = -1,
        -- Per-item override for Large Bundle of Gold Sheets (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GoldSheetLSR = -1,
        -- Per-item override for Large Bundle of Gold Sheets (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GoldSheetLR = -1,
        -- Per-item override for Large Bundle of Iron Bars (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronBarLSR = -1,
        -- Per-item override for Large Bundle of Iron Bars (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronBarLR = -1,
        -- Per-item override for Large Bundle of Iron Pipes (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronPipesLSR = -1,
        -- Per-item override for Large Bundle of Iron Pipes (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_IronPipesLR = -1,
        -- Per-item override for Large Bundle of Lead Pipes (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LeadPipeLSR = -1,
        -- Per-item override for Large Bundle of Lead Pipes (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LeadPipeLR = -1,
        -- Per-item override for Large Bundle of Sheet Metal (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SheetMetalLSR = -1,
        -- Per-item override for Large Bundle of Sheet Metal (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SheetMetalLR = -1,
        -- Per-item override for Large Bundle of Small Metal Sheets (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SmallMetalSheetL = -1,
        -- Per-item override for Large Bundle of Steel Rods (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SteelRodLSR = -1,
        -- Per-item override for Large Bundle of Steel Rods (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SteelRodLR = -1,
        -- Per-item override for Large Bundle of Wire (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WireCable_Large = -1,
        -- Per-item override for Large Copper Ingots Stack (10 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_CopperIngot_L = -1,
        -- Per-item override for Large Gold Bars Stack (10 items). -1 = use the built-in 75%. Min: -1 Max: 100 Default: -1
        Item_GoldBar_L = -1,
        -- Per-item override for Large Iron Ingots Stack (10 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_IronIngot_L = -1,
        -- Per-item override for Large Pierced Iron Ingots Stack (10 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_PiercedIronIngot_L = -1,
        -- Per-item override for Large Pierced Steel Ingots Stack (10 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_PiercedSteelIngot_L = -1,
        -- Per-item override for Large Sack of Gold Scrap (100 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GoldScrap_Large = -1,
        -- Per-item override for Large Sack of Silver Scrap (100 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SilverScrap_Large = -1,
        -- Per-item override for Large Silver Bars Stack (10 items). -1 = use the built-in 50%. Min: -1 Max: 100 Default: -1
        Item_SilverBar_L = -1,
        -- Per-item override for Large Small Gold Bars Stack (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SmallGoldBar_L = -1,
        -- Per-item override for Large Small Silver Bars Stack (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SmallSilverBar_L = -1,
        -- Per-item override for Large Steel Ingots Stack (10 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_SteelIngot_L = -1,
        -- Per-item override for Medium Box of Nails (50 items). Defaults to 60 to match vanilla's own box of 100 nails. -1 = inherit category/default. Min: -1 Max: 100 Default: 60
        Item_NailsBox_Medium = -1,
        -- Per-item override for Medium Box of Screws (50 items). Defaults to 60 to match vanilla's own box of 100 nails. -1 = inherit category/default. Min: -1 Max: 100 Default: 60
        Item_ScrewsBox_Medium = -1,
        -- Per-item override for Pierced Iron Ingots Stack (5 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_PiercedIronIngot_S = -1,
        -- Per-item override for Pierced Steel Ingots Stack (5 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_PiercedSteelIngot_S = -1,
        -- Per-item override for Silver Bars Stack (5 items). -1 = use the built-in 50%. Min: -1 Max: 100 Default: -1
        Item_SilverBar_S = -1,
        -- Per-item override for Six-Pack of Assorted Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_VarietyPack = -1,
        -- Per-item override for Six-Pack of Blueberry Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_BlueberrySP = -1,
        -- Per-item override for Six-Pack of Bubblegum Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_BubblegumSP = -1,
        -- Per-item override for Six-Pack of Cola (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SodaPack = -1,
        -- Per-item override for Six-Pack of Diet Cola (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_DietSodaPack = -1,
        -- Per-item override for Six-Pack of Ginger Ale (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GingerAleSP = -1,
        -- Per-item override for Six-Pack of Grape Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GrapeSP = -1,
        -- Per-item override for Six-Pack of Imported Beer (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_BeerImportedPack = -1,
        -- Per-item override for Six-Pack of Lime Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LimeSP = -1,
        -- Per-item override for Six-Pack of Orange Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_OrangeSP = -1,
        -- Per-item override for Six-Pack of Pineapple Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PineappleSP = -1,
        -- Per-item override for Six-Pack of Strawberry Soda (6 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_StrawberrySP = -1,
        -- Per-item override for Small Box of Nails (25 items). Defaults to 60 to match vanilla's own box of 100 nails. -1 = inherit category/default. Min: -1 Max: 100 Default: 60
        Item_NailsBox_Small = -1,
        -- Per-item override for Small Box of Screws (25 items). Defaults to 60 to match vanilla's own box of 100 nails. -1 = inherit category/default. Min: -1 Max: 100 Default: 60
        Item_ScrewsBox_Small = -1,
        -- Per-item override for Small Gold Bars Stack (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SmallGoldBar_S = -1,
        -- Per-item override for Small Sack of Gold Scrap (50 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GoldScrap_Small = -1,
        -- Per-item override for Small Sack of Silver Scrap (50 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SilverScrap_Small = -1,
        -- Per-item override for Small Silver Bars Stack (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SmallSilverBar_S = -1,
        -- Per-item override for Steel Ingots Stack (5 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_SteelIngot_S = -1,
        -- Per-item override for Pack of Stone Blocks (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_StoneBlockPack = -1,
        -- Per-item override for Sack of Copper Ore (10 items). -1 = use the built-in 90%. Min: -1 Max: 100 Default: -1
        Item_CopperOreSack = -1,
        -- Per-item override for Sack of Flat Stones (10 items). -1 = use the built-in 60%. Min: -1 Max: 100 Default: -1
        Item_FlatStoneSack = -1,
        -- Per-item override for Sack of Hematite (25 items). -1 = use the built-in 40%. Min: -1 Max: 100 Default: -1
        Item_HematiteSack = -1,
        -- Per-item override for Sack of Iron Bloom (10 items). -1 = use the built-in 80%. Min: -1 Max: 100 Default: -1
        Item_IronBloomSack = -1,
        -- Per-item override for Sack of Iron Ore (10 items). -1 = use the built-in 90%. Min: -1 Max: 100 Default: -1
        Item_IronOreSack = -1,
        -- Per-item override for Sack of Large Hematite (25 items). -1 = use the built-in 70%. Min: -1 Max: 100 Default: -1
        Item_HematiteLargeSack = -1,
        -- Per-item override for Sack of Large Malachite (25 items). -1 = use the built-in 70%. Min: -1 Max: 100 Default: -1
        Item_MalachiteLargeSack = -1,
        -- Per-item override for Sack of Large Stones (10 items). -1 = use the built-in 90%. Min: -1 Max: 100 Default: -1
        Item_LargeStoneSack = -1,
        -- Per-item override for Sack of Limestone (25 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LimestoneSack = -1,
        -- Per-item override for Sack of Malachite (25 items). -1 = use the built-in 40%. Min: -1 Max: 100 Default: -1
        Item_MalachiteSack = -1,
        -- Per-item override for Sack of Quicklime (25 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_QuicklimeSack = -1,
        -- Per-item override for Sack of Sharpened Stones (25 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SharpedStoneSack = -1,
        -- Per-item override for Bundle of Large Branches (sheet rope) (5 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_LargeBranchSR = -1,
        -- Per-item override for Bundle of Large Branches (5 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_LargeBranchR = -1,
        -- Per-item override for Bundle of Large Handles (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LargeHandleSR = -1,
        -- Per-item override for Bundle of Large Handles (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LargeHandleR = -1,
        -- Per-item override for Bundle of Long Sticks (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LongStickSR = -1,
        -- Per-item override for Bundle of Long Sticks (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LongStickR = -1,
        -- Per-item override for Bundle of Medium Handles (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MediumHandleSR = -1,
        -- Per-item override for Bundle of Medium Handles (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MediumHandleR = -1,
        -- Per-item override for Bundle of Planks (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PlankSR = -1,
        -- Per-item override for Bundle of Planks (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PlankR = -1,
        -- Per-item override for Bundle of Railroad Ties - Rope (5 items). -1 = use the built-in 60%. Min: -1 Max: 100 Default: -1
        Item_LargePlankR = -1,
        -- Per-item override for Bundle of Railroad Ties - Sheet Rope (5 items). -1 = use the built-in 60%. Min: -1 Max: 100 Default: -1
        Item_LargePlankSR = -1,
        -- Per-item override for Bundle of Saplings (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SaplingSR = -1,
        -- Per-item override for Bundle of Saplings (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SaplingR = -1,
        -- Per-item override for Bundle of Tree Branches (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_TreeBranchSR = -1,
        -- Per-item override for Bundle of Tree Branches (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_TreeBranchR = -1,
        -- Per-item override for Bundle of Wooden Rods (sheet rope) (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WoodenRodSR = -1,
        -- Per-item override for Bundle of Wooden Rods (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WoodenRodR = -1,
        -- Per-item override for Large Bundle of Large Branches (sheet rope) (10 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_LargeBranchLSR = -1,
        -- Per-item override for Large Bundle of Large Branches (10 items). -1 = use the built-in 35%. Min: -1 Max: 100 Default: -1
        Item_LargeBranchLR = -1,
        -- Per-item override for Large Bundle of Large Handles (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LargeHandleLSR = -1,
        -- Per-item override for Large Bundle of Large Handles (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LargeHandleLR = -1,
        -- Per-item override for Large Bundle of Long Sticks (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LongStickLSR = -1,
        -- Per-item override for Large Bundle of Long Sticks (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_LongStickLR = -1,
        -- Per-item override for Large Bundle of Medium Handles (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MediumHandleLSR = -1,
        -- Per-item override for Large Bundle of Medium Handles (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_MediumHandleLR = -1,
        -- Per-item override for Large Bundle of Planks (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PlankLSR = -1,
        -- Per-item override for Large Bundle of Planks (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PlankLR = -1,
        -- Per-item override for Large Bundle of Railroad Ties - Rope (10 items). -1 = use the built-in 60%. Min: -1 Max: 100 Default: -1
        Item_LargePlankLR = -1,
        -- Per-item override for Large Bundle of Railroad Ties - Sheet Rope (10 items). -1 = use the built-in 60%. Min: -1 Max: 100 Default: -1
        Item_LargePlankLSR = -1,
        -- Per-item override for Large Bundle of Saplings (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SaplingLSR = -1,
        -- Per-item override for Large Bundle of Saplings (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SaplingLR = -1,
        -- Per-item override for Large Bundle of Tree Branches (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_TreeBranchLSR = -1,
        -- Per-item override for Large Bundle of Tree Branches (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_TreeBranchLR = -1,
        -- Per-item override for Large Bundle of Wooden Rods (sheet rope) (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WoodenRodLSR = -1,
        -- Per-item override for Large Bundle of Wooden Rods (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WoodenRodLR = -1,
        -- Per-item override for Large Sack of Coke (100 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_Coke_Large = -1,
        -- Per-item override for Sack of Charcoal (25 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_CharcoalSack = -1,
        -- Per-item override for Small Sack of Coke (50 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_Coke_Small = -1,
        -- Per-item override for Box of Black Pens (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PenBox_Black = -1,
        -- Per-item override for Box of Blue Pens (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PenBox_Blue = -1,
        -- Per-item override for Box of Green Pens (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PenBox_Green = -1,
        -- Per-item override for Box of Red Pens (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_PenBox_Red = -1,
        -- Per-item override for Bundle of Animal Feed Bags - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_AnimalFeedBagR = -1,
        -- Per-item override for Bundle of Animal Feed Bags - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_AnimalFeedBagSR = -1,
        -- Per-item override for Bundle of Clay Bags - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_ClaybagR = -1,
        -- Per-item override for Bundle of Clay Bags - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_ClaybagSR = -1,
        -- Per-item override for Bundle of Compost Bags - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_CompostBagR = -1,
        -- Per-item override for Bundle of Compost Bags - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_CompostBagSR = -1,
        -- Per-item override for Bundle of Concrete Powder - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_ConcretePowderR = -1,
        -- Per-item override for Bundle of Concrete Powder - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_ConcretePowderSR = -1,
        -- Per-item override for Bundle of Dirt Bags - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_DirtbagR = -1,
        -- Per-item override for Bundle of Dirt Bags - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_DirtbagSR = -1,
        -- Per-item override for Bundle of Fertilizer Bags - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_FertilizerBagR = -1,
        -- Per-item override for Bundle of Fertilizer Bags - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_FertilizerBagSR = -1,
        -- Per-item override for Bundle of Gas Cans (sheet rope) (4 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GasCanSR = -1,
        -- Per-item override for Bundle of Gas Cans (4 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GasCanR = -1,
        -- Per-item override for Bundle of Glass Panels - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GlassPanelR = -1,
        -- Per-item override for Bundle of Glass Panels - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GlassPanelSR = -1,
        -- Per-item override for Bundle of Grass Bags - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GrassBagR = -1,
        -- Per-item override for Bundle of Grass Bags - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GrassBagSR = -1,
        -- Per-item override for Bundle of Gravel Bags - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GravelbagR = -1,
        -- Per-item override for Bundle of Gravel Bags - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GravelbagSR = -1,
        -- Per-item override for Bundle of Plaster Powder - Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_PlasterPowderR = -1,
        -- Per-item override for Bundle of Plaster Powder - Sheet Rope (5 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_PlasterPowderSR = -1,
        -- Per-item override for Bundle of Sandbags - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SandbagR = -1,
        -- Per-item override for Bundle of Sandbags - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SandbagSR = -1,
        -- Per-item override for Bundle of Wallpaper Paste - Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WallpaperPasteR = -1,
        -- Per-item override for Bundle of Wallpaper Paste - Sheet Rope (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WallpaperPasteSR = -1,
        -- Per-item override for Large Bundle of Animal Feed Bags - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_AnimalFeedBagLR = -1,
        -- Per-item override for Large Bundle of Animal Feed Bags - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_AnimalFeedBagLSR = -1,
        -- Per-item override for Large Bundle of Clay Bags - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_ClaybagLR = -1,
        -- Per-item override for Large Bundle of Clay Bags - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_ClaybagLSR = -1,
        -- Per-item override for Large Bundle of Compost Bags - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_CompostBagLR = -1,
        -- Per-item override for Large Bundle of Compost Bags - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_CompostBagLSR = -1,
        -- Per-item override for Large Bundle of Concrete Powder - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_ConcretePowderLR = -1,
        -- Per-item override for Large Bundle of Concrete Powder - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_ConcretePowderLSR = -1,
        -- Per-item override for Large Bundle of Dirt Bags - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_DirtbagLR = -1,
        -- Per-item override for Large Bundle of Dirt Bags - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_DirtbagLSR = -1,
        -- Per-item override for Large Bundle of Fertilizer Bags - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_FertilizerBagLR = -1,
        -- Per-item override for Large Bundle of Fertilizer Bags - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_FertilizerBagLSR = -1,
        -- Per-item override for Large Bundle of Glass Panels - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GlassPanelLR = -1,
        -- Per-item override for Large Bundle of Glass Panels - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GlassPanelLSR = -1,
        -- Per-item override for Large Bundle of Grass Bags - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GrassBagLR = -1,
        -- Per-item override for Large Bundle of Grass Bags - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GrassBagLSR = -1,
        -- Per-item override for Large Bundle of Gravel Bags - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GravelbagLR = -1,
        -- Per-item override for Large Bundle of Gravel Bags - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_GravelbagLSR = -1,
        -- Per-item override for Large Bundle of Plaster Powder - Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_PlasterPowderLR = -1,
        -- Per-item override for Large Bundle of Plaster Powder - Sheet Rope (10 items). -1 = use the built-in 20%. Min: -1 Max: 100 Default: -1
        Item_PlasterPowderLSR = -1,
        -- Per-item override for Large Bundle of Sandbags - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SandbagLR = -1,
        -- Per-item override for Large Bundle of Sandbags - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_SandbagLSR = -1,
        -- Per-item override for Large Bundle of Wallpaper Paste - Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WallpaperPasteLR = -1,
        -- Per-item override for Large Bundle of Wallpaper Paste - Sheet Rope (10 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_WallpaperPasteLSR = -1,
        -- Per-item override for Sack of Clay (25 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_ClaySack = -1,
        -- Per-item override for Sack of Sacks (5 items). -1 = inherit category/default. Min: -1 Max: 100 Default: -1
        Item_Sack_Sack = -1,
        -- Boxes and cartons of Guns of Marz magazines in gun stores, army storage and police armouries. High capacity ones only spawn while Guns of Marz spawns high capacity mags. Inherit default follows the Bundle Up master setting. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnGoMMagazines = 1,
        -- Cartons of 40mm rounds in army storage. Only spawns while Guns of Marz spawns explosives. Inherit default follows the Bundle Up master setting. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnGoMGrenades = 1,
        -- Boxes and cartons of weapon repair packs in gun stores, tool stores, mechanics and army bunkers. Inherit default follows the Bundle Up master setting. Default = Inherit default
        -- 1 = Inherit default
        -- 2 = None
        -- 3 = Very Low
        -- 4 = Low
        -- 5 = Normal
        -- 6 = High
        -- 7 = Double
        SpawnGoMRepairPacks = 1,
        -- Reduction for Guns of Marz magazine, 40mm and repair pack boxes, cartons and crates. -1 = inherit the default. Min: -1 Max: 100 Default: -1
        ReductionGoM = -1,
    },
    CaffeineMakesSense = {
        -- When enabled, caffeine degrades sleep through slower overnight fatigue recovery and planner-aware longer sleep. Turn this off to keep CMS awake masking while leaving sleep penalty-free.
        EnableSleepPenaltyModel = true,
    },
    CarryingCapacityTweak = {
        -- Enable or disable the mod.
        Enabled = true,
        -- Select the maximum carry capacity a character reaches at Strength 10. Default = 50 kg
        -- 1 = 10 kg
        -- 2 = 20 kg
        -- 3 = 30 kg
        -- 4 = 40 kg
        -- 5 = 50 kg
        -- 6 = 60 kg
        -- 7 = 70 kg
        -- 8 = 80 kg
        -- 9 = 100 kg
        MaxCapAtStr10 = 7,
        -- Check carry capacity more frequently to reduce conflicts with other mods. Multiplayer remains server authoritative.
        ForceThisModsCapacity = true,
    },
    CashForGas = {
        -- Min: 0.10 Max: 100.00 Default: 1.00
        CostPerLiter = 1.5,
        -- Min: 0 Max: 10 Default: 5
        HackElecReq = 5,
        -- Min: 0 Max: 10 Default: 2
        HackMechReq = 2,
        -- Min: 0.00 Max: 1.00 Default: 0.05
        HackAttemptAlarmRisk = 0.05,
        -- Min: 0.00 Max: 1.00 Default: 0.50
        HackFinalAlarmRisk = 0.5,
    },
    ChoppedVehicleSalvage = {
        -- Multiplier applied to the base burnt vehicle removal time when salvaging a normal vehicle. Min: 0.50 Max: 10.00 Default: 2.00
        SalvageDurationMultiplier = 2.0,
        -- Minimum number of installed parts guaranteed to be recovered. -1 means maximum eligible parts are always recovered. Min: -1 Max: 20 Default: 0
        MinPartsDropped = 0,
        -- Maximum number of installed parts that can be recovered. -1 means no limit. Zero disables part recovery entirely. Min: -1 Max: 20 Default: -1
        MaxPartsDropped = -1,
        -- Minimum Metal Welding skill level required to salvage a vehicle. Zero means no requirement. Min: 0 Max: 10 Default: 3
        MinWeldingLevel = 3,
        -- Minimum Mechanics skill level required to salvage a vehicle. Zero means no requirement. Min: 0 Max: 10 Default: 0
        MinMechanicsLevel = 0,
    },
    CivilDefenseSirens = {
        -- Place sirens at the built-in coordinates on load
        AutoPlace = true,
        -- Your list of siren locations as x,y pairs, e.g. 2054,6248; 799,9789. Separators don't matter. Leave blank to use the built-in list
        SirenCoords = "",
        -- Who can start/stop sirens in multiplayer. 'Listed roles' uses the Control Roles list below. Single player always uses the Electrical skill Default = Listed roles
        -- 1 = Listed roles
        -- 2 = Everyone
        -- 3 = Players with Electrical skill
        ControlAccess = 1,
        -- Comma-separated access level or role names that may start and stop sirens (used with 'Listed roles'). Works with custom roles
        ControlRoles = "admin",
        -- Comma-separated access level or role names that can add/remove and start/stop all sirens. Works with custom roles
        AdminRoles = "admin",
        -- Electrical skill level needed to start/stop sirens. Used in SP and MP when access is set to 'Players with Electrical skill'. 0 = no skill Min: 0 Max: 10 Default: 6
        ControlElectricalLevel = 6,
        -- Sirens only work while the power grid is on. Applies to automatic and manual activation
        RequirePower = true,
        -- How long sirens keep working after the power shuts off. 0 = no backup battery Min: 0 Max: 24 Default: 6
        BatteryBackupMonths = 6,
        -- Chance for the sirens to go off when a thunderstorm begins. 0 = never Min: 0 Max: 100 Default: 2
        StormChance = 2,
        -- How far a running siren's world sound reaches to attract zombies, in tiles. 0 = does not attract zombies Min: 0 Max: 1000 Default: 75
        SoundRadius = 125,
        -- How far the siren sound carries. First number = tiles kept at full volume, second = the distance it can still be heard before cutting off Default = 75 / 200 tiles
        -- 1 = 50 / 100 tiles
        -- 2 = 75 / 200 tiles
        -- 3 = 100 / 300 tiles
        -- 4 = 150 / 500 tiles
        -- 5 = 200 / 700 tiles
        -- 6 = 250 / 1000 tiles
        -- 7 = 350 / 1300 tiles
        -- 8 = 450 / 1600 tiles
        -- 9 = 550 / 1800 tiles
        -- 10 = 650 / 2000 tiles
        SoundProfile = 5,
        -- Every player hears a running siren no matter how far away it is. Past the point where it would normally fade out it holds at the minimum volume below, and still comes from the siren's direction. Nearer than that nothing changes
        GlobalAudible = false,
        -- How loud a siren stays once you are too far away to normally hear it. 100 = full volume at any distance. Only used when sirens are audible everywhere Min: 50 Max: 100 Default: 50
        GlobalMinVolume = 50,
        -- How long a siren sounds before winding down. Extends the wail. The windup and winddown are fixed length Min: 5 Max: 600 Default: 90
        RunSeconds = 90,
        -- Force a sleeping player awake while a siren is sounding within the wake radius below
        WakeSleepers = true,
        -- How close a sounding siren must be to wake up a sleeping player. 0 = never wake up Min: 0 Max: 300 Default: 100
        WakeRadius = 250,
        -- Automatically activate all sirens on a recurring schedule, like a routine civil defense test. Fires at the test hour picked below Default = None
        -- 1 = None
        -- 2 = Daily
        -- 3 = Weekly (Wednesday)
        -- 4 = Twice monthly (1st & 15th)
        -- 5 = Monthly (first Wednesday)
        TestSchedule = 1,
        -- Hour of the day the scheduled test activates. 0 = midnight, 12 = noon Min: 0 Max: 23 Default: 12
        TestHour = 12,
        -- If off, the scheduled test plays the siren for players but does not draw zombies. Manual and storm activations are unaffected
        TestAttractsZombies = false,
    },
    CommonSense = {
        -- Print server output.
        Debug = false,
        -- Toggles the ability to pick up obvious stuff off the ground, such as twigs, rocks, weeds, bushes, etc.
        ObviousCollecting = true,
        -- Toggles whether removing obvious stuff off the ground such as twigs, rocks, weeds, bushes, etc. will grant the Player the item they just removed.
        DisableLoot = false,
        -- Multiplies the amount of loot the Player receives when picking obvious stuff off the ground. Min: 0.00 Max: 100.00 Default: 1.00
        LootMultiplier = 1.0,
        -- Toggles whether Players can pry open doors, windows, etc. using a Crowbar.
        PryingMechanic = true,
        -- Determines the difficulty of prying open objects with a crowbar.
        -- A higher multiplier makes it more difficult to pry open objects successfully, while a lower multiplier makes it easier.
        -- 0 = Always Succeed.
        -- 1 = Default Difficulty.
        -- 5 = Highest Difficulty. Min: 0.00 Max: 5.00 Default: 1.00
        PryingChanceMultiplier = 1.0,
        -- Toggles whether Players can pry open building doors, such as doors on houses, apartments, etc.
        PryBuildingDoors = true,
        -- Toggles whether Players can pry open building windows, such as windows on houses, apartments, etc.
        PryWindows = true,
        -- Determines the chance of breaking the glass of a window when a Player fails an attempt to pry it open. Min: 0 Max: 100 Default: 20
        WindowShatterChance = 20,
        -- Toggles whether Players can pry open garage doors.
        PryGarageDoors = true,
        -- Toggles whether Players can pry open vehicle doors.
        PryVehicleDoors = true,
        -- Determines whether Players can accidentally smash Vehicle door windows when failing to pry them open.
        -- If enabled, this can happen at random (Based on the Window Shatter Chance setting).
        ShatterVehicleWindows = true,
        -- Toggles whether Players can pry open reinforced doors (Prison doors, metal grid doors, etc.)
        -- These doors cannot be pried open unless the Player has a Strength level equal to or higher than the Min. Reinforced Door Level.
        PrySafeDoors = false,
        -- Determines the Minimum level of Strength at which Players can pry open reinforced doors (Prison doors, metal grid doors, etc.) Min: 0 Max: 10 Default: 8
        ReinforcedDoorLevel = 8,
        -- Toggles a custom User Interface that displays a gun's ammunition type, current ammo, state, etc. when one is equipped.
        GunStats = true,
        -- Chance to get injured when opening cans with knives or scissors. Min: 0 Max: 100 Default: 33
        CanWoundChance = 10,
        -- Enables/disables the menu to directly replace dirty bandages.
        ReplaceBandage = true,
        -- Enables/disables the menu for washing only equipped or unequipped items.
        WashOnly = true,
        -- Enables/disables the menu to automatically reload all selected magazines.
        ReloadAllMags = true,
        StairsAlert = true,
    },
    CoolerBag = {
        -- Min: 0 Max: 100 Default: 1
        chance = 1,
        -- Min: 0 Max: 100 Default: 1
        batteryCapacityUpgradeChance = 1,
        -- Min: 0 Max: 100 Default: 1
        ovenBagUpgradeChance = 1,
    },
    CrowbarScrewdriverEntry = {
        -- Master switch for the whole mod: crowbar prying, screwdriver lockpicking and bolt cutters. Turn off to fully disable it.
        EnableEntryActions = true,
        -- Master switch for the crowbar. Allow prying locked doors, windows and garage doors open. The toggles below narrow it down by target.
        EnablePrySystem = true,
        -- Allow prying locked vehicle doors and hatches open with a crowbar.
        EnableVehicleDoorPry = true,
        -- Allow crowbar prying on garage and roll-up doors.
        EnableGarageDoorPry = true,
        -- Allow prying reinforced/security doors (vault doors, etc). Requires the Strength level set below. Off by default.
        EnableReinforcedDoorPry = false,
        -- Minimum Strength level needed to attempt prying a reinforced door with a crowbar. Applies to the first forced entry only - a door already forced once stays accessible. Set to 0 to require no Strength at all. Min: 0 Max: 10 Default: 8
        ReinforcedDoorStrengthRequired = 8,
        -- Scales crowbar success chance. 1.0 = normal, 2.0 = double, 0.5 = half. Min: 0.25 Max: 2.00 Default: 1.00
        PrySuccessMultiplier = 1.0,
        -- Scales the noise radius generated by prying. Higher values attract more zombies. Min: 0.25 Max: 3.00 Default: 1.00
        PryNoiseMultiplier = 1.0,
        -- Master switch for the screwdriver. Allow quietly picking locked doors and vehicle doors. The toggles below narrow it down by target.
        EnableScrewdriverLockpick = true,
        -- Allow picking locked vehicle doors and hatches with a screwdriver.
        EnableVehicleDoorLockpick = true,
        -- Allow screwdriver lockpicking on garage and roll-up doors.
        EnableGarageDoorLockpick = true,
        -- Allow picking reinforced/security doors (vault doors, etc) with a screwdriver. Requires the Nimble level set below. Off by default, so security doors stay a late-game target.
        EnableReinforcedDoorLockpick = false,
        -- Minimum Nimble level needed to attempt picking a reinforced door with a screwdriver. Applies to the first forced entry only - a door already forced once stays accessible. Set to 0 to require no Nimble at all. Min: 0 Max: 10 Default: 6
        ReinforcedDoorLockpickNimbleRequired = 6,
        -- Scales screwdriver success chance. 1.0 = normal, 2.0 = double. Min: 0.25 Max: 2.00 Default: 1.00
        LockpickSuccessMultiplier = 1.0,
        -- Scales the (small) noise radius from lockpicking. Default 0.4 = very quiet. Min: 0.10 Max: 1.00 Default: 0.40
        LockpickNoiseMultiplier = 0.4,
        -- Master switch for bolt cutters. Allow cutting the lock off a locked door or gate. Louder than a screwdriver, more reliable than a crowbar. The toggles below narrow it down by target.
        EnableBoltCutter = true,
        -- Allow cutting the lock off garage and roll-up doors with bolt cutters.
        EnableGarageDoorBoltCut = true,
        -- Allow bolt cutters on reinforced/security doors. Independent of the crowbar and screwdriver toggles above, and on by default: a chain and padlock give way to the tool even where muscle and patience wouldn't.
        EnableReinforcedDoorBoltCut = true,
        -- Minimum Strength level needed to cut a reinforced door open with bolt cutters. Applies to the first forced entry only. Default 0: the leverage is the tool's, not the survivor's - raise it if you want cutters gated too. Min: 0 Max: 10 Default: 0
        ReinforcedDoorBoltCutStrengthRequired = 0,
        -- Scales bolt cutter success chance for both locks and fences. 1.0 = normal, 2.0 = double. Min: 0.25 Max: 2.00 Default: 1.00
        BoltCutSuccessMultiplier = 1.0,
        -- Scales the noise radius from cutting locks and fences. Bolt cutters are the loudest of the three tools by default. Min: 0.25 Max: 3.00 Default: 1.00
        BoltCutNoiseMultiplier = 1.0,
        -- Allow cutting a hole through wire-mesh and barbed-wire fence panels with bolt cutters. The panel is removed and its wire is salvaged.
        EnableFenceCutting = true,
        -- Scales how long cutting a fence panel takes. Higher values mean a longer, riskier job. Min: 0.50 Max: 3.00 Default: 1.00
        FenceCutTimeMultiplier = 1.0,
        -- Drop the panel's wire (and barbed wire) at your feet after cutting through it. Turn off to make fence cutting purely a way in, with nothing to gain.
        EnableFenceSalvage = true,
        -- Scales how long every entry action takes - prying, lockpicking and bolt cutting alike. Higher values mean longer, riskier jobs. Fence cutting scales this further with its own multiplier. Min: 0.25 Max: 3.00 Default: 1.00
        ActionTimeMultiplier = 1.0,
        -- Scales condition loss on crowbars, screwdrivers and bolt cutters when an attempt fails. 0.0 = tools never wear out. Min: 0.00 Max: 3.00 Default: 1.00
        ToolWearOnFailMultiplier = 1.0,
        -- Chance of a minor hand injury when a crowbar or bolt cutter attempt fails. 0.0 = disabled, 1.0 = guaranteed. Min: 0.00 Max: 1.00 Default: 0.10
        InjuryChance = 0.1,
        -- How much damage a failed attempt does to the hand when it injures you. 0 = no damage at all. Min: 0 Max: 20 Default: 5
        InjuryDamage = 5,
    },
    CutThatTree = {
        -- When enabled, characters need the selected Axe skill level to start the minigame.
        RequireAxeSkill = false,
        -- Used only when Require Axe skill is enabled. Min: 0 Max: 10 Default: 2
        RequiredAxeSkillLevel = 2,
        -- Maximum distance from the tree before the minigame closes. Min: 0.80 Max: 3.00 Default: 2.00
        MaxTreeDistance = 2.0,
        -- Hides the vanilla Cut Down Tree context option, leaving Cut That Tree! as the chopping interaction.
        DisableVanillaTreeCut = false,
        -- Higher values shrink timing zones and speed up the marker. Min: 0.50 Max: 2.00 Default: 1.00
        DifficultyMultiplier = 1.0,
        -- Changes how much successful hits advance the chop. Min: 0.25 Max: 3.00 Default: 1.00
        TreeDamageMultiplier = 1.0,
        -- Changes endurance spent by each minigame strike. Min: 0.00 Max: 3.00 Default: 1.00
        EnduranceUseMultiplier = 1.0,
        -- Changes condition loss chance for axes and chopping tools. Min: 0.00 Max: 3.00 Default: 1.00
        ToolConditionWearMultiplier = 1.0,
        -- Changes how quickly chopping tools lose sharpness. Min: 0.00 Max: 3.00 Default: 1.00
        SharpnessLossMultiplier = 1.0,
        -- Changes how much combo increases marker speed. Min: 0.00 Max: 3.00 Default: 1.00
        ComboSpeedMultiplier = 1.0,
        -- Sound radius created by a red-zone swing. Higher values attract zombies from farther away. Min: 0 Max: 80 Default: 28
        RedNoiseRadius = 28,
    },
    DirtyHands = {
        Enabled = true,
        -- Min: 0.25 Max: 3.00 Default: 1.00
        DirtGainMultiplier = 0.75,
        -- Min: 0.00 Max: 3.00 Default: 1.00
        EffectsMultiplier = 0.85,
        BloodSmellAttractsZombies = false,
        ZombificationFromDirtyCare = false,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        ZombificationChance = 1.0,
    },
    JustDrugsDLC = {
        -- Ammonia, Pheny, Ethanol, Potassium and other compounds. 100 is the balanced default, 50 is half, 200 is double, and 0 disables this category. Min: 0 Max: 300 Default: 100
        CompoundBottleLootPercent = 85,
        -- Global modifier for Doobie Drug Den items on zombie corpses. 100 is the balanced default, 50 is half, 200 is double, and 0 disables zombie drug loot. Category percentages also apply. Min: 0 Max: 300 Default: 100
        ZombieDrugLootPercent = 70,
        -- Shrooms and Acid. 100 is the balanced default, 50 is half, 200 is double, and 0 disables this category. Min: 0 Max: 300 Default: 100
        HallucinogenLootPercent = 45,
        -- Inhalable and deodorant drugs. 100 is the balanced default, 50 is half, 200 is double, and 0 disables this category. Min: 0 Max: 300 Default: 100
        InhalableDrugLootPercent = 50,
        -- Cocaine, Heroin, Fentanyl, Meth and similar drugs. 100 is the balanced default, 50 is half, 200 is double, and 0 disables this category. Min: 0 Max: 300 Default: 100
        PowderDrugLootPercent = 60,
        -- Ayahuasca, Khat, Peyote, Devil's Breath and Jenkem ingredients. 100 is the balanced default, 50 is half, 200 is double, and 0 disables these plants. Min: 0 Max: 300 Default: 100
        ForageableDrugLootPercent = 40,
        -- Ibuprofen, Vicodin, Tramadol, Xanax and similar drugs. 100 is the balanced default, 50 is half, 200 is double, and 0 disables this category. Min: 0 Max: 300 Default: 100
        PharmaceuticalLootPercent = 45,
        -- Narcan, Loperamide and Bismuth. 100 is the balanced default, 50 is half, 200 is double, and 0 disables this category. Min: 0 Max: 300 Default: 100
        DetoxDrugLootPercent = 45,
        -- Only Drug Addict Trait increases Boredom Every Hour, so this helps configuring it. Min: 1 Max: 99 Default: 3
        BoredomIncrement = 3,
        -- Number of in-game days an addicted player must remain sober. Consuming an addictive drug resets this progress. Min: 1 Max: 9999 Default: 21
        SuperarAddicion = 21,
        -- Amount of accumulated overdose toxicity removed naturally from each player every in-game hour. Set to 0 to disable natural recovery. Detox items reduce toxicity separately. Min: 0 Max: 100 Default: 2
        OverdoseReductionPerHour = 2,
        -- Books that teach drug crafting recipes. 100 is the balanced default, 50 is half, 200 is double, and 0 disables these books. Min: 0 Max: 300 Default: 100
        ChemistryBookLootPercent = 70,
        -- Empty drug bags used for crafting. 100 is the balanced default, 50 is half, 200 is double, and 0 disables this category. Min: 0 Max: 300 Default: 100
        EmptyDrugBagLootPercent = 70,
        -- Duration for mild psychedelic trips in in-game hours (1-12). Min: 1 Max: 12 Default: 1
        MildTripHours = 2,
        -- Duration for heavy psychedelic trips in in-game hours (1-12). Min: 1 Max: 12 Default: 2
        HeavyTripHours = 3,
    },
    RSWaterCistern = {
        -- Percent speed for filling, emptying and pumping water. 100 keeps the default timing. Min: 25 Max: 300 Default: 100
        PumpSpeedMultiplier = 100,
        -- Percent speed for refueling, filling gas cans and transferring gasoline to/from fuel tankers. 200 makes fuel tankers fill twice as fast as water tanks. Min: 25 Max: 500 Default: 200
        FuelTransferSpeedMultiplier = 200,
        -- Percent wear applied to water filters when filtering tank water. 0 disables filter wear. Min: 0 Max: 300 Default: 100
        FilterDamageMultiplier = 100,
        -- Allows players to drink directly from water tank trucks.
        AllowDrinkFromTank = true,
        -- Allows players to dump a tank's water onto the ground from the vehicle menu.
        AllowEmptyTank = true,
        -- Adds transfer previews, output quality and after-action amounts to water tank tooltips.
        ShowDetailedTooltips = true,
        -- Allows water tanks to store one fluid type at a time from fluid containers. Water pump actions still only handle water.
        AllowAnyFluidInWaterTank = false,
    },
    RVAddon = {
        -- Comma-separated list of vehicle script names (e.g., Base.Van,Base.StepVan,Base.VanSpiffo).
        CustomNormalVehicles = "",
        -- Comma-separated list of bus vehicle script names.
        CustomBusVehicles = "",
        -- Comma-separated list of small vehicle script names.
        CustomSmallVehicles = "",
        -- Comma-separated list of 3x2 caravan/trailer script names.
        Custom3x2Caravan = "",
        -- Comma-separated list of 3x6 caravan/trailer script names.
        Custom3x6Caravan = "",
        -- Comma-separated list of 3x7 empty trailer script names.
        Custom3x7Empty = "",
        -- Comma-separated list of 4x12 colossal vehicle script names.
        Custom4x12colossal = "",
    },
    DownButNotOut = {
        -- Module for making players go down to a non-combative state when their health drops below a set threshold. Configure at DBNO - Knockdowns page.
        KnockdownEnable = true,
        -- Module for allowing players to preserve their characters after a death. Configure at DBNO - Respawns page.
        WoundsEnable = true,
        -- Health a player must drop under to be knocked down, in percentage. Min: 1 Max: 50 Default: 10
        KnockdownThreshold = 10,
        -- Adds a timer until a guaranteed death. Keeps ticking even if the player disconnects to prevent exploitation.
        BleedoutTimer = true,
        -- How much time a player can spend downed before dying, in seconds. Min: 30 Max: 3600 Default: 300
        KnockdownDurationSec = 300,
        -- Whether a downed player is able to crawl or is stuck in place.
        MoveWhileDowned = true,
        -- On prevents all damage while downed. Off stops the bleeding but leaves you vulnerable to further attacks from zombies and players. Drain takes your health away until death, increasing the bleedout rate if you crawl. Default = On
        -- 1 = Off
        -- 2 = On
        -- 3 = Drain
        KnockdownHoldMode = 2,
        -- Health buffer the player gets when downed, in percentage. Min: 1 Max: 50 Default: 50
        KnockdownHoldHP = 50,
        -- While downed and not invulnerable, a player can still be hit by other players until finished off.
        DownedPlayerKill = false,
        -- While downed and not invulnerable, a player can still be hit by other zombies until finished off. If disabled, zombies will ignore downed players instead.
        DownedZombieKill = false,
        -- Health lost per minute while downed and invulnerability is set to drain. Min: 1 Max: 100 Default: 2
        KnockdownDrainHpPerMin = 2,
        -- The amount of time it takes a player to bring a downed player back up, in milliseconds. Min: 20 Max: 2000 Default: 200
        KnockdownReviveTime = 200,
        -- The health a player is set to after being helped from a downed state, in percentage. Min: 1 Max: 100 Default: 30
        KnockdownReviveHP = 30,
        -- If enabled, adds a 'Knockdown' counter for the amount of times a player has been recently downed. After three, the player cannot be helped back up.
        KnockdownCounters = true,
        -- The time it takes to lose a knockdown from the counter, in minutes. Min: 1 Max: 10080 Default: 15
        KnockdownHealingMin = 15,
        -- Adds a 'Wound' counter for the amount of times a player has recently died. At three, death will result in a permanent character loss. Set to 0 for unlimited wounds, with no counter shown. Min: 0 Max: 3 Default: 3
        WoundAmount = 3,
        -- The amount of time it takes to lose a wound (recover a life), in minutes. Set to 0 to never recover. Min: 0 Max: 10080 Default: 60
        WoundsHealingMin = 60,
        -- When respawning, the player keeps all their previous wounds in a treated stage (bandages, splinted, etc).
        RespawnWithInjuries = true,
        -- When respawning, cures the player from the Knox Infection.
        ReviveCureInfection = true,
        -- Manual: players interact with an applicable tile to save and restore their skills, less prone to issues. Immersive: players save their skill progress when sleeping, and is automatically restored on a respawn. Off: skills lost cannot be restored. Default = Manual
        -- 1 = Manual
        -- 2 = Immersive
        -- 3 = Off
        SkillRestoreMode = 1,
        -- How much of the skill experience is restored, in percentage. Does not apply to an overkill rescue, which always restores in full. Min: 1 Max: 100 Default: 90
        SkillRecoveryPct = 90,
        -- Cooldown between manual saves. Set to 0 to disable. Min: 0 Max: 240 Default: 5
        SaveCooldownMin = 5,
        -- Lets the player set their own respawn point at a save point.
        EnableSetRespawnPoint = true,
        -- Any bed can be used as a save point to record character skills, restore character skills, and change respawn location via right click menu (manual mode).
        UseBedsAsSaveRestoreRespawn = true,
        -- Additional tiles that count as save points, separated by semicolons. Example: furniture_bedding_01_32;my_mod_tile_01
        CustomTiles = "furniture_bedding_01_32",
        -- Default: When a player dies, all their items are left behind safely stored in a cache. Worn Clothes: If the player can respawn, it brings them back with the clothes they were wearing. Everything: If the player can respawn, it brings them back with all their items. Custom: If the player can respawn, it brings them back only with the specified items. Default = Default
        -- 1 = Default
        -- 2 = Worn Clothes
        -- 3 = Everything
        -- 4 = Custom
        RespawnClothes = 1,
        -- Full items IDs separated by semicolons, used when the setting above is Custom. Wearable items are automatically equipped, anything else goes to the inventory. Example: Base.Tshirt_White;Base.Trousers_White
        RespawnClothesCustom = "Base.Tshirt_White;Base.Trousers_White",
        -- Temporal: Only the owner can access this cache for a set amount of time. On: Only the owner can ever access their own cache. Off: Anyone can access the cache at any time. Default = Temporal
        -- 1 = Temporal
        -- 2 = On
        -- 3 = Off
        CacheOwnerLock = 1,
        -- How long a death cache can only be interacted with by the player who died, in minutes. Min: 0 Max: 1440 Default: 60
        LootLockMin = 60,
        -- The cache is left in the world permanently instead of decaying.
        DeathCacheNoDespawn = false,
        -- How long a cache remains unlocked before disappearing, in minutes. Min: 0 Max: 1440 Default: 60
        LootDeleteAfterUnlockMin = 60,
    },
    KyoCrash = {
        -- The percentage chance of a dynamic event occurring every hour. Min: 0 Max: 100 Default: 5
        GlobalChance = 5,
        -- The probability weight of the 2-Car Crash event being selected. Min: 0 Max: 100 Default: 20
        WeightCarCrash = 20,
        -- The probability weight of the Zombie Hit event being selected. Min: 0 Max: 100 Default: 30
        WeightZombieHit = 30,
        -- The probability weight of the Deer Hit event being selected. Min: 0 Max: 100 Default: 10
        WeightDeerHit = 10,
        -- Comma-separated list of vehicle IDs to NOT spawn in events (e.g., Base.VanAmbulance, Base.StepVanMail).
        ExcludedVehicles = "Base.81deloreanDMC12BTTF",
    },
    Efficiency = {
        -- Actions entered here will not be affected by the time modification applied by the mod.
        actionFilter = "ISAddAnimalInTrailer|ISAttachAnimalToPlayer|ISAttachAnimalToTree|ISButcherAnimal|ISCutAnimalOnHook|ISFeedAnimalFromHand|ISGatherBloodFromAnimal|ISGetAnimalBones|ISGiveWaterToAnimal|ISHutchCleanFloor|ISHutchCleanNest|ISHutchGrabAnimal|ISHutchGrabCorpseAction|ISHutchGrabEgg|ISKillAnimal|ISKillAnimalInInventory|ISLureAnimal|ISMilkAnimal|ISOpenAnimalInfo|ISOpenButcherHookUI|ISPetAnimal|ISPickupAnimal|ISPutAnimalInHutch|ISPutAnimalOnHook|ISRemoveAnimalFromHook|ISRemoveAnimalFromTrailer|ISRemoveHeadFromAnimal|ISRemoveLeatherFromAnimal|ISRemoveMeatFromAnimal|ISShearAnimal|ISToggleHutchDoor|ISToggleHutchEggHatchDoor",
        EnableGrindLimit = true,
        -- Min: 0.10 Max: 1.00 Default: 0.90
        GrindLimitIndex = 0.9,
        -- Min: 1 Max: 100 Default: 10
        GrindLimitThreshold = 10,
        -- WARNING! 
        -- Setting this value too low may BREAK some actions. This is the minimum time an action must take to be affected by the mod. Example: smoking takes 460 time units. If you set this value to 470, smoking and faster actions won't be affected by efficiency. Min: 5 Max: 1000 Default: 20
        DefaultTimeLimit = 20,
        -- Min: 0.10 Max: 10.00 Default: 2.00
        Level0 = 2.0,
        -- Min: 0.10 Max: 10.00 Default: 1.80
        Level1 = 1.8,
        -- Min: 0.10 Max: 10.00 Default: 1.40
        Level2 = 1.4,
        -- Min: 0.10 Max: 10.00 Default: 1.00
        Level3 = 1.0,
        -- Min: 0.10 Max: 10.00 Default: 0.90
        Level4 = 0.9,
        -- Min: 0.10 Max: 10.00 Default: 0.80
        Level5 = 0.8,
        -- Min: 0.10 Max: 10.00 Default: 0.70
        Level6 = 0.7,
        -- Min: 0.10 Max: 10.00 Default: 0.60
        Level7 = 0.6,
        -- Min: 0.10 Max: 10.00 Default: 0.50
        Level8 = 0.5,
        -- Min: 0.10 Max: 10.00 Default: 0.40
        Level9 = 0.4,
        -- Min: 0.10 Max: 10.00 Default: 0.30
        Level10 = 0.3,
    },
    EffortlessTowing42 = {
        -- Multiplier for the towing force applied by standard vehicles. Set to 0 to disable the assist for this class. Min: 0.00 Max: 10.00 Default: 4.00
        StandardFactor = 4.0,
        -- Multiplier for the towing force applied by heavy duty vehicles. Set to 0 to disable the assist for this class. Min: 0.00 Max: 10.00 Default: 5.00
        HeavyDutyFactor = 5.0,
        -- Multiplier for the towing force applied by sport vehicles. Set to 0 to disable the assist for this class. Min: 0.00 Max: 10.00 Default: 3.00
        SportFactor = 3.0,
    },
    EscapeKnoxCounty = {
        -- Number of in-game days before the rescue extraction sequence can begin. Min: 0 Max: 30 Default: 0
        ExtractionAfterDays = 0,
        -- Difficulty affects the loot rate of clues and the success conditions of the final phase. 1: Normal, 2: Hard, 3: Very Hard, 4: Insane. Default = Normal
        -- 1 = Normal
        -- 2 = Hard
        -- 3 = Very Hard
        -- 4 = Insane
        Difficulty = 1,
        -- 1: Random, 2: Riverside Police Station, 3: Louisville Hippodrome. Default = Random
        -- 1 = Random
        -- 2 = Riverside
        -- 3 = Louisville site 1
        -- 4 = Louisville site 2
        -- 5 = Louisville site 3
        -- 6 = Westpoint
        -- 7 = Muldraugh
        ExtractionSite = 1,
        -- If enabled, the extraction site will rotate after an extraction has succeeded.
        RotateExtractionSite = false,
        -- Enables debug shortcuts and debug-only actions for the mod.
        DebugAllowAll = false,
    },
    Excrementum = {
        -- How much time is needed to pass the stomach.
        -- Default is realistic. Min: 0.00 Max: 100.00 Default: 1.00
        StomachMultiplier = 1.0,
        -- How much food leaves stomach in form of chyme every 10 ingame minutes. Min: 1.00 Max: 100.00 Default: 10.00
        ChymeMultiplier = 10.0,
        -- Ingame minutes to pass the intestine
        -- (between the stomach and the colon). Min: 0.00 Max: 3000.00 Default: 300.00
        DefecateIntMinutes = 300.0,
        -- How much time must pass to start Colon Threshold moving down. Min: 0.00 Max: 5000.00 Default: 1320.00
        ColonMinutes = 1320.0,
        -- The colon percentage of fullness for urge to defecate.
        -- Some food may change this threshold. Min: 50.00 Max: 150.00 Default: 80.00
        ColonBaseThreshold = 80.0,
        -- Urine production multiplier from drunk water.
        -- Default is 1:1, where 10 thirst units = 100 ml.
        -- Also affects diuretic effect. Min: 0.00 Max: 10.00 Default: 1.00
        UrinateIncreaseMultiplier = 1.0,
        -- Passive urine production multiplier from metabolism.
        -- By default ~ 30% from all production (if no perks, no cold etc). Min: 0.00 Max: 10.00 Default: 1.00
        UrinatePassiveMultiplier = 1.0,
        -- The volume of stomach that keeps green moodle which restores health. Min: 50.00 Max: 500.00 Default: 50.00
        StomachVolume = 50.0,
        -- The stomach may be distended. Max capacity is 'Stomach Volume' plus this.
        -- Character won't accept food over maximum capacity. Min: 50.00 Max: 1000.00 Default: 100.00
        AdditionalStomachVolume = 100.0,
        -- Regen overlay is allowed for clients.
        -- They will be able to turn it on/off and change position by client options.
        OverlayIsAllowed = true,
        -- Status window is allowed for clients.
        -- They will be able to turn it on/off, switch to bars, change position etc.
        EnabledStatusBars = true,
        -- How the shame is enabled (including multiplayer). Default = Retexture Auto Detect
        -- 1 = Off
        -- 2 = Retexture Auto Detect
        -- 3 = Always On
        -- 4 = On even in god mode
        Shame = 2,
        -- Enable or disable the automatic vomiting system.
        VomitEnabled = true,
        -- Disables Lifestyle mod's BladderNeed system so it does not conflict with Excrementum.
        -- Also integrates the shower/bathtub to clean Excrementum's dirt data.
        -- Requires Lifestyle mod to be active.
        LifestylePatch = true,
        -- Which animation plays when unclogging the toilet with the plunger. Default = Mod (Plunger)
        -- 1 = Mod (Plunger)
        -- 2 = Bucket (Pour water)
        UnclogAnim = 1,
    },
    ExpandedHotwire = {
        AllowHotwire = true,
        AllowHotwireBurglar = true,
        -- Min: 0 Max: 10 Default: 1
        HotwireElectricity = 1,
        -- Min: 0 Max: 10 Default: 2
        HotwireMechanics = 2,
        -- Min: 0 Max: 2147483647 Default: 200
        HotwireBaseDuration = 200,
        -- Min: -2147483647 Max: 2147483647 Default: 3
        HotwireElectricityScalar = 3,
        -- Min: -2147483647 Max: 2147483647 Default: 0
        HotwireMechanicsScalar = 0,
        AllowUnHotwire = true,
        -- Min: 0 Max: 10 Default: 1
        UnHotwireElectricity = 1,
        -- Min: 0 Max: 10 Default: 2
        UnHotwireMechanics = 2,
        -- Min: 0 Max: 2147483647 Default: 200
        UnHotwireBaseDuration = 200,
        -- Min: -2147483647 Max: 2147483647 Default: 3
        UnHotwireElectricityScalar = 3,
        -- Min: -2147483647 Max: 2147483647 Default: 0
        UnHotwireMechanicsScalar = 0,
        AllowKeyCrafting = true,
        -- Min: 0 Max: 10 Default: 2
        KeyCraftingElectricity = 2,
        -- Min: 0 Max: 10 Default: 4
        KeyCraftingMechanics = 4,
        -- Min: 0 Max: 10 Default: 6
        KeyCraftingMetalWelding = 6,
        -- Min: 0 Max: 2147483647 Default: 2000
        KeyCraftingBaseDuration = 2000,
        -- Min: -2147483647 Max: 2147483647 Default: 1
        KeyCraftingElectricityScalar = 1,
        -- Min: -2147483647 Max: 2147483647 Default: 2
        KeyCraftingMechanicsScalar = 2,
        -- Min: -2147483647 Max: 2147483647 Default: 3
        KeyCraftingMetalWeldingScalar = 3,
    },
    ExpandedVehicleStorageB42 = {
        -- Multiplies the capacity of all vanilla vehicle trunks and cargo compartments. Default = Double - x2
        -- 1 = Vanilla - x1
        -- 2 = Double - x2
        -- 3 = Large - x4
        -- 4 = Very Large - x6
        -- 5 = Extreme - x10
        VehicleCargoCapacityMultiplier = 2,
        -- Controls how cargo above the vanilla capacity affects vehicle mass and handling. Vanilla keeps the full weight. Reduced counts half of the extra weight. Ignored counts no extra weight above vanilla capacity. Default = Vanilla
        -- 1 = Vanilla
        -- 2 = Reduced
        -- 3 = Ignored
        ExtraCargoWeightHandling = 1,
    },
    ExtendedBurnTratement = {
        -- Multiplier vs a normal bandage. 1.0 = same as vanilla, 1.5 = 50% faster. Default 1.5. Only applies while the ointment bandage is clean. Min: 1.00 Max: 5.00 Default: 1.50
        BandageSpeedMult = 1.5,
        -- Multiplier vs a normal bandage. 1.0 = same as vanilla, 1.25 = 25% faster. Default 1.25. Only applies while the ointment rag is clean. Min: 1.00 Max: 5.00 Default: 1.25
        RagSpeedMult = 1.25,
        -- Pain relief while Anestesico from an ointment bandage is active. 1.0 = none, 2.0 = half pain. Default 2.0. Min: 1.00 Max: 5.00 Default: 2.00
        BandagePainMult = 2.0,
        -- Pain relief while Anestesico from an ointment rag is active. 1.0 = none, 1.5 = ~33% less pain. Default 1.5. Min: 1.00 Max: 5.00 Default: 1.50
        RagPainMult = 1.5,
        -- Pain relief while Anestesico from applying ointment directly is active. Default 1.5. Min: 1.00 Max: 5.00 Default: 1.50
        DirectPainMult = 1.5,
        -- If ON: with Anestesico active on a lower-body burn, movement becomes a light limp. Default ON.
        LegBurnMobility = true,
        -- If ON: with Anestesico active on a hand/arm burn, reduces the vanilla attack speed and damage penalties. Default ON.
        ArmBurnCombat = true,
    },
    FancyHandwork = {
        -- Aiming skill at which the character switches to the tactical aiming animation. <LINE> Set to 0 to always use it. Set to 11 to never use it. Min: 0 Max: 11 Default: 3
        ExperiencedAim = 3,
        -- While standing still, the character turns to face the object being interacted with after this many seconds. <LINE> Requires the turn delay option to be enabled. Min: 0.01 Max: 60.00 Default: 1.00
        TurnDelaySec = 1.0,
        -- Controls when your character is forced to turn towards objects during a world interaction. Default = Do forced turn after turn delay
        -- 1 = Never do forced turn
        -- 2 = Do forced turn after turn delay
        -- 3 = Always do forced turn
        DisableTurn = 2,
        -- How often the character reaches behind instead of turning around. <LINE> The character still turns towards objects that have no rear animation, unless forced turning is disabled. <LINE> Turn delay or disabled turning must be selected for rear animations to appear - 'Always do forced turn' prevents them. Default = Do rear animations until turn delay
        -- 1 = Never do rear animations
        -- 2 = Do rear animations until turn delay
        -- 3 = Always do rear animations
        TurnBehavior = 2,
        -- Hides the progress bar shown while opening or closing a vehicle door, and while entering or exiting a vehicle.
        HideDoorProgressBar = false,
        -- Hides the progress bar shown while the character walks over to a vehicle to interact with it.
        HideVehicleWalkProgressBar = false,
        -- Poses the item held in the off hand instead of leaving it to the vanilla animation. <LINE> Turn this off if you use another animation mod such as Tactical Hold and the two fight over the left arm.
        EnableLeftHandAiming = true,
    },
    FarmingQOL = {
        -- Choose one growth mode. Custom percentages below are used only when Custom is selected. Default = Balanced — recommended
        -- 1 = Vanilla — original crop timings
        -- 2 = Gentle — slightly faster
        -- 3 = Balanced — recommended
        -- 4 = Fast — substantially faster
        -- 5 = Approx. 30-Day Harvest
        -- 6 = Approx. 7-Day Harvest
        -- 7 = Custom — use percentages below
        GrowthPreset = 3,
        -- Used only with Custom. 100% = vanilla. Lower is faster; higher is slower. Mainly radishes in Build 42.20. Min: 1 Max: 200 Default: 75
        CustomStandardPercent = 75,
        -- Used only with Custom. 100% = vanilla. Lower is faster. Includes many vegetables and grains. Min: 1 Max: 200 Default: 50
        CustomLongPercent = 50,
        -- Used only with Custom. 100% = vanilla. Lower is faster. Includes many herbs and long-growing crops. Min: 1 Max: 200 Default: 35
        CustomVeryLongPercent = 35,
        -- Writes crop timing details to console.txt.
        DebugLogging = false,
        -- Adds debug-only crop inspection and testing actions to the right-click menu.
        EnableTestTools = false,
    },
    FRUsedCars = {
        LowConPartsFall = true,
        PartFallsWithParent = true,
    },
    FirstAidOverhaul = {
        -- If enabled, when a Player injects Antizin, it will reset their Knox Infection timer (Zombification %) instead of outright curing them. 
        AntizinDoesntCure = false,
        -- Display cheaty info of wounds when at Level 8 or higher. 
        ShowDebugInfo = true,
        -- From this level onward, the Player will be able to treat fractures.  Min: 0 Max: 10 Default: 1
        FractureTreatmentLevel = 1,
        -- From this level onward, the Player will be able to stitch wounds.  Min: 0 Max: 10 Default: 2
        StitchingTreatmentLevel = 2,
        -- From this level onward, the Player won't have a chance to fail wound treatments.  Min: 0 Max: 10 Default: 4
        FailureLevelThreshold = 4,
        -- The chance of failure when treating wounds.  Min: 0 Max: 100 Default: 30
        FailureChance = 30,
        -- How much disease percentage you can get from a single infected wound.  Min: 0 Max: 100 Default: 26
        MaxDiseasePerWound = 26,
        -- How much disease percentage you can get from all infected wounds combined.  Min: 0 Max: 100 Default: 100
        InfectionDiseaseLimit = 100,
        -- How many in-game minutes before you can practice first aid on corpses again.  Min: 1 Max: 1440 Default: 60
        PracticeCooldown = 60,
        -- How much XP the Player receives when performing this practice in a corpse.  Min: 1 Max: 1000 Default: 10
        BandagePracticeXP = 10,
        -- How much XP the Player receives when performing this practice in a corpse.  Min: 1 Max: 1000 Default: 25
        SuturePracticeXP = 25,
        -- How much XP the Player receives when performing this practice in a corpse.  Min: 1 Max: 1000 Default: 50
        StudyPracticeXP = 50,
        -- How much XP the Player receives when performing this practice in a corpse.  Min: 1 Max: 1000 Default: 75
        ScalpelPracticeXP = 75,
        -- Makes wound treatment faster or slower.  Min: 0.10 Max: 5.00 Default: 1.00
        SpeedMultiplier = 1.0,
    },
    PeixesBRX = {
        -- Every item dropped on the ground keeps its original 3D model instead of becoming a sprite (atlas photo). Much better visuals, but heavier when entering new areas with lots of items on the ground. Disable on low-end PCs if you notice FPS drops.
        Mundo3D = true,
    },
    FightZ = {
        -- Fully reading the first Fists manual unlocks Aspiring Fighter if the character has no fist combat trait. Works with or without Traits As Skills and gives no free Fists levels. Completed reading in existing saves also qualifies.
        LearnAspirantFromBook = true,
        -- Use custom sounds for normal hits, critical hits and missed punches. Disabled uses the vanilla sounds.
        CustomPunchSounds = true,
        -- Multiplies the final damage dealt to zombies by FightZ punches. The default value 1.00 preserves the current damage balance. Min: 0.10 Max: 5.00 Default: 1.00
        FistDamageMultiplier = 1.0,
        -- Muscle strain multiplier added for every consecutive punch. The default value adds 0.05 per hit; 0 disables combo growth. Min: 0.00 Max: 0.50 Default: 0.05
        ComboMuscleStrainStep = 0.05,
    },
    FixCarryCapacityB42 = {
        ServerEnforced = false,
        PlayerCapacityEnabled = true,
        -- Min: 1 Max: 100 Default: 100
        PlayerCapacity = 100,
        IgnoreEncumbrance = false,
        BagsEnabled = false,
        -- Min: 1 Max: 49 Default: 49
        BagCapacity = 49,
        -- Min: 0 Max: 99 Default: 99
        BagWeightReduction = 99,
    },
    Footprints = {
        -- How long a footprint lasts before it fades, in in-game minutes (1440 = 1 day) Min: 60 Max: 4320 Default: 1440
        BaseLifespan = 1440,
        -- Maximum number of footprints tracked at once before the oldest are evicted - lower is better for performance Min: 25 Max: 400 Default: 150
        MaxFootprints = 150,
        -- Whether zombies leave footprints in snow
        ZombieFootprints = true,
        -- Footprints made behind your back (by other players or unseen zombies) only appear once you actually look at that tile, instead of instantly
        RevealOnLook = true,
        -- Snow and wind intensity speed up footprint fade when enabled
        WeatherErosion = true,
    },
    Footwork = {
        -- Controls how quickly Footwork is learned while moving in a combat stance. Default = Normal
        -- 1 = Slow
        -- 2 = Normal
        -- 3 = Fast
        XPSpeed = 2,
    },
    GetSalt = {
        -- This checkbox does nothing, it's just informational.
        SaltChunkYieldInfo = true,
        -- Minimum number of Salt Chunks given by one salt lick. Min: 1 Max: 50 Default: 4
        MinimumSaltChunks = 4,
        -- Maximum number of Salt Chunks given by one salt lick. If this is lower than the minimum, the two values are swapped. If it's the same, you'll get the same number of salt chunks every time. Min: 1 Max: 50 Default: 8
        MaximumSaltChunks = 8,
    },
    GoresSVU4Core = {
        -- When enabled, SVU4 blocks new SVU4 armor installation on detected KI5 / that DAMN Library vehicles so their native armor system can be used instead.
        BlockAllSVU4ArmorOnKI5Vehicles = false,
        -- Controls how quickly installed armor loses health when it absorbs damage. 1.0 = normal, 0.5 = half damage to armor (lasts longer), 2.0 = double damage to armor (wears out faster). This does not change the protection percentage. Min: 0.25 Max: 3.00 Default: 1.00
        ArmorDurabilityMultiplier = 1.0,
        -- Share of each incoming hit absorbed by Scrap armor while armor health remains. The rest reaches the vanilla vehicle part. If the hit destroys the armor, excess damage can still pass through. 100% is full absorption only until the armor is exhausted. Min: 0 Max: 100 Default: 15
        ScrapProtectionPercent = 15,
        -- Share of each incoming hit absorbed by Standard armor while armor health remains. The rest reaches the vanilla vehicle part. If the hit destroys the armor, excess damage can still pass through. 100% is full absorption only until the armor is exhausted. Min: 0 Max: 100 Default: 35
        StandardProtectionPercent = 35,
        -- Share of each incoming hit absorbed by Reinforced armor while armor health remains. The rest reaches the vanilla vehicle part. If the hit destroys the armor, excess damage can still pass through. 100% is full absorption only until the armor is exhausted. Min: 0 Max: 100 Default: 60
        ReinforcedProtectionPercent = 60,
        -- Share of each incoming hit absorbed by Apocalypse armor while armor health remains. The rest reaches the vanilla vehicle part. If the hit destroys the armor, excess damage can still pass through. 100% is full absorption only until the armor is exhausted. Min: 0 Max: 100 Default: 80
        ApocalypseProtectionPercent = 80,
        -- Multiplies materials used by SVU4 armor installation and repair. 1.0 = normal cost, 0.5 = half cost, 2.0 = double cost. Final item counts are rounded by the armor recipe system. Min: 0.25 Max: 3.00 Default: 1.00
        MaterialCostMultiplier = 1.0,
        -- Multiplies MetalWelding and Mechanics XP awarded by SVU4 armor actions. 1.0 = normal XP, 0 = no SVU4 armor XP, 2.0 = double XP. Min: 0.00 Max: 5.00 Default: 1.00
        XPRewardMultiplier = 1.0,
        -- Multiplies the radius of noise created by SVU4 armor work. 1.0 = normal radius, 0 = silent, 2.0 = twice the noise radius. Min: 0.00 Max: 3.00 Default: 1.00
        SoundRadiusMultiplier = 1.0,
        -- Multiplies the extra vehicle mass added by installed SVU4 armor. 1.0 = normal added weight, 0.5 = half, 2.0 = double. Has no effect when Enable Armor Weight is off. Min: 0.00 Max: 3.00 Default: 1.00
        ArmorWeightMultiplier = 1.0,
        -- Multiplies fuel loss from a punctured gas tank after its armor is destroyed. 1.0 = normal leak rate, 0.5 = half, 2.0 = double, 0 = disable leaking. Min: 0.00 Max: 5.00 Default: 1.00
        GasLeakRateMultiplier = 1.0,
        -- Condition damage applied to the vanilla Gas Tank at the moment gas-tank armor is destroyed. 0 = no direct puncture damage; 100 = up to 100 condition points. Min: 0 Max: 100 Default: 20
        GasTankPunctureDamage = 20,
        -- Vanilla Gas Tank condition required before an active SVU4 fuel leak is cleared. Example: 90 means repair the tank to at least 90 condition. Min: 1 Max: 100 Default: 90
        GasTankLeakClearCondition = 90,
        -- Chance used when rolling random worn Scrap armor for eligible survivor vehicles. This is a per-roll grade chance, not a guaranteed percentage of all vehicles. Min: 0.00 Max: 100.00 Default: 8.00
        RandomArmorScrapChance = 8.0,
        -- Chance used when rolling random worn Standard armor for eligible survivor vehicles. This is a per-roll grade chance, not a guaranteed percentage of all vehicles. Min: 0.00 Max: 100.00 Default: 4.00
        RandomArmorStandardChance = 4.0,
        -- Chance used when rolling random worn Reinforced armor for eligible survivor vehicles. This is a per-roll grade chance, not a guaranteed percentage of all vehicles. Min: 0.00 Max: 100.00 Default: 2.00
        RandomArmorReinforcedChance = 2.0,
        -- Chance used when rolling random worn Apocalypse armor for eligible survivor vehicles. This is a per-roll grade chance, not a guaranteed percentage of all vehicles. Min: 0.00 Max: 100.00 Default: 0.50
        RandomArmorApocalypseChance = 0.5,
        -- Minimum starting health percentage for a randomly spawned worn armor panel. If this is set above Maximum Health, SVU4 automatically swaps the two values. Min: 1 Max: 100 Default: 10
        RandomArmorMinHealth = 10,
        -- Maximum starting health percentage for a randomly spawned worn armor panel. If this is set below Minimum Health, SVU4 automatically swaps the two values. Min: 1 Max: 100 Default: 65
        RandomArmorMaxHealth = 65,
        -- Maximum number of random worn armor panels that an eligible survivor vehicle can receive. This is a cap, not a guaranteed number of panels. Min: 1 Max: 32 Default: 1
        RandomArmorMaxPanels = 1,
        -- Allows eligible world-spawned vehicles to receive random worn SVU4 armor panels. Does not add armor to every vehicle. Server-authoritative in multiplayer.
        EnableRandomSurvivorArmor = false,
        -- When enabled, SVU4 armor installation and repair enforce their configured MetalWelding and Mechanics skill requirements. Turning this off does not remove material costs.
        EnableSkillRequirements = true,
        -- When enabled, installed SVU4 armor adds vehicle mass using the Installed Armor Weight Multiplier. When disabled, SVU4 armor adds no extra vehicle mass.
        EnableArmorWeight = true,
        -- Writes SVU4 armor installs, repairs, removals, rejected actions and gas-leak events to the server/admin log. This does not enable debug console spam.
        EnableAdminLogs = true,
        -- Controls batch armor installation only. Single install disables batch install. One-grade batch allows several panels of one armor grade at a time. Full multi-install allows mixed armor grades in the same queued batch. Default = Full multi-install
        -- 1 = Single install only
        -- 2 = Batch, one grade only
        -- 3 = Full multi-install
        MultiInstallMode = 3,
        -- Maximum number of armor actions queued by one batch command. Applies to batch install, repair and removal. It does not limit normal single actions. Default = 10 actions
        -- 1 = 3 actions
        -- 2 = 5 actions
        -- 3 = 10 actions
        -- 4 = Unlimited
        MaxQueuedActions = 3,
        -- Allows new Scrap armor installations. Existing Scrap armor remains removable and repairable unless another compatibility rule blocks the action.
        EnableScrapArmorGrade = true,
        -- Allows new Standard armor installations. Existing Standard armor remains removable and repairable unless another compatibility rule blocks the action.
        EnableStandardArmorGrade = true,
        -- Allows new Reinforced armor installations. Existing Reinforced armor remains removable and repairable unless another compatibility rule blocks the action.
        EnableReinforcedArmorGrade = true,
        -- Allows new Apocalypse armor installations. Existing Apocalypse armor remains removable and repairable unless another compatibility rule blocks the action.
        EnableApocalypseArmorGrade = true,
    },
    GIPT = {
        -- Min: 1 Max: 1000 Default: 100
        LargeTankCapacity = 100,
        -- Min: 1 Max: 100 Default: 8
        SmallTankCapacity = 8,
        -- Min: 1 Max: 6 Default: 3
        InteractionDistance = 3,
        -- Min: 1 Max: 12 Default: 4
        BulkDeliveryRange = 4,
        IndestructibleInstallations = true,
    },
    GridZone = {
        -- Radius in tiles that a town generator covers. Default: 150 Min: 50 Max: 10000 Default: 150
        PowerRadius = 150,
        -- How much fuel the generator consumes per in-game hour. Default: 1.0 Min: 0.10 Max: 10.00 Default: 1.00
        FuelConsumptionPerHour = 1.0,
        -- How much condition the generator loses per in-game hour. Set to 0 to disable. Default: 0.5 Min: 0.00 Max: 5.00 Default: 0.50
        DegradationPerHour = 0.5,
    },
    HK_416 = {
        -- If disabled, the HK416, magazines and attachments will not be added to loot tables.
        EnableHK416Loot = true,
        -- Chooses the language used by the colored HK416 attachment and weapon tooltips. Default = ENGLISH
        -- 1 = ENGLISH
        -- 2 = DEUTSCH
        TooltipLanguage = 1,
        -- Base spawn weight in army weapon and ammunition storage. 0 disables HK416 loot in military containers. Min: 0.00 Max: 10.00 Default: 3.00
        MilitaryLoot = 2.0,
        -- Base spawn weight in gun store rifle shelves. 0 disables HK416 loot in gun stores. Min: 0.00 Max: 10.00 Default: 2.00
        GunStoreLoot = 1.5,
        -- Base spawn weight in police weapon and ammunition storage. 0 disables HK416 loot in police containers. Min: 0.00 Max: 10.00 Default: 1.00
        PoliceLoot = 0.8,
        -- Multiplier for HK416 rifle spawns inside enabled HK416 loot tables. Min: 0.00 Max: 10.00 Default: 1.00
        WeaponMultiplier = 0.8,
        -- Multiplier for HK416 magazine spawns inside enabled HK416 loot tables. Min: 0.00 Max: 10.00 Default: 3.00
        MagazineMultiplier = 2.5,
        -- Multiplier for HK416 laser, EOTech, flashlight, suppressor and grip spawns. Min: 0.00 Max: 10.00 Default: 1.00
        AttachmentMultiplier = 1.0,
    },
    LUHB = {
        -- New characters receive a complete loaded Honey Badger, two extra loaded magazines, five boxes with 30 rounds each and one loose copy of every attachment. The firearm starts with the 3x magnifier, vertical grip and tactical flashlight attached.
        StartingKit = false,
        -- Multiplies the base ballistic range of 72 tiles. 1 keeps 72; 0.5 reduces it to 36; 2 raises it to 144. In multiplayer, the server value is replicated to clients. Min: 0.25 Max: 4.00 Default: 1.00
        BulletRangeFactor = 1.0,
        -- Multiplies the firearm and optic sight distances. 1 uses 32 without an optic, 36 with the holographic sight, 52 with the 3x magnifier and 68 with the 6x scope. Min: 0.25 Max: 4.00 Default: 1.00
        SightRangeFactor = 1.0,
        -- Multiplies the chance for weapons, ammunition, magazines, attachments and kits on military zombies. 0 disables them; 1 uses the normal rate. Min: 0.00 Max: 10.00 Default: 1.00
        MilitaryZombieSpawn = 0.8,
        -- Multiplies the chance for Honey Badger items on police, agent, security and SWAT zombies. 0 disables them; 1 uses the normal rate. Min: 0.00 Max: 10.00 Default: 0.60
        PoliceZombieSpawn = 0.6,
        -- Multiplies the chance for Honey Badger items on non-military and non-police zombies. 0 disables them; 1 uses the normal rate. Min: 0.00 Max: 10.00 Default: 0.10
        CivilianZombieSpawn = 0.1,
        -- Multiplies the chance for Honey Badger items in residential bedrooms, wardrobes, living rooms and garages. 0 disables them; 1 uses the normal rate. Min: 0.00 Max: 10.00 Default: 0.15
        CivilianHouseSpawn = 0.15,
        -- Multiplies the chance for Honey Badger items in police gun storage, ammunition storage, desks and evidence rooms. 0 disables them; 1 uses the normal rate. Min: 0.00 Max: 10.00 Default: 1.00
        PoliceStationSpawn = 0.7,
        -- Multiplies the chance for Honey Badger items in military gun storage, ammunition storage and barracks. 0 disables them; 1 uses the normal rate. Min: 0.00 Max: 10.00 Default: 1.00
        MilitaryAreaSpawn = 0.8,
        -- Multiplies every Honey Badger item during initial filling and loot respawns. It combines with location and item-type multipliers; 0 disables all mod loot. Min: 0.00 Max: 10.00 Default: 1.00
        GlobalLootSpawn = 0.8,
        -- Multiplies only the firearm spawn chance. It combines with the global and location multipliers. Min: 0.00 Max: 10.00 Default: 1.00
        WeaponSpawn = 0.8,
        -- Multiplies the holographic sight, 3x magnifier, 6x scope, grip, laser and flashlight during initial filling and loot respawns. Min: 0.00 Max: 10.00 Default: 1.00
        AccessorySpawn = 1.0,
        -- Multiplies only .300 BLK magazines during initial filling and loot respawns. Min: 0.00 Max: 10.00 Default: 1.00
        MagazineSpawn = 1.0,
        -- Multiplies only .300 BLK ammunition boxes during initial filling and loot respawns. Min: 0.00 Max: 10.00 Default: 1.00
        AmmoBoxSpawn = 1.0,
        -- Multiplies only loose .300 BLK cartridges during initial filling and loot respawns. Min: 0.00 Max: 10.00 Default: 1.00
        LooseAmmoSpawn = 1.0,
        -- Multiplies only maintenance kits during initial filling and loot respawns. Min: 0.00 Max: 10.00 Default: 1.00
        MaintenanceKitSpawn = 1.0,
        -- Multiplies the weight of the weapon, ammunition, magazines, attachments and maintenance kit. 1 keeps normal weight; 0 makes the items weightless. Min: 0.00 Max: 5.00 Default: 1.00
        ItemWeightFactor = 1.0,
    },
    HB = {
        -- Casings will stay in the floor after landing. Turn this off to make casings only visible while active.
        PermanentCasings = true,
        -- Enable custom icons for casings and bullets.
        CustomIcons = true,
        -- Enable sounds for casings hitting the floor.
        CasingSounds = true,
        -- Bandits will drop casings when shooting their guns.
        BanditsCasings = false,
        -- Racking will be required to be done by the player, no longer automatic. Recommended to be used only in Singleplayer only.
        ManualRacking = false,
    },
    IPCanningJarring = {
        -- Min: 90 Max: 3650 Default: 400
        DaysOffMaxCustom = 400,
        -- Min: 60 Max: 3285 Default: 300
        DaysOffCustom = 300,
    },
    ISA = {
        -- How often Battery Bank will charge Default = Every Ten Minutes
        -- 1 = Every Ten Minutes
        -- 2 = Every Hour
        ChargeFreq = 1,
        -- Regular Generator calculation has less performance impact Default = Regular Generator
        -- 1 = "ISA"
        -- 2 = Regular Generator
        DrainCalc = 2,
        -- Solar panel power efficiency
        -- 12% is realistic for 1993
        -- 25% is modern solar
        -- default is unrealistic Min: 1 Max: 100 Default: 25
        solarPanelEfficiency = 25,
        -- Multiplier for the average degrade of batteries. Decreasing this will dramatically increase battery life. Min: 0 Max: 1000 Default: 100
        batteryDegradeChance = 100,
        -- Crafted DIY battery capacity multiplier. Min: 1 Max: 10000 Default: 100
        DIYBatteryMultiplier = 100,
        -- How likely pre-placed solar panels and crates are to spawn at a given spawn location.
        -- Requires external API to work. Min: 0 Max: 100 Default: 25
        solarPanelWorldSpawns = 25,
        -- Rarity of Battery Bank spawning on the map. Default = Rare
        -- 1 = None
        -- 2 = Very Rare
        -- 3 = Rare
        -- 4 = Uncommon
        BatteryBankSpawn = 3,
        -- Choose mode for Stash Houses.
        -- Change only on new game. Default = Don't add
        -- 1 = Don't add
        -- 2 = Add map items
        -- 3 = Add map items and random initial
        -- 4 = Add random initial
        StashMode = 1,
        -- Solar panel spawns in random containers and pre-placed crates multiplier Min: 0.00 Max: 100.00 Default: 1.00
        LRMSolarPanels = 1.0,
        -- Batteries spawns in random containers and pre-placed crates multiplier Min: 0.00 Max: 100.00 Default: 1.00
        LRMBatteries = 1.0,
        -- Magazine and inverter spawns in random containers and pre-placed crates multiplier Min: 0.00 Max: 100.00 Default: 1.00
        LRMMisc = 1.0,
        -- Base number of in-game minutes it takes to connect one panel. Min: 1 Max: 1440 Default: 10
        ConnectPanelMin = 30,
        -- Allows to craft solar panels and inverters.
        enableExpandedRecipes = false,
        -- Maximum tile distance for connecting a backup generator to a Battery Bank. Min: 1 Max: 20 Default: 10
        BackupGeneratorRange = 10,
        -- How often Battery Bank will charge Default = Every Ten Minutes
        -- 1 = Every Ten Minutes
        -- 2 = Every Hour
        ChargeFreq = 1,
        -- Regular Generator calculation has less performance impact Default = Regular Generator
        -- 1 = "ISA"
        -- 2 = Regular Generator
        DrainCalc = 2,
        -- Solar panel power efficiency
        -- 12% is realistic for 1993
        -- 25% is modern solar
        -- default is unrealistic Min: 1 Max: 100 Default: 25
        solarPanelEfficiency = 25,
        -- Multiplier for the average degrade of batteries. Decreasing this will dramatically increase battery life. Min: 0 Max: 1000 Default: 100
        batteryDegradeChance = 100,
        -- Crafted DIY battery capacity multiplier. Min: 1 Max: 10000 Default: 100
        DIYBatteryMultiplier = 100,
        -- How likely pre-placed solar panels and crates are to spawn at a given spawn location.
        -- Requires external API to work. Min: 0 Max: 100 Default: 25
        solarPanelWorldSpawns = 25,
        -- Rarity of Battery Bank spawning on the map. Default = Rare
        -- 1 = None
        -- 2 = Very Rare
        -- 3 = Rare
        -- 4 = Uncommon
        BatteryBankSpawn = 3,
        -- Choose mode for Stash Houses.
        -- Change only on new game. Default = Don't add
        -- 1 = Don't add
        -- 2 = Add map items
        -- 3 = Add map items and random initial
        -- 4 = Add random initial
        StashMode = 1,
        -- Solar panel spawns in random containers and pre-placed crates multiplier Min: 0.00 Max: 100.00 Default: 1.00
        LRMSolarPanels = 1.0,
        -- Batteries spawns in random containers and pre-placed crates multiplier Min: 0.00 Max: 100.00 Default: 1.00
        LRMBatteries = 1.0,
        -- Magazine and inverter spawns in random containers and pre-placed crates multiplier Min: 0.00 Max: 100.00 Default: 1.00
        LRMMisc = 1.0,
        -- Base number of in-game minutes it takes to connect one panel. Min: 1 Max: 1440 Default: 30
        ConnectPanelMin = 30,
        -- Allows to craft solar panels and inverters.
        enableExpandedRecipes = false,
    },
    ImprovisedGasMaskFilterEasySwap = {
        -- Adds the effect of wearing glasses by fitting prescription lenses into the improvised gas mask. <LINE>Changes only apply after reconnecting or restarting the server. <LINE>If currently equipped, you must unequip and equip it again.
        VisualAid = true,
        -- Set to 1 to remove the vision penalty. <LINE>Changes only apply after reconnecting or restarting the server. <LINE>If currently equipped, you must unequip and equip it again. Min: 0.00 Max: 1.00 Default: 0.50
        VisionModifier = 0.5,
        -- Set to 0 to remove discomfort caused by the improvised gas mask. <LINE>Changes only apply after reconnecting or restarting the server. <LINE>If currently equipped, you must unequip and equip it again. Min: 0.00 Max: 1.00 Default: 0.60
        DiscomfortModifier = 0.6,
    },
    JoinLeaveMessage = {
        -- If enabled, a message in chat will be sent each time a player joins the server.
        EnableAnnounceJoinServer = true,
        -- If enabled, a message in chat will be sent each time a player leaves the server.
        EnableAnnounceLeaveServer = true,
        -- If enabled, JoinLeaveMessage replaces Project Zomboid's vanilla death announcement and sends its own death message in chat. If disabled, the vanilla death announcement remains unchanged.
        EnableAnnounceDeathServer = false,
        -- If enabled, the player's survival time is added to the death message.
        ShowDeathSurvivalTime = true,
        -- If enabled, the player's zombie kill count is added to the death message.
        ShowDeathZombieKills = true,
        -- If enabled, join and leave messages will also be printed in the server console.
        EnableConsoleLog = true,
        -- If enabled, join and leave messages are also sent to the Discord log channel already configured by the server administrator using Project Zomboid's vanilla Discord integration. Requires DiscordEnable and DiscordLogChannel to be configured. No Discord token or channel is stored by this mod.
        EnableDiscordJoinLeave = false,
        -- If enabled, players whose IsoPlayer access level is Admin, Moderator, or GM will not generate JoinLeaveMessage join/leave announcements in the general chat, server console, or Discord. If disabled, they are announced normally like other players.
        HideAdminModeratorGMJoinLeave = false,
        -- Custom text displayed after the player name when they join. The player name is added automatically before this text. Add any punctuation you want directly in the message. Do not use placeholders. Example: has joined the server.
        JoinMessage = "has joined the server.",
        -- Optional second join message. If filled in, the mod randomly chooses between the configured join messages. Leave this field empty to ignore it.
        JoinMessage2 = "",
        -- Optional third join message. If filled in, the mod randomly chooses between the configured join messages. Leave this field empty to ignore it.
        JoinMessage3 = "",
        -- Custom text displayed after the player name when they leave. The player name is added automatically before this text. Add any punctuation you want directly in the message. Do not use placeholders. Example: has left the server.
        LeaveMessage = "has left the server.",
        -- Optional second leave message. If filled in, the mod randomly chooses between the configured leave messages. Leave this field empty to ignore it.
        LeaveMessage2 = "",
        -- Optional third leave message. If filled in, the mod randomly chooses between the configured leave messages. Leave this field empty to ignore it.
        LeaveMessage3 = "",
    },
    KnoxAcoustics = {
        -- Knox's own voice chat, replacing the game's VOIP on this server. Full-band audio, packet-loss recovery, noise suppression, radio push-to-talk on a separate key, staff broadcast for admins, and every Knox effect - walls, rooms, distance, weather - applied to voices. BETA: each player must also opt in under Mod Options > Beta features. SETUP: set VoiceEnable=false in the server settings, add Knox Acoustics to the required mods, open the UDP port below on the firewall. The link REFUSES to start while the game's own VOIP is enabled - the two must never run together. Full instructions print at server boot and in the Workshop guide.
        VoiceLinkBeta = false,
        -- The UDP port the voice link listens on. Open it on the server's firewall. Ignored unless the voice link beta is enabled. knox_server.txt's voicelinkport overrides this where set. Min: 1024 Max: 65535 Default: 24680
        VoiceLinkPort = 24680,
        -- Talking becomes dangerous in proportion to how loudly you talk. A whisper stays at your feet, a shout carries about thirty tiles, and walls reduce both. This is a difficulty setting, not an audio one: it adds a noise source the base game does not have. Off by default. In multiplayer every player needs the mod for this to be consistent.
        ZombieHearing = false,
        -- Multiplayer only. Off by default, because on most servers holding the relay station is the permission: it is a place on the map, you had to walk there, and it can be taken from you. Turn this on to make broadcasting a staff function instead.
        StationAdminOnly = false,
        -- How far a whisper reaches zombies when voices attract them. The default keeps it at your feet, which is what makes whispering worth doing. Min: 0 Max: 30 Default: 2
        RangeWhisper = 2,
        -- How far ordinary speech reaches zombies. Ten tiles is across a room and a little beyond. Strict physics would put this near 2 when a shout is 30, which made talking effectively silent, so this is a gameplay number and it is yours to set. Min: 0 Max: 60 Default: 10
        RangeNormal = 10,
        -- How far a shout reaches zombies. Thirty tiles is the figure this mod has always quoted. Raise it if you want shouting to be genuinely reckless. Min: 0 Max: 120 Default: 30
        RangeShout = 30,
        -- Whether a transmission degrades with distance and structure, or arrives clean. Two players on different answers hear different things from the same radio, so a server that cares about that should decide it here. Player's choice by default. Default = Player's choice
        -- 1 = Off for everyone
        -- 2 = On for everyone
        -- 3 = Player's choice
        RadioSim = 3,
        -- Whether voice runs through Knox's own path - distance, walls and the room you are standing in - or the vanilla codec. This decides how far a voice carries, so on a roleplay server it is worth everybody being on the same answer. Player's choice by default. Default = Player's choice
        -- 1 = Off for everyone
        -- 2 = On for everyone
        -- 3 = Player's choice
        KnoxVoip = 3,
    },
    KnoxAntidote = {
        -- Controls how often the antidote spawns in loot. Common = 2x spawn rate, Uncommon = 1x (default), Rare = 0.4x, Very Rare = 0.15x. Changes take effect after a server restart. Ignored if Admin Spawn Only is enabled. Default = Uncommon
        -- 1 = Common
        -- 2 = Uncommon
        -- 3 = Rare
        -- 4 = Very Rare
        AntidoteRarity = 3,
        -- When enabled, the Knox Antidote will not spawn in loot anywhere. Only admins can spawn it via the item picker or /additem. Useful for servers that want the antidote available but tightly controlled. Changes take effect after a server restart.
        AdminSpawnOnly = false,
        -- Drains endurance to 40 percent on use. Applies every time, even if not infected. Wears off naturally.
        SideEffectFatigue = false,
        -- Causes temporary food sickness and triggers the Queasy moodle. Applies every time, even if not infected. Decays naturally.
        SideEffectNausea = false,
        -- Adds heavy intoxication that impairs movement and vision. Applies every time, even if not infected. Decays naturally.
        SideEffectDrunk = false,
        -- Minimum First Aid skill level (0-10) needed to use the antidote. 0 = no requirement, anyone can use it. Players below the requirement see a greyed-out menu option. Min: 0 Max: 10 Default: 0
        RequiredFirstAidLevel = 1,
    },
    KnoxBuildworks = {
        -- The sidebar Build button opens Knox Buildworks instead of the vanilla Build Menu. When this is off, the Build button keeps vanilla as the primary action and exposes Knox Buildworks from its hover drawer.
        ReplaceBuildMenu = false,
        -- Allow players to open Knox Planning Mode for blueprints, ghost overlays, and build queues. Admins can turn this off for stricter servers.
        EnablePlanningMode = true,
        -- How many planned pieces players may build a blueprint up to by hand. Blueprints are never larger than 10,000 pieces. Min: 50 Max: 10000 Default: 2500
        MaxPlacementsPerBlueprint = 1000,
        -- Lets players import, duplicate or load from Buildworks Studio blueprints bigger than the limit above (up to 10,000 pieces). Such a blueprint stays fully editable - move, remove, replace, repaint - and can be built back up to the size it arrived with, but not grown past it. When off, nothing larger than the limit above can be imported.
        AllowOversizedImports = true,
        -- Multiplies the XP awarded when a Knox Buildworks construction finishes. Min: 0.00 Max: 10.00 Default: 1.00
        BuildXPMultiplier = 1.5,
        -- Half-size of the square a blueprint may cover, measured from its first ghost. 200 gives a 400x400 area. Min: 20 Max: 2000 Default: 200
        BlueprintRadius = 200,
        -- Choose whether water wells provide unlimited clean water or use a finite reservoir that refills from groundwater and rain. Default = Infinite
        -- 1 = Infinite
        -- 2 = Limited and refilling
        WellWaterMode = 2,
        -- Maximum litres stored by each limited water well. Min: 1 Max: 10000 Default: 1500
        WellCapacity = 3500,
        -- Percentage of a limited well's capacity available when the well is first built. Min: 0 Max: 100 Default: 25
        WellInitialPercent = 50,
        -- Litres of clean water naturally restored to each limited well every in-game hour. Min: 0.00 Max: 100.00 Default: 3.00
        WellHourlyRefill = 5.0,
        -- Multiplies the well's native Build 42 rain-catcher factor. Set this to 0 to disable rain refilling. Min: 0.00 Max: 10.00 Default: 1.50
        WellRainRefillMultiplier = 2.5,
        -- Require paint and a paintbrush for pre-colored Expanded recipes and selected wall finishes during construction. Disable to build those colors without paint. Does not change vanilla painting of existing walls or bucket capacity.
        RequireConstructionPaint = true,
    },
    KnoxMycology = {
        EnableMedicinalEffects = true,
        ShowMessages = true,
    },
    LEDLantern = {
        -- Controls how often LED Lantern mod items appear in loot (x0.25, x0.50, x0.75, x1, x2, x3, x5). Default = x1
        -- 1 = x0.25
        -- 2 = x0.50
        -- 3 = x0.75
        -- 4 = x1
        -- 5 = x2
        -- 6 = x3
        -- 7 = x5
        LootSpawnMultiplier = 3,
        -- Base wear every 10 minutes at 100% intensity. 0.0 disables bulb wear; light intensity reduces wear proportionally. Min: 0.00 Max: 5.00 Default: 0.05
        BulbWearRate = 0.05,
        -- Base battery drain per minute at 100% intensity. 0.0 disables battery drain; light intensity reduces drain proportionally. Min: 0.00 Max: 0.02 Default: 0.00
        BatteryDrainRate = 0.004,
    },
    LMN = {
        AdminOnlyLeaveMessage = false,
    },
    RET_LTS = {
        -- Enable Prone position, disable this option if you want to use another mod that implements this position (compatibility not guaranteed), Default: enabled.
        AllowProne = true,
        -- Aim Bonus while in Prone position. Min: 0 Max: 10 Default: 4
        ProneAimBonus = 4,
        -- Aim Bonus while in Crouching position. Min: 0 Max: 10 Default: 2
        CrouchAimBonus = 2,
        -- Base Speed when Getting Up/Down in Prone position, a higher value increases the speed. Min: 50 Max: 300 Default: 100
        VelocityPercent = 100,
        -- Pressing <Run/Sprint + Getting Up/Down> will increase speed in exchange for increased effort. Min: 100 Max: 300 Default: 200
        VelocityPercentAcceleration = 200,
        -- Pressing <Run/Sprint + Getting Up/Down> to get up faster will consume this energy in exchange for increasing speed, a higher value will increase energy used. Min: 0.00 Max: 1.00 Default: 0.28
        EnduraceUseWhenAccelerating = 0.28,
    },
    Text = {
        -- Enable/disable all mechanics related to Music (moodles, traits, interactions, ...).
        DividerMusicNew = true,
        -- Enable/disable all mechanics related to Dancing (moodles, traits, interactions, ...).
        DividerDancingNew = true,
        -- Enable/disable all mechanics related to Meditation and Yoga (moodles, traits, interactions, ...).
        DividerMeditationNew = true,
        -- Enable/disable all mechanics related to Hygiene and Cleaning (moodles, traits, interactions, ...).
        DividerHygiene = true,
        -- Enable/disable all mechanics related to Art (moodles, traits, interactions, ...).
        DividerArt = true,
        -- This is only a line separator, checking it has no effect.
        LSDividerOther = false,
        -- This is only a line separator, checking it has no effect.
        DividerDebug = false,
    },
    LSAmbt = {
        -- Toggle ambitions on or off. Warning: Disabling this will reset all current player progress on ambitions.
        Toggle = true,
        -- The number of in game hours that must pass before a player can toggle on or off a recently activated/deactivated ambition again. Min: 1 Max: 1000 Default: 36
        Cooldown = 36,
        -- The maximum number of incomplete ambitions players can activate and pursue. Passive ambitions are excluded. Min: 1 Max: 100 Default: 1
        MaxInProgress = 1,
        -- The maximum number of ambitions players can activate overall, including both completed and in-progress ambitions. Min: 1 Max: 100 Default: 3
        MaxTotal = 3,
        -- Whether or not resets after editing ambitions' goals apply for players currently working towards them. Forced resets still apply for everyone.
        ResetException = false,
        -- Hidden ambitions won't display clues on how to unlock them.
        HideTips = false,
    },
    Music = {
        -- Controls how strong music related activities are for the musician. Higher values increase their effectiveness on mood and xp gains. Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        StrengthMultiplier = 2,
        -- Controls how strong the effects of listening to music are. Higher values increase it's effectiveness on mood. Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        ListeningStrengthMultiplier = 2,
        -- Chance of learning a new song when practicing with an instrument. Music level 2 is required to start learning songs. Default = Normal
        -- 1 = Very Difficult
        -- 2 = Difficult
        -- 3 = Normal
        -- 4 = Easy
        -- 5 = Very Easy
        LearningChance = 3,
        -- Whether or not playing music is physically taxing. Default = Enabled
        -- 1 = Enabled
        -- 2 = Practicing only
        -- 3 = Disabled
        Metabolics = 1,
    },
    Dancing = {
        -- Controls how powerful dancing is. Higher values increase it's effectiveness. Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        StrengthMultiplier = 2,
    },
    Meditation = {
        -- Controls how powerful meditation is. Higher values increase it's effectiveness. Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        StrengthMultiplier = 2,
        -- Controls the duration of all mindfulness states. Default = Normal
        -- 1 = Short
        -- 2 = Normal
        -- 3 = Long
        MindfulnessDuration = 2,
        -- How much healing occurs during the Perfect Mindfulness state.
        -- The amount varies depending on your character overall health and game-time settings. Min: 0.00 Max: 10.00 Default: 2.00
        HealFactor = 2.0,
        -- Controls the effectiveness of the mindfulness states bonuses (stress, pain, panic, etc...). Default = Normal
        -- 1 = Weak
        -- 2 = Normal
        -- 3 = Strong
        EffectMultiplier = 2,
        -- Enable/Disable keeping bags and backpacks on during Meditation at lower skill levels.
        KeepBags = false,
    },
    LSMeditation = {
        -- Tick this box to disable levitation at higher levels.
        RemoveLevitation = false,
    },
    Yoga = {
        -- Controls how powerful yoga is. Higher values increases the effectiveness of it's benefits. Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        StrengthMultiplier = 2,
        -- How exhausted a character has to be before he's unable to practice Yoga. Default = At medium exhaustion (default)
        -- 1 = None (disable the threshold)
        -- 2 = At low exhaustion
        -- 3 = At medium exhaustion (default)
        -- 4 = At high exhaustion
        Exhaustion = 3,
        -- How embarrassed a character has to be before he's unable to practice Yoga. Default = At low embarrassment (default)
        -- 1 = None (disable the threshold)
        -- 2 = At low embarrassment (default)
        -- 3 = At medium embarrassment
        -- 4 = At high embarrassment
        Embarrassment = 2,
        -- Enable/Disable mats and incenses improving Yoga.
        AidObjects = true,
        -- Enable/Disable Yoga mat requirement for practicing the activity.
        RequiresMat = false,
        -- Enable/Disable keeping bags and backpacks on during Yoga.
        KeepBags = false,
        -- How often a character loses balance and falls during difficult Yoga poses (affected by skill). Default = Often (default)
        -- 1 = Never
        -- 2 = Rarely
        -- 3 = Sometimes
        -- 4 = Often (default)
        -- 5 = Very Often
        -- 6 = Two Left Feet (almost always)
        FailChance = 4,
        -- Yoga. Values below 1.0 decrease XP gain. Min: 0.10 Max: 5.00 Default: 1.00
        YogaXPMultiplier = 1.5,
        -- Fitness. Values below 1.0 decrease XP gain. Min: 0.10 Max: 5.00 Default: 1.00
        FitnessXPMultiplier = 1.5,
        -- Nimble. Values below 1.0 decrease XP gain. Min: 0.10 Max: 5.00 Default: 1.00
        NimbleXPMultiplier = 1.5,
    },
    LSHygiene = {
        -- Values below 1.0 decrease the rate, set it to 0 stop the need from increasing. Min: 0.00 Max: 3.00 Default: 1.00
        HygieneNeedMultiplier = 1.0,
        -- Values below 1.0 decrease the rate, set it to 0 stop the need from increasing. Min: 0.00 Max: 3.00 Default: 1.00
        BladderNeedMultiplier = 1.0,
        -- How many survived days it takes for a new survivor to care about hygiene. Default = 4-12 days
        -- 1 = 1-3 days
        -- 2 = 4-12 days
        -- 3 = 2-4 weeks
        -- 4 = 1-3 months
        HygieneNeedExpectationTime = 2,
        -- Whether or not showering and bathing cleans body and facial makeup.
        CleansMakeup = true,
        -- Characters won't mind having others around while bathing or using the toilet.
        NotEmbarrassed = false,
        -- Toilets and other fixtures can be cleaned even while clogged.
        CleanClogged = false,
        -- How weak or strong the sickness from low hygiene can be. Default = Mild
        -- 1 = Low
        -- 2 = Mild
        -- 3 = High
        -- 4 = Deadly
        ColdSeverity = 2,
        -- Values below 1.0 lower the chance, set it to 0 to disable the mechanic. Min: 0.00 Max: 3.00 Default: 0.00
        ColdChanceMultiplier = 0.0,
        -- XY distance in tiles occupied by each outhouse. Min: 1 Max: 100 Default: 10
        OuthouseRange = 10,
        -- How many survived days it takes for a new survivor to care about their surroundings. Default = 4-12 days
        -- 1 = 1-3 days
        -- 2 = 4-12 days
        -- 3 = 2-4 weeks
        -- 4 = 1-3 months
        CleaningExpectationTime = 2,
        -- Chance for an unskilled character to generate waste during a skill-based activity (e.g. food scraps from cooking with low cooking skill). Default = Normal
        -- 1 = Very Low
        -- 2 = Low
        -- 3 = Normal
        -- 4 = High
        CleaningLitterChance = 3,
    },
    LSArt = {
        -- Modifies the default beauty value of all tiles, except player artworks. Min: 0.10 Max: 3.00 Default: 1.00
        GeneralBeautyMultiplier = 1.0,
        -- Whether or not beauty need can drop to negative levels when outdoors.
        BeautyOutdoors = false,
        -- Whether or not negative beauty scores can appear above outdoor tiles (will always appear if ugly outdoors is enabled).
        BeautyShowNegative = false,
        -- The rate at which beauty needs decreases when around ugly or neutral environments. Default = Normal
        -- 1 = Very Slow
        -- 2 = Slow
        -- 3 = Normal
        -- 4 = Fast
        -- 5 = Very Fast
        BeautyNeedDecayRate = 3,
        -- How strong the effects on mood from satisfying or neglecting a character's beauty need are. Default = Normal
        -- 1 = Very Weak
        -- 2 = Weak
        -- 3 = Normal
        -- 4 = Strong
        -- 5 = Very Strong
        BeautyNeedStrength = 3,
        -- Values below 1.0 lower the effect of artworks on beauty score. Min: 0.10 Max: 4.00 Default: 1.00
        ArtworkBeautyMultiplier = 1.0,
    },
    LS = {
        -- Whether or not traits can be lost or gained dynamically.
        DynamicTraits = false,
        -- Whether or not positive traits can be lost when DLT is enabled. 
        --  - Never: will never lose positive traits 
        --  - Always: can lose any lifestyle trait 
        --  - Dynamic only: can only lose traits gained dynamically, will never lose positive traits picked during character creation Default = Never
        -- 1 = Never
        -- 2 = Always
        -- 3 = Dynamic only
        DynamicTraitsReverse = 1,
        -- This is only a line separator, checking it has no effect.
        DividerServer = false,
        -- How often in game time player moddata is updated. Do not change this if you don't know what this is. Default = Set by day length (default)
        -- 1 = Set by day length (default)
        -- 2 = Once per minute
        -- 3 = Per 2 minutes
        -- 4 = Per 5 minutes
        -- 5 = Per 10 minutes
        -- 6 = Per 15 minutes
        -- 7 = Per 30 minutes
        -- 8 = Once per hour
        -- 9 = Per 2 hours
        -- 10 = Per 6 hours
        -- 11 = Per 12 hours
        -- 12 = Once per day
        ModdataUpdate = 1,
        -- How often in game time changes to mood are applied. Only affects passive mood gain/loss (not timed actions) Default = Set by day length (default)
        -- 1 = Set by day length (default)
        -- 2 = Once per minute
        -- 3 = Per 2 minutes
        -- 4 = Per 5 minutes
        -- 5 = Per 10 minutes
        -- 6 = Per 15 minutes
        -- 7 = Per 30 minutes
        -- 8 = Once per hour
        -- 9 = Per 2 hours
        MoodUpdate = 1,
    },
    LSComfort = {
        -- Values below 1.0 decrease the rate, set it to 0 to stop the need from increasing. Min: 0.00 Max: 3.00 Default: 1.00
        ComfortNeedMultiplier = 1.0,
        -- Check to disable comfy chairs and beds giving positive comfort.
        ComfortPositive = false,
        -- Check to stop Lifestyle's Comfort need from impacting vanilla's Discomfortable moodle.
        ComfortNoImpact = false,
    },
    Debug = {
        -- Enabling this will cause other modded moodles to appear above lifestyle moodles.
        MoodlePriority = false,
        -- Enables manual expressions in the admin context menu
        Expressions = false,
        -- Enabling this will make animation names appear above some of the new animations
        DanceAnim = false,
        -- Prints texts. For debugging only.
        LSVerbose = false,
    },
    LimitedPropaneSupply = {
        -- When active, propane tanks and blowtorches can additionally draw fuel from gas station pumps.
        AllowGasPumps = false,
        -- When active, propane tanks and blowtorches can additionally draw fuel from the small industrial tanks found in warehouses and factories.
        AllowSmallIndustrialTanks = false,
        -- Maximum distance, in tiles, allowed between the item on the ground and a usable propane source. Min: 1 Max: 10 Default: 2
        SearchRadius = 2,
        -- Maximum capacity of large propane storage tanks (Fossoil / Gas2Go), measured in full portable propane tanks. Refilling a blowtorch only uses a fraction of one unit. Min: 1 Max: 1000 Default: 50
        LargeTankCapacity = 50,
        -- Maximum capacity of small industrial propane tanks (and gas pumps if enabled), measured in full portable propane tanks. Min: 1 Max: 100 Default: 5
        SmallTankCapacity = 5,
        -- Lower bound of the random initial propane amount of a storage tank, as a percentage of its capacity. Min: 0 Max: 100 Default: 50
        MinFillPercent = 50,
        -- Upper bound of the random initial propane amount of a storage tank, as a percentage of its capacity. Min: 0 Max: 100 Default: 90
        MaxFillPercent = 90,
        -- If enabled, a rubber hose (the same one used to siphon gas from vehicles) must be in your inventory to refill a propane tank or blowtorch. Not consumed.
        RequireHose = false,
    },
    PortableMedia = {
        -- Controls how fast audiobooks progress in minutes per page.
        -- • Default: 2.0 (Matches vanilla skill book reading speed ~18 real minutes per volume)
        -- • Lower = Faster reading (e.g., 0.5 = 4x faster)
        -- • Higher = Slower, hardcore reading (e.g., 5.0 = 2.5x slower) Min: 0.05 Max: 20.00 Default: 2.00
        AudiobookSpeed = 2.0,
        -- The total in-game minutes required to complete a bootleg CD episode.
        -- • Default: 45 mins (~1 min 50 secs real-time on standard 1-hour day settings)
        -- • Min: 1 minute (Instant learning for fast testing)
        -- • Max: 180 minutes (Hardcore long listening sessions) Min: 1 Max: 180 Default: 45
        BootlegMinutes = 45,
        -- Total skill XP granted upon finishing a bootleg CD episode.
        -- • Default: 150.0 XP (Matches vanilla skill TV show broadcasts)
        -- • Set to 0.0 for Roleplay / No-XP mode
        -- • Set higher (e.g., 500+) for fast-paced multiplayer servers Min: 0.00 Max: 5000.00 Default: 150.00
        BootlegXP = 150.0,
        -- Controls how fast batteries drain in the Premium CD Player.
        -- • Default: 1.0x (Normal battery consumption)
        -- • Set to 0.0x for Infinite Battery Life
        -- • Set higher (e.g., 2.0x, 5.0x) for faster battery usage Min: 0.00 Max: 10.00 Default: 1.00
        BatteryDrain = 1.0,
        -- Zombie attraction radius in tiles when playing CDs out loud without headphones or earbuds.
        -- • Default: 15 tiles
        -- • Set to 0 for Silent Mode (Zombies will not hear player audio)
        -- • Set higher (e.g., 30–50 tiles) for a dangerous, high-risk experience Min: 0 Max: 100 Default: 15
        SoundRadius = 15,
    },
    LivingBooks = {
        -- It only spawns alongside non-essential books, so it doesn't interfere with the base game's gameplay
        -- (e.g., Skill Books and Skill Magazines). Default = Extremely Rare (Recommended)
        -- 1 = Never
        -- 2 = Insane
        -- 3 = Extremely Rare (Recommended)
        -- 4 = Rare
        -- 5 = Normal
        -- 6 = Common
        -- 7 = Abundant
        SpawnChance = 3,
    },
    LootRequiresLight = {
        -- Master switch for Loot Requires Light.
        EnableMod = true,
        -- Blocks world containers when there is not enough light.
        RequireLightToLoot = true,
        -- Allows a slow timed action to temporarily unlock a dark container.
        AllowSearchingInDarkness = true,
        -- When disabled, the character will not say messages from this mod.
        ShowMessages = true,
    },
    LuaDigitalWatchUI = {
        -- Controls how often the minute display updates. 'Mod Default' uses the framework or mod author's preference (1-minute by default). '1 Minute' forces the display to update every in-game minute. '10 Minutes' matches the vanilla clock behavior. Default = Mod Default
        -- 1 = Mod Default
        -- 2 = 1 Minute
        -- 3 = 10 Minutes
        MinuteResolution = 1,
    },
    ElectricWeaponMalfunction = {
        -- Adjust the malfunction factor of electrified weapons.
        --  Higher values increase malfunction chances. Min: 0.10 Max: 2.00 Default: 1.00
        MalfunctionFactor = 1.0,
        -- Adjust the battery consumption rate of electrified weapons.
        --  The higher the number, the faster the power drains. Min: 0.10 Max: 2.00 Default: 1.00
        PowerConsumptionFactor = 1.0,
    },
    DoomedRoadkillPhysics = {
        -- Scales the weight-derived reaction a vehicle receives from a live animal. 1.0 is the intended mass-based fix; 0 removes the vehicle kick; values above 1 remain capped at Build 42.20's original force. Min: 0.00 Max: 2.00 Default: 1.00
        AnimalImpulseMultiplier = 1.0,
        -- Scales the mass-derived wheel lift and torque a vehicle receives from a corpse. 1.0 is the intended mass-based fix; 0 removes corpse lift; values above 1 remain capped at Build 42.20's original force. Min: 0.00 Max: 2.00 Default: 1.00
        CorpseImpulseMultiplier = 1.0,
        -- Scales the targeted horizontal slowdown a vehicle receives from hitting a live zombie. 1.0 keeps Build 42.20's reaction, 0.5 halves it, and 0 removes that horizontal impulse. Zombie damage, sounds, and prone wheel lift are unchanged. Min: 0.00 Max: 1.00 Default: 1.00
        ZombieImpulseMultiplier = 1.0,
    },
    MassiveMilitaryContainer = {
        -- Storage bays on each Huge Military Crate. Default 9. Total storage ≈ bays × capacity per bay (Organized ≈ ×1.3 per bay). Min: 1 Max: 24 Default: 9
        BayCount = 9,
        -- Shared per-bay capacity for huge crates, light crates, and weapon lockers. Java hard-cap is 100. Default 100. Organized ≈ capacity × 1.3 per bay. Min: 1 Max: 100 Default: 100
        BayCapacity = 100,
        -- Storage bays on Light Military Crates. Default 1 (one bay of 100 / ~130 with Organized). Min: 1 Max: 24 Default: 1
        LightBayCount = 1,
        -- Storage bays on Weapon Storage Lockers. Default 3 (3 × 100 / ~130 with Organized). Min: 1 Max: 24 Default: 3
        LockerBayCount = 3,
        -- Metalworking (Welding) level needed to craft any MMC furniture. Default 6. Set 0 for none. Recipes always appear in the build menu. Min: 0 Max: 10 Default: 6
        WeldingSkillRequired = 6,
        -- Huge Military Crate recipe. Default 12. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 12
        SmallSheetMetal = 12,
        -- Huge Military Crate recipe. Default 12. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 12
        SheetMetal = 12,
        -- Huge Military Crate recipe. Default 3. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 3
        ScrapMetal = 3,
        -- Huge Military Crate recipe (Metal Bar). Default 6. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 6
        SteelRod = 6,
        -- Huge Military Crate recipe. Default 4. Set 0 to omit from the recipe. Min: 0 Max: 50 Default: 4
        DoorHinge = 4,
        -- Huge Military Crate recipe. Default 48. Set 0 to omit from the recipe. Min: 0 Max: 200 Default: 48
        Screws = 48,
        -- Huge Military Crate recipe (0.1 unit per use; 10 ≈ one full torch). Default 10. Set 0 to omit. Min: 0 Max: 50 Default: 10
        BlowTorchUses = 10,
        -- Huge Military Crate recipe (0.05 unit per use; 20 ≈ one full pack). Default 20. Set 0 to omit. Min: 0 Max: 50 Default: 20
        WeldingRodUses = 20,
        -- Light Military Crate recipe. Default 4. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 4
        LightSmallSheetMetal = 4,
        -- Light Military Crate recipe. Default 4. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 4
        LightSheetMetal = 4,
        -- Light Military Crate recipe. Default 1. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 1
        LightScrapMetal = 1,
        -- Light Military Crate recipe (Metal Bar). Default 2. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 2
        LightSteelRod = 2,
        -- Light Military Crate recipe. Default 2. Set 0 to omit from the recipe. Min: 0 Max: 50 Default: 2
        LightDoorHinge = 2,
        -- Light Military Crate recipe. Default 12. Set 0 to omit from the recipe. Min: 0 Max: 200 Default: 12
        LightScrews = 12,
        -- Light Military Crate recipe. Default 5. Set 0 to omit. Min: 0 Max: 50 Default: 5
        LightBlowTorchUses = 5,
        -- Light Military Crate recipe. Default 5. Set 0 to omit. Min: 0 Max: 50 Default: 5
        LightWeldingRodUses = 5,
        -- Weapon Storage Locker recipe. Default 6. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 6
        LockerSmallSheetMetal = 6,
        -- Weapon Storage Locker recipe. Default 6. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 6
        LockerSheetMetal = 6,
        -- Weapon Storage Locker recipe. Default 1. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 1
        LockerScrapMetal = 1,
        -- Weapon Storage Locker recipe (Metal Bar). Default 2. Set 0 to omit from the recipe. Min: 0 Max: 100 Default: 2
        LockerSteelRod = 2,
        -- Weapon Storage Locker recipe. Default 4. Set 0 to omit from the recipe. Min: 0 Max: 50 Default: 4
        LockerDoorHinge = 4,
        -- Weapon Storage Locker recipe. Default 16. Set 0 to omit from the recipe. Min: 0 Max: 200 Default: 16
        LockerScrews = 16,
        -- Weapon Storage Locker recipe. Default 5. Set 0 to omit. Min: 0 Max: 50 Default: 5
        LockerBlowTorchUses = 5,
        -- Weapon Storage Locker recipe. Default 5. Set 0 to omit. Min: 0 Max: 50 Default: 5
        LockerWeldingRodUses = 5,
    },
    BulletproofHelmet = {
        -- Min: 0 Max: 100 Default: 100
        Defense_Hat_Army = 100,
        -- Min: 0 Max: 100 Default: 80
        Defense_Hat_ArmyWWII = 80,
        -- Min: 0 Max: 100 Default: 100
        Defense_Hat_ArmyDesert = 100,
        -- Min: 0 Max: 100 Default: 100
        Defense_Hat_ArmyDesertNew = 100,
        -- Min: 0 Max: 100 Default: 100
        Defense_Hat_SWAT = 100,
    },
    MilitaryPonchosRELOADED = {
        -- Multiplies all poncho loot weights. Default: 0.8 (20 percent below original weights). 0 = disabled; 0.5 = half weight; 1 = original weights; 2 = double weight. Range: 0-10. Stacks with location and color settings and vanilla loot rarity. These are weights, not guaranteed percentages. Restart the world/server after changing settings; only newly generated loot is affected. Min: 0.00 Max: 10.00 Default: 0.80
        SpawnMultiplier = 0.8,
        -- Army storage, army bedroom/bunker lockers, and surplus stores. 0 disables ponchos in these pools; 1 preserves original weights. Multiplies the overall and color settings. Min: 0.00 Max: 10.00 Default: 1.00
        MilitarySpawnMultiplier = 1.0,
        -- Camping stores and lockers, gun stores, fishing stores, fisherman outfits, and survival gear. 0 disables ponchos in these pools; 1 preserves original weights. Multiplies the overall and color settings. Min: 0.00 Max: 10.00 Default: 1.00
        OutdoorSpawnMultiplier = 1.0,
        -- Police storage, outfits and lockers, and fire department lockers. 0 disables ponchos in these pools; 1 preserves original weights. Multiplies the overall and color settings. Min: 0.00 Max: 10.00 Default: 1.00
        EmergencySpawnMultiplier = 1.0,
        -- Household wardrobes, general and school lockers, and women's clothing stores. 0 disables ponchos in these pools; 1 preserves original weights. Multiplies the overall and color settings. Min: 0.00 Max: 10.00 Default: 1.00
        CivilianSpawnMultiplier = 1.0,
        -- Hunter and survivalist vehicle storage. 0 disables ponchos in these pools; 1 preserves original weights. Multiplies the overall and color settings. Min: 0.00 Max: 10.00 Default: 1.00
        VehicleSpawnMultiplier = 1.0,
        -- M81 Woodland, Tigerstripe, Flecktarn, 3 Color Desert, and 6 Color Desert. 0 disables these variants; 1 preserves original weights. Multiplies the overall and location settings. Min: 0.00 Max: 10.00 Default: 1.00
        CamouflageSpawnMultiplier = 1.0,
        -- Green, Black, Yellow, Red, Blue, White, Pink, Purple, Brown, and Coyote. 0 disables these variants; 1 preserves original weights. Multiplies the overall and location settings. Min: 0.00 Max: 10.00 Default: 1.00
        SolidSpawnMultiplier = 1.0,
    },
    MineLimestone = {
        -- Amount of limestone granted when mining a limestone ore. Min: 1 Max: 20 Default: 5
        LimestoneYield = 5,
        -- Base timed-action length for mining limestone (higher = slower). Min: 30 Max: 600 Default: 120
        MiningTime = 120,
        -- How many limestone mining actions a tool can perform before losing one condition point. Min: 1 Max: 10 Default: 2
        ToolUsesPerConditionLoss = 2,
    },
    MHP = {
        -- Adds the 'Replace Bandage' context-menu entry for dirty bandages.
        EnableReplaceBandage = false,
        -- Shows the blue indicator when a bandage or splint can be removed safely.
        ShowSafeRemoveIndicator = false,
        -- Shows the purple indicator when stitched wounds should be checked.
        ShowStitchInspectIndicator = false,
    },
    PZTrueMusicSandbox = {
        -- If enabled, the TrueMoozic StepVan can spawn in vehicle parking zones. Disable to prevent it from spawning in the world.
        SpawnTrueMoozicVan = true,
        -- Adds +1000 trunk capacity to step vans (160 -> 1160). Off = vanilla capacity everywhere. On = only the TrueMoozic StepVan. All = every step van variant (Mail, Cereal, etc.). Applies to newly spawned vehicles. Default = Off (base game default)
        -- 1 = Off (base game default)
        -- 2 = On (TrueMoozic StepVan only)
        -- 3 = All (every StepVan variant)
        StepVanTrunkBonus = 1,
        -- Percent chance, when a player walks within 2 tiles of a base-game computer, that the Skype ringtone plays. Roll happens at most once per cooldown. Min: 0 Max: 100 Default: 5
        SkypeRingChance = 5,
        -- In-game days the same computer must wait before another chance roll, regardless of whether the previous roll succeeded. Min: 1 Max: 365 Default: 47
        SkypeRingCooldownDays = 47,
        -- Spawn rate for cassette tapes (0-100000%). 0=Disabled, 100=Normal. Multiplies with legacy cassette pack rates. Min: 0 Max: 100000 Default: 100
        CassetteSpawnRate = 100,
        -- Spawn rate for CD albums from detected CD packs (0-100000%). 0=Disabled, 100=Normal. Min: 0 Max: 100000 Default: 100
        CDSpawnRate = 100,
        -- Caps how many TrueMoozic media items of EACH type (cassettes, vinyl, CDs) can appear in a single freshly-looted container, leaving room for other loot. 0 = no cap. Min: 0 Max: 20 Default: 5
        MaxMediaPerContainer = 5,
        -- How much media weight a jukebox container can hold (1 - 100, the engine maximum). Default 100 - enough for hundreds of cassettes, vinyls and CDs. Min: 1 Max: 100 Default: 100
        JukeboxCapacity = 100,
        -- When new music packs are added to an existing save, sprinkle their media into already-generated containers as chunks load. Off = new packs only appear in freshly-generated loot.
        GenerateNewLootMidSave = false,
        -- Chance (%) that a loose CD spawns clean and undamaged. CDs found in CD cases are always clean. Scratched CDs are labeled and skip tracks: 25% scratched skips every 2nd song, 50% skips all but one song, 100% skips everything and won't loop. Min: 0 Max: 100 Default: 75
        CDScratchCleanChance = 75,
        -- Spawn rate for cassette cases (0-100000%). 0=Disabled, 100=Normal. Min: 0 Max: 100000 Default: 100
        CassetteCaseSpawnRate = 100,
        -- Spawn rate for vinyl media items (records/albums) (0-100000%). 0=Disabled, 100=Normal. Min: 0 Max: 100000 Default: 100
        VinylSpawn = 100,
        -- Spawn rate for Vinyl Players (0-100000%). 0=Disabled, 100=Normal. Min: 0 Max: 100000 Default: 100
        VinylPlayerSpawn = 100,
        -- Spawn rate for Walkman items (0-100000%). 0=Disabled, 100=Normal. Min: 0 Max: 100000 Default: 100
        WalkmanSpawn = 100,
        -- Spawn rate for Boombox items (0-100000%). 0=Disabled, 100=Normal. Min: 0 Max: 100000 Default: 100
        BoomboxSpawn = 100,
        -- Spawn rate for zombie walkman bundle (Walkman + Headphones + Cassette). 0=Disabled, 100=Normal. Default is around 1 in 100 zombies. Min: 0 Max: 100000 Default: 100
        ZombieWalkmanSpawnRate = 100,
        -- Maximum real-world seconds a tape can play before timing out. Default 2100 (35 minutes). Min: 600 Max: 172800 Default: 2100
        MusicPlaybackTimeoutSeconds = 2100,
        -- Time between music state checks. Higher = better performance, slower updates. Min: 1 Max: 50 Default: 5
        MusicTimer = 5,
        -- Allow players to disassemble cassettes and electronics (walkman, boombox, vinyl player) for parts. Disable to prevent disassembly entirely.
        EnableDisassembly = true,
        -- Multiplayer only. When enabled, pressing Play on a device runs a short ready-check so every nearby player starts the song at the same moment (up to ~2 second delay before the music starts). When disabled (default), music starts almost immediately and listeners sync by joining the track mid-play.
        MPSyncHandshake = false,
        -- Enable periodic [TMSpeaker] debug logs for speaker sync and HiFi source detection.
        TMSpeakerDebug = false,
        -- Enable verbose [TMDBG] / [HIFIDBG] logs for diagnosing vehicle/world music that toggles on but produces no sound.
        AudioSilenceDebug = false,
        -- Testing only. Bypasses chance roll and per-computer cooldown so the Skype ring plays whenever you stand near a computer.
        SkypeRingDebugAlwaysFire = false,
        -- Holiday easter egg: when enabled, walking near a base-game computer can occasionally play the Skype ringtone. Disable to silence the easter egg entirely.
        SkypeRingEnabled = true,
    },
    N3WOMapOverhaul = {
        -- Displays learned point-of-interest markers on the world map (M). Untick to hide all N3WO Map Overhaul markers.
        ShowDiscoveredPOIs = true,
        -- Shows a floating notification above your character the moment a new point of interest is learned.
        DiscoveryNotifications = true,
    },
    NVG = {
        -- This value defines by how much the spawn rate for NVG items is changed. 0.5=halved, 1=no change, 2=double, etc. Min: 0.10 Max: 20.00 Default: 1.00
        WeightMultiplier = 0.7,
        -- If disabled, the darkened screen-edge vignette mask is never drawn while NVG is active, regardless of the vignette darkness mod option. Does not affect the native NVG shader itself.
        VignetteEnabled = true,
    },
    NeatLockpicking = {
        -- When off, vehicles use the vanilla hotwire action instead of the wire minigame.
        EnableHotwire = true,
        -- When on, locked windows can be opened with a lockpick, same as with a crowbar.
        EnableWindowLockpick = true,
        -- Min: 3 Max: 10 Default: 6
        PinCount = 6,
        -- Min: 0 Max: 100 Default: 50
        BreakChanceAtZeroSkill = 50,
        -- Min: 0 Max: 100 Default: 5
        BreakChanceMinimum = 5,
        NoiseOnFail = true,
        ResetPinsOnBreak = true,
        -- Min: 0.10 Max: 5.00 Default: 1.00
        BrokenLockpickDuration = 1.0,
        -- Min: 1 Max: 10 Default: 4
        RandomPinCountMin = 4,
        -- Min: 1 Max: 10 Default: 7
        RandomPinCountMax = 7,
        -- Min: 3 Max: 10 Default: 8
        ReinforcedDoorPinCount = 8,
        -- Degrees per second for the crowbar minigame on normal doors and windows. Default 180. Min: 90 Max: 900 Default: 180
        NormalDoorArrowSpeed = 180,
        -- Degrees per second for the crowbar minigame on security doors. Default 360. Min: 180 Max: 1800 Default: 360
        ReinforcedDoorArrowSpeed = 360,
        -- When on, a hit on a security door reverses the arrow direction.
        ReinforcedReverseArrowOnHit = true,
        -- Progress added per yellow-zone hit on security doors. Default 10%. Min: 1 Max: 100 Default: 10
        ReinforcedYellowHitValue = 10,
        -- Progress added per green-zone hit on security doors. Default 20%. Min: 1 Max: 100 Default: 20
        ReinforcedGreenHitValue = 20,
        -- When on, crowbar minigame progress slowly drops if you wait.
        CrowbarProgressDecayEnabled = true,
        -- Seconds between each decay tick. Default 2. Min: 0.50 Max: 10.00 Default: 2.00
        CrowbarProgressDecayInterval = 2.0,
        -- Progress removed each decay tick. Default 1%. Min: 1 Max: 10 Default: 1
        CrowbarProgressDecayAmount = 1,
        -- Multiplier on endurance lost per crowbar swing. Default 0.5 (half of the old drain). 1.0 is the previous rate. Min: 0.10 Max: 3.00 Default: 0.50
        CrowbarExhaustionMultiplier = 0.5,
        -- When on, pins bind after about 50% lift. The first pin in the sequence is stiffest. Off by default.
        PinResistanceEnabled = false,
    },
    NotDeadYet = {
        -- Determines the chance of surviving the zombie infection.
        -- Trait Modifiers and Additional Infection Penalties are based off this value.
        -- All bonuses/penalties are ADDITIVE.
        --  Min: 0 Max: 100 Default: 25
        BaseChanceToLive = 25,
        -- Enable certain traits to affect the chances of surviving the zombie infection:
        -- Resilient - 1.20x Multiplier
        -- Thick-Skinned - 1.20x Multiplier
        -- Prone To Illness - 0.90x Multiplier
        -- Thin-Skinned - 0.90x Multiplier
        -- 
        -- Default: True
        UseTraitModifiers = true,
        -- Enable each infected wound (zombie virus) after the first one to apply a 0.90x multiplier to your chances of survival, each.
        -- 
        -- Default: True
        UseAdditionalInfectionPenalties = true,
        -- Enable unintrusive, immersive thought/text pop ups above the player's head.
        -- This text only shows up twice throughout the entire zombification process, and serves to provide visual feedback to the player whether they survive.
        -- It helps to remind the player not to go and commit 'New Character' too soon.
        -- 
        -- Default: True
        UseTextPopUps = true,
    },
    NutritionMakesSense = {
        -- Multiplies how quickly calories are burned during rest, movement, work, and sleep. This affects the energy reserve and long-term weight change. 1.0 keeps the intended NMS balance. Min: 0.25 Max: 3.00 Default: 1.00
        EnergyBurnMultiplier = 1.0,
        -- Multiplies how quickly hunger returns. Stacks with Project Zomboid's Stats Decrease setting. Does not change calorie burn or weight. 1.0 keeps the intended NMS balance. Min: 0.25 Max: 3.00 Default: 1.00
        AppetiteRateMultiplier = 1.0,
    },
    OgrimCleanRags = {
        -- Total items used every 10 in game minutes. Min: 1 Max: 100 Default: 20
        ItemsPerCycle = 20,
        -- When using cleaning liquid, bleach or soap bars the items per cycle will be multiplied by this value. Min: 1.00 Max: 5.00 Default: 2.00
        CleaningLiquidMultiplier = 2.0,
        -- Activates the sterilization cycle in clothes dryers.
        SterilizeEnabled = true,
        -- When using dryers to sterilize the items per cycle will be multiply by this value. Min: 0.01 Max: 5.00 Default: 0.50
        SterilizeMultiplier = 0.5,
        -- When enable, player will speak about the cycle.
        ShowCycleMessages = true,
    },
    MyOwnWell = {
        -- The minimum amount of water (in units) the well will produce per refill cycle. Min: 0.00 Max: 50.00 Default: 25.00
        MinWellWaterPerCycle = 25.0,
        -- The maximum amount of water (in units) the well will produce per refill cycle. Min: 50.00 Max: 100.00 Default: 75.00
        MaxWellWaterPerCycle = 75.0,
        -- Multiplier applied to the water refill rate of the well. Higher values increase the total water generated per cycle. Min: 1.00 Max: 10.00 Default: 1.00
        WellWaterPerCycleMultiplier = 1.0,
        -- Additional multiplier applied to the water refill rate of the well when it is raining. This simulates the effect of rainwater contributing to the well's water supply. Min: 0.00 Max: 1.00 Default: 0.15
        WellWaterRainFactor = 0.15,
        -- Minimum distance (in tiles) required between wells in order for them to fully refill. Prevents clustering multiple wells too close together for resource gain. Min: 1 Max: 100 Default: 20
        WellMinBetweenDistanceToFullRefil = 20,
        -- If enabled, players can build/place wells in underground. Disable to restrict well placement to ground level.
        AllowUndergroundWell = true,
        -- If enabled, wells can become contaminated if there are dead bodies nearby, making the water unsafe to drink. This adds a layer of risk to well placement and maintenance.
        CanWellBeContaminated = true,
        -- The radius (in tiles) around a well within which dead bodies can contaminate the water. Min: 1 Max: 50 Default: 10
        WellDeadBodiesRadius = 10,
        -- The minimum number of hours that dead bodies need to be present within the contamination radius of a well in order for it to become contaminated. Min: 0 Max: 72 Default: 12
        MinHoursWithBodiesToContaminate = 12,
        -- The chance (as a percentage) that each dead body within the contamination radius will contribute to contaminating the well. Min: 0.01 Max: 1.00 Default: 0.02
        ContaminationChancePerBody = 0.015,
        -- The amount of charcoal needed to clean one liter of water from the well. Higher values require more charcoal for cleaning water. Min: 0.00 Max: 10.00 Default: 0.01
        CharcoalNeededPerLiter = 0.01,
    },
    OneCleanStab = {
        -- Show reasons above the character when a stealth kill cannot start.
        ShowFailureMessages = true,
        -- Chance to use the lethal knife animation. On a failed roll, the character stumbles and falls backward. Min: 0 Max: 100 Default: 90
        SuccessChance = 90,
        -- Minimum Short Blade level required to use stealth kills. Set to 0 to unlock the mechanic immediately. Min: 0 Max: 10 Default: 2
        UnlockShortBladeLevel = 2,
        -- The attack cannot start when current endurance is below this percentage. Set to 0 to disable the restriction. Min: 0 Max: 100 Default: 75
        MinimumEndurancePercent = 75,
        -- The attack cannot start when current fatigue is above this percentage. Set to 100 to disable the restriction. Min: 0 Max: 100 Default: 60
        MaximumFatiguePercent = 60,
        -- Real-time delay between valid attempts. Set to 0 for no cooldown. Min: 0.00 Max: 10.00 Default: 0.00
        CooldownSeconds = 0.0,
    },
    BadSadsOutbreakSmokers = {
        -- Allows players to convert compatible world barrels into Barrel Smokers.
        EnableBarrelSmokerBuilding = true,
        -- When disabled, players can build Barrel Smokers without meeting the Metalworking level requirement.
        RequireSkillToBuildSmoker = true,
        -- Metalworking level required when skill requirements are enabled. Min: 0 Max: 10 Default: 3
        RequiredMetalworkingLevel = 3,
        -- How many tiles away the build action searches for materials in inventory, bags, floor items, and nearby containers. Min: 0 Max: 5 Default: 2
        BuildMaterialSearchRadius = 2,
        -- Real-time seconds spent building a Barrel Smoker. Min: 1 Max: 300 Default: 20
        BarrelSmokerBuildTimeSeconds = 20,
        -- Number of blow torch uses consumed by the Barrel Smoker build action. Min: 0 Max: 20 Default: 4
        BlowTorchUsesToBuildSmoker = 4,
        -- When enabled, building a Barrel Smoker creates an inventory item. When disabled, the smoker is placed where the barrel was.
        AutoPickupBuiltSmoker = true,
        -- Allows players to pick up placed Barrel Smokers when they are safe to move.
        AllowSmokerPickup = true,
        -- Maximum number of food entries tracked in a smoker's virtual chamber. Min: 1 Max: 50 Default: 12
        SmokerChamberCapacity = 12,
        -- In-game hours required to turn raw food into smoked food. Min: 0.10 Max: 168.00 Default: 6.00
        SmokingDurationHours = 6.0,
        -- In-game hours required to dry fresh herbs in Dry Herbs mode. Min: 0.10 Max: 168.00 Default: 18.00
        HerbDryingDurationHours = 18.0,
        -- When enabled, Dry Herbs mode requires and slowly consumes small kindling such as twigs, sticks, and branches.
        HerbDryingRequiresKindling = false,
        -- Stored fuel minutes consumed per in-game hour while drying herbs. Default 3 means one bundle of twigs lasts about 100 in-game minutes. Min: 0.10 Max: 60.00 Default: 3.00
        HerbDryingKindlingUsePerHour = 3.0,
        -- Maximum fuel time a smoker can hold. Default fuel values are tuned around logs lasting 60 minutes and planks lasting 15 minutes. Min: 10 Max: 10080 Default: 180
        SmokerMaximumFuelMinutes = 180,
        -- Higher values make each fuel item burn longer in smokers. Min: 0.10 Max: 10.00 Default: 1.00
        SmokerFuelEfficiencyMultiplier = 1.0,
        -- When enabled, active outdoor Barrel Smokers process food more slowly while it is raining.
        RainSlowsOutdoorSmoking = true,
        -- Progress speed for outdoor Barrel Smokers while raining. Lower values mean rain slows smoking more. Min: 0.05 Max: 1.00 Default: 0.50
        RainSmokingSpeedMultiplier = 0.5,
        -- Progress speed for outdoor herb drying while raining. Lower values mean rain slows drying more. Min: 0.05 Max: 1.00 Default: 0.25
        RainHerbDryingSpeedMultiplier = 0.25,
        -- Allows bulk transfer buttons in the smoker interface.
        EnableBulkSmokerTransfer = true,
        -- When enabled, smoked outputs are configured to be effectively non-perishable.
        SmokedFoodNeverSpoils = true,
        -- When enabled, the player who started the smoker gains small Cooking XP when food finishes smoking.
        EnableSmokingCookingXP = true,
        -- Cooking XP awarded for each food item that finishes smoking. Set to 0 to award no XP. Min: 0.00 Max: 25.00 Default: 1.00
        SmokingCookingXPPerItem = 1.0,
        -- Allows animal brains to be smoked into Smoked Brain and enables its noisy eating effect.
        EnableSmokedBrain = false,
        -- In-game minutes the Smoked Brain sound effect can continue after being eaten. Set to 0 to disable the effect. Min: 0 Max: 10080 Default: 120
        SmokedBrainEffectDurationMinutes = 120,
        -- In-game minutes between Smoked Brain sound bursts while the effect is active. Min: 1 Max: 1440 Default: 20
        SmokedBrainSoundIntervalMinutes = 20,
        -- How far zombies can hear each Smoked Brain sound burst. Min: 0 Max: 200 Default: 35
        SmokedBrainSoundRadius = 35,
        -- When enabled, active Barrel Smokers create smoke instead of using a visible flame effect.
        EnableSmokerSmokeVisual = true,
        -- When enabled, active Barrel Smokers inside rooms create generator-like fume danger for players in the same room.
        EnableIndoorSmokeDanger = true,
        -- Multiplier for generator-like fume exposure. Exposure builds while standing in the same room and fades after leaving. Min: 0.00 Max: 10.00 Default: 1.00
        IndoorSmokeDangerSeverity = 1.0,
        -- How quickly fume exposure builds while standing in the same room as an active Barrel Smoker. Min: 0.00 Max: 100.00 Default: 6.00
        IndoorSmokeExposureGainPerMinute = 6.0,
        -- How quickly fume exposure drops after leaving the smoky room. Min: 0.00 Max: 100.00 Default: 20.00
        IndoorSmokeExposureDecayPerMinute = 20.0,
        -- How quickly exposure drops while wearing strong filtered protection in the smoky room. Min: 0.00 Max: 100.00 Default: 12.00
        IndoorSmokeProtectedExposureDecayPerMinute = 12.0,
        -- Exposure amount required before smoker fumes start raising the sickness stat. Min: 0.00 Max: 100.00 Default: 10.00
        IndoorSmokeSicknessStartExposure = 10.0,
        -- How much sickness rises per exposure point above the start threshold. Min: 0.00 Max: 1.00 Default: 0.01
        IndoorSmokeSicknessRate = 0.01,
        -- Highest sickness value smoker fumes can apply. Build 42 sickness uses small decimal values. Min: 0.00 Max: 1.00 Default: 0.65
        IndoorSmokeSicknessMax = 0.65,
        -- Upper recovery step used after leaving the smoky room. Min: 0.00 Max: 1.00 Default: 0.48
        IndoorSmokeSicknessHighStage = 0.48,
        -- Middle recovery step used after leaving the smoky room. Min: 0.00 Max: 1.00 Default: 0.32
        IndoorSmokeSicknessMediumStage = 0.32,
        -- Lowest recovery step before smoker sickness fully clears. Min: 0.00 Max: 1.00 Default: 0.16
        IndoorSmokeSicknessLowStage = 0.16,
        -- Exposure amount required before smoker fumes start reducing general health. Min: 0.00 Max: 100.00 Default: 30.00
        IndoorSmokeHealthDamageStartExposure = 30.0,
        -- General health damage applied each minute once exposure passes the health threshold. Min: 0.00 Max: 20.00 Default: 0.80
        IndoorSmokeHealthDamageBase = 0.8,
        -- Additional health damage per exposure point above the health damage threshold. Min: 0.00 Max: 2.00 Default: 0.05
        IndoorSmokeHealthDamagePerExposure = 0.05,
        -- Maximum general health damage smoker fumes can apply per minute. Min: 0.00 Max: 50.00 Default: 5.00
        IndoorSmokeHealthDamageMax = 5.0,
        -- Endurance drain per fume exposure point. Min: 0.00 Max: 0.10 Default: 0.00
        IndoorSmokeEnduranceDrainRate = 5.0E-4,
        -- Maximum endurance removed per minute by smoker fumes. Min: 0.00 Max: 1.00 Default: 0.05
        IndoorSmokeEnduranceDrainMax = 0.05,
        -- Exposure reduction from filtered gas masks and improvised gas masks. Values near 1 block almost all exposure. Min: 0.00 Max: 1.00 Default: 0.95
        IndoorSmokeGasMaskProtection = 0.95,
        -- Exposure reduction from filtered respirators. Min: 0.00 Max: 1.00 Default: 0.85
        IndoorSmokeRespiratorProtection = 0.85,
        -- Exposure reduction from dust masks and surgical masks. Min: 0.00 Max: 1.00 Default: 0.35
        IndoorSmokeSimpleMaskProtection = 0.35,
        -- Exposure reduction from welding masks. Min: 0.00 Max: 1.00 Default: 0.20
        IndoorSmokeWeldingMaskProtection = 0.2,
    },
    PZCrossbows = {
        -- Multiplies all PZ Crossbows container loot and foraging spawns, including crossbows, bolt quivers, bolts and bolt parts. This combines with each crossbow's individual multiplier. Min: 0.00 Max: 1000.00 Default: 1.00
        LootSpawnMult = 0.7,
        -- Multiplies how often crude crossbows spawn in container loot and foraging. Min: 0.00 Max: 1000.00 Default: 1.00
        CrudeCrossbowSpawnMult = 0.6,
        -- Multiplies how often improved crossbows spawn in container loot and foraging. Min: 0.00 Max: 1000.00 Default: 1.00
        ImprovedCrossbowSpawnMult = 0.5,
        -- Multiplies how often compound crossbows and full-size bolts spawn in container loot and foraging. Min: 0.00 Max: 1000.00 Default: 1.00
        CompoundCrossbowSpawnMult = 0.4,
        -- Multiplies how often hand crossbows and short bolts spawn in container loot and foraging. Min: 0.00 Max: 1000.00 Default: 1.00
        HandCrossbowSpawnMult = 0.5,
        -- Base chance that a lodged wood bolt is recovered intact instead of broken. Min: 0 Max: 100 Default: 40
        BoltWBaseBreakChance = 40,
        -- Extra intact recovery chance added for each Maintenance level. Min: 0 Max: 100 Default: 3
        BoltWBreakChanceScaling = 3,
        -- Base chance that a lodged short wood bolt is recovered intact instead of broken. Min: 0 Max: 100 Default: 50
        BoltSWBaseBreakChance = 50,
        -- Extra intact recovery chance added for each Maintenance level. Min: 0 Max: 100 Default: 3
        BoltSWBreakChanceScaling = 3,
        -- Writes PZ Crossbows diagnostics to the console and log files: which side handles each shot, bolt counters and recovery rolls. Leave off unless you are reporting a bug, as it makes the logs noisy.
        DebugLogging = false,
    },
    PalmPilots = {
        -- Controls new PalmPilot spawns in containers and on office-worker zombies. Original Behavior keeps the previous spawn rates. Other Loot set to None still prevents natural spawns. Default = Original Behavior
        -- 1 = Original Behavior
        -- 2 = None
        -- 3 = Very Rare
        -- 4 = Rare
        -- 5 = Normal
        -- 6 = Common
        SpawnRate = 1,
    },
    PhunMart = {
        -- The probability that a zombie will drop coins upon death. Min: 0 Max: 100 Default: 30
        ChanceToDropChange = 35,
        -- The minimum number of cents a zombie can drop upon death. Min: 5 Max: 1000 Default: 5
        MinCoinsToDrop = 15,
        -- The maximum number of cents a zombie can drop upon death. Min: 10 Max: 1000 Default: 75
        MaxCoinsToDrop = 100,
        -- How a zombie's coin drop reaches the player. This only picks the form it arrives in: the drop chance and the min/max amounts above still apply to all three, as does any per-zone tuning from PhunZones. Default = Loose coins
        -- 1 = Loose coins
        -- 2 = A single Change item
        -- 3 = Straight into the wallet
        ChangeDropMode = 1,
        -- The probability that a cash register holds change when its loot first spawns. It arrives in the same form as zombie drops: loose coins, or a single Change item for the other two settings, since a till has nobody to credit. Min: 0 Max: 100 Default: 40
        ChanceForTillChange = 40,
        -- The minimum number of cents a cash register can hold. Min: 5 Max: 10000 Default: 25
        MinTillChange = 25,
        -- The maximum number of cents a cash register can hold. Min: 5 Max: 10000 Default: 300
        MaxTillChange = 300,
        -- Dropped leaves a wallet on the ground where the player died, to be walked back for, scaled by the return rate below. It lands on the ground rather than on the corpse so that a zombie wandering into a zone that clears zombies cannot carry it off. Kept moves the balance straight to the next character, with nothing to recover. Lost wipes it. Bound pools such as tokens are restored to their allowance in all three. Default = Dropped where they died
        -- 1 = Dropped where they died
        -- 2 = Kept by the player
        -- 3 = Lost
        WalletOnDeath = 1,
        -- If enabled, only the owner of a wallet can pick it up.
        OnlyPickupOwn = true,
        -- If enabled, players can drop currency from their wallet as a pickupable item. Intentional drops are always pickupable by any player, regardless of the wallet pickup setting.
        AllowWalletDrop = true,
        -- If enabled, players can pick up and move shop machines like any other furniture. A shop can override this in its Basics tab. Admins can always move machines.
        ShopsMoveable = false,
        -- If enabled, players can destroy shop machines with a sledgehammer. A shop can override this in its Basics tab. Admins can always destroy machines.
        ShopsDestructible = false,
        -- The first time a player opens a machine, it is marked with a dollar sign on their own world map. Each machine is marked once per character, so a mark the player deletes stays deleted. Players can also turn marks off for themselves under Options > Mods. Default = Only with a pen or pencil
        -- 1 = Disabled
        -- 2 = Only with a pen or pencil
        -- 3 = Always, no writing tool needed
        MarkShopsOnMap = 2,
        -- The percentage of money that is returned to the player on death. 0 means no money is returned, 100 means all money is returned. Only applies when a balance is dropped on the body; the other two options have nothing to scale. Min: 1 Max: 100 Default: 100
        ReturnRate = 100,
        -- The chance that a vanilla vending machine will get converted to a random PhunMart machine. Set to 0 to disable Min: 0 Max: 100 Default: 80
        ChanceToConvert = 80,
        -- The minimum distance between similarly grouped machines Min: 0 Max: 10000 Default: 200
        DefaultDistance = 200,
        -- Maximum cents a player can carry (9999 = $99.99). At cap, coins left on the ground will not be consumed. Set to 0 for no cap. Min: 0 Max: 99999999 Default: 9999
        ChangeCapCents = 9999,
        -- Maximum number of special tokens a player can carry. Set to 0 for no cap. Min: 0 Max: 9999 Default: 60
        TokenCap = 60,
        -- Show the change (coin) currency pool in the shop UI and wallet tab. Disabling hides it from players but does not delete balances.
        EnableChangePool = true,
        -- Show the token currency pool in the shop UI and wallet tab. Disabling hides it from players but does not delete balances.
        EnableTokenPool = true,
        -- The default number of hours between restocking a shop. 0 would mean that (by default) the shops are only ever stocked once Min: 0 Max: 9999999 Default: 72
        DefaultHoursToRestock = 72,
        -- How many hours before a machine becomes a different shop entirely, picked from the ones eligible where it stands. 0 means machines keep the shop they converted as. A machine waits until no player is nearby before changing. Min: 0 Max: 9999999 Default: 0
        DefaultNumOfHoursToReRoll = 0,
        -- How many items a shop stocks when it does not set a roll count of its own. This is the low end of a small range, so 5 stocks 5 to 8. Most shops set their own count and ignore this. Min: 0 Max: 9999999 Default: 5
        DefaultNumOfItemsWhenRestocking = 5,
        -- Maximum number of items allowed in a sticky pool before a warning is logged. Sticky pools always show all their items in a shop. Keep this low to avoid cluttered shops. Min: 1 Max: 999 Default: 10
        MaxStickyItems = 10,
        -- Adds more verbose logging for debugging purposes. Only use if you know what you're doing.
        Debug = false,
        -- If set, only players whose role name matches this value (case-insensitive) can open the editor. Leave empty to allow all players with access to debug/admin menu (or always allow in singleplayer).
        EditorRole = "",
    },
    WorldPingSystem = {
        -- Maximum horizontal distance from the target square at which another player receives the ping. The sender always receives their own accepted ping. Default = 30 tiles
        -- 1 = 15 tiles
        -- 2 = 30 tiles
        -- 3 = 50 tiles
        -- 4 = Unlimited
        PingVisibilityRange = 2,
        -- Number of real-time seconds visual ping indicators remain visible. Range: 2 to 10 seconds. Min: 2 Max: 10 Default: 3
        PingDuration = 3,
        -- Minimum real-time delay between automatic context pings. Ping-wheel commands ignore this setting and instead use built-in anti-spam protection. Default = 1 second
        -- 1 = No cooldown
        -- 2 = 1 second
        -- 3 = 2 seconds
        -- 4 = 5 seconds
        PingCooldown = 2,
        -- When enabled, nearby recipients must share the sender's faction or be allowed in the same safehouse. A player with neither group only sees their own pings.
        RestrictToFaction = false,
    },
    PDTags = {
        -- Default = Default (Vanilla)
        -- 1 = Default (Vanilla)
        -- 2 = ID Card
        -- 3 = Dog Tags
        -- 4 = Passport
        -- 5 = Badge
        -- 6 = Toy Badge
        -- 7 = Credit Card
        -- 8 = Business Card
        -- 9 = Speeding Ticket
        -- 10 = Random
        IDSpawnType = 1,
        -- In SP, Account uses Steam name. Default = Character
        -- 1 = Character
        -- 2 = Account
        -- 3 = Steam
        IDNameType = 3,
        -- Show ID selector in clothing menu.
        AllowSpawnSelect = true,
    },
    PAR = {
        -- When ON (default), adding or removing an attachment slot consumes materials (Leather Strips, Thread), requires Scissors + Needle, and a minimum Tailoring level. When OFF, adding and removing slots is free and needs no skill.
        RequireSlotCost = true,
        -- Minimum Tailoring skill level required to add an attachment slot. Only applies when the slot cost option is ON. Removing a slot never requires a skill. Min: 0 Max: 10 Default: 2
        SlotTailoringLevel = 2,
        -- When ON (default), right-clicking an attached item offers "Adjust attachment position", letting each player fine-tune where attached items sit on their bags. It is purely visual and local to that player - nothing is sent to the server, and settings persist between play sessions. Turn OFF if you want everyone to see the mod's default placement.
        AllowCalibration = true,
    },
    PIP = {
        -- When on, pipes automatically water nearby crops from connected rain barrels.
        EnableAutoWatering = true,
        -- In-game minutes between each watering cycle. Min: 1 Max: 1440 Default: 10
        WateringInterval = 10,
        -- 0 = the pipe's own tile only. Higher values water crops in a square area around each pipe. Min: 0 Max: 10 Default: 0
        WateringRadius = 0,
        -- When on, pipes fill crops up to their optimal water level. When off, they add a fixed small amount each cycle.
        SmartPipes = true,
        -- Maximum water level added to a crop per cycle in Smart Pipes mode. Min: 3 Max: 100 Default: 20
        SmartPipesFillMax = 20,
        -- When on, barrels connected in the same network share and balance their water (a full and an empty barrel even out).
        SharedWaterPool = true,
        -- When on, pour Fertilizer or Compost into a connected rain barrel and the pipe network auto-fertilizes nearby crops (one safe dose per crop, never over-fertilizes). On by default.
        EnableFertigation = true,
        -- Simulated Farming skill used when auto-fertilizing. Higher = better chance of a yield bonus. Does not affect safety. Min: 0 Max: 10 Default: 5
        FertigationSkill = 5,
        -- How many crops one poured bag can fertilize. Independent of barrel water volume. Min: 1 Max: 100 Default: 10
        ChargesPerBag = 10,
        -- Prints internal logs to the console. For troubleshooting only.
        DebugLogs = false,
    },
    PWS = {
        -- How many days ahead the computer shows exact highs and lows.
        -- 3 days is what a real station can honestly predict. 7 is the most this mod will give you.
        -- Set to 0 to remove precise forecasting entirely. Min: 0 Max: 7 Default: 3
        PreciseForecastDays = 3,
        -- How many days ahead the computer shows a rough trend - warm or cold front only, no numbers - past the precise range.
        -- Beyond about a week, real forecasting is guesswork, so 7 is the limit here. Min: 0 Max: 7 Default: 7
        TrendForecastDays = 7,
        -- How many past days the computer shows, up to 10.
        -- Days when the station had no power leave gaps in the record. Min: 1 Max: 10 Default: 10
        HistoryDays = 10,
        -- How often the meteorology magazine spawns in containers.
        -- The magazine is the only way to learn the recipes, so setting this to 0 disables the mod's crafting. Min: 0 Max: 1000 Default: 100
        MagazineLootMultiplier = 100,
        -- How far the desktop computer can sit from the weather station and still read it.
        -- 1 means right next to it, which is the default and the way the mod is balanced.
        -- The station has to stand outside, so raise this if you would rather keep the computer indoors. Min: 1 Max: 10 Default: 1
        ComputerRange = 1,
        -- How many floors up or down the computer can sit from the weather station and still read it.
        -- 0 means the same floor only, which is the default and changes nothing.
        -- Raise it if you want the station on the roof while the computer stays indoors. Min: 0 Max: 2 Default: 0
        ComputerVerticalRange = 0,
    },
    DAMN = {
        AllowShitSpawns = true,
        AllowGreatScottSpawns = true,
        AllowOinkerSpawns = true,
        AllowPowerChadSpawns = true,
        AllowWreckyMcChevySpawns = true,
        AllowEV6spawns = true,
        AllowTBCspawns = true,
        AllowUBCspawns = true,
        AllowSuckyMcSuckfaceSpawns = true,
        AllowMrBusSpawns = true,
        AllowChonkerSpawns = true,
        AllowCashcowSpawns = true,
        AllowMcBoxySpawns = true,
        AllowBushmasterSpawns = true,
        AllowPro440Spawns = true,
        AllowDemonChildSpawns = false,
    },
    CF8KSweeper = {
        AllowTiles = true,
        -- You can list exact sprite names or the start of tilepacks. Separate them with ;
        SpriteWhitelist = "brokenglass_1_;trash_01_;d_trash_;street_decoration_01_26;street_decoration_01_27;damaged_objects_01_26;damaged_objects_01_27;damaged_objects_01_18;damaged_objects_01_19;damaged_objects_01_20;damaged_objects_01_21",
        AllowBlood = true,
        AllowGrime = true,
        AllowAshes = true,
        AllowItems = true,
        AllowCorpses = true,
        -- WARNING: items and corpses will be gone forever. This has enormous griefing potential so it is disabled by default.
        AllowUserAutoDelete = false,
    },
    ProjectCook = {
        -- Allows Project Cook to use frozen food in Base Cooking and Cooking By Recipes even when the base-game recipe requires thawed ingredients. Disabled by default. Only affects Project Cook.
        AllowFrozenCooking = false,
    },
    ProjectDirtroad = {
        -- Tracks vehicle wear and forms dirt roads. Bush and grass clearing are controlled separately and can remain active when this is disabled.
        EnableVehicleTraffic = true,
        -- Multiplies new vehicle wear, from 0.01 to 100.0. At 1.0, six vehicle passes over a natural square make the first visible track. Extreme values are intended for testing. Min: 0.01 Max: 100.00 Default: 1.00
        WearRate = 1.0,
        -- Multiplies decay of all path wear, from 0 to 100.0. Lower values make paths last longer. Zero pauses decay; increasing it later resumes without catching up on the paused time. Min: 0.00 Max: 100.00 Default: 1.00
        ErosionRate = 1.0,
        -- Speed in km/h required for vehicle passage to count for wear or vegetation clearing. Use zero to count every movement. Min: 0.00 Max: 20.00 Default: 2.00
        MinimumVehicleSpeed = 2.0,
        -- Allows direct vehicle passage to damage and remove bushes and size 1-2 saplings. The first vehicle hit damages them and the second removes them. Foot traffic and path stage changes never damage bushes. Enabled by default.
        ClearBushesWithVehicles = true,
        -- Allows vehicle passage to remove grass and low groundcover. The first pass damages it and the second removes it; any maintained path suppresses its regrowth, including paths formed by foot traffic. Disabled by default.
        ClearGrassWithVehicles = false,
        -- Allows players moving on foot to gradually wear natural ground into paths.
        EnableFootTraffic = true,
        -- Allows loaded zombies moving between squares to contribute player-equivalent foot wear. Disabled by default because large populations require additional processing.
        EnableZombieTraffic = false,
        -- Allows loaded wild and livestock animals moving between squares to contribute player-equivalent foot wear. Disabled by default because large populations require additional processing.
        EnableAnimalTraffic = false,
        -- Multiplies new player, zombie, and animal foot wear, from 0.01 to 100.0. At 1.0, sixty player-equivalent crossings of a natural square make the first visible path. Extreme values are intended for testing. Min: 0.01 Max: 100.00 Default: 1.00
        FootWearRate = 1.0,
        -- Multiplies how often vehicles are sampled, from 1.0 to 10.0. Default 1.0 samples every 10 ticks; 2.0 every 5 ticks; 10.0 every tick. Higher values improve fast-moving vehicle tracking at increased processing cost. Does not multiply wear per passage or change creature sampling frequency. Min: 1.00 Max: 10.00 Default: 1.00
        VehicleSamplingMultiplier = 1.0,
        -- Writes traffic, vegetation, and road-stage changes to the Project Zomboid log. Leave off for normal play.
        DebugLogging = false,
        -- Treat sand like other natural terrain: PDR dirt paths will overlay sand squares. Disable to keep sand as a permanent surface that PDR does not wear.
        OverlaySand = false,
        -- Keeps tracking traffic, wear, erosion, and configured vegetation clearing, but removes and hides every Project Dirtroad path sprite. Disable this again to rebuild paths from their retained wear.
        InvisiblePaths = false,
        -- Stops every Project Dirtroad feature and permanently removes Project Dirtroad sprites and data as squares are encountered. Turning this off resumes normal operation, but cleaned paths cannot be restored and must form again.
        CleanupMode = false,
    },
    Parkour = {
        -- A spinning kick that shoves and damages standing zombies in a forward cone. Does not hit players. Assign a key in Options > Mods > Parkour.
        EnableArmadaKick = true,
        -- Required Parkour level. Default: 6. Progression off and Unlock all abilities bypass this requirement. Min: 0 Max: 10 Default: 6
        ArmadaKickUnlockLevel = 6,
        -- Fixed damage to each hit zombie: 100 HP equals 1.0 engine health, not a percentage of its maximum health. Default: 75. Set to 0 for shove only. Min: 0.00 Max: 1000.00 Default: 75.00
        ArmadaKickDamage = 75.0,
        -- Maximum distance from the character. Walls, closed doors, windows and fences block the kick. Default: 3. Min: 0.50 Max: 5.00 Default: 3.00
        ArmadaKickRange = 3.0,
        -- Full width of the cone in front of the character. Default: 90 (45 degrees each side). Min: 15.00 Max: 180.00 Default: 90.00
        ArmadaKickAngle = 90.0,
        -- Minimum time between kicks, enforced by the server in multiplayer. Default: 1.8. Min: 1.35 Max: 30.00 Default: 1.80
        ArmadaKickCooldown = 1.8,
        -- Endurance spent once per accepted kick, including misses. Uses the global endurance-cost toggle and multiplier. Default: 6. Min: 0.00 Max: 100.00 Default: 6.00
        ArmadaKickEnduranceCost = 6.0,
        -- When disabled, level requirements are bypassed. Physical restrictions and individual animation toggles still apply.
        EnableProgression = true,
        -- Debug-friendly override for level gates. The real Parkour level and mastery bonuses are not changed.
        UnlockAllParkour = false,
        -- Multiplies XP awarded by Parkour actions in addition to the standard skill multiplier. Min: 0.00 Max: 10.00 Default: 1.00
        XPMultiplier = 1.5,
        -- Blocks repeat XP from the same obstacle until 30 seconds pass and the player moves at least 20 tiles away.
        EnableAntiFarm = true,
        -- Sets the Parkour level required for Wall Run. Set to 0 to unlock it immediately. Min: 0 Max: 10 Default: 8
        WallRunUnlockLevel = 8,
        -- When enabled, Wall Run unlocks at Parkour level 5 instead of the configured standard level. Disabled by default.
        UnlockWallRunAtLevel5 = false,
        -- Controls optional early-level backpack restrictions. Actual overloading always blocks mod-owned Parkour mechanics; normal weight within maximum capacity is always allowed. Default = Hybrid
        -- 1 = Off
        -- 2 = Backpack progression only
        -- 3 = Overloading only
        -- 4 = Hybrid
        LoadRestrictionMode = 4,
        -- Relevant blocks serious injuries to body parts needed by the move; Strict blocks any deep wound or fracture. Default = Relevant
        -- 1 = Off
        -- 2 = Relevant
        -- 3 = Strict
        InjuryRestrictionMode = 2,
        -- Scales the minimum endurance required to begin Parkour actions. Min: 0.00 Max: 2.00 Default: 1.00
        MinimumEnduranceMultiplier = 1.0,
        -- Makes manual Parkour mechanics consume endurance after successful use.
        EnableEnduranceCosts = true,
        -- Scales the endurance consumed by manual Parkour mechanics. Min: 0.00 Max: 3.00 Default: 1.00
        ActionCostMultiplier = 1.0,
        -- Base Dodge endurance cost as a percentage at Parkour level 3. Min: 0.00 Max: 100.00 Default: 10.00
        DodgeCostLevel3 = 10.0,
        -- Dodge endurance cost as a percentage at Parkour level 10; intermediate levels are interpolated. Min: 0.00 Max: 100.00 Default: 6.00
        DodgeCostLevel10 = 6.0,
        -- Section separator only. Changing this checkbox has no effect.
        SeparatorLowFenceVaults = false,
        -- Allows Parkour_FrontFlip to be selected for a successful running vault over a low fence.
        EnableFrontFlip = true,
        -- Allows Parkour_CorkscrewVault to be selected for a successful running vault over a low fence.
        EnableCorkscrewVault = true,
        -- Allows Parkour_DashVault to be selected for a successful running vault over a low fence.
        EnableDashVault = true,
        -- Allows Parkour_DiveRoll to be selected for a successful running vault over a low fence.
        EnableDiveRoll = true,
        -- Allows the full Parkour_WindowVault animation to be selected for a successful running vault over a low fence after Parkour level 3.
        EnableLowFenceWindowVault = true,
        -- Allows Parkour_Webster to be selected for a successful running vault over a low fence after Parkour level 4.
        EnableWebster = true,
        -- Allows Parkour_BackflipVault to be selected for a successful running vault over a low fence.
        EnableBackflipVault = true,
        -- Allows Parkour_SpeedVault to be selected for a successful sprint vault over a low fence.
        EnableSpeedVault = true,
        -- Allows Parkour_VaultOver to be selected for a successful sprint vault over a low fence.
        EnableVaultOver = true,
        -- Allows Parkour_ReverseVault to replace a successful low-fence climb performed without running or sprinting.
        EnableReverseVault = true,
        -- Section separator only. Changing this checkbox has no effect.
        SeparatorWindowVaults = false,
        -- Allows the custom two-part window vault after it is unlocked.
        EnableWindowVault = true,
        -- Automatically uses Parkour_SprintWindowVault when sprinting into an open or broken window, or an empty window frame.
        EnableSprintWindowVault = true,
        -- Section separator only. Changing this checkbox has no effect.
        SeparatorRecoveryAnimations = false,
        -- Allows Parkour_FallRollLanding after it is unlocked.
        EnableFallRollLanding = true,
        -- Allows Parkour_GetUpBack after it is unlocked.
        EnableGetUpBack = true,
        -- Allows Parkour_BumpRecovery after it is unlocked.
        EnableBumpRecovery = true,
        -- Allows Parkour_VaultStumble after it is unlocked.
        EnableVaultStumble = true,
        -- Section separator only. Changing this checkbox has no effect.
        SeparatorHighFenceVaults = false,
        -- Allows Parkour_HighFenceFrontFlip to be selected for a successful climb over a high fence. Failed and struggle climbs remain vanilla.
        EnableHighFenceFrontFlip = true,
        -- Allows Parkour_HighFenceVault02 to be selected for a successful climb over a high fence. Failed and struggle climbs remain vanilla.
        EnableHighFenceVault02 = true,
        -- Section separator only. Changing this checkbox has no effect.
        SeparatorMovementActions = false,
        -- Allows players to use Parkour_WallRunUp to climb a full wall onto a clear roof one level above.
        EnableWallRunUp = true,
        -- Allows the FreeJump action to clear low fences and ordinary obstacles, but never walls or tall fences.
        EnableFreeJump = true,
        -- Section separator only. Changing this checkbox has no effect.
        SeparatorDodges = false,
        -- Allows Parkour_ForwardRollDodge to be selected for the forward dodge branch.
        EnableDodgeForwardRollForward = true,
        -- Allows Parkour_CombatRollForward to be selected for forward and non-directional dodges.
        EnableDodgeCombatRollForward = true,
        -- Allows Parkour_LowDiveDodgeForward to be selected for forward and non-directional dodges.
        EnableDodgeLowDiveForward = true,
        -- Allows Parkour_CorkscrewEvadeBack to be selected for the backward dodge branch.
        EnableDodgeCorkscrewEvadeBack = true,
        -- Allows Parkour_BackflipDodge to be selected for the backward dodge branch.
        EnableDodgeBackflipBack = true,
        -- Allows Parkour_SideFlipDodgeLeft to be selected for the left dodge branch.
        EnableDodgeSideFlipLeft = true,
        -- Allows Parkour_ButterflyDodgeRight to be selected for the right dodge branch.
        EnableDodgeButterflyRight = true,
        -- Section separator only. Changing this checkbox has no effect.
        SeparatorDebug = false,
        -- Writes selected vault, dodge, jump, and traversal diagnostics to console.txt.
        DebugLogging = false,
    },
    PIW = {
        -- If disabled, the following features won't be active: 'Chance of wound infection', 'Wound infection strength', 'Dirty bandage safe wear time' and 'Wound infection damage modifier'.
        enableinfection = true,
        -- Changes chance of getting wound infection, default chance is 10/1000, updated every in-game minute after safe wear time. Min: 1 Max: 1000 Default: 11
        chanceofinfection = 7,
        -- Changes how potent do you want the wound infection to be. Min: 0.01 Max: 8.00 Default: 0.75
        infectionstrength = 0.65,
        -- Changes how long you can wear dirty bandage before you have chance to get wound infection (Measured with in-game minutes, on default settings 24 in-game minutes = 1 real minute). Min: 1 Max: 10000 Default: 240
        safetime = 300,
        -- Changes modifier of wound infection damage. Min: 0.00 Max: 1000.00 Default: 0.00
        infectiondamage = 0.0,
        -- Changes if wearing dirty bandages on wounds does damage.
        unsafedirtybandages = false,
        -- Changes modifier of dirty bandage damage. (Does nothing if 'Dirty bandages do damage' is disabled). Min: 0.00 Max: 1000.00 Default: 2.25
        dirtybandagesdamage = 2.25,
        -- Changes if you have reduced healing when you have infected wound (Beware: Indirectly increases damage).
        reducedhealingwhilewounded = false,
        -- Changes the percentage (ex. 0.3 = 30%) of default healing while you have wound infection (Does nothing if 'Infected wound reduces healing' is disabled). Min: 0.00 Max: 1.00 Default: 0.50
        reducedhealingwhilewoundedammount = 0.5,
        -- Enables getting sick from having wound infection.
        sicknessenabled = true,
        -- Changes the potency and speed of getting sick. Default = Low
        -- 1 = Very low
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        -- 5 = Very high
        sicknessdificulty = 1,
        -- Changes how long you can have wound infection before starting to get sick (Measured with in-game minutes, on default settings 24 in-game minutes = 1 real minute). Min: 1 Max: 10000 Default: 270
        sicknesssafetime = 320,
    },
    PushVehicle = {
        -- Allow vehicles to be turned by pushing near the front or rear section of either side. Disable this to restrict Push Vehicle to front and rear pushing only.
        AllowSidePushing = true,
        -- Multiplies the stamina consumed by each successful push. 1.0 keeps the original stamina cost; 0 disables stamina cost. Min: 0.00 Max: 10.00 Default: 1.00
        StaminaCostMultiplier = 1.0,
        -- Minimum time in seconds between successful pushes by the same player. 0 disables the cooldown. Min: 0.00 Max: 10.00 Default: 1.00
        PushCooldownSeconds = 1.0,
        -- Vehicles heavier than this cannot be pushed. Set to 0 for no weight limit. Min: 0 Max: 100000 Default: 0
        MaximumPushableWeight = 0,
    },
    ReactiveSE = {
        -- Minimum IN-GAME HOURS before events can occur Min: 1 Max: 720 Default: 48
        MinEventCooldown = 100,
        -- Maximum IN-GAME HOURS before an event is guaranteed Min: 2 Max: 720 Default: 240
        MaxEventCooldown = 300,
        -- Probability of an event per 10-MINUTE CHECK after minimum cooldown Min: 1 Max: 20 Default: 4
        EventChance = 4,
        -- If enabled, probability stays flat. If disabled, probability increases until max cooldown (legacy)
        FlatProbability = true,
        -- Minimum distance (in tiles) from the player where sound events can spawn Min: 120 Max: 1000 Default: 200
        MinSoundRange = 150,
        -- Maximum distance (in tiles) from the player where sound events can spawn Min: 120 Max: 1000 Default: 600
        MaxSoundRange = 500,
        -- If a sound occurs within this distance, the player may panic or wake up. Sounds beyond this range will only be heard. Must be between the minimum and maximum sound range; otherwise it is adjusted automatically Min: 120 Max: 1000 Default: 300
        ReactionThresholdRange = 300,
        -- Probability an event spawns at close range Min: 0 Max: 100 Default: 20
        CloseDistanceChance = 20,
        -- Probability an event spawns at medium range Min: 0 Max: 100 Default: 40
        MediumDistanceChance = 40,
        -- Probability an event spawns at far range Min: 0 Max: 100 Default: 40
        FarDistanceChance = 40,
        -- Allow zombies to react to sound events
        EnableZombieHearing = true,
        -- [DEV] Enables debug logging and visual helpers
        EnableDebugMode = false,
    },
    ReactiveSEEvents = {
        -- Animal sounds occurring in the distance
        EnableAnimalEvents = true,
        -- Gunfights between survivors
        EnableGunfightEvents = true,
        -- Single shots heard in the distance
        EnableGunshotEvents = true,
        -- Distant screams of survivors
        EnableScreamEvents = true,
        -- Vehicles crashing or colliding
        EnableVehicleCrashEvents = true,
        -- Weather-related sounds such as lightning
        EnableWeatherEvents = true,
        -- Zombie noises occurring in the distance
        EnableZombieEvents = true,
    },
    ReactiveSEBehavior = {
        -- Adjust event chances based on the player's aggressive or passive behavior
        EnablePlayerStyle = true,
        -- Kills per day required to consider the player aggressive Min: 10 Max: 200 Default: 40
        AggressiveStyleKills = 40,
        -- Days without killing zombies required to consider the player passive Min: 1 Max: 7 Default: 2
        PassiveStyleDays = 2,
        -- Player may panic when a sound event happens within reaction range
        EnablePlayerReactionPanic = true,
        -- Sleeping player may wake up if a sound event happens nearby
        EnablePlayerReactionWakeUp = true,
    },
    ReactiveSEScenes = {
        -- Enable physical scenes generated from sound events
        EnableEventScenes = true,
        -- Chance for a sound event to generate a scene Min: 0 Max: 100 Default: 100
        EventSceneChance = 100,
        -- Hours before generated scenes are automatically cleaned up (0 = disabled) Min: 0 Max: 168 Default: 72
        SceneCleanupHours = 72,
        -- Events with scenes look for a place in towns, trailer parks and roads first. They only happen in forests or fields when there is no other place in range
        PreferTownsAndRoads = false,
        -- Generate corpse scenes when gunfight sounds occur
        EnableGunfightScene = true,
        -- Generate single corpse when gunshot sounds occur
        EnableGunshotScene = true,
        -- Generate corpse when scream sounds occur
        EnableScreamScene = true,
        -- Maximum zombies that may spawn with scream scenes (0 = disabled) Min: 0 Max: 10 Default: 3
        ScreamZombieCount = 3,
        -- Spawn crashed vehicles when crash sounds occur
        EnableVehicleCrashScene = true,
        -- Maximum condition of vehicles spawned in scenes Default = Low
        -- 1 = Very Low
        -- 2 = Low
        -- 3 = Normal
        -- 4 = High
        -- 5 = Very High
        VehicleMaxCondition = 2,
        -- Chance that a spawned vehicle contains its key Min: 0 Max: 100 Default: 25
        VehicleKeyChance = 25,
        -- Spawn zombie groups when zombie sounds occur
        EnableZombieScene = true,
        -- Minimum number of zombies spawned in a Zombie event Min: 1 Max: 20 Default: 8
        ZombieSceneMin = 8,
        -- Maximum number of zombies spawned in a Zombie event Min: 1 Max: 20 Default: 16
        ZombieSceneMax = 16,
        -- Notify the player when a scene spawns nearby
        EnableSceneSpawnNotify = true,
        -- Player says something when a scene spawns nearby
        SceneSpawnNotifyText = true,
        -- Show the directional marker when a scene spawns nearby
        SceneSpawnNotifyMarker = true,
    },
    ReactiveSELoot = {
        -- Overall quality of loot found in scenes Default = Dynamic
        -- 1 = Dynamic
        -- 2 = Poor
        -- 3 = Normal
        -- 4 = Rich
        LootQuality = 2,
        -- Maximum condition of weapons found in scenes Min: 10 Max: 100 Default: 100
        WeaponMaxCondition = 100,
        -- Chance that a ranged weapon appears in a scene Min: 0 Max: 100 Default: 10
        RangedWeaponChance = 10,
        -- Minimum probability that a backpack is stolen from a corpse. Applied during End Game. Min: 0 Max: 100 Default: 0
        MinBackpackStealChance = 0,
        -- Maximum probability that a backpack is stolen from a corpse (scales with World Tier). Applied during Early Game. Min: 0 Max: 100 Default: 70
        MaxBackpackStealChance = 70,
        -- Controls how scarce ammunition is in scenes Default = Scarce
        -- 1 = None
        -- 2 = Scarce
        -- 3 = Normal
        -- 4 = Abundant
        AmmoScarcity = 2,
        -- Minimum number of items generated per SubKit (Dynamic Loot: Early Game) Min: 1 Max: 10 Default: 1
        SubKitCountMin = 1,
        -- Maximum number of items generated per SubKit (Dynamic Loot: End Game) Min: 1 Max: 10 Default: 3
        SubKitCountMax = 3,
    },
    ReactiveSEWorld = {
        -- Maximum number of corpses spawned in a scene Min: 2 Max: 8 Default: 3
        CorpseCount = 3,
        -- Defines the last day considered Early Game. Mid Game starts Min: 1 Max: 365 Default: 7
        WorldTierEarlyEnd = 7,
        -- Defines the last day considered Mid Game. Late Game starts Min: 2 Max: 365 Default: 30
        WorldTierMidEnd = 30,
        -- Defines the last day considered Late Game. End Game starts Min: 3 Max: 365 Default: 90
        WorldTierLateEnd = 90,
        -- On the vanilla map nothing across the Ohio river is reachable (north of Riverside and West Point, west and north of Louisville), so events never happen there. Enable only if a map mod adds content on that side
        AllowEventsBeyondOhio = false,
    },
    ReactiveSERadio = {
        -- Enable the Knox Relay radio station that broadcasts scene locations and survival stories
        EnableRadioFeature = true,
        -- Allow players to mark intel coordinates on their map via the radio context menu. Disable to prevent players from using this feature
        EnableMapMarker = true,
        -- Allow players to gain XP from listening to the morning show
        EnableMorningShowXP = true,
    },
    ReadAloud = {
        -- Distance in tiles within which nearby players can listen. Also sets the base radius for zombie hearing noise. Min: 2 Max: 16 Default: 5
        HearingRadiusTiles = 5,
        -- If enabled, listeners say start/stop listening lines in chat bubbles.
        ListenerAnnounce = true,
        -- If enabled, the reader says start/progress lines in chat bubbles.
        ReaderAnnounce = true,
        -- If enabled, progress lines use per-book milestone sentences at each 10 percent threshold.
        ReaderProgressSentenceMode = true,
        -- How many pages between reader progress chat announcements. Set to 0 to disable generic progress announcements. Min: 0 Max: 600 Default: 10
        AnnounceEveryPages = 10,
        -- If enabled, players can read aloud books they have already completed or outleveled to teach nearby listeners. The teacher gains no pages or XP. Disable to restore the vanilla denies.
        TeachReading = false,
        -- If enabled, illiterate players can gain read pages by listening to a nearby reader.
        AllowIlliterateListening = false,
        -- If enabled, reading aloud attracts nearby zombies with periodic noise events.
        ZombieNoiseEnabled = false,
        -- Attracts nearby zombies every N pages while reading aloud. Min: 1 Max: 600 Default: 5
        ZombieNoiseEveryPages = 5,
        -- Radius in tiles for the sound reading aloud makes. 0 derives it from the listening radius (1.5x). Min: 0 Max: 64 Default: 0
        ZombieNoiseRadius = 0,
        -- Volume of the world sound reading aloud makes. 0 = auto (matches the noise radius). Min: 0 Max: 100 Default: 0
        ZombieNoiseVolume = 0,
    },
    RRH2 = {
        -- Default: disabled. Enables server diagnostics and administrator-only Heating Info, Heater Info and temperature overlay tools (also available in singleplayer). WARNING: diagnostic collection and logging may increase server load and cause lag. Use only for troubleshooting. Disabled skips optional debug collection; normal heating simulation and multiplayer synchronization still run. Restart the server/world and reconnect clients after changing this option.
        DebugMode = false,
        -- Default: disabled. Removes vanilla's automatic 22°C indoor temperature baseline while city power is available, including heating in cold weather and cooling in hot weather. Room temperatures follow Real Room Heat's simulation, including heaters, insulation and outdoor weather. Electricity and original room lighting follow the normal power supply.
        DisableVanillaIndoorBaseline = false,
        -- Default: disabled. Uses RRH room temperature for body response in supported Build 42.21.0 singleplayer and multiplayer. Warmth uses native thermoregulation; missing cold uses bounded core and regional skin corrections. Multiplayer corrections are server-owned while native simulation continues. Vehicle cabins retain the normal game body response. Multiplayer metabolism, drying and thermal damage retain native behavior.
        BodyTempRework = false,
        -- Default: disabled. Replaces the character Temperature tab with the RRH view, body-part comparison and core-temperature history. History collects while the window is closed: a 15-minute window, sampled every 5 seconds at normal speed, following game speed and pauses. Building and vehicle entry/exit markers are detected at sampling time. History is held in memory for the current session only. Does not change temperature simulation or enable Body Temperature Rework. Disable to restore the vanilla view and stop history collection.
        TemperatureViewRework = false,
        -- Default: disabled. Generators use RRH behavior: they must be connected to a nearby building from their Generator menu. During a power outage a connected generator powers only the building's electric devices. The game's "Generator tile range" is set to 1. Disabled: generators work exactly as in vanilla. While the mod LG Extended Electricity is loaded, generators always follow vanilla and LG, whatever this setting.
        GeneratorBuildingLinks = false,
        -- Default: 6. Maximum horizontal distance in tiles between a heat pump's indoor and outdoor unit, and between Frostline CR-65 units. Levels do not count, so an indoor unit in a basement or bunker can connect to an outdoor unit on the ground or a flat roof above it. Lowering this value stops existing systems whose units are farther apart, and their panel shows "Line too long", until they are moved closer and connected again. Min: 1 Max: 12 Default: 6
        HeatPumpMaxRange = 6,
        -- Default: RRH clock.
        -- Vanilla clock: Real Room Heat leaves the game's clock alone.
        -- No clock: hides the game's on-screen clock.
        -- RRH clock: replaces the game's clock with Real Room Heat's own clock, which shows the room temperature Real Room Heat simulates. Right-click it to change its colours.
        -- Lua Digital Watch UI is optional. If it is loaded, its clock is shown in every mode and displays the Real Room Heat temperature. Default = RRH clock
        -- 1 = Vanilla clock
        -- 2 = No clock
        -- 3 = RRH clock
        DigitalClock = 3,
        -- Maximum number of individual perishable food items tracked by RRH cold-storage rooms, including fully frozen food. The total limit is shared by all cold-storage rooms.
        -- Default: 512 per room / 1,024 total.
        -- Food beyond either limit does not receive RRH refrigeration or freezing.
        -- WARNING: Higher limits increase CPU and memory usage and may cause stuttering or delayed food updates, especially in singleplayer.
        -- Lowering the limit may leave some previously tracked food outside RRH processing after restart. Default = 512 per room / 1,024 total (default)
        -- 1 = 512 per room / 1,024 total (default)
        -- 2 = 1,024 per room / 2,048 total (high)
        -- 3 = 2,048 per room / 4,096 total (very high - experimental)
        ColdStorageFoodLimit = 1,
    },
    RB = {
        -- Min: 1.00 Max: 10000.00 Default: 20.00
        HandmadeCapacity = 35.0,
        -- Min: 0.00 Max: 99.00 Default: 70.00
        HandmadeWeightReduction = 80.0,
        -- Min: 0.10 Max: 10.00 Default: 0.50
        HandmadeWeight = 0.5,
        -- Min: 0.50 Max: 1.00 Default: 0.95
        HandmadeRunSpeedModifier = 0.95,
        -- Min: 1.00 Max: 10000.00 Default: 30.00
        HuntingCapacity = 50.0,
        -- Min: 0.00 Max: 99.00 Default: 80.00
        HuntingWeightReduction = 85.0,
        -- Min: 0.10 Max: 10.00 Default: 1.50
        HuntingWeight = 1.5,
        -- Min: 0.50 Max: 1.00 Default: 0.92
        HuntingRunSpeedModifier = 0.92,
        -- Min: 1.00 Max: 10000.00 Default: 45.00
        AssaultCapacity = 70.0,
        -- Min: 0.00 Max: 99.00 Default: 85.00
        AssaultWeightReduction = 95.0,
        -- Min: 0.10 Max: 10.00 Default: 2.00
        AssaultWeight = 2.0,
        -- Min: 0.50 Max: 1.00 Default: 0.88
        AssaultRunSpeedModifier = 0.88,
        -- Min: 1.00 Max: 10000.00 Default: 45.00
        SleepingBagCapacity = 55.0,
        -- Min: 0.00 Max: 99.00 Default: 85.00
        SleepingBagWeightReduction = 90.0,
        -- Min: 0.10 Max: 10.00 Default: 2.10
        SleepingBagWeight = 2.1,
        -- Min: 0.50 Max: 1.00 Default: 0.88
        SleepingBagRunSpeedModifier = 0.88,
    },
    RealisticFullMoonlight = {
        -- Vanilla: 0,33 Adjusts the red component of the moonlight for the exterior. Range: 0.0 (no red) to 1.0 (full red). Min: 0.00 Max: 1.00 Default: 0.50
        MoonlightExteriorR = 0.5,
        -- Vanilla: 0,33 Adjusts the green component of the moonlight for the exterior. Range: 0.0 (no green) to 1.0 (full green). Min: 0.00 Max: 1.00 Default: 0.50
        MoonlightExteriorG = 0.5,
        -- Vanilla: 0,33 Adjusts the blue component of the moonlight for the exterior. Range: 0.0 (no blue) to 1.0 (full blue). Min: 0.00 Max: 1.00 Default: 0.50
        MoonlightExteriorB = 0.5,
        -- Vanilla: 0,8 Adjusts the intensity (alpha) of the moonlight for the exterior. Range: 0.0 (completely dark) to 1.0 (fully lit). Min: 0.00 Max: 1.00 Default: 0.80
        MoonlightExteriorA = 0.8,
    },
    RedsQuickRead = {
        SpeedPreset = 3,
        -- Min: 1.00 Max: 1000.00 Default: 25.00
        CustomMultiplier = 25.0,
    },
    RedsSolarPowerFramework = {
        -- Min: 0.25 Max: 4.00 Default: 1.00
        SolarOutputMultiplier = 1.0,
        -- Min: 5 Max: 30 Default: 20
        ConnectionRadius = 20,
        -- Min: 1 Max: 12 Default: 6
        MaxPanelsPerStation = 6,
        WeatherAffectsOutput = true,
        -- Min: 0.25 Max: 4.00 Default: 1.00
        PillarChargeMultiplier = 1.0,
        -- Min: 0 Max: 168 Default: 48
        OfflineCatchupHours = 48,
    },
    Roll = {
        -- Chances to remove the fire on character with each roll. <LINE>0 -> never <LINE>100 -> always Min: 0 Max: 100 Default: 25
        ExtinguishFireChances = 25,
        -- Press the roll key just before hitting the ground to roll out of the fall and take less damage.
        LandingRollEnabled = true,
        -- How long before the impact the roll key must be pressed for the landing roll to trigger. <LINE>Lower -> harder to time. Min: 100 Max: 1000 Default: 300
        LandingRollWindowMs = 300,
        -- Share of the fall damage absorbed by a landing roll with no skill at all, in percent. <LINE>Each level of Fitness and Nimble adds 2 points. Min: 0 Max: 100 Default: 40
        LandingRollBaseMitigation = 40,
        -- Upper bound on the share of the fall damage a landing roll can absorb, in percent. <LINE>100 -> a well trained character takes no fall damage at all. Min: 0 Max: 100 Default: 90
        LandingRollMaxMitigation = 90,
        -- Highest fall a landing roll can be attempted from, in tiles. <LINE>Above that the fall is handled by the game as usual. <LINE>A fall of 3.5 tiles or more is lethal. Min: 1 Max: 10 Default: 3
        LandingRollMaxHeight = 3,
    },
    J93RunningBloodPools = {
        -- Master switch for new persistent blood pools and their bloody footprint trails. Existing native blood remains subject to the world's normal blood rules.
        Enabled = true,
        -- When enabled, newly dead player corpses can create the same persistent blood pools as zombie corpses. Uses the shared corpse chance, growth, aging, rain, cleaning, and footprint rules.
        PlayerCorpsePoolsEnabled = true,
        -- Percentage chance that an eligible newly killed zombie or enabled dead player corpse creates a persistent pool record. In multiplayer this roll is made only by the server. Min: 0 Max: 100 Default: 100
        CorpseChance = 100,
        -- How long a new pool takes to finish growing while loaded. Interrupted growth progress is persisted and resumes after reload or restart. Min: 2 Max: 60 Default: 8
        SpreadDurationSeconds = 8,
        -- Number of deterministic outward growth steps stored with each pool. More steps create smoother growth and more native floor-blood deposits. Min: 3 Max: 36 Default: 32
        GrowthSteps = 24,
        -- Base number of deterministic native blood deposits in each growth step. Higher values create denser pools and more decals. Min: 1 Max: 10 Default: 4
        SplatsPerStep = 4,
        -- Maximum distance from the pool center. The server stores the chosen radius in each persistent pool record so every client sees the same geometry. Min: 0.15 Max: 2.50 Default: 1.00
        MaximumRadius = 1.0,
        -- Multiplies blood deposited by the deterministic core and growth steps. 1.20 is the intended default, 1.00 is baseline, and 3.00 is the experimental maximum. Min: 0.50 Max: 3.00 Default: 1.50
        PoolGoreMultiplier = 2.0,
        -- Walking through a sufficiently wet tracked pool can contaminate the player's trail. In multiplayer the server decides when contamination begins and where footprints are placed.
        BloodyFootstepsEnabled = true,
        -- When enabled, zombies that walk through a wet tracked pool can carry blood away in persistent footprints just like survivors. Uses the same footprint count, spacing, drying, cleaning, and rain-wash rules.
        ZombieBloodyFootstepsEnabled = true,
        -- Maximum alternating marks produced by a completely fresh pool. Drying pools automatically produce fewer prints according to their calculated wetness. Min: 4 Max: 60 Default: 14
        FootstepCount = 12,
        -- Travel distance required between server-authoritative bloody marks. Smaller values create tighter trails; larger values spread them farther apart. Min: 0.15 Max: 1.00 Default: 0.38
        FootstepSpacing = 0.35,
        -- Controls world-age wetness loss. When enabled, old pools gradually stop transferring blood to shoes. Visual thinning is controlled separately.
        PoolAgingEnabled = true,
        -- In-game days for ordinary age-based wetness to fall from 1.0 to 0.0. Rain can dry exposed blood much faster. Native Blood Splat Lifespan remains the hard upper limit. Min: 0.25 Max: 30.00 Default: 1.00
        FootprintDryDays = 0.5,
        -- When enabled, deterministic peripheral deposits disappear first as blood ages. Disable this to keep pools visually full while wetness can still decline.
        VisualAgingEnabled = true,
        -- Time-based drying will never thin a pool below this percentage of its original deterministic deposits. Rain and vanilla cleanup can still remove more. Min: 10.00 Max: 80.00 Default: 35.00
        MinimumDriedStainPercent = 35.0,
        -- When enabled, rain physically erodes persistent pools that are outside and exposed to weather. Indoor pools remain protected. Rain also reduces pool wetness rapidly.
        RainWashEnabled = true,
        -- Equivalent hours of full-strength rain required to completely wash an exposed pool. Lighter rain contributes proportionally more slowly. Default: 4 hours. Min: 0.50 Max: 72.00 Default: 4.00
        RainWashHours = 4.0,
        -- Normalized rain intensity below which washing is ignored. 0.10 allows light rain; increase this value if only stronger storms should clean blood. Min: 0.00 Max: 1.00 Default: 0.10
        RainWashMinimumIntensity = 0.1,
        -- When enabled, persistent bloody footprints on exposed outdoor squares can be washed away by rain.
        RainWashesFootprints = true,
        -- How much faster footprints wash away than dense pools. Default 3.0 means footprints require about one-third as much equivalent rain exposure. Min: 1.00 Max: 10.00 Default: 3.00
        RainFootprintWashMultiplier = 3.0,
        -- Writes persistence, migration, growth, native blood fallback, and synchronization diagnostics to console.txt. Leave off during normal play.
        DebugMode = false,
    },
    PZShareMapNotes = {
        -- Controls who sees your map symbols and freehand drawings. Everyone = all players on the server. Faction = only your faction members. Safehouse = only your safehouse members. Disabled = vanilla manual sharing for symbols, drawings are private only. Default = Everyone
        -- 1 = Everyone
        -- 2 = Faction
        -- 3 = Safehouse
        -- 4 = Disabled
        AutoShareSymbols = 1,
        -- Maximum freehand drawings each player can have on the shared map (5-100). Default: 30. Oldest drawings must be erased to make room for new ones. Ignored when Remove Drawing Limits is enabled. Min: 5 Max: 100 Default: 30
        MaxStrokesPerPlayer = 30,
        -- Maximum total freehand drawings across all players on the server (50-1000). Default: 200. Prevents excessive storage growth on busy servers. Ignored when Remove Drawing Limits is enabled. Min: 50 Max: 1000 Default: 200
        MaxStrokesTotal = 200,
        -- Not recommended. Ignores Max Drawings Per Player and Max Total Drawings, so players can draw without limit. Every drawing is redrawn on every player's map, so large numbers of drawings cause map lag for everyone and add server load. Default: off.
        RemoveDrawingLimits = false,
        -- When enabled, players need a pen or pencil in their inventory to use freehand drawing. The drawing color matches the pen type. When disabled, anyone can draw in orange.
        RequirePenToDraw = true,
        -- When enabled, players need an eraser in their inventory to use the erase tool. When disabled, anyone can erase.
        RequireEraserToErase = true,
    },
    ShelterHoldBeehive = {
        -- Allows Zombees to appear while foraging and when disassembling wild honeycombs. When disabled, existing Zombees are kept for save compatibility but cannot be inserted into a hive again after removal.
        EnableZombees = true,
        -- When enabled, Bait Hive > Add Bait only shows bait that can attract a Wild Honeycomb: Honey, Beeswax, Sugar, Brown Sugar, Sugar Cubes and Sugar Packet. Disabled by default to preserve standard trapping-menu behavior, which may allow other foods to be added even when they cannot catch anything in this trap.
        HideInvalidBaitHiveBaits = false,
        -- Minimum local air temperature at the Beehive square for Honeybee Queens to produce honey. Default: 12 °C. Min: -50.00 Max: 50.00 Default: 12.00
        HoneybeeMinTemperature = 12.0,
        -- Maximum local air temperature at the Beehive square for Honeybee Queens to produce honey. Default: 32 °C. Min: -50.00 Max: 60.00 Default: 32.00
        HoneybeeMaxTemperature = 32.0,
        -- Minimum local air temperature at the Beehive square for Bumblebee Queens to produce honey. Bumblebees tolerate a wider range than Honeybees. Default: 5 °C. Min: -50.00 Max: 50.00 Default: 5.00
        BumblebeeMinTemperature = 5.0,
        -- Maximum local air temperature at the Beehive square for Bumblebee Queens to produce honey. Bumblebees tolerate a wider range than Honeybees. Default: 35 °C. Min: -50.00 Max: 60.00 Default: 35.00
        BumblebeeMaxTemperature = 35.0,
        -- Multiplies Hive Frame honey production speed after queen, frame, season and indoor/outdoor modifiers. Default: 1.0x. Min: 0.00 Max: 5.00 Default: 1.00
        HoneyProductionSpeedMultiplier = 1.0,
        -- Radius in squares around a Beehive affected by its daily plant growth bonus. Default: 2 squares, producing a 5x5 area centered on the hive. Min: 0 Max: 10 Default: 2
        PlantGrowthBoostRadius = 2,
        -- Multiplies biome abundance weights for Honeybee Queens, Bumblebee Queens, Zombee Queens and Wild Honeycombs found through foraging. Does not change Bait Hive capture chances. Default: 1.0x. Min: 0.00 Max: 5.00 Default: 1.00
        BeeForagingAbundanceMultiplier = 1.0,
    },
    SimpleSuppressors = {
        -- How far a machined-suppressor shot carries compared with the unsuppressed firearm. Default: 25%. Min: 1 Max: 100 Default: 25
        MachinedSoundRadiusReduction = 25,
        -- How far an oil-filter-suppressor shot carries compared with the unsuppressed firearm. Default: 35%. Min: 1 Max: 100 Default: 35
        OilFilterSoundRadiusReduction = 35,
        -- Scales the suppressed shot's volume setting. Lower values reduce it; 100 leaves the weapon's original value unchanged. Default: 55. The recording also affects loudness, so 50 does not mean half as loud. Min: 1 Max: 100 Default: 55
        SoundVolumeReduction = 35,
        -- Shots from full condition to worn out. Applies to both suppressor types. At 0 condition, suppression stops. Machined suppressors can be repaired; oil-filter suppressors must be replaced. Default = Standard (5,000 shots)
        -- 1 = Short (2,500 shots)
        -- 2 = Standard (5,000 shots)
        -- 3 = Long (10,000 shots)
        -- 4 = No wear
        SuppressorDurability = 2,
        -- Hot suppressors lose condition faster. At maximum heat, each shot uses twice the normal lifespan. Default: enabled.
        HeatAcceleratesWear = true,
        -- Adds welding recipes to restore worn machined suppressors to full condition. Requires tools and materials. Oil-filter suppressors cannot be repaired.
        EnableSuppressorRepairs = true,
        -- Sustained fire heats the suppressor until its surface glows. Smoke rises while aiming; both fade as it cools. Visual only: heat does not affect accuracy, damage, sound reduction, or wear.
        EnableSuppressorHeat = true,
        -- How common this mod's loot is. 100 uses the standard loot weights; lower is rarer, higher is more common. Applies to crafting supplies and manuals even in craft-only mode. 0 removes all mod loot, including manuals. Does not change containers already filled. Min: 0 Max: 500 Default: 75
        LootRarity = 65,
        -- Adds finished suppressors to loot. Turn off for craft-only suppressors: manuals, adapters, baffles, and oil filters can still be found. Vehicle filter salvage remains available. Does not remove items already spawned.
        FindSuppressorsNaturally = true,
        -- Choose the families this save can use and find. Existing servers retain any older per-caliber settings until they are changed manually. Default = All calibers
        -- 1 = All calibers
        -- 2 = No shotgun suppressors
        -- 3 = Pistol calibers only
        ContentScope = 1,
        -- Metalworking level needed to craft any oil-filter suppressor. Default: 3. Adapter requirements are set separately; the manual is still required. Min: 1 Max: 10 Default: 3
        OilFilterCraftLevel = 3,
        -- Metalworking level needed to craft caliber adapters. Default: 2. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 2
        AdapterCraftLevel = 2,
        -- Metalworking level needed to craft the 9mm machined suppressor. Default: 5. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 5
        Machined9mmCraftLevel = 5,
        -- Metalworking level needed to craft the .45 ACP machined suppressor. Default: 5. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 5
        Machined45ACPCraftLevel = 5,
        -- Metalworking level needed to craft the .44 machined suppressor. Default: 5. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 5
        Machined44CraftLevel = 5,
        -- Metalworking level needed to craft the .357 machined suppressor. Default: 6. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 6
        Machined357CraftLevel = 6,
        -- Metalworking level needed to craft the .30-30 machined suppressor. Default: 6. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 6
        Machined3030CraftLevel = 6,
        -- Metalworking level needed to craft the 5.56 machined suppressor. Default: 7. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 7
        Machined556CraftLevel = 7,
        -- Metalworking level needed to craft the .308 machined suppressor. Default: 7. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 7
        Machined308CraftLevel = 7,
        -- Metalworking level needed to craft the 12 Gauge machined suppressor. Default: 8. The manual and recipe materials are still required. Min: 1 Max: 10 Default: 8
        Machined12GaugeCraftLevel = 8,
        -- Tracks oil level. Removing a filter creates a visible puddle, then leaks -- slowly while parked, but a full sump empties in minutes of driving under oil-pump pressure. Fitting a filter stops the leak but does not refill the engine. Filtered oil does not expire; damage begins only when running below 25% oil, and a completely dry engine will seize and need mechanical repair.
        EnableVehicleOil = true,
        -- Controls how quickly a dangerously low-oil engine loses condition. It does not make oil expire or cause instant engine damage. Default = Standard
        -- 1 = Gentle
        -- 2 = Standard
        -- 3 = Harsh
        VehicleOilSeverity = 2,
        -- Starts new characters with guns, ammunition, suppressors, and crafting tools. For testing; leave off for a normal playthrough.
        DevStartingKit = false,
        -- Writes extra diagnostic information to the game log. Useful when reporting a problem; leave off during normal play.
        Debug = false,
    },
    SitReadFaster = {
        -- Min: 1.00 Max: 5.00 Default: 2.00
        SpeedMultiplier = 2.5,
    },
    SleepingBagRespawnMP = {
        Enabled = true,
        Debug = false,
        RespawnEnabled = true,
        -- Min: 0 Max: 12 Default: 4
        SafeTileRadius = 4,
        CooldownEnabled = true,
        -- Default = Real server time
        -- 1 = Real server time
        -- 2 = World time
        CooldownType = 1,
        -- Min: 1 Max: 720 Default: 24
        CooldownRealHours = 24,
        -- Min: 1 Max: 90 Default: 7
        CooldownGameDays = 7,
        BlockNearbyPlayers = true,
        -- Min: 1 Max: 200 Default: 80
        EnemyRadius = 80,
        BlockEnemySafehouseRegister = true,
        BlockEnemySafehouseRespawn = true,
        BlockNearbyZombies = true,
        -- Min: 1 Max: 100 Default: 4
        ZombieRadius = 4,
        -- Min: 0 Max: 100 Default: 5
        MaxZombies = 5,
        AllowCancel = true,
    },
    SlowGasMaskFiltersB42 = {
        -- Controls how slowly the filter equipped in a gas mask is consumed. Default = Long duration
        -- 1 = Normal duration
        -- 2 = Long duration
        -- 3 = Very long duration
        -- 4 = Custom
        -- 5 = Infinite filters
        FilterDuration = 2,
        -- Only used when Filter duration is set to Custom. 1 is normal wear, 5 lasts five times longer, and 100 lasts one hundred times longer. Min: 1 Max: 100 Default: 5
        CustomWearMultiplier = 3,
        -- Allows the server to apply slower filter wear in multiplayer games. Disable only if a server has a conflict with another mod.
        EnableMultiplayerSync = true,
    },
    Snowman = {
        -- Enable or disable snowmen melting automatically when there’s no snow in the world.
        Melt = true,
    },
    SoapZ = {
        -- If enabled, a very dirty or bloody character can attract zombies through wind-carried body odor. Soaps reduce that exposure.
        EnableOdorAttraction = true,
        -- Maximum distance in tiles at which body odor can attract zombies. With wind, the odor plume travels in that direction without exceeding this range. Min: 1 Max: 60 Default: 20
        OdorAttractionRange = 10,
    },
    SLBatteryPack = {
        -- Min: 0.10 Max: 50.00 Default: 2.50
        ReferenceAh = 2.5,
        BatteryTypes = "Base.CarBattery1:50;Base.CarBattery2:100;Base.CarBattery3:75;Base.Lighter_Battery:1;ISA.WiredCarBattery:50:ISA_maxCapacity;ISA.DeepCycleBattery:200:ISA_maxCapacity;ISA.DIYBattery:200:ISA_maxCapacity;ISA.SuperBattery:400:ISA_maxCapacity",
        EnableRadiusBonus = true,
        -- Min: 0.00 Max: 10.00 Default: 1.50
        CondLossPerNight = 1.5,
        -- Min: 0.00 Max: 20.00 Default: 3.00
        CondLossOnZero = 3.0,
        -- Min: 0 Max: 100 Default: 0
        ConditionMin = 0,
        -- Min: 0 Max: 10 Default: 4
        SensorSkillLevel = 4,
        -- Min: 5 Max: 50 Default: 15
        SensorRadius = 15,
        -- Min: 0.00 Max: 10.00 Default: 0.00
        SensorPassiveDrain = 0.0,
        EnableBulbs = false,
        -- Min: 0.00 Max: 10.00 Default: 1.00
        BulbLifespanMult = 1.0,
        BulbTypes = "",
    },
    SaucedCarts = {
        -- Enable or disable the SaucedCarts mod.
        EnableMod = true,
        -- EXPERIMENTAL — off by default. Allows loading and unloading corpses to/from carts via grapple + right-click 'Load into Cart'. Includes vanilla-faithful rot accounting (corpses age in the cart, despawn at the sandbox HoursForCorpseRemoval threshold). Still being tested in MP — opt in if you want to try it; expect rough edges.
        EnableCorpseStorage = false,
        -- Only matters on servers that run world cleanup in keep-list mode (ItemRemovalListBlacklistToggle enabled), where every item type not on the WorldItemRemovalList is deleted at chunk load — including carts left on the ground with all their cargo. When this option is enabled, SaucedCarts adds its cart types to that list in memory at every boot so cleanup can never delete a cart. Off by default because it changes how your cleanup list behaves; nothing is ever written to your config files.
        ProtectFromWorldCleanup = false,
        -- How often carts spawn in the world. 100 = default, 0 = no spawns, 200 = double spawns. Min: 0 Max: 500 Default: 100
        SpawnRate = 100,
        -- Multiplier for cart capacity. 100 = default, 50 = half capacity, 200 = double capacity. Min: 25 Max: 400 Default: 100
        CapacityMultiplier = 100,
        -- Multiplier for cart durability. 100 = default, 50 = breaks faster, 200 = lasts longer. Min: 25 Max: 400 Default: 100
        DurabilityMultiplier = 100,
        -- Maximum number of carts that can spawn in a single building. 1 = default, 5 = max. Min: 1 Max: 5 Default: 1
        MaxCartsPerBuilding = 1,
        -- Percentage of item weight reduced when stored in carts. 95 = items weigh 5% of normal (default), 100 = items weigh nothing, 0 = no reduction. Min: 0 Max: 100 Default: 95
        WeightReduction = 95,
        -- Movement speed penalty while pushing a cart. 100 = default (slightly slower run), 0 = no penalty, 500 = five times the penalty. High values make pushers too slow to sprint, which also disables the stand-on-and-ride sprint animation. Min: 0 Max: 500 Default: 100
        SpeedPenaltyMultiplier = 100,
        -- How much condition is restored per repair. 100 = default, 200 = double repair, 50 = half repair. Min: 25 Max: 400 Default: 100
        RepairAmountMultiplier = 100,
        -- How long repairs take. 100 = default, 50 = faster repairs, 200 = slower repairs. Min: 25 Max: 400 Default: 100
        RepairTimeMultiplier = 100,
        -- When enabled, Maintenance skill improves repair effectiveness and speed, and awards XP.
        MaintenanceSkillBonus = true,
        -- Enable detailed debug logging. Disable for better performance when playing with PZ debug mode on.
        EnableDebugLogs = false,
        -- When enabled, carts only spawn in buildings PZ flags as shops (BuildingDef.isShop). Reduces surprise spawns at the cost of some legitimate spawn locations. Combined with the always-on residential/outdoor filter.
        StrictShopOnly = false,
        -- How often carts spawn outdoors in vehicle zones — store parking lots, residential driveways, and trailer-park parking (the same map zones that spawn cars), like an abandoned 'escaped cart'. Off = indoors only. Scales with Spawn Rate. Default = Medium
        -- 1 = Off
        -- 2 = Low
        -- 3 = Medium
        -- 4 = High
        OutdoorSpawnDensity = 3,
        -- EXPERIMENTAL — off by default. How often a spawned cart comes pre-loaded with loot that fits where it spawned — groceries outside homes and lots, materials/tools in warehouses and stores, and (very rarely) a survivor's cache of weapons and ammo. Most carts stay empty, so a loaded one is a find. Still being tested — opt in if you want to try it; expect rough edges. Off = always empty (default). Default = Off
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Some
        -- 4 = Common
        LoadedCartSpawns = 1,
    },
    WoodenSpearFishingB42 = {
        -- Controls how likely spear fishing is to catch a fish. Default = Normal
        -- 1 = Very low
        -- 2 = Low
        -- 3 = Normal
        -- 4 = High
        FishingChance = 3,
        -- Controls how often the spear loses condition after a fishing attempt. Default = Normal
        -- 1 = Fragile
        -- 2 = Normal
        -- 3 = Durable
        SpearDurability = 2,
    },
    SPNCharCustom = {
        -- Admins or players holding an Appearance Changer ignore this restriction Default = Disabled
        -- 1 = Face and Details
        -- 2 = Face only
        -- 3 = Details only
        -- 4 = Disabled
        AllowCustomisationChange = 4,
        -- Customisation categories hidden from normal players. Comma-separated, e.g. joke,halloween,special
        AdminLockedCustomisation = "",
        -- Set to 0 to disable growth Min: 0 Max: 20 Default: 10
        BodyHairGrowth = 10,
        -- Set to 0 to disable growth Min: 0 Max: 20 Default: 6
        StubbleHeadGrowth = 6,
        -- Set to 0 to disable growth Min: 0 Max: 20 Default: 3
        StubbleBeardGrowth = 3,
        -- Body hair and stubble grow in-game Default = Enabled for everyone
        -- 1 = Enabled for everyone
        -- 2 = Disabled for everyone
        -- 3 = Player Choice
        BodyHairGrowthEnabled = 1,
        -- Display visible muscles on the character depending on Strength level Default = Enabled for everyone
        -- 1 = Enabled for everyone
        -- 2 = Disabled for everyone
        -- 3 = Player Choice
        MuscleVisuals = 1,
        -- Players with the Missing Eye customisation have a vision penalty. Set to 1.0 to disable. Min: 0.10 Max: 1.00 Default: 0.50
        MissingEyeVisionModifier = 0.5,
        -- In vanilla, washing yourself also removes makeup
        WashMakeup = true,
    },
    Sporchi = {
        -- Whether foraged tree seeds can be planted at all. Turning this off hides the Plant Tree menu and stops trees already in the ground from growing any further; the seeds stay in the world as junk. Default on.
        TreeSeeds = true,
        -- In-game hours from planting a seed to the final full-sized tree, split across the four growth stages in a 2:3:4:5 ratio. The default of 10080 is five real-world weeks on a server running Day Length at 2 hours, which is what Grog's server uses. Speed the in-game clock up and trees grow faster in real time; slow it down and they take longer. 1680 is ten in-game weeks. Min: 24 Max: 100000 Default: 10080
        TreeGrowthHours = 10080,
        -- A percentage applied to every forage weight the mod registers. 100 is the shipped rate. 200 doubles it, 25 quarters it, 0 takes the seeds out of the forage tables entirely. It scales all ten species together, so a birch stays as common relative to a holly as it was; what changes is how often Wild Plants hands you a seed at all rather than a vanilla plant. Pine is unaffected -- its seed is the game's own pine cone, foraged by vanilla. Default 100. Min: 0 Max: 1000 Default: 100
        TreeSeedForageChance = 100,
        -- The upper end of how many seeds a single find yields; the lower end is always one. 1 means every find is exactly one seed. Default 3. Min: 1 Max: 10 Default: 3
        TreeSeedsPerFind = 3,
        -- Experience awarded once, when the server confirms the seed went into the ground -- never on a refusal. 0 turns the reward off. Default 1. Min: 0 Max: 500 Default: 1
        TreePlantXP = 1,
        -- The skill that earns the XP above AND that the level requirement below is measured against, so the mod only ever asks about one skill. Default Farming. Default = Farming
        -- 1 = Farming
        -- 2 = Foraging
        TreePlantPerk = 1,
        -- Minimum level in the skill chosen above before a seed can be planted at all. The check is made on the server, so a modified client cannot skip it, and the menu still offers the option -- the refusal comes back as a note. 0 means anybody can plant. Default 0. Min: 0 Max: 10 Default: 0
        TreePlantSkill = 0,
        -- Real seconds one player must wait between two successful plantings. This is an anti-script throttle, not a game rule: walking to the next square and running the planting animation already takes far longer. Raise it to slow deliberate mass planting; 0 removes the limit. Default 1. Min: 0 Max: 3600 Default: 1
        TreePlantCooldownSeconds = 1,
        -- Off, a seed needs open sky, which is what the mod has always done. On, any natural-ground square at ground level will do, roof or no roof -- so a tree can be grown inside a warehouse or under a car port. Every other rule still applies: ground level only, soil only, not on water, not on somebody else's crop or safehouse. Default off.
        TreePlantIndoors = false,
    },
    Suppressors = {
        -- Multiplies the loot-table weight of both suppressors. 1.0 = default rarity, 0.0 = suppressors never spawn as loot. Applies to newly rolled containers only. Min: 0.00 Max: 10.00 Default: 1.00
        SpawnRate = 0.6,
    },
    SurvivorNotesB42 = {
        Enabled = true,
        RequireWritingTool = true,
        AllowReadWithoutTool = true,
        -- Min: 250 Max: 5000 Default: 2500
        MaxCharsPerPage = 2500,
        -- Min: 1 Max: 5 Default: 1
        PaperPages = 1,
        -- Min: 1 Max: 80 Default: 20
        NotepadPages = 20,
        -- Min: 1 Max: 120 Default: 40
        NotebookPages = 40,
        -- Min: 1 Max: 160 Default: 60
        DiaryPages = 60,
        AllowRename = true,
        AllowEraseAll = true,
        EnableMPLock = true,
        EnableSounds = true,
        Debug = false,
    },
    SurvivorQuirks = {
        -- Once per day, recovers a burst of endurance when completely exhausted.
        EnableSecondWind = true,
        -- Killing a zombie up close steadies the nerves and restores endurance for a short while.
        EnableBattleTrance = true,
        -- Feels a sudden chill when a zombie closes in from behind.
        EnableSixthSense = true,
        -- Learns sneaking and light footwork faster while sneaking at night.
        EnableNightStalker = true,
        -- Never catches a cold from the rain and enjoys being out in it.
        EnableRainDancer = true,
        -- Feels at ease around the dead. Less stress and sadness near corpses.
        EnableGraveCalm = true,
        -- Slips through broken windows without getting cut.
        EnableContortionist = true,
        -- Keeps battered weapons barely working. They never break completely.
        EnableImproviser = true,
        -- Bleeds half as long and shrugs off pain quickly.
        EnableDieHard = true,
        -- Feels calmer and happier when nobody else is around.
        EnableLoneWolf = true,
        -- Feels better around other survivors and stays in shape with company.
        EnableTeamSpirit = true,
        -- Lifts the mood of survivors nearby.
        EnableMotivator = true,
        -- Tending other survivors' wounds relieves stress and teaches first aid faster.
        EnableFieldMedic = true,
        -- Tires more slowly during the morning hours.
        EnableEarlyBird = true,
        -- Tires more slowly late at night.
        EnableNightOwl = true,
        -- Can carry 20% more weight.
        EnablePackMule = true,
        -- Coffee and tea work twice as well.
        EnableCaffeineFiend = true,
        -- Smells rotten food in the inventory before tasting it.
        EnableKeenNose = true,
        -- Panic fades away noticeably faster.
        EnableSlowHeart = true,
        -- Sometimes spots small trinkets others would overlook when searching containers.
        EnableMagpie = true,
        -- Loses endurance faster during exertion.
        EnableShortWinded = true,
        -- Snores loudly while sleeping. The dead may hear it.
        EnableSnorer = true,
        -- Grows panicked in darkness without a light source.
        EnableAfraidOfDark = true,
        -- Rain brings gloom and headaches, storms even more so.
        EnableWeatherSensitive = true,
        -- Feels sick around corpses.
        EnableWeakStomach = true,
        -- Wounds bleed considerably longer.
        EnableBleeder = true,
        -- Gets queasy as a passenger or at high speed.
        EnableMotionSickness = true,
        -- Sometimes panics for no reason at all.
        EnableParanoid = true,
        -- Grows unhappy after a day without something sweet.
        EnableSweetTooth = true,
        -- Can carry 15% less weight.
        EnableBadBack = true,
        -- Players who pick the Bleeder trait start with a few bandages in their inventory.
        BleederStartBandages = true,
        -- How many bandages a Bleeder character starts with. Min: 1 Max: 20 Default: 4
        BleederBandageAmount = 4,
        -- Point cost for the Second Wind trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostSecondWind = 4,
        -- Point cost for the Battle Trance trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostBattleTrance = 4,
        -- Point cost for the Sixth Sense trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 6
        CostSixthSense = 6,
        -- Point cost for the Night Stalker trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 6
        CostNightStalker = 6,
        -- Point cost for the Rain Dancer trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 2
        CostRainDancer = 2,
        -- Point cost for the Grave Calm trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostGraveCalm = 4,
        -- Point cost for the Contortionist trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostContortionist = 4,
        -- Point cost for the Improviser trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 15
        CostImproviser = 15,
        -- If enabled (default), Improviser only protects weapons the character has crafted themselves. Weapons made by other players or found in the world don't count. If disabled, the three categories below decide instead.
        ImproviserOnlyCrafted = true,
        -- Only used if 'Only Self-Made Weapons' is disabled. Lets tools used as weapons (hammer, saw, and similar) benefit from the trait.
        ImproviserIncludeTools = true,
        -- Only used if 'Only Self-Made Weapons' is disabled. Lets regular melee weapons (axes, bats, knives, and similar) benefit from the trait.
        ImproviserIncludeMelee = true,
        -- Only used if 'Only Self-Made Weapons' is disabled. Lets firearms benefit from the trait.
        ImproviserIncludeFirearms = true,
        -- Point cost for the Die Hard trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 6
        CostDieHard = 6,
        -- Point cost for the Lone Wolf trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostLoneWolf = 4,
        -- Point cost for the Team Spirit trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostTeamSpirit = 4,
        -- Point cost for the Motivator trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostMotivator = 4,
        -- Point cost for the Field Medic trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostFieldMedic = 4,
        -- Point cost for the Early Bird trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 2
        CostEarlyBird = 2,
        -- Point cost for the Nocturnal trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 2
        CostNightOwl = 2,
        -- Point cost for the Pack Mule trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 6
        CostPackMule = 6,
        -- Point cost for the Caffeine Fiend trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 2
        CostCaffeineFiend = 2,
        -- Point cost for the Keen Nose trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostKeenNose = 4,
        -- Point cost for the Slow Heart trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostSlowHeart = 4,
        -- Point cost for the Magpie trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 6
        CostMagpie = 6,
        -- Point cost for the Short Winded trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -4
        CostShortWinded = -4,
        -- Point cost for the Snorer trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -3
        CostSnorer = -3,
        -- Point cost for the Afraid of the Dark trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -4
        CostAfraidOfDark = -4,
        -- Point cost for the Weather Sensitive trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -3
        CostWeatherSensitive = -3,
        -- Point cost for the Squeamish trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -3
        CostWeakStomach = -3,
        -- Point cost for the Bleeder trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -4
        CostBleeder = -4,
        -- Point cost for the Motion Sickness trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -3
        CostMotionSickness = -3,
        -- Point cost for the Paranoid trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -3
        CostParanoid = -3,
        -- Point cost for the Sweet Tooth trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -2
        CostSweetTooth = -2,
        -- Point cost for the Bad Back trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -4
        CostBadBack = -4,
        -- Standing close to another survivor in the cold shares warmth and eases the chill for both.
        EnableColdComfort = true,
        -- Point cost for the Cold Comfort trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 6
        CostColdComfort = 6,
        -- Stitched wounds leave noticeably less lasting pain than usual.
        EnableSturdyStitch = true,
        -- Point cost for the Sturdy Stitch trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostSturdyStitch = 4,
        -- Animals kept and cared for breed more reliably under your watch.
        EnableHerdsman = true,
        -- Point cost for the Herdsman trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 4
        CostHerdsman = 4,
        -- Sometimes trips for no reason while sprinting, a brief loss of speed.
        EnableWeakKnees = true,
        -- Point cost for the Weak Knees trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -3
        CostWeakKnees = -3,
        -- Aiming a firearm and getting startled can trigger an accidental shot.
        EnableJumpyTrigger = true,
        -- Point cost for the Jumpy Trigger trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -4
        CostJumpyTrigger = -4,
        -- Moving items between containers takes noticeably longer than usual.
        EnableSlowSort = true,
        -- Point cost for the Slow Sort trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: -2
        CostSlowSort = -2,
        -- Sometimes whistles during repetitive work, lifting the mood but drawing attention.
        EnableWhistleWork = true,
        -- Point cost for the Whistle While You Work trait during character creation. Negative values give points back. Min: -30 Max: 30 Default: 3
        CostWhistleWork = 3,
    },
    Swatpack = {
        -- Min: 0.00 Max: 10.00 Default: 1.00
        LootMultiplier = 0.6,
        -- Min: 0.00 Max: 10.00 Default: 1.00
        ZombieOutfitMultiplier = 0.7,
        -- Min: 0.00 Max: 100.00 Default: 50.00
        ZombieShieldChance = 25.0,
        -- Min: 0.00 Max: 5.00 Default: 1.00
        VehicleMultiplier = 0.5,
    },
    TacHold = {
        -- Required aiming level before Long gun animations activate. Min: 0 Max: 10 Default: 0
        AimingRequirement = 0,
        -- Required aiming level before pistol animations activate. Min: 0 Max: 10 Default: 0
        PistolAimingRequirement = 0,
    },
    AguaMortal = {
        -- Number of hours in the Silent Phase before the initial symptoms of stress and thirst begin. Min: 1 Max: 720 Default: 6
        TiempoIncubacion = 3,
        -- Hours elapsed since infection to advance to Phase 3 (Sickness), where pain and fatigue increase. Min: 1 Max: 720 Default: 12
        TiempoSintomas = 24,
        -- Hours elapsed since infection to enter Phase 4 (Critical), where health is in imminent danger. Min: 1 Max: 720 Default: 24
        TiempoEnfermedad = 48,
        -- Absolute fatal deadline in hours. If the player is not completely cured by this time, they will die. Min: 1 Max: 720 Default: 48
        TiempoMuerte = 72,
        -- Amount of homemade serums the character must consume to activate the final recovery phase. Min: 1 Max: 10 Default: 2
        SuerosNecesarios = 2,
        -- Hours of rest required after consuming the last serum to clear parasites and heal completely. Min: 0 Max: 720 Default: 24
        TiempoRecuperacion = 16,
    },
    TakeABathAndShower = {
        -- This checkbox option does nothing itself.
        GeneralSection = false,
        -- Whether has a water temperature concept to shower and bath. 
        --  If False, you will no longer be able to get the warming to body effects of hot water or the stress relief effects.
        WaterTemperatureConcept = true,
        -- This is the amount of water remaining in the bathtub faucet after a water outage. <LINE> By making this value higher than the amount of taking bath water consumed, you will be able to take a bath in the first house you visit after the water outage. Min: 0 Max: 1000 Default: 100
        RemainTubFaucetWater = 100,
        -- This is the amount of water remaining in the shower faucet after a water outage. <LINE> By making this value higher than the amount of taking shower water consumed, you will be able to take a shower in the first house you visit after the water outage. Min: 0 Max: 1000 Default: 20
        RemainShowerFaucetWater = 20,
        -- Randomizes the amount of water remaining after the water shutoff. <LINE>Higher values can reduce the configured remaining water by a larger amount. Default = None
        -- 1 = None
        -- 2 = Up to 25% reduction
        -- 3 = Up to 50% reduction
        -- 4 = Up to 75% reduction
        -- 5 = Up to 100% reduction
        RemainingWaterRandomizationIntensity = 1,
        -- The chance of body shampoo spawning. Default = Rare
        -- 1 = None
        -- 2 = Extremely Rare
        -- 3 = Rare
        -- 4 = Normal
        -- 5 = Common
        -- 6 = Abundant
        BathItemSpawnChance = 3,
        -- The chance of bath salt spawning. Default = Extremely Rare
        -- 1 = None
        -- 2 = Extremely Rare
        -- 3 = Rare
        -- 4 = Normal
        -- 5 = Common
        -- 6 = Abundant
        BathSaltSpawnChance = 2,
        -- This checkbox option does nothing itself.
        TubFluidContainerSection = false,
        -- The amount of water that can be stored in a bathtub. 
        --  <PUSHRGB:1,0.5,0.5> Note: This is separate from the amount of water remaining in the faucet when shut out of the water supply. <POPRGB> Min: 100 Max: 1000 Default: 200
        TubWaterCapacity = 200,
        -- If you placed bathtub to outdoors, you can collect rainwater. But you cannot use that water for plumbing.
        TubRainCollect = true,
        -- When you bathing, the water becomes tainted by the dirt washed off your body.
        TubWaterGetDirty = true,
        -- If you have electricity, you can reheat the bath water.
        EnableReheat = true,
        -- Whether to consider all fluid types when check for fluid containers plumbed into baths and showers. If disabled, only fluid containers containing water will be considered.
        AvailableAllFluid = false,
        -- This checkbox option does nothing itself.
        BathAndShowerSection = false,
        -- The amount of water consumed when washing blood, dirt, and grime from your body during a bath. This is a relative value based on the total amount removed. If you want to disable water consumption, set it to 0. Min: 0.00 Max: 1.00 Default: 0.80
        WashInBathConsumeWater = 0.8,
        -- The amount of water needed to take a shower. Min: 0 Max: 200 Default: 80
        ShowerConsumeWater = 80,
        -- Maximum in-game minutes that bath additive benefits can be received. The limit resets 12 in-game hours after the last benefit. Set to 0 for no limit. Min: 0 Max: 240 Default: 30
        BathingBenefitDailyMinutes = 30,
        -- Disable the increase discomfort, boredom, and unhappiness that comes from bathing with wearing clothes or in bad condition bathwater (wrong temperature or dirty).
        DisableNegativeEffectsOfBathing = false,
        -- Disable the increased stress caused by someone (includ zombies) seen at you while bathing.
        DisableFeelingStressByGaze = false,
        -- This checkbox option does nothing itself.
        BodyGrimeSection = false,
        -- Enable Body Grime functions. If this to False, all settings below this will be disabled.
        EnableBodyGrime = true,
        -- Allow the vanilla Wash Yourself action to remove Body Grime.
        WashSelfRemovesGrime = true,
        -- Allow Body Grime to be washed at water sources such as sinks, lakes, and ponds.
        EnableGrimeWash = true,
        -- Require sufficient soap to use the Grime Wash action.
        GrimeWashRequiresSoap = false,
        -- Displays a moodle that increases in severity for every 25 Body Grime accumulated. <LINE> <PUSHRGB:1,0.5,0.5> It will not work if Moodle Framework Mod is not installed!<POPRGB>
        EnableBodyGrimeMoodle = true,
        -- The base amount of Grime that accumulates for your body every hour without you doing anything. Min: 0.00 Max: 100.00 Default: 0.80
        BodyGrimeIncreasedBase = 0.8,
        -- If there is more blood on your body than this value, it will accumulate on the body as Grime. Min: 0 Max: 100 Default: 30
        BloodToGrimeThreshold = 30,
        -- If there is more dirt on your body than this value, it will accumulate on the body as Grime. Min: 0 Max: 100 Default: 30
        DirtToGrimeThreshold = 30,
        -- A multiplier on how amount blood and dirt over the threshold will accumulate as grime. <LINE> This is calculated by total blood or dirt stains on full body, not by part, and the maximum value is 1, not 100. <LINE> If you set this value to 3, you will accumulate 1.5 additional grime every hour if you have 50 blood on your body. Min: 0.00 Max: 100.00 Default: 1.00
        BloodAndDirtMultiplier = 1.0,
        -- If you have too much Grime, you will feel discomfort.
        GrimeDiscomfort = true,
        -- Discomfort modifier when grime is 60 or more but below 75. <LINE> 0 disables discomfort for this stage. Min: 0.00 Max: 1.00 Default: 0.15
        GrimeDiscomfort1 = 0.15,
        -- Discomfort modifier when grime is 75 or more but below 90. <LINE> 0 disables discomfort for this stage. Min: 0.00 Max: 1.00 Default: 0.30
        GrimeDiscomfort2 = 0.3,
        -- Discomfort modifier when grime is 90 or more. <LINE> 0 disables discomfort for this stage. Min: 0.00 Max: 1.00 Default: 0.55
        GrimeDiscomfort3 = 0.55,
        -- If you have too much Grime, you will feel a slight noxious smell.
        GrimeNoxiousSmell = true,
    },
    NewMusic = {
        -- Determines how far each client retains tracking for active devices. Set to 0 for infinite range. Min: 0 Max: 36000 Default: 1500
        MaxTrackingRange = 1500,
        -- Hard cap on actively synced/playback-managed devices per client. Min: 4 Max: 50 Default: 10
        ActiveDeviceLimit = 10,
        -- How fast the battery drains in real life hours. Min: 0.02 Max: 1000.00 Default: 24.00
        BatteryDrainRate = 24.0,
        -- How far, in tiles, world playback devices can be heard at max volume. Min: 9 Max: 500 Default: 35
        AudioMaxRadius = 35,
        -- How far, in tiles, zombies are attracted to devices playing at max volume. Attraction range scales down with volume. Min: 9 Max: 200 Default: 105
        ZombieAttractionRadius = 105,
        -- Enables disassembly and scrap for New Music devices.
        Disassembly = true,
        -- Allows the base mod Zomboid OST items to spawn. Uncheck to disable them.
        ZomboidOST = true,
        -- If enabled, vanilla CDs and CD players are replaced by New Music versions.
        ConvertVanillaCDsAndCDPlayers = true,
        -- If enabled, cassettes, vinyl records, and CDs can spawn inside their case, cover, or jacket items (if one exists).
        MediaSpawnsWithCases = true,
        -- Controls cassette media spawn intensity. 0.00 disables. Min: 0.00 Max: 4.00 Default: 0.60
        CassettesSpawnRate = 0.6,
        -- Controls vinyl media spawn intensity. 0.00 disables. Min: 0.00 Max: 4.00 Default: 0.30
        VinylRecordsSpawnRate = 0.3,
        -- Controls CD media spawn intensity. 0.00 disables. Min: 0.00 Max: 4.00 Default: 0.60
        CDsSpawnRate = 0.6,
        -- Controls walkman spawn intensity. Min: 0.00 Max: 4.00 Default: 0.60
        WalkmanSpawnRate = 0.6,
        -- Controls boombox spawn intensity. Min: 0.00 Max: 4.00 Default: 0.60
        BoomboxSpawnRate = 0.6,
        -- Controls CD player spawn intensity. Min: 0.00 Max: 4.00 Default: 0.60
        CDPlayerSpawnRate = 0.6,
        -- Controls record player spawn intensity. Min: 0.00 Max: 4.00 Default: 0.60
        RecordPlayerSpawnRate = 0.6,
        -- Controls zombie music-device spawn intensity. Min: 0.00 Max: 4.00 Default: 0.60
        MusicalZombiesSpawnRate = 0.6,
    },
    TanksHavePropane = {
        -- If enabled, propane tanks and blowtorches can also be refilled at gas station pumps (in addition to propane storage tanks).
        AllowGasPumps = false,
        -- If enabled, propane tanks and blowtorches can also be refilled at small industrial propane tanks found in factories and warehouses.
        AllowSmallIndustrialTanks = false,
        -- How far (in tiles) to search for a propane source around the item on the ground. Min: 1 Max: 10 Default: 2
        SearchRadius = 2,
    },
    TheyKnew = {
        -- Spawn Frequency for Hazmat Zombie Min: 0.00 Max: 20.00 Default: 0.30
        HazmatSpawnChance = 0.3,
        -- Drop Chance out of 100 Min: 0 Max: 100 Default: 0
        ZomboxoloneLootChance = 2,
        -- Drop Chance out of 100 Min: 0 Max: 100 Default: 0
        ZomboxycyclineLootChance = 2,
        -- Drop Chance out of 100 Min: 0 Max: 100 Default: 100
        ZomboxivirLootChance = 100,
    },
    TheyKnewFix = {
        -- Drop Chance out of 100 Min: 0 Max: 100 Default: 0
        TestKitLootChance = 5,
    },
    TrailersOverhaulB42 = {
        -- Final storage capacity for vanilla cargo trailers. Vanilla is 100. Default = 200
        -- 1 = 100 (vanilla)
        -- 2 = 200
        -- 3 = 300
        -- 4 = 400
        -- 5 = 500
        -- 6 = 600
        -- 7 = 700
        -- 8 = 800
        -- 9 = 900
        -- 10 = 1000
        TrailerCapacity = 3,
        -- Off by default. When enabled, only non-Base vehicles with a TrailerTrunk part are considered.
        IncludeModdedTrailers = false,
    },
    TrueSmoking = {
        -- Global burn speed for ALL smokables
        -- 25 = lasts forever · 100 = balanced · 200 = burns very fast Min: 0.10 Max: 3.00 Default: 1.00
        SmokingSpeed = 1.0,
        -- How strong each puff feels (nicotine hit + stress/boredom relief)
        -- 50 = weak puffs · 100 = normal · 200 = very strong Min: 0.00 Max: 3.00 Default: 1.00
        PuffStrength = 1.0,
        -- How much faster the smoke burns when walking, running or sprinting
        -- 25 = barely burns while moving · 100 = normal · 200 = burns fast when active Min: 0.00 Max: 3.00 Default: 1.00
        MovementBurn = 1.0,
        -- How quickly the cigarette goes out when standing still
        -- 0 = never goes out (always stays lit)
        -- 100 = goes out normally (needs relighting) Min: 0.00 Max: 3.00 Default: 1.00
        IdleBurnOut = 1.0,
        -- Multiplies all effects from smoking (nicotine, stress relief, boredom relief, etc.)
        -- 50 = half effects · 100 = normal · 200 = double effects Min: 0.10 Max: 3.00 Default: 1.00
        EffectMultiplier = 1.0,
        -- How much smoking reduces hunger
        -- 0 = no hunger reduction · 0.25 = subtle (default) · 1.0 = vanilla strength · 2.0 = double Min: 0.00 Max: 2.00 Default: 0.25
        HungerReduction = 0.25,
        -- How much smoking reduces fatigue
        -- 0 = no fatigue reduction · 0.25 = subtle (default) · 1.0 = vanilla strength · 2.0 = double Min: 0.00 Max: 2.00 Default: 0.25
        FatigueReduction = 0.25,
        -- Automatically lowers shemaghs, gas masks, etc. when smoking and re-equips them after
        ManageHeadGear = true,
        -- If the ember gets too weak, you can relight it instead of it dying completely
        SmokeRelighting = true,
        -- Enables the new smoking moodle which better reflects nicotine levels and withdrawal
        UseNewMoodle = true,
        -- Enable chance to cough when taking a puff
        Coughing = true,
        -- Chance (%) to cough per puff if player has the Smoker trait Min: 0 Max: 100 Default: 4
        CoughingChanceSmoker = 4,
        -- Chance (%) to cough per puff if player does NOT have the Smoker trait Min: 0 Max: 100 Default: 15
        CoughingChanceNonSmoker = 15,
        -- Chance to drop your lit cigarette when falling, climbing, or hit by zombies
        Dropping = true,
        -- Drop chance (%) if player has the Smoker trait Min: 0 Max: 100 Default: 6
        DropChanceSmoker = 6,
        -- Drop chance (%) if player does NOT have the Smoker trait (much clumsier!) Min: 0 Max: 100 Default: 35
        DropChanceNonSmoker = 35,
        -- Turns on nicotine tracking, withdrawal effects, and dynamic addiction
        UseNicotineSystem = true,
        -- Players can gain or lose the Smoker trait based on smoking habits
        DynamicSmokerTrait = true,
        -- How many in-game days of heavy smoking until player gains the Smoker trait Min: 1 Max: 60 Default: 10
        DaysToAddiction = 10,
        -- How many in-game days without smoking until player loses the Smoker trait Min: 3 Max: 90 Default: 30
        DaysToDetox = 30,
        -- How many in-game days it takes to reach peak withdrawal symptoms after quitting Min: 1 Max: 7 Default: 2
        DaysToPeakWithdrawal = 2,
        -- How quickly addiction and withdrawal decrease when player has the Smoker trait
        -- Higher = faster decay Min: 0.10 Max: 1.00 Default: 0.80
        SmokerTraitDecayMultiplier = 0.8,
        -- Enable debug logging and debug UI panel (for mod developers and troubleshooting)
        DebugMode = false,
    },
    TWF_BF = {
        -- Disabled (default): uses the vanilla fish-size distribution table. Enabled: uses the Better Fishing Small/Medium/Big distribution. Vanilla skill/species weight limits are always preserved.
        -- Note: This choice is applied when the world loads. Reload your save after changing it.
        UseTwF_SizeDistribution = false,
        -- Maximum cast/aim distance in tiles.
        -- 16 (default) uses the original vanilla distance check. Higher values enable the Better Fishing override. Min: 16 Max: 20 Default: 16
        TwF_AimDist = 16,
        -- Shore detection radius in tiles.
        -- 7 (default) keeps the original vanilla shore detection. Values 1-6 enable Better Fishing's lighter directional shore check with the selected radius. Min: 1 Max: 7 Default: 7
        TwF_ShoreRadius = 7,
        -- Controls the near-shore shift toward smaller fish.
        -- 100% (default) keeps vanilla strength. Any other value enables a custom strength; 0% disables the near-shore size shift. Min: 0 Max: 100 Default: 100
        TwF_SizeBlend = 100,
        -- 100% (default) keeps the full vanilla temperature behavior. Any other value enables a flat Better Fishing modifier at all temperatures and replaces the vanilla temperature curve. Min: 10 Max: 200 Default: 100
        TwF_TempCoeff = 100,
        -- Fog coefficient (percent).
        -- 100% = baseline.
        -- Default: 80%. Min: 50 Max: 150 Default: 80
        TwF_FogCoeff = 80,
        -- Wind coefficient (percent).
        -- 100% = baseline.
        -- Default: 80%. Min: 50 Max: 150 Default: 80
        TwF_WindCoeff = 80,
        -- Rain coefficient (percent).
        -- 100% = baseline.
        -- Default: 120%. Min: 50 Max: 200 Default: 120
        TwF_RainCoeff = 120,
        -- Bonus timeframe start hour (morning).
        -- Default: 4. Min: 3 Max: 6 Default: 4
        TwF_MornStart = 4,
        -- Bonus timeframe end hour (morning).
        -- Default: 6. Min: 6 Max: 9 Default: 6
        TwF_MornEnd = 6,
        -- Bonus timeframe start hour (evening).
        -- Default: 18. Min: 15 Max: 18 Default: 18
        TwF_EveStart = 18,
        -- Bonus timeframe end hour (evening).
        -- Default: 20. Min: 19 Max: 21 Default: 20
        TwF_EveEnd = 20,
        -- Catch chance multiplier during the bonus timeframes (percent).
        -- 100% = no bonus.
        -- Default: 120%. Min: 50 Max: 200 Default: 120
        TwF_TimeCoeff = 120,
    },
    TTF_Boredom = {
        -- Controls how strongly this mod reduces boredom when its conditions are met.
        -- 
        -- Very Low = 0.25x
        -- Low = 0.5x
        -- Reduced = 0.75x
        -- Default = 1.0x
        -- Increased = 1.25x
        -- High = 1.5x
        -- Very High = 2.0x
        --  Default = Default
        -- 1 = Very Low
        -- 2 = Low
        -- 3 = Reduced
        -- 4 = Default
        -- 5 = Increased
        -- 6 = High
        -- 7 = Very High
        BoredomReliefPreset = 4,
        -- Controls how strongly this mod reduces unhappiness when its relief conditions are met.
        -- 
        -- Very Low = 0.25x
        -- Low = 0.5x
        -- Reduced = 0.75x
        -- Default = 1.0x
        -- Increased = 1.5x
        -- High = 2.0x
        -- Very High = 3.0x
        --  Default = Default
        -- 1 = Very Low
        -- 2 = Low
        -- 3 = Reduced
        -- 4 = Default
        -- 5 = Increased
        -- 6 = High
        -- 7 = Very High
        UnhappinessReliefPreset = 4,
    },
    TTF_NimbleXP = {
        -- If enabled, Nimble XP is only gained while moving in combat stance with a zombie nearby.
        RequireZombieNearby = false,
    },
    TWF_Resting = {
        -- Allows players to enable the Resting status HUD through Mod Options.
        -- Default: disabled.
        -- Enable this only in worlds or servers where the HUD is allowed.
        AllowStatusHUD = false,
    },
    UnderTheHood = {
        -- How quickly service items wear (oil, coolant,
        -- filters, belts, hoses, brake fluid, and fluid
        -- loss after leaks).
        -- Applies during use to every vehicle; lower
        -- settings make service less frequent.
        -- Does not alter sudden failures or damage from
        -- running dry, overheating, or blocked filters;
        -- slower wear still reduces breakdowns. Default = Standard (1x, default)
        -- 1 = Very Light (0.25x)
        -- 2 = Light (0.5x)
        -- 3 = Standard (1x, default)
        -- 4 = Heavy (1.5x)
        -- 5 = Very Heavy (2x)
        WearRate = 3,
        -- How worn abandoned cars are when Under the
        -- Hood first checks them (oil, coolant, filters,
        -- belts, brakes, drivetrain).
        -- Only affects vehicles you haven't met yet.
        -- Already-seen cars never re-roll.
        -- Does not change how fast anything wears
        -- afterwards. Default = Standard (default)
        -- 1 = Better Maintained
        -- 2 = Standard (default)
        -- 3 = Neglected
        FoundCondition = 2,
        -- How often worn parts fail suddenly and strand
        -- you (burst hoses, snapped belts, brake-line
        -- leaks, or fouled-plug stalls).
        -- Only applies after a part is worn enough to
        -- fail; it does not change how quickly parts
        -- wear.
        -- Slower maintenance wear still causes fewer
        -- breakdowns overall, even at Frequent. Default = Standard (1x, default)
        -- 1 = Rare (0.25x)
        -- 2 = Standard (1x, default)
        -- 3 = Frequent (2x)
        BreakdownFrequency = 2,
        -- Which dashboard drivers see.
        -- Under the Hood replaces the vehicle dashboard
        -- with its own gauges and warning lights.
        -- Off removes the Under the Hood dashboard, so
        -- drivers get the normal vanilla dashboard.
        -- Applies to every player. Takes effect the next
        -- time the world loads. Default = Under the Hood (default)
        -- 1 = Under the Hood (default)
        -- 2 = Off (vanilla dashboard)
        Dashboard = 1,
        -- Vehicles that need 93 octane, by script name,
        -- separated by commas. Example: SportsCar
        -- A name also covers its variants. Names shorter
        -- than 3 letters are ignored.
        -- Script names show on the Mechanics screen in
        -- debug mode.
        PremiumFuelVehicles = "",
        -- Vehicles that need 89 octane, by script name,
        -- separated by commas.
        -- A name also covers its variants. A vehicle in
        -- both lists needs 93.
        -- Script names show on the Mechanics screen in
        -- debug mode.
        MidgradeFuelVehicles = "",
        -- How fast petrol goes stale after the collapse.
        -- Stale fuel runs weak, gums filters and
        -- carburettors, and starts badly.
        -- Applies to all fuel; stabilizer freezes what
        -- is in a tank.
        -- Standard starts after about six weeks and is
        -- fully stale near eight months. Default = Standard (default)
        -- 1 = Off
        -- 2 = Standard (default)
        -- 3 = Fast
        FuelAging = 2,
        -- A badly leaking fuel line on a hot running
        -- engine can start a fire under the car.
        -- Only leaks of half a litre an hour or more, on
        -- an engine at 90 degrees or hotter.
        -- Off keeps leaks to lost fuel only. Default = On (default)
        -- 1 = On (default)
        -- 2 = Off
        FuelLeakFires = 1,
        -- Which cars are carbureted and which are fuel
        -- injected. This decides who gets the carburetor
        -- or the injector service, wear and bench.
        -- By Type: vanilla pickups, vans, step vans, the
        -- Nyala, Dart, Horizon, Cerise Wagon and Dash
        -- Rancher are carbureted; the Dash Elite,
        -- Primani, Cossette, Mercia Lang 4000, Franklin
        -- All-Terrain and race cars are injected. Many
        -- car mods (KI5's cars, Motorious Zone and
        -- others) are set by their real model.
        -- Modern Only: only the Dash Elite and Chevalier
        -- Primani are injected and other cars have
        -- neither, as before.
        -- A car mod that registers its own cars always
        -- wins. Default = By Type (default)
        -- 1 = By Type (default)
        -- 2 = Modern Only
        VanillaFuelSystems = 1,
        -- Which cars have a distributor. This decides
        -- who gets the distributor's wear, damp
        -- misfires, Service Distributor and the ignition
        -- timing job.
        -- Carburetted Cars: every car the Vanilla Fuel
        -- Systems setting makes carbureted has one.
        -- Registered Only: only cars a car mod
        -- registers, as before. Default = Carburetted Cars (default)
        -- 1 = Carburetted Cars (default)
        -- 2 = Registered Only
        Distributors = 1,
        -- Which vehicles burn diesel.
        -- Real Diesels: vanilla step vans, plus car
        -- mods' real diesels (CUCV, Humvee, M35, M923,
        -- MAN KAT1, Kenworth, semis, buses, the Mercedes
        -- 300SD and others).
        -- Plus Work Trucks: also vanilla pickups and
        -- vans, and heavy-duty mod pickups and trucks.
        -- Off: no diesels. Diesel cans and pumps still
        -- exist.
        -- If the Diesel Fuel mod is on, its own list
        -- decides. Default = Real Diesels (default)
        -- 1 = Real Diesels (default)
        -- 2 = Plus Work Trucks
        -- 3 = Off
        DieselVehicles = 1,
        -- More vehicles that burn diesel: script names
        -- separated by commas, for example
        -- Base.PickUpTruck, 85chevyStepVan.
        -- Base. is optional. A name matches every
        -- vehicle that starts with it.
        ExtraDieselVehicles = "",
        -- Share of gas stations with a diesel pump.
        -- Diesel has its own supply at each pump; petrol
        -- stock is not touched.
        -- When station fuel is infinite, diesel is too. Min: 0.00 Max: 1.00 Default: 0.60
        DieselStationChance = 0.6,
        -- How much less fuel a diesel burns than
        -- vanilla, as a fraction.
        -- 0.2 (default) burns a fifth less. 0 turns it
        -- off. Min: 0.00 Max: 0.30 Default: 0.20
        DieselEconomy = 0.2,
        -- Mechanics XP for finishing a hands-on job with
        -- new parts or fresh fluid: the Hands-On brake,
        -- ATF, differential and fuel line panels and the
        -- fuel and tune-up benches.
        -- Paid once per job, on top of the job's own XP.
        -- 0 turns it off. Min: 0 Max: 500 Default: 50
        HandsOnXP = 50,
        -- How often this mod's oils, fluids, filters,
        -- parts and tools spawn in mechanic shops, gas
        -- stations, stores and garages.
        -- 1.0 is the default. 2.0 is twice as often, 0.5
        -- half as often (0.25 to 5).
        -- Takes effect for containers not yet looted
        -- after the next load. Min: 0.25 Max: 5.00 Default: 1.00
        LootAmount = 1.0,
        -- Which refrigerant can fits which car.
        -- Realistic: cars up to the 1993 model year
        -- (every vanilla car) take R-12, cars from 1994
        -- take R-134a, and a can only fits its own type.
        -- A can holds 340 g, so it fills a different
        -- share of a small car and a truck.
        -- One for All: any refrigerant can fits any car
        -- and adds 40%, as before. Default = Realistic (default)
        -- 1 = Realistic (default)
        -- 2 = One for All
        RefrigerantTypes = 1,
        -- Exhaust fumes in the cabin. A muffler under
        -- 40% condition, or no muffler, leaks while the
        -- engine runs, and idling inside a building
        -- fills the car even with a good one. Fumes
        -- build fastest idling on recirculation with the
        -- windows shut. An open window or door clears
        -- them.
        -- Off: no carbon monoxide.
        -- Symptoms only: drowsiness, then a headache,
        -- nausea and dizzy spells. Never fatal.
        -- Can be fatal: as Symptoms only, and the worst
        -- exposure slowly costs health. Default = Symptoms only (default)
        -- 1 = Off
        -- 2 = Symptoms only (default)
        -- 3 = Can be fatal
        CarbonMonoxide = 2,
        -- A short on a fuse bridged with wire heats the
        -- wire until it burns through.
        -- When it does, there is a chance it sets the
        -- car on fire.
        -- Off: the wire still burns through, but nothing
        -- catches. Default = On (default)
        -- 1 = On (default)
        -- 2 = Off
        ElectricalFires = 1,
        -- Vehicles that always get an automatic
        -- transmission: script IDs separated by commas,
        -- for example Base.CarLightsPolice,
        -- Base.SmallCar.
        -- Base. is optional for vanilla cars; mod cars
        -- need their own module, for example
        -- KI5.SomeCar. A name must match exactly.
        -- Applies to vehicles found from now on. A car
        -- that already has a transmission keeps it.
        -- A vehicle in both lists gets Automatic.
        ForcedAutomaticVehicles = "",
        -- Vehicles that always get a manual gearbox and
        -- clutch: script IDs separated by commas, for
        -- example Base.CarNormal.
        -- Base. is optional for vanilla cars; mod cars
        -- need their own module. A name must match
        -- exactly.
        -- Applies to vehicles found from now on. A
        -- vehicle with only one gear stays Automatic.
        -- Script IDs show on the Mechanics screen in
        -- debug mode.
        ForcedManualVehicles = "",
        -- How often a driver who has not learned to
        -- drive stick stalls, grinds gears or rides the
        -- clutch, and how often a Bad Driver slips up.
        -- Mistakes happen pulling away, shifting and
        -- stopping, never while cruising.
        -- Off: nobody makes driving mistakes and nobody
        -- learns from practice. Default = Standard (default)
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Standard (default)
        -- 4 = Frequent
        DriverMistakes = 3,
        -- How much worse the Bad Driver trait makes a
        -- driver: extra rough launches, crunched shifts
        -- and harsh gear changes, in automatics too. Default = Standard (default)
        -- 1 = Mild
        -- 2 = Standard (default)
        -- 3 = Harsh
        BadDriverSeverity = 2,
        -- How much each driving mistake wears the part
        -- it hits: gear grinds wear the gearbox, rough
        -- launches the clutch and mounts, harsh shifts
        -- the gearbox and mounts.
        -- Stalls only stop the engine. Default = Standard (default)
        -- 1 = Light
        -- 2 = Standard (default)
        -- 3 = Heavy
        DrivingWear = 2,
        -- How fast a character learns a manual gearbox
        -- by driving one. A character who gets fully
        -- comfortable gains the Manual Driver trait.
        -- The Driving Stick magazine teaches the basics
        -- either way.
        -- Book Only: driving teaches nothing. Default = Standard (default)
        -- 1 = Book Only
        -- 2 = Slow
        -- 3 = Standard (default)
        -- 4 = Fast
        ManualLearning = 3,
        -- On: real vehicle models from car mods that
        -- were only ever sold with one transmission get
        -- it, for example the '91 LTD Crown Victoria is
        -- always automatic and the '92 Skyline GT-R
        -- always manual. Models sold with both keep the
        -- normal rules. Vanilla cars are fictional and
        -- are not affected.
        -- The Forced Automatic and Forced Manual lists
        -- still win.
        -- Applies to vehicles found from now on. A car
        -- that already has a transmission keeps it. Default = Off (default)
        -- 1 = Off (default)
        -- 2 = On
        FactoryTransmissions = 1,
    },
    LockedFuelCapMP = {
        -- Independent from the vanilla locked-vehicle chance. Applied once when Vehicle Locks B42 first initializes each vehicle. Random is a deterministic 50/50 roll per vehicle. Default = Random (50/50)
        -- 1 = Random (50/50)
        -- 2 = 0%
        -- 3 = 10%
        -- 4 = 25%
        -- 5 = 50%
        -- 6 = 75%
        -- 7 = 90%
        -- 8 = 100%
        CapLockedChance = 4,
        -- Time required to force a locked fuel cap with a crowbar. Min: 1 Max: 120 Default: 12
        CapBreakTime = 12,
        -- Time required to force a locked vehicle trunk with a crowbar. Min: 1 Max: 120 Default: 15
        TrunkBreakTime = 15,
        -- Controls how far the sound of forcing a fuel cap or trunk can attract zombies. Default = Medium
        -- 1 = Low
        -- 2 = Medium
        -- 3 = High
        BreakNoise = 1,
        -- Controls crowbar condition loss when forcing a fuel cap or trunk. Default = Low
        -- 1 = None
        -- 2 = Low
        -- 3 = Medium
        CrowbarDamage = 2,
    },
    VehiclePaintSystem = {
        -- Allows players to repaint vehicles.
        Enabled = true,
        -- Minimum Mechanics skill required to repaint a vehicle. Min: 0 Max: 10 Default: 3
        RequiredMechanics = 3,
        -- Amount of a vehicle paint can consumed when painting one vehicle. Min: 0.01 Max: 1.00 Default: 0.25
        PaintUseDelta = 0.25,
        -- Comma-separated list: white,black,red,blue,green,yellow,orange. Use all or leave blank to allow every color.
        AllowedColors = "",
    },
    VehicleSafety = {
        -- Minimum speed loss to trigger a light crash. At default 25, a sudden 25 km/h speed loss triggers a light crash. Lower = more sensitive. Min: 10 Max: 50 Default: 25
        CrashSpeedLight = 25,
        -- Minimum speed loss to trigger a medium crash. Medium crashes cause more damage and can trigger ejection. Min: 20 Max: 80 Default: 40
        CrashSpeedMedium = 40,
        -- Minimum speed loss to trigger a severe crash. Severe crashes cause heavy injuries, fractures, and ejection. Min: 30 Max: 120 Default: 60
        CrashSpeedViolent = 60,
        -- Vehicle must be going at least this fast for a crash to be detected. Prevents low-speed bumps from causing damage. Min: 5 Max: 40 Default: 15
        MinSpeedForCrash = 15,
        -- Global crash damage multiplier. 100 = normal, 50 = half damage, 200 = double damage. Min: 10 Max: 300 Default: 100
        DamageMultiplier = 100,
        -- Percentage of crash damage blocked by the seatbelt. At 70, the seatbelt blocks 70% of crash damage. Min: 10 Max: 95 Default: 70
        SeatbeltReduction = 75,
        -- When enabled, players without a seatbelt and without a windshield will be ejected through the front on crash.
        EjectionEnabled = true,
        -- When enabled, medium and violent crashes without a seatbelt will damage the windshield from head impact.
        WindshieldDamageOnCrash = true,
        -- Minimum speed loss required for ejection. Only applies when seatbelt is off and windshield is destroyed. Min: 20 Max: 80 Default: 40
        EjectionSpeedThreshold = 40,
        -- Windshield condition below this percentage counts as weak (causes cuts and debris injuries). At 40, a windshield at 39% or less causes extra injuries. Ejection only triggers when windshield is fully destroyed (0%). Min: 5 Max: 50 Default: 40
        WindshieldBreakThreshold = 40,
        -- Above this speed, a blinking warning appears if the seatbelt is not fastened. Min: 20 Max: 100 Default: 50
        WarningSpeed = 50,
        -- Show a moodle icon indicating seatbelt status when in a vehicle. Requires Moodle Framework.
        MoodleEnabled = true,
        -- Damage percentage for front passengers (not the driver). At 90, front passengers take 90% of the driver's crash damage. Driver always takes 100%. Min: 10 Max: 100 Default: 90
        FrontPassengerDamage = 90,
        -- Damage percentage for rear and middle passengers. At 50, rear passengers take 50% of the driver's crash damage. Rear passengers cannot be ejected through the windshield. Min: 10 Max: 100 Default: 50
        RearPassengerDamage = 50,
    },
    WhoseKeyIsThis = {
        -- On by default. Shows the name of a key lying on the ground nearby, above the key itself. When off, it is not shown even if a player has it enabled in their own mod options.
        AllowGroundKeys = true,
        -- On by default. When a key ring marked to be followed leaves a player's inventory - most often on the body they left behind - the last place it was seen is marked until it is picked up again. It is also what puts the key ring tab in the map's key list. When off, no player follows rings and no tab appears, however they have their own mod options set.
        TrackLostKeyRings = true,
        -- On by default. Multiplayer only. Following stops the moment another survivor takes the key ring out of your body and into their own pockets. Off, and the mark follows them instead. Dragging your body about or loading it into a car is not taking your ring, so the mark stays either way.
        StopWhenTaken = true,
        -- On by default. Multiplayer only, and only when "Stop following once another survivor takes it" above is on. Following stops once somebody moves the body well away from where it fell - dragged, loaded into a vehicle or stored in a container - even though the ring was never taken out of it. Off, and the mark follows the body wherever it goes. Shifting it out of a doorway is not enough to stop anything.
        MovedBodyCountsAsTaken = true,
        -- On by default. Multiplayer only. Someone who picks up a ring carrying another survivor's mark gets a right-click option to switch that mark off, which stops the follow on the other end too. Off, and the mark is not theirs to touch.
        TakerCanStop = true,
        -- Off by default, since it is a lot to ask in singleplayer. When on, distances, the map jump and the direction pointer only work while you carry a compass. Independent of the other rules. Renaming keys always works.
        RequireCompass = false,
        -- Off by default. When on, a key's location is only readable if you carry a paper map covering that spot - but once you have read a key's location it stays readable, map or not. Independent of the other rules.
        RequireMapItem = true,
        -- On by default. A key only shows its location if that part of the world map has already been uncovered - by walking there, or by a map you have read. Keys pointing into the blank stay hidden until you find the place. Independent of the other rules.
        RequireExplored = true,
    },
    WildernessProgression = {
        -- The abundance of additional small flint deposits in newly generated areas. Min: 0.00 Max: 4.00 Default: 0.40
        SmallFlintDepositAbundance = 2.0,
        -- The abundance of surface iron deposits in newly generated areas. Min: 0.00 Max: 4.00 Default: 0.40
        IronDepositAbundance = 2.0,
        -- Min: 0 Max: 1 Default: 0
        DepositAbundanceSchemaVersion = 0,
        -- Enables the sand and clay production chains.
        SandAndClayProduction = true,
        -- Automatically learn Dismantle Fishing Net at Fishing 3 and Make Improvised Flashlight at Electrical 1.
        LoweredRecipeRequirements = false,
        -- Adds the Forge Crude Nail From Wire and Forge Brittle Scissors recipes.
        PrimitiveMetalToolCrafting = true,
        -- Requires a forge and Blacksmithing 2 to craft flint and steel.
        ForgeFlintAndSteel = false,
    },
    WL_VehicleRepair = {
        -- Min: 1 Max: 40 Default: 10
        EnginePartsOutputWeld = 10,
        -- Min: 1 Max: 40 Default: 10
        EnginePartsOutputMech = 10,
        -- Min: 1 Max: 10 Default: 2
        EnginePartsPerRestoreIteration = 2,
        -- Min: 1 Max: 10 Default: 5
        QualityGainPerPass = 5,
        -- Min: 1 Max: 10 Default: 2
        BatteryPartsPerRestoreIteration = 2,
        -- Min: 1 Max: 10 Default: 5
        BatteryConditionGainPerPass = 5,
        -- Min: 1 Max: 10 Default: 3
        SuperchargePartsPerPass = 3,
        -- Min: 1 Max: 100 Default: 30
        SuperchargeMaxBoostPercent = 30,
        -- Min: 1 Max: 10 Default: 2
        HeaterPartsPerPass = 2,
        -- Min: 1 Max: 50 Default: 20
        HeaterConditionGainPerPass = 20,
    },
    ZombieBlood = {
        -- Min: 1 Max: 180 Default: 50
        Duration = 50,
        -- Min: 10 Max: 100 Default: 85
        Effectiveness = 85,
        RainRemoves = true,
        WashRemoves = true,
        RunningDrainsCamouflage = true,
        -- Min: 1 Max: 10 Default: 1
        MaxUsesPerCorpse = 1,
        -- Min: 10 Max: 300 Default: 80
        ApplyTime = 80,
        -- Min: 1.00 Max: 15.00 Default: 5.00
        CamoRange = 5.0,
        -- Min: 50 Max: 500 Default: 100
        StunDuration = 100,
    },
    ZomLoot = {
        -- Min: 0 Max: 100 Default: 2
        FoodChance = 2,
        -- Min: 0 Max: 100 Default: 2
        DrinkChance = 2,
        -- Min: 0 Max: 100 Default: 3
        MedChance = 3,
        -- Min: 0 Max: 100 Default: 3
        MiscChance = 3,
    },
    ZombieVirusVaccineBETA = {
        -- <BHC>Do NOT change this. DEV ONLY. <RGB:1,1,1><LINE> Prints a hella lot of debug info in console.
        DebugMode = false,
        -- Completely enables or disables the spawning of Zombie Virus Vaccine items in the world.
        EnableWorldLoot = true,
        -- Defines how many chemical items from the mod appear in the world. Default = Default
        -- 1 = Disabled
        -- 2 = Low
        -- 3 = Default
        -- 4 = High
        LootChemicals = 2,
        -- Expands the loot table to include additional chemical products.
        ExpandChemicalsLoot = false,
        -- Enables or disables item spawning in vehicles.
        EnableVehicleLoot = true,
        -- Enables or disables item spawning in survivor backpacks.
        EnableBagsLoot = true,
        -- Defines how many syringes from the mod appear in the world. Default = Default
        -- 1 = Disabled
        -- 2 = Low
        -- 3 = Default
        -- 4 = High
        LootSyringes = 2,
        -- Defines how many laboratory equipment books appear in the world. Default = Default
        -- 1 = Disabled
        -- 2 = Low
        -- 3 = Default
        -- 4 = High
        LootEquipmentBooks = 2,
        -- Defines how many virology and chemistry books appear in the world. Default = Default
        -- 1 = Disabled
        -- 2 = Low
        -- 3 = Default
        -- 4 = High
        LootVirologyBooks = 2,
        -- Defines whether virology books spawn only in specific locations or are spread throughout the world. Default = Specific locations only
        -- 1 = Expand spawn locations
        -- 2 = Specific locations only
        -- 3 = Make them common
        VirologyBooksSpawnMode = 1,
        -- Enables or disables blood aging.  <LINE><BHC>It might cause heavy CPU usage for multiplayer servers. If so, consider disabling this feature.
        BloodAgingMode = true,
        -- 14 is the default value from the original mod. If issues occur, reduce this value or disable blood aging. Min: 5 Max: 21 Default: 14
        BloodAgingRadius = 14,
        -- Enable water purification through heat (stoves, microwaves, etc). If disabled, water purification will only be possible by using chlorine tablets. <LINE><BHC>It might cause heavy CPU usage for multiplayer servers. If so, consider disabling this feature.
        EnableWaterPurification = true,
        -- The radius within which flasks with water in containers will be searched for purification. Ticks onEveryTenMinutes. Min: 5 Max: 21 Default: 5
        WaterPurificationRadius = 5,
        -- Enables or disables the spawning of the light painting magazine. If disabled, players will not be able to learn how to paint lights.
        EnableLightPaints = true,
        -- If enabled, each time a player remove glasses from a broken window, it will give a shattered glass material<LINE><LINE>Even if it's off, players still can pick up the shattered glass from the ground.
        AllowWindowGlass = true,
        -- Allows players to perform autopsies directly on the ground, without the need for a table.
        AllowAutopsyOnGround = true,
        -- <BHC>Changing this option will affect game balance. <RGB:1,1,1><LINE> Defines how many ticks are required to complete an autopsy. Lower values = faster. Min: 800 Max: 1800 Default: 1200
        AutopsySpeed = 1200,
        -- The maximum number of hours before a corpse is considered too decomposed for an autopsy. Min: 2 Max: 72 Default: 12
        AutopsyMaxHours = 12,
        -- <BHC>Changing this option will affect game balance. <RGB:1,1,1><LINE> How many ticks are reduced from the autopsy time for each First Aid skill level. Min: 0 Max: 30 Default: 30
        TicksDecreasedByPerkLv = 30,
        -- <BHC>Changing this option will affect game balance. <RGB:1,1,1><LINE> Defines the speed bonus when performing an autopsy on an autopsy table. Default = 50%
        -- 1 = None
        -- 2 = 10%
        -- 3 = 20%
        -- 4 = 30%
        -- 5 = 40%
        -- 6 = 50%
        -- 7 = 60%
        TableSpeedBonus = 6,
        -- <BHC>Changing this option will affect game balance. <RGB:1,1,1><LINE> Amount of experience gained when performing an autopsy on the ground. Min: 0 Max: 15 Default: 15
        AutopsyGroundXP = 15,
        -- <BHC>Changing this option will affect game balance. <RGB:1,1,1><LINE> Amount of experience gained when performing an autopsy on a table. Min: 0 Max: 30 Default: 30
        AutopsyTableXP = 30,
        -- <BHC>Changing this option will affect game balance. <RGB:1,1,1><LINE> Defines the base XP gained in Butchering and First Aid skills. Min: 0 Max: 30 Default: 15
        CollectPartXP = 15,
        -- <BHC>Changing this option will affect game balance. <RGB:1,1,1><LINE> Defines the base chance of collecting a brain in perfect condition. Min: 0 Max: 15 Default: 10
        BrainHighOffset = 10,
        -- Defines the hemophobia penalty applied when a character with the Hemophobic trait performs an autopsy.<LINE> Affects the chance of obtaining a brain in perfect condition. Min: 0 Max: 30 Default: 10
        HemophobicDebuff = 10,
        -- If enabled, scalpels will degrade and break with use.
        AllowScalpelDegrade = false,
        -- If enabled, saws will degrade and break with use.
        AllowSawDegrade = true,
        -- Allows players to place corpses in a composter to produce fertilizer
        AllowBodyCompostage = true,
        -- Enables/Disables Lab Inter Profession Starting Kit <LINE><LINE> While unchecked Lab Intern Profession won't start with research files
        StartingKit = true,
    },
    RBS = {
        -- Multiplier for Red Bull spawn weight in loot. 0 disables Red Bull spawns entirely. Applies to newly generated loot after a world restart. Min: 0.00 Max: 10.00 Default: 1.00
        SpawnRate = 1.0,
    },
    Bicycle = {
        -- Percent-based multiplier applied to bicycle spawn chances. Set to 0 to disable bicycle spawns entirely. Min: 0 Max: 100 Default: 30
        SpawnRate = 20,
        -- Percent-based multiplier applied to sidecar spawn chances - both for sidecars found loose in garages, storage units, and sheds, and for sidecars rarely pre-attached to a newly spawned bicycle. Set to 0 to disable sidecar spawns entirely. Min: 0 Max: 100 Default: 30
        SidecarSpawnRate = 15,
        -- Set your player speed when riding the bicycle and not holding SHIFT. Min: 0.10 Max: 5.00 Default: 2.20
        WalkSpeedMultiplier = 2.5,
        -- Set your player speed when riding the bicycle and holding SHIFT. Min: 0.10 Max: 5.00 Default: 3.10
        RunSpeedMultiplier = 3.6,
        -- When enabled you will be slower on rough surfaces unless the bicycle has a full offroad wheel setup.
        ImmersiveMode = true,
        -- When enabled, attaching containers makes the bike harder to turn and heavy cargo slows it down. Disable for vanilla bike handling regardless of load.
        LoadPenaltyEnabled = true,
        -- Maximum reduction in turn rate when all 6 containers are attached. 0 = no turning penalty. Capped at 75% to keep the bike usable. Min: 0 Max: 75 Default: 50
        MaxTurnPenalty = 50,
        -- Maximum reduction in bike speed at 20kg of cargo inside containers. Heavy cargo slows both pedal speeds proportionally; fast pedal stays faster than slow. 0 = no speed penalty. Min: 0 Max: 75 Default: 35
        MaxSpeedPenalty = 35,
        -- When riding, zombies that physically press against you slow the bike - a single bump bleeds off a little speed, and being surrounded slows you toward a near-stop. Sustained contact from a full surround also knocks you off the bike.
        ZombieSlowdownEnabled = true,
        -- Scales how hard contacting zombies slow you. 100 = default curve (1 zombie ~85% speed, 4+ near stop). Lower is gentler, higher is harsher. Does not affect the knock-off. Min: 0 Max: 150 Default: 100
        ZombieSlowdownStrength = 100,
        -- How close a zombie must be to count as touching. Higher widens the contact range slightly so zombies count from a touch further out; 0 requires true body overlap. Min: 0 Max: 100 Default: 30
        ZombieContactSensitivity = 30,
    },
    KickScooter = {
        -- Set your player speed when riding the kick scooter and not holding SHIFT. Min: 0.10 Max: 5.00 Default: 1.90
        WalkSpeedMultiplier = 1.9,
        -- Set your player speed when riding the kick scooter and holding SHIFT. Min: 0.10 Max: 5.00 Default: 2.70
        RunSpeedMultiplier = 2.7,
        -- When enabled you will be slower on rough surfaces like gravel and sand.
        ImmersiveMode = true,
        -- When enabled, zombies touching you while riding slow you down. One slows you a little, three slow you a lot, and four or more holding on knock you off the scooter.
        ZombieSlowdownEnabled = true,
        -- How hard touching zombies slow you. Lower is gentler, higher is harsher. Does not change the knock-off. Min: 0 Max: 150 Default: 100
        ZombieSlowdownStrength = 100,
        -- How close a zombie must be to count as touching. Higher counts zombies from further out, 0 needs them right on top of you. Min: 0 Max: 100 Default: 30
        ZombieContactSensitivity = 30,
        -- When enabled, riding fast drains endurance. At high exertion you can only ride slow until you have rested, and the scooter gets slower the more tired you are.
        FastRideTiring = true,
    },
    MilitaryTents = {
        -- Per-container chance that a filled military tent pack appears in eligible military or ranger/camping containers. 0 disables loot spawns entirely. Default: 10. Min: 0.00 Max: 100.00 Default: 10.00
        LootSpawnPercent = 10.0,
    },
    PRV_ExitFix = {
        -- Default seat position when rebuilding lost ModData. Default = Outside Vehicle (Default)
        -- 1 = Outside Vehicle (Default)
        -- 2 = Driver Seat (Seat 0)
        -- 3 = Passenger Seat (Seat 1)
        RebuildSpawnSeat = 1,
    },
    B42Survival = {
        -- Adds 'Carve Button' recipe to 'Magazine: Pioneering Carvers'.
        LearnedRecipe = true,
        -- Allows smoking Cigarettes, Cigarillos, and Cigars with a lit Torch.
        -- Compatible:
        -- -[B42] Horticulture
        TorchSmoking = true,
    },
    tactorgsol = {
        -- Spawn multiplier for the large tactical case Min: 0.00 Max: 100.00 Default: 1.00
        tactorgsol_large = 0.5,
        -- Spawn multiplier for the medium tactical case Min: 0.00 Max: 100.00 Default: 1.00
        tactorgsol_medium = 0.6,
        -- Spawn multiplier for the small tactical case Min: 0.00 Max: 100.00 Default: 1.00
        tactorgsol_small = 0.7,
        -- Adjust the maximum capacity of the large tactical case Min: 10 Max: 10000 Default: 45
        LargeCaseCapacity = 65,
        -- Adjust the weight reduction of the large tactical case Min: 0 Max: 100 Default: 35
        LargeCaseWeightReduction = 50,
        -- Adjust the base weight of the large tactical case Min: 1.00 Max: 50.00 Default: 5.00
        LargeCaseWeight = 5.0,
        -- Adjust the maximum capacity of the medium tactical case Min: 5 Max: 10000 Default: 25
        MediumCaseCapacity = 45,
        -- Adjust the weight reduction of the medium tactical case Min: 0 Max: 100 Default: 30
        MediumCaseWeightReduction = 40,
        -- Adjust the base weight of the medium tactical case Min: 1.00 Max: 30.00 Default: 3.00
        MediumCaseWeight = 3.0,
        -- Adjust the maximum capacity of the small tactical case Min: 1 Max: 10000 Default: 15
        SmallCaseCapacity = 25,
        -- Adjust the weight reduction of the small tactical case Min: 0 Max: 100 Default: 25
        SmallCaseWeightReduction = 30,
        -- Adjust the base weight of the small tactical case Min: 0.50 Max: 10.00 Default: 1.50
        SmallCaseWeight = 1.5,
    },
    ZombiesHaveMoney = {
        -- The percentage chance that a Zombie drops Money when killed. Min: 0 Max: 100 Default: 50
        MoneyChance = 40,
        -- The minimum number of individual Money a Zombie can drop. Min: 1 Max: 100 Default: 5
        MinBills = 5,
        -- The maximum number of individual Money a Zombie can drop If set lower than Minimum Bills, the two values are swapped automatically. Min: 1 Max: 100 Default: 30
        MaxBills = 30,
        -- When enabled, Zombies have a chance to drop Money Bundles instead of individual Money.
        EnableBundles = true,
        -- The percentage chance that a Zombie drops Money Bundles when killed. If the roll fails, the mod falls back to the individual Money drop. Only applies if Money Bundles are enabled Min: 0 Max: 100 Default: 5
        BundleChance = 5,
        -- The minimum number of Money Bundles a Zombie can drop. Min: 1 Max: 100 Default: 1
        MinBundles = 1,
        -- The maximum number of Money Bundles a Zombie can drop. If set lower than Minimum Bundles, the two values are swapped automatically. Min: 1 Max: 100 Default: 1
        MaxBundles = 1,
    },
    WSSpawn = {
        -- Choose the spawn locations difficulty level : Easy (†), Normal (††) and Hard (†††) Default = All
        -- 1 = All
        -- 2 = Easy
        -- 3 = Easy & Normal
        -- 4 = Normal
        -- 5 = Normal & Hard
        -- 6 = Hard
        Diff = 1,
        -- Enable, disable or only include cabins locations in the spawn table Default = Enable
        -- 1 = Enable
        -- 2 = Cabins only
        -- 3 = Disable
        Cabins = 1,
    },
    SVRPClassicBows = {
        -- Min: 0 Max: 100 Default: 100
        RecoverMissedArrowsChance = 100,
        -- Min: 0.00 Max: 10.00 Default: 1.00
        AimingXPMultiplier = 1.5,
        -- Min: 0.10 Max: 10.00 Default: 1.00
        DamageScale = 1.0,
        -- Min: 0.00 Max: 100.00 Default: 1.00
        SpawnRateMultiplier = 0.6,
        RetroactiveSpawnBows = false,
        -- Min: 0 Max: 10 Default: 0
        FixedAimingLevel = 0,
        OnlyRecoverFromCorpses = false,
        EnableDebugMode = false,
    },
    DGMC_Bolt_Cutters = {
        -- whether the lock on garage doors can be cut open
        Allow_Garage_Doors = true,
        -- whether the lock on fence gates can be cut open
        Allow_Fence_Gates = true,
        -- whether bolt cutters can be used to destroy fence sections
        Allow_Fences = true,
        -- the percentage chance to drop a resource when destroying a fence section, 0 to disable Min: 0 Max: 100 Default: 0
        Fence_Wire_Chance = 0,
        -- whether the lock on security shutters over doors and windows can be cut open, the shutters will be destroyed
        Allow_Shutters = true,
        -- a character must have at least this level of strength to perform easy actions, like cutting thin wire fences Min: 0 Max: 10 Default: 3
        Easy_Strength_Req = 3,
        -- a character must have at least this level of strength to perform moderate actions, like cutting locks Min: 0 Max: 10 Default: 5
        Medium_Strength_Req = 5,
        -- a character must have at least this level of strength to perform challenging actions, like cutting thick fences Min: 0 Max: 10 Default: 7
        Hard_Strength_Req = 7,
        -- how many seconds it will take, before strength is factored in Min: 0 Max: 60 Default: 22
        Base_Duration = 22,
        -- how much muscle strain will be applied, before strength is factored in Min: 0.00 Max: 40.00 Default: 4.00
        Base_Muscle_Strain = 4.0,
        Debug_Logging = false,
    },
    DGMC_Cleaning_Wipes = {
        -- Whether you can clean your body with cleaning wipes.
        Clean_Body = true,
        -- Whether you can clean clothing with cleaning wipes.
        Clean_Clothing = true,
        -- Whether you can clean melee weapons with cleaning wipes.
        Clean_Weapons = true,
        -- Whether to remove makeup when cleaning your body.
        Remove_Makeup = true,
        -- How long it takes to clean with wipes, relative to washing with water only.  Lower for faster, higher for slower. Min: 0.00 Max: 10.00 Default: 1.00
        Speed_Mult = 1.0,
        -- When cleaning clothes, their wetness level will be set to a maximum of this value or its current level.  For example with the default value, clothes at 0 wetness would be set to 25, while clothes already at 50 wetness would stay at 50. Min: 0 Max: 100 Default: 25
        Wetness = 25,
        Debug_Logging = false,
    },
    xPhone = {
        -- Show the pop-up banner when a message or transfer arrives. Ringtones are not affected.
        EnableNotifications = true,
        -- Allow players to use the Global Chat app. When disabled, the app is hidden and the server rejects global messages.
        EnableGlobalChat = true,
    },
    XNTrees = {
        -- Growth time per cycle in game days. Default: 38 days Min: 1 Max: 150 Default: 38
        AppleGrowTime = 38,
        -- Growth time per cycle in game days. Default: 33 days (fast-growing tropical) Min: 1 Max: 150 Default: 33
        BananaGrowTime = 33,
        -- Growth time per cycle in game days. Default: 34 days (fast-growing stone fruit) Min: 1 Max: 150 Default: 34
        CherryGrowTime = 34,
        -- Growth time per cycle in game days. Default: 41 days (slow citrus) Min: 1 Max: 150 Default: 41
        LemonGrowTime = 41,
        -- Growth time per cycle in game days. Default: 44 days (very slow citrus with 8 stages) Min: 1 Max: 150 Default: 44
        OrangeGrowTime = 44,
        -- Growth time per cycle in game days. Default: 36 days (medium-fast stone fruit) Min: 1 Max: 150 Default: 36
        PeachGrowTime = 36,
        -- Growth time per cycle in game days. Default: 50 days (slowest) Min: 1 Max: 150 Default: 50
        PineappleGrowTime = 50,
        -- Min: 1 Max: 10 Default: 1
        HarvestYield = 1,
    },
    zRePA = {
        -- Min: 0 Max: 30000 Default: 20
        ChanceMillitary = 20,
        -- Min: 0 Max: 30000 Default: 10
        ChanceMilEXO = 10,
        -- Min: 0 Max: 30000 Default: 10
        ChanceTractor = 10,
    },
    zReBSI = {
        -- Min: 0 Max: 10 Default: 3
        DoctorLevelForInfo = 3,
    },
    FlagsSystem = {
        -- If enabled, flags will emit their own light within a 10-tile radius. Right-click to enable or disable the light, with a submenu for blinking options.
        EnableLights = true,
    },
    MarzGuns = {
        -- Enable Vanilla Weapon Replacement with GoM counterpart.
        VanillaWeaponReplacement = true,
        -- Enable Vanilla Ammo Replacement with GoM counterpart.
        VanillaAmmoReplacement = true,
        -- Enable Vanilla Attachments Replacement with GoM counterpart.
        VanillaAttachmentReplacement = true,
        -- Scales how often Guns of Marz weapons, attachments and magazines are injected into world loot, vehicles and bags. 1.0 = default, higher = more common, 0 = disable GoM loot injection. Min: 0.00 Max: 100.00 Default: 1.00
        LootMultiplier = 1.0,
        -- Allow extended / drum magazines (50+ round AR, Russian drums, big pistol/SMG sticks) to appear in loot. Disable for a more grounded game.
        SpawnHighCapMags = true,
        -- Allow fragmentation grenades, smoke and incendiary devices to spawn in military and police loot. Off by default.
        SpawnExplosives = true,
    },
    KentuckyCellar = {
        -- Enable the separate freezing compartment. Disable this to build and use the cellar with only the main storage section.
        EnableColdStorage = true,
        -- Capacity of the main refrigerated cellar section. Default: 100. Maximum: 100. Min: 25 Max: 100 Default: 100
        CellarCapacity = 100,
        -- Capacity of the freezing section when Cold Storage is enabled. Default: 50. Min: 25 Max: 100 Default: 50
        ColdStorageCapacity = 65,
    },
    CompanionDogs = {
        -- How much trust a pet must reach (by feeding) before it becomes your companion. Min: 1 Max: 1000 Default: 100
        TameThreshold = 95,
        -- Maximum number of animals a player can keep bonded at once. 0 = no limit. Min: 0 Max: 30 Default: 0
        MaxCompanions = 0,
        -- Allow pets to attack nearby zombies.
        CombatEnabled = true,
        -- Default damage is 1. 0 means the pet can no longer kill zombies. Min: 0.00 Max: 5.00 Default: 1.00
        DogDamageMultiplier = 1.0,
        -- Turns hunger, thirst, loyalty and stress on or off.
        UpkeepEnabled = true,
        -- Daily hunger and thirst rate. Raise it and the pet eats and drinks more often. Min: 0.00 Max: 5.00 Default: 1.00
        NeedsRateMultiplier = 1.0,
        -- Base loss. A hungry or thirsty pet loses it faster. Min: 0.00 Max: 100.00 Default: 12.00
        LoyaltyDecayPerDay = 12.0,
        -- Enables the animal's need for protein in its diet.
        ProteinNeedEnabled = true,
        -- How many hours a pet can go without protein before it turns Weak. Min: 6 Max: 168 Default: 72
        ProteinHours = 72,
        -- The pets' ability to detect zombies.
        SentinelEnabled = true,
        -- Less boredom when petting or sleeping next to the animal.
        BondingEnabled = true,
        -- Moodle whose buff reduces panic, stress, sadness and boredom and makes you tire more slowly.
        RestedBuffEnabled = true,
        -- How many hours the Well Rested moodle lasts. Min: 0.50 Max: 24.00 Default: 2.00
        RestedBuffHours = 2.0,
        -- Enables the moodle with each breed's unique buffs.
        BreedMoodlesEnabled = true,
        -- Global multiplier for the pet's skills. Min: 0.10 Max: 10.00 Default: 0.50
        SkillXPRate = 0.5,
        -- Lets the pet take on caring for animals in pens. Affects server performance (low impact).
        FarmCareEnabled = true,
        -- Enables the pet's tricks. Can be OP on a server.
        TricksEnabled = true,
        -- Barking, meowing and the like can attract zombies.
        DogNoiseAttractsZombies = true,
        -- Text with the pet's name. Turn off for more immersion.
        ShowNameTags = true,
        -- Animal spawn rate. Default is 1, 0 disables spawning. Min: 0.00 Max: 5.00 Default: 1.00
        DogSpawnMultiplier = 1.0,
        -- When on, wild animals cannot die from vehicles, fire, attacks and the like.
        WildDogsInvincible = false,
        -- When the owner logs out of the server, the animal leaves with them.
        DespawnOnOwnerOffline = true,
        -- Multiplies the saddlebag's cargo capacity. 0 makes it purely cosmetic. Min: 0.00 Max: 5.00 Default: 1.00
        CargoCapacityMultiplier = 1.0,
        -- Lets pets breed. Affects server performance (low impact).
        BreedingEnabled = true,
        -- How many in-game days a pregnant pet carries before giving birth. Min: 1 Max: 60 Default: 4
        GestationDays = 4,
        -- How many in-game days a puppy takes to grow into an adult. Min: 1 Max: 365 Default: 90
        MaturityDays = 90,
        -- Percent chance per in-game day that a nearby adult male and female with the same owner breed on their own (rolled hourly). Same conditions as manual breeding: fed, loyal, healthy, off cooldown, a free dog slot, and breeding not blocked on either. Only while they are loaded near you. 0 = off. Min: 0.00 Max: 100.00 Default: 5.00
        BreedChancePerDay = 5.0,
        -- When on, running into a pet can knock you down.
        TripOverDogs = true,
        -- The pet can pick up wounds and illnesses. Default: on.
        VetCareEnabled = true,
        -- Everyone starts out knowing every vet care recipe, no need for the mod's magazine.
        VetRecipesUnlocked = true,
        -- The pet can die of illness, hunger and thirst. Default: off.
        Death = false,
        -- Chance that a bite the pet lands on a zombie hurts its paw. Default 0.4 percent. Each Combat level of the pet lowers it by 5 percent of this value, so at level 10 it is halved. Min: 0.00 Max: 100.00 Default: 0.40
        VetWoundChance = 0.2,
        -- Percent chance that each fence the pet hops leaves it with a sprained paw. Default 0.5, 0 means never. Min: 0.00 Max: 100.00 Default: 0.50
        VetSprainChance = 0.5,
        -- Percent chance the pet catches worms for every 6 hours with an upset stomach. Default 10 percent. Min: 0.00 Max: 100.00 Default: 10.00
        VetWormsChance = 10.0,
        -- Chance that bad food or water leaves the pet vomiting. Default 25 percent. Min: 0.00 Max: 100.00 Default: 25.00
        VetSpoiledChance = 25.0,
        -- Chance of catching the flu: rolled while the pet is starving, and for each hour beside a sick dog. Default 15 percent. Min: 0.00 Max: 100.00 Default: 15.00
        VetFluChance = 15.0,
        -- Rolled for every 6 straight hours outdoors. Going indoors resets the count. Default 1.5 percent. Min: 0.00 Max: 100.00 Default: 1.50
        VetHeartwormChance = 1.5,
        -- Chance that the pet is born allergic to one meat for life, rolled once per pet. Default 5 percent. Min: 0.00 Max: 100.00 Default: 5.00
        VetAllergyChance = 5.0,
        -- Chance that each bite in a fight brings fleas or ticks. Default 0.2 percent. Min: 0.00 Max: 100.00 Default: 0.20
        VetInfestChance = 0.2,
    },
    HydrOHolic = {
        -- Adds Hydr-O-Holic debug inspection options to the right-click menu. Intended for troubleshooting only.
        EnableDebugTools = false,
        -- Prevents players from building the Hydr-O-Holic well. Requires a full game restart after changing. Existing wells continue to work.
        DisableBuildHydrOHolicWell = false,
        -- Prevents players from building the Industrial Water Storage. Requires a full game restart after changing. Existing tanks continue to work.
        DisableBuildIndustrialWaterStorage = false,
    },
    CyesPushDoors = {
        -- Scales damage dealt to zombies.
        -- 0 disables damage but keeps other effects. Default: 1.0. Min: 0.00 Max: 2.00 Default: 1.00
        ZombieDamageMultiplier = 1.0,
        -- Scales targets per regular impact for all supported doors.
        -- Forced opening always affects its entire eligible crowd; sliding glass doors remain capped at 3. Min: 0.25 Max: 2.00 Default: 1.00
        ZombiesAffectedMultiplier = 1.0,
        -- Scales how many eligible zombies a character can push through before an entrance blocks.
        -- It also changes the pressure used to calculate regular and forced door wear. Garages are excluded. Default: 1.0. Min: 0.50 Max: 2.00 Default: 1.00
        DoorBlockCapacityMultiplier = 1.0,
        -- Chance for a selected eligible zombie to fall during regular, closing, or forced impacts; otherwise it staggers.
        -- Arm strain can reduce it. Sliding glass doors never knock zombies down. Default: 35%. Min: 0 Max: 100 Default: 35
        ZombieKnockdownChance = 35,
        -- Scales every durability loss caused by Push Doors!.
        -- 0 disables regular, forced, and garage wear, including random garage failure. Default: 1.0. Min: 0.00 Max: 3.00 Default: 1.00
        DoorWearMultiplier = 1.0,
        -- Extra wear multiplier for successful forced openings.
        -- Stacks with Door Wear; 0 disables only forced-opening wear. Default: 1.0. Min: 0.00 Max: 3.00 Default: 1.00
        ForcedOpeningDoorWearMultiplier = 1.0,
        -- Extra wear multiplier for garage doors.
        -- Stacks with Door Wear. Default: 1.0. Min: 0.25 Max: 3.00 Default: 1.00
        GarageDoorWearMultiplier = 1.0,
        -- Scales garage failure from Strength and existing damage while Door Wear is above 0.
        -- 0 disables random failure, not normal wear. Default: 1.0. Min: 0.00 Max: 3.00 Default: 1.00
        GarageFailureChanceMultiplier = 1.0,
        -- Scales vanilla Endurance consumed by successful CPD impacts.
        -- 0 disables CPD drain; current Endurance still affects CPD. Default: 1.0. Min: 0.00 Max: 3.00 Default: 1.00
        EnduranceCostMultiplier = 1.0,
        -- Scales the normal chance of fracturing one healthy part of the selected arm: hand, forearm, or upper arm.
        -- At critical endurance, with both arms already at the strain limit, or when the selected arm reaches the limit after the action, fracture risk is always 100%. Default: 1.0. Min: 0.00 Max: 2.00 Default: 1.00
        ForcedOpeningFractureRiskMultiplier = 1.0,
        -- Scales strain added to both arms by regular successful impacts and to the selected arm during forced opening.
        -- It also applies before garage-specific strain. Min: 0.00 Max: 3.00 Default: 1.00
        ArmStrainGainMultiplier = 1.0,
        -- Scales the 20.00 limit and every penalty threshold.
        -- Both arms at the limit block CPD effects. Default: 1.0. Min: 0.25 Max: 5.00 Default: 1.00
        ArmStrainUsageLimitMultiplier = 1.0,
        -- Extra strain multiplier for garage impacts.
        -- Stacks with Arm Strain Gain. Default: 1.0. Min: 0.25 Max: 3.00 Default: 1.00
        GarageArmStrainMultiplier = 1.0,
        -- Scales how arm strain reduces damage and knockdown chance.
        -- Default: 1.0. Min: 0.00 Max: 2.00 Default: 1.00
        ArmStrainPenaltyMultiplier = 1.0,
        -- Scales the anti-spam recovery between CPD impacts: 1.60s at 0-4.99 arm strain, 2.00s light, and 2.50s medium/high.
        -- Low Endurance can add extra recovery time. Default: 1.0. Min: 0.25 Max: 3.00 Default: 1.00
        ArmStrainRecoveryMultiplier = 1.0,
        -- Allows impacts to damage other valid PvP players. On normal doors, fence gates, and double entrances, a stronger target blocks the regular interaction but can be hit through forced opening. Sliding and garage doors do not use the player Strength block.
        DamagePlayers = true,
        -- Allows eligible door impacts to knock down other valid PvP players. Regular impacts use Player Knockdown Chance; forced opening has a 100% knockdown chance across its two-square impact band.
        KnockDownPlayers = true,
        -- Maximum chance for regular impacts after comparing Strength and Fitness.
        -- Winning one stat halves it; winning neither sets it to 0. Forced opening uses 100% while Knock Down Players is enabled. Default: 25%. Min: 0 Max: 100 Default: 25
        PlayerKnockdownChance = 25,
        -- Allows door impacts to damage and stun crawling zombies.
        AffectCrawlers = true,
        -- Allows doors, fences, and double doors to apply mod effects from either side.
        -- Disabled by default. Garages and sliding doors are unaffected.
        AllowImpactsFromBothSides = false,
        -- In MP, locks each player's personal feedback controls and enforces Global Impact Feedback.
        -- The forced-opening shortcut remains available.
        HideIndividualOptions = false,
        -- When personal feedback controls are locked, controls messages, custom animations, and sound effects for everyone.
        GlobalImpactFeedback = true,
    },
    GasPumpIndicator = {
        -- Adds the pump's remaining fuel to its right-click menu.
        -- Vanilla shows this number in debug mode only.
        ShowFuelAmount = false,
    },
    PropaneExchangeCabinet = {
        -- Turn OFF to make the mod completely dormant: no spawning, no recovery, no cabinet visual updates - while the mod stays loaded so your save (especially multiplayer) remains loadable. Use this instead of uninstalling on game 42.20.4+, which cannot cleanly uninstall mods with craftable furniture. Existing cabinets remain as plain containers. A relog may be needed after changing this mid-save.
        Enabled = true,
        -- Chance that a propane exchange cabinet spawns at each eligible location (Fossoil/Gas2Go gas stations, Zippee's convenience stores). Rolled ONCE per station per save - a station that rolls empty stays empty on that save. 0 = never, 100 = always. Min: 0 Max: 100 Default: 50
        SpawnChance = 50,
        -- Upper limit on how many propane tanks a spawned cabinet is stocked with (actual count is random from 0 to this). Min: 0 Max: 6 Default: 6
        MaxTanks = 6,
        -- Relative weight for a tank being near-full (90%-100%). Weighted against the near-empty weight. Tanks are never in the 20%-90% range. Min: 0 Max: 100 Default: 55
        FillWeightFull = 55,
        -- Relative weight for a tank being near-empty (0%-20%). Min: 0 Max: 100 Default: 15
        FillWeightEmpty = 15,
        -- Chance that a stocked propane cabinet includes the recipe-teaching magazine (Welder Special Edition). 0 = never, 100 = always -- subject to the one-per-save limit below, if enabled. Min: 0 Max: 100 Default: 25
        MagazineChance = 25,
        -- If enabled, the magazine stops dropping after the first copy is found on this save (not per player -- see mod notes for the multiplayer caveat). If disabled, it can drop repeatedly at the chance above.
        MagazineOnePerSave = true,
        -- If selected only weathered cabinets will spawn, existing cabinets are not affected.
        RemoveNewCabinets = false,
    },
    ReadingPlus = {
        -- Min: 0.01 Max: 1.00 Default: 0.80
        SittingSpeedMultiplier = 0.8,
        EnableWhileWalking = true,
        EnableConfirmationDialog = true,
        FilterAlreadyReadBooks = true,
        FilterAboveLevelBooks = true,
    },
    HorseMod = {
        -- Min: 0.10 Max: 10.00 Default: 1.00
        WalkSpeed = 1.1,
        -- Min: 0.10 Max: 10.00 Default: 1.00
        GallopSpeed = 1.2,
        -- Min: 0.10 Max: 2.00 Default: 1.00
        StaminaMultiplier = 1.5,
        RidingPainGrunt = true,
    },
    WaterPipes = {
        -- When on, taps no longer purify tainted water automatically: tainted water stays tainted until you run it through a purifier tile. On by default as the survival baseline; turn it off to have taps serve clean water like vanilla.
        RealisticPurification = true,
        -- A plumbed generator pulls fuel from the network once its tank drops below this percentage of its capacity. Set to 0 to disable auto-refuelling. Min: 0 Max: 100 Default: 25
        GeneratorRefuelThreshold = 25,
        -- When auto-refuelling, the generator is topped up to this percentage of its tank (100 = full). Min: 0 Max: 100 Default: 100
        GeneratorRefuelTarget = 100,
        -- How fast the electric purifier's filter wears out with use, as a percentage of the default rate. 100 = default (a full filter cleans about 5000 units of tainted water before it needs repair). 200 = wears twice as fast, 50 = half as fast. Set to 0 so filters never wear out and never need repairing. Min: 0 Max: 1000 Default: 100
        PurifierFilterWear = 100,
        -- How water pressure is worked out. Pressure is measured in metres of water column: height above a tap adds pressure, distance along the pipes spends it, and pumps create it. Realistic uses the full model. Simple counts height only, so distance never costs anything. Off restores the old behaviour, where water simply flows downhill however far it has to travel. Default = Realistic (height, distance and pumps)
        -- 1 = Realistic (height, distance and pumps)
        -- 2 = Simple (height only, distance is free)
        -- 3 = Off (old behaviour, gravity only)
        PressureModel = 1,
        -- Pressure a source gains for each floor it sits above what it feeds, in tenths of a metre of water column. 30 = 3.0 per floor, which matches a real storey height. Higher values make rooftop tanks and water towers stronger. Min: 0 Max: 200 Default: 30
        PressurePerLevel = 30,
        -- Pressure a container provides on its own floor, in tenths of a metre of water column, from the weight of its own water. 10 = 1.0, which lets a tap draw from about 20 tiles away on the flat. Raise this if taps in your base sit a long way from their containers. Min: 0 Max: 200 Default: 10
        PressureContainerBase = 10,
        -- How much pressure each pipe tile costs, as a percentage of the default. 100 = default. 200 = pipes lose pressure twice as fast, halving how far water travels. Set to 0 so distance never costs pressure and only height and pumps matter. Min: 0 Max: 500 Default: 100
        PressureFrictionScale = 100,
        -- How much of the pressure arriving at a purifier's dirty side reaches its clean side, as a percentage. A purifier is two tanks with a filter between them, so it cannot carry pressure the way a pipe does. 60 = default: town mains at 25 leave 15 behind the purifier, enough for taps and drips at full rate but not for a sprinkler without a pump. 100 makes the purifier transparent to pressure. 0 gives the clean side only a container's own base pressure. Min: 0 Max: 100 Default: 60
        PurifierHeadTransfer = 60,
        -- How much a pipe is charged for the water its NEIGHBOURS are drawing. 100 = full realism: thirty sprinklers on one line starve each other, and only the ones nearest the pump run. 0 = the pre-4.x behaviour, where every consumer priced its run as if it were alone on the network, so any number of sprinklers ran off a single pump. Lower it if an existing farm stopped working and you would rather not rebuild it into zones. Min: 0 Max: 100 Default: 100
        HydraulicDemandScale = 100,
        -- Pressure a powered pump adds to its part of the network, in tenths of a metre of water column. 250 = 25.0, which matches a domestic pressure set. Pumps chained together add up. A sprinkler needs 20.0, so one pump runs sprinklers about 30 tiles away. Min: 0 Max: 1000 Default: 250
        PumpHead = 250,
        -- How far below itself a pump can still lift water, in tenths of a metre of water column. 70 = 7.0, about two floors, which is the real limit for a surface pump because atmospheric pressure caps suction. A source further down will not prime, no matter how strong the pump is. Raise this if you want pumps to reach deep basements. Min: 0 Max: 500 Default: 70
        PumpSuctionLimit = 70,
        -- How much water a pump draws from a well or open water each in-game minute. 20 = about 1200 litres an hour, which is on the modest side for a real pump. This is the main brake on infinite river water, so lower it if water feels too easy. Min: 0 Max: 500 Default: 20
        PumpIntakeRate = 20,
        -- When on, a pump placed beside open water draws unlimited dirty water from it, which you can then clean with a purifier. Turn this off to keep water scarce: pumps will still work from wells and from your own containers.
        PumpFromWaterBodies = true,
        -- Above this pressure a drip emitter blows out and stops watering until you repair it, just like a real one. In tenths of a metre of water column: 150 = 15.0, well under a pump's 25.0, so a pump on the same line will burst your emitters unless you put a router in between and set a limit. Set to 0 so emitters never burst. Min: 0 Max: 1000 Default: 150
        DripBurstPressure = 150,
        -- When on, a running sprinkler attracts zombies, which is the price you pay for watering a whole area at once. Turn it off if you would rather irrigate quietly.
        SprinklerNoise = true,
        -- While the water service is still running, a plumbed sink or shower feeds your pipes instead of just drawing from them: it fills your containers and holds the network at mains pressure, so sprinklers run without a pump until the day the water is cut. Turn this off to keep the old behaviour, where plumbing a fixture switched its town water off and gave nothing back.
        MainsSupply = true,
        -- Pressure the town supply holds the network at, in tenths of a metre of water column. 250 = 25.0, the low end of what a real municipal main runs. A sprinkler needs 20.0, so at the default the mains runs sprinklers on its own. Lower it if you want pumps to still matter before the shutoff. Min: 0 Max: 1000 Default: 250
        MainsHead = 250,
        -- How much water the town supply pushes into your network each in-game minute. 60 = 3600 litres an hour, three times a pump, because the mains is the fattest source in the game. Lower it if filling your whole reserve before the shutoff feels too easy. Min: 0 Max: 1000 Default: 60
        MainsIntakeRate = 60,
        -- When on, water left sitting in a container or pipe network turns tainted after a while, and rain contaminates any open water left outside. Drawing from a network, refilling it, or town water flowing through it all count as movement and keep it fresh. Turn off to keep stored water clean forever.
        WaterStagnation = true,
        -- How many days a sealed container (a covered collector, the pipe network itself, a lidded amphora) may sit with no movement before its water turns tainted. Sealed water keeps for weeks, so this is the long timer. Set to 0 so sealed water never goes bad. Min: 0 Max: 180 Default: 30
        StagnationDaysClosed = 30,
        -- How many days an open, rain-catching container (a rain collector, an uncovered amphora) may sit with no movement before its water turns tainted. Open water spoils in days, so this is the short timer. Set to 0 so open water never goes bad on its own (rain can still taint it). Min: 0 Max: 180 Default: 10
        StagnationDaysOpen = 10,
        -- When on, rain falling on an open container left outside taints its whole network, so uncovered collection is a gamble whenever the weather turns. Turn off if you would rather open containers only spoil from sitting still.
        RainTaintsOpenWater = true,
        -- How much water a fire hydrant still holds in its local main once the town water is cut. 1000 by default. While the water service is on the hydrant is mains-fed and effectively bottomless; this is only what is left afterwards, and it drains as you use it. Set to 0 so hydrants run dry the moment the water stops. Min: 0 Max: 20000 Default: 1000
        HydrantReserve = 1000,
        -- Pressure an open, mains-fed fire hydrant holds its network at, in tenths of a metre of water column. 400 = 40.0, well above the household mains (25.0) and a sprinkler's 20.0, because a hydrant is a high-flow tap on the town main. Opening one runs sprinklers far from any container with no pump, right up to the day the water is cut, after which the hydrant still yields its reserve but with no pressure. Lower it to make hydrants less of a free pump. Min: 0 Max: 1000 Default: 400
        HydrantHead = 400,
        -- Iron Pipes each fixture costs when plumbing a whole building. 1 = one Iron Pipe per sink, toilet or washer connected, however far the pipe has to run to reach it. 0 = free. Pipe laid this way gives nothing back when dismantled. Min: 0 Max: 10 Default: 1
        BuildingPlumbCostPerFixture = 1,
        -- How many days a full Battery keeps a moisture sensor running when its tile has no electricity. Min: 1 Max: 365 Default: 30
        SensorBatteryDays = 30,
        -- How far from a moisture sensor a valve can be and still be linked to it. 0 = no limit. Min: 0 Max: 1000 Default: 0
        SensorLinkRange = 0,
    },
    CNF = {
        -- CNF survivors appear only when a player hears a call for help on the CNF station. When off, no new survivor is discovered.
        RadioDiscovery = true,
        -- Every radio a player opens already has the station where survivors call for help among its presets, so everyone can listen from the start without searching for it.
        RescueStationKnown = false,
        -- 1 keeps discovery as designed: rare, and a better radio helps. Higher values make calls for help more frequent. At 10 a player who keeps listening hears a new survivor at least every half hour of real time, until the open calls are at their limit. Min: 1.00 Max: 10.00 Default: 1.00
        DiscoveryRateMultiplier = 1.0,
        -- Minimum game days before a survivor nobody reached is given up as missing. The time stops while a player is near them. Min: 1 Max: 60 Default: 3
        SurvivorLifetimeMinDays = 3,
        -- Maximum game days before a survivor nobody reached is given up as missing. Min: 1 Max: 120 Default: 10
        SurvivorLifetimeMaxDays = 10,
        -- A survivor discovered by radio is at least this far from every player. There is no maximum distance, though nearer places are preferred. Min: 100 Max: 5000 Default: 500
        DiscoveryMinDistance = 500,
        -- The radius of the purple area to search for the survivor in. Min: 10 Max: 200 Default: 40
        DiscoveryAreaRadius = 40,
        -- When the area loads, almost every zombie within this radius is removed. Often none is left, sometimes a few. Min: 0 Max: 100 Default: 25
        RescueClearRadius = 25,
        -- Zombies that respawn within this radius of a community survivor are removed as they appear, so the community does not fill up while you are away. Zombies that walk in stay. 0 turns it off. Min: 0 Max: 100 Default: 30
        GarrisonRadius = 30,
        -- How often survivors talk to each other and to players nearby. Off silences them; lines about emergencies are not affected. Default = Normal
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Normal
        -- 4 = Frequent
        SurvivorChatter = 3,
        -- How strongly what happens moves survivors' morale, and how much morale changes their experience and fatigue. It cannot be turned off. Default = Normal
        -- 1 = Mild
        -- 2 = Normal
        -- 3 = Strong
        MoraleWeight = 2,
        -- How strongly what players do moves each survivor's trust in them. The levels and leaving the community do not change. It cannot be turned off. Default = Normal
        -- 1 = Mild
        -- 2 = Normal
        -- 3 = Strong
        TrustWeight = 2,
        -- How often a horde attacks the home of one of your communities. Never in a world's first three days; the chance grows with every quiet day, and one home at a time. If nobody is there, the survivors defend it alone with their skills and what they carry. Default = Normal
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Normal
        -- 4 = Often
        HomeAttacks = 3,
        -- Adds one place to the list where you choose your start: there the world begins in a small story, with survivors already around you. The world takes its scenario once, when it is created; an existing save never gets one. Random draws one. Military checkpoint: day one at an army barrier on the road to Louisville, with two soldiers, a board and something coming. Brandenburg wounded: two badly hurt survivors in a house, nothing to treat them with nearby, the clinic across town. Default = Random
        -- 1 = Random
        -- 2 = None
        -- 3 = Military checkpoint
        -- 4 = Brandenburg wounded
        StartingScenario = 1,
        -- How hard other survivors hit you when a fight with them breaks out. Off: they never hurt players, though they still fight each other and your survivors. Default = Weak
        -- 1 = Off
        -- 2 = Weak
        -- 3 = Normal
        HumanEnemies = 2,
        -- How many blows a survivor takes before going down, compared with a zombie. Every blow still leaves a wound to treat. Default = Twice
        -- 1 = As a zombie
        -- 2 = Twice
        -- 3 = Three times
        PeopleToughness = 2,
        -- How many groups of other survivors live and travel around you, near your homes and wherever you go. They grow, move, trade, settle, fight and die on their own; you meet them on the road. Off: only the enclaves. Default = Normal
        -- 1 = Off
        -- 2 = Few
        -- 3 = Normal
        -- 4 = Many
        WorldPeople = 3,
        -- Groups that live by robbing others, from the world's tenth day. They rob players away from home when there are enough of them, sometimes demanding your bag first; every other group fights them on sight. They never attack your homes. Default = Rare (two groups)
        -- 1 = Off
        -- 2 = Rare (two groups)
        -- 3 = Normal (four groups)
        Raiders = 2,
    },
    DrunkEffects = {
        -- Bursts of colour washing over the screen - logo yellow, sun-baked orange, sepia, red, deep green and white. PHOTOSENSITIVITY: with the default hold of 0.7s these are slow washes, well under the three-per-second seizure threshold. Lowering 'Colour hold' below 4 pushes them past it.
        Flashes = true,
        -- Fine horizontal scanlines drifting slowly down the screen.
        Scanlines = true,
        -- Sparse shimmering noise over the picture, like a bad video feed.
        Grain = true,
        -- A slow-breathing warm wash over the whole screen, like bar light.
        Haze = true,
        -- Darkened edges that close in steadily the drunker you get, reaching their darkest at the last drunk moodle, Utterly Shit-faced.
        Vignette = true,
        -- From the Plastered moodle up, your eyes start closing: the eyelids sag, drag back open, then shut to black for a moment before opening again. The drunker you get, the longer they stay shut and the sooner it happens again. Slow movements, never flashes.
        Blackouts = true,
        -- Intoxication (0-100) where the effects begin. One can of beer is worth 6 intoxication, so the default of 3 means they start about half a drink in. Min: 0 Max: 90 Default: 3
        StartAt = 3,
        -- Intoxication at which everything reaches maximum. The default of 50 is roughly eight beers. Setting this to 100 is possible but means seventeen beers for the full effect, which no normal play reaches. Min: 10 Max: 100 Default: 50
        FullAt = 50,
        -- Master strength of every effect, as a percentage. 100 is the tuned default, 0 disables them all, 200 is roughly double. Min: 0 Max: 200 Default: 100
        Intensity = 100,
        -- Roughly how many real seconds of calm sit between flash bursts. Randomised by about a quarter either way so the rhythm never becomes predictable. Lower means more frequent. Min: 1 Max: 60 Default: 7
        FlashGap = 7,
        -- How long each individual colour stays on screen during a burst, in tenths of a second. 7 = 0.7 seconds. PHOTOSENSITIVITY: values below 4 (0.4s) mean more than three flashes per second, which is the recognised seizure-risk threshold. Min: 1 Max: 30 Default: 7
        FlashHold = 7,
        -- Peak opacity of a colour flash, as a percentage. 0 turns flashes off entirely, 30 is the tuned default, 100 would fully replace the picture with flat colour. Min: 0 Max: 100 Default: 30
        FlashBright = 30,
        -- Off by default. When you drink past the level below, a track fades in; it fades back out as you sober up. The game's own music fades out while it plays and comes back afterwards. It follows the game's Music volume in the audio options, so turning music down there turns this down too. To use your own song, replace media/sound/DE_Music.ogg in the mod folder and put its length in TRACK_SECONDS at the top of DE_Music.lua.
        Music = false,
        -- Intoxication (0-100) at which the music fades in, on the same scale as 'Effects start at'. One can of beer is worth 6 intoxication, so the default of 18 is three beers. Min: 0 Max: 100 Default: 18
        MusicAt = 18,
        -- How loud the track plays, as a percentage. The game's Music volume setting is applied on top of this. Min: 0 Max: 100 Default: 70
        MusicVolume = 70,
        -- How many real seconds the track takes to fade all the way in, and to fade back out again once you drop below the level above. Min: 1 Max: 30 Default: 5
        MusicFade = 5,
    },
    DynamicGearRattling = {
        -- When enabled, zombies will hear the sounds of your gear. Off by default.
        ZombiesCanHearNoise = false,
        -- Multiplier for how loud zombies hear sounds (DOESN'T AFFECT PLAYERS). 1 by default, which is what the mod is balanced on. Min: 0.10 Max: 5.00 Default: 1.00
        ZombiesCanHearNoiseMultiplier = 1.0,
    },
    HydeCoBeavers = {
        -- Beavers build lodges on wild creeks, rivers, lakes and ponds across the county, never in town. A lodge starts small with two beavers and grows to medium and large with the wood that comes in, some floated down the water and some its beavers gnaw down and carry home, and the bigger it is the more beavers it has room for and lets out. Kits are born in spring into any room left. A lodge with a full store is content: its beavers rest, let you come closer and have bigger litters. A large lodge full of beavers sends a young pair off each spring to start a new lodge on other water. Beavers come out from dusk to dawn, fewer in winter, one at a time by day. A beaver that sees you swims off and dives. Beavers come back from the water with seaweed, stones, waterlogged wood or whatever the river carried down, anything from rope to someone's wallet, and the river snags things in a lodge's sticks that come out with its wood. Take the wood a lodge does not need from it, or break it up with an axe and its beavers flee and never come back. Pull at a lodge and its beavers come out and bite. A dead beaver gives meat, bones and a pelt.
        Beavers = true,
        -- How many beavers can be out around each player at the same time (6 by default); a bigger lodge lets out more. Lower it to see fewer, raise it for more. 0 stops new beavers coming out. Min: 0 Max: 12 Default: 6
        BeaversNearPlayer = 6,
        -- Hit a beaver and it turns on you for a while. Take wood from a lodge or chop at it and its beavers come out after you. They bite at your feet and shins; boots and trousers can stop a bite, and a bite never infects. Off, a hit beaver runs for the water and a lodge lets you take its wood.
        BeaversDefendLodge = true,
        -- Cattails grow on the shallows round every lodge. Cut a clump for cattails: peel the shoots to eat, pull the fluff for tinder and pillow stuffing. A cut clump grows back in a few weeks. Beavers graze them. Off, none grow.
        BeaverCattails = true,
        -- Off by default. On, about one lodge in six is rotten: nothing living comes out of it, a few zombie beavers climb out onto its bank at night and bite anyone who comes close, a dead beaver left lying can get back up as one, and pulling at a rotten lodge or chopping at it brings the whole nest out after you. By day they go back in.
        ZombieBeavers = false,
        -- Off by default: a zombie beaver's bite hurts and never carries the Knox infection. On, a scratch or laceration from one can infect you at the game's own odds.
        ZombieBiteInfects = false,
        -- Removing this mod from a game where a beaver was out at the last save loses the other animals saved around it, your own included. In single player, save once with this version (sleep, or quit) and it should be safe to remove. On a server, turn this on first: no beavers or zombie beavers come out and any that are out go home; let the server save, then remove the mod.
        PrepareToRemove = false,
    },
    HydeCoFrogs = {
        -- Green and brown frogs live by lily pads on ponds, creeks and rivers. Near water there is always at least one frog on the bank. More frogs come out from spring to autumn, in the evening, at night and in the rain. A frog that sees you leaps into the water and sinks. Sneaking lets you get closer. Frogs can be picked up, and a dead frog gives a whole frog.
        Frogs = true,
        -- How many frogs can be out around each player at the same time (4 by default). Lower it to see fewer, raise it for more. 0 stops new frogs coming out. Min: 0 Max: 12 Default: 4
        FrogsNearPlayer = 4,
        -- Removing this mod from a game where a frog was out at the last save loses the other animals saved around it, your own included. In single player, save once with this version (sleep, or quit), after letting go of any you carry and it should be safe to remove. On a server, turn this on first: no frogs come out and any that are out go home; let the server save, then remove the mod.
        PrepareToRemove = false,
    },
    HydeCoSquirrels = {
        -- Squirrels live in some of the grown trees. In daylight they come down to forage, run back up when spooked, and go home at dusk. Felling a den tree turns out whoever is inside.
        SquirrelDens = true,
        -- About one grown tree in this many is a den. Oaks are dens twice as often, small ornamental trees half as often. Lower means more squirrels. Min: 2 Max: 40 Default: 8
        DenTreeOdds = 8,
        -- How many den squirrels can be out foraging around each player at the same time (4 by default). Lower it to see fewer, raise it for more. 0 keeps them all in their dens. Min: 0 Max: 12 Default: 4
        SquirrelsNearPlayer = 4,
        -- The chance a squirrel inside a felled den tree lands stunned for a few seconds, long enough to grab it. The rest bolt for another den. Min: 0 Max: 100 Default: 33
        StunChance = 33,
        -- Some den trees are rotten. At night a few zombie squirrels come out of them and chase anyone who comes close, scratching at the feet and shins; boots and trousers help. A dead squirrel left lying can get back up. Chop a rotten den down and the whole nest comes out after you.
        ZombieSquirrels = false,
        -- When on, a zombie squirrel's scratch can carry the zombie infection, like any scratch from a zombie. Off by default: in the game's own lore, animals do not carry it.
        ZombieScratchInfects = false,
        -- Removing this mod from a game where a squirrel was out at the last save loses the other animals saved around it, your own included. In single player, save once with this version (sleep, or quit), after letting go of any you carry and it should be safe to remove. On a server, turn this on first: no squirrels or zombie squirrels come out and any that are out go home; let the server save, then remove the mod.
        PrepareToRemove = false,
    },
    OverTheShoulder = {
        -- How often the character stumbles while running and looking back. A glance of about a second is safe, after that the risk grows over three seconds up to this rate and stays there. Looking ahead again lets it fade. <LINE> 15 is roughly one fall per minute of looking back, 100 is one every ten seconds, 1000 is one a second. Zero never falls. Min: 0.00 Max: 1000.00 Default: 100.00
        RunTripChance = 100.0,
        -- The same for a sprint. Min: 0.00 Max: 1000.00 Default: 180.00
        SprintTripChance = 180.0,
        -- The rates above are for a character with no skill. Each level of Sprinting cuts them by 6%, each level of Fitness by 4%, so level ten in both removes falls entirely. Graceful halves the rate, Clumsy raises it by half. <LINE> Off, the rates work exactly as set, skills and traits are ignored.
        TripSkillScaling = true,
        -- Helmets, goggles, gas masks and other worn items that narrow the field of view also shorten how far you can see behind you when looking over the shoulder. <LINE> Off, looking back reaches behind you whatever you wear. The normal field of view is narrowed by them as usual.
        WornItemsLimitLook = true,
        -- Holding the look over the shoulder for long makes the neck stiff and sore. A quick glance and the first three seconds are free. <LINE> 1 is the normal rate, 2 twice as fast, 0.5 half as fast. Zero turns neck pain off. Min: 0.00 Max: 10.00 Default: 1.00
        NeckStrainFactor = 1.0,
        -- Degrees the edge of the field of view goes past the line straight behind you when looking back. <LINE> 0 stops right at your back, 10 shows a little more of the other side. At night a small margin helps the area straight behind stay visible. Min: 0 Max: 10 Default: 5
        BackMargin = 5,
    },
    TooltipLib = {
        -- Allow the server to respond to tooltip data requests from clients. Disable to prevent any server-side tooltip processing.
        EnableMPSync = true,
    },
    ChainsawB42 = {
        -- In %. 100 = a full tank lasts about 16 minutes idling at game speed x1, less while cutting. 0 = no consumption. Min: 0 Max: 500 Default: 100
        FuelConsumption = 100,
        -- In %, damage of a running chainsaw. 100 = normal. Min: 25 Max: 500 Default: 100
        DamageMod = 100,
        -- Condition lost per zombie killed with a running chainsaw (condition 127). 12 = about 10 zombies. 0 = none. Min: 0 Max: 100 Default: 12
        ConditionLossCombat = 20,
        -- Condition lost, one chance in 8 per cut (2.5 cuts per second). 0 = none. Min: 0 Max: 20 Default: 1
        ConditionLossTree = 1,
        -- In %. 100 = a small tree falls in 1 to 3 seconds, the biggest in about 11 seconds (cut tree action). Also scales attacks on a tree. Min: 25 Max: 400 Default: 100
        TreeCuttingSpeed = 100,
        -- In %, endurance lost by attacking with a running chainsaw. 100 = full cost of a 7 kg weapon swung every 0.67 s, 0 = none. Min: 0 Max: 200 Default: 50
        EnduranceCost = 50,
        -- Radius in tiles of the noise that attracts zombies every 2 seconds while the engine idles. 0 = silent. Min: 0 Max: 100 Default: 20
        NoiseIdle = 20,
        -- Radius in tiles of the noise that attracts zombies every 2 seconds while attacking or cutting a tree. 0 = idle noise only. Min: 0 Max: 100 Default: 40
        NoiseWorking = 40,
        -- Chance in % that a chainsaw below half condition fails to start. 0 = never. Min: 0 Max: 100 Default: 25
        JamFrequency = 25,
        -- 3 = default (1 to 3 % per roll in logging sites, ranger stations, fire stations, barns, garages...). 0 = none. Applied when the game starts. Min: 0 Max: 10 Default: 3
        LootChance = 3,
    },
    ZombieDismemberment = {
        Enabled = true,
        -- Min: 0 Max: 100 Default: 45
        LongBladeChance = 45,
        -- Min: 0 Max: 100 Default: 25
        AxeChance = 25,
        -- Min: 0.00 Max: 5.00 Default: 0.75
        DamageThreshold = 0.75,
        -- Min: 0.00 Max: 5.00 Default: 1.80
        UpperArmDamage = 1.8,
        CriticalAlwaysCuts = true,
        EnableLegs = true,
        -- Min: 0 Max: 100 Default: 30
        LegTargetChance = 30,
        EnableShotguns = true,
        -- Min: 0 Max: 100 Default: 25
        ShotgunChance = 25,
        EnableDecapitation = true,
        -- Min: 0 Max: 100 Default: 5
        DecapitationChance = 5,
        DecapitationStrength = true,
        DropParts = true,
        DropCloth = false,
        -- Min: 0 Max: 128 Default: 24
        DropMax = 24,
        -- Min: 0 Max: 3600 Default: 180
        DropLife = 180,
        -- Min: 0 Max: 200 Default: 50
        DropDistance = 50,
        DropFlight = true,
        -- Does not limit amputations. One-piece allowance survives saving and loading. Cloth has its own switch. Default = Every severed limb
        -- 1 = None
        -- 2 = At most one
        -- 3 = Every severed limb
        DropPerZombie = 3,
        DropBlood = false,
        -- Ground-moving amputees bleed during their configured window. Leg wounds use an approximate knee position based on facing and severed side. Duration and allowance persist across saving/loading and are not renewed by further cuts.
        CrawlBlood = true,
        -- Each shotgun decapitation prioritizes up to six burst particles, respecting a lower configured count. Older extra particles are recycled first; maximum64 active. Extreme saturation replaces the oldest core particles. The visual core may exceed an exhausted extra budget without adding floor blood. Disabled burst, zero count or zero budget disables the core.
        HeadBurst = true,
        -- Min: 0 Max: 120 Default: 20
        BleedTime = 20,
        -- Min: 0 Max: 2048 Default: 768
        BleedMarks = 768,
        -- Limits ordinary extra emissions and floor blood. Core burst particles consume available budget, but remain visible when it is exhausted: a transient-only exception within the64-particle cap. Zero disables the core too. Does not replenish pools or persistent bleeding. Min: 0 Max: 256 Default: 96
        BloodBudget = 96,
        -- Min: 0 Max: 64 Default: 16
        BloodMaxZombies = 16,
        -- Dense-core pool under a living stationary amputee on the floor, including armless zombies. Grows with elapsed time and emitted blood onto neighboring loaded floors.
        PoolBlood = true,
        -- Remaining allowance is paced over the bleeding window so the initial pool leaves blood for later crawling. This is a maximum per pulse. Min: 1 Max: 16 Default: 12
        BleedAmount = 12,
        -- Min: 250 Max: 3000 Default: 250
        BleedInterval = 250,
        -- Min: 0.15 Max: 1.00 Default: 0.80
        PoolRadius = 0.8,
        -- Does not affect cloth scraps. Has its own duration and allowance, sharing the global blood budget. Saving/loading does not renew it.
        DropPools = true,
        -- Min: 0 Max: 15 Default: 4
        DropPoolTime = 4,
        -- Min: 0 Max: 24 Default: 9
        DropPoolMarks = 9,
        -- Adds stains and up to three visible drops at the cut. Shares the global blood limit; trails and pools may be disabled. Does not alter the original impact blood.
        CutBlood = true,
        -- Min: 0 Max: 64 Default: 12
        CutBloodMarks = 12,
        -- Min: 0.10 Max: 1.00 Default: 0.20
        CrawlSpacing = 0.2,
        -- Requested particle count per shotgun decapitation; zero disables particles. The first six, or all particles if fewer, receive priority. Remaining particles require space and budget.3D chunks have their own option. Min: 0 Max: 64 Default: 32
        HeadBurstCount = 32,
        -- Min: 250 Max: 1500 Default: 900
        HeadBurstDuration = 900,
        -- Requires detached pieces enabled. Whole heads only on confirmed sword or katana decapitations; shotgun uses explosion. Shares saved per-zombie allowance, total pieces, lifetime and distance. Cannot be picked up. Combat chances stay unchanged.
        HeadDrops = true,
        -- Up to six vanilla droplets for 650 ms from an approximate neck position. Independent of radial burst; shares global budget and 32-particle limit.
        NeckBlood = true,
        -- Copies the vanilla hairstyle and its original colour as part of the same static head. No beard or hat. Unknown mod hairstyles use a bald head. Enabled when a new head is created; existing heads keep their saved appearance.
        HeadHair = true,
        -- 0 disables solid chunks. Requires shotgun head explosion and detached-piece flight enabled; does not require whole-piece drops. Up to eight shared active flights and the global piece limit. Chunks vanish on landing and cannot become loot. Min: 0 Max: 8 Default: 6
        HeadGoreCount = 6,
        -- Scales only shotgun explosion blood sprites, from1 to5. Neck spray and ordinary blood retain their original size. Min: 1.00 Max: 5.00 Default: 3.00
        HeadBurstScale = 3.0,
        -- Controls the initial native floor splash and body stains on amputation or decapitation. Independent of extra cut blood, pools, trails, flight blood and explosions. Disable those effects too to stop all added emissions. Wound textures retain their appearance. Works in SP and MP.
        ImpactBlood = true,
    },
    TakeMoreBricks = {
        -- How many bricks you get when using the Take Bricks action on a pallet. Vanilla is 20; the mod default is 80. Min: 20 Max: 500 Default: 80
        BricksPerPallet = 80,
    },
    SurvivorBriefing = {
        -- One look for every player on this server, or each player picks their own in the mod's options. Default = Each player picks
        -- 1 = Each player picks
        -- 2 = Classic
        -- 3 = Inverted
        -- 4 = Minimal
        -- 5 = Camcorder (VHS)
        -- 6 = Survivor's Journal
        -- 7 = Case File
        -- 8 = Emergency Broadcast
        -- 9 = Agent (Division)
        -- 10 = Y2K
        -- 11 = Hip-hop (90s rap)
        -- 12 = Terminal
        -- 13 = Cinematic
        -- 14 = 16-bit RPG
        -- 15 = Quarantine Notice
        -- 16 = Newspaper
        -- 17 = Military Briefing
        -- 18 = Umbrella
        -- 19 = Wayne Enterprises
        -- 20 = Red Dead
        -- 21 = Hotline Miami
        -- 22 = Max Payne
        -- 23 = Glitch
        -- 24 = Dying Light
        Look = 1,
        -- Switch the briefing's sounds off for every player, or let each player set their own volume. Default = Each player picks
        -- 1 = Each player picks
        -- 2 = Off for everyone
        Sounds = 1,
        -- Movement in the looks (rising lines, typed text, sliding bars) for every player, or each player picks. Default = Each player picks
        -- 1 = Each player picks
        -- 2 = Off for everyone
        -- 3 = On for everyone
        Motion = 1,
    },
    ScrapSurvival = {
        -- The yield multiplier applies only to iron, steel, generic metal and wood recycling. 0.50 = lower; 1.00 = normal; 2.00 = higher. Each craft still produces at least one item; item condition and skill also affect yield. Min: 0.50 Max: 2.00 Default: 1.00
        RecyclingYieldMultiplier = 0.7,
        -- Yes: Salvage Works recipes use their intended skill levels. No: skill levels do not block the mod's recipes. Materials, tools, and workstations are still required. After changing this option, in single-player quit and reload the game. In multiplayer, restart the server for the change to take effect.
        SkillRequirements = true,
        -- Adjusts only the duration of Salvage Works crafting actions. Very Fast = quarter duration; Fast = half duration; Normal = intended duration; Slow = double duration. Vanilla recipes and recipes from other mods are not affected. Default = Normal
        -- 1 = Very Fast
        -- 2 = Fast
        -- 3 = Normal
        -- 4 = Slow
        CraftingSpeed = 3,
    },
    ReverseLights = {
        -- On (default): while a vehicle is in reverse gear with its headlights on, its rear lamps turn bright white and cast a soft light behind it. Applies to your own vehicle and to nearby vehicles (multiplayer).
        -- Off: the mod does nothing and the stock red tail lamps are left untouched.
        Enabled = true,
        -- Brightness of the white rear lamp spotlight while reversing. Range 0 to 1, default 0.75 (matches vanilla front headlights). Higher values make the lamps glow more strongly. Min: 0.00 Max: 1.00 Default: 0.75
        LampBrightness = 0.75,
        -- How far the reverse lamp light cone reaches, in tiles. Range 6 to 60, default 28. Min: 6 Max: 60 Default: 28
        LampRange = 28,
        -- Spread of the reverse lamp light cone. Lower values make a wider cone, higher values a narrower, more focused beam. Range 0.10 to 0.99, default 0.75 (matches vanilla headlights). Min: 0.10 Max: 0.99 Default: 0.75
        LampCone = 0.75,
        -- Sideways position of each reverse lamp, mirrored left and right, in tiles. Range 0 to 2, default 0.5. Min: 0.00 Max: 2.00 Default: 0.50
        LampOffsetX = 0.5,
        -- Position of the reverse lamps along the vehicle, in tiles. Negative values move them toward the rear. Range -5 to 5, default -1.6 (the stock tail lamp position). Min: -5.00 Max: 5.00 Default: -1.60
        LampOffsetY = -1.6,
        -- Color of the reverse lamp spotlight. Default = White
        -- 1 = White
        -- 2 = Warm White
        -- 3 = Cool Blue
        -- 4 = Amber
        -- 5 = Red
        -- 6 = Custom
        LampColor = 1,
        -- Red channel of the reverse lamp beam, used when Reverse Lamp Color is set to Custom. Default 255. Min: 0 Max: 255 Default: 255
        CustomLampColorR = 255,
        -- Green channel of the reverse lamp beam, used when Reverse Lamp Color is set to Custom. Default 0. Min: 0 Max: 255 Default: 0
        CustomLampColorG = 0,
        -- Blue channel of the reverse lamp beam, used when Reverse Lamp Color is set to Custom. Default 0. Min: 0 Max: 255 Default: 0
        CustomLampColorB = 0,
        -- Brightness of the soft pool of light cast on the ground behind the car. Range 0 to 1, default 0.4. Set to 0 for the lamp recolour only. Min: 0.00 Max: 1.00 Default: 0.40
        GlowBrightness = 0.4,
        -- Radius in tiles of the ground glow behind the car. Range 3 to 15, default 6. Min: 3 Max: 15 Default: 6
        GlowRadius = 6,
        -- Tint of the ground glow behind the car. Default = Cool White
        -- 1 = Cool White
        -- 2 = Warm White
        -- 3 = Pale Blue
        -- 4 = Red
        -- 5 = Custom
        GlowColor = 1,
        -- Red channel of the ground glow, used when Ground Glow Color is set to Custom. Default 255. Min: 0 Max: 255 Default: 255
        CustomGlowColorR = 255,
        -- Green channel of the ground glow, used when Ground Glow Color is set to Custom. Default 0. Min: 0 Max: 255 Default: 0
        CustomGlowColorG = 0,
        -- Blue channel of the ground glow, used when Ground Glow Color is set to Custom. Default 0. Min: 0 Max: 255 Default: 0
        CustomGlowColorB = 0,
        -- On (default): a trailer attached behind a reversing vehicle also lights up.
        -- Off: only the vehicles themselves light up.
        AffectTrailers = true,
    },
    InventoryTetris = {
        -- If enabled, container weight limits are strictly enforced. (Defaults to true automatically in Multiplayer for server authority).
        EnforceCarryWeight = false,
        -- Slows character movement speed when heavily overencumbered.
        EncumbranceSlow = true,
        -- Prevents placing containers inside other containers of equal or greater size.
        PreventTardisStacking = true,
        -- Uses calculated timed actions for transferring items. (Singleplayer Only. Disabled in MP due to server limits).
        UseItemTransferTime = true,
        -- Multiplier for how fast items transfer between containers. (Singleplayer Only. Disabled in MP due to server limits). Min: 1 Max: 99 Default: 3
        ItemTransferSpeedMultiplier = 3,
        -- Adds extra grid width and height to ALL inventory containers globally. Min: 0 Max: 8 Default: 0
        BonusGridSize = 0,
        -- Multiplies Inventory Tetris stack limits globally. Enter a value from 0.01 to 100.0. Default is 1.0. Items that do not stack remain non-stackable. Min: 0.01 Max: 100.00 Default: 1.00
        StackSizeMultiplier = 1.0,
        -- Scales actual Java item weights (e.g. 0.10 = 10 percent weight). Set to 1.0 to disable. Grid footprints remain fixed at original script sizes. Min: 0.00 Max: 1.00 Default: 1.00
        ItemWeightMultiplier = 1.0,
        EnableGravity = false,
        DevMode = true,
        EnableSearch = true,
        -- Min: 1 Max: 250 Default: 40
        SearchTime = 15,
        -- Default = Some Items
        -- 1 = Disabled
        -- 2 = Some Items
        -- 3 = Enabled
        SearchBodies = 2,
    },
    VacModUtils = {
        -- Don't enable this toggle in normal gaming
        EnableDebug = false,
        CommandMonitor = false,
    },
    ProjectViewpointParkour = {
        -- How fast the Parkour skill levels up. 1 is normal, 2 twice as fast, 0 no Parkour XP at all Min: 0.00 Max: 10.00 Default: 1.00
        xpMultiplier = 1.0,
        -- Every move works at any Parkour level instead of unlocking as the skill grows. The skill still levels up
        unlockAll = false,
        -- Run or sprint at a low fence to vault it. Walking up to one stops there (Parkour level 0)
        vault = true,
        -- After a few seconds of running you speed up and the view widens; off while you are limping or in pain (level 1)
        sprint = true,
        -- While fast sprinting, zombies in your way are shoved aside (level 2)
        shove = true,
        -- Press the kick key on the ground to kick zombies, doors and windows (level 3)
        frontkick = true,
        -- Sprint, then crouch to slide (level 4)
        slide = true,
        -- Aim a gun during a slide to shoot from it, low and on the move. The view shakes and shots miss more the lower your Aiming skill; even at Aiming 10 they are a little less accurate than shots fired on your feet (level 4, with the slide)
        slideShoot = true,
        -- Land from a height in a roll (level 4)
        roll = true,
        -- Jump, then press the kick key in the air to fly feet first into zombies (level 5)
        kick = true,
        -- Press jump facing a zombie right ahead to vault over its head (level 6)
        leapfrog = true,
        -- In the air against a house wall, tap jump to scramble up it; on a tall wall tap once more to kick off backwards (level 7)
        wallclimb = true,
        -- Run at a wall from a slant, look toward it and jump to run along it (level 8)
        wallrun = true,
        -- Jump at a building edge, tall fence or half wall to latch on. Jump climbs up; hold your back key (S) as you press jump to drop back down instead (level 9)
        ledge = true,
        -- While hanging from a ledge, move sideways along it with your left and right keys (level 9)
        shimmy = true,
        -- Press jump again in the air for a second jump (level 10)
        doublejump = true,
        -- Walk into a ladder or sheet rope to take hold, climb it with your forward and back keys (any level)
        ladder = true,
        -- Sloped roofs are solid in the first and third person views: land on them, walk, run and slide along them, and step off their edges and gable ends
        roofs = true,
        -- How many storeys you can drop before landings start to hurt. Past that the hurt grows with every extra storey Min: 1 Max: 12 Default: 3
        safeFall = 3,
        -- Landings never hurt, whatever the height
        noFall = false,
        -- A landing past the safe fall height can sprain or break an ankle
        ankle = true,
        -- How likely a ledge grab or vault slips when you are tired, panicked, drunk, hurt, loaded or out in the rain or snow. 1 is normal, 0 never. Panic, rain and snow matter less the higher your Parkour level, and hardly at all at level 10 Min: 0.00 Max: 3.00 Default: 1.00
        slips = 1.0,
        -- The more exerted you are, the slower and softer your kicks and the lower your jumps. At Excessive Exertion you can't climb, kick or jump (the plain jump too) until you get your breath back. Climbing down and letting go still work
        exertion = true,
        -- Below Parkour level 7, the running shove can trip you when three or more zombies are around you
        shoveTrips = true,
        -- Below Parkour level 10 you stay on the floor longer after a drop kick, a little more for every level below
        kickRecovery = true,
        -- Heavier loads lower your jumps, weaken your sprint boost and slow your climbs
        weight = true,
        -- How strongly your load affects you, in percent: 100 is normal, 0 none, 200 twice as strong Min: 0 Max: 200 Default: 100
        weightImpact = 100,
        -- While you hang from a ledge, climb up, scramble up a wall or climb a ladder or rope, the weapon in your hands goes on your back (a knife or pistol is put away) and comes back to your hands after. Your hotbar is not changed. In every other move it stays in your hand
        stowWeapons = true,
        -- In the first and third person views the attack button attacks or shoots on its own, without holding the aim button, and you stay free to sprint, jump, climb and use things. A gun is held up, with its crosshair showing, and points where you look (lowered while you sprint). Shots on the run still miss more, as the game makes them. The aim button swings a melee weapon hard (an uppercut, slower and heavier); with a gun it aims as usual
        fpsWeapons = false,
        -- In FPS mode, with empty hands the attack button throws punches, right and left in turn, and the aim button a heavy uppercut. Off: empty hands are left to the game (the aim button aims, and with the attack button shoves)
        fpsFists = true,
        -- In first person the view trembles while you shoot from a slide and kicks harder with each shot from it (both less the better your Aiming), and jolts when a kick or punch lands. Off: none of that. Every shot's own kick is Project Viewpoint's (Controls, Impact: Camera recoil). This mod never shakes the third person view
        cameraShake = true,
        -- In the first and third person views, crouching (C) goes down low, the way the game crouches you behind cover, instead of a slight bend. The game's own low crouch, with a pose for pistols, rifles, bats, heavy weapons, spears and bags, and the view goes down with you. Zombies see you as they would anyway. Aiming from it is the game's crouched aim. Off: the game's crouch
        deepCrouch = true,
    },
    ViewpointSourceMovement = {
        autohop = false,
        -- Jump presses this close to landing still count Min: 0 Max: 200 Default: 60
        jumpBufferMs = 60,
        -- Min: 0.10 Max: 1.50 Default: 0.55
        jumpHeight = 0.55,
        trimp = true,
        -- Higher = easier to stand on fences Min: 0.10 Max: 0.50 Default: 0.35
        fenceFooting = 0.35,
        -- Lower = easier to jump onto cars Min: -0.40 Max: 0.20 Default: -0.10
        carRoofOffset = -0.1,
        windowJump = true,
        windowCrash = true,
        -- Sprinting = about 5 Min: 0.00 Max: 60.00 Default: 5.50
        windowCrashSpeed = 5.5,
        windowDamage = true,
        -- Coming down on barbed wire = cut and trip
        barbedWire = true,
        sounds = true,
        -- Default = Reasonable
        -- 1 = None
        -- 2 = Reasonable
        -- 3 = Vanilla
        fallMode = 2,
        -- Min: 0.00 Max: 32.00 Default: 1.00
        safeDrop = 1.0,
        fallKnockdown = true,
        -- Min: 0.20 Max: 1.00 Default: 0.45
        zombieReach = 0.45,
        -- Zombies can grab you out of the air
        pulldown = true,
        -- Standing on furniture = zombies smash it and you fall
        propBreak = true,
        -- Min: 1 Max: 10 Default: 2
        pulldownGroup = 2,
        -- Min: 0.00 Max: 1.00 Default: 0.20
        pulldownKeep = 0.2,
        -- Min: 0.00 Max: 3.00 Default: 0.60
        pulldownLockout = 0.6,
        -- Min: 0.00 Max: 3.00 Default: 0.13
        jumpExertion = 0.125,
        exertionWeight = true,
        tiredJumps = false,
        heavyJumps = false,
        exhaustedNoJump = true,
        -- Min: 1.00 Max: 1000.00 Default: 100.00
        airAccelerate = 100.0,
        -- Min: 1.00 Max: 30.00 Default: 10.00
        accelerate = 10.0,
        -- Min: 0.00 Max: 10.00 Default: 4.00
        friction = 4.0,
        -- Higher = more speed from air strafing Min: 33 Max: 128 Default: 66
        tickrate = 66,
        -- Speed limit 0 = no limit Min: 0.00 Max: 60.00 Default: 0.00
        maxSpeed = 0.0,
        -- Tiles per second 0 = no limit Min: 0.00 Max: 200.00 Default: 60.00
        mpSpeedLimit = 60.0,
    },
    BackpackZippers = {
        -- Controls how likely an open backpack is to drop small items. All options still respect the minimum fill level, cooldown, and small-item-only rules. Default = Normal
        -- 1 = Very low
        -- 2 = Normal
        -- 3 = Sensitive
        -- 4 = Very sensitive
        DropChanceProfile = 2,
    },
    Sewars = {
        -- How many zombies are down there when a stretch of tunnel is first opened up. Shelters that were someone's last stand keep their occupants whatever this is set to. Default = Some
        -- 1 = None
        -- 2 = Few
        -- 3 = Some
        -- 4 = Many
        Zombies = 3,
        -- How much is in a shelter's or hideout's crates and shelves when you first find them. Journals and sewer plans are there whatever this is set to. Only places not yet found are affected. Default = Normal
        -- 1 = None
        -- 2 = Scarce
        -- 3 = Normal
        -- 4 = Plenty
        Loot = 3,
        -- Mostly ordinary: sewer workers, drifters and townsfolk; hardly any carry a bag. Mixed: some came down with a pack. Survivors: many did, and their bags are full (the mod's balance before 0.3.2). Only tunnels not yet opened up are affected. Default = Mixed
        -- 1 = Mostly ordinary
        -- 2 = Mixed
        -- 3 = Survivors
        Outfits = 2,
        -- How many of the game's own rats are down there when a stretch of tunnel is first opened up. They can be trapped, and eaten if you are hungry enough. The rodents of unusual size in the nest under Louisville are there whatever this is set to. Default = Some
        -- 1 = None
        -- 2 = Few
        -- 3 = Some
        -- 4 = Swarming
        Rats = 3,
        -- Some narrow culverts, well away from the ladders, hold foul air behind the county's warning placards. Breathe it without a gas mask or respirator and you get sick. Mild: queasy at worst. Harmful: sick, and it costs health while you stay. Deadly: stay and it kills. A mask with a filter keeps it out, and uses the filter up. Default = Harmful
        -- 1 = Off
        -- 2 = Mild
        -- 3 = Harmful
        -- 4 = Deadly
        Gas = 3,
        -- Whether players can widen the sewers. With a pickaxe or a sledgehammer, a square of rock can be dug out or a tunnel wall knocked through. With explosives, a bomb that goes off below ground opens the rock round it. Default = Picks, hammers and explosives
        -- 1 = Off
        -- 2 = Picks and hammers
        -- 3 = Picks, hammers and explosives
        Digging = 3,
        -- Whether zombies on one side of the street's surface come to a player on the other. No: footsteps, digging and gunfire in the sewer draw nobody on the street, a player on the street draws nobody in the sewer, and a zombie that was chasing you gives up when you climb down or out; the dead on your own level hear and see you as well as ever. Yes: the game's own rule, where a floor stops no sound, and running under a street brings its dead to stand over you. Default = No
        -- 1 = No
        -- 2 = Yes
        StreetHears = 1,
        -- The EXIT stencils and arrows painted on the tunnel walls near the ladders. None: find your own way out (the sewer map still shows every ladder you have used). Few: about one in three. By every ladder: all of them. Only tunnels not yet opened up are affected. Default = By every ladder
        -- 1 = None
        -- 2 = Few
        -- 3 = By every ladder
        ExitSigns = 3,
        -- For servers that want to decide where their sewers begin. Open: anybody can climb down any manhole cover, trapdoor or storm-drain grate that leads to the sewers. Closed: nobody can, until an admin opens one (right-click it as an admin). Either way an admin can open or close any one of them, admins themselves can always climb down, and a ladder always takes a player back up. In single player there is no admin: leave this on Open. Default = Open
        -- 1 = Open
        -- 2 = Closed until an admin opens them
        Access = 1,
        -- Some garages, kitchens and storerooms have a trapdoor in the floor, and a ladder down to the sewer under the street. No: none is put into a house nobody has been near yet, for servers where a player's house should have no back door. Trapdoors already there stay. Default = Yes
        -- 1 = Yes
        -- 2 = No
        Hatches = 1,
        -- The iron grates in the banks of the river, the creeks and the lakes: ways into the sewers away from the streets. No: none is put into a bank nobody has been near yet. Grates already there stay. Default = Yes
        -- 1 = Yes
        -- 2 = No
        Outfalls = 1,
        -- The iron grates at the kerbs of the game's own streets. Yes: one near a tunnel is a narrow way down into the sewers. No: they are bolted down, and nobody but an admin goes down one. A ladder under one always takes a player back up. Takes effect at once. Default = Yes
        -- 1 = Yes
        -- 2 = No
        Drains = 1,
        -- A kerb drain is narrower than a manhole. Anybody: no limit. Not the overweight or overloaded: nobody whose character has the High Weight or Very High Weight trait goes down one, and nobody carrying more than they can carry (the Weighed Down moodle) goes down or comes up one. Only the slim and lightly loaded: the same, and nobody carrying more than half of what they can carry. Manhole covers, trapdoors and outfalls are never limited. Takes effect at once. Default = Not the overweight or overloaded
        -- 1 = Anybody
        -- 2 = Not the overweight or overloaded
        -- 3 = Only the slim and lightly loaded
        DrainFit = 2,
        -- Under Louisville a false wall of loose bricks hides the nest of the rodents of unusual size, and their hoard. Open: whoever finds the wall can pull it down. Sealed: the bricks do not come away, for a server keeping the nest for later. A wall already pulled down stays down. Default = Open
        -- 1 = Open
        -- 2 = Sealed
        Nest = 1,
        -- How much of a beating each of the rodents in the nest takes. Weak: two blows of any weapon, or one bullet. Normal: three blows, or two bullets. Tough: six blows, or four bullets. Monstrous: twelve blows, or eight bullets. A shove throws one back whatever this is set to. Default = Normal
        -- 1 = Weak
        -- 2 = Normal
        -- 3 = Tough
        -- 4 = Monstrous
        Rous = 2,
        -- How many of the cult's dead are in their temple under the fields. They are put down the first time each part of it is walked into, so parts already found are not affected. Default = All
        -- 1 = None
        -- 2 = A few
        -- 3 = Half
        -- 4 = All
        CultDead = 4,
        -- The brick labyrinth under the deep woods west of Muldraugh. No: its trapdoor and the hut over its way out are not put in, so nobody finds a way down, and its annotated map is not handed out. If they are already there, they stay. Default = Yes
        -- 1 = Yes
        -- 2 = No
        Labyrinth = 1,
        -- How many of those who went in before are still walking its corridors: about a thousand when set to All. Fewer is kinder to a busy server. Only corridors nobody has walked yet are affected. Default = All
        -- 1 = None
        -- 2 = A few
        -- 3 = Half
        -- 4 = All
        MazeDead = 4,
        -- When an admin puts a way down on a street, a passage is dug from its foot to the nearest tunnel. This is how far away that tunnel may be. Default = 40 squares
        -- 1 = 20 squares
        -- 2 = 40 squares
        -- 3 = 80 squares
        Passage = 2,
        -- Only for when another mod has something in the same ground. This is the square of the labyrinth's trapdoor, counted east; the next setting is the same square counted south. The whole labyrinth, 256 squares a side, lies south-east of it and moves with it, in steps of 8 squares. Choose empty ground far from every town, and set it before the world is made: what is already built stays where it is. Min: 0 Max: 100000 Default: 8922
        MazeX = 8922,
        -- See the setting above. The mod's own place is 8922 east, 10322 south. Min: 0 Max: 100000 Default: 10322
        MazeY = 10322,
    },
    SVRPChat = {
        EnablePM = true,
        EnableOOC = true,
        EnableAll = true,
        EnablePrivate = true,
        EnableBuffs = true,
        -- Min: 0 Max: 200 Default: 2
        RangeXYWhisper = 2,
        -- Min: 0 Max: 7 Default: 0
        RangeZWhisper = 0,
        -- Min: 0 Max: 200 Default: 6
        RangeXYLow = 6,
        -- Min: 0 Max: 7 Default: 0
        RangeZLow = 0,
        -- Min: 0 Max: 200 Default: 20
        RangeXYSay = 20,
        -- Min: 0 Max: 7 Default: 2
        RangeZSay = 2,
        -- Min: 0 Max: 200 Default: 45
        RangeXYLoud = 45,
        -- Min: 0 Max: 7 Default: 4
        RangeZLoud = 4,
        -- Min: 0 Max: 200 Default: 80
        RangeXYShout = 80,
        -- Min: 0 Max: 7 Default: 7
        RangeZShout = 7,
        EnableHardOfHearing = false,
        EnableDeaf = false,
        AllowPlayerCoords = true,
        EnableModCharacter = true,
        EnableSelfInjury = true,
        EnableAutoCleanup = true,
        EnableBioShortDescription = true,
        EnableVoiceChatter = true,
        -- Min: 0 Max: 100 Default: 0
        RadioStaticFactor = 0,
        NameplateRequireLOS = true,
        -- Min: 0 Max: 100 Default: 25
        NameplateDarkLight = 25,
        -- Min: 0 Max: 100 Default: 65
        NameplateFullLight = 65,
    },
    AdminOptions = {
        Divider0 = false,
        -- If enabled players will not see administrators in ESC/Players (requires client reconnect)
        HideAdminsInScoreboard = false,
        -- If enabled players cannot use the VOIP exploit to detect nearby players
        HideVOIPMuteButton = false,
        -- Allows you to quickly kill yourself by pressing the L key
        EnableSuicideCommand = true,
        -- Enable or disable the message when a player joins the server
        ShowJoinMessage = true,
        -- Enable or disable the message when a player leaves the server
        ShowLeaveMessage = true,
        -- If enabled no message will be shown when an administrator joins
        HideAdminJoin = false,
        -- If enabled no message will be shown when an administrator leaves
        HideAdminLeave = false,
        -- If enabled the vanilla HUD is hidden and shows server name max players and user ping
        ShowCustomServerInfo = true,
        -- If enabled you can dismantle vehicles by only removing the battery
        EnableWreckDisassemble = true,
        -- If enabled detects intruders entering safehouses with vehicles and creates anti grief logs
        BlockSafehouseVehicles = false,
        -- If enabled ropes cannot be placed anywhere on the server
        Rope = true,
        -- If enabled players cannot build on water or on upper invalid floors
        BlockBuildOnWater = true,
        -- You must go to the admin panel ZONE NO SAFE HOUSE. There you can open the editor and create zones where players cannot claim safehouses. (This option does not block via sandbox; a UI was created to manage it from the editor.)
        NoSafehouseZonesEnabled = true,
        -- Adds 2 buttons to remove tiles or trees (this option does not block sandbox, it is informational)
        Item = true,
        -- Adds a health bar to the screen (client reconnection required). Press the O key to hide it. To switch between vertical/horizontal, right-click the bar once, then adjust the borders to your preference.
        VisualHealthBar = true,
        -- Enables or disables the vehicle claiming system in the world.
        ClaimVehicleEnable = true,
        -- If enabled, creates a REMOVE button and allows a player or admin to unclaim a claimed vehicle.
        UnClaimVehicle = true,
        -- If enabled, players can only claim a vehicle using the Base.ClaimVehicle key.
        ClaimVehicleItem = false,
        -- Defines the maximum number of vehicles a player can claim at the same time. Min: 1 Max: 4 Default: 1
        MaxClaimsPerPlayer = 1,
        -- This option is informational only; the rendering is always applied to the protection/clothing panel.
        ShowBulletProtection = true,
        -- If enabled, players will be able to carry more items in their inventory (this only applies when a new player is created)
        MoreCarryWeightEnable = true,
        -- If enabled, you will be able to spawn normal and burned vehicles from the context menu within a 100-tile radius and up to 10 vehicles per spawn (normal vehicles only in parking areas and burned vehicles only on roads)
        CarRespawnEnable = true,
    },
    RespawnVehicle = {
        -- If enabled, players will be able to respawn vehicles using the Base.RespawnVehicle item
        Enable = true,
        -- If enabled, spawned vehicles will include a key
        SpawnWithKey = false,
        -- If enabled, vehicles will spawn with around 50/60% overall condition.
        RandomCondition = false,
    },
    DetectPlayerNames = {
        -- Adds green markers and player names for players you want to be visible to everyone on the map
        User = "admin",
        -- Everyone will only see the marker/render without player names
        RenderMode = true,
        -- Prevents players from viewing the death camera after death, reducing position scouting and information leaks.
        BlackoutDeath = false,
    },
    VacMod20 = {
        -- Capacity of Tailoring Level 2 Min: 2 Max: 100 Default: 2
        MinCapacity = 2,
        -- Capacity of Tailoring Level 10 Min: 10 Max: 1000 Default: 10
        MaxCapacity = 10,
    },
    FastForward = {
        AllowForce = true,
        ForceAdminOnly = true,
    },
    AfterTheBeep = {
        -- How often a phone near you rings in the first days. A ringing phone draws zombies until you answer it or it stops. Default = Sometimes
        -- 1 = Never
        -- 2 = Rarely
        -- 3 = Sometimes
        -- 4 = Often
        IncomingCalls = 3,
        -- In squares. 10 is about a television; a ringing alarm clock is 15. 0: zombies do not hear phones at all. Min: 0 Max: 80 Default: 10
        RingRadius = 10,
        -- Phones can still ring for this many days after the power grid goes off. Min: 0 Max: 60 Default: 3
        LinesOutlastPower = 3,
        -- On: a machine only plays, and only takes calls, where there is electricity (the grid or a generator). Off: machines always work.
        MachinesNeedPower = true,
    },
    ViewpointSizeMatters = {
        FunMode = false,
        -- Min: 0 Max: 2147483646 Default: 155
        ZombieMinHeight = 155,
        -- Min: 0 Max: 2147483646 Default: 195
        ZombieMaxHeight = 195,
        -- Min: 0 Max: 2147483646 Default: 145
        CharacterMinHeight = 145,
        -- Min: 0 Max: 2147483646 Default: 220
        CharacterMaxHeight = 220,
        -- Min: -100 Max: 100 Default: -100
        ZombieMinBodyShape = -100,
        -- Min: -100 Max: 100 Default: 100
        ZombieMaxBodyShape = 100,
        -- Min: 0 Max: 100 Default: 0
        ZombieMinMuscular = 0,
        -- Min: 0 Max: 100 Default: 100
        ZombieMaxMuscular = 100,
        -- Min: -100 Max: 100 Default: -100
        CharacterMinBodyShape = -100,
        -- Min: -100 Max: 100 Default: 100
        CharacterMaxBodyShape = 100,
        -- Min: 0 Max: 100 Default: 0
        CharacterMinMuscular = 0,
        -- Min: 0 Max: 100 Default: 100
        CharacterMaxMuscular = 100,
        BodyShapeFromWeight = false,
        MuscleFromStrength = false,
        ZombieBodyByProfession = false,
        ZombieTombBodies = false,
        -- Min: 0 Max: 2147483646 Default: 145
        NPCMinHeight = 145,
        -- Min: 0 Max: 2147483646 Default: 220
        NPCMaxHeight = 220,
        -- Min: -100 Max: 100 Default: -100
        NPCMinBodyShape = -100,
        -- Min: -100 Max: 100 Default: 100
        NPCMaxBodyShape = 100,
        -- Min: 0 Max: 100 Default: 0
        NPCMinMuscular = 0,
        -- Min: 0 Max: 100 Default: 100
        NPCMaxMuscular = 100,
    },
    ViewpointTactical = {
        -- Master switch for this world/server. All clients need the mod.
        Enabled = true,
        -- Off restores classic controls. F9 can still select classic locally when allowed.
        TacticalControls = true,
        -- Multiplayer always uses native network movement.
        Inertia = true,
        -- Custom vertical movement is disabled in multiplayer.
        Jump = true,
        -- Custom crawling is disabled in multiplayer; native crouching remains.
        Prone = true,
        -- Allow Q/E camera leaning with wall checks.
        Lean = true,
        -- Sustained aiming increases weapon sway.
        ArmStamina = true,
        -- Local visual marks only; not synchronized or saved in multiplayer.
        BulletMarks = true,
        -- 0-3; 1 keeps the current tuning. Min: 0.00 Max: 3.00 Default: 1.00
        AimDrain = 1.0,
        -- Allow bullets to damage supported props and doors in single player. Damage persists in saves. Always disabled in multiplayer.
        EnvironmentDamage = true,
    },
    ViewpointOfMarz = {
        -- Guns of Marz holds pistols, revolvers, the MP5K, TEC-9 and MAC-10 like vanilla handguns, but their muzzle attachment uses the rifle axis. Viewpoint and pz3d aim and place the muzzle flash along that axis. This turns those muzzles to the vanilla handgun axis (-90, 0, 0). Rifles, shotguns and two-handed SMGs are left alone. Restart the session after changing this.
        CorrectHandgunMuzzle = true,
        -- Adds grip and support attachments on Guns of Marz firearm models that do not already have them. Viewpoint and PZVR can use these as hand points. Existing Guns of Marz attachments are not moved. Restart the session after changing this.
        AddGripPoints = true,
        -- Adds the vanilla handgun Bip01_Prop2 attachment to one-handed Guns of Marz guns that lack it, using the vanilla handgun offset. Restart the session after changing this.
        AddPistolProp = true,
    },
    VTB = {
        -- Firearms fire simulated projectiles (travel time, drop, walls) instead of vanilla's instant hits while Viewpoint first/third person aiming is active.
        Enabled = true,
        -- Also use projectiles when Viewpoint is off, aimed along vanilla's aim direction. Off = vanilla firearm combat in the isometric view.
        UseInIsoView = false,
        -- Multiplies every muzzle velocity. Real velocities (1.0) make drop almost invisible at Project Zomboid distances; 0.4 gives noticeable travel time and drop at long range. Min: 0.05 Max: 3.00 Default: 0.40
        VelocityScale = 0.4,
        -- Multiplies 9.81 m/s2 gravity acting on rounds in flight. Min: 0.00 Max: 10.00 Default: 1.00
        GravityScale = 1.0,
        -- Multiplies air drag. Higher values make rounds lose speed (and damage) faster. Min: 0.00 Max: 10.00 Default: 1.00
        DragScale = 1.0,
        -- How much remaining energy matters: 0 = full vanilla damage at any range, 1 = damage scales with kinetic energy left. Min: 0.00 Max: 1.00 Default: 0.50
        DamageFalloff = 0.5,
        -- Rounds are removed after this many seconds of flight. Min: 0.20 Max: 20.00 Default: 3.00
        ProjectileLifetime = 3.0,
        -- Rounds fly up to the weapon's MaxRange times this. In multiplayer this needs the True Ballistics jar on the server, otherwise hits stay inside vanilla range. Min: 1.00 Max: 20.00 Default: 3.00
        MaxDistanceMultiplier = 3.0,
        -- Absolute limit for any round, in metres (tiles). Min: 10.00 Max: 1000.00 Default: 200.00
        MaxDistanceCap = 200.0,
        -- Distance at which rounds cross the reticle again. 0 = the bore points straight at the reticle, so rounds always land a little low. Scope mods can override this per sight. Min: 0.00 Max: 1000.00 Default: 0.00
        ZeroDistance = 0.0,
        -- Multiplies the dispersion that comes from weapon accuracy, Aiming skill, movement, moodles and weapon condition. Min: 0.00 Max: 10.00 Default: 1.00
        SpreadScale = 1.0,
        -- Rifle rounds with enough energy can pass through a body and hit what is behind it.
        Penetration = true,
        -- The body part the round physically hit is used for vanilla's head/torso/limb damage, and a shot player is wounded on exactly that part (hands and feet included). Off = vanilla's random body part.
        HitLocations = true,
        -- Solid furniture and counters stop rounds (tall solid objects up to 1.9 m, counters/tables up to 0.9 m).
        FurnitureCollision = true,
        -- Multiplayer: the server rejects firearm hits that had no line of fire or impossible damage. Needs the True Ballistics jar on the server.
        ServerValidation = true,
    },
    ProperRoofs = {
        -- For servers (and single player, where it counts when set to anything but Enable). Enable: adds the missing roof pieces once per area (not where players have built on or against a roof). Disable: the mod leaves the world alone. Remove and replace: each area, the first time it loads after a server start, is cleared of the mod's pieces and gets the current ones again (set it back to Enable afterwards). Remove: every area that loads is cleared of the mod's pieces and gets back the map tiles the mod had taken out - use it before removing the mod from a server, and have players walk or drive through the places they've been. Default = Enable
        -- 1 = Enable
        -- 2 = Disable
        -- 3 = Remove and replace
        -- 4 = Remove
        Mode = 1,
    },
    VPP = {
        -- A lamp, a computer, a potted plant, a garden gnome or a cheap plastic chair that hits something hard enough (thrown by a car or an explosion, falling from height) breaks and is gone. Glass leaves broken glass on the floor.
        PropsBreak = true,
        -- A prop hitting the ground or a wall makes a noise zombies hear. A tipped cone is heard close by, a vending machine going over down the street.
        ImpactNoise = true,
        -- Pipe bombs, grenades and other mods' explosions throw props and loose items around them. Walls, doors, windows and fences shield what is behind them.
        Explosions = true,
    },
    ViewpointTV = {
        -- TVs, radios and cinema projectors need power to play links: the grid, a generator, or batteries for a device that takes them. A car radio runs off the car's battery.
        RequireElectricity = true,
        -- Anything playing makes noise zombies can hear. It carries further the louder the device and the bigger its Sound Range. Radios carry about two thirds as far as TVs.
        AttractZombies = true,
        -- Staying near something playing, on the same floor and with the volume up, slowly lowers boredom and unhappiness. Within 12 tiles of a TV or radio, or anywhere in a cinema's seats.
        ReduceBoredom = false,
        -- The game's background music fades out while you can hear a TV, radio or cinema playing a link, and comes back a few seconds after it stops, is paused or you walk out of earshot. Your Music volume option isn't changed.
        MuteGameMusic = true,
        -- Watching about 3 minutes of a video whose title names a skill (carpentry, cooking, welding, sewing, fishing...) boosts this character's XP in that skill for a while, like a skill book. Crafts and survival skills only. The title is read on each player's PC, so a modified client could name any of those skills.
        SkillVideoXP = false,
        -- Extra XP in the video's skill while its boost lasts, in percent of the XP gained (10 to 200). It adds to skill books and traits. Min: 10 Max: 200 Default: 50
        SkillVideoXPBoost = 50,
        -- How long a skill video's boost lasts, in in-game hours (1 to 168). Watching another video for the same skill starts it again. Min: 1 Max: 168 Default: 24
        SkillVideoXPHours = 24,
        -- How far a TV is heard, in tiles, until someone allowed to change it sets its own Range in TV Settings. Radios always use this one, and carry about two thirds as far as a TV. Cinemas have their own ranges. Min: 4 Max: 54 Default: 14
        MaxSoundRadius = 20,
        -- Players who aren't admins can play, pause, queue and change links on TVs and radios in multiplayer. Everyone can always watch and listen.
        AllowNonAdmins = true,
        -- Players who aren't admins can control cinema projectors too. Turn it off to keep the big screens for admins while everyone keeps their TVs. Only matters while Allow Non-Admins is on.
        CinemasForNonAdmins = true,
        -- Any player near a TV can change its Screen Size for everyone, even without permission to change what plays. Turn it off to leave Screen Size to the players who can control the TV.
        OpenScreenSize = true,
        -- Radios, car radios and walkie-talkies get an Audio Link channel. Turned off, only TVs and cinema projectors play links, and anything a radio is playing stops.
        AllowRadios = true,
        -- A pasted YouTube playlist can add all its videos to the queue at once. Turned off, a link from inside a playlist plays just that video.
        AllowPlaylists = true,
        -- Players can play video and audio files from their own Zomboid/ViewpointTV/videos folder. Nothing is uploaded: each player's game plays its own copy, so only players with the same file see and hear it, and the others see Not on this PC.
        AllowLocalVideos = true,
        -- The most videos or songs one TV or radio can have queued, 10 to 200, which is also the most a playlist adds. Every change to a queue is sent to every player, so a long queue costs a little more network and save space. Min: 10 Max: 200 Default: 50
        MaxQueueSize = 50,
        -- Playing or queueing a movie from a Movies & Shows add-on needs its VHS tape in your inventory or a container near the TV.
        RequireVHSForMS = false,
        -- A cinema's own projector can't be picked up, turned, taken apart or destroyed, so its screen always has a picture. Projectors anywhere else work as normal either way.
        ProtectCinemaProjectors = true,
        -- Takes out the ceiling over the two auditoriums of the March Ridge cinema, so their screens show whole in first and third person. Ceilings already taken out stay out.
        OpenCinemaCeilings = true,
        -- Sites players may play links from, separated by semicolons. Each also covers its subdomains. Every player near a TV downloads its link, so the site sees their IP address and their game opens the file. * allows any site. Empty uses the default list.
        AllowedHosts = "youtube.com;youtu.be;youtube-nocookie.com;twitch.tv;vimeo.com;soundcloud.com;dailymotion.com;dai.ly;bilibili.com;bilibili.tv;nicovideo.jp;nico.ms;tiktok.com;instagram.com;facebook.com;x.com;twitter.com;reddit.com;redd.it;bandcamp.com;streamable.com;kick.com;rumble.com;archive.org",
        -- Largest single video or song a player's game will download, in MB (256 to 16384). Everyone near a TV downloads its link, so this stops one huge file from filling their disks. Videos download at up to 480p, roughly 300 to 500 MB per hour; sites without a 480p version can be 2 GB per hour or more. Min: 256 Max: 16384 Default: 4096
        MaxDownloadSizeMB = 4096,
    },
    AviationCore = {
        -- Min: 0 Max: 50 Default: 5
        MaxWorldHelicopters = 5,
    },
    StingerAA = {
        -- At 1.0: new military crates roll a launcher with one or two sealed boxes at 0.1 percent and a five-box supply crate at 0.001 percent. Military lockers roll only one assembled loaded Stinger at 0.1 percent. Military zombies roll one assembled loaded Stinger on death at 0.01 percent. 0 disables all drops. Quantities do not change. Min: 0.00 Max: 100.00 Default: 1.00
        LootMultiplier = 1.0,
        -- Default includes dedicated military crates and lockers outdoors or in modded bases. Lockers contain only one assembled loaded Stinger. Ordinary metal shelves, gun stores and army-surplus stores are excluded. Military-zombie drops are independent of this room coverage. Default = Military containers, including outdoors
        -- 1 = Listed military rooms only
        -- 2 = Military containers, including outdoors
        LootCoverage = 2,
        -- Exact room IDs separated by semicolons or commas, for example armystorage;my_military_armory. Applies to room-only coverage. Ordinary metal shelves remain excluded. Maximum 32 IDs and 1024 characters.
        MilitaryLootRooms = "armystorage",
        -- Exact container types separated by semicolons or commas. Default: militarycrate;militarylocker. Allowlisted types ending in locker or cabinet roll only an assembled Stinger. metal_shelves remains excluded even if listed.
        MilitaryLootContainers = "militarycrate;militarylocker",
        -- Server interception target, crash model and wreck type, selected once per event. Missing optional aircraft mods fall back to the Huey. Normal-flight appearance follows Visible Helicopter Event settings. Does not change player-owned aircraft. Default = UH-1 Huey
        -- 1 = UH-1 Huey
        -- 2 = Nightfang
        -- 3 = Little Bird
        -- 4 = Chinook
        -- 5 = Black Hawk
        -- 6 = AH-1 Super Cobra
        -- 7 = UH-1 Huey (Kafeena)
        EventAircraft = 1,
        -- Server target and initial crash altitude. Range: 60-300 m; default: 120 m. Fixed for that event. Normal-flight display altitude follows Visible Helicopter Event settings. Min: 60.00 Max: 300.00 Default: 120.00
        EventAltitude = 120.0,
        -- Controls draws from existing press and military loot pools. Before day 15: press equipment with occasional military cargo. From day 15: military cargo. Impact damage destroys some items; survivors follow the impact direction. Zero disables new crash cargo. Min: 0.00 Max: 5.00 Default: 1.00
        CrashLootMultiplier = 1.0,
        -- Disabled by default. When enabled, each newly spawned crash crew corpse has a 25% chance to reanimate. Timing follows the world Zombie Lore setting. Decapitated crew cannot reanimate.
        CrewReanimation = false,
    },
    CannabisPlus = {
        -- 1x targets approximately 20 game days to harvest for Schedule 1 crops at normal vanilla farming speed. Weather, care, native timing variation and farming speed can change this. Ordinary crop timers are not replaced. Min: 0.25 Max: 20.00 Default: 1.00
        GrowSpeed = 1.0,
        -- Default: 48 game hours on a drying rack. Time away from the rack is paused. The previous 168-hour default is migrated without resetting accumulated drying time. Min: 1 Max: 336 Default: 48
        DryingHoursV2 = 48,
        -- Carry pruning shears or scissors in your main inventory. One bonus per harvest, no stacking. Min: 0 Max: 100 Default: 25
        HarvestToolBonus = 25,
        -- Default 2. Circular coverage, same floor and room, blocked by walls. Min: 1 Max: 4 Default: 2
        LampRadius = 2,
        -- Standalone grow-lamp warmth boost in degrees C. The enclosed powered tent has its own 22 C minimum bed thermostat. Min: 0 Max: 15 Default: 8
        LampWarmth = 8,
        -- When enabled, indoor Schedule 1 crops and all crops in grow tents pause without powered grow-light coverage and slowly lose health. Uncovered outdoor crops use daylight.
        IndoorNeedsLamp = true,
        -- 0 disables new Schedule 1 loot, 0.5 is rarer, 1 is default and 2 is more common. Only affects newly rolled loot; vanilla rarity still applies. Does not remove existing items. Min: 0.00 Max: 5.00 Default: 1.00
        LootMultiplier = 1.0,
        -- Suppresses equipment highlights and model/light debug geometry. Does not disable picking, collisions or normal lighting.
        HideModelDebugRings = true,
        -- Colour and slow edge movement while high: warm cannabis, cool stimulant, purple combined high, dark comedown. Draws below menus without changing blur or weather. Stops immediately when sober.
        HighVisuals = true,
        -- +1 Carpentry, Fishing and Cooking while high. Reverts when sober; legitimately earned XP is retained.
        HighSkillBonus = true,
        -- 0 disables screen effects; 1 is normal; 2 is stronger. The high status icon and gameplay effects remain available. Min: 0.00 Max: 2.00 Default: 1.00
        HighVisualIntensity = 1.0,
        -- Pauses dried flower and ground blend aging inside zipper bags, sealed evidence bags and vacuum-sealed pounds. Removing it resumes aging. Does not restore lost freshness, preserve wet harvest, or change ordinary food. Disabled: zipper storage doubles remaining life; vacuum seals quadruple it.
        SealedCannabisNeverSpoils = false,
        -- Scales sealed cocaine finds only. Also multiplied by the main loot setting. Zero disables new cocaine loot. Min: 0.00 Max: 5.00 Default: 1.00
        StimulantLootMultiplier = 1.0,
        -- Repeated doses accumulate strain. Dangerous strain damages health. Disabling this keeps the high and comedown but removes overdose damage.
        StimulantOverdose = true,
    },
    TWGameplay = {
        -- Zombies hear less in heavy rain, blizzards and strong wind: footsteps, doors, fighting and gunshots carry a shorter distance. On top of the game's own small rain and fog effect.
        RainMasksNoise = true,
        -- 0 = no extra effect, 0.5 = a downpour cuts how far zombies hear by about a quarter, 1 = by about half (never below the minimum below). Min: 0.00 Max: 1.00 Default: 0.50
        NoiseMasking = 0.5,
        -- For a few seconds after a nearby thunder clap reaches you, zombies hear much less. Time your shot with the thunder.
        ThunderMasksNoise = true,
        -- Zombies always keep at least this fraction of their hearing distance, whatever the weather. Min: 0.20 Max: 1.00 Default: 0.55
        MinHearing = 0.55,
        -- Fog, downpours, heavy snow and white-outs shorten how far zombies can spot you, beyond the game's own limit.
        WeatherLimitsSight = true,
        -- 0 = no extra effect, 0.5 = thick fog roughly halves the spotting distance, 1 = stronger still (never below the minimum below). Min: 0.00 Max: 1.00 Default: 0.50
        SightReduction = 0.5,
        -- Zombies always keep at least this fraction of their spotting distance, whatever the weather. Min: 0.20 Max: 1.00 Default: 0.40
        MinSight = 0.4,
        -- The game's weather falls in places, not everywhere at once: storms several kilometres across drift over the map, fog lies in banks, showers pass by. Rain barrels fill, crops get watered, you get wet, fires go out and zombies react only where it is actually raining. Off: the game's map-wide weather. Forced weather (admin climate controls) is always map-wide.
        RegionalWeather = true,
        -- How big the storm areas, fog banks and showers are. 1 = several kilometres across (a few storms over the whole map); 2 = twice as large; 0.5 = half. Min: 0.40 Max: 2.50 Default: 1.00
        StormSize = 1.0,
        -- Lightning takes the tallest thing near where it comes down. Out in the open, with no tree or building near, that is you: a direct hit burns badly and knocks you down or kills you, a strike within 3 tiles burns and knocks you down, within 8 tiles the shock through the ground staggers you. Trees, buildings, roofs and vehicles protect you. Nobody is aimed at.
        LightningHitsPlayers = true,
        -- Chance that a direct lightning hit kills. 0 = always survivable (heavy burns), 0.3 = about one in three, 1 = always deadly. Min: 0.00 Max: 1.00 Default: 0.30
        LightningDeathChance = 0.3,
        -- How many extra ground strikes come down at random over a thunderstorm (the game's own are spread over kilometres). 1 = about one every 45 seconds within a few hundred metres of each player; 0 = only the game's own strikes. Min: 0.00 Max: 4.00 Default: 1.00
        LightningFrequency = 1.0,
        -- Now and then at night a fireball comes down somewhere within a kilometre of a player, seen across the whole map, and leaves a small smoking crater with a meteorite in it (iron: it can be smelted). Players hear its sonic boom a minute or more later.
        Meteorites = true,
        -- On average how many in-game days between meteorite falls (one at most per night). Min: 3.00 Max: 365.00 Default: 30.00
        MeteoriteDays = 30.0,
        -- Wading through deep snow (True Weathers & Lighting's raised snow) slows walking and running, more the deeper it lies. Outdoors at ground level, on foot; vehicles are unaffected.
        DeepSnowSlows = true,
        -- How much of your speed the deepest snow takes: 0.45 = a little under half, 0 = none, 0.85 = a crawl. Min: 0.00 Max: 0.85 Default: 0.45
        DeepSnowSlowdown = 0.45,
    },
    ActualDoorRattling = {
        Enabled = true,
        -- Min: 0.00 Max: 2.00 Default: 1.00
        Strength = 1.0,
        NativeMotion = true,
        GarageDoors = true,
    },
    BulkPallets = {
        -- Speeds up every inventory transfer (loot panel, drag and drop, Transfer All, picking up and dropping items) to about 5 items a second. Transfers that vanilla already does faster keep their vanilla speed. Off = vanilla speed.
        FastTransfers = false,
        -- How many times faster pouring, filling and emptying liquids is. 1 = vanilla speed. Min: 1 Max: 10 Default: 1
        FluidTransferSpeed = 1,
    },
    RRARGoatTest = {
        -- Add goats to sheep livestock locations and mixed farms. No goat wilderness spawns. Existing animals are retained.
        EnableSpawns = true,
        -- Allow kid groups when goats are selected for eligible farms. Does not remove existing kids or prevent births.
        KidsAtRanches = true,
        -- Relative selection weight for each enabled goat breed in sheep-compatible farm pools. Higher values make goats more common. Zero disables new goat ranch selections. Min: 0 Max: 10 Default: 1
        RanchWeight = 1,
        -- Allow this goat breed in future livestock selections at sheep-compatible and mixed farms. Existing animals, offspring, models and coats are retained. Restart the game/server after changing breed settings.
        EnableSaanen = true,
        -- Allow this goat breed in future livestock selections at sheep-compatible and mixed farms. Existing animals, offspring, models and coats are retained. Restart the game/server after changing breed settings.
        EnableLaMancha = true,
        -- Allow this goat breed in future livestock selections at sheep-compatible and mixed farms. Existing animals, offspring, models and coats are retained. Restart the game/server after changing breed settings.
        EnablePygmy = true,
        -- Allow this goat breed in future livestock selections at sheep-compatible and mixed farms. Existing animals, offspring, models and coats are retained. Restart the game/server after changing breed settings.
        EnableTennesseeFainting = true,
        -- Allow this goat breed in future livestock selections at sheep-compatible and mixed farms. Existing animals, offspring, models and coats are retained. Restart the game/server after changing breed settings.
        EnableNubian = true,
        -- Allow this goat breed in future livestock selections at sheep-compatible and mixed farms. Existing animals, offspring, models and coats are retained. Restart the game/server after changing breed settings.
        EnableSpanish = true,
    },
    AnimalRemaster = {
        -- Allow Animal Remaster to add new ducks to natural habitats. Does not remove existing ducks or change breeding.
        EnableDuckSpawns = true,
        -- Scale both domestic and Wood duck chances using the vanilla Animal Spawn Chance setting. The vanilla "Never" setting disables new ducks while this option is on. Duck density multipliers: Extremely Rare 5 percent, Rare 15 percent, Sometimes 35 percent, Often 60 percent, Very Often 85 percent, Always 100 percent. These are this mod's multipliers.
        RespectAnimalSpawnChance = true,
        -- Chance that an eligible domestic-duck habitat receives a pair, before the vanilla multiplier. Default 25 percent. Each habitat has a saved stable roll; repeated square loads do not retry the chance. Min: 0 Max: 100 Default: 25
        DomesticDuckChance = 25,
        -- Chance that an eligible 100 x 100 tile shoreline block receives a Wood Duck, Green-winged Teal, Blue-winged Teal, Gadwall or American Black Duck pair from one shared budget, before the vanilla multiplier. Default 10 percent. Each block has a saved stable roll. Min: 0 Max: 100 Default: 10
        WoodDuckChance = 10,
        -- Allow new natural duck spawns only when the resulting local total stays within this number, within 75 tiles. Counts adults, ducklings and player-bred ducks. Default 4; 0 disables natural duck spawning. Does not remove animals or limit births. Min: 0 Max: 20 Default: 4
        NearbyDuckLimit = 4,
        -- Adds geese only in chicken/turkey poultry habitat. Existing animals and births are unaffected.
        EnableGooseSpawns = true,
        -- Stable chance per eligible poultry habitat, before the existing vanilla animal-spawn multiplier. Zero disables new natural goose pairs. Min: 0 Max: 100 Default: 25
        GooseSpawnChance = 25,
        -- Counts all living geese, including young and captive birds within 75 tiles. Zero disables new natural spawns; never removes birds or limits births. Min: 0 Max: 20 Default: 4
        NearbyGooseLimit = 4,
        -- Adds peafowl only in chicken/turkey poultry habitat. Existing animals and births are unaffected.
        EnablePeafowlSpawns = true,
        -- Stable chance per eligible poultry habitat, before the existing vanilla animal-spawn multiplier. Zero disables new natural peafowl pairs. Min: 0 Max: 100 Default: 10
        PeafowlSpawnChance = 10,
        -- Counts all living peafowl, including young and captive birds within 75 tiles. Zero disables new natural spawns; never removes birds or limits births. Min: 0 Max: 20 Default: 4
        NearbyPeafowlLimit = 4,
        -- New, untracked natural wild deer and raccoons only. 10 = 0.1 percent; 100 = 1 percent. Zero disables this new coat roll. Saved/captive/offspring/explicit identities remain unchanged. If rare chances exceed 100 percent, the rare shares are normalized. Does not change named farm breeds or Pied peafowl. Default 10. Min: 0 Max: 10000 Default: 10
        AlbinoPer10000 = 10,
        -- New, untracked natural wild deer and raccoons only. 10 = 0.1 percent; 100 = 1 percent. Zero disables this new coat roll. Saved/captive/offspring/explicit identities remain unchanged. If rare chances exceed 100 percent, the rare shares are normalized. Does not change named farm breeds or Pied peafowl. Default 50. Min: 0 Max: 10000 Default: 50
        MelanisticPer10000 = 50,
        -- New, untracked natural wild deer and raccoons only. 10 = 0.1 percent; 100 = 1 percent. Zero disables this new coat roll. Saved/captive/offspring/explicit identities remain unchanged. If rare chances exceed 100 percent, the rare shares are normalized. Does not change named farm breeds or Pied peafowl. Default 100. Min: 0 Max: 10000 Default: 100
        PiebaldPer10000 = 100,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedDuckMallard = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedDuckBlueSwedish = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedDuckPekin = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedDuckKhakiCampbell = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedDuckCayuga = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedWildDuckWood = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedWildDuckGreenWingedTeal = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedWildDuckBlueWingedTeal = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedWildDuckGadwall = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedWildDuckAmericanBlackDuck = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedGooseEmbden = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedGooseToulouse = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedGoosePilgrim = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedGooseChinese = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedGooseAfrican = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPeafowlIndianBlue = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPeafowlWhite = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPeafowlPied = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPeafowlBlackShouldered = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPigDuroc = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPigOldSpots = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPigHampshire = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedPigBerkshire = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedCattleHereford = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedCattleShorthorn = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedCattleCharolais = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedSheepDorper = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedSheepShetland = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedSheepIcelandic = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedSheepJacob = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedChickenBuffOrpington = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedChickenPolish = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedChickenSilverLacedWyandotte = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedChickenBarredPlymouthRock = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedTurkeyBlueSlate = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedTurkeyBourbonRed = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedTurkeyRoyalPalm = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedRabbitDutch = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedRabbitEnglishSpot = true,
        -- Allow this breed in future natural spawn choices. Existing animals, births, saved items and breed definitions are retained. Fixed/forced-breed map zones may override this choice. Restart the game/server after changing breed settings. This does not unload assets.
        BreedRabbitHarlequin = true,
    },
    HoseDown = {
        -- On: play hose spray, sprinkler and reel sounds. Off: mute all three for this world, including every player on a multiplayer server. <LINE> Watering, cleaning, water use and hose animations still work. Players can also mute only their own sounds in Options > Mods > Hose. <LINE> Default: On.
        EnableAudio = true,
        -- Maximum hose length that can be pulled from a reel. Higher values let you carry the nozzle farther from the water source; hose routed around obstacles uses some of that length. <LINE> Default: 20 tiles. Range: 5 to 40 tiles. <LINE> A vanilla Rubber Hose is limited to 8 tiles, or this setting if it is lower. Min: 5 Max: 40 Default: 20
        Length = 20,
        -- How far water can reach from the nozzle while you hold it. Higher values let you spray farther without moving closer. <LINE> Default: 5 tiles. Range: 2 to 8 tiles. <LINE> This does not change sprinkler coverage: sprinklers always water a circular 3 tile radius, on the same floor, with walls blocking the water. Min: 2 Max: 8 Default: 5
        SprayRange = 5,
        -- Base water drawn from the source by each active handheld hose or sprinkler, per real-time minute. Higher values use up barrels faster and deliver more water each second; lower values conserve water. <LINE> Default: 8 litres per minute. Range: 1 to 20. <LINE> Spraying a fire uses 2.5 times this rate. No water is consumed while the hose or sprinkler is off. Min: 1 Max: 20 Default: 8
        LitresPerMinute = 8,
        -- Chance for a newly checked eligible house to receive an installed hose reel. A suitable water fixture, exterior wall and clear placement are required. <LINE> Default: 30 percent. Range: 0 to 100. Higher values make installed hoses more common. <LINE> 0 disables future natural installations; 100 attempts installation at every eligible house. Already checked houses are not rerolled and existing hoses are not removed. <LINE> This does not change Garden Hose or Garden Sprinkler loot in containers. Min: 0 Max: 100 Default: 30
        HouseChance = 30,
    },
    GrassierGrass = {
        -- On: each player may switch Grassier Grass off in Viewpoint's settings (Graphics > Grass). Off: the grass is always drawn for everyone, so no one can turn it off to see through it, as on PvP servers.
        AllowDisable = true,
        -- Players' grass quality is raised to at least this. Low lets everyone choose freely. Higher keeps the grass as thick for everyone, at a cost on weaker computers. Default = Low (no minimum)
        -- 1 = Low (no minimum)
        -- 2 = Medium
        -- 3 = High
        -- 4 = Ultra
        MinQuality = 1,
        -- Players' density setting is raised to at least this share of their quality's. 25 is no minimum. Min: 25 Max: 200 Default: 25
        MinDensity = 25,
        -- Players' draw distance setting is raised to at least this share of their quality's. 50 is no minimum. Min: 50 Max: 150 Default: 50
        MinDistance = 50,
        -- On: the far grass beyond the blades is drawn for everyone, so far fields can't be thinned out to spot players.
        RequireFarGrass = false,
        -- With a Minecraft shader pack on, players' grass density is raised to at least this share. 10 is no minimum. Min: 10 Max: 100 Default: 10
        MinShaderPackDensity = 10,
        -- On: lawns start short and grow over the days, to about twice as tall, and mown grass grows back at that pace. Off: the grass stays one height, and mown grass grows back over the days set below.
        Growth = true,
        -- In-game days, counted from the outbreak, until lawns reach their full height; also how long mown grass takes to grow back. Min: 1 Max: 365 Default: 14
        GrowthDays = 14,
        -- Players' grass height is raised to at least this. 50 is no minimum. Stops players shortening the grass to see over it. Min: 50 Max: 200 Default: 50
        MinHeight = 50,
        -- Players' height variation is raised to at least this. 0 is no minimum. Stops players flattening the tall patches to see through them. Min: 0 Max: 100 Default: 0
        MinVariation = 0,
    },
    VPBinoculars = {
        -- Default = Normal
        -- 1 = Rare
        -- 2 = Normal
        -- 3 = Common
        LootFrequency = 2,
        MilitaryEnabled = true,
        HoldToLook = false,
        AllowUnaidedZoom = false,
        -- Min: 0.05 Max: 5.00 Default: 0.70
        TouristWeight = 0.7,
        -- Min: 0.05 Max: 5.00 Default: 1.10
        MilitaryWeight = 1.1,
    },
    RollingHillsPhysics = {
        Enabled = true,
        Strength = 2,
        CrestJumps = true,
        -- Min: 50 Max: 120 Default: 70
        MinimumJumpSpeed = 70,
        -- Min: 4 Max: 40 Default: 24
        TerrainIntensity = 24,
        -- Min: 600 Max: 2400 Default: 900
        TerrainWavelength = 900,
    },
    ALife = {
        Preset_ExplicitValues = true,
        -- How dangerous NPCs are. Easy: half damage, 80 health, raids from day 60. Only default-valued options change; density is separate. Reload for full effect.
        -- Default Easy (1). Default = Easy
        -- 1 = Easy
        -- 2 = Medium
        -- 3 = Hard
        -- 4 = Hardcore
        Preset_Difficulty = 1,
        -- The War Challenge: Biggest limits. Lots of NPCs alive at once. Needs a decent PC. Changes limits only, not chances or timing. High stays the normal choice.
        -- Default High (4). Default = High
        -- 1 = Very few
        -- 2 = Few
        -- 3 = Medium
        -- 4 = High
        -- 5 = Maximum (unsupported, may lag)
        -- 6 = The War Challenge
        Preset_World = 2,
        -- Lets your profession affect how NPCs treat you, including Creator rules. Off: profession has no attitude effect; faction and folder relations still apply.
        -- Default off.
        ProfessionAffectsAttitude = false,
        -- Adds extra activity for the first 3 game days and a National Guard checkpoint north of West Point. After 72 hours, road police, army and the checkpoint disappear.
        -- Default on.
        Realistic_Outbreak = true,
        -- Off prevents hostile factions, automatic raids and new outposts. Friendly, neutral and cautious survivors can still appear.
        -- Default on.
        World_HostileEnabled = true,
        -- Scales the chance of natural faction encounters. At 50, these checks have half their normal chance of bringing a group.
        -- Default 200. Min: 25 Max: 400 Default: 200
        Population_RatePercent = 110,
        -- Scales the number of NPCs in naturally appearing groups. At 100, groups keep their original sizes. Faction size limits still apply.
        -- Default 125. Min: 50 Max: 200 Default: 125
        Population_PartyPercent = 90,
        -- Sets how close saved NPCs must be to a player before they appear as physical characters. Larger distances keep more nearby NPCs active.
        -- Default 90. Min: 40 Max: 250 Default: 90
        World_SimRadius = 90,
        -- Stops new travelling crews at this living-NPC count, including peaceful survivors. It is not the county population; existing crews stay.
        -- Default 32. Min: 4 Max: 160 Default: 32
        Population_HostileCeiling = 9,
        -- Time to raise, aim and start firing, and to look for a new combat target. Default 75% shortens these delays by one quarter. 100% restores the previous timing. Lower is faster. Weapon fire rate, reload time and warnings keep their own timings. Min: 25 Max: 200 Default: 75
        Combat_ReactionDelayPercent = 75,
        -- Higher choices make NPC gunfire more accurate against players. Medium keeps their own aiming skill; zombie accuracy is separate.
        -- Default Medium (3). Default = Medium
        -- 1 = Very Easy
        -- 2 = Easy
        -- 3 = Medium
        -- 4 = Hard
        -- 5 = Very Hard
        -- 6 = Hardcore
        Combat_AimDifficulty = 2,
        -- Sets the chance of a group on each natural encounter check. Both the game-hour faction checks and game-minute encounter checks use it.
        -- Default 15. Min: 0 Max: 100 Default: 15
        Encounters_RollPercent = 8,
        -- Sets the time between natural faction encounter checks. A check can fail; this is not a guaranteed time between meetings.
        -- Default 3. Min: 1 Max: 24 Default: 3
        Encounters_GapHours = 12,
        -- Extra no-spawn distance around claimed multiplayer safehouses. At 8, new NPCs cannot spawn within eight extra tiles of the claim.
        -- Default 8. Min: 0 Max: 50 Default: 8
        World_SafehouseClearance = 8,
        -- Allows hostile NPC factions to fight each other.
        -- Default on.
        World_FactionWarfare = true,
        -- Allows wounded hostile NPCs to retreat from a fight.
        -- Default on.
        Behavior_Retreat = true,
        -- NPCs infected by zombie bites or attacks can rise in their own clothes. The game's Transmission, Mortality and Reanimate settings still apply.
        -- Default on.
        Behavior_NPCsReanimate = true,
        -- Infected NPC corpses wait before rising, giving you time to right-click and put them down. Off: they rise immediately. The wait advances only while the body is loaded.
        -- Default on.
        Turning_Enabled = true,
        -- Sets the shortest wait before an infected NPC corpse rises. For example, 30 means at least half a minute while the body is loaded.
        -- Default 20. Min: 0 Max: 600 Default: 20
        Turning_DelaySecondsMin = 20,
        -- Sets the longest wait before an infected NPC corpse rises. For example, 120 allows up to two minutes while the body is loaded.
        -- Default 90. Min: 0 Max: 600 Default: 90
        Turning_DelaySecondsMax = 90,
        -- Allows hostile looters to take nearby supplies.
        -- Default on.
        Behavior_Scavenge = true,
        -- Hostile NPCs may walk toward gunfire, shouts and other signs of activity they notice.
        -- Default on.
        Behavior_Investigate = true,
        -- Members that fall behind close back up on their group instead of drifting.
        Behavior_Regroup = true,
        -- Groups travel together in formation rather than as separate walkers.
        Behavior_MarchTogether = true,
        -- Outside combat, the last group member closes doors the group opened. Player-opened doors and occupied doorways stay untouched; no locks are changed.
        -- Default on.
        Behavior_CloseDoors = true,
        -- Allows eligible NPC guns and melee weapons to remain on their bodies for looting. The weapon drop chance still applies.
        -- Default on.
        Drops_WeaponsEnabled = true,
        -- Per NPC profile uses each NPC's own chance times the NPC loot percent. Another choice sets one chance for all weapons and ignores that percent; needs NPC weapon drops.
        -- Default Per NPC profile (1). Default = Per NPC profile
        -- 1 = Per NPC profile
        -- 2 = Off (0%)
        -- 3 = Very low (0-10%)
        -- 4 = Low (10-20%)
        -- 5 = Moderate (20-30%)
        -- 6 = High (30-50%)
        -- 7 = Very high (50-70%)
        -- 8 = Almost always (70-99%)
        -- 9 = Always (100%)
        Drops_WeaponChance = 1,
        -- Sets dropped weapon condition, not NPC combat strength. Per NPC profile keeps its rating and early-game wear curve; Broken needs repairs before use.
        -- Default Per NPC profile (1). Default = Per NPC profile
        -- 1 = Per NPC profile
        -- 2 = Broken (0/10)
        -- 3 = Scrap, a shot or two (1/10)
        -- 4 = Very poor, a few shots (2/10)
        -- 5 = Poor (3/10)
        -- 6 = Worn (4/10)
        -- 7 = Used, half gone (5/10)
        -- 8 = Serviceable (6/10)
        -- 9 = Good (7/10)
        -- 10 = Very good (8/10)
        -- 11 = Near new (9/10)
        -- 12 = Issue fresh (10/10)
        Drops_WeaponCondition = 1,
        -- Only military and special-response crews can drop rare armor, dirty and at 10-40 percent condition. 0 stops these drops. Sledgehammers and crafting components never drop.
        -- Default 5. Min: 0 Max: 100 Default: 5
        Loot_RareDropPercent = 5,
        -- On: Creator profiles keep their chosen rare gear. Off: custom sledgehammers, crafting heads and heavy armor are replaced with common gear at spawn.
        -- Default off.
        Loot_AllowRareFromProfiles = false,
        -- Restores the earlier factions, attitudes and spawn weights instead of the merged roster. Takes effect when the game or server starts.
        -- Default off.
        Factions_LegacyRoster = false,
        -- Changes factions, gear and aim as the world ages. Emergency services disappear by day 120; survivor and raider groups take over. Off uses fixed faction schedules.
        -- Default on.
        Funnel_Enabled = true,
        -- Moves faction progression ahead or back. At +30, a new world uses day-30 factions and gear; -10 delays progression by 10 days.
        -- Default 0. Min: -3650 Max: 3650 Default: 0
        Funnel_DayOffset = 0,
        -- Limits lone survivors and survivor pairs to this many NPCs, even if group-size settings would make their party larger.
        -- Default 2. Min: 1 Max: 2 Default: 2
        Funnel_LoneSurvivorMax = 2,
        -- How much NPC aim improves as the stages pass, in % of the built-in ramp (up to +3 aim rating in the last stage). 0% turns the ramp off, 100% is the default. Min: 0 Max: 200 Default: 100
        Funnel_SkillRampPercent = 100,
        -- Scales the ammo an NPC starts with; 100 keeps its profile amount. Each gun retains at least one full load. Infinite-ammo profiles are unchanged.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Ammo_SpawnPercent = 100,
        -- Caps starting and collected spare ammo in gun loads of at least 6 rounds. Smaller kits stay smaller; 2 permits two spare loads. 0 removes the cap; infinite-ammo profiles are unchanged.
        -- Default 2. Min: 0 Max: 20 Default: 2
        Ammo_ReserveLoads = 2,
        -- Chooses which NPC profiles may use infinite ammo. Creator profiles only limits it to profiles you made or edited; stock NPCs can run dry.
        -- Default Creator profiles only (1). Default = Creator profiles only
        -- 1 = Creator profiles only
        -- 2 = Every profile that asks
        -- 3 = Never
        Ammo_Bottomless = 1,
        -- On: dropped magazines use only ammo the NPC had left, up to its profile limit. Off: each issued magazine gets a drop roll and can be full even after its rounds were fired.
        -- Default on.
        Ammo_HonestDrops = true,
        -- Allows NPC firearms other than revolvers to jam: the gun clicks instead of firing, then the NPC racks it clear.
        -- Default on.
        Combat_EnableJamming = true,
        -- Base chance per trigger pull for a non-revolver NPC firearm to jam. Zero disables jams even if the feature is enabled. Min: 0.00 Max: 25.00 Default: 1.00
        Combat_JamChance = 1.0,
        -- How hard NPCs work a door, a window or a barricade when they break in. 100 is the tested default: a window takes three swings, a plank four, a plain door about half a minute, and only one man swings while the rest cover him. Lower it and they take longer; raise it and they come through faster. Min: 25.00 Max: 200.00 Default: 100.00
        Breach_Strength = 100.0,
        -- A two-handed swing by an NPC carries into a second zombie standing in the arc, at three quarters of the blow. Zombies only, never people. Off by default.
        Combat_MultiHit = false,
        -- A round an NPC puts into a zombie goes on into the zombie standing right behind it (up to three squares). Zombies only, never people; better against a horde. Off by default.
        Combat_BulletPenetration = false,
        -- Marks 10, 20 or 35 percent of suitable buildings once per world, up to the building limit. Residents appear when approached and are saved. Realistic outbreak does not turn it off.
        -- Default Uncommon (3). Default = Uncommon
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Uncommon
        -- 4 = Common
        Population_PopulateOnStart = 3,
        -- Limits buildings selected for starting residents across the whole map. Selection happens once per world; stations, firehouses and clinics take priority.
        -- Default 75. Min: 1 Max: 200 Default: 75
        Population_PopulateMax = 45,
        -- Adds small local groups, such as a family or rescue crew, when a new character starts in town. Reloading or rejoining does not add more.
        -- Default on.
        TownWelcome_Enabled = true,
        -- How many welcome groups each new character gets, and how many can be alive in one town at once, even when several players start there.
        -- Default 8. Min: 1 Max: 8 Default: 8
        TownWelcome_GroupsPerTown = 8,
        -- On allows a character's town welcome group only during their first game day. Off extends the window to their first game week.
        -- Default on.
        TownWelcome_FirstDayOnly = true,
        -- Sets the finite survivor pool when the world starts. Natural groups and reinforcements draw from it; deaths reduce it. Slow arrivals replace losses. Admin spawns do not count.
        -- Default 360. Min: 20 Max: 5000 Default: 360
        Census_Size = 120,
        -- Sets how many newcomers can replace dead survivors each game week early in the outbreak. If nobody has died, nobody arrives.
        -- Default 7.0. Min: 0.00 Max: 100.00 Default: 7.00
        Census_ArrivalsEarly = 7.0,
        -- Sets the replacement arrival rate after the early period. Arrivals gradually fall from the early rate to this one; they only replace losses.
        -- Default 1.0. Min: 0.00 Max: 100.00 Default: 1.00
        Census_ArrivalsLate = 1.0,
        -- Sets how long the weekly arrival rate takes to fall from the early value to the later value.
        -- Default 28. Min: 1 Max: 365 Default: 28
        Census_ArrivalsFadeDays = 28,
        -- Keeps a camp, outpost or inhabited building empty after all its residents die. Once this period ends, rare newcomers may settle there if resettlement is enabled.
        -- Default 30. Min: 1 Max: 365 Default: 30
        Census_ClearedDays = 30,
        -- Allows newcomers to settle cleared sites after their vacancy period, at most one site per four arrivals. Off keeps cleared sites empty for the rest of the game.
        -- Default on.
        Census_Resettle = true,
        -- NPCs walk to where a target was last seen and sweep the area before giving up.
        Search_Enabled = true,
        -- Shouting draws every NPC within earshot toward you.
        Search_ShoutResponse = true,
        -- An NPC that spots something tells its group where, once. Not a live feed.
        Search_GroupCallout = true,
        -- When not fighting, NPCs search areas with signs that survivors are nearby, such as barricades or a running generator.
        -- Default on.
        Clues_Enabled = true,
        -- Running or hotwired vehicles attract NPC searches in the surrounding area.
        -- Default on.
        Clues_Vehicles = true,
        -- Planks on doors and windows make NPCs treat a building as occupied and worth investigating.
        -- Default on.
        Clues_Barricades = true,
        -- Player-built walls, gates and fences make NPCs treat a place as occupied and worth investigating.
        -- Default on.
        Clues_PlayerBuilt = true,
        -- A running generator gives NPCs a strong sign that someone lives nearby, attracting investigation.
        -- Default on.
        Clues_Power = true,
        -- Scales how readily NPCs investigate survivor traces. Higher values let weaker evidence draw a search; lower values require stronger evidence.
        -- Default 1.0. Min: 0.25 Max: 5.00 Default: 1.00
        Clues_WeightMultiplier = 1.0,
        -- Enables recorded speech where available. Off keeps conversations as text; pain and death sounds are separate.
        -- Default off.
        Voice_Enabled = false,
        -- Nearby NPCs answer typed questions, requests, threats and yes-or-no replies. They also speak when you hit them or help them fight.
        -- Default on.
        Talk_Enabled = true,
        -- The Toggle chat key opens a small chat line for talking to NPCs in single player. Start a message with ! to shout.
        -- Default on.
        Talk_SinglePlayerChat = true,
        -- Friendly and neutral NPCs notice you nearby, stop and look when you speak. Passing friends greet you; outlaw groups call out strangers.
        -- Default on.
        Talk_Presence = true,
        -- Fresh survivors avoid unprovoked fights, but hostile relations, grudges and self-defence still allow attacks. Veterans and predators ignore this caution.
        -- Default on.
        Talk_RiskAssessment = true,
        -- Non-enemy groups within eight tiles may stop and talk, then part or walk together briefly. Off disables meetings; fights, fleeing and player orders always interrupt.
        -- Default Normal (3). Default = Normal
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Normal
        -- 4 = Often
        Talk_GroupMeetings = 3,
        -- Calm groups pause to talk, and passing NPCs greet each other or you. Danger interrupts them. Off disables both group chatter and these greetings.
        -- Default on.
        Chatter_Enabled = true,
        -- How often calm groups start talking. At 200, conversations happen twice as often; at 50, half as often.
        -- Default 100. Min: 10 Max: 400 Default: 100
        Chatter_Frequency = 100,
        -- Chance that an NPC greets you or another NPC while passing. Friendly people greet more, wary people less, enemies never. At 0, passing greetings stop.
        -- Default 70. Min: 0 Max: 100 Default: 70
        Chatter_PassingGreetPercent = 70,
        -- Maximum group conversations happening at once. Lower values keep speech easier to follow in crowded places.
        -- Default 3. Min: 1 Max: 8 Default: 3
        Chatter_MaxConcurrent = 3,
        -- Outlaws may rob a lone player instead of shooting: hands up, weapon down, three or four valuables taken, then they leave. Refusal can lead to shooting.
        -- Default on.
        Robbery_Enabled = true,
        -- Scales how often outlaws choose robbery rather than a fight. 0 means never; 200 means twice the normal rate, not a guaranteed robbery.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Robbery_Chance = 100,
        -- Lets you order NPCs to raise their hands, drop weapons, leave or follow. Obedience depends on fear, faction, weapons and group size.
        -- Default on.
        Orders_Enabled = true,
        -- Scales the chance an NPC obeys a spoken order. At 0, nobody obeys; at 200, obedience is twice as likely. Civilians are easier to command than armed factions.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Orders_Chance = 100,
        -- Chance the target and their group attack after refusing hands-up, drop-weapon or hold-up orders. At 100, they always attack; at 0, they only refuse.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Orders_FailFight = 100,
        -- A surrendering NPC lowers their hands and reacts when a zombie comes within this distance.
        -- Default 4. Min: 1 Max: 8 Default: 4
        Orders_ZombieTiles = 4,
        -- Longest time an NPC keeps their hands up before lowering them and carrying on.
        -- Default 90. Min: 10 Max: 600 Default: 90
        Orders_SurrenderSeconds = 90,
        -- How much weapons, loaded ammo, armour, numbers, distance and clear sight affect obedience. At 0, these advantages do not matter; at 300, they dominate the decision.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Orders_Advantage = 100,
        -- When one member surrenders, each groupmate chooses whether to obey, fight or flee after a warning. Off: the whole group always follows the surrendering member.
        -- Default on.
        Orders_GroupSurrender = true,
        -- Robbed NPCs flee, then remember you as dangerous and keep their distance for this long. At 0, this caution is not remembered.
        -- Default 15. Min: 0 Max: 240 Default: 15
        Orders_CarefulMinutes = 15,
        -- Opening a calm NPC's talk menu makes them stop, face you and greet you before choices appear. Fighting or frightened NPCs are not interrupted.
        -- Default on.
        Talk_GreetOnOpen = true,
        -- NPCs remember repeated questions, lose patience and react to your tone. Off: no question memory or opinion changes from words; deeds still count.
        -- Default on.
        Talk_AntiSpam = true,
        -- Prioritises useful replies, marks asked questions and hides unsuitable choices, such as personal questions for strangers. Requires conversation memory and patience.
        -- Default on.
        Talk_MenuFocus = true,
        -- Within this time, a repeated question gets an already-answered reply and no opinion gain. Personal-life answers stay remembered for a full game day.
        -- Default 30. Min: 1 Max: 600 Default: 30
        Talk_RepeatCooldownMinutes = 30,
        -- Base number of questions an NPC will answer. NPCs who like you allow more; those who dislike you allow fewer. After warning that patience is spent, they end the talk.
        -- Default 10. Min: 2 Max: 30 Default: 10
        Talk_QuestionsPerTalk = 10,
        -- After ending an overlong or irritating conversation, the NPC refuses to answer and closes the talk window until this time passes.
        -- Default 60. Min: 5 Max: 1440 Default: 60
        Talk_RefuseMinutes = 60,
        -- Talks needed before family and past-life questions open up, unless the NPC already likes you. Asking too early lowers their opinion.
        -- Default 2. Min: 1 Max: 10 Default: 2
        Talk_PersonalAfterTalks = 2,
        -- Scales how much polite, nosy, rude or kind words change an NPC's opinion. At 0, words do not change opinion; repetition, patience and refusals still work.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Talk_OpinionFromTalk = 100,
        -- Limits opinion gained from words in one talk; losses stop at one and a half times this amount. Twenty quiet game minutes begin a new conversation.
        -- Default 6. Min: 1 Max: 40 Default: 6
        Talk_OpinionCapPerConversation = 6,
        -- Limits opinion gained from words with each NPC per game day. Losses stop at one and a half times this amount.
        -- Default 12. Min: 1 Max: 100 Default: 12
        Talk_OpinionCapPerDay = 12,
        -- Conversation cannot raise an NPC's opinion above this score. Beyond it, gifts, healing or fighting beside them must earn further trust.
        -- Default 40. Min: 0 Max: 100 Default: 40
        Talk_OpinionWordCeiling = 40,
        -- After fights, NPCs near players loot bodies when no danger is within 15 tiles, taking supplies and useful gear. Player bodies and former player companions' bodies are left alone.
        -- Default on.
        BodyLoot_Enabled = true,
        -- Caps how many bodies one group searches each real minute. For example, 2 prevents it searching more than two corpses in a minute.
        -- Default 3. Min: 1 Max: 20 Default: 3
        BodyLoot_PerMinute = 3,
        -- Adds a survivor-run station with scanner traffic, military chatter, calls, stories, jokes and rumors about events in your world.
        -- Default on.
        Radio_KnoxCounty = true,
        -- Tracks kills, help and mistreatment, with change notices and character-window scores. Off stops both tracking and display.
        -- Default on.
        Reputation_Tracking = true,
        -- Each NPC remembers a separate opinion of each player, shaped by temperament, reputation and deeds toward their group. Shown in conversations. Off disables individual opinions.
        -- Default on.
        Reputation_NpcOpinion = true,
        -- Scales how deeds change an NPC's opinion. At normal strength, a gift gives about 8 points, a hit loses 20 and killing a groupmate loses 45; others may hear about it.
        -- Default 100. Min: 25 Max: 300 Default: 100
        Reputation_NpcOpinionScale = 100,
        -- Scales opinion's effect on prices, replies, invitations, company, deals, greetings, betrayal and orders. At 0, opinion is displayed but has no gameplay effect.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Reputation_NpcOpinionEffects = 100,
        -- How far each NPC's opinion moves back toward its starting value each day. At 0, the NPC never forgets.
        -- Default 3. Min: 0 Max: 20 Default: 3
        Reputation_NpcOpinionDecay = 3,
        -- Radio stories may name players after lasting reputation changes, fighting sprees or surviving raids. Requires personal reputation; never reveals the player's location.
        -- Default on.
        Reputation_RadioNames = true,
        -- Allows radio stories about a player's bad reputation. Off: only neutral or positive mentions are broadcast.
        -- Default on.
        Reputation_RadioBadNews = true,
        -- Food gifts and fair trades improve standing with the visitor's faction. Off: these choices do not change faction standing; existing grudges remain.
        -- Default Off (1). Default = Off
        -- 1 = Off
        -- 2 = On
        Reputation_Mode = 1,
        -- How quickly earned faction standing returns toward zero. At 200, it fades twice as fast; at 0, earned standing stays unchanged.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Reputation_DecayPercent = 100,
        -- Shows the number beside your reputation level in the character window, notes and radio panel, such as Cutthroat (-62). Off shows only the level name.
        -- Default on.
        Reputation_ShowScore = true,
        -- New characters reset personal reputation, faction standing and NPC memories, not faction or Creator relations. Off keeps the old values. Reconnecting never resets the same character.
        -- Default on.
        Reputation_ResetOnNewCharacter = true,
        -- The T-menu reputation answer also lists other players' reputation levels on the server. Off shows only your own.
        -- Default off.
        Reputation_ShowOthers = false,
        -- Killing an NPC already in a fight counts as a hostile kill and is not held against you. Off judges each kill by the NPC's attitude toward you.
        -- Default on.
        Reputation_NpcFightIsHostile = true,
        -- Points of personal reputation that drift toward neutral each day. At 0, your earned reputation stays unchanged.
        -- Default 5. Min: 0 Max: 50 Default: 5
        Reputation_DriftPerDay = 5,
        -- Scales personal reputation changes from kills and from deeds (visitors, hosting, gifts, treating, trading). At 0 none count; at 200 they count twice as much.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Reputation_KillScale = 100,
        -- Limits reputation gained from kills each day at full rate; extra hostile kills count at the reduced share below. Deeds get their own limit of 150 percent of this.
        -- Default 60. Min: 0 Max: 1000 Default: 60
        Reputation_GainCapPerDay = 60,
        -- Share of normal gain earned for hostile or criminal kills after the daily limit, with at least 1 point per kill. At 0, no further gain is possible that day.
        -- Default 25. Min: 0 Max: 100 Default: 25
        Reputation_OverCapPercent = 25,
        -- Extra points beyond a level boundary needed before your reputation label changes. Higher values reduce frequent label changes.
        -- Default 15. Min: 0 Max: 100 Default: 15
        Reputation_Hysteresis = 15,
        -- Personal reputation gained for killing an NPC who was hostile toward you.
        -- Default 10. Min: 0 Max: 200 Default: 10
        Reputation_KillHostile = 10,
        -- Personal reputation gained for killing an NPC from a criminal faction.
        -- Default 15. Min: 0 Max: 200 Default: 15
        Reputation_KillCrime = 15,
        -- Personal reputation lost for killing a neutral or cautious NPC who meant you no harm.
        -- Default 40. Min: 0 Max: 500 Default: 40
        Reputation_KillNeutral = 40,
        -- Personal reputation lost for killing an NPC who regarded you as a friend.
        -- Default 80. Min: 0 Max: 500 Default: 80
        Reputation_KillFriendly = 80,
        -- Personal reputation lost for killing an NPC who had surrendered.
        -- Default 100. Min: 0 Max: 500 Default: 100
        Reputation_KillSurrendered = 100,
        -- Choose an unused frequency; 100000 means 100 MHz. Other channels are never replaced. Restart the server after changes, then open a radio to add the matching preset.
        -- Default 99600. Min: 88000 Max: 108000 Default: 99600
        Radio_KnoxFrequency = 99600,
        -- The admin console, spawn panel, encounter list, outpost builder and raid setup in the right-click menu. Players also need Diagnostics ticked in Options. Turn this off for a clean right-click menu; the Creator (Insert key) and world status (Home key) stay on their keys and the pause menu. Admins on a server are unaffected.
        -- Default on.
        Debug_ShowAdminTools = true,
        -- After an admin has run CLEANUP A-LIFE to the end, the mod stays inert in that world so it can be removed safely. Turn this on only if you want the mod to spawn people and outposts again in a cleaned world.
        -- Default off.
        Cleanup_RespawnAfter = false,
        -- Adds a right-click peephole view on closed doors. Each player can also turn it off in their own mod options.
        -- Default on.
        Peek_Enabled = true,
        -- Every few seconds, an NPC within two tiles of the door may hear you peeking and speak. They cannot see you through the peephole. At 0, peeking is never heard.
        -- Default 5. Min: 0 Max: 100 Default: 5
        Peek_NoticeChancePercent = 5,
        -- Hides faction, rank, mood and standing in the talk window. Shows only a name you have learned and held items. Off restores the full heading.
        -- Default on.
        Talk_MysteryMode = true,
        -- Moving vehicles hurt NPCs they hit, with damage based on speed. Off: collisions do no NPC damage. Intact car windows still protect you from NPC attacks either way.
        -- Default on.
        Combat_VehicleDamage = true,
        -- On: NPCs do not start fights in non-PvP zones, but still retaliate against an attacker. Off: NPCs may attack there. Safehouses protect you either way.
        -- Default off.
        Combat_NonPvpZoneShield = false,
        -- Scales how often NPC gunfire hits a ZOMBIE. 100 is unchanged; raise it if crews look helpless against a horde. Does not affect their aim against you. Min: 10 Max: 200 Default: 100
        Combat_AimZombiePercent = 100,
        -- Global multiplier on how often NPC gunfire hits players, applied on top of the NPC aim setting and each character's own accuracy. 100 is unchanged. NPCs also aim worse in the first seconds of a fight, at long range and against a moving target. Min: 10 Max: 200 Default: 70
        Combat_AimPlayerPercent = 70,
        -- Scales NPC melee and gun damage to players. At 50, each hit deals half the original damage; 100 is the original amount.
        -- Default 72. Min: 0 Max: 100 Default: 72
        Combat_DamagePercent = 50,
        -- Optional extra overall-health loss added on top of a hit, on top of the damage option above. 0 means no extra damage, so the 60% option is exactly 60% of the original hit. Default 0. Min: 0 Max: 200 Default: 0
        Combat_ExtraWoundPercent = 0,
        -- Scales each survivor's original health. At 80, they have four-fifths of their usual health; profession differences still apply.
        -- Default 98. Min: 25 Max: 300 Default: 98
        NpcHealth_Percent = 80,
        -- How hard bullets, melee hits, shoves and zombie bites land on NPCs, on top of the NPC maximum health setting. At 100 guns, shoves and bites cost what they used to, 130 is 30% more. Melee hits are priced so that the defaults keep the old number of swings. This is the damage NPCs receive, not what they deal to players (see NPC damage output). Default 130. Min: 25 Max: 400 Default: 130
        NpcHealth_DamageTakenPercent = 130,
        -- How fast a resting NPC recovers health. 100 is the original 1.5% of maximum health per game hour, 50 is half of that. Only an NPC that has been out of the fight for two minutes and has no open wound recovers. 0 turns recovery off. Default 50. Min: 0 Max: 400 Default: 50
        NpcHealth_RegenPercent = 50,
        -- Switches the NPC health rebalance off: original maximum health, original hits needed to put an NPC down, original bleeding and regeneration. Default off.
        NpcHealth_Legacy = false,
        -- NPCs carrying a weapon walk into buildings slowly with the weapon raised, pause at doorways and corners and look over the room before moving on.
        Combat_RoomSweep = true,
        -- Shows a visible streak along NPC gunshots. Turning this off does not change muzzle flashes, gunfire sounds or casings.
        -- Default on.
        Combat_VisibleTracers = true,
        -- Shows weapon-sized flashes and nearby ground light when NPCs fire. Suppressed weapons do not flash. Gunfire sounds and casings are unchanged.
        -- Default on.
        Combat_MuzzleFlash = true,
        -- Sets how far other players can see an NPC shot's flash and streak and hear its gunshot and casing in multiplayer.
        -- Default 90. Min: 20 Max: 150 Default: 90
        Combat_ShotFxRange = 90,
        -- Armed NPCs get out of the line of fire to reload, break contact when hurt, and fight from behind walls and corners.
        Modules_Cover = true,
        -- A shooter that is losing breaks contact, runs about a block back, holes up out of sight -- inside a building when there is one -- then comes back in from another side. Ranged only; melee always closes.
        Modules_Withdraw = true,
        -- Civilians, families and workers flee zombies, flinch at loud events and spread fear early in the outbreak. Soldiers, police and criminals stay steadier. Requires Civilian fear of zombies.
        -- Default on.
        Panic_FirstDays = true,
        -- 100% is the standard curve: full fright on days 0 and 1, then easing off. Lower values make survivors calmer, higher values keep them frightened longer. 0 turns the panic off. Min: 0 Max: 200 Default: 100
        Panic_Strength = 100,
        -- Stretches or shortens the early-outbreak panic curve. Fright is strongest at the start and nearly gone by this many days after the outbreak.
        -- Default 12. Min: 2 Max: 60 Default: 12
        Panic_LengthDays = 12,
        -- A frightened survivor makes the people around them more frightened for 30 to 60 seconds: their own group first, strangers within about 12 tiles less. Soldiers and police nearby calm them down. Off keeps every survivor's fright separate.
        Panic_Contagion = true,
        -- Civilians, families and workers avoid distant zombies and flee crowds for at least 30 seconds, fighting if cornered. Soldiers, police, criminals and hardened members stay steadier.
        -- Default on.
        Modules_Fear = true,
        -- Civilians start out at full fear and steady over this many days, down to the lingering fear below. 0 starts them at the lingering fear. Min: 0 Max: 30 Default: 7
        Fear_Days = 7,
        -- How many zombies it takes before civilians break and run. Default = Normal
        -- 1 = Hard to scare
        -- 2 = Normal
        -- 3 = Easily scared
        Fear_Level = 2,
        -- How much of their fear civilians keep once they have steadied. At 50 it takes a crowd about 1.6 times the size to make them run. 0 means they stop running from zombies altogether after the days above. Min: 0 Max: 100 Default: 50
        Fear_Lingering = 50,
        -- Poorly armed NPCs back away from a player or hostile aiming or raising a firearm. The Creator determines which factions and members have this fear.
        -- Default on.
        GunFear_Enabled = true,
        -- Chance that an NPC panics when a gun is aimed at it. Rolled once per NPC and player, so the same NPC always reacts the same way to the same player. A gun that is raised but not pointed at it counts half. Default 60. Min: 0 Max: 100 Default: 60
        GunFear_Percent = 60,
        -- How far, in tiles, a frightened NPC runs from the gun on each leg. It heads for cover that breaks line of sight and keeps going until the gun has been out of sight for a few seconds. Default 35. Min: 8 Max: 80 Default: 35
        GunFear_RunDistance = 35,
        -- How fast a frightened NPC runs away. A flight may use all of its stamina and slows down only when it is empty. Default = Sprint
        -- 1 = Run
        -- 2 = Sprint
        GunFear_RunSpeed = 2,
        -- How long an NPC freezes and stares at the gun before it starts to run. 0 runs at once. Default 400. Min: 0 Max: 3000 Default: 400
        GunFear_ReactDelayMs = 400,
        -- After a fight, a wounded NPC stops, bandages, and loses the limp and the bleeding.
        Modules_Healing = true,
        -- In melee, NPCs step back while swinging when zombies press or outnumber them, and step in when a lone zombie is within reach or backing off. Decided each swing from the zombies' positions and facing.
        Combat_MeleeFootwork = true,
        -- How many zombies facing an NPC within the step-back radius it takes before the NPC steps back between swings. 0 turns stepping back off. Min: 0 Max: 8 Default: 2
        Combat_MeleeKiteCrowd = 2,
        -- How far around an NPC zombies are counted for melee footwork. Min: 1 Max: 5 Default: 2
        Combat_MeleeKiteTiles = 2,
        -- How far an NPC steps back between swings. It never steps out of weapon reach. 16 is 1.6 tiles. Min: 3 Max: 30 Default: 16
        Combat_MeleeStepBackTenths = 16,
        -- How far an NPC steps toward a lone zombie that is in reach or backing off. 11 is 1.1 tiles. Min: 3 Max: 25 Default: 11
        Combat_MeleeStepInTenths = 11,
        -- A zombie an NPC has just struck with a melee weapon cannot start or finish a bite and stops chasing for this long, so a fighter who keeps swinging is not bitten by the zombie in front of him. 0 turns the stun off. Min: 0 Max: 3000 Default: 1100
        Combat_ZombieStunMs = 1100,
        -- Master switch. On: the Sawmill Hands crew can spawn and the five melee modules work. Off: the faction is hidden from spawning, the Creator and the debug spawner, and every melee module is inert.
        Melee_FactionEnabled = true,
        -- Sidestep between swings, back off when zombies press in, step back in afterwards. Tuned for pairs and groups.
        Melee_Footwork = true,
        -- In a melee group one member engages and the others circle round to the far side of the target.
        Melee_Flank = true,
        -- A fighter holding an axe cuts through doors and windows faster and does it when checking a noise. The normal courtesy rules still apply.
        Melee_Breach = true,
        -- Walks up on a player, shouts the warning from range, then closes in. The normal warn-before-strike rules still decide when the first blow may land.
        Melee_Intimidate = true,
        -- Breaks contact early when a few zombies close in, using the existing withdraw behaviour with a lower crowd threshold.
        Melee_Caution = true,
        -- How many zombies near a crew member make it retreat. Normal fighters need five. Min: 2 Max: 8 Default: 3
        Melee_CautionCrowd = 3,
        -- How quickly zombies notice and engage NPCs compared with the old pace. 500 is five times faster, 100 is the old pace. Higher values cost a little more processing near NPCs. Min: 100 Max: 1000 Default: 500
        Zombies_ReactSpeed = 500,
        -- Zombies use the game's bite and scratch attack animations when attacking NPCs.
        -- Default on.
        Zombies_AttackAnims = true,
        -- How many of the attacks on a standing NPC are scratches instead of bites. Min: 0 Max: 100 Default: 35
        Zombies_ScratchPercent = 35,
        -- Enough zombies grabbing one NPC at once drag it down and kill it, with the game's being-eaten voice.
        -- Default on.
        Zombies_DragDown = true,
        -- Sets how many zombies must grab an NPC at the same time to drag it down. For example, 4 requires four simultaneous attackers.
        -- Default 4. Min: 2 Max: 8 Default: 4
        Zombies_DragDownCount = 4,
        -- How long the NPC is held down before it dies. 30 is 3 seconds. Min: 5 Max: 60 Default: 30
        Zombies_DragDownTenths = 30,
        -- The base armour system for NPCs, with the same rules a player gets. It is not a Creator module. Every hit on an NPC (zombie bites and scratches, melee, bullets; from NPCs and from players) rolls against the matching protection of what is worn on the struck body part: bite, scratch or bullet defense. 100 always blocks, 0 never does, layers add up to 100. A blocked hit does no damage and cannot wound or infect, and the clothing tears. Body parts with no protection take the normal damage. Off ignores worn clothing. Default on.
        Combat_NpcArmorVsZombies = true,
        -- NPCs that would bleed out can lie injured, be rescued, bandaged or questioned. Off keeps ordinary injury behavior; in multiplayer, only the client controlling the NPC runs its movement.
        -- Default on.
        Injury_Enabled = true,
        -- A teammate or friendly ally from the same bloc who can see a downed NPC walks over and bandages it. The rescued NPC stands up limping.
        -- Default on.
        Injury_Rescue = true,
        -- Rescuers drag downed NPCs away before bandaging when zombies or hostiles are within 12 tiles. Off: rescue cannot start with danger that close.
        -- Default on.
        Injury_RescueDrag = true,
        -- Allows rescues while players are near or watching. Off: rescuers wait until all players are beyond the nearby-player distance set under expert combat.
        -- Default on.
        Injury_RescueInView = true,
        -- Teammates and friendly members of the same faction this close to the injured NPC may come to help. Helpers outside his squad also need a clear line of sight. Hostile NPCs never rescue him. Min: 5 Max: 40 Default: 15
        Injury_RescueRange = 15,
        -- Downed NPCs crawl away from zombies and hostiles toward their group, and occasionally shuffle instead of lying still.
        -- Default on.
        Injury_Crawl = true,
        -- When an NPC would start bleeding out, this is the chance it goes injured instead. 0 means only the debug menu makes injured NPCs. Min: 0 Max: 100 Default: 50
        Injury_AutoPercent = 50,
        -- Health an NPC has when it goes down injured. Min: 2 Max: 40 Default: 12
        Injury_DownHpPercent = 12,
        -- Each question put to an injured NPC can kill it. The player sees that it bled out. Min: 0 Max: 100 Default: 25
        Injury_InterrogationDeathPercent = 25,
        -- Taken once per injured NPC when you question a friendly, neutral or careful one. Hostile NPCs cost nothing. Min: 0 Max: 20 Default: 3
        Injury_RepPenalty = 3,
        -- Small reward for giving a bandage or medical item. Min: 0 Max: 20 Default: 4
        Injury_RepGain = 4,
        -- Sets the time from getting up with low health to full health and a normal walk. For example, 12 means half a game day of recovery.
        -- Default 8. Min: 1 Max: 72 Default: 8
        Injury_RecoverHours = 8,
        -- Sets how long a downed NPC waits without help before getting up on its own, still limping. For example, 6 means a quarter of a game day.
        -- Default 4. Min: 1 Max: 48 Default: 4
        Injury_DownHours = 4,
        -- Only used when Rescues happen in front of players is off: then a teammate rescues an injured NPC only when no player is within this range or in sight. Min: 10 Max: 60 Default: 25
        Injury_PlayerRangeTiles = 25,
        -- Lets downed NPCs run on a server with connected players. The client that controls the NPC keeps its own bleed-out timers and wound list; the server only hands it a downed state. Off keeps the ordinary bleed-out in multiplayer. Single player is not affected.
        -- Default on.
        Injury_MultiplayerEnabled = true,
        -- After you bandage an injured NPC it turns neutral and walks this far from you. Min: 30 Max: 120 Default: 45
        Injury_LeaveTiles = 45,
        -- Sets the volume of zombie bites, being-eaten voices and NPC pain cries. Sounds fade with distance and are heard only within 25 tiles. At 0, they are muted.
        -- Default 40. Min: 0 Max: 100 Default: 40
        Audio_BiteLoudness = 40,
        -- Hits cause bruises, fractures, cuts, bullet wounds or bites. Leg wounds slow NPCs, arm wounds spoil aim, and open wounds bleed until bandaged; below 10 percent health, bleed-out is rapid.
        -- Default on.
        Combat_Wounds = true,
        -- How fast an NPC's open wounds bleed: scratches and cuts clot on their own, deep wounds and bullet wounds bleed until bandaged. 0 turns the bleeding off. Min: 0 Max: 300 Default: 100
        Combat_InjuryBleed = 100,
        -- Chance that an NPC's hit with a heavy blunt weapon (bat, sledgehammer) breaks the player's arm or leg it lands on. Blunt weapons never cut: a laceration becomes a scratch. Min: 0 Max: 50 Default: 4
        Combat_BluntFracture = 4,
        -- Allows sprint windows for melee closing, cover moves, and retreats. Off keeps those moves at a run or walk.
        Modules_Sprint = true,
        -- A shooter that loses sight of its target dumps the magazine into the last known position, full auto, spraying left and right. Pistols magdump too.
        Modules_Gunner = true,
        -- Allows groups such as patrols, scavengers and hostile crews to appear near players in suitable map areas.
        -- Default on.
        Encounters_Enabled = true,
        -- Sets the time between random encounter checks, including while sleeping or fast-forwarding. The encounter chance still decides whether a group appears.
        -- Default 45. Min: 10 Max: 720 Default: 45
        Encounters_IntervalMinutes = 180,
        -- Scales Roadside Pickers, small looting crews that may warn or rob you. They are common in the first two weeks and gone by week four. At 0, they do not appear.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Encounters_EarlyLooters = 100,
        -- Free groups choose goals such as supplies or shelter, discuss them and follow through until done, blocked, hurt or threatened. Off: groups return to travelling and idling.
        -- Default on.
        Plans_Enabled = true,
        -- Sets how far a group looks for a building to visit for its plan. Nearby buildings are preferred; 80 limits the search to 80 tiles.
        -- Default 100. Min: 40 Max: 200 Default: 100
        Plans_Radius = 100,
        -- Sets how long a group keeps a plan before giving up and choosing again. Shelter plans last until morning.
        -- Default 6. Min: 1 Max: 48 Default: 6
        Plans_LifespanHours = 6,
        -- Groups discuss plans before leaving and speak when they arrive or give up. Off: they still follow plans, but silently.
        -- Default on.
        Plans_Talk = true,
        -- Crews can move on after an encounter, such as fixing a car then scavenging from it. Distant groups plan around supplies. Off: crews keep their earlier behavior.
        -- Default on.
        Activities_Enabled = true,
        -- Sets the share of finished encounters whose crews take up another activity. The rest keep their post and later leave as before; higher values put more crews on roads.
        -- Default 70. Min: 0 Max: 100 Default: 70
        Activities_SwitchChance = 70,
        -- Allows armed NPC crews to hunt. Offline only allows hunting away from players and leaves nearby wildlife to you.
        -- Default Offline and nearby wildlife (3). Default = Offline and nearby wildlife
        -- 1 = Off
        -- 2 = Offline only
        -- 3 = Offline and nearby wildlife
        Activities_Hunting = 3,
        -- A crew stuck at a broken or crashed car this long may leave it and go scavenging, but only when no player is nearby.
        -- Default 10. Min: 1 Max: 72 Default: 10
        Activities_SwitchHours = 10,
        -- A crew cannot abandon its car while any player is closer than this distance. For example, 80 keeps it at the car while you are within 80 tiles.
        -- Default 60. Min: 20 Max: 150 Default: 60
        Activities_SwitchClearTiles = 60,
        -- Crews of two or more may settle in an empty building away from players, store their loot and return after trips.
        -- Default on.
        Activities_Bases = true,
        -- Caps settled NPC bases across the world. If the limit is exceeded, the oldest base is abandoned. At 0, crews cannot found new bases.
        -- Default 6. Min: 0 Max: 24 Default: 6
        Activities_MaxBases = 6,
        -- Scales encounters with fishers, hunters, foragers, woodcutters, camp builders, scavengers and water carriers. 100 keeps the usual rate; 0 disables these encounters.
        -- Default 100. Min: 0 Max: 500 Default: 100
        Activities_PartyWeight = 100,
        -- Chance that each eligible crew founds a base, checked once per game day.
        -- Default 25. Min: 0 Max: 100 Default: 25
        Activities_BaseChance = 25,
        -- Time a crew with a base spends away before planning a return home.
        -- Default 8. Min: 2 Max: 48 Default: 8
        Activities_BaseReturnHours = 8,
        -- Minimum distance from any player when an NPC crew founds a base.
        -- Default 45. Min: 20 Max: 120 Default: 45
        Activities_BaseClearTiles = 45,
        -- Scales food gained from NPC hunts. 100 keeps the usual amount; 0 gives no food and 200 gives twice the usual amount.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Activities_HuntYieldPercent = 100,
        -- Allows NPC crews to fish near water without reducing the fish available to players.
        -- Default on.
        Activities_Fishing = true,
        -- Sessions last 60-140 percent of this time. Fishers stop if noticed by a player, hostile or zombie, or after gunfire or a hit.
        -- Default 65. Min: 10 Max: 240 Default: 65
        Activities_FishingMinutes = 65,
        -- Scales fish caught by NPC crews. 100 keeps the usual catch; 0 gives no fish and 200 gives twice the usual catch.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Activities_FishYieldPercent = 100,
        -- Foraging crews bring seasonal berries, herbs, nuts and mushrooms to their camp stash. This does not reduce what players can forage.
        -- Default on.
        Activities_Foraging = true,
        -- Scales food foraged per crew per game day. 100 gives six items, 200 gives twelve and 0 gives none.
        -- Default 100. Min: 0 Max: 300 Default: 100
        Activities_ForageYieldPercent = 100,
        -- Scales how quickly groups become hungry and thirsty. Higher values cause more supply runs and more chances to encounter you.
        -- Default 100. Min: 25 Max: 400 Default: 100
        Activities_NeedsDrainPercent = 100,
        -- Caps encounter crews kept travelling while you are away; they share the distant-group limit. Extra crews may continue while you are near, then leave the world as before.
        -- Default 6. Min: 0 Max: 24 Default: 6
        Activities_AdoptCap = 6,
        -- On: repaired cars have working engines, batteries, bonnets and some fuel, and remain with their trunk loot. Off: the car stays a wreck but remains the crew's stash.
        -- Default on.
        Activities_FixedCarDrivable = true,
        -- Sets how full a repaired car's fuel tank is. For example, 25 gives it a quarter tank.
        -- Default 15. Min: 0 Max: 100 Default: 15
        Activities_FixedCarFuelPercent = 15,
        -- Removes inactive NPCs after nobody has approached them for this long. Persistent crews, such as anchored NPCs and garrisons, never expire. At 0, cleanup is disabled.
        -- Default 8. Min: 0 Max: 168 Default: 8
        Population_DormantTtlHours = 8,
        -- The conduct layer: squad leaders that deploy and rally their group, snipers that keep distance, medics that dress their wounded, ambushers that wait in the dark, stealth killers. Off disables every conduct at once.
        Modules_Behaviors = true,
        -- Armed NPCs keep the gun on their target, or on where it was last seen, while they walk, back off or sidestep.
        Modules_Strafe = true,
        -- Flashlights: NPCs see 12 tiles in darkness, or 20 when their light reaches you. Night vision: they can see at night, but you must supply goggles yourself.
        -- Default Flashlights (1). Default = Flashlights
        -- 1 = Flashlights
        -- 2 = Night vision
        Night_Sight = 1,
        -- How many groups keep travelling and working at night. No risks makes everyone shelter; Risk takers keeps most groups active.
        -- Default Moderate chance (3). Default = Moderate chance
        -- 1 = No risks
        -- 2 = Low chance
        -- 3 = Moderate chance
        -- 4 = High chance
        -- 5 = Risk takers
        Night_Activity = 3,
        -- Saved travelling groups return up to this rate-scaled limit after restart; at 0 or in Local only, the saved-crew cap applies. Lowering stops new groups; extras keep moving until reload.
        -- Default 45. Min: 0 Max: 500 Default: 45
        Offline_SquadCap = 30,
        -- Limits outpost garrisons and persistent crews kept after restart. Distant travelling groups and starting building residents have separate limits. Lowering it affects the next save.
        -- Default 60. Min: 0 Max: 500 Default: 60
        Population_PersistentSquadCap = 45,
        -- Visitors, travellers and traders you met stay in the world when you quit. Raiders and other hostile groups do not. Counts toward the saved crew limit.
        -- Default on.
        Population_KeepEncounterNpcs = true,
        -- Caps simultaneous patrol, scavenging and hunting teams from each outpost. At 0, none are sent. Teams last for the session; the outpost stays saved.
        -- Default 3. Min: 0 Max: 4 Default: 3
        Outposts_TaskSquadCap = 2,
        -- Sets how often distant travelling groups move and make decisions. Longer intervals mean fewer updates.
        -- Default 20. Min: 10 Max: 60 Default: 20
        Offline_TickSeconds = 20,
        -- How far an offline squad walks in one in-game hour. Default 150, a walking pace at the default day length; towns are 1700-3400 tiles apart. Min: 20 Max: 400 Default: 150
        Offline_TravelTilesPerHour = 150,
        -- Groups that lose members to you and escape can return for revenge two to three game days later, bringing backup.
        -- Default on.
        Offline_RevengeEnabled = true,
        -- Sets the daylight game hours between distant travelling groups (up to 1500 tiles away) heading for you and arriving out of sight. Hostile ones wait until day 3. At 0, off.
        -- Default 6. Min: 0.00 Max: 48.00 Default: 6.00
        Offline_ApproachGapHours = 6.0,
        -- Game hours between hunts sent by each hostile outpost. From day 7, after dark, one crew per player. Uses faction sightings refreshed every 24 game hours. At 0, off.
        -- Default 72. Min: 0 Max: 168 Default: 72
        Assassins_GapHours = 72,
        -- Lets fortified stations, occupied houses and forest camps appear over time, with garrisons that remain at their site.
        -- Default on.
        Outposts_Enabled = true,
        -- Limits how many outposts may exist at once across the map. At 0, outposts are disabled.
        -- Default 9. Min: 0 Max: 24 Default: 9
        Outposts_MaxSites = 4,
        -- Limits how many fortified-building outposts each town may hold. Outdoor camps have a separate limit.
        -- Default 2. Min: 1 Max: 4 Default: 2
        Outposts_PerCity = 1,
        -- Time between chances to found an outpost. Sleep and fast-forward count. If the game clock stops, checks use this many real minutes instead.
        -- Default 20. Min: 5 Max: 120 Default: 20
        Outposts_IntervalMinutes = 45,
        -- Chance that an outpost check founds a new site, if a suitable location is available.
        -- Default 35. Min: 0 Max: 100 Default: 35
        Outposts_Chance = 14,
        -- Normal outposts start within this distance, at least 40 tiles from players. Fixed checkpoints may start up to 200 tiles away; all need loaded ground.
        -- Default 120. Min: 60 Max: 200 Default: 120
        Outposts_BuildRadius = 120,
        -- Share of destroyed or burned walls, doors, windows and fences that causes an outpost to be removed. At 0, this damage-based removal is disabled.
        -- Default 40. Min: 0 Max: 100 Default: 40
        Outposts_StructureLossPercent = 40,
        -- Pauses multiplayer wall and structure work until players stop crossing map sections. At least 5 seconds protects loading clients; new joins keep a separate 30-second pause.
        -- Default 5. Min: 5 Max: 30 Default: 5
        Outposts_StreamHoldSeconds = 5,
        -- A built outpost receives its garrison when a player comes within this distance.
        -- Default 90. Min: 40 Max: 150 Default: 90
        Outposts_SpawnRadius = 90,
        -- Sets the relative frequency of natural 1-3-person parties compared with larger groups. Higher means more small parties; faction-specific rules take priority.
        -- Default 2. Min: 0.00 Max: 20.00 Default: 2.00
        Party_LoneWeight = 4.0,
        -- Sets the relative frequency of natural groups of 4 or more compared with small parties. Equal weights give both sizes equal selection weight.
        -- Default 2. Min: 0.00 Max: 20.00 Default: 2.00
        Party_GroupWeight = 1.0,
        -- Sets the minimum time between new distant travelling groups. Existing groups stay; the world group limit and local quiet periods still apply.
        -- Default 3. Min: 0.25 Max: 48.00 Default: 3.00
        Offline_FoundGapHours = 9.0,
        -- Enables automatic raids: a radio warning, scouts arriving unseen, then a buildup before the attack. The earliest raid day still applies. Admins can force raids.
        -- Default on.
        Raid_Enabled = true,
        -- Automatic raids cannot begin before the world reaches this age. For example, 60 prevents them during the first 60 game days.
        -- Default 21. Min: 0 Max: 365 Default: 21
        Raid_MinDay = 60,
        -- Sets the minimum time between automatic full-scale raids. For example, 14 requires at least two game weeks between raids.
        -- Default 14. Min: 0.25 Max: 60.00 Default: 14.00
        Raid_CooldownDays = 42.0,
        -- Chance for scouts to begin a raid buildup on each check. Set 0 to stop automatic raids; cooldown and earliest-day limits still apply.
        -- Default 0.025. Min: 0.00 Max: 100.00 Default: 0.03
        Raid_Chance = 0.0025,
        -- How often the raid director checks automatic eligibility. Min: 1 Max: 120 Default: 10
        Raid_CheckMinutes = 10,
        -- Sets the number of attacking waves in a raid. The total attacker limit still applies, so extra waves do not bypass that limit.
        -- Default 4. Min: 1 Max: 10 Default: 4
        Raid_Waves = 2,
        -- Sets the requested attackers in each wave. The total raid limit and other spawn limits can reduce the actual number.
        -- Default 8. Min: 1 Max: 12 Default: 8
        Raid_GroupSize = 4,
        -- Caps attackers across all automatic raid waves, spread evenly among the waves. Earlier scouts do not count. Admin-forced raids ignore this limit.
        -- Default 12. Min: 1 Max: 48 Default: 12
        Raid_MaxAttackers = 6,
        -- Sets the warning-to-scout delay; the raid follows its buildup. 0 sends scouts immediately. Scouts and raiders walk in from 40-50 tiles away, unseen and away from player bases.
        -- Default 3. Min: 0.00 Max: 24.00 Default: 3.00
        Raid_WarningHours = 3.0,
        -- Paces reinforcement waves after the initial warning. Min: 1 Max: 120 Default: 5
        Raid_WaveDelayMinutes = 5,
        -- Allows all A-Life helicopters: raid and backup arrivals, night searchlights and flyovers. Off: none of these helicopters fly.
        -- Default on.
        Raid_Helicopter = true,
        -- Controls opening sirens, jets and raid aircraft sounds. Helicopter raid arrivals also need the helicopter option switched on.
        -- Default on.
        Raid_SirenAircraftSounds = true,
        -- Wait this long after scouts successfully arrive before a raid can start. Min: 0.00 Max: 72.00 Default: 6.00
        Raid_ScoutBuildupHours = 6.0,
        -- An expired scout report cannot authorize a raid; new scouts must be sent. Min: 1.00 Max: 168.00 Default: 48.00
        Raid_ScoutLifetimeHours = 48.0,
        -- Sets how many enemy scouts arrive before an automatic full-scale raid. They are separate from the raid's total attacker limit.
        -- Default 4. Min: 1 Max: 8 Default: 4
        Raid_ScoutSize = 2,
        -- Groups in contact may request backup, with limited calls, a cooldown and a chance of no answer.
        -- Default on.
        Support_Enabled = true,
        -- Sets the chance that an allowed backup call succeeds. For example, 50 gives each permitted call a one-in-two chance of an answer.
        -- Default 35. Min: 0 Max: 100 Default: 35
        Support_Chance = 8,
        -- Sets the minimum wait between successful backup calls by the same group. For example, 6 means it must wait a quarter of a game day.
        -- Default 1.5. Min: 0.00 Max: 24.00 Default: 1.50
        Support_CooldownHours = 6.0,
        -- Sets backup size only when the calling NPC or its faction has no size of its own. It does not replace sizes chosen in their profiles.
        -- Default 4. Min: 1 Max: 8 Default: 4
        Support_GroupSize = 2,
        -- Limits how many reinforcement requests one group may make, preventing repeated backup calls without end.
        -- Default 2. Min: 0 Max: 10 Default: 2
        Support_MaxCalls = 1,
        -- Sets the chance of a searchlight call from an NPC authorized to request helicopter support. Ground-only callers cannot request it.
        -- Default 20. Min: 0 Max: 100 Default: 20
        Support_SpotlightChance = 8,
        -- Sets how long a requested searchlight flight lasts before the helicopter leaves.
        -- Default 180. Min: 5 Max: 180 Default: 180
        Support_SpotlightSeconds = 180,
        -- Sets how long the support helicopter's flyover effects last. This does not set how long ground reinforcements stay.
        -- Default 35. Min: 5 Max: 180 Default: 35
        Support_HelicopterSeconds = 35,
        -- Allows moving searchlights at night or in low light. They can reveal people outdoors; cover and buildings hide them. Off disables only the searchlight.
        -- Default on.
        Helicopter_Spotlight = true,
        -- Sets the radius of the lit area. A larger beam covers more ground and makes it easier to be caught in the light.
        -- Default 11. Min: 4 Max: 20 Default: 11
        Helicopter_SpotlightSize = 11,
        -- Sets how strongly the helicopter searchlight illuminates the ground.
        -- Default 100. Min: 20 Max: 100 Default: 100
        Helicopter_SpotlightBrightness = 100,
        -- Sets the minimum time between searchlight flights anywhere in the world. Shorter intervals allow more flights; the call chance still applies.
        -- Default 20. Min: 2 Max: 240 Default: 20
        Helicopter_SpotlightGapMinutes = 20,
        -- Residents slowly carry zombie corpses out of loaded buildings to reduce corpse sickness. Never removes player or NPC corpses, or corpses in claimed player safehouses.
        -- Default on.
        Residents_ClearCorpses = true,
        -- Sets how far scavengers look for a nearby building. Higher values widen the search but increase the work needed to find one.
        -- Default 27. Min: 10 Max: 60 Default: 27
        Scavenge_BuildingRadius = 27,
        -- Scavengers return to their camp or base depot after collecting this many items. For example, 4 sends them home with four collected items.
        -- Default 8. Min: 1 Max: 24 Default: 8
        Scavenge_CarryLimit = 8,
        -- Scavengers bring supplies home after searching this many buildings. For example, 3 allows three building searches before returning.
        -- Default 2. Min: 1 Max: 8 Default: 2
        Scavenge_ReturnAfterBuildings = 2,
        -- Adds winter layers, removes heavy layers in summer and adds rainwear in wet weather. Uniforms and profiles with their own seasonal outfits are preserved.
        -- Default on.
        Loadouts_SeasonalDress = true,
        -- Each new person gets their own hair, hair colour, beard and clothing colours, so crews stop looking cloned. Off keeps the authored look. People already in a save keep theirs.
        -- Default on.
        Appearance_Variation = true,
        -- Share of new people who keep their authored face, so named characters stay recognisable. 0 varies everyone, 100 varies nobody. Needs Varied NPC looks on.
        -- Default 35. Min: 0 Max: 100 Default: 35
        Appearance_KeepAuthoredPercent = 35,
        -- People whose profile lists several weapons for one slot pick one of them per person. Off always uses the first listed weapon. Profiles with a single weapon are unaffected. Default on.
        Appearance_LoadoutVariation = true,
        -- Weather and clothing affect NPC warmth. Prolonged chill can cause coughing, worse aim, slower walking and faster fatigue. Indoors or near a fire, NPCs warm up.
        -- Default on.
        Cold_Enabled = true,
        -- How hard the cold hits NPCs and how big the penalties of a cold are. 0 = NPCs never get chilled. 100 = default and gentle. 300 = harsh winters. Default 100. Min: 0 Max: 300 Default: 100
        Cold_Severity = 100,
        -- Per game hour spent badly chilled, the base chance that an NPC comes down with a cold (it grows with how chilled and wet the NPC is). 0 = chills never turn into a cold. Default 6. Min: 0.00 Max: 100.00 Default: 6.00
        Cold_ChancePercent = 6.0,
        -- A sneeze or cough from a sick NPC is a small sound (a few tiles) that nearby zombies can hear. Turn off to keep them silent.
        Cold_SneezeNoise = true,
        -- Chilled NPCs without orders or danger seek a fire or heated building and wear warmer clothes from their packs. Groups follow their leader to a fire.
        -- Default on.
        Cold_SeekWarmth = true,
        -- In cold weather, NPCs sitting beside a lit campfire periodically hold their hands toward it. In warm weather or without a fire, they just sit.
        -- Default on.
        Idle_CampWarmHands = true,
        -- Shore fishers cast, wait and pull their rods every 20-60 seconds. Off: they continue fishing without the rod animation.
        -- Default on.
        Idle_FishingAnim = true,
        -- Camp sitters beside a free outdoor bench sit on it instead of the ground. Off: they always sit on the ground.
        -- Default on.
        Idle_BenchSeat = true,
        -- New arrivals from built-in factions mix uniforms with civilian clothes from this day; makeshift armour appears later. At 0, uniforms stay intact. Creator profiles are unchanged.
        -- Default 10. Min: 0 Max: 365 Default: 10
        Loadouts_UniformDecayDay = 10,
        -- Sets how quickly built-in civilian groups gain guns over time. At 200, guns spread twice as fast; at 50, half as fast. Police, army and elite units are unaffected.
        -- Default 100. Min: 25 Max: 400 Default: 100
        Loadouts_ArmingPace = 100,
        -- Scales gun ownership among built-in non-military NPCs. At 0, affected NPCs use melee tools only. Police, army, elite units and Creator profiles are unchanged.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Loadouts_ArmingShare = 100,
        -- Full keeps groups travelling beyond players' view. Local only stops new distant groups; existing ones retire on reload. Outposts can still develop in either mode.
        -- Default Full A-Life (offline squads roam the map) (1). Default = Full A-Life (offline squads roam the map)
        -- 1 = Full A-Life (offline squads roam the map)
        -- 2 = Local only (groups near players; outposts stay)
        World_Mode = 1,
        -- Scales the chance of a random group near players without changing check intervals. Low halves the chance; Abundant triples it.
        -- Default Normal (2). Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        -- 5 = Abundant
        Rate_Encounters = 2,
        -- Scales natural group arrivals and the distant travelling group limit together. Low halves both; Abundant triples them, within their limits.
        -- Default Normal (2). Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        -- 5 = Abundant
        Rate_Groups = 2,
        -- Scales how often friendly, neutral and wary factions are picked compared with hostile ones. Low halves their selection weight; Abundant triples it.
        -- Default Normal (2). Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        -- 5 = Abundant
        Rate_Survivors = 2,
        -- Changes distant gunfire, helicopters and other background events. Low halves event limits and doubles the wait between them.
        -- Default Normal (2). Default = Normal
        -- 1 = Low
        -- 2 = Normal
        -- 3 = High
        -- 4 = Very High
        -- 5 = Abundant
        Rate_MetaEvents = 2,
        -- Limits outdoor sites such as forest camps, field bases and aid stations, separate from fortified town buildings. At 0, outdoor sites are disabled.
        -- Default 4. Min: 0 Max: 12 Default: 4
        Outposts_OutsideCity = 1,
        -- Allows cautious survivor communities to hold outposts alongside hostile crews. They warn strangers away but never send hunting parties. Off leaves only hostile holders.
        -- Default on.
        Outposts_SurvivorHolds = true,
        -- Patrols and scouts pause off the road every few hours and after fights to sit, smoke, drink or talk, then resume their route.
        -- Default on.
        PatrolRest_Enabled = true,
        -- Sets the minimum length of a patrol rest. For example, 30 means each rest lasts at least half a game hour.
        -- Default 20. Min: 5 Max: 180 Default: 20
        PatrolRest_MinMinutes = 20,
        -- Sets the maximum length of a patrol rest. For example, 60 limits each rest to one game hour.
        -- Default 45. Min: 10 Max: 240 Default: 45
        PatrolRest_MaxMinutes = 45,
        -- Sets the usual time between a group's planned rests, with some variation. Rest after a fight is separate from this schedule.
        -- Default 3.0. Min: 0.50 Max: 48.00 Default: 3.00
        PatrolRest_EveryHours = 3.0,
        -- Controls notes, gifts, visitors and attacks at claimed safehouses or buildings you live in. Off disables these base events.
        -- Default Normal (3). Default = Normal
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Normal
        -- 4 = Often
        Safehouse_Events = 3,
        -- Some visitors may lie about why they came. They give a warning sign before you open the door.
        -- Default on.
        Safehouse_Betrayal = true,
        -- Allows groups who hate you to attack your base after warnings. Off prevents these base-event attacks.
        -- Default on.
        Safehouse_Attacks = true,
        -- Only when invited: visitors enter after you let them in at the door. Never: all visitors remain outside.
        -- Default Only when invited (1). Default = Only when invited
        -- 1 = Only when invited
        -- 2 = Never
        Safehouse_Entry = 1,
        -- Time after a place becomes your base before its first base event can happen.
        -- Default 3. Min: 0 Max: 14 Default: 3
        Safehouse_QuietDays = 3,
        -- Allows base events on dedicated servers while at least one resident is online. Off disables them there. Single player and co-op do not need this switch.
        -- Default on.
        Safehouse_Dedicated = true,
        -- Radio messages, door marks, knocks, distant gunfire and dog barks can happen in the world. Off leaves text notices only.
        -- Default on.
        Events_ScriptedEffects = true,
        -- Tunes and switches on a nearby radio for base-event messages, then turns it off. No radio: text only. Requires physical and audible base-event effects.
        -- Default on.
        Events_RadioActivate = true,
        -- Survivors may ask about your travels or how you cope: up to two questions per talk, then a ten-real-minute cooldown. Not during combat, injury or surrender.
        -- Default on.
        Talk_NpcQuestions = true,
        -- Shows requests for an NPC to follow you or walk alongside you. These conversation choices are still being reworked.
        -- Default off.
        Talk_FollowOptions = false,
        -- Visitor and ambient NPC lines show over their heads only within this many tiles, and only if you can see them or stand by the door. 0 shows them at any distance.
        -- Default 14. Min: 0 Max: 60 Default: 14
        Text_VisitorRangeTiles = 14,
        -- NPC speech appears as a bubble with the speaker's name and a pointer. A speaker off screen gets an edge arrow and the distance. Off: the game's plain floating text.
        -- Default on.
        Text_Bubbles = true,
        -- Shows a clickable Talk or Answer button while a visitor waits at your door or someone has just asked you something. Right-click still works.
        -- Default on.
        Talk_StartButton = true,
        -- How solid the talk window and the speech bubble boxes are. Text stays fully opaque. Lower is more see-through, 100 is the classic look.
        -- Default 100. Min: 40 Max: 100 Default: 100
        Talk_UIOpacity = 100,
        -- Copies NPC speech into the chat box in multiplayer, or a small log panel in single player. Only on your own screen, rate limited, names follow the stranger rule.
        -- Default Off (1). Default = Off
        -- 1 = Off
        -- 2 = Spoken to you
        -- 3 = Everything you hear
        Text_NpcChatLog = 1,
        -- Travellers may visit your door with goods to trade. Their trading conversation is still being reworked.
        -- Default off.
        Safehouse_TraderVisits = false,
        -- Places washable wall marks by the door: up to four, fading after ten game days. Off gives text only. Requires physical and audible base-event effects.
        -- Default on.
        Events_WallMarks = true,
        -- A hostile NPC never lands its first blow or shot on a player who has not attacked it unless the player had a fair chance to notice: a shouted warning, a door or window heard opening, or the NPC in plain view for the first-contact grace. Fighting back is never delayed.
        Fair_TellBeforeStrike = true,
        -- How long a hostile NPC must have been in your view before it may attack without shouting first. Min: 0.00 Max: 10.00 Default: 2.50
        Fair_FirstContactGrace = 2.5,
        -- Time between a hostile NPC's warning shout and its first blow or shot. Min: 0.50 Max: 6.00 Default: 1.50
        Fair_WarningLead = 1.5,
        -- Time between the sound of a hostile NPC opening a door or climbing through a window and its first attack on a player nearby. Min: 0.00 Max: 6.00 Default: 1.50
        Fair_EntryLead = 1.5,
        -- How long an NPC needs to open a closed window before it climbs through. The window can be heard opening. Min: 0.30 Max: 4.00 Default: 1.20
        Fair_WindowOpenTime = 1.2,
        -- How long NPCs remember who started a fight with a player. Fighting back inside this time is self-defence, and the NPC that started it does not speak like a victim. Min: 10 Max: 240 Default: 60
        Fair_FightMemory = 60,
        -- Enables warnings for crews set to warn; others attack on sight unless a chance below allows a warning. Off: hostile crews attack on sight. Careful factions keep their own rules.
        -- Default on.
        Warning_Enabled = true,
        -- Sets the share of normally kill-on-sight crews that warn anyway. Each group rolls once and keeps its result. 0 means none; 100 means all. Raids use their separate chance.
        -- Default 15. Min: 0 Max: 100 Default: 15
        Warning_ChancePercent = 40,
        -- Sets the share of raids, assassins, highway ambushers and admin-spawned attackers that warn first. 0 makes all of these crews attack on sight.
        -- Default 10. Min: 0 Max: 100 Default: 10
        Warning_RaidChancePercent = 10,
        -- Limits unanswered warnings, standoffs and hold-ups. A crew waits four fifths of this per warning or demand before the next step. Replies restart the clock, up to four times this limit.
        -- Default 8. Min: 2 Max: 60 Default: 8
        Warning_HoldSeconds = 8,
        -- Crews that warn may question you, demand a toll or call you outside before fighting. Silence, leaving, a raised gun or betrayal can start a fight. Off: only their attack warning remains.
        -- Default on.
        Encounter_Standoffs = true,
        -- How long a hostile crew holds its fire after it discovers a player: time to answer, drop the weapon, raise the hands or act first. Aiming at the crew or attacking it ends the beat at once. Min: 1.00 Max: 10.00 Default: 3.00
        Encounter_SurpriseSeconds = 3.0,
        -- How long a confronting crew waits for an answer before it asks again ('Will you answer me?'). After the third silence the crew acts: leave, warn or attack, by faction. Min: 4 Max: 30 Default: 10
        Encounter_AnswerSeconds = 10,
        -- Scales how often crews call hidden players outside instead of searching; police do this more than raiders. Player bases are always called out first. 0 disables ordinary callouts.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Encounter_CalloutPercent = 100,
        -- How long a crew outside a building waits for the player to answer or come out, with repeated calls and a warning shot, before it searches the building or leaves. The time left is shown to the player. Min: 15 Max: 180 Default: 45
        Encounter_CalloutSeconds = 45,
        -- Scales outlaw flanking during talks. A flanker circles while the leader stalls; calling it out or raising a gun makes them back off. 0 disables this betrayal.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Encounter_BetrayalPercent = 100,
        -- How long a crew searches a building where it believes a player is hiding: one man at the door, the rest room by room. Then it gives up and moves on. Min: 20 Max: 600 Default: 90
        Encounter_SearchSeconds = 90,
        -- How long an NPC keeps chasing a player it can no longer see or hear. After that it only knows where he was last seen and searches from there. Min: 2.00 Max: 30.00 Default: 6.00
        Encounter_LostSightSeconds = 6.0,
        -- A hunting, raiding or revenge crew gets ONE tip about where its target is when it sets out, off by up to this many tiles. It never follows the player's live position; it searches and gives up. Min: 0 Max: 60 Default: 12
        Encounter_FixBlurTiles = 12,
        -- Stand-offs and hold-ups lean on gestures and distance instead of text over heads: one spoken line per phase (notice, demand, turn, parting), the rest goes to the talk panel, hand signals and nods carry the in-between. Every line is picked so it does not repeat. Off: every line is shouted over the head as before.
        -- Default on.
        Encounter_ScriptedCues = true,
        -- In a hold-up one crew member, never the speaker if someone else is free, walks up to arm's length and pats you down with an animation and one of three pat-down sounds. The search lasts exactly as long as the sound. If you step away or fight, it stops and the crew reacts. Off: the old instant search.
        -- Default on.
        Robbery_FriskScripted = true,
        -- Limits revenge groups sent after a player for one grudge. Each is drawn from the original crew's survivors plus at most two reinforcements.
        -- Default 2. Min: 1 Max: 10 Default: 2
        Revenge_MaxWaves = 2,
        -- Your shoves briefly stagger NPCs, and melee hits interrupt their next swing. A staggered NPC cannot finish its attack.
        -- Default on.
        Outplay_Stagger = true,
        -- Unvisited scavenged buildings may have fewer valuables and signs of looting. Never changes buildings players entered, player bases, safehouses or outposts.
        -- Default on.
        PickedOver_Enabled = true,
        -- Scales the chance that a building is already scavenged. 100 keeps the usual chance, 300 triples it and 0 disables it.
        -- Default 100. Min: 0 Max: 300 Default: 100
        PickedOver_Strength = 100,
        -- Sets the base chance before building type and rate scaling. Nearby scavenging adds up to 60 percentage points before those adjustments.
        -- Default 5. Min: 0 Max: 100 Default: 5
        PickedOver_Baseline = 5,
        -- Already scavenged buildings may show open doors, broken windows and blood. These signs are placed only while every player is at least 40 tiles away.
        -- Default on.
        PickedOver_Visuals = true,
        -- Already scavenged buildings may contain one or two dead zombies.
        -- Default on.
        PickedOver_ZombieCorpses = true,
        -- A building may rarely contain a dead member of the group that scavenged the area, wearing that group's clothes and carrying its gear.
        -- Default on.
        PickedOver_FactionCorpses = true,
        -- NPCs killed in battles away from players leave dressed bodies at the battle site. Bodies are placed while players are 40-110 tiles away and forgotten after 14 game days.
        -- Default on.
        WarDead_Enabled = true,
        -- Outposts start with one or two ground-floor planks, adding more every four game days while players stay over 40 tiles away. Upstairs gets sheets; metal bars stay unchanged.
        -- Default on.
        Boarding_Staged = true,
        -- Crews weigh guns, ammo, distance and nearby zombies before attacking a player, and avoid poor odds. Crews sent to attack and NPCs you have hurt still fight.
        -- Default on.
        Discretion_Enabled = true,
        -- Uses each faction's view of your profession when choosing nearby encounters. Off: every profession uses that faction's general attitude.
        -- Default on.
        Reputation_ProfessionEncounters = true,
        -- During the first week, NPCs from a similar background may recognise your former profession, such as police recognising police. Requires personal reputation.
        -- Default on.
        Reputation_ProfessionRecognition = true,
        -- Time an invited visitor waits for the door to open before giving up.
        -- Default 10. Min: 2 Max: 60 Default: 10
        Safehouse_InviteMinutes = 10,
        -- Visitors face the door and wait for roughly two thirds to four thirds of this duration. Opening the door, talking or attacking ends it immediately. At 0, no initial wait.
        -- Default 30. Min: 0 Max: 120 Default: 30
        Safehouse_VisitorHoldSeconds = 30,
        -- Hear visitors knock at doors or windows from about 50 tiles away. Break-ins sound when the first inside door opens. Off: text notices only.
        -- Default on.
        Safehouse_KnockSounds = true,
        -- Chance that an overnight guest refuses to leave in the morning until you talk them out.
        -- Default 15. Min: 0 Max: 100 Default: 15
        Safehouse_SquatPercent = 15,
        -- Chance that a wounded visitor is secretly bitten. Bitten visitors refuse to be searched.
        -- Default 15. Min: 0 Max: 100 Default: 15
        Safehouse_BittenPercent = 15,
        -- Minimum time between a hostile group's threat letter, door mark, sabotage and eventual attack.
        -- Default 48. Min: 12 Max: 240 Default: 48
        Safehouse_LadderGapHours = 48,
        -- In SP/co-op, recognised bases block NPC spawning, shelter, loot and uninvited non-hostiles. Off: any slept-in or built-at place blocks spawns, as on dedicated servers.
        -- Default on.
        Safehouse_BaseFlag = true,
        -- Points needed to recognise a base, with at least two kinds of evidence. A night adds 20, a day there 10, a running generator 20 and a claim 30.
        -- Default 100. Min: 20 Max: 400 Default: 100
        Safehouse_BaseScore = 100,
        -- Chance of an event at an eligible house. Rare halves this chance; Often increases it by half.
        -- Default 12. Min: 1 Max: 100 Default: 12
        Safehouse_ChancePercent = 12,
        -- Time between event checks at the same house.
        -- Default 2. Min: 1.00 Max: 24.00 Default: 2.00
        Safehouse_CheckHours = 2.0,
        -- Minimum gap between events at one house. Rare doubles the gap; Often halves it, but never below one game day.
        -- Default 2. Min: 0.50 Max: 14.00 Default: 2.00
        Safehouse_GapDays = 2.0,
        -- Minimum gap between two visits to the same house.
        -- Default 1. Min: 1 Max: 30 Default: 1
        Safehouse_VisitGapDays = 1,
        -- Minimum gap between attacks on the same house.
        -- Default 1. Min: 1 Max: 60 Default: 1
        Safehouse_AttackGapDays = 1,
        -- World age before the first attack on a house is allowed.
        -- Default 14. Min: 0 Max: 365 Default: 14
        Safehouse_AttackMinDay = 14,
        -- Above this many zombies within 40 tiles of the front door, only armed groups visit.
        -- Default 10. Min: 0 Max: 200 Default: 10
        Safehouse_DensityMid = 10,
        -- Above this many zombies within 40 tiles of the front door, nobody visits and notes arrive half as often.
        -- Default 30. Min: 0 Max: 400 Default: 30
        Safehouse_DensityHigh = 30,
        -- Above this many zombies within 40 tiles of the front door, nothing is left at the house.
        -- Default 60. Min: 0 Max: 800 Default: 60
        Safehouse_DensityExtreme = 60,
        -- Notes and gifts can be left when every resident is at least this far from the delivery point and is not looking toward it.
        -- Default 40. Min: 10 Max: 60 Default: 40
        Safehouse_AwayTiles = 40,
        -- Notes and gifts can also be left when every resident is at least this far away, is not looking toward the delivery point and cannot see it.
        -- Default 20. Min: 5 Max: 60 Default: 20
        Safehouse_HiddenTiles = 20,
        -- How long a note waits for a safe delivery opportunity before it expires without being delivered.
        -- Default 3. Min: 1 Max: 14 Default: 3
        Safehouse_DropDeadlineDays = 3,
        -- Notes go into a mailbox within this distance of the front door. Without one, they are left on the porch.
        -- Default 10. Min: 2 Max: 20 Default: 10
        Safehouse_MailboxTiles = 10,
        -- A crew fights when its score reaches this value. Lower means bolder crews, higher means more cautious ones. Default 50. Min: 0 Max: 100 Default: 50
        Discretion_FightPercent = 50,
        -- A gun with fewer rounds than this (loaded plus reserve) counts as a melee weapon when a crew weighs a fight. Default 6. Min: 0 Max: 30 Default: 6
        Discretion_LowAmmoRounds = 6,
        -- A crew that keeps holding back because of the odds alone commits to the fight after this many seconds if you stay near. Crews short on ammunition or surrounded by zombies never commit this way. Default 45. Min: 10 Max: 600 Default: 45
        Discretion_PatienceSeconds = 45,
        -- Careful factions can calm down after provocation once their waiting time passes. Naturally hostile factions and grudges from real attacks do not fade this way.
        -- Default on.
        CalmDown_Enabled = true,
        -- Game hours until a provoked careful faction forgives. Default 2. Min: 0 Max: 24 Default: 2
        CalmDown_Hours = 2,
        -- With multiple players, outpost theft blames those inside the outpost rather than everyone. A manhunt keeps its named target instead of switching to the nearest player.
        -- Default on.
        Blame_Fair = true,
        -- NPCs break into a building only when raiding or looting, use an unlocked door first, try a window before smashing a door, and tell before entering a player's base. On by default.
        Breach_Policy = true,
        -- NPCs leave distant zombies alone unless they approach, threaten a friend or are near the NPC's post, helping the group stay on task.
        -- Default on.
        ZombieFocus_Enabled = true,
        -- Zombies inside this distance are always fought. Default 8. Min: 2 Max: 30 Default: 8
        ZombieFocus_Radius = 8,
        -- Travelling NPCs avoid zombie groups by skipping buildings, detouring, waiting or backing off. They still fight zombies that are close or coming at them.
        -- Default on.
        Caution_Enabled = true,
        -- How far ahead on their route NPCs watch for zombies. Default 12. Min: 4 Max: 30 Default: 12
        Caution_AvoidTiles = 12,
        -- Groups walk in a loose formation instead of one clump, never share a square when calm, and when they stop for a rest they move into a nearby house or shelter and idle there with different jobs: one sits in a corner, one keeps watch, two talk face to face, one comments, one stays quiet, others eat or smoke. Danger breaks it up at once. Off restores the old behaviour. On by default.
        GroupLife_Enabled = true,
        -- How wide a travelling group spreads out. 100 is the normal formation, 50 keeps them closer, 150 spreads them wider, 0 turns the formation off. Default 100. Min: 0 Max: 150 Default: 100
        GroupLife_Spread = 100,
        -- Typical length of a group rest, in game minutes. Each rest lasts between half and double of this value. Default 20, so 10 to 40. Min: 5 Max: 90 Default: 20
        GroupLife_ShelterIdleMinutes = 20,
        -- While a group rests, every member gets a role (lookout, sitter, talker, commenter, quiet, eater, smoker) with its own spot and pose. Off: they only spread out and stand. On by default.
        GroupLife_Roles = true,
        -- NPCs sometimes sneak (slow, crouched) while moving around town or scavenging. They stop sneaking when they see a player or a hostile NPC. Sneaking NPCs are harder for zombies to notice; the effect follows the zombie sight and hearing settings of the world. On by default.
        Stealth_Enabled = true,
        -- Share of the time a calm NPC or group moves sneaking. Higher near zombies. 0 never, 100 always. Default 30. Min: 0 Max: 100 Default: 30
        Stealth_Frequency = 30,
        -- How far zombies notice a sneaking NPC, as a share of the normal distance. Poor zombie sight or hearing makes sneaking stronger, eagle sight and pinpoint hearing weaker. Default 50. Min: 10 Max: 100 Default: 50
        Stealth_NoticePercent = 50,
        -- Groups scavenging away from players keep this share of each house's loot value. They stash it at a base or carry it if homeless. 0 disables this loot gain.
        -- Default 25. Min: 0 Max: 100 Default: 25
        Offline_LootPercent = 25,
        -- Lets you ask a friendly NPC group to take you in. The group keeps its own plans, offers jobs and warnings, and can leave you behind if you stay away.
        -- Default on.
        Party_Enabled = true,
        -- A group at this size refuses new members. NPCs and players both count toward the limit.
        -- Default 6. Min: 2 Max: 12 Default: 6
        Party_MaxSize = 6,
        -- Sets the leader's minimum opinion of you before you can join. Soldiers and raiders require more; gentler groups, such as families, require less.
        -- Default 20. Min: -50 Max: 80 Default: 20
        Party_MinOpinion = 20,
        -- Sets the minimum time between jobs offered by your group leader at calm stops. At 0, automatic offers stop; you can still ask for a job.
        -- Default 45. Min: 0 Max: 240 Default: 45
        Party_TaskFrequency = 45,
        -- Sets how long you can stay far from your NPC group before it leaves you behind and your membership ends.
        -- Default 10. Min: 2 Max: 60 Default: 10
        Party_AwayMinutes = 10,
        -- Allows settled groups near you to tell stories about their old lives. You can also ask for a story.
        -- Default on.
        Party_Stories = true,
        -- How often an NPC that could shoot a zombie does so. Gunfire draws more zombies, so lowering this makes NPCs walk around zombies, use melee on a lone one, and keep their guns for NPCs and players. They still shoot when cornered, hurt, defending a hurt player, on a horde that blocks the way, or on duty as military or police. 0 means never unless cornered. 100 is the old behaviour. While the world is under 14 days old the default 50 acts as 70, so early NPCs shoot more. Default 50. Min: 0 Max: 100 Default: 50
        Combat_GunsVsZombiesPercent = 50,
        -- An NPC holds fire when more than this many zombies are within 25 tiles, unless it is cornered, hurt or defending a hurt player. 0 turns the check off. Default 8. Min: 0 Max: 40 Default: 8
        Combat_GunNoiseZombies = 8,
        -- A group of at least this many zombies within 12 tiles that blocks an NPC's route may be shot at, if it is not too loud (see the noise limit). Default 5. Min: 2 Max: 30 Default: 5
        Combat_GunHordeSize = 5,
        -- Scales how far zombies and others hear NPC gunfire. At 50, a shot carries half as far. Players and NPCs hear the same reduced range. Lower it on busy servers where NPC shooting pulls hordes across the map. Default 100. Min: 10 Max: 100 Default: 100
        Combat_NpcShotNoisePercent = 100,
        -- Sets how many travelling groups each town receives when the world starts. The distant travelling group limit may allow extra groups in larger worlds.
        -- Default 3. Min: 1 Max: 4 Default: 3
        Population_SeedPerTown = 3,
        -- Prevents starting travelling groups from being placed this close to a player. Groups may still arrive later. At 0, this starting clearance is disabled.
        -- Default 150. Min: 0 Max: 400 Default: 150
        Population_SeedClearTiles = 150,
        -- Blocks new travelling groups when this many already live within 240 tiles. From day 4, the limit drops by one but never below one.
        -- Default 4. Min: 1 Max: 8 Default: 4
        Population_NeighbourGroups = 4,
        -- Beyond this distance (60-400 tiles), groups stop travelling, planning and using supplies. Members and loot stay; groups wake on approach without catching up missed time.
        -- Default 150. Min: 60 Max: 400 Default: 150
        Population_HibernateTiles = 150,
        -- Blocks new travelling groups in an area of about 120 tiles after NPC deaths. Heavy losses extend the delay. At 0, this delay is disabled.
        -- Default 3. Min: 0 Max: 60 Default: 3
        Population_RespawnCooldownDays = 3,
        -- After the death cooldown, limits a recovering area to one new group per interval. At 0, this additional recovery limit is disabled.
        -- Default 2. Min: 0 Max: 30 Default: 2
        Population_RegrowthDays = 2,
        -- Keeps spawning, waking and removal away from nearby or watching players. Also reduces rural encounters and prevents checkpoints near players or on dead-end roads.
        -- Default on.
        Spawn_FairnessEnabled = true,
        -- Minimum distance from players for random groups to appear, then walk in. Sight and loaded-map limits also apply; too large a distance can prevent spawns.
        -- Default 45. Min: 20 Max: 150 Default: 45
        Spawn_PlayerKeepOutTiles = 45,
        -- Lets welcome and starting-town groups appear nearby during a new character's first minutes. Other groups still obey the normal player clearance.
        -- Default 10. Min: 0 Max: 240 Default: 10
        Spawn_StartGraceMinutes = 10,
        -- Restores NPCs after map reloads, removes leftover zombie copies out of sight and clears zombies around returning groups. Blocked groups return farther away. Off removes this protection.
        -- Default on.
        Lifecycle_ReloadGuard = true,
        -- NPCs can become inactive or be removed only when they are at least this far from every player and out of sight.
        -- Default 60. Min: 0 Max: 200 Default: 60
        Spawn_DespawnMinTiles = 60,
        -- Sets open-countryside encounters relative to towns. At 50, the rate is half the town rate. Only suitable visitors, such as travellers and hunters, appear.
        -- Default 50. Min: 0 Max: 100 Default: 50
        Spawn_RuralDensityPercent = 50,
        -- Sets forest and wilderness encounters relative to towns. At 30, the rate is 30 percent of the town rate.
        -- Default 30. Min: 0 Max: 100 Default: 30
        Spawn_WildernessDensityPercent = 30,
        -- Sets farm and ranch encounters relative to towns. At 60, the rate is 60 percent of the town rate.
        -- Default 60. Min: 0 Max: 100 Default: 60
        Spawn_FarmDensityPercent = 60,
        -- Blockades and checkpoints are never built within this distance of a player, a player base or a place a player drove through in the last five minutes, and never on dead-end roads. Default 150. Min: 0 Max: 400 Default: 150
        Spawn_CheckpointMinTiles = 150,
        -- Adds floor splatter, bleeding drips and death pools, respecting the game's blood settings. Off: only the game's ordinary splatter and body stains remain.
        -- Default on.
        Blood_Enabled = true,
        -- Scales floor splatter, body stains, drips and pools from non-melee deaths. At 100, only the earlier body-stain behavior remains.
        -- Default 200. Min: 100 Max: 500 Default: 200
        Blood_Percent = 200,
        -- Size of the blood pool when an NPC is killed with a blade, bat or other melee weapon, and the blood on the attacker. Only used while the NPC blood amount is above 100%. Default 300%. Min: 100 Max: 800 Default: 300
        Blood_MeleeKillPercent = 300,
        -- Allows NPCs to react to world sounds and notice nearby players who run or shoot.
        -- Default on.
        Hearing_Enabled = true,
        -- Scales how far NPCs hear sounds. At 50, hearing distance is halved. Indoor player sounds and NPC gunshots use half the resulting range.
        -- Default 100. Min: 25 Max: 200 Default: 100
        Hearing_RadiusPercent = 100,
        -- Sets how much hearing distance remains when a wall blocks the sound's path. At 50, a blocked sound can be heard from half as far away.
        -- Default 50. Min: 0 Max: 100 Default: 50
        Hearing_WallPercent = 50,
        -- Reduces hearing distance for each floor between the NPC and sound. At 50, one floor leaves half the range; two floors leave one quarter.
        -- Default 50. Min: 0 Max: 100 Default: 50
        Hearing_FloorPercent = 50,
        -- Lets NPCs notice a running or recently shooting player behind them on the same floor. At 0, this rear detection is disabled.
        -- Default 8. Min: 0 Max: 12 Default: 8
        Hearing_PeripheralTiles = 8,
        -- Sets how long extra awareness from sounds and warnings lasts before the NPC returns to its normal awareness.
        -- Default 20. Min: 1 Max: 60 Default: 20
        Hearing_AlertSeconds = 20,
        -- Sets the minimum awareness after an NPC hears a sound. Confirmed contacts and final warnings still give full awareness.
        -- Default 70. Min: 0 Max: 100 Default: 70
        Hearing_AlertPercent = 70,
        -- Walking NPCs take short detours around nearby zombie crowds and fresh combat or loud noises. They wait or abandon an unsafe destination when no safe detour is found. Running and combat movement keep their existing rules.
        Caution_DangerRouting = true,
        -- Checks proposed movement legs for burning tiles, lit campfires and water. NPCs reject legs with known hazards. Applies to all movement paces.
        Caution_HazardCheck = true,
        -- Limits extra sight checks for danger detours across all NPCs. Groups wait when the limit is reached. At 0, these extra checks stop; normal perception is unaffected.
        -- Default 32. Min: 0 Max: 120 Default: 32
        Caution_DangerRaysPerSecond = 32,
        -- Shooters can advance to nearby cover and briefly step out to fire. Eligible squad gunners provide bounded covering fire. Turning this off cancels active maneuvers.
        Combat_FireManeuver = true,
        -- Maximum length of a forward cover leg. Default 4; range 2-6. Weapon distance and movement safety still apply. Min: 2 Max: 6 Default: 4
        Combat_ForwardCoverTiles = 4,
        -- Time at the firing point before returning to cover. Default 1200; range 600-2000. At most two shots; weapon cycles finish normally. Min: 600 Max: 2000 Default: 1200
        Combat_PeekWindowMs = 1200,
        -- Maximum covering fire time for one squad maneuver. Default 4000; range 2000-6000. Requires an eligible gunner and a clear friendly-safe line. Min: 2000 Max: 6000 Default: 4000
        Combat_PinWindowMs = 4000,
        -- Prefer nearby retreat destinations that hide the NPC from the threat. Existing retreat triggers, stamina and fallback destinations remain in use.
        Combat_RetreatLOS = true,
        -- Expose living Jeem residents as residents through the A-Life compatibility API when the Jeem extension is active. Needs an available actor registry. Does not replace the Companion Dogs patch. Applied at world startup; restart after changing this.
        Compat_JeemResidents = true,
        -- Enable the A-Life compatibility adapter when Point Blank is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_PointBlank = true,
        -- Enable the A-Life compatibility adapter when Wandering Zombies is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_WanderingZombies = true,
        -- Enable the A-Life compatibility adapter when Cye's Push Doors is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_CyesPushDoors = true,
        -- Enable the A-Life compatibility adapter when More Traits Definitive is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_MoreTraits = true,
        -- Enable the A-Life compatibility adapter when Project Exile is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_ProjectExile = true,
        -- Enable the A-Life compatibility adapter when Pixel Strike Indicator is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_PixelStrike = true,
        -- Enable the A-Life compatibility adapter when GaelGunStore-Firearms is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_GaelGunStore = true,
        -- Enable the A-Life compatibility adapter when Project RV Interior is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_RVInterior = true,
        -- Enable the A-Life compatibility adapter when Advanced Trajectory is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_AdvancedTrajectory = true,
        -- Enable the A-Life compatibility adapter when Auto All is active. Applied once at world startup; restart after changing this. Turning it off disables only this adapter, not the other mod.
        Compat_AutoAll = true,
        -- Let Cry of Fear monsters bite A-Life people when their own attack animation never starts, at the same pace as ordinary zombies. Applied once at world startup; restart after changing this. Does nothing without the monsters mod.
        Compat_CryOfFear = true,
        -- Mark A-Life people as already searched when they appear, so the vanilla zombie pocket loot is not rolled on their bodies. Off keeps the vanilla loot. Use it with mods that add loot to zombies.
        -- Default off.
        Compat_NoPocketLoot = false,
        -- Maximum work units per round. Higher values finish sooner but may increase server stalls. Multiplayer streaming pauses still apply.
        -- Default 100. Min: 1 Max: 2000 Default: 100
        Outposts_BuildBudget = 100,
        -- Limits new walled compounds. At 0, none are proposed. Existing sites, small camps, checkpoints and admin-built sites stay.
        -- Default 1. Min: 0 Max: 40 Default: 1
        Outposts_MaxCompounds = 1,
        -- Minimum distance between new walled compounds. Recently expired sites count until cleared. Small camps and fixed checkpoints are unchanged.
        -- Default 500. Min: 0 Max: 5000 Default: 500
        Outposts_CompoundSpacing = 500,
        -- Keeps campfires, lamps and generators in outposts, compounds, checkpoints and camps burning and switched on, refuelled while a player is near. Off leaves them as built.
        -- Default on.
        Outposts_LightsOn = true,
        -- Chance for each carried item to stay on an NPC's body. 100 drops all items; lower values drop fewer. Fixed NPC weapon drop chances take priority. Use wear below for poorer gear.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Loot_NpcDropPercent = 100,
        -- Wear added to gear and ammo on death. 0 adds no wear; 100 is full. Fixed NPC weapon conditions take priority. Guns can still drop broken: set Dropped weapon condition for working guns.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Loot_NpcWearPercent = 100,
        -- Multiplies the NPC loot percent for guns and melee weapons. Ignored while NPC weapon drop chance is a fixed choice. For example, 50 halves weapon drops.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Loot_NpcWeaponPercent = 100,
        -- Multiplies the NPC loot percent for worn armor and clothing, including rare armor. For example, 50 halves armor drops.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Loot_NpcArmorPercent = 100,
        -- Multiplies the NPC loot percent for dropped magazines and loose ammo. For example, 50 halves ammo drops.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Loot_NpcAmmoPercent = 100,
        -- Multiplies the NPC loot percent for food, medicine, tools and pocket items; identity cards always stay. For example, 50 halves supply drops.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Loot_NpcSuppliesPercent = 100,
        -- Door visits bring named individuals and small groups with their own history, needs and conversation. Off: visits work exactly as before.
        -- Default on.
        Visitors_Persons = true,
        -- How often a guest inside your home starts talking by themselves, for example asking about the TV. Rare waits longer, Often waits less. Off: guests only answer when you talk.
        -- Default Normal (3). Default = Normal
        -- 1 = Off
        -- 2 = Rare
        -- 3 = Normal
        -- 4 = Often
        Visitors_ProactiveEvents = 3,
        -- Real seconds that must pass after a guest speaks up before the same player is prompted again. Higher is calmer.
        -- Default 240. Min: 60 Max: 1800 Default: 240
        Visitors_EventMinGapSeconds = 240,
        -- A guest never stays inside longer than this. Most guests leave sooner. Raise it to let people ask to stay for a few nights; more time inside means more risk and more help.
        -- Default 1. Min: 1 Max: 48 Default: 1
        Visitors_StayHours = 1,
        -- Pairs and trios of related people can knock together instead of one stranger at a time. Off: one visitor per visit.
        -- Default on.
        Visitors_Parties = true,
        -- Once you have really helped someone, this chance decides whether a later visit is that person coming back. 0 means never.
        -- Default 15. Min: 0 Max: 50 Default: 15
        Visitors_ReturningChance = 15,
        -- Guests inside your home walk around, sit on furniture, read and look out of windows instead of standing where they were let in. Off: they stand still.
        -- Default on.
        Visitors_Life = true,
        -- Adult guests can ask for clean clothes and change in a closed room, down to the default body and never beyond. Off: no clothes changes.
        -- Default on.
        Visitors_ChangeClothes = true,
        -- Strict: a guest only changes in a room with the door shut, and not while you stand near the door. Normal: the door may be open.
        -- Default Strict (1). Default = Strict
        -- 1 = Strict
        -- 2 = Normal
        Visitors_Privacy = 1,
        -- Adult guests can show gentle, optional, non-explicit warmth after real trust and always accept a no. Off: no flirting at all.
        -- Default On (2). Default = On
        -- 1 = Off
        -- 2 = On
        Visitors_Flirt = 2,
        -- Guests can carry and read books and newspapers and discuss them with you. Off: no book conversations.
        -- Default on.
        Visitors_Books = true,
        -- Words spoken by guests also appear in the chat window, not only as speech bubbles. Needs the chat mirror of the talk interface.
        -- Default on.
        Visitors_ChatMirror = true,
        -- Adds extra visitor lines to the QA dump and the flight recorder to help find problems. Leave off for normal play.
        -- Default off.
        Visitors_Debug = false,
        -- Established outposts can send three existing squads together. Their people leave the site; this does not create extra survivors.
        -- Default on.
        Outposts_TrioEnabled = true,
        -- Game days between coordinated departures from each outpost. Set 0 to stop these departures.
        -- Default 5. Min: 0.00 Max: 120.00 Default: 5.00
        Outposts_TrioGapDays = 5.0,
        -- Maximum outposts with a coordinated group away at once. Set 0 to stop departures. The War Challenge raises this limit to 3.
        -- Default 2. Min: 0 Max: 8 Default: 2
        Outposts_TrioMaxActive = 2,
        -- An outpost must exist this many game days before sending three squads. At 0, a new site can qualify if it has enough people.
        -- Default 7. Min: 0.00 Max: 120.00 Default: 7.00
        Outposts_TrioMinAgeDays = 7.0,
        -- Automatic keeps these groups off on Light difficulty and on otherwise. Choose Off or On to override that rule in any world preset.
        -- Default Automatic: off on Light, on otherwise (1). Default = Automatic: off on Light, on otherwise
        -- 1 = Automatic: off on Light, on otherwise
        -- 2 = Off
        -- 3 = On
        Outposts_MegaEnabled = 1,
        -- Game days between large-group departures from each outpost. They use existing people and weaken the site while away. Set 0 to stop departures.
        -- Default 12. Min: 0.00 Max: 120.00 Default: 12.00
        Outposts_MegaGapDays = 12.0,
        -- People combined from an outpost and its existing squads. A site without enough people cannot send the group. Rendering remains spread across frames.
        -- Default 16. Min: 12 Max: 40 Default: 16
        Outposts_MegaSize = 16,
        -- Maximum large marching groups away at once, with one per faction. Set 0 to stop departures. The War Challenge raises the world limit to 2.
        -- Default 1. Min: 0 Max: 8 Default: 1
        Outposts_MegaMaxActive = 1,
        -- An outpost must exist this many game days before sending a large group. At 0, a new site can qualify if it has enough people.
        -- Default 10. Min: 0.00 Max: 120.00 Default: 10.00
        Outposts_MegaMinAgeDays = 10.0,
        -- Adds rare, tougher hostile factions after their earliest day. Their weapons and clothing use existing game items. Off keeps these new factions out.
        -- Default on.
        Late_FactionsEnabled = true,
        -- Earliest world day for the new raider and hazmat factions. Special forces have a separate earliest day. At 0, no minimum day applies.
        -- Default 14. Min: 0 Max: 3650 Default: 14
        Late_FactionStartDay = 14,
        -- Scales later weapon, ammunition and armour progression for new groups after day 13. The early worn-weapon curve stays unchanged. Set 0 to disable this progression.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Late_WeaponScalePercent = 100,
        -- Earliest world day for rare four-to-six-person special forces groups. At 0, no minimum day applies; late hostile factions must still be enabled.
        -- Default 21. Min: 0 Max: 3650 Default: 21
        Late_SpecialForcesStartDay = 21,
        -- Chance to react to a distant hit, close bullet crack or witnessed killing. People need a real cue, not knowledge of a hidden shooter. Set 0 to disable.
        -- Default 100. Min: 0 Max: 100 Default: 100
        Combat_SniperAwareness = 100,
        -- Shots from at least this many tiles can trigger distant-fire reactions. Scoped rifles can qualify closer; normal sight and ownership checks still apply.
        -- Default 40. Min: 10 Max: 200 Default: 40
        Combat_SniperAwarenessTiles = 40,
        -- Volume of human footsteps for nearby A-Life survivors on this computer. Set 0 to turn them off. Does not change noise heard by zombies.
        -- Default 100. Min: 0 Max: 200 Default: 100
        Audio_NpcFootsteps = 100,
        -- Military checkpoint crews are hostile by default and warn once before firing. Off restores their careful stance. Earned relations and combat safety still apply.
        -- Default on.
        Outposts_BridgeHostile = true,
    },
    ALifeDriving = {
        -- NPC driving, passenger crews and automatic multiplayer control handover. Driving debug controls require admin access.
        Enabled = true,
        -- By car spawns create functioning vehicles with seated NPC crews. They drive to a reachable nearby road and dismount. Requires loaded terrain.
        VehicleArrivals = true,
    },
    SleepWithFriends = {
        RTorIG = 1,
        -- Min: 0.10 Max: 24.00 Default: 1.00
        SleepLength = 1.0,
        -- Min: 0.00 Max: 10.00 Default: 1.00
        EndurMulti = 1.0,
        AutoWake = true,
        DebugLogs = true,
    },
    TWF_GC = {
        -- Enabled: adjacent drops go into an existing nearby pile.
        -- Disabled: proximity is ignored and a new pile is created after X items on the same tile.
        -- 
        -- Default: Enabled.
        AbsorbNearbyPile = true,
        -- How many items must be on one tile before a new Clutter Pile is created when nearby absorb is disabled.
        -- Range: 1–30.
        -- Default: 12. Min: 1 Max: 30 Default: 12
        Threshold = 12,
    },
    GridRV = {
        -- How often the Nomad RV turns up in parking lots, trailer parks, campgrounds and traffic jams. 100 is normal, 200 twice as often, 0 never. Min: 0 Max: 1000 Default: 100
        SpawnRate = 100,
        -- How common the RV Armour Manual is. You need it to weld the spiked ram and side armour. Default = Normal
        -- 1 = Extremely Rare
        -- 2 = Rare
        -- 3 = Normal
        -- 4 = Common
        -- 5 = Abundant
        ManualRarity = 3,
        -- Finished RV armour (spiked ram, side armour, window grilles, entry door armour) found in mechanic and metalwork spots. None means it has to be welded. Default = None
        -- 1 = None
        -- 2 = Extremely Rare
        -- 3 = Rare
        -- 4 = Normal
        -- 5 = Common
        -- 6 = Abundant
        KitRarity = 1,
    },
}
