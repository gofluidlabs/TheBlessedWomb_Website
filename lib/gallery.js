import fs from "fs";
import path from "path";
import { IMG } from "./images";

/**
 * Gallery images, discovered from the folder itself.
 *
 *   public/website-assets/gallerysection/
 *
 * Drop an image in that folder (or delete one) and the landing-page
 * carousel and the /gallery page pick the change up on the next build /
 * dev-server refresh — no code edit needed. Nothing here depends on a file
 * existing: a missing folder, an empty folder or a file this module cannot
 * measure all degrade gracefully instead of throwing.
 *
 * SERVER ONLY (uses `fs`). Call getGalleryImages() from a server component
 * and pass the result down as props; do not import this from a client
 * component.
 *
 * Optional captions: add an entry to META below, keyed by the file name
 * without its extension, to give a photo its own title, subtitle, alt text or focal point.
 * Files without an entry still show, with a generic caption. Entries listed
 * in META also set the display order (in the order written); every other
 * file follows, sorted by file name.
 *
 * Captions are deliberately generic — no names, dates or claims beyond what
 * the photos themselves show, since most of the people pictured are
 * patients and families.
 */

const GALLERY_DIR = path.join(
  process.cwd(),
  "public",
  "website-assets",
  "gallerysection"
);
const URL_BASE = "/website-assets/gallerysection";
const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif)$/i;

// A photo wider than this (width / height) is shown whole ("contain") in
// the fixed-ratio portrait cards instead of being cropped to fit, so a
// wide graphic or banner is never cut off. Near-square and portrait photos
// fill the card.
const WIDE_RATIO = 1.15;

