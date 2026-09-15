import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CLINIC } from "@/lib/seo";

export const metadata = {
  title: "Terms & Conditions — The Blessed Womb",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header light />
      <main>
        <section className="section not-found">
          <div className="container not-found-inner">
            <span className="eyebrow">Terms &amp; Conditions</span>
            <h1 className="section-title">This page is being prepared</h1>
            <p className="about-desc">
              Our full terms &amp; conditions are being finalized. For any
              questions in the meantime, please contact us directly at{" "}
              {CLINIC.primaryEmail} or {CLINIC.phone}.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
