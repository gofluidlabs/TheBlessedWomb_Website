import SmartImage from "../SmartImage";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ArticleHeader({ post }) {
  return (
    <header className="article-header">
      <span className="blog-card-category">{post.category}</span>
      <h1 className="section-title">{post.title}</h1>
      <div className="article-meta">
        <span>By {post.author}</span>
        <span>&middot;</span>
        <span>{formatDate(post.publishedAt)}</span>
        <span>&middot;</span>
        <span>{post.readingTime} min read</span>
      </div>
      <div className="article-hero-img">
        <SmartImage src={post.featuredImage} alt={post.featuredImageAlt} priority />
      </div>
    </header>
  );
}
