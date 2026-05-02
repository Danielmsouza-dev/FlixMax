import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import LoadingPage from './pages/LoadingPage';
import LoginPage from './pages/LoginPage';
import ProfilesPage from './pages/ProfilesPage';
import HomePage from './pages/Home/HomePage';
import SearchPage from './pages/Search/SearchPage';
import ListPage from './pages/List/ListPage';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
import { FaHome, FaSearch } from 'react-icons/fa';
import './components/MenuDrawer/MenuDrawer.css';

function AppContent() {
  const [phase, setPhase] = useState<'loading'|'login'|'profiles'|'home'>('loading');
  const { profile, setProfile } = useProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setPhase('login'), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => setPhase('profiles');
  const handleSelectProfile = (selected: any) => {
    setProfile(selected);
    setPhase('home');
    navigate('/');
  };

  const handleSwitchProfile = () => {
    setPhase('profiles');
    setMenuOpen(false);
  };

  if (phase === 'loading') return <LoadingPage />;
  if (phase === 'login') return <LoginPage onLogin={handleLogin} />;
  if (phase === 'profiles') return <ProfilesPage onSelectProfile={handleSelectProfile} />;

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 2rem', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={profile?.avatar} alt={profile?.name} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #e50914' }} />
          <span style={{ fontWeight: 500 }}>{profile?.name}</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/')} style={navButtonStyle}><FaHome /> Início</button>
          <button onClick={() => navigate('/search')} style={navButtonStyle}><FaSearch /> Buscar</button>
          <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.8rem', cursor: 'pointer' }}>☰</button>
        </div>
      </div>
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mylist" element={<ListPage />} />
        </Routes>
      </div>
      <MenuDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} profileName={profile?.name || ''} onSwitchProfile={handleSwitchProfile} />
    </div>
  );
}

const navButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '1rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  transition: 'color 0.2s',
};

export default function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </BrowserRouter>
  );
}
