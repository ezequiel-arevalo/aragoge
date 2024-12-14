import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { setCurrentChat } from '@/redux/chat/chatSlice';
import { selectChats } from '@/redux/chat/chatSelectors';
import { selectUser, selectUserDetails } from '@/redux/user/userSelectors';
import { sortChatsByLatestMessage, formatChatTimestamp } from '@/utilities/chatHelpers';
import { useEffect } from 'react';
import { fetchUserDetails } from '@/redux/user/userActions';

export const ChatList = () => {
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const currentUser = useSelector(selectUser);
    const userDetails = useSelector(selectUserDetails);

    // Inicializar el hook de chat para la suscripción
    useChat();

    useEffect(() => {
        chats.forEach((chat) => {
            const otherUserId = chat.participants.find((id) => id !== currentUser.id);
            if (otherUserId && !userDetails[otherUserId]) {
                dispatch(fetchUserDetails({ userId: otherUserId, token: currentUser.token }));
            }
        });
    }, [chats, userDetails, currentUser, dispatch]);

    const sortedChats = sortChatsByLatestMessage(chats);

    const handleChatSelect = (chat) => {
        dispatch(setCurrentChat(chat));
    };

    const renderChatPreview = (chat) => {
        const otherUserId = chat.participants.find((id) => id !== currentUser.id);
        const otherUser = userDetails[otherUserId] || {};
        console.log(otherUser)
        const lastMessage = chat.lastMessage || 'No hay mensajes';
        const lastMessageTime = chat.lastMessageTime ? formatChatTimestamp(chat.lastMessageTime) : '';

        return (
            <button
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className="w-full p-4 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3 border-b no-global-styles no-styles-global"
            >
                <div className="relative">
                    <div className="bg-red-100 p-3 rounded-full mb-3 flex justify-center">
                        <MessageSquare className="w-5 h-5 text-[#da1641]" />
                    </div>
                    {otherUser.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">
                            {otherUser.first_name
                                ? `${otherUser.first_name} ${otherUser.last_name} (${otherUser.rol_name
                                || 'Sin rol'})`
                                : 'Usuario'}
                        </h3>
                        {lastMessageTime && (
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                {lastMessageTime}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 truncate text-left">{lastMessage}</p>
                </div>
            </button>
        );
    };

    return (
        <div className="w-96 border-r bg-white flex flex-col">
            <div className="flex-1 overflow-y-auto">
                {sortedChats.length > 0 ? (
                    sortedChats.map(renderChatPreview)
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <MessageSquare className="w-12 h-12 text-gray-400 mb-2" />
                        <p>No hay chats disponibles</p>
                    </div>
                )}
            </div>
        </div>
    );
};