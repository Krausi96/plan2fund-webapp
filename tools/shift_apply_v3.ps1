param(
  [Parameter(Mandatory=$true)][string]$ProjectRoot,
  [Parameter(Mandatory=$true)][string]$Overlay
)
$ErrorActionPreference = "Stop"

Write-Host "== Plan2Fund Shift v3 — Apply Overlay ==" -ForegroundColor Cyan
if (-not (Test-Path $ProjectRoot)) { throw "ProjectRoot not found: $ProjectRoot" }
if (-not (Test-Path $Overlay)) { throw "Overlay zip not found: $Overlay" }

$dest = Resolve-Path $ProjectRoot
$tmp = Join-Path $env:TEMP ("p2f_shift_"+([guid]::NewGuid()))
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

Write-Host "Extracting overlay to temp: $tmp"
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory((Resolve-Path $Overlay), $tmp)

# Create timestamped backup
$backup = Join-Path $dest ("_backup_shift_v3_"+(Get-Date -Format "yyyyMMdd_HHmmss"))
Write-Host "Creating backup: $backup"
New-Item -ItemType Directory -Force -Path $backup | Out-Null

# Copy files from overlay -> project (idempotent)
$copyOpts = "/E", "/I", "/Y"
robocopy "$tmp\src" "$dest\src" /E /NFL /NDL /NJH /NJS /NP | Out-Null
if (Test-Path "$tmp\tools") {
  if (-not (Test-Path "$dest\tools")) { New-Item -ItemType Directory -Path "$dest\tools" | Out-Null }
  robocopy "$tmp\tools" "$dest\tools" /E /NFL /NDL /NJH /NJS /NP | Out-Null
}

# Ensure /welcome redirects to /
$app = Join-Path $dest "src\App.jsx"
if (Test-Path $app) {
  $text = Get-Content $app -Raw
  if ($text -notmatch "path=`"/welcome`"") {
    $redirect = "`n          <Route path=`"/welcome`" element={<Navigate to=`"/`" replace />} />`n"
    $text = $text -replace "(</Route>\s*</Routes>)", $redirect+'$1'
    Set-Content -Path $app -Value $text -Encoding UTF8
    Write-Host "Inserted /welcome redirect in App.jsx"
  } else {
    Write-Host "/welcome redirect already present"
  }
}

# Merge flags.json keys (non-destructive)
$flagsPath = Join-Path $dest "src\config\flags.json"
if (Test-Path $flagsPath) {
  $existing = Get-Content $flagsPath -Raw | ConvertFrom-Json
} else {
  $existing = @{} | ConvertTo-Json | ConvertFrom-Json
}
$defaults = @{
  ANIMATION_ENABLED=$true;
  CHECKOUT_ENABLED=$false;
  CONSENT_GRANTED=$false;
  DESIGN_SYSTEM_ENABLED=$true;
  I18N_ENABLED=$true;
}
foreach($k in $defaults.Keys){
  if ($null -eq $existing.$k) { $existing | Add-Member -NotePropertyName $k -NotePropertyValue $defaults[$k] }
}
($existing | ConvertTo-Json -Depth 5) | Set-Content -Path $flagsPath -Encoding UTF8

Write-Host "Overlay applied. Next: npm install && npm run build" -ForegroundColor Green
