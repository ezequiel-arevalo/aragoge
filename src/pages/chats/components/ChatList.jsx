import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChat } from '@/hooks/useChat';
import { selectChats } from '@/redux/chat/chatSelectors';
import { selectUser, selectUserDetails } from '@/redux/user/userSelectors';
import { sortChatsByLatestMessage } from '@/utilities/chatHelpers';
import { fetchUserDetails } from '@/redux/user/userActions';
import { ChatPreview } from './ChatPreview';
import { EmptyChatList } from './EmptyChatList';

export const ChatList = ({ onChatSelect }) => {
    const dispatch = useDispatch();
    const chats = useSelector(selectChats);
    const currentUser = useSelector(selectUser);
    const userDetails = useSelector(selectUserDetails);

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

    return (
        <div className="w-full bg-white flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                {sortedChats.length > 0 ? (
                    sortedChats.map((chat) => (
                        <ChatPreview
                            key={chat.id}
                            chat={chat}
                            currentUser={currentUser}
                            userDetails={userDetails}
                            onSelect={onChatSelect}
                        />
                    ))
                ) : (
                    <EmptyChatList />
                )}
            </div>
        </div>
    );
};