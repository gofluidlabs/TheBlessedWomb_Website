"use client";

import { useRef, useState } from "react";
import SmartImage from "./SmartImage";

/**
 * Stacked/overlapping "coverflow" carousel used for the mobile (≤620px)
 * layout of both the Team and Gallery sections: one card front-and-center,
 * its neighbours peeking from behind, swipe or tap to change, dots below.
 * The tc-* styles live in globals.css inside the ≤620px media block; the
 * wrapper class passed in decides when the whole component is shown.
 *
 * items: [{ id, src, alt, title, subtitle, focus? }]
 */
export default function Coverflow({ items, className = "", dataAnim }) {
  const wrap = items.length;
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) {
      setActive((i) => (i - 1 + wrap) % wrap);
    } else if (delta < -threshold) {
      setActive((i) => (i + 1) % wrap);
    }
    touchStartX.current = null;
  }

  function slotClass(i) {
    let diff = i - active;
    if (diff > wrap / 2) diff -= wrap;
    if (diff < -wrap / 2) diff += wrap;
    if (diff === 0) return "tc-active";
    if (diff === -1) return "tc-prev";
    if (diff === 1) return "tc-next";
    return "tc-hidden";
  }

  return (
    <div className={className} data-anim={dataAnim}>
      <div
        className="tc-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((m, i) => (
          <div
            key={m.id}
            className={`tc-card ${slotClass(i)}`}
            role="button"
            tabIndex={0}
            aria-label={`Show ${m.title}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(i);
              }
            }}
          >
            <SmartImage
              src={m.src}
              alt={m.alt ?? m.title}
              className={`tc-photo ${m.fit === "contain" ? "is-contain" : ""}`}
              sizes="(max-width: 620px) 60vw, 190px"
              style={m.focus ? { "--focus": m.focus } : undefined}
            />
            <div className="tc-caption">
              <h4>{m.title}</h4>
              <span>{m.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tc-dots">
        {items.map((m, i) => (
          <button
            key={m.id}
            type="button"
            className={`tc-dot ${i === active ? "active" : ""}`}
            aria-label={`Show ${m.title}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
