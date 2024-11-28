import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialData } from '@/redux/plannings/planningsActions';
import { setFilters } from '@/redux/plannings/planningsSlice';
import { selectIsInitialized, selectPlanningLoading, selectPlanningError } from '@/redux/plannings/planningsSelectors';
import { FilterBar } from './components/Filters/FilterBar';
import { PlanningList } from './components/PlanningList/PlanningList';
import { HeroSection } from '@/components/ui/herosection';

export const MarketPage = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const loading = useSelector(selectPlanningLoading);
  const error = useSelector(selectPlanningError);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchInitialData());
    }
  }, [dispatch, isInitialized]);

  const handleFiltersApply = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSearchSubmit = (searchTerm) => {
    dispatch(setFilters({ searchTerm }));
  };

  return (
    <>
      <HeroSection
        title="Encuentra tu entrenador perfecto"
        description="Descubre los mejores entrenadores para alcanzar tu máximo potencial"
        showInput={true}
        onSearchSubmit={handleSearchSubmit}
      />
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4">
              <FilterBar onFiltersApply={handleFiltersApply} />
            </div>
            <div className="w-full md:w-3/4">
              <PlanningList loading={loading} error={error} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};