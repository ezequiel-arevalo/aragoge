import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const ConnectionError = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-6 bg-red-100 border border-red-300 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-lg font-semibold text-red-700 mb-2">
        No se pudo conectar con el servidor.
      </h2>
      <p className="text-sm text-gray-700 text-center">
        Verifica la conexión de red e intenta nuevamente.
      </p>
    </motion.div>
  );
};

export default ConnectionError;
