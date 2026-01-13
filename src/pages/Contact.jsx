import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import DiscoveryWizard from "../components/layout/DiscoveryWizard";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  // 1. Define the WhatsApp Logic here too
  const phoneNumber = import.meta.env.VITE_WTSP_PHONE; // Replace with real number
  const message =
    "Hii WebAutomy !! Can i get a free quotation of your services";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      <Helmet>
        <title>Start Your Project | WebAutomy Agency</title>
        <meta
          name="description"
          content="Contact WebAutomy to build a high-converting website and grow your business online."
        />
        <link rel="canonical" href="https://webautomy.com/contact" />
      </Helmet>

      <main className="bg-brand-black min-h-screen pt-32 pb-20">
        <div className="text-center px-4 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Start Your <span className="text-brand-blue">Free</span>{" "}
            Consultation
          </motion.h1>
          <p className="text-neutral-400 text-xl">
            Answer a few quick questions and we'll handle the rest.
          </p>
        </div>

        <div className="mb-24">
          <DiscoveryWizard />
        </div>

        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Email */}
          <a href="mailto:contact@webautomy.com" className="block group">
            <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl group-hover:border-brand-blue/50 transition-colors h-full">
              <div className="bg-brand-blue/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail className="text-brand-blue" size={24} />
              </div>
              <h3 className="font-bold text-white mb-2">Email Us</h3>
              <p className="text-neutral-400 text-sm">contact@webautomy.com</p>
            </div>
          </a>

          {/* WhatsApp - NOW CLICKABLE */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl group-hover:border-green-500/50 transition-colors h-full cursor-pointer">
              <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="text-green-500" size={24} />
              </div>
              <h3 className="font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-neutral-400 text-sm">Direct Support Line</p>
            </div>
          </a>

          {/* Location */}
          <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl hover:border-red-500/50 transition-colors h-full">
            <div className="bg-red-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-red-500" size={24} />
            </div>
            <h3 className="font-bold text-white mb-2">HQ</h3>
            <p className="text-neutral-400 text-sm">Global Remote Team</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
