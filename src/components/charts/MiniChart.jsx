import React from "react";

export default function MiniChart({ data, color = "#8B5CF6" }) {
  const max = Math.max(...data);
  return (
    <div className="mini-chart">
      {data.map((v, i) => (
        <div key={i} className="mini-bar" style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.5 + (i / data.length) * 0.5 }} />
      ))}
    </div>
  );
}
