import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Message sent ✅");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed ❌ " + data.msg);
      }
    } catch (err) {
      alert("An error occurred ❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Title */}
      <motion.h1
        className="text-[50px] md:text-[70px] text-green-900 font-bold text-center mb-8"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        Contact Us
      </motion.h1>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl w-[90%] max-w-[700px] rounded-3xl p-6 flex flex-col gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {/* Name & Email */}
        <motion.div
          className="flex flex-col md:flex-row gap-4"
          variants={fadeInUp}
          custom={0.2}
        >
          <div className="flex-1 flex flex-col gap-2">
            <label className="font-medium text-gray-800">Name</label>
            <input
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
            <label className="font-medium text-gray-800">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </motion.div>

        {/* Subject */}
        <motion.div
          className="flex flex-col gap-2"
          variants={fadeInUp}
          custom={0.3}
        >
          <label className="font-medium text-gray-800">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Write a subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
          />
        </motion.div>

        {/* Message */}
        <motion.div
          className="flex flex-col gap-2"
          variants={fadeInUp}
          custom={0.4}
        >
          <label className="font-medium text-gray-800">Message</label>
          <textarea
            name="message"
            placeholder="Write your message"
            value={formData.message}
            onChange={handleChange}
            className={inputClasses + " h-36 resize-none"}
            required
          />
        </motion.div>

        {/* Button */}
        <motion.button
          type="submit"
          disabled={loading}
          variants={fadeInUp}
          custom={0.5}
          className={`w-full mt-4 p-3 rounded-3xl font-medium text-white transition ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-900 hover:bg-green-800"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </motion.button>
      </motion.form>
    </div>
  );
}
