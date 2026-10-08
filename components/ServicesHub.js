import Link from "next/link";
import ServiceCard from "./ServiceCard";
import ArticleFAQ from "./Blog/ArticleFAQ";
import ArticleAuthor from "./Blog/ArticleAuthor";
import { SERVICES, HUB_FAQ } from "@/lib/services";
import { CLINIC, DOCTOR } from "@/lib/seo";

export default function ServicesHub() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="svc-hub-intro reveal" data-anim="up">
            <h2 className="section-title">
              Pregnancy &amp; women&rsquo;s health care{" "}
              <span className="accent">under one roof</span>
            </h2>
            <p className="about-desc">
              {`${CLINIC.name} in Alpha I, Greater Noida offers antenatal care, pregnancy scans and ultrasound, Doppler studies, gynaecological care and infertility care, led by ${DOCTOR.name}, ${DOCTOR.jobTitle} with ${DOCTOR.experience} of experience. Choose a service below to see what it includes, when it is advised and what to expect.`}
            </p>
          </div>

          <div className="svc-hub-grid" data-stagger>
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section svc-hub-how">
        <div className="container reveal" data-anim="up">
          <h2 className="section-title">
            How care works <span className="accent">at The Blessed Womb</span>
          </h2>
          <p className="about-desc">
            Every plan starts with a consultation, so that scans, tests and
            follow-ups are recommended because you need them, not because they
            are on a fixed list. See the full path of care on our{" "}
            <Link href="/process">patient journey page</Link>, or read our{" "}
            <Link href="/blog">health articles</Link> for background before
            your visit.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container article-container">
          <ArticleFAQ faq={HUB_FAQ} />
          <ArticleAuthor />
          <p className="article-disclaimer">
            Information on this page is for general education and does not
            replace an individual medical consultation.
          </p>
        </div>
      </section>
    </>
  );
}
