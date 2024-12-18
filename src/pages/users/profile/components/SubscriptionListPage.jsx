import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionsByUserId } from "@/redux/subscription/subscriptionActions";
import {
  selectAllSubscriptions,
  selectSubscriptionLoading,
} from "@/redux/subscription/subscriptionSelectors";
import { Link } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { HeroSection } from "@/components/ui/HeroSection";
import Loader from "@/components/Loader";

export const SubscriptionListPage = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector(selectAllSubscriptions) || [];
  const loading = useSelector(selectSubscriptionLoading);

  // Extraer el userId desde el localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(getSubscriptionsByUserId(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeroSection
        title="Lista de Suscripciones"
        description="Consulta y gestiona tus suscripciones activas e históricas"
        showInput={false}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/profile"
            className="bg-[#da1641] text-white no-global-styles no-styles-global px-6 py-2 rounded-full hover:text-white hover:bg-[#c30d35] transition duration-300 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al perfil
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800">
              Mis Suscripciones
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Gestiona tus suscripciones activas e históricas
            </p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Planificación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha de Suscripción
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiración
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Último Pago
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.length > 0 ? (
                    subscriptions.map((sub, index) => (
                      // Uso de `sub.id` como clave única
                      <tr key={sub.id || `subscription-${index}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sub.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Link
                            to={`/planning/${sub.planning_id}`}
                            className="hover px-1 text-[#DA1641] underline"
                          >
                            {sub.planning_id}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(sub.created_at).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(sub.expiration_date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {sub.is_active ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              <CheckCircle className="w-4 h-4 mr-1" /> Activa
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              <XCircle className="w-4 h-4 mr-1" /> Inactiva
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sub.payments && sub.payments.length > 0 && (
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                              {sub.payments[0].amount} -{" "}
                              {sub.payments[0].payment_method}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              to={`/subscriptions/${sub.id}`}
                              className="text-[#DA1641] underline"
                            >
                              Ver Detalles
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No hay suscripciones aún.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
