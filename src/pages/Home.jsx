import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

// 1. Externalized Data
const SERVICES = [
  { title: "Bulk Supply", text: "Liquified Petroleum Gas delivered throughout SouthWest Nigeria at competitive industrial rates." },
  { title: "Accessories", text: "Durable, safety-certified gas accessories. From regulators to industrial hoses." },
  { title: "Consultancy", text: "Expert guidance on plant construction, logrun distics, and safety installations." },
];

const FEATURED_PRODUCTS = [
  { img: "/Thermocool.webp", name: "Thermocool Gas Cooker", price: "36,000" },
  { img: "/3kg.webp", name: "3kg Gas Cylinder", price: "21,000" },
  { img: "/Aluminium Pot Serater.webp", name: "Aluminium Pot Seater", price: "3,500" },
];

// 2. Optimized Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* HERO SECTION - Critical for LCP Score */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-green-950">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/IMG_4548.webp" 
            fetchPriority="high" // High priority for LCP
            alt="Cooking Gas Facility" 
            width="1920" // Explicit dimensions prevent layout shift
            height="1080"
            className="w-full h-full object-cover opacity-60"
            // Important: No loading="lazy" on hero images!
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-green-950/80" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-none uppercase tracking-tighter"
          >
            Welcome to <br />
            <span className="text-red-600 inline-block mt-2">Xpress</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-blue-600 text-2xl md:text-4xl font-bold mt-4 tracking-wide italic"
          >
            Cooking Gas
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex gap-4"
          >
            <Link 
              to="/About" 
              aria-label="Learn more about our services"
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl"
            >
              More About Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <header className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">Our Services</h2>
            <div className="h-2 w-24 bg-green-700 mx-auto rounded-full" />
          </header>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {SERVICES.map((service, i) => (
              <motion.div 
                key={i}
                variants={itemReveal}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl hover:border-green-200 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-green-800 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <span className="text-2xl font-bold">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">{service.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-2 text-lg">Quality equipment for your kitchen safety.</p>
            </div>
            <Link to="/Product" className="group flex items-center gap-2 text-green-800 font-bold text-lg">
              Browse Store <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {FEATURED_PRODUCTS.map((p, i) => (
              <ProductCard key={i} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// 3. Extracted Sub-component with CLS Fixes
function ProductCard({ product, index }) {
  return (
    <motion.div
      variants={itemReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100"
    >
      {/* 1. ASPECT RATIO WRAPPER: Fixes the 0.303 CLS shift */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.img}
          alt={product.name}
          width="500" // 2. EXPLICIT WIDTH/HEIGHT: Key for Lighthouse
          height="500"
          loading="lazy" 
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-800 transition-colors">
          {product.name}
        </h3>
        <Link
          to="/Product"
          aria-label={`View details for ${product.name}`} // 3. DISCERNIBLE NAME: Fixes Accessibility score
          className="mt-6 w-full py-3 px-6 rounded-xl border-2 border-green-800 text-green-800 font-bold inline-block text-center hover:bg-green-800 hover:text-white transition-all active:scale-95"
        >
          View Product
        </Link>
      </div>
    </motion.div>
  );
}