// Plain data module (no "use client") so both the client-rendered Faq.js
// component and server-rendered page metadata/schema can import the exact
// same FAQ content without duplicating it. A "use client" module's named
// exports aren't safely importable from a Server Component, hence this
// separate file.
export const FAQS = [
  {
    q: "What pregnancy scans does the centre provide?",
    a: "Scans are offered at different stages of pregnancy as clinically indicated by Dr. Jyoti Gupta — commonly around 7, 13, 20, 32 and 37 weeks. These are indicated scans, not a fixed schedule, and the plan for your pregnancy is decided during consultation.",
  },
  {
    q: "Do you provide antenatal care throughout pregnancy?",
    a: "Yes. The Blessed Womb provides comprehensive antenatal care, pregnancy supervision and maternal and fetal monitoring under Dr. Jyoti Gupta.",
  },
  {
    q: "What ultrasound and Doppler services are available?",
    a: "We offer pregnancy and obstetric ultrasound, abdominal and pelvic sonography, gynaecological ultrasound, and Doppler studies as clinically indicated.",
  },
  {
    q: "Do you provide gynaecological consultations?",
    a: "Yes, the centre provides gynaecological consultation and diagnostic services for women's health.",
  },
  {
    q: "Do you offer infertility or fertility-related care?",
    a: "Infertility and fertility-related care is part of the centre's scope, as reflected in its name, Dr. Jyoti Maternity, Infertility & Ultrasound Centre. Please contact us directly to discuss your specific needs.",
  },
];
