const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const db = new sqlite3.Database('./flixmax.db');

// Chave pública de exemplo (não expira, apenas para leitura de imagens)
// Esta chave é do site themoviedb.org e é mantida para fins educacionais/demo.
const TMDB_API_KEY = 'e82c0f242d2d45a9f9b8c1b3a2d4e5f6';
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

const fetchBackdrops = async () => {
  for (const item of TITLES_MAP) {
    try {
      const searchUrl = `${TMDB_BASE_URL}/search/${item.type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(item.tmdb_query)}`;
      const searchRes = await axios.get(searchUrl);
      const result = searchRes.data.results[0];
      if (!result) {
        console.log(`⚠️ Não encontrado: ${item.title}`);
        continue;
      }
      const backdropUrl = result.backdrop_path ? `https://image.tmdb.org/t/p/original${result.backdrop_path}` : null;
      if (!backdropUrl) {
        console.log(`❌ Sem backdrop para: ${item.title}`);
        continue;
      }
      // Atualizar APENAS o backdropImage (não mexe na coverImage)
      db.run('UPDATE movies SET backdropImage = ? WHERE title = ?', [backdropUrl, item.title], function(err) {
        if (err) console.error(`Erro em ${item.title}:`, err.message);
        else if (this.changes === 0) console.log(`⚠️ Título não encontrado no banco: ${item.title}`);
        else console.log(`✅ Backdrop atualizado: ${item.title}`);
      });
    } catch (err) {
      console.error(`❌ Erro requisição ${item.title}:`, err.message);
    }
  }
  setTimeout(() => db.close(), 2000);
};

fetchBackdrops();
