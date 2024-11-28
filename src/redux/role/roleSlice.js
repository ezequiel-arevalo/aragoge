import { createSlice } from "@reduxjs/toolkit";
import { fetchRolesAction, fetchRoleByIdAction } from "./roleActions";

/**
 * Estado inicial del slice de roles.
 * @typedef {Object} RoleState
 * @property {Array<Object>} roles - Lista de roles disponibles.
 * @property {Object|null} currentRole - Información del rol actualmente seleccionado.
 * @property {boolean} loading - Indica si se está cargando información.
 * @property {string|null} error - Mensaje de error en caso de fallo.
 */
const initialState = {
  roles: [],
  currentRole: null,
  loading: false,
  error: null,
};

/**
 * Slice de Redux para la gestión de roles.
 * 
 * Maneja el estado relacionado con la lista de roles y los detalles de un rol específico.
 */
const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    /**
     * Limpia la información del rol actualmente seleccionado.
     * @param {RoleState} state - El estado actual del slice.
     */
    clearCurrentRole: (state) => {
      state.currentRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Maneja la acción pendiente para obtener la lista de roles.
       * @param {RoleState} state - El estado actual del slice.
       */
      .addCase(fetchRolesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Maneja la acción completada para obtener la lista de roles.
       * @param {RoleState} state - El estado actual del slice.
       * @param {Object} action - La acción que contiene la lista de roles.
       * @param {Array<Object>} action.payload - Lista de roles obtenida.
       */
      .addCase(fetchRolesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      /**
       * Maneja la acción rechazada al intentar obtener la lista de roles.
       * @param {RoleState} state - El estado actual del slice.
       * @param {Object} action - La acción que contiene el error.
       * @param {string} action.payload - Mensaje de error.
       */
      .addCase(fetchRolesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * Maneja la acción pendiente para obtener un rol por su ID.
       * @param {RoleState} state - El estado actual del slice.
       */
      .addCase(fetchRoleByIdAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Maneja la acción completada para obtener un rol por su ID.
       * @param {RoleState} state - El estado actual del slice.
       * @param {Object} action - La acción que contiene los detalles del rol.
       * @param {Object} action.payload - Detalles del rol obtenido.
       */
      .addCase(fetchRoleByIdAction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRole = action.payload;
      })
      /**
       * Maneja la acción rechazada al intentar obtener un rol por su ID.
       * @param {RoleState} state - El estado actual del slice.
       * @param {Object} action - La acción que contiene el error.
       * @param {string} action.payload - Mensaje de error.
       */
      .addCase(fetchRoleByIdAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentRole } = roleSlice.actions;
export default roleSlice.reducer;
