import { call } from "./callFetch";

/**
 * Crea un nuevo perfil profesional.
 *
 * @param {Object} profileData - Los datos del perfil profesional a crear.
 * @param {string} profileData.name - El nombre del profesional.
 * @param {string} profileData.specialization - La especialización del profesional.
 * @param {string} profileData.experience - La experiencia del profesional.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const createProfessionalProfile = (profileData, token) =>
  call("professionals/profile", "POST", profileData, token);

/**
 * Actualiza un perfil profesional existente.
 *
 * @param {Object} profileData - Los nuevos datos del perfil profesional.
 * @param {string} profileData.name - El nuevo nombre del profesional.
 * @param {string} profileData.specialization - La nueva especialización del profesional.
 * @param {string} profileData.experience - La nueva experiencia del profesional.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const updateProfessionalProfile = (profileData, token) =>
  call("professionals/profile", "PATCH", profileData, token);

/**
 * Obtiene la lista de todos los profesionales.
 * @param {string} token - El token de autenticación del usuario.
 * @param {string} role - El rol de los usuarios que se desean filtrar (opcional).
 * @returns {Promise} - Una promesa que se resuelve con la lista de usuarios.
 */
export const getAllProfesionals = (token, role = "professional") => {
  const query = role ? `?rol=${role}` : "";
  return call(`users${query}`, "GET", null, token);
};