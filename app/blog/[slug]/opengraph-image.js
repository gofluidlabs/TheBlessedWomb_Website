import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/ogImage";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const alt = "The Blessed Womb — Dr. Jyoti Gupta, Greater Noida";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Prerender one card per article at build time, matching the page itself.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/**
 * Per-article share card: the post's own photo as the background, the post
 * title as the headline, and the clinic branding around it.
 *
 * The alternative — pointing og:image straight at the article's featured
 * image — is what this replaces. That worked for the wide photos but broke
 * for the two articles illustrated with 312x327 images: WhatsApp renders
 * anything near-square as a small thumbnail, so those links shared without
 * a banner and without any branding. Generating the card makes every
 * article share at a consistent 1200x630 with the clinic's name on it.
 */
export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgImage({
    title: post?.title ?? "Health Resources",
    subtitle: post?.category ?? "Pregnancy, gynaecology and women's health",
    photo: post?.featuredImage,
  });
}
