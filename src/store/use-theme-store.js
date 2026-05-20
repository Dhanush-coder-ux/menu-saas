import { create } from "zustand";
import { THEMES } from "../constants/themes";

export const useThemeStore = create((set) => ({
  theme: THEMES.cyberNeon || Object.values(THEMES)[0],
  setTheme: (themeId) =>
    set(() => {
      const selected = THEMES[themeId] || THEMES.cyberNeon || Object.values(THEMES)[0];
      // Inject standard global document level classes if needed
      return { theme: selected };
    }),
}));
