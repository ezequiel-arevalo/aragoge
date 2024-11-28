import { createSlice } from '@reduxjs/toolkit';
import { fetchSpecialities, fetchSpecialityById } from './specialityActions';

const initialState = {
  specialities: [],
  currentSpeciality: null,
  loading: false,
  error: null,
};

/**
 * Slice para manejar el estado relacionado con especialidades.
 * Gestiona la lista de especialidades, una especialidad seleccionada y los estados de carga y error.
 */
const specialitySlice = createSlice({
  name: 'speciality',
  initialState,
  reducers: {
    /**
     * Limpia los errores relacionados con las especialidades del estado.
     * @function
     * @param {Object} state - El estado actual del slice.
     */
    clearSpecialityError: (state) => {
      state.error = null;
    },

    /**
     * Limpia la especialidad actualmente seleccionada en el estado.
     * @function
     * @param {Object} state - El estado actual del slice.
     */
    clearCurrentSpeciality: (state) => {
      state.currentSpeciality = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Manejo de fetchSpecialities
      /**
       * Acción pendiente para obtener todas las especialidades.
       * @param {Object} state - El estado actual del slice.
       */
      .addCase(fetchSpecialities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /**
       * Acción cumplida para obtener todas las especialidades.
       * Actualiza el estado con la lista de especialidades obtenidas.
       * @param {Object} state - El estado actual del slice.
       * @param {Object} action - Acción con las especialidades obtenidas.
       */
      .addCase(fetchSpecialities.fulfilled, (state, action) => {
        state.loading = false;
        state.specialities = action.payload;
      })

      /**
       * Acción rechazada al intentar obtener todas las especialidades.
       * Actualiza el estado con el error correspondiente.
       * @param {Object} state - El estado actual del slice.
       * @param {Object} action - Acción con el mensaje de error.
       */
      .addCase(fetchSpecialities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Manejo de fetchSpecialityById
      /**
       * Acción pendiente para obtener una especialidad por su ID.
       * @param {Object} state - El estado actual del slice.
       */
      .addCase(fetchSpecialityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /**
       * Acción cumplida para obtener una especialidad por su ID.
       * Actualiza el estado con la especialidad obtenida.
       * @param {Object} state - El estado actual del slice.
       * @param {Object} action - Acción con la especialidad obtenida.
       */
      .addCase(fetchSpecialityById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSpeciality = action.payload;
      })

      /**
       * Acción rechazada al intentar obtener una especialidad por su ID.
       * Actualiza el estado con el error correspondiente.
       * @param {Object} state - El estado actual del slice.
       * @param {Object} action - Acción con el mensaje de error.
       */
      .addCase(fetchSpecialityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/**
 * Acciones del slice de especialidades.
 * @type {Object}
 * @property {Function} clearSpecialityError - Acción para limpiar errores.
 * @property {Function} clearCurrentSpeciality - Acción para limpiar la especialidad seleccionada.
 */
export const { clearSpecialityError, clearCurrentSpeciality } = specialitySlice.actions;

/**
 * Reducer del slice de especialidades.
 * @type {Function}
 */
export default specialitySlice.reducer;