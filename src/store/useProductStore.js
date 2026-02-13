// src/store/useProductStore.js
import { create } from 'zustand';
import { data } from "../pages/Productdata";

export const useProductStore = create((set) => {
  let worker = null;

  if (typeof window !== "undefined") {
    worker = new Worker("/productWorker.js");

    worker.onmessage = (e) => {
      set({ filteredProducts: e.data, isProcessing: false });
    };

    worker.onerror = (err) => {
      console.error("Worker error:", err);
    };
  }

  return {
    filteredProducts: [],
    isProcessing: false,

    filterProducts: (search, category) => {
      if (!worker) return;

      set({ isProcessing: true });
      worker.postMessage({ products: data, search, category });
    }
  };
});
