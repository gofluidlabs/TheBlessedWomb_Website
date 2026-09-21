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

/**
 * A social URL, or null if it's still the obvious placeholder.
 *
 * Every consumer — the footer, the team card and the schema graph — goes
 * through this, so a profile that hasn't been supplied yet can never be
 * rendered as a live link to twitter.com/PLACEHOLDER_UPDATE_ME. A broken
 * outbound link is both a bad visitor experience and a weak external-link
 * signal, so it should never ship just because one component forgot to
 * check.
 */
export function socialUrl(key) {
  const url = SOCIAL[key];
  return url && !url.includes("PLACEHOLDER_UPDATE_ME") ? url : null;
}

/** Keep only the entries whose profile URL is real. */
export function realSocials(entries) {
  return entries.filter((e) => socialUrl(e.key));
}

// Confirmed clinic hours have not been supplied yet. This stays null on
// purpose: showing a specific "Mon-Sat 9am-6pm" style claim before it's
// verified would be a false statement patients could act on. The UI slot
// for hours already exists on /clinic and will use this the moment it's
// filled in with real values — no other file needs to change.
export const OPENING_HOURS = null; // e.g. [{ days: ["Mo","Tu","We","Th","Fr","Sa"], opens: "09:00", closes: "18:00" }]

// Exact lat/long of the clinic entrance, for LocalBusiness `geo` and the
// Google Business Profile pin. Left null until it's read off the real GBP
// listing: a guessed pin is worse than no pin, because Google cross-checks
// it against the profile and a mismatch weakens the local ranking signal
// instead of helping it. Fill as { latitude: 28.xxxx, longitude: 77.xxxx }.
export const GEO = null;

// ---------------------------------------------------------------------------
// Keyword architecture
// ---------------------------------------------------------------------------

/**
 * Superlative phrasing ("Best Gynaecologist in Greater Noida") is the
 * highest-volume commercial query in this niche, so it is targeted — but
 * it is gated behind this one flag on purpose.
 *
 * The NMC (Professional Conduct, Etiquette and Ethics) Regulations restrict
 * how a registered practitioner in India may advertise, and superlative
 * self-claims are the part most often challenged. Flip this to `false` and
 * every title, description and keyword on the site drops to comparative,
 * non-superlative phrasing in one edit — no page files need to change.
 */
export const USE_SUPERLATIVES = true;

/** "Best Gynaecologist" when superlatives are on, "Gynaecologist" when off. */
export function sup(superlativeForm, plainForm) {
  return USE_SUPERLATIVES ? superlativeForm : plainForm;
}

/**
 * Localities the clinic genuinely serves from Alpha I. Used for
 * `areaServed` in schema, the footer service-area block, and locality
 * keyword permutations. Ordered roughly by proximity, because the first
 * few are the ones that carry the most weight in each list.
 */
export const SERVICE_AREAS = [
  "Alpha 1",
  "Alpha 2",
  "Beta 1",
  "Beta 2",
  "Gamma 1",
  "Gamma 2",
  "Delta 1",
  "Delta 2",
  "Jagat Farm",
  "Swarn Nagari",
  "Pari Chowk",
  "Knowledge Park",
  "Omega 1",
  "Sigma 1",
  "Zeta 1",
  "Eta 1",
  "Chi 1",
  "Mu 1",
  "Pi 1",
  "Surajpur",
  "Kasna",
  "Dadri",
  "Greater Noida West",
  "Noida Extension",
  "Gaur City",
  "Bisrakh",
  "Techzone 4",
  "Ecotech",
  "Sector Chi",
  "Noida",
];

/**
 * Core commercial keywords. These are the terms the site is actually
 * trying to rank for, kept in one list so a page can pull the slice it
 * deserves rather than every page stuffing the same 40 phrases.
 */
