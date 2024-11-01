import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPlanningsByUserId,
  fetchMarketplacePlannings as fetchMarketplacePlanningsService,
  fetchPlanningById,
  createPlanning as createPlanningService,
  updatePlanning as updatePlanningService,
  deletePlanning as deletePlanningService,
} from "@/services/planningsService";
import { fetchCategories as fetchCategoriesService } from "@/services/adminService";

export const fetchMarketplacePlannings = createAsyncThunk(
  "plannings/fetchMarketplacePlannings",
  async (searchTerm = "") => {
    try {
      const data = await fetchMarketplacePlanningsService(searchTerm);
      return data;
    } catch (error) {
      throw new Error(
        error.message || "Error al cargar las planificaciones del marketplace"
      );
    }
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
  async (id) => {
    try {
      const data = await fetchPlanningById(id);
      return data;
    } catch (error) {
      throw new Error(error.message || "Error al cargar la planificación");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    try {
      const data = await fetchCategoriesService();
      return data;
    } catch (error) {
      throw new Error(error.message || "Error al cargar las categorías");
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
      return response;
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
    console.info("updatePlanning action called with:", { id, planningData });
    try {
      const token = getState().user.accessToken;
      if (!token) {
        console.error("No se encontró el token de autenticación");
        throw new Error("No se encontró el token de autenticación");
      }
      console.info("Calling updatePlanningService with:", {
        id,
        planningData,
        token,
      });
      const response = await updatePlanningService(id, planningData, token);
      console.info("updatePlanningService response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in updatePlanning:", error);
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

const planningsSlice = createSlice({
  name: "plannings",
  initialState: {
    items: [],
    planningDetail: null,
    suggestedPlannings: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Marketplace plannings
      .addCase(fetchMarketplacePlannings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarketplacePlannings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(fetchMarketplacePlannings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Professional plannings
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
      // Single planning
      .addCase(fetchPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.planningDetail = action.payload.data;
      })
      .addCase(fetchPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create planning
      .addCase(createPlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload.data);
      })
      .addCase(createPlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update planning
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
        state.planningDetail = action.payload;
      })
      .addCase(updatePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete planning
      .addCase(deletePlanning.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlanning.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deletePlanning.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default planningsSlice.reducer;
