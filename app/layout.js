import { Fredoka, Mulish } from "next/font/google";
import WelcomeModal from "@/components/WelcomeModal";
import JsonLd from "@/components/JsonLd";
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
    images: [{ url: "/website-assets/Process_banner.png" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/website-assets/Process_banner.png"],
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
        <JsonLd data={organizationGraph()} />
        {children}
        <WelcomeModal />
      </body>
    </html>
  );
}
