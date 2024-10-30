export const CategoryFilter = ({ categories, onCategoryChange }) => {
  const handleChange = (e) => {
    const value = e.target.value === 'all' ? null : e.target.value;
    onCategoryChange(value);
  };

  return (
    <div className="w-full max-w-sm">
      <select
        onChange={handleChange}
        className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        defaultValue=""
      >
        <option value="" disabled>
          Selecciona una categoría
        </option>
        <option value="all">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};