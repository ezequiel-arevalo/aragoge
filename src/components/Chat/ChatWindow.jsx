import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firestore';
import { selectCurrentChat, selectMessages, selectChatLoading } from '@/redux/chat/chatSelectors';
import { selectUser, selectUserDetails } from '@/redux/user/userSelectors';
import { sendMessage } from '@/redux/chat/chatActions';
import { updateLastMessage } from '@/redux/chat/chatSlice';

export const ChatWindow = () => {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);
  const messages = useSelector(selectMessages);
  const loading = useSelector(selectChatLoading);
  const currentUser = useSelector(selectUser);
  const userDetails = useSelector(selectUserDetails);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Obtener ID del otro usuario
  const otherUserId = currentChat?.participants.find((id) => id !== currentUser.id);
  const otherUser = userDetails[otherUserId];

  // Llamar a fetchUserDetails si faltan datos
  useEffect(() => {
    if (otherUserId && !otherUser) {
      dispatch(fetchUserDetails({ userId: otherUserId, token: currentUser.token }));
    }
  }, [dispatch, otherUserId, otherUser, currentUser]);

  useEffect(() => {
    if (currentChat?.id) {
      const messagesRef = collection(db, `chats/${currentChat.id}/messages`);
      const q = query(messagesRef, orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedMessages = [];
        snapshot.forEach((doc) => {
          const messageData = doc.data();
          updatedMessages.push({
            id: doc.id,
            ...messageData,
            timestamp: messageData.timestamp?.toDate?.() || new Date()
          });
        });

        dispatch({ type: 'chat/updateMessages', payload: updatedMessages });

        if (updatedMessages.length > 0) {
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          dispatch(updateLastMessage({
            chatId: currentChat.id,
            message: lastMessage.text,
            timestamp: lastMessage.timestamp
          }));

          const chatRef = doc(db, 'chats', currentChat.id);
          updateDoc(chatRef, {
            lastMessage: lastMessage.text,
            lastMessageTime: lastMessage.timestamp
          });
        }
      });

      return () => unsubscribe();
    }
  }, [currentChat, dispatch]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && currentChat?.id) {
      try {
        await dispatch(sendMessage({
          chatId: currentChat.id,
          senderId: currentUser.id,
          text: newMessage.trim()
        })).unwrap();

        setNewMessage('');
        setIsTyping(false);
      } catch (error) {
      }
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Selecciona un chat para comenzar</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b bg-white shadow-sm">
        <h3 className="text-lg font-semibold">
          Chat con: {otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : "Cargando..."}
        </h3>
        {isTyping && (
          <p className="text-sm text-gray-500">Escribiendo...</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Cargando mensajes...</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${message.senderId === currentUser.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
                  }`}
              >
                <p className="break-words">{message.text}</p>
                <span className="text-xs opacity-75 block mt-1">
                  {message.timestamp instanceof Date
                    ? message.timestamp.toLocaleTimeString()
                    : new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newMessage.trim() || loading}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};