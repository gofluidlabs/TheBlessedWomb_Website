import { HeartHands, Microscope, Pregnant, Files, ArrowRight } from "./Icons";

const STEPS = [
  { title: "Initial Consultation", icon: HeartHands, up: false },
  { title: "Antenatal Monitoring", icon: Microscope, up: true },
  { title: "Pregnancy Scan & Ultrasound", icon: Pregnant, up: false, active: true },
  { title: "Continued Care", icon: Files, up: true },
];

export default function Process() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="process-head reveal">
          <span className="eyebrow on-dark">Working Process</span>
          <h2 className="section-title on-dark">
            Our patient care process
            <br />
            <span className="accent">focused on you</span>
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
          Let&rsquo;s take these simple steps together. Contact us to begin
          your care journey. <a href="#">Book an Appointment</a>
        </p>
      </div>
    </section>
  );
}
