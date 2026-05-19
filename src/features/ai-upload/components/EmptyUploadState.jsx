import React from "react";
import { UploadCloud, Sparkles } from "lucide-react";
import UploadZone from "./UploadZone";

export default function EmptyUploadState() {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-left">
      {/* Upload zone taking 2 columns */}
      <div className="md:col-span-2">
        <UploadZone />
      </div>

      {/* Guide widget taking 1 column */}
      <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-slate-200">AI Deep Learning Models</h3>
            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
              Our neural OCR parser recognizes structure columns, decimal numbers, language sets, and veg diet icons with 98% accuracy.
            </p>
          </div>
          <div className="border-t border-white/5 my-2" />
          <div className="space-y-3">
            {[
              ["1. Upload Sheet", "Drag JPEG, PNG, Excel spreadsheets or PDF charts."],
              ["2. OCR Extraction", "Our models parse items, descriptions, and currencies."],
              ["3. Edit & Synchronize", "Review structured items, toggle stocks, and save!"]
            ].map(([title, desc]) => (
              <div key={title} className="text-left space-y-0.5">
                <span className="text-[10px] font-bold text-slate-300 block">{title}</span>
                <span className="text-[9px] text-slate-500 leading-normal block">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
