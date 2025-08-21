# tools\make_gpt_context.ps1 - build one-file brief for GPT (PS 5.1 safe)
$ErrorActionPreference = 'Stop'

# Repo root = parent of this script
if ($PSScriptRoot) { $root = Split-Path -Parent $PSScriptRoot } else { $root = Split-Path -Parent $MyInvocation.MyCommand.Path }
Set-Location $root

function Trim-Tree([string]$base) {
  Get-ChildItem -Recurse -Force -File $base |
    Where-Object { $_.FullName -notmatch '\\(node_modules|dist|\.next|\.git|\.cache|coverage)\\' } |
    ForEach-Object { $_.FullName.Substring($base.Length + 1).Replace('\','/') } |
    Sort-Object
}
function Read-All([string]$p) { if (Test-Path $p) { Get-Content -Raw -LiteralPath $p } else { $null } }
function Write-Utf8NoBom([string]$Path,[string]$Content) {
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Path) | Out-Null
  $enc = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $enc)
}

$pkgPath     = Join-Path $root 'package.json'
$flagsPath   = Join-Path $root 'config\flags.json'
$migPath     = Join-Path $root 'MIGRATION_REPORT.md'
$handoffPath = Join-Path $root 'Handoff_BLOCK.json'
$toolsDir    = Join-Path $root 'tools'

$pkg          = if (Test-Path $pkgPath) { Get-Content $pkgPath -Raw | ConvertFrom-Json } else { $null }
$flags        = Read-All $flagsPath
$mig          = Read-All $migPath
$handoff      = Read-All $handoffPath
$flagsJson    = if ($flags) { $flags } else { '{}' }
$handoffJson  = if ($handoff) { $handoff } else { '{}' }
$migMd        = if ($mig) { $mig } else { '_(no migration report yet)_' }

$tree       = Trim-Tree $root
$components = $tree | Where-Object { $_ -like 'components/*' } | Select-Object -First 80
$pages      = $tree | Where-Object { $_ -like 'pages/*' }      | Select-Object -First 80
$design     = $tree | Where-Object { $_ -like 'design/*' }     | Select-Object -First 80
$i18n       = $tree | Where-Object { $_ -like 'i18n/*' }       | Select-Object -First 80
$lib        = $tree | Where-Object { $_ -like 'lib/*' }        | Select-Object -First 80

$ctx = New-Object System.Collections.Generic.List[string]
$ctx.Add('# GPT_CONTEXT.md - Start Here')
$ctx.Add('')
$ctx.Add('## How to read')
$ctx.Add('Open this file first. It contains a repo map, key config, and change log. Then read the paths mentioned here.')
$ctx.Add('')
$ctx.Add('## Project meta')
if ($pkg) {
  $ctx.Add("- name: $($pkg.name)")
  $ctx.Add("- version: $($pkg.version)")
  if ($pkg.scripts) {
    $ctx.Add("- scripts:")
    $pkg.scripts.PSObject.Properties | ForEach-Object { $ctx.Add("  - $($_.Name): `"$($_.Value)`"") }
  }
}
$ctx.Add('')
$ctx.Add('## Feature flags (config/flags.json)')
$ctx.Add('```json')
$ctx.Add($flagsJson)
$ctx.Add('```')
$ctx.Add('')
$ctx.Add('## Tools (PowerShell)')
if (Test-Path $toolsDir) {
  (Get-ChildItem $toolsDir -Filter *.ps1 | Select-Object -Expand Name) | ForEach-Object { $ctx.Add("- tools/" + $_) }
}
$ctx.Add('')
$ctx.Add('## Repo map (trimmed)')
$ctx.Add('```text')
$tree | Select-Object -First 400 | ForEach-Object { $ctx.Add($_) }
$ctx.Add('```')

function Add-Section([string]$title, $list) {
  $script:ctx.Add('')
  $script:ctx.Add("### $title/")
  $script:ctx.Add('```text')
  if ($list) { $list | ForEach-Object { $script:ctx.Add($_) } }
  $script:ctx.Add('```')
}

Add-Section 'components' $components
Add-Section 'pages'      $pages
Add-Section 'design'     $design
Add-Section 'i18n'       $i18n
Add-Section 'lib'        $lib

$ctx.Add('')
$ctx.Add('## Handoff_BLOCK.json')
$ctx.Add('```json'); $ctx.Add($handoffJson); $ctx.Add('```')
$ctx.Add('')
$ctx.Add('## MIGRATION_REPORT.md')
$ctx.Add('```md'); $ctx.Add($migMd); $ctx.Add('```')

$target = Join-Path $root 'GPT_CONTEXT.md'
Write-Utf8NoBom -Path $target -Content ($ctx -join "`r`n")
Write-Host ("Wrote " + $target)
