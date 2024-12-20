import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubscriptionById,
  cancelSubscription,
  renewSubscriptionThunk,
} from "@/redux/subscription/subscriptionActions";
import {
  selectCurrentSubscription,
  selectSubscriptionLoading,
  selectSubscriptionError,
} from "@/redux/subscription/subscriptionSelectors";
import { ButtonMP } from "@/components/mp/ButtonMP";
import {
  Calendar,
  Tag,
  ArrowLeft,
  RefreshCw,
  X,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { HeroSection } from "@/components/ui/HeroSection";
import Loader from "@/components/Loader";
import { useToast } from "@chakra-ui/react";

export const SubscriptionDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // Obtener datos de la suscripción y estado global
  const subscription = useSelector(selectCurrentSubscription);
  const loading = useSelector(selectSubscriptionLoading);
  const subscriptionError = useSelector(selectSubscriptionError);
  const accessToken = useSelector((state) => state.user.accessToken);

  // Efecto para cargar la suscripción por ID
  useEffect(() => {
    if (id) {
      dispatch(getSubscriptionById({ subscriptionId: id, token: accessToken }));
    }
  }, [dispatch, id, accessToken]);

  // Manejar la renovación de la suscripción
  const handleRenew = async () => {
    if (subscription && subscription.planning_id) {
      try {
        const response = await dispatch(
          renewSubscriptionThunk({
            planningId: subscription.planning_id,
            token: accessToken,
          })
        ).unwrap();

        toast({
          title: "Suscripción renovada",
          description: "La suscripción ha sido renovada correctamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });

        // Actualizar página o redirigir
        navigate("/subscriptions");
      } catch (error) {
        toast({
          title: "Error al renovar la suscripción",
          description:
            subscriptionError || "Hubo un problema al renovar la suscripción.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  };

  // Manejar la cancelación de la suscripción
  const handleCancel = async () => {
    if (subscription) {
      if (!subscription.is_active) {
        toast({
          title: "Suscripción ya cancelada",
          description: "Esta suscripción ya se encuentra cancelada.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }

      if (subscription.planning_id) {
        try {
          const response = await dispatch(
            cancelSubscription({
              planningId: subscription.planning_id,
              token: accessToken,
            })
          ).unwrap();

          toast({
            title: "Suscripción cancelada",
            description: "La suscripción ha sido cancelada correctamente.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });

          navigate("/subscriptions");
        } catch (error) {
          toast({
            title: "Error al cancelar la suscripción",
            description:
              subscriptionError ||
              "Hubo un problema al cancelar la suscripción.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      }
    }
  };

  // Renderizar cargador si está cargando
  if (loading) {
    return <Loader />;
  }

  // Mostrar mensaje si no hay suscripción
  if (!subscription) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-sm rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Suscripción no encontrada
        </h2>
        <p className="text-gray-600 mb-6">
          No se encontró la suscripción con ID: {id}
        </p>
        <Link
          to="/subscriptions"
          className="px-6 py-2 rounded-full transition duration-300 flex items-center text-white hover:text-white bg-primary hover:bg-secondary"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a suscripciones
        </Link>
      </div>
    );
  }

  return (
    <>
      <HeroSection
        title="Detalles de suscripción"
        description="Información y gestión de tu suscripción"
        showInput={false}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/subscriptions"
            className="px-6 py-2 rounded-full transition duration-300 flex items-center text-white hover:text-white bg-primary hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a suscripciones
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-800">
              Suscripción #{subscription.id}
            </h1>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información de fechas */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Fecha de suscripción</p>
                    <p className="text-sm text-gray-500">
                      {new Date(
                        subscription.subscription_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Fecha de expiración</p>
                    <p className="text-sm text-gray-500">
                      {new Date(
                        subscription.expiration_date
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Creado él</p>
                    <p className="text-sm text-gray-500">
                      {new Date(subscription.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Actualizado él</p>
                    <p className="text-sm text-gray-500">
                      {subscription.updated_at
                        ? new Date(subscription.updated_at).toLocaleString()
                        : "No actualizado"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Estado y planificación */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  {subscription.is_active ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Estado</p>
                    <p className="text-sm text-gray-500">
                      {subscription.is_active ? "Activa" : "Inactiva"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">Planificación</p>
                    <p className="text-sm text-gray-500">
                      ID:
                      <Link
                        to={`/planning/${subscription.planning_id}`}
                        className="px-1 text-[#DA1641] underline"
                      >
                        {subscription.planning_id}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Información de Pago
              </h2>
              {subscription.payments && subscription.payments.length > 0 ? (
                subscription.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="p-4 bg-gray-50 rounded-md mb-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-gray-700">
                        <p className="text-sm font-medium">Monto</p>
                        <p className="text-sm">${payment.total_price}</p>
                      </div>
                      <div className="text-gray-700">
                        <p className="text-sm font-medium">Fecha</p>
                        <p className="text-sm">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-gray-700 mt-2">
                        <p className="text-sm font-medium">Estado</p>
                        <p className="text-sm">{payment.payment_status}</p>
                      </div>
                      {payment.payment_status === "pendiente" && (
                        <div className="text-gray-700 mt-2">
                          <p className="text-sm font-medium">Pago</p>
                          <ButtonMP
                            planningId={subscription.planning_id}
                            paymentId={payment.id}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No hay pagos registrados.
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex space-x-4 pt-6">
              <button
                className="flex-1 px-4 py-2 bg-[#da1641] text-white rounded-lg hover:bg-[#c30d35] flex items-center justify-center"
                onClick={handleRenew}
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Renovar
              </button>
              <button
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800 flex items-center justify-center"
                onClick={handleCancel}
                disabled={loading}
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
