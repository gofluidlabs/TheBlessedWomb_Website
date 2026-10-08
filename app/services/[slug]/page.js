import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/SmartImage";
import Breadcrumbs from "@/components/Blog/Breadcrumbs";
import ArticleFAQ from "@/components/Blog/ArticleFAQ";
import ArticleAuthor from "@/components/Blog/ArticleAuthor";
import RelatedArticles from "@/components/Blog/RelatedArticles";
import ServiceCard from "@/components/ServiceCard";
import ServiceCTA from "@/components/ServiceCTA";
import { buildMetadata, CLINIC } from "@/lib/seo";
import { SERVICES, getServiceBySlug, PCPNDT_NOTICE } from "@/lib/services";
import { getPostBySlug } from "@/lib/blog";
import { webPageSchema, serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return buildMetadata({
    path: `/services/${service.slug}`,
    title: service.seoTitle,
    description: service.seoDescription,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const related = service.relatedServices
    .map(getServiceBySlug)
    .filter(Boolean);
  const posts = service.relatedPosts.map(getPostBySlug).filter(Boolean);

  return (
    <>
      <JsonLd
        data={webPageSchema({
          path,
          title: service.seoTitle,
          description: service.seoDescription,
        })}
      />
      <JsonLd
        data={serviceSchema({
          path,
          name: service.name,
          description: service.seoDescription,
          image: service.image,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path },
        ])}
      />
      <JsonLd
        data={faqSchema(service.faq.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <Header light />
      <main>
        <section className="section article-section">
          <div className="container article-container">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: service.name },
              ]}
            />
            <header className="article-header">
              <span className="blog-card-category">Our Services</span>
              <h1 className="section-title">{service.title}</h1>
              <div className="article-hero-img">
                <SmartImage src={service.image} alt={service.imageAlt} priority sizes="(max-width: 860px) 100vw, 820px" />
              </div>
            </header>

            <div className="article-prose">
              <p className="svc-lead">{service.answer}</p>
              {service.sections.map((sec) => (
                <section key={sec.heading}>
                  <h2>{sec.heading}</h2>
                  {sec.body && <p>{sec.body}</p>}
                  {sec.list && (
                    <ul>
                      {sec.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {sec.links && (
                    <p>
                      Read more:{" "}
                      {sec.links.map((l, i) => (
                        <span key={l.slug}>
                          {i > 0 && " · "}
                          <Link href={`/services/${l.slug}`}>{l.label}</Link>
                        </span>
                      ))}
                    </p>
                  )}
                </section>
              ))}

              <section>
                <h2>Your first visit</h2>
                <p>
                  Please bring any previous reports and scans, a list of your
                  current medicines and any questions you would like to ask.
                  You can book by calling {CLINIC.phone} or through our{" "}
                  <Link href="/contact">contact page</Link>, and find
                  directions on the <Link href="/clinic">clinic page</Link>.
                </p>
              </section>
            </div>

            {service.pcpndt && (
              <p className="svc-pcpndt" role="note">
                <strong>PCPNDT notice:</strong> {PCPNDT_NOTICE}
              </p>
            )}

            <ArticleFAQ faq={service.faq} />
            <ArticleAuthor />
            <p className="article-disclaimer">
              Information on this page is for general education and does not
              replace an individual medical consultation. Scan and test
              timings are general guidance; your plan is decided by your
              doctor.
            </p>

            {related.length > 0 && (
              <div className="related-articles">
                <h2 className="section-title">Related Services</h2>
                <div className="svc-hub-grid svc-hub-grid--2">
                  {related.map((s) => (
                    <ServiceCard key={s.slug} service={s} />
                  ))}
                </div>
                <p className="svc-all-link">
                  <Link href="/services">View all services</Link>
                </p>
              </div>
            )}
            <RelatedArticles posts={posts} />
          </div>
        </section>
        <ServiceCTA heading={`Book your ${service.name.toLowerCase()} consultation`} />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
