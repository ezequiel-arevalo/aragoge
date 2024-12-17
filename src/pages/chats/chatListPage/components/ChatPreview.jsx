import { MessageSquare } from "lucide-react";
import { formatChatTimestamp } from "@/utilities/chatHelpers";

/**
 * Componente ChatPreview
 * Muestra la vista previa de un chat, incluyendo el último mensaje, la hora y el estado en línea del usuario.
 */
export const ChatPreview = ({ chat, currentUser, userDetails, onSelect }) => {
  // Encuentra el ID del otro usuario en el chat
  const otherUserId = chat.participants.find((id) => id !== currentUser.id);
  // Obtiene los detalles del otro usuario, si están disponibles
  const otherUser = userDetails[otherUserId] || {};
  // Obtiene el último mensaje del chat o un mensaje predeterminado
  const lastMessage = chat.lastMessage || "No hay mensajes";
  // Formatea la hora del último mensaje
  const lastMessageTime = chat.lastMessageTime
    ? formatChatTimestamp(chat.lastMessageTime)
    : "";

  return (
    <button
      onClick={() => onSelect(chat.id)} // Llama a onSelect con el ID del chat cuando se selecciona
      className="w-full p-4 hover:bg-gray-50 transition-colors duration-300 flex items-center gap-3 border-b no-global-styles no-styles-global"
    >
      <div className="relative">
        <div className="bg-red-100 p-3 rounded-full mb-3 flex justify-center">
          <MessageSquare className="w-5 h-5 text-[#da1641]" />
        </div>
        {/* Indicador de estado en línea */}
        {otherUser.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium truncate">
            {otherUser.first_name
              ? `${otherUser.first_name} ${otherUser.last_name} (${
                  otherUser.rol_name || "Sin rol"
                })`
              : "Usuario"}
          </h3>
          {/* Muestra la hora del último mensaje si está disponible */}
          {lastMessageTime && (
            <span className="text-xs text-gray-500 whitespace-nowrap hover:text-gray-500 ml-2">
              {lastMessageTime}
            </span>
          )}
        </div>
        {/* Muestra el último mensaje */}
        <p className="text-sm text-gray-500 truncate text-left">
          {lastMessage}
        </p>
      </div>
    </button>
  );
};
