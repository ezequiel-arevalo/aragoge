import { LoginForm } from "./components/LoginForm";
import { motion } from 'framer-motion';
import { Box } from "@chakra-ui/react";

const MotionBox = motion.create(Box);

export const LoginPage = () => {
  return (
    <section className="mx-auto text-center p-4">
      <h2 className="text-h2 font-title font-semibold py-4">Login Page</h2>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <LoginForm />
      </MotionBox>
    </section>
  );
};