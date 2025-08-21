# Plan2Fund ??? Final User Journey (Hybrid, EN/DE)
- One Q-Bank; overlays per program (AWS/FFG/EU/RWR/AMS/Bank).
- Local corpus (JSON per program) for trusted facts + links; Exploration Mode for edge cases (paste official URL/PDF ??? confirm ??? score).
- Business Plan (WKO baseline EN/DE, overlays, financials up to 24 months, any start month).
- Preview with eligibility stamp, price tier, timeline; Checkout via Stripe; Export DOC + optional PDF.
- After-sales stubs (on-screen); emails later.

Personas:
- Minimal user: few answers, defaults, uploads instead of typing.
- Power user: selects program and jumps to required sections.
- Idea-only user: lean path with guidance and recommended defaults.

Flags:
- EDUCATION_UI_ENABLED=false (why/details UI)
- FORM_DYNAMIC_ENABLED=false (dynamic form)
- CHECKOUT_ENABLED=false, EXPORT_DOCX_ENABLED=false (future steps)