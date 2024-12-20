import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { fetchPlanningSubscriptions } from "@/redux/plannings/planningsThunks";
import { fetchUserDetails } from "@/redux/user/userActions";
import { selectUserDetails } from "@/redux/user/userSelectors";
import { createChat } from "@/redux/chat/chatActions";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const SubscriptionsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const { subscriptions, subscriptionsLoading, subscriptionsError } =
    useSelector((state) => state.plannings);

  const userDetails = useSelector(selectUserDetails);
  const currentUserId = useSelector((state) => state.user.user?.id);
  const chats = useSelector((state) => state.chat.chats);
  const [newChatUserId, setNewChatUserId] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlanningSubscriptions(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (subscriptions.length > 0) {
      subscriptions.forEach((subscription) => {
        if (!userDetails[subscription.user_id]) {
          dispatch(fetchUserDetails({ userId: subscription.user_id }));
        }
      });
    }
  }, [subscriptions, dispatch, userDetails]);

  useEffect(() => {
    if (newChatUserId) {
      const chat = chats.find(
        (chat) =>
          chat.participants.includes(currentUserId) &&
          chat.participants.includes(newChatUserId)
      );

      if (chat) {
        navigate(`/chat/${chat.id}`);
        setNewChatUserId(null);
      }
    }
  }, [chats, currentUserId, newChatUserId, navigate]);

  const handleCreateChat = (targetUserId) => {
    const existingChat = chats.find(
      (chat) =>
        chat.participants.includes(currentUserId) &&
        chat.participants.includes(targetUserId)
    );

    if (existingChat) {
      navigate(`/chat/${existingChat.id}`);
      return;
    }

    dispatch(
      createChat({
        userId: currentUserId,
        otherUserId: targetUserId,
      })
    );

    setNewChatUserId(targetUserId);

    toast({
      title: "Chat creado",
      description: "El nuevo chat está siendo creado.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  if (subscriptionsLoading) {
    return <Loader />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/professional"
        className="text-secondary hover:text-secondary underline flex items-center mb-6"
        aria-label="Volver al panel"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver al panel
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Encabezado de la tabla */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">
            Suscripciones de la planificación
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Consulta y gestiona todas las suscripciones asociadas a esta
            planificación.
          </p>
        </div>
        {/* Tabla de suscripciones */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Suscripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Expiración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscriptions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No hay suscripciones aún
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((subscription) => {
                    const user = userDetails[subscription.user_id] || {};
                    return (
                      <tr key={subscription.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {subscription.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(
                            subscription.subscription_date
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(
                            subscription.expiration_date
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              subscription.is_active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {subscription.is_active ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#DA1641] hover:text-[#C30D35]">
                          {user.first_name ? (
                            <button
                              onClick={() =>
                                handleCreateChat(subscription.user_id)
                              }
                              className="text-[#DA1641] hover:text-[#C30D35] underline no-global-styles no-styles-global"
                            >
                              {user.first_name} {user.last_name}
                            </button>
                          ) : (
                            <span>Cargando...</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
