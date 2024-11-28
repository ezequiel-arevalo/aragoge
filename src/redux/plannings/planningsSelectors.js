// Select all plannings
export const selectAllPlannings          = (state) => state.plannings.items;

// Select planning detail
export const selectPlanningDetail        = (state) => state.plannings.planningDetail;

// Select categories
export const selectCategories            = (state) => state.plannings.categories;

// Select subscriptions
export const selectPlanningSubscriptions = (state) => state.plannings.subscriptions;

// Select loading states
export const selectPlanningLoading       = (state) => state.plannings.loading;
export const selectSubscriptionsLoading  = (state) => state.plannings.subscriptionsLoading;

// Select error states
export const selectPlanningError         = (state) => state.plannings.error;
export const selectSubscriptionsError    = (state) => state.plannings.subscriptionsError;

// Select initialization states
export const selectIsInitialized         = (state) => state.plannings.isInitialized;
export const selectIsInitializing        = (state) => state.plannings.isInitializing;

// Select filters
export const selectPlanningFilters       = (state) => state.plannings.filters;

// Select filtered plannings
export const selectFilteredPlannings     = (state) => {
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