import { useMemo } from 'react';
import { initials, statusDot, fmtDate } from '../../utils';

export default function PlayerDashboard({ player, messages, currentUser, users }) {
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              paddingBottom: 12,
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 700,
              }}
            >
              {avatar}
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', textAlign: 'center' }}>{player.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>#{player.number}</div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  background: '#f0fdf4',
                  color: '#166534',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {player.position}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  color: statusDot(player.status || 'Ready'),
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                ● {player.status || 'Ready'}
              </span>
            </div>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#fbbf24',
                textAlign: 'center',
              }}
            >
              {rating}
            </div>
          </div>
          <div style={{ paddingTop: 12 }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 8 }}>Status</div>
            <div style={{ fontSize: '0.8rem', color: '#374151' }}>{player.status || 'Ready'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Kampe</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>{stats.matches}</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Mål</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>{stats.goals}</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Assists</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#06b6d4' }}>{stats.assists}</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Gule kort</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#eab308' }}>{stats.yellow}</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Røde kort</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>{stats.red}</div>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Minutter</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>{stats.minutes}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <div className="card">
          <div className="card-title">Styrker & Svage sider</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: 6 }}>Målscorer</div>
              <div
                style={{
                  height: 8,
                  background: '#e5e7eb',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: '#22c55e',
                    width: `${Math.min(100, (stats.goals / 15) * 100)}%`,
                  }}
                />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 4 }}>{stats.goals} mål</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: 6 }}>Assists</div>
              <div
                style={{
                  height: 8,
                  background: '#e5e7eb',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: '#06b6d4',
                    width: `${Math.min(100, (stats.assists / 12) * 100)}%`,
                  }}
                />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 4 }}>{stats.assists} assists</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: 6 }}>Spilletid</div>
              <div
                style={{
                  height: 8,
                  background: '#e5e7eb',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: '#f59e0b',
                    width: `${Math.min(100, (stats.minutes / 1800) * 100)}%`,
                  }}
                />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 4 }}>{stats.minutes} minutter</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: 6 }}>Disciplin</div>
              <div
                style={{
                  height: 8,
                  background: '#e5e7eb',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    background: '#ef4444',
                    width: `${Math.min(100, ((stats.yellow + stats.red * 3) / 12) * 100)}%`,
                  }}
                />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 4 }}>
                {stats.yellow} gule + {stats.red} røde
              </div>
            </div>
          </div>
        </div>

        {latestMsg && (
          <div className="card">
            <div className="card-title">Ulæst besked fra coach</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 2 }}>Emne</div>
                <div style={{ fontWeight: 600, color: '#111827' }}>{latestMsg.subject}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: 2 }}>Besked</div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#374151',
                    maxHeight: 80,
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {latestMsg.body}
                </div>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Dato: {fmtDate(latestMsg.date)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
