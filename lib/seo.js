/**
 * Single source of truth for the site's SEO/entity facts.
 * Every canonical URL, NAP string, and schema builder reads from here,
 * so the same fact never drifts into two different spellings again.
 */

export const SITE_URL = "https://theblessedwomb.in";
export const SITE_NAME = "The Blessed Womb";

export const CLINIC = {
  name: "The Blessed Womb",
  legalName: "Dr. Jyoti Maternity, Infertility & Ultrasound Centre",
  streetAddress: "Block D, Alpha I, Greater Noida",
  addressLocality: "Greater Noida",
  addressRegion: "Uttar Pradesh",
  postalCode: "201310",
  addressCountry: "IN",
  landmark: "Behind St. Joseph School",
  // Full, standardized single-line address string — use this everywhere
  // instead of re-typing the address, so "Alpha I" / "UP" / postal code
  // never drift out of sync again.
  fullAddress:
    "Block D, Alpha I, Greater Noida, Uttar Pradesh 201310 (Behind St. Joseph School)",
  phone: "+91 88826 63284",
  phoneHref: "tel:+918882663284",
  emails: ["drjyoticares@gmail.com", "drjyotigupta1281@gmail.com"],
  primaryEmail: "drjyoticares@gmail.com",
  mapsQueryUrl:
    "https://www.google.com/maps/search/?api=1&query=Block%20D%2C%20Alpha%20I%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201310",
};

export const DOCTOR = {
  name: "Dr. Jyoti Gupta",
  jobTitle: "Obstetrician & Gynaecologist",
  credentials: "MBBS, Dip. GO, PGDUS",
  // Kept as a single standardized string — used to fix the "20 years" vs
  // "20+ years" inconsistency found across the site.
  experience: "20+ years",
  experienceSentence: "more than 20+ years of experience",
};

// Twitter/X hasn't been supplied yet — left as an obvious placeholder.
// Swap it in later; nothing else needs to change (lib/schema.js already
// filters out anything still marked this way).
export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61594491808394",
  instagram: "https://www.instagram.com/theblessedwomb.in/",
  twitter: "https://twitter.com/PLACEHOLDER_UPDATE_ME",
  linkedin: "https://www.linkedin.com/in/jyoti-gupta-566a24436/",
  youtube: "https://www.youtube.com/channel/UCXVcITdbcYSu1JKNlNzr1Qw",
  googleBusinessProfile: "https://share.google/easMAEGiLEUfDdA8e",
};

// Confirmed clinic hours have not been supplied yet. This stays null on
// purpose: showing a specific "Mon-Sat 9am-6pm" style claim before it's
// verified would be a false statement patients could act on. The UI slot
// for hours already exists on /clinic and will use this the moment it's
// filled in with real values — no other file needs to change.
export const OPENING_HOURS = null; // e.g. [{ days: ["Mo","Tu","We","Th","Fr","Sa"], opens: "09:00", closes: "18:00" }]

const DEFAULT_OG_IMAGE = "/website-assets/Process_banner.jpg";

/**
 * Build a Next.js `metadata` object for a page, keeping title/description
 * unique per call while sharing canonical/OG/Twitter plumbing.
 */
export function buildMetadata({ path, title, description, ogImage }) {
  const url = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
