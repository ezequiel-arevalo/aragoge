import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialData } from "@/redux/plannings/PlanningsThunks";
import { setFilters, setCurrentPage, setItemsPerPage, updatePaginationInfo } from "@/redux/plannings/PlanningsSlice";
import { selectIsInitialized, selectLoading, selectError, selectFilteredMarketplacePlannings, selectCurrentPage, selectItemsPerPage, selectTotalPages } from "@/redux/plannings/PlanningsSelectors";
import { FilterBar } from "./components/filters/FilterBar.jsx";
import { PlanningList } from "./components/PlanningList/PlanningList";
import { Pagination } from "@/components/Pagination";
import { HeroSection } from "@/components/ui/HeroSection";

export const MarketPage = () => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { items: filteredPlannings, totalItems } = useSelector(
    selectFilteredMarketplacePlannings
  );

  // Selectores para la paginación
  const currentPage = useSelector(selectCurrentPage);
  const itemsPerPage = useSelector(selectItemsPerPage);
  const totalPages = useSelector(selectTotalPages);

  // Cargar los datos iniciales si no está inicializado
  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchInitialData());
    }
  }, [dispatch, isInitialized]);

  // Actualizar información de la paginación cuando cambie el total de elementos
  useEffect(() => {
    dispatch(updatePaginationInfo({ totalItems }));
  }, [dispatch, totalItems]);

  // Aplicar nuevos filtros
  const handleFiltersApply = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  // Manejar la búsqueda
  const handleSearchSubmit = (searchTerm) => {
    dispatch(setFilters({ searchTerm }));
  };

  // Cambiar de página
  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  // Cambiar cantidad de elementos por página
  const handleItemsPerPageChange = (newItemsPerPage) => {
    dispatch(setItemsPerPage(newItemsPerPage));
  };

  return (
    <>
      <section className="mx-auto text-center p-4">
        <HeroSection
          title="Encuentra tu entrenador perfecto"
          description="Descubre los mejores entrenadores para alcanzar tu máximo potencial."
          showInput={true}
          onSearchSubmit={handleSearchSubmit}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Barra de filtros */}
            <aside className="w-full md:w-1/4 bg-transparent">
              <FilterBar onFiltersApply={handleFiltersApply} />
            </aside>
            {/* Lista de planificaciones y paginación */}
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
