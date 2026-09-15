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
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "About Dr. Jyoti Gupta — Obstetrician & Gynaecologist";
const DESCRIPTION =
  "About The Blessed Womb and Dr. Jyoti Gupta, an experienced Obstetrician & Gynaecologist in Greater Noida with more than 20+ years of experience in women's healthcare, pregnancy and antenatal care.";

export const metadata = buildMetadata({
  path: "/about",
  title: TITLE,
  description: DESCRIPTION,
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
