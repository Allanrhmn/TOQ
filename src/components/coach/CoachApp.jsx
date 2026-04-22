import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import NotifBell from '../NotifBell';
import { RosterTab } from './RosterTab';
import { SetPiecesTab } from './SetPiecesTab';
import { DrillsTab } from './DrillsTab';
import { StatsTab } from './StatsTab';
import { MatchesTab } from './MatchesTab';
import { MinutesLogTab } from './MinutesLogTab';
import { ScheduleTab } from '../shared/ScheduleTab';
import { LineupTab } from '../shared/LineupTab';
import { MessagesPanel } from '../shared/MessagesPanel';

const CoachApp = ({
  currentUser,
  users,
  setUsers,
  players,
  setPlayers,
  messages,
  setMessages,
  notifs,
  setNotifs,
  matches,
  setMatches,
  events,
  setEvents,
  drafts,
  setDrafts,
  onLogout,
}) => {
  const [tab, setTab] = useState('roster');
  const [teamName, setTeamName] = useLocalStorage('teamName', 'Mit Hold');
  const [editingName, setEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(teamName);
  const [seasons] = useLocalStorage('seasons', []);
  const [savedDrills, setSavedDrills] = useLocalStorage('savedDrills', []);
  const [setPiecesBoard, setPiecesBoard] = useLocalStorage('setPiecesBoard', { items: [], lines: [], zones: [] });
  const [drillsBoard, setDrillsBoard] = useLocalStorage('drillsBoard', { items: [], lines: [], zones: [] });

  const handleTeamNameSave = () => {
    if (editNameValue.trim()) {
      setTeamName(editNameValue);
    }
    setEditingName(false);
  };

  const tabs = [
    { id: 'roster', label: '👥 Trup', icon: '👥' },
    { id: 'lineup', label: '⚙ Opstilling', icon: '⚙' },
    { id: 'setpieces', label: '⚽ Sætstykker', icon: '⚽' },
    { id: 'drills', label: '🏃 Øvelser', icon: '🏃' },
    { id: 'minuteslog', label: '⏱ Minutlog', icon: '⏱' },
    { id: 'schedule', label: '📅 Program', icon: '📅' },
    { id: 'matches', label: '⚔ Kampe', icon: '⚔' },
    { id: 'messages', label: '💬 Beskeder', icon: '💬' },
    { id: 'stats', label: '📊 Stats', icon: '📊' },
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
          <div>
            {editingName ? (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input
                  className="form-input"
                  style={{ width: 150 }}
                  value={editNameValue}
                  onChange={(e) => setEditNameValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTeamNameSave()}
                  autoFocus
                />
                <button className="btn btn-sm btn-green" onClick={handleTeamNameSave}>
                  ✓
                </button>
                <button className="btn btn-sm btn-outline" onClick={() => setEditingName(false)}>
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => setEditingName(true)}
                style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', cursor: 'pointer' }}
              >
                {teamName} ✏
              </div>
            )}
          </div>
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
        {tab === 'roster' && <RosterTab players={players} setPlayers={setPlayers} />}
        {tab === 'lineup' && <LineupTab players={players} drafts={drafts} setDrafts={setDrafts} readOnly={false} />}
        {tab === 'setpieces' && <SetPiecesTab players={players} board={setPiecesBoard} setBoard={setPiecesBoard} />}
        {tab === 'drills' && <DrillsTab savedDrills={savedDrills} setSavedDrills={setSavedDrills} />}
        {tab === 'minuteslog' && <MinutesLogTab players={players} setPlayers={setPlayers} />}
        {tab === 'schedule' && <ScheduleTab events={events} setEvents={setEvents} readOnly={false} />}
        {tab === 'matches' && <MatchesTab matches={matches} setMatches={setMatches} />}
        {tab === 'messages' && (
          <MessagesPanel
            role="coach"
            messages={messages}
            setMessages={setMessages}
            users={users}
            players={players}
            currentUser={currentUser}
            setNotifs={setNotifs}
          />
        )}
        {tab === 'stats' && <StatsTab players={players} />}
      </div>
    </div>
  );
};

export default CoachApp;
