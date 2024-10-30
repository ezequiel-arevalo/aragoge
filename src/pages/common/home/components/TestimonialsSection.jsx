import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-h2 font-title font-bold mb-12 text-center">
            Lo Que Dicen Nuestros Usuarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, index) => (
                <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                <p className="text-gray-600 mb-6 italic">
                    "Aragoge ha transformado mi enfoque del fitness. Encontré
                    un entrenador increíble que me ayuda a alcanzar mis metas de
                    forma personalizada."
                </p>
                <div className="flex items-center">
                    <img
                    src="https://placehold.co/150x150"
                    alt="usuario"
                    className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                    <h3 className="text-h3 font-title font-semibold">Nombre del Usuario</h3>
                    <p className="text-gray-600 text-sm">Atleta Amateur</p>
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>
    </section>
  );
};