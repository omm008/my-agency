import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Magnetic from "./ui/Magnetic";
import logoImg from "../assets/logo.png";

// --- 1. THE ROLLING TEXT COMPONENT ---
const RollingLink = ({ href, name, isActive }) => {
  return (
    <Link
      to={href}
      className={`relative h-6 overflow-hidden block text-sm font-medium uppercase tracking-widest group ${
        isActive ? "text-brand-blue" : "text-white"
      }`}
    >
      {/* Container that moves up/down */}
      <div className="relative transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {/* The Text You See Initially */}
        <span className="block leading-6 h-6">{name}</span>

        {/* The Duplicate Text (Waiting Below) */}
        <span className="block leading-6 h-6 absolute top-full left-0 text-brand-blue">
          {name}
        </span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Our Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        {/* The Glass Container (Enable pointer events here so buttons work) */}
        <div className="pointer-events-auto bg-brand-dark/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl shadow-2xl">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tighter"
          >
            <img
              src={logoImg}
              alt="Webautomy Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP LINKS (With Rolling Animation) */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <RollingLink
                key={link.name}
                href={link.href}
                name={link.name}
                isActive={isActive(link.href)}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Magnetic>
              <Link to="/contact">
                <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-xs md:text-sm hover:bg-neutral-200 transition-colors">
                  Book Call
                </button>
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-1"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-black/95 backdrop-blur-lg pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-3xl font-bold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`border-b border-white/10 pb-4 ${
                    isActive(link.href) ? "text-brand-blue" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-brand-blue text-white py-4 rounded-xl mt-4 text-lg">
                  Book a Strategy Call
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
