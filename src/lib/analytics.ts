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
}

export function trackSectionView(sectionId: string) {
  trackEvent("section_view", "scroll", sectionId);
}

export function trackFAQOpen(question: string) {
  trackEvent("faq_open", "engagement", question);
}

export function trackNavClick(label: string) {
  trackEvent("nav_click", "navigation", label);
}
