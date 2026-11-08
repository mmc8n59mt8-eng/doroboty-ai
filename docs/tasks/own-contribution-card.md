# Own-contribution card for employer review

## Intent

Prototype for the AIPH3 discovery opportunity O1: before inviting someone, an employer wants to know what the candidate did personally and whether it worked in practice. Since June, assistant-written answers sound alike and Match Score no longer separates candidates who continue after the first conversation.

The card shows three structured answers next to each application: what the candidate did personally (versus the team), who used the result and for how long, and the outcome. It adds an ownership label ("Własna odpowiedzialność" / "Udział lub wsparcie") and one suggested interview question.

## Scope

- Employer candidate list (`/#/app/kandydaci`): every row with a card shows the ownership label and the own-work answer instead of the generic summary and score.
- Employer application detail (`/#/app/kandydaci/:id`): a first record tab "Własny wkład" with the three answers, the label and the suggested question. Existing "Odpowiedź" and "CV" tabs, stage actions, notes and history are unchanged.
- Scenario data: seven synthetic background candidates applying to "AI Product Manager" at BrightLabs, plus a card for the existing Marek Nowak application, so the employer task ("you have time for 3 conversations; who do you invite and why?") has eight applications to compare. Background candidates are not offered in the person picker.
- The candidate application form is unchanged. Cards come from prepared scenario data; the ownership label and question are labelled as simulated preparation, not a live AI assessment.

Out of scope: candidate-side card entry, sorting/filtering by label, persistence of new fields from the candidate form, changes to Match Score calculation.

## Acceptance criteria

1. As Karolina Wiśniewska, the list shows eight applications for "AI Product Manager", each with its ownership label and own-work text, readable without opening the detail.
2. Opening an application shows the "Własny wkład" tab first, with three headed answers, the label, the suggested question and a note that label/question are scenario-prepared.
3. Stage actions still move applications to "Zaproszenie na rozmowę"; the list reflects the stage after reload.
4. Older stored or imported state without cards remains valid; applications without a card keep the previous list row and tabs.
5. Tomasz Zieliński (other company) sees none of these applications.
6. Desktop 1280px and mobile 390/320px have no horizontal overflow; tabs remain keyboard operable.
7. `./scripts/verify` passes, or actual failures are reported.

## Design-system mapping

Composition of existing host recipes: `prototype-panel` list rows, `RecordSheet` tabs and `record-reading` typography with 26px H3 headings, `record-caption` for the scenario note. The ownership label is a noninteractive supporting fact pill (light pink for own responsibility, paper with ink contour for participation/support); its text carries the meaning, so color is supplementary. No new font, color family or card family.

## Validation

Implemented on branch `feature/karta-wlasnego-wkladu` (not committed).

### Executed checks (Node 24.22.2)

- `format:check`, `design-system:check` (67 files, 333 references), `lint`, `typecheck`, `npm test` (29 unit tests, including two new: eight carded seed applications with hidden personas, and legacy state without the new fields still parses), `verify:packet` and `build` all passed. Build shows the existing chunk-size warning only.
- **`./scripts/verify` passed (exit 0)** after the user approved provisioning Playwright Chromium 153.0.8010.12 (`npx playwright install chromium`): all gate steps plus **34 of 34 browser journeys**.
- Before provisioning, the 34 journeys ran against the installed Google Chrome through a temporary config outside the repository (same settings plus `channel: "chrome"`): **32 passed, 2 failed**.
  - Failed: "Anna Kowalska / Marek Nowak has the same local PDF in profile, application and employer detail". Branded Chrome loads its built-in PDF viewer (`chrome-extension://…/pdf_viewer_wrapper.js`, `chrome://resources/…`), which the journey counts as external requests. The same two journeys fail identically on the unchanged baseline (`git stash`) with this browser, so this is an environment difference, not a regression. Confirmed: both pass on provisioned Chromium.
  - The first run also failed "process sheet renders custom snapshots and long content on narrow screens": with three tabs, the "CV" tab was clipped at 320px. Fixed with a <=600px tab gap/padding rule (and wrap as a fallback) in `records.css`; the journey now passes.
- One browser journey was updated for the new first tab (Home now focuses "Własny wkład"; ArrowRight reaches "Odpowiedź"); it passes.
- Manual checks in the dev server after clearing local storage: person picker still shows exactly five personas; as Karolina the list shows eight applications with labels (4 own, 4 support) and no score in carded rows; the detail opens on "Własny wkład" with three answers, label, question and the simulation caption; the full task (3 invited, 5 rejected) persisted after reload; Settings reset restored eight submitted applications; no horizontal overflow at 390px and 320px.

### Remaining gaps

- No separate review pass yet.

## Revision after the O1 fit check (2026-11-08, branch design/siec-polaczen)

The product owner's fit check against opportunity O1 (Super Brain `analyses/2026-11-08-zgodnosc-prototypu-z-O1.md`) found that the scenario could inflate the test result. Changes:

1. **Less idealised data.** Six applications to the BrightLabs "AI Operations Specialist" offer (category Apply) were added, including two mixed cases: own responsibility with a vague, unmeasured outcome and Match Score 87; support role with a concrete, measured contribution and Match Score 61. Two Lead scores were adjusted (Ewa 64 → 83, Kacper 85 → 67) so ownership no longer maps one-to-one onto the score. A unit test asserts the overlap.
2. **One-click invite.** Opening a new application as the employer records "W przeglądzie" (so it appears under "Przejrzane"); the employer actions are "Zaproś na rozmowę" (primary) and "Odrzuć". Stage names in history are unchanged.
3. **Second category.** The candidate list has an "Ogłoszenie" filter; header count and status counts follow it. The Apply offer is the default for sessions because interviews located the O1 difficulty in roles where AI is a new area; the only Lead interviewee (F2) did not report it.

Validation: `./scripts/verify` passed (exit 0), 29 unit tests and 34/34 browser journeys (two journeys updated for auto-review and the new action labels). Manually checked as Karolina: the offer filter shows 6 Apply applications with mixed labels; opening Michał's application moved it to review; one click invited him and "Zaproszeni [1]" updated. Known limitation: the offer filter resets when returning to the list.
