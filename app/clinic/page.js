import Header from "@/components/Header";
import PageIntro from "@/components/PageIntro";
import ClinicContent from "@/components/ClinicContent";
import PatientReviews from "@/components/PatientReviews";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "Clinic & Location — Alpha I, Greater Noida";
const DESCRIPTION =
  "Find The Blessed Womb in Block D, Alpha I, Greater Noida, Uttar Pradesh — near St. Joseph School. Address, phone, directions and how to reach us from Alpha 1 Main Market.";

export const metadata = buildMetadata({
  path: "/clinic",
  title: TITLE,
  description: DESCRIPTION,
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
