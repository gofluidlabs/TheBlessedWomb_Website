"use client";

import { ArrowUp } from "./Icons";

export default function BackToTop() {
  return (
    <button
      className="to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp />
    </button>
  );
}
