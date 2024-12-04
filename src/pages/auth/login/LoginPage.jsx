import { LoginForm } from "./components/LoginForm";
import { ImageSection } from "./components/ImageSection";
import { motion } from "framer-motion";

/**
 * Página de inicio de sesión
 * Contiene una sección de imagen y un formulario de inicio de sesión animado.
 */
export const LoginPage = () => {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-bg-primary to-bg-secondary"
    >
      <div
        className="w-full max-w-4xl border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg"
      >
        <div className="flex flex-col md:flex-row">
          {/* Sección izquierda con imagen */}
          <ImageSection />

          {/* Sección derecha con formulario de inicio de sesión */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-8 h-[700px] text-center"
          >
            <LoginForm
              title="Bienvenido de Nuevo"
              subtitle="¡Estamos emocionados de verte de nuevo!"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};