import { call } from "./callFetch";

/**
 * Obtiene las planificaciones asociadas a un usuario por su ID.
 *
 * @function
 * @param {string} userId - El ID del usuario cuyas planificaciones se desean obtener.
 * @param {string} token - El token de autenticación para realizar la solicitud.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de las planificaciones del usuario.
 */
export const getPlanningsByUserId = (userId, token) => call(`users/${userId}/plannings`, "GET", null, token);

/**
 * Fetches marketplace plannings based on the provided filters.
 *
 * @param {string} [filters=""] - The filters to apply when fetching plannings.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const fetchMarketplacePlannings = (filters = "") =>
  call(`plannings${filters}`, "GET");

/**
 * Fetches a specific planning by its ID.
 *
 * @param {string} planningId - The ID of the planning to fetch.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const fetchPlanningById = (planningId, token) =>
  call(`plannings/${planningId}`, "GET", null, token);

/**
 * Creates a new planning with the provided data.
 *
 * @param {Object} planningData - The data for the new planning.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const createPlanning = (planningData, token) =>
  call("plannings", "POST", planningData, token);

/**
 * Updates an existing planning with the provided data.
 *
 * @param {string} planningId - The ID of the planning to update.
 * @param {Object} planningData - The updated data for the planning.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const updatePlanning = (planningId, planningData, token) =>
  call(`plannings/${planningId}`, "PATCH", planningData, token);

/**
 * Deletes a specific planning by its ID.
 *
 * @param {string} planningId - The ID of the planning to delete.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const deletePlanning = (planningId, token) =>
  call(`plannings/${planningId}`, "DELETE", null, token);

/**
 * Fetches subscriptions associated with a specific planning by its ID.
 *
 * @param {string} planningId - The ID of the planning whose subscriptions to fetch.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const fetchSubscriptionsByPlanningId = (planningId, token) =>
  call(`plannings/${planningId}/subscriptions`, "GET", null, token);
