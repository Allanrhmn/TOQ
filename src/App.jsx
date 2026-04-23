import { useState, lazy, Suspense } from 'react';
import { INIT_USERS, INIT_PLAYERS, INIT_MESSAGES, INIT_NOTIFS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import LandingPage from './components/LandingPage';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

const CoachApp = lazy(() => import('./components/coach/CoachApp'));
const PlayerApp = lazy(() => import('./components/player/PlayerApp'));

const App = () => {
  const [users, setUsers] = useLocalStorage('tqm_users', INIT_USERS);
  const [players, setPlayers] = useLocalStorage('tqm_players', INIT_PLAYERS);
  const [messages, setMessages] = useLocalStorage('tqm_messages', INIT_MESSAGES);
  const [notifs, setNotifs] = useLocalStorage('tqm_notifs', INIT_NOTIFS);
  const [matches, setMatches] = useLocalStorage('tqm_matches', []);
  const [events, setEvents] = useLocalStorage('tqm_schedule', {});
  const [drafts, setDrafts] = useLocalStorage('tqm_lineupDrafts', {});

  const [view, setView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginRole, setLoginRole] = useState(null);

  const handleCoachLogin = () => {
    setLoginRole('coach');
    setView('login');
  };

  const handlePlayerLogin = () => {
    setLoginRole('player');
    setView('login');
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setView('app');
  };

  const handleRegister = () => {
    setView('register');
  };

  const handleRegisterDone = () => {
    setView('landing');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('landing');
  };

  return (
    <>
      {view === 'landing' && (
        <LandingPage onCoach={handleCoachLogin} onPlayer={handlePlayerLogin} onRegister={handleRegister} />
      )}

      {view === 'login' && (
        <div className="auth-overlay">
          <LoginModal
            role={loginRole}
            users={users}
            onLogin={handleLogin}
            onClose={() => setView('landing')}
            onSwitch={() => setLoginRole(loginRole === 'coach' ? 'player' : 'coach')}
          />
        </div>
      )}

      {view === 'register' && (
        <div className="auth-overlay">
          <RegisterModal
            users={users}
            setUsers={setUsers}
            players={players}
            setPlayers={setPlayers}
            onClose={() => setView('landing')}
            onDone={handleRegisterDone}
          />
        </div>
      )}

      {view === 'app' && currentUser && currentUser.role === 'coach' && (
        <Suspense fallback={<div className="page">Indlæser...</div>}>
          <CoachApp
            currentUser={currentUser}
            users={users}
            players={players}
            setPlayers={setPlayers}
            messages={messages}
            setMessages={setMessages}
            notifs={notifs}
            setNotifs={setNotifs}
            matches={matches}
            setMatches={setMatches}
            events={events}
            setEvents={setEvents}
            drafts={drafts}
            setDrafts={setDrafts}
            onLogout={handleLogout}
          />
        </Suspense>
      )}

      {view === 'app' && currentUser && currentUser.role === 'player' && (
        <Suspense fallback={<div className="page">Indlæser...</div>}>
          <PlayerApp
            currentUser={currentUser}
            players={players}
            messages={messages}
            setMessages={setMessages}
            users={users}
            notifs={notifs}
            setNotifs={setNotifs}
            events={events}
            setEvents={setEvents}
            drafts={drafts}
            setDrafts={setDrafts}
            onLogout={handleLogout}
          />
        </Suspense>
      )}
    </>
  );
};

export default App;
