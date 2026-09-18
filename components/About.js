import Link from "next/link";
import SmartImage from "./SmartImage";
import BrandMark from "./BrandMark";
import { IMG } from "@/lib/images";
import { CLINIC, DOCTOR } from "@/lib/seo";
import { HeartHands, Microscope, Phone, ArrowUpRight } from "./Icons";

export default function About() {
  return (
    <section className="section about" id="about">
      <img className="about-silhouette" src={IMG.silhouette} alt="" aria-hidden="true" />
      <div className="container about-grid">
        <div className="about-gallery reveal" data-anim="left">
          <SmartImage
            src={IMG.aboutTall}
            alt="Dr. Jyoti Gupta with a patient at The Blessed Womb, Greater Noida"
            className="g-tall"
          />
          <SmartImage
            src={IMG.aboutTop}
            alt="Antenatal consultation at The Blessed Womb"
            className="g-img"
          />
          <SmartImage
            src={IMG.aboutBottom}
            alt="Pregnancy care and support at The Blessed Womb"
            className="g-img"
          />
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
                  20+ YEARS OF EXPERIENCE • 20+ YEARS OF EXPERIENCE •
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
            Dedicated to the
            <br />
            <span className="accent">complete care of motherhood</span>
          </h2>
          <p className="about-desc">
            Dr. Jyoti Gupta is an experienced Obstetrician &amp; Gynaecologist
            in Greater Noida with {DOCTOR.experienceSentence}. Under
            Dr. Jyoti Maternity, Infertility &amp; Ultrasound Centre, The
            Blessed Womb walks beside you through antenatal care and every
            step of your pregnancy journey.
          </p>

          <div className="about-divider" />

          <div className="about-features">
            <div className="feature">
              <span className="feat-ico">
                <HeartHands />
              </span>
              <div>
                <h4>Patient Focused</h4>
                <p>A warm, welcoming environment for every mother.</p>
              </div>
            </div>
            <div className="feature alt">
              <span className="feat-ico">
                <Microscope />
              </span>
              <div>
                <h4>Comprehensive Diagnostics</h4>
                <p>Pregnancy and gynaecological ultrasound under one roof.</p>
              </div>
            </div>
          </div>

          <div className="about-cta">
            <Link href="/about" className="btn">
              About More
              <span className="btn-ico">
                <ArrowUpRight />
              </span>
            </Link>
            <div className="about-contact">
              <span className="c-ico">
                <Phone />
              </span>
              <div>
                <span>Contact Us:</span>
                <strong>{CLINIC.phone}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
