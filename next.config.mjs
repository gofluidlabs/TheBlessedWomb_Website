/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't advertise the framework in a response header — it's a free hint
  // to anyone scanning for version-specific issues and buys nothing.
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    qualities: [75, 90],
    // AVIF first, WebP second, original as the last resort. AVIF is
    // typically 20-30% smaller than WebP at the same visual quality, and
    // the photo-heavy hero/service sections are the largest part of this
    // site's page weight.
    formats: ["image/avif", "image/webp"],
    // Cache optimized derivatives for a year. The source files are static
    // and versioned by deploy, so re-optimizing them on every cold cache
    // is pure waste.
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        // Static brand/photo assets are immutable for a given deploy, so
        // they can be cached hard. This is the single biggest repeat-visit
        // speed win on an image-heavy site.
        source: "/website-assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  /**
   * Canonical-URL cleanup. Every one of these is a plausible path a
   * patient, a directory listing, a printed card or an old link could
   * send someone to. Without these they hit the 404 page; with them the
   * link equity and the visitor both land on the real page.
   *
   * All permanent (308) because these mappings are not going to change —
   * that tells Google to transfer ranking signals to the target and to
   * stop re-crawling the old path.
   */
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/doctor", destination: "/about", permanent: true },
      { source: "/dr-jyoti-gupta", destination: "/about", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/appointment", destination: "/contact", permanent: true },
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/book-appointment", destination: "/contact", permanent: true },
      { source: "/location", destination: "/clinic", permanent: true },
      { source: "/address", destination: "/clinic", permanent: true },
      { source: "/directions", destination: "/clinic", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/news", destination: "/blog", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/treatments", destination: "/#services", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/faqs", destination: "/#faq", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-conditions", destination: "/terms", permanent: true },
    ];
  },
};

export default nextConfig;
