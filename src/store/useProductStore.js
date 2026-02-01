import { create } from 'zustand';

export const useProductStore = create((set) => ({
  // The actual data being displayed
  filteredItems: [],
  
  // UI States for performance (e.g., showing a skeleton while Worker is thinking)
  isProcessing: false,

  // Actions
  setFilteredItems: (items) => set({ 
    filteredItems: items, 
    isProcessing: false 
  }),
  
  startProcessing: () => set({ isProcessing: true }),
}));