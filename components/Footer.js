"use client";

import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import {
  ArrowUpRight,
  Location,
  Phone,
  Send,
  Facebook,
  Twitter,
  Youtube,
  LinkedIn,
} from "./Icons";

const QUICK = ["About", "Our Service", "Our Project", "Our Team", "Contact"];
const SERVICES = [
  "Fertility Treatment",
  "Hormone Testing",
  "Genetic Screening",
  "Embryo Transfer",
  "IVF Treatment",
];

export default function Footer() {
  return (
    <div className="footer-wrap">
      <img className="footer-embryo" src={IMG.footerBg} alt="" aria-hidden="true" />
      <div className="cta-banner reveal" data-anim="scale">
        <SmartImage src={IMG.ctaBaby} alt="" className="cta-bg" />
        <img className="cta-stripe" src={IMG.ctaStripe} alt="" aria-hidden="true" />
        <div className="cta-left">
          <h3>Personalized IVF solutions connect with us now</h3>
        </div>
        <div className="cta-right">
          <a href="#" className="btn">
            Appointment
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-cols">
            <div className="reveal">
              <h4>About Comapany</h4>
              <p>
                To helping individuals and couples achieve their dream of
                parenthood through advanced fertility care and compassion.
              </p>
            </div>

            <div className="reveal" data-delay="0.1">
              <h4>Quick Link</h4>
              <ul className="footer-links">
                {QUICK.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" data-delay="0.2">
              <h4>Services</h4>
              <ul className="footer-links">
                {SERVICES.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" data-delay="0.3">
              <h4>Address</h4>
              <div className="footer-contact">
                <span className="fc-ico">
                  <Location />
                </span>
                <p>
                  1901 Thornridge Cir.
                  <br />
                  Shiloh Hawaii 81063
                </p>
              </div>
              <h4 style={{ marginTop: 10 }}>Phone</h4>
              <div className="footer-contact">
                <span className="fc-ico">
                  <Phone />
                </span>
                <p>
                  <strong>+880 1998-900100</strong>
                  demo@example.com
                </p>
              </div>
            </div>
          </div>

          <div className="footer-newsletter">
            <span className="fn-brand">
              <img src={IMG.logoWhite} alt="Fertiora" className="fn-logo" />
            </span>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube />
              </a>
              <a href="#" aria-label="LinkedIn">
                <LinkedIn />
              </a>
            </div>
            <h5>
              Subscribe to Our
              <br />
              Newsletter
            </h5>
            <form
              className="newsletter-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" placeholder="Enter your email" />
              <button type="submit" aria-label="Subscribe">
                <Send />
              </button>
            </form>
          </div>

          <div className="footer-bottom">
            <p>© Copyright 2026 by Company.com</p>
            <div className="fb-links">
              <a href="#">Terms &amp; Condition</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
