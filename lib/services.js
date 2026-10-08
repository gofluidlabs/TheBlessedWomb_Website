import { IMG } from "./images";
import { DOCTOR } from "./seo";
import { FAQS } from "./faqData";

// Plain data module (no "use client") so server pages, schema builders, the
// sitemap and llms.txt can all read the same service content.
//
// Content rules (same as the rest of the site): nothing unverified. No
// opening hours, prices, success rates, equipment names or outcome
// promises. Timing facts are stated as general guidance and always
// "as clinically indicated by Dr. Jyoti Gupta" — never as a fixed schedule.
// All medical wording here should be reviewed by Dr. Jyoti before launch.
//
// `updatedAt` feeds the sitemap <lastmod> — change it only when the page's
// content genuinely changes.

const LOCATION = "Greater Noida";

// Alt text describes what is actually IN each photo (several pages share a
// photo), not the page topic — alt that claims something the image does not
// show is worse for accessibility and for image search than a plain
// description.
const ALT = {
  couple: "Expectant couple sitting on a sofa looking at baby clothes together",
  scan: "Pregnant woman resting on a bed with an ultrasound probe on her belly",
  feet: "Adult hands gently holding a newborn's feet",
  couple2: "Smiling expectant couple relaxing together on a sofa",
};

/** Reuse an existing home-page FAQ answer by its question text. */
const pick = (startsWith) => {
  const found = FAQS.find((f) => f.q.startsWith(startsWith));
  if (!found) throw new Error(`FAQ not found: ${startsWith}`);
  return found;
};

