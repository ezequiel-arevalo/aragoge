import { createSlice } from "@reduxjs/toolkit";
import {
  registerNewUser,
  loginUserAction,
  logoutUserAction,
  updateUserAction,
  deleteUserAction,
  fetchUserDetails,
  fetchAllUsers,
} from "./userActions";

const initialState = {
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  allUsers: [], // Nuevo estado para la lista de usuarios
  userDetails: null, // Nuevo estado para los detalles de un usuario
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.accessToken = null;
      state.allUsers = [];
      state.userDetails = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Registro de usuario
      .addCase(registerNewUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerNewUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Inicio de sesión
      .addCase(loginUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
        state.accessToken = action.payload.access_token;
        localStorage.setItem("accessToken", action.payload.access_token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cierre de sesión
      .addCase(logoutUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })
      .addCase(logoutUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Actualización de usuario
      .addCase(updateUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Extraemos los datos del usuario de la respuesta
        const userData = action.payload.data;
        // Actualizamos el usuario en el estado
        state.user = userData;
        // Actualizamos el usuario en localStorage
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Eliminación de usuario
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Casos para fetchUserDetails
      .addCase(fetchUserDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        const { userId, userDetails } = action.payload;

        // Asegúrate de mantener los datos existentes y añadir los nuevos
        state.userDetails = {
          ...state.userDetails,
          [userId]: userDetails.data, // Almacena solo la propiedad "data" del usuario
        };
        state.loading = false;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload.data; // Verifica que "data" exista
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
