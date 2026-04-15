<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the BuildForms landing page. PostHog is initialized in `src/main.tsx` with the EU cloud host, and the app is wrapped in `PostHogProvider` and `PostHogErrorBoundary` for automatic error capture. Event tracking was added to the existing analytics utility module (`src/lib/analytics.ts`), placing PostHog `capture()` calls alongside the existing Google Analytics calls — preserving all existing GA tracking while adding PostHog in parallel. A `demo_booking_opened` event was added to `src/components/calcom.tsx` to track when users open the Cal.com demo booking dialog.

| Event | Description | File |
|---|---|---|
| `cta_clicked` | User clicks a primary CTA button (Start Hiring Free, Get Started Free) | `src/lib/analytics.ts` |
| `demo_booking_opened` | User opens the Cal.com demo booking dialog | `src/components/calcom.tsx` |
| `nav_link_clicked` | User clicks a navigation link in the navbar | `src/lib/analytics.ts` |
| `faq_question_opened` | User expands a FAQ accordion item | `src/lib/analytics.ts` |
| `section_viewed` | User scrolls to and views a key landing page section | `src/lib/analytics.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/159856/dashboard/623841
- **CTA Clicks Over Time**: https://eu.posthog.com/project/159856/insights/essKyzh4
- **CTA → Demo Booking Funnel**: https://eu.posthog.com/project/159856/insights/wYhLUlaD
- **Demo Bookings Over Time**: https://eu.posthog.com/project/159856/insights/V7Oqm6Ji
- **CTA Clicks by Button and Location**: https://eu.posthog.com/project/159856/insights/ENXdMenK
- **Top FAQ Questions Opened**: https://eu.posthog.com/project/159856/insights/sDkanhBG

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
