import Link from "next/link";
import { ArrowUpRight, Location } from "./Icons";
import { CLINIC } from "@/lib/seo";

export default function ProcessCta() {
  return (
    <section className="pj-final-cta" id="next-step">
      <div className="container">
        <span className="eyebrow on-dark reveal" data-anim="up">
          Your Next Step
        </span>
        <h2 className="section-title on-dark reveal" data-anim="up" data-delay="0.05">
          Every journey starts with{" "}
          <span className="accent">a conversation.</span>
        </h2>
        <p className="pj-journey-sub reveal" data-anim="up" data-delay="0.1" style={{ color: "rgba(255,255,255,0.75)" }}>
          Whether you have a specific concern, are planning a pregnancy,
          seeking fertility guidance or simply want to understand your
          women&rsquo;s health better, begin with a consultation.
        </p>

        <div className="pj-final-actions reveal" data-anim="up" data-delay="0.15">
          <Link href="/contact" className="btn">
            Book a Consultation
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact The Blessed Womb
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
        </div>

        <div className="pj-final-address reveal" data-anim="up" data-delay="0.2">
          <Location width={18} height={18} />
          <span>
            <Link href="/clinic">
              {CLINIC.name} — {CLINIC.streetAddress}, {CLINIC.addressRegion}{" "}
              {CLINIC.postalCode}
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
