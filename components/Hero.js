import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { ArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section className="hero">
      <SmartImage src={IMG.hero} alt="" className="hero-bg" />

      {/* decorative elements */}
      <img className="hero-molecule" src={IMG.molecule} alt="" aria-hidden="true" />
      <img className="hero-steth" src={IMG.stethoscope} alt="" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-copy">
          <h1 className="hero-title reveal" data-anim="up">
            Creating Family
            <br />
            Dreams
          </h1>
        </div>

        <p className="hero-sub reveal" data-anim="up" data-delay="0.2">
          We Are Dedicated To Helping Individuals And Couples Achieve Their
          Dream Of Parenthood Through Advanced Fertility.
        </p>
      </div>

      <div className="hero-doctor-card reveal" data-anim="up" data-delay="0.4">
        <SmartImage src={IMG.heroDoctor} alt="Miss Nikita Roy" className="doc-photo" />
        <div>
          <h4>Miss Nikita Roy</h4>
          <p>Expert IVF Doctorest</p>
          <a href="#" className="book">
            Book Now <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
