import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures paths are relative to root
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Hides your code structure from prying eyes
  },
});
