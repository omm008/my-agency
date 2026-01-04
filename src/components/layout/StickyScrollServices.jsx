import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  MapPin,
  MessageCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: 0,
    title: "Web Architecture",
    description:
      "We don't do templates. We engineer custom Next.js systems that load in 0.4s and convert traffic into revenue.",
    icon: <Globe size={32} />,
    stats: "99/100 Speed Score",
    img: new URL("../../assets/service-icons/webdev-obj.png", import.meta.url)
      .href,
  },
  {
    id: 1,
    title: "GMB Dominance",
    description:
      "The 'Map Pack' is the new homepage. We optimize your Google Business profile to rank #1 in your local area.",
    icon: <MapPin size={32} />,
    stats: "#1 Local Ranking",
    img: new URL("../../assets/service-icons/GMB-obj.png", import.meta.url)
      .href,
  },
  {
    id: 2,
    title: "WhatsApp API",
    description:
      "Stop losing leads to slow replies. Our automated bots qualify customers and book appointments 24/7.",
    icon: <MessageCircle size={32} />,
    stats: "Zero Latency",
    img: new URL("../../assets/service-icons/whatsAPI-obj.png", import.meta.url)
      .href,
  },
  {
    id: 3,
    title: "SEO & Organic Growth",
    description:
      "Dominate search engines organically. We build authority through technical structure, content strategy, and high-quality backlinking.",
    icon: <TrendingUp size={32} />,
    stats: "Page 1 Ranking",
    img: new URL("../../assets/service-icons/SEO-obj.png", import.meta.url)
      .href,
  },
];

const StickyScrollServices = () => {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="bg-brand-black relative">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        {/* --- LEFT COLUMN (Sticky Navigation) --- */}
        <div className="hidden md:flex w-1/2 h-screen sticky top-0 flex-col justify-center px-12 z-20">
          <div className="space-y-12">
            <div className="mb-12">
              <h2 className="text-6xl font-bold tracking-tighter mb-4">
                The <span className="text-brand-blue">System.</span>
              </h2>
              <p className="text-neutral-400 text-lg">
                Four pillars of digital control.
              </p>
            </div>

            {/* The List */}
            <div className="space-y-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`cursor-pointer transition-all duration-500 ease-out group ${
                    activeCard === index
                      ? "opacity-100 translate-x-4"
                      : "opacity-30 hover:opacity-60"
                  }`}
                  onClick={() => {
                    document
                      .getElementById(`card-${index}`)
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm font-mono font-bold ${
                        activeCard === index
                          ? "text-brand-blue"
                          : "text-neutral-500"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <h3
                      className={`text-3xl font-bold ${
                        activeCard === index ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Expandable Details on Left Side */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activeCard === index
                        ? "max-h-40 mt-4 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-neutral-400 text-sm max-w-sm pl-10 border-l border-brand-blue/30">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-brand-blue font-bold hover:gap-4 transition-all"
              >
                Build your system <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN (Scrolling Content) --- */}
        <div className="w-full md:w-1/2 px-4 md:px-0 py-20 md:py-0">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              setActiveCard={setActiveCard}
            />
          ))}

          {/* Spacer at bottom to allow last card to scroll fully */}
          <div className="h-[20vh] hidden md:block"></div>
        </div>
      </div>
    </section>
  );
};

// --- Helper Component to detect visibility ---
const ServiceCard = ({ service, index, setActiveCard }) => {
  const ref = useRef(null);
  // Adjusted margin for better mobile detection
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div
      ref={ref}
      id={`card-${index}`}
      className="min-h-[100dvh] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl relative group flex flex-col"
      >
        {/* IMAGE SECTION */}
        <div className="h-[300px] md:h-full min-h-[400px] flex items-center justify-center relative p-6 bg-white">
          <img
            src={service.img}
            loading="lazy"
            decoding="async"
            alt={service.title}
            className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-700"
          />

          {/* Desktop Icon Badge */}
          <div className="hidden md:block absolute top-6 left-6 bg-brand-black/5 p-3 rounded-xl text-brand-black">
            {service.icon}
          </div>

          {/* Mobile Badge */}
          <div className="absolute top-4 left-4 bg-brand-black/5 p-2 rounded-lg text-brand-black md:hidden">
            {service.icon}
          </div>
        </div>

        {/* MOBILE TEXT SECTION (Sits BELOW image on mobile) */}
        <div className="p-8 md:hidden bg-neutral-50 border-t border-gray-100">
          <div className="text-brand-blue font-mono text-xs font-bold mb-2">
            0{index + 1}
          </div>
          <h3 className="text-2xl font-bold text-black mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {service.description}
          </p>

          {/* Mobile Stats */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
              Metric
            </span>
            <span className="font-mono font-bold text-brand-blue text-sm">
              {service.stats}
            </span>
          </div>
        </div>

        {/* DESKTOP STATS OVERLAY (Visible only on Desktop) */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 px-8 py-6 border-t border-gray-100 justify-between items-center bg-white">
          <div className="text-xs text-gray-400 uppercase tracking-widest">
            Performance Metric
          </div>
          <div className="font-mono font-bold text-brand-blue">
            {service.stats}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StickyScrollServices;
