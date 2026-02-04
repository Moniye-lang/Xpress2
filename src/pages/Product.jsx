import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "../store/useProductStore";

// Optimized path-based imports
import Search from "lucide-react/dist/esm/icons/search";
import SlidersHorizontal from "lucide-react/dist/esm/icons/sliders-horizontal";
import PackageX from "lucide-react/dist/esm/icons/package-x";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

const CATEGORIES = ["All", "Cylinder", "Burner", "Accessories", "Cooker"];
const ITEMS_PER_PAGE = 6;

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Zustand Store
  const { filteredProducts, isProcessing, filterProducts } = useProductStore();

  const activeCategory = searchParams.get("cat") || "All";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Sync Search and Filter via Worker
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      filterProducts(searchTerm, activeCategory);
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, activeCategory, filterProducts]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <section className="bg-green-900 pt-32 pb-20 px-6 text-center text-white relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            Premium <span className="text-green-400">Gas</span> Gear
          </h1>
          
          <div className="mt-10 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 shadow-2xl outline-none focus:ring-4 ring-green-500/30 transition-all"
            />
          </div>
        </motion.div>
      </section>

      {/* Sticky Filters */}
      <div className="sticky top-[79px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <SlidersHorizontal size={18} className="text-gray-400 shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams({ cat, page: "1" })}
              className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat ? "bg-green-800 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isProcessing ? (
            Array(ITEMS_PER_PAGE).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : paginatedProducts.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {paginatedProducts.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <NoResults />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-20">
            <PaginationButton 
              onClick={() => setSearchParams({ cat: activeCategory, page: (currentPage - 1).toString() })} 
              disabled={currentPage === 1}
              icon={<ChevronLeft size={20} />}
            />
            <span className="text-gray-500 font-medium">Page {currentPage} of {totalPages}</span>
            <PaginationButton 
              onClick={() => setSearchParams({ cat: activeCategory, page: (currentPage + 1).toString() })} 
              disabled={currentPage === totalPages}
              icon={<ChevronRight size={20} />}
            />
          </div>
        )}
      </div>
    </main>
  );
}

// Sub-components with CLS Fixes
function ProductCard({ item }) {
  return (
    <article className="group bg-white rounded-[2.5rem] border border-gray-100 p-4 hover:shadow-2xl transition-all duration-500">
      {/* ASPECT RATIO WRAPPER - FIXES CLS */}
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100">
        <img
          src={item.img}
          alt={item.Pname}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-green-900">
          {item.Category}
        </div>
      </div>
      <div className="p-6 text-center">
        <h2 className="text-xl font-black text-gray-900">{item.Pname}</h2>
        <div className="w-8 h-1 bg-green-200 mx-auto rounded-full mt-2" />
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-4 animate-pulse">
      <div className="aspect-square rounded-[2rem] bg-gray-200 mb-6" />
      <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto" />
    </div>
  );
}

function NoResults() {
  return (
    <div className="col-span-full py-20 text-center">
      <PackageX size={48} className="mx-auto text-gray-300 mb-4" />
      <h3 className="text-2xl font-bold text-gray-900">No products found</h3>
    </div>
  );
}

function PaginationButton({ onClick, disabled, icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-3 rounded-2xl bg-white border border-gray-200 shadow-sm disabled:opacity-30 active:scale-90 transition-all"
    >
      {icon}
    </button>
  );
}