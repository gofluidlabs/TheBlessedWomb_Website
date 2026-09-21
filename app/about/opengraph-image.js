import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "Dr. Jyoti Gupta — Obstetrician & Gynaecologist, Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Dr. Jyoti Gupta",
    subtitle: "MBBS, Dip. GO, PGDUS — 20+ years in pregnancy care and gynaecology.",
  });
}
