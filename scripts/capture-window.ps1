# Az Electron launcher ablakának lefotózása (ellenőrzéshez), PrintWindow-nal,
# így akkor is működik, ha az ablak más ablakok mögött van.
# Használat: powershell -NoProfile -File scripts/capture-window.ps1 -Out shot.png
param([string]$Out = 'window.png', [string]$Title = 'End of The Living Launcher')

Add-Type -AssemblyName System.Drawing

$sig = @'
using System;
using System.Runtime.InteropServices;
public class Win32Cap {
  [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hWnd, IntPtr hdcBlt, uint nFlags);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
}
'@
Add-Type -TypeDefinition $sig

$proc = Get-Process | Where-Object { $_.MainWindowTitle -eq $Title } | Select-Object -First 1
if (-not $proc) { Write-Error "Nem található ablak ezzel a címmel: $Title"; exit 1 }

[void][Win32Cap]::ShowWindow($proc.MainWindowHandle, 9)
[void][Win32Cap]::SetForegroundWindow($proc.MainWindowHandle)
Start-Sleep -Milliseconds 1500

$rect = New-Object Win32Cap+RECT
[void][Win32Cap]::GetWindowRect($proc.MainWindowHandle, [ref]$rect)
$w = $rect.Right - $rect.Left
$h = $rect.Bottom - $rect.Top
if ($w -le 0 -or $h -le 0) { Write-Error "Hibás ablakméret: $w x $h"; exit 1 }

$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$hdc = $g.GetHdc()
# 2 = PW_RENDERFULLCONTENT (Chromium/Electron ablakokhoz kell)
[void][Win32Cap]::PrintWindow($proc.MainWindowHandle, $hdc, 2)
$g.ReleaseHdc($hdc)
$g.Dispose()

$dir = Split-Path -Parent $Out
$file = Join-Path (Resolve-Path -LiteralPath $dir).Path (Split-Path -Leaf $Out)
$bmp.Save($file, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "Kész: $file ($w x $h)"
