import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="grid h-auto">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[640px] bg-cover bg-center bg-no-repeat lg:bg-[url('/IMG_4548.PNG')] bg-[url('/xpressbgmd.PNG')]">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div>
            <h1
              className="
                text-white font-extrabold
                text-[48px] sm:text-[64px] lg:text-[120px]
                leading-[0.95]
                opacity-0 translate-y-4
                motion-safe:animate-fadeUp
              "
            >
              Welcome to
            </h1>

            <div className="flex flex-col items-center lg:items-end mt-2">
              <span
                className="
                  text-red-700 font-extrabold
                  text-[90px] md:text-[130px] lg:text-[200px]
                  opacity-0 translate-y-4
                  motion-safe:animate-fadeUp
                  [animation-delay:120ms]
                "
              >
                Xpress
              </span>

              <span
                className="
                  text-blue-800 font-bold
                  text-[55px] md:text-[65px] lg:text-[80px]
                  lg:ml-[240px] lg:mb-[100px]
                  opacity-0 translate-y-4
                  motion-safe:animate-fadeUp
                  [animation-delay:240ms]
                "
              >
                Cooking Gas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="bg-gray-50 py-24">
        <h2
          className="
            text-center font-semibold text-[#333]
            text-[45px] lg:text-[70px]
            mb-16
            opacity-0 translate-y-4
            motion-safe:animate-fadeUp
          "
        >
          Our Services
        </h2>

        <div className="flex flex-col lg:flex-row justify-evenly items-center gap-y-12 px-4">
          {[
            {
              title: "Bulk Supply",
              text: "We deliver Liquified Petroleum Gas in bulk at reasonable prices throughout SouthWest Nigeria.",
            },
            {
              title: "Accessories",
              text: "We sell durable gas accessories at great prices. Browse our Products section to see more.",
            },
            {
              title: "Consultancy",
              text: "We offer expert consulting for gas projects, plant construction, logistics, and installation.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="
                bg-white border border-gray-300
                max-w-[360px] w-full min-h-[230px]
                rounded-2xl p-6 text-center
                shadow-md
                transition-all duration-300
                hover:shadow-xl hover:-translate-y-1
                opacity-0 translate-y-4
                motion-safe:animate-fadeUp
              "
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <p className="text-[26px] font-bold text-green-800 mb-3">
                {service.title}
              </p>
              <p className="text-[18px] text-gray-700 font-medium">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="bg-white py-28">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">

          <div
            className="
              flex flex-col md:flex-row md:items-center md:justify-between gap-6
              opacity-0 translate-y-4
              motion-safe:animate-fadeUp
            "
          >
            <h2 className="text-[#333] font-semibold text-[38px] md:text-[50px] lg:text-[64px]">
              Our Products
            </h2>

            <Link
              to="/Product"
              className="
                bg-green-700 text-white px-6 py-3 rounded-full
                text-[16px] font-medium
                transition
                hover:bg-green-800
                focus-visible:outline focus-visible:outline-2
              "
            >
              View All Products
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { img: "/Thermocool.JPG", name: "Thermocool Gas Cooker" },
              { img: "/3kg.JPG", name: "3kg Gas Cylinder" },
              { img: "/Aluminium Pot Serater.JPG", name: "Aluminium Pot Seater" },
            ].map((p, i) => (
              <div
                key={i}
                className="
                  bg-white border border-gray-200 rounded-2xl
                  shadow-sm overflow-hidden
                  transition-all duration-300
                  hover:shadow-xl
                  opacity-0 translate-y-4
                  motion-safe:animate-fadeUp
                "
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="h-[280px] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-[20px] font-semibold text-gray-800">
                    {p.name}
                  </h3>

                  <Link
                    to="/Product"
                    className="
                      inline-block mt-5 px-5 py-2 rounded-full
                      border border-green-700 text-green-700
                      text-[14px] font-medium
                      transition
                      hover:bg-green-700 hover:text-white
                      focus-visible:outline focus-visible:outline-2
                    "
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
    