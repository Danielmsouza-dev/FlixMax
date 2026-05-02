import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';

const service = new ProfileService();

export class ProfileController {
  async getAll(req: Request, res: Response) {
    try {
      const profiles = await service.getAllProfiles();
      res.json(profiles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, avatar } = req.body;
      if (!name || !avatar) {
        return res.status(400).json({ error: 'Name and avatar are required' });
      }
      const newProfile = await service.addProfile(name, avatar);
      res.status(201).json(newProfile);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
      await service.deleteProfile(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}