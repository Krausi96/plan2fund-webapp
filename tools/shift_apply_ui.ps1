param([switch]$Apply=$false)
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
function Ensure-Dir($p){ if(-not(Test-Path $p)){ New-Item -ItemType Directory -Path $p | Out-Null } }
function Write-IfDifferent($Path,[string]$Content){ Ensure-Dir (Split-Path $Path -Parent); $tmp=[System.IO.Path]::GetTempFileName(); [System.IO.File]::WriteAllText($tmp,$Content,(New-Object System.Text.UTF8Encoding($false))); if(-not(Test-Path $Path)){ Move-Item $tmp $Path -Force; return $true } $existing=Get-Content -LiteralPath $Path -Raw -Encoding UTF8; if($existing -ne $Content){ Move-Item $tmp $Path -Force; return $true } Remove-Item $tmp -Force; return $false }
function Read-Text($p){ if(Test-Path $p){ Get-Content -LiteralPath $p -Raw -Encoding UTF8 } else { "" } }
function Stage($rel,$payload){ $abs=Join-Path (Get-Location).Path $rel; $content=Get-Content -LiteralPath $payload -Raw -Encoding UTF8; if(Write-IfDifferent $abs $content){ $script:changed+=$rel } }
$repo=(Get-Location).Path; $changed=@(); $payload=$repo
foreach($f in @("design\theme.css","design\motion.css","src\lib\i18n.js","src\lib\header.mount.js","src\lib\celebrate.js","i18n\en.json","i18n\de.json","src\components\Hero.jsx","src\components\UseCases.jsx","src\components\Offers.jsx","src\components\Included.jsx","src\components\Steps.jsx","src\components\ChoosePath.jsx","src\components\CTABand.jsx","src\components/Header.jsx","src\components/Footer.jsx","src\components\LangSwitch.jsx","src\components\Reveal.jsx","src\components\Orbs.jsx","src\shell\LandingShell.jsx","docs\COMPLIANCE.md","public\gdpr.html","public\terms.html","public\impressum.html","public\contact.html","public\pricing.html","public\examples.html")){ Stage $f "$payload\$f" }
$flags=@("src\config\flags.json","config\flags.json")|%{Join-Path $repo $_}|?{Test-Path $_}|Select-Object -First 1
if($flags){ $obj=@{}; try{$obj=Get-Content -Raw -Path $flags|ConvertFrom-Json -Depth 100}catch{$obj=@{}}; $obj.DESIGN_SYSTEM_ENABLED=$true; $obj.ANIMATION_ENABLED=$true; $obj.I18N_ENABLED=$true; $obj.CONSENT_GRANTED=$false; ($obj|ConvertTo-Json -Depth 100)|Out-File -LiteralPath $flags -Encoding utf8; $changed+=($flags.Substring($repo.Length+1)) }
$main=@("src\main.jsx","src\App.jsx","src\routes.jsx")|%{Join-Path $repo $_}|?{Test-Path $_}
foreach($mc in $main){ $text=Read-Text $mc; if($text -match "/welcome"){ $text=$text -replace "/welcome","/reco" } foreach($imp in @("import \"../design/theme.css\";","import \"../design/motion.css\";","import \"./lib/header.mount.js\";","import \"./lib/celebrate.js\";")){ if($text -notmatch [regex]::Escape($imp)){ $text=$imp + \"`r`n\" + $text } } if(Write-IfDifferent $mc $text){ $changed+=($mc.Substring($repo.Length+1)) } }
$ts=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $mr=Join-Path $repo "MIGRATION_REPORT.md"
$entry=@"
## UI Shift v2 — $ts
- Landing rebuilt per User Journey (Hero → Offers → Use cases → Included → Steps → Choose path → CTA → Footer)
- CTAs moved out of hero, Header auto-mounted on inner routes
- Legal pages shipped as static public documents
- Celebration animation after purchase/download/export via data-action or custom event
- Flags reaffirmed; Welcome route redirected to /reco
- Files changed:
$(($changed|%{"  - $_"}) -join "`n")
"@
Add-Content -LiteralPath $mr -Value $entry -Encoding UTF8
$hb=Join-Path $repo "Handoff_BLOCK.json"; $hbObj=@{}; if(Test-Path $hb){ try{$hbObj=Get-Content -Raw -Path $hb|ConvertFrom-Json -Depth 100}catch{$hbObj=@{}} }
$hbObj.last_shift=@{ name="UI/Frontend Corporate Design — v2"; date=$ts; notes="Landing restructured to match User Journey; legal pages; celebration animation; header on inner routes." }
($hbObj|ConvertTo-Json -Depth 50)|Out-File -LiteralPath $hb -Encoding utf8
$npm=Get-Command npm -ErrorAction SilentlyContinue; if($npm){ npm run build } else { Write-Warning "npm not found; skipping build." }
$zip="plan2fund_ui_shift_v2_" + (Get-Date -Format "yyyyMMdd_HHmm") + ".zip"; $zp=Join-Path $repo $zip
if(Test-Path $zp){ Remove-Item $zp -Force }; $toZip=@("design","i18n","src\components","src\lib","src\shell","docs","public","src\config\flags.json","MIGRATION_REPORT.md","Handoff_BLOCK.json")|%{Join-Path $repo $_}|?{Test-Path $_}; if($toZip.Count -gt 0){ Compress-Archive -Path $toZip -DestinationPath $zp -Force; Write-Host "Release: $zp" }
Write-Host "DONE"
