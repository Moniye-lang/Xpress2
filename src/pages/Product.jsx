import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { data } from "./Productdata";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, PackageX, ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = ["All", "Cylinder", "Burner", "Accessories", "Cooker"];
const ITEMS_PER_PAGE = 6;

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  // 1. URL State Management (Best for SEO & Sharing)
  const activeCategory = searchParams.get("cat") || "All";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [activeCategory, currentPage]);

  // 2. Optimized Filtering
  const filteredProducts = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.Category === activeCategory;
      const matchesSearch = item.Pname.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setSearchParams({ cat: activeCategory, page: page.toString() });
  };

  const handleCategoryChange = (cat) => {
    setSearchParams({ cat, page: "1" });
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 3. Dynamic Hero Header */}
      <section className="bg-green-900 pt-32 pb-20 px-6 text-center text-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight text-white">
            Premium <span className="text-green-400">Gas</span> Gear
          </h1>
          <p className="text-green-100/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Browse our certified collection of industrial and domestic gas equipment.
          </p>

          {/* Search Bar with Icon */}
          <div className="mt-10 relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 shadow-2xl focus:ring-4 ring-green-500/30 outline-none transition-all"
            />
          </div>
        </motion.div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full" />
      </section>

      {/* 4. Filters Bar */}
      <div className="sticky top-[80px] z-30 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 text-gray-500 mr-4 shrink-0">
            <SlidersHorizontal size={18} />
            <span className="text-sm font-bold uppercase tracking-wider">Filter</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat
                ? "bg-green-800 text-white shadow-lg shadow-green-900/20"
                : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat === "Cylinder" ? "Cylinders" : cat === "Burner" ? "Burners" : cat}
            </button>
          ))}
        </nav>
      </div>

      {/* 5. Product Grid with Skeleton Loading */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {loading ? (
              Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((item, index) => (
                <ProductCard key={item.id} item={item} index={index} />
              ))
            ) : (
              <NoResults />
            )}
          </AnimatePresence>
        </div>

        {/* 6. Professional Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-20">
            <PaginationButton 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              icon={<ChevronLeft size={20} />}
            />
            <span className="text-gray-500 font-medium">
              Page <span className="text-gray-900 font-bold">{currentPage}</span> of {totalPages}
            </span>
            <PaginationButton 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              icon={<ChevronRight size={20} />}
            />
          </div>
        )}
      </div>
    </main>
  );
}

// --- Sub-components for 10/10 Quality ---

function ProductCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-[2.5rem] border border-gray-100 p-4 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-500"
    >
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-gray-100">
        <img
          src={item.img || "/placeholder.jpg"}
          alt={item.Pname}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-green-900 shadow-sm">
          {item.Category}
        </div>
      </div>
      <div className="p-6 text-center">
        <h2 className="text-xl font-black text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
          {item.Pname}
        </h2>
        <div className="w-8 h-1 bg-green-200 mx-auto rounded-full group-hover:w-16 transition-all duration-500" />
      </div>
    </motion.article>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-4 animate-pulse">
      <div className="aspect-square rounded-[2rem] bg-gray-200 mb-6" />
      <div className="h-6 bg-gray-200 rounded-full w-3/4 mx-auto mb-3" />
      <div className="h-4 bg-gray-100 rounded-full w-1/2 mx-auto" />
    </div>
  );
}

function NoResults() {
  return (
    <div className="col-span-full py-20 text-center">
      <div className="inline-flex p-6 bg-gray-100 rounded-full text-gray-400 mb-4">
        <PackageX size={48} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900">No products found</h3>
      <p className="text-gray-500">Try adjusting your search or filters.</p>
    </div>
  );
}

function PaginationButton({ onClick, disabled, icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-3 rounded-2xl bg-white border border-gray-200 text-gray-900 shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90"
    >
      {icon}
    </button>
  );
}