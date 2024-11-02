import { useForm } from 'react-hook-form';
import { Input } from '@/components/form/Input';
import { InputPassword } from '@/components/form/InputPassword';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const RegisterForm = ({title, subtitle}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { register: registerUser } = useAuth();

  const onSubmit = (data) => {
    registerUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    }, reset);
  };

  return (
  <div className="w-full max-w-md">
    <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
    <p className="text-text-primary mb-6">{subtitle}</p>
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-l">
      {/* Input de Nombre */}
      <Input
        name="first_name"
        label="Nombre"
        type="text"
        register={register}
        errors={errors}
      />

      {/* Input de Apellido */}
      <Input
        name="last_name"
        label="Apellido"
        type="text"
        register={register}
        errors={errors}
      />

      {/* Input de Email */}
      <Input
        name="email"
        label="Email"
        type="email"
        register={register}
        errors={errors}
      />

      {/* Input de Contraseña */}
      <InputPassword
        name="password"
        label="Contraseña"
        register={register}
        errors={errors}
      />

      <button
        type="submit"
        className="w-full mt-4 bg-button-default-bg text-button-default-text hover:bg-button-hover-bg hover:text-button-hover-text active:bg-button-active-bg active:text-button-active-text py-2 px-4 rounded"
      >
        Registrarse
      </button>

      <Link
        to={"/login"}
        className="cursor-pointer mt-4 text-sm block hover:underline mx-auto text-center"
      >
        ¿Tienes cuenta? Accede desde aquí
      </Link>
    </form>
  </div>
  );
};
