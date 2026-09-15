import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="hero">
      <SmartImage src={IMG.hero} alt="" className="hero-bg" priority />

      {/* decorative elements */}
      <img className="hero-molecule" src={IMG.molecule} alt="" aria-hidden="true" />
      <img className="hero-steth" src={IMG.stethoscope} alt="" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-copy">
          <h1 className="hero-title reveal" data-anim="up">
            Complete Care
            <br />
            of Motherhood
          </h1>
        </div>

        <p className="hero-sub reveal" data-anim="up" data-delay="0.2">
          The Blessed Womb, Under Dr. Jyoti Maternity, Infertility &amp;
          Ultrasound Centre, Provides Antenatal Care And Clinically Indicated
          Pregnancy Scans Under The Supervision Of Dr. Jyoti Gupta.
        </p>
      </div>

      <div className="hero-doctor-card reveal" data-anim="up" data-delay="0.4">
        <SmartImage src={IMG.heroDoctor} alt="Dr. Jyoti Gupta" className="doc-photo" />
        <div>
          <h4>Dr. Jyoti Gupta</h4>
          <p>Obstetrician &amp; Gynaecologist</p>
          <a href="#" className="book">
            Book Now <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
