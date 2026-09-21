import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Blog/Breadcrumbs";
import { CLINIC, SITE_NAME, buildMetadata } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: `How ${SITE_NAME} (${CLINIC.legalName}), Greater Noida, collects and uses information submitted through this website.`,
  }),
  // Kept out of the index until this has had an actual legal review —
  // see the notice at the top of the page itself.
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header light />
      <main>
        <section className="section article-section">
          <div className="container article-container">
            <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />
            <h1 className="section-title">Privacy Policy</h1>
            <p className="article-meta">Last updated: September 2026</p>

            <div className="article-prose">
              <p>
                <strong>
                  This policy describes, in plain language, what {SITE_NAME}{" "}
                  actually collects through this website and how it is used.
                  It has not yet been reviewed by a lawyer and should be
                  treated as a working draft until it has.
                </strong>
              </p>

              <h2>Who This Policy Covers</h2>
              <p>
                This policy applies to {SITE_NAME} ({CLINIC.legalName}),
                located at {CLINIC.fullAddress}, and to this website only. It
                does not cover information collected in person at the clinic
                as part of your medical care, which is governed by standard
                medical record-keeping practice rather than this website
                policy.
              </p>

              <h2>Information We Collect</h2>
              <p>When you use the enquiry form on this website (on the Contact page or the pop-up consultation form), we collect:</p>
              <ul>
                <li>Your name</li>
                <li>Phone number</li>
                <li>Email address (optional)</li>
                <li>Reason for your visit, selected from a short list</li>
                <li>Preferred appointment date (optional)</li>
                <li>Any message you choose to include</li>
              </ul>
              <p>
                If you subscribe to our newsletter via the footer, we collect
                only the email address you provide.
              </p>
              <p>We do not collect payment information through this website.</p>

              <h2>How We Use Your Information</h2>
              <p>
                Information submitted through the enquiry form is used solely
                to respond to your enquiry and to arrange or discuss a
                consultation with {CLINIC.name}. Newsletter email addresses
                are used only to send updates you've asked to receive.
              </p>
              <p>
                Submitting the enquiry form is a request for contact, not a
                confirmed appointment — a member of our team will reach out
                to confirm details.
              </p>

              <h2>Cookies and Tracking</h2>
              <p>
                This website uses Google Tag Manager and Google Analytics
                to understand, in aggregate, how visitors use the site —
                for example, which pages are viewed and which buttons or
                links are clicked. This analysis relies on anonymous,
                non-identifying technical and behavioural data only. We do
                not use this system to collect or store your name, phone
                number, email address, medical information, or any content
                you enter into a form. You can control or block this data
                collection using your browser&rsquo;s cookie settings or a
                browser extension such as Google Analytics Opt-out.
              </p>

              <h2>Sharing Your Information</h2>
              <p>
                We do not sell, rent, or share your information with third
                parties for marketing purposes. Information you submit is
                only seen by {CLINIC.name}'s own staff, for the purpose of
                responding to you.
              </p>

              <h2>How Long We Keep Your Information</h2>
              <p>
                Enquiry details are kept only for as long as needed to
                respond to and follow up on your enquiry. There is currently
                no automated retention or deletion schedule in place; if
                you'd like your information removed sooner, contact us using
                the details below and we will action it directly.
              </p>

              <h2>Your Choices</h2>
              <p>
                You can ask us at any time what information we hold about
                you from this website, ask us to correct it, or ask us to
                delete it, by contacting us using the details below.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                This website is intended for adults seeking information
                about women's health services and is not directed at
                children.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this page as the website or our data practices
                change. Please check back periodically for the latest
                version.
              </p>

              <h2>Contact Us</h2>
              <p>
                For any questions about this policy or your information,
                contact {CLINIC.name} at{" "}
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
