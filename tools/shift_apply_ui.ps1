
<# 
 Plan2Fund - UI/Frontend Corporate Design - Shift Apply Script (FINAL v4)
 Purpose: eliminate duplicates, enforce canonical design system under src/design,
 patch main.jsx safely, extend consolidation, and ensure index.html uses src/main.jsx.
#>

param(
  [switch]$Apply,
  [string]$Zip = $null,
  [int]$TreeDepth = 4
)

$ErrorActionPreference = "Stop"

# ----- Dynamic root detection -----
$ToolsDir    = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ToolsDir
Set-Location $ProjectRoot

# ----- Paths -----
$ParentDir  = Split-Path -Parent $ProjectRoot
$BackupDir  = Join-Path $ParentDir "backups"     # outside project to avoid zipping the zip
$TrashDir   = Join-Path $ProjectRoot (".trash\" + (Get-Date -Format yyyyMMdd_HHmmss))

if (!(Test-Path $BackupDir)) { New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null }
if (!(Test-Path $TrashDir))  { New-Item -ItemType Directory -Path $TrashDir  -Force | Out-Null }

$Changed  = New-Object System.Collections.Generic.List[string]
$DedupLog = New-Object System.Collections.Generic.List[string]

function NowTag(){ (Get-Date).ToString("yyyyMMdd_HHmmss") }
function Ensure-Dir([string]$p){ if(!(Test-Path $p)){ New-Item -ItemType Directory -Force -Path $p | Out-Null } }

function Add-File([string]$RelPath, [string]$Body){
  $full = Join-Path $ProjectRoot $RelPath
  $dir  = Split-Path -Parent $full
  Ensure-Dir $dir
  Set-Content -Path $full -Value $Body -Encoding UTF8
  $Changed.Add($RelPath) | Out-Null
}

function Move-ToTrash([string]$Path){
  if(!(Test-Path $Path)){ return }
  $rel = $Path.Substring($ProjectRoot.Length).TrimStart('\')
  $dest = Join-Path $TrashDir ($rel -replace "[:\\\/]+","_")
  Ensure-Dir (Split-Path -Parent $dest)
  Move-Item -Force $Path $dest
}

function Hash-File([string]$Path){
  if(!(Test-Path $Path)){ return $null }
  (Get-FileHash -Algorithm SHA256 -Path $Path).Hash
}

function Merge-Folder([string]$From, [string]$Into){
  if(!(Test-Path $From)){ return }
  Ensure-Dir $Into
  Get-ChildItem -LiteralPath $From -Recurse -Force | ForEach-Object {
    if($_.PSIsContainer){ return }
    $rel = $_.FullName.Substring($From.Length).TrimStart('\')
    $target = Join-Path $Into $rel
    Ensure-Dir (Split-Path -Parent $target)
    if(Test-Path $target){
      $h1 = Hash-File $_.FullName; $h2 = Hash-File $target
      if($h1 -eq $h2){
        $DedupLog.Add("IDENTICAL: $target == $($_.FullName) -> dropped source") | Out-Null
      } else {
        $DedupLog.Add("CONFLICT: kept $target | trashed $($_.FullName)") | Out-Null
        Move-ToTrash $_.FullName
      }
    } else {
      Copy-Item -Force $_.FullName $target
      $Changed.Add((Resolve-Path -Relative $target)) | Out-Null
    }
  }
}

# ----- 0) Backup (outside project) -----
$backupZip = Join-Path $BackupDir ("workspace_backup_{0}.zip" -f (NowTag))
if($Apply){
  try { Add-Type -AssemblyName 'System.IO.Compression.FileSystem' } catch {}
  $tempZip = Join-Path $env:TEMP ("p2f_backup_{0}.zip" -f (NowTag))
  if(Test-Path $tempZip){ Remove-Item -Force $tempZip }
  [System.IO.Compression.ZipFile]::CreateFromDirectory($ProjectRoot, $tempZip)
  Move-Item -Force $tempZip $backupZip
  Write-Host ("Backup created: {0}" -f $backupZip)
} else {
  Write-Host ("[DRY RUN] Would create backup at {0}" -f $backupZip)
}

# ----- 1) Optional zip merge -----
if($Zip){
  if(!(Test-Path $Zip)){ throw ("Zip not found: {0}" -f $Zip) }
  $Stage = Join-Path $ProjectRoot ("_stage_" + (NowTag))
  Ensure-Dir $Stage
  Write-Host ("Unzipping {0} -> {1}" -f $Zip, $Stage)
  Expand-Archive -Path $Zip -DestinationPath $Stage -Force

  $CandidateRoots = @()
  Get-ChildItem -Recurse -Directory -LiteralPath $Stage | ForEach-Object {
    $p = $_.FullName; if(Test-Path (Join-Path $p "src")){ $CandidateRoots += $p }
  }
  if($CandidateRoots.Count -eq 0){ if(Test-Path (Join-Path $Stage "src")){ $CandidateRoots = @($Stage) } }
  $Chosen = $CandidateRoots | Sort-Object Length | Select-Object -First 1
  if(!$Chosen){ $Chosen = $Stage }

  Write-Host ("Merging staged root: {0}" -f $Chosen)
  foreach($folder in @("src","public","docs","config","tools")){
    $srcF = Join-Path $Chosen $folder
    if(Test-Path $srcF){ Merge-Folder -From $srcF -Into (Join-Path $ProjectRoot $folder) }
  }
}

# ----- 2) Cleanup & structure -----
# 2a) Flatten accidental nested duplicates of the whole project folder
$LeafName = Split-Path -Leaf $ProjectRoot
Get-ChildItem -Recurse -Directory -LiteralPath $ProjectRoot | Where-Object { $_.Name -eq $LeafName -and $_.FullName -ne $ProjectRoot } | ForEach-Object {
  Write-Host ("Flattening nested copy: {0}" -f $_.FullName)
  Merge-Folder -From $_.FullName -Into $ProjectRoot
  Move-ToTrash $_.FullName
}

# 2b) Merge root\components -> src\components
$TopComponents = Join-Path $ProjectRoot "components"
$SrcComponents = Join-Path $ProjectRoot "src\components"
if(Test-Path $TopComponents){
  Ensure-Dir $SrcComponents
  Write-Host "Merging root\components into src\components"
  Merge-Folder -From $TopComponents -Into $SrcComponents
  Move-ToTrash $TopComponents
}

# 2c) Consolidate more folders/files into src/ (prefer src)
$ConsolidateFiles = @("App.jsx","App.tsx","main.jsx","main.tsx","styles.css","index.css")
$ConsolidateDirs  = @("lib","hooks","pages","layouts","utils","screens","views","store","services","api")
foreach($f in $ConsolidateFiles){
  $rootF = Join-Path $ProjectRoot $f
  $srcF  = Join-Path $ProjectRoot ("src\" + $f)
  if(Test-Path $rootF){
    if(Test-Path $srcF){
      $h1 = Hash-File $rootF; $h2 = Hash-File $srcF
      if($h1 -eq $h2){
        $DedupLog.Add(("IDENTICAL FILE: {0} == {1} -> trashing root copy" -f $rootF,$srcF)) | Out-Null
        Move-ToTrash $rootF
      } else {
        $DedupLog.Add(("CONFLICT FILE: kept {0}; trashed root {1}" -f $srcF,$rootF)) | Out-Null
        Move-ToTrash $rootF
      }
    } else {
      Ensure-Dir (Split-Path -Parent $srcF)
      Move-Item -Force $rootF $srcF
      $Changed.Add(("src\" + $f)) | Out-Null
      Write-Host ("Moved {0} -> {1}" -f $rootF, $srcF)
    }
  }
}
foreach($d in $ConsolidateDirs){
  $rootD = Join-Path $ProjectRoot $d
  $srcD  = Join-Path $ProjectRoot ("src\" + $d)
  if(Test-Path $rootD){
    Ensure-Dir $srcD
    Write-Host ("Consolidating {0}\ -> src\{0}\" -f $d)
    Merge-Folder -From $rootD -Into $srcD
    Move-ToTrash $rootD
  }
}

# 2d) Dedup copy-suffixed files
$copyPatterns = @("* - Copy.*","* copy.*","* (1).*","* (2).*","* (3).*","* (4).*","* (5).*")
foreach($pat in $copyPatterns){
  $dupes = Get-ChildItem -Recurse -File -LiteralPath $ProjectRoot -Filter $pat | Sort-Object LastWriteTime -Descending
  if($dupes.Count -gt 0){
    $keep = $dupes | Select-Object -First 1
    foreach($x in ($dupes | Select-Object -Skip 1)){
      $DedupLog.Add(("COPY-NAME: keep '{0}'; trash '{1}'" -f $keep.FullName, $x.FullName)) | Out-Null
      Move-ToTrash $x.FullName
    }
  }
}

# 2e) Prefer public assets over dist; wipe dist for clean rebuild
$publicPrint = Join-Path $ProjectRoot "public\print.css"
$distPrint   = Join-Path $ProjectRoot "dist\print.css"
if ((Test-Path $publicPrint) -and (Test-Path $distPrint)) {
  Write-Host "Removing duplicate dist\print.css (public version kept)"
  Move-ToTrash $distPrint
  $DedupLog.Add("PUBLIC-WINS: public\print.css kept; dist\print.css removed") | Out-Null
}
if(Test-Path (Join-Path $ProjectRoot "dist")){ Remove-Item -Recurse -Force (Join-Path $ProjectRoot "dist") }

# ----- 3) Canonicalize design system under src/design -----
$DesignDir = Join-Path $ProjectRoot "src\design"
Ensure-Dir $DesignDir

# Full theme.css content
$themeCss = @'
:root{
  --color-primary:#4338ca;--color-primary-600:#4f46e5;--color-primary-700:#3730a3;
  --color-bg:#fff;--color-bg-muted:#f8fafc;--color-fg:#0f172a;--color-fg-muted:#475569;--color-border:#e2e8f0;
  --color-success:#16a34a;--color-warn:#d97706;--color-danger:#dc2626;
  --radius-sm:8px;--radius-md:12px;--radius-lg:16px;--radius-xl:24px;--radius-full:999px;
  --shadow-sm:0 1px 2px rgba(0,0,0,.06);--shadow-md:0 8px 24px rgba(0,0,0,.08);--shadow-lg:0 16px 48px rgba(0,0,0,.12);
  --space-0:0;--space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-5:20px;--space-6:24px;--space-7:32px;--space-8:40px;--space-9:48px;--space-10:56px;--space-11:64px;--space-12:80px;
  --font-sans:ui-sans-serif,-apple-system,Segoe UI,Roboto,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji;
  --fs-xs:12px;--fs-sm:14px;--fs-base:16px;--fs-md:18px;--fs-lg:20px;--fs-xl:24px;--fs-2xl:30px;--fs-3xl:36px;--fs-4xl:48px;
  --lh-tight:1.1;--lh-snug:1.25;--lh-normal:1.45
}
html,body{margin:0;padding:0;background:var(--color-bg);color:var(--color-fg);font-family:var(--font-sans)}
.container{max-width:1200px;margin:0 auto;padding:0 var(--space-7)}
.section{padding:64px 0 48px}
.card{border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-7);box-shadow:var(--shadow-sm);background:#fff}
.button{display:inline-flex;align-items:center;justify-content:center;padding:10px 16px;min-height:44px;border-radius:var(--radius-md);border:1px solid transparent;background:var(--color-primary);color:#fff;text-decoration:none;font-weight:600}
.button.secondary{background:#fff;color:var(--color-fg);border-color:var(--color-border)}
@media(max-width:479px){.container{padding:0 var(--space-4)} .section{padding:48px 0 40px}} @media(min-width:1440px){.container{max-width:1320px}}
'@
$motionCss = @'
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes rise{from{transform:translateY(12px);opacity:.001}to{transform:translateY(0);opacity:1}}
@keyframes orbFloat{0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)}}
.reveal{opacity:0} .reveal[data-inview='true']{opacity:1;animation:fadeIn .9s ease-out both,rise .9s ease-out both}
.orbs{position:absolute;inset:-20% -10% auto -10%;height:60vh;pointer-events:none;opacity:.12;filter:blur(20px);background:radial-gradient(40% 40% at 20% 40%,var(--color-primary-600),transparent 60%),radial-gradient(36% 36% at 80% 30%,#60a5fa,transparent 60%),radial-gradient(28% 28% at 60% 80%,#22d3ee,transparent 60%);animation:orbFloat 12s ease-in-out infinite}
@media(prefers-reduced-motion:reduce){.reveal[data-inview='true']{animation:none!important}.orbs{animation:none!important}}
'@
$tokensJson = @'
{
  "color": { "primary":"#4338ca","primary-600":"#4f46e5","primary-700":"#3730a3","bg":"#ffffff","bg-muted":"#f8fafc","fg":"#0f172a","fg-muted":"#475569","border":"#e2e8f0","success":"#16a34a","warn":"#d97706","danger":"#dc2626" },
  "radius": { "sm":8,"md":12,"lg":16,"xl":24,"full":999 },
  "shadow": { "sm":"0 1px 2px rgba(0,0,0,.06)","md":"0 8px 24px rgba(0,0,0,.08)","lg":"0 16px 48px rgba(0,0,0,.12)" },
  "space": [0,4,8,12,16,20,24,32,40,48,56,64,80],
  "type": { "fontFamily":"ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
            "scale":{"xs":12,"sm":14,"base":16,"md":18,"lg":20,"xl":24,"2xl":30,"3xl":36,"4xl":48},
            "leading":{"tight":1.1,"snug":1.25,"normal":1.45} },
  "breakpoints": { "xs":0,"sm":480,"md":768,"lg":1024,"xl":1440 }
}
'@

Add-File "src\design\theme.css"  $themeCss
Add-File "src\design\motion.css" $motionCss
Add-File "src\design\tokens.json" $tokensJson

# Remove duplicate design files outside src/design
$designNames = @("theme.css","motion.css","tokens.json")
Get-ChildItem -Recurse -File -LiteralPath $ProjectRoot | Where-Object {
  $designNames -contains $_.Name -and $_.FullName -notlike "*\src\design\*"
} | ForEach-Object {
  $DedupLog.Add(("DESIGN DUPLICATE -> trash {0}" -f $_.FullName)) | Out-Null
  Move-ToTrash $_.FullName
}

# ----- 4) Patch main.jsx safely (top-level imports only) -----
$mainPath = Join-Path $ProjectRoot "src\main.jsx"
if(Test-Path $mainPath){
  $mainSafe = @'
import "./design/theme.css";
import "./design/motion.css";
import "./styles.css";

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RuntimeGuard from "./components/RuntimeGuard.jsx";
import App from "./App.jsx";

try { if (location.pathname === "/" || location.pathname === "/index.html") { document.body.setAttribute("data-route","landing"); } } catch {}

const rootEl = document.getElementById("root") || (()=>{ const d=document.createElement("div"); d.id="root"; document.body.appendChild(d); return d; })();
const path = window.location.pathname;

if (path === "/dev/visual-check") {
  import("./dev/VisualCheck.jsx").then(mod => {
    createRoot(rootEl).render(<StrictMode>{React.createElement(mod.default)}</StrictMode>);
  });
} else if (path === "/" || path === "/index.html") {
  import("./shell/LandingShell.jsx").then(mod => {
    createRoot(rootEl).render(<StrictMode>{React.createElement(mod.default)}</StrictMode>);
  });
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <RuntimeGuard>
        <App />
      </RuntimeGuard>
    </StrictMode>
  );
}

import "./lib/gatekeeper.dom.js";
import "./lib/qbank.entry.js";
import "./lib/education.entry.js";
'@
  Set-Content -Path $mainPath -Value $mainSafe -Encoding UTF8
  $Changed.Add("src\main.jsx") | Out-Null
}

# ----- 5) Ensure index.html references src/main.jsx -----
$indexPath = Join-Path $ProjectRoot "index.html"
if(Test-Path $indexPath){
  $html = Get-Content $indexPath -Raw
  if($html -notmatch "src/main.jsx" -and $html -match "main\.jsx"){
    $html = $html -replace "main\.jsx","src/main.jsx"
    Set-Content -Path $indexPath -Value $html -Encoding UTF8
    $Changed.Add("index.html") | Out-Null
  }
}

# ----- 6) Build -----
if($Apply){
  Write-Host "Running build..."
  $null = npm run build
  if($LASTEXITCODE -ne 0){ throw "BUILD FAILED (npm run build). See logs." }
  if(!(Test-Path (Join-Path $ProjectRoot "dist\index.html"))){ throw "Build output dist\index.html not found." }
  Write-Host "GREEN: build passed and dist\index.html exists."
} else {
  Write-Host "[DRY RUN] Completed file writes. Re-run with -Apply to build."
}

# ----- 7) Reports + Final tree -----
$report = @"
MIGRATION REPORT - UI/Frontend Corporate Design Shift (v4)

Backup:
 - $backupZip

Added/Updated:
$(($Changed | ForEach-Object {" - $_"}) -join "`r`n")

Sanitization:
 - merged root\components -> src\components
 - consolidated root-level files into src (App/main/styles and common folders)
 - removed duplicate design files outside src\design\
 - quarantined duplicates to $TrashDir
 - dist wiped; rebuilt clean
"@
Set-Content -Path (Join-Path $ProjectRoot "MIGRATION_REPORT.md") -Value $report -Encoding UTF8

function Show-Tree([string]$Path, [int]$Depth, [int]$Level=0){
  if($Level -gt $Depth){ return }
  $indent = ("  " * $Level)
  $dirs = Get-ChildItem -LiteralPath $Path -Directory -Force | Sort-Object Name
  $files = Get-ChildItem -LiteralPath $Path -File -Force | Sort-Object Name
  $size = ($files | Measure-Object Length -Sum).Sum
  $kb = [math]::Round(($size/1kb),0)
  Write-Host ("{0}{1}/  (files: {2}, size: {3} KB)" -f $indent, (Split-Path -Leaf $Path), $files.Count, $kb)
  foreach($f in $files){ Write-Host ("{0}  - {1}" -f $indent, $f.Name) }
  foreach($d in $dirs){ Show-Tree $d.FullName $Depth ($Level+1) }
}

Write-Host ""
Write-Host "=== DEDUP SUMMARY ==="
if($DedupLog.Count -eq 0){ Write-Host "No duplicates or conflicts encountered." } else { $DedupLog | Sort-Object | Get-Unique | ForEach-Object { Write-Host $_ } }

Write-Host ""
Write-Host ("=== FINAL PROJECT TREE (depth={0}) ===" -f $TreeDepth)
Show-Tree $ProjectRoot $TreeDepth
