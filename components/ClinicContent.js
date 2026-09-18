import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { CLINIC, DOCTOR, OPENING_HOURS } from "@/lib/seo";
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
            {CLINIC.name} — {CLINIC.legalName}, led by {DOCTOR.name} (
            {DOCTOR.jobTitle}) — is located in {CLINIC.streetAddress}, easily
            reachable from Alpha 1 Main Market.
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
                    ? "See below"
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
    </section>
  );
}
