import {
  SITE_URL,
  SITE_NAME,
  CLINIC,
  DOCTOR,
  OPENING_HOURS,
  GEO,
  SERVICE_AREAS,
  socialUrl,
} from "./seo";

const CLINIC_ID = `${SITE_URL}/#clinic`;
const DOCTOR_ID = `${SITE_URL}/#dr-jyoti-gupta`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

// Brand-level profiles (the clinic's own pages) vs. personal profiles
// (Dr. Jyoti Gupta's own accounts) are attached to different schema
// entities so each sameAs claim is actually accurate. socialUrl() filters
// out anything still set to a placeholder — see lib/seo.js.
const clinicSocialLinks = [
  "facebook",
  "instagram",
  "youtube",
  "twitter",
  "googleBusinessProfile",
]
  .map(socialUrl)
  .filter(Boolean);

const doctorSocialLinks = ["linkedin"].map(socialUrl).filter(Boolean);

/**
 * The services actually offered, mirroring the visible list on the home
 * page. Kept here as MedicalProcedure entries so Google can read the
 * clinic's scope of practice rather than inferring it from body copy.
 */
const SERVICES = [
  {
    name: "Antenatal Care & Pregnancy Supervision",
    type: "MedicalProcedure",
    category: "Obstetric",
  },
  {
    name: "Clinically Indicated Pregnancy Scans",
    type: "MedicalProcedure",
    category: "Diagnostic",
  },
  {
    name: "Pregnancy & Gynaecological Ultrasound",
    type: "MedicalProcedure",
    category: "Diagnostic",
  },
  { name: "Doppler Studies", type: "MedicalProcedure", category: "Diagnostic" },
  {
    name: "Gynaecological Consultation",
    type: "MedicalProcedure",
    category: "Gynecologic",
  },
  {
    name: "Infertility & Fertility Evaluation",
    type: "MedicalProcedure",
    category: "Gynecologic",
  },
];

function serviceEntities() {
  return SERVICES.map((s) => ({
    "@type": s.type,
    name: s.name,
    category: s.category,
  }));
}

/**
 * `areaServed` as an explicit list of the localities around Alpha I.
 * This is the single strongest structured-data signal for "gynaecologist
 * in <locality>" style queries across Greater Noida, because it states
 * the service area rather than leaving Google to guess it from the
 * street address alone.
 */
function areaServed() {
  return [
    { "@type": "City", name: "Greater Noida" },
    ...SERVICE_AREAS.map((area) => ({
      "@type": "Place",
      name: `${area}, Greater Noida`,
    })),
  ];
}

export function logoSchema() {
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${SITE_URL}/icons/icon-512.png`,
    contentUrl: `${SITE_URL}/icons/icon-512.png`,
    width: 512,
    height: 512,
    caption: SITE_NAME,
  };
}

export function clinicSchema() {
  const schema = {
    // MedicalClinic is the specific subtype for a facility that provides
    // medical care, so it carries more meaning than the generic
    // MedicalBusiness; LocalBusiness is listed alongside it so the entry
    // is also read as a local business for map/local-pack purposes.
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": CLINIC_ID,
    name: CLINIC.name,
    legalName: CLINIC.legalName,
    alternateName: [
      CLINIC.legalName,
      "The Blessed Womb Greater Noida",
      "Dr. Jyoti Gupta Clinic",
    ],
    description: `${CLINIC.name} (${CLINIC.legalName}) is an obstetrics and gynaecology clinic in Alpha I, Greater Noida, led by ${DOCTOR.name}, ${DOCTOR.jobTitle} with ${DOCTOR.experience} of experience. Services include antenatal care, pregnancy scans, ultrasound, Doppler studies, gynaecological consultation and infertility evaluation.`,
    url: SITE_URL,
    telephone: CLINIC.phone,
    email: CLINIC.primaryEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.streetAddress,
      addressLocality: CLINIC.addressLocality,
      addressRegion: CLINIC.addressRegion,
      postalCode: CLINIC.postalCode,
      addressCountry: CLINIC.addressCountry,
    },
    image: `${SITE_URL}/website-assets/location_banner.jpg`,
    logo: { "@id": LOGO_ID },
    hasMap: CLINIC.mapsQueryUrl,
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    areaServed: areaServed(),
    availableService: serviceEntities(),
    employee: { "@id": DOCTOR_ID },
    founder: { "@id": DOCTOR_ID },
    knowsLanguage: ["en", "hi"],
    isAcceptingNewPatients: true,
  };
  if (clinicSocialLinks.length) schema.sameAs = clinicSocialLinks;
  // Geo coordinates are intentionally omitted until the real pin is read
  // off the Google Business Profile — see lib/seo.js GEO comment.
  if (GEO) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    };
  }
  // Opening hours are intentionally omitted until real, confirmed hours
  // are supplied — see lib/seo.js OPENING_HOURS comment.
  if (OPENING_HOURS) {
    schema.openingHoursSpecification = OPENING_HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  return schema;
}

export function doctorSchema() {
  const schema = {
    "@type": "Physician",
    "@id": DOCTOR_ID,
    name: DOCTOR.name,
    alternateName: ["Dr Jyoti Gupta", "Dr. Jyoti"],
    jobTitle: DOCTOR.jobTitle,
    description: `${DOCTOR.name} (${DOCTOR.credentials}) is an ${DOCTOR.jobTitle} in Greater Noida with ${DOCTOR.experience} of experience in pregnancy care, antenatal supervision, gynaecology, ultrasound and infertility evaluation.`,
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    worksFor: { "@id": CLINIC_ID },
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.streetAddress,
      addressLocality: CLINIC.addressLocality,
      addressRegion: CLINIC.addressRegion,
      postalCode: CLINIC.postalCode,
      addressCountry: CLINIC.addressCountry,
    },
    telephone: CLINIC.phone,
    areaServed: areaServed(),
    availableService: serviceEntities(),
    knowsAbout: [
      "Antenatal care",
      "Pregnancy ultrasound",
      "High-risk pregnancy",
      "Gynaecology",
      "Infertility evaluation",
      "PCOS",
      "Women's health",
    ],
    knowsLanguage: ["en", "hi"],
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/website-assets/doctor_with_finger_up.webp`,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: DOCTOR.credentials,
    },
  };
  if (doctorSocialLinks.length) schema.sameAs = doctorSocialLinks;
  return schema;
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    // Google uses `alternateName` to decide what to print as the site name
    // above the result — without it the result is more likely to show the
    // bare domain "theblessedwomb.in" instead of "The Blessed Womb".
    alternateName: ["The Blessed Womb Greater Noida", CLINIC.legalName],
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": CLINIC_ID },
  };
}

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [logoSchema(), clinicSchema(), doctorSchema(), websiteSchema()],
  };
}

export function webPageSchema({ path, title, description }) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
    primaryImageOfPage: { "@id": LOGO_ID },
  };
}

export function articleSchema({
  path,
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  about,
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#article`,
    url,
    name: title,
    headline: title,
    description,
    image: image ? `${SITE_URL}${image}` : undefined,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: about || { "@id": CLINIC_ID },
    author: { "@id": DOCTOR_ID },
    publisher: { "@id": CLINIC_ID },
    // All current articles have been medically reviewed by Dr. Jyoti Gupta.
    reviewedBy: { "@id": DOCTOR_ID },
  };
}

export function breadcrumbSchema(items) {
  // items: [{ name, path }] in order, path relative (e.g. "/about")
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  // faqs: [{ question, answer }] — must match visible on-page FAQ content
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
