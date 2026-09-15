"use client";

import { useState } from "react";
import { Pregnant, Dna, Stethoscope, Flask, MedKit, ArrowRight } from "./Icons";

const PATHWAYS = [
  {
    key: "pregnancy",
    label: "Pregnancy & Antenatal Care",
    icon: Pregnant,
    steps: [
      "First consultation",
      "Pregnancy assessment",
      "Required investigations",
      "Antenatal care plan",
      "Regular monitoring",
      "Ultrasound / tests as advised",
      "Ongoing pregnancy care",
      "Delivery planning",
      "Postpartum follow-up",
    ],
  },
  {
    key: "fertility",
    label: "Fertility & Conception",
    icon: Dna,
    steps: [
      "Initial consultation",
      "Fertility assessment",
      "Relevant investigations",
      "Identify contributing factors",
      "Personalised treatment plan",
      "Monitoring",
      "Treatment cycle(s) where applicable",
      "Review",
      "Next step based on response",
    ],
  },
  {
    key: "gynae",
    label: "Gynaecological Concerns",
    icon: Stethoscope,
    steps: [
      "Consultation",
      "Assessment",
      "Investigations where needed",
      "Diagnosis",
      "Treatment plan",
      "Treatment",
      "Follow-up",
      "Long-term management if required",
    ],
  },
  {
    key: "pcos",
    label: "PCOS/PCOD & Menstrual Health",
    icon: Flask,
    steps: [
      "Consultation",
      "History & symptom assessment",
      "Investigations where appropriate",
      "Understanding contributing factors",
      "Individualised management",
      "Monitoring",
      "Review & adjustment",
      "Long-term health management",
    ],
  },
  {
    key: "preventive",
    label: "Preventive Women's Healthcare",
    icon: MedKit,
    steps: [
      "Consultation",
      "Risk assessment",
      "Appropriate screening",
      "Cervical cancer screening where indicated",
      "Vaccination where appropriate",
      "Results review",
      "Preventive follow-up",
    ],
  },
];

export default function ProcessPathways() {
  const [active, setActive] = useState(PATHWAYS[0].key);
  const pathway = PATHWAYS.find((p) => p.key === active);
  const Icon = pathway.icon;

  return (
    <section className="section pj-pathways" id="pathways">
      <div className="container">
        <div className="pj-journey-head">
          <span
            id="pathways-ribbon-end"
            className="eyebrow reveal"
            data-anim="up"
          >
            Not Every Journey Is The Same
          </span>
          <h2 className="section-title reveal" data-anim="up" data-delay="0.05">
            Not every journey follows{" "}
            <span className="accent">the same path</span>
          </h2>
          <p className="pj-journey-sub reveal" data-anim="up" data-delay="0.1">
            Depending on what brings you to us, your care may follow one of
            these broad pathways — always adapted to your own diagnosis and
            needs.
          </p>
        </div>

        <div className="pj-tabs reveal" data-anim="up" data-delay="0.15">
          {PATHWAYS.map((p) => (
            <button
              key={p.key}
              type="button"
              className={`pj-tab ${p.key === active ? "active" : ""}`}
              onClick={() => setActive(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="pj-pathway-panel reveal" data-anim="up" data-delay="0.2">
          <div className="pj-pathway-title">
            <span className="pj-pathway-ico">
              <Icon />
            </span>
            <h3>{pathway.label}</h3>
          </div>
          <div className="pj-pathway-steps">
            {pathway.steps.map((step, i) => (
              <div className="pj-pathway-step" key={step}>
                <span className="pj-pathway-num">{i + 1}</span>
                <span>{step}</span>
                {i < pathway.steps.length - 1 && (
                  <span className="pj-pathway-arrow">
                    <ArrowRight width={16} height={16} />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
