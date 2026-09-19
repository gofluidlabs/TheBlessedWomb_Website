"use client";

import { useRef } from "react";
import Link from "next/link";
import { HeartHands, Microscope, Pregnant, Files, ArrowRight } from "./Icons";

const STEPS = [
  { title: "Initial Consultation", icon: HeartHands, up: false },
  { title: "Antenatal Monitoring", icon: Microscope, up: true },
  { title: "Pregnancy Scan & Ultrasound", icon: Pregnant, up: false, active: true },
  { title: "Continued Care", icon: Files, up: true },
];

export default function Process() {
  const trackRef = useRef(null);

  function scrollNext() {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".p-step");
    const amount = (card ? card.offsetWidth : 250) + 14;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    track.scrollTo({
      left: atEnd ? 0 : track.scrollLeft + amount,
      behavior: "smooth",
    });
  }

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

        <div className="process-carousel">
          <div className="process-steps" data-stagger ref={trackRef}>
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

          <button
            type="button"
            className="process-edge-arrow"
            aria-label="Scroll process steps"
            onClick={scrollNext}
          >
            <ArrowRight />
          </button>
        </div>

        <p className="process-note reveal">
          Let&rsquo;s take these simple steps together. Contact us to begin
          your care journey.{" "}
          <Link
            href="/contact"
            data-track="appointment_click"
            data-track-location="other"
          >
            Book an Appointment
          </Link>
        </p>
      </div>
    </section>
  );
}
