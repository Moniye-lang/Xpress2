// src/store/useProductStore.js
import { create } from 'zustand';
import { data } from "../pages/Productdata"

// Initialize worker from public folder
const worker = new Worker('/productWorker.js');

export const useProductStore = create((set) => ({
  filteredProducts: [],
  isProcessing: false,

  filterProducts: (search, category) => {
    set({ isProcessing: true });
    
    worker.postMessage({ products: data, search, category });
    
    worker.onmessage = (e) => {
      set({ filteredProducts: e.data, isProcessing: false });
    };
  }
}));