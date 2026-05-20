import React from "react";

// Import all page components with their actual file paths
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

/**
 * Premium Router Configuration
 * Maps every user route to its corresponding page component, layout structure, and physical codebase path.
 */
export const ROUTES = [
  {
    path: "/",
    id: "landing",
    label: "Landing Page",
    filePath: "./src/pages/landing.jsx",
    element: (props) => <LandingPage {...props} />,
    isProtected: false,
    hasSidebar: false,
  },
  {
    path: "/pricing",
    id: "pricing",
    label: "Pricing Page",
    filePath: "./src/pages/pricing.jsx",
    element: (props) => <PricingPage {...props} />,
    isProtected: false,
    hasSidebar: false,
  },
  {
    path: "/login",
    id: "login",
    label: "Login Page",
    filePath: "./src/pages/auth.jsx",
    element: (props) => <AuthPage mode="login" {...props} />,
    isProtected: false,
    hasSidebar: false,
  },
  {
    path: "/signup",
    id: "signup",
    label: "Signup Page",
    filePath: "./src/pages/auth.jsx",
    element: (props) => <AuthPage mode="signup" {...props} />,
    isProtected: false,
    hasSidebar: false,
  },
  {
    path: "/shop/:slug",
    id: "customer",
    label: "Customer Menu",
    filePath: "./src/pages/customer-menu.jsx",
    element: (props) => <CustomerMenu {...props} />,
    isProtected: false,
    hasSidebar: false,
  },
  {
    path: "/checkout",
    id: "checkout",
    label: "Checkout Page",
    filePath: "./src/pages/checkout.jsx",
    element: (props) => <CheckoutPage {...props} />,
    isProtected: false,
    hasSidebar: false,
  },
  {
    path: "/tracking",
    id: "tracking",
    label: "Order Tracking",
    filePath: "./src/pages/order-tracking.jsx",
    element: (props) => <OrderTracking {...props} />,
    isProtected: false,
    hasSidebar: false,
  },
  {
    path: "/dashboard",
    id: "dashboard",
    label: "Admin Dashboard",
    filePath: "./src/pages/dashboard.jsx",
    element: (props) => <Dashboard {...props} />,
    isProtected: true,
    hasSidebar: true,
  },
  {
    path: "/dashboard/orders",
    id: "orders",
    label: "Orders Management",
    filePath: "./src/pages/orders.jsx",
    element: (props) => <OrdersPage {...props} />,
    isProtected: true,
    hasSidebar: true,
  },
  {
    path: "/dashboard/menu",
    id: "menu",
    label: "Menu Management",
    filePath: "./src/pages/menu-management.jsx",
    element: (props) => <MenuManagement {...props} />,
    isProtected: true,
    hasSidebar: true,
  },
  {
    path: "/dashboard/ai-upload",
    id: "ai-upload",
    label: "AI Menu Upload",
    filePath: "./src/pages/ai-upload.jsx",
    element: (props) => <AIUpload {...props} />,
    isProtected: true,
    hasSidebar: true,
  },
  {
    path: "/dashboard/qr",
    id: "qr",
    label: "QR Codes Manager",
    filePath: "./src/pages/qr-management.jsx",
    element: (props) => <QRManagement {...props} />,
    isProtected: true,
    hasSidebar: true,
  },
  {
    path: "/dashboard/analytics",
    id: "analytics",
    label: "Analytics Insights",
    filePath: "./src/pages/analytics.jsx",
    element: (props) => <AnalyticsPage {...props} />,
    isProtected: true,
    hasSidebar: true,
  },
  {
    path: "/dashboard/settings",
    id: "settings",
    label: "Settings & Configuration",
    filePath: "./src/pages/settings.jsx",
    element: (props) => <SettingsPage {...props} />,
    isProtected: true,
    hasSidebar: true,
  },
];

/**
 * Route Matcher Utility
 * Parses standard/dynamic browser paths and matches them to the correct route definition.
 */
export const matchRoute = (path) => {
  // 1. Check for customer shop slug matching e.g. /shop/fresh-cafe
  if (path.startsWith("/shop/")) {
    const slug = path.split("/shop/")[1]?.split("/")[0];
    if (slug) {
      const customerRoute = ROUTES.find((r) => r.id === "customer");
      return { ...customerRoute, params: { slug } };
    }
  }

  // 2. Exact match check
  const exactRoute = ROUTES.find((r) => r.path === path);
  if (exactRoute) return exactRoute;

  // 3. Fallback routing logic
  if (path.startsWith("/dashboard")) {
    // Check if subpath is matched
    const subRoute = ROUTES.find((r) => r.path === path);
    return subRoute || ROUTES.find((r) => r.id === "dashboard");
  }

  // Default fallback to landing page
  return ROUTES.find((r) => r.id === "landing");
};
