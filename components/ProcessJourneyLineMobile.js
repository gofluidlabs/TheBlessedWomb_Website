"use client";

import { useEffect, useRef } from "react";

export default function ProcessJourneyLineMobile() {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const stack = document.querySelector(".pj-stack");
    if (!stack) return;

    function build() {
      if (!mq.matches) {
        pathRef.current.setAttribute("d", "");
        return;
      }

      const stackRect = stack.getBoundingClientRect();
      const visuals = [...stack.querySelectorAll(".pj-visual")];
      if (!visuals.length || !stackRect.height) return;

      const points = visuals.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - stackRect.left,
          y: r.top + r.height / 2 - stackRect.top,
        };
      });

      svgRef.current.setAttribute(
        "viewBox",
        `0 0 ${stackRect.width} ${stackRect.height}`
      );
      svgRef.current.style.height = `${stackRect.height}px`;

      let d = `M ${points[0].x} 0 L ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
      const last = points[points.length - 1];
      d += ` L ${last.x} ${stackRect.height}`;

      pathRef.current.setAttribute("d", d);
    }

    build();

    const ro = new ResizeObserver(build);
    ro.observe(stack);

    mq.addEventListener("change", build);
    window.addEventListener("orientationchange", build);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", build);
      window.removeEventListener("orientationchange", build);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pj-line-mobile-svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="var(--coral)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
