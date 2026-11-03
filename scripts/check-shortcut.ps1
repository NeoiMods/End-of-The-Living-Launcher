# Az asztali parancsikon ellenőrzése.
$lnk = Join-Path ([Environment]::GetFolderPath('Desktop')) 'End of The Living Launcher.lnk'
if (-not (Test-Path -LiteralPath $lnk)) { Write-Output 'NINCS_PARANCSIKON'; exit 1 }
$ws = New-Object -ComObject WScript.Shell
$s = $ws.CreateShortcut($lnk)
Write-Output ('LNK: ' + $lnk)
Write-Output ('Target: ' + $s.TargetPath)
Write-Output ('Icon:   ' + $s.IconLocation)
Write-Output ('Dir:    ' + $s.WorkingDirectory)
Write-Output ('Exists: ' + (Test-Path -LiteralPath $s.TargetPath))
