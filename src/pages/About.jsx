import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Truck from "lucide-react/dist/esm/icons/truck";
import Zap from "lucide-react/dist/esm/icons/zap";
import Headphones from "lucide-react/dist/esm/icons/headphones";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
import Award from "lucide-react/dist/esm/icons/award";

// 1. Decoupled Data
const SERVICES = [
  { id: 1, icon: <ShieldCheck />, title: "LPG Supply", desc: "Safe handling and certified quality gas." },
  { id: 2, icon: <Zap />, title: "Cylinder Refilling", desc: "Precision filling with rigorous safety checks." },
  { id: 3, icon: <Truck />, title: "Bulk Delivery", desc: "Optimized logistics for industrial partners." },
  { id: 4, icon: <Headphones />, title: "Consultancy", desc: "Expert planning for gas plant installations." },
];

const STATS = [
  { label: "Years Experience", value: "8+", icon: <Award className="text-green-600" /> },
  { label: "Happy Customers", value: "5k+", icon: <ShieldCheck className="text-green-600" /> },
  { label: "Regions Covered", value: "SouthWest", icon: <MapPin className="text-green-600" /> },
];

// 2. Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-white text-gray-900 selection:bg-green-100">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-green-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="w-full lg:w-1/2 space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-bold tracking-wide uppercase">
              Est. 2016
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight">
              Fueling Homes with <span className="text-green-700">Precision.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Based in Ibadan, Xpress Cooking Gas is redefining energy reliability. We don't just deliver gas; we deliver safety, convenience, and peace of mind.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-green-700 text-white rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-800 transition-all active:scale-95">
                Work with Us
              </Link>
              <a href="#services" className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                Our Services
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image with Floating Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
              <img src="/CXRH8720.webp" alt="Xpress Team" className="w-full aspect-square object-cover" />
            </div>
            {/* Abstract background shape */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-200/50 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-100 rounded-full blur-3xl -z-0" />
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-gray-900 rounded-[2.5rem] shadow-2xl">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-6 md:justify-center border-r last:border-0 border-white/10">
                <div className="p-4 bg-white/10 rounded-2xl text-white">{stat.icon}</div>
                <div>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3 top-32 h-fit">
              <h2 className="text-4xl font-black text-gray-900 mb-6">Expert Solutions for Modern Energy</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                From high-rise residential refills to industrial logistics, our infrastructure is built to scale with your needs.
              </p>
              <div className="space-y-4">
                {['Oyo State', 'Lagos', 'Ogun State'].map(area => (
                  <div key={area} className="flex items-center gap-3 text-green-800 font-bold">
                    <MapPin size={20} /> {area}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
              {SERVICES.map((s) => (
                <motion.div 
                  key={s.id}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-700 shadow-sm mb-6 group-hover:bg-green-700 group-hover:text-white transition-colors">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION (Glassmorphism) */}
      <section className="py-20 px-6">
        <motion.div 
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden bg-green-800 p-12 text-center text-white"
        >
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black">Ready to Partner?</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Whether you need a single refill or a bulk industrial contract, Xpress is your partner in reliable energy.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Link to="/contact" className="px-10 py-4 bg-white text-green-800 rounded-full font-bold shadow-xl hover:bg-gray-100 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
          {/* Abstract background circles */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        </motion.div>
      </section>
    </div>
  );
}