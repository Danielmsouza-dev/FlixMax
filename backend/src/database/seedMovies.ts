import { getDb } from './database';

export const moviesData = [
  {
    id: 1,
    title: "Vingadores: Ultimato",
    description: "Os Vingadores reunidos para desfazer o estalo de Thanos.",
    coverImage: "https://image.tmdb.org/t/p/w500/q6725aR8Zs4sk2UgjtVJQgVQYpL.jpg",
    backdropImage: "https://i.ibb.co/6R0c6PVW/banner-vingadores.jpg",
    category: "Aventura",
    type: "movie",
    year: 2019,
    rating: 8.4
  },
  {
    id: 2,
    title: "Stranger Things",
    description: "Um grupo de crianças desaparece e revela eventos sobrenaturais.",
    coverImage: "https://image.tmdb.org/t/p/w500/8xV5JWLxH3nUcLZghFjP4jBLn5a.jpg",
    backdropImage: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    category: "Séries",
    type: "series",
    year: 2016,
    rating: 8.7
  },
  // Adicione outros filmes rapidamente...
];

// Gerar mais 50 filmes para popular as categorias
const categories = ["Aventura", "Comédia", "Doramas", "Animes", "Animações", "Nacionais"];
const types = ["movie", "series"];
const titles = ["Avatar", "Titanic", "Matrix", "Gladiador", "Coringa", "Duna", "The Crown", "Breaking Bad", "Friends", "Game of Thrones"];

for (let i = moviesData.length; i < 60; i++) {
  moviesData.push({
    id: i + 1,
    title: titles[i % titles.length] + " " + i,
    description: "Descrição incrível deste título.",
    coverImage: `https://picsum.photos/id/${i + 100}/300/450`,
    backdropImage: `https://picsum.photos/id/${i + 100}/1920/1080`,
    category: categories[i % categories.length],
    type: types[i % 2],
    year: 2000 + (i % 23),
    rating: parseFloat((Math.random() * 3 + 6).toFixed(1))
  });
}

export async function seedMovies() {
  const db = await getDb();
  await db.exec(`
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
  `);
  const count = await db.get('SELECT COUNT(*) as total FROM movies');
  if (count.total === 0) {
    for (const m of moviesData) {
      await db.run(
        `INSERT INTO movies (id, title, description, coverImage, backdropImage, category, type, year, rating)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [m.id, m.title, m.description, m.coverImage, m.backdropImage, m.category, m.type, m.year, m.rating]
      );
    }
    console.log(`✅ ${moviesData.length} filmes inseridos.`);
  }
}
