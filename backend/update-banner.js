const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database('./flixmax.db');

const newBannerUrl = 'https://i.ibb.co/6R0c6PVW/banner-vingadores.jpg';

db.run(
  "UPDATE movies SET backdropImage = ? WHERE title LIKE '%Vingadores%Ultimato%'",
  [newBannerUrl],
  function(err) {
    if (err) {
      console.error('Erro ao atualizar:', err.message);
    } else if (this.changes === 0) {
      console.log('Filme não encontrado. Inserindo...');
      db.run(`INSERT INTO movies (id, title, description, coverImage, backdropImage, category, type, year, rating)
              VALUES (1, 'Vingadores: Ultimato', 'Os Vingadores reunidos para desfazer o estalo de Thanos.',
                      'https://image.tmdb.org/t/p/w500/q6725aR8Zs4sk2UgjtVJQgVQYpL.jpg',
                      ?, 'Aventura', 'movie', 2019, 8.4)`,
              [newBannerUrl],
              (err2) => {
                if (err2) console.error('Erro ao inserir:', err2.message);
                else console.log('✅ Filme inserido com banner atualizado.');
                db.close();
              });
    } else {
      console.log(`✅ Banner atualizado (${this.changes} linha(s) modificada(s)).`);
      db.close();
    }
  }
);
