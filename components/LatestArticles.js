import Link from "next/link";
import BlogCard from "./Blog/BlogCard";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight } from "./Icons";

// Home-page strip of the newest articles. It exists for internal linking:
// without it the only path from the home page to any article was via /blog,
// so every post sat two clicks deep with a single inbound link.
export default function LatestArticles({ count = 3 }) {
  const posts = getAllPosts().slice(0, count);
  if (posts.length === 0) return null;
  return (
    <section className="section latest-articles">
      <div className="container">
        <div className="reveal" data-anim="up" style={{ textAlign: "center" }}>
          <span className="eyebrow">Health Resources</span>
          <h2 className="section-title">
            Latest from <span className="accent">our doctor</span>
          </h2>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <p className="svc-all-link">
          <Link href="/blog">
            See all articles <ArrowRight />
          </Link>
        </p>
      </div>
    </section>
  );
}
