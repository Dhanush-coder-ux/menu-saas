import { create } from "zustand";
import { mockAIService } from "../services/mock-ai.service";

export const useAIUploadStore = create((set, get) => ({
  files: [], // Array of { id, file, name, size, progress, status, error }
  aiStage: "idle", // idle, uploading, processing, review
  aiStep: 0, // 0: Uploading, 1: Reading, 2: OCR Text, 3: Structuring, 4: Ready
  extractedMenu: null, // { shopName, categories: [ { name, items: [ ... ] } ] }
  activeTab: "All",
  searchQuery: "",
  toasts: [], // Array of { id, message, type }

  // Toast Helpers
  addToast: (message, type = "success") => {
    const id = Date.now() + Math.random().toString();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 4000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  // File Upload Handlers
  addFiles: (fileList) => {
    const supportedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv"
    ];

    const currentFiles = get().files;
    const validated = Array.from(fileList).map((f) => {
      const isSupported = supportedTypes.includes(f.type) || 
                          f.name.endsWith(".xlsx") || 
                          f.name.endsWith(".csv");
      
      const isUnderSize = f.size <= 10 * 1024 * 1024; // 10MB limit

      let error = null;
      if (!isSupported) error = "Unsupported file type.";
      else if (!isUnderSize) error = "File size exceeds 10MB limit.";

      return {
        id: Math.random().toString(36).slice(2, 9),
        file: f,
        name: f.name,
        size: f.size,
        progress: 0,
        status: error ? "failed" : "idle",
        error
      };
    });

    if (validated.length === 0) return;

    set({ files: [...currentFiles, ...validated] });

    // Instantly trigger upload pipeline for valid idle files
    validated.forEach((vf) => {
      if (vf.status === "idle") {
        get().uploadSingleFile(vf.id);
      }
    });
  },

  uploadSingleFile: async (id) => {
    const fileObj = get().files.find((f) => f.id === id);
    if (!fileObj) return;

    set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 0 } : f)),
      aiStage: "uploading"
    }));

    try {
      await mockAIService.uploadFile(fileObj.file, (prog) => {
        set((state) => ({
          files: state.files.map((f) => (f.id === id ? { ...f, progress: prog } : f))
        }));
      });

      set((state) => ({
        files: state.files.map((f) => (f.id === id ? { ...f, status: "completed" } : f))
      }));

      get().addToast(`"${fileObj.name}" uploaded successfully!`, "success");

      // Auto trigger AI extraction process once uploads complete
      get().startAIScan(fileObj);
    } catch (err) {
      set((state) => ({
        files: state.files.map((f) => (f.id === id ? { ...f, status: "failed", error: "Upload failed." } : f))
      }));
      get().addToast(`Failed to upload "${fileObj.name}"`, "error");
    }
  },

  retryUpload: (id) => {
    get().uploadSingleFile(id);
  },

  removeFile: (id) => {
    set((state) => ({ files: state.files.filter((f) => f.id !== id) }));
    if (get().files.length === 0) {
      set({ aiStage: "idle" });
    }
  },

  // AI Pipeline Extraction simulator
  startAIScan: async (fileObj) => {
    set({ aiStage: "processing", aiStep: 0 });

    // Step-by-step progress simulation
    const stepsInterval = setInterval(() => {
      set((state) => {
        const nextStep = state.aiStep + 1;
        if (nextStep < 4) {
          return { aiStep: nextStep };
        }
        return {};
      });
    }, 800);

    try {
      const parsedMenu = await mockAIService.extractMenu(fileObj.file);
      clearInterval(stepsInterval);
      
      set({
        aiStep: 4,
        extractedMenu: parsedMenu,
        aiStage: "review",
        activeTab: "All"
      });
      get().addToast("AI parsed menu successfully structured!", "success");
    } catch (error) {
      clearInterval(stepsInterval);
      set({ aiStage: "idle" });
      get().addToast("AI extraction failed. Please try a cleaner sheet.", "error");
    }
  },

  // Search and tabs selectors
  setSearchQuery: (q) => set({ searchQuery: q }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Category Mutators
  addCategory: (name) => {
    const menu = get().extractedMenu;
    if (!menu) return;
    if (menu.categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      get().addToast("Category already exists.", "error");
      return;
    }
    set({
      extractedMenu: {
        ...menu,
        categories: [...menu.categories, { name, items: [] }]
      }
    });
    get().addToast(`Category "${name}" created!`, "success");
  },

  removeCategory: (name) => {
    const menu = get().extractedMenu;
    if (!menu) return;
    set({
      extractedMenu: {
        ...menu,
        categories: menu.categories.filter((c) => c.name !== name)
      },
      activeTab: "All"
    });
    get().addToast(`Category "${name}" removed.`, "info");
  },

  renameCategory: (oldName, newName) => {
    const menu = get().extractedMenu;
    if (!menu || !newName) return;
    set({
      extractedMenu: {
        ...menu,
        categories: menu.categories.map((c) => (c.name === oldName ? { ...c, name: newName } : c))
      },
      activeTab: get().activeTab === oldName ? newName : get().activeTab
    });
  },

  // Item Mutators
  addItem: (categoryName, item) => {
    const menu = get().extractedMenu;
    if (!menu) return;
    set({
      extractedMenu: {
        ...menu,
        categories: menu.categories.map((c) =>
          c.name === categoryName
            ? { ...c, items: [...c.items, { id: Date.now(), available: true, ...item }] }
            : c
        )
      }
    });
    get().addToast(`Added "${item.name}"!`, "success");
  },

  editItem: (itemId, field, value) => {
    const menu = get().extractedMenu;
    if (!menu) return;
    set({
      extractedMenu: {
        ...menu,
        categories: menu.categories.map((c) => ({
          ...c,
          items: c.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i))
        }))
      }
    });
  },

  removeItem: (itemId) => {
    const menu = get().extractedMenu;
    if (!menu) return;
    set({
      extractedMenu: {
        ...menu,
        categories: menu.categories.map((c) => ({
          ...c,
          items: c.items.filter((i) => i.id !== itemId)
        }))
      }
    });
    get().addToast("Item removed from catalog.", "info");
  },

  toggleItemAvailability: (itemId) => {
    const menu = get().extractedMenu;
    if (!menu) return;
    set({
      extractedMenu: {
        ...menu,
        categories: menu.categories.map((c) => ({
          ...c,
          items: c.items.map((i) => (i.id === itemId ? { ...i, available: !i.available } : i))
        }))
      }
    });
  },

  resetStore: () => {
    set({
      files: [],
      aiStage: "idle",
      aiStep: 0,
      extractedMenu: null,
      activeTab: "All",
      searchQuery: ""
    });
  }
}));
