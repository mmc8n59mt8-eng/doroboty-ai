# "Sieć połączeń" across the whole prototype

## Intent

The product owner asked to prepare every page in the DoRoboty.ai design system "Sieć połączeń" and refresh the whole prototype ("przygotuj wszystkie strony w naszej stylistyce, odśwież cały prototyp"). This extends `siec-polaczen-employer-screens.md` from the two employer screens to all routes, on branch `design/siec-polaczen`. It replaces Poster People as the visual direction on this branch; AGENTS.md, GUI.md and docs/design-system still describe Poster People and were not rewritten (a governance decision for the product owner).

## Approach

1. `src/features/prototype/shell.tsx`: the app root carries `.drai-theme`, so the scoped component layer (`siec-polaczen.css`) and fonts apply on every route.
2. `src/app/siec-polaczen-host.css` (loaded last) remaps the host tokens — `--gui-*`, marketplace `--pp-*` and the shadcn bridge — to the system values: Archivo / Instrument Serif / JetBrains Mono, paper #f7f3ef, frame #fffcfb, ink #17161d, muted #736b79, rule #e7e1e3, brick accent #b5533c with tint #f3dcd4, radius 0. Every Base UI primitive and recipe follows.
3. The same file overrides recipes that hard-code Poster People geometry: 24px cards and ink contours become thin rule frames; job cards become rows in one framed list; salary, tags and chips are square; headings are wide heavy sans; platform facts (job topline/facts/dates, counts, Match Score, record status, form labels) use the mono layer; status is text plus a square marker.
4. Primary action: the default Button variant carries `btn-primary` (accent tint, brick border, square corner marks). The logo mark is an ink outline, not an accent fill.
5. Entry pages: home has the mono eyebrow with real category counts, a two-face H1 (Instrument Serif italic clause + wide sans) and the network graphic (`network-graphic.tsx`, aria-hidden, the active node is "Własny wkład", the path is also stated in text). The listing hero uses the same two-face headline without the Poster People highlighter. Poster People illustrations are hidden.

## Validation

- `./scripts/verify` passed (exit 0): format, design-system kit check, lint, types, 29 unit tests, packet, build, **34/34 browser journeys** including axe.
- Browser journeys updated from Poster People values to system invariants: body background rgb(247,243,239); marketplace headings Archivo 800 with an italic Instrument Serif clause, mono job topline, square salary tags, no horizontal overflow at 1280/1100/850/390; homepage cards 0 radius with rule border and no shadow; search button brick border on accent tint; offer actions square Archivo.
- A real regression found by the journeys and fixed: with the wider Archivo the public header navigation overflowed at 768px; tablet widths now tighten nav gaps and action padding.
- Manually reviewed at 1280px: home, offer list, offer detail, company page, methodology, person picker, candidate dashboard/profile/apply/application detail/settings, employer offers/new offer/organization/candidates/application detail, instructor case page; the offer list at 390px.
- Not verified: a human visual review against the skill's P-series renders; the mobile filter dialog and sidebar menu were exercised only by the existing journeys, not reviewed visually.
