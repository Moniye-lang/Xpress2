import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-green-950 text-white pt-20 pb-10 border-t border-green-900/50">
      <motion.div 
        className="max-w-7xl mx-auto px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Brand & Value Prop */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white p-1 rounded-2xl overflow-hidden shadow-xl shadow-green-900/20 group-hover:scale-110 transition-transform">
                <img
                  src="/xpresslogo.jpg"
                  alt="Xpress Cooking Gas Logo"
                  className="h-12 w-16 object-contain"
                />
              </div>
              <span className="text-3xl font-black tracking-tighter italic">XPRESS</span>
            </Link>
            <p className="text-green-100/60 leading-relaxed font-medium">
              Revolutionizing energy distribution across SouthWest Nigeria with a focus on safety, speed, and sustainability.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={20} />} href="#" />
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Twitter size={20} />} href="#" />
            </div>
          </motion.div>

          {/* 2. Navigation */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-green-500">Navigation</h3>
            <ul className="space-y-4 font-bold">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/About" label="Our Story" />
              <FooterLink to="/Product" label="Equipment" />
              <FooterLink to="/Contact" label="Get Help" />
            </ul>
          </motion.div>

          {/* 3. Direct Contact */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-green-500">Contact</h3>
            <ul className="space-y-4">
              <ContactItem 
                icon={<MapPin size={18} />} 
                text="Ibadan, Oyo State, Nigeria" 
              />
              <ContactItem 
                icon={<Phone size={18} />} 
                text="0908 651 0324" 
              />
              <ContactItem 
                icon={<Mail size={18} />} 
                text="support@xpressgas.com" 
              />
            </ul>
          </motion.div>

          {/* 4. Newsletter / Mini CTA */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            <div className="bg-green-900/40 p-6 rounded-3xl border border-green-800/50">
              <h3 className="text-lg font-bold mb-2">Need a Refill?</h3>
              <p className="text-green-200/60 text-sm mb-4">Visit us at Olounda,Akobo,Generak Gas,Ibadan.</p>
            
            </div>
          </motion.div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 border-t border-green-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-green-200/40 text-xs font-bold uppercase tracking-widest">
          <p>© {currentYear} Xpress Energy Solutions.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

// Sub-components for 10/10 Scalability
function SocialIcon({ icon, href }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-xl bg-green-900 flex items-center justify-center text-green-300 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-inner"
    >
      {icon}
    </a>
  );
}

function FooterLink({ to, label }) {
  return (
    <li>
      <Link to={to} className="text-green-100/60 hover:text-white transition-all flex items-center group">
        <span className="w-0 group-hover:w-4 h-[2px] bg-green-500 transition-all mr-0 group-hover:mr-2 opacity-0 group-hover:opacity-100" />
        {label}
      </Link>
    </li>
  );
}

function ContactItem({ icon, text }) {
  return (
    <li className="flex items-start gap-3 text-green-100/70 group cursor-default">
      <div className="mt-1 text-green-500 group-hover:scale-125 transition-transform">{icon}</div>
      <span className="text-sm font-medium leading-relaxed">{text}</span>
    </li>
  );
}