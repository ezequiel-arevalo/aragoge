// Select all payments from the state
export const selectAllPayments    = (state) => state.payment.payments;

// Select the loading state
export const selectPaymentLoading = (state) => state.payment.loading;

// Select any error messages
export const selectPaymentError   = (state) => state.payment.error;

// Select a specific payment by ID
export const selectPaymentById    = (state, paymentId) => state.payment.payments.find((payment) => payment.id === paymentId);

// Select the current selected payment
export const selectCurrentPayment = (state) => state.payment.currentPayment;