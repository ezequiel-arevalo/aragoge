import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSubscriptions,
  fetchSubscriptionById,
  fetchSubscriptionsByUserId,
  subscribeToPlanning,
  renewSubscription,
  unsubscribeFromPlanning,
} from "@/services/SubscriptionService";

/**
 * Fetches all subscriptions for the given token.
 * @function
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} The list of subscriptions.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const getAllSubscriptions = createAsyncThunk(
  "subscription/getAllSubscriptions",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchSubscriptions(token);
      console.log("Fetched Subscriptions:", response); // Log de la respuesta del API
      return response;
    } catch (error) {
      console.error("Error fetching subscriptions:", error); // Log del error
      return rejectWithValue(error.message);
    }
  }
);
/**
 * Fetches all subscriptions for a specific user.
 * @function
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The subscription details for the user.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const getSubscriptionsByUserId = createAsyncThunk(
  "subscription/getSubscriptionsByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchSubscriptionsByUserId(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fetches a specific subscription by its ID.
 * @function
 * @param {string} subscriptionId - The ID of the subscription.
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} The subscription details.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const getSubscriptionById = createAsyncThunk(
  "subscription/getSubscriptionById",
  async ({ subscriptionId, token }, { rejectWithValue }) => {
    try {
      const response = await fetchSubscriptionById(subscriptionId, token);
      // console.log("Fetched Subscription Detail:", response);
      return response.data;
    } catch (error) {
      // console.error("Error fetching subscription detail:", error);
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Creates a new subscription for a given planning ID.
 * @function
 * @param {Object} payload - The payload object.
 * @param {string} payload.planningId - The ID of the planning to subscribe to.
 * @param {string} payload.token - The authentication token.
 * @returns {Promise<Object>} The details of the newly created subscription.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const createSubscription = createAsyncThunk(
  "subscription/createSubscription",
  async ({ planningId, token }, { rejectWithValue }) => {
    try {
      const response = await subscribeToPlanning(planningId, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Renews an existing subscription for a given planning ID.
 * @function
 * @param {Object} payload - The payload object.
 * @param {string} payload.planningId - The ID of the planning to renew.
 * @param {string} payload.token - The authentication token.
 * @returns {Promise<Object>} The details of the renewed subscription.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const renewSubscriptionThunk = createAsyncThunk(
  "subscription/renewSubscription",
  async ({ planningId, token }, { rejectWithValue }) => {
    try {
      const response = await renewSubscription(planningId, token);
      // console.log("Respuesta de la API al renovar:", response); // Depuración
      return response; // La API debe devolver los detalles actualizados
    } catch (error) {
      // console.error(
      //   "Error al renovar la suscripción:",
      //   error.response || error
      // );
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Cancels an existing subscription for a given planning ID.
 * @function
 * @param {Object} payload - The payload object.
 * @param {string} payload.planningId - The ID of the planning to unsubscribe from.
 * @param {string} payload.token - The authentication token.
 * @returns {Promise<Object>} The details of the canceled subscription.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const cancelSubscription = createAsyncThunk(
  "subscription/cancelSubscription",
  async ({ planningId, token }, { rejectWithValue }) => {
    try {
      const response = await unsubscribeFromPlanning(planningId, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
