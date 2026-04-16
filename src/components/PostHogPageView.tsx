import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { usePostHog } from "@posthog/react";

/**
 * SPA pageviews: explicit $pageview on route changes (init uses capture_pageview: false
 * so this is the single source of truth and avoids double-count vs history_change defaults).
 */
export function PostHogPageView() {
  const location = useLocation();
  const posthog = usePostHog();
  const lastCaptureRef = useRef<{ key: string; at: number } | null>(null);

  useEffect(() => {
    if (!posthog) return;
    const key = `${location.pathname}${location.search}`;
    const now = Date.now();
    const prev = lastCaptureRef.current;
    if (prev && prev.key === key && now - prev.at < 80) return;
    lastCaptureRef.current = { key, at: now };

    const url = `${window.location.origin}${location.pathname}${location.search}`;
    posthog.capture("$pageview", {
      $current_url: url,
    });
  }, [posthog, location.pathname, location.search]);

  return null;
}
