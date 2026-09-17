import { SITE_URL, SITE_NAME, CLINIC, DOCTOR, SOCIAL, OPENING_HOURS } from "./seo";

const CLINIC_ID = `${SITE_URL}/#clinic`;
const DOCTOR_ID = `${SITE_URL}/#dr-jyoti-gupta`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function real(url) {
  return url && !url.includes("PLACEHOLDER_UPDATE_ME") ? url : null;
}

// Brand-level profiles (the clinic's own pages) vs. personal profiles
// (Dr. Jyoti Gupta's own accounts) are attached to different schema
// entities so each sameAs claim is actually accurate.
const clinicSocialLinks = [
  real(SOCIAL.facebook),
  real(SOCIAL.instagram),
  real(SOCIAL.youtube),
  real(SOCIAL.twitter),
  real(SOCIAL.googleBusinessProfile),
].filter(Boolean);

const doctorSocialLinks = [real(SOCIAL.linkedin)].filter(Boolean);

export function clinicSchema() {
  const schema = {
    "@type": "MedicalBusiness",
    "@id": CLINIC_ID,
    name: CLINIC.name,
    legalName: CLINIC.legalName,
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
    image: `${SITE_URL}/website-assets/location_banner.png`,
    logo: `${SITE_URL}/website-assets/logo-mark.png`,
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    areaServed: {
      "@type": "City",
      name: "Greater Noida",
    },
    employee: { "@id": DOCTOR_ID },
  };
  if (clinicSocialLinks.length) schema.sameAs = clinicSocialLinks;
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
    jobTitle: DOCTOR.jobTitle,
    medicalSpecialty: ["Gynecologic", "Obstetric"],
    worksFor: { "@id": CLINIC_ID },
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/website-assets/doctor_with_finger_up.png`,
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
    url: SITE_URL,
    publisher: { "@id": CLINIC_ID },
  };
}

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [clinicSchema(), doctorSchema(), websiteSchema()],
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
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": CLINIC_ID },
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
