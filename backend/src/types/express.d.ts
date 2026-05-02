import { IProfile } from '../models/IProfile';
export {};
declare global {
  namespace Express {
    interface Request {
      profile?: IProfile;
    }
  }
}