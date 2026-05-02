import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
import { useProfile } from '../../context/ProfileContext';
import './SearchPage.css';

const api = axios.create({ baseURL: '/api' });

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [userList, setUserList] = useState<number[]>([]);
  const { profile } = useProfile();
  const [noResults, setNoResults] = useState(false);
  const [suggestionMovies, setSuggestionMovies] = useState<any[]>([]);

  // Busca filmes sempre que o termo mudar (inclusive vazio)
  useEffect(() => {
    const fetch = async () => {
      if (!searchTerm.trim()) {
        // Se vazio, busca todos os filmes (sem filtro)
        const res = await api.get('/movies');
        setMovies(res.data);
        setNoResults(false);
      } else {
        const params: any = { search: searchTerm };
        const res = await api.get('/movies', { params });
        setMovies(res.data);
        setNoResults(res.data.length === 0);
      }
    };
    fetch();
  }, [searchTerm]);

  useEffect(() => {
    if (profile) {
      api.get(`/user-list/${profile.id}`).then(res => setUserList(res.data.map((m: any) => m.id)));
    }
  }, [profile]);

  // Carregar os filmes de sugestão (Vingadores, Stranger Things, One Piece) uma vez
  useEffect(() => {
    const fetchSuggestions = async () => {
      const titles = ['Vingadores: Ultimato', 'Stranger Things', 'One Piece'];
      const promises = titles.map(title => api.get('/movies', { params: { search: title } }));
      const results = await Promise.all(promises);
      const moviesFound = results.map(res => res.data[0]).filter(Boolean);
      setSuggestionMovies(moviesFound);
    };
    fetchSuggestions();
  }, []);

  const handleAddToList = async (movie: any) => {
    if (!profile) return;
    const isIn = userList.includes(movie.id);
    await api.post('/user-list', { profileId: profile.id, movieId: movie.id, action: isIn ? 'remove' : 'add' });
    if (isIn) setUserList(userList.filter(id => id !== movie.id));
    else setUserList([...userList, movie.id]);
    setSelectedMovie(null);
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Buscar filmes e séries</h1>
        <div className="search-filters">
          <input 
            type="text" 
            placeholder="Digite o título..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="search-results">
        {movies.length > 0 && (
          <>
            <div className="results-title">
              {searchTerm.trim() ? 'Resultados encontrados:' : 'Todos os filmes, séries e animes:'}
            </div>
            <div className="results-grid">
              {movies.map(m => (
                <div key={m.id} className="movie-item">
                  <MovieCard movie={m} onClick={() => setSelectedMovie(m)} />
                  <span className="movie-type-badge">{m.type === 'movie' ? '🎬 Filme' : '📺 Série'}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {noResults && searchTerm.trim() !== '' && (
          <div className="suggestions">
            <p className="suggestions-title">Nenhum resultado para "{searchTerm}". Talvez você goste destes:</p>
            <div className="suggestions-grid">
              {suggestionMovies.map((movie, idx) => (
                <div key={idx} className="movie-item">
                  <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
                  <span className="movie-type-badge">{movie.type === 'movie' ? '🎬 Filme' : '📺 Série'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <MovieModal 
        movie={selectedMovie} 
        isOpen={!!selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        onAddToList={handleAddToList} 
        isInList={selectedMovie ? userList.includes(selectedMovie.id) : false} 
      />
    </div>
  );
}
