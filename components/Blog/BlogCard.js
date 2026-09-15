import Link from "next/link";
import SmartImage from "../SmartImage";
import { ArrowRight } from "../Icons";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-img">
        <SmartImage src={post.featuredImage} alt={post.featuredImageAlt} />
      </Link>
      <div className="blog-card-body">
        <span className="blog-card-category">{post.category}</span>
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <span>{formatDate(post.publishedAt)}</span>
          <span>&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
        <Link href={`/blog/${post.slug}`} className="blog-card-link">
          Read Article <ArrowRight />
        </Link>
      </div>
    </article>
  );
}
