import { useState } from 'react';
import { LOG_POSITIONS } from '../../constants';

export default function MinutesLogTab({ players, seasons, setSeasons }) {
  const [actSeason, setActSeason] = useState(0);
  const [showLog, setShowLog] = useState(false);
  const [showSeasonModal, setShowSeasonModal] = useState(false);
  const [newSeasonName, setNewSeasonName] = useState('');
  const [mForm, setMForm] = useState({
    opponent: '',
    date: new Date().toISOString().slice(0, 10),
    entries: {},
  });

  const season = seasons[actSeason];

  const getStats = (pid) => {
    const stats = {}
    LOG_POSITIONS.forEach((p) => (stats[p] = 0));
    let apps = 0;
    season.matches.forEach((m) => {
      const e = m.entries[pid];
      if (e && e.played) {
        apps++;
        if (e.logPos) stats[e.logPos] = (stats[e.logPos] || 0) + 1;
      }
    });
    return { stats, apps }
  }

  const openLogMatch = () => {
    const entries = {}
    players.forEach((p) => (entries[p.id] = { played: false, logPos: '' }));
    setMForm({
      opponent: '',
      date: new Date().toISOString().slice(0, 10),
      entries,
    });
    setShowLog(true);
  }

  const saveMatch = () => {
    if (!mForm.opponent.trim()) return;
    setSeasons((prev) =>
      prev.map((s, i) =>
        i === actSeason
          ? {
              ...s,
              matches: [{ id: crypto.randomUUID(), ...mForm }, ...s.matches],
            }
          : s
      )
    );
    setShowLog(false);
  }

  const addSeason = () => {
    if (!newSeasonName.trim()) return;
    setSeasons((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: newSeasonName, matches: [] },
    ]);
    setNewSeasonName('');
    setShowSeasonModal(false);
  }

  return (
    <div className="page">
      <div className="flex items-center justify-between mb-4">
        <div className="page-title" style={{ margin: 0 }}>
          ⏱️ Minutlog
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setShowSeasonModal(true)}
          >
            ＋ Sæson
          </button>
          <button className="btn btn-green" onClick={openLogMatch}>
            + Log kamp
          </button>
        </div>
      </div>
      {seasons.length > 1 && (
        <div className="flex gap-2 mb-4">
          {seasons.map((s, i) => (
            <button
              key={s.id}
              className={`btn btn-sm ${
                actSeason === i ? 'btn-green' : 'btn-outline'
              }`}
              onClick={() => setActSeason(i)}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}
      {season.matches.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            Ingen kampe logget endnu — tryk "+ Log kamp"
          </div>
        </div>
      ) : (
        <div className="card mb-4" style={{ overflowX: 'auto' }}>
          <div className="card-title">{season.name}</div>
          <table className="min-table">
            <thead>
              <tr>
                <th>Spiller</th>
                <th>Kampe</th>
                {LOG_POSITIONS.map((p) => (
                  <th key={p}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {players.map((p) => {
                const { stats, apps } = getStats(p.id);
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <span style={{ color: '#475569', width: 18, fontSize: '0.7rem' }}>
                          {p.number || '–'}
                        </span>
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                        <span className={`pos-badge pos-${p.position}`}>
                          {p.position}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: '#22c55e', fontWeight: 700 }}>
                        {apps || '–'}
                      </span>
                    </td>
                    {LOG_POSITIONS.map((pos) => (
                      <td key={pos}>
                        <span
                          style={{
                            color:
                              stats[pos] > 0
                                ? '#e2e8f0'
                                : '#334155',
                            fontWeight:
                              stats[pos] > 0
                                ? 600
                                : 400,
                          }}
                        >
                          {stats[pos] || '–'}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {showLog && (
        <div className="modal-overlay" onClick={() => setShowLog(false)}>
          <div
            className="modal modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-title">Log en kamp</div>
            <div className="form-row mb-4">
              <div className="form-group">
                <label htmlFor="minutes-opponent">Modstander</label>
                <input
                  id="minutes-opponent"
                  className="form-input"
                  style={{ width: 195 }}
                  placeholder="Holdnavn"
                  value={mForm.opponent}
                  onChange={(e) =>
                    setMForm({ ...mForm, opponent: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="minutes-date">Dato</label>
                <input
                  id="minutes-date"
                  className="form-input"
                  type="date"
                  value={mForm.date}
                  onChange={(e) =>
                    setMForm({ ...mForm, date: e.target.value })
                  }
                />
              </div>
            </div>
            <div style={{ maxHeight: 310, overflowY: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.8rem',
                }}
              >
                <thead>
                  <tr style={{ color: '#64748b', fontSize: '0.65rem' }}>
                    <th style={{ textAlign: 'left', padding: '5px 8px' }}>
                      Spiller
                    </th>
                    <th style={{ padding: '5px 8px' }}>Spillede</th>
                    <th style={{ padding: '5px 8px' }}>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p) => {
                    const entry = mForm.entries[p.id] || {
                      played: false,
                      logPos: '',
                    }
                    return (
                      <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '7px 8px', fontWeight: 600 }}>
                          {p.name}{' '}
                          <span className={`pos-badge pos-${p.position}`}>
                            {p.position}
                          </span>
                        </td>
                        <td style={{ padding: '7px 8px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={entry.played || false}
                            onChange={(e) =>
                              setMForm((prev) => ({
                                ...prev,
                                entries: {
                                  ...prev.entries,
                                  [p.id]: {
                                    ...entry,
                                    played: e.target.checked,
                                  },
                                },
                              }))
                            }
                            style={{
                              width: 16,
                              height: 16,
                              cursor: 'pointer',
                              accentColor: '#22c55e',
                            }}
                          />
                        </td>
                        <td style={{ padding: '7px 8px', textAlign: 'center' }}>
                          {entry.played && (
                            <select
                              className="form-select"
                              style={{
                                fontSize: '0.72rem',
                                padding: '3px 6px',
                              }}
                              value={entry.logPos}
                              onChange={(e) =>
                                setMForm((prev) => ({
                                  ...prev,
                                  entries: {
                                    ...prev.entries,
                                    [p.id]: {
                                      ...entry,
                                      logPos: e.target.value,
                                    },
                                  },
                                }))
                              }
                            >
                              <option value="">– pos –</option>
                              {LOG_POSITIONS.map((pos) => (
                                <option key={pos}>{pos}</option>
                              ))}
                            </select>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowLog(false)}
              >
                Annuller
              </button>
              <button className="btn btn-green" onClick={saveMatch}>
                Gem kamp
              </button>
            </div>
          </div>
        </div>
      )}
      {showSeasonModal && (
        <div className="modal-overlay" onClick={() => setShowSeasonModal(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-title">Tilføj sæson</div>
            <div className="form-group">
              <label htmlFor="season-name">Sæsonnavn</label>
              <input
                id="season-name"
                className="form-input"
                placeholder="f.eks. 2026/27"
                value={newSeasonName}
                onChange={(e) => setNewSeasonName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSeason()}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowSeasonModal(false)}
              >
                Annuller
              </button>
              <button className="btn btn-green" onClick={addSeason}>
                Opret sæson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
