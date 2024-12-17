import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPayments, fetchPaymentById } from "@/services/paymentService";

/**
 * Acción asíncrona que obtiene todos los pagos.
 *
 * @function
 * @param {string} token - El token de autenticación del usuario.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object>} Respuesta de la solicitud de pagos.
 * @throws {string} Error si la solicitud falla.
 */
export const getAllPayments = createAsyncThunk(
  "payment/getAllPayments",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchPayments(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Acción asíncrona que obtiene un pago por su ID.
 *
 * @function
 * @param {object} param0 - El objeto que contiene los parámetros de la solicitud.
 * @param {string} param0.paymentId - El ID del pago a obtener.
 * @param {string} param0.token - El token de autenticación del usuario.
 * @param {object} thunkAPI - El objeto de la API de Thunk que proporciona la función rejectWithValue.
 * @returns {Promise<object>} Respuesta de la solicitud de pago.
 * @throws {string} Error si la solicitud falla.
 */
export const getPaymentById = createAsyncThunk(
  "payment/getPaymentById",
  async ({ paymentId, token }, { rejectWithValue }) => {
    try {
      const response = await fetchPaymentById(paymentId, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
