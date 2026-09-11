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
  { label: "Modern Fertility Solutions", icon: Microscope },
  { label: "Patient First Philosophy", icon: UserDoc },
];
const RIGHT = [
  { label: "Holistic Fertility Support", icon: MedKit },
  { label: "Cutting Edge Technology", icon: HeartHands },
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
            <span className="accent">for their fertility</span>
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
              <SmartImage
                src={IMG.whyDoctor}
                alt="Fertility specialist"
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
              <span data-count="1500" data-suffix="+">0+</span>
            </h3>
            <p>Our Successful Projects Done</p>
          </div>
          <a href="#" className="btn why-discover">
            Discover More
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </a>
          <SmartImage src={IMG.whyBaby} alt="" className="why-baby masked-clover" />
        </div>
      </div>
    </section>
  );
}
