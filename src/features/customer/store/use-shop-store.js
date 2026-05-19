import { create } from "zustand";
import { SHOPS_DATABASE } from "../mock/shops-database";
import { useMenuStore } from "../../../store/use-menu-store";
import { useThemeStore } from "../../../store/use-theme-store";
import { useCartStore } from "../../../store/use-cart-store";
import { THEMES } from "../../../constants/themes";

export const useShopStore = create((set, get) => ({
  currentShopSlug: "fresh-cafe",
  currentShop: SHOPS_DATABASE["fresh-cafe"],

  /**
   * Main multi-tenant routing state hydrator.
   * Instantly re-routes visual models, cart items and inventory menus.
   * @param {string} slug 
   * @returns {boolean} True if shop matches records
   */
  loadShop: (slug) => {
    const matched = SHOPS_DATABASE[slug];
    if (!matched) return false;

    set({
      currentShopSlug: slug,
      currentShop: matched
    });

    // 1. Clear customer active cart to avoid mixups
    useCartStore.getState().clearCart();

    // 2. Hydrate shop menu catalog items
    useMenuStore.getState().setItems(matched.menu);

    // 3. Coordinate theme brand presets
    const brandTheme = THEMES.find((t) => t.id === matched.themeId) || THEMES[0];
    useThemeStore.getState().setTheme(brandTheme.id);

    return true;
  }
}));
