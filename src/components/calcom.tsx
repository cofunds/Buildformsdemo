import Cal from "@calcom/embed-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/** Public booking page — used to derive embed origin and path. */
export const CAL_BOOKING_PAGE_URL =
  "https://www.cal.eu/buildforms.so/demo";

export type CalEmbedParams = {
  calLink: string;
  calOrigin: string;
  embedJsUrl: string;
};

/** Parses a full Cal booking URL into props for `<Cal />` (cal.com, cal.eu, or same-origin). */
export function getCalEmbedParamsFromPageUrl(
  pageUrl: string
): CalEmbedParams | null {
  try {
    const u = new URL(pageUrl);
    const path = u.pathname.replace(/^\/+|\/+$/g, "");
    if (!path) return null;
    const calOrigin = u.origin;
    return {
      calLink: path,
      calOrigin,
      embedJsUrl: `${calOrigin}/embed/embed.js`,
    };
  } catch {
    return null;
  }
}

const defaultEmbedParams =
  getCalEmbedParamsFromPageUrl(CAL_BOOKING_PAGE_URL) ?? {
    calLink: "buildforms.so/demo",
    calOrigin: "https://www.cal.eu",
    embedJsUrl: "https://www.cal.eu/embed/embed.js",
  };

type BookDemoContextValue = {
  openBookDemo: () => void;
};

const BookDemoContext = createContext<BookDemoContextValue | null>(null);

export function BookDemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBookDemo = useCallback(() => setOpen(true), []);

  const value = useMemo(() => ({ openBookDemo }), [openBookDemo]);

  return (
    <BookDemoContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
            max-w-[calc(100vw-2rem)]
            sm:max-w-[calc(100vw-4rem)]
            md:!max-w-4xl
            max-h-[90vh]
            overflow-hidden
            p-0
            rounded-xl
            border-border
            bg-white
            text-foreground
            shadow-2xl
            ring-offset-background
            [&>button]:text-muted-foreground
            [&>button]:hover:bg-muted
            [&>button]:hover:text-foreground
            [&>button]:ring-offset-background
          "
        >
          <DialogHeader className="px-6 pt-6 pb-4"/>
          
          <div className="overflow-y-auto max-h-[calc(90vh-160px)] w-full bg-white px-2 pb-4 sm:px-3">
            {open ? (
              <Cal
                namespace="book-demo"
                calLink={defaultEmbedParams.calLink}
                calOrigin={defaultEmbedParams.calOrigin}
                embedJsUrl={defaultEmbedParams.embedJsUrl}
                config={{
                  layout: "month_view",
                  useSlotsViewOnSmallScreen: "true",
                  theme: "light",
                  "ui.color-scheme": "light",
                }}
                className="w-full h-[600px]"
                style={{ width: "100%", height: "100%" }}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </BookDemoContext.Provider>
  );
}

export function useOpenBookDemo(): () => void {
  const ctx = useContext(BookDemoContext);
  if (!ctx) {
    throw new Error("useOpenBookDemo must be used within BookDemoProvider");
  }
  return ctx.openBookDemo;
}
