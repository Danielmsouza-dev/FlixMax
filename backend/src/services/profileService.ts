import { ProfileRepository } from '../repositories/profileRepository';
import { IProfile } from '../models/IProfile';

const MAX_PROFILES = 10;

export class ProfileService {
  private repository: ProfileRepository;

  constructor() {
    this.repository = new ProfileRepository();
  }

  async getAllProfiles(): Promise<IProfile[]> {
    return this.repository.findAll();
  }

  async addProfile(name: string, avatar: string): Promise<IProfile> {
    const currentCount = await this.repository.count();
    if (currentCount >= MAX_PROFILES) {
      throw new Error(`Maximum of ${MAX_PROFILES} profiles reached`);
    }
    const existing = await this.repository.findAll();
    if (existing.some(p => p.name.toLowerCase() === name.toLowerCase())) {
      throw new Error('Profile name already exists');
    }
    const newProfile: Omit<IProfile, 'id'> = {
      name: name.trim(),
      avatar,
      createdAt: new Date().toISOString()
    };
    return this.repository.create(newProfile);
  }

  async deleteProfile(id: number): Promise<void> {
    const profile = await this.repository.findById(id);
    if (!profile) throw new Error('Profile not found');
    const success = await this.repository.delete(id);
    if (!success) throw new Error('Failed to delete profile');
  }
}