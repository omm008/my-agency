import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Zap, BarChart } from "lucide-react";

const Hero = ({ isLoaded }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-brand-black pt-20"
      aria-label="WebAutomy Hero Section"
    >
      {/* ===== SEO / AI CONTEXT (ACCESSIBILITY-FIRST, SAFE) ===== */}
      <h1 className="sr-only">
        WebAutomy - Web Design, SEO & Automation Agency Helping Businesses Rank
        #1
      </h1>

      <p className="sr-only">
        WebAutomy provides high-performance websites, Google Maps SEO, and
        WhatsApp automation services to help businesses generate leads and
        dominate search results.
      </p>

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(
            500px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(163, 72, 90, 0.25),
            transparent 80%
          )`,
        }}
      />

      {/* --- CONTENT --- */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-[#F5DAA7] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-800" />
          </span>
          Accepting New Projects for 2026
        </motion.div>

        {/* Visual H1 (Design stays intact) */}
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block"
          >
            Stop <span className="text-brand-redDark">Competing.</span>
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500"
          >
            Start <span className="text-[#5D8736]">Monopolizing</span>
          </motion.span>
        </h2>

        {/* SEO-enriched subtext (still clean) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10"
        >
          A performance-driven web design, SEO, and automation agency
          engineering the gap between where you are and{" "}
          <span className="text-white font-medium">#1 on Google</span>. No
          fluff. Just code, systems, and conversion.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact">
            <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Apply for Access <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </Link>

          <Link to="/work">
            <button className="px-8 py-4 text-white border border-white/10 rounded-full hover:bg-white/5 transition-colors">
              View Case Studies
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Icons */}
      <FloatingIcon
        icon={<Code size={30} />}
        top="20%"
        left="10%"
        delay={0}
        isLoaded={isLoaded}
      />
      <FloatingIcon
        icon={<Zap size={30} />}
        top="60%"
        right="10%"
        delay={2}
        isLoaded={isLoaded}
      />
      <FloatingIcon
        icon={<BarChart size={30} />}
        bottom="20%"
        left="15%"
        delay={4}
        isLoaded={isLoaded}
      />
    </section>
  );
};

const FloatingIcon = ({ icon, top, left, right, bottom, delay, isLoaded }) => (
  <motion.div
    className="absolute text-brand-blue hidden md:block z-20"
    style={{ top, left, right, bottom }}
    initial={{ opacity: 0, y: 20 }}
    animate={isLoaded ? { y: [0, -30, 0], opacity: [0.3, 1, 0.3] } : {}}
    transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    {icon}
  </motion.div>
);

export default Hero;
