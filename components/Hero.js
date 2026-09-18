import Link from "next/link";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-visual">
        <SmartImage src={IMG.hero} alt="" className="hero-bg" priority unoptimized />

        {/* decorative elements */}
        <img className="hero-molecule" src={IMG.molecule} alt="" aria-hidden="true" />
        <img className="hero-steth" src={IMG.stethoscope} alt="" aria-hidden="true" />
      </div>

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
        <SmartImage src={IMG.heroDoctor} alt="Dr. Jyoti Gupta" className="doc-photo" sizes="(max-width: 480px) 40px, 96px" />
        <div>
          <p className="doc-name">Dr. Jyoti Gupta</p>
          <p>Obstetrician &amp; Gynaecologist</p>
          <Link href="/contact" className="book">
            Book Now <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
