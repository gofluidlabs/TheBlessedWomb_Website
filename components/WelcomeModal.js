"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Close } from "./Icons";
import ContactForm from "./ContactForm";

const STORAGE_KEY = "tbw-welcome-modal-shown";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/contact") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="welcome-modal">
      <div className="welcome-modal-backdrop" onClick={() => setOpen(false)} />
      <div className="welcome-modal-card contact-form-card">
        <button
          type="button"
          className="welcome-modal-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <Close />
        </button>
        <span className="eyebrow">Get In Touch</span>
        <ContactForm idPrefix="wcf" />
      </div>
    </div>
  );
}
