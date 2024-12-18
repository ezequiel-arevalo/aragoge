import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "@/hooks/useChat";
import { selectChats } from "@/redux/chat/chatSelectors";
import { selectUser, selectUserDetails } from "@/redux/user/userSelectors";
import { sortChatsByLatestMessage } from "@/utilities/chatHelpers";
import { fetchUserDetails } from "@/redux/user/userActions";
import { ChatPreview } from "./ChatPreview";
import { MessageSquare } from "lucide-react";

/**
 * Componente ChatList
 * Muestra una lista de chats disponibles, ordenada por el mensaje más reciente.
 */
export const ChatList = ({ onChatSelect }) => {
  const dispatch = useDispatch();
  const chats = useSelector(selectChats); // Obtiene los chats del estado
  const currentUser = useSelector(selectUser); // Obtiene el usuario actual
  const userDetails = useSelector(selectUserDetails); // Detalles de los usuarios

  // Hook personalizado que puede tener funcionalidades adicionales
  useChat();

  // Efecto para cargar los detalles del otro usuario si no están disponibles
  useEffect(() => {
    chats.forEach((chat) => {
      // Encuentra el ID del otro usuario en el chat
      const otherUserId = chat.participants.find((id) => id !== currentUser.id);

      // Si el otro usuario no tiene detalles, los carga
      if (otherUserId && !userDetails[otherUserId]) {
        dispatch(
          fetchUserDetails({ userId: otherUserId, token: currentUser.token })
        );
      }
    });
  }, [chats, userDetails, currentUser, dispatch]);

  // Ordena los chats por el mensaje más reciente
  const sortedChats = sortChatsByLatestMessage(chats);

  return (
    <div className="w-full bg-white flex flex-col max-h-[710px]">
      <div className="flex-1 overflow-y-auto">
        {sortedChats.length > 0 ? (
          // Mapea los chats ordenados y genera un ChatPreview para cada uno
          sortedChats.map((chat) => (
            <ChatPreview
              key={chat.id}
              chat={chat}
              currentUser={currentUser}
              userDetails={userDetails}
              onSelect={onChatSelect} // Pasar el callback de selección de chat
            />
          ))
        ) : (
          // Si no hay chats disponibles, muestra un mensaje
          <div className="flex flex-col items-center justify-center min-h-[600px] text-gray-500">
            <MessageSquare className="w-12 h-12 text-gray-400 mb-2" />
            <p>No hay chats disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};
