import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Animation variant
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeInStagger = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: i * 0.15 },
    }),
  };

  return (
    <div className="grid h-auto">
      {/* HERO SECTION */}
      <div className="lg:bg-[url('/IMG_4548.PNG')] bg-[url('/xpressbgmd.PNG')] h-[640px] bg-no-repeat bg-cover bg-center flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-[60px] lg:text-[150px] md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Welcome to
          </motion.h1>

          <div className=" flex flex-col items-center">
            <motion.span
              className="text-[90px] lg:text-[200px] md:text-8xl lg:text-9xl font-extrabold text-red-700 drop-shadow-xl"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Xpress
            </motion.span>
            <motion.span
              className="text-[40px] md:text-5xl lg:text-[80px] lg:ml-[240px] lg:mb-[100px] font-bold text-blue-800 drop-shadow-md mt-2"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Cooking Gas
            </motion.span>
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="bg-gray-50 py-24">
        <motion.h2
          className="text-[#333] lg:text-[70px] text-[45px] font-semibold text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Our Services
        </motion.h2>

        <div className="flex justify-evenly flex-col lg:flex-row items-center gap-y-[50px]">
          {[
            {
              title: "Bulk Supply",
              text: "We deliver quality Liquified Petroleum Gas in bulk at reasonable prices throughout SouthWest Nigeria.",
            },
            {
              title: "Accessories",
              text: 'We sell durable gas accessories at great prices. Browse our "Products" section to see more.',
            },
            {
              title: "Consultancy",
              text: "We offer expert consulting for gas projects, plant construction, logistics, and installation.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid items-center justify-center bg-white border border-gray-300 w-[360px] h-[230px] rounded-[20px] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all p-6 text-center"
            >
              <p className="text-[26px] font-bold mb-3 text-green-800">{service.title}</p>
              <span className="text-[18px] text-gray-700 font-medium">{service.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="relative bg-white py-28">
        <motion.div
          className="text-[#333] lg:text-[70px] text-[40px] font-semibold text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Our Products
        </motion.div>

        <Link
          to="/Product"
          className="absolute right-[5%] bg-green-700 h-[50px] flex items-center justify-center text-[18px] text-white rounded-full font-[500] w-[150px] hover:bg-green-800 transition"
        >
          View All
        </Link>

        <div className="flex flex-col items-center lg:flex-row justify-center gap-10 mt-20">
          {[
            { img: "/Thermocool.JPG", name: "Thermocool", price: "₦36,000" },
            { img: "/3kg.JPG", name: "3kg Gas Cylinder", price: "₦21,000" },
            { img: "/Aluminium Pot Serater.JPG", name: "Aluminium Pot Seater", price: "₦3,500" },
          ].map((p, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeInStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white rounded-2xl w-[360px] shadow-md border border-gray-200 p-8 flex flex-col items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <img
                src={p.img}
                className="h-[280px] w-full object-cover rounded-lg mb-5"
                alt={p.name}
              />
              <div className="text-center">
                <div className="text-[26px] font-bold text-gray-800">{p.name}</div>
                <div className="text-green-700 text-[27px] font-extrabold mt-3">
                  {p.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
