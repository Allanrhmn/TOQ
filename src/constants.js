export const POSITIONS = ['GK', 'DEF', 'MID', 'FWD'];

export const STATUSES = ['Ready', 'Injured', 'Suspended', 'Not in form'];

export const LOG_POSITIONS = ['GK', 'CB', 'FB', 'WB', 'DM', 'CM', 'AM', 'W', 'ST'];

export const FORMATIONS = {
  '4-4-2': {
    slots: [
      { id: 'gk', pos: 'GK', x: 50, y: 91 },
      { id: 'rb', pos: 'DEF', x: 82, y: 75 },
      { id: 'rcb', pos: 'DEF', x: 62, y: 75 },
      { id: 'lcb', pos: 'DEF', x: 38, y: 75 },
      { id: 'lb', pos: 'DEF', x: 18, y: 75 },
      { id: 'rm', pos: 'MID', x: 80, y: 54 },
      { id: 'rcm', pos: 'MID', x: 60, y: 54 },
      { id: 'lcm', pos: 'MID', x: 40, y: 54 },
      { id: 'lm', pos: 'MID', x: 20, y: 54 },
      { id: 'rs', pos: 'FWD', x: 65, y: 22 },
      { id: 'ls', pos: 'FWD', x: 35, y: 22 },
    ],
  },
  '4-3-3': {
    slots: [
      { id: 'gk', pos: 'GK', x: 50, y: 91 },
      { id: 'rb', pos: 'DEF', x: 82, y: 75 },
      { id: 'rcb', pos: 'DEF', x: 62, y: 75 },
      { id: 'lcb', pos: 'DEF', x: 38, y: 75 },
      { id: 'lb', pos: 'DEF', x: 18, y: 75 },
      { id: 'rcm', pos: 'MID', x: 67, y: 54 },
      { id: 'cm', pos: 'MID', x: 50, y: 49 },
      { id: 'lcm', pos: 'MID', x: 33, y: 54 },
      { id: 'rw', pos: 'FWD', x: 78, y: 22 },
      { id: 'st', pos: 'FWD', x: 50, y: 16 },
      { id: 'lw', pos: 'FWD', x: 22, y: 22 },
    ],
  },
  '4-2-3-1': {
    slots: [
      { id: 'gk', pos: 'GK', x: 50, y: 91 },
      { id: 'rb', pos: 'DEF', x: 82, y: 77 },
      { id: 'rcb', pos: 'DEF', x: 62, y: 77 },
      { id: 'lcb', pos: 'DEF', x: 38, y: 77 },
      { id: 'lb', pos: 'DEF', x: 18, y: 77 },
      { id: 'rdm', pos: 'MID', x: 63, y: 61 },
      { id: 'ldm', pos: 'MID', x: 37, y: 61 },
      { id: 'ram', pos: 'MID', x: 75, y: 40 },
      { id: 'cam', pos: 'MID', x: 50, y: 39 },
      { id: 'lam', pos: 'MID', x: 25, y: 40 },
      { id: 'st', pos: 'FWD', x: 50, y: 18 },
    ],
  },
  '3-5-2': {
    slots: [
      { id: 'gk', pos: 'GK', x: 50, y: 91 },
      { id: 'rcb', pos: 'DEF', x: 70, y: 75 },
      { id: 'cb', pos: 'DEF', x: 50, y: 77 },
      { id: 'lcb', pos: 'DEF', x: 30, y: 75 },
      { id: 'rwb', pos: 'MID', x: 88, y: 54 },
      { id: 'rcm', pos: 'MID', x: 67, y: 51 },
      { id: 'cm', pos: 'MID', x: 50, y: 48 },
      { id: 'lcm', pos: 'MID', x: 33, y: 51 },
      { id: 'lwb', pos: 'MID', x: 12, y: 54 },
      { id: 'rs', pos: 'FWD', x: 65, y: 22 },
      { id: 'ls', pos: 'FWD', x: 35, y: 22 },
    ],
  },
  '5-3-2': {
    slots: [
      { id: 'gk', pos: 'GK', x: 50, y: 91 },
      { id: 'rwb', pos: 'DEF', x: 88, y: 73 },
      { id: 'rcb', pos: 'DEF', x: 70, y: 77 },
      { id: 'cb', pos: 'DEF', x: 50, y: 79 },
      { id: 'lcb', pos: 'DEF', x: 30, y: 77 },
      { id: 'lwb', pos: 'DEF', x: 12, y: 73 },
      { id: 'rcm', pos: 'MID', x: 67, y: 52 },
      { id: 'cm', pos: 'MID', x: 50, y: 49 },
      { id: 'lcm', pos: 'MID', x: 33, y: 52 },
      { id: 'rs', pos: 'FWD', x: 65, y: 22 },
      { id: 'ls', pos: 'FWD', x: 35, y: 22 },
    ],
  },
};

