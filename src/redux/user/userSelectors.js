// Selector para obtener los datos del usuario
export const selectUser        = (state) => state.user.user;

// Selector para obtener el token de acceso
export const selectAccessToken = (state) => state.user.accessToken;

// Selector para verificar si el usuario está cargando
export const selectLoading     = (state) => state.user.loading;

// Selector para obtener el error
export const selectError       = (state) => state.user.error;

// Selector para obtener a todos los usuarios
export const selectAllUsers    = (state) => state.user.allUsers;

// Selector para obtener la información del usuario
export const selectUserDetails = (state) => state.user.userDetails || {};

export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;