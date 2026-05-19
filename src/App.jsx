import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.css";
import { useShopStore } from "./features/customer/store/use-shop-store";

// Import Layouts
import DashboardLayout from "./layouts/dashboard-layout";

// Import Pages
import LandingPage from "./pages/landing";
import PricingPage from "./pages/pricing";
import AuthPage from "./pages/auth";
import CustomerMenu from "./pages/customer-menu";
import CheckoutPage from "./pages/checkout";
import OrderTracking from "./pages/order-tracking";
import Dashboard from "./pages/dashboard";
import OrdersPage from "./pages/orders";
import MenuManagement from "./pages/menu-management";
import AIUpload from "./pages/ai-upload";
import QRManagement from "./pages/qr-management";
import AnalyticsPage from "./pages/analytics";
import SettingsPage from "./pages/settings";

const queryClient = new QueryClient();

export default function App() {
  const [page, setPage] = useState("landing");
  const isDashboard = !["landing", "pricing", "login", "signup", "customer", "checkout", "tracking"].includes(page);

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
    switch (page) {
      case "landing":
        return <LandingPage onNavigate={navigate} />;
      case "pricing":
        return <PricingPage onNavigate={navigate} />;
      case "login":
        return <AuthPage mode="login" onNavigate={navigate} />;
      case "signup":
        return <AuthPage mode="signup" onNavigate={navigate} />;
      case "customer":
        return <CustomerMenu onNavigate={navigate} />;
      case "checkout":
        return <CheckoutPage onNavigate={navigate} />;
      case "tracking":
        return <OrderTracking onNavigate={navigate} />;
      case "dashboard":
        return <Dashboard />;
      case "orders":
        return <OrdersPage />;
      case "menu":
        return <MenuManagement />;
      case "ai-upload":
        return <AIUpload />;
      case "qr":
        return <QRManagement />;
      case "analytics":
        return <AnalyticsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
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
