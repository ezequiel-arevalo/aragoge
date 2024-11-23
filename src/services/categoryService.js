import { call } from "./callFetch";

/**
 * Obtiene la lista de todas las categorías.
 *
 * @returns {Promise} - Una promesa que se resuelve con la lista de categorías.
 */
export const fetchCategories = () => call("categories", "GET");

/**
 * Obtiene una categoría específica por su ID.
 *
 * @param {string} categoryId - El ID de la categoría que se desea obtener.
 * @returns {Promise} - Una promesa que se resuelve con los detalles de la categoría.
 */
export const getCategoryById = (categoryId) =>
  call(`categories/${categoryId}`, "GET");

/**
 * Crea una nueva categoría.
 *
 * @param {Object} categoryData - Los datos de la categoría a crear.
 * @param {string} categoryData.name - El nombre de la nueva categoría.
 * @param {string} categoryData.description - Una descripción de la categoría.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const createCategory = (categoryData, token) =>
  call("categories", "POST", categoryData, token);

/**
 * Actualiza una categoría existente.
 *
 * @param {string} categoryId - El ID de la categoría a actualizar.
 * @param {Object} categoryData - Los nuevos datos de la categoría.
 * @param {string} categoryData.name - El nuevo nombre de la categoría.
 * @param {string} categoryData.description - La nueva descripción de la categoría.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const updateCategory = (categoryId, categoryData, token) =>
  call(`categories/${categoryId}`, "PATCH", categoryData, token);

/**
 * Elimina una categoría existente.
 *
 * @param {string} categoryId - El ID de la categoría a eliminar.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la respuesta del servidor.
 */
export const deleteCategory = (categoryId, token) =>
  call(`categories/${categoryId}`, "DELETE", null, token);
