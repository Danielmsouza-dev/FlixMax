import { ReactNode } from 'react';
import styles from './Login/Login.module.css';

export default function GlassCard({ children }: { children: ReactNode }) {
  return <div className={styles.glassCard}>{children}</div>;
}