# Verification

Verified 30 October 2026.

## App

Production build passes. All 14 automated checks pass: seven engine checks and a fixture-backed server test containing six HTTP checks. The fixture API is local; it is not evidence of live Nebius inference.

Browser route: http://127.0.0.1:8787 and https://dcontessa.github.io/foundry-workflow/.

The in-app browser was used directly; no external browser automation fallback. Page identity, meaningful rendering, absence of framework overlays, and browser-console health passed. The public sample's full build → test → repair → retest interaction passed. Prepared baseline: 2/5; improved: 5/5. Inspected expected-versus-observed details. Actual form validation rejected a missing email; a valid unassigned enquiry saved and remained visible. Desktop at 1536×1024 and a 390×844 mobile viewport were checked; mobile page width matched viewport width. Table scrolling is intentional. Viewport overrides were restored.

## Design comparison

Reference: public/design/concept.png. Actual captures: docs/foundry-desktop.png and docs/foundry-mobile.png. Both reference and desktop capture were inspected with view_image; mobile capture was also inspected.

| Point | Finding |
| --- | --- |
| Layout | Three functional rails preserve the concept: brief, enquiry table, evidence |
| Typography | Serif display headings and sans-serif controls preserve hierarchy; explicit control sizes |
| Palette | Off-white, charcoal, copper, and gray dividers match the selected direction |
| Containers | Flat layout and column dividers retained; no decorative card grid |
| Copy | Primary headline/navigation retained; executable test labels replace invented concept tests |
| Media | No decorative raster UI; all interactive text remains native HTML |
| Responsive | Vertical mobile sequence; table scrolls within its own region |

Intentional deviations: actual engine rules and scenarios, real pass-count comparison, sample disclosures, evidence export, new/edit enquiry dialog. Added controls serve the approved workflow. The implementation was compared faithfully against the selected concept within these documented changes; no material unintended mismatch remains in the inspected states.

## Limits

Live NVIDIA-on-Nebius inference remains blocked by account activation and authorized API-key access. A configured health endpoint is not proof that inference works. The public GitHub Pages preview is sample-only and cannot execute the server-side adapter. Public backend deployment and final sponsor-compliant video remain outstanding. No production multi-user, accessibility conformance, load, penetration, or exhaustive browser claims are made.
