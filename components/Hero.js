import Link from "next/link";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-visual">
        {/* The hero photo is the page's LCP element, so it stays `priority`
            (preloaded, never lazy). `unoptimized` has been dropped now that
            the source is a right-sized WebP — Next can generate responsive
            AVIF/WebP variants from it instead of shipping one file to every
            device. */}
        <SmartImage
          src={IMG.hero}
          alt="Expectant mother resting comfortably — antenatal and pregnancy care at The Blessed Womb, Greater Noida"
          className="hero-bg"
          priority
          sizes="100vw"
        />

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
            {/* The slogan alone is the brand line but carries no search
                intent, so the page's single <h1> also states, visibly,
                what the clinic is and where it is. This is the strongest
                on-page heading signal for the primary local query. */}
            <span className="hero-title-sub">
              Gynaecologist &amp; Obstetrician in Greater Noida
            </span>
          </h1>
        </div>

        <p className="hero-sub reveal" data-anim="up" data-delay="0.2">
          The Blessed Womb, Under Dr. Jyoti Maternity, Infertility &amp;
          Ultrasound Centre, Provides Antenatal Care And Clinically Indicated
          Pregnancy Scans Under The Supervision Of Dr. Jyoti Gupta.
        </p>
      </div>

      <div className="hero-doctor-card reveal" data-anim="up" data-delay="0.4">
        <SmartImage src={IMG.heroDoctor} alt="Dr. Jyoti Gupta, Obstetrician & Gynaecologist, Greater Noida" className="doc-photo" sizes="(max-width: 480px) 40px, 96px" />
        <div>
          <p className="doc-name">Dr. Jyoti Gupta</p>
          <p>Obstetrician &amp; Gynaecologist</p>
          <Link
            href="/contact"
            className="book"
            data-track="appointment_click"
            data-track-location="hero"
          >
            Book Now <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
