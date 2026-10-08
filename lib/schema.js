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
import { SERVICES as SERVICE_PAGES } from "./services";
import { getGalleryImages } from "./gallery";

const CLINIC_ID = `${SITE_URL}/#clinic`;
const DOCTOR_ID = `${SITE_URL}/#dr-jyoti-gupta`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

// schema.org's MedicalSpecialty is an enumeration, so the values are the
// full enumeration URLs rather than bare words.
const MEDICAL_SPECIALTY = [
  "https://schema.org/Gynecologic",
  "https://schema.org/Obstetric",
];

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
 * The services actually offered, one entry per /services/<slug> page, so
 * Google reads the clinic's scope of practice (and where each service is
 * described) rather than inferring it from body copy. Names and URLs come
 * from lib/services.js so they cannot drift from the real pages.
 */
function serviceEntities() {
  return SERVICE_PAGES.map((s) => ({
    "@type": "MedicalProcedure",
    name: s.name,
    url: `${SITE_URL}/services/${s.slug}`,
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

function clinicImages() {
  const photos = getGalleryImages()
    .slice(0, 3)
    .map((g) => `${SITE_URL}${g.src}`);
  return photos.length
    ? photos
    : [`${SITE_URL}/website-assets/location_banner.jpg`];
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
    // Real photos of the clinic and doctor (first few from the gallery
    // folder), falling back to the directions banner only if the folder is
    // empty. Google asks local businesses for photographs, not graphics.
    image: clinicImages(),
    logo: { "@id": LOGO_ID },
    hasMap: CLINIC.mapsQueryUrl,
    medicalSpecialty: MEDICAL_SPECIALTY,
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
    medicalSpecialty: MEDICAL_SPECIALTY,
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
    image: `${SITE_URL}/website-assets/doctor_with_folded_arms.png`,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: DOCTOR.credentials,
    },
  };
  if (doctorSocialLinks.length) schema.sameAs = doctorSocialLinks;
  // The medical council registration number is what separates this
  // Dr. Jyoti Gupta from other doctors of the same name. It is emitted
  // only once the real number has been supplied in lib/seo.js.
  if (DOCTOR.registration) {
    schema.identifier = {
      "@type": "PropertyValue",
      name: "Medical council registration number",
      value: DOCTOR.registration,
    };
  }
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

export function serviceSchema({ path, name, description, image }) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name,
    serviceType: name,
    description,
    image: image ? `${SITE_URL}${image}` : undefined,
    provider: { "@id": CLINIC_ID },
    areaServed: { "@type": "City", name: "Greater Noida" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceLocation: { "@id": CLINIC_ID },
    },
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
