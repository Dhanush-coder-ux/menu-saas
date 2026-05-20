import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
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
    }),
    {
      name: "menu-saas-auth-storage", // Unique key in localStorage
    }
  )
);
