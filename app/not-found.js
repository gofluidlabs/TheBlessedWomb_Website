import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "@/components/Icons";

export const metadata = {
  title: "Page Not Found — The Blessed Womb",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header light />
      <main>
        <section className="section not-found">
          <div className="container not-found-inner">
            <span className="eyebrow">404</span>
            <h1 className="section-title">
              We couldn&rsquo;t find that <span className="accent">page</span>
            </h1>
            <p className="about-desc">
              The page you&rsquo;re looking for may have moved or no longer
              exists. Let&rsquo;s get you back to The Blessed Womb.
            </p>
            <div className="not-found-actions">
              <Link href="/" className="btn">
                Back to Home
                <span className="btn-ico">
                  <ArrowUpRight />
                </span>
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Us
                <span className="btn-ico">
                  <ArrowUpRight />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
