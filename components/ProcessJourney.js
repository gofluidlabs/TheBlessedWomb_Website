import {
  Phone,
  HeartHands,
  Microscope,
  Files,
  MedKit,
  Growth,
  UserDoc,
  Milestone,
  Stethoscope,
} from "./Icons";
import ProcessJourneyRow from "./ProcessJourneyRow";
import ProcessJourneyLineMobile from "./ProcessJourneyLineMobile";
import { IMG } from "@/lib/images";

const PHASES = [
  {
    number: "01",
    label: "01 · FIRST STEP",
    title: "Tell us what brings you here.",
    timing: "Your first visit",
    copy: "Your journey begins with a conversation. We listen to your concerns, understand your medical history and learn what you want to achieve from your care.",
    checklist: [
      "Initial consultation",
      "Medical & menstrual history",
      "Previous reports and treatment review",
      "Understanding your concerns",
      "Identifying the next steps",
    ],
    pill: "First Visit",
    icon: Phone,
    side: "left",
    image: IMG.processCard1,
    imagePosition: "center",
  },
  {
    number: "02",
    label: "02 · CLINICAL ASSESSMENT",
    title: "We look beyond the symptoms.",
    copy: "Your symptoms are only one part of the picture. Depending on your concerns, Dr. Jyoti Gupta may recommend examinations, blood tests, ultrasound or other appropriate investigations.",
    checklist: [
      "Clinical examination",
      "Blood investigations when required",
      "Ultrasound / imaging when required",
      "Review of previous medical records",
      "Understanding underlying factors",
    ],
    pill: "Assessment",
    icon: HeartHands,
    side: "right",
    image: IMG.processCard2,
    imagePosition: "center",
  },
  {
    number: "03",
    label: "03 · CLARITY",
    title: "Understand what your body needs.",
    copy: "Once the relevant information is available, we bring the findings together to understand your condition and discuss what they mean for you.",
    checklist: [
      "Review of investigation results",
      "Diagnosis / clinical assessment",
      "Discussing possible causes",
      "Explaining findings clearly",
      "Answering your questions",
    ],
    pill: "Clarity before treatment",
    icon: Microscope,
    side: "left",
    image: IMG.processCard3,
    imagePosition: "center",
  },
  {
    number: "04",
    label: "04 · YOUR CARE PLAN",
    title: "Your treatment plan is built around you.",
    copy: "There is no single treatment path for every woman. Based on your diagnosis, goals, medical history and individual needs, Dr. Jyoti Gupta discusses the most appropriate options with you.",
    checklist: [
      "Treatment options explained",
      "Risks and benefits discussed",
      "Medication / procedures where appropriate",
      "Lifestyle and supportive recommendations",
      "Clear next steps",
    ],
    pill: "Personalised Care",
    icon: Files,
    side: "right",
    image: IMG.processCard4,
    imagePosition: "center",
  },
  {
    number: "05",
    label: "05 · CARE BEGINS",
    title: "Now, we move from planning to care.",
    copy: "Your treatment begins according to the care plan decided with you. Depending on your needs, this may involve medication, lifestyle management, procedures, fertility treatment, pregnancy care or other gynaecological care.",
    checklist: [
      "Medication management",
      "Gynaecological treatment",
      "Fertility treatment where appropriate",
      "Pregnancy / antenatal care where applicable",
      "Procedures when clinically indicated",
    ],
    pill: "Treatment underway",
    icon: MedKit,
    side: "left",
    image: IMG.processCard5,
    imagePosition: "center",
  },
  {
    number: "06",
    label: "06 · TRACKING PROGRESS",
    title: "We don't just start treatment. We follow your progress.",
    copy: "Your response to treatment is monitored through scheduled consultations, investigations or scans when required. Your plan may be adjusted based on how your body responds.",
    checklist: [
      "Follow-up consultations",
      "Monitoring symptoms and response",
      "Blood tests when required",
      "Ultrasound / scans when required",
      "Treatment adjustments when appropriate",
    ],
    pill: "Monitor",
    icon: Growth,
    side: "right",
    image: IMG.processCard6,
    imagePosition: "center",
  },
  {
    number: "07",
    label: "07 · CHECKPOINT",
    title: "Pause. Review. Decide the next step.",
    copy: "Every important stage gives us an opportunity to review your progress and decide what comes next. The goal is not simply to complete a treatment plan, but to make sure the plan continues to make sense for you.",
    checklist: [
      "Review treatment response",
      "Discuss progress",
      "Address concerns",
      "Modify the plan if needed",
      "Decide next steps together",
    ],
    pill: "Progress reviewed",
    icon: UserDoc,
    side: "left",
    image: IMG.processCard7,
    imagePosition: "center",
  },
  {
    number: "08",
    label: "08 · NEXT CHAPTER",
    title: "Your care evolves with you.",
    copy: "Whether your journey leads to symptom management, recovery, conception, pregnancy, delivery or continued gynaecological care, we help you understand what comes next.",
    checklist: [
      "Treatment outcome review",
      "Recovery guidance",
      "Pregnancy follow-up where applicable",
      "Continued monitoring where needed",
      "Preventive women's healthcare",
    ],
    pill: "Next chapter",
    icon: Milestone,
    side: "right",
    image: IMG.processCard8,
    imagePosition: "center",
  },
  {
    number: "09",
    label: "09 · BEYOND TREATMENT",
    title: "Because women's healthcare doesn't end with one treatment.",
    copy: "Some women need ongoing care, preventive screening or periodic follow-ups. We remain a healthcare partner beyond a single consultation or treatment cycle.",
    checklist: [
      "Follow-up care",
      "Preventive gynaecological care",
      "Cervical cancer screening",
      "Women's wellness",
      "Future consultations when needed",
    ],
    pill: "Long-term care",
    icon: Stethoscope,
    side: "left",
    image: IMG.processCard9,
    imagePosition: "center",
  },
];

export default function ProcessJourney() {
  return (
    <section className="section pj-journey" id="journey">
      <div className="container">
        <div className="pj-journey-head">
          <span className="eyebrow reveal" data-anim="up">
            The Journey
          </span>
          <h2
            id="journey-ribbon-start"
            className="section-title reveal"
            data-anim="up"
            data-delay="0.05"
          >
            One path, <span className="accent">nine stages</span>
          </h2>
          <p className="pj-journey-sub reveal" data-anim="up" data-delay="0.1">
            Every woman&rsquo;s journey moves at its own pace. Here is the
            broad path most patients move through with us — the timing and
            specifics of your own care depend on your condition, diagnosis
            and how you respond to treatment.
          </p>
        </div>

        <div className="pj-stack">
          <ProcessJourneyLineMobile />
          {PHASES.map((phase) => (
            <ProcessJourneyRow key={phase.number} phase={phase} />
          ))}
        </div>
      </div>
    </section>
  );
}
