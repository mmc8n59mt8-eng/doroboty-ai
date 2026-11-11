# PostHog analytics

## Intent and acceptance

Connect the prototype to PostHog (EU cloud, project 345026) to observe real use. Initialize posthog-js once in src/main.tsx through src/lib/analytics.ts. Analytics stays off unless `VITE_POSTHOG_KEY` is set at build time, so local tests, CI and participant packages send nothing. Hash-route pageviews are captured on history changes; form inputs are masked in session replay; person profiles only for identified users.

Open: the prototype disclosure (PUB-14), privacy page (PUB-09) and FEATURES "no cloud analytics" limit say nothing is sent. They must be updated before the key is enabled on a deployed build.

## Disclosure update

Exported `analyticsEnabled` (key set and not an automated browser). The PUB-14 banner and PUB-09 privacy page render analytics-aware copy when it is true and keep the previous wording otherwise, so the existing e2e assertion still describes the test environment truthfully. Added SYS-12 and revised PUB-09, PUB-14 and the implementation-limits line in FEATURES.md.

## Pageview fix

Live check showed `capture_pageview: "history_change"` sent no `$pageview` on hash-route changes (the URL path stays `/`). Replaced with `capture_pageview: false` plus an `AnalyticsPageviews` component inside HashRouter that captures one `$pageview` per distinct URL. Autocapture stays on: SDK default, and the project's remote config returns `autocapture_opt_out: false`.
