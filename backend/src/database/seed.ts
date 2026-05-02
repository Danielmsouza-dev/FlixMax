import { getDb } from './database';

const avatars = [
  '/avatars/avatar1.png', '/avatars/avatar2.png', '/avatars/avatar3.png',
  '/avatars/avatar4.png', '/avatars/avatar5.png'
];
const names = ['Ana', 'Bruno', 'Carla', 'Daniel', 'Eduarda'];

export async function seedInitialProfiles() {
  const db = await getDb();
  const count = await db.get('SELECT COUNT(*) as total FROM profiles');
  if (count.total === 0) {
    for (let i = 0; i < 5; i++) {
      await db.run(
        'INSERT INTO profiles (name, avatar, createdAt) VALUES (?, ?, ?)',
        [names[i], avatars[i % avatars.length], new Date().toISOString()]
      );
    }
    console.log('✅ 5 perfis iniciais criados');
  }
}