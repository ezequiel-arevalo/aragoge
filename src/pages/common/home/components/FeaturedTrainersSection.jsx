import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  "Entrenamiento Personal",
  "Nutrición",
  "Yoga",
  "Fisioterapia",
  "Preparación Física",
  "Meditación",
];

export const FeaturedTrainersSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-title font-bold mb-8 text-center">
          Profesionales Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src="https://placehold.co/600x400"
                alt="Entrenador Destacado"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-h3 font-title font-bold text-xl mb-2">
                  Nombre del Entrenador
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Especialidad: {categories[index % categories.length]}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to="/perfil"
                    className="w-full text-center bg-[#da1641] text-white px-4 py-2 rounded-full hover:bg-[#c30d35] transition duration-300"
                  >
                    Ver Perfil
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/entrenadores"
            className="inline-flex items-center text-[#da1641] font-semibold hover:underline"
          >
            Ver todos los entrenadores
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};