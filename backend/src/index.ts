import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database | null = null;

async function initDb() {
  db = await open({
    filename: './flixmax.db',
    driver: sqlite3.Database
  });

  // Criação das tabelas
  await db.exec(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      avatar TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      coverImage TEXT,
      backdropImage TEXT,
      category TEXT,
      type TEXT,
      year INTEGER,
      rating REAL
    );
    CREATE TABLE IF NOT EXISTS user_movie_list (
      profile_id INTEGER,
      movie_id INTEGER,
      PRIMARY KEY (profile_id, movie_id)
    );
  `);

  // Inserir perfis padrão se não existirem
  const profileCount = await db.get('SELECT COUNT(*) as total FROM profiles');
  if (profileCount.total === 0) {
    const avatars = [
      "https://i.ibb.co/wNW2QN5N/zoro.jpg",
      "https://i.ibb.co/fVvSJKsQ/tanjiro.jpg",
      "https://i.ibb.co/FL6B1Rr6/inosuke.jpg",
      "https://i.ibb.co/QFwcSmc6/eren.jpg",
      "https://i.ibb.co/gLp957W9/levi.jpg"
    ];
    const names = ['Zoro', 'Tanjiro', 'Inosuke', 'Eren', 'Levi'];
    for (let i = 0; i < 5; i++) {
      await db.run('INSERT INTO profiles (name, avatar, createdAt) VALUES (?, ?, ?)', [names[i], avatars[i], new Date().toISOString()]);
    }
    console.log('✅ Perfis inseridos');
  }

  // Inserir filmes (especialmente Vingadores com o banner correto)
  const movieCount = await db.get('SELECT COUNT(*) as total FROM movies');
  if (movieCount.total === 0) {
    await db.run(`INSERT INTO movies (id, title, description, coverImage, backdropImage, category, type, year, rating)
      VALUES (1, 'Vingadores: Ultimato', 'Os Vingadores reunidos para desfazer o estalo de Thanos.',
      'https://image.tmdb.org/t/p/w500/q6725aR8Zs4sk2UgjtVJQgVQYpL.jpg',
      'https://i.ibb.co/6R0c6PVW/banner-vingadores.jpg', 'Aventura', 'movie', 2019, 8.4)`);
    // Adicionar mais alguns filmes para teste (opcional)
    console.log('✅ Filme principal inserido');
  }
}

const app = express();
app.use(cors({ origin: 'http://localhost:4000' }));
app.use(express.json());
initDb();

app.get('/api/profiles', async (req, res) => {
  const profiles = await db!.all('SELECT * FROM profiles ORDER BY id ASC');
  res.json(profiles);
});

app.post('/api/profiles', async (req, res) => {
  const { name, avatar } = req.body;
  if (!name || !avatar) return res.status(400).json({ error: 'Nome e avatar obrigatórios' });
  const count = await db!.get('SELECT COUNT(*) as total FROM profiles');
  if (count.total >= 10) return res.status(400).json({ error: 'Máximo de 10 perfis' });
  try {
    const result = await db!.run('INSERT INTO profiles (name, avatar, createdAt) VALUES (?, ?, ?)', [name, avatar, new Date().toISOString()]);
    const newProfile = await db!.get('SELECT * FROM profiles WHERE id = ?', result.lastID);
    res.status(201).json(newProfile);
  } catch (err: any) {
    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Nome já existe' });
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.delete('/api/profiles/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await db!.run('DELETE FROM profiles WHERE id = ?', id);
  if (result.changes === 0) return res.status(404).json({ error: 'Perfil não encontrado' });
  res.status(204).send();
});

app.get('/api/movies', async (req, res) => {
  const { category, search } = req.query;
  let query = 'SELECT * FROM movies';
  const params: any[] = [];
  if (category && category !== 'todos') {
    query += ' WHERE category = ?';
    params.push(category);
  }
  if (search) {
    if (params.length) query += ' AND title LIKE ?';
    else query += ' WHERE title LIKE ?';
    params.push(`%${search}%`);
  }
  res.json(await db!.all(query, params));
});

app.get('/api/user-list/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const movies = await db!.all(`
    SELECT m.* FROM movies m
    JOIN user_movie_list ul ON m.id = ul.movie_id
    WHERE ul.profile_id = ?
  `, profileId);
  res.json(movies);
});

app.post('/api/user-list', async (req, res) => {
  const { profileId, movieId, action } = req.body;
  if (action === 'add') {
    await db!.run('INSERT OR IGNORE INTO user_movie_list (profile_id, movie_id) VALUES (?, ?)', profileId, movieId);
    res.json({ success: true });
  } else if (action === 'remove') {
    await db!.run('DELETE FROM user_movie_list WHERE profile_id = ? AND movie_id = ?', profileId, movieId);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Ação inválida' });
  }
});

app.listen(4001, () => console.log('✅ Backend na porta 4001'));
