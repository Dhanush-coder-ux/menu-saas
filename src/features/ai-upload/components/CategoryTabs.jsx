import React from "react";
import { FolderMinus } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";

export default function CategoryTabs() {
  const { extractedMenu, activeTab, setActiveTab, removeCategory } = useAIUploadStore();

  if (!extractedMenu) return null;

  const categories = ["All", ...extractedMenu.categories.map((c) => c.name)];

  const getBadgeCount = (catName) => {
    if (catName === "All") {
      return extractedMenu.categories.reduce((s, c) => s + c.items.length, 0);
    }
    return extractedMenu.categories.find((c) => c.name === catName)?.items.length || 0;
  };

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {categories.map((c) => (
        <div
          key={c}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 select-none ${
            activeTab === c
              ? "bg-primary text-white border-primary shadow-md"
              : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
          }`}
        >
          <span 
            className="cursor-pointer"
            onClick={() => setActiveTab(c)}
          >
            {c}
          </span>
          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
            activeTab === c ? "bg-white text-primary" : "bg-white/5 text-slate-400"
          }`}>
            {getBadgeCount(c)}
          </span>
          {c !== "All" && (
            <button
              onClick={() => removeCategory(c)}
              className="ml-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Delete Category"
            >
              <FolderMinus className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
