import { useRef, useState } from 'react';
import PitchSVG from './PitchSVG';
import EIcon from './EIcon';
import { PALETTE } from '../../../constants';

export default function DrawingBoard({ isHalfPitch, extraPanel }) {
  const boardRef = useRef(null);
  const [items, setItems] = useState([]);
  const [lines, setLines] = useState([]);
  const [zones, setZones] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [selId, setSelId] = useState(null);
  const [activeCat, setActiveCat] = useState('players');
  const [activeSub, setActiveSub] = useState('player-outline');
  const [activeNum, setActiveNum] = useState(1);
  const [customNum, setCustomNum] = useState('');
  const [catColor, setCatColor] = useState({
    shapes: '#22c55e',
    equipment: '#1f2937',
    players: '#22c55e',
    numbered: '#22c55e',
    arrows: '#1f2937',
  });
  const [sysMode, setSysMode] = useState('place');
  const [expanded, setExpanded] = useState({
    shapes: true,
    equipment: true,
    players: true,
    numbered: true,
    arrows: true,
  });
  const dragRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const BW = isHalfPitch ? 510 : 560;
  const BH = isHalfPitch ? 390 : 520;

  const SECTIONS = [
    {
      key: 'shapes',
      label: 'Former',
      hint: 'klik + træk',
      tools: [
        { id: 'filled-square', label: 'Fyldt' },
        { id: 'outline-square', label: 'Kontur' },
        { id: 'shape-circle', label: 'Cirkel' },
      ],
    },
    {
      key: 'equipment',
      label: 'Udstyr',
      hint: 'træk',
      tools: [
        { id: 'ball', label: 'Bold' },
        { id: 'small-dot', label: 'Punkt' },
        { id: 'cone', label: 'Kegle' },
        { id: 'big-goal', label: 'Mål stor' },
        { id: 'small-goal', label: 'Mål sm.' },
        { id: 'hurdle', label: 'Hæk' },
        { id: 'ladder', label: 'Stige' },
      ],
    },
    {
      key: 'players',
      label: 'Spillere',
      hint: 'træk',
      tools: [
        { id: 'player-outline', label: 'Cirkel' },
        { id: 'player-bib', label: 'Vest' },
        { id: 'player-filled', label: 'Fyldt' },
        { id: 'player-x', label: 'GK' },
      ],
    },
    {
      key: 'arrows',
      label: 'Pile + Linjer',
      hint: 'klik + træk',
      tools: [
        { id: 'arr-solid', label: 'Pil' },
        { id: 'arr-dashed', label: 'Stiplet' },
        { id: 'arr-wavy', label: 'Bølge' },
        { id: 'arr-line', label: 'Linje' },
      ],
    },
  ];

  function gc(e) {
    const r = boardRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)),
      y: Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)),
    };
  }

  const isArrow = activeCat === 'arrows';
  const isZone = sysMode === 'zone';

  function handleBoardDown(e) {
    const pos = gc(e);
    if (isArrow) {
      setPreview({
        type: 'line',
        x1: pos.x,
        y1: pos.y,
        x2: pos.x,
        y2: pos.y,
        sub: activeSub,
        color: catColor.arrows,
      });
      return;
    }
    if (isZone) {
      setPreview({ type: 'zone', x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y, color: catColor.shapes });
      return;
    }
    if (sysMode === 'place') {
      const ni = {
        id: crypto.randomUUID(),
        sub: activeSub,
        color: catColor[activeCat] || catColor.players,
        x: pos.x,
        y: pos.y,
      };
      if (activeSub === 'player-jersey') ni.num = activeNum;
      setItems((prev) => [...prev, ni]);
      setSelId(null);
    } else {
      setSelId(null);
    }
  }

  function handleBoardMove(e) {
    const pos = gc(e);
    if (preview) {
      setPreview((prev) => (prev ? { ...prev, x2: pos.x, y2: pos.y } : null));
    }
    if (dragRef.current) {
      const { id, ox, oy } = dragRef.current;
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, x: Math.max(1, Math.min(99, pos.x - ox)), y: Math.max(1, Math.min(99, pos.y - oy)) } : it
        )
      );
    }
  }

  function handleBoardUp() {
    if (preview) {
      const p = preview;
      if (p.type === 'zone') {
        const x = Math.min(p.x1, p.x2);
        const y = Math.min(p.y1, p.y2);
        const w = Math.abs(p.x2 - p.x1);
        const h = Math.abs(p.y2 - p.y1);
        if (w > 2 && h > 2) {
          setZones((prev) => [...prev, { id: crypto.randomUUID(), x, y, w, h, color: p.color }]);
        }
      } else {
        const dx = p.x2 - p.x1;
        const dy = p.y2 - p.y1;
        if (Math.sqrt(dx * dx + dy * dy) > 2) {
          setLines((prev) => [...prev, { id: crypto.randomUUID(), x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2, sub: p.sub, color: p.color }]);
        }
      }
      setPreview(null);
    }
    dragRef.current = null;
  }

  function handleItemDown(e, item) {
    e.stopPropagation();
    if (sysMode === 'delete') {
      setItems((prev) => prev.filter((it) => it.id !== item.id));
      return;
    }
    setSelId(item.id);
    const pos = gc(e);
    dragRef.current = { id: item.id, ox: pos.x - item.x, oy: pos.y - item.y };
  }

  function renderLineSVG(l, opacity = 1) {
    const col = l.color || '#1f2937';
    const sw = 0.85;
    const dx = l.x2 - l.x1;
    const dy = l.y2 - l.y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = len > 0 ? dx / len : 0;
    const uy = len > 0 ? dy / len : 0;
    const s = 3;
    const ax = l.x2 - ux * s + uy * s * 0.5;
    const ay = l.y2 - uy * s - ux * s * 0.5;
    const bx = l.x2 - ux * s - uy * s * 0.5;
    const by = l.y2 - uy * s + ux * s * 0.5;

    return (
      <g key={l.id} opacity={opacity}>
        {l.sub === 'arr-wavy' ? (
          <path
            d={`M${l.x1} ${l.y1} Q${(l.x1 + l.x2) / 2 - dy * 0.15} ${(l.y1 + l.y2) / 2 + dx * 0.15} ${l.x2} ${l.y2}`}
            fill="none"
            stroke={col}
            strokeWidth={sw}
            strokeLinecap="round"
          />
        ) : (
          <line
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={col}
            strokeWidth={sw}
            strokeDasharray={l.sub === 'arr-dashed' || l.sub === 'arr-line' ? '3,2' : undefined}
          />
        )}
        {l.sub !== 'arr-line' && len > 3 && <polygon points={`${l.x2},${l.y2} ${ax},${ay} ${bx},${by}`} fill={col} />}
      </g>
    );
  }

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: 240, background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 5, flexWrap: 'wrap', background: '#f8fafc' }}>
          {[
            ['place', '↖ Vælg'],
            ['delete', '✕ Slet'],
            ['zone', '□ Zone'],
          ].map(([m, label]) => (
            <button
              key={m}
              onClick={() => {
                setSysMode(m);
                if (m !== 'place') setActiveCat('none');
              }}
              style={{
                padding: '4px 9px',
                borderRadius: 6,
                border: `1.5px solid ${sysMode === m && !isArrow && !isZone ? '#22c55e' : '#d1d5db'}`,
                background: sysMode === m && !isArrow && !isZone ? '#dcfce7' : 'white',
                color: sysMode === m && !isArrow && !isZone ? '#166534' : '#374151',
                cursor: 'pointer',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {SECTIONS.map((sec) => (
          <div key={sec.key} style={{ borderBottom: '1px solid #e2e8f0' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                cursor: 'pointer',
                background: '#f8fafc',
                userSelect: 'none',
              }}
              onClick={() => setExpanded((p) => ({ ...p, [sec.key]: !p[sec.key] }))}
            >
              <span style={{ fontSize: '0.77rem', fontWeight: 700, color: '#111827' }}>
                {sec.label} <span style={{ fontWeight: 400, fontSize: '0.62rem', color: '#9ca3af' }}>({sec.hint})</span>
              </span>
              <span style={{ color: '#9ca3af', fontSize: '0.72rem' }}>{expanded[sec.key] ? '▲' : '▼'}</span>
            </div>
            {expanded[sec.key] && (
              <div style={{ padding: '8px 12px 10px' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                  {PALETTE.map((col) => {
                    const active = catColor[sec.key] === col && activeCat === sec.key;
                    return (
                      <div
                        key={col}
                        onClick={() => {
                          setCatColor((p) => ({ ...p, [sec.key]: col }));
                          setActiveCat(sec.key);
                          setSysMode('place');
                        }}
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: col,
                          cursor: 'pointer',
                          border: `2.5px solid ${active ? 'white' : 'transparent'}`,
                          outline: `2px solid ${active ? col : 'transparent'}`,
                          boxSizing: 'border-box',
                          transition: 'all .1s',
                        }}
                      />
                    );
                  })}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
                  {sec.tools.map((t) => {
                    const active = activeCat === sec.key && activeSub === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          setActiveCat(sec.key);
                          setActiveSub(t.id);
                          setSysMode('place');
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px 2px',
                          borderRadius: 7,
                          cursor: 'pointer',
                          border: `1.5px solid ${active ? '#22c55e' : '#e5e7eb'}`,
                          background: active ? '#f0fdf4' : 'white',
                          gap: 3,
                          minHeight: 46,
                          transition: 'all .1s',
                        }}
                      >
                        <EIcon sub={t.id} color={catColor[sec.key]} small={true} />
                        <span style={{ fontSize: '0.56rem', color: '#6b7280', fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>
                          {t.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
        <div style={{ borderBottom: '1px solid #e2e8f0' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              cursor: 'pointer',
              background: '#f8fafc',
              userSelect: 'none',
            }}
            onClick={() => setExpanded((p) => ({ ...p, numbered: !p.numbered }))}
          >
            <span style={{ fontSize: '0.77rem', fontWeight: 700, color: '#111827' }}>
              Nummererede trøjer <span style={{ fontWeight: 400, fontSize: '0.62rem', color: '#9ca3af' }}>(klik tal → placer)</span>
            </span>
            <span style={{ color: '#9ca3af', fontSize: '0.72rem' }}>{expanded.numbered ? '▲' : '▼'}</span>
          </div>
          {expanded.numbered && (
            <div style={{ padding: '8px 12px 10px' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                {PALETTE.map((col) => {
                  const active = catColor.numbered === col && activeCat === 'numbered';
                  return (
                    <div
                      key={col}
                      onClick={() => {
                        setCatColor((p) => ({ ...p, numbered: col }));
                      }}
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        background: col,
                        cursor: 'pointer',
                        border: `2.5px solid ${active ? 'white' : 'transparent'}`,
                        outline: `2px solid ${active ? col : 'transparent'}`,
                        boxSizing: 'border-box',
                        transition: 'all .1s',
                      }}
                    />
                  );
                })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3, marginBottom: 6 }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '?'].map((n) => {
                  const active = activeCat === 'numbered' && activeSub === 'player-jersey' && activeNum === n;
                  return (
                    <div
                      key={n}
                      onClick={() => {
                        setActiveCat('numbered');
                        setActiveSub('player-jersey');
                        setActiveNum(n);
                        setSysMode('place');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px 2px',
                        borderRadius: 7,
                        cursor: 'pointer',
                        border: `1.5px solid ${active ? '#22c55e' : '#e5e7eb'}`,
                        background: active ? '#f0fdf4' : 'white',
                        minHeight: 38,
                        transition: 'all .1s',
                      }}
                    >
                      <EIcon sub="player-jersey" num={n} color={active ? catColor.numbered : '#9ca3af'} small={true} />
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <input
                  type="number"
                  min="1"
                  max="99"
                  placeholder="Eget nr…"
                  value={customNum}
                  onChange={(e) => setCustomNum(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#f8fafc',
                    border: '1.5px solid #e5e7eb',
                    borderRadius: 6,
                    padding: '5px 7px',
                    fontSize: '0.75rem',
                    outline: 'none',
                    color: '#374151',
                  }}
                />
                <button
                  disabled={!customNum.trim()}
                  onClick={() => {
                    if (customNum.trim()) {
                      setActiveCat('numbered');
                      setActiveSub('player-jersey');
                      setActiveNum(parseInt(customNum) || customNum);
                      setSysMode('place');
                    }
                  }}
                  style={{
                    padding: '5px 9px',
                    borderRadius: 6,
                    border: '1.5px solid #22c55e',
                    background: customNum.trim() ? '#f0fdf4' : '#f9fafb',
                    color: customNum.trim() ? '#166534' : '#9ca3af',
                    cursor: customNum.trim() ? 'pointer' : 'default',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                  }}
                >
                  Vælg
                </button>
              </div>
              {activeCat === 'numbered' && activeSub === 'player-jersey' && (
                <div
                  style={{
                    marginTop: 6,
                    padding: '5px 8px',
                    background: '#f0fdf4',
                    borderRadius: 6,
                    fontSize: '0.7rem',
                    color: '#166534',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <EIcon sub="player-jersey" num={activeNum} color={catColor.numbered} small={true} />
                  <span>
                    Klikker placerer trøje <b>#{activeNum}</b>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => {
                setItems([]);
                setLines([]);
                setZones([]);
                setSelId(null);
                setPreview(null);
              }}
              style={{
                padding: '5px 12px',
                borderRadius: 7,
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              🗑 Ryd
            </button>
            <button
              onClick={() => setShowGrid((g) => !g)}
              style={{
                padding: '5px 12px',
                borderRadius: 7,
                border: `1px solid ${showGrid ? '#22c55e' : '#d1d5db'}`,
                background: showGrid ? '#f0fdf4' : 'white',
                color: showGrid ? '#166534' : '#374151',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              ⊞ Gitter
            </button>
          </div>
        </div>
        <div
          ref={boardRef}
          style={{
            width: BW,
            height: BH,
            background: '#f8fafc',
            backgroundImage: showGrid ? 'radial-gradient(circle, #94a3b8 0.85px, transparent 0.85px)' : 'none',
            backgroundSize: showGrid ? '28px 28px' : 'none',
            position: 'relative',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            cursor: isArrow || isZone ? 'crosshair' : sysMode === 'delete' ? 'not-allowed' : 'default',
            overflow: 'hidden',
            userSelect: 'none',
          }}
          onMouseDown={handleBoardDown}
          onMouseMove={handleBoardMove}
          onMouseUp={handleBoardUp}
          onMouseLeave={handleBoardUp}
        >
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <PitchSVG isHalfPitch={isHalfPitch} />
            {zones.map((z) => (
              <rect key={z.id} x={z.x} y={z.y} width={z.w} height={z.h} fill={z.color + '28'} stroke={z.color} strokeWidth="0.55" strokeDasharray="2,1.5" />
            ))}
            {lines.map((l) => renderLineSVG(l))}
            {preview && preview.type === 'zone' && (
              <rect
                x={Math.min(preview.x1, preview.x2)}
                y={Math.min(preview.y1, preview.y2)}
                width={Math.abs(preview.x2 - preview.x1)}
                height={Math.abs(preview.y2 - preview.y1)}
                fill={preview.color + '20'}
                stroke={preview.color}
                strokeWidth="0.6"
                strokeDasharray="2,1.5"
                opacity="0.8"
              />
            )}
            {preview && preview.type === 'line' && renderLineSVG({ ...preview, id: 'prev' }, 0.6)}
          </svg>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%,-50%)',
                zIndex: 10,
                cursor: sysMode === 'delete' ? 'not-allowed' : 'move',
                filter: selId === item.id ? 'drop-shadow(0 0 5px rgba(34,197,94,.9))' : 'drop-shadow(0 1px 2px rgba(0,0,0,.15))',
                transition: 'filter .1s',
              }}
              onMouseDown={(e) => handleItemDown(e, item)}
            >
              <EIcon sub={item.sub} color={item.color} small={false} num={item.num} />
            </div>
          ))}
        </div>
        {extraPanel}
      </div>
    </div>
  );
}
