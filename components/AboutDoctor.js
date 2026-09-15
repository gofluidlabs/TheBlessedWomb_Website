import { IMG } from "@/lib/images";

export default function AboutDoctor() {
  return (
    <section className="section about" id="doctor" style={{ background: "var(--pink-tint)" }}>
      <div className="container pg-two-col">
        <div className="pg-photo reveal">
          <img src={IMG.whyDoctor} alt="Dr. Jyoti Gupta" />
        </div>

        <div className="reveal" data-anim="right">
          <span className="eyebrow">The Doctor</span>
          <h2 className="section-title">Dr. Jyoti Gupta</h2>
          <p style={{ color: "var(--coral)", fontWeight: 600, marginTop: -8, marginBottom: 20 }}>
            Obstetrician &amp; Gynaecologist
          </p>
          <p className="about-desc" style={{ maxWidth: 560 }}>
            Dr. Jyoti Gupta is an experienced Obstetrician &amp; Gynaecologist
            with more than 20+ years of experience, based in Greater Noida,
            Uttar Pradesh. She is a women&rsquo;s healthcare specialist and an
            experienced pregnancy and antenatal care provider, as well as a
            provider of gynaecological care, pregnancy and
            ultrasound-related diagnostic services, and infertility and
            fertility-related care under Dr. Jyoti Maternity, Infertility
            &amp; Ultrasound Centre.
          </p>
          <p className="about-desc" style={{ maxWidth: 560, marginTop: 16 }}>
            Her approach is professional, trustworthy and patient-focused —
            walking beside every mother through antenatal care and every
            step of the pregnancy journey.
          </p>
        </div>
      </div>
    </section>
  );
}
