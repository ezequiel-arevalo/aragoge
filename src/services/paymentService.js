import { call } from "./callFetch";

/**
 * Obtiene la lista de todos los pagos.
 *
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con la lista de pagos.
 */
export const fetchPayments = (token) => call("payments", "GET", null, token);

/**
 * Obtiene un pago específico por su ID.
 *
 * @param {string} paymentId - El ID del pago que se desea obtener.
 * @param {string} token - El token de autenticación del usuario.
 * @returns {Promise} - Una promesa que se resuelve con los detalles del pago.
 */
export const fetchPaymentById = (paymentId, token) =>
  call(`payments/${paymentId}`, "GET", null, token);
