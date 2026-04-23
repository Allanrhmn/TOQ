import { useState } from 'react';

export default function LoginModal({ role, users, onLogin, onClose, onSwitch }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  function doLogin() {
    const u = users.find(x => x.email.toLowerCase() === email.toLowerCase() && x.password === pw && x.role === role);
    if (!u) {
      setErr('Forkert email eller adgangskode.');
      return;
    }
    onLogin(u);
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-box" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className={`rbadge rbadge-${role}`}>{role === 'coach' ? '🎯 Coach' : '⚽ Spiller'}</div>
        <div className="auth-title" id="auth-title">Velkommen tilbage</div>
        <div className="auth-sub">Log ind på dit {role === 'coach' ? 'coach' : 'spiller'}-dashboard</div>
        {err && <div className="auth-err" role="alert">{err}</div>}
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="auth-input"
            type="email"
            placeholder="din@email.dk"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setErr('');
            }}
            onKeyDown={e => e.key === 'Enter' && doLogin()}
            autoFocus
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Adgangskode</label>
          <input
            id="password"
            className="auth-input"
            type="password"
            placeholder="••••••••"
            value={pw}
            onChange={e => {
              setPw(e.target.value);
              setErr('');
            }}
            onKeyDown={e => e.key === 'Enter' && doLogin()}
          />
        </div>
        <button className={`auth-btn auth-btn-${role === 'coach' ? 'green' : 'blue'}`} onClick={doLogin}>Log ind</button>
        <div className="auth-link"><button className="btn btn-link" onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', padding: 0, cursor: 'pointer', fontSize: 'inherit' }}>← Tilbage</button> · Ingen konto? <button className="btn btn-link" onClick={onSwitch} style={{ background: 'none', border: 'none', color: 'var(--green)', padding: 0, cursor: 'pointer', fontSize: 'inherit' }}>Opret bruger</button></div>
      </div>
    </div>
  );
}
