import Link from "next/link";
import { ArrowUpRight } from "../Icons";

export default function BlogCTA() {
  return (
    <section className="section blog-cta">
      <div className="container blog-cta-inner reveal" data-anim="up">
        <span className="eyebrow">Your Next Step</span>
        <h2 className="section-title">
          Have a concern about your{" "}
          <span className="accent">health or pregnancy?</span>
        </h2>
        <p className="about-desc" style={{ maxWidth: 560, margin: "0 auto 26px" }}>
          Every reader&rsquo;s situation is different. If something in this
          article applies to you, the next step is a consultation — not
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
          <Link
            href="/contact"
            className="btn btn-outline"
            data-track="appointment_click"
            data-track-location="other"
          >
            Contact The Blessed Womb
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
