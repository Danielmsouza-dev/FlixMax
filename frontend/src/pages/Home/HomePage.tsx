import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../../context/ProfileContext';
import HorizontalCarousel from '../../components/HorizontalCarousel/HorizontalCarousel';
import MovieModal from '../../components/MovieModal/MovieModal';
import './HomePage.css';

const api = axios.create({ baseURL: '/api' });

export default function HomePage() {
  const { profile } = useProfile();
  const [moviesByCategory, setMoviesByCategory] = useState<Record<string, any[]>>({});
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [userList, setUserList] = useState<number[]>([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroMovies, setHeroMovies] = useState<any[]>([]);

  const categories = ['Aventura', 'Comédia', 'Doramas', 'Animes', 'Animações', 'Nacionais'];

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await api.get('/movies');
      const all = res.data;
      // Filmes para o carrossel principal (5 filmes)
      const heroTitles = [
        'Vingadores: Ultimato',
        'Piratas do Caribe: A Maldição do Pérola Negra',
        'Harry Potter e a Pedra Filosofal',
        'One Piece Gold: O Filme',
        'Barbie (2023)'
      ];
      const hero = heroTitles.map(title => all.find((m: any) => m.title === title)).filter(Boolean);
      setHeroMovies(hero);

      // Agrupar por categoria (excluindo Top 10)
      const grouped: Record<string, any[]> = {};
      for (const cat of categories) {
        grouped[cat] = all.filter((m: any) => m.category === cat);
      }
      setMoviesByCategory(grouped);
    };
    const fetchUserList = async () => {
      if (profile) {
        const res = await api.get(`/user-list/${profile.id}`);
        setUserList(res.data.map((m: any) => m.id));
      }
    };
    fetchMovies();
    fetchUserList();
  }, [profile]);

  useEffect(() => {
    if (heroMovies.length === 0) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroMovies]);

  const handleAddToList = async (movie: any) => {
    if (!profile) return;
    const isIn = userList.includes(movie.id);
    await api.post('/user-list', { profileId: profile.id, movieId: movie.id, action: isIn ? 'remove' : 'add' });
    if (isIn) setUserList(userList.filter(id => id !== movie.id));
    else setUserList([...userList, movie.id]);
    setSelectedMovie(null);
  };

  if (heroMovies.length === 0) return <div>Carregando...</div>;

  const currentHero = heroMovies[heroIndex];

  return (
    <div className="home-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHero.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8 }}
          className="hero"
          style={{ backgroundImage: `url(${currentHero.backdropImage})` }}
        >
          <div className="hero-overlay">
            <h1>{currentHero.title}</h1>
            <p>{currentHero.description}</p>
            <button className="hero-button" onClick={() => setSelectedMovie(currentHero)}>Saiba mais</button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="carousels-wrapper">
        {categories.map(cat => (
          <HorizontalCarousel key={cat} title={cat} movies={moviesByCategory[cat] || []} onMovieClick={setSelectedMovie} />
        ))}
      </div>
      <MovieModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} onAddToList={handleAddToList} isInList={selectedMovie ? userList.includes(selectedMovie.id) : false} />
    </div>
  );
}
