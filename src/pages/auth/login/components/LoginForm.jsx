import { useForm } from 'react-hook-form';
import { Input } from '@/components/form/Input';
import { InputPassword } from '@/components/form/InputPassword';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

export const LoginForm = ({ title, subtitle }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { login } = useAuth();
  
  const onSubmit = (data) => {
    login(data, reset);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-text-primary mb-6">{subtitle}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg"
      >
        <Input
          name="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          className="mb-4"
        />

        <InputPassword
          name="password"
          label="Contraseña"
          register={register}
          errors={errors}
          className="mb-6"
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
            className="text-sm text-primary hover:text-secondary transition-colors duration-300"
          >
            ¿No tienes cuenta? Regístrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
};