import { useState, useEffect, useCallback } from 'react';
import { profileApi, Profile } from '../services/api';

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await profileApi.getAll();
      setProfiles(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProfile = useCallback(async (name: string, avatar: string) => {
    try {
      const res = await profileApi.create(name, avatar);
      setProfiles(prev => [...prev, res.data]);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
      return false;
    }
  }, []);

  const deleteProfile = useCallback(async (id: number) => {
    try {
      await profileApi.delete(id);
      setProfiles(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  return { profiles, loading, error, addProfile, deleteProfile, refetch: fetchProfiles };
}