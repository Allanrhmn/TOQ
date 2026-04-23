import { memo } from 'react';

function LandingPage({ onCoach, onPlayer, onRegister }) {
  const features = [
    { icon: '👥', title: 'Holdoversigt', desc: 'Administrér spillere, positioner og status i ét overblik' },
    { icon: '🏟️', title: 'Opstilling', desc: 'Visuel opstillings-builder med 5 formationer og 3 udkast' },
    { icon: '⚽', title: 'Taktiktavle', desc: 'Tegn sætstykker og øvelser direkte på en interaktiv bane' },
    { icon: '📅', title: 'Program', desc: 'Ugentlig kalender med kampe, træning og møder' },
    { icon: '💬', title: 'Beskeder', desc: 'Direkte kommunikation mellem coach og spillere' },
    { icon: '📊', title: 'Statistik', desc: 'Mål, assists, minutter og karakterer for hver spiller' },
  ];

  return (
    <div className="landing">
      <div className="landing-nav">
        <div className="landing-logo">⚽ TeamManager</div>
        <div style={{ fontSize: '0.78rem', color: '#475569' }}>v2.0 — Coach + Player Edition</div>
      </div>
      <div className="landing-hero">
        <div style={{ fontSize: '4.5rem', marginBottom: 12 }}>⚽</div>
        <div className="landing-title">Soccer Team Manager</div>
        <div className="landing-sub">Alt hvad din klub behøver — kampplanlægning, holdoversigt, taktik og direkte kommunikation mellem coach og spillere.</div>
        <div className="landing-btns">
          <button className="lbtn lbtn-coach" onClick={onCoach}>🎯 Login som Coach</button>
          <button className="lbtn lbtn-player" onClick={onPlayer}>⚽ Login som Spiller</button>
          <button className="lbtn lbtn-register" onClick={onRegister}>＋ Opret bruger</button>
        </div>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="fcard">
              <div className="fcard-icon">{f.icon}</div>
              <div className="fcard-title">{f.title}</div>
              <div className="fcard-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(LandingPage);
