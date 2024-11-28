import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPlanningsByUserId,
  fetchMarketplacePlannings as fetchMarketplacePlanningsService,
  fetchPlanningById,
  createPlanning as createPlanningService,
  updatePlanning as updatePlanningService,
  deletePlanning as deletePlanningService,
  fetchSubscriptionsByPlanningId,
} from "@/services/planningsService";
import { fetchCategories as fetchCategoriesService } from "@/services/categoryService";

const initialState = {
  items: [],
  planningDetail: null,
  categories: [],
  subscriptions: [],
  filters: {
    searchTerm: "",
    selectedCategory: null,
    priceRange: { minPrice: "", maxPrice: "" },
  },
  loading: false,
  error: null,
  subscriptionsLoading: false,
  subscriptionsError: null,
  isInitialized: false,
  isInitializing: false,
};

export const selectFilteredPlannings = (state) => {
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

export const fetchInitialData = createAsyncThunk(
  "plannings/fetchInitialData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const [planningsResponse, categoriesResponse] = await Promise.all([
        fetchMarketplacePlanningsService(),
        fetchCategoriesService(),
      ]);
      return {
        plannings: planningsResponse.data,
        categories: categoriesResponse.data,
      };
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cargar los datos iniciales"
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const { plannings } = getState();
      return !plannings.isInitialized && !plannings.isInitializing;
    },
  }
);

export const fetchProfessionalPlannings = createAsyncThunk(
  "plannings/fetchProfessionalPlannings",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user, accessToken } = getState().user;
      if (!user || !accessToken) {
        throw new Error("Usuario no autenticado");
      }
      const response = await getPlanningsByUserId(user.id, accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cargar las planificaciones"
      );
    }
  }
);

export const fetchPlanning = createAsyncThunk(
  "plannings/fetchPlanning",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchPlanningById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cargar la planificación"
      );
    }
  }
);

export const createPlanning = createAsyncThunk(
  "plannings/createPlanning",
  async (planningData, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.accessToken;
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }
      const response = await createPlanningService(planningData, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al crear la planificación"
      );
    }
  }
);

export const updatePlanning = createAsyncThunk(
  "plannings/updatePlanning",
  async ({ id, planningData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.accessToken;
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }
      const response = await updatePlanningService(id, planningData, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al actualizar la planificación"
      );
    }
  }
);

export const deletePlanning = createAsyncThunk(
  "plannings/deletePlanning",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.accessToken;
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }
      await deletePlanningService(id, token);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al eliminar la planificación"
      );
    }
  }
);

export const fetchPlanningSubscriptions = createAsyncThunk(
  "plannings/fetchPlanningSubscriptions",
  async (planningId, { getState, rejectWithValue }) => {
    try {
      const token = getState().user.accessToken;
      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }
      const response = await fetchSubscriptionsByPlanningId(planningId, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Error al cargar las suscripciones"
      );
    }
  }
);

const planningsSlice = createSlice({
  name: "plannings",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    getFilteredPlannings: (state) => {
      let filtered = [...state.items];

      const { searchTerm, selectedCategory, priceRange } = state.filters;

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
        state.items = action.payload.plannings;
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
        state.items = action.payload;
      })
      .addCase(fetchProfessionalPlannings.rejected, (state, action) => {
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
        state.items.push(action.payload);
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
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
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
        state.items = state.items.filter((item) => item.id !== action.payload);
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

export const { setFilters, getFilteredPlannings } = planningsSlice.actions;
export default planningsSlice.reducer;