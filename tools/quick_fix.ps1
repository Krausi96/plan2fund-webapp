$ErrorActionPreference = "Stop"
$repo = (Get-Location).Path

# 1) Inject global imports and remove /welcome safely
$entrypoints = @("src\main.jsx","src\App.jsx","src\routes.jsx") | ForEach-Object { Join-Path $repo $_ } | Where-Object { Test-Path $_ }
$imports = @(
  'import "../design/theme.css";',
  'import "../design/motion.css";',
  'import "./lib/header.mount.js";',
  'import "./lib/celebrate.js";'
)
foreach ($ep in $entrypoints) {
  $t = Get-Content -LiteralPath $ep -Raw -Encoding UTF8
  foreach ($imp in $imports) {
    if ($t -notmatch [regex]::Escape($imp)) { $t = $imp + "`r`n" + $t }
  }
  $t = $t -replace '/welcome','/reco'
  Set-Content -LiteralPath $ep -Value $t -Encoding UTF8
  Write-Host ("Fixed: " + $ep.Substring($repo.Length+1))
}

# 2) Ensure flags
$flagsCandidates = @("src\config\flags.json","config\flags.json") | ForEach-Object { Join-Path $repo $_ }
foreach ($f in $flagsCandidates) {
  if (Test-Path $f) {
    try { $obj = Get-Content -Raw -Path $f | ConvertFrom-Json -Depth 100 } catch { $obj = @{} }
    $obj.DESIGN_SYSTEM_ENABLED = $true
    $obj.ANIMATION_ENABLED = $true
    $obj.I18N_ENABLED = $true
    $obj.CONSENT_GRANTED = $false
    ($obj | ConvertTo-Json -Depth 100) | Set-Content -Path $f -Encoding UTF8
    Write-Host ("Flags updated: " + $f.Substring($repo.Length+1))
  }
}

# 3) Append migration + update handoff (ASCII only to avoid encoding issues)
$ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$mr = Join-Path $repo "MIGRATION_REPORT.md"
$entry = "## Quick fix - $ts`n- Injected global design imports and header/celebrate hooks`n- Replaced '/welcome' with '/reco' routes`n"
Add-Content -Path $mr -Value $entry -Encoding UTF8

$hb = Join-Path $repo "Handoff_BLOCK.json"
if (Test-Path $hb) {
  try { $hbObj = Get-Content -Raw -Path $hb | ConvertFrom-Json -Depth 100 } catch { $hbObj = @{} }
  $hbObj.last_shift = @{ name = "UI quick fix"; date = $ts; notes = "Imports injected; welcome route removed." }
  ($hbObj | ConvertTo-Json -Depth 100) | Set-Content -Path $hb -Encoding UTF8
}

# 4) Build
$npm = Get-Command npm -ErrorAction SilentlyContinue
if ($npm) { npm run build } else { Write-Warning "npm not found; skipping build." }

Write-Host "DONE"
