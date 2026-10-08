import Link from "next/link";
import { CLINIC } from "@/lib/seo";
import { ArrowUpRight, Phone, Location } from "./Icons";

export default function ServiceCTA({ heading = "Ready to book a consultation?" }) {
  return (
    <section className="section blog-cta">
      <div className="container blog-cta-inner reveal" data-anim="up">
        <span className="eyebrow">Your Next Step</span>
        <h2 className="section-title">{heading}</h2>
        <p className="about-desc" style={{ maxWidth: 560, margin: "0 auto 26px" }}>
          Every pregnancy and every woman&rsquo;s health needs are different.
          The next step is a consultation with Dr. Jyoti Gupta, not
          self-diagnosis.
        </p>
        <div className="blog-cta-actions">
          <Link
            href="/contact"
            className="btn"
            data-track="appointment_click"
            data-track-location="other"
          >
            Book a Consultation
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
          <a href={CLINIC.phoneHref} className="btn btn-outline">
            Call {CLINIC.phone}
            <span className="btn-ico">
              <Phone />
            </span>
          </a>
        </div>
        <p className="svc-local">
          <Location width={18} height={18} /> {CLINIC.fullAddress} &middot;{" "}
          <Link href="/clinic">Directions &amp; clinic details</Link>
        </p>
      </div>
    </section>
  );
}
