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

    // 2. Initialize Worker from public folder
    const worker = new Worker('/productWorker.js');

    // 3. Set up Debounce (wait 300ms after last keystroke before filtering)
    const timeoutId = setTimeout(() => {
      worker.postMessage({
        products: allProducts,
        search: searchInput,
        category: activeCategory
      });
    }, 300);

    // 4. Handle result from Worker
    worker.onmessage = (e) => {
      setFilteredItems(e.data); // Updates Zustand store
      worker.terminate();
    };

    // Cleanup: Terminate worker if user types again or leaves page
    return () => {
      worker.terminate();
      clearTimeout(timeoutId);
    };
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