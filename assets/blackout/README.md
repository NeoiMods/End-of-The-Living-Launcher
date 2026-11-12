# Blackout Protocol – config csomag (a launcherbe építve)

Project Zomboid **B42.22.2** · profil: **Blackout Protocol** · **719 mod** · frissítve: 2026-11-12

A launcher ezt a mappát **minden egyjátékos indítás előtt** bemásolja a játék
`%USERPROFILE%\Zomboid` mappájába, a felülírt fájlokról pedig mentést készít
(`Zomboid\eotl-backup-<dátum>`). Kézzel nem kell másolgatni semmit.

## Mi van benne

| Fájl | Hova kerül | Mi ez |
|---|---|---|
| `Zomboid/Lua/pz_modlist_settings.cfg` | `Zomboid\Lua\` | a modprofilok, benne a **Blackout Protocol 719 moddal, a helyes betöltési sorrendben** |
| `Zomboid/Sandbox Presets/NeoiMods Ajanlott.cfg` | `Zomboid\Sandbox Presets\` | magyar sandbox preset új játékhoz |
| `Zomboid/Sandbox Presets/Neoi-Suggested.cfg` | `Zomboid\Sandbox Presets\` | ugyanaz angol néven |
| `Zomboid/options.ini` | `Zomboid\` | grafika (fullscreen, textúra-lépcső) |
| `Zomboid/Lua/keys*.ini`, `modOptions.ini` | `Zomboid\Lua\` | billentyűk és mod-beállítások |
| `Zomboid/Server/NeoiMods*` | `Zomboid\Server\` | a NeoMods szerver sandbox beállításai |
| `Zomboid/sounds.ini`, `PZO_mod_compat.txt` | `Zomboid\` | hangkeverés, PZO kompatibilitási lista |

A `reference/` mappa csak ellenőrzéshez van (a csomag saját README-je és a
modlista szöveges változata); a játékba nem kerül be.

## Fontos

- A játék a **`ProjectZomboid64.bat`** fájlon keresztül indul, ezért a
  memóriabeállítás (`-Xmx`) ott él. A launcher ezt is beállítja, ha a fájl írható.
- A crash-t okozó modok (`Waterpipes`, `LastCupCoffee`,
  `PlumbingFuelGeneratorAddonB42`) nincsenek a 719-es profilban.
- Új játéknál a sandbox preset: **NeoiMods Ajanlott** (vagy **Neoi-Suggested**).
