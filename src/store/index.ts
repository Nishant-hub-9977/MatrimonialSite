import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Profile {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  broker: string | null;
  experience: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface AppState {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  isProfileLoading: boolean;
  setIsProfileLoading: (loading: boolean) => void;
  notifications: number;
  setNotifications: (count: number) => void;
  messages: number;
  setMessages: (count: number) => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        profile: null,
        setProfile: (profile) => set({ profile }),
        isProfileLoading: false,
        setIsProfileLoading: (loading) => set({ isProfileLoading: loading }),
        notifications: 0,
        setNotifications: (count) => set({ notifications: count }),
        messages: 0,
        setMessages: (count) => set({ messages: count }),
      }),
      {
        name: 'app-storage',
      }
    )
  )
);