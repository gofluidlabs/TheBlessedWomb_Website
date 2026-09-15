import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CLINIC } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy — The Blessed Womb",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header light />
      <main>
        <section className="section not-found">
          <div className="container not-found-inner">
            <span className="eyebrow">Privacy Policy</span>
            <h1 className="section-title">This page is being prepared</h1>
            <p className="about-desc">
              Our full privacy policy is being finalized. If you have any
              questions about how your information is handled, please
              contact us directly at {CLINIC.primaryEmail} or{" "}
              {CLINIC.phone}.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
