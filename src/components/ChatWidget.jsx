import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  X, 
  Send, 
  User, 
  Flame, 
  ShieldCheck, 
  Truck,
  Phone,
  ShoppingCart,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Xpress Cooking Gas. I'm XpressBot. How can I help you with your gas needs today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate XpressBot response
    setTimeout(() => {
      const botResponse = getXpressResponse(text);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const getXpressResponse = (input) => {
    const text = input.toLowerCase();
    
    // Pleasantries
    if (text.match(/^(hi|hello|hey|greetings|morning|afternoon|evening)/)) {
      return "Hello! XpressBot here. Ready to fuel your kitchen! How can I assist you today?";
    }
    if (text.includes("how are you")) {
      return "I'm fired up and ready to go! How are you doing today?";
    }
    if (text.includes("thank") || text.includes("thanks")) {
      return "You're welcome! Safety and speed are our priorities. Let me know if you need anything else!";
    }

    // Xpress Business Logic
    if (text.includes("delivery") || text.includes("order") || text.includes("refill")) {
      return "Xpress specializes in bulk LPG delivery for industries, restaurants, and hotels! We no longer offer single home cylinder delivery, but we provide reliable bulk supply across Ibadan. Call us at 08119998995 for bulk quotes.";
    }
    if (text.includes("price") || text.includes("cost") || text.includes("how much")) {
      return "Our prices are competitive and reflect the current market rates. For 3kg, 6kg, 12.5kg, or bulk supply, please call us for the latest quote!";
    }
    if (text.includes("bulk") || text.includes("industrial") || text.includes("restaurant") || text.includes("hotel")) {
      return "Bulk supply is our specialty! We offer scheduled deliveries, safety-certified installations, and consistent supply for businesses. Call 08119998995 to discuss your industrial needs.";
    }
    if (text.includes("safety") || text.includes("leak") || text.includes("smell")) {
      return "Safety First! If you smell gas: 1. Do not use matches/lighters. 2. Open all windows. 3. Turn off the cylinder valve. 4. Move the cylinder outdoors if possible. Contact our safety team at 08119998995.";
    }
    if (text.includes("accessory") || text.includes("cylinder") || text.includes("hose") || text.includes("regulator")) {
      return "We stock high-quality, safety-certified cylinders and accessories. Check our Products page to see our latest stock of Thermocool cookers and more.";
    }
    if (text.includes("location") || text.includes("where")) {
      return "Our main facility is in Ibadan, serving all of Oyo State with professional bulk logistics.";
    }

    return "I'm here to help with your cooking gas needs! You can ask about delivery, prices, safety tips, or our range of accessories. What's on your mind?";
  };

  const quickActions = [
    { label: "Bulk Delivery", icon: <Truck size={14} /> },
    { label: "Check Prices", icon: <ShoppingCart size={14} /> },
    { label: "Safety Tips", icon: <ShieldCheck size={14} /> },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-red-700 p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <Flame size={24} className="text-red-700" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl leading-tight uppercase tracking-tighter">XpressBot</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-90">Fast & Secure</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 scroll-smooth">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "bot" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      msg.sender === "bot" ? "bg-red-700 text-white" : "bg-green-800 text-white"
                    }`}>
                      {msg.sender === "bot" ? <Flame size={14} /> : <User size={14} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm font-bold leading-relaxed shadow-sm ${
                      msg.sender === "bot" 
                        ? "bg-white text-gray-800 rounded-tl-none border border-gray-100" 
                        : "bg-green-800 text-white rounded-tr-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-red-700/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-red-700/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-red-700/40 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Controls */}
            <div className="p-4 bg-white border-t border-gray-100 space-y-4">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleSend(action.label)}
                    className="whitespace-nowrap px-4 py-2 bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-200 rounded-xl text-xs font-black text-gray-700 hover:text-red-700 transition-all flex items-center gap-2"
                  >
                    {action.icon} {action.label}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask XpressBot..."
                  className="w-full bg-gray-50 border-2 border-gray-100 pl-4 pr-12 py-4 rounded-2xl focus:bg-white focus:border-red-700 focus:outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300 text-sm"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-red-700 text-white rounded-xl flex items-center justify-center hover:bg-red-800 disabled:opacity-50 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-red-700 text-white rounded-[1.5rem] shadow-[0_15px_35px_rgba(185,28,28,0.4)] flex items-center justify-center relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={28} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 rounded-full border-2 border-red-700 flex items-center justify-center">
                <Flame size={10} className="text-white fill-white" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <div className="absolute right-20 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-xs font-black rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Need Gas? Ask XpressBot <ChevronRight size={12} className="inline ml-1" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
