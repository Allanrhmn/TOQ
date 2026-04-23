import { useState } from 'react';

export default function MessagesPanel({ role, messages, setMessages, users, players, currentUser }) {
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
      <div className="msg-layout">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button className="btn btn-green" onClick={handleCompose} style={{ width: '100%', marginBottom: 12 }}>
            ＋ {role === 'coach' ? 'Ny besked' : 'Skriv til coach'}
          </button>
          <div className="msg-list">
            {messages.length === 0 ? (
              <div className="empty-state">Ingen beskeder endnu</div>
            ) : (
              messages.map((msg) => {
                const isUnread = !msg.readBy.includes(currentUser.id);
                return (
                  <div
                    key={msg.id}
                    className={`msg-item ${selId === msg.id ? 'sel' : ''} ${isUnread ? 'msg-unread' : ''}`}
                    onClick={() => {
                      setSelId(msg.id);
                      markAsRead(msg.id);
                    }}
                  >
                    <div className="msg-from">
                      <span>{msg.fromName}</span>
                      {isUnread && <span className="msg-udot" />}
                    </div>
                    <div className="msg-subj">{msg.subject}</div>
                    <div className="msg-date">{msg.date}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <>
              <div className="msg-panel" style={{ flex: 1, marginBottom: 12 }}>
                <div className="msg-ph">
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: 2 }}>Fra</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selected.fromName}</div>
                </div>
                <div className="msg-ph" style={{ borderBottom: '1px solid var(--bg-raised)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: 2 }}>Emne</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selected.subject}</div>
                </div>
                <div className="msg-pbody">{selected.body}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-green" onClick={handleReply} style={{ flex: 1 }}>
                  ↩ Svar
                </button>
              </div>
            </>
          ) : (
            <div className="msg-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="empty-state">Vælg en besked for at læse den</div>
            </div>
          )}
        </div>
      </div>

      {(showCompose || reply) && (
        <div
          className="modal-overlay"
          onClick={() => {
            setShowCompose(false);
            setReply(false);
          }}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-title">
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
                className="msg-reply-in"
                placeholder="Skriv din besked..."
                value={cForm.body}
                onChange={(e) => setCForm({ ...cForm, body: e.target.value })}
                style={{ height: 140 }}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => {
                  setShowCompose(false);
                  setReply(false);
                }}
              >
                Annuller
              </button>
              <button
                className="btn btn-green"
                onClick={reply ? sendReply : sendMessage}
              >
                {reply ? '↩ Svar' : '📤 Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
