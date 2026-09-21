import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

/**
 * Priorities reflect how much each page matters commercially, not how
 * often it changes: the home page and the two pages a patient converts on
 * (/clinic for directions, /contact for booking) sit at the top.
 */
const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/clinic", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/process", priority: 0.7, changeFrequency: "monthly" },
];

// Note: /privacy-policy and /terms are deliberately absent. Both are
// currently `robots: { index: false }` pending legal review, and listing a
// noindexed URL in the sitemap is a contradiction Search Console reports
// as an error.

export default function sitemap() {
  const lastModified = new Date();
  const staticEntries = routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
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

  return [...staticEntries, ...postEntries];
}
