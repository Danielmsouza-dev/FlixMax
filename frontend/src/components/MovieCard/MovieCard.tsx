import { motion } from 'framer-motion';
import './MovieCard.css';

export default function MovieCard({ movie, onClick }: { movie: any; onClick?: () => void }) {
  return (
    <motion.div className="movie-card" whileHover={{ scale: 1.05, y: -10 }} transition={{ duration: 0.2 }} onClick={onClick}>
      <img src={movie.coverImage} alt={movie.title} className="movie-card-image" />
      <div className="movie-card-overlay">
        <span className="movie-card-title">{movie.title}</span>
      </div>
    </motion.div>
  );
}
