import { call } from "./callFetch";

/**
 * Fetches all subscriptions for the authenticated user.
 *
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const fetchSubscriptions = (token) =>
  call("subscriptions", "GET", null, token);

/**
 * Fetches a specific subscription by its ID.
 *
 * @param {string} subscriptionId - The ID of the subscription to fetch.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const fetchSubscriptionById = (subscriptionId, token) =>
  call(`subscriptions/${subscriptionId}`, "GET", null, token);

/**
 * Fetches all subscriptions for a specific user.
 *
 * @param {number} userId - The ID of the user whose subscriptions are being fetched.
 * @returns {Promise<Object>} A promise that resolves with the user's subscriptions.
 */
export const fetchSubscriptionsByUserId = (userId) => {
    return call(`users/${userId}/subscriptions`, "GET");
};

/**
 * Subscribes the authenticated user to a specific planning.
 *
 * @param {string} planningId - The ID of the planning to subscribe to.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const subscribeToPlanning = (planningId, token) =>
  call(`subscriptions/subscripting/${planningId}`, "POST", null, token);

/**
 * Renews the subscription for a specific planning.
 *
 * @param {string} planningId - The ID of the planning to renew the subscription for.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const renewSubscription = (planningId, token) =>
  call(`subscriptions/renew/${planningId}`, "POST", null, token);

/**
 * Unsubscribes the authenticated user from a specific planning.
 *
 * @param {string} planningId - The ID of the planning to unsubscribe from.
 * @param {string} token - The authentication token for the request.
 * @returns {Promise} A promise that resolves with the response from the API.
 */
export const unsubscribeFromPlanning = (planningId, token) =>
  call(`subscriptions/unsubscribing/${planningId}`, "POST", null, token);