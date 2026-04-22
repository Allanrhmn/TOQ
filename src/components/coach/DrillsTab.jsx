import { useState } from 'react';
import DrawingBoard from '../shared/DrawingBoard/DrawingBoard';

export default function DrillsTab({ savedDrills, setSavedDrills }) {
  const [drillName, setDrillName] = useState('');

  const saveDrill = () => {
    if (!drillName.trim()) return;
    setSavedDrills((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: drillName,
        date: new Date().toISOString().split('T')[0],
        items: [],
        lines: [],
        zones: [],
      },
    ]);
    setDrillName('');
  }

  const deleteDrill = (id) => {
    setSavedDrills((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="page">
      <div className="page-title">🏃 Øvelser</div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <DrawingBoard isHalfPitch={false} />
        </div>
        <div style={{ width: 240, flexShrink: 0 }}>
          <div className="card mb-4">
            <div className="card-title" style={{ marginTop: 0 }}>Gem øvelse</div>
            <div className="form-group">
              <label htmlFor="drill-name">Navn</label>
              <input
                id="drill-name"
                className="form-input"
                placeholder="Fx Offensiv drilling"
                value={drillName}
                onChange={(e) => setDrillName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveDrill()}
              />
            </div>
            <button
              className="btn btn-green"
              onClick={saveDrill}
              disabled={!drillName.trim()}
              style={{ width: '100%' }}
            >
              💾 Gem øvelse
            </button>
          </div>
          <div className="card">
            <div className="card-title" style={{ marginTop: 0 }}>Gemte øvelser ({savedDrills.length})</div>
            {savedDrills.length === 0 ? (
              <div className="empty-state">Ingen øvelser gemt endnu</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {savedDrills.map((drill) => (
                  <div
                    key={drill.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 10px',
                      background: '#f8fafc',
                      borderRadius: 6,
                      border: '1px solid #e2e8f0',
                      fontSize: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{drill.name}</div>
                      <div style={{ color: '#64748b', fontSize: '0.7rem' }}>{drill.date}</div>
                    </div>
                    <button
                      className="btn-icon"
                      onClick={() => deleteDrill(drill.id)}
                      style={{ padding: 4 }}
                    >
                      🗑
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
