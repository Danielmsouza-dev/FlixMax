import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../GlassCard';
import ParticlesBackground from '../ParticlesBackground';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(); // autenticação simulada
  };

  return (
    <>
      <ParticlesBackground />
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        {/* Lado esquerdo: imagem com gradiente que se funde ao preto */}
        <div style={{ flex: 1.2, position: 'relative', background: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2450&auto=format) center/cover' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, #0b0b0b 100%)'
          }} />
        </div>
        {/* Lado direito: fundo preto puro (sem linha de separação) */}
        <div style={{ flex: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0b0b' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}>
            <GlassCard>
              <div style={{ padding: '2rem', maxWidth: 460 }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{isLogin ? 'Bem-vindo' : 'Criar conta'}</h2>
                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
                  )}
                  <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                  <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" style={buttonStyle}>
                    {isLogin ? 'Entrar' : 'Cadastrar'}
                  </motion.button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                  {isLogin ? 'Novo aqui? ' : 'Já tem conta? '}
                  <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isLogin ? 'Cadastre-se' : 'Faça login'}
                  </button>
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  width: '100%',
  padding: '1rem',
  marginBottom: '1rem',
  background: 'rgba(51,51,51,0.8)',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '12px',
  color: 'white',
  fontSize: '1rem',
  transition: 'all 0.2s',
};

const buttonStyle = {
  width: '100%',
  background: '#e50914',
  color: 'white',
  padding: '1rem',
  borderRadius: '40px',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
};
