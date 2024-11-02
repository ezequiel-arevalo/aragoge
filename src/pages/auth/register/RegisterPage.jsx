import { RegisterForm } from "./components/RegisterForm";
import { motion } from 'framer-motion';
import { Box, Flex, Image } from "@chakra-ui/react";
const MotionBox = motion(Box);

export const RegisterPage = () => {
  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" className="bg-gradient-to-br from-bg-primary to-bg-secondary">
      <Box
        borderWidth={1}
        width="full"
        maxWidth="1000px"
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
        className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg"
      >
        <Flex direction={{ base: 'column', md: 'row' }}>
          {/* Sección Izquierda con Imagen */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            flex={1}
          >
            <Image
              src="./src/pages/auth/register/components/aragoge.svg"
              alt="Register illustration"
              objectFit="cover"
              height="full"
              width="full"
            />
          </MotionBox>

          {/* Sección Derecha con Formulario de Registro */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            flex={1}
            p={8}
            textAlign="center"
          >
            <RegisterForm 
              title="Únete a Nosotros"
              subtitle="¡Crea tu cuenta para comenzar!"
            />
          </MotionBox>
        </Flex>
      </Box>
    </Flex>
  );
};