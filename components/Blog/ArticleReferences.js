export default function ArticleReferences({ references }) {
  if (!references || references.length === 0) return null;
  return (
    <div className="article-references">
      <h2 className="section-title">References</h2>
      <ol>
        {references.map((r) => (
          <li key={r.url}>
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              {r.title}
            </a>
            {r.publisher ? `. ${r.publisher}.` : ""}
          </li>
        ))}
      </ol>
    </div>
  );
}
