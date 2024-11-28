import { createSlice } from '@reduxjs/toolkit';
import { getAllPayments, getPaymentById } from './paymentActions';

const initialState = {
  payments: [],
  currentPayment: null,
  loading: false,
  error: null,
};

/**
 * Slice de Redux para manejar el estado relacionado con los pagos.
 * 
 * @module paymentSlice
 */
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    /**
     * Acción para limpiar el error de pago.
     * 
     * @function
     * @returns {void}
     */
    clearPaymentError: (state) => {
      state.error = null;
    },
    
    /**
     * Acción para limpiar el pago actual.
     * 
     * @function
     * @returns {void}
     */
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Manejar la acción getAllPayments
      /**
       * Acción cuando la solicitud para obtener todos los pagos está pendiente.
       * 
       * @function
       * @param {object} state - El estado actual.
       * @returns {void}
       */
      .addCase(getAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Acción cuando la solicitud para obtener todos los pagos se completa con éxito.
       * 
       * @function
       * @param {object} state - El estado actual.
       * @param {object} action - El objeto de acción que contiene los pagos obtenidos.
       * @returns {void}
       */
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      /**
       * Acción cuando la solicitud para obtener todos los pagos falla.
       * 
       * @function
       * @param {object} state - El estado actual.
       * @param {object} action - El objeto de acción que contiene el error.
       * @returns {void}
       */
      .addCase(getAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Manejar la acción getPaymentById
      /**
       * Acción cuando la solicitud para obtener un pago por ID está pendiente.
       * 
       * @function
       * @param {object} state - El estado actual.
       * @returns {void}
       */
      .addCase(getPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      /**
       * Acción cuando la solicitud para obtener un pago por ID se completa con éxito.
       * 
       * @function
       * @param {object} state - El estado actual.
       * @param {object} action - El objeto de acción que contiene el pago obtenido.
       * @returns {void}
       */
      .addCase(getPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      /**
       * Acción cuando la solicitud para obtener un pago por ID falla.
       * 
       * @function
       * @param {object} state - El estado actual.
       * @param {object} action - El objeto de acción que contiene el error.
       * @returns {void}
       */
      .addCase(getPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentError, clearCurrentPayment } = paymentSlice.actions;
export default paymentSlice.reducer;