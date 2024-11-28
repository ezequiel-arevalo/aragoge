import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRoles, getRoleById } from "@/services/roleService";

/**
 * Acción para obtener la lista de roles.
 * 
 * Utiliza `getRoles` del servicio para recuperar la lista completa de roles.
 * 
 * @function fetchRolesAction
 * @returns {Promise<Array<Object>>} - Lista de roles obtenidos.
 * @throws {string} - Error al obtener roles.
 */
export const fetchRolesAction = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRoles();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message || "Error al obtener roles");
    }
  }
);

/**
 * Acción para obtener un rol por su ID.
 * 
 * Utiliza `getRoleById` del servicio para recuperar los detalles de un rol. Si el nombre del rol es "admin", devuelve `null`.
 * 
 * @function fetchRoleByIdAction
 * @param {number|string} roleId - ID del rol que se desea obtener.
 * @returns {Promise<Object|null>} - Detalles del rol o `null` si es un rol admin.
 * @throws {string} - Error al obtener el rol.
 */
export const fetchRoleByIdAction = createAsyncThunk(
  "roles/fetchRoleById",
  async (roleId, { rejectWithValue }) => {
    try {
      const response = await getRoleById(roleId);
      const role = response.data;
      return role.name.toLowerCase() === "admin" ? null : role;
    } catch (err) {
      return rejectWithValue(err.message || "Error al obtener el rol");
    }
  }
);
