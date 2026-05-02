import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ProfileItemRow from './ProfileItemRow';

export default function VerticalCarousel({ profiles, onDelete, onAdd, maxProfiles, isDeleteMode, setIsDeleteMode, onSelectProfile }: any) {
  // Hooks devem vir primeiro
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelTimeout = useRef<any>();
  const animationTimer = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Effect para scroll do mouse (apenas se houver perfis)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || profiles.length === 0) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        if (e.deltaY > 0) handleScroll('down');
        else handleScroll('up');
      }, 30);
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [profiles.length]);

  // Se não há perfis, mostra apenas a mensagem e o botão de adicionar
  if (!profiles || profiles.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
        <p style={{ marginBottom: '1.5rem' }}>Nenhum perfil disponível. Crie o primeiro!</p>
        <button
          onClick={onAdd}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#e50914',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
            margin: '0 auto',
          }}
        >
          +
        </button>
      </div>
    );
  }

  const total = profiles.length;
  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    return [prev, currentIndex, next];
  };
  const [prevIndex, centerIndex, nextIndex] = getVisibleIndices();

  const handleScroll = (direction: 'up' | 'down') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => direction === 'down' ? (prev + 1) % total : (prev - 1 + total) % total);
    if (animationTimer.current) clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div id="vertical-carousel" ref={containerRef} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
      <motion.div key={`prev-${prevIndex}`} animate={{ opacity: 0.6, scale: 0.9 }} transition={{ duration: 0.4 }} onClick={() => onSelectProfile(profiles[prevIndex])}>
        <ProfileItemRow profile={profiles[prevIndex]} onDelete={onDelete} isDeleteMode={isDeleteMode} />
      </motion.div>
      <motion.div key={`center-${centerIndex}`} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} onClick={() => onSelectProfile(profiles[centerIndex])}>
        <ProfileItemRow profile={profiles[centerIndex]} onDelete={onDelete} isDeleteMode={isDeleteMode} />
      </motion.div>
      <motion.div key={`next-${nextIndex}`} animate={{ opacity: 0.6, scale: 0.9 }} transition={{ duration: 0.4 }} onClick={() => onSelectProfile(profiles[nextIndex])}>
        <ProfileItemRow profile={profiles[nextIndex]} onDelete={onDelete} isDeleteMode={isDeleteMode} />
      </motion.div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
        {profiles.length < maxProfiles && (
          <button onClick={onAdd} style={buttonStyle}>+</button>
        )}
        <button onClick={() => setIsDeleteMode(!isDeleteMode)} style={{ ...buttonStyle, background: isDeleteMode ? '#e50914' : '#333' }}>
          {isDeleteMode ? '✓' : '−'}
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: 48, height: 48, borderRadius: '50%', background: '#e50914', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer'
};
