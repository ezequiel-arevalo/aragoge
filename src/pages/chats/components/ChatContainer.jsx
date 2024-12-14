import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';

export const ChatContainer = () => {
    return (
        <div className="flex h-[90vh] bg-white">
            <ChatList />
            <ChatWindow />
        </div>
    );
}