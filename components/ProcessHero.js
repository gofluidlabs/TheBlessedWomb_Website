import Link from "next/link";
import { ArrowUpRight, Growth, UserDoc, Phone } from "./Icons";

export default function ProcessHero() {
  return (
    <section className="section pj-hero">
      <div className="container">
        <h1 className="sr-only">
          Your Journey With Us — From Your First Visit To Your Next Chapter
        </h1>
        <p className="pj-hero-copy reveal" data-anim="up">
          Every woman&rsquo;s journey is different. At The Blessed Womb, we
          begin by understanding you, identifying what you need, and
          creating a care plan that evolves with you — not a fixed timeline
          applied to everyone the same way.
        </p>

        <div className="pj-hero-actions reveal" data-anim="up" data-delay="0.1">
          <a href="#journey" className="btn">
            Start Your Journey
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </a>
          <Link href="/contact" className="btn btn-outline">
            Book a Consultation
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
        </div>

        <div className="pj-float-card reveal" data-anim="scale" data-delay="0.15">
          <span className="pj-float-ico">
            <UserDoc />
          </span>
          <div>
            <strong>Dr. Jyoti Gupta</strong>
            <span>MBBS, Dip. GO, PGDUS</span>
          </div>
        </div>

        <div className="pj-float-card d2 reveal" data-anim="scale" data-delay="0.2">
          <span className="pj-float-ico">
            <Growth />
          </span>
          <div>
            <strong>20+ Years</strong>
            <span>of women&rsquo;s healthcare</span>
          </div>
        </div>

        <div className="pj-float-card d3 reveal" data-anim="scale" data-delay="0.25">
          <span className="pj-float-ico">
            <Phone />
          </span>
          <div>
            <strong>First Visit</strong>
            <span>your concerns, heard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
