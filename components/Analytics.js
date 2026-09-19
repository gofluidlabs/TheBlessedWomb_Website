"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent, resolveLinkLocation, currentPageContext } from "@/lib/analytics";

/**
 * Two responsibilities, both dataLayer-only (no visible UI):
 *
 * 1. SPA page-view signal. Next.js App Router navigations don't trigger a
 *    real page load, so GTM's own container-init page_view (fired once,
 *    on "Initialization") never repeats on client-side route changes. We
 *    push a distinctly-named "spa_page_view" event on every route change
 *    after the first — GTM must map this to a GA4 page_view **event** tag
 *    (not the config/Google tag) via a Custom Event trigger; see the
 *    Google-side setup checklist. Named "spa_page_view" rather than
 *    "page_view" specifically so it can't be confused with — or double
 *    fire alongside — the Google tag's own automatic initial page_view.
 *
 * 2. Global click delegation for objectively-identifiable link types
 *    (tel:, mailto:, Google Maps, WhatsApp) plus any element carrying
 *    `data-track`/`data-track-location` attributes (used for the curated
 *    set of appointment CTAs and nav items — see components that set
 *    them). One listener here means new tel:/mailto:/maps links anywhere
 *    in the app are tracked automatically, with no per-component wiring.
 */
export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const query = searchParams?.toString();
    trackEvent("spa_page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_title: typeof document !== "undefined" ? document.title : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(e) {
      const el = e.target.closest("a[data-track], button[data-track], a[href]");
      if (!el) return;

      const explicitEvent = el.getAttribute("data-track");
      if (explicitEvent) {
        trackEvent(explicitEvent, {
          link_location: el.getAttribute("data-track-location") || resolveLinkLocation(el),
          ...currentPageContext(),
        });
        return;
      }

      const href = el.getAttribute("href") || "";
      let event = null;
      if (href.startsWith("tel:")) event = "phone_click";
      else if (href.startsWith("mailto:")) event = "email_click";
      else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) event = "whatsapp_click";
      else if (href.includes("google.com/maps") || href.includes("maps.app.goo.gl")) event = "directions_click";
      if (!event) return;

      trackEvent(event, {
        link_location: resolveLinkLocation(el),
        ...currentPageContext(),
      });
    }

    document.addEventListener("click", onClick, { passive: true });
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
