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
            className=" text-[48px] sm:text-[64px] lg:text-[120px] leading-[0.95] max-w-[1200px] mx-auto font-extrabold text-white drop-shadow-lg"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Welcome to
          </motion.h1>

          <div className="flex flex-col items-center lg:items-end">
            <motion.span
              className="text-[90px] lg:text-[200px] md:text-8xl lg:text-9xl font-extrabold text-red-700 drop-shadow-xl"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Xpress
            </motion.span>
            <motion.span
             className="
            text-[55px] md:text-5xl lg:text-[80px]
            font-bold text-blue-800 drop-shadow-md mt-2
            "
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
              text: "We deliver Liquified Petroleum Gas in bulk at reasonable prices throughout SouthWest Nigeria.",
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
              className="grid items-center justify-center bg-white border border-gray-300 max-w-[360px] w-full min-h-[230px] rounded-[20px] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all p-6 text-center"
            >
              <p className="text-[26px] font-bold mb-3 text-green-800">{service.title}</p>
              <span className="text-[18px] text-gray-700 font-medium">{service.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION */}
<section className="bg-white py-28">
  <div className="max-w-[1280px] mx-auto px-4 md:px-6">

    {/* Header */}
    <motion.div
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <h2 className="text-[#333] text-[38px] md:text-[50px] lg:text-[64px] font-semibold">
        Our Products
      </h2>

      <Link
        to="/Product"
        className="self-start md:self-auto bg-green-700 text-white px-6 py-3 rounded-full text-[16px] font-medium hover:bg-green-800 transition"
      >
        View All Products
      </Link>
    </motion.div>

    {/* Product Grid */}
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        { img: "/Thermocool.JPG", name: "Thermocool Gas Cooker", price: "₦36,000" },
        { img: "/3kg.JPG", name: "3kg Gas Cylinder", price: "₦21,000" },
        { img: "/Aluminium Pot Serater.JPG", name: "Aluminium Pot Seater", price: "₦3,500" },
      ].map((p, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={fadeInStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all overflow-hidden"
        >
          {/* Image */}
          <div className="h-[280px] overflow-hidden">
            <img
              src={p.img}
              alt={p.name}
              className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-6 text-center">
            <h3 className="text-[20px] font-semibold text-gray-800">
              {p.name}
            </h3>


            <Link
              to="/Product"
              className="inline-block mt-5 px-5 py-2 rounded-full border border-green-700 text-green-700 text-[14px] font-medium hover:bg-green-700 hover:text-white transition"
            >
              View Details
            </Link>
          </div>
        </motion.div>
      ))}
    </div>

  </div>
</section>

    </div>
  );
}
