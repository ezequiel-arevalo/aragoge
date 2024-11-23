import { call } from "./callFetch";

/**
 * Registra un nuevo usuario.
 * @param {Object} userData - Los datos del usuario a registrar.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const registerUser = (userData) => call("register", "POST", userData);

/**
 * Inicia sesión con un usuario existente.
 * @param {Object} userData - Los datos del usuario para iniciar sesión.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const loginUser = (userData) => call("login", "POST", userData);

/**
 * Cierra la sesión del usuario.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const logoutUser = (token) => call("logout", "POST", null, token);

/**
 * Obtiene los detalles de un usuario específico.
 * @param {string} userId - El ID del usuario.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con los detalles del usuario.
 */
export const getUserDetails = (userId, token) =>
  call(`users/${userId}`, "GET", null, token);

/**
 * Actualiza la información de un usuario.
 * @param {Object} userData - Los nuevos datos del usuario.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const updateUser = (userData, token) =>
  call("users/update", "POST", userData, token);

/**
 * Elimina un usuario.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const deleteUser = (token) =>
  call("users/delete", "DELETE", null, token);

/**
 * Obtiene la lista de todos los usuarios.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la lista de usuarios.
 */
export const getAllUsers = (token) => call("users", "GET", null, token);
