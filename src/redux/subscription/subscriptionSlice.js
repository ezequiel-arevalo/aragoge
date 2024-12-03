import { createSlice } from '@reduxjs/toolkit';
import {
  getAllSubscriptions,
  getSubscriptionsByUserId,
  getSubscriptionById,
  createSubscription,
  renewSubscriptionThunk,
  cancelSubscription
} from './subscriptionActions';

const initialState = {
  subscriptions: [], // Garantizamos que sea un array al inicio
  currentSubscription: null,
  loading: false,
  error: null,
  status: 'idle',
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    clearSubscriptionError: (state) => {
      state.error = null;
    },
    clearCurrentSubscription: (state) => {
      state.currentSubscription = null;
    },
    resetSubscriptionStatus: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Subscriptions
      .addCase(getAllSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = Array.isArray(action.payload.data) ? action.payload.data : [];
      })
      .addCase(getAllSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching subscriptions';
      })

      // Get Subscriptions By User ID
      .addCase(getSubscriptionsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = Array.isArray(action.payload.data) ? action.payload.data : [];
      })
      .addCase(getSubscriptionsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching user subscriptions';
      })

      // Get Subscription By ID
      .addCase(getSubscriptionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubscriptionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload || null;
      })
      .addCase(getSubscriptionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching subscription details';
      })

      // Create Subscription
      .addCase(createSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'subscribing';
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'subscribed';
        if (action.payload) {
          state.subscriptions.push(action.payload);
        }
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error creating subscription';
        state.status = 'failed';
      })

      // Renew Subscription
      .addCase(renewSubscriptionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'renewing';
      })
      .addCase(renewSubscriptionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'renewed';
        const index = state.subscriptions.findIndex((sub) => sub.id === action.payload?.id);
        if (index !== -1) {
          state.subscriptions[index] = { ...state.subscriptions[index], ...action.payload };
        }
      })
      .addCase(renewSubscriptionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error renewing subscription';
        state.status = 'failed';
      })

      // Cancel Subscription
      .addCase(cancelSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'cancelling';
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'cancelled';
        state.subscriptions = state.subscriptions.filter((sub) => sub.id !== action.payload?.id);
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error cancelling subscription';
        state.status = 'failed';
      });
  },
});

export const { 
  clearSubscriptionError, 
  clearCurrentSubscription, 
  resetSubscriptionStatus 
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;