import { motion } from "framer-motion";
import { User, Calendar, DollarSign, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSubscription } from "@/redux/subscription/SubscriptionActions";
import {
  selectSubscriptionStatus,
  selectSubscriptionError,
} from "@/redux/subscription/SubscriptionSelectors";
import { useToast } from "@chakra-ui/react";

const URL = import.meta.env.VITE_API_KEY;

export const PlanningHero = ({ planning }) => {
  const dispatch = useDispatch();
  const subscriptionStatus = useSelector(selectSubscriptionStatus);
  const subscriptionError = useSelector(selectSubscriptionError);
  const accessToken = useSelector((state) => state.user.accessToken);
  const toast = useToast();

  // Maneja la suscripción del usuario al plan
  const handleSubscribe = async () => {
    if (!accessToken) {
      toast({
        title: "Inicio de sesión requerido",
        description: "Por favor, inicia sesión para poder suscribirte.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    const resultAction = await dispatch(
      createSubscription({ planningId: planning.id, token: accessToken })
    );

    if (createSubscription.fulfilled.match(resultAction)) {
      toast({
        title: "Suscripción exitosa",
        description: "Te has suscrito correctamente al plan.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    } else if (createSubscription.rejected.match(resultAction)) {
      toast({
        title: "Error al suscribirse",
        description:
          subscriptionError || "Hubo un problema al procesar la suscripción.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-primary text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Imagen del plan */}
          <div className="relative aspect-[4/3]">
            <img
              src={
                planning.image_id
                  ? `${URL}/plannings/${planning.id}/image`
                  : "./default-aragoge.jpg"
              }
              alt={planning.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Detalles del plan */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-sm font-semibold mb-2 bg-white/30 inline-block px-3 py-1 rounded">
                Planificación #{planning.id}
              </div>
              <h2 className="text-h2 font-bold mb-4">{planning.title}</h2>
              <p className="text-p mb-6 text-white">{planning.synopsis}</p>

              {/* Información adicional del plan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-white hover:text-white font-bold">
                  <User className="h-5 w-5 mr-2" />
                  <Link
                    to={`/profile/public/${planning.user_id}`}
                    className="underline text-white hover:text-white"
                  >
                    {planning.professional_name}
                  </Link>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className="text-white hover:text-white font-bold">
                    {new Date(planning.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  <span className="text-white hover:text-white font-bold">
                    {planning.category_name}
                  </span>
                </div>
              </div>

              {/* Precio y botón de suscripción */}
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <span className="text-4xl font-bold mb-4 sm:mb-0 text-white hover:text-white">
                  <DollarSign className="inline-block h-8 w-8 mr-1" />
                  {planning.price.toFixed(2)}
                </span>

                {accessToken ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubscribe}
                    disabled={subscriptionStatus === "subscribing"}
                    className={`px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg ${
                      subscriptionStatus === "subscribing"
                        ? "bg-gray-400"
                        : "bg-white text-[#da1641] hover:bg-white hover:text-[#C30D35]"
                    }`}
                  >
                    {subscriptionStatus === "subscribing"
                      ? "Suscribiendo..."
                      : "Suscribirse"}
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() =>
                      toast({
                        title: "Inicio de sesión requerido",
                        description: "Debes iniciar sesión para suscribirte.",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom-right",
                      })
                    }
                    className="bg-white hover:bg-white hover:text-[#C30D35] text-primary px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg"
                  >
                    Debes estar logueado
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
