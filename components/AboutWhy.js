import { Microscope, UserDoc, MedKit, HeartHands } from "./Icons";
import { DOCTOR } from "@/lib/seo";

const REASONS = [
  {
    icon: Microscope,
    title: "Comprehensive Antenatal Care",
    desc: "Antenatal care and pregnancy supervision at every stage.",
  },
  {
    icon: UserDoc,
    title: "Patient First Philosophy",
    desc: "A warm, attentive environment built around your concerns.",
  },
  {
    icon: MedKit,
    title: "Pregnancy & Gynae Diagnostics",
    desc: "Pregnancy and gynaecological ultrasound under one roof.",
  },
  {
    icon: HeartHands,
    title: "Experienced & Caring Team",
    desc: `More than ${DOCTOR.experience} of experience in women's healthcare.`,
  },
];

export default function AboutWhy() {
  return (
    <section className="section about" id="why" style={{ background: "var(--pink-tint)" }}>
      <div className="container" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <span className="eyebrow reveal" data-anim="up">
          Why Choose Us
        </span>
        <h2 className="section-title reveal" data-anim="up" data-delay="0.05">
          Why Families Trust
          <br />
          <span className="accent">Our Care</span>
        </h2>

        <div className="about-features reveal" data-anim="up" data-delay="0.1" style={{ marginTop: 40, textAlign: "left" }}>
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className={`feature ${i % 2 === 1 ? "alt" : ""}`}>
                <span className="feat-ico">
                  <Icon />
                </span>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
