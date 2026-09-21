import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "The Blessed Womb — Gynaecologist & Obstetrician in Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    // The brand name is already in the lockup at the top of the card, so
    // the headline carries the doctor — together they read
    // "The Blessed Womb / Dr. Jyoti Gupta" at a glance in a chat.
    title: "Dr. Jyoti Gupta",
    subtitle:
      "Obstetrician & Gynaecologist · Antenatal care, pregnancy scans and ultrasound in Alpha 1, Greater Noida.",
  });
}
