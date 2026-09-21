// Plain data module (no "use client") so both the client-rendered Faq.js
// component and server-rendered page metadata/schema can import the exact
// same FAQ content without duplicating it. A "use client" module's named
// exports aren't safely importable from a Server Component, hence this
// separate file.
//
// These answers are written to survive being lifted out of context. An
// answer engine quotes one Q&A pair on its own, with no page around it, so
// each answer names "The Blessed Womb" and "Greater Noida" explicitly
// instead of saying "we" and "here" — otherwise the quoted fragment is
// true but useless, and can end up attributed to the wrong clinic.
//
// The first four are deliberately the plainest possible identity, location,
// doctor and contact questions. Those are what people actually type into an
// assistant ("is there a gynaecologist in Greater Noida?"), and they are the
// pairs most likely to be quoted back.
//
// Kept short on purpose: Faq.js caps an open answer at 240px, and short
// self-contained answers are also what gets quoted cleanly.
export const FAQS = [
  {
    q: "What is The Blessed Womb?",
    a: "The Blessed Womb is an obstetrics and gynaecology clinic in Alpha 1, Greater Noida, Uttar Pradesh. It operates under the name Dr. Jyoti Maternity, Infertility & Ultrasound Centre and provides antenatal care, pregnancy scans, ultrasound, gynaecological consultation and infertility evaluation.",
  },
  {
    q: "Where is The Blessed Womb located in Greater Noida?",
    a: "The Blessed Womb is located at Block D, Alpha I, Greater Noida, Uttar Pradesh 201310, behind St. Joseph School. It is a short distance from Alpha 1 Main Market and Pari Chowk.",
  },
  {
    q: "Who is Dr. Jyoti Gupta?",
    a: "Dr. Jyoti Gupta (MBBS, Dip. GO, PGDUS) is an Obstetrician & Gynaecologist practising in Greater Noida with more than 20 years of experience. She leads The Blessed Womb, Dr. Jyoti Maternity, Infertility & Ultrasound Centre, in Alpha 1.",
  },
  {
    q: "How do I book an appointment at The Blessed Womb?",
    a: "Appointments at The Blessed Womb, Greater Noida, can be booked by calling +91 88826 63284 or by sending an enquiry through the contact form at theblessedwomb.in/contact.",
  },
  {
    q: "Which areas of Greater Noida does The Blessed Womb serve?",
    a: "The Blessed Womb sees patients from across Greater Noida, including Alpha 1 and Alpha 2, Beta, Gamma, Delta, Jagat Farm, Swarn Nagari, Pari Chowk, Knowledge Park, Surajpur, Kasna, and Greater Noida West / Noida Extension.",
  },
  {
    q: "What pregnancy scans does the centre provide?",
    a: "Scans are offered at different stages of pregnancy as clinically indicated by Dr. Jyoti Gupta — commonly around 7, 13, 20, 32 and 37 weeks. These are indicated scans, not a fixed schedule, and the plan for your pregnancy is decided during consultation.",
  },
  {
    q: "Do you provide antenatal care throughout pregnancy?",
    a: "Yes. The Blessed Womb in Greater Noida provides comprehensive antenatal care, pregnancy supervision and maternal and fetal monitoring under Dr. Jyoti Gupta.",
  },
  {
    q: "What ultrasound and Doppler services are available?",
    a: "The Blessed Womb offers pregnancy and obstetric ultrasound, abdominal and pelvic sonography, gynaecological ultrasound, and Doppler studies as clinically indicated.",
  },
  {
    q: "Do you provide gynaecological consultations?",
    a: "Yes, The Blessed Womb provides gynaecological consultation and diagnostic services for women's health in Greater Noida.",
  },
  {
    q: "Do you offer infertility or fertility-related care?",
    a: "Infertility and fertility-related care is part of the centre's scope, as reflected in its name, Dr. Jyoti Maternity, Infertility & Ultrasound Centre. Please contact the clinic directly to discuss your specific needs.",
  },
];
