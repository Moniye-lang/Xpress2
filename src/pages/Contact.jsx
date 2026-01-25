import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", honeypot: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', msg: string }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return; // Simple bot trap

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("https://xpress2-1.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", msg: "Message sent! We'll be in touch shortly." });
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        throw new Error(data.msg || "Server rejected the request");
      }
    } catch (err) {
      setStatus({ type: "error", msg: err.message || "Connection failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* 1. LEFT SIDE: CONTACT INFO */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/3 space-y-12"
        >
          <div>
            <h1 className="text-5xl font-black text-green-950 mb-4 tracking-tighter uppercase">Get in <br/><span className="text-green-600">Touch</span></h1>
            <p className="text-slate-600 font-medium text-lg">Have questions about bulk delivery or plant installation? Our team is ready to help.</p>
          </div>

          <div className="space-y-6">
            <ContactMethod icon={<Phone className="text-green-600"/>} title="Phone" detail="+234 (0) 800 XPRESS" />
            <ContactMethod icon={<Mail className="text-green-600"/>} title="Email" detail="info@xpressgas.com.ng" />
            <ContactMethod icon={<MapPin className="text-green-600"/>} title="Location" detail="Ibadan, Oyo State, Nigeria" />
          </div>
        </motion.div>

        {/* 2. RIGHT SIDE: THE FORM CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:w-2/3 bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/5 p-8 md:p-12 relative overflow-hidden"
        >
          {/* Status Overlay */}
          <AnimatePresence>
            {status && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className={`flex items-center gap-3 p-4 rounded-2xl mb-8 ${
                  status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {status.type === 'success' ? <CheckCircle2 size={20}/> : <AlertCircle size={20}/>}
                <span className="font-bold">{status.msg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Honeypot field - Invisible to humans */}
            <input type="text" name="honeypot" className="hidden" value={formData.honeypot} onChange={handleChange} />

            <div className="space-y-2">
              <label className="text-sm font-black uppercase text-slate-500 ml-2">Your Name</label>
              <input required name="name" value={formData.name} onChange={handleChange} className={inputStyle} placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black uppercase text-slate-500 ml-2">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputStyle} placeholder="john@example.com" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-black uppercase text-slate-500 ml-2">Subject</label>
              <input name="subject" value={formData.subject} onChange={handleChange} className={inputStyle} placeholder="Bulk Delivery Inquiry" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-black uppercase text-slate-500 ml-2">Message</label>
              <textarea required name="message" value={formData.message} onChange={handleChange} className={`${inputStyle} h-40 resize-none`} placeholder="How can we help you?" />
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-5 rounded-2xl font-black text-lg transition-all transform active:scale-[0.98] shadow-xl shadow-green-700/20 disabled:bg-slate-300 flex justify-center items-center gap-3"
              >
                {loading ? <Spinner /> : <><Send size={20} /> Send Message</>}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

// Reusable Components for clean JSX
const inputStyle = "w-full bg-slate-50 border-2 border-transparent focus:border-green-600 focus:bg-white p-4 rounded-2xl outline-none transition-all font-medium text-slate-900";

function ContactMethod({ icon, title, detail }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-900">{title}</h4>
        <p className="text-slate-500 font-medium">{detail}</p>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <motion.div 
      animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className="h-6 w-6 border-4 border-white border-t-transparent rounded-full"
    />
  );
}