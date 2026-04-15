import posthog from "posthog-js";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
}

export function trackCTA(buttonName: string, location: string) {
  trackEvent("cta_click", "engagement", `${buttonName} - ${location}`);
  posthog?.capture("cta_clicked", { button_name: buttonName, location });
}

export function trackSectionView(sectionId: string) {
  trackEvent("section_view", "scroll", sectionId);
  posthog?.capture("section_viewed", { section_id: sectionId });
}

export function trackFAQOpen(question: string) {
  trackEvent("faq_open", "engagement", question);
  posthog?.capture("faq_question_opened", { question });
}

export function trackNavClick(label: string) {
  trackEvent("nav_click", "navigation", label);
  posthog?.capture("nav_link_clicked", { label });
}
