import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firestore";
import { selectCurrentChat, selectMessages, selectChatLoading } from "@/redux/chat/chatSelectors";
import { selectUser, selectUserDetails } from "@/redux/user/userSelectors";
import { sendMessage, fetchChatById } from "@/redux/chat/chatActions";
import { updateLastMessage } from "@/redux/chat/chatSlice";
import { fetchUserDetails } from "@/redux/user/userActions";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { getOtherParticipant } from "@/utilities/chatHelpers";
import { MessageSquare } from "lucide-react";

/**
 * Componente ChatWindow
 * Representa la ventana completa del chat, incluyendo:
 * - Cabecera (ChatHeader)
 * - Lista de mensajes (MessageList)
 * - Entrada de mensajes (ChatInput)
 *
 * Props:
 * @param {String} chatId - El ID del chat que se está visualizando.
 */
export const ChatWindow = ({ chatId }) => {
  const dispatch = useDispatch();

  // Selectores para obtener el estado global del chat y del usuario
  const currentChat = useSelector(selectCurrentChat);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectChatLoading);
  const currentUser = useSelector(selectUser);
  const userDetails = useSelector(selectUserDetails);

  // Obtener el ID del otro participante del chat
  const otherUserId = currentChat
    ? getOtherParticipant(currentChat, currentUser.id)
    : null;
  const otherUser = userDetails[otherUserId];

  /**
   * useEffect: Cargar los detalles del chat actual cuando cambia el chatId
   */
  useEffect(() => {
    if (chatId) {
      dispatch(fetchChatById(chatId)); // Llama a la acción para cargar el chat desde Redux
    }
  }, [chatId, dispatch]);

  /**
   * useEffect: Cargar los detalles del otro usuario si aún no se tienen
   */
  useEffect(() => {
    if (otherUserId && !otherUser && currentUser?.token) {
      dispatch(
        fetchUserDetails({
          userId: otherUserId,
          token: currentUser.token,
        })
      );
    }
  }, [dispatch, otherUserId, otherUser, currentUser]);

  /**
   * useEffect: Suscripción en tiempo real a los mensajes del chat actual.
   * Se asegura de obtener mensajes ordenados por timestamp.
   */
  useEffect(() => {
    if (!chatId) return;

    // Crear una consulta a Firestore para obtener mensajes ordenados por fecha
    const q = query(
      collection(db, `chats/${chatId}/messages`),
      orderBy("timestamp", "asc")
    );

    // Suscribirse a los cambios en los mensajes
    return onSnapshot(q, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: `${doc.id}_${
          doc.data().timestamp?.toDate?.().getTime() || Date.now()
        }`, // ID único para evitar duplicados
        ...doc.data(),
        timestamp:
          doc.data().timestamp?.toDate?.().toISOString() ||
          new Date().toISOString(),
      }));

      // Filtrar mensajes duplicados
      const uniqueMessages = Array.from(
        new Map(updatedMessages.map((msg) => [msg.id, msg])).values()
      );

      // Actualizar los mensajes en el estado global
      dispatch({ type: "chat/updateMessages", payload: uniqueMessages });

      // Actualizar el último mensaje y la hora en Firestore y Redux
      if (uniqueMessages.length > 0) {
        const lastMessage = uniqueMessages[uniqueMessages.length - 1];
        dispatch(
          updateLastMessage({
            chatId,
            message: lastMessage.text,
            timestamp: lastMessage.timestamp,
          })
        );

        updateDoc(doc(db, "chats", chatId), {
          lastMessage: lastMessage.text,
          lastMessageTime: new Date(lastMessage.timestamp),
        });
      }
    });
  }, [chatId, dispatch]);

  /**
   * Renderizado condicional: Si no hay un chat seleccionado, mostramos un mensaje.
   */
  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Selecciona un chat para comenzar</p>
        </div>
      </div>
    );
  }

  /**
   * Renderizado principal: Contiene la cabecera, lista de mensajes y campo de entrada.
   */
  return (
    <div className="flex-1 flex flex-col">
      {/* Cabecera del chat con los detalles del otro usuario */}
      <ChatHeader otherUser={otherUser} />

      {/* Lista de mensajes del chat */}
      <MessageList
        messages={messages}
        loading={loading}
        currentUserId={currentUser.id}
      />

      {/* Entrada para enviar mensajes */}
      <ChatInput
        onSendMessage={(text) =>
          dispatch(
            sendMessage({
              chatId,
              senderId: currentUser.id,
              text,
            })
          )
        }
        isLoading={loading}
      />
    </div>
  );
};
