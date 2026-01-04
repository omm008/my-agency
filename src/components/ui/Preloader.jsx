import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This timer increments the counter
    const interval = setInterval(() => {
      setCount((prev) => {
        // If we reached 100, stop the interval and trigger the completion
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 200); // Small pause at 100% before sliding
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Speed of the counter (lower = faster)

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      // The Exit Animation (Slide Up)
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Custom "Heavy" Ease
      className="fixed inset-0 z-[100] flex items-end justify-end bg-brand-black px-8 py-8 md:px-16 md:py-16"
    >
      {/* The Counter Number */}
      <div className="flex flex-col items-end overflow-hidden">
        <motion.h1
          className="text-6xl md:text-9xl font-bold text-white tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count}%
        </motion.h1>
        <div className="flex items-center gap-2 mt-2">
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
