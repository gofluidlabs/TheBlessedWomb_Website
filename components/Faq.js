"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import { IMG } from "@/lib/images";
import { Plus, Close } from "./Icons";

const FAQS = [
  {
    q: "How much does IVF treatment typically cost overall?",
    a: "Costs vary based on your personalised plan, the number of cycles and any additional procedures. Our team provides a transparent breakdown before you begin so there are no surprises.",
  },
  {
    q: "What emotional support resources are available for patients?",
    a: "Treatment can be an emotional journey, and your well-being is just as important as your medical care. Our team provides compassionate guidance, personalized support and open communication throughout every stage.",
  },
  {
    q: "What is the difference between IVF and IUI?",
    a: "IUI places prepared sperm directly into the uterus, while IVF fertilises eggs in the lab before transferring an embryo. We help you choose the option best suited to your situation.",
  },
  {
    q: "How do you personalize every fertility treatment plan?",
    a: "Every plan starts with a thorough assessment of your history and goals, then we tailor medication, monitoring and procedures specifically to your unique needs.",
  },
  {
    q: "Can IVF help couples with unexplained infertility issues?",
    a: "Yes. IVF is often an effective path for couples facing unexplained infertility, giving our specialists greater insight and control over the fertilisation process.",
  },
];

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
            alt="Happy couple"
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
                  onKeyDown={(e) =>
                    e.key === "Enter" && setOpen(isOpen ? -1 : i)
                  }
                >
                  <span>{item.q}</span>
                  <span className="faq-toggle">
                    {isOpen ? <Close /> : <Plus />}
                  </span>
                </div>
                <div
                  className="faq-a"
                  style={{ maxHeight: isOpen ? "240px" : "0" }}
                >
                  <p className="faq-a-inner">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
