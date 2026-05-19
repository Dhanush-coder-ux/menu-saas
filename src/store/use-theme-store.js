import { create } from "zustand";
import { THEMES } from "../constants/themes";

export const useThemeStore = create((set) => ({
  theme: THEMES.cafe,
  setTheme: (themeId) =>
    set(() => {
      const selected = THEMES[themeId] || THEMES.cafe;
      // Inject standard global document level classes if needed
      return { theme: selected };
    }),
}));
