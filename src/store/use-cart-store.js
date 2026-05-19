import { create } from "zustand";
import { OFFERS } from "../constants/mock-data";

export const useCartStore = create((set) => ({
  cart: {}, // Keyed by: `${id}-${variantName}-${selectedOptionNames.join(",")}`
  note: "",
  coupon: null,
  addToCart: (id, qty = 1, variant = null, selectedOptions = []) =>
    set((state) => {
      const variantName = variant ? variant.name : "Default";
      const optionNames = selectedOptions.map((o) => o.name).sort().join(",");
      const key = `${id}-${variantName}-${optionNames}`;

      const existing = state.cart[key];
      const newQty = existing ? existing.qty + qty : qty;

      return {
        cart: {
          ...state.cart,
          [key]: {
            id,
            qty: newQty,
            variant,
            options: selectedOptions,
          },
        },
      };
    }),
  removeFromCart: (key) =>
    set((state) => {
      const newCart = { ...state.cart };
      if (!newCart[key]) return {};

      if (newCart[key].qty > 1) {
        newCart[key].qty--;
      } else {
        delete newCart[key];
      }

      return { cart: newCart };
    }),
  clearCart: () => set({ cart: {}, note: "", coupon: null }),
  setNote: (note) => set({ note }),
  applyCoupon: (code) =>
    set(() => {
      const matched = OFFERS.find(
        (o) => o.code.toLowerCase() === code.toLowerCase()
      );
      return { coupon: matched || null };
    }),
  removeCoupon: () => set({ coupon: null }),
}));
