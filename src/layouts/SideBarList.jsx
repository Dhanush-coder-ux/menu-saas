import React from "react";
import { 
  Home, Package, Utensils, Sparkles, Scan, BarChart3, Settings, 
  Smartphone, Globe 
} from "lucide-react";

/**
 * Centered Sidebar Menu Configuration List
 * To upgrade or add a new menu item, simply add a new object to the appropriate section's items array below.
 */
export const SIDEBAR_SECTIONS = [
  {
    title: "Main Controls",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home className="w-4.5 h-4.5" />,
      },
      {
        id: "orders",
        label: "Orders",
        icon: <Package className="w-4.5 h-4.5" />,
        badgeKey: "ordersCount", // Hook to dynamic badge counting if needed in future
        defaultBadge: 3,
      },
      {
        id: "menu",
        label: "Menu",
        icon: <Utensils className="w-4.5 h-4.5" />,
      },
      {
        id: "ai-upload",
        label: "AI Upload",
        icon: <Sparkles className="w-4.5 h-4.5 text-violet-400" />,
      },
    ],
  },
  {
    title: "Reports & Setup",
    items: [
      {
        id: "qr",
        label: "QR Codes",
        icon: <Scan className="w-4.5 h-4.5" />,
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart3 className="w-4.5 h-4.5" />,
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings className="w-4.5 h-4.5" />,
      },
    ],
  },
  {
    title: "Previews",
    items: [
      {
        id: "customer",
        label: "Customer App",
        icon: <Smartphone className="w-4.5 h-4.5 text-emerald-400" />,
        isPreview: true,
      },
      {
        id: "landing",
        label: "Landing Page",
        icon: <Globe className="w-4.5 h-4.5 text-violet-400" />,
        isPreview: true,
      },
    ],
  },
];
