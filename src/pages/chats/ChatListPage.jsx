import { useNavigate } from 'react-router-dom';
import { ChatList } from './components/ChatList';

export const ChatListPage = () => {
    const navigate = useNavigate();

    const handleChatSelect = (chatId) => {
        navigate(`/chat/${chatId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1400px] mx-auto px-4">
                <h1 className="text-2xl font-bold py-4">Mensajes</h1>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <ChatList onChatSelect={handleChatSelect} />
                </div>
            </div>
        </div>
    );
};