export const PITCH_PRESETS = [
  {
    label: 'Græsbane',
    bg: 'linear-gradient(180deg,#1b5e20 0%,#2e7d32 50%,#1b5e20 100%)',
    stripe: 'rgba(0,0,0,0.08)',
  },
  {
    label: 'Klassisk',
    bg: 'linear-gradient(180deg,#166534 0%,#15803d 50%,#166534 100%)',
    stripe: 'rgba(0,0,0,0.05)',
  },
  {
    label: 'Lys grøn',
    bg: 'linear-gradient(180deg,#16a34a 0%,#22c55e 50%,#16a34a 100%)',
    stripe: 'rgba(0,0,0,0.04)',
  },
  {
    label: 'Mørkegrøn',
    bg: 'linear-gradient(180deg,#052e16 0%,#14532d 50%,#052e16 100%)',
    stripe: 'rgba(255,255,255,0.03)',
  },
  {
    label: 'Blå kunstgræs',
    bg: 'linear-gradient(180deg,#1e3a5f 0%,#1d4ed8 50%,#1e3a5f 100%)',
    stripe: 'rgba(0,0,0,0.06)',
  },
  {
    label: 'Sandfarvet',
    bg: 'linear-gradient(180deg,#92400e 0%,#b45309 50%,#92400e 100%)',
    stripe: 'rgba(0,0,0,0.05)',
  },
  {
    label: 'Nat',
    bg: 'linear-gradient(180deg,#0c0a1a 0%,#1e1b4b 50%,#0c0a1a 100%)',
    stripe: 'rgba(255,255,255,0.02)',
  },
  {
    label: 'Hvid',
    bg: 'linear-gradient(180deg,#f5f5f5 0%,#ffffff 50%,#f5f5f5 100%)',
    stripe: 'rgba(0,0,0,0.04)',
  },
];

export const PALETTE = ['#22c55e', '#3b82f6', '#eab308', '#ef4444', '#1f2937', '#9ca3af'];

export const INIT_USERS = [
  { id: 'u0', name: 'Coach Marco', role: 'coach', email: 'coach@team.dk', password: '1234' },
  { id: 'u1', name: 'Alex Turner', role: 'player', playerId: 1, email: 'alex@team.dk', password: '1234' },
  { id: 'u2', name: 'Jamie Silva', role: 'player', playerId: 2, email: 'jamie@team.dk', password: '1234' },
  { id: 'u3', name: 'Chris Morgan', role: 'player', playerId: 3, email: 'chris@team.dk', password: '1234' },
  { id: 'u4', name: 'Sam Okafor', role: 'player', playerId: 4, email: 'sam@team.dk', password: '1234' },
  { id: 'u5', name: 'Maria Santos', role: 'player', playerId: 5, email: 'maria@team.dk', password: '1234' },
];

