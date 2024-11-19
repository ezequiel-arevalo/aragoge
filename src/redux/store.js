/**
 * @file store.js
 * Configuración de la tienda Redux para la aplicación.
 */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import planningsReducer from "./plannings/planningsSlice";

/**
 * Configura y crea la tienda de Redux.
 *
 * Utiliza el `userReducer` para gestionar el estado del usuario.
 *
 * @constant {Object} store - La tienda de Redux configurada.
 * @property {Object} reducer - Los reductores utilizados por la tienda.
 * @property {Function} reducer.user - El reductor encargado de manejar el estado del usuario.
 *
 * @example
 * // Ejemplo de cómo acceder al estado del usuario:
 * const user = store.getState().user;
 */
const store = configureStore({
  reducer: {
    user: userReducer,
    plannings: planningsReducer,
  },
});

export default store;
