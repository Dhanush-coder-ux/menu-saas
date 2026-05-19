import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, onClose, title, subtitle, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-7 text-slate-800 dark:text-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              ✕
            </button>

            {title && <h3 className="text-xl font-bold tracking-tight mb-1">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">{subtitle}</p>}

            <div className="max-h-[70vh] overflow-y-auto pr-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
