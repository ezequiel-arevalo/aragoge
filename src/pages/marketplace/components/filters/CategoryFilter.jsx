export const CategoryFilter = ({ categories, onCategoryChange }) => {
  const handleChange = (e) => {
    const value = e.target.value === "all" ? null : e.target.value;
    onCategoryChange(value);
  };

  return (
    <div className="w-full max-w-sm">
      <label htmlFor="category-select" className="sr-only">
        Selecciona una categoría
      </label>
      <select
        id="category-select"
        onChange={handleChange}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        defaultValue=""
      >
        {/* Opción predeterminada */}
        <option value="" disabled>
          Selecciona una categoría
        </option>

        {/* Opción para todas las categorías */}
        <option value="all">Todas las categorías</option>

        {/* Mapeo de las categorías */}
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
