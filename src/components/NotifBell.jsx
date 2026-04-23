import { useState } from 'react';
import { fmtDate } from '../utils';

export default function NotifBell({ notifs, setNotifs, uid }) {
  const [open, setOpen] = useState(false);
  const myNotifs = notifs[uid] || [];
  const unread = myNotifs.filter(n => !n.read).length;

  function markAll() {
    setNotifs(p => ({
      ...p,
      [uid]: myNotifs.map(n => ({ ...n, read: true }))
    }));
  }

  const icons = { message: '💬', match: '⚽', training: '🏃', alert: '⚠️' };

  return (
    <div className="nwrap">
      <button
        className="nbtn"
        onClick={() => setOpen(o => !o)}
        aria-label={unread > 0 ? `Notifikationer (${unread} ulæst)` : 'Notifikationer'}
        aria-expanded={open}
        aria-haspopup="true"
      >
        🔔{unread > 0 && <span className="nbadge" aria-hidden="true">{unread}</span>}
      </button>
      {open && (
        <div className="ndrop" role="region" aria-label="Notifikationer" aria-live="polite">
          <div className="ndrop-hdr">
            <span>Notifikationer {unread > 0 && <span style={{ color: 'var(--green)' }} aria-hidden="true">({unread})</span>}</span>
            {unread > 0 && (
              <button
                className="nclear"
                onClick={markAll}
                aria-label="Marker alle notifikationer som læst"
              >
                Marker alle som læst
              </button>
            )}
          </div>
          {myNotifs.length === 0 ? (
            <div className="nempty">Ingen notifikationer</div>
          ) : (
            myNotifs.map(n => (
              <button
                key={n.id}
                className={`nitem${n.read ? '' : ' unread'}`}
                onClick={() =>
                  setNotifs(p => ({
                    ...p,
                    [uid]: myNotifs.map(x => (x.id === n.id ? { ...x, read: true } : x))
                  }))
                }
                aria-pressed={n.read}
                style={{ width: '100%', textAlign: 'left' }}
              >
                <div className={`ndot${n.read ? ' read' : ''}`} aria-hidden="true" />
                <div>
                  <div className="ntext">{icons[n.type] || '📌'} {n.msg}</div>
                  <div className="ndate">{fmtDate(n.date)}</div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
