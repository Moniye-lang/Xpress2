import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link, useLocation } from "react-router-dom";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";

// 1. Context for Compound Component State
const NavContext = createContext(null);
const useNav = () => useContext(NavContext);

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/About" },
  { name: "Product", path: "/Product" },
  { name: "Contact Us", path: "/Contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggle = useCallback(() => setIsOpen(v => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Sync scroll lock with state
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on route change
  useEffect(() => { close(); }, [pathname, close]);

  return (
    <NavContext.Provider value={{ isOpen, toggle, close }}>
      <header className="sticky top-0 z-40 w-full bg-green-800 text-white shadow-">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
          <Brand />
          <DesktopLinks />
          <MobileToggle />
        </div>
      </header>
      
      <MobileSidebar />
    </NavContext.Provider>
  );
}

// --- Sub-Components (Compound Pattern) ---

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-2 outline-offset-4 outline-white rounded-md">
      <img 
        src="/xpresslogo.webp" 
        className="h-12 w-12 rounded-full object-cover border-2 border-green-700" 
        alt="Xpress - Back to Home" 
      />
      <span className="text-2xl font-black tracking-tight hidden sm:inline">XPRESS</span>
    </Link>
  );
}

function DesktopLinks() {
  return (
    <nav className="hidden md:flex items-center gap-1 font-medium">
      {NAV_LINKS.map(({ name, path }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-md transition-all duration-200 hover:bg-white/10 ${
              isActive ? "text-white font-bold" : "text-green-100/80"
            }`
          }
        >
          {name}
        </NavLink>
      ))}
    </nav>
  );
}

function MobileToggle() {
  const { isOpen, toggle } = useNav();
  return (
    <button
      onClick={toggle}
      className="md:hidden p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X size={30} /> : <Menu size={30} />}
    </button>
  );
}

function MobileSidebar() {
  const { isOpen, close } = useNav();

  // 2. React Portal: Renders the menu at the end of <body> to avoid CSS conflicts
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer with Focus Lock */}
          <motion.aside
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[101] h-full w-[min(85vw,400px)] bg-green-900 shado"
          >
            <FocusLock returnFocus={true}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <span className="font-bold text-xl text-[#fff] uppercase tracking-widest">Menu</span>
                  <button onClick={close} className="p-2" aria-label="Close menu">
                    <X className="text-[#fff]" size={28} />
                  </button>
                </div>

                <nav className="flex flex-col p-6 space-y-2">
                  {NAV_LINKS.map(({ name, path }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={close}
                      className={({ isActive }) =>
                        `flex items-center p-4 text-lg rounded-xl transition-all ${
                          isActive ? "bg-white/10 text-white font-bold" : "text-green-100/70 hover:bg-white/5"
                        }`
                      }
                    >
                      {name}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </FocusLock>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}