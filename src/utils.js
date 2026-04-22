export const posColor = (p) => {
  if (p === 'GK') return '#fbbf24';
  if (p === 'DEF') return '#60a5fa';
  if (p === 'MID') return '#22c55e';
  return '#f87171';
};

export const initials = (n) => {
  return n
    .split(' ')
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase()
    .slice(0, 3) || '?';
};

export const statusDot = (s) => {
  const statusColors = {
    Ready: '#22c55e',
    Injured: '#f87171',
    Suspended: '#fbbf24',
    'Not in form': '#94a3b8',
  };
  return statusColors[s] || '#64748b';
};

export const makeDraft = () => ({
  formation: '4-4-2',
  lineup: {},
  inPoss: '',
  outPoss: '',
});

export const fmtDate = (d) => {
  try {
    return new Date(d).toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return d;
  }
};

export const getName = (uid, users) => {
  const user = users.find((u) => u.id === uid);
  return user ? user.name : '';
};

export const getToLabel = (to, users) => {
  if (to === 'all') return 'Hele holdet';
  const user = users.find((u) => u.id === to);
  return user ? user.name : to;
};
