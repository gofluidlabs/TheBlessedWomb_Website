import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Blog/Breadcrumbs";
import { CLINIC, SITE_NAME, buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    path: "/terms",
    title: "Terms & Conditions",
    description: `Terms of use for the ${SITE_NAME} website — ${CLINIC.legalName}, Alpha 1, Greater Noida.`,
  }),
  // Kept out of the index until this has had an actual legal review —
  // see the notice at the top of the page itself.
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header light />
      <main>
        <section className="section article-section">
          <div className="container article-container">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms & Conditions" }]} />
            <h1 className="section-title">Terms &amp; Conditions</h1>
            <p className="article-meta">Last updated: September 2026</p>

            <div className="article-prose">
              <p>
                <strong>
                  These terms describe, in plain language, how this website
                  may be used. They have not yet been reviewed by a lawyer
                  and should be treated as a working draft until they have.
                </strong>
              </p>

              <h2>About This Website</h2>
              <p>
                This website is operated by {SITE_NAME} ({CLINIC.legalName}),
                {" "}{CLINIC.fullAddress}. By using this website, you agree to
                these terms.
              </p>

              <h2>Purpose of This Website</h2>
              <p>
                This website provides general information about {CLINIC.name}
                , Dr. Jyoti Gupta, and the services offered. Content on this
                site, including the Health Resources / blog section, is for
                general educational purposes and is not a substitute for an
                individual medical consultation, diagnosis, or treatment.
                Always consult Dr. Jyoti Gupta or another qualified doctor
                about your specific situation.
              </p>

              <h2>Medical Emergencies</h2>
              <p>
                This website is not monitored for emergencies. If you are
                experiencing a medical emergency, contact emergency services
                or go to your nearest emergency room immediately — do not
                use the website's contact form.
              </p>

              <h2>Appointment Enquiries</h2>
              <p>
                Submitting the enquiry form on this website is a request for
                contact only. It does not confirm an appointment — a member
                of our team will follow up directly to arrange your
                consultation.
              </p>

              <h2>Intellectual Property</h2>
              <p>
                The text, images, and design of this website belong to{" "}
                {CLINIC.name} unless otherwise stated, and may not be
                reproduced without permission.
              </p>

              <h2>External Links</h2>
              <p>
                This website may link to external sites (such as Google Maps
                or our social media profiles). We are not responsible for
                the content or privacy practices of those external sites.
              </p>

              <h2>No Guarantee of Outcomes</h2>
              <p>
                Descriptions of services on this website are general in
                nature. They do not guarantee any specific medical outcome,
                and individual results and treatment plans vary based on
                your own consultation with Dr. Jyoti Gupta.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                {CLINIC.name} provides this website on an "as is" basis and
                is not liable for any indirect loss arising from your use of
                it, to the extent permitted by applicable law. This section
                is intentionally general and should be finalized with legal
                counsel.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms are intended to be governed by the laws of
                India. This should be confirmed as part of a full legal
                review.
              </p>

              <h2>Changes to These Terms</h2>
              <p>
                We may update these terms from time to time. Please check
                back periodically for the latest version.
              </p>

              <h2>Contact Us</h2>
              <p>
                For any questions about these terms, contact {CLINIC.name} at{" "}
                <a href={`mailto:${CLINIC.primaryEmail}`}>{CLINIC.primaryEmail}</a>{" "}
                or <a href={CLINIC.phoneHref}>{CLINIC.phone}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
