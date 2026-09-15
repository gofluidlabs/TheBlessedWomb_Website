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
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, faqSchema } from "@/lib/schema";

const TITLE =
  "Gynaecologist & Obstetrician in Greater Noida | The Blessed Womb";
const DESCRIPTION =
  "The Blessed Womb, led by Dr. Jyoti Gupta, provides antenatal care, pregnancy scans, ultrasound and gynaecological services in Alpha I, Greater Noida.";

export const metadata = buildMetadata({
  path: "/",
  title: TITLE,
  description: DESCRIPTION,
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
