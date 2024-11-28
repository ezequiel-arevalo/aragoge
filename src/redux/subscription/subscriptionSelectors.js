// Select all subscriptions from the state
export const selectAllSubscriptions     = (state) => state.subscription.subscriptions;

// Select the loading state
export const selectSubscriptionLoading  = (state) => state.subscription.loading;

// Select any error messages
export const selectSubscriptionError    = (state) => state.subscription.error;

// Select the current subscription
export const selectCurrentSubscription  = (state) => state.subscription.currentSubscription;

// Select a specific subscription by user ID
export const selectSubscriptionByUserId = (state, userId) => state.subscription.subscriptions.find((subscription) => subscription.userId === userId);

// Select subscription status
export const selectSubscriptionStatus   = (state) => state.subscription.status;