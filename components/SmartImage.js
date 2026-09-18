"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Lazy-loading image with a graceful brand-gradient fallback.
 * The gradient shows immediately; the photo fades in on load (GSAP-friendly),
 * and if the image fails it simply stays as the on-brand gradient.
 *
 * Wraps next/image in `fill` mode so it can drop into the existing
 * position:relative `.smart-img` container (sized by CSS per call site)
 * without every caller needing to know pixel dimensions, while still
 * getting automatic AVIF/WebP negotiation, responsive srcset and
 * built-in lazy loading.
 */
export default function SmartImage({
  src,
  alt = "",
  className = "",
  style,
  rounded,
  priority = false,
  sizes = "100vw",
  unoptimized = false,
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`smart-img ${className}`}
      style={{ borderRadius: rounded, ...style }}
    >
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          unoptimized={unoptimized}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
