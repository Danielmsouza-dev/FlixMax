import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export function useProfiles() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdding = useRef(false);

  const fetchProfiles = useCallback(async () => {
    try {
      const res = await api.get('/profiles');
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const addProfile = async (name: string, avatar: string) => {
    if (isAdding.current) return false;
    isAdding.current = true;
    try {
      const res = await api.post('/profiles', { name, avatar });
      setProfiles(prev => [...prev, res.data]);
      return true;
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao adicionar');
      return false;
    } finally {
      isAdding.current = false;
    }
  };

  const deleteProfile = async (id: number) => {
    try {
      await api.delete(`/profiles/${id}`);
      setProfiles(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err: any) {
      alert('Erro ao deletar');
      return false;
    }
  };

  return { profiles, loading, addProfile, deleteProfile, refetch: fetchProfiles };
}
