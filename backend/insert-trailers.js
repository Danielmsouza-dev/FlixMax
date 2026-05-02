const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./flixmax.db');

const updates = [
  { title: 'One Piece (Live Action)', trailer: 'https://www.youtube.com/embed/ST2GlrUqnqA' },
  { title: 'Lupin', trailer: 'https://www.youtube.com/embed/FoiQ-Xr8NDI' },
  { title: 'Todo Mundo Odeia o Chris', trailer: 'https://www.youtube.com/embed/HBV6fTT_SH8' },
  { title: 'Barbie (2023)', trailer: 'https://www.youtube.com/embed/Ujs1Ud7k49M' },
  { title: 'One Piece', trailer: 'https://www.youtube.com/embed/lgAwlnGLTUg' },
  { title: 'One Piece Gold: O Filme', trailer: 'https://www.youtube.com/embed/YYnal1n0bBY' },
  { title: 'Outer Banks', trailer: 'https://www.youtube.com/embed/RvBdFwHO3nE' },
  { title: 'Stranger Things', trailer: 'https://www.youtube.com/embed/Nqvx_gb0W5E' },
  { title: 'Harry Potter e a Pedra Filosofal', trailer: 'https://www.youtube.com/embed/9fIObnIGMlI' },
  { title: 'Black Clover', trailer: 'https://www.youtube.com/embed/GaaLzF7F1mc' },
  { title: 'Hunter x Hunter', trailer: 'https://www.youtube.com/embed/uq7IKfjViIw' },
  { title: 'Piratas do Caribe: A Maldição do Pérola Negra', trailer: 'https://www.youtube.com/embed/haenBC_xPnc' },
  { title: 'Demon Slayer', trailer: 'https://www.youtube.com/embed/KN921po7cEE' },
  { title: 'Vingadores: Ultimato', trailer: 'https://www.youtube.com/embed/spJoZReeIeQ' },
  { title: 'Attack on Titan', trailer: 'https://www.youtube.com/embed/LV-nazLVmgo' }
];

let pending = updates.length;
updates.forEach(({ title, trailer }) => {
  db.run('UPDATE movies SET trailer_url = ? WHERE title = ?', [trailer, title], function(err) {
    if (err) {
      console.error(`❌ Erro ao atualizar ${title}:`, err.message);
    } else if (this.changes === 0) {
      console.log(`⚠️ Título não encontrado: ${title}`);
    } else {
      console.log(`✅ Trailer adicionado: ${title}`);
    }
    if (--pending === 0) db.close();
  });
});
