import React from "react";
import useReveal from '../useReveal';
import { useEffect } from "react";
import { Link } from "react-router-dom";



export default function About() {
  useReveal();
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  const testimonials = [
    {
      name: "Bamidele Adejumo",
      text:
        "Xpress Cooking Gas is a very credible and reliable company — excellent customer service and consistent delivery. Good job team.",
    },
    {
      name: "Ade Adeniyi",
      text:
        "A one-stop gas station with all accessories you’ll ever need. Excellent service anytime.",
    },
    {
      name: "Ahmed Sarafa",
      text: "Best and most affordable place for gas refills in the area.",
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <header
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg,#f8faf8,transparent)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
          <div data-reveal className="w-full lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              About <span className="text-green-700">Xpress</span> Cooking Gas
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Established in 2016 and based in Ibadan, Oyo State, Xpress Cooking Gas
              is dedicated to delivering safe and reliable Liquefied Petroleum Gas
              solutions for households and businesses. We combine quality products,
              timely logistics and best-in-class customer support.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services"
                className="inline-block px-6 py-3 bg-green-700 text-white rounded-full shadow hover:shadow-lg transition"
              >
                Our Services
              </a>
              <a
                href="#contact"
                className="inline-block px-6 py-3 border border-green-200 text-green-800 rounded-full hover:bg-green-50 transition"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            style={{ perspective: 1000 }}
          >
            <div className="bg-white shadow-xl rounded-2xl p-4 transform transition-all">
              <img
                src="/CXRH8720.JPG"
                alt="Xpress Cooking Gas"
                className="w-[340px] h-[300px] object-cover rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-reveal className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900">
              What we do — reliable LPG supply & more
            </h2>
            <p className="text-gray-600">
              We cater to households, retail sellers and commercial clients. From
              safe cylinder refills to large bulk deliveries across the SouthWest,
              we offer logistics, consultancy and accessories to match every need.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <li className="flex items-start gap-4 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex-none w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center font-semibold">
                  1
                </div>
                <div>
                  <div className="font-semibold text-gray-800">LPG Supply & Distribution</div>
                  <div className="text-gray-500 text-sm">Gas with safe handling and fast delivery.</div>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex-none w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center font-semibold">
                  2
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Cylinder Refilling</div>
                  <div className="text-gray-500 text-sm">Trusted refill procedures and safety checks.</div>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex-none w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center font-semibold">
                  3
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Bulk Delivery</div>
                  <div className="text-gray-500 text-sm">Competitive rates for retailers and institutions.</div>
                </div>
              </li>
              <li className="flex items-start gap-4 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                <div className="flex-none w-10 h-10 rounded-full bg-green-50 text-green-700 grid place-items-center font-semibold">
                  4
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Accessories & Consultancy</div>
                  <div className="text-gray-500 text-sm">Regulators, connectors and installation planning.</div>
                </div>
              </li>
            </ul>
          </div>

          <div data-reveal className="grid grid-cols-1 gap-6">
            <div className="bg-gradient-to-tr from-white to-green-50 border border-gray-400 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Why choose Xpress</h3>
              <p className="text-gray-600 mt-3">
                Safety-first processes, reliable logistics, and a customer-focused approach make us a top choice for both household and bulk customers.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">8+</div>
                  <div className="text-sm text-gray-500">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">5k+</div>
                  <div className="text-sm text-gray-500">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">Bulk</div>
                  <div className="text-sm text-gray-500">Supply</div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-400 rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900">Service Areas</h4>
              <p className="text-gray-600 mt-2">We currently deliver across the SouthWest region with plans to expand.</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Ibadan</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Lagos</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Abeokuta</span>
                <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">Oyo State</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h3 data-reveal className="text-3xl font-semibold text-center text-gray-900 mb-8">What customers say</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <article
                key={i}
                data-reveal
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-500 transform transition hover:shadow-lg"
              >
                <p className="text-gray-700 mb-4">“{t.text}”</p>
                <div className="text-sm font-semibold text-green-700">{t.name}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div data-reveal className="bg-green-700 text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold">Ready to order or partner?</h4>
            <p className="mt-2 text-green-100">Contact our sales team for bulk pricing or book a cylinder refill.</p>
          </div>

          <div className="flex gap-4">
            <Link to="/contact" className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold shadow">Contact Sales</Link>
            <Link to="/product" className="border border-white/30 px-6 py-3 rounded-full text-white">View Products</Link>
          </div>
        </div>
      </section>

      {/* Inline CSS for reveal transitions (Tailwind + small custom classes) */}
      <style>{`
        [data-reveal] {
          transform: translateY(16px);
          opacity: 0;
          transition: opacity 620ms cubic-bezier(.2,.9,.2,1), transform 620ms cubic-bezier(.2,.9,.2,1);
          will-change: transform, opacity;
        }
        [data-reveal].is-revealed {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
