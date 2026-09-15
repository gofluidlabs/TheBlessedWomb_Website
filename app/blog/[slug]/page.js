import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import Breadcrumbs from "@/components/Blog/Breadcrumbs";
import ArticleHeader from "@/components/Blog/ArticleHeader";
import ArticleAuthor from "@/components/Blog/ArticleAuthor";
import ArticleFAQ from "@/components/Blog/ArticleFAQ";
import RelatedArticles from "@/components/Blog/RelatedArticles";
import BlogCTA from "@/components/Blog/BlogCTA";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    path: `/blog/${post.slug}`,
    title: post.seoTitle,
    description: post.seoDescription,
    ogImage: post.featuredImage,
  });
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={articleSchema({
          path: `/blog/${post.slug}`,
          title: post.title,
          description: post.excerpt,
          image: post.featuredImage,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {post.faq?.length > 0 && (
        <JsonLd
          data={faqSchema(post.faq.map((f) => ({ question: f.q, answer: f.a })))}
        />
      )}
      <Header light />
      <main>
        <section className="section article-section">
          <div className="container article-container">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog" },
                { name: post.category, href: "/blog" },
                { name: post.title },
              ]}
            />
            <ArticleHeader post={post} />

            <div className="article-prose">
              <MDXRemote source={post.content} />
            </div>

            <ArticleFAQ faq={post.faq} />
            <ArticleAuthor />
            <p className="article-disclaimer">
              Medical information on this page is for educational purposes
              and should not replace individual medical consultation.
            </p>
            <RelatedArticles posts={related} />
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
