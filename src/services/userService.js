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
 * Actualiza la información de un usuario, incluida su foto de perfil.
 * @param {Object} userData - Los nuevos datos del usuario. Puede incluir archivos.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const updateUser = (userData, token) => {
  let payload = userData;

  // Verificar si hay un archivo en los datos del usuario
  const hasFile = Object.values(userData).some(
    (value) => value instanceof File || value instanceof Blob
  );

  if (hasFile) {
    payload = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      payload.append(key, value);
    });
  }

  return call("users/update", "POST", payload, token);
};

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
