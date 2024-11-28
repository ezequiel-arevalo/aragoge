import { createSlice } from '@reduxjs/toolkit';
import {
  getAllSubscriptions,
  getSubscriptionByUserId,
  createSubscription,
  renewSubscriptionThunk,
  cancelSubscription
} from './subscriptionActions';

/**
 * Initial state for the subscription slice.
 * @typedef {Object} SubscriptionState
 * @property {Array<Object>} subscriptions - List of all subscriptions.
 * @property {Object|null} currentSubscription - Details of the current subscription.
 * @property {boolean} loading - Indicates whether a request is in progress.
 * @property {string|null} error - Error message if a request fails.
 * @property {string} status - Current status of the subscription process ('idle', 'subscribing', 'renewing', etc.).
 */
const initialState = {
  subscriptions: [],
  currentSubscription: null,
  loading: false,
  error: null,
  status: 'idle'
};

/**
 * Redux slice for managing subscription-related state and actions.
 */
const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    /**
     * Clears the current error in the subscription state.
     * @param {SubscriptionState} state - The current state of the slice.
     */
    clearSubscriptionError: (state) => {
      state.error = null;
    },

    /**
     * Clears the current subscription details.
     * @param {SubscriptionState} state - The current state of the slice.
     */
    clearCurrentSubscription: (state) => {
      state.currentSubscription = null;
    },

    /**
     * Resets the status field to 'idle'.
     * @param {SubscriptionState} state - The current state of the slice.
     */
    resetSubscriptionStatus: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      /**
       * Handles pending, fulfilled, and rejected cases for `getAllSubscriptions`.
       */
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(getAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * Handles pending, fulfilled, and rejected cases for `getSubscriptionByUserId`.
       */
      .addCase(getSubscriptionByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload;
      })
      .addCase(getSubscriptionByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /**
       * Handles pending, fulfilled, and rejected cases for `createSubscription`.
       */
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'subscribing';
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'subscribed';
        state.subscriptions.push(action.payload);
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })

      /**
       * Handles pending, fulfilled, and rejected cases for `renewSubscriptionThunk`.
       */
      .addCase(renewSubscriptionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'renewing';
      })
      .addCase(renewSubscriptionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'renewed';
        const index = state.subscriptions.findIndex(sub => sub.id === action.payload.id);
        if (index !== -1) {
          state.subscriptions[index] = action.payload;
        }
      })
      .addCase(renewSubscriptionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })

      /**
       * Handles pending, fulfilled, and rejected cases for `cancelSubscription`.
       */
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'cancelling';
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'cancelled';
        state.subscriptions = state.subscriptions.filter(
          sub => sub.id !== action.payload.id
        );
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

/**
 * Redux actions exported from the subscription slice.
 * @typedef {Object} SubscriptionActions
 * @property {Function} clearSubscriptionError - Clears the current error.
 * @property {Function} clearCurrentSubscription - Clears the current subscription details.
 * @property {Function} resetSubscriptionStatus - Resets the status field to 'idle'.
 */
export const { 
  clearSubscriptionError, 
  clearCurrentSubscription,
  resetSubscriptionStatus 
} = subscriptionSlice.actions;

/**
 * The reducer for the subscription slice.
 * @type {Function}
 */
export default subscriptionSlice.reducer;