// File name WITHOUT its extension -> optional overrides. All fields
// optional. Matching ignores the extension and letter case, so converting a
// photo from .png to .webp (or .jpg) does not lose its caption.
const META = {
  "drjyoti": {
    title: "Dr. Jyoti Gupta",
    subtitle: "Obstetrician & Gynaecologist",
    alt: "Dr. Jyoti Gupta seated in the clinic reception area, smiling, in teal scrubs with a stethoscope",
    focus: "50% 35%",
  },
  "dr-jyoti-gupta-consultation-desk": {
    title: "Dr. Jyoti Gupta",
    subtitle: "In consultation",
    alt: "Dr. Jyoti Gupta seated at her consultation desk with a stethoscope, in front of a nameplate bearing her name",
    focus: "50% 35%",
  },
  "blessed-womb-reception-desk": {
    title: "Our Reception",
    subtitle: "Complete care of motherhood",
    alt: "Reception desk decorated with marigold garlands beneath The Blessed Womb sign, with a receptionist smiling behind it",
    focus: "35% 40%",
  },
  "blessed-womb-waiting-area": {
    title: "Our Waiting Area",
    subtitle: "A bright, welcoming space",
    alt: "Bright reception and waiting area at The Blessed Womb with the clinic sign and a banner of Dr. Jyoti Gupta",
  },
  "Jyoti_office_desk - Removed": {
    title: "The Consulting Room",
    subtitle: "A calm, personal space",
    alt: "Dr. Jyoti Gupta seated at her desk in the consulting room, with a Buddha painting on the wall and flowers on the desk",
  },
  "jyotiwithplantssmile": {
    title: "Dr. Jyoti Gupta",
    subtitle: "Here for you",
    alt: "Dr. Jyoti Gupta in teal scrubs with a stethoscope, smiling with her arms folded beside an indoor plant",
  },
  "dr jyoti photo frane with newborns": {
    title: "A Family's Thank You",
    subtitle: "A framed note of gratitude",
    alt: "Framed thank-you picture from a family to Dr. Jyoti Gupta, displayed in the clinic",
  },
  "dr jyoti with patient and child": {
    title: "A Thank-You from a Family",
    subtitle: "Moments from the clinic",
    alt: "Dr. Jyoti Gupta in the clinic office with a family presenting a framed thank-you picture, with two young children",
  },
  // Not in the gallery folder: the folded-arms portrait lives with the
  // site's other doctor images. It is pinned here so it still appears
  // second (see PINNED below).
  "Caring_Clinic_Portrait_with_Child - Removed": {
    title: "Caring Consultations",
    subtitle: "Warm, personal attention",
    alt: "A doctor in a white coat holding a toddler on her lap in the consultation room",
    focus: "40% 55%",
  },
  "Hospital_Newborn_Visit - Removed": {
    title: "Newborn Welcome",
    subtitle: "Supporting mothers after delivery",
    alt: "A doctor holding a newborn wrapped in a yellow towel beside a new mother resting in her hospital bed",
    focus: "35% 40%",
  },
  "Warm_Clinic_Portrait_with_Baby_and_Buddha_Art - Removed": {
    title: "Families We Care For",
    subtitle: "Moments from the clinic",
    alt: "Two women and a baby posing together in the clinic office, with a Buddha painting behind them",
    focus: "42% 50%",
  },
  "Warm_Office_Portrait_with_Mother_and_Baby - Removed": {
    title: "Mother & Baby Care",
    subtitle: "Compassionate antenatal & postnatal care",
    alt: "A doctor in a teal kurta seated at her desk holding a baby",
    focus: "35% 40%",
  },
  "Warm_Medical_Consultation_Portrait - Removed": {
    title: "In Consultation",
    subtitle: "Time to listen, time to explain",
    alt: "A doctor in a white kurta with a stethoscope seated at her desk, smiling, with a Buddha painting behind her",
  },
  "UPCOS_Conference_Scientific_Programme - Removed": {
    title: "UPCOS Conference",
    subtitle: "Scientific programme",
    alt: "A woman standing beside the scientific programme board of the 11th Mid-Term UPCOS Conference",
  },
  "jyotitour": {
    title: "Dr. Jyoti Gupta",
    subtitle: "Welcome to the clinic",
    alt: "Dr. Jyoti Gupta in teal scrubs with a stethoscope, smiling in the clinic corridor",
  },
  "jyoti_with_plants": {
    title: "Dr. Jyoti Gupta",
    subtitle: "Caring for women at every stage",
    alt: "Dr. Jyoti Gupta, obstetrician and gynaecologist, standing with her arms folded beside an indoor plant in the clinic",
  },
  "IMG_20260923_192527": {
    title: "A Warm Welcome",
    subtitle: "From the first hello",
    alt: "Smiling doctor in teal scrubs holding her stethoscope in the clinic corridor",
  },
  "IMG_20260923_192607": {
    title: "Meet Your Doctor",
    subtitle: "Experienced, approachable care",
    alt: "Smiling doctor in teal scrubs with a stethoscope and arms folded, standing beside a large indoor plant",
  },
  "IMG_20260923_192824": {
    title: "Comfortable Surroundings",
    subtitle: "A calm place to wait",
    alt: "Doctor in teal scrubs seated on a cream sofa in the clinic waiting area beside an indoor plant",
  },
  "IMG_20260923_192836": {
    title: "Relaxed & Approachable",
    subtitle: "Where every visit feels welcoming",
    alt: "Doctor in teal scrubs and white sneakers resting an arm on a sofa in the clinic reception area",
  },
  "IMG_20260923_201422": {
    title: "Welcome to The Blessed Womb",
    subtitle: "Alpha I, Greater Noida",
    alt: "Smiling doctor in teal scrubs with a stethoscope sitting on a cream sofa with her hands clasped",
  },
  "Confident_Doctor_with_Raised_Finger - Removed": {
    title: "Dr. Jyoti Gupta",
    subtitle: "Obstetrician & Gynaecologist",
    alt: "Dr. Jyoti Gupta in a white coat with a stethoscope, smiling and raising one finger",
  },
};

// Images that belong in the gallery but live elsewhere. Skipped
// automatically if a file with the same name is also in the folder.
const PINNED = [
  {
    file: "doctor_with_folded_arms.png",
    after: "drjyoti",
    src: IMG.doctorFolded,
    title: "Dr. Jyoti Gupta",
    subtitle: "Here to guide you at every step",
    alt: "Dr. Jyoti Gupta in a white coat with a stethoscope, smiling with her arms folded",
    focus: "50% 20%",
    width: 1145,
    height: 1374,
  },
];

// ---------------------------------------------------------------------------
// Reading image dimensions without a dependency. Supports PNG, JPEG, WebP and
// GIF — the formats the folder realistically holds. Returns null when it
// can't tell, and the caller falls back to a portrait ratio.
// ---------------------------------------------------------------------------

