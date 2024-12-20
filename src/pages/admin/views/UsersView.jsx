import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/redux/user/userActions";
import { createChat } from "@/redux/chat/chatActions";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import Loader from "@/components/Loader";
import { ArrowLeft } from "lucide-react";

export const UsersView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { allUsers, loading } = useSelector((state) => state.user);
  const chats = useSelector((state) => state.chat.chats); // Chats existentes
  const currentUserId = useSelector((state) => state.user.user?.id); // ID del usuario actual
  const [newChatUserId, setNewChatUserId] = useState(null); // Almacenar el usuario objetivo temporalmente

  useEffect(() => {
    // Obtener todos los usuarios al cargar el componente
    dispatch(fetchAllUsers(localStorage.getItem("accessToken")));
  }, [dispatch]);

  useEffect(() => {
    // Redirigir al nuevo chat cuando se haya creado
    if (newChatUserId) {
      const chat = chats.find(
        (chat) =>
          chat.participants.includes(currentUserId) &&
          chat.participants.includes(newChatUserId)
      );

      if (chat) {
        navigate(`/chats`); // Redirige al ID del chat
        setNewChatUserId(null); // Limpia el estado después de redirigir
      }
    }
  }, [chats, currentUserId, newChatUserId, navigate]);

  const handleCreateChat = (targetUserId) => {
    // Verificar si el usuario intenta chatear consigo mismo
    if (currentUserId === targetUserId) {
      toast({
        title: "Error",
        description: "No puedes iniciar un chat contigo mismo.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    // Verificar si el chat ya existe
    const existingChat = chats.find(
      (chat) =>
        chat.participants.includes(currentUserId) &&
        chat.participants.includes(targetUserId)
    );

    if (existingChat) {
      navigate(`/chat/${existingChat.id}`); // Redirige al chat existente
      return;
    }

    // Crear el chat
    dispatch(
      createChat({
        userId: currentUserId,
        otherUserId: targetUserId,
      })
    );

    setNewChatUserId(targetUserId); // Almacena temporalmente el ID del usuario objetivo

    toast({
      title: "Chat creado",
      description: "El nuevo chat está siendo creado.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  if (loading) {
    return <Loader />;
  }

  // Filtrar usuarios con rol 'admin' o 'atlete'
  const filteredUsers = allUsers.filter(
    (user) => user.rol_name === "admin" || user.rol_name === "atlete"
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/admin"
        className="text-secondary hover:text-secondary underline flex items-center mb-6"
        aria-label="Volver al panel"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Volver al panel
      </Link>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">
            Lista de usuarios
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Consulta y gestiona todos los usuarios registrados en la plataforma.
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
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium ${
                            user.rol_name === "admin"
                              ? "bg-green-500 text-white hover:text-white"
                              : user.rol_name === "atlete"
                              ? "bg-red-500 text-white hover:text-white"
                              : ""
                          }`}
                        >
                          {user.rol_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/profile/public/${user.id}`}
                            className="text-[#DA1641] underline hover:text-[#C30D35] no-global-styles no-styles-global"
                          >
                            Ver perfil
                          </Link>
                          <button
                            onClick={() => handleCreateChat(user.id)}
                            className="text-white hover:text-white bg-[#DA1641] hover:bg-[#C30D35] px-2"
                          >
                            Hablar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No hay usuarios registrados con los roles seleccionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
