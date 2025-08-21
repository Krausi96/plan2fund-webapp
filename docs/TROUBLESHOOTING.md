# Plan2Fund – Troubleshooting (Non-Technical Guide)
**Updated:** 2025-08-17 20:50

## Error: Failed to load PostCSS config / Unexpected token '﻿'
**What you saw**
```
Failed to load PostCSS config ...
SyntaxError: Unexpected token '﻿', "﻿{ "name"... } is not valid JSON
```
**What this means**
A hidden character (BOM) at the beginning of a JSON file (usually `package.json`) confuses the dev server.

**Fix (1 minute)**
1. Close the dev server if running.
2. Run the PowerShell script below in the project folder to clean hidden BOM characters:
   ```powershell
   .\tools\remove_bom.ps1
   ```
3. Start the app again:
   ```powershell
   npm run dev
   ```

If you cannot run scripts, open `package.json` with VS Code and re-save as **UTF-8 (without BOM)**.

## Where to find things
- **Run the app:** `npm install` → `npm run dev`
- **Export:** On Results page → Export Markdown / JSON / Print/PDF
- **QA check:** Open browser console → "Plan2Fund DEV Summary"
- **Next steps:** See `HANDOFF_BLOCK.json`
