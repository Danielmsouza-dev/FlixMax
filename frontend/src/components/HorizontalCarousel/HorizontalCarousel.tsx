import { useRef } from 'react';
import { motion } from 'framer-motion';
import MovieCard from '../MovieCard/MovieCard';
import './HorizontalCarousel.css';

export default function HorizontalCarousel({ title, movies, onMovieClick }: { title: string; movies: any[]; onMovieClick: (movie: any) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };
  if (!movies.length) return null;
  return (
    <div className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={() => scroll('left')}>‹</button>
        <div className="carousel-track" ref={scrollRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </div>
        <button className="carousel-arrow right" onClick={() => scroll('right')}>›</button>
      </div>
    </div>
  );
}
