import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Code, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";

export default function JSONViewerPanel() {
  const { extractedMenu, addToast } = useAIUploadStore();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!extractedMenu) return null;

  const jsonString = JSON.stringify(extractedMenu, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    addToast("Extracted JSON copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${extractedMenu.shopName.toLowerCase().replace(/\s+/g, "-")}-extracted-menu.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast("JSON specification downloaded successfully!", "success");
  };

  return (
    <div className="rounded-3xl border border-white/5 bg-slate-950/40 overflow-hidden text-left shadow-lg">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-4 bg-white/5 border-b border-white/5 flex justify-between items-center cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
          <Code className="w-4 h-4 text-violet-400" />
          <span>Extracted JSON Specification</span>
        </div>
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 relative">
              {/* Copy & Save widgets */}
              <div className="absolute top-6 right-6 flex gap-2 z-10">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Copy JSON"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Download JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable Preformatted Code Block */}
              <pre className="rounded-2xl border border-white/5 bg-slate-950 p-5 font-mono text-[10px] text-violet-300 leading-relaxed overflow-x-auto max-h-[300px] no-scrollbar">
                <code>{jsonString}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
