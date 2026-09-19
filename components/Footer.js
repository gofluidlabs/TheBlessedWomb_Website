"use client";

import Link from "next/link";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { CLINIC, SOCIAL } from "@/lib/seo";
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

const QUICK = [
  { label: "About", href: "/about" },
  { label: "Our Services", href: "/#services" },
  { label: "Our Process", href: "/#process" },
  { label: "Our Team", href: "/#team" },
  { label: "FAQs", href: "/#faq" },
  { label: "Clinic & Location", href: "/clinic" },
  { label: "Health Resources", href: "/blog" },
];
const SERVICES = [
  "Antenatal Care",
  "Pregnancy Scans & Ultrasound",
  "Doppler Studies",
  "Gynaecological Care",
  "Infertility Care",
];

export default function Footer() {
  return (
    <div className="footer-wrap">
      <img className="footer-embryo" src={IMG.footerBg} alt="" aria-hidden="true" />
      <div className="cta-banner reveal" data-anim="scale">
        <SmartImage src={IMG.ctaBaby} alt="" className="cta-bg" />
        <img className="cta-stripe" src={IMG.ctaStripe} alt="" aria-hidden="true" />
        <div className="cta-left">
          <h3>Comprehensive antenatal care, connect with us now</h3>
        </div>
        <div className="cta-right">
          <Link
            href="/contact"
            className="btn"
            data-track="appointment_click"
            data-track-location="footer"
          >
            Appointment
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-cols">
            <div className="reveal">
              <h4>About The Blessed Womb</h4>
              <p>
                Comprehensive antenatal care and clinically indicated
                pregnancy scans under the supervision of Dr. Jyoti Gupta —
                complete care of motherhood.
              </p>
            </div>

            <div className="reveal" data-delay="0.1">
              <h4>Quick Link</h4>
              <ul className="footer-links">
                {QUICK.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal" data-delay="0.2">
              <h4>Services</h4>
              <ul className="footer-links">
                {SERVICES.map((l) => (
                  <li key={l}>
                    <Link href="/#services">{l}</Link>
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
                  {CLINIC.streetAddress},
                  <br />
                  {CLINIC.addressRegion} {CLINIC.postalCode}
                  <br />({CLINIC.landmark})
                </p>
              </div>
              <h4 style={{ marginTop: 10 }}>Phone</h4>
              <div className="footer-contact">
                <span className="fc-ico">
                  <Phone />
                </span>
                <p>
                  <strong>{CLINIC.phone}</strong>
                  {CLINIC.primaryEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="footer-newsletter">
            <span className="fn-brand">
              <img src={IMG.logoMark} alt="The Blessed Womb" className="fn-logo" />
              The Blessed Womb
            </span>
            <div className="footer-social">
              <a
                href={SOCIAL.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube />
              </a>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
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
            <p>© Copyright 2026 {CLINIC.name} — {CLINIC.legalName}</p>
            <div className="fb-links">
              <Link href="/terms">Terms &amp; Condition</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
