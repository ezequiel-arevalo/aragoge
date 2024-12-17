import { useParams } from "react-router-dom";
import { ChatWindow } from "./components/ChatWindow";
import { ChatHeader } from "./components/ChatHeader";

/**
 * Componente ChatPage
 * Página principal del chat. Se encarga de mostrar la ventana del chat
 * correspondiente al ID proporcionado en la URL.
 */
export const ChatPage = () => {
  // Extrae el parámetro "chatId" de la URL
  const { chatId } = useParams();

  return (
    <section className="max-w-[1400px] min-h-screen mx-auto my-10">
      {/* Contenedor principal con sombra y diseño responsivo */}
      <div className="shadow-lg min-h-screen flex flex-col">
        {/* Cabecera del chat */}
        <ChatHeader />

        {/* Ventana principal del chat */}
        <ChatWindow chatId={chatId} />
      </div>
    </section>
  );
};
