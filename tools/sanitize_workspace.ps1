param([switch]$Apply)

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$ArchiveRoot = Join-Path $ProjectRoot "..\archive"
$Timestamp   = Get-Date -Format "yyyyMMdd_HHmmss"
$ArchivePath = Join-Path $ArchiveRoot "plan2fund_$Timestamp"

if (-not $Apply) { Write-Host "=== DRY RUN (use -Apply to modify) ===`n" }

# Canonical locations
$Canonical = @{
  "App.jsx"     = "src"
  "main.jsx"    = "src"
  "theme.css"   = "src\design"
  "motion.css"  = "src\design"
  "tokens.json" = "src\design"
  "index.html"  = "public"
}

# Ensure archive dir
if ($Apply -and -not (Test-Path $ArchivePath)) {
  New-Item -ItemType Directory -Path $ArchivePath | Out-Null
}

# Find duplicates
$allFiles = Get-ChildItem -Path $ProjectRoot -Recurse -File
$archiveList = @()

foreach ($file in $allFiles) {
  $name = $file.Name
  if ($Canonical.ContainsKey($name)) {
    $expected = $Canonical[$name].ToLower()
    $relative = $file.FullName.Substring($ProjectRoot.Length+1).ToLower()

    if (-not ($relative -like "$expected*")) {
      Write-Host "ARCHIVE duplicate: $relative"
      $archiveList += $file
    }
  }
}

# Clean up noise
$noise = @("dist","node_modules\.vite","backups","src.backup.*",".trash")
foreach ($pattern in $noise) {
  Get-ChildItem -Path $ProjectRoot -Recurse -Force -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -like "*$pattern*" } |
    ForEach-Object {
      Write-Host "CLEAN noise: $($_.FullName.Substring($ProjectRoot.Length+1))"
      $archiveList += $_
    }
}

# Apply or dry run
if ($Apply) {
  foreach ($item in $archiveList | Sort-Object FullName -Unique) {
    $target = Join-Path $ArchivePath ($item.FullName.Substring($ProjectRoot.Length+1))
    $dir = Split-Path $target -Parent
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    Move-Item -Path $item.FullName -Destination $target -Force
  }
  Write-Host "`nArchived $(($archiveList | Measure-Object).Count) items to $ArchivePath"
} else {
  Write-Host "`nDRY RUN complete. Use -Apply to clean."
}
