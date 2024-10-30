export const Input = ({ register, name, errors, label, type = 'text', inputProps = {}, disabled = false }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block text-sm font-medium text-#[131211] text-left">{label}</label>}
      <input
        disabled={disabled}
        type={type}
        id={name}
        {...register(name, { required: `${label} es obligatorio!` })}
        {...inputProps}
        className="shadow-sm block w-full p-2 sm:text-sm border rounded-md focus:border-[#DA1641] focus:ring-1 focus:ring-[#DA1641] outline-none"
      />
      {errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>}
    </div>
  );
};