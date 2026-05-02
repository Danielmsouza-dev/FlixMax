const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./flixmax.db');
db.run('ALTER TABLE movies ADD COLUMN trailer_url TEXT', (err) => {
  if (err && !err.message.includes('duplicate column name')) {
    console.error('Erro ao adicionar coluna:', err.message);
  } else {
    console.log('✅ Coluna trailer_url adicionada (ou já existia).');
  }
  db.close();
});
