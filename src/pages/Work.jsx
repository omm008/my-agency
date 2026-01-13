import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// --- UPDATED PROJECT DATA ---
const projects = [
  {
    id: 1,
    category: "Food & Beverage E-Commerce",
    title: "Onni Pizza",
    description:
      "A crave-inducing single-page application optimized for high-volume ordering. Features include real-time cart state management, dynamic menu filtering, and a seamless mobile-first user experience designed to convert hungry visitors.",
    tech: ["React", "State Management", "Responsive UI", "Tailwind CSS"],
    // Pizza/Food themed image
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    demoLink: "https://omm008.github.io/onni-pizza/",
  },
  {
    id: 2,
    category: "Fashion Retail Platform",
    title: "Looking Good Gator",
    description:
      "A modern digital storefront for apparel, focusing on brand identity and user retention. Implements a responsive grid layout, intuitive product categorization, and smooth navigation transitions to showcase the collection effectively.",
    tech: ["React", "SPA Architecture", "CSS Modules", "Product Filtering"],
    // Fashion/Streetwear themed image
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    demoLink: "https://omm008.github.io/looking-good-gator/",
  },
  {
    id: 3,
    category: "Cafe & Restaurant Website",
    title: "Home Cafe",
    description:
      "A crave-inducing single-page application optimized for high-volume ordering. Features include real-time cart state management, dynamic menu filtering, and a seamless mobile-first user experience designed to convert hungry visitors.",
    tech: ["React", "State Management", "Mobile View", "Tailwind CSS"],
    // Pizza/Food themed image
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80&auto=format&fit=crop",
    demoLink: "https://home-cafe-demo.netlify.app/",
  },
  {
    id: 3,
    category: "Bread and Cake Bakery",
    title: "Muffin Man",
    description:
      "A crave-inducing single-page application optimized for high-volume ordering. Features include real-time cart state management, dynamic menu filtering, and a seamless mobile-first user experience designed to convert hungry visitors.",
    tech: ["React", "State Management", "Mobile View", "Custom CSS"],
    // Pizza/Food themed image
    image: "https://thumbs.dreamstime.com/b/italian-bakery-28379528.jpg",
    demoLink: "https://muffin-man-demo.netlify.app/",
  },
];

const Work = () => {
  return (
    <>
      <Helmet>
        <title>Our Work - WebAutomy Case Studies</title>
        <meta
          name="description"
          content="See how WebAutomy has helped businesses grow with real results and performance-driven websites."
        />
        <link rel="canonical" href="https://webautomy.com/work" />
      </Helmet>

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
    </>
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
      className="group relative h-[500px] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 hover:shadow-md hover:shadow-white/20 "
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
        loading="lazy"
        decoding="async"
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
