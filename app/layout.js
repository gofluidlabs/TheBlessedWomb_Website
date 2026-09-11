import { Fredoka, Mulish } from "next/font/google";
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

export const metadata = {
  title: "Fertiora — IVF & Fertility Center",
  description:
    "Fertiora is dedicated to helping individuals and couples achieve their dream of parenthood through advanced fertility and IVF treatments.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fredoka.variable} ${mulish.variable}`}>
      <body>{children}</body>
    </html>
  );
}
