import Link from "next/link";
import { ArrowRight } from "./Icons";
import SmartImage from "./SmartImage";

export default function MegaMenu({ menu, open, variant, onLinkClick }) {
  const { items, cta } = menu;
  return (
    <div className={`mega-panel mega-panel--${variant} ${open ? "open" : ""}`}>
      <div className="mega-panel-inner">
        <div className="mega-links">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="mega-link"
                onClick={onLinkClick}
              >
                {item.image && (
                  <span className="ml-img">
                    <SmartImage src={item.image} alt={item.label} />
                  </span>
                )}
                <span className="ml-body">
                  <span className="ml-ico">
                    <Icon />
                  </span>
                  <span className="ml-text">
                    <h5>{item.label}</h5>
                    {item.desc && <p>{item.desc}</p>}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mega-cta">
          <div>
            <span className="mc-eyebrow">{cta.eyebrow}</span>
            <p>{cta.title}</p>
          </div>
          <Link href={cta.href} onClick={onLinkClick}>
            {cta.label} <ArrowRight width={16} height={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
