"use client";

import { useState } from "react";
import { Plus, Close } from "../Icons";

export default function ArticleFAQ({ faq }) {
  const [open, setOpen] = useState(-1);
  if (!faq || faq.length === 0) return null;

  return (
    <div className="article-faq">
      <h2 className="section-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
              <div
                className="faq-q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                role="button"
                tabIndex={0}
                id={`article-faq-question-${i}`}
                aria-expanded={isOpen}
                aria-controls={`article-faq-answer-${i}`}
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
                id={`article-faq-answer-${i}`}
                role="region"
                aria-labelledby={`article-faq-question-${i}`}
                style={{ maxHeight: isOpen ? "400px" : "0" }}
              >
                <p className="faq-a-inner">{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
