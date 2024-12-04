import { motion, AnimatePresence } from 'framer-motion';
import PlanningCard from '@/components/ui/PlanningCard';
import Loader from '@/components/Loader';
import ConnectionError from '@/components/ui/ConnectionError';

export const PlanningList = ({ plannings, loading, error }) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ConnectionError />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {plannings.length === 0 ? (
          <motion.p
            className="text-center text-gray-500 col-span-full"
            transition={{ duration: 0.5 }}
          >
            No hay planificaciones que coincidan con los filtros.
          </motion.p>
        ) : (
          plannings.map((planning) => (
            <motion.div
              key={planning.id}
              layout
              transition={{ duration: 0.5 }}
            >
              <PlanningCard planning={planning} />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};