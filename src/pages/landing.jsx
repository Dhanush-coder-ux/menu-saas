import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Scan, ShieldCheck, Zap, BarChart3, Palette, Languages, Star } from "lucide-react";
import Button from "../components/ui/Button";

export default function LandingPage({ onNavigate }) {
  const features = [
    { icon: <Sparkles className="w-6 h-6 text-violet-400" />, title: "AI Menu Extraction", desc: "Drop any handwritten menu sheet, photo, or PDF. Our custom extractor structures and builds your entire catalog in under 30 seconds." },
    { icon: <Scan className="w-6 h-6 text-pink-400" />, title: "Smart QR Placement", desc: "Generate unique table-wise dynamic QR codes. Allow clients to scan, order, customize, and pay from their table without downloading apps." },
    { icon: <Zap className="w-6 h-6 text-amber-400" />, title: "Live Prep Dashboard", desc: "Coordinate kitchen channels, serve counters, and tables synchronously with live status pipelines and automated notifications." },
    { icon: <BarChart3 className="w-6 h-6 text-emerald-400" />, title: "Revenue & Peak Analytics", desc: "Track daily sales velocity, discover peak rush hours, identify best-selling snacks, and monitor client acquisition trends." },
    { icon: <Palette className="w-6 h-6 text-blue-400" />, title: "Multi-theme Branding", desc: "Tailor the digital customer experience with four custom presets: Luxury Cafe, Minimal Slate, traditional Warm, or High-Tech Dark." },
    { icon: <Languages className="w-6 h-6 text-rose-400" />, title: "Multi-lingual Ready", desc: "Eliminate service friction by instantly presenting menus in English, Tamil, or Hindi with localized dictionaries." },
  ];

  return (
    <div className="min-height-screen bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Floating Glowing Orbs */}
      <div className="glow-orb w-[600px] h-[600px] bg-violet-600/15 -top-[100px] -right-[100px]" />
      <div className="glow-orb w-[500px] h-[500px] bg-pink-600/10 bottom-[100px] -left-[100px]" />
      <div className="glow-orb w-[300px] h-[300px] bg-amber-500/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Header navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 inset-x-0 z-50 px-6 md:px-16 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-slate-950/80"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center font-black text-xl shadow-lg shadow-violet-500/20">M</div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">MenuQR</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "Enterprise", "Developer Docs"].map((l) => (
            <span 
              key={l} 
              onClick={() => l === "Pricing" && onNavigate("pricing")}
              className="text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              {l}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-white border border-white/5" onClick={() => onNavigate("login")}>Sign in</Button>
          <Button className="bg-gradient-to-r from-violet-600 to-pink-600" onClick={() => onNavigate("signup")}>Get Started free</Button>
        </div>
      </motion.nav>

      {/* Hero section */}
      <section className="pt-32 pb-20 px-6 md:px-16 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-300 text-xs font-semibold mb-8 tracking-wide shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>AI-Powered Digital Menus for Smart Hospitality</span>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
          >
            Deploy Beautiful Menus <br />
            <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">Accept QR Orders Instantly</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your shop menu file. Our AI instantly formats, structures, and creates a high-fidelity digital menu with dynamic, table-wise QR code order tracking.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button className="px-8 py-3.5 text-base bg-gradient-to-r from-violet-600 to-pink-600" onClick={() => onNavigate("signup")}>
              Start For Free <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="secondary" className="px-8 py-3.5 text-base" onClick={() => onNavigate("customer")}>
              Scan Live Demo
            </Button>
          </motion.div>

          {/* Luxury Mock Dashboard Preview */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative p-3 rounded-[28px] border border-white/10 bg-slate-900/60 backdrop-blur-2xl max-w-4xl mx-auto shadow-2xl"
          >
            <div className="rounded-[20px] bg-slate-950/80 border border-white/5 p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-slate-500 font-mono ml-2">menuqr-saas-preview.app</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">✨ Cafe Aroma Live</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[{ l: "REVENUE (WEEK)", v: "₹84,200", c: "text-violet-400" }, { l: "TOTAL ORDERS", v: "342", c: "text-pink-400" }, { l: "AVG CART VALUE", v: "₹246", c: "text-emerald-400" }, { l: "SCAN SUCCESS", v: "99.8%", c: "text-amber-400" }].map((item) => (
                  <div key={item.l} className="bg-white/5 rounded-2xl p-4 border border-white/5 text-left">
                    <span className="text-[9px] font-bold text-slate-500 tracking-wider block mb-1">{item.l}</span>
                    <span className={`text-2xl font-black ${item.c}`}>{item.v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-end gap-3 h-32 pt-4">
                {[30, 48, 42, 68, 55, 78, 95].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div className={`w-full rounded-t-lg transition-all duration-500 ${i === 6 ? "bg-gradient-to-t from-pink-500 to-rose-500" : "bg-gradient-to-t from-violet-600 to-pink-500"}`} style={{ height: `${v}%` }} />
                    <span className="text-[9px] text-slate-500">Day {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Stats Strip */}
      <section className="bg-slate-900/40 border-y border-white/5 py-10 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["12,000+", "Global Merchants"], ["₹42M+", "Transacted Volume"], ["320k+", "Happy Tables"], ["4.9/5", "Merchant Rating"]].map(([v, l]) => (
            <div key={l}>
              <div className="text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{v}</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold tracking-wider uppercase">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 md:px-16 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-violet-400 uppercase tracking-widest block mb-3">Enterprise Grade Features</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Complete Suite to Drive Local Commerce</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm">Everything required to convert your walk-in menus into active customer analytics channels.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/8 backdrop-blur-xl p-7 rounded-3xl text-left shadow-lg smooth-hover hover:border-violet-500/30 hover:bg-white/8"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-5">{f.icon}</div>
              <h3 className="text-base font-bold mb-3">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Ready to Modernize Your Operations?</h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm mb-8 leading-relaxed">Join 12,000+ local businesses already using MenuQR to digitize menus, reduce waiter strain, and increase repeat sales.</p>
          <Button className="px-8 py-3.5 text-base bg-gradient-to-r from-violet-600 to-pink-600" onClick={() => onNavigate("signup")}>
            Create Free Account Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 text-center text-slate-500 text-xs relative z-10 bg-slate-950">
        <p>© 2026 MenuQR SaaS Inc. All rights reserved. Made by Google Deepmind pair-programmer.</p>
      </footer>
    </div>
  );
}
