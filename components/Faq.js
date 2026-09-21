"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { FAQS } from "@/lib/faqData";
import { Plus, Close } from "./Icons";

export default function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section className="section faq" id="faq">
      <div className="container faq-grid">
        <div className="faq-left reveal" data-anim="left">
          <span className="eyebrow">FAQs</span>
          <h2 className="section-title">
            Frequently Asked
            <br />
            <span className="accent">Questions</span>
          </h2>
          <SmartImage
            src={IMG.faqCouple}
            alt="Couple consulting Dr. Jyoti Gupta about pregnancy and fertility care in Greater Noida"
            className="faq-photo masked-clover"
          />
        </div>

        <div className="faq-list reveal" data-anim="right">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
                <div
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  role="button"
                  tabIndex={0}
                  id={`faq-question-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpen(isOpen ? -1 : i);
                    }
                  }}
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle">
                    {isOpen ? <Close /> : <Plus />}
                  </span>
                </div>
                <div
                  className="faq-a"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                >
                  {/* Open/closed is driven entirely by `.faq-item.open` in
                      CSS now — no inline max-height, so a long answer can
                      never be clipped. */}
                  <div className="faq-a-clip">
                    <p className="faq-a-inner">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
