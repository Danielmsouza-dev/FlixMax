import { motion } from 'framer-motion';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.logo}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className={styles.f}>F</span>
        <span className={styles.x}>X</span>
      </motion.div>
      <motion.div
        className={styles.glow}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}