import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";

export default function UploadZone() {
  const { addFiles } = useAIUploadStore();
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      addFiles(e.target.files);
    }
  };

  const triggerInput = () => {
    fileInputRef.current.click();
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={triggerInput}
      className={`relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-200 backdrop-blur-xl shadow-inner ${
        isDragActive
          ? "border-primary bg-violet-500/10 shadow-lg shadow-violet-500/5 scale-102"
          : "border-white/10 bg-white/5 hover:border-violet-500/30 hover:bg-white/8"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        accept=".pdf,.png,.jpg,.jpeg,.webp,.xlsx,.csv"
        className="hidden"
      />

      <div className="space-y-5">
        <motion.div 
          animate={{ y: isDragActive ? -4 : 0 }}
          className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mx-auto shadow-md"
        >
          <UploadCloud className="w-8 h-8 text-violet-400" />
        </motion.div>

        <div className="space-y-1.5 max-w-sm mx-auto">
          <h3 className="text-sm font-bold text-slate-200 flex justify-center items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span>Drag & Drop Menu Source</span>
          </h3>
          <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
            Select files or drag them directly here. PDF brochures, handwritten snaps, Excel spreadsheets, or checkout billing receipts.
          </p>
        </div>

        {/* Accepted Formats */}
        <div className="flex gap-1.5 justify-center flex-wrap max-w-xs mx-auto">
          {["📄 PDF", "📸 PNG / JPG", "📊 Excel", "📑 CSV"].map((badge) => (
            <span key={badge} className="text-[8px] font-bold bg-white/5 border border-white/5 px-2 py-0.5 rounded text-slate-400 tracking-wider">
              {badge}
            </span>
          ))}
        </div>

        <div className="text-[9px] text-slate-500 font-bold border-t border-white/5 pt-4">
          Max file size: <span className="text-violet-400">10MB</span> per scan
        </div>
      </div>
    </motion.div>
  );
}
