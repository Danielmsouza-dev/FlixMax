import { getDb } from '../database/database';
import { IProfile } from '../models/IProfile';

export class ProfileRepository {
  async findAll(): Promise<IProfile[]> {
    const db = await getDb();
    return db.all('SELECT * FROM profiles ORDER BY id ASC');
  }

  async findById(id: number): Promise<IProfile | undefined> {
    const db = await getDb();
    return db.get('SELECT * FROM profiles WHERE id = ?', id);
  }

  async count(): Promise<number> {
    const db = await getDb();
    const result = await db.get('SELECT COUNT(*) as total FROM profiles');
    return result.total;
  }

  async create(profile: Omit<IProfile, 'id'>): Promise<IProfile> {
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO profiles (name, avatar, createdAt) VALUES (?, ?, ?)',
      [profile.name, profile.avatar, profile.createdAt]
    );
    return { id: result.lastID, ...profile };
  }

  async delete(id: number): Promise<boolean> {
    const db = await getDb();
    const result = await db.run('DELETE FROM profiles WHERE id = ?', id);
    return (result.changes ?? 0) > 0;
  }
}