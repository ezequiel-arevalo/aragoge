// Selector para obtener todas las planificaciones del estado
export const selectPlannings            = (state) => state.plannings.items;

// Selector para obtener los detalles de una planificación seleccionada
export const selectPlanningDetail       = (state) => state.plannings.planningDetail;

// Selector para obtener las categorías desde el estado
export const selectCategories           = (state) => state.plannings.categories;

// Selector para obtener el estado de carga de las planificaciones
export const selectPlanningsLoading     = (state) => state.plannings.loading;

// Selector para obtener el error asociado a la carga de planificaciones
export const selectPlanningsError       = (state) => state.plannings.error;

// Selector para obtener el estado de carga de las suscripciones
export const selectSubscriptionsLoading = (state) => state.plannings.subscriptionsLoading;

// Selector para obtener el error de las suscripciones
export const selectSubscriptionsError   = (state) => state.plannings.subscriptionsError;

// Selector para obtener las suscripciones de una planificación
export const selectSubscriptions        = (state) => state.plannings.subscriptions;

// Selector para obtener los filtros aplicados (búsqueda, categoría, rango de precio)
export const selectFilters              = (state) => state.plannings.filters;

// Selector para obtener las planificaciones filtradas según los filtros aplicados
export const selectFilteredPlannings    = (state) => {
  let filtered = [...state.plannings.items];
  const { searchTerm, selectedCategory, priceRange } = state.plannings.filters;

  if (selectedCategory) {
    filtered = filtered.filter(
      (planning) => planning.category_id === parseInt(selectedCategory)
    );
  }

  if (searchTerm) {
    filtered = filtered.filter((planning) =>
      planning.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (priceRange.minPrice || priceRange.maxPrice) {
    filtered = filtered.filter((planning) => {
      const price = planning.price;
      return (
        (!priceRange.minPrice || price >= priceRange.minPrice) &&
        (!priceRange.maxPrice || price <= priceRange.maxPrice)
      );
    });
  }

  return filtered;
};