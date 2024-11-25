import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',  // Divide el código en archivos más pequeños, incluyendo dependencias comunes
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar consolas para producción
      },
    },
  },
  base: "/aragoge/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
