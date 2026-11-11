import { useEffect } from "react";
import { useLocation } from "react-router";
import { capturePageview } from "@/lib/analytics";

/** Reports each hash-route change to PostHog. Renders nothing. */
export function AnalyticsPageviews() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    capturePageview();
  }, [pathname, search]);
  return null;
}
