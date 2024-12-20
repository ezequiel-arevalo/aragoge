import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const InputPassword = ({
  register,
  name,
  errors,
  label,
  inputProps = {},
  disabled = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-#[131211] text-left"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          disabled={disabled}
          type={isPasswordVisible ? "text" : "password"}
          id={name}
          {...register(name, { required: `¡${label} es obligatorio!` })}
          {...inputProps}
          className="shadow-sm block w-full p-2 sm:text-sm border rounded-md focus:border-[#DA1641] focus:ring-1 focus:ring-[#DA1641] outline-none"
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-center no-global-styles no-styles-global"
          aria-label={
            isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
          }
        >
          {isPasswordVisible ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600 text-left flex flex-start">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};
