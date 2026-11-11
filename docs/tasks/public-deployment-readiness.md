# Public deployment readiness fixes

## Intent

The prototype is published at https://doroboty-ai.netlify.app (Netlify, Free plan, continuous deployment from `design/siec-polaczen`). The production-readiness audit of 2026-11-11 found that visitors are not told it is a prototype, and that the operating checklist covered only the local demo.

## Acceptance criteria

- Every public page and the workspace show, without interaction, that this is a teaching prototype with fictional data and that nothing is sent.
- The note fits 390px and 1280px widths without overflow and does not interfere with the fixed workspace sidebar.
- docs/DEMO_CHECKLIST.md describes the Free-plan credit budget, a post-publication check, version rollback (fix forward with `git revert`) and a plan B for the public version.
- FEATURES.md records the new behavior.

## Out of scope

Contact information (needs the owner's contact), error collection and failure alerts (owner decisions), repository visibility, course consent and token revocation (owner actions).

## Result

Recorded in docs/production-readiness.html after `npm run check`.
