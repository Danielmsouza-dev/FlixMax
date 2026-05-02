import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export interface Profile {
  id: number;
  name: string;
  avatar: string;
  createdAt: string;
}

export const profileApi = {
  getAll: () => api.get<Profile[]>('/profiles'),
  create: (name: string, avatar: string) => api.post<Profile>('/profiles', { name, avatar }),
  delete: (id: number) => api.delete(`/profiles/${id}`),
};