import { useState, useEffect } from 'react';
import JerseyIcon from './JerseyIcon';
import { FORMATIONS, PITCH_PRESETS, POSITIONS } from '../../constants';
import { makeDraft, posColor, statusDot } from '../../utils';

export default function LineupTab({ players = [], drafts = null, setDrafts = () => {}, readOnly = false }) {
  const [activeDraft, setActiveDraft] = useState(0);
  const [localDrafts, setLocalDrafts] = useState(drafts || [makeDraft(), makeDraft(), makeDraft()]);
  const [poss, setPoss] = useState('in');
  const [popup, setPopup] = useState(null);
  const [pitchIdx, setPitchIdx] = useState(0);

  useEffect(() => {
    if (drafts) setLocalDrafts(drafts);
  }, [drafts]);

  const draft = localDrafts[activeDraft];

  function updateDraft(u) {
    setLocalDrafts((prev) => prev.map((d, i) => (i === activeDraft ? { ...d, ...u } : d)));
    if (setDrafts) setDrafts(localDrafts.map((d, i) => (i === activeDraft ? { ...d, ...u } : d)));
  }

  const slots = FORMATIONS[draft.formation].slots;
  const pById = {};
  players.forEach((p) => {
    pById[p.id] = p;
  });
  const usedIds = Object.values(draft.lineup).filter(Boolean);
  const startingSet = new Set(usedIds);
  const subs = players.filter((p) => !startingSet.has(p.id));

  function openPopup(slotId, e) {
    if (readOnly) return;
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    setPopup({ slotId, x: r.left + r.width / 2, y: r.top + r.height + 5 });
  }

  function assignPlayer(pid) {
    const next = { ...draft.lineup };
    Object.keys(next).forEach((k) => {
      if (next[k] === pid) delete next[k];
    });
    if (pid) next[popup.slotId] = pid;
    else delete next[popup.slotId];
    updateDraft({ lineup: next });
    setPopup(null);
  }

  useEffect(() => {
    const close = () => setPopup(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  return (
    <div className="page">
      <div className="page-title">🏟️ Opstilling</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {localDrafts.map((d, i) => (
          <button
            key={i}
            disabled={readOnly}
            onClick={() => !readOnly && setActiveDraft(i)}
            className={`draft-btn ${activeDraft === i ? 'active' : ''}`}
            style={{ opacity: readOnly ? 0.6 : 1 }}
          >
            UDKAST {i + 1}
            <br />
            <span style={{ fontWeight: 400, fontSize: '0.65rem' }}>{d.formation}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 180 }}>
          <div className="card">
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
              Formation
            </div>
            {Object.keys(FORMATIONS).map((f) => (
              <button
                key={f}
                disabled={readOnly}
                onClick={() => !readOnly && updateDraft({ formation: f, lineup: {} })}
                className={`draft-btn ${draft.formation === f ? 'active' : ''}`}
                style={{ marginBottom: 6, width: '100%', textAlign: 'left', opacity: readOnly ? 0.6 : 1 }}
              >
                {f}
              </button>
            ))}
          </div>
          {!readOnly && (
            <button
              onClick={() => updateDraft({ lineup: {} })}
              className="btn btn-danger"
              style={{ width: '100%' }}
            >
              Ryd opstilling
            </button>
          )}
          <div className="card" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: 'var(--green)' }}>●</span> Startende: {usedIds.length}/{slots.length}
            </div>
            {POSITIONS.map((pos) => {
              const cnt = players.filter((p) => startingSet.has(p.id) && p.position === pos).length;
              return cnt > 0 ? (
                <div key={pos} style={{ marginBottom: 4 }}>
                  <span className={`pos-badge pos-${pos}`} style={{ marginRight: 4 }}>
                    {pos}
                  </span>
                  {cnt}
                </div>
              ) : null;
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card">
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
              🎨 Banefarve
            </div>
            <div className="pitch-color-bar">
              {PITCH_PRESETS.map((p, i) => (
                <div
                  key={i}
                  className={`pitch-color-swatch ${pitchIdx === i ? 'active' : ''}`}
                  title={p.label}
                  onClick={() => !readOnly && setPitchIdx(i)}
                  style={{ background: p.bg, opacity: readOnly ? 0.6 : 1, cursor: !readOnly ? 'pointer' : 'default' }}
                />
              ))}
              <span style={{ fontSize: '0.7rem', color: 'var(--green)', fontWeight: 600, marginLeft: 4 }}>
                {PITCH_PRESETS[pitchIdx].label}
              </span>
            </div>
          </div>
          <div className="pitch" style={{ width: 305, height: 465, background: PITCH_PRESETS[pitchIdx].bg }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 42px,${PITCH_PRESETS[pitchIdx].stripe} 42px,${PITCH_PRESETS[pitchIdx].stripe} 84px)`,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
            <div style={{ position: 'absolute', width: '100%', height: 2, background: 'rgba(255,255,255,.22)', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
            <div
              style={{
                position: 'absolute',
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,.22)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'rgba(255,255,255,.4)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 5,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 115,
                height: 52,
                border: '2px solid rgba(255,255,255,.22)',
                borderTop: 'none',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 115,
                height: 52,
                border: '2px solid rgba(255,255,255,.22)',
                borderBottom: 'none',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 52,
                height: 15,
                border: '2px solid rgba(255,255,255,.28)',
                borderTop: 'none',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 52,
                height: 15,
                border: '2px solid rgba(255,255,255,.28)',
                borderBottom: 'none',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            />
            {slots.map((slot) => {
              const pid = draft.lineup[slot.id];
              const player = pid ? pById[pid] : null;
              const notReady = player && player.status && player.status !== 'Ready';
              return (
                <div
                  key={slot.id}
                  style={{
                    position: 'absolute',
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    transform: 'translate(-50%,-50%)',
                    zIndex: 10,
                    cursor: !readOnly ? 'pointer' : 'default',
                    opacity: readOnly ? 0.8 : 1,
                  }}
                  onClick={(e) => openPopup(slot.id, e)}
                >
                  {player ? (
                    <div style={{ position: 'relative', transition: 'transform .15s', transformOrigin: 'bottom center' }}>
                      <JerseyIcon number={player.number || '?'} color={posColor(slot.pos)} small={false} dim={notReady} />
                      {notReady && (
                        <span
                          style={{
                            position: 'absolute',
                            top: -3,
                            right: -3,
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#f87171',
                            border: '1.5px solid #0f172a',
                            display: 'block',
                          }}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: 32,
                        height: 38,
                        borderRadius: 6,
                        background: '#1e293b88',
                        border: '2px dashed #475569',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.5rem',
                        color: '#475569',
                        margin: '0 auto',
                      }}
                    >
                      {slot.pos}
                    </div>
                  )}
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#f1f5f9', textAlign: 'center', marginTop: 2 }}>
                    {player ? (player.name.split(' ').length > 1 ? player.name.split(' ').pop() : player.name) : ''}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card">
            <div style={{ display: 'flex', background: 'var(--bg-base)', borderRadius: 8, padding: 3, marginBottom: 10, gap: 0 }}>
              <button
                onClick={() => !readOnly && setPoss('in')}
                disabled={readOnly}
                className={`poss-tab ${poss === 'in' ? 'active' : ''}`}
                style={{ opacity: readOnly ? 0.6 : 1 }}
              >
                ⚡ Med bold
              </button>
              <button
                onClick={() => !readOnly && setPoss('out')}
                disabled={readOnly}
                className={`poss-tab ${poss === 'out' ? 'active' : ''}`}
                style={{ opacity: readOnly ? 0.6 : 1 }}
              >
                🛡 Uden bold
              </button>
            </div>
            <textarea
              disabled={readOnly}
              placeholder={poss === 'in' ? 'Instruktioner med bold…' : 'Defensiv instruktioner…'}
              value={poss === 'in' ? draft.inPoss : draft.outPoss}
              onChange={(e) => updateDraft(poss === 'in' ? { inPoss: e.target.value } : { outPoss: e.target.value })}
              className="form-input"
              style={{ width: '100%', opacity: readOnly ? 0.6 : 1 }}
            />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            Bænk
          </div>
          <div className="card" style={{ minWidth: 140, padding: '10px 12px', maxHeight: 400, overflowY: 'auto' }}>
            {subs.length === 0 ? (
              <div style={{ padding: '6px 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                Alle tildelt
              </div>
            ) : (
              <>
                {subs.slice(0, 10).map((p) => (
                  <div key={p.id} className="sub-item" style={{ opacity: readOnly ? 0.6 : 1, cursor: !readOnly ? 'pointer' : 'default' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: posColor(p.position), display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.58rem', fontWeight: 700, flexShrink: 0 }}>
                      {p.number || '?'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: p.status && p.status !== 'Ready' ? 'var(--red)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name.split(' ')[0]}
                      </div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--text-secondary)' }}>
                        {p.position}
                      </div>
                    </div>
                  </div>
                ))}
                {subs.length > 10 && (
                  <div style={{ padding: '8px 0', fontSize: '0.7rem', color: 'var(--green)', fontWeight: 600 }}>
                    +{subs.length - 10} mere på bænken
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {popup && (
        <div
          className="player-popup"
          style={{
            top: popup.y,
            left: Math.min(popup.x, window.innerWidth - 180),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', padding: '6px 10px 8px', borderBottom: '1px solid var(--bg-raised)', marginBottom: 6 }}>
            {slots.find((s) => s.id === popup.slotId)?.pos} — vælg spiller
          </div>
          {players
            .filter((p) => !usedIds.includes(p.id) || draft.lineup[popup.slotId] === p.id)
            .map((p) => (
              <div
                key={p.id}
                className="player-popup-item"
                onClick={() => assignPlayer(p.id)}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: statusDot(p.status || 'Ready'),
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1 }}>{p.name}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>
                  {p.position}
                </span>
              </div>
            ))}
          {players.length === 0 && (
            <div style={{ padding: '8px 10px', color: '#475569', fontSize: '0.8rem' }}>
              Ingen spillere i truppen
            </div>
          )}
          {draft.lineup[popup.slotId] && (
            <>
              <div style={{ margin: '4px 0', border: 'none', borderTop: '1px solid var(--bg-raised)' }} />
              <div
                onClick={() => assignPlayer(null)}
                style={{
                  padding: '8px 10px',
                  fontSize: '0.75rem',
                  color: 'var(--red)',
                  cursor: 'pointer',
                }}
              >
                ✕ Fjern
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
