import { useState } from 'react';
import DrawingBoard from '../shared/DrawingBoard/DrawingBoard';

export const SetPiecesTab = ({ players, board, setBoard }) => {
  const [mode, setMode] = useState('offensive');
  const [plan, setPlan] = useState('');

  const handleBoardUpdate = (newItems, newLines, newZones) => {
    setBoard({ items: newItems, lines: newLines, zones: newZones });
  };

  return (
    <div className="page">
      <div className="page-title">⚽ Sætstykker</div>
      <div className="card mb-4">
        <div className="card-title">Taktik & Plan</div>
        <div className="form-row" style={{ gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="setpiece-mode" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Tilstand</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button
                onClick={() => setMode('offensive')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: `1.5px solid ${mode === 'offensive' ? '#22c55e' : '#d1d5db'}`,
                  background: mode === 'offensive' ? '#dcfce7' : 'white',
                  color: mode === 'offensive' ? '#166534' : '#374151',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
              >
                Angreb
              </button>
              <button
                onClick={() => setMode('defensive')}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: `1.5px solid ${mode === 'defensive' ? '#22c55e' : '#d1d5db'}`,
                  background: mode === 'defensive' ? '#dcfce7' : 'white',
                  color: mode === 'defensive' ? '#166534' : '#374151',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
              >
                Forsvar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <DrawingBoard isHalfPitch={true} />
        </div>
        <div style={{ width: 240, flexShrink: 0 }}>
          <div className="card">
            <div className="card-title" style={{ marginTop: 0 }}>Notater</div>
            <textarea
              placeholder="Skriv dine noter til sætystykket her..."
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              style={{
                width: '100%',
                height: 180,
                padding: 10,
                borderRadius: 6,
                border: '1px solid #d1d5db',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                resize: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
