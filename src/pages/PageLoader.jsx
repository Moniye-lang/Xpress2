import { motion } from "framer-motion";

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center h-[60vh] w-full">
    {/* High-performance pulse ring */}
    <motion.div
      className="w-16 h-16 border-4 border-green-700 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
      className="mt-4 text-green-800 font-medium tracking-widest"
    >
      OPTIMIZING XPRESS GAS...
    </motion.p>
  </div>
);

export default PageLoader;