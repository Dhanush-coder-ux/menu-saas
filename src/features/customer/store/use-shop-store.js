import { create } from "zustand";
import { apiService } from "../../../services/api";
import { useMenuStore } from "../../../store/use-menu-store";
import { useThemeStore } from "../../../store/use-theme-store";
import { useCartStore } from "../../../store/use-cart-store";
import { THEMES } from "../../../constants/themes";

export const useShopStore = create((set, get) => {
  // Self-hydration from database
  apiService.getShops().then((shops) => {
    set({ 
      shops,
      currentShop: shops["fresh-cafe"] || null 
    });
  });

  return {
    shops: {},
    currentShopSlug: "fresh-cafe",
    currentShop: null,

    /**
     * Main multi-tenant routing state hydrator.
     * Instantly re-routes visual models, cart items and inventory menus.
     * @param {string} slug 
     * @returns {boolean} True if shop matches records
     */
    loadShop: (slug) => {
      const allShops = get().shops || {};
      const matched = allShops[slug];
      if (!matched) return false;

      set({
        currentShopSlug: slug,
        currentShop: matched
      });

      // 1. Clear customer active cart to avoid mixups
      useCartStore.getState().clearCart();

      // 2. Hydrate shop menu catalog items
      useMenuStore.getState().setItems(matched.menu);

      // 3. Coordinate theme brand presets (Safe lookup against THEMES object)
      const brandTheme = THEMES[matched.themeId] || THEMES.cafe;
      useThemeStore.getState().setTheme(brandTheme.id);

      return true;
    }
  };
});
