import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import posthog from "posthog-js";
import { PostHogProvider } from "@posthog/react";
import { PostHogErrorBoundary } from "@/components/PostHogErrorBoundaryCompat";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-01-30",
  /** Router fires $pageview in PostHogPageView (avoids duplicate autocapture + strict-mode doubles). */
  capture_pageview: false,
});

createRoot(document.getElementById("root")!).render(
  <PostHogProvider client={posthog}>
    <PostHogErrorBoundary>
      <App />
    </PostHogErrorBoundary>
  </PostHogProvider>
);
