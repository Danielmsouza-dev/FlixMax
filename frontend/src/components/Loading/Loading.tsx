import { motion } from 'framer-motion';
export default function Loading() {
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        style={{ display: 'flex', gap: 4, fontSize: '5rem', fontWeight: 800 }}
      >
        <span style={{ color: '#fff' }}>F</span>
        <span style={{ color: '#e50914' }}>X</span>
      </motion.div>
    </div>
  );
}
