import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { data as allProducts } from "./Productdata"; // Your local data
import { useProductStore } from "../store/useProductStore";

export default function Product() {
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState("");

  // Pull actions and state from Zustand
  const { filteredItems, isProcessing, setFilteredItems, startProcessing } = useProductStore();

  const activeCategory = searchParams.get("cat") || "All";

  useEffect(() => {
    // 1. Mark as processing (UI can show a skeleton/spinner)
    startProcessing();

    let worker = null;

    try {
      // 2. Initialize Worker from public folder
      worker = new Worker('/productWorker.js');

      // 3. Set up Debounce (wait 300ms after last keystroke before filtering)
      const timeoutId = setTimeout(() => {
        if (worker) {
          worker.postMessage({
            products: allProducts,
            search: searchInput,
            category: activeCategory
          });
        }
      }, 300);

      // 4. Handle result from Worker
      worker.onmessage = (e) => {
        setFilteredItems(e.data); // Updates Zustand store
        if (worker) worker.terminate();
      };

      // 5. Handle worker errors
      worker.onerror = (err) => {
        console.error('Worker error:', err);
        // Fallback: Filter on main thread
        const filtered = allProducts.filter((item) => {
          const matchesCategory = activeCategory === "All" || item.Category === activeCategory;
          const matchesSearch = !searchInput || item.Pname.toLowerCase().includes(searchInput.toLowerCase());
          return matchesCategory && matchesSearch;
        });
        setFilteredItems(filtered);
        if (worker) worker.terminate();
      };

      // Cleanup: Terminate worker if user types again or leaves page
      return () => {
        if (worker) worker.terminate();
        clearTimeout(timeoutId);
      };
    } catch (error) {
      console.error('Failed to create worker:', error);
      // Fallback: Filter on main thread
      const filtered = allProducts.filter((item) => {
        const matchesCategory = activeCategory === "All" || item.Category === activeCategory;
        const matchesSearch = !searchInput || item.Pname.toLowerCase().includes(searchInput.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      setFilteredItems(filtered);
    }
  }, [searchInput, activeCategory, setFilteredItems, startProcessing]);

  return (
    <main>
      {/* Search Input updates LOCAL state, which triggers the Effect */}
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search..."
      />

      {/* Map through items from ZUSTAND, not local state */}
      <div className="grid">
        {isProcessing ? (
          <p>Optimizing results...</p>
        ) : (
          filteredItems.map(item => <ProductCard key={item.id} item={item} />)
        )}
      </div>
    </main>
  );
}