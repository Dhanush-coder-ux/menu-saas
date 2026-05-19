import React from "react";

export default function MetricCard({ icon, label, value, growth, className }) {
  return (
    <div className={`metric-card ${className}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {growth && (
        <div className={`metric-growth ${growth > 0 ? "up" : "down"}`}>
          {growth > 0 ? "▲" : "▼"} {Math.abs(growth)}% vs last week
        </div>
      )}
    </div>
  );
}
