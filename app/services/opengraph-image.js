import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "The Blessed Womb services — antenatal care, scans and gynaecology in Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Our Services",
    subtitle: "Antenatal care, scans, Doppler, gynaecology and infertility care in Greater Noida.",
  });
}
