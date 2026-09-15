import BlogCard from "./BlogCard";

export default function RelatedArticles({ posts }) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="related-articles">
      <h2 className="section-title">Related Articles</h2>
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
