import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "@/redux/chat/chatActions";
import { fetchUserDetails } from "@/redux/user/userActions";
import { selectChats, selectChatLoading } from "@/redux/chat/chatSelectors";
import { selectUser, selectUserDetails } from "@/redux/user/userSelectors";
import { setCurrentChat } from "@/redux/chat/chatSlice";

export const ChatList = () => {
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const loading = useSelector(selectChatLoading);
    const currentUser = useSelector(selectUser);
    const userDetails = useSelector(selectUserDetails);

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(fetchChats(currentUser.id));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        chats.forEach((chat) => {
            const otherUserId = chat.participants.find((id) => id !== currentUser.id);
            if (otherUserId && !userDetails[otherUserId]) {
                dispatch(fetchUserDetails({ userId: otherUserId, token: currentUser.token }));
            }
        });
    }, [chats, dispatch, userDetails, currentUser]);

    const handleChatSelect = (chat) => {
        dispatch(setCurrentChat(chat));
    };

    if (loading) return <div>Cargando chats...</div>;

    return (
        <div className="border-r border-gray-200 w-1/3 p-4">
            <h2 className="text-xl font-bold mb-4">Mis Chats</h2>
            <div className="space-y-2">
                {chats.map((chat) => {
                    const otherUserId = chat.participants.find((id) => id !== currentUser.id);
                    const otherUser = userDetails[otherUserId];

                    return (
                        <div
                            key={chat.id}
                            onClick={() => handleChatSelect(chat)}
                            className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                        >
                            <p className="font-medium">
                                {otherUser ? `${otherUser.first_name} ${otherUser.last_name}` : "Cargando..."}
                            </p>
                            {chat.lastMessage && (
                                <p className="text-sm text-gray-500 truncate">
                                    {chat.lastMessage}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
