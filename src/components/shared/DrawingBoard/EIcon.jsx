import JerseyIcon from '../JerseyIcon';

export default function EIcon({ sub, color, small, num }) {
  const c = color || '#22c55e';
  const sz = small ? 18 : 26;

  switch (sub) {
    case 'filled-square':
      return <svg width={sz} height={sz} viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" fill={c} rx="2" /></svg>;
    case 'outline-square':
      return <svg width={sz} height={sz} viewBox="0 0 24 24"><rect x="1.5" y="1.5" width="21" height="21" fill="none" stroke={c} strokeWidth="2.5" rx="2" /></svg>;
    case 'shape-circle':
      return <svg width={sz} height={sz} viewBox="0 0 26 26"><circle cx="13" cy="13" r="11" fill="none" stroke={c} strokeWidth="2.5" /></svg>;
    case 'ball':
      return <svg width={small ? 22 : 28} height={small ? 22 : 28} viewBox="0 0 28 28"><circle cx="14" cy="14" r="12.5" fill="white" stroke="#374151" strokeWidth="1.5" /><circle cx="14" cy="14" r="5" fill="none" stroke="#374151" strokeWidth="1.2" /><circle cx="14" cy="5" r="2" fill="#374151" opacity="0.5" /><circle cx="14" cy="23" r="2" fill="#374151" opacity="0.5" /></svg>;
    case 'small-dot':
      return <svg width={small ? 14 : 18} height={small ? 14 : 18} viewBox="0 0 18 18"><circle cx="9" cy="9" r="7.5" fill={c} /></svg>;
    case 'cone':
      return <svg width={small ? 18 : 22} height={small ? 18 : 22} viewBox="0 0 24 24"><polygon points="12,2 22,21 2,21" fill={c} /></svg>;
    case 'big-goal':
      return <svg width={small ? 36 : 46} height={small ? 16 : 20} viewBox="0 0 46 20"><rect x="1" y="1" width="44" height="18" fill="rgba(150,150,150,0.1)" stroke="#374151" strokeWidth="2" rx="1" /></svg>;
    case 'small-goal':
      return <svg width={small ? 24 : 32} height={small ? 13 : 17} viewBox="0 0 32 17"><rect x="1" y="1" width="30" height="15" fill="rgba(150,150,150,0.1)" stroke="#374151" strokeWidth="2" rx="1" /></svg>;
    case 'hurdle':
      return <svg width={small ? 26 : 34} height={small ? 18 : 24} viewBox="0 0 34 24"><line x1="4" y1="24" x2="4" y2="8" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" /><line x1="30" y1="24" x2="30" y2="8" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" /><line x1="1" y1="8" x2="33" y2="8" stroke="#374151" strokeWidth="3" strokeLinecap="round" /></svg>;
    case 'ladder':
      return <svg width={small ? 28 : 36} height={small ? 18 : 24} viewBox="0 0 36 24"><line x1="2" y1="1" x2="2" y2="23" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" /><line x1="34" y1="1" x2="34" y2="23" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" />{[5, 11, 17].map(y => <line key={y} x1="2" y1={y} x2="34" y2={y} stroke="#374151" strokeWidth="2" strokeLinecap="round" />)}</svg>;
    case 'player-outline':
      return <svg width={sz} height={sz} viewBox="0 0 28 28"><circle cx="14" cy="14" r="11.5" fill="none" stroke={c} strokeWidth="2.5" /></svg>;
    case 'player-bib':
      return <svg width={sz} height={sz} viewBox="0 0 28 28"><circle cx="14" cy="14" r="11.5" fill="none" stroke={c} strokeWidth="2.5" /><path d="M6 12.5 Q14 6.5 22 12.5" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" /></svg>;
    case 'player-filled':
      return <svg width={sz} height={sz} viewBox="0 0 28 28"><circle cx="14" cy="14" r="11.5" fill={c} /></svg>;
    case 'player-x':
      return <svg width={sz} height={sz} viewBox="0 0 28 28"><circle cx="14" cy="14" r="11.5" fill="none" stroke={c} strokeWidth="2.5" /><line x1="9" y1="9" x2="19" y2="19" stroke={c} strokeWidth="2" /><line x1="19" y1="9" x2="9" y2="19" stroke={c} strokeWidth="2" /></svg>;
    case 'arr-solid':
      return <svg width={small ? 46 : 58} height={small ? 12 : 16} viewBox="0 0 58 16"><line x1="2" y1="8" x2="48" y2="8" stroke={c} strokeWidth="2" /><polygon points="56,8 46,3.5 46,12.5" fill={c} /></svg>;
    case 'arr-dashed':
      return <svg width={small ? 46 : 58} height={small ? 12 : 16} viewBox="0 0 58 16"><line x1="2" y1="8" x2="48" y2="8" stroke={c} strokeWidth="2" strokeDasharray="6,3" /><polygon points="56,8 46,3.5 46,12.5" fill={c} /></svg>;
    case 'arr-wavy':
      return <svg width={small ? 46 : 58} height={small ? 16 : 20} viewBox="0 0 58 20"><path d="M2 10 Q7 3 14 10 Q21 17 28 10 Q35 3 42 10 Q47 17 48 10" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" /><polygon points="56,10 46,5.5 46,14.5" fill={c} /></svg>;
    case 'arr-line':
      return <svg width={small ? 46 : 58} height={small ? 12 : 16} viewBox="0 0 58 16"><line x1="2" y1="8" x2="56" y2="8" stroke={c} strokeWidth="2" strokeDasharray="6,3" /></svg>;
    case 'player-jersey':
      return <JerseyIcon number={num} color={c} small={small} />;
    default:
      return <svg width={sz} height={sz} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill={c} /></svg>;
  }
}
