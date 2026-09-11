"use client";

import { useState } from "react";
import { IMG } from "@/lib/images";
import { Search, Phone, Menu } from "./Icons";

const NAV = ["Home", "Pages", "Services", "Projects", "News"];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="brand">
          <img className="brand-logo brand-logo-white" src={IMG.logoWhite} alt="Fertiora" />
          <img className="brand-logo brand-logo-dark" src={IMG.logoWide} alt="Fertiora" />
        </a>

        <nav className={`main-nav ${open ? "open" : ""}`}>
          {NAV.map((item, i) => (
            <a key={item} href="#" className={i === 0 ? "active" : ""}>
              {item.toUpperCase()}
            </a>
          ))}
        </nav>

        <div className="header-right">
          <button className="header-search" aria-label="Search">
            <Search />
          </button>
          <span className="header-divider" />
          <div className="header-call">
            <span className="call-ico">
              <Phone />
            </span>
            <div className="call-txt">
              <span>Call Anytime</span>
              <strong>+88 017 500 500 88</strong>
            </div>
          </div>
          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu />
          </button>
        </div>
      </div>
    </header>
  );
}
