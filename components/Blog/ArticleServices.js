import Link from "next/link";

// "Related service" box at the end of an article. It is the reverse of the
// service pages' "related reading" links, so a visitor (and a crawler) who
// lands on an article has a direct path to the page that explains the care.
export default function ArticleServices({ services }) {
  if (!services || services.length === 0) return null;
  return (
    <aside className="article-services">
      <h2 className="section-title">Related services at The Blessed Womb</h2>
      <ul>
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`}>{s.name}</Link>
            <span>{s.cardSummary}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
