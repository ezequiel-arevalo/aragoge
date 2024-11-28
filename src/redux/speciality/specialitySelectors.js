// Select all specialities from the state
export const selectAllSpecialities   = (state) => state.speciality.specialities;

// Select the loading state
export const selectSpecialityLoading = (state) => state.speciality.loading;

// Select any error messages
export const selectSpecialityError   = (state) => state.speciality.error;

// Select a specific speciality by ID
export const selectSpecialityById    = (state, specialityId) => state.speciality.specialities.find((speciality) => speciality.id === specialityId);

// Select the current selected speciality
export const selectCurrentSpeciality = (state) => state.speciality.currentSpeciality;