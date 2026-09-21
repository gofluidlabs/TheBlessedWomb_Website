import Link from "next/link";
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
      <img className="why-shape" src={IMG.shapeDeco} alt="" aria-hidden="true" />
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
              <img
                src={IMG.whyDoctor}
                alt="Dr. Jyoti Gupta, Obstetrician & Gynaecologist at The Blessed Womb, Greater Noida"
                className="doc-portrait"
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
              <span data-count="20" data-suffix="+">0+</span>
            </h3>
            <p>Years of Experience in Women&rsquo;s Healthcare</p>
          </div>
          <SmartImage src={IMG.whyBaby} alt="" className="why-baby masked-clover" />
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
