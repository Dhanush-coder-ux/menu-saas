import React from "react";
import { motion } from "framer-motion";

export default function Card({ children, className = "", animate = false }) {
  const classes = `rounded-2xl shadow-xl overflow-hidden glass ${className}`;

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className={classes}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={classes}>{children}</div>;
}
