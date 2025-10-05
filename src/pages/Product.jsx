import { useState, useEffect } from "react";
import { data } from "./Productdata";
import { motion } from "framer-motion";

export default function Product() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔸 Categories
  const categories = ["All", "Cylinder", "Burner", "Accessories", "Cooker"];

  // 🔸 Filter products based on active category and search
  const filteredProducts = data.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.Category === activeCategory;
    const matchesSearch = item.Pname.toLowerCase().includes(
      search.toLowerCase()
    );
    return matchesCategory && matchesSearch;
  });

  // 🔸 Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="flex flex-col bg-gray-50 py-20 px-6 relative">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-900">
          Products
        </h1>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64"
          />
        </div>
        <p className="font-medium text-2xl text-gray-700 mt-3">
          Quality Gas Equipment & Accessories
        </p>
        <div className="mt-4 w-24 mx-auto h-1 bg-green-700 rounded-full" />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-green-800 text-white shadow-md"
                : "bg-white border border-green-700 text-green-800 hover:bg-green-700 hover:text-white"
            }`}
          >
            {cat === "Cylinder" ? "Cylinders" : cat === "Burner" ? "Burners" : cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {filteredProducts.map((item, index) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <div className="relative w-full h-64 overflow-hidden">
            <a href={item.img} >
              <motion.img
                src={item.img || "/placeholder.jpg"}
                alt={item.Pname}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </a>
            </div>

            <div className="p-6 flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {item.Pname}
              </h2>
              <p className="text-xl font-bold text-green-700 text-[25px] mt-2">
                {item.Price}
              </p>
              <p className="text-sm text-gray-500 mt-1">{item.Category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>
      </div>
    </div>
  );
}
