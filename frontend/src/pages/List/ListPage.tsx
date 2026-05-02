import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
import { useProfile } from '../../context/ProfileContext';
import './ListPage.css';

const api = axios.create({ baseURL: '/api' });

export default function ListPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [userList, setUserList] = useState<number[]>([]);
  const { profile } = useProfile();

  const fetchList = async () => {
    if (profile) {
      const res = await api.get(`/user-list/${profile.id}`);
      setMovies(res.data);
      setUserList(res.data.map((m: any) => m.id));
    }
  };

  useEffect(() => { fetchList(); }, [profile]);

  const handleAddToList = async (movie: any) => {
    if (!profile) return;
    const isIn = userList.includes(movie.id);
    await api.post('/user-list', { profileId: profile.id, movieId: movie.id, action: isIn ? 'remove' : 'add' });
    if (isIn) setUserList(userList.filter(id => id !== movie.id));
    else setUserList([...userList, movie.id]);
    setSelectedMovie(null);
    fetchList(); // recarregar
  };

  return (
    <div className="list-page">
      <h1>Minha Lista</h1>
      <div className="list-grid">
        {movies.map(m => <MovieCard key={m.id} movie={m} onClick={() => setSelectedMovie(m)} />)}
      </div>
      <MovieModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} onAddToList={handleAddToList} isInList={selectedMovie ? userList.includes(selectedMovie.id) : false} />
    </div>
  );
}
