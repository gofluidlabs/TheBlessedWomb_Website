"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { socialUrl, realSocials } from "@/lib/seo";
import {
  Plus,
  Phone,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
} from "./Icons";

const MEMBERS = [
  { name: "Dr. Jyoti Gupta", role: "Obstetrician & Gynaecologist", img: IMG.team1, dark: false },
  { name: "Care Coordinator", role: "Patient Support", img: IMG.team2, dark: false },
  {
    name: "Sonography Support",
    role: "Ultrasound & Diagnostics",
    img: IMG.team3,
    dark: true,
  },
  { name: "Nursing Staff", role: "Antenatal Care", img: IMG.team4, dark: false },
];

// Same placeholder guard as the footer — see lib/seo.js socialUrl().
const TEAM_SOCIALS = realSocials([
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "twitter", label: "Twitter", icon: Twitter },
  { key: "instagram", label: "Instagram", icon: Instagram },
]);

const WRAP = MEMBERS.length;

export default function Team() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;
    if (delta > threshold) {
      setActive((i) => (i - 1 + WRAP) % WRAP);
    } else if (delta < -threshold) {
      setActive((i) => (i + 1) % WRAP);
    }
    touchStartX.current = null;
  }

  function slotClass(i) {
    let diff = i - active;
    if (diff > WRAP / 2) diff -= WRAP;
    if (diff < -WRAP / 2) diff += WRAP;
    if (diff === 0) return "tc-active";
    if (diff === -1) return "tc-prev";
    if (diff === 1) return "tc-next";
    return "tc-hidden";
  }

  return (
    <section className="section team" id="team">
      <img className="team-cross" src={IMG.crossDeco} alt="" aria-hidden="true" />
      <img className="team-silhouette" src={IMG.silhouette} alt="" aria-hidden="true" />
      <div className="container">
        <div className="team-head">
          <div className="reveal" data-anim="left">
            <span className="eyebrow">Our Team</span>
            <h2 className="section-title">
              Dedicated care, every
              <br />
              <span className="accent">step of the way</span>
            </h2>
          </div>
          <p className="th-note reveal" data-anim="right">
            Our team supports Dr. Jyoti Gupta in providing antenatal care,
            pregnancy scans and gynaecological services tailored to your
            needs.
          </p>
        </div>

        <div className="team-grid" data-stagger>
          {MEMBERS.map((m) => (
            <article
              key={m.name}
              className={`team-card ${m.dark ? "dark" : ""}`}
            >
              {m.dark ? (
                <div className="team-social">
                  {TEAM_SOCIALS.map(({ key, label, icon: Icon }) => (
                    <a
                      key={key}
                      href={socialUrl(key)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`The Blessed Womb on ${label}`}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              ) : (
                <span className="team-plus">
                  <Plus />
                </span>
              )}
              <SmartImage src={m.img} alt={m.name} className="team-photo" />
              <div className="team-info">
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="team-coverflow reveal" data-anim="up">
          <div
            className="tc-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {MEMBERS.map((m, i) => (
              <div
                key={m.name}
                className={`tc-card ${slotClass(i)}`}
                role="button"
                tabIndex={0}
                aria-label={`Show ${m.name}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <SmartImage src={m.img} alt={m.name} className="tc-photo" />
                <div className="tc-caption">
                  <h4>{m.name}</h4>
                  <span>{m.role}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tc-dots">
            {MEMBERS.map((m, i) => (
              <button
                key={m.name}
                type="button"
                className={`tc-dot ${i === active ? "active" : ""}`}
                aria-label={`Show ${m.name}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        <div className="team-foot reveal">
          <div className="tf-avatars">
            <span className="av">
              <SmartImage src={IMG.doc} alt="Dr. Jyoti Gupta, Obstetrician & Gynaecologist, The Blessed Womb" />
            </span>
            <span className="av call">
              <Phone width={18} height={18} />
            </span>
          </div>
          <span>let&rsquo;s make something great work together.</span>
          <Link href="/about" className="viewall">
            Know More About Us <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
