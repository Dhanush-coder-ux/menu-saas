import { create } from "zustand";
import { apiService } from "../services/api";

const STATUS_FLOW = {
  pending: "preparing",
  preparing: "ready",
  ready: "completed",
};

export const useOrderStore = create((set) => {
  // Self-hydration from database
  apiService.getOrders().then((orders) => set({ orders }));

  return {
    orders: [],
    advanceOrder: (id) =>
      set((state) => {
        const ord = state.orders.find((o) => o.id === id);
        if (ord) {
          const nextStatus = STATUS_FLOW[ord.status] || ord.status;
          apiService.updateOrder(id, { status: nextStatus });
        }
        return {
          orders: state.orders.map((ord) =>
            ord.id === id
              ? { ...ord, status: STATUS_FLOW[ord.status] || ord.status }
              : ord
          ),
        };
      }),
    addOrder: (newOrder) =>
      set((state) => {
        const completeOrder = {
          id: `#${Math.floor(1000 + Math.random() * 9000)}`,
          time: "Just now",
          avatar: "US",
          status: "pending",
          ...newOrder,
        };
        apiService.saveOrder(completeOrder);
        return {
          orders: [completeOrder, ...state.orders],
        };
      }),
  };
});
