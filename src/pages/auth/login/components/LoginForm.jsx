import { useForm } from "react-hook-form";
import { Input } from "@/components/form/Input";
import { InputPassword } from "@/components/form/InputPassword";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

/**
 * Formulario de inicio de sesión
 * Permite al usuario iniciar sesión con correo electrónico y contraseña.
 * 
 * @param {string} title - Título del formulario.
 * @param {string} subtitle - Subtítulo descriptivo.
 */
export const LoginForm = ({ title, subtitle }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data, reset);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-h1 font-title text-primary mb-2">{title}</h2>
      <p className="text-p font-text text-text-primary mb-6">{subtitle}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <Input
          name="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          inputProps={{
            className: "mb-4 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary",
          }}
        />

        <InputPassword
          name="password"
          label="Contraseña"
          register={register}
          errors={errors}
          inputProps={{
            className: "mb-6 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary",
          }}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white hover:bg-secondary transition-colors duration-300 py-2 px-4 rounded-md font-semibold"
        >
          Iniciar Sesión
        </button>

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm font-text text-text-hover hover:underline"
          >
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
};