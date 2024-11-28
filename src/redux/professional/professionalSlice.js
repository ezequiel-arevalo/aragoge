import { createSlice } from "@reduxjs/toolkit";
import {
  createProfessionalProfileAction,
  updateProfessionalProfileAction,
  fetchProfessionalsAction,
} from "./professionalActions";

/**
 * Estado inicial del slice de profesionales.
 * 
 * @typedef {Object} ProfessionalState
 * @property {boolean} loading - Indica si hay una operación en curso.
 * @property {string|null} error - Almacena mensajes de error, si ocurren.
 * @property {Array<Object>} professionals - Lista de todos los profesionales.
 * @property {Object|null} professionalProfile - Detalles del perfil profesional actual.
 */
const initialState = {
  loading: false,
  error: null,
  professionals: [],
  professionalProfile: null,
};

/**
 * Slice para manejar el estado de los profesionales.
 * 
 * Incluye la creación, actualización de perfiles y obtención de todos los profesionales.
 * 
 * @constant
 */
const professionalSlice = createSlice({
  name: "professional",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**
       * Maneja la creación de un perfil profesional.
       * 
       * @see createProfessionalProfileAction
       */
      .addCase(createProfessionalProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfessionalProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.professionalProfile = action.payload;
      })
      .addCase(createProfessionalProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * Maneja la actualización de un perfil profesional.
       * 
       * @see updateProfessionalProfileAction
       */
      .addCase(updateProfessionalProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfessionalProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.professionalProfile = action.payload;
      })
      .addCase(updateProfessionalProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * Maneja la obtención de la lista de profesionales.
       * 
       * @see fetchProfessionalsAction
       */
      .addCase(fetchProfessionalsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfessionalsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.professionals = action.payload;
      })
      .addCase(fetchProfessionalsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default professionalSlice.reducer;