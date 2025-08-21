# GPT_CONTEXT.md - Start Here

## How to read
Open this file first. It contains a repo map, key config, and change log. Then read the paths mentioned here.

## Project meta
- name: plan2fund-webapp
- version: 0.1.0
- scripts:
  - dev: "vite"
  - build: "vite build"
  - preview: "vite preview"
  - verify: "powershell -ExecutionPolicy Bypass -File ./scripts/verify.ps1"

## Feature flags (config/flags.json)
```json
{}
```

## Tools (PowerShell)
- tools/make_gpt_context.ps1
- tools/sanitize_workspace.ps1
- tools/shift_apply_step10_1.ps1
- tools/shift_apply_ui.ps1

## Repo map (trimmed)
```text
.gitignore
.trash/20250821_131208/components/Footer.jsx
.trash/20250821_131208/components/NavBar.jsx
.trash/20250821_132647/dist_print.css
.trash/20250821_135026/App.jsx
.trash/20250821_135026/dist_print.css
.trash/20250821_140056/api/export-md.js
.trash/20250821_140056/dist_print.css
backups/workspace_backup_20250821_132652.zip
backups/workspace_backup_20250821_132715.zip
docs/business_logic_digest.txt
docs/env_checklist.txt
docs/inputs/AT_EU_funding_urls_grouped_2025-08-20.txt
docs/inputs/template_public_support_general_austria_en.txt
docs/logs/SHIFT_LOG.md
docs/product/EXPLAINABILITY_NOTES.md
docs/product/USER_JOURNEY.md
docs/product/USER_JOURNEY_IMPLEMENTED.md
docs/rules.diff.md
docs/TROUBLESHOOTING.md
Handoff_BLOCK.json
index.html
MIGRATION_REPORT.md
package.json
package-lock.json
public/print.css
SHIFT_LOG.md
src.backup.20250818_095046/App.jsx
src.backup.20250818_095046/components/FundingForm.jsx
src.backup.20250818_095046/engine/compliance.js
src.backup.20250818_095046/engine/match.js
src.backup.20250818_095046/engine/programs.json
src.backup.20250818_095046/engine/QA_SEEDS.json
src.backup.20250818_095046/engine/rank.js
src.backup.20250818_095046/engine/selftest.js
src.backup.20250818_095046/export/markdown.js
src.backup.20250818_095046/i18n/de.json
src.backup.20250818_095046/i18n/en.json
src.backup.20250818_095046/i18n/i18n.js
src.backup.20250818_095046/main.jsx
src.backup.20250818_095046/pages/Results.jsx
src.backup.20250818_095046/styles.css
src/api/export-md.js
src/App.jsx
src/components/Badge.jsx
src/components/CTABand.jsx
src/components/DecisionDetails.jsx
src/components/EligibilityBanner.jsx
src/components/FeatureList.jsx
src/components/Footer.jsx
src/components/FundingForm.jsx
src/components/Header.jsx
src/components/Hero.jsx
src/components/Landing.jsx
src/components/LangSwitch.jsx
src/components/LegalFAQ.jsx
src/components/NavBar.jsx
src/components/Orbs.jsx
src/components/PlanCTA.jsx
src/components/PlanPreview.jsx
src/components/ProductGrid.jsx
src/components/ProgramCard.jsx
src/components/Results.jsx
src/components/Reveal.jsx
src/components/RuntimeGuard.jsx
src/components/Steps.jsx
src/components/UserJourney.jsx
src/components/Welcome.jsx
src/config/eligibility.schema.json
src/config/flags.js
src/config/flags.json
src/config/flags.snapshot.json
src/data/corpus.programs.json
src/data/corpus/ams_wko_basic.corpus.json
src/data/corpus/aws_preseed.corpus.json
src/data/corpus/bank_loan_leasing.corpus.json
src/data/corpus/eu_startup_call.corpus.json
src/data/corpus/ffg_basisprogramm.corpus.json
src/data/corpus/programs.corpus.index.json
src/data/corpus/visa_rwr.corpus.json
src/data/eligibility.rules.json
src/data/overlays/ams_wko_basic.overlay.json
src/data/overlays/aws_preseed.overlay.json
src/data/overlays/bank_loan_leasing.overlay.json
src/data/overlays/eu_startup_call.overlay.json
src/data/overlays/ffg_basisprogramm.overlay.json
src/data/overlays/programs.overlays.index.json
src/data/overlays/visa_rwr.overlay.json
src/data/programs.catalog.json
src/data/qbank.json
src/data/rules/ams_wko_basic.rules.json
src/data/rules/aws_preseed.rules.json
src/data/rules/bank_loan_leasing.rules.json
src/data/rules/eu_startup_call.rules.json
src/data/rules/ffg_basisprogramm.rules.json
src/data/rules/programs.index.json
src/data/rules/vienna_innov.rules.json
src/data/rules/visa_rwr.rules.json
src/data/scoring.config.json
src/design/motion.css
src/design/theme.css
src/design/tokens.json
src/engine/compliance.js
src/engine/match.js
src/engine/programs.json
src/engine/QA_SEEDS.json
src/engine/rank.js
src/engine/rankCore.js
src/engine/selftest.js
src/export/markdown.js
src/flows/questions.plan.json
src/flows/questions.reco.json
src/i18n/de.json
src/i18n/en.json
src/i18n/i18n.js
src/lib/checkout.entry.js
src/lib/confidence.score.js
src/lib/education.entry.js
src/lib/education.ui.js
src/lib/eligibility.core.js
src/lib/eligibility.engine.js
src/lib/eligibility.programs.js
src/lib/eligibility.webc.js
src/lib/eligibilityGatekeeper.js
src/lib/export.doc.js
src/lib/export.entry.js
src/lib/export.rtf.js
src/lib/exporters.js
src/lib/flags.js
src/lib/form.dynamic.entry.js
src/lib/gatekeeper.dom.js
src/lib/i18n.js
src/lib/landing.entry.js
src/lib/planTokens.js
src/lib/preview.readiness.js
src/lib/qbank.entry.js
src/lib/qbank.loader.js
src/lib/qbank.render.js
src/lib/scoring.js
src/lib/supabaseLoader.js
src/main.jsx
src/pages/AfterSales.jsx
src/pages/Checkout.jsx
src/pages/LandingPage.jsx
src/pages/Legal.jsx
src/pages/Plan.jsx
src/pages/PlanPage.jsx
src/pages/Pricing.jsx
src/pages/RecoPage.jsx
src/pages/Results.jsx
src/pages/SuccessCancel.jsx
src/shell/LandingShell.jsx
src/styles.css
tools/make_gpt_context.ps1
tools/sanitize_workspace.ps1
tools/shift_apply_step10_1.ps1
tools/shift_apply_ui.ps1
vercel.json
vite.config.js
```

