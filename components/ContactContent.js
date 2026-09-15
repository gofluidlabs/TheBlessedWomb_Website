"use client";

import Link from "next/link";
import { Location, Phone, ArrowUpRight } from "./Icons";
import ContactForm from "./ContactForm";
import { CLINIC } from "@/lib/seo";

export default function ContactContent() {
  return (
    <section className="section">
      <div className="container pg-two-col top">
        <div className="contact-info reveal" data-anim="left">
          <span className="eyebrow">Contact Us</span>
          <h2 className="section-title">
            Get in
            <br />
            <span className="accent">Touch</span>
          </h2>
          <p className="about-desc">
            {CLINIC.name} — {CLINIC.legalName}. We&rsquo;d love to hear from
            you and help with your care journey.
          </p>

          <div className="contact-rows">
            <div className="about-contact">
              <span className="c-ico">
                <Location />
              </span>
              <div>
                <span>Address</span>
                <strong style={{ fontSize: 16 }}>{CLINIC.fullAddress}</strong>
              </div>
            </div>
            <div className="about-contact">
              <span className="c-ico">
                <Phone />
              </span>
              <div>
                <span>Phone</span>
                <strong>{CLINIC.phone}</strong>
              </div>
            </div>
            <div className="about-contact">
              <span className="c-ico">
                <Phone />
              </span>
              <div>
                <span>Email</span>
                <strong style={{ fontSize: 15 }}>
                  {CLINIC.emails[0]}
                  <br />
                  {CLINIC.emails[1]}
                </strong>
              </div>
            </div>
          </div>

          <div className="contact-actions">
            <a href={CLINIC.phoneHref} className="btn">
              Call Clinic
              <span className="btn-ico">
                <ArrowUpRight />
              </span>
            </a>
            <a
              href={CLINIC.mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Get Directions
              <span className="btn-ico">
                <ArrowUpRight />
              </span>
            </a>
          </div>

          <p className="contact-clinic-link">
            <Link href="/clinic">
              See full clinic details, map and how to reach us
            </Link>
          </p>
        </div>

        <div className="contact-form-card reveal" data-anim="right">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
