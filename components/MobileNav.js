"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MedKit,
  UserDoc,
  Phone,
  ArrowUpRight,
  Stethoscope,
  Milestone,
  Files,
  Users,
} from "./Icons";

const CARE_ITEMS = [
  { label: "Our Services", href: "/#services", icon: Stethoscope },
  { label: "Our Process", href: "/process", icon: Milestone },
  { label: "Health Blog", href: "/blog", icon: Files },
];

const ABOUT_ITEMS = [
  { label: "About Dr. Jyoti Gupta", href: "/about", icon: UserDoc },
  { label: "Our Team", href: "/#team", icon: Users },
];

export default function MobileNav() {
  const [openSheet, setOpenSheet] = useState(null); // "care" | "about" | null
  const pathname = usePathname();
  const navRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenSheet(null);
    }
    function onDocClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenSheet(null);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("touchstart", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("touchstart", onDocClick);
    };
  }, []);

  function toggleSheet(key) {
    setOpenSheet((v) => (v === key ? null : key));
  }

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isCare =
    pathname === "/process" || pathname === "/blog" || pathname.startsWith("/blog/");
  const isContact = pathname === "/contact";

  const sheet = openSheet === "care"
    ? { title: "Care", items: CARE_ITEMS }
    : openSheet === "about"
    ? { title: "About", items: ABOUT_ITEMS }
    : null;

  return (
    <div className="mobile-nav-root" ref={navRef}>
      {sheet && (
        <div
          className="mbn-sheet-backdrop"
          onClick={() => setOpenSheet(null)}
          aria-hidden="true"
        />
      )}

      {sheet && (
        <div className="mbn-sheet" role="dialog" aria-label={sheet.title}>
          <span className="mbn-sheet-title">{sheet.title}</span>
          {sheet.items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="mbn-sheet-item"
                onClick={() => setOpenSheet(null)}
              >
                <span className="mbn-sheet-ico">
                  <Icon />
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link
          href="/"
          className={`mbn-item ${isHome ? "active" : ""}`}
          onClick={() => setOpenSheet(null)}
        >
          <Home />
          <span>Home</span>
        </Link>

        <button
          type="button"
          className={`mbn-item ${isCare || openSheet === "care" ? "active" : ""}`}
          aria-expanded={openSheet === "care"}
          aria-haspopup="dialog"
          onClick={() => toggleSheet("care")}
        >
          <MedKit />
          <span>Care</span>
        </button>

        <Link href="/contact" className="mbn-fab" aria-label="Book Appointment">
          <ArrowUpRight />
        </Link>

        <button
          type="button"
          className={`mbn-item ${isAbout || openSheet === "about" ? "active" : ""}`}
          aria-expanded={openSheet === "about"}
          aria-haspopup="dialog"
          onClick={() => toggleSheet("about")}
        >
          <UserDoc />
          <span>About</span>
        </button>

        <Link
          href="/contact"
          className={`mbn-item ${isContact ? "active" : ""}`}
          onClick={() => setOpenSheet(null)}
        >
          <Phone />
          <span>Contact</span>
        </Link>
      </nav>
    </div>
  );
}
