import { create } from "zustand";
import { MENU_ITEMS } from "../constants/mock-data";

export const useMenuStore = create((set) => ({
  items: MENU_ITEMS,
  toggleAvailable: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, available: !i.available } : i
      ),
    })),
  addItem: (newItem) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          id: state.items.length + 1,
          orders: 0,
          rating: 5.0,
          available: true,
          variants: newItem.variants || [{ name: "Standard", priceAdd: 0 }],
          options: newItem.options || [],
          ...newItem,
        },
      ],
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  editItem: (id, updatedFields) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, ...updatedFields } : i
      ),
    })),
  setItems: (newItems) => set({ items: newItems }),
}));
