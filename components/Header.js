"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IMG } from "@/lib/images";
import MegaMenu from "./MegaMenu";
import {
  Phone,
  Menu,
  Close,
  ChevronDown,
  ArrowUpRight,
  HeartHands,
  UserDoc,
  Growth,
  MedKit,
  Microscope,
  Pregnant,
  Stethoscope,
} from "./Icons";

const NAV = [
  { label: "Home", href: "/", type: "link" },
  { label: "About", key: "about", type: "mega" },
  { label: "Services", key: "services", type: "mega" },
  { label: "Process", href: "/process", type: "link" },
  { label: "FAQs", href: "/#faq", type: "link" },
  { label: "Team", href: "/#team", type: "link" },
];

const MEGA_MENUS = {
  about: {
    items: [
      {
        label: "About The Blessed Womb",
        desc: "Our brand & approach to care",
        icon: HeartHands,
        href: "/about#brand",
        image: IMG.aboutTall,
      },
      {
        label: "About Dr. Jyoti Gupta",
        desc: "20+ years, Obstetrician & Gynaecologist",
        icon: UserDoc,
        href: "/about#doctor",
        image: IMG.doc,
      },
      {
        label: "Our Philosophy",
        desc: "Complete care of motherhood",
        icon: Growth,
        href: "/about#philosophy",
        image: IMG.aboutTop,
      },
      {
        label: "Why Choose Us",
        desc: "What families value about our care",
        icon: MedKit,
        href: "/about#why",
        image: IMG.aboutBottom,
      },
    ],
    cta: {
      eyebrow: "20+ Years of Experience",
      title: "Compassionate care for women, mothers and growing families.",
      href: "/about",
      label: "Explore About",
    },
  },
  services: {
    items: [
      {
        label: "Antenatal Care & Pregnancy Supervision",
        icon: HeartHands,
        href: "/#services",
        image: IMG.svc1,
      },
      {
        label: "Clinically Indicated Pregnancy Scans",
        icon: Microscope,
        href: "/#services",
        image: IMG.svc2,
      },
      {
        label: "Pregnancy & Gynaecological Ultrasound",
        icon: Pregnant,
        href: "/#services",
        image: IMG.svc4,
      },
      {
        label: "Doppler Studies",
        icon: Stethoscope,
        href: "/#services",
        image: IMG.svc3,
      },
    ],
    cta: {
      eyebrow: "Complete Care of Motherhood",
      title: "Everything under one roof, guided by Dr. Jyoti Gupta.",
      href: "/#services",
      label: "View Services",
    },
  },
};

export default function Header({ light = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState({});
  const [openMenu, setOpenMenu] = useState(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileAccordion({});
      }
    }
    function onScroll() {
      setOpenMenu(null);
      setMobileAccordion({});
    }
    function onDocClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setMobileAccordion({});
      }
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  function scheduleOpen(key) {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => {
      setOpenMenu(key);
      setMobileAccordion({});
    }, 120);
  }
  function scheduleClose() {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
      setMobileAccordion({});
    }, 260);
  }
  function toggleMenu(key) {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setOpenMenu((v) => (v === key ? null : key));
    setMobileAccordion((v) => (v[key] ? {} : { [key]: true }));
  }
  function closeAll() {
    clearTimeout(openTimer.current);
    clearTimeout(closeTimer.current);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileAccordion({});
  }

  return (
    <header className={`site-header ${light ? "light" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={closeAll}>
          <img className="brand-logo" src={IMG.logoMark} alt="The Blessed Womb" />
          <span className="brand-word">The Blessed Womb</span>
        </Link>

        <nav ref={navRef} className={`main-nav ${mobileOpen ? "open" : ""}`}>
          {NAV.map((item) => {
            if (item.type === "link") {
              const isActive = item.href === pathname;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={isActive ? "active" : ""}
                  onClick={closeAll}
                >
                  {item.label.toUpperCase()}
                </Link>
              );
            }

            const menu = MEGA_MENUS[item.key];
            const isOpen = openMenu === item.key || !!mobileAccordion[item.key];
            const isActive = item.key === "about" && pathname === "/about";

            return (
              <div
                key={item.label}
                className={`nav-item ${mobileAccordion[item.key] ? "is-open" : ""}`}
                onMouseEnter={() => scheduleOpen(item.key)}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={`mega-trigger ${isActive ? "active" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => toggleMenu(item.key)}
                >
                  {item.label.toUpperCase()}
                  <ChevronDown className="mega-chevron" />
                </button>
                <MegaMenu
                  menu={menu}
                  open={isOpen}
                  variant={item.key}
                  onLinkClick={closeAll}
                />
              </div>
            );
          })}

          <Link
            href="/contact"
            className="btn header-cta mnav-footer-cta"
            onClick={closeAll}
          >
            Book Appointment
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
        </nav>

        <div className="header-right">
          <div className="header-call">
            <span className="call-ico">
              <Phone />
            </span>
            <div className="call-txt">
              <span>Call Us</span>
              <strong>+91 88826 63284</strong>
            </div>
          </div>
          <span className="header-divider" />
          <Link href="/contact" className="btn header-cta">
            Book Appointment
            <span className="btn-ico">
              <ArrowUpRight />
            </span>
          </Link>
          <button
            className="nav-toggle"
            aria-label={mobileOpen ? "Close menu" : "Menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={`mnav-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={closeAll}
        aria-hidden="true"
      />
    </header>
  );
}
