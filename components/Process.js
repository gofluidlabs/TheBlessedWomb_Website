import { HeartHands, Microscope, Pregnant, Files, ArrowRight } from "./Icons";

const STEPS = [
  { title: "Initial Consultation", icon: HeartHands, up: false },
  { title: "Health Monitoring", icon: Microscope, up: true },
  { title: "Fertility Assessment", icon: Pregnant, up: false, active: true },
  { title: "Pregnancy Testing", icon: Files, up: true },
];

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="process-head reveal">
          <span className="eyebrow on-dark">Working Process</span>
          <h2 className="section-title on-dark">
            Our proven fertility process
            <br />
            <span className="accent">focused on</span>
          </h2>
        </div>

        <div className="process-steps" data-stagger>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`p-step ${s.up ? "up" : ""} ${
                  s.active ? "active" : ""
                }`}
              >
                <div className="p-circle">
                  <Icon width={54} height={54} />
                </div>
                <h4>{s.title}</h4>
                <p>Our patient assessment process is designed to evaluate.</p>
                {i < STEPS.length - 1 && (
                  <span className="p-arrow">
                    <ArrowRight width={40} height={40} />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <p className="process-note reveal">
          Let&rsquo;s turn these simple steps into stunning results. Contact us
          now to begin your journey. <a href="#">Request a Quote</a>
        </p>
      </div>
    </section>
  );
}
