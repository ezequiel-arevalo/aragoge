import { createSelector } from "@reduxjs/toolkit";

// Base selectors
export const selectPlanningsState = (state) => state.plannings;
export const selectMarketplaceItems = (state) => state.plannings.marketplace.items;
export const selectProfessionalItems = (state) => state.plannings.professional.items;
export const selectProfessionalPlanningsById = (state, id) => state.plannings.professional.byId[id] || [];
export const selectPlanningFilters = (state) => state.plannings.marketplace.filters;
export const selectCategories = (state) => state.plannings.categories;
export const selectPlanningDetail = (state) => state.plannings.planningDetail;
export const selectSubscriptions = (state) => state.plannings.subscriptions;
export const selectLoading = (state) => state.plannings.loading;
export const selectError = (state) => state.plannings.error;
export const selectIsInitialized = (state) => state.plannings.isInitialized;
export const selectIsInitializing = (state) => state.plannings.isInitializing;

// Memoized selector para planificaciones filtradas del marketplace
export const selectFilteredMarketplacePlannings = createSelector(
  [selectMarketplaceItems, selectPlanningFilters],
  (plannings, filters) => {
    const { searchTerm, selectedCategory, priceRange } = filters;
    let filtered = [...plannings];

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
  }
);