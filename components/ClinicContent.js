import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import Link from "next/link";
import { CLINIC, DOCTOR, OPENING_HOURS, SOCIAL } from "@/lib/seo";
import { Location, Phone, Clock, ArrowUpRight } from "./Icons";

export default function ClinicContent() {
  return (
    <section className="section">
      <div className="container pg-two-col top">
        <div className="reveal" data-anim="left">
          <SmartImage
            src={IMG.contactBanner}
            alt={`Map and directions to ${CLINIC.name} in ${CLINIC.streetAddress}`}
            className="pg-photo clinic-map-photo"
            priority
          />
        </div>

        <div className="contact-info reveal" data-anim="right">
          <span className="eyebrow">Clinic &amp; Location</span>
          <h2 className="section-title">
            Visit Us In
            <br />
            <span className="accent">Alpha I, Greater Noida</span>
          </h2>
          <p className="about-desc">
            {CLINIC.name}, led by {DOCTOR.name} ({DOCTOR.jobTitle}), is located in
            {" "}{CLINIC.streetAddress}, easily reachable from Alpha 1 Main
            Market and Pari Chowk.
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
                <Clock />
              </span>
              <div>
                <span>Hours</span>
                <strong style={{ fontSize: 15 }}>
                  {OPENING_HOURS
                    ? OPENING_HOURS.map((h) => `${h.days.join(", ")} ${h.opens}–${h.closes}`).join(" · ")
                    : "Please call ahead to confirm today's timings"}
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
        </div>
      </div>

      <div className="container clinic-extra">
        <div className="clinic-map reveal" data-anim="up">
          <iframe
            title={`Map showing ${CLINIC.name}, ${CLINIC.streetAddress}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${CLINIC.name}, ${CLINIC.streetAddress}, ${CLINIC.addressRegion} ${CLINIC.postalCode}`
            )}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="clinic-first-visit reveal" data-anim="up">
          <h2 className="section-title">
            Your <span className="accent">first visit</span>
          </h2>
          <p className="about-desc">
            To make the most of your consultation, please bring:
          </p>
          <ul className="clinic-bring">
            <li>Any previous medical, pregnancy or scan reports</li>
            <li>A list of the medicines and supplements you take</li>
            <li>The dates of your last periods, if relevant</li>
            <li>Your questions — write them down so none are forgotten</li>
          </ul>
          <p className="about-desc">
            Call {CLINIC.phone} to book, or use our{" "}
            <Link href="/contact">appointment form</Link>. Not sure what you
            need? See our <Link href="/services">services</Link>, or read
            genuine patient feedback on our{" "}
            <a
              href={SOCIAL.googleBusinessProfile}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Business Profile
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
