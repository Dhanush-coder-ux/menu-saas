import { create } from "zustand";
import { ORDERS } from "../constants/mock-data";

const STATUS_FLOW = {
  pending: "preparing",
  preparing: "ready",
  ready: "completed",
};

export const useOrderStore = create((set) => ({
  orders: ORDERS || [],
  advanceOrder: (id) =>
    set((state) => ({
      orders: state.orders.map((ord) =>
        ord.id === id
          ? { ...ord, status: STATUS_FLOW[ord.status] || ord.status }
          : ord
      ),
    })),
  addOrder: (newOrder) =>
    set((state) => ({
      orders: [
        {
          id: `#${Math.floor(1000 + Math.random() * 9000)}`,
          time: "Just now",
          avatar: "US",
          status: "pending",
          ...newOrder,
        },
        ...state.orders,
      ],
    })),
}));
