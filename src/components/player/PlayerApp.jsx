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
    <div className="page-wrapper">
      <nav className="nav glass">
        <div className="nav-left">
          <div className="nav-logo">
            <div className="nav-logo-text">⚽ TeamManager</div>
          </div>
          <div className="nav-tabs" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={tab === t.id ? 'tab-btn active' : 'tab-btn'}
                role="tab"
                aria-selected={tab === t.id}
                aria-label={t.label}
                title={t.label}
              >
                {t.icon}
              </button>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <NotifBell notifs={notifs} setNotifs={setNotifs} uid={currentUser.id} />
          <button className="btn btn-outline" onClick={onLogout}>
            Log ud
          </button>
        </div>
      </nav>

      <div className="content-wrapper">
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
