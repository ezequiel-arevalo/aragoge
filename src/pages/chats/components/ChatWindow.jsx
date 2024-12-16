import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firestore';
import { selectCurrentChat, selectMessages, selectChatLoading } from '@/redux/chat/chatSelectors';
import { selectUser, selectUserDetails } from '@/redux/user/userSelectors';
import { sendMessage, fetchChatById } from '@/redux/chat/chatActions';
import { updateLastMessage } from '@/redux/chat/chatSlice';
import { fetchUserDetails } from '@/redux/user/userActions';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { EmptyChatWindow } from './EmptyChatWindow';
import { getOtherParticipant } from '@/utilities/chatHelpers';

export const ChatWindow = ({ chatId }) => {
    const dispatch = useDispatch();
    const currentChat = useSelector(selectCurrentChat);
    const messages = useSelector(selectMessages);
    const loading = useSelector(selectChatLoading);
    const currentUser = useSelector(selectUser);
    const userDetails = useSelector(selectUserDetails);

    const otherUserId = currentChat ? getOtherParticipant(currentChat, currentUser.id) : null;
    const otherUser = userDetails[otherUserId];

    useEffect(() => {
        if (chatId) {
            dispatch(fetchChatById(chatId));
        }
    }, [chatId, dispatch]);

    useEffect(() => {
        if (otherUserId && !otherUser && currentUser?.token) {
            dispatch(fetchUserDetails({ userId: otherUserId, token: currentUser.token }));
        }
    }, [dispatch, otherUserId, otherUser, currentUser]);

    useEffect(() => {
        if (!chatId) return;

        const q = query(collection(db, `chats/${chatId}/messages`), orderBy("timestamp", "asc"));
        return onSnapshot(q, (snapshot) => {
            const updatedMessages = snapshot.docs.map(doc => ({
                id: `${doc.id}_${doc.data().timestamp?.toDate?.().getTime() || Date.now()}`, // Crear un ID único combinando el ID del documento y el timestamp
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate?.().toISOString() || new Date().toISOString(),
            }));

            // Asegurarse de que no hay mensajes duplicados
            const uniqueMessages = Array.from(new Map(updatedMessages.map(msg => [msg.id, msg])).values());

            dispatch({ type: 'chat/updateMessages', payload: uniqueMessages });

            if (uniqueMessages.length > 0) {
                const lastMessage = uniqueMessages[uniqueMessages.length - 1];
                dispatch(updateLastMessage({
                    chatId,
                    message: lastMessage.text,
                    timestamp: lastMessage.timestamp,
                }));

                updateDoc(doc(db, 'chats', chatId), {
                    lastMessage: lastMessage.text,
                    lastMessageTime: new Date(lastMessage.timestamp),
                });
            }
        });
    }, [chatId, dispatch]);

    if (!currentChat) return <EmptyChatWindow />;

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            <ChatHeader otherUser={otherUser} />
            <MessageList
                messages={messages}
                loading={loading}
                currentUserId={currentUser.id}
            />
            <ChatInput
                onSendMessage={(text) =>
                    dispatch(sendMessage({
                        chatId,
                        senderId: currentUser.id,
                        text
                    }))
                }
                isLoading={loading}
            />
        </div>
    );
};