import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "Pregnancy, fertility and women's health guides";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Pregnancy & Women's Health Guides",
    subtitle: "Evidence-informed articles, medically reviewed by Dr. Jyoti Gupta.",
  });
}
