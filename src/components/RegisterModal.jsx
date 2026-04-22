import { useState } from 'react';

export default function RegisterModal({ users, setUsers, players, setPlayers, onClose, onDone }) {
  const [form, setForm] = useState({ name: '', email: '', pw: '', role: 'player', playerName: '' });
  const [err, setErr] = useState('');

  function doReg() {
    if (!form.name.trim() || !form.email.trim() || !form.pw.trim()) {
      setErr('Udfyld alle felter.');
      return;
    }
    if (users.find(u => u.email.toLowerCase() === form.email.toLowerCase())) {
      setErr('Email er allerede i brug.');
      return;
    }

    const uid = 'u' + crypto.randomUUID();
    const newUser = { id: uid, name: form.name, role: form.role, email: form.email, password: form.pw };

    if (form.role === 'player') {
      const pid = crypto.randomUUID();
      newUser.playerId = pid;
      setPlayers(prev => [...prev, {
        id: pid,
        userId: uid,
        name: form.playerName || form.name,
        number: '',
        position: 'MID',
        rating: '',
        status: 'Ready',
        stats: { matches: 0, goals: 0, assists: 0, yellow: 0, red: 0, minutes: 0, clean: 0 }
      }]);
    }

    setUsers(prev => [...prev, newUser]);
    onDone(newUser);
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-box" onClick={e => e.stopPropagation()}>
        <div className="auth-title">Opret bruger</div>
        <div className="auth-sub">Opret din konto til Soccer Team Manager</div>
        {err && <div className="auth-err">{err}</div>}
        <div className="auth-field">
          <label htmlFor="fullname">Fulde navn</label>
          <input
            id="fullname"
            className="auth-input"
            placeholder="Dit navn"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="auth-input"
            type="email"
            placeholder="din@email.dk"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Adgangskode</label>
          <input
            id="password"
            className="auth-input"
            type="password"
            placeholder="Mindst 4 tegn"
            value={form.pw}
            onChange={e => setForm({ ...form, pw: e.target.value })}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="role">Rolle</label>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {['player', 'coach'].map(r => (
              <div
                key={r}
                id={`role-${r}`}
                onClick={() => setForm({ ...form, role: r })}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 9,
                  border: `2px solid ${form.role === r ? (r === 'coach' ? '#22c55e' : '#3b82f6') : '#334155'}`,
                  background: form.role === r ? (r === 'coach' ? '#22c55e1a' : '#3b82f61a') : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: form.role === r ? (r === 'coach' ? '#22c55e' : '#60a5fa') : '#64748b',
                  transition: 'all .15s'
                }}
              >
                {r === 'coach' ? '🎯 Coach' : '⚽ Spiller'}
              </div>
            ))}
          </div>
        </div>
        {form.role === 'player' && (
          <div className="auth-field">
            <label htmlFor="playername">Spillernavn (valgfrit)</label>
            <input
              id="playername"
              className="auth-input"
              placeholder="Navn på banen"
              value={form.playerName}
              onChange={e => setForm({ ...form, playerName: e.target.value })}
            />
          </div>
        )}
        <button className={`auth-btn auth-btn-${form.role === 'coach' ? 'green' : 'blue'}`} onClick={doReg}>Opret konto</button>
        <div className="auth-link"><span onClick={onClose}>← Tilbage til forsiden</span></div>
      </div>
    </div>
  );
}
