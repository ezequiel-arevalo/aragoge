// Selector para obtener la lista de roles
export const selectRoles        = (state) => state.role.roles;

// Selector para obtener el rol actual
export const selectCurrentRole  = (state) => state.role.currentRole;

// Selector para obtener el estado de carga de roles
export const selectRolesLoading = (state) => state.role.loading;

// Selector para obtener el error relacionado con los roles
export const selectRolesError   = (state) => state.role.error;