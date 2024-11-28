import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPlanningsByUserId,
  fetchMarketplacePlannings,
  fetchPlanningById,
  createPlanning as createPlanningService,
  updatePlanning as updatePlanningService,
  deletePlanning as deletePlanningService,
  fetchSubscriptionsByPlanningId,
} from "@/services/planningsService";
import { fetchCategories } from "@/services/categoryService";

/**
 * Acción asíncrona que obtiene los datos iniciales de las planificaciones y categorías.
 * 
 * @function
 * @param {undefined} _ - No se requiere parámetro de entrada.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object>} Objeto con los datos de las planificaciones y las categorías.
 * @throws {string} Error si la solicitud falla.
 */
export const fetchInitialData = createAsyncThunk(
  "plannings/fetchInitialData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const [planningsResponse, categoriesResponse] = await Promise.all([
        fetchMarketplacePlannings(),
        fetchCategories(),
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

/**
 * Acción asíncrona que obtiene las planificaciones profesionales de un usuario.
 * 
 * @function
 * @param {undefined} _ - No se requiere parámetro de entrada.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object[]>} Lista de planificaciones del profesional.
 * @throws {string} Error si la solicitud falla.
 */
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

/**
 * Acción asíncrona que obtiene una planificación específica por su ID.
 * 
 * @function
 * @param {string} id - El ID de la planificación que se desea obtener.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object>} Datos de la planificación obtenida.
 * @throws {string} Error si la solicitud falla.
 */
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

/**
 * Acción asíncrona que crea una nueva planificación.
 * 
 * @function
 * @param {object} planningData - Los datos necesarios para crear la planificación.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object>} Datos de la planificación creada.
 * @throws {string} Error si la solicitud falla.
 */
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

/**
 * Acción asíncrona que actualiza una planificación existente.
 * 
 * @function
 * @param {object} param0 - Los datos necesarios para actualizar la planificación.
 * @param {string} param0.id - El ID de la planificación que se desea actualizar.
 * @param {object} param0.planningData - Los nuevos datos de la planificación.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object>} Datos de la planificación actualizada.
 * @throws {string} Error si la solicitud falla.
 */
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

/**
 * Acción asíncrona que elimina una planificación.
 * 
 * @function
 * @param {string} id - El ID de la planificación que se desea eliminar.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<string>} ID de la planificación eliminada.
 * @throws {string} Error si la solicitud falla.
 */
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

/**
 * Acción asíncrona que obtiene las suscripciones asociadas a una planificación.
 * 
 * @function
 * @param {string} planningId - El ID de la planificación para obtener las suscripciones.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object[]>} Lista de suscripciones asociadas a la planificación.
 * @throws {string} Error si la solicitud falla.
 */
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