import { useState } from 'react';
import { fmtDate } from '../../utils';

export default function ScheduleTab({ events = {}, setEvents = () => {}, readOnly = false }) {
  const [weekOff, setWeekOff] = useState(0);
  const [adding, setAdding] = useState(null);
  const [addF, setAddF] = useState({ title: '', type: 'training', time: '' });

  function getWeek(off) {
    const today = new Date();
    const dow = today.getDay();
    const mon = new Date(today);
    mon.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1) + off * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(mon);
      d.setDate(mon.getDate() + i);
      return d;
    });
  }

  const days = getWeek(weekOff);
  const todayStr = new Date().toDateString();
  const DAY_NAMES = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];

  function dk(d) {
    return d.toISOString().slice(0, 10);
  }

  function addEvent(dateKey) {
    if (!addF.title.trim()) return;
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { id: crypto.randomUUID(), ...addF }],
    }));
    setAddF({ title: '', type: 'training', time: '' });
    setAdding(null);
  }

  function removeEvent(dateKey, id) {
    if (readOnly) return;
    if (!window.confirm('Slet denne begivenhed?')) return;
    setEvents((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter((e) => e.id !== id),
    }));
  }

  const monthStr = days[0].toLocaleString('da-DK', { month: 'long', year: 'numeric' });

  return (
    <div className="page">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
          📅 Program —{' '}
          <span style={{ color: '#22c55e', textTransform: 'capitalize' }}>{monthStr}</span>
        </div>
        {!readOnly && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setWeekOff((w) => w - 1)}
              style={{
                padding: '6px 12px',
                borderRadius: 7,
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              ← Uge
            </button>
            <button
              onClick={() => setWeekOff(0)}
              style={{
                padding: '6px 12px',
                borderRadius: 7,
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              I dag
            </button>
            <button
              onClick={() => setWeekOff((w) => w + 1)}
              style={{
                padding: '6px 12px',
                borderRadius: 7,
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              Uge →
            </button>
          </div>
        )}
      </div>
      <div style={{ padding: 0, overflow: 'hidden', border: '1px solid #e2e8f0', borderRadius: 8, background: 'white' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
          {days.map((d, i) => {
            const dateKey = dk(d);
            const dayEvs = events[dateKey] || [];
            const isToday = d.toDateString() === todayStr;

            return (
              <div
                key={i}
                style={{
                  borderRight: i < 6 ? '1px solid #e2e8f0' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 300,
                }}
              >
                <div
                  style={{
                    padding: '12px 10px',
                    borderBottom: '1px solid #e2e8f0',
                    background: isToday ? '#f0fdf4' : '#f8fafc',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>
                    {DAY_NAMES[i]}
                  </div>
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: isToday ? '#22c55e' : '#111827',
                    }}
                  >
                    {d.getDate()}
                  </div>
                </div>
                <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {dayEvs.map((ev) => {
                    const typeBg = {
                      training: '#dbeafe',
                      match: '#fecaca',
                      meeting: '#fef08a',
                      other: '#e0e7ff',
                    }[ev.type] || '#f3f4f6';

                    const typeBorder = {
                      training: '#0284c7',
                      match: '#dc2626',
                      meeting: '#ca8a04',
                      other: '#4f46e5',
                    }[ev.type] || '#6b7280';

                    return (
                      <div
                        key={ev.id}
                        onClick={() => !readOnly && removeEvent(dateKey, ev.id)}
                        title={!readOnly ? 'Klik for at fjerne' : ''}
                        style={{
                          padding: '6px 8px',
                          background: typeBg,
                          border: `1px solid ${typeBorder}`,
                          borderRadius: 5,
                          fontSize: '0.75rem',
                          color: '#111827',
                          cursor: !readOnly ? 'pointer' : 'default',
                          lineHeight: 1.4,
                        }}
                      >
                        {ev.time && <span style={{ opacity: 0.7, fontSize: '0.65rem' }}>{ev.time} </span>}
                        {ev.title}
                      </div>
                    );
                  })}
                  {!readOnly && adding === dateKey ? (
                    <div style={{ padding: '4px 0' }}>
                      <input
                        className="form-input"
                        style={{
                          width: '100%',
                          fontSize: '0.7rem',
                          padding: '4px 6px',
                          marginBottom: 3,
                          borderRadius: 4,
                          border: '1px solid #e2e8f0',
                          outline: 'none',
                        }}
                        placeholder="Titel…"
                        value={addF.title}
                        onChange={(e) => setAddF({ ...addF, title: e.target.value })}
                        onKeyDown={(e) => e.key === 'Enter' && addEvent(dateKey)}
                        autoFocus
                      />
                      <div style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
                        <input
                          className="form-input"
                          style={{ width: 52, fontSize: '0.68rem', padding: '3px 5px', borderRadius: 4, border: '1px solid #e2e8f0', outline: 'none' }}
                          type="time"
                          value={addF.time}
                          onChange={(e) => setAddF({ ...addF, time: e.target.value })}
                        />
                        <select
                          className="form-select"
                          style={{
                            flex: 1,
                            fontSize: '0.68rem',
                            padding: '3px 5px',
                            borderRadius: 4,
                            border: '1px solid #e2e8f0',
                            outline: 'none',
                          }}
                          value={addF.type}
                          onChange={(e) => setAddF({ ...addF, type: e.target.value })}
                        >
                          <option value="training">Træning</option>
                          <option value="match">Kamp</option>
                          <option value="meeting">Møde</option>
                          <option value="other">Andet</option>
                        </select>
                      </div>
                      <div style={{ display: 'flex', gap: 3 }}>
                        <button
                          style={{
                            flex: 1,
                            padding: '3px',
                            fontSize: '0.68rem',
                            borderRadius: 4,
                            border: '1px solid #22c55e',
                            background: '#f0fdf4',
                            color: '#166534',
                            cursor: 'pointer',
                            fontWeight: 600,
                          }}
                          onClick={() => addEvent(dateKey)}
                        >
                          +
                        </button>
                        <button
                          style={{
                            flex: 1,
                            padding: '3px',
                            fontSize: '0.68rem',
                            borderRadius: 4,
                            border: '1px solid #d1d5db',
                            background: 'white',
                            color: '#374151',
                            cursor: 'pointer',
                            fontWeight: 600,
                          }}
                          onClick={() => setAdding(null)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : !readOnly ? (
                    <button
                      onClick={() => setAdding(dateKey)}
                      style={{
                        padding: '6px 8px',
                        fontSize: '0.75rem',
                        borderRadius: 5,
                        border: '1.5px dashed #cbd5e1',
                        background: 'transparent',
                        color: '#64748b',
                        cursor: 'pointer',
                        marginTop: 'auto',
                        fontWeight: 600,
                      }}
                    >
                      +
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
