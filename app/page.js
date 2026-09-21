import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Marquee from "@/components/Marquee";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/faqData";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, keywordSet, sup } from "@/lib/seo";
import { webPageSchema, faqSchema } from "@/lib/schema";

// Front-loaded with the highest-intent local query. The brand name stays in
// the title because it is also typed as a search term in its own right, and
// the doctor's name carries in the description rather than pushing the title
// past the ~60 characters Google actually renders.
const TITLE = `${sup("Best Gynaecologist", "Gynaecologist")} in Greater Noida | The Blessed Womb`;
const DESCRIPTION = `The Blessed Womb — ${sup(
  "best gynae & obs clinic",
  "gynae & obs clinic"
)} in Greater Noida. Dr. Jyoti Gupta, Obstetrician & Gynaecologist with 20+ years. Antenatal care, scans & ultrasound.`;

export const metadata = buildMetadata({
  path: "/",
  title: TITLE,
  description: DESCRIPTION,
  // What a person sees when this link lands in their WhatsApp.
  ogTitle: "The Blessed Womb — Dr. Jyoti Gupta",
  ogDescription:
    "Obstetrician & Gynaecologist in Alpha 1, Greater Noida. Antenatal care, pregnancy scans, ultrasound and gynaecological care. 20+ years. Call +91 88826 63284.",
  keywords: keywordSet("brand", "core", "maternity", "ultrasound", "local"),
});

export default function Home() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/", title: TITLE, description: DESCRIPTION })} />
      <JsonLd data={faqSchema(FAQS.map((f) => ({ question: f.q, answer: f.a })))} />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Marquee />
        <Process />
        <Faq />
        <Team />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
