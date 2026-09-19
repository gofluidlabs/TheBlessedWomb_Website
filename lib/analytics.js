/**
 * Single entry point for pushing events into the GTM dataLayer.
 *
 * This is a healthcare site: never pass patient names, phone numbers,
 * email addresses, medical/appointment details, or form contents into
 * `params`. Only anonymous, behavioural/technical context belongs here
 * (page_path, page_title, link_location, navigation_item, form_location,
 * etc). Every call site in this codebase has been reviewed against that
 * rule — keep new call sites to the same standard.
 *
 * Wrapped in try/catch and guarded for SSR/blocked-script environments
 * so analytics can never break the site: if GTM is blocked by an ad
 * blocker, or this runs during server rendering, dataLayer.push simply
 * doesn't happen — nothing else is affected.
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
  } catch {
    // Analytics must never break the site — swallow and move on.
  }
}

/**
 * Resolves which named area of the page a clicked element sits in, for
 * the link_location parameter. Maps to a fixed, small vocabulary
 * (header, hero, footer, mobile_navigation, contact, other) rather than
 * raw class names, so GA4 reports stay clean regardless of future CSS
 * refactors.
 */
const LOCATION_SELECTORS = [
  [".mobile-bottom-nav", "mobile_navigation"],
  [".mbn-sheet", "mobile_navigation"],
  [".site-header", "header"],
  [".hero", "hero"],
  [".footer-wrap", "footer"],
  [".welcome-modal", "other"],
  [".contact-info", "contact"],
  [".contact-form-card", "contact"],
];

export function resolveLinkLocation(el) {
  for (const [selector, location] of LOCATION_SELECTORS) {
    if (el.closest(selector)) return location;
  }
  return "other";
}

export function currentPageContext() {
  if (typeof window === "undefined") return {};
  return {
    page_path: window.location.pathname,
    page_title: document.title,
  };
}
