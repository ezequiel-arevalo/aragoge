import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firestore';
import { selectCurrentChat, selectMessages, selectChatLoading } from '@/redux/chat/chatSelectors';
import { selectUser, selectUserDetails } from '@/redux/user/userSelectors';
import { sendMessage } from '@/redux/chat/chatActions';
import { updateLastMessage } from '@/redux/chat/chatSlice';
import { fetchUserDetails } from '@/redux/user/userActions';
import { ChatHeader } from './ChatHeader';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MessageSquare } from 'lucide-react';
import { getOtherParticipant } from '@/utilities/chatHelpers';
import Loader from '@/components/Loader'

export const ChatWindow = () => {
    const dispatch = useDispatch();
    const currentChat = useSelector(selectCurrentChat);
    const messages = useSelector(selectMessages);
    const loading = useSelector(selectChatLoading);
    const currentUser = useSelector(selectUser);
    const userDetails = useSelector(selectUserDetails);

    const otherUserId = currentChat ? getOtherParticipant(currentChat, currentUser.id) : null;
    const otherUser = userDetails[otherUserId];

    useEffect(() => {
        if (otherUserId && !otherUser && currentUser?.token) {
            dispatch(fetchUserDetails({ userId: otherUserId, token: currentUser.token }));
        }
    }, [dispatch, otherUserId, otherUser, currentUser]);

    useEffect(() => {
        if (currentChat?.id) {
            const messagesRef = collection(db, `chats/${currentChat.id}/messages`);
            const q = query(messagesRef, orderBy("timestamp", "asc"));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const updatedMessages = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp?.toDate?.().toISOString() || new Date().toISOString(),
                }));

                dispatch({ type: 'chat/updateMessages', payload: updatedMessages });

                if (updatedMessages.length > 0) {
                    const lastMessage = updatedMessages[updatedMessages.length - 1];

                    dispatch(updateLastMessage({
                        chatId: currentChat.id,
                        message: lastMessage.text,
                        timestamp: lastMessage.timestamp,
                    }));

                    updateDoc(doc(db, 'chats', currentChat.id), {
                        lastMessage: lastMessage.text,
                        lastMessageTime: new Date(lastMessage.timestamp),
                    });
                }
            });

            return () => unsubscribe();
        }
    }, [currentChat, dispatch]);

    const handleSendMessage = async (text) => {
        if (currentChat?.id) {
            await dispatch(sendMessage({
                chatId: currentChat.id,
                senderId: currentUser.id,
                text
            })).unwrap();
        }
    };

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

    return (
        <div className="flex-1 flex flex-col h-full bg-white">
            <ChatHeader otherUser={otherUser} />

            <div
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message}
                                isCurrentUser={message.senderId === currentUser.id}
                            />
                        ))}
                    </>
                )}
            </div>

            <ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
        </div>
    );
};