import { motion } from "framer-motion";
import { CreditCard, Calendar, MessageSquare, Dumbbell, Star, User } from "lucide-react";

export const PlatformFeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-h2 font-title font-bold mb-12 text-center">
        Características de Aragoge
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Pagos Seguros", description: "Realiza transacciones de forma segura y fácil", icon: <CreditCard size={32} /> },
          { title: "Planificación", description: "Organiza tu agenda y sesiones de entrenamiento", icon: <Calendar size={32} /> },
          { title: "Chat en Tiempo Real", description: "Comunícate directamente con tus entrenadores o clientes", icon: <MessageSquare size={32} /> },
          { title: "Categorías Especializadas", description: "Encuentra servicios adaptados a tus necesidades", icon: <Dumbbell size={32} /> },
          { title: "Favoritos", description: "Guarda tus entrenadores y servicios preferidos", icon: <Star size={32} /> },
          { title: "Perfiles Públicos", description: "Muestra tus logros y experiencia al mundo", icon: <User size={32} /> }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="text-[#da1641] mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-h3 font-title font-semibold mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};