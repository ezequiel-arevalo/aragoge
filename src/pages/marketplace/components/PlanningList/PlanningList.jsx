import { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarketplacePlannings } from '@/redux/plannings/planningsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanningCard } from './PlanningCard';
import Loader from '@/components/Loader';
import ConnectionError from '@/components/ui/ConnectionError'

export const PlanningList = ({ selectedCategory, searchTerm, priceRange }) => {
  const dispatch = useDispatch();
  const { items: plannings, loading, error } = useSelector((state) => state.plannings);

  useEffect(() => {
    dispatch(fetchMarketplacePlannings());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ConnectionError />
    );
  }

  let filteredPlannings = selectedCategory
    ? plannings.filter((planning) => planning.category_id === parseInt(selectedCategory))
    : plannings;

  if (searchTerm) {
    filteredPlannings = filteredPlannings.filter((planning) =>
      planning.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (priceRange.minPrice || priceRange.maxPrice) {
    filteredPlannings = filteredPlannings.filter((planning) => {
      const price = planning.price;
      return (
        (!priceRange.minPrice || price >= priceRange.minPrice) &&
        (!priceRange.maxPrice || price <= priceRange.maxPrice)
      );
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {filteredPlannings.length === 0 ? (
          <motion.p
            className="text-center text-gray-500"
            transition={{ duration: 0.5 }}
          >
            No hay planificaciones que coincidan con los filtros.
          </motion.p>
        ) : (
          filteredPlannings.map((planning) => (
            <motion.div
              key={planning.id}
              layout
              transition={{ duration: 0.5 }}
            >
              <PlanningCard
                id={planning.id}
                title={planning.title}
                description={planning.synopsis}
                price={planning.price}
                category={planning.category_name}
                professional={planning.professional_name}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};