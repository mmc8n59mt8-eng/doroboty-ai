# Recruiter entry from the person picker

## Intent

Since 8489807 the header button "Wybierz osobę" opened the picker scoped to candidates, and the only recruiter entry ("Dla firm") is hidden below 768px. Recruiter personas were effectively unreachable from the homepage on phones.

## Acceptance criteria

- "Wybierz osobę" opens all selectable personas, grouped under Kandydaci, Pracodawcy and Prowadzący, each with a one-line description.
- Recruiters can be entered from the homepage at 1280px and 390px without horizontal overflow.
- Audience-scoped entries (Dla firm, apply flows) keep listing only matching personas.
- FEATURES.md PUB-10 describes the behavior.

## Decision

"Dla firm" stays desktop-only: at 320px the header cannot fit it next to the picker button, and the grouped picker already exposes recruiters on every width.
