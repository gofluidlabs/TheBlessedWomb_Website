"use client";

import { useRef } from "react";
import Link from "next/link";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { Plus, HeartHands, Baby, Pregnant, Stethoscope, ArrowRight } from "./Icons";

// Each card lists what THAT service covers. They used to share one set of
// four bullets, which read as duplicate content to crawlers and gave a
// visitor no reason to pick one card over another.
const SERVICES = [
  {
    title: "Antenatal & Pregnancy Care",
    alt: "Expectant couple sitting on a sofa looking at baby clothes together",
    href: "/services/antenatal-care",
    img: IMG.svc1,
    icon: HeartHands,
    points: [
      "First consultation & pregnancy dating",
      "Maternal & fetal monitoring",
      "Nutrition, supplements & vaccination guidance",
      "Birth & postpartum planning",
    ],
  },
  {
    title: "Pregnancy Scans & Ultrasound",
    alt: "Pregnant woman resting on a bed with an ultrasound probe on her belly",
    href: "/services/pregnancy-scans-ultrasound",
    img: IMG.svc2,
    icon: Pregnant,
    points: [
      "Clinically indicated pregnancy scans",
      "NT, anomaly & growth scans",
      "Abdominal & pelvic sonography",
      "Gynaecological ultrasound",
    ],
  },
  {
    title: "Doppler & Diagnostic Studies",
    alt: "Adult hands gently holding a newborn's feet",
    href: "/services/doppler-studies",
    img: IMG.svc3,
    icon: Baby,
    points: [
      "Doppler blood-flow studies",
      "Third-trimester growth & wellbeing checks",
      "Studies advised when clinically indicated",
      "Findings explained at your visit",
    ],
  },
  {
    title: "Gynaecological & Infertility Care",
    alt: "Smiling expectant couple relaxing together on a sofa",
    href: "/services/gynaecological-care",
    img: IMG.svc4,
    icon: Stethoscope,
    points: [
      "Irregular periods & PMOS / PCOS",
      "Routine women's health checkups",
      "Fertility evaluation for both partners",
      "Pelvic ultrasound & diagnostics",
    ],
  },
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
      <img loading="lazy" decoding="async" className="services-hex" src={IMG.hexBg} alt="" aria-hidden="true" />
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
                  <h3>
                    <Link href={s.href}>{s.title}</Link>
                  </h3>
                  <div className="svc-img">
                    <div className="svc-img-inner">
                      <SmartImage src={s.img} alt={s.alt} sizes="(max-width: 620px) 80vw, 400px" />
                    </div>
                    <span className="svc-badge">
                      <Icon />
                    </span>
                  </div>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <Link href={s.href} className="svc-more">
                    MORE
                  </Link>
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

        <p className="services-all reveal" data-anim="up">
          <Link href="/services">View all services</Link>
          {" · "}
          <Link href="/services/pmos-pcos-care">PMOS / PCOS care</Link>
          {" · "}
          <Link href="/services/infertility-care">Infertility care</Link>
        </p>
      </div>
    </section>
  );
}
