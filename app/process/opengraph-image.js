import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "The patient journey at The Blessed Womb, Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Your Patient Journey",
    subtitle: "From first consultation through antenatal visits, scans and next steps.",
  });
}
