param(
  [Parameter(Mandatory=$true)][string]$ProjectRoot,
  [Parameter(Mandatory=$true)][string]$Overlay
)
# Idempotent overlay applier for plan2fund v4 (src/ only)
$ErrorActionPreference = "Stop"
function Expand-Zip($zipPath, $dest){
  Add-Type -AssemblyName System.IO.Compression.FileSystem
  if(Test-Path $dest){ Remove-Item -Recurse -Force $dest }
  [System.IO.Compression.ZipFile]::ExtractToDirectory($zipPath, $dest)
}
function Copy-Overlay($from, $to){
  $src = Join-Path $from "src"
  if(!(Test-Path $src)){ throw "Overlay does not contain /src." }
  $dst = Join-Path $ProjectRoot "src"
  if(!(Test-Path $dst)){ throw "Project src not found at $dst" }
  $files = Get-ChildItem -Path $src -Recurse -File
  foreach($f in $files){
    $rel = $f.FullName.Substring($src.Length).TrimStart('\','/')
    $target = Join-Path $dst $rel
    $dir = Split-Path $target -Parent
    if(!(Test-Path $dir)){ New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    Copy-Item -Force $f.FullName $target
    Write-Host "Updated: $rel"
  }
}
$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$TMP = Join-Path $Here ".overlay_tmp_v4"
Expand-Zip -zipPath $Overlay -dest $TMP
Copy-Overlay -from $TMP -to $ProjectRoot
Remove-Item -Recurse -Force $TMP
Write-Host "Overlay applied."
