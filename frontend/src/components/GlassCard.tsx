import { ReactNode } from 'react';
export default function GlassCard({ children }: { children: ReactNode }) {
  return <div className="glass">{children}</div>;
}
