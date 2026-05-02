import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const avatars = [
  "https://i.ibb.co/wNW2QN5N/zoro.jpg",
  "https://i.ibb.co/fVvSJKsQ/tanjiro.jpg",
  "https://i.ibb.co/FL6B1Rr6/inosuke.jpg",
  "https://i.ibb.co/QFwcSmc6/eren.jpg",
  "https://i.ibb.co/gLp957W9/levi.jpg",
  "https://i.ibb.co/YFvgY4jL/asta.jpg",
  "https://i.ibb.co/5W6YnJ7P/yami.jpg",
  "https://i.ibb.co/9kSXGHpc/Luffy.jpg",
];

export default function ProfileModal({ isOpen, onClose, onSave }: any) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (saving || !name.trim()) return;
    setSaving(true);
    const success = await onSave(name, selectedAvatar);
    setSaving(false);
    if (success) {
      setName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          onClick={(e) => e.stopPropagation()}
          style={{ background: '#1a1a1a', padding: '2rem', borderRadius: 32, minWidth: 340, textAlign: 'center' }}
        >
          <h2 style={{ marginBottom: '1.5rem' }}>Novo perfil</h2>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={saving}
            style={{ width: '100%', padding: '0.8rem', marginBottom: '1.5rem', borderRadius: 16, border: 'none', background: '#333', color: 'white' }}
          />
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {avatars.map((av, idx) => (
              <img
                key={idx}
                src={av}
                width={56}
                height={56}
                style={{
                  borderRadius: '50%',
                  cursor: saving ? 'default' : 'pointer',
                  border: selectedAvatar === av ? '3px solid #e50914' : '2px solid transparent',
                  opacity: saving ? 0.6 : 1
                }}
                onClick={() => !saving && setSelectedAvatar(av)}
              />
            ))}
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            style={{
              background: '#e50914', color: 'white', border: 'none', padding: '0.7rem 1.5rem',
              borderRadius: 40, fontWeight: 'bold', cursor: (saving || !name.trim()) ? 'not-allowed' : 'pointer',
              opacity: (saving || !name.trim()) ? 0.6 : 1
            }}
          >
            {saving ? 'Criando...' : 'Criar'}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
