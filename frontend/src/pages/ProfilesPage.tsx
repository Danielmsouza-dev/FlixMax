import { useState } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import ProfileCarousel from '../components/Profiles/ProfileCarousel';
import ProfileModal from '../components/Profiles/ProfileModal';

export default function ProfilesPage() {
  const { profiles, addProfile, deleteProfile, refetch } = useProfiles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAdd = async (name: string, avatar: string) => {
    const ok = await addProfile(name, avatar);
    if (ok) refetch();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Remove this profile?')) {
      await deleteProfile(id);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ProfileCarousel
        profiles={profiles}
        onAdd={() => setModalOpen(true)}
        onDeleteMode={handleDelete}
        maxProfiles={10}
      />
      <ProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAdd}
      />
    </div>
  );
}