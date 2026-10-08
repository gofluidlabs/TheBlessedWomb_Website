"use client";

import Link from "next/link";
import SmartImage from "./SmartImage";
import Coverflow from "./Coverflow";
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

const COVERFLOW_ITEMS = MEMBERS.map((m) => ({
  id: m.name,
  src: m.img,
  alt: m.name,
  title: m.name,
  subtitle: m.role,
}));

export default function Team() {
  return (
    <section className="section team" id="team">
      <img loading="lazy" decoding="async" className="team-cross" src={IMG.crossDeco} alt="" aria-hidden="true" />
      <img loading="lazy" decoding="async" className="team-silhouette" src={IMG.silhouette} alt="" aria-hidden="true" />
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
              <SmartImage src={m.img} alt={m.name} className="team-photo" sizes="(max-width: 960px) 45vw, 260px" />
              <div className="team-info">
                <h4>{m.name}</h4>
                <span>{m.role}</span>
              </div>
            </article>
          ))}
        </div>

        <Coverflow
          className="team-coverflow reveal"
          dataAnim="up"
          items={COVERFLOW_ITEMS}
        />

        <div className="team-foot reveal">
          <div className="tf-avatars">
            <span className="av">
              <SmartImage src={IMG.doc} alt="Dr. Jyoti Gupta, Obstetrician & Gynaecologist, The Blessed Womb" sizes="48px" />
            </span>
            <span className="av call">
              <Phone width={18} height={18} />
            </span>
          </div>
          <span>Questions about your care? Meet Dr. Jyoti Gupta and the team.</span>
          <Link href="/about" className="viewall">
            Know More About Us <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
