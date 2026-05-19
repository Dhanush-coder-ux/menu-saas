import React from "react";
import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, Users, Clock, Flame, ArrowRight, UserPlus, Play, CheckCircle2 } from "lucide-react";
import { useOrderStore } from "../store/use-order-store";
import { STATUS_CONFIG, DAYS } from "../constants/config";
import { ANALYTICS, TEAM_MEMBERS } from "../constants/mock-data";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const { orders, advanceOrder } = useOrderStore();
  const activeOrders = orders.filter(o => o.status !== "completed");

  const getMetricIcon = (label) => {
    switch (label) {
      case "Revenue": return <DollarSign className="w-5 h-5 text-violet-400" />;
      case "Orders": return <ShoppingBag className="w-5 h-5 text-pink-400" />;
      case "Customers": return <Users className="w-5 h-5 text-emerald-400" />;
      default: return <Clock className="w-5 h-5 text-amber-400" />;
    }
  };

  const metrics = [
    { label: "Revenue", value: "₹84,200", growth: "+18.4%", color: "border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40" },
    { label: "Orders", value: "342", growth: "+12.1%", color: "border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40" },
    { label: "Customers", value: "218", growth: "+8.3%", color: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40" },
    { label: "Avg Rush Hour", value: "7 - 9 PM", growth: "Busiest: Sat", color: "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-left"
    >
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            className={`p-5 rounded-3xl border backdrop-blur-xl shadow-lg transition-all duration-150 ${m.color}`}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{m.label}</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">{getMetricIcon(m.label)}</div>
            </div>
            <div className="text-2xl font-black">{m.value}</div>
            <span className="text-[10px] text-emerald-400 font-extrabold mt-1 inline-block">{m.growth} vs last week</span>
          </motion.div>
        ))}
      </div>

      {/* Grid: Interactive charts & live orders */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* custom dynamic SVG bar chart */}
        <Card className="p-6">
          <h3 className="text-sm font-bold tracking-tight mb-1">Weekly Revenue Velocity</h3>
          <p className="text-[10px] text-slate-500 mb-6">Sales totals over the last 7 active week cycles</p>
          <div className="flex items-end gap-3 h-44 pt-4 border-b border-white/5">
            {ANALYTICS.weeklyData.map((v, i) => {
              const max = Math.max(...ANALYTICS.weeklyData);
              const heightPct = (v / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[9px] font-extrabold text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                    ₹{(v / 1000).toFixed(1)}k
                  </div>
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                    className={`w-full rounded-t-xl transition-all duration-300 ${i === 6 ? "bg-gradient-to-t from-pink-500 to-rose-500 shadow-lg shadow-pink-500/20" : "bg-gradient-to-t from-violet-600 to-pink-500"}`}
                  />
                  <span className="text-[9px] text-slate-500 mt-2 font-bold uppercase">{DAYS[i]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Live prep order pipeline cards */}
        <Card className="p-6 flex flex-col max-h-[300px]">
          <h3 className="text-sm font-bold tracking-tight mb-1">Live Kitchen Pipeline</h3>
          <p className="text-[10px] text-slate-500 mb-4">{activeOrders.length} active orders currently preparing</p>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {activeOrders.map((o) => {
              const s = STATUS_CONFIG[o.status] || STATUS_CONFIG.pending;
              return (
                <motion.div
                  layout
                  key={o.id}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 flex justify-between items-start gap-4 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-200">{o.id}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${s.bg}20`, color: s.color }}>
                        {s.dot} {s.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-semibold">{o.items.join(" · ")}</div>
                    <div className="text-[9px] text-slate-500 flex gap-2">
                      <span>🪑 {o.table}</span>
                      <span>👤 {o.customer}</span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-xs font-bold text-slate-200">₹{o.total}</span>
                    <Button 
                      variant="success" 
                      className="px-3 py-1 text-[10px] font-extrabold rounded-lg flex items-center gap-1.5"
                      onClick={() => advanceOrder(o.id)}
                    >
                      {o.status === "pending" ? <Play className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      <span>{o.status === "pending" ? "Prepare" : "Serve"}</span>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
            {activeOrders.length === 0 && (
              <div className="py-10 text-center text-xs text-slate-500">
                🎉 No active orders in preparation queue.
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Row 3: Bestselling & Team Directory */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top-selling custom meters */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-sm font-bold tracking-tight mb-1">Top Selling Items</h3>
              <p className="text-[10px] text-slate-500">Inventory performance stats this week</p>
            </div>
            <Flame className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-4">
            {ANALYTICS.topItems.map((item, idx) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono">0{idx + 1}</span>
                    <span>{item.img}</span>
                    <span className="text-slate-200">{item.name}</span>
                  </div>
                  <span className="text-slate-400">{item.orders} orders</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.orders / 2100) * 100}%` }}
                    transition={{ delay: idx * 0.1, duration: 1 }}
                    className="h-full bg-gradient-to-r from-violet-600 to-pink-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team / Staff directory widgets */}
        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold tracking-tight mb-1">Staff & Team Directory</h3>
                <p className="text-[10px] text-slate-500">Manage active branches and kitchen members</p>
              </div>
              <UserPlus className="w-4 h-4 text-violet-400 cursor-pointer" />
            </div>
            <div className="space-y-4">
              {TEAM_MEMBERS.map((t) => (
                <div key={t.name} className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center font-bold text-xs text-white">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-200">{t.name}</div>
                    <div className="text-[9px] text-slate-500 font-semibold">{t.role}</div>
                  </div>
                  <span className="ml-auto text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Button variant="secondary" className="w-full mt-4 py-2.5 flex justify-center text-xs">
            Manage Roles & Access
          </Button>
        </Card>
      </div>
    </motion.div>
  );
}
