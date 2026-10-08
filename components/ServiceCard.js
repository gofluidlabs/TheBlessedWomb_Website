import Link from "next/link";
import SmartImage from "./SmartImage";
import { ArrowRight } from "./Icons";

export default function ServiceCard({ service }) {
  return (
    <article className="svc-card">
      <Link href={`/services/${service.slug}`} className="svc-card-img" tabIndex={-1}>
        <SmartImage
          src={service.image}
          alt={service.imageAlt}
          sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 380px"
        />
      </Link>
      <div className="svc-card-body">
        <h3>
          <Link href={`/services/${service.slug}`}>{service.name}</Link>
        </h3>
        <p>{service.cardSummary}</p>
        <Link href={`/services/${service.slug}`} className="svc-card-link">
          Learn more <ArrowRight />
        </Link>
      </div>
    </article>
  );
}
