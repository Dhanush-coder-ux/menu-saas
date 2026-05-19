import React, { useState } from "react";
import { Search, Plus, Sparkles, FolderPlus } from "lucide-react";
import { useAIUploadStore } from "../store/use-ai-upload-store";
import Button from "../../../components/ui/Button";

export default function SearchMenuBar() {
  const { searchQuery, setSearchQuery, addCategory } = useAIUploadStore();
  const [newCatName, setNewCatName] = useState("");
  const [showAddCat, setShowAddCat] = useState(false);

  const handleAddCatSubmit = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory(newCatName.trim());
    setNewCatName("");
    setShowAddCat(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input bar */}
      <div className="w-full md:max-w-xs relative flex items-center p-1 rounded-2xl bg-white/5 border border-white/5 focus-within:border-violet-500 transition-all">
        <Search className="w-4 h-4 text-slate-500 ml-4" />
        <input
          placeholder="Search extracted items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-3 pr-4 py-2 bg-transparent text-xs text-white placeholder-slate-500 outline-none"
        />
      </div>

      {/* Categories controllers */}
      <div className="flex gap-2 w-full md:w-auto relative">
        {showAddCat ? (
          <form onSubmit={handleAddCatSubmit} className="flex gap-2 w-full">
            <input
              placeholder="Category Name"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-xs text-white outline-none focus:border-violet-500 transition-all flex-1 md:w-36"
              required
            />
            <Button type="submit" className="bg-gradient-to-r from-violet-600 to-pink-600 text-xs">
              Save
            </Button>
            <Button variant="secondary" className="text-xs" onClick={() => setShowAddCat(false)}>
              Cancel
            </Button>
          </form>
        ) : (
          <Button
            variant="secondary"
            className="flex-1 md:flex-initial text-xs flex items-center gap-1.5 justify-center py-2.5 px-4"
            onClick={() => setShowAddCat(true)}
          >
            <FolderPlus className="w-4 h-4 text-violet-400" />
            <span>Add Category</span>
          </Button>
        )}
      </div>
    </div>
  );
}
