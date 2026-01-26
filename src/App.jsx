import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Navbar from "./components/Navbar";
import Footer from "./components/layout/Footer";
import Preloader from "./components/ui/Preloader";
import CustomCursor from "./components/ui/CustomCursor";
import WhatsAppBtn from "./components/ui/WhatsAppBtn";

// LAZY LOAD PAGES
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Simulator = lazy(() => import("./pages/Simulator"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  // 1. Domain Check (Initialize once)
  const [isAppDomain] = useState(() => {
    return window.location.hostname.startsWith("app.");
  });

  // 2. Admin Loader Component
  const DashboardLoader = () => (
    <div className="flex h-screen items-center justify-center bg-[#111b21] text-[#00a884]">
      <div className="animate-pulse font-bold tracking-widest">WEBAUTOMY</div>
    </div>
  );

  // 3. 🛑 EARLY RETURN: Agar 'app.' domain hai, toh YAHIN se return ho jao.
  // Isse Navbar, Footer, Cursor, Preloader kuch bhi load nahi hoga dashboard par.
  if (isAppDomain) {
    return (
      <>
        <CustomCursor /> {/* ✅ Added Here */}
        <ToastContainer position="top-right" autoClose={3000} />{" "}
        <Suspense fallback={<DashboardLoader />}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  // ---------------------------------------------------------------
  // 🌍 MAIN WEBSITE LOGIC (Ye code tabhi chalega jab domain 'app.' NAHI hai)
  // ---------------------------------------------------------------

  const isBot =
    typeof navigator !== "undefined" &&
    /bot|crawl|spider|google|bing|yandex|duckduckgo|gpt/i.test(
      navigator.userAgent,
    );

  const [isLoading, setIsLoading] = useState(!isBot);
  const location = useLocation();

  // Lenis Scroll
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

  // Scroll to Top on Route Change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-blue selection:text-white flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Navbar sirf Main Website par dikhega */}
      <Navbar />

      <div className="flex-grow">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home isLoaded={!isLoading} />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <WhatsAppBtn />
      {/* Footer sirf Main Website par dikhega */}
      <Footer />
    </div>
  );
}

export default App;
