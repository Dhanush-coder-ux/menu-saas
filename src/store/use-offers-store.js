import { create } from "zustand";
import { apiService } from "../services/api";

export const useOffersStore = create((set) => {
  // Self-hydration from database
  apiService.getOffers().then((offers) => set({ offers }));

  return {
    offers: [],
    activePopup: {
      id: 1,
      title: "🎉 Festival Monsoon Bonanza!",
      subtitle: "Get flat 20% OFF on all signature lassis & pastries tonight.",
      code: "MONSOON20",
    },
    showPopup: true,
    festivalTheme: null, // 'diwali', 'christmas', null
    setFestivalTheme: (theme) => set({ festivalTheme: theme }),
    dismissPopup: () => set({ showPopup: false }),
  };
});
