import { Suspense } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { Fredoka, Mulish } from "next/font/google";
import WelcomeModal from "@/components/WelcomeModal";
import JsonLd from "@/components/JsonLd";
import Analytics from "@/components/Analytics";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
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

const TITLE =
  "The Blessed Womb — Dr. Jyoti Gupta | Maternity, Infertility & Ultrasound Centre";
const DESCRIPTION =
  "The Blessed Womb, under Dr. Jyoti Maternity, Infertility & Ultrasound Centre, offers antenatal care, pregnancy scans, ultrasound and gynaecological services under the supervision of Dr. Jyoti Gupta, an experienced Obstetrician & Gynaecologist in Greater Noida.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: "/website-assets/Process_banner.jpg" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/website-assets/Process_banner.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
