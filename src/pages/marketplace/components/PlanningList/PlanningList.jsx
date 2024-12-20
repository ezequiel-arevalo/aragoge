import { motion } from "framer-motion";
import PlanningCard from "@/components/ui/PlanningCard";
import Loader from "@/components/Loader";
import ConnectionError from "@/components/ui/ConnectionError";

export const PlanningList = ({ plannings, loading, error }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ConnectionError />;
  }

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50, // Alterna entre movimiento desde la izquierda y derecha
      y: -30, // Movimiento inicial hacia arriba
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plannings.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full" role="status">
          No hay planificaciones que coincidan con los filtros.
        </p>
      ) : (
        plannings.map((planning, index) => (
          <motion.div
            key={planning.id}
            className="relative"
            custom={index} // Pasar el índice al variante para la animación
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <PlanningCard planning={planning} />
          </motion.div>
        ))
      )}
    </div>
  );
};
