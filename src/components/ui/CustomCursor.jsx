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

    // Check if hovering over clickable elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest("a") ||
        e.target.closest("button")
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
      {/* 1. The Main Dot (Instant movement) */}
      {!isBot && (
        <motion.div
          className="fixed top-0 left-0 w-3 h-3 bg-brand-blue rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
          animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
          transition={{ type: "tween", ease: "backOut", duration: 0 }}
        />
      )}

      {/* 2. The Trailing Ring (Smooth lag) */}
      {!isBot && (
        <motion.div
          className="fixed top-0 left-0 border border-brand-blue rounded-full pointer-events-none z-[9998] hidden md:block"
          animate={{
            x: mousePosition.x - (isHovering ? 24 : 16),
            y: mousePosition.y - (isHovering ? 24 : 16),
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            opacity: isHovering ? 1 : 0.5,
            backgroundColor: isHovering
              ? "rgba(217, 4, 41, 0.1)"
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
