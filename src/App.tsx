import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookDemoProvider } from "@/components/calcom";
import { PostHogPageView } from "@/components/PostHogPageView";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const BetaPathRedirect = lazy(() =>
  import("@/components/BetaPathRedirect.tsx").then((m) => ({
    default: m.BetaPathRedirect,
  }))
);

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div
      className="min-h-[40vh] flex items-center justify-center text-muted-foreground text-sm"
      aria-busy="true"
    >
      Loading…
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookDemoProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PostHogPageView />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/f/*" element={<BetaPathRedirect />} />
              <Route path="/w/*" element={<BetaPathRedirect />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </BookDemoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
