import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  const quotes = [
    "Great design is invisible.",
    "Simplicity is the ultimate sophistication.",
    "Design is not just what it looks like — it's how it works.",
    "Good design is good business.",
    "The best way to predict the future is to create it.",
    "Innovation distinguishes between a leader and a follower.",
    "Design creates culture. Culture shapes values. Values determine the future.",
    "Every great design begins with an even better story."
  ];

  // Select a random quote on component mount
  const [randomQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="
        fixed inset-0 z-[100]
        flex flex-col items-center justify-center
        bg-brand-black
        px-8 py-8 md:px-16 md:py-16
        pointer-events-none
      "
    >
      {/* Quote Section */}
      <div className="flex-1 flex items-center justify-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-relaxed tracking-wide">
            "{randomQuote}"
          </h2>
        </motion.div>
      </div>

      {/* Loading Section */}
      <div className="flex flex-col items-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count}%
        </motion.h1>

        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-neutral-500 font-mono text-sm uppercase">
            System Initializing
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
