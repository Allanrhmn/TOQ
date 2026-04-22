import { useState } from 'react';
import NotifBell from '../NotifBell';
import PlayerDashboard from './PlayerDashboard';
import ScheduleTab from '../shared/ScheduleTab';
import LineupTab from '../shared/LineupTab';
import MessagesPanel from '../shared/MessagesPanel';

const PlayerApp = ({
  currentUser,
  players,
  messages,
  setMessages,
  users,
  notifs,
  setNotifs,
  events,
  setEvents,
  drafts,
  onLogout,
}) => {
  const [tab, setTab] = useState('overview');

  const player = players.find((p) => p.userId === currentUser.id);

  const tabs = [
    { id: 'overview', label: '👤 Oversigt', icon: '👤' },
    { id: 'messages', label: '💬 Beskeder', icon: '💬' },
    { id: 'schedule', label: '📅 Program', icon: '📅' },
    { id: 'lineup', label: '⚙ Opstilling', icon: '⚙' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <nav
        style={{
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>⚽ TeamManager</div>
          <div style={{ display: 'flex', gap: 2 }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={tab === t.id ? 'tab-btn active' : 'tab-btn'}
                title={t.label}
              >
                {t.icon}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <NotifBell notifs={notifs} setNotifs={setNotifs} uid={currentUser.id} />
          <button className="btn btn-outline" onClick={onLogout}>
            Log ud
          </button>
        </div>
      </nav>

      <div style={{ padding: 20, maxWidth: 1400, margin: '0 auto' }}>
        {tab === 'overview' && player && (
          <PlayerDashboard player={player} messages={messages} currentUser={currentUser} users={users} />
        )}
        {tab === 'messages' && (
          <MessagesPanel
            role="player"
            messages={messages}
            setMessages={setMessages}
            users={users}
            players={players}
            currentUser={currentUser}
            setNotifs={setNotifs}
          />
        )}
        {tab === 'schedule' && <ScheduleTab events={events} setEvents={setEvents} readOnly={true} />}
        {tab === 'lineup' && <LineupTab players={players} drafts={drafts} setDrafts={setDrafts} readOnly={true} />}
      </div>
    </div>
  );
};

export default PlayerApp;
