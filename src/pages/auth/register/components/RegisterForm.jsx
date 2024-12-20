import { useForm } from "react-hook-form";
import { Input } from "@/components/form/Input";
import { InputPassword } from "@/components/form/InputPassword";
import { Select } from "@/components/form/Select";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export const RegisterForm = ({ title, subtitle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { register: registerUser } = useAuth();

  const onSubmit = (data) => {
    registerUser(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        rol_id: data.rol_id,
      },
      reset
    );
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-h1 font-title text-primary mb-2">{title}</h2>
      <p className="text-p font-text text-text-primary mb-6">{subtitle}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input de nombre */}
        <Input
          name="first_name"
          label="Nombre"
          type="text"
          register={register}
          errors={errors}
          inputProps={{
            className:
              "mb-4 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary",
          }}
        />

        {/* Input de apellido */}
        <Input
          name="last_name"
          label="Apellido"
          type="text"
          register={register}
          errors={errors}
          inputProps={{
            className:
              "mb-4 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary",
          }}
        />

        {/* Input de correo electrónico */}
        <Input
          name="email"
          label="Correo electrónico"
          type="email"
          register={register}
          errors={errors}
          inputProps={{
            className:
              "mb-4 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary",
          }}
        />

        {/* Input de contraseña */}
        <InputPassword
          name="password"
          label="Contraseña"
          register={register}
          errors={errors}
          inputProps={{
            className:
              "mb-6 border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary",
          }}
        />

        {/* Select para rol */}
        <Select
          name="rol_id"
          label="Selecciona tu rol"
          register={register}
          errors={errors}
          options={[
            { value: "2", label: "Atleta" },
            { value: "3", label: "Profesional" },
          ]}
        />

        <button
          type="submit"
          className="w-full mt-4 bg-primary text-white hover:bg-secondary transition-colors duration-300 py-2 px-4 rounded-md font-semibold"
        >
          Registrarse
        </button>

        <Link
          to={"/login"}
          className="cursor-pointer mt-4 text-sm block font-text text-text-hover hover:underline text-center"
        >
          ¿Tienes cuenta? Accede desde aquí.
        </Link>
      </form>
    </div>
  );
};
