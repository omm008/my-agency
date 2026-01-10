import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Code,
  Globe,
  Zap,
  Loader2, // Added Loader icon
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient"; // <-- Import the connection

const DiscoveryWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedServices: [],
    goal: "",
    name: "",
    email: "",
    website: "",
  });

  // New States for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const services = [
    { id: "web", label: "Web Architecture", icon: <Globe size={24} /> },
    { id: "seo", label: "GMB & SEO", icon: <Code size={24} /> },
    { id: "auto", label: "WhatsApp Automation", icon: <Zap size={24} /> },
  ];

  const goals = [
    "Scale Revenue",
    "Automate Operations",
    "Dominant Online Presence",
    "Fix Broken Systems",
  ];

  const toggleService = (id) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(id);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== id)
          : [...prev.selectedServices, id],
      };
    });
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- THE SUBMISSION LOGIC ---
  const submitApplication = async () => {
    // 1. Validation
    if (!formData.name || !formData.email) {
      setSubmitError("Name and Email are required.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // 2. Send to Supabase
      const { error } = await supabase.from("leads").insert([
        {
          name: formData.name,
          email: formData.email,
          website: formData.website,
          services: formData.selectedServices,
          goal: formData.goal,
          status: "new", // Matches your DB default
        },
      ]);

      if (error) throw error;

      // 3. Success! Move to Final Step
      setStep(4);
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError(
        "Connection failed. Please check your internet and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="flex justify-between mb-8 max-w-xs mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 w-full mx-1 rounded-full transition-colors duration-500 ${
              step >= i ? "bg-brand-blue" : "bg-neutral-800"
            }`}
          />
        ))}
      </div>

      <div className="bg-neutral-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-[500px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {/* STEP 1: SERVICES */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                What do you need help with?
                <br />
                <span className="text-neutral-500 text-xl font-normal">
                  Pick one or more options.
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-4 group ${
                      formData.selectedServices.includes(service.id)
                        ? "border-brand-blue bg-brand-blue/10 text-white"
                        : "border-white/10 bg-black/20 text-neutral-400 hover:border-white/30"
                    }`}
                  >
                    <div
                      className={`${
                        formData.selectedServices.includes(service.id)
                          ? "text-brand-blue"
                          : "text-neutral-500 group-hover:text-white"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <span className="font-bold">{service.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setStep(2)}
                  disabled={formData.selectedServices.length === 0}
                  className="group px-8 py-4   rounded-full  relative flex items-center gap-2 bg-white text-black font-bold overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:gap-4 "
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Confirm Selection <ChevronRight />
                  </span>
                  <div className="absolute inset-0 bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: GOAL */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                What's your main goal? <br />
                <span className="text-neutral-500 text-xl font-normal">
                  What outcome do you want?
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => {
                      setFormData({ ...formData, goal });
                      setStep(3);
                    }}
                    className="p-6 rounded-2xl border border-white/10 bg-black/20 text-neutral-400 hover:border-brand-blue hover:text-white transition-all text-left font-bold"
                  >
                    {goal}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-neutral-500 text-sm hover:text-white mx-auto block"
              >
                Back
              </button>
            </motion.div>
          )}

          {/* STEP 3: DETAILS (THE FORM) */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 max-w-md mx-auto w-full"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
                How can we contact you? <br />
                <span className="text-neutral-500 text-xl font-normal">
                  No spam, just important updates.
                </span>
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInput}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-blue transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Business Email"
                  value={formData.email}
                  onChange={handleInput}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-blue transition-colors"
                />
                <input
                  type="text"
                  name="website"
                  placeholder="Company Website (Optional)"
                  value={formData.website}
                  onChange={handleInput}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              {submitError && (
                <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                  {submitError}
                </div>
              )}

              <div className="flex justify-center pt-4">
                <button
                  onClick={submitApplication}
                  disabled={isSubmitting}
                  className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Transmitting...
                    </>
                  ) : (
                    <>
                      Initialize Protocol <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setStep(2)}
                className="text-neutral-500 text-sm hover:text-white mx-auto block mt-4"
              >
                Back
              </button>
            </motion.div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-24 h-24 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto">
                <Check size={48} className="text-brand-blue" />
              </div>
              <h2 className="text-4xl font-bold text-white">
                Application Received.
              </h2>
              <p className="text-neutral-400 text-lg max-w-lg mx-auto">
                System initialization complete. Our strategists are analyzing
                your digital footprint. Expect a transmission within 24 hours.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="text-brand-blue font-bold mt-8 hover:text-white transition-colors"
              >
                Return to Base
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscoveryWizard;
