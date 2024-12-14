import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "@/redux/chat/chatActions";
import { fetchUserDetails } from "@/redux/user/userActions";
import { selectChats, selectChatLoading } from "@/redux/chat/chatSelectors";
import { selectUser, selectUserDetails } from "@/redux/user/userSelectors";
import { setCurrentChat } from "@/redux/chat/chatSlice";
import { motion } from "framer-motion"; // Importar Framer Motion

export const ChatList = () => {
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const loading = useSelector(selectChatLoading);
    const currentUser = useSelector(selectUser);
    const userDetails = useSelector(selectUserDetails);

    // Solo se obtiene la lista de chats cuando el currentUser cambia
    useEffect(() => {
        if (currentUser?.id) {
            dispatch(fetchChats(currentUser.id)); // Solo una vez al cambiar currentUser
        }
    }, [dispatch, currentUser?.id]);

    // Solo se busca información de los usuarios si aún no está cargada
    useEffect(() => {
        if (chats.length > 0) {
            chats.forEach((chat) => {
                const otherUserId = chat.participants.find((id) => id !== currentUser.id);
                if (otherUserId && !userDetails[otherUserId]) {
                    dispatch(fetchUserDetails({ userId: otherUserId, token: currentUser.token }));
                }
            });
        }
    }, [chats, dispatch, userDetails, currentUser]);

    const handleChatSelect = (chat) => {
        if (!loading) {
            dispatch(setCurrentChat(chat));
        }
    };

    return (
        <div className="border-r border-gray-200 w-1/3 p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Mis Chats</h2>
            {loading ? (
                <div className="text-center text-gray-500">Cargando chats...</div>
            ) : (
                <div className="space-y-2">
                    {chats.map((chat, index) => {
                        const otherUserId = chat.participants.find((id) => id !== currentUser.id);
                        const otherUser = userDetails[otherUserId];

                        // Si no hay datos del usuario, no renderiza el chat
                        if (!otherUser) return null;

                        return (
                            <motion.div
                                key={chat.id}
                                onClick={() => handleChatSelect(chat)}
                                className="p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                                initial={{ opacity: 0, y: 20 }} // Animación inicial
                                animate={{ opacity: 1, y: 0 }} // Animación final
                                transition={{ duration: 0.3, delay: index * 0.1 }} // Duración y retardo
                            >
                                <p className="font-medium">
                                    {`${otherUser.first_name} ${otherUser.last_name}`}
                                </p>
                                {chat.lastMessage && (
                                    <p className="text-sm text-gray-500 truncate">
                                        {chat.lastMessage}
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
