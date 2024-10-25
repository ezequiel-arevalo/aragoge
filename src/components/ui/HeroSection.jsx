import { motion } from "framer-motion";
import { SearchBar } from "@/pages/marketplace/components/SearchBar";

export const HeroSection = ({ 
  title = "Potencia tu Rendimiento", 
  description = "Conecta con entrenadores de élite y transforma tu carrera deportiva", 
  showInput = true, 
  onSearchSubmit,
}) => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#da1641] to-[#ff6b6b] opacity-90">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl mb-8">
            {description}
          </p>
          {showInput && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Pasar la función para manejar la búsqueda */}
              <SearchBar onSearchChange={onSearchSubmit} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};