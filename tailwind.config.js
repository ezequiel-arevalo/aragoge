/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DA1641",
        secondary: "#C30D35",
        "text-primary": "#131211",
        "text-disable": "#A6A6A6",
        "text-hover": "#595959",
        "bg-primary": "#F2F2F2",
        "bg-secondary": "#FFFFFF",
      },
      fontFamily: {
        "font-title": ["Roboto", "sans-serif"], // Fuente para títulos
        "font-text": ["Cardo", "serif"], // Fuente para texto principal
      },
      fontSize: {
        h1: ["2rem", { lineHeight: "1.2", fontWeight: "700" }], // Reducido de 2rem
        h2: ["1.75rem", { lineHeight: "1.3", fontWeight: "700" }], // Reducido de 1.75rem
        h3: ["1rem", { lineHeight: "1.4", fontWeight: "600" }], // Reducido de 1rem
        h4: ["1rem", { lineHeight: "1.5", fontWeight: "600" }], // Reducido de 1rem
        h5: ["1rem", { lineHeight: "1.6", fontWeight: "500" }], // Reducido de 1rem
        h6: ["0.875rem", { lineHeight: "1.6", fontWeight: "500" }], // Reducido de 1rem
        p: ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }], // Reducido de 1rem
        span: ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }], // Reducido de 0.875rem
      },
    },
  },
  plugins: [],
};
