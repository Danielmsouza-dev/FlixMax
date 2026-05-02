import { createContext, useContext, useState, ReactNode } from 'react';

interface Profile {
  id: number;
  name: string;
  avatar: string;
}

const ProfileContext = createContext<{ profile: Profile | null; setProfile: (p: Profile | null) => void }>({
  profile: null,
  setProfile: () => {},
});

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  return <ProfileContext.Provider value={{ profile, setProfile }}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => useContext(ProfileContext);
