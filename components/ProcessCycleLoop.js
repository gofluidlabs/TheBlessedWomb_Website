import { Microscope, Files, MedKit, Growth, UserDoc, HeartHands } from "./Icons";

const NODES = [
  { label: "ASSESS", icon: Microscope, top: 8, left: 50 },
  { label: "PLAN", icon: Files, top: 29, left: 86 },
  { label: "TREAT", icon: MedKit, top: 71, left: 86 },
  { label: "MONITOR", icon: Growth, top: 92, left: 50 },
  { label: "REVIEW", icon: UserDoc, top: 71, left: 14 },
  { label: "CONTINUE / MODIFY / NEXT OPTION", icon: HeartHands, top: 29, left: 14 },
];

export default function ProcessCycleLoop() {
  return (
    <section className="section pj-cycle-section" id="fertility-cycle">
      <div className="container">
        <div className="pj-journey-head">
          <span className="eyebrow reveal" data-anim="up">
            Fertility Care Cycle
          </span>
          <h2 className="section-title reveal" data-anim="up" data-delay="0.05">
            A cycle, not always <span className="accent">a single step</span>
          </h2>
          <p className="pj-journey-sub reveal" data-anim="up" data-delay="0.1">
            Fertility care often moves through more than one cycle. After
            each cycle, your response is reviewed and the next step is
            decided based on your individual circumstances — for as long as
            it remains clinically appropriate for you.
          </p>
        </div>

        <div className="pj-cycle reveal" data-anim="scale" data-delay="0.15">
          <svg className="pj-cycle-ring" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--coral-soft)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </svg>
          {NODES.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.label}
                className="pj-cycle-node"
                style={{ top: `${n.top}%`, left: `${n.left}%` }}
              >
                <span className="pj-cycle-badge">
                  <Icon />
                </span>
                <span className="pj-cycle-label">{n.label}</span>
              </div>
            );
          })}
          <span className="pj-cycle-loopback">↻ loops back to Assess</span>
        </div>

        <div className="pj-cycle-mobile reveal" data-anim="up" data-delay="0.15">
          {NODES.map((n) => {
            const Icon = n.icon;
            return (
              <div className="pj-pathway-step" key={n.label}>
                <span className="pj-pathway-num">
                  <Icon width={16} height={16} />
                </span>
                <span>{n.label}</span>
              </div>
            );
          })}
          <p className="pj-cycle-mobile-note">↩ Loops back to Assess</p>
        </div>
      </div>
    </section>
  );
}
