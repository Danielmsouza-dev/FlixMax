import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileItem from './ProfileItem';
import { Profile } from '../../services/api';
import styles from './styles.module.css';

interface Props {
  profiles: Profile[];
  onSelectProfile?: (profile: Profile) => void;
  onAdd?: () => void;
  onDeleteMode?: (id: number) => void;
  maxProfiles: number;
}

export default function ProfileCarousel({ profiles, onSelectProfile, onAdd, onDeleteMode, maxProfiles }: Props) {
  const [items, setItems] = useState<Profile[]>(profiles);
  const [centerIndex, setCenterIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelTimeout = useRef<number>();

  useEffect(() => {
    // Garantir que sempre tenhamos 5 visualmente (duplicados para loop infinito)
    const extended = [...profiles, ...profiles, ...profiles];
    const start = profiles.length;
    setItems(extended);
    setCenterIndex(start + 1);
  }, [profiles]);

  const handleScroll = (direction: 'up' | 'down') => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = direction === 'down' ? centerIndex + 1 : centerIndex - 1;
    setCenterIndex(newIndex);

    setTimeout(() => {
      // Loop infinito: se chegou perto dos limites artificiais, reposicionar
      const realLength = profiles.length;
      if (newIndex >= realLength * 2) {
        setCenterIndex(centerIndex - realLength);
      } else if (newIndex < realLength) {
        setCenterIndex(centerIndex + realLength);
      }
      setIsAnimating(false);
    }, 400);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        if (e.deltaY > 0) handleScroll('down');
        else handleScroll('up');
      }, 50);
    };
    const container = document.getElementById('carousel-container');
    container?.addEventListener('wheel', handleWheel, { passive: false });
    return () => container?.removeEventListener('wheel', handleWheel);
  }, [handleScroll]);

  const getVisibleProfiles = () => {
    if (!items.length) return [];
    const prev = items[centerIndex - 1];
    const current = items[centerIndex];
    const next = items[centerIndex + 1];
    return [prev, current, next].filter(Boolean);
  };

  const visible = getVisibleProfiles();

  return (
    <div id="carousel-container" className={styles.carousel}>
      <div className={styles.carouselTrack}>
        <AnimatePresence mode="wait">
          <motion.div key={centerIndex} className={styles.carouselItems}>
            {visible.map((profile, idx) => {
              let position: 'prev' | 'current' | 'next' = 'next';
              if (idx === 0) position = 'prev';
              if (idx === 1) position = 'current';
              return (
                <ProfileItem
                  key={profile.id}
                  profile={profile}
                  position={position}
                  onClick={() => onSelectProfile?.(profile)}
                  onDelete={onDeleteMode}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      {profiles.length < maxProfiles && (
        <motion.button
          className={styles.addButton}
          whileHover={{ scale: 1.05, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onAdd}
        >
          +
        </motion.button>
      )}
    </div>
  );
}