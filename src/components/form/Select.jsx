export const Select = ({ register, name, errors, label, options = [], disabled = false }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-[#131211] text-left">
          {label}
        </label>
      )}
      <select
        id={name}
        disabled={disabled}
        {...register(name, { required: `${label} es obligatorio!` })}
        className="shadow-sm block w-full p-2 sm:text-sm border rounded-md focus:border-[#DA1641] focus:ring-1 focus:ring-[#DA1641] outline-none"
      >
        <option value="">Seleccione una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>}
    </div>
  );
};