export const KEYWORDS = {
  brand: [
    "The Blessed Womb",
    "The Blessed Womb Greater Noida",
    "theblessedwomb.in",
    "Dr. Jyoti Gupta",
    "Dr Jyoti Gupta Greater Noida",
    "Dr Jyoti Greater Noida",
    "Dr Jyoti gynaecologist",
    // Deliberately written without the comma that appears in the legal
    // name: the meta keywords tag is comma-separated, so an embedded comma
    // would split this into two meaningless fragments.
    "Dr Jyoti Maternity Infertility & Ultrasound Centre",
  ],
  core: [
    sup("best gynaecologist in Greater Noida", "gynaecologist in Greater Noida"),
    sup("best gynecologist in Greater Noida", "gynecologist in Greater Noida"),
    sup("best obstetrician in Greater Noida", "obstetrician in Greater Noida"),
    sup("best gynae and obs clinic", "gynae and obs clinic"),
    sup(
      "best gynae and obs clinic in Greater Noida",
      "gynae and obs clinic in Greater Noida"
    ),
    "obs and gynae clinic Greater Noida",
    "gynae clinic Greater Noida",
    "lady gynaecologist in Greater Noida",
    "female gynaecologist in Greater Noida",
    "gynaecologist near me Greater Noida",
    "women's clinic Greater Noida",
  ],
  maternity: [
    "maternity centre Greater Noida",
    "pregnancy doctor Greater Noida",
    "antenatal care Greater Noida",
    "pregnancy care Greater Noida",
    "obstetrician Greater Noida",
    "delivery doctor Greater Noida",
    "high risk pregnancy Greater Noida",
  ],
  fertility: [
    "infertility specialist Greater Noida",
    "infertility treatment Greater Noida",
    "fertility clinic Greater Noida",
    "fertility evaluation Greater Noida",
    "PCOS treatment Greater Noida",
  ],
  ultrasound: [
    "ultrasound centre Greater Noida",
    "pregnancy scan Greater Noida",
    "obstetric ultrasound Greater Noida",
    "Doppler scan Greater Noida",
    "sonography centre Greater Noida",
    "NT scan Greater Noida",
    "anomaly scan Greater Noida",
  ],
  local: [
    sup(
      "best gynaecologist in Alpha 1 Greater Noida",
      "gynaecologist in Alpha 1 Greater Noida"
    ),
    "gynaecologist Alpha 1 Greater Noida",
    "gynaecologist Greater Noida West",
    "gynaecologist Noida Extension",
    "gynaecologist near Pari Chowk",
    "gynaecologist near Jagat Farm",
    "women's doctor Greater Noida",
  ],
};

/** Flatten the named keyword groups into one de-duplicated list. */
export function keywordSet(...groups) {
  const out = [];
  for (const g of groups) {
    for (const k of KEYWORDS[g] || []) {
      if (!out.includes(k)) out.push(k);
    }
  }
  return out;
}

/**
 * Build a Next.js `metadata` object for a page, keeping title/description
 * unique per call while sharing canonical/OG/Twitter plumbing.
 *
 * `ogImage` is deliberately left unset by most callers. When it is absent,
 * the `opengraph-image.js` file colocated with the route supplies the
 * branded share card — and it also fills in og:image:width/height/alt,
 * which a hand-written `images` entry would not. Setting `images` here
 * unconditionally would silently override those generated cards, so it is
 * only emitted for pages that genuinely have their own artwork (blog posts
 * passing their featured image).
 */
export function buildMetadata({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  keywords,
  robots,
  type = "website",
}) {
  const url = `${SITE_URL}${path}`;
  // The social title is allowed to differ from the SEO title, and usually
  // should. A <title> is written for a search results page and leads with
  // the keyword ("Best Gynaecologist in Greater Noida | ..."); a WhatsApp
  // or Facebook card is read by a person who was sent the link by someone
  // they know, and reads better led by the brand and the doctor's name.
  // Pages that don't pass these fall back to the SEO strings.
  const social = {
    title: ogTitle || title,
    description: ogDescription || description,
  };
  const meta = {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: social.title,
      description: social.description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: social.title,
      description: social.description,
    },
  };
  if (ogImage) {
    meta.openGraph.images = [{ url: ogImage }];
    meta.twitter.images = [ogImage];
  }
  if (keywords && keywords.length) meta.keywords = keywords;
  if (robots) meta.robots = robots;
  return meta;
}
