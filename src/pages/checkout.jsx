import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Send, CreditCard, ChevronRight, MessageSquare, AlertCircle, User, Phone, MapPin } from "lucide-react";
import { useMenuStore } from "../store/use-menu-store";
import { useCartStore } from "../store/use-cart-store";
import { useOrderStore } from "../store/use-order-store";
import { useThemeStore } from "../store/use-theme-store";
import { useLangStore } from "../store/use-lang-store";
import { TRANSLATIONS } from "../constants/translations";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function CheckoutPage({ onNavigate }) {
  const { items } = useMenuStore();
  const { cart, note, setNote, coupon, applyCoupon, removeCoupon, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { theme } = useThemeStore();
  const { lang } = useLangStore();

  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi"); // upi, card, counter
  
  // Checkout detail inputs
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [tableNumber, setTableNumber] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const tbl = params.get("table");
    return tbl ? `Table ${tbl}` : "Table 2";
  });
  const [orderMode, setOrderMode] = useState("dinein"); // dinein, takeaway

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

  // Calculate cart subtotal
  const cartSubtotal = Object.entries(cart).reduce((sum, [key, line]) => {
    const originalItem = items.find(i => i.id === line.id);
    if (!originalItem) return sum;
    const base = originalItem.price;
    const varAdd = line.variant ? line.variant.priceAdd : 0;
    const optsAdd = line.options.reduce((s, o) => s + o.priceAdd, 0);
    return sum + (base + varAdd + optsAdd) * line.qty;
  }, 0);

  // Calculate coupon discounts
  let discount = 0;
  if (coupon) {
    if (coupon.discType === "percent") {
      discount = Math.round((cartSubtotal * coupon.value) / 100);
    } else {
      discount = coupon.value;
    }
  }

  // Ultra-detailed billing breakdown coordinates
  const gst = Math.round((cartSubtotal - discount) * 0.05);
  const packagingCharge = Object.keys(cart).length > 0 ? 10 : 0; // Flat ₹10
  const serviceCharge = orderMode === "dinein" ? 20 : 0; // Flat ₹20 dine-in service
  const platformFee = Object.keys(cart).length > 0 ? 5 : 0; // Flat ₹5 platform fee
  
  // Grand Total Formula = Subtotal - Discount + GST + Packaging + Service + Platform
  const finalTotal = Math.max(0, cartSubtotal - discount + gst + packagingCharge + serviceCharge + platformFee);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode) return;
    applyCoupon(promoCode);
    setPromoCode("");
  };

  const handlePlaceOrder = () => {
    if (Object.keys(cart).length === 0) return;
    if (!custName.trim() || !custPhone.trim()) {
      alert("Please provide your name and phone number to complete order routing!");
      return;
    }

    // Map unique cart configurations into array items
    const orderItems = Object.entries(cart).map(([key, line]) => {
      const originalItem = items.find(i => i.id === line.id);
      const varName = line.variant ? ` (${line.variant.name})` : "";
      return `${line.qty}x ${originalItem?.name}${varName}`;
    });

    // Save order
    addOrder({
      table: orderMode === "dinein" ? tableNumber : "Takeaway/Pickup",
      customer: custName.trim(),
      items: orderItems,
      total: finalTotal,
      note: note
    });

    // Reset checkout
    clearCart();
    onNavigate("tracking");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-28 text-left ${theme.bodyClass}`}>
      <div className="max-w-[480px] w-full mx-auto px-4 py-6 space-y-6">
        
        {/* Navbar */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("customer")}
            className="p-2 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-sm font-bold tracking-tight">{t("cartSummary")}</h2>
            <p className="text-[10px] text-slate-500 font-bold">Review selections, details & checkout</p>
          </div>
        </div>

        {/* Dynamic Order Mode Selector Toggle */}
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
          <button
            onClick={() => setOrderMode("dinein")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              orderMode === "dinein" ? "bg-primary text-white" : "text-slate-500"
            }`}
          >
            🍽️ Dine-in Table
          </button>
          <button
            onClick={() => setOrderMode("takeaway")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
              orderMode === "takeaway" ? "bg-primary text-white" : "text-slate-500"
            }`}
          >
            🛍️ Takeaway / Pickup
          </button>
        </div>

        {/* Customer Detail Inputs Form */}
        <Card className="p-5 space-y-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Customer Info & Table</span>
          
          <div className="space-y-3.5">
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Your Full Name</label>
              <div className="relative flex items-center p-0.5 rounded-xl bg-white/5 border border-white/8 focus-within:border-violet-500 transition-all">
                <User className="w-4 h-4 text-slate-500 ml-3" />
                <input
                  placeholder="e.g. Sneha Reddy"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 bg-transparent text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Phone Number</label>
              <div className="relative flex items-center p-0.5 rounded-xl bg-white/5 border border-white/8 focus-within:border-violet-500 transition-all">
                <Phone className="w-4 h-4 text-slate-500 ml-3" />
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 bg-transparent text-xs text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>
            </div>

            {orderMode === "dinein" && (
              <div>
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Select Table Number</label>
                <div className="relative flex items-center p-0.5 rounded-xl bg-slate-900 border border-white/8 focus-within:border-violet-500 transition-all">
                  <MapPin className="w-4 h-4 text-slate-500 ml-3" />
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full pl-3 pr-4 py-2 bg-transparent text-xs text-white outline-none"
                  >
                    {["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6", "Table 7", "Table 8", "Table 9", "Table 10"].map((num) => (
                      <option key={num} value={num} className="bg-slate-900 text-white">{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Cart items list */}
        <Card className="p-4 space-y-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Order Selections</span>
          {Object.entries(cart).map(([key, line]) => {
            const originalItem = items.find(i => i.id === line.id);
            if (!originalItem) return null;
            const base = originalItem.price;
            const varAdd = line.variant ? line.variant.priceAdd : 0;
            const optsAdd = line.options.reduce((s, o) => s + o.priceAdd, 0);
            const lineTotal = (base + varAdd + optsAdd) * line.qty;

            return (
              <div key={key} className="flex justify-between items-start gap-4 py-2 border-b border-white/5 last:border-none">
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-bold text-slate-200 block">{originalItem.name}</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {line.variant && (
                      <span className="text-[8px] bg-violet-500/10 text-violet-300 border border-violet-500/15 px-1.5 py-0.5 rounded font-bold">
                        {line.variant.name}
                      </span>
                    )}
                    {line.options.map(o => (
                      <span key={o.name} className="text-[8px] bg-pink-500/10 text-pink-300 border border-pink-500/15 px-1.5 py-0.5 rounded font-bold">
                        {o.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold block">{line.qty}x · ₹{base + varAdd + optsAdd} each</span>
                </div>
                <span className="text-xs font-extrabold text-primary shrink-0">₹{lineTotal}</span>
              </div>
            );
          })}

          {Object.keys(cart).length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              Your cart is empty. Scan menus to add goodies!
            </div>
          )}
        </Card>

        {/* Note to Chef */}
        <Card className="p-4 space-y-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" /> Note to Chef / kitchen
          </span>
          <textarea
            rows={2}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder={t("notesPlaceholder")}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all resize-none"
          />
        </Card>

        {/* Discount Promos */}
        <Card className="p-4 space-y-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Apply Promo Coupon</span>
          {coupon ? (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex justify-between items-center text-xs text-emerald-400">
              <div className="text-left font-semibold">
                <span>Code Applied: <strong>{coupon.code}</strong></span>
                <span className="block text-[10px] text-slate-400 font-medium">{coupon.title}</span>
              </div>
              <button 
                type="button" 
                onClick={removeCoupon}
                className="text-[10px] font-black text-rose-400 hover:underline cursor-pointer"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                placeholder="Enter Code (e.g. FOODIE20)"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all"
              />
              <Button type="submit" className="bg-slate-900 border border-white/5 text-xs px-4">Apply</Button>
            </form>
          )}
        </Card>

        {/* Detailed Bill Breakdown Receipt */}
        <Card className="p-5 space-y-3.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t("billDetails")}</span>
          <div className="space-y-2.5 text-xs font-semibold text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-200">₹{cartSubtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Coupon Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span className="text-slate-200">₹{gst}</span>
            </div>
            <div className="flex justify-between">
              <span>Flat Packaging Charge</span>
              <span className="text-slate-200">₹{packagingCharge}</span>
            </div>
            {orderMode === "dinein" && (
              <div className="flex justify-between">
                <span>Dine-In Table Service</span>
                <span className="text-slate-200">₹{serviceCharge}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span className="text-slate-200">₹{platformFee}</span>
            </div>
            
            <div className="border-t border-white/5 my-2" />
            
            <div className="flex justify-between text-sm font-extrabold text-slate-200">
              <span>Grand Total</span>
              <span className="text-primary text-base">₹{finalTotal}</span>
            </div>
          </div>
        </Card>

        {/* Payment channels */}
        <Card className="p-4 space-y-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t("paymentMethod")}</span>
          <div className="space-y-2">
            {[
              { id: "upi", label: t("payUpi"), desc: "Instant phone scans (GPay / PhonePe / Paytm)" },
              { id: "card", label: t("payCard"), desc: "Visa / Mastercard checkouts" },
              { id: "counter", label: t("payCounter"), desc: "Settle cash/cards at serve counter" }
            ].map((p) => (
              <div
                key={p.id}
                onClick={() => setPaymentMethod(p.id)}
                className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                  paymentMethod === p.id 
                    ? "border-violet-500/40 bg-violet-950/10 text-violet-400 font-extrabold" 
                    : "border-white/8 bg-white/5 text-slate-400"
                }`}
              >
                <div className="text-left">
                  <div className="text-xs">{p.label}</div>
                  <div className="text-[8px] text-slate-500 mt-0.5 font-medium">{p.desc}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center p-0.5 ${
                  paymentMethod === p.id ? "border-primary" : "border-slate-600"
                }`}>
                  {paymentMethod === p.id && <div className="w-full h-full rounded-full bg-primary" />}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sticky footer place order button */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-6 inset-x-4 max-w-[448px] mx-auto z-40">
          <Button 
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-pink-600 justify-center text-sm font-black shadow-xl shadow-violet-500/30"
            onClick={handlePlaceOrder}
          >
            <Send className="w-4 h-4 mr-1.5" /> Place Table Order (₹{finalTotal})
          </Button>
        </div>
      )}
    </div>
  );
}
