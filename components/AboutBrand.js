import { Location, Phone } from "./Icons";
import { CLINIC } from "@/lib/seo";

export default function AboutBrand() {
  return (
    <section className="section about" id="brand">
      <div className="container">
        <span className="eyebrow reveal" data-anim="up">
          The Blessed Womb
        </span>
        <h2 className="section-title reveal" data-anim="up" data-delay="0.05">
          Complete Care
          <br />
          <span className="accent">of Motherhood</span>
        </h2>
        <p className="about-desc reveal" data-anim="up" data-delay="0.1" style={{ maxWidth: 720 }}>
          The Blessed Womb operates under Dr. Jyoti Maternity, Infertility &amp;
          Ultrasound Centre in Block D, Alpha I, Greater Noida, Uttar Pradesh.
          It brings together antenatal care and pregnancy supervision,
          clinically indicated pregnancy scans, pregnancy and gynaecological
          ultrasound, Doppler studies, gynaecological care and
          infertility-related care — all under the personal guidance of
          Dr. Jyoti Gupta.
        </p>

        <div className="contact-rows reveal" data-anim="up" data-delay="0.15" style={{ maxWidth: 480, marginTop: 30 }}>
          <div className="about-contact">
            <span className="c-ico">
              <Location />
            </span>
            <div>
              <span>Visit Us</span>
              <strong style={{ fontSize: 16 }}>{CLINIC.fullAddress}</strong>
            </div>
          </div>
          <div className="about-contact">
            <span className="c-ico">
              <Phone />
            </span>
            <div>
              <span>Call Us</span>
              <strong>{CLINIC.phone}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
