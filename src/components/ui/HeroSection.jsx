import { motion } from "framer-motion";
import { SearchBar } from "@/pages/marketplace/components/filters/SearchBar";

export const HeroSection = ({
  title = "Potencia tu Rendimiento",
  description = "Conecta con entrenadores de élite y transforma tu carrera deportiva",
  showInput = true,
  onSearchSubmit,
}) => {
  return (
    <section className="py-20 mb-10 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-h1 font-title mb-6">
            {title}
          </h1>
          <p className="text-p max-w-3xl mx-auto mb-8">
            {description}
          </p>
          {showInput && (
            <div className="mt-6">
              <SearchBar onSearchChange={onSearchSubmit} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};