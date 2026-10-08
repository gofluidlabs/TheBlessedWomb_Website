import Link from "next/link";
import Image from "next/image";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import {
  Microscope,
  UserDoc,
  MedKit,
  HeartHands,
  Growth,
  ArrowUpRight,
} from "./Icons";

const LEFT = [
  { label: "Comprehensive Antenatal Care", icon: Microscope },
  { label: "Patient First Philosophy", icon: UserDoc },
];
const RIGHT = [
  { label: "Pregnancy & Gynae Diagnostics", icon: MedKit },
  { label: "Experienced & Caring Team", icon: HeartHands },
];

export default function WhyChooseUs() {
  return (
    <section className="section why" id="why">
      <img loading="lazy" decoding="async" className="why-shape" src={IMG.shapeDeco} alt="" aria-hidden="true" />
      <div className="container">
        <div className="why-head reveal">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="section-title">
            Why families trust our expertise
            <br />
            <span className="accent">for their pregnancy care</span>
          </h2>
        </div>

        <div className="why-body">
          <div className="why-col left" data-stagger>
            {LEFT.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="why-pill">
                  <span className="p-ico">
                    <Icon />
                  </span>
                  <span>{p.label}</span>
                </div>
              );
            })}
          </div>

          <div className="why-center reveal" data-anim="scale">
            <div className="why-doctor">
              <span className="doc-circle" />
              {/* next/image (not a raw <img>): the source is a 1.5MB
                  transparent PNG, so it must be resized and served as
                  AVIF/WebP, with width/height reserved to avoid layout shift. */}
              <Image
                src={IMG.whyDoctor}
                alt="Dr. Jyoti Gupta, Obstetrician & Gynaecologist at The Blessed Womb, Greater Noida"
                className="doc-portrait"
                width={1145}
                height={1374}
                sizes="(max-width: 768px) 70vw, 420px"
              />
            </div>
          </div>

          <div className="why-col right" data-stagger>
            {RIGHT.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="why-pill">
                  <span className="p-ico">
                    <Icon />
                  </span>
                  <span>{p.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="why-stats reveal" data-anim="up">
          <div className="why-stat">
            <div className="stat-ico">
              <Growth />
            </div>
            <h3>
              {/* The server-rendered HTML carries the FINAL number. Animations.js
                resets it to 0 on the client and counts up, so crawlers and
                no-JS visitors see "20+", never "0+". */}
              <span data-count="20" data-suffix="+">20+</span>
            </h3>
            <p>Years of Experience in Women&rsquo;s Healthcare</p>
          </div>
          <SmartImage src={IMG.whyBaby} alt="A newborn's tiny hand holding an adult's finger" className="why-baby masked-clover" sizes="(max-width: 768px) 80vw, 520px" />
        </div>

        <div className="why-cta">
          <Link href="/about#why" className="btn why-discover">
            Discover More
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
