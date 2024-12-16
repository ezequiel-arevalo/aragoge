import { useParams, useNavigate } from 'react-router-dom';
import { ChatWindow } from './components/ChatWindow';
import { ArrowLeft } from 'lucide-react';

export const ChatPage = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/chats');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-[1400px] mx-auto">
                <div className="bg-white shadow-lg h-screen flex flex-col">
                    <button
                        onClick={handleBack}
                        className="md:hidden p-4 flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-6 h-6 mr-2" />
                        Volver a chats
                    </button>
                    <ChatWindow chatId={chatId} />
                </div>
            </div>
        </div>
    );
};