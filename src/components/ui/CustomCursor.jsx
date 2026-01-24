import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const isBot =
    typeof navigator !== "undefined" &&
    /bot|crawl|spider|google|bing|gpt/i.test(navigator.userAgent);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.tagName === "INPUT" || // Input fields ke liye bhi hover effect
        e.target.tagName === "TEXTAREA"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* 1. The Main Dot */}
      {!isBot && (
        <motion.div
          // 👇 CHANGE 1: 'mix-blend-difference' hata diya
          // 👇 CHANGE 2: 'bg-brand-blue' ki jagah ek solid bright color (Cyan/White) ya 'bg-[#00a884]' (WhatsApp Green) try kar sakte ho dashboard ke liye
          className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
          transition={{ type: "tween", ease: "backOut", duration: 0 }}
        />
      )}

      {/* 2. The Trailing Ring */}
      {!isBot && (
        <motion.div
          // 👇 CHANGE 3: Ring ka z-index same rakha, bas border color bright kar diya
          className="fixed top-0 left-0 border border-cyan-400/50 rounded-full pointer-events-none z-[9998] hidden md:block"
          animate={{
            x: mousePosition.x - (isHovering ? 24 : 16),
            y: mousePosition.y - (isHovering ? 24 : 16),
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: isHovering ? 1 : 0.5,
            backgroundColor: isHovering
              ? "rgba(34, 211, 238, 0.1)" // Hover par light blue tint
              : "transparent",
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
