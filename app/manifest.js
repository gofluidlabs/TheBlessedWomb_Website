import { SITE_NAME, CLINIC } from "@/lib/seo";

export default function manifest() {
  return {
    name: `${SITE_NAME} — ${CLINIC.legalName}`,
    short_name: SITE_NAME,
    description:
      "Obstetrics, gynaecology, pregnancy scans and ultrasound in Alpha I, Greater Noida, led by Dr. Jyoti Gupta.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdf4f1",
    theme_color: "#de7a6a",
    lang: "en-IN",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
