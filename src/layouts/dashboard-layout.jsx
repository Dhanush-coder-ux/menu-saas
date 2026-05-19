import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, Package, Utensils, Sparkles, Scan, BarChart3, Settings, 
  Bell, Sun, Moon, LogOut, Menu, X, Smartphone, Globe, ChevronDown, Check
} from "lucide-react";
import { NAV, PAGE_TITLES, NOTIFS } from "../constants/config";
import { useAuthStore } from "../store/use-auth-store";
import { useThemeStore } from "../store/use-theme-store";
import { useLangStore } from "../store/use-lang-store";
import { useShopStore } from "../features/customer/store/use-shop-store";
import { SHOPS_DATABASE } from "../features/customer/mock/shops-database";
import Button from "../components/ui/Button";

export default function DashboardLayout({ children, page, navigate }) {
  const { logout, user } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const { lang, setLang } = useLangStore();
  const { currentShop, loadShop } = useShopStore();
  
  const [showNotif, setShowNotif] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);

  const pageInfo = PAGE_TITLES[page] || PAGE_TITLES.dashboard;

  const getIcon = (id) => {
    switch (id) {
      case "dashboard": return <Home className="w-4 h-4" />;
      case "orders": return <Package className="w-4 h-4" />;
      case "menu": return <Utensils className="w-4 h-4" />;
      case "ai-upload": return <Sparkles className="w-4 h-4 text-violet-400" />;
      case "qr": return <Scan className="w-4 h-4" />;
      case "analytics": return <BarChart3 className="w-4 h-4" />;
      case "settings": return <Settings className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const currentThemeId = theme.id;
  const isDarkMode = currentThemeId === "cafe" || currentThemeId === "dark";

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${theme.bodyClass}`}>
      {/* Sidebar for Desktop */}
      <aside className={`hidden md:flex flex-col w-60 h-screen sticky top-0 border-r shrink-0 overflow-y-auto ${theme.accentBorder} ${theme.cardClass}`}>
        
        {/* Interactive Multi-Tenant Shop Selector Swapper */}
        <div className="p-4 border-b border-white/5 relative">
          <button
            onClick={() => setShowShopDropdown(!showShopDropdown)}
            className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-2xl shrink-0 select-none">{currentShop.logo}</span>
              <div className="min-w-0">
                <div className="text-xs font-black text-slate-200 truncate leading-tight">{currentShop.shopName}</div>
                <span className="text-[8px] text-violet-400 font-extrabold uppercase tracking-widest block mt-0.5">SaaS Partner</span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
          </button>

          <AnimatePresence>
            {showShopDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowShopDropdown(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-4 right-4 mt-2 p-1.5 bg-slate-900 border border-white/8 rounded-2xl shadow-2xl z-50 text-left space-y-0.5"
                >
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest block px-2.5 py-1">Active Slugs Switcher</span>
                  {Object.values(SHOPS_DATABASE).map((s) => {
                    const isSelected = currentShop.shopSlug === s.shopSlug;
                    return (
                      <button
                        key={s.shopSlug}
                        onClick={() => {
                          loadShop(s.shopSlug);
                          setShowShopDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{s.logo}</span>
                          <span>{s.shopName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-7">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-3 mb-2">Main Controls</span>
            <div className="space-y-1">
              {NAV.slice(0, 4).map((n) => (
                <div
                  key={n.id}
                  onClick={() => navigate(n.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                    page === n.id 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{getIcon(n.id)}</span>
                  <span>{n.label}</span>
                  {n.badge && (
                    <span className="ml-auto bg-pink-500 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full">
                      {n.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-3 mb-2">Reports & Setup</span>
            <div className="space-y-1">
              {NAV.slice(4).map((n) => (
                <div
                  key={n.id}
                  onClick={() => navigate(n.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                    page === n.id 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>{getIcon(n.id)}</span>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-3 mb-2">Previews</span>
            <div className="space-y-1">
              <div 
                onClick={() => navigate("customer")}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Customer App</span>
              </div>
              <div 
                onClick={() => navigate("landing")}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <Globe className="w-4 h-4 text-violet-400" />
                <span>Landing Page</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center font-bold text-xs text-white">
              {currentShop.logo}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold truncate">{currentShop.shopName}</div>
              <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-wide">Growth Plan</div>
            </div>
            <button 
              onClick={() => { logout(); navigate("landing"); }}
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`relative z-10 w-64 h-full flex flex-col p-5 shadow-2xl ${theme.bodyClass} border-r ${theme.accentBorder}`}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{currentShop.logo}</span>
                  <span className="text-sm font-bold truncate max-w-[140px]">{currentShop.shopName}</span>
                </div>
                <button onClick={() => setShowMobileMenu(false)} className="p-1 rounded-lg bg-white/5">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="flex-1 space-y-6">
                <div className="space-y-1">
                  {NAV.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => { navigate(n.id); setShowMobileMenu(false); }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold cursor-pointer ${
                        page === n.id ? "bg-primary text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>{getIcon(n.id)}</span>
                      <span>{n.label}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-4 space-y-1">
                  <div 
                    onClick={() => { navigate("customer"); setShowMobileMenu(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-400 cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>Customer App</span>
                  </div>
                  <div 
                    onClick={() => { navigate("landing"); setShowMobileMenu(false); }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-400 cursor-pointer"
                  >
                    <Globe className="w-4 h-4 text-violet-400" />
                    <span>Landing Page</span>
                  </div>
                </div>
              </nav>
              <div className="border-t border-white/5 pt-4">
                <Button variant="danger" className="w-full py-2.5 justify-center" onClick={() => { logout(); navigate("landing"); }}>
                  <LogOut className="w-4 h-4 mr-1" /> Logout
                </Button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className={`h-16 px-6 md:px-8 flex items-center justify-between border-b shrink-0 z-30 ${theme.accentBorder} ${theme.cardClass}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-sm font-bold tracking-tight">{pageInfo.title}</h2>
              <p className="text-[10px] text-slate-500 font-medium">{pageInfo.sub}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-violet-400" />
                <span className="uppercase">{lang}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
              {showLangMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowLangMenu(false)} />
                  <div className="absolute right-0 mt-2 w-28 rounded-2xl bg-slate-900 border border-white/5 p-1.5 shadow-2xl z-20">
                    {[{ c: "en", label: "English" }, { c: "ta", label: "தமிழ்" }, { c: "hi", label: "हिन्दी" }].map((l) => (
                      <button
                        key={l.c}
                        onClick={() => { setLang(l.c); setShowLangMenu(false); }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold ${
                          lang === l.c ? "bg-primary text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Notifications drop panel */}
            <div className="relative">
              <button 
                onClick={() => setShowNotif(!showNotif)}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 relative cursor-pointer"
              >
                <Bell className="w-4 h-4 animate-bounce" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border border-slate-950" />
              </button>
              {showNotif && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotif(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-3xl bg-slate-900 border border-white/5 shadow-2xl z-20 overflow-hidden text-left">
                    <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-slate-950/20">
                      <span className="text-xs font-bold">Notifications</span>
                      <span className="text-[10px] text-violet-400 hover:underline cursor-pointer font-bold">Mark all read</span>
                    </div>
                    <div className="divide-y divide-white/5 max-h-60 overflow-y-auto">
                      {NOTIFS.map((n, i) => (
                        <div key={i} className="p-4 flex gap-3 items-start hover:bg-white/5 cursor-pointer transition-all">
                          <div className="w-2 h-2 rounded-full bg-violet-400 mt-1.5" />
                          <div>
                            <div className="text-xs font-semibold text-slate-300 leading-normal">{n.text}</div>
                            <div className="text-[9px] text-slate-500 mt-1">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Dynamic theme customize toggler */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/5 p-1 rounded-2xl">
              {["cafe", "minimal", "dark", "traditional"].map((th) => (
                <button
                  key={th}
                  onClick={() => setTheme(th)}
                  className={`px-2 py-1 rounded-xl text-[9px] font-black uppercase transition-all ${
                    currentThemeId === th 
                      ? "bg-primary text-white" 
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title={`Switch to ${th} theme`}
                >
                  {th.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-slate-50 dark:bg-slate-950/40">
          {children}
        </div>
      </div>
    </div>
  );
}
