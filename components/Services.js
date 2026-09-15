"use client";

import { useRef } from "react";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { Plus, HeartHands, Baby, Pregnant, Stethoscope, ArrowRight } from "./Icons";

const SERVICES = [
  {
    title: "Antenatal & Pregnancy Care",
    img: IMG.svc1,
    icon: HeartHands,
  },
  {
    title: "Pregnancy Scans & Ultrasound",
    img: IMG.svc2,
    icon: Pregnant,
  },
  {
    title: "Doppler & Diagnostic Studies",
    img: IMG.svc3,
    icon: Baby,
  },
  {
    title: "Gynaecological & Infertility Care",
    img: IMG.svc4,
    icon: Stethoscope,
  },
];

const POINTS = [
  "Antenatal Care & Pregnancy Supervision",
  "Clinically Indicated Pregnancy Scans",
  "Pregnancy & Gynaecological Ultrasound",
  "Doppler Studies",
];

export default function Services() {
  const trackRef = useRef(null);

  function scrollNext() {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".service-card");
    const amount = (card ? card.offsetWidth : 370) + 26;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    track.scrollTo({
      left: atEnd ? 0 : track.scrollLeft + amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="section services" id="services">
      <img className="services-hex" src={IMG.hexBg} alt="" aria-hidden="true" />
      <div className="container">
        <div className="services-head reveal">
          <span className="eyebrow">Services</span>
          <h2 className="section-title">
            Complete pregnancy and women&rsquo;s health services
            <br />
            <span className="accent">under one roof</span>
          </h2>
        </div>

        <div className="services-carousel">
          <div className="services-grid" ref={trackRef}>
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.title} className="service-card">
                  <span className="svc-plus">
                    <Plus />
                  </span>
                  <h3>{s.title}</h3>
                  <div className="svc-img">
                    <div className="svc-img-inner">
                      <SmartImage src={s.img} alt={s.title} />
                    </div>
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

          <button
            type="button"
            className="services-edge-arrow"
            aria-label="Scroll services"
            onClick={scrollNext}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
