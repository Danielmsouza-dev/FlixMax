import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../GlassCard';
import ParticlesBackground from '../ParticlesBackground';
import styles from './Login.module.css';

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de auth
    onLogin();
  };

  return (
    <div className={styles.container}>
      <ParticlesBackground />
      <div className={styles.leftSide}>
        <div className={styles.heroImage} />
        <div className={styles.gradientOverlay} />
      </div>
      <div className={styles.rightSide}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard>
            <div className={styles.cardContent}>
              <h2 className={styles.title}>{isLogin ? 'Welcome back' : 'Join FlixMax'}</h2>
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={styles.button}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </motion.button>
              </form>
              <p className={styles.switchText}>
                {isLogin ? "New to FlixMax? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className={styles.switchButton}>
                  {isLogin ? 'Sign up now' : 'Sign in'}
                </button>
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}