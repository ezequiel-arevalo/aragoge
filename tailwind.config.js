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
        h1: ["2.5rem", { lineHeight: "1.2" }],
        h2: ["2rem", { lineHeight: "1.3" }],
        h3: ["1.75rem", { lineHeight: "1.4" }],
        h4: ["1.5rem", { lineHeight: "1.5" }],
        h5: ["1.25rem", { lineHeight: "1.6" }],
        h6: ["1rem", { lineHeight: "1.6" }],
        p: ["1rem", { lineHeight: "1.7" }],
        span: ["0.875rem", { lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};
