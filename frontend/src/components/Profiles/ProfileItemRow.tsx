import { motion } from 'framer-motion';
export default function ProfileItemRow({ profile, onDelete, isDeleteMode, onClick }: any) {
  const handleClick = (e: any) => {
    if (isDeleteMode) return;
    onClick?.();
  };
  return (
    <motion.div
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '60px',
        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(4px)', cursor: isDeleteMode ? 'default' : 'pointer'
      }}
      whileHover={!isDeleteMode ? { scale: 1.02, background: 'rgba(229,9,20,0.2)' } : {}}
      onClick={handleClick}
    >
      <img src={profile.avatar} alt={profile.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e50914' }} />
      <span style={{ fontSize: '1.2rem', fontWeight: 500 }}>{profile.name}</span>
      {isDeleteMode && (
        <button onClick={(e) => { e.stopPropagation(); onDelete(profile.id); }} style={{ marginLeft: 'auto', background: '#222', border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#ff4d4d', cursor: 'pointer' }}>✕</button>
      )}
    </motion.div>
  );
}
