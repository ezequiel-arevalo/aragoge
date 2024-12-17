import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Componente ChatHeader
 * Muestra la cabecera del chat, con la opción de volver a la lista de chats
 * y la información del otro usuario con el que estás conversando.
 *
 * Props:
 * @param {Object} otherUser - Información del otro usuario. Contiene:
 *    - first_name: El nombre del usuario.
 *    - last_name: El apellido del usuario.
 *    - role_name (opcional): El rol o título del usuario.
 */
export const ChatHeader = ({ otherUser }) => {
  // Si no hay información del otro usuario, no mostramos nada
  if (!otherUser) {
    return null;
  }

  return (
    // Contenedor principal de la cabecera
    <div className="p-4 border-b rounded-t-lg bg-white shadow-sm flex flex-row justify-between">
      {/* Botón de "Volver a chats" ubicado a la izquierda */}
      <Link
        to="/chats" // Redirige a la lista de chats
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        Volver a chats
      </Link>

      {/* Información del otro usuario centrada */}
      <div className="flex-1 text-right">
        {/* Nombre completo del otro usuario */}
        <h3 className="text-lg font-semibold">
          {`${otherUser.first_name} ${otherUser.last_name}`}
        </h3>

        {/* Si existe el rol del usuario, lo mostramos debajo */}
        {otherUser.role_name && (
          <span className="text-sm text-gray-500">
            {`(${otherUser.role_name})`}
          </span>
        )}
      </div>
    </div>
  );
};
