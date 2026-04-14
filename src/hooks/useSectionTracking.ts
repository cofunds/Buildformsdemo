import { useEffect } from "react";
import { trackSectionView } from "@/lib/analytics";

const TRACKED_SECTIONS = [
  "problem",
  "features",
  "why-different",
  "book-a-demo",
  "faq",
];

export function useSectionTracking() {
  useEffect(() => {
    const seen = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && !seen.has(id)) {
            seen.add(id);
            trackSectionView(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
