export default function PitchSVG({ isHalfPitch }) {
  const st = '#94a3b8';
  const sw = 0.65;
  const da = '2.5,1.8';

  if (isHalfPitch) {
    return (
      <g stroke={st} strokeWidth={sw} fill="none">
        <rect x="5" y="3" width="90" height="94" />
        <rect x="18" y="3" width="64" height="30" />
        <rect x="30" y="3" width="40" height="13" />
        <path d="M23 33 Q50 48 77 33" strokeDasharray={da} />
      </g>
    );
  }

  return (
    <g stroke={st} strokeWidth={sw} fill="none">
      <rect x="7" y="3" width="86" height="94" />
      <line x1="7" y1="50" x2="93" y2="50" strokeDasharray={da} />
      <ellipse cx="50" cy="50" rx="9" ry="9.7" />
      <circle cx="50" cy="50" r="0.9" fill={st} stroke="none" />
      <rect x="22" y="3" width="56" height="19" />
      <rect x="33" y="3" width="34" height="9" />
      <rect x="22" y="78" width="56" height="19" />
      <rect x="33" y="88" width="34" height="9" />
    </g>
  );
}
