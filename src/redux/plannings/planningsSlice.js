import { createSlice } from "@reduxjs/toolkit";
import {
  fetchInitialData,
  fetchProfessionalPlannings,
  fetchProfessionalPlanningsByID,
  fetchPlanning,
  createPlanning,
  updatePlanning,
  deletePlanning,
  fetchPlanningSubscriptions,
} from "./planningsThunks";

const initialState = {
  marketplace: {
    items: [],
    filters: {
      searchTerm: "",
      selectedCategory: null,
      priceRange: { minPrice: "", maxPrice: "" },
    },
  },
  professional: {
    items: [],
    byId: {},
  },
  categories: [],
  planningDetail: null,
  subscriptions: [],
  loading: false,
  error: null,
  subscriptionsLoading: false,
  subscriptionsError: null,
  isInitialized: false,
  isInitializing: false,
};

const planningsSlice = createSlice({
  name: "plannings",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.marketplace.filters = {
        ...state.marketplace.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.marketplace.filters = initialState.marketplace.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Initial Data
      .addCase(fetchInitialData.pending, (state) => {
        state.isInitializing = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialData.fulfilled, (state, action) => {
        state.loading = false;
        state.marketplace.items = action.payload.plannings;
        state.categories = action.payload.categories;
        state.isInitialized = true;
        state.isInitializing = false;
      })
      .addCase(fetchInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isInitializing = false;
      })

      // Professional Plannings
      .addCase(fetchProfessionalPlannings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfessionalPlannings.fulfilled, (state, action) => {
        state.loading = false;
        state.professional.items = action.payload;
      })
      .addCase(fetchProfessionalPlannings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Professional Plannings By ID
      .addCase(fetchProfessionalPlanningsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfessionalPlanningsByID.fulfilled, (state, action) => {
        state.loading = false;
        state.professional.byId[action.meta.arg] = action.payload; // Guardar por ID
      })
      .addCase(fetchProfessionalPlanningsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Single Planning
      .addCase(fetchPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.planningDetail = action.payload;
      })
      .addCase(fetchPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Planning
      .addCase(createPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlanning.fulfilled, (state, action) => {
        state.loading = false;
    
        if (Array.isArray(state.professional.items)) {
            state.professional.items.push(action.payload);
        } else {
            state.professional.items = [action.payload];
        }
    
        state.marketplace.items.push(action.payload);
      })
      .addCase(createPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Planning
      .addCase(updatePlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlanning.fulfilled, (state, action) => {
        state.loading = false;
        // Actualizar en planificaciones profesionales
        const profIndex = state.professional.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (profIndex !== -1) {
          state.professional.items[profIndex] = action.payload;
        }
        
        // Actualizar en marketplace
        const marketIndex = state.marketplace.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (marketIndex !== -1) {
          state.marketplace.items[marketIndex] = action.payload;
        }
        
        // Actualizar detalle si es necesario
        if (state.planningDetail?.id === action.payload.id) {
          state.planningDetail = action.payload;
        }
      })
      .addCase(updatePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Planning
      .addCase(deletePlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.professional.items = state.professional.items.filter(
          (item) => item.id !== action.payload
        );
        state.marketplace.items = state.marketplace.items.filter(
          (item) => item.id !== action.payload
        );
        if (state.planningDetail?.id === action.payload) {
          state.planningDetail = null;
        }
      })
      .addCase(deletePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Subscriptions
      .addCase(fetchPlanningSubscriptions.pending, (state) => {
        state.subscriptionsLoading = true;
        state.subscriptionsError = null;
      })
      .addCase(fetchPlanningSubscriptions.fulfilled, (state, action) => {
        state.subscriptionsLoading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchPlanningSubscriptions.rejected, (state, action) => {
        state.subscriptionsLoading = false;
        state.subscriptionsError = action.payload;
      });
  },
});

export const { setFilters, resetFilters } = planningsSlice.actions;
export default planningsSlice.reducer;