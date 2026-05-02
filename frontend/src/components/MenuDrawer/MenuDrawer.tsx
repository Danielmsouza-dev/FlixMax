import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaList, FaUserFriends } from 'react-icons/fa';
import './MenuDrawer.css';

export default function MenuDrawer({ isOpen, onClose, profileName, onSwitchProfile }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="menu-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25 }}>
            <div className="menu-header">
              <h3>Olá, {profileName}</h3>
              <button onClick={onClose}>✕</button>
            </div>
            <ul className="menu-links">
              <li><Link to="/" onClick={onClose}><FaHome /> Início</Link></li>
              <li><Link to="/search" onClick={onClose}><FaSearch /> Buscar</Link></li>
              <li><Link to="/mylist" onClick={onClose}><FaList /> Minha Lista</Link></li>
              <li><button onClick={onSwitchProfile} className="switch-profile-btn"><FaUserFriends /> Trocar perfil</button></li>
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
