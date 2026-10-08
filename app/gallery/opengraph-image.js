import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "Photos from The Blessed Womb clinic in Alpha 1, Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Inside The Blessed Womb",
    subtitle: "Our clinic, Dr. Jyoti Gupta and the families we care for.",
  });
}
