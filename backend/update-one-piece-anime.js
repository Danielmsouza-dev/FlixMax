const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./flixmax.db');

const newBackdrop = "https://i.ibb.co/r2KyS6TW/One-piece-anime-benner.jpg";
const title = "One Piece";  // título exato do anime no banco

db.run(`UPDATE movies SET backdropImage = ? WHERE title = ?`, [newBackdrop, title], function(err) {
  if (err) {
    console.error("❌ Erro ao atualizar:", err.message);
  } else if (this.changes === 0) {
    console.log(`⚠️ Título "${title}" não encontrado. Verifique o nome exato.`);
  } else {
    console.log(`✅ Backdrop do anime "${title}" atualizado com sucesso!`);
  }
  db.close();
});
