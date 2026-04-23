import { memo } from 'react';

function JerseyIcon({ number, color, small, dim }) {
  const c = color || '#22c55e';
  const w = small ? 20 : 32;
  const h = small ? 24 : 38;
  const num = String(number != null && number !== '' ? number : '?');
  const fs = num.length > 2 ? (small ? 5 : 8.5) : num.length > 1 ? (small ? 7 : 11) : (small ? 9.5 : 14);
  const op = dim ? 0.55 : 1;

  return (
    <svg width={w} height={h} viewBox="0 0 32 38" style={{ display: 'block', opacity: op, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.4))' }}>
      <path d="M11 4 L2 12.5 L9 16 L9 35 L23 35 L23 16 L30 12.5 L21 4 Q18 1 16 2.5 Q14 1 11 4Z" fill={c} stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <path d="M11 4 Q14 1 16 2.5 Q18 1 21 4" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M9 16 L9 15 Q8.5 11 9.5 9 L2 12.5Z" fill="rgba(0,0,0,0.15)" />
      <path d="M23 16 L23 15 Q23.5 11 22.5 9 L30 12.5Z" fill="rgba(0,0,0,0.15)" />
      <rect x="10" y="15" width="12" height="13" rx="1" fill="rgba(255,255,255,0.08)" />
      <text
        x="16"
        y="25.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={fs}
        fontWeight="900"
        fontFamily="'Segoe UI',Arial,sans-serif"
        paintOrder="stroke"
        stroke="rgba(0,0,0,0.5)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      >
        {num}
      </text>
    </svg>
  );
}

export default memo(JerseyIcon);
