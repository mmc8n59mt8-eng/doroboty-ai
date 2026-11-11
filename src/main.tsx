import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./features/prototype/app";
import "./app/globals.css";
import posthog, { isPostHogConfigured } from "./lib/posthog";

createRoot(document.getElementById("root")!, {
  onUncaughtError(error) {
    if (isPostHogConfigured) posthog.captureException(error);
  },
}).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
