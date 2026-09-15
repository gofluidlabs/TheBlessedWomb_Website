export default function ProcessJourneyCard({
  number,
  label,
  title,
  timing,
  copy,
  checklist,
  icon: Icon,
  pill,
  side,
}) {
  return (
    <article
      className={`pj-card ${side} reveal`}
      data-anim={side === "left" ? "left" : "right"}
    >
      <span className="pj-card-icon">
        <Icon />
      </span>
      <span className="pj-card-pill">{pill}</span>
      <div className="pj-card-num">{number}</div>
      <span className="pj-card-label">{label}</span>
      <h3 className="pj-card-title">{title}</h3>
      {timing && <p className="pj-card-timing">{timing}</p>}
      <p className="pj-card-copy">{copy}</p>
      <ul className="pj-card-checklist">
        {checklist.map((item) => (
          <li key={item}>
            <span className="pj-check">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
