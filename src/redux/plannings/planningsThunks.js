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
import { createAsyncThunk } from '@reduxjs/toolkit';

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
      return rejectWithValue(error.message || "Error al cargar los datos iniciales");
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
      return rejectWithValue(error.message || "Error al cargar las planificaciones");
    }
  }
);

export const fetchProfessionalPlanningsByID = createAsyncThunk(
  "plannings/fetchProfessionalPlanningsByID",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) {
        throw new Error("ID de profesional no proporcionado");
      }
      const response = await getPlanningsByUserId(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Error al cargar las planificaciones");
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
      return rejectWithValue(error.message || "Error al cargar la planificación");
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
      return rejectWithValue(error.message || "Error al crear la planificación");
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
      return rejectWithValue(error.message || "Error al actualizar la planificación");
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
      return rejectWithValue(error.message || "Error al eliminar la planificación");
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
      return rejectWithValue(error.message || "Error al cargar las suscripciones");
    }
  }
);