export const SERVICES = [
  {
    slug: "antenatal-care",
    name: "Antenatal Care",
    title: `Antenatal Care & Pregnancy Supervision in ${LOCATION}`,
    seoTitle: `Antenatal Care in ${LOCATION} | Pregnancy Checkups`,
    seoDescription: `Antenatal care with Dr. Jyoti Gupta at The Blessed Womb, Alpha I, ${LOCATION}: checkups, maternal and fetal monitoring and birth planning.`,
    image: IMG.svc1,
    imageAlt: ALT.couple,
    updatedAt: "2026-10-08",
    cardSummary:
      "Regular checkups, maternal and fetal monitoring and birth planning, from your first consultation onwards.",
    answer: `Antenatal care is the regular medical care you receive throughout pregnancy to keep you and your baby healthy. At The Blessed Womb in Alpha I, ${LOCATION}, antenatal care and pregnancy supervision are provided by Dr. Jyoti Gupta, covering maternal and fetal monitoring from your first consultation through to postpartum planning.`,
    sections: [
      {
        heading: "What our antenatal care includes",
        list: [
          "A detailed first consultation covering your medical history, previous pregnancies and current health",
          "Pregnancy dating and assessment, supported by ultrasound when clinically appropriate",
          "Routine investigations and blood pressure and wellbeing checks at your visits",
          "Monitoring of your baby's growth and development as the pregnancy progresses",
          "Guidance on nutrition, supplements and vaccination, tailored to you",
          "Birth planning and postpartum planning discussions",
        ],
      },
      {
        heading: "Who antenatal care is for",
        body: "Anyone who is pregnant or planning a pregnancy. It is best to book once you have a positive pregnancy test, so that dating, early investigations and a plan for your pregnancy can be put in place early. If you have a medical condition or a previous pregnancy complication, let us know at your first visit so your plan can reflect it.",
      },
      {
        heading: "What to expect at your visits",
        body: "Visit frequency is set around your individual pregnancy and risk profile rather than one fixed calendar for everyone. Typical checks include blood pressure, weight and general wellbeing, with the focus shifting between trimesters: early on the emphasis is on dating, history and baseline tests; in the middle of pregnancy on your baby's development; and later on growth, position and birth planning. Scans are arranged where they are clinically indicated — see our pregnancy scans pages for details.",
        links: [
          { slug: "pregnancy-scans-ultrasound", label: "Pregnancy scans timeline" },
          { slug: "growth-scan", label: "Growth scans" },
        ],
      },
      {
        heading: "Nutrition, supplements and vaccination",
        body: "Nutritional needs change across pregnancy, and supplements such as folic acid or iron should be guided by your doctor based on your own needs rather than generic advice. Vaccination in pregnancy follows current medical recommendations and is discussed with you according to your health profile and stage of pregnancy.",
      },
      {
        heading: `Antenatal care near Alpha I, ${LOCATION}`,
        body: `The Blessed Womb is in Block D, Alpha I, ${LOCATION}, near St. Joseph School, making regular antenatal visits convenient for families in Alpha I, nearby sectors and across ${LOCATION}.`,
      },
    ],
    faq: [
      {
        q: "When should I book my first antenatal visit?",
        a: "As soon as you know you are pregnant. An early consultation allows your doctor to confirm dating, review your history and plan the right investigations and monitoring for your pregnancy.",
      },
      pick("Do you provide antenatal care"),
      {
        q: "How often will I need antenatal checkups?",
        a: "It depends on your individual pregnancy. Current guidance favours a schedule tailored to your risk profile and how your pregnancy is progressing, rather than one fixed calendar for every pregnancy. Dr. Jyoti Gupta will set a schedule appropriate to you.",
      },
      {
        q: "What should I bring to my first visit?",
        a: "Any previous medical or pregnancy reports, scan reports, a list of current medicines and supplements, and any questions you would like to ask.",
      },
      {
        q: "Does antenatal care include planning for after delivery?",
        a: "Yes. Birth planning and postpartum planning are part of comprehensive antenatal care, and are discussed as your pregnancy progresses.",
      },
    ],
    relatedServices: ["pregnancy-scans-ultrasound", "growth-scan", "doppler-studies"],
    relatedPosts: ["antenatal-care", "first-trimester-pregnancy-care"],
  },

  {
    slug: "pregnancy-scans-ultrasound",
    name: "Pregnancy Scans & Ultrasound",
    title: `Pregnancy Scans & Ultrasound in ${LOCATION}`,
    seoTitle: `Pregnancy Scans & Ultrasound in ${LOCATION} | Alpha I`,
    seoDescription: `What a third-trimester growth scan checks, why it is advised and what to expect, at The Blessed Womb, Alpha I, ${LOCATION}.`,
    image: IMG.svc2,
    imageAlt: ALT.scan,
    updatedAt: "2026-10-08",
    pcpndt: true,
    cardSummary:
      "Clinically indicated pregnancy scans plus obstetric, abdominal, pelvic and gynaecological ultrasound.",
    answer: `A pregnancy scan is an ultrasound examination that uses sound waves to look at your baby's development and wellbeing. At The Blessed Womb, scans are offered at different stages of pregnancy as clinically indicated by Dr. Jyoti Gupta, who holds a postgraduate diploma in ultrasound (PGDUS), alongside general gynaecological and abdominal ultrasound.`,
    sections: [
      {
        heading: "Scans and ultrasound we offer",
        list: [
          "Pregnancy (obstetric) ultrasound at different stages of pregnancy",
          "Abdominal and pelvic sonography",
          "Gynaecological ultrasound for women's health concerns",
          "Doppler studies where indicated (see our Doppler service)",
        ],
      },
      {
        heading: "Pregnancy scan timeline: when scans are commonly done",
        body: "Scans are offered as clinically indicated by Dr. Jyoti Gupta — commonly around 7, 13, 20, 32 and 37 weeks. These are indicated scans, not a fixed schedule: the plan for your pregnancy is decided during your consultation, and some pregnancies need more or fewer scans. In general terms:",
        list: [
          "Around 7 weeks — an early scan to confirm the pregnancy, its location and dating",
          "Around 11–13 weeks — the NT scan, an early look at development and an early screening measurement",
          "Around 18–22 weeks — the anomaly scan, a detailed check of your baby's structure",
          "From the third trimester — growth scans (commonly around 32 and 37 weeks), with Doppler when indicated",
        ],
        links: [
          { slug: "nt-scan", label: "NT scan in detail" },
          { slug: "anomaly-scan", label: "Anomaly scan in detail" },
          { slug: "growth-scan", label: "Growth scan in detail" },
          { slug: "doppler-studies", label: "Doppler studies" },
        ],
      },
      {
        heading: "What a scan is used for",
        list: [
          "Confirming the pregnancy and checking gestational age and due date",
          "Looking at your baby's development and structure",
          "Tracking your baby's growth as pregnancy progresses",
          "Checking the baby's position, heartbeat and the amniotic fluid",
          "Assessing the pelvic organs when you have gynaecological symptoms",
        ],
      },
      {
        heading: "What to expect at your scan",
        body: "A scan is non-invasive and generally painless. A gel is applied to your abdomen and a probe is moved over it; in early pregnancy or for some gynaecological scans, a different technique may be advised. Your doctor will explain what was seen and what, if anything, comes next. Instructions such as whether to arrive with a full bladder depend on the type of scan, and we will tell you when you book.",
      },
    ],
    faq: [
      pick("What pregnancy scans"),
      pick("What ultrasound and Doppler"),
      {
        q: "Is a pregnancy ultrasound safe?",
        a: "Ultrasound is a non-invasive technique that does not use radiation, and it is widely used in pregnancy when there is a clinical reason for it. Your doctor will recommend scans based on need.",
      },
      {
        q: "Do I need a full bladder for my scan?",
        a: "It depends on the type of scan and the stage of pregnancy. We will tell you how to prepare when you book your appointment.",
      },
      {
        q: "Can I get a gynaecological ultrasound without being pregnant?",
        a: "Yes. Pelvic and gynaecological ultrasound is offered for women's health concerns, such as irregular periods or pelvic symptoms, as clinically indicated.",
      },
    ],
    relatedServices: ["nt-scan", "anomaly-scan", "growth-scan", "doppler-studies"],
    relatedPosts: ["antenatal-care", "first-trimester-pregnancy-care"],
  },

  {
    slug: "nt-scan",
    name: "NT Scan",
    title: `NT Scan (Nuchal Translucency) in ${LOCATION}`,
    seoTitle: `NT Scan in ${LOCATION} | Nuchal Translucency Scan`,
    seoDescription: `Doppler studies as clinically indicated at The Blessed Womb, Alpha I, ${LOCATION}. What a Doppler scan checks and when it is advised.`,
    image: IMG.svc2,
    imageAlt: ALT.scan,
    updatedAt: "2026-10-08",
    pcpndt: true,
    cardSummary:
      "The early pregnancy scan around 11–13 weeks, explained: what it looks at and what the result means.",
    answer: `The NT scan, or nuchal translucency scan, is an ultrasound done in early pregnancy, generally between 11 weeks and 13 weeks 6 days. It measures a small fluid-filled space at the back of the baby's neck and gives a first look at the baby's development. At The Blessed Womb in ${LOCATION}, it is part of the clinically indicated pregnancy scans planned by Dr. Jyoti Gupta.`,
    sections: [
      {
        heading: "What the NT scan looks at",
        list: [
          "The nuchal translucency — the thickness of fluid at the back of the baby's neck",
          "Confirmation of the baby's heartbeat, number of babies and gestational age",
          "A first look at the baby's early structure, as far as can be seen at this stage",
        ],
      },
      {
        heading: "What the result means (and does not mean)",
        body: "A larger-than-expected measurement can be associated with a higher chance of some chromosomal conditions, which is why the NT scan is used as an early screening tool. It is a screening test, not a diagnosis: a higher-risk result does not mean the baby has a condition, and a lower-risk result does not rule one out. Your doctor may combine the measurement with other information such as your age and blood tests, and will explain what the result means and whether any further testing is worth discussing.",
      },
      {
        heading: "When is the NT scan done?",
        body: "Generally between 11 weeks and 13 weeks 6 days of pregnancy, which is why the scan commonly falls around 13 weeks in the timeline described by our pregnancy scans page. Because the window is narrow, it helps to book your antenatal visit early so dating is confirmed and the scan is planned within it.",
      },
      {
        heading: "What to expect at the appointment",
        body: "The scan is non-invasive and generally painless, usually done over the abdomen. It can take a little longer than a routine scan if the baby is in a position that makes the measurement difficult. Your doctor will go through what was seen with you at the visit. Please bring any earlier scan or blood-test reports.",
      },
    ],
    faq: [
      {
        q: "At how many weeks is the NT scan done?",
        a: "Generally between 11 weeks and 13 weeks 6 days of pregnancy. Your doctor will confirm your dates and advise the right time for you.",
      },
      {
        q: "Is the NT scan a test for Down syndrome?",
        a: "It is a screening test that estimates the chance of certain chromosomal conditions, including Down syndrome. It cannot diagnose a condition; if a higher chance is found, your doctor will discuss the options with you.",
      },
      {
        q: "Does a normal NT scan guarantee a healthy baby?",
        a: "No. A lower-risk result is reassuring, but no single scan can rule out every condition. Later scans and routine antenatal care continue to monitor your baby's development.",
      },
      {
        q: "Is the NT scan safe?",
        a: "Ultrasound is non-invasive and does not use radiation. Your doctor will recommend the scan when it is clinically indicated.",
      },
      pick("What pregnancy scans"),
    ],
    relatedServices: ["pregnancy-scans-ultrasound", "anomaly-scan", "antenatal-care"],
    relatedPosts: ["first-trimester-pregnancy-care", "antenatal-care"],
  },

  {
    slug: "anomaly-scan",
    name: "Anomaly Scan",
    title: `Anomaly Scan (Level II Ultrasound) in ${LOCATION}`,
    seoTitle: `Anomaly Scan in ${LOCATION} | Level II Ultrasound`,
    seoDescription: `What the 20-week anomaly (level II) scan checks, when it is done and what to expect. Pregnancy ultrasound with Dr. Jyoti Gupta at The Blessed Womb, Alpha I, ${LOCATION}.`,
    image: IMG.svc2,
    imageAlt: ALT.scan,
    updatedAt: "2026-10-08",
    pcpndt: true,
    cardSummary:
      "The detailed mid-pregnancy structural scan around 18–22 weeks: what it checks and what to expect.",
    answer: `The anomaly scan, also called the level II scan or the 20-week scan, is a detailed ultrasound of your baby's structure, usually done between about 18 and 22 weeks of pregnancy. It is one of the most detailed examinations of your baby before birth. At The Blessed Womb in ${LOCATION}, it is planned by Dr. Jyoti Gupta as part of the clinically indicated pregnancy scans.`,
    sections: [
      {
        heading: "What the anomaly scan checks",
        list: [
          "The baby's head and brain, and the spine",
          "The heart, including its chambers and major vessels as far as can be seen",
          "The abdomen, kidneys, bladder and abdominal wall",
          "The arms, legs, hands and feet",
          "The position of the placenta and the amount of amniotic fluid",
          "Growth measurements, to compare with your dates",
        ],
      },
      {
        heading: "Why it is done around 20 weeks",
        body: "By about 18 to 22 weeks the baby is large enough for the structures to be seen clearly, but still small enough to be examined in full. This is why the scan commonly falls around 20 weeks in the timeline described on our pregnancy scans page. Your doctor will confirm the best week for you from your dating.",
      },
      {
        heading: "What a scan can and cannot tell you",
        body: "The anomaly scan can identify many, but not all, structural conditions. Some conditions are not visible on ultrasound, some develop later in pregnancy, and the view on the day can be limited by the baby's position. If something needs a closer look, your doctor will explain what was seen, whether a repeat scan or further assessment is advised, and what that means for your pregnancy. Please note that the sex of the baby is not disclosed at this centre (see the PCPNDT notice below).",
      },
      {
        heading: "What to expect at the appointment",
        body: "The scan is non-invasive and generally painless, and it takes longer than a routine scan because many structures are examined. If the baby is in an awkward position you may be asked to wait or return briefly. You are welcome to bring a support person; please bring your earlier scan and blood-test reports.",
      },
    ],
    faq: [
      {
        q: "At how many weeks is the anomaly scan done?",
        a: "Usually between about 18 and 22 weeks of pregnancy, commonly around 20 weeks. Your doctor will advise the right week for you.",
      },
      {
        q: "What is the difference between the NT scan and the anomaly scan?",
        a: "The NT scan is an early scan around 11–13 weeks that includes an early screening measurement. The anomaly scan, around 18–22 weeks, is a much more detailed check of the baby's structure.",
      },
      {
        q: "Can the anomaly scan detect every problem?",
        a: "No. It can detect many structural conditions but not all, and some conditions cannot be seen on ultrasound or develop later. Your doctor will explain the limits of the scan.",
      },
      {
        q: "Will the scan tell me the sex of my baby?",
        a: "No. Disclosing the sex of the baby is prohibited under the PCPNDT Act, and it is not done at this centre.",
      },
      pick("What pregnancy scans"),
    ],
    relatedServices: ["pregnancy-scans-ultrasound", "nt-scan", "growth-scan"],
    relatedPosts: ["antenatal-care", "first-trimester-pregnancy-care"],
  },

  {
    slug: "growth-scan",
    name: "Growth Scan",
    title: `Growth Scan in Pregnancy in ${LOCATION}`,
    seoTitle: `Growth Scan in Pregnancy in ${LOCATION} | Alpha I`,
    seoDescription: `What a third-trimester growth scan checks, why it is advised and what to expect. Pregnancy ultrasound with Dr. Jyoti Gupta at The Blessed Womb, Alpha I, ${LOCATION}.`,
    image: IMG.svc3,
    imageAlt: ALT.feet,
    updatedAt: "2026-10-08",
    pcpndt: true,
    cardSummary:
      "Third-trimester scans that track your baby's growth, position and wellbeing.",
    answer: `A growth scan is an ultrasound later in pregnancy that checks how your baby is growing and how well they are being supported. At The Blessed Womb in ${LOCATION}, growth scans are planned by Dr. Jyoti Gupta as clinically indicated, commonly around 32 and 37 weeks, and sometimes together with a Doppler study.`,
    sections: [
      {
        heading: "What a growth scan measures",
        list: [
          "The baby's head, abdomen and thigh bone measurements",
          "An estimate of the baby's weight",
          "The amount of amniotic fluid around the baby",
          "The baby's position, and the position of the placenta",
          "The baby's heartbeat and movements",
        ],
      },
      {
        heading: "Why a growth scan is advised",
        body: "In many pregnancies growth is followed through clinical examination and a scan around the timings described on our pregnancy scans page. A growth scan, or additional ones, may also be advised when there is a reason to look more closely — for example if your baby seems smaller or larger than expected on examination, if your fluid level needs checking, or if you have a medical condition that can affect growth. This is decided for your pregnancy individually.",
      },
      {
        heading: "Growth scan and Doppler",
        body: "A growth scan is sometimes combined with a Doppler study, which looks at blood flow in areas such as the umbilical cord. Doppler is used when it is clinically indicated rather than in every pregnancy.",
        links: [{ slug: "doppler-studies", label: "Doppler studies" }],
      },
      {
        heading: "What the weight estimate means",
        body: "Estimated weight on ultrasound is an approximation, not an exact figure, and it can differ from the actual birth weight. It is one part of the picture, used together with your examination, your history and the other findings on the scan.",
      },
    ],
    faq: [
      {
        q: "When is a growth scan done in pregnancy?",
        a: "Commonly in the third trimester — around 32 and 37 weeks in the clinically indicated schedule described by Dr. Jyoti Gupta — but timing is decided for your own pregnancy.",
      },
      {
        q: "Is a growth scan the same as an anomaly scan?",
        a: "No. The anomaly scan around 18–22 weeks is a detailed check of the baby's structure. A growth scan later in pregnancy focuses on size, fluid, position and wellbeing.",
      },
      {
        q: "How accurate is the estimated baby weight?",
        a: "It is an estimate and can differ from the weight at birth. Your doctor uses it alongside other findings, not on its own.",
      },
      {
        q: "Will I need more than one growth scan?",
        a: "Some pregnancies need only the usual scans; others need additional growth scans if there is a reason to monitor more closely. Your doctor will advise.",
      },
    ],
    relatedServices: ["doppler-studies", "pregnancy-scans-ultrasound", "antenatal-care"],
    relatedPosts: ["antenatal-care"],
  },

  {
    slug: "doppler-studies",
    name: "Doppler Studies",
    title: `Doppler Scan in Pregnancy & Diagnostic Studies in ${LOCATION}`,
    seoTitle: `Doppler Scan in ${LOCATION} | Pregnancy Doppler Studies`,
    seoDescription: `Doppler studies as clinically indicated at The Blessed Womb, Alpha I, ${LOCATION}. Understand what a Doppler scan checks and when it is advised, with Dr. Jyoti Gupta.`,
    image: IMG.svc3,
    imageAlt: ALT.feet,
    updatedAt: "2026-10-08",
    pcpndt: true,
    cardSummary:
      "Doppler studies as clinically indicated, to assess blood flow and support monitoring of mother and baby.",
    answer: `A Doppler scan is a type of ultrasound that checks blood flow. In pregnancy it can be used to look at blood flow in areas such as the umbilical cord and baby's blood vessels, helping your doctor monitor how well your baby is being supported. Doppler studies at The Blessed Womb in ${LOCATION} are performed as clinically indicated by Dr. Jyoti Gupta.`,
    sections: [
      {
        heading: "What a Doppler study checks",
        body: "Doppler uses sound waves to assess the direction and speed of blood flow. Depending on the reason for the scan, it can look at blood vessels in the umbilical cord, the baby, or the mother's uterine vessels, adding information to a standard growth and wellbeing scan.",
      },
      {
        heading: "When a Doppler may be advised",
        body: "Doppler is not needed in every pregnancy. It is advised when there is a clinical reason, for example if growth needs closer monitoring or when other findings or the mother's health call for a closer look at blood flow. Many pregnancies where Doppler is advised later turn out to be entirely reassuring. It is commonly used in the third trimester, and your doctor will tell you if and when it is relevant for you.",
        links: [{ slug: "growth-scan", label: "Growth scans" }],
      },
      {
        heading: "What to expect",
        body: "A Doppler study is done in the same way as an ultrasound scan: non-invasive and generally painless, with gel and a probe on the abdomen. It may take a little longer than a routine scan. Your doctor will explain the findings and what they mean for your care plan.",
      },
    ],
    faq: [
      {
        q: "Does everyone need a Doppler scan in pregnancy?",
        a: "No. Doppler studies are performed when they are clinically indicated. Your doctor will advise whether one is relevant for your pregnancy.",
      },
      {
        q: "Is a Doppler scan painful or risky?",
        a: "It is a non-invasive ultrasound technique and is generally painless. It does not involve radiation. Your doctor will only recommend it when there is a clinical reason.",
      },
      pick("What ultrasound and Doppler"),
      {
        q: "Does an abnormal Doppler result mean something is wrong?",
        a: "Not necessarily. A result is interpreted together with your scan findings, growth and overall health. Your doctor will explain what it means for you and whether any follow-up is needed.",
      },
    ],
    relatedServices: ["growth-scan", "pregnancy-scans-ultrasound", "antenatal-care"],
    relatedPosts: ["antenatal-care"],
  },

  {
    slug: "gynaecological-care",
    name: "Gynaecological Care",
    title: `Gynaecologist in ${LOCATION} — Consultation & Diagnostics`,
    seoTitle: `Gynaecologist in ${LOCATION} | Women's Health Consultation`,
    seoDescription: `Gynaecological consultation and diagnostics for periods, PMOS/PCOS and women's health with Dr. Jyoti Gupta, Alpha I, ${LOCATION}.`,
    image: IMG.svc4,
    imageAlt: ALT.couple2,
    updatedAt: "2026-10-08",
    cardSummary:
      "Consultation and diagnostic services for periods, PMOS/PCOS, pelvic symptoms and routine women's health.",
    answer: `Gynaecological care covers the health of the female reproductive system at every stage of life. Dr. Jyoti Gupta, an obstetrician and gynaecologist with ${DOCTOR.experience} of experience, provides gynaecological consultation and diagnostic services at The Blessed Womb in Alpha I, ${LOCATION}.`,
    sections: [
      {
        heading: "Reasons women visit a gynaecologist",
        list: [
          "Irregular, delayed, missed or heavy periods",
          "PMOS / PCOS (polyendocrine metabolic ovarian syndrome, formerly PCOS)",
          "Pelvic pain, abnormal bleeding or unusual discharge",
          "Routine women's health checkups and screening advice",
          "Contraception and family planning questions",
          "Planning a pregnancy, or difficulty conceiving (see our infertility care page)",
        ],
        links: [
          { slug: "pmos-pcos-care", label: "PMOS / PCOS care" },
          { slug: "infertility-care", label: "Infertility & fertility care" },
        ],
      },
      {
        heading: "Consultation and diagnostics",
        body: "A visit usually starts with a conversation about your symptoms, menstrual history and general health, followed by an examination if appropriate. Where needed, ultrasound and other investigations are used to find the cause, so that advice and treatment are based on a clear diagnosis rather than guesswork.",
      },
      {
        heading: "Routine checkups and screening",
        body: "Not every woman needs every test every year. Screening intervals depend on your age, history and risk factors, and guidance is updated over time, so your doctor will advise what applies to you. New or persistent pelvic pain, abnormal bleeding or unusual discharge should be reviewed without waiting for a routine checkup.",
      },
      {
        heading: `Women's health in ${LOCATION}`,
        body: `We see women from Alpha I and across ${LOCATION} for a consultation that gives time to listen. If you are unsure whether a symptom needs attention, it is reasonable to book a consultation and ask.`,
      },
    ],
    faq: [
      pick("Do you provide gynaecological"),
      {
        q: "When should I see a gynaecologist about my periods?",
        a: "If irregularity is persistent over a few cycles, if bleeding is unusually heavy or prolonged, if periods stop for several months without pregnancy, or if you have other symptoms or are trying to conceive, it is worth booking an evaluation.",
      },
      {
        q: "What is PMOS (PCOS)?",
        a: "PMOS (polyendocrine metabolic ovarian syndrome) is the newer name for PCOS. It is a common hormonal and metabolic condition that can affect periods, ovulation and other aspects of health. A gynaecologist can assess symptoms and advise on diagnosis and care.",
      },
      {
        q: "Do I need a routine gynaecological checkup if I feel fine?",
        a: "Routine checkups and screening are part of preventive care. How often and which tests depend on your age and individual risk factors, so ask your doctor what is right for you.",
      },
      {
        q: "Can I have a pelvic ultrasound at the same visit?",
        a: "Where an ultrasound is clinically indicated, pelvic and gynaecological ultrasound is available at the centre. Your doctor will advise whether you need one.",
      },
    ],
    relatedServices: ["pmos-pcos-care", "infertility-care", "pregnancy-scans-ultrasound"],
    relatedPosts: [
      "irregular-periods-causes",
      "polyendocrine-metabolic-ovarian-syndrome-pmos-pcos",
      "womens-health-checkup",
    ],
  },

  {
    slug: "pmos-pcos-care",
    name: "PMOS / PCOS Care",
    title: `PMOS (PCOS) Treatment & Care in ${LOCATION}`,
    seoTitle: `PCOS (PMOS) Care in ${LOCATION} | Diagnosis & Guidance`,
    seoDescription: `Fertility evaluation and infertility-related care at The Blessed Womb, Alpha I, ${LOCATION}. When to seek help and what to expect.`,
    image: IMG.svc4,
    imageAlt: ALT.couple2,
    updatedAt: "2026-10-08",
    cardSummary:
      "Assessment and personalised guidance for PMOS (formerly PCOS), from irregular periods to fertility concerns.",
    answer: `PMOS (polyendocrine metabolic ovarian syndrome), formerly called PCOS, is a common hormonal and metabolic condition that can affect periods, ovulation, skin and hair, weight and fertility. At The Blessed Womb in ${LOCATION}, Dr. Jyoti Gupta assesses PMOS and plans care around your symptoms and your goals, whether that is regular cycles, managing symptoms or planning a pregnancy.`,
    sections: [
      {
        heading: "Common signs of PMOS / PCOS",
        list: [
          "Irregular, infrequent or missed periods",
          "Difficulty conceiving, or irregular ovulation",
          "Acne, oily skin, or excess facial or body hair",
          "Thinning hair on the scalp",
          "Weight gain or difficulty managing weight",
        ],
      },
      {
        heading: "How PMOS is assessed",
        body: "Assessment usually begins with your menstrual history and symptoms, an examination and, where indicated, an ultrasound of the ovaries and blood tests to check hormones and rule out other causes of irregular periods such as thyroid problems. Not every woman with PMOS has every sign, which is why an individual assessment matters rather than self-diagnosis.",
      },
      {
        heading: "Care is personalised to you",
        body: "There is no single approach that suits everyone. Care is planned around what matters most to you right now — regulating your cycles, managing skin and hair symptoms, supporting a healthy lifestyle or planning a pregnancy — and is reviewed over time. Please do not start or stop medicines, or use medicines to bring on a period, without medical advice.",
      },
      {
        heading: "PMOS and fertility",
        body: "PMOS can make ovulation irregular, which is one reason some women with it take longer to conceive. Many women with PMOS do conceive; if you have been trying for some time, an evaluation can help find out why and what may help. See our fertility page for when to seek evaluation.",
        links: [{ slug: "infertility-care", label: "Infertility & fertility care" }],
      },
    ],
    faq: [
      {
        q: "Is PMOS the same as PCOS?",
        a: "Yes. PMOS (polyendocrine metabolic ovarian syndrome) is the newer name for the condition long known as PCOS (polycystic ovary syndrome).",
      },
      {
        q: "How is PMOS diagnosed?",
        a: "Usually from your history and symptoms, an examination, and where indicated an ultrasound and blood tests. Your doctor decides which tests you need.",
      },
      {
        q: "Can PMOS be cured?",
        a: "PMOS is a long-term condition that is managed rather than switched off, and symptoms can often be improved with the right care. Your doctor will explain what to expect for you.",
      },
      {
        q: "Can I get pregnant if I have PMOS?",
        a: "Many women with PMOS conceive, sometimes with support. If you have been trying for 12 months (6 months if you are 35 or older), or sooner if you have irregular or absent periods, a fertility evaluation is reasonable.",
      },
      {
        q: "When should I see a gynaecologist about irregular periods?",
        a: "If irregularity is persistent over a few cycles, if bleeding is very heavy or prolonged, or if you are trying to conceive, it is worth booking an evaluation rather than waiting it out.",
      },
    ],
    relatedServices: ["gynaecological-care", "infertility-care", "pregnancy-scans-ultrasound"],
    relatedPosts: [
      "polyendocrine-metabolic-ovarian-syndrome-pmos-pcos",
      "irregular-periods-causes",
      "fertility-evaluation",
    ],
  },

  {
    slug: "infertility-care",
    name: "Infertility & Fertility Care",
    title: `Infertility & Fertility Evaluation in ${LOCATION}`,
    seoTitle: `Infertility Care in ${LOCATION} | Fertility Evaluation`,
    seoDescription: `Fertility evaluation and infertility-related care at The Blessed Womb, Alpha I, ${LOCATION}. Know when to seek help and what to expect from a first visit.`,
    image: IMG.svc4,
    imageAlt: ALT.couple2,
    updatedAt: "2026-10-08",
    cardSummary:
      "Fertility evaluation and infertility-related care, with ultrasound support and a clear plan for both partners.",
    answer: `Infertility is generally considered when a couple has not conceived after a period of trying — typically 12 months, or 6 months if the woman is 35 or older. Infertility and fertility-related care is part of the scope of The Blessed Womb in Alpha I, ${LOCATION}. A first visit is about understanding your situation, not committing to treatment.`,
    sections: [
      {
        heading: "When to consider a fertility evaluation",
        list: [
          "Trying to conceive for 12 months without success (under 35)",
          "Trying for 6 months without success (35 or older)",
          "Irregular or absent periods, or a known condition such as PMOS/PCOS",
          "Earlier evaluation is reasonable if you are over 40 or have a known risk factor",
        ],
        links: [{ slug: "pmos-pcos-care", label: "PMOS / PCOS care" }],
      },
      {
        heading: "What an evaluation involves",
        body: "A fertility evaluation usually involves both partners, since male factors contribute to a significant share of cases. It typically starts with a detailed history and examination, followed by tests chosen for your situation — such as an ultrasound assessment, hormone tests (for example AMH, which gives an indication of ovarian reserve) and a semen analysis. Not every test is needed for every couple, and an evaluation does not always lead to treatment: sometimes it simply confirms that things are on track.",
      },
      {
        heading: "What we can and cannot promise",
        body: "Every couple's situation is different, and no clinic can guarantee a pregnancy. What we can offer is a careful evaluation, honest explanation of your options, and care that is paced around you. Please contact us directly to discuss your specific needs.",
      },
    ],
    faq: [
      pick("Do you offer infertility"),
      {
        q: "How long should we try before seeking evaluation?",
        a: "General guidance suggests evaluation after 12 months of trying without success if you are under 35, or after 6 months if you are 35 or older. Earlier evaluation is reasonable if you are over 40 or have a condition that can affect fertility.",
      },
      {
        q: "Does my partner need to be tested too?",
        a: "Usually yes. A fertility evaluation typically involves both partners, and a semen analysis is a standard, straightforward part of the initial workup.",
      },
      {
        q: "What does an AMH test tell you?",
        a: "AMH reflects ovarian reserve, a general indication of egg quantity. It does not measure egg quality or predict whether you will conceive naturally, so it is one data point among several.",
      },
      {
        q: "Does a fertility evaluation mean I need treatment?",
        a: "No. An evaluation helps understand your situation. Sometimes it simply confirms that things are on track and you can keep trying with some guidance.",
      },
    ],
    relatedServices: ["pmos-pcos-care", "gynaecological-care", "pregnancy-scans-ultrasound"],
    relatedPosts: [
      "fertility-evaluation",
      "polyendocrine-metabolic-ovarian-syndrome-pmos-pcos",
      "irregular-periods-causes",
    ],
  },
];

/** Service pages that list this blog post as related reading (for the reverse link). */
export function getServicesForPost(postSlug) {
  return SERVICES.filter((s) => s.relatedPosts.includes(postSlug));
}

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

export const HUB_FAQ = [
  ...FAQS,
  {
    q: "Is the sex of the baby disclosed at The Blessed Womb?",
    a: "No. Determining or disclosing the sex of a baby before birth is prohibited under the PCPNDT Act, and it is not done at The Blessed Womb.",
  },
];

/** The PCPNDT statement shown in the footer and on every scan page. */
export const PCPNDT_NOTICE =
  "Under the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, determining or disclosing the sex of a foetus is prohibited and is not done at this centre.";
