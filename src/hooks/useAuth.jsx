import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { loginUserAction, registerNewUser } from '@/redux/user/userActions';

const useAuth = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  // Función para manejar el login
  const login = async (userData, resetForm) => {
    try {
      const response = await dispatch(loginUserAction(userData)).unwrap();

      if (response.access_token) {
        toast({
          title: 'Inicio de sesión exitoso.',
          description: 'Has iniciado sesión correctamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });

        resetForm(); // Resetea el formulario después del login
        navigate('/'); // Redirige a la página de inicio
      }
    } catch (err) {
      const errorMessage = err.message || 'Hubo un problema con el inicio de sesión'; // Asegura que el mensaje sea legible

      // Mostrar el mensaje de error en un toast
      toast({
        title: 'Error al iniciar sesión',
        description: errorMessage, // El mensaje de error
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  // Función para manejar el registro
  const register = async (userData, resetForm) => {
    try {
      const response = await dispatch(registerNewUser(userData)).unwrap();

      if (!response.error) {
        toast({
          title: 'Registro exitoso.',
          description: 'Te has registrado correctamente.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
        });

        resetForm(); // Resetea el formulario después del registro
        navigate('/login'); // Redirige al login
      }
    } catch (err) {
      toast({
        title: 'Error al registrarse',
        description: err, // El mensaje de error
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return { login, register };
};

export default useAuth;