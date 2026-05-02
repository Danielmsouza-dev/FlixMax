const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./flixmax.db');

// Mapeamento: título (exato como no banco) -> nova imagem de fundo (backdropImage)
const updates = [
  { title: "Stranger Things", backdrop: "https://i.ibb.co/S7WL9f0V/Banner-Strager-Things.jpg" },
  { title: "Outer Banks", backdrop: "https://i.ibb.co/HfWBFcPJ/Banner-Outer-Banks.jpg" },
  { title: "One Piece (Live Action)", backdrop: "https://i.ibb.co/4ZmvTf0X/One-Piece-a-Serie-banner.jpg" },
  { title: "Piratas do Caribe: A Maldição do Pérola Negra", backdrop: "https://i.ibb.co/jPjtQLd4/Pirats-do-caribe-banner.jpg" },
  { title: "Black Clover", backdrop: "https://i.ibb.co/gZvgkRd4/Black-Clover-banner.jpg" },
  { title: "Barbie (2023)", backdrop: "https://i.ibb.co/NggkvYZn/Barbie-banner.jpg" },
  { title: "Demon Slayer", backdrop: "https://i.ibb.co/hRnRQ9sV/Demon-slayer-banner.jpg" },
  { title: "Harry Potter e a Pedra Filosofal", backdrop: "https://i.ibb.co/FpW2tPt/Harry-Potter-banner.jpg" },
  { title: "One Piece Gold: O Filme", backdrop: "https://i.ibb.co/v6ct4rRT/One-piece-gold-benner.jpg" },
  { title: "Attack on Titan", backdrop: "https://i.ibb.co/Q7HL68JH/Atack-On-Titan-banner.jpg" },
  { title: "Hunter x Hunter", backdrop: "https://i.ibb.co/TM2Fcjjj/Hunter-X-Hunter-banner.jpg" },
  { title: "Todo Mundo Odeia o Chris", backdrop: "https://i.ibb.co/Yv9x1RQ/Todo-Mundo-Odeia-o-Cris-banner.jpg" },
  { title: "Lupin", backdrop: "https://i.ibb.co/81tx4XB/Lupin-banner.jpg" }
];

let pending = updates.length;

updates.forEach(({ title, backdrop }) => {
  db.run(`UPDATE movies SET backdropImage = ? WHERE title = ?`, [backdrop, title], function(err) {
    if (err) {
      console.error(`❌ Erro ao atualizar ${title}:`, err.message);
    } else if (this.changes === 0) {
      console.log(`⚠️ Título não encontrado: ${title}`);
    } else {
      console.log(`✅ Backdrop atualizado: ${title}`);
    }
    if (--pending === 0) {
      // Após todas as atualizações, remover duplicata do Vingadores: Ultimato (caso exista)
      db.run(`DELETE FROM movies WHERE title = 'Vingadores: Ultimato' AND id != (SELECT MIN(id) FROM movies WHERE title = 'Vingadores: Ultimato')`, function(err) {
        if (err) {
          console.error("❌ Erro ao remover duplicata:", err.message);
        } else if (this.changes > 0) {
          console.log(`🗑️ Removida ${this.changes} duplicata(s) de Vingadores: Ultimato`);
        } else {
          console.log("ℹ️ Nenhuma duplicata encontrada para Vingadores: Ultimato");
        }
        db.close();
      });
    }
  });
});
