import axios from "axios";

const URL = import.meta.env.VITE_API_KEY;

// Configuración de axios
const apiClient = axios.create({
  baseURL: URL, // Cambia esto por tu base URL
  timeout: 10000, // Tiempo máximo de espera
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Realiza una llamada a la API.
 * @param {string} endpoint - Endpoint de la API.
 * @param {string} method - Método HTTP (GET, POST, PATCH, DELETE).
 * @param {Object} [data] - Datos a enviar en la petición (body).
 * @param {string} [token] - Token de autenticación.
 * @param {Object} [customHeaders] - Headers adicionales opcionales.
 * @returns {Promise<Object>} - Respuesta de la API.
 */
export const call = async (
  endpoint,
  method,
  data = null,
  token = null,
  customHeaders = {}
) => {
  try {
    const response = await apiClient({
      url: endpoint,
      method,
      data,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...customHeaders,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
