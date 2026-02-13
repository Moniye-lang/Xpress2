// src/store/useProductStore.js
import { create } from "zustand";
import { data } from "../pages/Productdata";

export const useProductStore = create((set) => {
  let worker = null;

  if (typeof window !== "undefined") {
    // Use Vite's URL import syntax
    worker = new Worker(
      new URL("../workers/productWorker.js", import.meta.url)
    );

    worker.onmessage = (e) => {
      set({ filteredProducts: e.data, isProcessing: false });
    };

    worker.onerror = (err) => {
      console.error("Worker error:", err.message);
    };
  }

  return {
    filteredProducts: [],
    isProcessing: false,

    filterProducts: (search, category) => {
      if (!worker) return;

      set({ isProcessing: true });
      worker.postMessage({ products: data, search, category });
    },
  };
});
