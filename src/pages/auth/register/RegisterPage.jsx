import { RegisterForm } from "./components/RegisterForm";
import { ImageSection } from "./components/ImageSection";
import { motion } from 'framer-motion';
import { Box, Flex } from "@chakra-ui/react";
const MotionBox = motion(Box);

export const RegisterPage = () => {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      className="bg-gradient-to-br from-bg-primary to-bg-secondary"
    >
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
          {/* Encabezado principal */}
          <h1 className="sr-only">Página de Registro</h1>

          {/* Sección Izquierda con Imagen */}
          <ImageSection
            src="/aragoge.svg"  // Asegúrate de que esta imagen esté en la carpeta public
            alt="Register illustration"
          />

          {/* Sección Derecha con Formulario de Registro */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            flex={1}
            p={8}
            height={700}
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