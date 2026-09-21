import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import ClinicContent from "@/components/ClinicContent";
import PatientReviews from "@/components/PatientReviews";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, keywordSet, sup } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

// The "near me" / directions page. It targets the locality terms rather
// than the doctor's name, because that is what people search once they
// already intend to visit.
const TITLE = `${sup("Best Gynae", "Gynae")} & Obs Clinic in Alpha 1, Greater Noida`;
const DESCRIPTION =
  "Visit The Blessed Womb gynae & obs clinic at Block D, Alpha 1, Greater Noida — behind St. Joseph School. Address, directions and phone +91 88826 63284.";

export const metadata = buildMetadata({
  path: "/clinic",
  title: TITLE,
  description: DESCRIPTION,
  keywords: keywordSet("local", "core", "brand"),
});

export default function ClinicPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/clinic", title: TITLE, description: DESCRIPTION })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clinic & Location", path: "/clinic" },
        ])}
      />
      <Header light />
      <main>
        <PageIntro
          eyebrow="Clinic & Location"
          title="Find The Blessed Womb"
          subtitle="In Block D, Alpha I, Greater Noida — near St. Joseph School."
          crumb="Clinic"
        />
        <ClinicContent />
        <PatientReviews />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
