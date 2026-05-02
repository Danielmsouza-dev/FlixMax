import { motion } from 'framer-motion';
import { Profile } from '../../services/api';
import styles from './styles.module.css';

interface Props {
  profile: Profile;
  position: 'prev' | 'current' | 'next';
  onClick?: () => void;
  onDelete?: (id: number) => void;
}

export default function ProfileItem({ profile, position, onClick, onDelete }: Props) {
  const scale = position === 'current' ? 1.2 : 0.8;
  const opacity = position === 'current' ? 1 : 0.6;
  const blur = position === 'current' ? 0 : 4;
  const zIndex = position === 'current' ? 10 : 5;

  return (
    <motion.div
      className={styles.profileItem}
      style={{ zIndex }}
      animate={{
        scale,
        opacity,
        filter: `blur(${blur}px)`,
        y: position === 'prev' ? -80 : position === 'next' ? 80 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      whileHover={position === 'current' ? { scale: 1.25 } : {}}
    >
      <div className={styles.avatarWrapper}>
        <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
        {position === 'current' && <div className={styles.glowRing} />}
      </div>
      <p className={styles.profileName}>{profile.name}</p>
      {position === 'current' && onDelete && (
        <motion.button
          className={styles.deleteBtn}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => { e.stopPropagation(); onDelete(profile.id); }}
        >
          ✕
        </motion.button>
      )}
    </motion.div>
  );
}