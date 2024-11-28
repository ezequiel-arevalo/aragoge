import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSpecialities, getSpecialityById } from '@/services/specialityService';

/**
 * Acción para obtener todas las especialidades.
 * Llama al servicio `getSpecialities` para recuperar la lista de especialidades.
 * 
 * @async
 * @function fetchSpecialities
 * @returns {Promise<Array>} Una promesa que resuelve con un arreglo de especialidades.
 * @throws {string} Un mensaje de error si la solicitud falla.
 */
export const fetchSpecialities = createAsyncThunk(
  'speciality/fetchSpecialities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSpecialities();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Acción para obtener una especialidad por su ID.
 * Llama al servicio `getSpecialityById` para recuperar los detalles de una especialidad específica.
 * 
 * @async
 * @function fetchSpecialityById
 * @param {number|string} specialityId - El ID de la especialidad a buscar.
 * @returns {Promise<Object>} Una promesa que resuelve con los detalles de la especialidad.
 * @throws {string} Un mensaje de error si la solicitud falla.
 */
export const fetchSpecialityById = createAsyncThunk(
  'speciality/fetchSpecialityById',
  async (specialityId, { rejectWithValue }) => {
    try {
      const response = await getSpecialityById(specialityId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
