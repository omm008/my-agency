/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505", // Even darker for higher contrast with Red
          dark: "#121212", // Standard Dark Gray
          gray: "#2A2A2A", // Borders

          // THE PIVOT: We map 'blue' to your Red so we don't break existing code.
          // This is a Deep, "Netflix-style" Red. Not neon.
          blue: "#D90429",

          // If you need a darker shade for hover states
          redDark: "#8D0808",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
