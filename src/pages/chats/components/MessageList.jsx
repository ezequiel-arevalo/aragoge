import { ChatMessage } from './ChatMessage';
import Loader from '@/components/Loader';

export const MessageList = ({ messages, loading, currentUserId }) => {
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    // Asegurarse de que no hay mensajes duplicados
    const uniqueMessages = Array.from(new Map(messages.map(msg => [msg.id, msg])).values());

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {uniqueMessages.map((message) => (
                <ChatMessage
                    key={message.id}
                    message={message}
                    isCurrentUser={message.senderId === currentUserId}
                />
            ))}
        </div>
    );
};