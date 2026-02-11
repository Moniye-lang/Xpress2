// src/store/useProductStore.js
import { create } from 'zustand';
import { data } from "../pages/Productdata";

export const useProductStore = create((set) => {
  let worker = null;

  const initWorker = () => {
    if (worker) return worker;

    if (typeof window !== "undefined") {
      try {
        worker = new Worker("/productWorker.js");

        worker.onmessage = (e) => {
          set({ filteredProducts: e.data, isProcessing: false });
        };

        worker.onerror = (err) => {
          console.error("Worker error:", err);
          set({ isProcessing: false, filteredProducts: [] });
        };
      } catch (error) {
        console.error("Failed to initialize worker:", error);
        set({ isProcessing: false, filteredProducts: [] });
      }
    }
    return worker;
  };

  return {
    filteredProducts: [],
    isProcessing: false,

    filterProducts: (search, category) => {
      const w = initWorker();
      if (!w) {
        // Fallback: Filter on main thread if worker fails
        const filtered = data.filter((item) => {
          const matchesCategory = category === "All" || item.Category === category;
          const matchesSearch = !search || item.Pname.toLowerCase().includes(search.toLowerCase());
          return matchesCategory && matchesSearch;
        });
        set({ filteredProducts: filtered, isProcessing: false });
        return;
      }

      set({ isProcessing: true });
      w.postMessage({ products: data, search, category });
    }
  };
});
