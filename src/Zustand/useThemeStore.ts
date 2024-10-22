import { themes } from '@Constants/Theme/useScheme';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from 'react-native';

type Theme = {
  Primary: string;
  Text: string;
  Background: string;
  Opacity: number;
};

interface ThemeStore {
  theme: Theme;
  changeTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set:any, get:any) => ({
      theme: get() || Appearance.getColorScheme() === 'dark' ? themes.dark : themes.light,
      changeTheme: (theme:string) => {
        switch (theme) {
          case 'dark':
            set(() => ({ theme: themes.dark }));
            break;
          case 'light':
            set(() => ({ theme: themes.light }));
            break;
          default:
            break;
        }
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
