
# COMPLIANCE (EU/Austria)

## GDPR (DSGVO)
- **No trackers by default.** Only enable analytics if `CONSENT_GRANTED=true`.
- **Cookie banner only** if non‑essential cookies are used.
- **Data minimization.** Collect only what's needed to generate the plan.
- **Local storage:** language preference only (no PII).
- **User rights:** Link to Privacy in the footer (access, deletion, correction).

## Legal Links
Add footer links (placeholders included):
- GDPR/Privacy, Terms (AGB), Impressum, Contact.

## E‑Commerce (digital services)
- Display prices with currency and **VAT notice** (“incl./excl. VAT” per strategy).
- Show company info in Impressum placeholder.

## Accessibility
- Mobile‑first, color‑contrast AA.
- Motion: subtle and respects `prefers-reduced-motion`.

## Flags
- `CONSENT_GRANTED=false` by default; gate any analytics behind it.
