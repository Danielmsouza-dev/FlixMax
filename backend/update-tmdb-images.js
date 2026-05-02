const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const db = new sqlite3.Database('./flixmax.db');

const TMDB_API_KEY = 'c3fb1f171d3d74e77ec7c5cad6c65b1a'; // Chave pública, apenas para busca de imagens.
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const TITLES_MAP = [
  { title: "One Piece (Live Action)", type: "tv", tmdb_query: "One Piece" },
  { title: "Lupin", type: "tv", tmdb_query: "Lupin" },
  { title: "Todo Mundo Odeia o Chris", type: "tv", tmdb_query: "Everybody Hates Chris" },
  { title: "Barbie (2023)", type: "movie", tmdb_query: "Barbie" },
  { title: "One Piece", type: "tv", tmdb_query: "One Piece" },
  { title: "One Piece Gold: O Filme", type: "movie", tmdb_query: "One Piece Gold" },
  { title: "Outer Banks", type: "tv", tmdb_query: "Outer Banks" },
  { title: "Stranger Things", type: "tv", tmdb_query: "Stranger Things" },
  { title: "Harry Potter e a Pedra Filosofal", type: "movie", tmdb_query: "Harry Potter and the Philosopher's Stone" },
  { title: "Black Clover", type: "tv", tmdb_query: "Black Clover" },
  { title: "Hunter x Hunter", type: "tv", tmdb_query: "Hunter x Hunter" },
  { title: "Piratas do Caribe: A Maldição do Pérola Negra", type: "movie", tmdb_query: "Pirates of the Caribbean: The Curse of the Black Pearl" },
  { title: "Demon Slayer", type: "tv", tmdb_query: "Demon Slayer" },
  { title: "Vingadores: Ultimato", type: "movie", tmdb_query: "Avengers: Endgame" },
  { title: "Attack on Titan", type: "tv", tmdb_query: "Attack on Titan" }
];

const fetchTMDBData = async () => {
  for (const item of TITLES_MAP) {
    try {
      const searchUrl = `${TMDB_BASE_URL}/search/${item.type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(item.tmdb_query)}`;
      const searchRes = await axios.get(searchUrl);
      const result = searchRes.data.results[0];
      if (!result) {
        console.log(`⚠️ Título não encontrado no TMDB: ${item.title}`);
        continue;
      }

      const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
      const backdropUrl = result.backdrop_path ? `${imageBaseUrl}${result.backdrop_path}` : null;
      const posterUrl = result.poster_path ? `${imageBaseUrl}${result.poster_path}` : null;

      let updates = [];
      if (backdropUrl) updates.push(`backdropImage = '${backdropUrl}'`);
      if (posterUrl) updates.push(`coverImage = '${posterUrl}'`);

      if (updates.length === 0) {
        console.log(`❌ Nenhuma imagem disponível para: ${item.title}`);
        continue;
      }

      const updateQuery = `UPDATE movies SET ${updates.join(', ')} WHERE title = ?`;
      db.run(updateQuery, [item.title], function(err) {
        if (err) console.error(`❌ Erro ao atualizar ${item.title}:`, err.message);
        else if (this.changes === 0) console.log(`⚠️ Título não encontrado no banco: ${item.title}`);
        else console.log(`✅ Imagens atualizadas: ${item.title}`);
      });
    } catch (err) {
      console.error(`❌ Erro na requisição para ${item.title}:`, err.message);
    }
  }
  setTimeout(() => db.close(), 2000);
};

fetchTMDBData();
