const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./flixmax.db');  // caminho correto

function upsertMovie(movie) {
  const { id, title, description, coverImage, backdropImage, category, type, year, rating } = movie;
  db.run(`INSERT OR REPLACE INTO movies (id, title, description, coverImage, backdropImage, category, type, year, rating)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, title, description, coverImage, backdropImage, category, type, year, rating],
    (err) => { 
      if (err) console.error(`❌ Erro ao inserir ${title}:`, err.message);
      else console.log(`✅ ${title}`);
    }
  );
}

const filmes = [
  { id: 101, title: "Vingadores: Ultimato", description: "Os Vingadores reunidos para desfazer o estalo de Thanos.", coverImage: "https://image.tmdb.org/t/p/w500/q6725aR8Zs4sk2UgjtVJQgVQYpL.jpg", backdropImage: "https://i.ibb.co/6R0c6PVW/banner-vingadores.jpg", category: "Aventura", type: "movie", year: 2019, rating: 8.4 },
  { id: 102, title: "Piratas do Caribe: A Maldição do Pérola Negra", description: "O aventureiro Jack Sparrow se une a Will Turner para resgatar Elizabeth Swann.", coverImage: "https://image.tmdb.org/t/p/w500/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", backdropImage: "https://image.tmdb.org/t/p/original/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", category: "Aventura", type: "movie", year: 2003, rating: 8.0 },
  { id: 103, title: "Harry Potter e a Pedra Filosofal", description: "Um jovem descobre que é um bruxo e ingressa em Hogwarts.", coverImage: "https://image.tmdb.org/t/p/w500/lU0JH2jV9xU6rVb5c0Rz1z2z3z4.jpg", backdropImage: "https://image.tmdb.org/t/p/original/3Y9p0M9fWYV5j8tU0b0cT1f2T3Q.jpg", category: "Aventura", type: "movie", year: 2001, rating: 7.6 },
  { id: 104, title: "One Piece Gold: O Filme", description: "Luffy e seus amigos enfrentam o maior cassino do mundo.", coverImage: "https://image.tmdb.org/t/p/w500/9p6x4dNv8fZqk1x2w3e4r5t6y7u.jpg", backdropImage: "https://image.tmdb.org/t/p/original/8yQbO3sR6tV4zX5w6a7b8c9d0e1f.jpg", category: "Animes", type: "movie", year: 2016, rating: 7.8 },
  { id: 105, title: "Barbie (2023)", description: "Barbie e Ken vivem no mundo cor-de-rosa, mas uma crise existencial os leva ao mundo real.", coverImage: "https://image.tmdb.org/t/p/w500/9p6x4dNv8fZqk1x2w3e4r5t6y7u.jpg", backdropImage: "https://image.tmdb.org/t/p/original/8yQbO3sR6tV4zX5w6a7b8c9d0e1f.jpg", category: "Comédia", type: "movie", year: 2023, rating: 7.2 }
];

const series = [
  { id: 201, title: "Outer Banks", description: "Um grupo de adolescentes descobre um tesouro ligado ao desaparecimento do pai de John B.", coverImage: "https://image.tmdb.org/t/p/w500/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", backdropImage: "https://image.tmdb.org/t/p/original/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", category: "Top 10 Séries", type: "series", year: 2020, rating: 7.6 },
  { id: 202, title: "Stranger Things", description: "Um grupo de crianças desaparece e revela eventos sobrenaturais.", coverImage: "https://image.tmdb.org/t/p/w500/8xV5JWLxH3nUcLZghFjP4jBLn5a.jpg", backdropImage: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg", category: "Top 10 Séries", type: "series", year: 2016, rating: 8.7 },
  { id: 203, title: "One Piece (Live Action)", description: "O pirata Monkey D. Luffy parte em uma jornada para encontrar o lendário tesouro One Piece.", coverImage: "https://image.tmdb.org/t/p/w500/7vjaCdMw15BbtZR54qNwLCx0icL.jpg", backdropImage: "https://image.tmdb.org/t/p/original/8jHkPq8NZ7zQSZ9s6TMcvbMxIsk.jpg", category: "Aventura", type: "series", year: 2023, rating: 8.4 },
  { id: 204, title: "Lupin", description: "Inspirado nas aventuras de Arsène Lupin, um ladrão gentleman busca vingança por seu pai.", coverImage: "https://image.tmdb.org/t/p/w500/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", backdropImage: "https://image.tmdb.org/t/p/original/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", category: "Top 10 Séries", type: "series", year: 2021, rating: 7.8 },
  { id: 205, title: "Todo Mundo Odeia o Chris", description: "Chris, um adolescente inteligente, cresce em um bairro do Brooklyn nos anos 80.", coverImage: "https://image.tmdb.org/t/p/w500/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", backdropImage: "https://image.tmdb.org/t/p/original/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", category: "Comédia", type: "series", year: 2005, rating: 8.0 }
];

const animes = [
  { id: 301, title: "One Piece", description: "Monkey D. Luffy e sua tripulação pirata navegam em busca do tesouro One Piece.", coverImage: "https://image.tmdb.org/t/p/w500/7vjaCdMw15BbtZR54qNwLCx0icL.jpg", backdropImage: "https://image.tmdb.org/t/p/original/8jHkPq8NZ7zQSZ9s6TMcvbMxIsk.jpg", category: "Animes", type: "series", year: 1999, rating: 9.0 },
  { id: 302, title: "Black Clover", description: "Asta, um jovem sem magia, sonha em se tornar o Rei dos Feiticeiros.", coverImage: "https://image.tmdb.org/t/p/w500/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", backdropImage: "https://image.tmdb.org/t/p/original/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", category: "Animes", type: "series", year: 2017, rating: 8.0 },
  { id: 303, title: "Attack on Titan", description: "A humanidade luta pela sobrevivência contra gigantes devoradores de humanos.", coverImage: "https://image.tmdb.org/t/p/w500/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", backdropImage: "https://image.tmdb.org/t/p/original/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", category: "Animes", type: "series", year: 2013, rating: 9.0 },
  { id: 304, title: "Demon Slayer", description: "Tanjiro luta para salvar sua irmã e caçar demônios.", coverImage: "https://image.tmdb.org/t/p/w500/4zYQqZxQzWwUjLqXz6z6z1z2z3.jpg", backdropImage: "https://image.tmdb.org/t/p/original/4zYQqZxQzWwUjLqXz6z6z1z2z3.jpg", category: "Animes", type: "series", year: 2019, rating: 8.8 },
  { id: 305, title: "Hunter x Hunter", description: "Gon Freecss descobre que seu pai é um caçador lendário e parte em uma jornada.", coverImage: "https://image.tmdb.org/t/p/w500/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", backdropImage: "https://image.tmdb.org/t/p/original/5XwMZ5gW5tQF4SxWnqQ5a5c5v5Z.jpg", category: "Animes", type: "series", year: 2011, rating: 8.9 }
];

[...filmes, ...series, ...animes].forEach(upsertMovie);

setTimeout(() => { console.log("\n✅ Todos os títulos foram processados."); db.close(); }, 2000);
