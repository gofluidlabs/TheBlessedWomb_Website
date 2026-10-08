import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import ServicesHub from "@/components/ServicesHub";
import ServiceCTA from "@/components/ServiceCTA";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { HUB_FAQ } from "@/lib/services";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

const TITLE = "Antenatal Care, Scans & Gynaecology in Greater Noida";
const DESCRIPTION =
  "Antenatal care, pregnancy scans, Doppler, gynaecology and infertility care with Dr. Jyoti Gupta at The Blessed Womb, Alpha I, Greater Noida.";

export const metadata = buildMetadata({
  path: "/services",
  title: TITLE,
  description: DESCRIPTION,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/services", title: TITLE, description: DESCRIPTION })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd
        data={faqSchema(HUB_FAQ.map((f) => ({ question: f.q, answer: f.a })))}
      />
      <Header light />
      <main>
        <PageIntro
          eyebrow="Our Services"
          title="Complete care of motherhood"
          subtitle="Antenatal care, scans, Doppler, gynaecological and infertility care in Alpha I, Greater Noida."
          crumb="Services"
        />
        <ServicesHub />
        <ServiceCTA />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
