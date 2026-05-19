import React from "react";
import { motion } from "framer-motion";

export default function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 flex items-center p-0.5 select-none ${
        checked ? "bg-primary" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full bg-white shadow-md"
        style={{ x: checked ? 20 : 0 }}
      />
    </div>
  );
}
