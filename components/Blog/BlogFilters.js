"use client";

import { useMemo, useState } from "react";
import BlogGrid from "./BlogGrid";
import { Search } from "../Icons";

export default function BlogFilters({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = `${post.title} ${post.excerpt} ${(post.keywords || []).join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, activeCategory, query]);

  return (
    <>
      <div className="blog-filters">
        <div className="blog-filter-pills">
          <button
            type="button"
            className={`blog-pill ${activeCategory === "All" ? "active" : ""}`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`blog-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <label className="blog-search">
          <Search />
          <input
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search articles"
          />
        </label>
      </div>

      <BlogGrid posts={filtered} />
    </>
  );
}
