import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Smartphone, MessageSquareHeart, Star, HelpCircle, ShieldCheck } from "lucide-react";
import { useOrderStore } from "../store/use-order-store";
import { useThemeStore } from "../store/use-theme-store";
import { useLangStore } from "../store/use-lang-store";
import { TRANSLATIONS } from "../constants/translations";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function OrderTracking({ onNavigate }) {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const { orders, advanceOrder } = useOrderStore();

  const [activeStep, setActiveStep] = useState(0); // 0: accepted, 1: preparing, 2: ready, 3: completed
  const [rating, setRating] = useState(5);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;

  // Retrieve our simulated table order
  const tableOrder = orders.find(o => o.table === "Table 4") || orders[0] || {
    id: "#4821",
    total: 310,
    items: ["1x Masala Chai (Kullhad)", "1x Paneer Tikka Wrap"],
    status: "pending"
  };

  useEffect(() => {
    // Map order status string to step index
    switch (tableOrder.status) {
      case "pending": setActiveStep(0); break;
      case "preparing": setActiveStep(1); break;
      case "ready": setActiveStep(2); break;
      case "completed": setActiveStep(3); break;
      default: setActiveStep(0);
    }
  }, [tableOrder.status]);

  const steps = [
    { label: t("accepted"), desc: "Your order is confirmed and sent to kitchen chef" },
    { label: t("preparing"), desc: "Fresh ingredients are being prepared & cooked" },
    { label: t("ready"), desc: "Order is ready for serving / counter pickup" },
    { label: "Completed & Served", desc: "Enjoy your food! Settle payment slip." }
  ];

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
            <h2 className="text-sm font-bold tracking-tight">{t("tracking")}</h2>
            <p className="text-[10px] text-slate-500 font-bold">Real-time status updates from kitchen chefs</p>
          </div>
        </div>

        {/* Floating status card summary */}
        <Card className="p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Estimated Wait</div>
            <div className="text-xl font-black flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-violet-400 animate-pulse" />
              <span>12 - 15 Mins</span>
            </div>
            <span className="text-[9px] text-emerald-400 font-bold">Order ID: {tableOrder.id}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide">Table Slip</span>
            <span className="text-xs font-extrabold text-slate-200">₹{tableOrder.total}</span>
          </div>
        </Card>

        {/* Timeline Progression vertical tree */}
        <Card className="p-6">
          <div className="relative space-y-8 pl-8 text-left">
            {/* Vertical connector line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-white/5 border-l border-white/5" />

            {steps.map((st, i) => {
              const isDone = i < activeStep;
              const isActive = i === activeStep;
              return (
                <div key={st.label} className="relative">
                  {/* Timeline status point */}
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.15, 1] : 1,
                      backgroundColor: isDone || isActive ? "#7C3AED" : "rgba(255,255,255,0.05)"
                    }}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 1.8 }}
                    className="absolute -left-[30px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border border-white/10 z-10"
                  >
                    {isDone ? (
                      <span className="text-[10px] text-white font-bold">✓</span>
                    ) : (
                      <div className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-slate-600"}`} />
                    )}
                  </motion.div>

                  <div className="space-y-0.5 text-left">
                    <span className={`text-xs font-bold block ${isActive ? "text-primary" : isDone ? "text-slate-200" : "text-slate-500"}`}>
                      {st.label}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-normal block">{st.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Chef pipeline simulation buttons (Allows customer to mock cook stages!) */}
        <div className="p-4 rounded-3xl bg-white/5 border border-white/5 space-y-3">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wide">
            <span>Chefs Simulator Panel</span>
            <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <p className="text-[10px] text-slate-500 leading-normal">Simulate the kitchen dashboard advancing this order's cooking status directly for validation testing.</p>
          {tableOrder.status !== "completed" && (
            <Button
              className="w-full py-2 bg-slate-900 border border-white/5 text-xs text-violet-400 justify-center font-bold"
              onClick={() => advanceOrder(tableOrder.id)}
            >
              Advance Preparation State →
            </Button>
          )}
        </div>

        {/* Feedback form on served completion */}
        {activeStep === 3 && (
          <Card className="p-5 text-center space-y-4">
            <span className="text-3xl">💝</span>
            <div>
              <h3 className="text-sm font-bold">Loved your Cafe Aroma meal?</h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Rate your table server experience to help us improve</p>
            </div>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className="p-1 cursor-pointer transition-transform hover:scale-115"
                >
                  <Star className={`w-6 h-6 ${num <= rating ? "fill-amber-500 text-amber-500" : "text-slate-600"}`} />
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              placeholder="Leave server compliments, suggestions..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all resize-none"
            />
            <Button className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-pink-600 text-xs justify-center" onClick={() => { alert("Thank you for your valuable rating!"); onNavigate("customer"); }}>
              Submit Feedback
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
