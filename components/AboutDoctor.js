import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { DOCTOR } from "@/lib/seo";

export default function AboutDoctor() {
  return (
    <section className="section about" id="doctor" style={{ background: "var(--pink-tint)" }}>
      <div className="container pg-two-col">
        <div className="pg-photo reveal">
          <Image
            src={IMG.whyDoctor}
            alt="Dr. Jyoti Gupta, Obstetrician & Gynaecologist in Greater Noida, in a white coat with a stethoscope"
            width={1145}
            height={1374}
            sizes="(max-width: 960px) 90vw, 520px"
          />
        </div>

        <div className="reveal" data-anim="right">
          <span className="eyebrow">The Doctor</span>
          <h2 className="section-title">Dr. Jyoti Gupta</h2>
          <p style={{ color: "var(--coral)", fontWeight: 600, marginTop: -8, marginBottom: 20 }}>
            Obstetrician &amp; Gynaecologist
          </p>
          <p className="about-desc" style={{ maxWidth: 560 }}>
            Dr. Jyoti Gupta is an experienced Obstetrician &amp; Gynaecologist
            with {DOCTOR.experienceSentence}, based in Greater Noida,
            Uttar Pradesh. She is a women&rsquo;s healthcare specialist and an
            experienced <Link href="/services/antenatal-care">pregnancy and antenatal care</Link> provider, as well as a
            provider of <Link href="/services/gynaecological-care">gynaecological care</Link>,{" "}
            <Link href="/services/pregnancy-scans-ultrasound">pregnancy and ultrasound-related diagnostic services</Link>, and{" "}
            <Link href="/services/infertility-care">infertility and fertility-related care</Link> under Dr. Jyoti Maternity, Infertility
            &amp; Ultrasound Centre.
          </p>
          <p className="about-desc" style={{ maxWidth: 560, marginTop: 16 }}>
            Her approach is professional, trustworthy and patient-focused —
            walking beside every mother through antenatal care and every
            step of the pregnancy journey.
          </p>
          <ul className="doctor-facts">
            <li>
              <strong>Qualifications:</strong> {DOCTOR.credentials}
            </li>
            <li>
              <strong>Experience:</strong> {DOCTOR.experience}
            </li>
            {DOCTOR.registration && (
              <li>
                <strong>Medical council registration no.:</strong>{" "}
                {DOCTOR.registration}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
