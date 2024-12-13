import { motion } from "framer-motion";
import { User, Calendar, DollarSign, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSubscription } from "@/redux/subscription/subscriptionActions";
import {
  selectSubscriptionStatus,
  selectSubscriptionError,
} from "@/redux/subscription/subscriptionSelectors";
import { useToast } from "@chakra-ui/react";
const URL = import.meta.env.VITE_API_KEY;

export const PlanningHero = ({ planning }) => {
  const dispatch = useDispatch();
  const subscriptionStatus = useSelector(selectSubscriptionStatus);
  const subscriptionError = useSelector(selectSubscriptionError);
  const accessToken = useSelector((state) => state.user.accessToken);
  const toast = useToast();

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
        description: subscriptionError || "Hubo un problema al procesar la suscripción.",
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
      className="w-full bg-gradient-to-r from-primary to-secondary text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Imagen responsiva */}
          <div className="relative aspect-w-16 aspect-h-9">
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

          {/* Contenido del plan */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-sm font-semibold mb-2 bg-white/20 inline-block px-3 py-1 rounded">
                Planificación #{planning.id}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {planning.title}
              </h2>
              <p className="text-lg sm:text-xl mb-6 text-white/80">
                {planning.synopsis}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-white hover:text-white font-bold">
                  <User className="h-5 w-5 mr-2" />
                  <Link
                    to={`/profile/public/${planning.user_id}`}
                    className="hover:underline text-white hover:text-white font-bold"
                  >
                    {planning.professional_name}
                  </Link>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span className=" text-white hover:text-white font-bold">
                    {new Date(planning.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-5 w-5 mr-2" />
                  <span className=" text-white hover:text-white font-bold">{planning.category_name}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <span className="text-4xl font-bold mb-4 sm:mb-0 text-white hover:text-white font-bold">
                  <DollarSign className="inline-block h-8 w-8 mr-1" />
                  {planning.price.toFixed(2)}
                </span>
                {accessToken ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubscribe}
                    disabled={subscriptionStatus === "subscribing"}
                    className={`px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg ${subscriptionStatus === "subscribing"
                      ? "bg-gray-400"
                      : "bg-white text-[#da1641] hover:bg-white hover:text-[#C30D35]"
                      }`}
                  >
                    {subscriptionStatus === "subscribing"
                      ? "Subscribiendo..."
                      : "Subscribirse"}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                    className="bg-white text-[#C30D35] px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg"
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