import Link from "next/link";

export default function Breadcrumbs({ items }) {
  // items: [{ name, href }] — last item renders as plain text (current page)
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name}>
              {isLast || !item.href ? (
                <span aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
              {!isLast && <span className="breadcrumb-sep">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
