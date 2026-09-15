import Header from "@/components/Header";
import ProcessBanner from "@/components/ProcessBanner";
import ProcessHero from "@/components/ProcessHero";
import ProcessJourney from "@/components/ProcessJourney";
import ProcessJourneyLine from "@/components/ProcessJourneyLine";
import ProcessPathways from "@/components/ProcessPathways";
import ProcessCycleLoop from "@/components/ProcessCycleLoop";
import ProcessCta from "@/components/ProcessCta";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "The Patient Journey — Pregnancy & Gynaecology Care Process";
const DESCRIPTION =
  "From your first consultation to confident next steps — see the patient journey at The Blessed Womb, Dr. Jyoti Maternity, Infertility & Ultrasound Centre, Greater Noida.";

export const metadata = buildMetadata({
  path: "/process",
  title: TITLE,
  description: DESCRIPTION,
});

export default function ProcessPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/process", title: TITLE, description: DESCRIPTION })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Patient Journey", path: "/process" },
        ])}
      />
      <Header light />
      <main>
        <ProcessBanner />
        <ProcessHero />
        <div className="pj-ribbon-span">
          <ProcessJourneyLine />
          <ProcessJourney />
          <ProcessPathways />
        </div>
        <ProcessCycleLoop />
        <ProcessCta />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
