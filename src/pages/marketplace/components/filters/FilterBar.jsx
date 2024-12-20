import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { useSelector } from "react-redux";

export const FilterBar = ({ onFiltersApply }) => {
  const categories = useSelector((state) => state.plannings.categories);

  // Estados locales para manejar los valores de los filtros
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });

  const handleApplyFilters = () => {
    // Enviar los filtros al componente padre
    onFiltersApply({
      selectedCategory,
      priceRange,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-h2 font-title font-bold mb-4">Filtros</h2>

      {/* Filtro de categoría */}
      <div className="mb-4">
        <CategoryFilter
          categories={categories}
          onCategoryChange={(category) => setSelectedCategory(category)}
        />
      </div>

      {/* Filtro de precio */}
      <div className="mb-4">
        <PriceFilter onPriceChange={(range) => setPriceRange(range)} />
      </div>

      {/* Botón para aplicar todos los filtros */}
      <button
        onClick={handleApplyFilters}
        className="w-full bg-[#da1641] hover:bg-[#C30D35] text-white py-2 rounded-md text-center transition-colors duration-300"
      >
        Aplicar filtros
      </button>
    </div>
  );
};
