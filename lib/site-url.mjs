// Shared by Next's redirect configuration, page metadata and URL audits.
export const CANONICAL_ORIGIN = "https://theblessedwomb.in";

const configured = new URL(
  (process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_ORIGIN).trim()
);

if (
  !["http:", "https:"].includes(configured.protocol) ||
  configured.username || configured.password ||
  configured.pathname !== "/" || configured.search || configured.hash
) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a website origin without a path, query or credentials.");
}

// Older Vercel environment settings must not bring back www canonicals.
// Both legacy spellings of this site's host resolve to its HTTPS apex.
if (["theblessedwomb.in", "www.theblessedwomb.in"].includes(configured.hostname)) {
  configured.protocol = "https:";
  configured.hostname = "theblessedwomb.in";
  configured.port = "";
}

export const SITE_URL = configured.origin;
