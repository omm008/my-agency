import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Increase the warning limit (optional, to hide the noise)
    chunkSizeWarningLimit: 1000,

    // 2. The Real Fix: Manual Chunking
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and Router into a separate "vendor" chunk
          vendor: ["react", "react-dom", "react-router-dom"],
          // Framer Motion is heavy, give it its own chunk
          framer: ["framer-motion"],
          // Split icons if they are large
          icons: ["lucide-react"],
        },
      },
    },
  },
});
