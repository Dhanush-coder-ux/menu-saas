import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Sparkles, SlidersHorizontal, Edit2, Trash2, Check, AlertCircle } from "lucide-react";
import { useMenuStore } from "../store/use-menu-store";
import Toggle from "../components/ui/Toggle";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";

export default function MenuManagement() {
  const { items, toggleAvailable, addItem, deleteItem } = useMenuStore();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  // Form states for add item
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryForm, setCategoryForm] = useState("Beverages");
  const [isVeg, setIsVeg] = useState(true);
  const [desc, setDesc] = useState("");
  const [variantsList, setVariantsList] = useState([{ name: "Regular", priceAdd: 0 }]);
  const [optionsList, setOptionsList] = useState([]);

  // Temp states for adding variant/option items inside the form
  const [tempVarName, setTempVarName] = useState("");
  const [tempVarPrice, setTempVarPrice] = useState("");
  const [tempOptName, setTempOptName] = useState("");
  const [tempOptPrice, setTempOptPrice] = useState("");

  const categories = ["All", ...new Set(items.map(i => i.category))];

  const filtered = items.filter(i =>
    (category === "All" || i.category === category) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddVariant = () => {
    if (!tempVarName) return;
    setVariantsList([...variantsList, { name: tempVarName, priceAdd: parseFloat(tempVarPrice) || 0 }]);
    setTempVarName("");
    setTempVarPrice("");
  };

  const handleAddOption = () => {
    if (!tempOptName) return;
    setOptionsList([...optionsList, { name: tempOptName, priceAdd: parseFloat(tempOptPrice) || 0 }]);
    setTempOptName("");
    setTempOptPrice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    addItem({
      name,
      price: parseFloat(price),
      category: categoryForm,
      veg: isVeg,
      desc,
      variants: variantsList,
      options: optionsList,
      img: categoryForm === "Beverages" ? "☕" : categoryForm === "Bakery" ? "🥐" : categoryForm === "Mains" ? "🥪" : categoryForm === "Desserts" ? "🍰" : "🍟"
    });

    // Reset forms
    setName("");
    setPrice("");
    setIsVeg(true);
    setDesc("");
    setVariantsList([{ name: "Regular", priceAdd: 0 }]);
    setOptionsList([]);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Quick Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ l: "Total Items", v: items.length }, { l: "Categories", v: categories.length - 1 }, { l: "Veg Options", v: items.filter(i => i.veg).length }, { l: "Out of Stock", v: items.filter(i => !i.available).length }].map((s) => (
          <Card key={s.l} className="p-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">{s.l}</span>
            <span className="text-xl font-bold">{s.v}</span>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:max-w-xs relative flex items-center p-1 rounded-2xl bg-white/5 border border-white/5 focus-within:border-violet-500 transition-all">
          <Search className="w-4 h-4 text-slate-500 ml-3" />
          <input 
            placeholder="Search catalog items..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-2 pr-4 py-1.5 bg-transparent border-none text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="flex-1 sm:flex-initial bg-gradient-to-r from-violet-600 to-pink-600 flex items-center gap-1.5" onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4" /> Add Item
          </Button>
          <Button variant="secondary" className="flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map(c => (
          <button 
            key={c} 
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
              category === c 
                ? "bg-primary text-white border-primary" 
                : "bg-white/5 border-white/5 text-slate-400 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Table grid catalog */}
      <Card className="overflow-hidden border border-white/5">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/5">
                <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Item Info</th>
                <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Base Price</th>
                <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Variants</th>
                <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Stock State</th>
                <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-1.5 rounded-xl bg-white/5 border border-white/5">{item.img}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{item.name}</div>
                        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 ${
                          item.veg ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                          {item.veg ? "🟢 Veg" : "🔴 Non-veg"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-xs px-2.5 py-1 rounded-xl bg-white/5 border border-white/5 text-slate-400">{item.category}</span></td>
                  <td className="px-5 py-4 font-bold text-xs text-primary">₹{item.price}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 flex-wrap max-w-xs">
                      {item.variants?.map(v => (
                        <span key={v.name} className="text-[9px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2 py-0.5 rounded-md font-medium">
                          {v.name} {v.priceAdd > 0 ? `(+₹${v.priceAdd})` : ""}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Toggle checked={item.available} onChange={() => toggleAvailable(item.id)} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-violet-500/30 text-slate-400 hover:text-violet-400 transition-all cursor-pointer">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 transition-all cursor-pointer" onClick={() => deleteItem(item.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Item form modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Catalog Product" subtitle="Introduce new variations, descriptions and add-on custom options">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Product Name</label>
              <input placeholder="e.g. Masala Chai" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all" required />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Base Price (₹)</label>
              <input type="number" placeholder="80" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Category</label>
              <select value={categoryForm} onChange={e => setCategoryForm(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all">
                <option>Beverages</option><option>Mains</option><option>Snacks</option><option>Desserts</option><option>Bakery</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Dietary Badge</label>
              <select value={isVeg ? "veg" : "nonveg"} onChange={e => setIsVeg(e.target.value === "veg")} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all">
                <option value="veg">🟢 Vegetarian (Veg)</option>
                <option value="nonveg">🔴 Non-Vegetarian (Non-Veg)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Description</label>
            <textarea rows={2} placeholder="Ingredients, brewing details..." value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all resize-none" />
          </div>

          {/* Variants section inside form */}
          <div className="border border-white/5 rounded-2xl p-4 bg-white/5 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">Variants & Sizes ({variantsList.length})</span>
            <div className="flex gap-2">
              <input placeholder="e.g. Large" value={tempVarName} onChange={e => setTempVarName(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white outline-none" />
              <input type="number" placeholder="+₹30" value={tempVarPrice} onChange={e => setTempVarPrice(e.target.value)} className="w-20 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white outline-none" />
              <Button type="button" variant="secondary" className="px-3 py-1.5" onClick={handleAddVariant}>+</Button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {variantsList.map((v, i) => (
                <span key={i} className="text-[9px] bg-violet-500/10 text-violet-300 border border-violet-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                  {v.name} {v.priceAdd > 0 ? `(+₹${v.priceAdd})` : ""}
                  {i > 0 && <span className="cursor-pointer text-rose-400 hover:text-rose-600" onClick={() => setVariantsList(variantsList.filter((_, idx) => idx !== i))}>✕</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Options & Addons section */}
          <div className="border border-white/5 rounded-2xl p-4 bg-white/5 space-y-3">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">Add-ons & Options ({optionsList.length})</span>
            <div className="flex gap-2">
              <input placeholder="e.g. Extra Cheese" value={tempOptName} onChange={e => setTempOptName(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white outline-none" />
              <input type="number" placeholder="+₹20" value={tempOptPrice} onChange={e => setTempOptPrice(e.target.value)} className="w-20 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white outline-none" />
              <Button type="button" variant="secondary" className="px-3 py-1.5" onClick={handleAddOption}>+</Button>
            </div>
            <div className="flex gap-1 flex-wrap">
              {optionsList.map((o, i) => (
                <span key={i} className="text-[9px] bg-pink-500/10 text-pink-300 border border-pink-500/20 px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                  {o.name} {o.priceAdd > 0 ? `(+₹${o.priceAdd})` : ""}
                  <span className="cursor-pointer text-rose-400 hover:text-rose-600" onClick={() => setOptionsList(optionsList.filter((_, idx) => idx !== i))}>✕</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-white/5">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-violet-600 to-pink-600">Save Item</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
