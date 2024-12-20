import { motion } from "framer-motion";

export const PlanningDescription = ({ description }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12 mx-auto max-w-[600px]"
    >
      <h2 className="text-h2 font-title font-bold text-gray-900 mb-4">
        Descripción detallada
      </h2>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </motion.section>
  );
};
