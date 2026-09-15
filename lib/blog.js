import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const CATEGORIES = [
  "Pregnancy & Antenatal Care",
  "Gynaecology",
  "Fertility & Reproductive Health",
  "Women's Health",
  "Preventive Care",
];

function readSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readPost(slug) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return {
    slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    featuredImage: data.featuredImage,
    featuredImageAlt: data.featuredImageAlt || data.title,
    author: data.author || "Dr. Jyoti Gupta",
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt || data.publishedAt,
    readingTime,
    seoTitle: data.seoTitle || data.title,
    seoDescription: data.seoDescription || data.excerpt,
    keywords: data.keywords || [],
    faq: data.faq || [],
    relatedSlugs: data.relatedSlugs || [],
    featured: !!data.featured,
    content,
  };
}

export function getAllPosts() {
  return readSlugs()
    .map(readPost)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getPostBySlug(slug) {
  const slugs = readSlugs();
  if (!slugs.includes(slug)) return null;
  return readPost(slug);
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPost() {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) || posts[0] || null;
}

export function getRelatedPosts(post) {
  const all = getAllPosts();
  return post.relatedSlugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter(Boolean);
}
