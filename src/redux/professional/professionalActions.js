import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProfessionalProfile,
  updateProfessionalProfile,
  getAllProfesionals,
  getTopSubscribedProfessionals
} from "@/services/professionalService";

/**
 * Acción asíncrona para crear un perfil de profesional.
 * 
 * @param {Object} profileData - Los datos del perfil del profesional a crear.
 * @param {Function} getState - Función para obtener el estado actual de Redux.
 * @param {Function} rejectWithValue - Función para rechazar la promesa con un valor.
 * @returns {Promise<Object>} - Los datos del perfil creado.
 */
export const createProfessionalProfileAction = createAsyncThunk(
  "professional/createProfessionalProfile",
  async (profileData, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await createProfessionalProfile(profileData, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error al crear perfil de profesional"
      );
    }
  }
);

/**
 * Acción asíncrona para actualizar el perfil de un profesional existente.
 * 
 * @param {Object} profileData - Los datos del perfil del profesional a actualizar.
 * @param {Function} getState - Función para obtener el estado actual de Redux.
 * @param {Function} rejectWithValue - Función para rechazar la promesa con un valor.
 * @returns {Promise<Object>} - Los datos del perfil actualizado.
 */
export const updateProfessionalProfileAction = createAsyncThunk(
  "professional/updateProfessionalProfile",
  async (profileData, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await updateProfessionalProfile(profileData, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Error al actualizar perfil de profesional"
      );
    }
  }
);

/**
 * Acción asíncrona para obtener todos los profesionales.
 * 
 * @param {Function} getState - Función para obtener el estado actual de Redux.
 * @param {Function} rejectWithValue - Función para rechazar la promesa con un valor.
 * @returns {Promise<Object[]>} - La lista de profesionales.
 */
export const fetchProfessionalsAction = createAsyncThunk(
  "professional/fetchProfessionals",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await getAllProfesionals(token, "professional");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error al obtener profesionales");
    }
  }
);

/**
 * Acción asíncrona para obtener a los profesionales más suscritos.
 * 
 * @param {number} limit - Límite de profesionales a obtener.
 * @returns {Promise<Object[]>} - La lista de profesionales destacados.
 */
export const fetchTopSubscribedProfessionalsAction = createAsyncThunk(
  "professional/fetchTopSubscribedProfessionals",
  async (limit = 4, { rejectWithValue }) => {
    try {
      const response = await getTopSubscribedProfessionals(limit);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error al obtener profesionales destacados");
    }
  }
);