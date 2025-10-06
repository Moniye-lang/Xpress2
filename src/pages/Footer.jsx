import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      className="bg-green-900 text-white py-10 mt-20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12">
        
        {/* Brand Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/xpresslogo.jpg"
              alt="Xpress Cooking Gas Logo"
              className="h-[60px] w-[80px] rounded-[50px]"
            />
            <span className="text-3xl font-bold">Xpress</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Your trusted partner in safe, reliable, and affordable cooking gas
            solutions across SouthWest,Nigeria.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-gray-300">
              <Facebook />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Instagram />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Twitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-white pl-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/About" className="hover:text-white transition">About</Link></li>
            <li><Link to="/Product" className="hover:text-white transition">Products</Link></li>
            <li><Link to="/Contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-white pl-3">
            Contact
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Ibadan, Oyo State, Nigeria
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> 09086510324,08161602300,08119998995
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@xpressgas.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold text-white">Xpress</span>. All Rights Reserved.
      </div>
    </motion.footer>
  );
}
