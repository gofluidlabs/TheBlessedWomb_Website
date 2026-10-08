"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SmartImage from "./SmartImage";
import Coverflow from "./Coverflow";
import { ArrowRight } from "./Icons";

const AUTOPLAY_MS = 4500;

// Slides visible at once on the desktop/tablet slider. ≤620px swaps the
// slider out for the same stacked coverflow the Team section uses.
function viewsForWidth(w) {
  return w <= 960 ? 2 : 3;
}

// `items` come from getGalleryImages() (lib/gallery.js), which reads the
// gallerysection folder on the server — this component never assumes a
// particular number of photos.
export default function GallerySection({ items = [] }) {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const count = items.length;
  const maxIndex = Math.max(0, count - perView);
  const safeIndex = Math.min(index, maxIndex);

  useEffect(() => {
    const update = () => setPerView(viewsForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setIndex((i) => (Math.min(i, maxIndex) >= maxIndex ? 0 : i + 1));
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const go = (i) => setIndex(Math.max(0, Math.min(i, maxIndex)));

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 40) go(safeIndex - 1);
    else if (delta < -40) go(safeIndex + 1);
    touchStartX.current = null;
  }

  if (count === 0) return null;

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <div className="gallery-head">
          <div className="reveal" data-anim="left">
            <span className="eyebrow">Our Gallery</span>
            <h2 className="section-title">
              A glimpse inside
              <br />
              <span className="accent">The Blessed Womb</span>
            </h2>
          </div>
          <div className="gallery-head-side reveal" data-anim="right">
            <p className="gh-note">
              Moments from our clinic — the care, the families and the
              little ones we&rsquo;re privileged to be part of.
            </p>
            <div className="gallery-arrows">
              <button
                type="button"
                className="gallery-arrow prev"
                aria-label="Previous photos"
                disabled={safeIndex === 0}
                onClick={() => go(safeIndex - 1)}
              >
                <ArrowRight />
              </button>
              <button
                type="button"
                className="gallery-arrow"
                aria-label="Next photos"
                disabled={safeIndex === maxIndex}
                onClick={() => go(safeIndex + 1)}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div
          className="gallery-slider reveal"
          data-anim="up"
          role="region"
          aria-roledescription="carousel"
          aria-label="Clinic photo gallery"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="gallery-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="gallery-track"
              style={{ "--pv": perView, "--idx": safeIndex }}
            >
              {items.map((g, i) => {
                const visible = i >= safeIndex && i < safeIndex + perView;
                return (
                  <figure
                    key={g.id}
                    className="gallery-slide"
                    aria-hidden={!visible}
                  >
                    <SmartImage
                      src={g.src}
                      alt={g.alt}
                      className={`gallery-photo ${g.fit === "contain" ? "is-contain" : ""}`}
                      sizes="(max-width: 960px) 50vw, 400px"
                      style={{ "--focus": g.focus }}
                    />
                    <figcaption className="gallery-caption">
                      <h4>{g.title}</h4>
                      <span>{g.subtitle}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="gallery-dots">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`tc-dot ${i === safeIndex ? "active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === safeIndex}
                onClick={() => go(i)}
              />
            ))}
          </div>
        </div>

        <Coverflow
          className="gallery-coverflow reveal"
          dataAnim="up"
          items={items.map((g) => ({
            id: g.id,
            src: g.src,
            alt: g.alt,
            title: g.title,
            subtitle: g.subtitle,
            focus: g.focus,
            fit: g.fit,
          }))}
        />

        <div className="gallery-foot reveal" data-anim="up">
          <Link href="/gallery" className="btn">
            View Full Gallery
            <span className="btn-ico">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
