import React, { useState, useEffect, lazy, Suspense } from "react"; // 1. Import lazy & Suspense
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/ui/Preloader";
import CustomCursor from "./components/ui/CustomCursor";
import WhatsAppBtn from "./components/ui/WhatsAppBtn";

// 2. LAZY LOAD PAGES
// Instead of import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  const isBot =
    typeof navigator !== "undefined" &&
    /bot|crawl|spider|google|bing|yandex|duckduckgo|gpt/i.test(
      navigator.userAgent
    );

  const [isLoading, setIsLoading] = useState(!isBot);
  const location = useLocation();

  useEffect(() => {
    if (isBot) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [isBot]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white flex flex-col">
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />

      <div className="flex-grow">
        {/* 3. Wrap Routes in Suspense. 
            The fallback=null means "show nothing while the next page loads".
            Since your pages load fast, this is usually invisible. */}
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home isLoaded={!isLoading} />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <WhatsAppBtn />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}

export default App;
