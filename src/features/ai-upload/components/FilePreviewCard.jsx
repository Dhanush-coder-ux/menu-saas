import React from "react";
import { motion } from "framer-motion";
import { File, CheckCircle2, AlertCircle, RefreshCcw, Trash2 } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";

export default function FilePreviewCard({ fileObj }) {
  const { retryUpload, removeFile } = useAIUploadStore();

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
          <File className="w-4 h-4 text-violet-400" />
        </div>
        <div className="text-left min-w-0 flex-1 space-y-1">
          <div className="text-xs font-bold text-slate-200 truncate pr-4">{fileObj.name}</div>
          <div className="flex gap-2 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
            <span>{formatSize(fileObj.size)}</span>
            <span>·</span>
            {fileObj.status === "uploading" && <span className="text-violet-400">Uploading {fileObj.progress}%</span>}
            {fileObj.status === "completed" && <span className="text-emerald-400">Scan Ready</span>}
            {fileObj.status === "failed" && <span className="text-rose-400">{fileObj.error || "Failed"}</span>}
          </div>
          
          {/* Progress bar */}
          {fileObj.status === "uploading" && (
            <div className="h-1 rounded-full bg-white/5 overflow-hidden w-full max-w-xs mt-1">
              <div 
                className="h-full bg-gradient-to-r from-violet-600 to-pink-500 transition-all duration-150"
                style={{ width: `${fileObj.progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {fileObj.status === "failed" && (
          <button
            onClick={() => retryUpload(fileObj.id)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-violet-400 hover:text-white transition-colors cursor-pointer"
            title="Retry Scan"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => removeFile(fileObj.id)}
          className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          title="Remove"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