### components/
```text
```

### pages/
```text
```

### design/
```text
```

### i18n/
```text
```

### lib/
```text
```

## Handoff_BLOCK.json
```json
{
    "how_to_toggle":  "Edit src\\config\\flags.json. To disable motion set ANIMATION_ENABLED=false or use prefers-reduced-motion.",
    "flags":  {
                  "ANIMATION_ENABLED":  true,
                  "SEARCH_PALETTE_ENABLED":  false,
                  "DESIGN_SYSTEM_ENABLED":  true,
                  "I18N_ENABLED":  true
              },
    "shift":  "UI/Frontend Corporate Design",
    "entry_points":  {
                         "landing_shell":  "src\\shell\\LandingShell.jsx",
                         "visual_check":  "/dev/visual-check"
                     }
}

```

## MIGRATION_REPORT.md
```md
MIGRATION REPORT - UI/Frontend Corporate Design Shift (v4)

Backup:
 - C:\Users\kevin\plan2fund\one_prompt_webapp_agent_package\backups\workspace_backup_20250821_140101.zip

Added/Updated:
 - src\design\theme.css
 - src\design\motion.css
 - src\design\tokens.json
 - src\main.jsx

Sanitization:
 - merged root\components -> src\components
 - consolidated root-level files into src (App/main/styles and common folders)
 - removed duplicate design files outside src\design\
 - quarantined duplicates to C:\Users\kevin\plan2fund\one_prompt_webapp_agent_package\plan2fund-webapp\.trash\20250821_140101
 - dist wiped; rebuilt clean

```