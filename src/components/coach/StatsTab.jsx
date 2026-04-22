import { useMemo } from 'react';
import { posColor, statusDot } from '../../utils';

export const StatsTab = ({ players }) => {
  const topScorer = useMemo(() => {
    if (!players || players.length === 0) return null;
    return players.reduce((max, p) => (p.stats?.goals || 0) > (max.stats?.goals || 0) ? p : max);
  }, [players]);

  const topAssist = useMemo(() => {
    if (!players || players.length === 0) return null;
    return players.reduce((max, p) => (p.stats?.assists || 0) > (max.stats?.assists || 0) ? p : max);
  }, [players]);

  const mostMins = useMemo(() => {
    if (!players || players.length === 0) return null;
    return players.reduce((max, p) => (p.stats?.minutes || 0) > (max.stats?.minutes || 0) ? p : max);
  }, [players]);

  const byPos = useMemo(() => {
    const dist = {};
    (players || []).forEach((p) => {
      dist[p.position] = (dist[p.position] || 0) + 1;
    });
    return dist;
  }, [players]);

  const sorted = useMemo(() => {
    return [...(players || [])].sort((a, b) => (b.stats?.goals || 0) - (a.stats?.goals || 0));
  }, [players]);

  return (
    <div className="page">
      <div className="page-title">📊 Statistik</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Top Målscorer</div>
          {topScorer ? (
            <>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#22c55e' }}>{topScorer.name}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e' }}>{topScorer.stats?.goals || 0}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>mål</div>
            </>
          ) : (
            <div className="text-muted">–</div>
          )}
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Top Assists</div>
          {topAssist ? (
            <>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#3b82f6' }}>{topAssist.name}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3b82f6' }}>{topAssist.stats?.assists || 0}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>assists</div>
            </>
          ) : (
            <div className="text-muted">–</div>
          )}
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: 4 }}>Flest Minutter</div>
          {mostMins ? (
            <>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>{mostMins.name}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#f59e0b' }}>{mostMins.stats?.minutes || 0}</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>min</div>
            </>
          ) : (
            <div className="text-muted">–</div>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-title">Positionsfordeling</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', minHeight: 60 }}>
          {['GK', 'DEF', 'MID', 'FWD'].map((pos) => (
            <div key={pos} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ height: Math.max(20, (byPos[pos] || 0) * 30), width: '100%', background: posColor(pos), borderRadius: 4 }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151' }}>{pos}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>{byPos[pos] || 0}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Scoreboard</div>
        <table className="roster-table">
          <thead>
            <tr>
              <th>Navn</th>
              <th>Pos</th>
              <th>Kampe</th>
              <th>Mål</th>
              <th>Assists</th>
              <th>Gule kort</th>
              <th>Røde kort</th>
              <th>Minutter</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: posColor(p.position) + '20',
                      color: posColor(p.position),
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  >
                    {p.position}
                  </span>
                </td>
                <td style={{ color: '#94a3b8' }}>{p.stats?.matches || 0}</td>
                <td style={{ color: '#22c55e', fontWeight: 700 }}>{p.stats?.goals || 0}</td>
                <td style={{ color: '#3b82f6', fontWeight: 700 }}>{p.stats?.assists || 0}</td>
                <td style={{ color: '#eab308', fontWeight: 700 }}>{p.stats?.yellow || 0}</td>
                <td style={{ color: '#ef4444', fontWeight: 700 }}>{p.stats?.red || 0}</td>
                <td style={{ color: '#f59e0b', fontWeight: 700 }}>{p.stats?.minutes || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
