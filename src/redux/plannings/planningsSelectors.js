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

// Pagination selectors
export const selectPagination = (state) => state.plannings.marketplace.pagination;
export const selectCurrentPage = (state) => state.plannings.marketplace.pagination.currentPage;
export const selectItemsPerPage = (state) => state.plannings.marketplace.pagination.itemsPerPage;
export const selectTotalPages = (state) => state.plannings.marketplace.pagination.totalPages;
export const selectTotalItems = (state) => state.plannings.marketplace.pagination.totalItems;

// Memoized selector para planificaciones filtradas y paginadas del marketplace
export const selectFilteredMarketplacePlannings = createSelector(
  [selectMarketplaceItems, selectPlanningFilters, selectPagination],
  (plannings, filters, pagination) => {
    const { searchTerm, selectedCategory, priceRange } = filters;
    const { currentPage, itemsPerPage } = pagination;
    
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

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      items: filtered.slice(startIndex, endIndex),
      totalItems: filtered.length
    };
  }
);