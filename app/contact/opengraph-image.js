import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";

export const alt = "Book an appointment at The Blessed Womb, Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage() {
  return renderOgImage({
    title: "Book an Appointment",
    subtitle: "Call +91 88826 63284 or send an enquiry for gynae and pregnancy care.",
  });
}
