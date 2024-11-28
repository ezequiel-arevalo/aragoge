import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "./categoryActions";

/**
 * Estado inicial del slice de categorías.
 * 
 * @typedef {Object} CategoryState
 * @property {Array} items - Lista de categorías.
 * @property {boolean} loading - Estado de carga.
 * @property {string|null} error - Error de la operación, si lo hubiera.
 */
const initialState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Slice de categorías que maneja las acciones relacionadas con categorías.
 */
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Obtener categorías
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Crear categoría
      .addCase(createCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Actualizar categoría
      .addCase(updateCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        // Buscar la categoría a actualizar y reemplazarla
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Eliminar categoría
      .addCase(deleteCategoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryAction.fulfilled, (state, action) => {
        state.loading = false;
        // Filtrar la categoría eliminada
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteCategoryAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;