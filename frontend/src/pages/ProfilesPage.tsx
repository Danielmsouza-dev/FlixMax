import { useState } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import VerticalCarousel from '../components/Profiles/VerticalCarousel';
import ProfileModal from '../components/Profiles/ProfileModal';

export default function ProfilesPage({ onSelectProfile }: { onSelectProfile: (profile: any) => void }) {
  const { profiles, addProfile, deleteProfile, refetch } = useProfiles();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleAdd = async (name: string, avatar: string) => {
    const ok = await addProfile(name, avatar);
    if (ok) {
      await refetch();
      setModalOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    await deleteProfile(id);
    await refetch();
    setDeleteMode(false);
  };

  // Quando clicar no perfil central, seleciona
  const handleProfileClick = (profile: any) => {
    if (!deleteMode) onSelectProfile(profile);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0b0b0b' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <VerticalCarousel
            profiles={profiles}
            onDelete={handleDelete}
            onAdd={() => setModalOpen(true)}
            maxProfiles={10}
            isDeleteMode={deleteMode}
            setIsDeleteMode={setDeleteMode}
            onSelectProfile={handleProfileClick}
          />
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', background: 'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format) center/cover' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)' }} />
      </div>
      <ProfileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAdd} />
    </div>
  );
}
