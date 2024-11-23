import { call } from "./callFetch";

/**
 * Obtiene la lista de todas las especialidades.
 *
 * @returns {Promise} - Una promesa que se resuelve con la lista de especialidades.
 */
export const getSpecialities = () => call("specialities", "GET");

/**
 * Obtiene una especialidad específica por su ID.
 *
 * @param {string} specialityId - El ID de la especialidad que se desea obtener.
 * @returns {Promise} - Una promesa que se resuelve con los detalles de la especialidad.
 */
export const getSpecialityById = (specialityId) =>
  call(`specialities/${specialityId}`, "GET");
