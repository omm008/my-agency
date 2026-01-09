import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import DiscoveryWizard from "../components/layout/DiscoveryWizard";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Start Your Project | WebAutomy Agency</title>
        <meta
          name="description"
          content="Contact WebAutomy to build a high-converting website and grow your business online."
        />
      </Helmet>

      <main className="bg-brand-black min-h-screen pt-32 pb-20">
        {/* Header */}
        <div className="text-center px-4 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Let's <span className="text-brand-blue">Scale.</span>
          </motion.h1>
          <p className="text-neutral-400 text-xl">
            Ready to dominate your market? Fill out the application below.
          </p>
        </div>

        {/* The Wizard (Reused) */}
        <div className="mb-24">
          <DiscoveryWizard />
        </div>

        {/* Direct Contact Info (Alternative Options) */}
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Email */}
          <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl hover:border-brand-blue/50 transition-colors">
            <div className="bg-brand-blue/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-brand-blue" size={24} />
            </div>
            <h3 className="font-bold text-white mb-2">Email Us</h3>
            <p className="text-neutral-400 text-sm">hello@webautomy.com</p>
          </div>

          {/* WhatsApp */}
          <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl hover:border-green-500/50 transition-colors">
            <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="text-green-500" size={24} />
            </div>
            <h3 className="font-bold text-white mb-2">WhatsApp</h3>
            <p className="text-neutral-400 text-sm">Direct Support Line</p>
          </div>

          {/* Location (Optional - adds trust) */}
          <div className="bg-neutral-900/50 border border-white/5 p-8 rounded-2xl hover:border-red-500/50 transition-colors">
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
