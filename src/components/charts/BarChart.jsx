import React from "react";

export default function BarChart({ data, labels, today = 6 }) {
  const max = Math.max(...data);
  return (
    <div className="bar-chart">
      {data.map((v, i) => (
        <div key={i} className="bar-wrap">
          <div className="bar-val">₹{(v / 1000).toFixed(1)}k</div>
          <div
            className={`bar ${i === today ? "today" : ""}`}
            style={{ height: `${(v / max) * 100}%` }}
            title={`${labels[i]}: ₹${v.toLocaleString()}`}
          />
          <div className="bar-label">{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}
