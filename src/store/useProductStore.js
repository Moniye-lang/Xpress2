// src/store/useProductStore.js
import { create } from 'zustand';
import { data } from "../pages/Productdata";

// By using a string, Vite won't try to "bundle" it from the src folder
// In production, this file will exist at the domain root.
const worker = new Worker('/productWorker.js');

export const useProductStore = create((set) => {
  // Setup listener once
  worker.onmessage = (e) => {
    set({ filteredProducts: e.data, isProcessing: false });
  };

  return {
    filteredProducts: data,
    isProcessing: false,
    filterProducts: (search, category) => {
      set({ isProcessing: true });
      worker.postMessage({ products: data, search, category });
    },
  };
});