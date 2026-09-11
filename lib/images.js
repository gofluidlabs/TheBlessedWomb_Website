/* Real project assets (public/website-assets). */
const a = (file) => `/website-assets/${file}`;

export const IMG = {
  // Brand
  logoWide: a("logo-wide.png"),
  logoWhite: a("logo-wide-white.png"),
  logoMark: a("Logo.png"),

  // Hero
  hero: a("Bg-1-1.jpg"),
  heroDoctor: a("Image-1.png"),
  stethoscope: a("item_01.png"),
  molecule: a("Vector-3.png"),

  // About
  aboutTall: a("About-1.jpg"),
  aboutTop: a("About-2.jpg"),
  aboutBottom: a("About-3.jpg"),
  silhouette: a("Image-2.png"),

  // Services
  svc1: a("Service-5.jpg"), // Expert Fertility Consultation
  svc2: a("Service-6.jpg"), // Fertility Health Assessment
  svc3: a("serv4.jpg"), // Fertility Diagnostic Services
  svc4: a("Service-7-300x200.jpg"), // Family Planning Solutions
  hexBg: a("bg3.png"),

  // Why choose us
  whyDoctor: a("Image-1.png"),
  whyBaby: a("Bg-6.png"),
  cloverMask: a("mask3.png"),
  shapeDeco: a("Shape.png"),

  // Process
  embryoBg: a("Bg-8.jpg"),

  // FAQ
  faqCouple: a("About-3.jpg"),

  // Team
  doc: a("Image-1.png"),
  team1: a("Testi-2.jpg"), // Leslie Alexander — Doctor (female)
  team2: a("Testi-1.jpg"), // Ronald Richards — Manager (male)
  team3: a("Image-1.png"), // Cody Fisher — Medical Assistant (dark card)
  team4: a("Testi-3.jpg"), // Ralph Edwards — Senior (male)
  crossDeco: a("Graph-3.png"),

  // CTA / Footer
  ctaBaby: a("Bg-6.png"),
  ctaStripe: a("Image.png"),
  footerBg: a("Bg-8.jpg"),
};
