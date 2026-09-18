import BlogHero from "@/components/Blog/BlogHero";
import BlogCard from "@/components/Blog/BlogCard";
import BlogFilters from "@/components/Blog/BlogFilters";
import BlogCTA from "@/components/Blog/BlogCTA";
import Breadcrumbs from "@/components/Blog/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { getAllPosts, getFeaturedPost, CATEGORIES } from "@/lib/blog";

const TITLE = "Women's Health, Pregnancy & Fertility Resources";
const DESCRIPTION =
  "Evidence-informed articles on pregnancy, gynaecology, fertility and women's health from The Blessed Womb, Greater Noida — written and medically overseen by Dr. Jyoti Gupta.";

export const metadata = buildMetadata({
  path: "/blog",
  title: TITLE,
  description: DESCRIPTION,
});

// Keep only the fields the client-side filter component actually needs —
// the full MDX body/FAQ/related data stays server-only.
function toSummary(post) {
  const { content, faq, relatedSlugs, ...summary } = post;
  return summary;
}

export default function BlogIndexPage() {
  const allPosts = getAllPosts();
  const featured = getFeaturedPost();
  const rest = allPosts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <JsonLd data={webPageSchema({ path: "/blog", title: TITLE, description: DESCRIPTION })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Header light />
      <main>
        <BlogHero />

        <section className="section blog-index">
          <div className="container">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />

            {featured && (
              <div className="blog-featured reveal" data-anim="up">
                <div className="blog-featured-head">
                  <span className="eyebrow">Featured Article</span>
                  <h2 className="section-title">Start Here</h2>
                </div>
                <BlogCard post={featured} />
              </div>
            )}

            <div className="blog-latest-head reveal" data-anim="up">
              <h2 className="section-title">Latest Articles</h2>
            </div>

            <BlogFilters posts={rest.map(toSummary)} categories={CATEGORIES} />
          </div>
        </section>

        <BlogCTA />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
