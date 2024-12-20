import { memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Componente ChatMessage
 * Representa un mensaje individual en el chat, con estilos diferentes dependiendo
 * de si lo envió el usuario actual o el otro participante.
 *
 * Props:
 * @param {Object} message - Objeto con la información del mensaje. Contiene:
 *    - text: El contenido del mensaje.
 *    - timestamp: La fecha/hora en que se envió el mensaje.
 * @param {Boolean} isCurrentUser  - Indica si el mensaje fue enviado por el usuario actual.
 */
export const ChatMessage = memo(({ message, isCurrentUser }) => {
  return (
    // Alinea el mensaje a la derecha si es del usuario actual, o a la izquierda si no lo es
    <div
      className={`flex ${
        isCurrentUser ? "justify-end" : "justify-start"
      } animate-fadeIn`}
    >
      {/* Mensajes del usuario actual || otros usuarios */}
      <div
        className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
          isCurrentUser ? "bg-primary text-white" : "bg-secondary text-white"
        }`}
      >
        {/* Contenido del mensaje */}
        <p className="break-words">{message.text}</p>

        {/* Fecha relativa del mensaje */}
        <span className="text-xs text-white hover:text-white italic block mt-1">
          {formatDistanceToNow(new Date(message.timestamp), {
            addSuffix: true, // Agrega "hace X tiempo" al final
            locale: es, // Localiza el texto en español
          })}
        </span>
      </div>
    </div>
  );
});

// Optimización con memo para evitar renders innecesarios
ChatMessage.displayName = "ChatMessage";
