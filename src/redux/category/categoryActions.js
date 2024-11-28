import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategories as fetchCategoriesService,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categoryService";

/**
 * Acción para obtener todas las categorías.
 * 
 * @function
 * @async
 * @returns {Promise<Object[]>} Una lista de categorías.
 * @throws {Error} Si ocurre un error al obtener las categorías.
 */
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategoriesService();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Error al obtener las categorías");
    }
  }
);

/**
 * Acción para crear una nueva categoría.
 * 
 * @function
 * @async
 * @param {Object} param0 - Datos necesarios para la creación de la categoría.
 * @param {Object} param0.categoryData - Los datos de la nueva categoría.
 * @param {string} param0.token - El token de autenticación del usuario.
 * @returns {Promise<Object>} La categoría creada.
 * @throws {Error} Si ocurre un error al crear la categoría.
 */
export const createCategoryAction = createAsyncThunk(
  "categories/createCategory",
  async ({ categoryData, token }, { rejectWithValue }) => {
    try {
      const response = await createCategory(categoryData, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear la categoría");
    }
  }
);

/**
 * Acción para actualizar una categoría existente.
 * 
 * @function
 * @async
 * @param {Object} param0 - Datos necesarios para actualizar la categoría.
 * @param {string} param0.categoryId - El ID de la categoría a actualizar.
 * @param {Object} param0.categoryData - Los nuevos datos de la categoría.
 * @param {string} param0.token - El token de autenticación del usuario.
 * @returns {Promise<Object>} La categoría actualizada.
 * @throws {Error} Si ocurre un error al actualizar la categoría.
 */
export const updateCategoryAction = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, categoryData, token }, { rejectWithValue }) => {
    try {
      const response = await updateCategory(categoryId, categoryData, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Error al actualizar la categoría");
    }
  }
);

/**
 * Acción para eliminar una categoría existente.
 * 
 * @function
 * @async
 * @param {Object} param0 - Datos necesarios para eliminar la categoría.
 * @param {string} param0.categoryId - El ID de la categoría a eliminar.
 * @param {string} param0.token - El token de autenticación del usuario.
 * @returns {Promise<string>} El ID de la categoría eliminada.
 * @throws {Error} Si ocurre un error al eliminar la categoría.
 */
export const deleteCategoryAction = createAsyncThunk(
  "categories/deleteCategory",
  async ({ categoryId, token }, { rejectWithValue }) => {
    try {
      await deleteCategory(categoryId, token);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.message || "Error al eliminar la categoría");
    }
  }
);