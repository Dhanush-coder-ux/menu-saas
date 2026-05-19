import React from "react";

export default function Shimmer({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-lg ${className}`} />
  );
}
