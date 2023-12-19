import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (to: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',
  setTheme: (to) => set(() => ({ theme: to })),
}));
