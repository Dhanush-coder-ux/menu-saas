import { create } from "zustand";
import { TRANSLATIONS } from "../constants/translations";

export const useLangStore = create((set) => ({
  lang: "en",
  setLang: (lang) => set({ lang }),
  t: (key) => (state) => {
    const dict = TRANSLATIONS[state.lang] || TRANSLATIONS.en;
    return dict[key] || key;
  },
}));
