import { motion } from "framer-motion";
import { Search, Calendar, Dumbbell } from "lucide-react";

export const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-h2 font-title font-bold mb-12 text-center">
          Cómo Funciona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Busca",
              description: "Explora perfiles de entrenadores calificados",
              icon: <Search size={48} />,
            },
            {
              title: "Conecta",
              description: "Agenda sesiones con tu entrenador ideal",
              icon: <Calendar size={48} />,
            },
            {
              title: "Entrena",
              description: "Alcanza tus metas con orientación experta",
              icon: <Dumbbell size={48} />,
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-[#da1641] mb-4 flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-h3 font-title font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-p text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};