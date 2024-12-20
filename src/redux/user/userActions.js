import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUserDetails,
  getAllUsers,
} from "@/services/userService";

/**
 * Registers a new user with a default role.
 * @function
 * @param {Object} userData - The user data to register.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} The response containing user details.
 * @throws Will return a rejected value with an error message if the registration fails.
 */
export const registerNewUser = createAsyncThunk(
  "user/registerNewUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Error en el registro");
    }
  }
);

/**
 * Logs in a user.
 * @function
 * @param {Object} userData - The user credentials for login.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.password - The password of the user.
 * @returns {Promise<Object>} The response containing user details and access token.
 * @throws Will return a rejected value with an error message if the login fails.
 */
export const loginUserAction = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Error en el inicio de sesión");
    }
  }
);

/**
 * Logs out a user.
 * @function
 * @param {void} _ - No payload is required for this action.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<Object>} The response confirming the logout.
 * @throws Will return a rejected value with an error message if the logout fails.
 */
export const logoutUserAction = createAsyncThunk(
  "user/logoutUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await logoutUser(token);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Error en el cierre de sesión");
    }
  }
);

/**
 * Updates user information.
 * @function
 * @param {Object} userData - The updated user data.
 * @param {string} [userData.name] - The updated name of the user (optional).
 * @param {string} [userData.email] - The updated email of the user (optional).
 * @param {string} [userData.password] - The updated password of the user (optional).
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<Object>} The response containing updated user details.
 * @throws Will return a rejected value with an error message if the update fails.
 */
export const updateUserAction = createAsyncThunk(
  "user/updateUser",
  async (userData, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await updateUser(userData, token);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Error al actualizar usuario");
    }
  }
);

/**
 * Deletes the current user.
 * @function
 * @param {void} _ - No payload is required for this action.
 * @param {Object} thunkAPI - The thunk API object.
 * @param {Function} thunkAPI.getState - Function to get the current state.
 * @returns {Promise<Object>} The response confirming the user deletion.
 * @throws Will return a rejected value with an error message if the deletion fails.
 */
export const deleteUserAction = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await deleteUser(token);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Error al eliminar usuario");
    }
  }
);

// Acción para obtener detalles de un usuario específico
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const userDetails = await getUserDetails(userId, token);
      return { userId, userDetails };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getAllUsers(token);
      // console.log("Respuesta de la API:", response); // Verifica los datos aquí
      return response;
    } catch (err) {
      // console.error("Error al obtener usuarios:", err);
      return rejectWithValue(
        err.message || "Error al obtener la lista de usuarios"
      );
    }
  }
);
