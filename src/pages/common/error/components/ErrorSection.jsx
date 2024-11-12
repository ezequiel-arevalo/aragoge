import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Home } from "lucide-react";

export const ErrorSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <AlertCircle className="w-24 h-24 text-[#da1641] mx-auto mb-6" />
        <h1 className="text-h1 font-title font-bold text-gray-900 mb-2">Error de Página</h1>
        <h2 className="text-h2 font-title font-bold text-gray-900 mb-4">404 - Página no encontrada</h2>
        <p className="text-xl text-gray-600 mb-8">Lo sentimos, la página que estás buscando no existe.</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white hover:text-white bg-[#da1641] hover:bg-[#b81235] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#da1641]"
        >
          <Home className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
};