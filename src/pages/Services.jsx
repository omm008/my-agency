import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Globe,
  MapPin,
  MessageCircle,
  Zap,
  Search,
  Rocket,
  ArrowRight,
  LayoutTemplate,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <main className="bg-brand-black min-h-screen pt-32 pb-20 overflow-x-hidden">
      {/* --- HEADER --- */}
      <div className="px-4 max-w-7xl mx-auto mb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-brand-blue font-mono text-sm mb-6"
        >
          /// SYSTEM ARCHITECTURE
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
        >
          Engineering <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
            Digital Dominance.
          </span>
        </motion.h1>
      </div>

      {/* --- EXHIBIT 1: WEB ARCHITECTURE --- */}
      <section className="px-4 max-w-7xl mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Globe className="text-brand-blue" />
              <span>Performance Architecture</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Most agencies sell you a template. We build a Ferrari. <br />
              Using <b>Next.js</b> and <b>React</b>, we engineer sites that load
              in under 1 second, keeping Google happy and your customers
              engaged.
            </p>
            <ul className="space-y-3 mb-8">
              <ListItem text="99/100 Google PageSpeed Score" />
              <ListItem text="SEO-First Code Structure" />
              <ListItem text="Fluid Animations (GSAP/Framer)" />
            </ul>
          </div>

          {/* Creative Visual: The "Speed Score" Card */}
          <div className="order-1 md:order-2 relative">
            <div className="absolute inset-0 bg-brand-blue/20 blur-[100px] rounded-full"></div>
            <motion.div
              initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
              whileInView={{ rotateX: 0, rotateY: 0, opacity: 1 }}
              viewport={{ margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl z-10"
            >
              {/* Fake Browser Header */}
              <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              {/* The "Lighthouse" Score Circle */}
              <div className="flex justify-center items-center py-8">
                <div className="w-40 h-40 rounded-full border-8 border-neutral-800 flex items-center justify-center relative">
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#2563eb"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="440"
                      strokeDashoffset="40"
                      className="opacity-20"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#2563eb"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="440"
                      strokeDashoffset="440"
                      whileInView={{ strokeDashoffset: 20 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="text-center">
                    <motion.span
                      className="text-5xl font-bold text-white block"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                    >
                      98
                    </motion.span>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">
                      Performance
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <MetricBox label="FCP" value="0.4s" color="text-green-400" />
                <MetricBox label="LCP" value="0.8s" color="text-green-400" />
                <MetricBox label="CLS" value="0.00" color="text-green-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- EXHIBIT 2: GMB RADAR --- */}
      <section className="px-4 max-w-7xl mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Creative Visual: The Radar Map */}
          <div className="relative h-[400px] bg-neutral-900 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center group">
            {/* Map Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

            {/* Radar Pulse Animation */}
            <div className="absolute w-full h-full flex items-center justify-center">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-red-500/30 rounded-full"
                  initial={{ width: 0, height: 0, opacity: 1 }}
                  animate={{ width: 400, height: 400, opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                />
              ))}
            </div>

            {/* Center Pin */}
            <div className="relative z-10 flex flex-col items-center">
              <MapPin
                size={48}
                className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              />
              <div className="mt-2 bg-neutral-900/80 backdrop-blur border border-white/20 px-3 py-1 rounded text-xs font-mono">
                YOU ARE HERE (#1)
              </div>
            </div>

            {/* Competitor Pins (Small gray dots) */}
            <div className="absolute top-20 left-20 w-3 h-3 bg-neutral-700 rounded-full opacity-50"></div>
            <div className="absolute bottom-10 right-32 w-3 h-3 bg-neutral-700 rounded-full opacity-50"></div>
          </div>

          {/* Text Side */}
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Search className="text-red-500" />
              <span>GMB & Local Radar</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Being "online" isn't enough. You need to be <b>visible</b>. <br />
              We optimize your Google My Business profile with geo-targeted
              keywords, review funnels, and citation building to make you the #1
              result in your city.
            </p>
            <ul className="space-y-3 mb-8">
              <ListItem text="Keyword-Dominant Descriptions" />
              <ListItem text="Review Automation Systems" />
              <ListItem text="Geo-Grid Rank Tracking" />
            </ul>
          </div>
        </div>
      </section>

      {/* --- EXHIBIT 3: WHATSAPP AUTOMATION --- */}
      <section className="px-4 max-w-7xl mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Side */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <MessageCircle className="text-green-500" />
              <span>WhatsApp API Systems</span>
            </h2>
            <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
              Stop losing leads to slow replies. <br />
              We build intelligent automated flows that greet customers, answer
              FAQs, and even book appointments directly inside WhatsApp.
            </p>
            <ul className="space-y-3 mb-8">
              <ListItem text="Instant 24/7 Auto-Replies" />
              <ListItem text="Broadcast Marketing Campaigns" />
              <ListItem text="Interactive Menu Buttons" />
            </ul>
          </div>

          {/* Creative Visual: Chat Simulation */}
          <div className="order-1 md:order-2">
            <div className="bg-white text-black rounded-3xl overflow-hidden shadow-2xl max-w-sm mx-auto border-4 border-neutral-800 relative">
              {/* Phone Header */}
              <div className="bg-[#075E54] p-4 flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Rocket size={16} />
                </div>
                <div>
                  <div className="font-bold text-sm">Webautomy Bot</div>
                  <div className="text-[10px] opacity-80">Online</div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="bg-[#E5DDD5] h-[300px] p-4 flex flex-col gap-3 overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')]"></div>

                {/* Message 1 (Bot) */}
                <ChatBubble
                  text="👋 Hi! Welcome to Webautomy. How can I help?"
                  isBot={true}
                  delay={0.5}
                />

                {/* Message 2 (User) */}
                <ChatBubble
                  text="I need a website."
                  isBot={false}
                  delay={1.5}
                />

                {/* Message 3 (Bot) */}
                <ChatBubble
                  text="Great! Our websites load in 0.4s. Would you like a quote?"
                  isBot={true}
                  delay={3}
                />

                {/* Message 4 (User - Action) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.5 }}
                  className="self-center bg-white text-[#075E54] px-4 py-2 rounded-full text-xs font-bold shadow-sm mt-2 uppercase tracking-wide cursor-pointer hover:bg-gray-50"
                >
                  YES, GET QUOTE
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <div className="text-center px-4">
        <h3 className="text-3xl font-bold mb-6">Which system do you need?</h3>
        <Link to="/contact">
          <button className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-all hover:scale-105">
            Book a Strategy Call
          </button>
        </Link>
      </div>
    </main>
  );
};

// --- SUB COMPONENTS ---

const ListItem = ({ text }) => (
  <li className="flex items-center gap-3 text-neutral-300">
    <div className="bg-brand-blue/20 p-1 rounded-full">
      <Check size={14} className="text-brand-blue" />
    </div>
    {text}
  </li>
);

const MetricBox = ({ label, value, color }) => (
  <div className="bg-black/20 rounded-lg p-2">
    <div className="text-xs text-neutral-500 mb-1">{label}</div>
    <div className={`font-mono font-bold ${color}`}>{value}</div>
  </div>
);

const ChatBubble = ({ text, isBot, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: isBot ? -20 : 20, scale: 0.9 }}
    whileInView={{ opacity: 1, x: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className={`max-w-[80%] px-4 py-2 rounded-lg text-sm shadow-sm relative z-10 ${
      isBot
        ? "bg-white text-black self-start rounded-tl-none"
        : "bg-[#dcf8c6] text-black self-end rounded-tr-none"
    }`}
  >
    {text}
    <div className="text-[10px] text-gray-400 text-right mt-1">10:42 AM</div>
  </motion.div>
);

export default Services;
