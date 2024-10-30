import { motion } from "framer-motion";

const categories = [
  "Entrenamiento Personal",
  "Nutrición",
  "Yoga",
  "Fisioterapia",
  "Preparación Física",
  "Meditación",
];

export const CategoriesSection = () => {
  return (
    <section className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-h2 font-title font-bold mb-8 text-center">
        Explora Nuestros Servicios
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-h3 font-title font-semibold mb-2 text-center">
              {category}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Encuentra expertos
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};