export const INIT_PLAYERS = [
  {
    id: 1,
    userId: 'u1',
    name: 'Alex Turner',
    number: '1',
    position: 'GK',
    rating: '78',
    status: 'Ready',
    stats: { matches: 15, goals: 0, assists: 2, yellow: 1, red: 0, minutes: 1260, clean: 6 },
  },
  {
    id: 2,
    userId: 'u2',
    name: 'Jamie Silva',
    number: '5',
    position: 'DEF',
    rating: '74',
    status: 'Ready',
    stats: { matches: 14, goals: 1, assists: 3, yellow: 2, red: 0, minutes: 1180, clean: 0 },
  },
  {
    id: 3,
    userId: 'u3',
    name: 'Chris Morgan',
    number: '8',
    position: 'MID',
    rating: '81',
    status: 'Injured',
    stats: { matches: 10, goals: 2, assists: 4, yellow: 1, red: 0, minutes: 820, clean: 0 },
  },
  {
    id: 4,
    userId: 'u4',
    name: 'Sam Okafor',
    number: '10',
    position: 'FWD',
    rating: '86',
    status: 'Ready',
    stats: { matches: 15, goals: 8, assists: 5, yellow: 2, red: 0, minutes: 1240, clean: 0 },
  },
  {
    id: 5,
    userId: 'u5',
    name: 'Maria Santos',
    number: '7',
    position: 'MID',
    rating: '79',
    status: 'Ready',
    stats: { matches: 13, goals: 3, assists: 6, yellow: 0, red: 0, minutes: 1020, clean: 0 },
  },
];

export const INIT_MESSAGES = [
  {
    id: 1,
    from: 'u0',
    fromName: 'Coach Marco',
    to: 'all',
    subject: 'Træning torsdag',
    body: 'Husk træning torsdag kl. 18:30. Mød op i fuld udstyr. Vi arbejder på sætstykker og pressing denne uge — god forberedelse til søndagens kamp.',
    date: '2026-03-28',
    readBy: ['u0'],
  },
  {
    id: 2,
    from: 'u0',
    fromName: 'Coach Marco',
    to: 'u3',
    subject: 'Skadesupdate',
    body: 'Chris, hvornår forventer du at være klar til spil igen? Skriv gerne til mig med en opdatering fra din fysioterapeut. Vi holder tomlen oppe!',
    date: '2026-03-29',
    readBy: ['u0'],
  },
  {
    id: 3,
    from: 'u4',
    fromName: 'Sam Okafor',
    to: 'u0',
    subject: 'Forespørgsel om kampposition',
    body: 'Hej coach, kan vi snakke om min position i næste kamp? Jeg tror jeg spiller bedst på venstre wing frem for central angriber. Hvad tænker du?',
    date: '2026-03-30',
    readBy: ['u4'],
  },
];

export const INIT_NOTIFS = {
  u0: [
    { id: 1, msg: 'Sam Okafor sendte dig en besked', type: 'message', date: '2026-03-30', read: false },
    { id: 2, msg: 'Chris Morgan opdateret til Skadet', type: 'alert', date: '2026-03-28', read: false },
  ],
  u1: [
    { id: 1, msg: 'Coach: Ny holdbesked modtaget', type: 'message', date: '2026-03-28', read: false },
    { id: 2, msg: 'Ny kamp: 6. april vs FC Aarhus', type: 'match', date: '2026-03-27', read: true },
  ],
  u2: [{ id: 1, msg: 'Coach: Ny holdbesked modtaget', type: 'message', date: '2026-03-28', read: false }],
  u3: [
    { id: 1, msg: 'Coach sendte dig en personlig besked', type: 'message', date: '2026-03-29', read: false },
    { id: 2, msg: 'Coach: Ny holdbesked modtaget', type: 'message', date: '2026-03-28', read: true },
  ],
  u4: [{ id: 1, msg: 'Træning torsdag kl. 18:30', type: 'training', date: '2026-03-28', read: false }],
  u5: [{ id: 1, msg: 'Coach: Ny holdbesked modtaget', type: 'message', date: '2026-03-28', read: false }],
};
