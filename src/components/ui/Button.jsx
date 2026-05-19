import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, onClick, className = "", variant = "primary", disabled = false, type = "button" }) {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none";
  
  let variantStyle = "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/30";
  if (variant === "secondary") {
    variantStyle = "glass text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-800";
  } else if (variant === "ghost") {
    variantStyle = "bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900";
  } else if (variant === "danger") {
    variantStyle = "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100 dark:hover:bg-rose-900/30";
  } else if (variant === "success") {
    variantStyle = "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30";
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {children}
    </motion.button>
  );
}
