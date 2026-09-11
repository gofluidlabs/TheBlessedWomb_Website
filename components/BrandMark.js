export default function BrandMark({ size = 46, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bm-coral" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ec9689" />
          <stop offset="1" stopColor="#de7a6a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="#fdf5f2" />
      <path
        d="M32 8c-9 6-15 14-15 24 0 9 6 16 15 18 2-9-1-15-6-20 7 2 12 8 12 17 8-4 12-11 12-19C50 20 42 13 32 8z"
        fill="url(#bm-coral)"
      />
      <path
        d="M32 8c9 6 15 14 15 24 0 9-6 16-15 18-2-9 1-15 6-20-7 2-12 8-12 17-8-4-12-11-12-19C14 20 22 13 32 8z"
        fill="#3b2a4d"
        opacity="0.85"
      />
    </svg>
  );
}
