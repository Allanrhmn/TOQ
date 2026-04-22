import { useState, useMemo } from 'react';
import { POSITIONS, STATUSES } from '../../constants';
import { posColor, statusDot } from '../../utils';

export const RosterTab = ({ players, setPlayers }) => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    position: 'MID',
    rating: '',
    status: 'Ready',
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const addPlayer = () => {
    if (!form.name.trim()) return;
    setPlayers((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        ...form,
        stats: { matches: 0, goals: 0, assists: 0, yellow: 0, red: 0, minutes: 0, clean: 0 },
      },
    ]);
    setForm({ name: '', number: '', position: 'MID', rating: '', status: 'Ready' });
  };

  const sorted = useMemo(
    () => [...players].sort((a, b) => ['GK', 'DEF', 'MID', 'FWD'].indexOf(a.position) - ['GK', 'DEF', 'MID', 'FWD'].indexOf(b.position)),
    [players]
  );

  return (
    <div className="page">
      <div className="page-title">👥 Holdoversigt</div>
      <div className="card mb-4">
        <div className="card-title">Tilføj spiller</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="roster-name">Navn</label>
            <input
              id="roster-name"
              className="form-input"
              style={{ width: 165 }}
              placeholder="Fulde navn"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roster-number">Nr.</label>
            <input
              id="roster-number"
              className="form-input"
              style={{ width: 58 }}
              type="number"
              placeholder="#"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roster-position">Position</label>
            <select
              id="roster-position"
              className="form-select"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            >
              {POSITIONS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="roster-rating">Rating</label>
            <input
              id="roster-rating"
              className="form-input"
              style={{ width: 65 }}
              type="number"
              min="1"
              max="99"
              placeholder="–"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roster-status">Status</label>
            <select
              id="roster-status"
              className="form-select"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <button className="btn btn-green" onClick={addPlayer}>
              ＋ Tilføj
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <div className="card-title" style={{ margin: 0 }}>
            Trup — {players.length} spillere
          </div>
          <div className="flex gap-2" style={{ fontSize: '0.72rem' }}>
            {['Ready', 'Injured', 'Suspended'].map((s) => (
              <span key={s} style={{ color: statusDot(s) }}>
                ● {s} {players.filter((p) => p.status === s).length}
              </span>
            ))}
          </div>
        </div>
        {players.length === 0 ? (
          <div className="empty-state">Ingen spillere endnu — tilføj dit hold ovenfor!</div>
        ) : (
          <table className="roster-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Navn</th>
                <th>Pos</th>
                <th>Rating</th>
                <th>Mål</th>
                <th>Assists</th>
                <th>Kampe</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) =>
                editId === p.id ? (
                  <tr key={p.id}>
                    <td>
                      <input
                        className="form-input"
                        style={{ width: 52 }}
                        value={editForm.number}
                        onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        className="form-input"
                        style={{ width: 145 }}
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={editForm.position}
                        onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                      >
                        {POSITIONS.map((pos) => (
                          <option key={pos}>{pos}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className="form-input"
                        style={{ width: 58 }}
                        type="number"
                        min="1"
                        max="99"
                        value={editForm.rating}
                        onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
                      />
                    </td>
                    <td colSpan="3"></td>
                    <td>
                      <select
                        className="form-select"
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      >
                        {STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-green btn-sm"
                          onClick={() => {
                            setPlayers((prev) =>
                              prev.map((pl) => (pl.id === editId ? { ...pl, ...editForm } : pl))
                            );
                            setEditId(null);
                          }}
                        >
                          Gem
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setEditId(null)}
                        >
                          Annuller
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id}>
                    <td style={{ color: '#64748b', fontWeight: 700 }}>{p.number || '–'}</td>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td>
                      <span className={`pos-badge pos-${p.position}`}>{p.position}</span>
                    </td>
                    <td>
                      {p.rating ? (
                        <span style={{ color: '#fbbf24', fontWeight: 700 }}>{p.rating}</span>
                      ) : (
                        <span className="text-muted">–</span>
                      )}
                    </td>
                    <td style={{ color: '#22c55e', fontWeight: 700 }}>{p.stats?.goals || 0}</td>
                    <td style={{ color: '#3b82f6', fontWeight: 700 }}>
                      {p.stats?.assists || 0}
                    </td>
                    <td style={{ color: '#94a3b8' }}>{p.stats?.matches || 0}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: statusDot(p.status || 'Ready'),
                            flexShrink: 0,
                            display: 'inline-block',
                          }}
                        ></span>
                        <select
                          className="form-select"
                          style={{ padding: '2px 6px', fontSize: '0.72rem' }}
                          value={p.status || 'Ready'}
                          onChange={(e) =>
                            setPlayers((prev) =>
                              prev.map((pl) =>
                                pl.id === p.id ? { ...pl, status: e.target.value } : pl
                              )
                            )
                          }
                        >
                          {STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn-icon"
                          onClick={() => {
                            setEditId(p.id);
                            setEditForm({ ...p });
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => {
                            if (window.confirm(`Slet spiller ${p.name}?`)) {
                              setPlayers((prev) => prev.filter((pl) => pl.id !== p.id));
                            }
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
