const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./flixmax.db');

// Mapeamento: título exato (como está no banco) -> nova URL da capa
const updates = [
  { title: "One Piece (Live Action)", cover: "https://i.ibb.co/3yH93pzK/capa-one-piece-a-serie.jpg" },
  { title: "Demon Slayer", cover: "https://i.ibb.co/k6557Y5z/capa-demon-slayer.jpg" },
  { title: "Barbie (2023)", cover: "https://i.ibb.co/VWJXSPTZ/capa-barbie.jpg" },
  { title: "Piratas do Caribe: A Maldição do Pérola Negra", cover: "https://i.ibb.co/bRjwYdW1/capa-piratas-do-caribe.jpg" },
  { title: "Black Clover", cover: "https://i.ibb.co/wFMF8DdW/capa-black-clover.jpg" },
  { title: "Outer Banks", cover: "https://i.ibb.co/Q7hpSYrj/capa-outer-banks.jpg" },
  { title: "Stranger Things", cover: "https://i.ibb.co/BVxq17MD/capa-stranger-things.jpg" },
  { title: "Attack on Titan", cover: "https://i.ibb.co/VcQKBPhS/capa-atack-on-titan.jpg" },
  { title: "Vingadores: Ultimato", cover: "https://i.ibb.co/Pv1KWTxC/capa-vingadores-ultimato.jpg" },
  { title: "Todo Mundo Odeia o Chris", cover: "https://i.ibb.co/h1RgbTZX/capa-todo-mundo-odeia-o-chris.jpg" },
  { title: "Hunter x Hunter", cover: "https://i.ibb.co/1tMq51F0/capa-hunter-x-hunter.jpg" },
  { title: "Harry Potter e a Pedra Filosofal", cover: "https://i.ibb.co/RGqZwcts/capa-harry-potter.jpg" },
  { title: "Lupin", cover: "https://i.ibb.co/3mVLQTCt/capa-lupin.jpg" },
  { title: "One Piece", cover: "https://i.ibb.co/HJ47cG4/capa-one-piece-anime.jpg" },
  { title: "One Piece Gold: O Filme", cover: "https://i.ibb.co/hRzJCYD6/capa-one-piece-gold.jpg" }
];

let pending = updates.length;

updates.forEach(({ title, cover }) => {
  db.run(`UPDATE movies SET coverImage = ? WHERE title = ?`, [cover, title], function(err) {
    if (err) {
      console.error(`❌ Erro ao atualizar capa de ${title}:`, err.message);
    } else if (this.changes === 0) {
      console.log(`⚠️ Título não encontrado: ${title}`);
    } else {
      console.log(`✅ Capa atualizada: ${title}`);
    }
    if (--pending === 0) {
      console.log("\n🎉 Todas as capas foram processadas!");
      db.close();
    }
  });
});
