import { MENU_ITEMS, OFFERS, TEAM_MEMBERS, ORDERS, ANALYTICS } from "../constants/mock-data";
import { SHOPS_DATABASE } from "../features/customer/mock/shops-database";

const BASE_URL = "http://localhost:3001";

/**
 * Unified JSON Server API service with automatic local data fallbacks.
 * This guarantees the application runs seamlessly even if the JSON server is not currently online.
 */
async function fetchWithFallback(endpoint, fallbackData, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.warn(`[JSON Server Fallback] Failed fetching ${endpoint}: ${error.message}. Using local mock fallback.`);
    return fallbackData;
  }
}

export const apiService = {
  // Menu catalog
  getMenuItems: async () => {
    return fetchWithFallback("/menu_items", MENU_ITEMS);
  },
  saveMenuItem: async (item) => {
    try {
      const res = await fetch(`${BASE_URL}/menu_items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("[JSON Server Fallback] saveMenuItem failed, using local simulation.", e);
    }
    return item;
  },
  updateMenuItem: async (id, updatedFields) => {
    try {
      const res = await fetch(`${BASE_URL}/menu_items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("[JSON Server Fallback] updateMenuItem failed, using local simulation.", e);
    }
    return { id, ...updatedFields };
  },
  deleteMenuItem: async (id) => {
    try {
      await fetch(`${BASE_URL}/menu_items/${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("[JSON Server Fallback] deleteMenuItem failed, using local simulation.", e);
    }
  },

  // Offers
  getOffers: async () => {
    return fetchWithFallback("/offers", OFFERS);
  },

  // Team
  getTeamMembers: async () => {
    return fetchWithFallback("/team_members", TEAM_MEMBERS);
  },

  // Orders
  getOrders: async () => {
    return fetchWithFallback("/orders", ORDERS);
  },
  saveOrder: async (order) => {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("[JSON Server Fallback] saveOrder failed, using local simulation.", e);
    }
    return order;
  },
  updateOrder: async (id, updatedFields) => {
    try {
      const res = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("[JSON Server Fallback] updateOrder failed, using local simulation.", e);
    }
    return { id, ...updatedFields };
  },

  // Analytics
  getAnalytics: async () => {
    return fetchWithFallback("/analytics", ANALYTICS);
  },

  // Multi-tenant Shops database
  getShops: async () => {
    return fetchWithFallback("/shops_database", SHOPS_DATABASE);
  }
};
