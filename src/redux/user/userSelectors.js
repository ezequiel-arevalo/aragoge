// Selector para obtener los datos del usuario
export const selectUser        = (state) => state.user.user;

// Selector para obtener el token de acceso
export const selectAccessToken = (state) => state.user.accessToken;

// Selector para verificar si el usuario está cargando
export const selectLoading     = (state) => state.user.loading;

// Selector para obtener el error
export const selectError       = (state) => state.user.error;
