import { useState, useEffect, useMemo } from "react";
import { data } from "./Productdata";
import { motion } from "framer-motion";

export default function Product() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 6;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // 0.8s loading
    return () => clearTimeout(timer);
  }, []);

  // Categories
  const categories = ["All", "Cylinder", "Burner", "Accessories", "Cooker"];

  // Filtered products
  const filteredProducts = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.Category === activeCategory;
      const matchesSearch = item.Pname.toLowerCase().includes(
        search.toLowerCase()
      );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Reset page if filteredProducts changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
    }),
  };

  // Format category label
  const formatCategory = (cat) => {
    if (cat === "Cylinder") return "Cylinders";
    if (cat === "Burner") return "Burners";
    return cat;
  };
  const pageLoaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};


  return (
    <section className="flex flex-col bg-gray-50 py-20 px-6 relative">
       {/* Page Loader */}
  <motion.div
    variants={pageLoaderVariants}
    initial="visible"
    animate={loading ? "visible" : "exit"}
    className={`absolute inset-0 z-40 flex flex-col items-center justify-center bg-gray-50 ${
      loading ? "pointer-events-auto" : "pointer-events-none"
    }`}
    aria-busy={loading}
  >
    <motion.div
      className="h-14 w-14 border-4 border-green-700 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    <p className="mt-4 text-green-900 font-semibold tracking-wide">
      Loading products...
    </p>
  </motion.div> 
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900">
          Products
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-green-700"
            aria-label="Search products"
          />
        </div>

        <p className="font-medium text-2xl text-gray-700 mt-3">
          Quality Gas Equipment & Accessories
        </p>

        <div className="mt-4 w-24 mx-auto h-1 bg-green-700 rounded-full" />
      </header>

      {/* Category Filter */}
      <nav className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-700 ${
              activeCategory === cat
                ? "bg-green-800 text-white shadow-md"
                : "bg-white border border-green-700 text-green-800 hover:bg-green-700 hover:text-white"
            }`}
            aria-pressed={activeCategory === cat}
          >
            {formatCategory(cat)}
          </button>
        ))}
      </nav>

      {/* Product Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: productsPerPage }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl border border-gray-200 h-[350px]"
              >
                <div className="h-64 bg-gray-200 rounded-t-2xl"></div>
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))
          : paginatedProducts.map((item, index) => (
              <motion.article
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <a href={item.img} target="_blank" rel="noopener noreferrer">
                    <motion.img
                      src={item.img || "/placeholder.jpg"}
                      alt={item.Pname}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </a>
                </div>

                <div className="p-6 flex flex-col items-center text-center">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {item.Pname}
                  </h2>
                  <p className="text-xl font-bold text-green-700 mt-2">
                    {item.Price}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{item.Category}</p>
                </div>
              </motion.article>
            ))}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-12 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded cursor-pointer bg-green-700 text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded transition-all ${
                currentPage === i + 1
                  ? "bg-green-800 cursor-pointer text-white shadow-md"
                  : "bg-white border cursor-pointer border-green-700 text-green-800 hover:bg-green-700 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded  bg-green-700 text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            Next
          </button>
        </div>
      )}

      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10" />
      </div>
    </section>
  );
}
