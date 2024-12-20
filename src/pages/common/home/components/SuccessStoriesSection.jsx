import { motion } from "framer-motion";

export const SuccessStoriesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-title font-bold mb-12 text-center">
          Historias de exito
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src="https://placehold.co/600x400"
                alt="Historias de Exito"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-h3 font-title font-bold text-xl mb-2">
                  De principiante a campeón
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  "Gracias a mi entrenador en Aragoge, logré pasar de nunca
                  haber corrido a completar mi primera maratón en menos de un
                  año."
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#da1641] font-semibold">Leer más</span>
                  <div className="flex items-center">
                    <span className="text-gray-600">Maratón completada</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
