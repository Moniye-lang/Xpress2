import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // success/error message

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Input change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setStatus("");

      try {
        const res = await fetch("https://xpress2-1.onrender.com/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("Message sent ✅");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          setStatus("Failed ❌: " + data.msg);
        }
      } catch (err) {
        setStatus("An error occurred ❌: " + err.message);
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  // Animation variant
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.7, ease: "easeOut" },
    }),
  };

  const inputClasses =
    "border border-gray-400 w-full p-3 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-700 transition";

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-20">
      {/* Title */}
      <motion.h1
        className="text-[50px] md:text-[70px] text-green-900 font-bold text-center mb-6 md:mb-10"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        Contact Us
      </motion.h1>

      {/* Feedback Message */}
      {status && (
        <motion.div
          className={`mb-6 px-6 py-3 rounded-xl text-center font-medium ${
            status.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {status}
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl w-[90%] max-w-[700px] rounded-3xl p-6 flex flex-col gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <fieldset className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="name" className="font-medium text-gray-800">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-gray-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </fieldset>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label htmlFor="subject" className="font-medium text-gray-800">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Write a subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-medium text-gray-800">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message"
            value={formData.message}
            onChange={handleChange}
            className={`${inputClasses} h-36 resize-none`}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 p-3 rounded-3xl font-medium text-white transition flex justify-center items-center gap-2 ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-900 hover:bg-green-800"
          }`}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              Sending...
            </>
          ) : (
            "Send"
          )}
        </button>
      </motion.form>
    </main>
  );
}
