import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import AboutBrand from "@/components/AboutBrand";
import AboutDoctor from "@/components/AboutDoctor";
import AboutPhilosophy from "@/components/AboutPhilosophy";
import AboutWhy from "@/components/AboutWhy";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, keywordSet } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

// This is the page that should rank for the doctor's own name, so the title
// leads with it — the brand is appended by the template in app/layout.js.
const TITLE = "Dr. Jyoti Gupta — Obstetrician & Gynaecologist";
const DESCRIPTION =
  "Meet Dr. Jyoti Gupta (MBBS, Dip. GO, PGDUS), Obstetrician & Gynaecologist in Greater Noida with 20+ years in pregnancy care, gynaecology and ultrasound.";

export const metadata = buildMetadata({
  path: "/about",
  title: TITLE,
  description: DESCRIPTION,
  keywords: keywordSet("brand", "core", "maternity"),
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/about", title: TITLE, description: DESCRIPTION })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Header light />
      <main>
        <PageIntro
          eyebrow="About Us"
          title="About The Blessed Womb"
          subtitle="Complete Care of Motherhood — under Dr. Jyoti Maternity, Infertility & Ultrasound Centre."
          crumb="About"
        />
        <AboutBrand />
        <AboutDoctor />
        <AboutPhilosophy />
        <AboutWhy />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
