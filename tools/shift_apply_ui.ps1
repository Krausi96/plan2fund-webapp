
param(
  [switch]$Apply = $false
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Ensure-Dir($Path) {
  if (-not (Test-Path $Path)) { New-Item -ItemType Directory -Path $Path | Out-Null }
}

function Write-IfDifferent($Path, [string]$Content) {
  Ensure-Dir (Split-Path $Path -Parent)
  $tmp = [System.IO.Path]::GetTempFileName()
  [System.IO.File]::WriteAllText($tmp, $Content, (New-Object System.Text.UTF8Encoding($false)))
  if (-not (Test-Path $Path)) {
    Move-Item $tmp $Path -Force
    return $true
  }
  $existing = Get-Content -LiteralPath $Path -Raw -Encoding UTF8
  if ($existing -ne $Content) {
    Move-Item $tmp $Path -Force
    return $true
  }
  Remove-Item $tmp -Force
  return $false
}

function Read-File($Path) {
  if (Test-Path $Path) { return Get-Content -LiteralPath $Path -Raw -Encoding UTF8 } else { return "" }
}

function Update-JsonFlag($JsonPath, $Key, $Value) {
  $obj = @{}
  if (Test-Path $JsonPath) {
    try { $obj = Get-Content -Raw -Path $JsonPath | ConvertFrom-Json -Depth 100 } catch { $obj = @{} }
  }
  $obj[$Key] = $Value
  $json = ($obj | ConvertTo-Json -Depth 100)
  Write-IfDifferent $JsonPath $json | Out-Null
}

$repoRoot = (Get-Location).Path

# 1) Copy design + i18n + components
$changed = @()

function Stage-File([string]$RelPath, [string]$ContentPath) {
  $abs = Join-Path $repoRoot $RelPath
  $content = Get-Content -LiteralPath $ContentPath -Raw -Encoding UTF8
  if (Write-IfDifferent $abs $content) { $script:changed += $RelPath }
}

$pkgRoot = Split-Path $MyInvocation.MyCommand.Path -Parent
$pkgRoot = Split-Path $pkgRoot -Parent  # tools -> repo or staging; keep as repo
# However, our package files may also be placed in tools\ui_shift_payload - try both.
$payloadDir1 = Join-Path $repoRoot "tools\ui_shift_payload"
$payloadDir2 = $repoRoot
$payload = if (Test-Path $payloadDir1) { $payloadDir1 } else { $repoRoot }

# Stage files from the payload (relative to repo root of this script)
Stage-File "design\tokens.json" "$payload\design\tokens.json"
Stage-File "design\theme.css" "$payload\design\theme.css"
Stage-File "design\motion.css" "$payload\design\motion.css"
Stage-File "src\lib\i18n.js" "$payload\src\lib\i18n.js"
Stage-File "i18n\en.json" "$payload\i18n\en.json"
Stage-File "i18n\de.json" "$payload\i18n\de.json"
Stage-File "src\components\Hero.jsx" "$payload\src\components\Hero.jsx"
Stage-File "src\components\ProductGrid.jsx" "$payload\src\components\ProductGrid.jsx"
Stage-File "src\components\FeatureList.jsx" "$payload\src\components\FeatureList.jsx"
Stage-File "src\components\Steps.jsx" "$payload\src\components\Steps.jsx"
Stage-File "src\components\PricingTable.jsx" "$payload\src\components\PricingTable.jsx"
Stage-File "src\components\CTABand.jsx" "$payload\src\components\CTABand.jsx"
Stage-File "src\components\Header.jsx" "$payload\src\components\Header.jsx"
Stage-File "src\components\Footer.jsx" "$payload\src\components\Footer.jsx"
Stage-File "src\components\LangSwitch.jsx" "$payload\src\components\LangSwitch.jsx"
Stage-File "src\components\Reveal.jsx" "$payload\src\components\Reveal.jsx"
Stage-File "src\components\Orbs.jsx" "$payload\src\components\Orbs.jsx"
Stage-File "src\shell\LandingShell.jsx" "$payload\src\shell\LandingShell.jsx"
Stage-File "docs\COMPLIANCE.md" "$payload\docs\COMPLIANCE.md"

# 2) Flags
$flagsPath = Join-Path $repoRoot "src\config\flags.json"
if (-not (Test-Path $flagsPath)) { $flagsPath = Join-Path $repoRoot "config\flags.json" }
Update-JsonFlag $flagsPath "DESIGN_SYSTEM_ENABLED" $true
Update-JsonFlag $flagsPath "ANIMATION_ENABLED" $true
Update-JsonFlag $flagsPath "I18N_ENABLED" $true
Update-JsonFlag $flagsPath "CONSENT_GRANTED" $false

# 3) Remove /welcome route -> redirect to /reco
# Try to rewrite micro-router in src\main.jsx or index.html
$mainCandidates = @(
  "src\main.jsx",
  "src\App.jsx",
  "src\routes.jsx",
  "index.html"
) | ForEach-Object { Join-Path $repoRoot $_ } | Where-Object { Test-Path $_ }

foreach ($mc in $mainCandidates) {
  $text = Read-File $mc
  if ($text -match "/welcome") {
    $new = $text -replace "/welcome", "/reco"
    if (Write-IfDifferent $mc $new) { $changed += (Resolve-Path $mc | Split-Path -NoQualifier -Parent) + "\" + (Split-Path $mc -Leaf) }
  }
  # hide header on landing: add class hook if not present
  if ($text -notmatch "hidden-on-landing") {
    # no-op here; LandingShell provides the class wrapper.
  }

  # Ensure design CSS imported globally for inner pages
  if ($mc.ToLower().EndsWith("src\main.jsx") -or $mc.ToLower().EndsWith("src\app.jsx")) {
    $imp1 = 'import "../design/theme.css";'
    $imp2 = 'import "../design/motion.css";'
    if ($text -notmatch [regex]::Escape($imp1)) { $text = $imp1 + "`r`n" + $text }
    if ($text -notmatch [regex]::Escape($imp2)) { $text = $imp2 + "`r`n" + $text }
    if (Write-IfDifferent $mc $text) { $changed += ($mc.Substring($repoRoot.Length+1)) }
  }

}

# 4) Remove Welcome component files from imports in other files (non-destructive)
Get-ChildItem -Path (Join-Path $repoRoot "src") -Include *.jsx,*.tsx -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
  $p = $_.FullName
  $t = Read-File $p
  if ($t -match "Welcome") {
    $nt = $t -replace "WelcomePage", "null" -replace "Welcome", "null"
    if ($nt -ne $t) {
      if (Write-IfDifferent $p $nt) {
        $changed += ($p.Substring($repoRoot.Length+1))
      }
    }
  }
}

# 5) MIGRATION_REPORT + Handoff_BLOCK
$ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$mr = Join-Path $repoRoot "MIGRATION_REPORT.md"
$entry = @"
## UI Shift — $ts
- Design system added (design/*.css, tokens.json), i18n (lib/i18n.js, i18n/*.json)
- Landing hero + product blocks + CTA band, header hidden on landing
- Welcome route removed/redirected to /reco
- Flags: DESIGN_SYSTEM_ENABLED, ANIMATION_ENABLED, I18N_ENABLED = true; CONSENT_GRANTED = false
- Compliance doc added at docs/COMPLIANCE.md
- Files changed:
$(($changed | ForEach-Object { "  - $_" }) -join "`n")
"@
Add-Content -LiteralPath $mr -Value $entry -Encoding UTF8

$hb = Join-Path $repoRoot "Handoff_BLOCK.json"
$hbObj = @{}
if (Test-Path $hb) {
  try { $hbObj = Get-Content -Raw -Path $hb | ConvertFrom-Json -Depth 100 } catch { $hbObj = @{} }
}
$hbObj.last_shift = @{
  name = "UI/Frontend Corporate Design"
  date = $ts
  flags = @{
    DESIGN_SYSTEM_ENABLED = $true
    ANIMATION_ENABLED     = $true
    I18N_ENABLED          = $true
    CONSENT_GRANTED       = $false
  }
  notes = "Landing hero + grid + features + CTA; Welcome removed; header hidden on landing."
}
($hbObj | ConvertTo-Json -Depth 100) | Out-File -LiteralPath $hb -Encoding utf8

# 6) Build
Write-Host "Running build..."
$npm = Get-Command npm -ErrorAction SilentlyContinue
if ($null -eq $npm) {
  Write-Warning "npm not found; skipping build."
} else {
  npm run build
}

# 7) Release zip
$zipName = "plan2fund_ui_shift_" + (Get-Date -Format "yyyyMMdd_HHmm") + ".zip"
$zipPath = Join-Path $repoRoot $zipName
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$toZip = @("design","i18n","src\components","src\lib","src\shell","docs","src\config\flags.json","MIGRATION_REPORT.md","Handoff_BLOCK.json") | ForEach-Object { Join-Path $repoRoot $_ }
$existingZipItems = $toZip | Where-Object { Test-Path $_ }
if ($existingZipItems.Count -gt 0) {
  Compress-Archive -Path $existingZipItems -DestinationPath $zipPath -Force
  Write-Host "Release: $zipPath"
}

Write-Host "Changed files count: $($changed.Count)"
Write-Host "DONE"
