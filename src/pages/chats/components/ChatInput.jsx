import { useState } from "react";
import { Send } from "lucide-react";

/**
 * Componente ChatInput
 * Renderiza un campo de texto (textarea) donde el usuario puede escribir mensajes y enviarlos.
 *
 * Props:
 * @param {Function} onSendMessage - Función para enviar el mensaje, recibe el texto como parámetro.
 * @param {Boolean} isLoading - Indica si el sistema está ocupado (cargando o procesando algo).
 */
export const ChatInput = ({ onSendMessage, isLoading }) => {
  // Estado local para el contenido del mensaje
  const [message, setMessage] = useState("");
  // Estado para evitar múltiples envíos mientras se procesa el mensaje
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * handleSubmit
   * Maneja el envío del mensaje cuando el formulario es enviado.
   * Evita enviar mensajes vacíos o múltiples envíos simultáneos.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    if (!message.trim() || isSubmitting) return; // Si el mensaje está vacío o ya se está enviando, salimos

    setIsSubmitting(true); // Bloqueamos el envío hasta que termine la petición
    try {
      await onSendMessage(message.trim()); // Llamamos a la función para enviar el mensaje
      setMessage(""); // Limpiamos el textarea después de enviar
    } finally {
      setIsSubmitting(false); // Permitimos enviar de nuevo
    }
  };

  /**
   * handleKeyPress
   * Envía el mensaje si el usuario presiona "Enter" (sin Shift).
   * Permite saltar de línea con Shift + Enter.
   */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita el salto de línea
      handleSubmit(e); // Llama al envío del formulario
    }
  };

  return (
    // Formulario que contiene el campo de entrada y el botón de enviar
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t rounded-b-lg bg-white shadow-sm"
    >
      <div className="flex gap-2 items-center">
        {/* Área de texto donde el usuario escribe su mensaje */}
        <textarea
          value={message} // Estado actual del mensaje
          onChange={(e) => setMessage(e.target.value)} // Actualiza el estado del mensaje
          onKeyDown={handleKeyPress} // Maneja la lógica de envío con "Enter"
          placeholder="Escribe un mensaje..." // Placeholder para el textarea
          className="flex-1 p-3 border rounded-lg resize-none max-h-32 min-h-[2.5rem]
                   focus:outline-none focus:ring-2 focus:ring-primary
                   transition-all duration-200"
          disabled={isLoading || isSubmitting} // Deshabilita si está cargando o enviando
          rows={1} // Altura inicial del textarea
        />

        {/* Botón para enviar el mensaje */}
        <button
          type="submit"
          className="p-3 bg-primary text-white rounded-full hover:bg-secondary
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transform transition-all duration-200 hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={!message.trim() || isLoading || isSubmitting} // Deshabilita si el mensaje está vacío o está cargando
          aria-label="Enviar mensaje"
        >
          <Send size={20} /> {/* Ícono de enviar (avioncito) */}
        </button>
      </div>
    </form>
  );
};
