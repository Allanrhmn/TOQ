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
      <button className="nbtn" onClick={() => setOpen(o => !o)}>
        🔔{unread > 0 && <span className="nbadge">{unread}</span>}
      </button>
      {open && (
        <div className="ndrop">
          <div className="ndrop-hdr">
            <span>Notifikationer {unread > 0 && <span style={{ color: '#22c55e' }}>({unread})</span>}</span>
            {unread > 0 && <button className="nclear" onClick={markAll}>Marker alle som læst</button>}
          </div>
          {myNotifs.length === 0 ? (
            <div className="nempty">Ingen notifikationer</div>
          ) : (
            myNotifs.map(n => (
              <div
                key={n.id}
                className={`nitem${n.read ? '' : ' unread'}`}
                onClick={() =>
                  setNotifs(p => ({
                    ...p,
                    [uid]: myNotifs.map(x => (x.id === n.id ? { ...x, read: true } : x))
                  }))
                }
              >
                <div className={`ndot${n.read ? ' read' : ''}`} />
                <div>
                  <div className="ntext">{icons[n.type] || '📌'} {n.msg}</div>
                  <div className="ndate">{fmtDate(n.date)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
