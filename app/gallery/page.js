import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import SmartImage from "@/components/SmartImage";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { getGalleryImages } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "Gallery — Inside The Blessed Womb, Greater Noida";
const DESCRIPTION =
  "Photos from The Blessed Womb in Alpha I, Greater Noida: our clinic, Dr. Jyoti Gupta and the families we are privileged to care for.";

export const metadata = buildMetadata({
  path: "/gallery",
  title: TITLE,
  description: DESCRIPTION,
});

export default function GalleryPage() {
  const items = getGalleryImages();
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/gallery", title: TITLE, description: DESCRIPTION })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <Header light />
      <main>
        <PageIntro
          eyebrow="Our Gallery"
          title="Inside The Blessed Womb"
          subtitle="Moments from our clinic — the care, the families and the little ones we’re privileged to be part of."
          crumb="Gallery"
        />
        <section className="section gallery-page">
          <div className="container">
            {items.length === 0 && (
              <p className="about-desc" style={{ textAlign: "center" }}>
                Photos are on their way — please check back soon.
              </p>
            )}
            <div className="gallery-grid" data-stagger>
              {items.map((g, i) => (
                <figure
                  key={g.id}
                  className="gallery-grid-item"
                  style={{ aspectRatio: `${g.width} / ${g.height}` }}
                >
                  <SmartImage
                    src={g.src}
                    alt={g.alt}
                    className="gallery-photo"
                    sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 400px"
                    priority={i < 2}
                    style={{ "--focus": g.focus }}
                  />
                  <figcaption className="gallery-caption">
                    <h4>{g.title}</h4>
                    <span>{g.subtitle}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
