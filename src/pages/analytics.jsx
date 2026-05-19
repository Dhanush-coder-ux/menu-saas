import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, RefreshCw, Calendar, ArrowUpRight } from "lucide-react";
import { DAYS } from "../constants/config";
import { ANALYTICS } from "../constants/mock-data";
import Card from "../components/ui/Card";

export default function AnalyticsPage() {
  const stats = [
    { label: "Monthly Revenue", value: "₹3.4L", growth: "+22.1%", icon: <TrendingUp className="w-4 h-4 text-violet-400" /> },
    { label: "Total Orders", value: "1,428", growth: "+15.3%", icon: <BarChart3 className="w-4 h-4 text-pink-400" /> },
    { label: "New Customers", value: "847", growth: "+31.2%", icon: <Users className="w-4 h-4 text-emerald-400" /> },
    { label: "Repeat Rate", value: "68%", growth: "+4.1%", icon: <RefreshCw className="w-4 h-4 text-amber-400" /> }
  ];

  return (
    <div className="space-y-6 text-left page-enter">
      {/* Top line stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -3 }}
            className="p-5 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-lg text-left"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</span>
              <div className="w-7 h-7 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">{s.icon}</div>
            </div>
            <div className="text-2xl font-black">{s.value}</div>
            <span className="text-[9px] text-emerald-400 font-extrabold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" /> {s.growth} this month
            </span>
          </motion.div>
        ))}
      </div>

      {/* Grid: Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sales trend bar chart */}
        <Card className="p-6">
          <h3 className="text-sm font-bold tracking-tight mb-1">Revenue Trend — Last 7 Days</h3>
          <p className="text-[10px] text-slate-500 mb-6">Daily sales volume comparison</p>
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
                    className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 to-pink-500"
                  />
                  <span className="text-[9px] text-slate-500 mt-2 font-bold uppercase">{DAYS[i]}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Peak rush hours meter grid */}
        <Card className="p-6">
          <h3 className="text-sm font-bold tracking-tight mb-1">Hourly Order Distribution</h3>
          <p className="text-[10px] text-slate-500 mb-6">Identifies active rush periods throughout today</p>
          <div className="flex items-end gap-2.5 h-44 pt-4 border-b border-white/5">
            {ANALYTICS.hourlyData.map((v, i) => {
              const max = Math.max(...ANALYTICS.hourlyData);
              const heightPct = (v / max) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ delay: i * 0.02, duration: 0.5 }}
                    className={`w-full rounded-t-lg transition-colors ${
                      v > 60 ? "bg-amber-500" : v > 40 ? "bg-violet-500" : "bg-white/5 border border-white/5"
                    }`}
                  />
                  {i % 4 === 0 && <span className="text-[8px] text-slate-500 font-mono mt-1">{i}h</span>}
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/5 flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>🚀 Max Order Traffic: <strong className="text-amber-500">7 PM - 9 PM</strong></span>
            <span>📅 Busiest Cycle: <strong className="text-white">Saturday</strong></span>
          </div>
        </Card>
      </div>

      {/* Grid: Performing Items & Insight meters */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Performance metrics breakdown */}
        <Card className="p-6">
          <h3 className="text-sm font-bold tracking-tight mb-4">Top Performing Products</h3>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  <th className="pb-3">Product Info</th>
                  <th className="pb-3 text-center">Orders</th>
                  <th className="pb-3 text-right">Revenue Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {ANALYTICS.topItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3">
                      <div className="flex gap-2.5 items-center">
                        <span className="text-2xl p-1 bg-white/5 border border-white/5 rounded-lg">{item.img}</span>
                        <span className="font-bold text-slate-200">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center font-mono font-bold text-slate-400">{item.orders.toLocaleString()}</td>
                    <td className="py-3 text-right font-black text-violet-400">₹{(item.price * item.orders).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Customer insights bars */}
        <Card className="p-6 space-y-5">
          <h3 className="text-sm font-bold tracking-tight mb-2">Customer Loyalty Analytics</h3>
          
          <div className="space-y-4">
            {[["Returning Customers", 68, "bg-emerald-500"], ["New scan signups", 32, "bg-violet-500"]].map(([l, pct, c]) => (
              <div key={l} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{l}</span>
                  <span className="text-slate-100">{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${c}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 my-4" />

          <div className="grid grid-cols-2 gap-4">
            {[["Avg Table Session", "4m 32s"], ["Viewed items count", "8.3 pages"], ["Cart Abandonment", "24%"], ["Table ticket total", "₹310"]].map(([l, v]) => (
              <div key={l} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-left">
                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide">{l}</span>
                <span className="text-sm font-extrabold text-slate-200 mt-1 inline-block">{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
