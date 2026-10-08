"use client";

import { useState } from "react";
import { Plus, Close } from "../Icons";

export default function ArticleFAQ({ faq, title = "Frequently Asked Questions" }) {
  const [open, setOpen] = useState(-1);
  if (!faq || faq.length === 0) return null;

  return (
    <div className="article-faq">
      <h2 className="section-title">{title}</h2>
      <div className="faq-list">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}>
              {/* Each question is a real <h3> wrapping the toggle button, so
                  crawlers and assistants read the questions as headings
                  (not anonymous divs) and keyboard/screen-reader users get
                  a native button. */}
              <h3 className="faq-q-heading">
                <button
                  type="button"
                  className="faq-q"
                  id={`article-faq-question-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`article-faq-answer-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle">
                    {isOpen ? <Close /> : <Plus />}
                  </span>
                </button>
              </h3>
              <div
                className="faq-a"
                id={`article-faq-answer-${i}`}
                role="region"
                aria-labelledby={`article-faq-question-${i}`}
              >
                <div className="faq-a-clip">
                  <p className="faq-a-inner">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
