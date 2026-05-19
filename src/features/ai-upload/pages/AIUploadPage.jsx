import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Plus, Sparkles, SlidersHorizontal, ArrowLeft, RefreshCw, FolderPlus } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";
import { useMenuStore } from "../../../store/use-menu-store";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import EmptyUploadState from "../components/EmptyUploadState";
import FilePreviewCard from "../components/FilePreviewCard";
import AIProcessingModal from "../components/AIProcessingModal";
import MenuItemCard from "../components/MenuItemCard";
import JSONViewerPanel from "../components/JSONViewerPanel";
import SearchMenuBar from "../components/SearchMenuBar";
import CategoryTabs from "../components/CategoryTabs";
import ToastContainer from "../components/ToastContainer";

export default function AIUploadPage() {
  const { 
    files, 
    aiStage, 
    extractedMenu, 
    activeTab, 
    searchQuery, 
    resetStore,
    addItem,
    addToast
  } = useAIUploadStore();

  const menuStore = useMenuStore();
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  // Form states for new item within reviewed catalog
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [itemImg, setItemImg] = useState("🍔");
  const [itemVeg, setItemVeg] = useState(true);

  // Sync to core store action
  const handleSaveToInventory = () => {
    if (!extractedMenu) return;

    extractedMenu.categories.forEach((cat) => {
      cat.items.forEach((i) => {
        menuStore.addItem({
          name: i.name,
          price: i.price,
          category: cat.name,
          veg: i.veg,
          desc: i.description || "AI OCR Extracted product item details",
          img: i.image || "🥪",
          variants: [{ name: "Regular", priceAdd: 0 }],
          options: []
        });
      });
    });

    addToast(`Successfully synchronized all parsed products to your core Menu Builder!`, "success");
    resetStore();
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice) return;

    const targetCat = activeTab === "All" ? extractedMenu.categories[0]?.name : activeTab;
    if (!targetCat) {
      addToast("Please create a category first.", "error");
      return;
    }

    addItem(targetCat, {
      name: itemName,
      price: parseFloat(itemPrice),
      description: itemDesc,
      image: itemImg,
      veg: itemVeg
    });

    // Reset fields
    setItemName("");
    setItemPrice("");
    setItemDesc("");
    setItemImg("🍔");
    setItemVeg(true);
    setShowAddItemModal(false);
  };

  // Filter items based on active tab and search query
  const getFilteredItems = () => {
    if (!extractedMenu) return [];
    
    let all = [];
    extractedMenu.categories.forEach((cat) => {
      if (activeTab === "All" || cat.name === activeTab) {
        cat.items.forEach((item) => {
          all.push({ ...item, categoryName: cat.name });
        });
      }
    });

    return all.filter((i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (i.description && i.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filtered = getFilteredItems();

  return (
    <div className="space-y-6 text-left page-enter relative">
      <AnimatePresence>
        {aiStage === "review" && extractedMenu ? (
          <motion.div
            key="review-editor-canvas"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white/5 border border-white/5 p-5 rounded-3xl backdrop-blur-xl">
              <div className="text-left space-y-0.5">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">AI Parsing Scanner</span>
                <h2 className="text-base font-black text-slate-100 flex items-center gap-2">
                  <span>🔍 Review Extracted Menu:</span>
                  <span className="text-violet-400 font-extrabold">{extractedMenu.shopName}</span>
                </h2>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  variant="secondary" 
                  className="flex-1 sm:flex-initial text-xs flex items-center gap-1.5 justify-center py-2.5"
                  onClick={resetStore}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Re-upload File
                </Button>
                <Button 
                  className="flex-1 sm:flex-initial text-xs flex items-center gap-1.5 justify-center bg-gradient-to-r from-violet-600 to-pink-600 py-2.5"
                  onClick={() => setShowAddItemModal(true)}
                >
                  <Plus className="w-4 h-4" /> Add Item
                </Button>
              </div>
            </div>

            {/* Controllers row */}
            <SearchMenuBar />

            {/* Category pills tabs row */}
            <CategoryTabs />

            {/* Structured Item Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.03, type: "spring", stiffness: 350, damping: 28 }}
                  >
                    <MenuItemCard item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {filtered.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 border border-white/5 rounded-3xl bg-white/5">
                  <h3 className="text-xs font-bold text-slate-400">No parsed products in this category segment</h3>
                  <p className="text-[9px] text-slate-500 max-w-xs mx-auto mt-1">Adjust search parameters or click "Add Item" to add new rows.</p>
                </div>
              )}
            </div>

            {/* Collapsible raw specs panel */}
            <JSONViewerPanel />

            {/* Sync to Core Inventory */}
            <Button 
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-pink-600 justify-center text-xs font-black shadow-xl shadow-violet-500/25 flex items-center gap-2"
              onClick={handleSaveToInventory}
            >
              <Database className="w-4 h-4" /> Save Extracted Menu directly to Inventory Catalog →
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="upload-zone-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Standard Uploader grids */}
            <EmptyUploadState />

            {/* Current files list */}
            {files.length > 0 && (
              <div className="space-y-3.5">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 text-left">Upload Queue / Scans</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {files.map((f) => (
                    <FilePreviewCard key={f.id} fileObj={f} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* OCR processing stepper modal overlay */}
      <AIProcessingModal />

      {/* Floating micro notification toasts */}
      <ToastContainer />

      {/* Add Item form modal within review stage */}
      <Modal 
        isOpen={showAddItemModal} 
        onClose={() => setShowAddItemModal(false)} 
        title="Add Product Card" 
        subtitle="Introduce custom variations and description notes"
      >
        <form onSubmit={handleAddItemSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Product Title</label>
              <input 
                placeholder="e.g. Garlic Bread" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all" 
                required 
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Base Price (₹)</label>
              <input 
                type="number" 
                placeholder="160" 
                value={itemPrice} 
                onChange={(e) => setItemPrice(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all" 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Image Emoji</label>
              <input 
                placeholder="🍞" 
                value={itemImg} 
                onChange={(e) => setItemImg(e.target.value.slice(0,2))} 
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all text-center text-lg" 
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Diet Classification</label>
              <select 
                value={itemVeg ? "veg" : "nonveg"} 
                onChange={(e) => setItemVeg(e.target.value === "veg")}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all"
              >
                <option value="veg">🟢 Vegetarian (Veg)</option>
                <option value="nonveg">🔴 Non-Vegetarian (Non-Veg)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Description</label>
            <textarea 
              rows={2} 
              placeholder="Crispy buttery baked garlic bread infused with rosemary..." 
              value={itemDesc} 
              onChange={(e) => setItemDesc(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all resize-none" 
            />
          </div>

          <div className="flex gap-3 justify-end pt-3 border-t border-white/5">
            <Button variant="secondary" className="text-xs" onClick={() => setShowAddItemModal(false)}>Cancel</Button>
            <Button type="submit" className="bg-gradient-to-r from-violet-600 to-pink-600 text-xs">Save Product</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