function sizeFromBuffer(buf) {
  try {
    // PNG
    if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    // GIF
    if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
      return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
    }
    // WebP
    if (
      buf.length > 30 &&
      buf.toString("ascii", 0, 4) === "RIFF" &&
      buf.toString("ascii", 8, 12) === "WEBP"
    ) {
      const kind = buf.toString("ascii", 12, 16);
      if (kind === "VP8X") {
        return {
          width: 1 + buf.readUIntLE(24, 3),
          height: 1 + buf.readUIntLE(27, 3),
        };
      }
      if (kind === "VP8 ") {
        return {
          width: buf.readUInt16LE(26) & 0x3fff,
          height: buf.readUInt16LE(28) & 0x3fff,
        };
      }
      if (kind === "VP8L") {
        const b = buf.readUInt32LE(21);
        return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
      }
    }
    // JPEG: walk the segments until a start-of-frame marker
    if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i + 9 < buf.length) {
        if (buf[i] !== 0xff) {
          i += 1;
          continue;
        }
        const marker = buf[i + 1];
        if (marker === 0xff) {
          i += 1;
          continue;
        }
        const isSOF =
          marker >= 0xc0 &&
          marker <= 0xcf &&
          marker !== 0xc4 &&
          marker !== 0xc8 &&
          marker !== 0xcc;
        if (isSOF) {
          return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
  } catch {
    // fall through
  }
  return null;
}

function readImageSize(file) {
  try {
    const fd = fs.openSync(file, "r");
    try {
      // Phone photos can carry a large EXIF block ahead of the frame
      // header, so try a generous head first, then the whole file.
      for (const bytes of [512 * 1024, fs.fstatSync(fd).size]) {
        const buf = Buffer.alloc(Math.min(bytes, fs.fstatSync(fd).size));
        fs.readSync(fd, buf, 0, buf.length, 0);
        const size = sizeFromBuffer(buf);
        if (size && size.width > 0 && size.height > 0) return size;
      }
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    // unreadable file: no dimensions, the card falls back to 3:4
  }
  return null;
}

// "IMG_1.jpg.jpeg", "photo (2).png" and "photo.webp" all reduce to their bare
// name, so META keys keep working when a file is converted, re-exported or
// downloaded twice ("(1)", "(2)").
const stemOf = (file) => {
  let s = file.toLowerCase();
  let prev;
  do {
    prev = s;
    s = s.replace(/\.(png|jpe?g|webp|avif|gif)$/, "").replace(/\s*\(\d+\)$/, "");
  } while (s !== prev);
  return s;
};
const META_BY_STEM = Object.fromEntries(
  Object.entries(META).map(([k, v]) => [k.toLowerCase(), v])
);

function slug(file) {
  return file
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function listFolder() {
  try {
    return fs
      .readdirSync(GALLERY_DIR, { withFileTypes: true })
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => e.name);
  } catch {
    return []; // folder missing or unreadable: show nothing rather than crash
  }
}

/**
 * @returns {Array<{
 *   id: string, src: string, alt: string, title: string, subtitle: string,
 *   width: number, height: number, focus: string, fit: "cover" | "contain"
 * }>}
 */
export function getGalleryImages() {
  const files = listFolder();
  const naturalSort = (a, b) =>
    a.localeCompare(b, "en", { numeric: true, sensitivity: "base" });

  const metaOrder = Object.keys(META).map((k) => k.toLowerCase());
  const curated = files
    .filter((f) => stemOf(f) in META_BY_STEM)
    .sort((a, b) => metaOrder.indexOf(stemOf(a)) - metaOrder.indexOf(stemOf(b)));
  const rest = files.filter((f) => !curated.includes(f)).sort(naturalSort);

  const items = [...curated, ...rest].map((file, i) => {
    const meta = META_BY_STEM[stemOf(file)] || {};
    const dims = readImageSize(path.join(GALLERY_DIR, file)) || {
      width: 3,
      height: 4,
    };
    return {
      id: slug(file) || `photo-${i + 1}`,
      src: `${URL_BASE}/${encodeURIComponent(file)}`,
      alt:
        meta.alt ||
        "A moment at The Blessed Womb clinic in Alpha I, Greater Noida",
      title: meta.title || "The Blessed Womb",
      subtitle: meta.subtitle || "Moments from our clinic",
      width: dims.width,
      height: dims.height,
      focus: meta.focus || "50% 30%",
      fit: dims.width / dims.height > WIDE_RATIO ? "contain" : "cover",
      _file: file,
    };
  });

  // Splice in pinned images from outside the folder.
  for (const pin of PINNED) {
    if (files.some((f) => stemOf(f) === stemOf(pin.file))) continue; // already in the folder
    const entry = {
      id: slug(pin.file),
      src: pin.src,
      alt: pin.alt,
      title: pin.title,
      subtitle: pin.subtitle,
      width: pin.width,
      height: pin.height,
      focus: pin.focus,
      fit: pin.width / pin.height > WIDE_RATIO ? "contain" : "cover",
      _file: pin.file,
    };
    const at = items.findIndex((it) => stemOf(it._file) === pin.after);
    items.splice(at === -1 ? items.length : at + 1, 0, entry);
  }

  return items.map(({ _file, ...item }) => item);
}
