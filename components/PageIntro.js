import Link from "next/link";

export default function PageIntro({ eyebrow, title, subtitle, crumb }) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="pi-crumb reveal" data-anim="up">
          <Link href="/">Home</Link> / {crumb}
        </div>
        <span className="eyebrow reveal" data-anim="up" data-delay="0.05">
          {eyebrow}
        </span>
        <h1 className="page-intro-title reveal" data-anim="up" data-delay="0.1">
          {title}
        </h1>
        {subtitle && (
          <p className="page-intro-sub reveal" data-anim="up" data-delay="0.15">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
