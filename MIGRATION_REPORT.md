## UI Shift — template entry
## UI Shift â€” 2025-08-21 16:46:15
- Design system added (design/*.css, tokens.json), i18n (lib/i18n.js, i18n/*.json)
- Landing hero + product blocks + CTA band, header hidden on landing
- Welcome route removed/redirected to /reco
- Flags: DESIGN_SYSTEM_ENABLED, ANIMATION_ENABLED, I18N_ENABLED = true; CONSENT_GRANTED = false
- Compliance doc added at docs/COMPLIANCE.md
- Files changed:
  - src\main.jsx
  - src\App.jsx
  - src\components\Landing.jsx
  - src\components\Welcome.jsx
## Quick fix - 2025-08-21 17:22:25
- Injected global design imports and header/celebrate hooks
- Replaced '/welcome' with '/reco' routes

## User Journey Shift â€” 2025-08-21 18:51:29
- Stripe-style landing applied: Hero â†’ Offers â†’ Use Cases â†’ Included â†’ Persona bar â†’ Steps â†’ Choose path â†’ CTA â†’ Footer
- Header: Logo â€¢ Personal â€¢ Organisations â€¢ Build your Freedom â€¢ Language (EN/DE/ES/FR)
- Footer: Contact â€¢ Terms & Conditions â€¢ Data Privacy â€¢ Legal Notice â€¢ Â©2025
- Breadcrumbs mounted on inner pages; header hidden on landing
- Celebrations on purchase/download/export; legal public pages added
- Flags updated: DESIGN_SYSTEM_ENABLED, ANIMATION_ENABLED, I18N_ENABLED = true; CONSENT_GRANTED=false; CHECKOUT_ENABLED=false
- Files changed:
  - src\config\flags.json
  - src\main.jsx
  - src\App.jsx
## User Journey Shift â€” 2025-08-21 18:52:35
- Stripe-style landing applied: Hero â†’ Offers â†’ Use Cases â†’ Included â†’ Persona bar â†’ Steps â†’ Choose path â†’ CTA â†’ Footer
- Header: Logo â€¢ Personal â€¢ Organisations â€¢ Build your Freedom â€¢ Language (EN/DE/ES/FR)
- Footer: Contact â€¢ Terms & Conditions â€¢ Data Privacy â€¢ Legal Notice â€¢ Â©2025
- Breadcrumbs mounted on inner pages; header hidden on landing
- Celebrations on purchase/download/export; legal public pages added
- Flags updated: DESIGN_SYSTEM_ENABLED, ANIMATION_ENABLED, I18N_ENABLED = true; CONSENT_GRANTED=false; CHECKOUT_ENABLED=false
- Files changed:
  - src\config\flags.json
  - src\main.jsx
  - src\App.jsx
## User Journey Shift â€” 2025-08-21 18:55:01
- Stripe-style landing applied: Hero â†’ Offers â†’ Use Cases â†’ Included â†’ Persona bar â†’ Steps â†’ Choose path â†’ CTA â†’ Footer
- Header: Logo â€¢ Personal â€¢ Organisations â€¢ Build your Freedom â€¢ Language (EN/DE/ES/FR)
- Footer: Contact â€¢ Terms & Conditions â€¢ Data Privacy â€¢ Legal Notice â€¢ Â©2025
- Breadcrumbs mounted on inner pages; header hidden on landing
- Celebrations on purchase/download/export; legal public pages added
- Flags updated: DESIGN_SYSTEM_ENABLED, ANIMATION_ENABLED, I18N_ENABLED = true; CONSENT_GRANTED=false; CHECKOUT_ENABLED=false
- Files changed:
  - src\config\flags.json
  - src\main.jsx
  - src\App.jsx
### Shift: Design-System Unify & Full Journey (Steps 1?10)
Date: 2025-08-24 23:32:00 +02:00

**Added/Updated**
- src/design/components.css, motion.css ? unified visual system (glass header, hero, cards, buttons, badges, meters).
- src/config/flags.json ? feature flags (checkout/export disabled by default).
- src/data/programs.local.json ? local Top-5 placeholder corpus.
- src/components/* ? Header, Footer, Hero, Card, Badge, Meter, PriceTiers, PreviewModal.
- src/pages/* ? Welcome, Reco, Plan, PreviewPricing, Confirmation, Checkout, Export, AfterSales.
- src/main.jsx ? dependency-free router; SPA navigation without external libs.
- index.html ? ensured #root + script if missing.

**User Journey**
1) Welcome/Landing hero + sticky glass nav + trust.
2) Choose path cards.
3a) Recommendation inputs -> Top 5 results (scores, reasons; local corpus).
3b) Plan generator with editable blocks + Preview.
4) Eligibility/confidence badges (stubs) shown inside Reco + Plan quality panel.
5) Preview + Pricing page with meter + tiers.
6) AI Plan Machine banner (stub).
7) Confirmation summary.
8) Checkout (disabled via flags).
9) Export (PDF/DOCX stubs; DOCX disabled via flags).
10) After-sales request form (stub).

**Build Guard**
- No new deps; vanilla React + CSS.
- Router uses History API; links intercepted to keep SPA.
### Patch: Reco.jsx static corpus import
Date: 2025-08-24 23:32:31 +02:00

- Replaced runtime fetch('/src/data/programs.local.json') with static import '../data/programs.local.json'
- Rationale: Vite serves /src differently; static import is dev+build safe and honors no-network rule.

### Patch: ASCII-safe hero + spacing
Date: 2025-08-24 23:36:58 +02:00
- Replaced emojis with \\u codes
- Normalized quotes/dash
- Hero sizing/contrast tweaked

### Patch: ASCII-safe Hero + sizing overrides
Date: 2025-08-24 23:39:23 +02:00
- Rewrote src/components/Hero.jsx with \u escapes for dash/bullets/emojis.
- Added CSS overrides block (marker: PATCH: HERO-OVERRIDES) for spacing/contrast.
### UI Polish v1
Date: 2025-08-24 23:43:21 +02:00
- Fixed literal \u codes in Hero (JSX expressions) + improved hero spacing.
- Added TrustBar under hero (GDPR/EU/AT/No trackers).
- Added Breadcrumbs and integrated into Reco + Plan.
- CSS polish: typography scale, card shadow, trust grid, breadcrumb styles, mobile header simplification.
### UI Polish v2
Date: 2025-08-24 23:46:00 +02:00
- TrustBar fixed: JSX unicode expressions (no literal \u text).
- Hero/nav/cards/buttons/sections refined for Stripe/Revolut feel.
- Added divider styling and improved typography scale.
