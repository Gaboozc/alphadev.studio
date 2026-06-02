export default function AlphaDevWordmark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-7 w-auto ${className}`}
      aria-label="AlphaDev Studios"
    >
      {/* "Alpha" in Playfair-style serif strokes */}
      <text
        x="0"
        y="27"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="26"
        fill="#1A1512"
        letterSpacing="-0.5"
      >
        Alpha
      </text>
      {/* "Dev" in lighter weight + gold */}
      <text
        x="84"
        y="27"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="400"
        fontSize="26"
        fill="#9A7235"
        letterSpacing="-0.5"
      >
        Dev
      </text>
      {/* Thin gold underline accent */}
      <line x1="0" y1="33" x2="148" y2="33" stroke="#C9A465" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
