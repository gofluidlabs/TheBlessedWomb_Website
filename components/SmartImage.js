"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lazy-loading image with a graceful brand-gradient fallback.
 * The gradient shows immediately; the photo fades in on load (GSAP-friendly),
 * and if the remote image fails it simply stays as the on-brand gradient.
 *
 * Note: we also check `complete` on mount because a server-rendered <img>
 * can finish loading before React attaches the onLoad handler (common with
 * fast local assets) — without this the fade-in would never trigger.
 */
export default function SmartImage({
  src,
  alt = "",
  className = "",
  style,
  rounded,
  priority = false,
}) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) {
      img.classList.add("loaded");
    }
  }, [src]);

  return (
    <div
      className={`smart-img ${className}`}
      style={{ borderRadius: rounded, ...style }}
    >
      {!failed && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
        />
      )}
    </div>
  );
}
