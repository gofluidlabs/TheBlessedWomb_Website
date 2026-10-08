import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";
import { SERVICES, getServiceBySlug } from "@/lib/services";

export const alt = "The Blessed Womb — Dr. Jyoti Gupta, Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// One branded 1200x630 share card per service, prerendered at build time.
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  return renderOgImage({
    title: service?.name ?? "Our Services",
    subtitle: service?.cardSummary ?? "Antenatal care, scans and gynaecology in Greater Noida",
    photo: service?.image,
  });
}
