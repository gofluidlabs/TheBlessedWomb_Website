import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "The Blessed Womb clinic in Alpha 1, Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Gynae & Obs Clinic, Alpha 1",
    subtitle: "Block D, Alpha 1, Greater Noida — behind St. Joseph School.",
  });
}
