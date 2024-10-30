export const Textarea = ({ register, name, errors, label, textareaProps = {}, disabled = false }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block text-sm font-medium text-#[131211] text-left">{label}</label>}
      <textarea
        disabled={disabled}
        id={name}
        {...register(name, { required: `El ${label} es obligatorio!` })}
        {...textareaProps}
        className={`shadow-sm p-2 focus:border-[#DA1641] focus:ring-1 focus:ring-[#DA1641] outline-none block w-full sm:text-sm rounded-md min-h-[100px] max-h-[200px] border`}
      />
      {errors[name] && <p className="mt-2 text-sm text-red-600">{errors[name].message}</p>}
    </div>
  );
};