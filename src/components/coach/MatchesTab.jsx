import { useState } from 'react';
import { fmtDate } from '../../utils';

export const MatchesTab = ({ teamName, matches, setMatches }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    opponent: '',
    goalsFor: '',
    goalsAgainst: '',
    date: new Date().toISOString().slice(0, 10),
    venue: 'Home',
    notes: '',
  });

  const addMatch = () => {
    if (!form.opponent.trim()) return;
    const gf = parseInt(form.goalsFor) || 0;
    const ga = parseInt(form.goalsAgainst) || 0;
    const result = gf > ga ? 'W' : gf < ga ? 'L' : 'D';
    setMatches((prev) => [
      {
        id: crypto.randomUUID(),
        ...form,
        goalsFor: gf,
        goalsAgainst: ga,
        result,
      },
      ...prev,
    ]);
    setForm({
      opponent: '',
      goalsFor: '',
      goalsAgainst: '',
      date: new Date().toISOString().slice(0, 10),
      venue: 'Home',
      notes: '',
    });
    setShowForm(false);
  };

  const W = matches.filter((m) => m.result === 'W').length;
  const D = matches.filter((m) => m.result === 'D').length;
  const L = matches.filter((m) => m.result === 'L').length;
  const gf = matches.reduce((s, m) => s + m.goalsFor, 0);
  const ga = matches.reduce((s, m) => s + m.goalsAgainst, 0);

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-4">
        <div className="page-title" style={{ margin: 0 }}>
          📋 Kampe
        </div>
        <button className="btn btn-green" onClick={() => setShowForm(true)}>
          ＋ Log kamp
        </button>
      </div>
      {matches.length > 0 && (
        <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
          {[
            ['W', 'Vundet', '#22c55e'],
            ['-', 'Kampe', null],
            ['D', 'Uafgjort', '#fbbf24'],
            ['L', 'Tabt', '#f87171'],
          ].map(([k, l, c], i) => (
            <div key={i} className="stat-card">
              <div className="stat-num" style={c ? { color: c } : {}}>
                {k === '-' ? matches.length : k === 'W' ? W : k === 'D' ? D : L}
              </div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
          <div className="stat-card">
            <div className="stat-num">{gf}</div>
            <div className="stat-label">Mål scoret</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{ga}</div>
            <div className="stat-label">Mål imod</div>
          </div>
        </div>
      )}
      {matches.length === 0 ? (
        <div className="empty-state">Ingen kampe endnu — log din første kamp!</div>
      ) : (
        <div className="match-grid">
          {matches.map((m) => (
            <div key={m.id} className="match-card">
              <div className="flex items-center justify-between">
                <span className={`match-result result-${m.result}`}>
                  {m.result === 'W' ? 'VUNDET' : m.result === 'D' ? 'UAFGJORT' : 'TABT'}
                </span>
                <span style={{ fontSize: '0.68rem', color: '#475569' }}>
                  {m.venue === 'Home' ? 'Hjemme' : m.venue === 'Away' ? 'Ude' : 'Neutral'}
                </span>
                <button
                  className="btn-icon"
                  style={{ color: '#f87171', fontSize: '0.72rem' }}
                  onClick={() => {
                    if (window.confirm('Slet denne kamp?')) {
                      setMatches((prev) => prev.filter((x) => x.id !== m.id));
                    }
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="flex items-center justify-center gap-3" style={{ margin: '8px 0' }}>
                <span className="match-score-num">{m.goalsFor}</span>
                <span style={{ color: '#475569' }}>–</span>
                <span className="match-score-num">{m.goalsAgainst}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '0.76rem' }}>
                <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{teamName || 'Dit hold'}</span>
                <span style={{ color: '#94a3b8' }}>{m.opponent}</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#475569', marginTop: 4 }}>
                📅 {fmtDate(m.date)}
              </div>
              {m.notes && (
                <div style={{ marginTop: 5, fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic' }}>
                  "{m.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">Log en kamp</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div className="form-group">
                <label htmlFor="match-opponent">Modstander</label>
                <input
                  id="match-opponent"
                  className="form-input"
                  placeholder="Modstander hold"
                  value={form.opponent}
                  onChange={(e) => setForm({ ...form, opponent: e.target.value })}
                />
              </div>
              <div className="flex gap-3">
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="match-goalsFor">Dine mål</label>
                  <input
                    id="match-goalsFor"
                    className="form-input"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.goalsFor}
                    onChange={(e) => setForm({ ...form, goalsFor: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="match-goalsAgainst">Deres mål</label>
                  <input
                    id="match-goalsAgainst"
                    className="form-input"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.goalsAgainst}
                    onChange={(e) => setForm({ ...form, goalsAgainst: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="match-date">Dato</label>
                  <input
                    id="match-date"
                    className="form-input"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="match-venue">Venue</label>
                  <select
                    id="match-venue"
                    className="form-select"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  >
                    <option value="Home">Hjemme</option>
                    <option value="Away">Ude</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="match-notes">Noter</label>
                <input
                  id="match-notes"
                  className="form-input"
                  placeholder="Kampnoter…"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>
                Annuller
              </button>
              <button className="btn btn-green" onClick={addMatch}>
                Gem kamp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
