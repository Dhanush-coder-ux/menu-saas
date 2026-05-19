import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowLeft, Star, HelpCircle } from "lucide-react";
import Button from "../components/ui/Button";
import { PRICING_PLANS } from "../constants/config";

export default function PricingPage({ onNavigate }) {
  const [billing, setBilling] = useState("monthly"); // monthly, yearly

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 relative overflow-hidden">
      {/* Orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-violet-600/10 top-0 left-0" />
      <div className="glow-orb w-[400px] h-[400px] bg-pink-500/5 bottom-0 right-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => onNavigate("landing")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-10 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </button>

        <div className="text-center mb-16">
          <span className="text-xs font-bold text-violet-400 uppercase tracking-widest block mb-3">Transparent Plans</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">Pricing Tailored to Your Growth</h1>
          <p className="text-slate-400 max-w-md mx-auto text-sm mb-8 leading-relaxed">Choose a subscription. Lock in the early pricing forever. Zero hidden fees.</p>

          {/* Billing Switcher Toggle */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
            <button 
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${billing === "monthly" ? "bg-white/10 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
            >
              Monthly Billing
            </button>
            <button 
              onClick={() => setBilling("yearly")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${billing === "yearly" ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"}`}
            >
              Yearly billing <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md font-extrabold">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {PRICING_PLANS.map((plan) => {
            const finalPrice = billing === "yearly" ? Math.round(plan.price * 0.8) : plan.price;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`rounded-3xl p-7 flex flex-col relative overflow-hidden backdrop-blur-xl border ${
                  plan.popular 
                    ? "bg-gradient-to-b from-violet-950/20 to-slate-900/60 border-violet-500/40 shadow-2xl" 
                    : "bg-white/5 border-white/8 shadow-lg hover:border-white/15"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-amber-500 flex items-center justify-center">
                    <span className="bg-gradient-to-r from-violet-600 to-pink-600 text-white font-extrabold text-[9px] uppercase tracking-wider py-1 px-4 rounded-b-xl shadow-md">
                      ★ Highly Recommended
                    </span>
                  </div>
                )}

                <div className="mb-5 pt-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">{plan.name}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {plan.price === 0 ? "Free" : `₹${finalPrice.toLocaleString()}`}
                    </span>
                    {plan.price > 0 && <span className="text-xs text-slate-400 font-medium">/{plan.period}</span>}
                  </div>
                </div>

                <div className="border-t border-white/5 my-5" />

                <ul className="space-y-3.5 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-xs text-slate-400 items-start">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/25">
                        <Check className="w-2.5 h-2.5 text-emerald-400 font-extrabold" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 justify-center ${plan.popular ? "bg-gradient-to-r from-violet-600 to-pink-600 hover:shadow-violet-600/30" : "bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10"}`}
                  onClick={() => onNavigate("signup")}
                >
                  {plan.price === 0 ? "Get Started Free" : "Start 14-Day Free Trial"}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise Callout */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="text-left">
            <h3 className="text-lg font-bold mb-1">Need customized enterprise integrations?</h3>
            <p className="text-slate-400 text-xs max-w-lg">Scale effortlessly with private SaaS clouds, white-label branding, customized APIs, multi-branch kitchen displays, and 24/7 dedicated support.</p>
          </div>
          <Button variant="secondary" className="px-6 py-3 shrink-0">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </div>
  );
}
