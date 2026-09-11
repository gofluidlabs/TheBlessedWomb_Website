import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { Plus, HeartHands, Baby, Pregnant, Stethoscope } from "./Icons";

const SERVICES = [
  {
    title: "Expert Fertility Consultation",
    img: IMG.svc1,
    icon: HeartHands,
    dark: false,
  },
  {
    title: "Fertility Health Assessment",
    img: IMG.svc2,
    icon: Pregnant,
    dark: false,
  },
  {
    title: "Fertility Diagnostic Services",
    img: IMG.svc3,
    icon: Baby,
    dark: true,
  },
  {
    title: "Family Planning Solutions",
    img: IMG.svc4,
    icon: Stethoscope,
    dark: false,
  },
];

const POINTS = [
  "Pregnancy Monitoring Services",
  "Comprehensive Fertility Care",
  "Reproductive Medicine Experts",
  "Infertility Treatment Solutions",
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <img className="services-hex" src={IMG.hexBg} alt="" aria-hidden="true" />
      <div className="container">
        <div className="services-head reveal">
          <span className="eyebrow">Services</span>
          <h2 className="section-title">
            Complete IVF and fertility services
            <br />
            <span className="accent">under one roof</span>
          </h2>
        </div>

        <div className="services-grid" data-stagger>
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className={`service-card ${s.dark ? "dark" : ""}`}
              >
                <span className="svc-plus">
                  <Plus />
                </span>
                <h3>{s.title}</h3>
                <div className="svc-img">
                  <SmartImage src={s.img} alt={s.title} />
                  <span className="svc-badge">
                    <Icon />
                  </span>
                </div>
                <ul>
                  {POINTS.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="svc-more">MORE</div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
