import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import NotifBell from '../NotifBell';
import RosterTab from './RosterTab';
import SetPiecesTab from './SetPiecesTab';
import DrillsTab from './DrillsTab';
import StatsTab from './StatsTab';
import MatchesTab from './MatchesTab';
import MinutesLogTab from './MinutesLogTab';
import ScheduleTab from '../shared/ScheduleTab';
import LineupTab from '../shared/LineupTab';
import MessagesPanel from '../shared/MessagesPanel';

const CoachApp = ({
  currentUser,
  users,
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
  const [savedDrills, setSavedDrills] = useLocalStorage('savedDrills', []);

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
    <div className="page-wrapper">
      <nav className="nav glass">
        <div className="nav-left">
          <div className="nav-logo">
            {editingName ? (
              <div className="nav-logo-edit">
                <input
                  className="form-input"
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
              <button
                className="nav-logo-text"
                onClick={() => setEditingName(true)}
                title="Tryk for at redigere holdet navn"
              >
                {teamName} ✏
              </button>
            )}
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
        {tab === 'roster' && <RosterTab players={players} setPlayers={setPlayers} />}
        {tab === 'lineup' && <LineupTab players={players} drafts={drafts} setDrafts={setDrafts} readOnly={false} />}
        {tab === 'setpieces' && <SetPiecesTab />}
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
