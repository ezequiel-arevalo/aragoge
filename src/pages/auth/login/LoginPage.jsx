// LoginPage.js
import { LoginForm } from "./components/LoginForm";
import { motion } from 'framer-motion';
import { Box, Flex, Image } from "@chakra-ui/react";
const MotionBox = motion(Box);

export const LoginPage = () => {
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
          {/* Left Section with Image */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            flex={1}
          >
            <Image
              src="./src/pages/auth/login/components/aragoge.svg"
              alt="Login illustration"
              objectFit="cover"
              height="full"
              width="full"
            />
          </MotionBox>

          {/* Right Section with Login Form */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            flex={1}
            p={8}
            textAlign="center"
          >
            <LoginForm 
              title="Bienvenido de Nuevo"
              subtitle="¡Estamos emocionados de verte de nuevo!"
            />
          </MotionBox>
        </Flex>
      </Box>
    </Flex>
  );
};
