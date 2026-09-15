"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CURVE_D =
  "M75,0 C75,50 25,50 25,100 C25,150 75,150 75,200 " +
  "C75,250 25,250 25,300 C25,350 75,350 75,400 " +
  "C75,450 25,450 25,500 C25,550 75,550 75,600 " +
  "C75,650 25,650 25,700 C25,750 75,750 75,800";

export default function ProcessJourneyLine() {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 961px)").matches) return;

    const wrap = wrapRef.current;
    const span = wrap.parentElement;

    function positionRibbon() {
      const startEl = document.getElementById("journey-ribbon-start");
      const endEl = document.getElementById("pathways-ribbon-end");
      if (!startEl || !endEl) return;

      const spanRect = span.getBoundingClientRect();
      const startRect = startEl.getBoundingClientRect();
      const endRect = endEl.getBoundingClientRect();

      const top = startRect.top - spanRect.top;
      const height = Math.max(endRect.top - startRect.top, 0);

      wrap.style.top = `${top}px`;
      wrap.style.height = `${height}px`;
    }

    positionRibbon();

    gsap.registerPlugin(ScrollTrigger);
    const path = pathRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const len = path.getTotalLength();

    if (reduceMotion) {
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 });
      return;
    }

    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top 75%",
        end: "bottom 65%",
        scrub: 0.6,
      },
    });

    let resizeTimer;
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        positionRibbon();
        ScrollTrigger.refresh();
      }, 150);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} className="pj-line" aria-hidden="true">
      <svg viewBox="0 0 100 800" preserveAspectRatio="none">
        <path
          ref={pathRef}
          d={CURVE_D}
          fill="none"
          stroke="var(--coral)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
