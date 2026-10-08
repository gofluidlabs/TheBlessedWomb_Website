import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { SERVICES } from "@/lib/services";
import { getGalleryImages } from "@/lib/gallery";

/**
 * Priorities reflect how much each page matters commercially, not how
 * often it changes: the home page, the services hub and the two pages a
 * patient converts on (/clinic for directions, /contact for booking) sit
 * at the top.
 *
 * `lastModified` is a REAL date per page, edited by hand when that page's
 * content genuinely changes. It used to be `new Date()` for every route,
 * which stamps every URL with "now" on every build — Google learns to
 * ignore a lastmod that is never truthful. Update the date below when you
 * change a page, not otherwise.
 */
const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", lastModified: "2026-10-08" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-10-08" },
  { path: "/clinic", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-10-08" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly", lastModified: "2026-09-21" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly", lastModified: "2026-10-08" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly", lastModified: "2026-10-08" },
  { path: "/process", priority: 0.7, changeFrequency: "monthly", lastModified: "2026-09-21" },
  { path: "/gallery", priority: 0.6, changeFrequency: "monthly", lastModified: "2026-10-08" },
];

// Note: /privacy-policy and /terms are deliberately absent. Both are
// currently `robots: { index: false }` pending legal review, and listing a
// noindexed URL in the sitemap is a contradiction Search Console reports
// as an error.

export default function sitemap() {
  // Every photo in the gallery folder is declared on the /gallery entry, so
  // Google Images can discover them. Read from the folder, like the page
  // itself, so a new photo is listed automatically.
  const galleryImages = getGalleryImages().map((g) => `${SITE_URL}${g.src}`);

  const staticEntries = routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images:
      route.path === "/gallery" && galleryImages.length
        ? galleryImages
        : undefined,
  }));

  const serviceEntries = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(s.updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
    images: s.image ? [`${SITE_URL}${s.image}`] : undefined,
  }));

  const posts = getAllPosts();
  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
    // Declaring the featured image here is what gets articles into Google
    // Images, which is a meaningful traffic source for health explainers.
    images: post.featuredImage ? [`${SITE_URL}${post.featuredImage}`] : undefined,
  }));

  return [...staticEntries, ...serviceEntries, ...postEntries];
}
