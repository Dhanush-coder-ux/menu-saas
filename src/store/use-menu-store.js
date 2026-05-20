import { create } from "zustand";
import { apiService } from "../services/api";

export const useMenuStore = create((set) => {
  // Self-hydration from database
  apiService.getMenuItems().then((items) => set({ items }));

  return {
    items: [],
    toggleAvailable: (id) =>
      set((state) => {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          apiService.updateMenuItem(id, { available: !item.available });
        }
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, available: !i.available } : i
          ),
        };
      }),
    addItem: (newItem) =>
      set((state) => {
        const createdId = state.items.length > 0 ? Math.max(...state.items.map(i => i.id)) + 1 : 1;
        const completeItem = {
          id: createdId,
          orders: 0,
          rating: 5.0,
          available: true,
          variants: newItem.variants || [{ name: "Standard", priceAdd: 0 }],
          options: newItem.options || [],
          ...newItem,
        };
        apiService.saveMenuItem(completeItem);
        return {
          items: [...state.items, completeItem],
        };
      }),
    deleteItem: (id) =>
      set((state) => {
        apiService.deleteMenuItem(id);
        return {
          items: state.items.filter((i) => i.id !== id),
        };
      }),
    editItem: (id, updatedFields) =>
      set((state) => {
        apiService.updateMenuItem(id, updatedFields);
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...updatedFields } : i
          ),
        };
      }),
    setItems: (newItems) => set({ items: newItems }),
  };
});
