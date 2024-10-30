import { motion } from "framer-motion";

export const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#da1641] to-[#ff6b6b] text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-h2 font-title font-bold mb-4">
        ¿Listo para Elevar tu Carrera Fitness?
      </h2>
      <p className="text-xl mb-8">
        Únete a nuestra comunidad de profesionales y conecta con atletas de
        todo el mundo
      </p>
      <motion.button
        className="bg-white text-[#da1641] px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Comienza como Entrenador
      </motion.button>
    </div>
  </section>
  );
};