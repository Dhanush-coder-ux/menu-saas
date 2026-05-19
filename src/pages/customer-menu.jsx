import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Star, Plus, Minus, Sparkles, MapPin, Compass } from "lucide-react";
import { useMenuStore } from "../store/use-menu-store";
import { useCartStore } from "../store/use-cart-store";
import { useThemeStore } from "../store/use-theme-store";
import { useLangStore } from "../store/use-lang-store";
import { TRANSLATIONS } from "../constants/translations";
import { useShopStore } from "../features/customer/store/use-shop-store";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function CustomerMenu({ onNavigate }) {
  const { items } = useMenuStore();
  const { cart, addToCart, removeFromCart } = useCartStore();
  const { theme, setTheme } = useThemeStore();
  const { lang, setLang } = useLangStore();
  const { currentShop } = useShopStore();

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [activeAd, setActiveAd] = useState(0);
  const [favorites, setFavorites] = useState({});
  const [showSplash, setShowSplash] = useState(true);

  // Customization modal states
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

  const offers = currentShop.offers || [];

  // Auto-rotating promo offers banner
  useEffect(() => {
    if (offers.length === 0) return;
    const timer = setInterval(() => {
      setActiveAd((prev) => (prev + 1) % offers.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [offers.length]);

  // Dismiss splash screen overlay
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", ...new Set(items.map(i => i.category))];

  const filtered = items.filter(i =>
    i.available &&
    (selectedCat === "All" || i.category === selectedCat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const cartItemCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);

  const cartSubtotal = Object.entries(cart).reduce((sum, [key, line]) => {
    const originalItem = items.find(i => i.id === line.id);
    if (!originalItem) return sum;
    const base = originalItem.price;
    const varAdd = line.variant ? line.variant.priceAdd : 0;
    const optsAdd = line.options.reduce((s, o) => s + o.priceAdd, 0);
    return sum + (base + varAdd + optsAdd) * line.qty;
  }, 0);

  const toggleFavorite = (itemId, e) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const openCustomizer = (item) => {
    setCustomizingItem(item);
    setSelectedVariant(item.variants ? item.variants[0] : null);
    setSelectedOptions([]);
  };

  const handleOptionToggle = (opt) => {
    const isSelected = selectedOptions.some(o => o.name === opt.name);
    if (isSelected) {
      setSelectedOptions(selectedOptions.filter(o => o.name !== opt.name));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingItem) return;
    addToCart(customizingItem.id, 1, selectedVariant, selectedOptions);
    setCustomizingItem(null);
  };

  // Filter recommendations (Bestsellers with ratings > 4.7)
  const recommendations = items.filter(i => i.rating >= 4.7 && i.available).slice(0, 4);

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 pb-28 text-left ${theme.bodyClass}`}>
      
      {/* Animated Welcome Splash overlay */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center shadow-xl shadow-violet-500/25"
            >
              <span className="text-5xl select-none">{currentShop.logo}</span>
            </motion.div>
            <div className="space-y-1">
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-black text-white"
              >
                {currentShop.shopName} Menu
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-[10px] text-slate-500 uppercase tracking-widest font-black"
              >
                Scan · Order · Enjoy 🍽️
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[480px] w-full mx-auto px-4 py-6 space-y-6">
        
        {/* Floating navbar header with switches */}
        <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-3xl p-4 backdrop-blur-xl">
          <div className="text-left space-y-0.5">
            <span className="text-[9px] font-extrabold uppercase text-primary tracking-widest">{t("welcome")}</span>
            <h2 className="text-sm font-black text-slate-200 flex items-center gap-1">
              <Compass className="w-4 h-4 text-violet-400" /> {currentShop.shopName}
            </h2>
          </div>
          <div className="flex gap-2">
            {/* Lang toggle pill */}
            <div className="flex bg-white/5 p-1 rounded-full border border-white/5">
              {["en", "ta", "hi"].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`w-6 h-6 rounded-full text-[9px] font-black uppercase transition-all ${
                    lang === l ? "bg-primary text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            {/* Theme switcher pill */}
            <div className="flex bg-white/5 p-1 rounded-full border border-white/5">
              {["cafe", "minimal", "dark"].map(th => (
                <button
                  key={th}
                  onClick={() => setTheme(th)}
                  className={`w-6 h-6 rounded-full text-[9px] font-black uppercase transition-all ${
                    theme.id === th ? "bg-primary text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {th.slice(0, 1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Promo advertisement carousel banner */}
        {offers.length > 0 && (
          <motion.div 
            layout
            className="relative overflow-hidden rounded-3xl h-28 p-5 bg-gradient-to-r from-violet-600 to-pink-500 text-white flex flex-col justify-between shadow-lg shadow-violet-500/25"
          >
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none" />
            
            <div>
              <span className="text-[8px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">⚡ Coupon Promo Offer</span>
              <h3 className="text-sm font-black tracking-tight mt-1.5">{offers[activeAd]?.title}</h3>
              <p className="text-[9px] text-white/80 mt-0.5">{offers[activeAd]?.subtitle}</p>
            </div>
            <div className="flex justify-between items-center text-[9px] pt-1">
              <span className="font-mono bg-slate-950/20 px-3 py-1 rounded-lg font-black uppercase tracking-widest">CODE: {offers[activeAd]?.code}</span>
              <div className="flex gap-1">
                {offers.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveAd(i)}
                    className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${activeAd === i ? "bg-white w-3.5" : "bg-white/30"}`} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search menu filter */}
        <div className="relative flex items-center p-1 rounded-2xl bg-white/5 border border-white/5 focus-within:border-violet-500 transition-all">
          <Search className="w-4 h-4 text-slate-500 ml-4" />
          <input
            placeholder={t("searchPlaceholder")}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-3 pr-4 py-2 bg-transparent text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>

        {/* Smart Bestseller Recommendations (Horizontal Scroll) */}
        {selectedCat === "All" && !search && recommendations.length > 0 && (
          <div className="space-y-3.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">🔥 Smart Recommendations</span>
              <span className="text-[9px] font-extrabold text-primary">Highly Rated</span>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
              {recommendations.map((rec) => (
                <motion.div
                  key={rec.id}
                  whileTap={{ scale: 0.98 }}
                  className="w-36 rounded-3xl border border-white/5 bg-white/5 p-3 flex-shrink-0 space-y-2 relative"
                >
                  <span className="text-3xl p-1.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center w-12 h-12 select-none">
                    {rec.img}
                  </span>
                  <div className="text-left space-y-0.5 pr-2">
                    <span className="text-[10px] font-bold text-slate-200 block truncate">{rec.name}</span>
                    <span className="text-[10px] font-black text-primary">₹{rec.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-slate-500 pt-1 border-t border-white/5 font-bold">
                    <span className="flex items-center gap-0.5 text-amber-500"><Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> {rec.rating}</span>
                    <button
                      onClick={() => openCustomizer(rec)}
                      className="p-1 rounded bg-violet-600 text-white cursor-pointer hover:bg-violet-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Categories scroll pills */}
        <div className="space-y-2 text-left">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-1">🍽️ Menu Categories</span>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCat === c
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {c === "All" ? t("all") : c}
              </button>
            ))}
          </div>
        </div>

        {/* Products list grid */}
        <div className="space-y-4">
          <AnimatePresence>
            {filtered.map(item => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-3xl border flex gap-4 transition-all relative ${theme.cardClass}`}
              >
                {/* Heart Favorite Widget */}
                <button
                  onClick={(e) => toggleFavorite(item.id, e)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/5 text-slate-500 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${favorites[item.id] ? "fill-rose-500 text-rose-500 scale-110" : ""}`} />
                </button>

                <span className="text-4xl p-2 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 self-start select-none">
                  {item.img}
                </span>
                
                <div className="flex-1 space-y-1 text-left min-w-0 pr-6">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-slate-200 truncate">{item.name}</span>
                    <span className={`text-[7px] font-black px-1 py-0.5 rounded-md flex-shrink-0 ${
                      item.veg ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15" : "bg-rose-500/10 text-rose-400 border border-rose-500/15"
                    }`}>
                      {item.veg ? "Veg" : "Non-veg"}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2 pr-2">{item.desc}</p>
                  
                  <div className="flex items-center gap-1.5 text-[9px] text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{item.rating || 4.7}</span>
                    <span className="text-slate-500">· {item.orders || 120}+ orders</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-extrabold text-primary">₹{item.price}</span>
                    <Button 
                      className="px-3.5 py-1.5 rounded-xl text-[10px] bg-gradient-to-r from-violet-600 to-pink-600 font-extrabold flex items-center gap-1 shadow-md shadow-violet-500/10"
                      onClick={() => openCustomizer(item)}
                    >
                      <Plus className="w-3.5 h-3.5" /> {t("addToCart")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Sticky Bottom cart slider indicator */}
      {cartItemCount > 0 && (
        <motion.div 
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 inset-x-4 max-w-[448px] mx-auto z-40 animate-bounce-subtle"
        >
          <div 
            onClick={() => onNavigate("checkout")}
            className="rounded-3xl p-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white flex justify-between items-center shadow-xl shadow-violet-500/30 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center relative">
                <ShoppingBag className="w-4 h-4 text-white animate-pulse" />
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded-full border border-violet-600">
                  {cartItemCount}
                </span>
              </div>
              <div className="text-left">
                <span className="text-[9px] font-bold text-white/80 block uppercase tracking-wider">{t("viewCart")}</span>
                <span className="text-sm font-black">₹{cartSubtotal}</span>
              </div>
            </div>
            <Button variant="ghost" className="text-white font-black text-xs hover:bg-white/10 px-4 py-2">
              {t("checkout")} →
            </Button>
          </div>
        </motion.div>
      )}

      {/* Customizer Add-on Modal */}
      <Modal isOpen={!!customizingItem} onClose={() => setCustomizingItem(null)} title={customizingItem?.name} subtitle="Select sizes variations and additional addon toppings">
        {customizingItem && (
          <div className="space-y-5 text-left">
            {/* Variants sizing */}
            {customizingItem.variants && customizingItem.variants.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t("size")}</span>
                <div className="grid grid-cols-3 gap-2">
                  {customizingItem.variants.map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedVariant?.name === v.name
                          ? "border-violet-500 bg-violet-950/20 text-violet-400 font-extrabold"
                          : "border-white/8 bg-white/5 text-slate-400"
                      }`}
                    >
                      <div className="text-xs">{v.name}</div>
                      {v.priceAdd > 0 && <div className="text-[9px] mt-0.5">+₹{v.priceAdd}</div>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Options list */}
            {customizingItem.options && customizingItem.options.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t("addOns")}</span>
                <div className="space-y-2">
                  {customizingItem.options.map((o) => {
                    const isSelected = selectedOptions.some(opt => opt.name === o.name);
                    return (
                      <div
                        key={o.name}
                        onClick={() => handleOptionToggle(o)}
                        className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                          isSelected ? "border-violet-500/40 bg-violet-950/10 text-violet-400" : "border-white/8 bg-white/5 text-slate-400"
                        }`}
                      >
                        <span className="text-xs font-semibold">{o.name}</span>
                        <div className="flex items-center gap-2">
                          {o.priceAdd > 0 && <span className="text-[10px] font-bold">+₹{o.priceAdd}</span>}
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isSelected ? "bg-primary border-primary text-white" : "border-slate-600"
                          }`}>
                            {isSelected && <span className="text-[9px]">✓</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/5 flex gap-3">
              <Button variant="secondary" className="flex-1 py-3 justify-center text-xs" onClick={() => setCustomizingItem(null)}>
                Cancel
              </Button>
              <Button className="flex-1 py-3 justify-center text-xs bg-gradient-to-r from-violet-600 to-pink-600" onClick={handleAddCustomizedToCart}>
                Confirm Add To Cart
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
