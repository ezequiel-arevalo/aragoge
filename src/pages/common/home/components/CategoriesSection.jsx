import { motion } from "framer-motion";
import { Dumbbell, Apple, Leaf, Heart, Flame, Brain } from "lucide-react";

// Categories array with name and icon for each category
const categories = [
  { name: "Entrenamiento Personal", icon: Dumbbell },
  { name: "Nutrición",              icon: Apple    },
  { name: "Yoga",                   icon: Leaf     },
  { name: "Fisioterapia",           icon: Heart    },
  { name: "Preparación Física",     icon: Flame    },
  { name: "Meditación",             icon: Brain    },
];

export const CategoriesSection = () => {
  return (
    <section className="py-16">
      {/* Container for section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-h2 font-title font-bold mb-8 text-center">
          Explora nuestras categorías
        </h2>

        {/* Grid of categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Icon container */}
                <div className="bg-primary/10 p-4 rounded-full mb-4 flex justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Category name */}
                <h3 className="text-h3 font-title font-semibold mb-2 text-center">
                  {category.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
