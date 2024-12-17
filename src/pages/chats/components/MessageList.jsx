import { ChatMessage } from "./ChatMessage";
import Loader from "@/components/Loader";

/**
 * Componente MessageList
 * Muestra una lista de mensajes en un chat, maneja el estado de carga
 * y asegura que no se rendericen mensajes duplicados.
 *
 * Props:
 * @param {Array} messages - Lista de mensajes del chat.
 * @param {Boolean} loading - Indica si los mensajes aún se están cargando.
 * @param {String} currentUserId - ID del usuario actual, para diferenciar quién envió cada mensaje.
 */
export const MessageList = ({ messages, loading, currentUserId }) => {
  // Si los mensajes están cargando, mostramos un spinner bonito (Loader)
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Eliminar mensajes duplicados (por si acaso llegan repetidos del servidor)
  const uniqueMessages = Array.from(
    new Map(messages.map((msg) => [msg.id, msg])).values()
  );

  return (
    // Contenedor principal para la lista de mensajes
    <div
      className="flex-1 p-4 space-y-4 overflow-y-scroll max-h-[90vh]"
      id="chatSystem"
    >
      {/* Mapear mensajes únicos y renderizar cada uno con el componente ChatMessage */}
      {uniqueMessages.map((message) => (
        <ChatMessage
          key={message.id} // Clave única para optimización en React
          message={message} // Pasamos el objeto del mensaje
          isCurrentUser={message.senderId === currentUserId} // Determina si el mensaje lo envió el usuario actual
        />
      ))}
    </div>
  );
};
