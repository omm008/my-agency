import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Layers } from "lucide-react";
import { Link } from "react-router-dom";

// --- THE DEMO DATA ---
const projects = [
  {
    id: 1,
    category: "Lead Generation Website",
    title: "Concept: Luxury Real Estate",
    description:
      "High-converting Next.js landing page featuring instant WhatsApp scheduling and virtual tour integration.",
    tech: ["React", "Tailwind UI", "WhatsApp API"],
    // Placeholder - Replace with screenshot later
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    demoLink: "#",
  },
  {
    id: 2,
    category: "Local SEO & GMB Dominance",
    title: "Concept: Dental Clinic Growth",
    description:
      "A localized site structure optimized for 'near me' searches, integrated with a 5-star GMB review funnel system.",
    tech: ["GMB Optimization", "Local SEO", "Schema Markup"],
    image:
      "https://images.unsplash.com/photo-1606811841689-230391ee2621?q=80&w=2071&auto=format&fit=crop",
    demoLink: "#",
  },
  {
    id: 3,
    category: "E-Commerce Automation",
    title: "Concept: Modern Apparel Brand",
    description:
      "Headless Shopify storefront with automated WhatsApp cart recovery and order tracking notifications.",
    tech: ["Shopify API", "React", "Node.js Automation"],
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    demoLink: "#",
  },
];

const Work = () => {
  return (
    <main className="bg-brand-black pt-32 pb-20 px-4 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
        >
          Our <span className="text-brand-blue">Showroom.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-400 text-xl max-w-2xl mx-auto"
        >
          We don't just talk strategy. We build the assets that execute it.
          Explore our concept proving grounds.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-32 text-center">
        <h2 className="text-3xl font-bold mb-6">Seen enough?</h2>
        <Link to="/contact">
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 mx-auto hover:bg-brand-blue hover:text-white transition-all hover:scale-105">
            Start Your Project <ArrowUpRight />
          </button>
        </Link>
      </div>
    </main>
  );
};

// The Individual Project Card Component
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative h-[500px] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10"
    >
      {/* Fake Browser Top Bar (Visual Polish) */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-950/80 backdrop-blur-md z-20 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
      </div>

      {/* The Project Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy" // <--- ADD THIS
        decoding="async" // <--- ADD THIS
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>

      {/* Content Positioned at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {/* Category Label */}
        <div className="flex items-center gap-2 text-brand-blue mb-3 text-sm font-bold uppercase tracking-wider">
          <Layers size={16} />
          {project.category}
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>

        {/* Description (Hidden on mobile, shown on desktop hover) */}
        <p className="text-neutral-400 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block max-w-md">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* View Demo Button */}
        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-blue pb-1 hover:text-brand-blue transition-colors"
        >
          View Live Demo <ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
};

export default Work;
