/* Lightweight inline SVG icon set — stroke inherits currentColor */
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const Search = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const Phone = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const ArrowUp = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M12 19V5" />
    <path d="M6 11l6-6 6 6" />
  </svg>
);

export const Menu = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ChevronDown = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const HeartHands = (p) => (
  <svg viewBox="0 0 24 24" width="28" height="28" {...base} {...p}>
    <path d="M12 8.5c1.2-2 4.5-1.6 4.5 1 0 2-2.6 3.8-4.5 5-1.9-1.2-4.5-3-4.5-5 0-2.6 3.3-3 4.5-1z" />
    <path d="M4 14l3 3 5 3 5-3 3-3" />
    <path d="M3 14v3M21 14v3" />
  </svg>
);

export const Microscope = (p) => (
  <svg viewBox="0 0 24 24" width="28" height="28" {...base} {...p}>
    <path d="M6 18h12" />
    <path d="M9 18a5 5 0 0 0 5-5" />
    <path d="M8 4l3.5 2-2 3.5L6 7.5z" />
    <path d="M11.5 6L15 12" />
    <path d="M4 21h9" />
  </svg>
);

export const Stethoscope = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...p}>
    <path d="M5 3v6a4 4 0 0 0 8 0V3" />
    <path d="M5 3H3M13 3h2" />
    <path d="M9 13v3a5 5 0 0 0 10 0v-2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

export const Baby = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...p}>
    <circle cx="12" cy="7" r="3" />
    <path d="M10 6.5h.01M14 6.5h.01M10.5 9c1 .6 2 .6 3 0" />
    <path d="M7 21v-4a5 5 0 0 1 10 0v4" />
  </svg>
);

export const MedKit = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M12 11v5M9.5 13.5h5" />
  </svg>
);

export const UserDoc = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
    <path d="M12 12v3M10.5 13.5h3" />
  </svg>
);

export const Growth = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}>
    <path d="M4 18L10 12l4 4 6-7" />
    <path d="M20 9v4M20 9h-4" />
  </svg>
);

export const Files = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...p}>
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <path d="M9 9h6M9 13h6M9 17h3" />
  </svg>
);

export const Flask = (p) => (
  <svg viewBox="0 0 24 24" width="34" height="34" {...base} {...p}>
    <path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-8V3" />
    <path d="M7.5 14h9" />
    <circle cx="10" cy="16.5" r="0.6" fill="currentColor" />
    <circle cx="13.5" cy="18" r="0.6" fill="currentColor" />
  </svg>
);

export const Dna = (p) => (
  <svg viewBox="0 0 24 24" width="40" height="40" {...base} {...p}>
    <path d="M7 3c0 5 10 6 10 11S7 20 7 21" />
    <path d="M17 3c0 5-10 6-10 11s10 5 10 6" />
    <path d="M8 6h8M8.5 9h7M8.5 15h7M8 18h8" />
  </svg>
);

export const Location = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Send = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </svg>
);

export const Plus = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} strokeWidth="2" {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Close = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} strokeWidth="2" {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Facebook = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1z" />
  </svg>
);

export const Twitter = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.3 11.3 0 0 1 3.8 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.7-.5a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.1 11.3 11.3 0 0 0 8.1 20c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.1z" />
  </svg>
);

export const Instagram = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

export const Youtube = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15V9l5 3z" />
  </svg>
);

export const LinkedIn = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...p}>
    <path d="M6.5 8A1.5 1.5 0 1 0 6.5 5a1.5 1.5 0 0 0 0 3zM5 9.5h3V19H5zM10 9.5h2.9v1.3h.05c.4-.75 1.4-1.55 2.85-1.55 3 0 3.6 2 3.6 4.5V19h-3v-4.3c0-1 0-2.3-1.5-2.3s-1.7 1.1-1.7 2.2V19H10z" />
  </svg>
);

export const Milestone = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.2 2.2L16 9.5" />
  </svg>
);

export const Pregnant = (p) => (
  <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...p}>
    <circle cx="12" cy="5" r="2" />
    <path d="M11 8c-1 1-2 3-2 6 2 1 2 1 2 3v4" />
    <path d="M11 11c2 0 4 1 4 3.5S13 18 11 18" />
  </svg>
);

export const Clock = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
