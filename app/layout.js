import { Suspense } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Fredoka, Mulish } from "next/font/google";
import WelcomeModal from "@/components/WelcomeModal";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { SITE_URL, SITE_NAME, keywordSet, sup } from "@/lib/seo";
import { organizationGraph } from "@/lib/schema";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

const TITLE = `${sup("Best Gynaecologist", "Gynaecologist")} in Greater Noida | The Blessed Womb`;
const DESCRIPTION = `The Blessed Womb — ${sup(
  "best gynae & obs clinic",
  "gynae & obs clinic"
)} in Greater Noida. Dr. Jyoti Gupta, Obstetrician & Gynaecologist with 20+ years. Antenatal care, scans & ultrasound.`;

const SOCIAL_TITLE = "The Blessed Womb — Dr. Jyoti Gupta";
const SOCIAL_DESCRIPTION =
  "Obstetrician & Gynaecologist in Alpha 1, Greater Noida. Antenatal care, pregnancy scans, ultrasound and gynaecological care. 20+ years. Call +91 88826 63284.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: keywordSet("brand", "core", "local"),
  authors: [{ name: "Dr. Jyoti Gupta", url: `${SITE_URL}/about` }],
  creator: "Dr. Jyoti Gupta",
  publisher: SITE_NAME,
  category: "Health",
  alternates: { canonical: SITE_URL },
  // Icons come from the app/ file conventions (favicon.ico, icon.png,
  // apple-icon.png) so Next emits the right <link> tags automatically and
  // /favicon.ico — the path Google's favicon crawler falls back to — is a
  // real multi-size .ico rather than a redirect.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google use full-length text snippets, large image previews and
      // full video previews. Without this, Google is free to pick shorter
      // snippets and small thumbnails for the result.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Search Console / Bing ownership tokens. Set these in .env once the
  // properties are claimed; Next omits the tags entirely while they're
  // undefined, so an unverified deploy doesn't ship empty meta tags.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  // Social title/description lead with the brand and the doctor rather
  // than the keyword — see the note in lib/seo.js buildMetadata().
  openGraph: {
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
  other: {
    // Explicit geo tags. These are not a Google ranking factor on their
    // own, but Bing and several local-business aggregators still read them
    // when building a directory entry for the clinic.
    "geo.region": "IN-UP",
    "geo.placename": "Greater Noida",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#de7a6a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${mulish.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            {/* @next/third-parties only injects the <script> loader — the
                <noscript> fallback (for users with JS disabled) is not
                automatic and has to be placed right after <body> by hand,
                per Next.js's own GTM documentation. */}
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <JsonLd data={organizationGraph()} />
        {children}
        <WelcomeModal />
      </body>
    </html>
  );
}
