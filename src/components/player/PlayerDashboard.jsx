import { useMemo } from 'react';
import { initials, statusDot, fmtDate } from '../../utils';

export default function PlayerDashboard({ player, messages, currentUser }) {
  const avatar = player.avatar || initials(player.name);
  const rating = player.rating || '-';
  const stats = player.stats || { matches: 0, goals: 0, assists: 0, yellow: 0, red: 0, minutes: 0, clean: 0 }

  const unreadMsgs = useMemo(() => {
    return messages.filter((m) => m.to === currentUser.id && !m.readBy.includes(currentUser.id) && m.from !== currentUser.id);
  }, [messages, currentUser.id]);

  const latestMsg = unreadMsgs.length > 0 ? unreadMsgs[unreadMsgs.length - 1] : null;

  return (
    <div className="page">
      <div className="page-title">👤 Min Profil</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--bg-raised)' }}>
            <div className="phero-av">{avatar}</div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'center' }}>{player.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>#{player.number}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span className="pos-badge" style={{ background: '#f0fdf41a', color: '#22c55e' }}>
                {player.position}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: statusDot(player.status || 'Ready'), fontSize: '0.75rem', fontWeight: 600 }}>
                ● {player.status || 'Ready'}
              </span>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--yellow)', textAlign: 'center' }}>
              {rating}
            </div>
          </div>
          <div style={{ paddingTop: 12 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 8 }}>Status</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>{player.status || 'Ready'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="qs-grid">
            <div className="qs-card">
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Kampe</div>
              <div className="qs-num" style={{ color: 'var(--blue)' }}>{stats.matches}</div>
            </div>
            <div className="qs-card">
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Mål</div>
              <div className="qs-num" style={{ color: 'var(--green)' }}>{stats.goals}</div>
            </div>
            <div className="qs-card">
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Assists</div>
              <div className="qs-num" style={{ color: '#06b6d4' }}>{stats.assists}</div>
            </div>
            <div className="qs-card">
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Gule kort</div>
              <div className="qs-num" style={{ color: 'var(--yellow)' }}>{stats.yellow}</div>
            </div>
            <div className="qs-card">
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Røde kort</div>
              <div className="qs-num" style={{ color: 'var(--red)' }}>{stats.red}</div>
            </div>
            <div className="qs-card">
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 4 }}>Minutter</div>
              <div className="qs-num" style={{ color: '#f59e0b' }}>{stats.minutes}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <div className="card">
          <div className="card-title">Styrker & Svage sider</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <StatBar label="Målscorer" value={stats.goals} max={15} color="var(--green)" />
            <StatBar label="Assists" value={stats.assists} max={12} color="#06b6d4" />
            <StatBar label="Spilletid" value={stats.minutes} max={1800} color="#f59e0b" />
            <StatBar label="Disciplin" value={stats.yellow + stats.red * 3} max={12} color="var(--red)" />
          </div>
        </div>

        {latestMsg && (
          <div className="card">
            <div className="card-title">Ulæst besked fra coach</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 2 }}>Emne</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{latestMsg.subject}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 2 }}>Besked</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', maxHeight: 80, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {latestMsg.body}
                </div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Dato: {fmtDate(latestMsg.date)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatBar({ label, value, max, color }) {
  const percentage = Math.min(100, (value / max) * 100);
  return (
    <div className="sbar-row">
      <div className="sbar-lbl">{label}</div>
      <div className="sbar-track">
        <div className="sbar-fill" style={{ background: color, width: `${percentage}%` }} />
      </div>
      <div className="sbar-val">{value}</div>
    </div>
  );
}
