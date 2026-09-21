import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ImageResponse } from "next/og";
import { CLINIC, DOCTOR, SITE_NAME } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };
// JPEG, not PNG. See renderOgImage() below — this is a WhatsApp constraint.
export const OG_CONTENT_TYPE = "image/jpeg";

// Read once per build rather than per image: the same files back every
// card, and re-reading them for each route is pointless I/O.
const cache = {};
function asset(rel, mime) {
  if (!cache[rel]) {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", rel));
    cache[rel] = `data:${mime};base64,${buf.toString("base64")}`;
  }
  return cache[rel];
}

const brandMark = () => asset("icons/icon-512.png", "image/png");

export const DEFAULT_OG_PHOTO = "/website-assets/og-hero.jpg";

/**
 * Normalise any source photo to exactly 1200x630 before it goes into the
 * card.
 *
 * Article images on this site range from 1672x941 down to 312x327. Handing
 * satori a 312px image and asking it to fill 1200x630 produces a visibly
 * blurry card, and handing the raw file straight to WhatsApp as og:image
 * is worse still — anything close to square is rendered as a small
 * thumbnail beside the text rather than a full-width banner. Resizing here
 * means every card is the same shape and resolution whatever it was built
 * from.
 */
const photoCache = {};
async function photoDataUri(publicPath) {
  if (!photoCache[publicPath]) {
    const buf = await sharp(path.join(process.cwd(), "public", publicPath))
      .resize(OG_SIZE.width, OG_SIZE.height, { fit: "cover", position: "attention" })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();
    photoCache[publicPath] = `data:image/jpeg;base64,${buf.toString("base64")}`;
  }
  return photoCache[publicPath];
}

/**
 * The social share card.
 *
 * Layout is built around the photo: the subject sits centre-right in
 * og-hero.jpg, so a plum scrim fades in from the left and all the text
 * lives in that clear band. Nothing overlaps her.
 *
 * Output is JPEG rather than the PNG next/og produces natively, because
 * WhatsApp is the strictest consumer of this card:
 *
 *  - It silently drops previews for images over roughly 600KB, and a
 *    photographic 1200x630 PNG lands well past that. The same picture as
 *    JPEG is a fraction of the size.
 *  - It does not render WebP or AVIF in link previews, so the modern
 *    formats used elsewhere on the site are not an option here.
 *
 * next/og can only emit PNG, so the PNG is piped through sharp on the way
 * out. Facebook, LinkedIn, X, Slack and iMessage all accept JPEG too, so
 * one card serves every platform.
 */
export async function renderOgImage({ title, subtitle, photo }) {
  const background = await photoDataUri(photo || DEFAULT_OG_PHOTO);
  const png = await new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Photo, full bleed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={background}
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          alt=""
          style={{ position: "absolute", top: 0, left: 0 }}
        />

        {/* Scrim: opaque under the text, clear over the subject. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(100deg, rgba(47,33,64,0.96) 0%, rgba(47,33,64,0.92) 34%, rgba(47,33,64,0.62) 52%, rgba(47,33,64,0.12) 72%, rgba(47,33,64,0) 100%)",
          }}
        />

        {/* Text column */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 700,
            height: "100%",
            padding: "58px 60px",
          }}
        >
          {/* Brand lockup */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brandMark()} width={70} height={70} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 34, fontWeight: 700, color: "#fff" }}>
                {SITE_NAME}
              </div>
              <div
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.72)",
                  marginTop: 3,
                }}
              >
                {CLINIC.legalName}
              </div>
            </div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                // Stepped down by length so a long article headline keeps
                // clear of the brand lockup above it instead of growing
                // into it. Article titles run to ~80 characters; the
                // page-level ones are much shorter.
                fontSize:
                  title.length > 64 ? 42 : title.length > 40 ? 52 : 62,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: -1.4,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  fontSize: 25,
                  color: "#f4c3b9",
                  marginTop: 16,
                  lineHeight: 1.35,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>

          {/* Footer strip */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: "3px solid #ec9689",
              paddingTop: 20,
            }}
          >
            <div style={{ fontSize: 23, color: "#fff", fontWeight: 700 }}>
              {CLINIC.phone}
            </div>
            {/* Single expression on purpose: satori treats `{a} · {b}` as
                three children and then demands an explicit display on the
                parent. One string sidesteps that entirely. */}
            <div
              style={{
                fontSize: 19,
                color: "rgba(255,255,255,0.75)",
                marginTop: 5,
              }}
            >
              {`${CLINIC.streetAddress} · ${CLINIC.landmark}`}
            </div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE
  ).arrayBuffer();

  const jpeg = await sharp(Buffer.from(png))
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  return new Response(jpeg, {
    headers: {
      "Content-Type": OG_CONTENT_TYPE,
      "Content-Length": String(jpeg.length),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
