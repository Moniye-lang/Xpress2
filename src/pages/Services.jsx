import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Flame, ShieldCheck } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const SERVICES = [
  {
    title: "Commercial Bulk Gas Delivery",
    desc: "Liquified Petroleum Gas delivered throughout South-West Nigeria at competitive industrial rates. We supply restaurants, hotels, factories, and large households across Oyo State.",
    icon: Truck,
    img: "/WhatsApp Image 2026-04-27 at 06.44.01.jpeg",
    alt: "Commercial bulk gas delivery in Oyo State"
  },
  {
    title: "Gas Accessories & Equipment",
    desc: "Durable, safety-certified gas accessories — from regulators and hoses to industrial burners and cookers. Everything you need to use gas safely and efficiently.",
    icon: Flame,
    img: "/WhatsApp Image 2026-04-27 at 06.44.02 (1).jpeg",
    alt: "Gas accessories and equipment sold by Xpress"
  },
  {
    title: "Gas Plant Consultancy",
    desc: "Expert guidance on gas plant construction, logistics, and safety installations. We help businesses set up reliable and compliant gas infrastructure from scratch.",
    icon: ShieldCheck,
    img: "/WhatsApp+Image+2026-04-27+at+06.44.01+(1).jpg",
    alt: "Gas plant consultancy and infrastructure setup"
  },
];

export default function Services() {
  // SEO Optimization
  useEffect(() => {
    document.title = "Bulk Gas in Oyo - Fast & Reliable Tank Delivery | Xpress";
    
    // Check if meta description exists, else create it
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "The #1 provider of Bulk Gas in Oyo. Fast, accessible, and reliable tank gas delivery services for your home and business.";

    window.scrollTo(0, 0);

    return () => {
      // Optional: Cleanup if navigating away, but usually fine to leave it or reset to default
      document.title = "Xpress - Cooking Gas";
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-gray-50 min-h-screen">
      {/* SEO Optimized Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-green-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="/IMG_4548.webp" 
              alt="Xpress bulk gas facility background" 
              className="w-full h-full object-cover"
            />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tight mb-6"
          >
            Best <span className="text-red-600">Bulk Gas in Oyo</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl md:text-2xl text-green-200 max-w-3xl mx-auto font-medium"
          >

            Fast and Reliable bulk gas delivery to your gas plants, skid and companies at any location in Oyo state. We offer Liquidified Petroleum Gas in bulk supply plans that would best suit the growth of your business.
          </motion.p>
        </div>
      </section>

      {/* Main Services List */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Trusted by homes and businesses across Oyo State for quality gas supply and expertise.</p>
            <div className="h-1 w-16 bg-green-700 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article 
                  key={index}
                  variants={fadeUp}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img 
                      src={service.img} 
                      alt={service.alt} 
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white p-3 rounded-2xl shadow-md">
                      <Icon className="w-8 h-8 text-green-700" />
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h2>
                      <p className="text-gray-600 text-lg leading-relaxed">{service.desc}</p>
                    </div>
                    
                    <div className="mt-8">
                      <Link 
                        to="/Contact"
                        aria-label={`Request ${service.title} service`}
                        className="inline-flex items-center text-green-700 font-bold hover:text-red-600 transition-colors group"
                      >
                        Request Service 
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
        </section>

      {/* Gallery Section — remaining images */}
      <section className="py-16 bg-white" aria-label="Photo gallery of Xpress gas operations in Oyo">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">See Our Operations</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">A glimpse into how we deliver bulk gas safely across Oyo State.</p>
            <div className="h-1 w-16 bg-green-700 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <motion.figure variants={fadeUp} className="rounded-3xl overflow-hidden shadow-lg group sm:col-span-2">
              <img
                src="/WhatsApp Image 2026-04-27 at 06.44.02.jpeg"
                alt="Xpress gas delivery team in action, Oyo State"
                loading="lazy"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <figcaption className="sr-only">Xpress bulk gas delivery team, Oyo State</figcaption>
            </motion.figure>

            <motion.figure variants={fadeUp} className="rounded-3xl overflow-hidden shadow-lg group">
              <img
                src="/WhatsApp Image 2026-04-27 at 06.44.01.jpeg"
                alt="Xpress gas storage facility in Oyo"
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <figcaption className="sr-only">Xpress gas storage facility, Oyo State</figcaption>
            </motion.figure>

            <motion.figure variants={fadeUp} className="rounded-3xl overflow-hidden shadow-lg group">
              <img
                src="/WhatsApp+Image+2026-04-27+at+06.44.01+(1).jpg"
                alt="Bulk cooking gas cylinders and accessories at Xpress, Oyo"
                loading="lazy"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <figcaption className="sr-only">Bulk gas cylinders and accessories at Xpress, Oyo State</figcaption>
            </motion.figure>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-900 text-center px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container mx-auto max-w-4xl bg-white rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Need Bulk Gas Delivery Today?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
            Join hundreds of satisfied homes and businesses across Oyo State who trust Xpress for their energy needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/Contact"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg"
            >
              Contact Us Now
            </Link>
            <Link 
              to="/Product"
              className="bg-green-100 hover:bg-green-200 text-green-900 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
            >
              View Accessories
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
