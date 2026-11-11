import posthog from "posthog-js";

// PostHog product analytics. Disabled unless VITE_POSTHOG_KEY is set at build
// time, so tests, CI and participant packages stay fully offline.
// The project key (phc_...) is a public write-only token, not a secret.
const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const host =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? "https://eu.i.posthog.com";

// Skip automated browsers (Playwright) so test runs do not pollute real data.
export const analyticsEnabled =
  Boolean(key) && typeof window !== "undefined" && !navigator.webdriver;

export function initAnalytics(): void {
  if (!analyticsEnabled || !key) return;
  posthog.init(key, {
    api_host: host,
    defaults: "2025-05-24",
    // Hash routes keep the URL path at "/", which PostHog's history_change mode
    // ignores. AnalyticsPageviews sends $pageview from React Router instead.
    capture_pageview: false,
    capture_pageleave: true,
    person_profiles: "identified_only",
    // Never record free text typed into forms (CVs, applications, notes).
    session_recording: { maskAllInputs: true },
  });
}

let lastPageviewUrl: string | undefined;

/** Sends one $pageview per distinct hash route (dedupes StrictMode re-runs). */
export function capturePageview(): void {
  if (!analyticsEnabled) return;
  const url = window.location.href;
  if (url === lastPageviewUrl) return;
  lastPageviewUrl = url;
  posthog.capture("$pageview");
}

export { posthog };
