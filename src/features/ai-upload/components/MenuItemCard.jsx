import React, { useState } from "react";
import { motion } from "framer-motion";
import { Edit2, Check, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";
import Toggle from "../../../components/ui/Toggle";

export default function MenuItemCard({ item }) {
  const { editItem, removeItem, toggleItemAvailability } = useAIUploadStore();
  const [isEditing, setIsEditing] = useState(false);

  // Temp local states for form fields
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [desc, setDesc] = useState(item.description);
  const [img, setImg] = useState(item.image || "🍔");

  const handleSave = () => {
    editItem(item.id, "name", name);
    editItem(item.id, "price", parseFloat(price) || 0);
    editItem(item.id, "description", desc);
    editItem(item.id, "image", img);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      className="p-4 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl flex gap-4 text-left transition-all"
    >
      {/* Product Image Emoji selector/view */}
      <div className="flex flex-col items-center gap-2">
        {isEditing ? (
          <input
            value={img}
            onChange={(e) => setImg(e.target.value.slice(0, 2))}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/8 text-center text-xl outline-none"
            title="Type an Emoji"
          />
        ) : (
          <span className="text-3xl p-2 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 self-start select-none">
            {item.image || "🍔"}
          </span>
        )}
        
        {/* Availability Toggle */}
        <div className="mt-2 shrink-0">
          <Toggle 
            checked={item.available} 
            onChange={() => toggleItemAvailability(item.id)} 
          />
        </div>
      </div>

      {/* Details fields */}
      <div className="flex-1 min-w-0 space-y-2">
        {isEditing ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs font-bold text-white outline-none focus:border-violet-500"
              />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="w-20 px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs font-bold text-white outline-none focus:border-violet-500 text-center"
              />
            </div>
            <textarea
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ingredients, brewing details..."
              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/8 text-xs text-slate-300 outline-none focus:border-violet-500 resize-none"
            />
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex justify-between items-start gap-2">
              <span className="text-xs font-bold text-slate-200 truncate">{item.name}</span>
              <span className="text-xs font-extrabold text-primary shrink-0">₹{item.price}</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-semibold pr-2">
              {item.description}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center pt-1">
          {/* Diet tag */}
          <button
            type="button"
            onClick={() => editItem(item.id, "veg", !item.veg)}
            className={`text-[8px] font-black px-2 py-0.5 rounded-full border transition-all ${
              item.veg
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/15"
                : "bg-rose-500/10 text-rose-400 border-rose-500/15"
            }`}
          >
            {item.veg ? "🟢 Veg" : "🔴 Non-veg"}
          </button>

          {/* Action triggers */}
          <div className="flex gap-1.5">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="p-1 rounded bg-violet-600 text-white hover:bg-violet-700 transition-colors cursor-pointer"
                title="Save Changes"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Edit Item"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => removeItem(item.id)}
              className="p-1 rounded bg-white/5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              title="Remove Item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
