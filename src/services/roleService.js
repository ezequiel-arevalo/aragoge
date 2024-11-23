import { call } from "./callFetch";

/**
 * Obtiene la lista de todos los roles.
 * @returns {Promise} - Una promesa que se resuelve con la lista de roles.
 */
export const getRoles = () => call("roles", "GET");

/**
 * Obtiene un rol específico por su ID.
 * @param {string} roleId - El ID del rol que se desea obtener.
 * @returns {Promise} - Una promesa que se resuelve con los detalles del rol.
 */
export const getRoleById = (roleId) => call(`roles/${roleId}`, "GET");