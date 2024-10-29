import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  createProfessionalProfile,
  updateProfessionalProfile,
} from "@/services/userService";

// Registro de usuario
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

// Inicio de sesión
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

// Cierre de sesión
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

// Actualización de usuario
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

// Creación de perfil de profesional
export const createProfessionalProfileAction = createAsyncThunk(
  "user/createProfessionalProfile",
  async (profileData, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await createProfessionalProfile(profileData, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error al crear perfil de profesional"
      );
    }
  }
);

// Actualización de perfil de profesional
export const updateProfessionalProfileAction = createAsyncThunk(
  "user/updateProfessionalProfile",
  async (profileData, { getState, rejectWithValue }) => {
    const token = getState().user.accessToken;
    try {
      const response = await updateProfessionalProfile(profileData, token);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Error al actualizar perfil de profesional"
      );
    }
  }
);

// Eliminación de usuario
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

const initialState = {
  loading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Registro
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
      .addCase(updateUserAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
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

      // Creación de perfil de profesional
      .addCase(createProfessionalProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfessionalProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...state.user, professionalProfile: action.payload };
      })
      .addCase(createProfessionalProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Actualización de perfil de profesional
      .addCase(updateProfessionalProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfessionalProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = { ...state.user, professionalProfile: action.payload };
      })
      .addCase(updateProfessionalProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
