import BlogCard from "./BlogCard";

export default function BlogGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="blog-empty">No articles found. Try a different search or category.</p>;
  }
  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
