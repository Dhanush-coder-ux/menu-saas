import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.css";
import { useShopStore } from "./features/customer/store/use-shop-store";
import { useAuthStore } from "./store/use-auth-store";

// Import Layouts
import DashboardLayout from "./layouts/dashboard-layout";

// Import Centralized Router Configuration
import { ROUTES } from "./router";

const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Dynamic initialization checking active session
  const [page, setPage] = useState(() => {
    const isAuth = useAuthStore.getState().isAuthenticated;
    return isAuth ? "dashboard" : "landing";
  });

  // Keep routing and authentication state synchronized
  useEffect(() => {
    if (isAuthenticated) {
      if (page === "landing" || page === "login" || page === "signup") {
        setPage("dashboard");
      }
    } else {
      const active = ROUTES.find((r) => r.id === page);
      if (active && active.isProtected) {
        setPage("landing");
      }
    }
  }, [isAuthenticated, page]);

  // Dynamically determine current active route & layout from centralized routing rules
  const activeRoute = ROUTES.find((r) => r.id === page);
  const isDashboard = activeRoute ? activeRoute.hasSidebar : false;

  const navigate = (p) => {
    setPage(p);
  };

  // Live Multi-Tenant Routing Hydrator
  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname;
      if (path.startsWith("/shop/")) {
        // Extract slug e.g. /shop/fresh-cafe -> fresh-cafe
        const slug = path.split("/shop/")[1]?.split("/")[0];
        if (slug) {
          const loadShop = useShopStore.getState().loadShop;
          const success = loadShop(slug);
          if (success) {
            setPage("customer");
          } else {
            setPage("landing");
          }
        }
      }
    };

    handleUrlRouting();
    window.addEventListener("popstate", handleUrlRouting);
    return () => window.removeEventListener("popstate", handleUrlRouting);
  }, []);

  const renderPage = () => {
    if (activeRoute) {
      return activeRoute.element({ onNavigate: navigate });
    }
    const fallbackRoute = ROUTES.find((r) => r.id === "landing");
    return fallbackRoute ? fallbackRoute.element({ onNavigate: navigate }) : null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      {!isDashboard ? (
        <>{renderPage()}</>
      ) : (
        <DashboardLayout page={page} navigate={navigate}>
          {renderPage()}
        </DashboardLayout>
      )}
    </QueryClientProvider>
  );
}
