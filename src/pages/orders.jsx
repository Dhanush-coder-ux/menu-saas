import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ClipboardList, Check, Clock, ChevronRight, Play, CheckCircle2, ShoppingBag } from "lucide-react";
import { useOrderStore } from "../store/use-order-store";
import { STATUS_CONFIG } from "../constants/config";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function OrdersPage() {
  const { orders, advanceOrder } = useOrderStore();
  const [filterStatus, setFilterStatus] = useState("all"); // all, pending, preparing, ready, completed

  const filtered = orders.filter(
    (o) => filterStatus === "all" || o.status === filterStatus
  );

  const getStatusCount = (status) => {
    return orders.filter((o) => o.status === status).length;
  };

  const nextActionLabel = {
    pending: "Accept & Prep",
    preparing: "Mark Ready",
    ready: "Complete / Serve",
  };

  return (
    <div className="space-y-6 text-left page-enter">
      {/* Category Pills & Pipeline Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { id: "all", label: "All Orders", count: orders.length, bg: "bg-white/5 text-slate-300" },
          { id: "pending", label: "Pending", count: getStatusCount("pending"), bg: "bg-amber-500/10 text-amber-400 border border-amber-500/25" },
          { id: "preparing", label: "Preparing", count: getStatusCount("preparing"), bg: "bg-violet-500/10 text-violet-400 border border-violet-500/25" },
          { id: "ready", label: "Ready", count: getStatusCount("ready"), bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" },
          { id: "completed", label: "Completed", count: getStatusCount("completed"), bg: "bg-slate-500/10 text-slate-500 border border-slate-500/25" }
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setFilterStatus(s.id)}
            className={`p-3 rounded-2xl text-xs font-bold text-center flex flex-col items-center gap-1.5 transition-all select-none border cursor-pointer ${
              filterStatus === s.id 
                ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-102" 
                : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <span>{s.label}</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${filterStatus === s.id ? "bg-white text-primary" : s.bg}`}>
              {s.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Catalog Container */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((order, idx) => {
            const s = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            return (
              <motion.div
                layout
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2.5 text-left">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-black text-slate-100">{order.id}</span>
                    <span className="text-[10px] text-slate-500 font-bold">{order.time}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: `${s.bg}15`, color: s.color }}>
                      {s.dot} {s.label}
                    </span>
                  </div>
                  
                  {/* Order Items list */}
                  <div className="text-xs font-semibold text-slate-300 tracking-wide flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                    <span>{order.items.join(" · ")}</span>
                  </div>

                  {/* Customer / Table coordinates */}
                  <div className="flex gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span>🪑 Table: {order.table}</span>
                    <span>👤 Customer: {order.customer}</span>
                    {order.note && <span className="text-pink-400 font-black">📝 Notes: {order.note}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-none pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wide">Total Bill</span>
                    <span className="text-sm font-extrabold text-slate-200">₹{order.total}</span>
                  </div>

                  {order.status !== "completed" ? (
                    <Button 
                      variant={order.status === "pending" ? "primary" : "success"}
                      className="px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md"
                      onClick={() => advanceOrder(order.id)}
                    >
                      {order.status === "pending" ? <Play className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{nextActionLabel[order.status]}</span>
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <Check className="w-3.5 h-3.5" />
                      <span>Served & Settled</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center text-slate-500 border border-white/5 rounded-3xl bg-white/5"
            >
              <ClipboardList className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-sm font-bold text-slate-400">No active orders in this pipeline</h3>
              <p className="text-[10px] text-slate-500 max-w-xs mx-auto mt-1">Orders scanned and submitted by customers from table QR codes will materialize in real-time here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
