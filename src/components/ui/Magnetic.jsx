import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Calculate distance from center
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Move the element 24% of the distance (The "Magnetic" pull strength)
    setPosition({ x: middleX * 0.24, y: middleY * 0.24 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
