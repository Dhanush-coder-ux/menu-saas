export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const STATUS_CONFIG = {
  pending: { label: "Pending", color: "#F59E0B", bg: "#FEF3C7", dot: "🟡" },
  preparing: { label: "Preparing", color: "#8B5CF6", bg: "#EDE9FE", dot: "🟣" },
  ready: { label: "Ready", color: "#10B981", bg: "#D1FAE5", dot: "🟢" },
  completed: { label: "Completed", color: "#6B7280", bg: "#F3F4F6", dot: "⚫" },
};

export const PRICING_PLANS = [
  { name: "Starter", price: 0, period: "forever", color: "#6B7280", features: ["1 location", "Up to 50 items", "Basic QR code", "Email support", "Basic analytics"] },
  { name: "Growth", price: 999, period: "month", color: "#8B5CF6", popular: true, features: ["3 locations", "Unlimited items", "AI menu upload", "Custom QR codes", "Advanced analytics", "WhatsApp notifications", "Priority support"] },
  { name: "Enterprise", price: 2999, period: "month", color: "#F59E0B", features: ["Unlimited locations", "Everything in Growth", "White-label app", "API access", "Dedicated manager", "Custom integrations", "SLA guarantee"] },
];

export const NAV = [
  { id: "dashboard", icon: "🏠", label: "Dashboard" },
  { id: "orders", icon: "📦", label: "Orders", badge: 3 },
  { id: "menu", icon: "🍽", label: "Menu" },
  { id: "ai-upload", icon: "🤖", label: "AI Upload" },
  { id: "qr", icon: "🔲", label: "QR Codes" },
  { id: "analytics", icon: "📊", label: "Analytics" },
  { id: "settings", icon: "⚙️", label: "Settings" },
];

export const PAGE_TITLES = {
  dashboard: { title: "Dashboard", sub: "Good morning, Cafe Aroma ☀️" },
  orders: { title: "Orders", sub: "Manage and track all customer orders" },
  menu: { title: "Menu Management", sub: "Add, edit, and organize your items" },
  "ai-upload": { title: "AI Menu Upload", sub: "Upload any format — we'll extract the rest" },
  qr: { title: "QR Code Manager", sub: "Generate and manage QR codes for tables" },
  analytics: { title: "Analytics", sub: "Revenue, orders, and customer insights" },
  settings: { title: "Settings", sub: "Manage your shop preferences" },
};

export const NOTIFS = [
  { text: "New order #3423 from Table 6", time: "Just now" },
  { text: "Order #3420 is ready for pickup", time: "2m ago" },
  { text: "Weekly revenue up 18% this week", time: "1h ago" },
  { text: "New review: 5⭐ from Priya K.", time: "3h ago" },
];
