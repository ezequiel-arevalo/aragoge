import { call } from "./callFetch";

/**
 * Registra un nuevo usuario con el rol de "atleta".
 * @param {Object} userData - Datos del usuario a registrar.
 * @returns {Promise<Object>} - Datos del usuario registrado.
 */
export const registerUser = (userData) => {
  const userWithRole = { ...userData, rol_id: 2 };
  return call("register", "POST", userWithRole);
};

/**
 * Inicia sesión del usuario.
 * @param {Object} userData - Credenciales del usuario (email, password).
 * @returns {Promise<Object>} - Datos del usuario autenticado.
 */
export const loginUser = (userData) => {
  return call("login", "POST", userData);
};

/**
 * Cierra la sesión del usuario autenticado.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Object|null>} - Respuesta del servidor al cerrar sesión.
 */
export const logoutUser = (token) => {
  return call("logout", "POST", null, token);
};

/**
 * Obtiene los detalles de un usuario específico.
 * @param {number} userId - ID del usuario.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Detalles del usuario.
 */
export const getUserDetails = (userId, token) => {
  return call(`users/${userId}`, "GET", null, token);
};

/**
 * Actualiza la información de un usuario.
 * @param {Object} userData - Datos a actualizar (first_name, last_name, email, role_id).
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Datos actualizados del usuario.
 */
export const updateUser = (userData, token) => {
  return call("users/update", "POST", userData, token);
};

/**
 * Elimina un usuario autenticado.
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<Object|null>} - Respuesta del servidor tras eliminar el usuario.
 */
export const deleteUser = (token) => {
  return call("users/delete", "DELETE", null, token);
};

/**
 * Obtiene todos los usuarios registrados.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Lista de usuarios.
 */
export const getAllUsers = (token) => {
  return call("users", "GET", null, token);
};

/**
 * Obtiene las suscripciones de un usuario específico.
 * @param {number} userId - ID del usuario.
 * @returns {Promise<Object>} - Lista de suscripciones del usuario.
 */
export const getSubscriptionsByUserId = (userId) => {
  return call(`users/${userId}/subscriptions`, "GET");
};

/**
 * Crea un nuevo perfil de profesional.
 * @param {Object} profileData - Datos del perfil de profesional.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const createProfessionalProfile = (profileData, token) => {
  return call("professionals/profile", "POST", profileData, token, {
    Accept: "application/json",
  });
};

/**
 * Actualiza el perfil de profesional existente.
 * @param {Object} profileData - Datos del perfil de profesional a actualizar.
 * @param {string} token - Token de autenticación.
 * @returns {Promise<Object>} - Respuesta del servidor.
 */
export const updateProfessionalProfile = (profileData, token) => {
  return call("professionals/profile", "PATCH", profileData, token, {
    Accept: "application/json",
  });
};
