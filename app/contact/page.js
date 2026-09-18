import Header from "@/components/Header";
import ContactBanner from "@/components/ContactBanner";
import ContactContent from "@/components/ContactContent";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

const TITLE = "Contact & Book an Appointment";
const DESCRIPTION =
  "Get in touch with The Blessed Womb, Dr. Jyoti Maternity, Infertility & Ultrasound Centre in Block D, Alpha I, Greater Noida. Call +91 88826 63284 or book a consultation.";

export const metadata = buildMetadata({
  path: "/contact",
  title: TITLE,
  description: DESCRIPTION,
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/contact", title: TITLE, description: DESCRIPTION })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <Header light />
      <main>
        <ContactBanner />
        <ContactContent />
      </main>
      <Footer />
      <BackToTop />
      <Animations />
    </>
  );
}
