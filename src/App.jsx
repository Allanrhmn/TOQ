import { useState } from 'react';
import { INIT_USERS, INIT_PLAYERS, INIT_MESSAGES, INIT_NOTIFS } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';

const App = () => {
  const [users, setUsers] = useLocalStorage('users', INIT_USERS);
  const [players, setPlayers] = useLocalStorage('players', INIT_PLAYERS);
  const [messages, setMessages] = useLocalStorage('messages', INIT_MESSAGES);
  const [notifs, setNotifs] = useLocalStorage('notifs', INIT_NOTIFS);
  const [matches, setMatches] = useLocalStorage('matches', []);
  const [events, setEvents] = useLocalStorage('events', []);
  const [drafts, setDrafts] = useLocalStorage('drafts', {});

  const [view, setView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogout = () => {
    setCurrentUser(null);
    setView('landing');
  };

  return (
    <div>
      {view === 'landing' && (
        <div>
          <p>Landing Page</p>
          <button onClick={() => setView('login')}>Login</button>
          <button onClick={() => setView('register')}>Register</button>
        </div>
      )}

      {view === 'login' && (
        <div>
          <p>Login Modal</p>
          <button onClick={() => setView('landing')}>Cancel</button>
        </div>
      )}

      {view === 'register' && (
        <div>
          <p>Register Modal</p>
          <button onClick={() => setView('landing')}>Cancel</button>
        </div>
      )}

      {currentUser && currentUser.role === 'coach' && (
        <div>
          <p>Coach App for {currentUser.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {currentUser && currentUser.role === 'player' && (
        <div>
          <p>Player App for {currentUser.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
