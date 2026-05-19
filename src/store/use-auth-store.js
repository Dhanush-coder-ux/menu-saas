import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null, // Holds details of logged in user
  role: "guest", // 'owner', 'customer', 'guest'
  isAuthenticated: false,
  login: (email, role = "owner") =>
    set({
      user: { email, businessName: "Cafe Aroma" },
      role,
      isAuthenticated: true,
    }),
  signup: (businessName, email, phone) =>
    set({
      user: { businessName, email, phone },
      role: "owner",
      isAuthenticated: true,
    }),
  logout: () => set({ user: null, role: "guest", isAuthenticated: false }),
  setRole: (role) => set({ role }),
}));
