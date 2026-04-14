import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BETA_ORIGIN = "https://beta.buildforms.so";

/**
 * Sends the visitor to the same path on beta (public form / workspace links).
 */
export function BetaPathRedirect() {
  const location = useLocation();

  useEffect(() => {
    const target = `${BETA_ORIGIN}${location.pathname}${location.search}${location.hash}`;
    window.location.replace(target);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
