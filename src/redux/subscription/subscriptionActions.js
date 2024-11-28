import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchSubscriptions, 
  fetchSubscriptionById, 
  subscribeToPlanning, 
  renewSubscription, 
  unsubscribeFromPlanning 
} from '@/services/subscriptionService';

/**
 * Fetches all subscriptions for the given token.
 * @function
 * @param {string} token - The authentication token.
 * @returns {Promise<Object>} The list of subscriptions.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const getAllSubscriptions = createAsyncThunk(
  'subscription/getAllSubscriptions',
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchSubscriptions(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Fetches subscription details by user ID.
 * @function
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The subscription details for the user.
 * @throws Will return a rejected value with an error message if the operation fails.
 */
export const getSubscriptionByUserId = createAsyncThunk(
  'subscription/getSubscriptionByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchSubscriptionById(userId);
      return response;
    } catch (error) {
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
  'subscription/createSubscription',
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
  'subscription/renewSubscription',
  async ({ planningId, token }, { rejectWithValue }) => {
    try {
      const response = await renewSubscription(planningId, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
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
  'subscription/cancelSubscription',
  async ({ planningId, token }, { rejectWithValue }) => {
    try {
      const response = await unsubscribeFromPlanning(planningId, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
