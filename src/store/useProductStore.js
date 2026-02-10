// src/store/useProductStore.js
import { create } from 'zustand';
import { data } from "../pages/Productdata";

// This format ensures the worker is found on live servers
const worker = new Worker(new URL('../../public/productWorker.js', import.meta.url), {
  type: 'module'
});
export const useProductStore = create((set) => ({
  filteredProducts: data, // Initialize with data so it's not empty on first load
  isProcessing: false,

  filterProducts: (search, category) => {
    set({ isProcessing: true });
    
    worker.postMessage({ products: data, search, category });
    
    worker.onmessage = (e) => {
      set({ filteredProducts: e.data, isProcessing: false });
    };
  }
}));