import { MessageSquare } from 'lucide-react';

export const EmptyChatList = () => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <MessageSquare className="w-12 h-12 text-gray-400 mb-2" />
        <p>No hay chats disponibles</p>
    </div>
);