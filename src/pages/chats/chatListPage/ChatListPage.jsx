import { useNavigate } from "react-router-dom";
import { ChatList } from "./components/ChatList";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createChat } from "@/redux/chat/chatActions";
import { selectChats } from "@/redux/chat/chatSelectors";
import { useToast } from "@chakra-ui/react";
import { fetchAllUsers } from "@/redux/user/userActions";

export const ChatListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchAllUsers(token)); // Obtener lista de usuarios
    } else {
      console.error("Token no disponible");
    }
  }, [dispatch]);

  const allUsers = useSelector((state) => state.user.allUsers);
  const chats = useSelector(selectChats);
  const currentUserId = useSelector((state) => state.user.user?.id);

  const [newChatUserId, setNewChatUserId] = useState("");
  const [showInput, setShowInput] = useState(false);

  // Encontrar el mayor user.id de la lista de usuarios
  const maxUserId =
    allUsers.length > 0 ? Math.max(...allUsers.map((user) => user.id)) : 0;

  // Función para redireccionar a una conversación seleccionada
  const handleChatSelect = (chatId) => {
    navigate(`/chat/${chatId}`);
  };

  // Función para crear un nuevo chat
  const handleNewChat = () => {
    const targetUserId = parseInt(newChatUserId, 10);

    // Validar que el valor sea un número entero y mayor o igual a 1
    if (
      !newChatUserId ||
      isNaN(targetUserId) ||
      !Number.isInteger(targetUserId) ||
      targetUserId < 1
    ) {
      toast({
        title: "ID inválido",
        description:
          "Por favor, ingresa un ID numérico entero válido mayor o igual a 1.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (targetUserId === currentUserId) {
      toast({
        title: "Error",
        description: "No puedes crear un chat contigo mismo.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (targetUserId > maxUserId) {
      toast({
        title: "Usuario no encontrado",
        description: `No existe un usuario con el ID ${targetUserId}.`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    const chatExists = chats.some(
      (chat) =>
        chat.participants.includes(currentUserId) &&
        chat.participants.includes(targetUserId)
    );

    if (chatExists) {
      toast({
        title: "Chat existente",
        description: "Ya tienes un chat con este usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    // Despacha la acción para crear un chat
    dispatch(
      createChat({
        userId: currentUserId,
        otherUserId: targetUserId,
      })
    );

    setNewChatUserId("");
    setShowInput(false);

    toast({
      title: "Chat creado",
      description: "El nuevo chat ha sido creado exitosamente.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Encabezado */}
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Mensajes</h1>
          <div>
            {showInput ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newChatUserId}
                  onChange={(e) => setNewChatUserId(e.target.value)}
                  placeholder="ID usuario"
                  className="border rounded p-1 text-sm mr-2"
                />
                <button
                  onClick={handleNewChat}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
                >
                  Crear
                </button>
                <button
                  onClick={() => setShowInput(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowInput(true)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
              >
                Crear nuevo chat
              </button>
            )}
          </div>
        </div>

        {/* Lista de chats */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ChatList onChatSelect={handleChatSelect} />
        </div>
      </div>
    </div>
  );
};
