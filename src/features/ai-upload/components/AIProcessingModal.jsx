import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, Database, Check } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";

export default function AIProcessingModal() {
  const { aiStage, aiStep } = useAIUploadStore();

  const steps = [
    { label: "Uploading Menu Files", desc: "Transmitting file buffers to secure OCR servers" },
    { label: "Reading File Layers", desc: "Scanning raw pixels and document matrices" },
    { label: "Detecting Characters & Prices", desc: "AI models parsing values, currencies & titles" },
    { label: "Structuring Categories", desc: "Clustering food items into clean dietary segments" },
    { label: "Generating Structured JSON", desc: "Injecting parsed schemas into API-ready configurations" }
  ];

  if (aiStage !== "processing") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl border border-white/5 bg-slate-900/90 shadow-2xl p-6 overflow-hidden relative"
      >
        {/* Futuristic background neon glow orbs */}
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-violet-600/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-pink-600/10 blur-xl pointer-events-none" />

        <div className="space-y-6 text-center relative z-10">
          
          {/* Glowing scanner wheel graphic */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 3.5 }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-violet-500/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
              className="absolute inset-2 rounded-full border border-pink-500/30 border-t-pink-500"
            />
            <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-violet-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1.5 max-w-sm mx-auto">
            <h3 className="text-sm font-bold text-slate-100 flex justify-center items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-violet-400 animate-spin" />
              <span>AI Menu OCR Extraction</span>
            </h3>
            <p className="text-[10px] text-slate-500 font-semibold">
              Deep Learning models are processing text, decimal structures, and dietary badges in real-time...
            </p>
          </div>

          {/* Steps Timeline Progression */}
          <div className="space-y-3 p-4 rounded-2xl border border-white/5 bg-slate-950/40 text-left">
            {steps.map((st, i) => {
              const isDone = i < aiStep;
              const isActive = i === aiStep;
              return (
                <div key={st.label} className="flex gap-3 items-start relative">
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.15, 1] : 1,
                        backgroundColor: isDone ? "#7C3AED" : isActive ? "rgba(236, 72, 153, 0.2)" : "rgba(255,255,255,0.05)",
                        borderColor: isDone ? "#7C3AED" : isActive ? "#EC4899" : "rgba(255,255,255,0.1)"
                      }}
                      transition={{ repeat: isActive ? Infinity : 0, duration: 1.8 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center border text-[9px] font-bold text-white shrink-0"
                    >
                      {isDone ? <Check className="w-3 h-3 text-white" /> : <span>{i + 1}</span>}
                    </motion.div>
                  </div>
                  <div className="space-y-0.5 text-left">
                    <span className={`text-[11px] font-bold block ${isActive ? "text-pink-400" : isDone ? "text-slate-200" : "text-slate-500"}`}>
                      {st.label}
                    </span>
                    <span className="text-[9px] text-slate-500 leading-normal block">{st.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Skeleton Cards inside the modal */}
          <div className="space-y-2 text-left opacity-30">
            <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Menu Preview Skeleton</div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-white/10" />
              <div className="flex-1 space-y-1.5 pt-0.5">
                <div className="h-2 w-24 bg-white/15 rounded" />
                <div className="h-1.5 w-full bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
