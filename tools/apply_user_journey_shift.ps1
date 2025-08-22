param([switch]$Apply=$false)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Ensure-Dir($p){ if(-not(Test-Path $p)){ New-Item -ItemType Directory -Path $p | Out-Null } }
function Write-IfDifferent($Path, [string]$Content){
  Ensure-Dir (Split-Path $Path -Parent)
  $tmp=[System.IO.Path]::GetTempFileName()
  [System.IO.File]::WriteAllText($tmp,$Content,(New-Object System.Text.UTF8Encoding($false)))
  if(-not(Test-Path $Path)){ Move-Item $tmp $Path -Force; return $true }
  $existing = Get-Content -LiteralPath $Path -Raw -Encoding UTF8
  if($existing -ne $Content){ Move-Item $tmp $Path -Force; return $true }
  Remove-Item $tmp -Force; return $false
}

$repo = (Get-Location).Path
$changed=@()

function Stage($rel){
  # Go one level up from /tools into repo root
  $from = Join-Path (Join-Path $PSScriptRoot "..") $rel
  $to   = Join-Path $repo $rel

  if (Test-Path $from) {
    $content = Get-Content -LiteralPath $from -Raw -Encoding UTF8
    if (Write-IfDifferent $to $content) { 
      $script:changed += $rel 
    }
  } else {
    Write-Warning "Missing source file: $from"
  }
}

# Stage design
Stage "src\design\theme.css"
Stage "src\design\motion.css"

# i18n + lib
Stage "src\i18n\en.json"
Stage "src\i18n\de.json"
Stage "src\i18n\es.json"
Stage "src\i18n\fr.json"
Stage "src\lib\i18n.js"
Stage "src\lib\header.mount.jsx"
Stage "src\lib\celebrate.js"
Stage "src\lib\breadcrumbs.mount.jsx"


# components + shell
foreach($f in @("Header.jsx","LangSwitch.jsx","Footer.jsx","Orbs.jsx","Reveal.jsx","Hero.jsx","UseCases.jsx","Offers.jsx","Included.jsx","PersonaBar.jsx","Steps.jsx","ChoosePath.jsx","CTABand.jsx")){
  Stage ("src\components\" + $f)
}
Stage "src\shell\LandingShell.jsx"

# legal pages + compliance
foreach($f in @("gdpr.html","terms.html","impressum.html","contact.html")){ Stage ("public\" + $f) }
Stage "docs\COMPLIANCE.md"

# Flags: ensure JSON exists and update keys
$flagsCandidates = @("src\config\flags.json","config\flags.json") | ForEach-Object { Join-Path $repo $_ }
$flagsPath = $flagsCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if(-not $flagsPath){ $flagsPath = Join-Path $repo "src\config\flags.json" }
$obj=@{}
if(Test-Path $flagsPath){ try{ $obj = Get-Content -Raw -Path $flagsPath | ConvertFrom-Json -Depth 100 } catch { $obj=@{} } }
$obj.DESIGN_SYSTEM_ENABLED = $true
$obj.ANIMATION_ENABLED     = $true
$obj.I18N_ENABLED          = $true
$obj.CONSENT_GRANTED       = $false
$obj.CHECKOUT_ENABLED      = $false
($obj | ConvertTo-Json -Depth 100) | Out-File -LiteralPath $flagsPath -Encoding utf8
$changed += ($flagsPath.Substring($repo.Length+1))

# Patch entrypoints: inject global imports + landing mount + breadcrumb mount
$entries = @("src\main.jsx","src\App.jsx","src\routes.jsx") | ForEach-Object { Join-Path $repo $_ } | Where-Object { Test-Path $_ }
foreach($ep in $entries){
  $t = Get-Content -LiteralPath $ep -Raw -Encoding UTF8
  # Remove any .jsxx variants and normalize header helper to .jsx
  $t = $t -replace '\.\/lib\/header\.mount\.jsxx','./lib/header.mount.jsx'
  $t = $t -replace '\.\/lib\/header\.mount\.js\b','./lib/header.mount.jsx'
  # Add imports if missing
  foreach($imp in @('import "../design/theme.css";','import "../design/motion.css";','import "./lib/header.mount.jsx";','import "./lib/celebrate.js";','import "./landing.boot.jsx";','import "./lib/breadcrumbs.mount.jsx";')){
    if($t -notmatch [regex]::Escape($imp)){ $t = $imp + "`r`n" + $t }
  }
  Set-Content -LiteralPath $ep -Value $t -Encoding UTF8
  $changed += ($ep.Substring($repo.Length+1))
}

# MIGRATION + HANDOFF
$ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$mr = Join-Path $repo "MIGRATION_REPORT.md"
$entry = @"
## User Journey Shift â€” $ts
- Stripe-style landing applied: Hero â†’ Offers â†’ Use Cases â†’ Included â†’ Persona bar â†’ Steps â†’ Choose path â†’ CTA â†’ Footer
- Header: Logo â€¢ Personal â€¢ Organisations â€¢ Build your Freedom â€¢ Language (EN/DE/ES/FR)
- Footer: Contact â€¢ Terms & Conditions â€¢ Data Privacy â€¢ Legal Notice â€¢ Â©2025
- Breadcrumbs mounted on inner pages; header hidden on landing
- Celebrations on purchase/download/export; legal public pages added
- Flags updated: DESIGN_SYSTEM_ENABLED, ANIMATION_ENABLED, I18N_ENABLED = true; CONSENT_GRANTED=false; CHECKOUT_ENABLED=false
- Files changed:
$(($changed | ForEach-Object { "  - $_" }) -join "`n")
"@
Add-Content -LiteralPath $mr -Value $entry -Encoding UTF8

$hb = Join-Path $repo "Handoff_BLOCK.json"
$hbObj=@{}; if(Test-Path $hb){ try{ $hbObj = Get-Content -Raw -Path $hb | ConvertFrom-Json -Depth 100 } catch { $hbObj=@{} } }
$hbObj.last_shift = @{ name="User Journey Shift"; date=$ts; notes="Landing rebuilt with personas and legal; header/footer; mounts via main.jsx." }
($hbObj | ConvertTo-Json -Depth 100) | Out-File -LiteralPath $hb -Encoding utf8

# Build
$npm = Get-Command npm -ErrorAction SilentlyContinue
if($npm){ npm run build } else { Write-Warning "npm not found; skipping build." }

Write-Host "DONE"

