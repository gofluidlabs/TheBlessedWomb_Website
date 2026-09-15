import { SOCIAL } from "@/lib/seo";
import { ArrowUpRight } from "./Icons";

// Deliberately no star ratings, review counts, or testimonial quotes here —
// none exist in a form we can verify, and fabricating them would violate
// this project's no-fake-reviews rule. This is a clean placeholder that
// points visitors to the real, official destination for reviews instead.
export default function PatientReviews() {
  return (
    <section className="section patient-reviews">
      <div className="container patient-reviews-inner reveal" data-anim="up">
        <span className="eyebrow">Patient Reviews</span>
        <h2 className="section-title">
          Hear From <span className="accent">Our Patients</span>
        </h2>
        <p className="about-desc">
          We&rsquo;re building a dedicated space here for patient
          experiences. In the meantime, you can read genuine patient reviews
          of {"The Blessed Womb"} on our Google Business Profile.
        </p>
        <a
          href={SOCIAL.googleBusinessProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          See More Patient Reviews on Google
          <span className="btn-ico">
            <ArrowUpRight />
          </span>
        </a>
      </div>
    </section>
  );
}
