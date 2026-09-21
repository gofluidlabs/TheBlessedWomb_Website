import Header from "@/components/Header";
import ContactBanner from "@/components/ContactBanner";
import ContactContent from "@/components/ContactContent";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Animations from "@/components/Animations";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, keywordSet } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";

// Booking-intent page: the title carries the action plus the locality so it
// can pick up "book gynaecologist appointment Greater Noida" style queries.
const TITLE = "Book Appointment — Gynaecologist in Greater Noida";
const DESCRIPTION =
  "Book an appointment with Dr. Jyoti Gupta at The Blessed Womb, Alpha 1, Greater Noida. Call +91 88826 63284 or send an enquiry for gynae and pregnancy care.";

export const metadata = buildMetadata({
  path: "/contact",
  title: TITLE,
  description: DESCRIPTION,
  keywords: keywordSet("core", "local", "brand"),
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
