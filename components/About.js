import SmartImage from "./SmartImage";
import BrandMark from "./BrandMark";
import { IMG } from "@/lib/images";
import { HeartHands, Microscope, Phone, ArrowUpRight } from "./Icons";

export default function About() {
  return (
    <section className="section about" id="about">
      <img className="about-silhouette" src={IMG.silhouette} alt="" aria-hidden="true" />
      <div className="container about-grid">
        <div className="about-gallery reveal" data-anim="left">
          <SmartImage src={IMG.aboutTall} alt="" className="g-tall" />
          <SmartImage src={IMG.aboutTop} alt="" className="g-img" />
          <SmartImage src={IMG.aboutBottom} alt="" className="g-img" />
          <div className="about-badge">
            <svg className="badge-spin" viewBox="0 0 150 150">
              <defs>
                <path
                  id="circlePath"
                  d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
                />
              </defs>
              <text fontSize="11" fill="#3b2a4d" letterSpacing="2">
                <textPath href="#circlePath">
                  25+ YEARS OF EXPERIENCE • 25+ YEARS OF EXPERIENCE •
                </textPath>
              </text>
            </svg>
            <span className="badge-core">
              <BrandMark size={34} />
            </span>
          </div>
        </div>

        <div className="about-content reveal" data-anim="right">
          <span className="eyebrow">About Us</span>
          <h2 className="section-title">
            Dedicated to helping you
            <br />
            <span className="accent">achieve your dream</span>
          </h2>
          <p className="about-desc">
            We believe every family begins with hope, and we&rsquo;re committed
            to helping you turn that hope into reality. Our experienced team
            walks beside you at every step of the journey.
          </p>

          <div className="about-divider" />

          <div className="about-features">
            <div className="feature">
              <span className="feat-ico">
                <HeartHands />
              </span>
              <div>
                <h4>Family Focused</h4>
                <p>We create a warm and welcoming environment.</p>
              </div>
            </div>
            <div className="feature alt">
              <span className="feat-ico">
                <Microscope />
              </span>
              <div>
                <h4>Ethical Practices</h4>
                <p>We create a warm and welcoming environment.</p>
              </div>
            </div>
          </div>

          <div className="about-cta">
            <a href="#" className="btn">
              About More
              <span className="btn-ico">
                <ArrowUpRight />
              </span>
            </a>
            <div className="about-contact">
              <span className="c-ico">
                <Phone />
              </span>
              <div>
                <span>Contact Us:</span>
                <strong>+92 3800 8060</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
