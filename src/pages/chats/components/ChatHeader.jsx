import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Importamos el ícono desde lucide-react

export const ChatHeader = ({ otherUser }) => {
    if (!otherUser) {
        return (
            <div className="p-4 border-b bg-white shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
        );
    }

    return (
        <div className="p-4 border-b bg-white shadow-sm">
            <div className="flex items-center justify-between">
                {/* Botón para volver a la lista de chats */}
                <Link to="/chats" className="text-gray-500 hover:text-gray-700">
                    <ArrowLeft className="w-6 h-6" /> {/* Ícono de lucide-react */}
                </Link>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        {otherUser.online && (
                            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                        )}
                    </div>
                    <h3 className="text-lg font-semibold">
                        {`${otherUser.first_name} ${otherUser.last_name}`}
                        {otherUser.role_name && (
                            <span className="text-sm text-gray-500 ml-2">({otherUser.role_name})</span>
                        )}
                    </h3>
                </div>
            </div>
        </div>
    );
};