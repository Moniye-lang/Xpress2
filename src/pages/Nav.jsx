import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Product", path: "/Product" },
    { name: "Contact Us", path: "/Contact" },
  ];

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        className={`bg-green-800 text-white p-4 shadow-md sticky top-0 z-50 transition-all duration-300
        ${isOpen ? "blur-sm pointer-events-none select-none" : ""}`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/xpresslogo.jpg"
              className="h-[80px] w-[100px] rounded-[50px]"
              alt="Xpress Logo"
            />
            <span className="text-2xl font-bold hidden sm:inline">Xpress</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-all duration-300 hover:text-gray-300 ${
                  location.pathname === link.path
                    ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-white"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-[280px] bg-green-800 text-white z-50 shadow-xl"
          >
            {/* Header */}
            <div className="h-[80px] flex items-center justify-between px-5 border-b border-white/20">
              <div className="flex items-center gap-2">
                <img
                  src="/xpresslogo.jpg"
                  className="h-[40px] w-[40px] rounded-full"
                  alt="Xpress Logo"
                />
                <span className="font-semibold text-lg">Xpress</span>
              </div>

              <button onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6 px-6 mt-8 text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`transition hover:text-gray-300 ${
                    location.pathname === link.path ? "font-bold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
