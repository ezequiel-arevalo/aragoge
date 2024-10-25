import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMarketplacePlannings, fetchCategories } from '@/redux/plannings/planningsSlice';
import { FilterBar } from './components/Filters/FilterBar';
import { PlanningList } from './components/PlanningList/PlanningList';
import { HeroSection } from '@/components/ui/herosection';

export const MarketPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    selectedCategory: null,
    priceRange: { minPrice: '', maxPrice: '' }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMarketplacePlannings());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFiltersApply = ({ searchTerm, selectedCategory, priceRange }) => {
    setFilters({ searchTerm, selectedCategory, priceRange });
  };

  const handleSearchSubmit = (searchTerm) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm
    }));
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
              <PlanningList
                selectedCategory={filters.selectedCategory}
                searchTerm={filters.searchTerm}
                priceRange={filters.priceRange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};