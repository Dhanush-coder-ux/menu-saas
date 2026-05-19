import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";

export default function ToastContainer() {
  const { toasts, removeToast } = useAIUploadStore();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      default:
        return <Info className="w-4 h-4 text-violet-400" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success": return "border-emerald-500/20 bg-emerald-500/5";
      case "error": return "border-rose-500/20 bg-rose-500/5";
      default: return "border-violet-500/20 bg-violet-500/5";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            layout
            key={t.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            className={`p-4 rounded-2xl border backdrop-blur-xl shadow-lg flex items-center justify-between gap-3 pointer-events-auto transition-all ${getBorderColor(t.type)}`}
          >
            <div className="flex items-center gap-2.5">
              {getIcon(t.type)}
              <span className="text-xs font-bold text-slate-200">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="p-1 rounded-lg bg-white/5 text-slate-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
