# PZO Patch - Phobos zReVaccin Stub

Standalone override mod. It does **not** touch the workshop folder.

## Why

`PhobosChemistryPathways` ships a stub trait definition:

```
character_trait_definition zrevac:zreantibodies
{
    IsProfessionTrait = true,
    DisabledInMultiplayer = true,
    CharacterTrait = zrevac:zreantibodies,
    Cost = 0,
}
```

`UIName` and `UIDescription` are missing, so `CharacterTraitDefinition.<init>` hands
`null` to `Translator.getTextInternal`, which throws `NullPointerException` during
`ScriptManager.Load` -> `IOException: Script load errors` -> the game exits before
the main menu (`Logs/2026-11-16_15-55_DebugLog.txt`, 15:58:12).

## How

`42/media/scripts/characters/PCP_ZReVaccinStubs.txt` here has the same virtual
path as the file inside `PhobosChemistryPathways`. Project Zomboid resolves
`media/` through one virtual filesystem and the mod that loads **later** wins, so
this copy replaces the broken one. The workshop file stays untouched.

## Requirements

- `PhobosChemistryPathways` enabled (`require=` + `loadModAfter=` in mod.info).
- This mod enabled and **after** Phobos in the load order. ModLoadOrderSorter
  honours `loadModAfter`, but check the order in the mod manager anyway.

## Verify after launch

`Logs/<newest>_DebugLog.txt` must contain:

```
mod "PZOPatchPhobosZReVaccinStub" overrides media/scripts/characters/PCP_ZReVaccinStubs.txt
```

If that line is missing, both copies loaded (duplicate definition) and the crash
will still be there - then use the forked-copy route instead.

## Layout

- `42/media/...` - the override file the game loads
- `raw/...` - untouched upstream copy (outside `media/`, ignored by the game)
- `patch.json` - manifest for the launcher / packaging

## Later

Packaging is deliberately not done here. When it is packaged, this folder is the
unit; `raw/` and `patch.json` should be excluded or kept as metadata.
