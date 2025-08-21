# Explainability Notes (Step 10)

**Goal:** Provide deterministic, inspectable confidence bands (A/B/C) derived solely from local rule evaluation; surface the top supporting rules and link users to official sources.

## Confidence model
- Score = `passed_rules / total_rules * 100`.
- Bands:
  - **A**: score â‰¥ 80% **and** all mandatory rules pass
  - **B**: score â‰¥ 50% **and** all mandatory rules pass
  - **C**: otherwise (includes any mandatory failure, or low coverage)
- Deterministic: no randomness, no network calls, no new dependencies.

## Decision details (gated by `EDUCATION_UI_ENABLED`)
- Shows **Confidence band + %**, **Top 3 supporting rules** (by a simple specificity proxy), and up to 5 **official links** from the program corpus (`program.corpus.sources` or `program.links` if present).
- If shapes differ, the UI degrades gracefully and never breaks the build.

## Non-breaking guarantees
- Default flags unchanged; feature is invisible unless `EDUCATION_UI_ENABLED=true`.
- No routing changes. No new deps. Build stays GREEN.
