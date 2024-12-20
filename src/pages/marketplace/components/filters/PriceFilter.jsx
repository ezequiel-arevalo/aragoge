import { useState } from "react";

export const PriceFilter = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || parseFloat(value) >= 0) {
      setMinPrice(value);
      if (value !== "" && parseFloat(value) > parseFloat(maxPrice)) {
        setMaxPrice(""); // Limpiar maxPrice si minPrice supera el maxPrice
      }
      handlePriceChange(value, maxPrice);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || parseFloat(value) >= 0) {
      setMaxPrice(value);
      if (value !== "" && parseFloat(value) < parseFloat(minPrice)) {
        setMinPrice(""); // Limpiar minPrice si maxPrice es menor que minPrice
      }
      handlePriceChange(minPrice, value);
    }
  };

  const handlePriceChange = (min, max) => {
    if (min !== "" && max !== "" && parseFloat(min) <= parseFloat(max)) {
      onPriceChange({ minPrice: min, maxPrice: max });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Input para precio mínimo */}
      <input
        type="number"
        placeholder="Precio mínimo"
        value={minPrice}
        onChange={handleMinPriceChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#da1641]"
      />

      {/* Input para precio máximo */}
      <input
        type="number"
        placeholder="Precio máximo"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#da1641]"
      />
    </div>
  );
};
