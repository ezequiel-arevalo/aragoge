// Selecciona la lista de profesionales desde el estado
export const selectProfessionals        = (state) => state.professional.professionals;

// Selecciona el perfil profesional actual desde el estado.
export const selectProfessionalProfile  = (state) => state.professional.professionalProfile;

// Selecciona el estado de carga de los datos de profesionales.
export const selectProfessionalLoading  = (state) => state.professional.loading;

// Selecciona el error relacionado con los datos de los profesionales.
export const selectProfessionalError    = (state) => state.professional.error;
