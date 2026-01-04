import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/ui/Preloader";
import CustomCursor from "./components/ui/CustomCursor";

// Pages
import Home from "./pages/Home";
import Work from "./pages/Work";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  // ... inside the App function, add this useEffect:
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // The weight of the scroll (1.2s to stop)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing curve
      smoothWheel: true,
    });

    // The Scroll Loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white flex flex-col">
      <CustomCursor /> {/* <--- Add this */}
      {/* 1. Global Preloader (Runs once on first load) */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {/* 2. Global Navbar */}
      <Navbar />
      {/* 3. Page Content (Switches based on URL) */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home isLoaded={!isLoading} />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add /contact here later */}
        </Routes>
      </div>
      {/* 4. Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
