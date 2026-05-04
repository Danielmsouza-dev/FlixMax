import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const avatars = [
  '/avatars/avatar1.png', '/avatars/avatar2.png', '/avatars/avatar3.png',
  '/avatars/avatar4.png', '/avatars/avatar5.png'
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, avatar: string) => void;
}

export default function ProfileModal({ isOpen, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim(), selectedAvatar);
      setName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add new profile</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Profile name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.modalInput}
                autoFocus
              />
              <div className={styles.avatarSelector}>
                {avatars.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    className={`${styles.avatarOption} ${selectedAvatar === av ? styles.selectedAvatar : ''}`}
                    onClick={() => setSelectedAvatar(av)}
                  />
                ))}
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Create</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}