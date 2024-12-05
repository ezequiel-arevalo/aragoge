import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialData } from '@/redux/plannings/planningsThunks';
import {
  setFilters,
  setCurrentPage,
  setItemsPerPage,
  updatePaginationInfo
} from '@/redux/plannings/planningsSlice';
import {
  selectIsInitialized,
  selectLoading,
  selectError,
  selectFilteredMarketplacePlannings,
  selectCurrentPage,
  selectItemsPerPage,
  selectTotalPages,
} from '@/redux/plannings/planningsSelectors';
import { FilterBar } from './components/Filters/FilterBar';
import { PlanningList } from './components/PlanningList/PlanningList';
import { Pagination } from '@/components/Pagination';
import { HeroSection } from '@/components/ui/herosection';

export const MarketPage = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { items: filteredPlannings, totalItems } = useSelector(selectFilteredMarketplacePlannings);

  // Pagination selectors
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchInitialData());
    }
  }, [dispatch, isInitialized]);

  useEffect(() => {
    dispatch(updatePaginationInfo({ totalItems }));
  }, [dispatch, totalItems]);

  const handleFiltersApply = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSearchSubmit = (searchTerm) => {
    dispatch(setFilters({ searchTerm }));
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    dispatch(setItemsPerPage(newItemsPerPage));
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
            <aside className="w-full md:w-1/4 bg-transparent">
              <FilterBar onFiltersApply={handleFiltersApply} />
            </aside>
            <main className="w-full md:w-3/4">
              <PlanningList
                plannings={filteredPlannings}
                loading={loading}
                error={error}
              />
              {!loading && !error && filteredPlannings.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  totalItems={totalItems}
                />
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};