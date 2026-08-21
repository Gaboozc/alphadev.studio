// Banderas SVG minimalistas (US / MX) — evitan los emoji de bandera, que no
// renderizan en Windows y rompen la regla de "sin emoji".
export type Country = 'us' | 'mx';

export default function Flag({ country, height = 15 }: { country: Country; height?: number }) {
  const common = {
    height,
    style: { width: 'auto', display: 'block', borderRadius: 2, boxShadow: '0 0 0 1px rgba(26,21,18,0.08)' } as const,
  };

  if (country === 'mx') {
    return (
      <svg viewBox="0 0 3 2" {...common} aria-label="México">
        <rect width="3" height="2" fill="#ffffff" />
        <rect width="1" height="2" x="0" fill="#006847" />
        <rect width="1" height="2" x="2" fill="#CE1126" />
      </svg>
    );
  }

  // US
  const stripeH = 100 / 13;
  const stripes = Array.from({ length: 13 }, (_, i) => (
    <rect key={i} y={i * stripeH} width="190" height={stripeH} fill={i % 2 === 0 ? '#B22234' : '#ffffff'} />
  ));
  const stars = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 5; c++) {
      stars.push(<circle key={`${r}-${c}`} cx={9 + c * 14} cy={9 + r * 16} r="2.6" fill="#ffffff" />);
    }
  }

  return (
    <svg viewBox="0 0 190 100" {...common} aria-label="Estados Unidos">
      {stripes}
      <rect width="76" height={stripeH * 7} fill="#3C3B6E" />
      {stars}
    </svg>
  );
}
