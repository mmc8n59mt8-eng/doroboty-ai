# "Sieć połączeń" design system on employer candidate screens

## Intent

At the product owner's request, apply the DoRoboty.ai design system "Sieć połączeń" (DesignSystemDoRobotyAI, Super Brain skill `7-Skills/design-system-doroboty-ai`, approved 2026-11-08) to the screens used in the own-contribution card test. This deliberately deviates from the repository rule that Poster People is the required visual direction; the deviation is scoped and kept on its own branch (`design/siec-polaczen`, based on `feature/karta-wlasnego-wkladu`).

## Scope

- Employer candidate list `/#/app/kandydaci` and application detail `/#/app/kandydaci/:id`.
- Everything else (shell/sidebar, marketplace, candidate screens, settings) keeps Poster People. The transition between the sidebar and the framed content is visible by design of this scope.

## Applied grammar

- Scoped stylesheet `src/app/siec-polaczen.css`, everything under `.drai-theme`; values copied from the skill core (`assets/components.html` up to END CORE). No global reset.
- Paper with 32px grid around a thin-line frame; working-screen H1 in wide sans without italics.
- Mono layer only for platform facts: company/offer eyebrow, counts in brackets, status, submission date, `Rola / …`, `Oznaczenie / symulacja AI`, Match Score value.
- List: rows with `↳`, name, mono status with square marker, own-work answer clamped to two lines, mono facts. Status filter group Wszystkie/Nowe/Przejrzane/Zaproszeni/Odrzuceni with live counts (aria-pressed buttons); empty state.
- Detail: mono status/date line, square tabs with ink selection, three 12px-radius content cards for the card answers, framed interview question, Match Score moved below the work example in mono with a description and "Co to znaczy?" (no invented component bars; the scenario stores only the total). Applications without a card show the score under the answer. Stage actions are square buttons; the non-rejecting action is the single brick primary with corner marks.
- Brick is used only for the primary action (corner marks) — no other accent use.

## Decisions and deviations

- **Muted text darkened from #7e7684 to #736b79.** axe found 4.27:1 on the frame surface (AA needs 4.5:1). New value: 4.63:1 on paper, 4.80:1 on the score panel, 5.01:1 on frame. This closes the skill's open WCAG item for muted text on these surfaces.
- **Fonts are not bundled.** Archivo, Instrument Serif and JetBrains Mono are referenced but no font files are shipped (the project forbids remote font endpoints). Screens currently render in the fallbacks Helvetica Neue / Georgia / Menlo. Bundling the OFL fonts locally is a follow-up needing approval to download them.
- The italic voice layer is not used: these are working screens, and the candidate's card answers are shown as body text inside cards.

## Validation

- `./scripts/verify` passed (exit 0, Node 24.22.2, Playwright Chromium 153): format, design-system kit check, lint, types, 29 unit tests, packet, build, 34/34 browser journeys including axe on the employer detail.
- One journey updated: the employer detail no longer has the header `.record-meta` score pill; it asserts `Match Score / 72 / 100` and its description instead.
- Manual browser checks as Karolina Wiśniewska: list and detail at 1280px; computed styles (mono 11.5px uppercase, H1 sans 40px, controls 0 radius, cards 12px); no horizontal overflow at 390px and 320px on list and detail.
- Not verified: rendering with the real fonts; visual comparison against the skill's P-series renders by a human.
