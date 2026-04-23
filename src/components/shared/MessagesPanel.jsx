import { useState } from 'react';
import { getName, getToLabel } from '../../utils';

export default function MessagesPanel({ role, messages, setMessages, users, players, currentUser, setNotifs }) {
  const [selId, setSelId] = useState(null);
  const [showCompose, setShowCompose] = useState(false);
  const [reply, setReply] = useState(false);
  const [cForm, setCForm] = useState({ to: 'all', subject: '', body: '' });

  const selected = selId ? messages.find((m) => m.id === selId) : null;
  const coach = users.find((u) => u.role === 'coach');

  const sendMessage = () => {
    if (!cForm.subject.trim() || !cForm.body.trim()) return;

    const newMsg = {
      id: crypto.randomUUID(),
      from: currentUser.id,
      fromName: currentUser.name,
      to: role === 'coach' ? cForm.to : coach.id,
      subject: cForm.subject,
      body: cForm.body,
      date: new Date().toISOString().split('T')[0],
      readBy: [currentUser.id],
    }

    setMessages((prev) => [...prev, newMsg]);
    setCForm({ to: role === 'coach' ? 'all' : coach.id, subject: '', body: '' });
    setShowCompose(false);
    setReply(false);
  }

  const sendReply = () => {
    if (!cForm.body.trim()) return;

    let subject = cForm.subject;
    if (!subject.startsWith('Re: ')) {
      subject = `Re: ${subject}`;
    }

    const newMsg = {
      id: crypto.randomUUID(),
      from: currentUser.id,
      fromName: currentUser.name,
      to: selected.from,
      subject: subject,
      body: cForm.body,
      date: new Date().toISOString().split('T')[0],
      readBy: [currentUser.id],
    }

    setMessages((prev) => [...prev, newMsg]);
    setCForm({ to: 'all', subject: '', body: '' });
    setReply(false);
  }

  const handleCompose = () => {
    setCForm({ to: role === 'coach' ? 'all' : coach.id, subject: '', body: '' });
    setShowCompose(true);
    setReply(false);
  }

  const handleReply = () => {
    if (selected) {
      setCForm({ to: '', subject: selected.subject, body: '' });
      setReply(true);
      setShowCompose(false);
    }
  }

  const markAsRead = (msgId) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && !m.readBy.includes(currentUser.id)
          ? { ...m, readBy: [...m.readBy, currentUser.id] }
          : m
      )
    );
  }

  return (
    <div className="page">
      <div className="page-title">💬 Beskeder</div>
      <div style={{ display: 'flex', gap: 16, height: 'calc(100vh - 160px)' }}>
        <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <button className="btn btn-green" onClick={handleCompose} style={{ width: '100%', marginBottom: 12 }}>
            ＋ {role === 'coach' ? 'Ny besked' : 'Skriv til coach'}
          </button>
          <div className="card" style={{ flex: 1, overflow: 'auto', padding: 0 }}>
            {messages.length === 0 ? (
              <div className="empty-state">Ingen beskeder endnu</div>
            ) : (
              messages.map((msg) => {
                const isUnread = !msg.readBy.includes(currentUser.id);
                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelId(msg.id);
                      markAsRead(msg.id);
                    }}
                    style={{
                      padding: '12px 14px',
                      borderBottom: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      background: selId === msg.id ? '#f0fdf4' : isUnread ? '#fef3c7' : 'white',
                      transition: 'background 0.1s',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: 6,
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.8rem', flex: 1, overflow: 'hidden' }}>
                        {msg.fromName}
                      </div>
                      {isUnread && (
                        <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', flexShrink: 0, marginTop: 2 }} />
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 3 }}>{msg.subject}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{msg.date}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <>
              <div className="card" style={{ flex: 1, overflow: 'auto', marginBottom: 12 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: 2 }}>Fra</div>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{selected.fromName}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: 2 }}>Emne</div>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{selected.subject}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: 6 }}>Besked</div>
                  <div style={{ color: '#374151', lineHeight: 1.5, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {selected.body}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-green" onClick={handleReply} style={{ flex: 1 }}>
                  ↩ Svar
                </button>
              </div>
            </>
          ) : (
            <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state">Vælg en besked for at læse den</div>
            </div>
          )}
        </div>
      </div>

      {(showCompose || reply) && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => {
            setShowCompose(false);
            setReply(false);
          }}
        >
          <div
            className="card"
            style={{ width: 450, maxHeight: '80vh', overflow: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-title" style={{ marginTop: 0 }}>
              {reply ? 'Svar på besked' : 'Ny besked'}
            </div>

            {!reply && role === 'coach' && (
              <div className="form-group">
                <label htmlFor="msg-to">Modtager</label>
                <select
                  id="msg-to"
                  className="form-select"
                  value={cForm.to}
                  onChange={(e) => setCForm({ ...cForm, to: e.target.value })}
                >
                  <option value="all">Hele holdet</option>
                  {players.map((p) => {
                    const user = users.find((u) => u.id === p.userId);
                    return user ? (
                      <option key={p.id} value={p.userId}>
                        {user.name}
                      </option>
                    ) : null;
                  })}
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="msg-subject">Emne</label>
              <input
                id="msg-subject"
                className="form-input"
                placeholder="Beskedtitel"
                value={cForm.subject}
                onChange={(e) => setCForm({ ...cForm, subject: e.target.value })}
                disabled={reply}
              />
            </div>

            <div className="form-group">
              <label htmlFor="msg-body">Besked</label>
              <textarea
                id="msg-body"
                placeholder="Skriv din besked..."
                value={cForm.body}
                onChange={(e) => setCForm({ ...cForm, body: e.target.value })}
                style={{
                  width: '100%',
                  height: 140,
                  padding: 10,
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  resize: 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn-green"
                onClick={reply ? sendReply : sendMessage}
                style={{ flex: 1 }}
              >
                {reply ? '↩ Svar' : '📤 Send'}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowCompose(false);
                  setReply(false);
                }}
                style={{ flex: 1 }}
              >
                Annuller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
